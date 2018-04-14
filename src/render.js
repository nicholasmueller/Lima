// renderDOM creates internal instances and mounts nodes to the dom

import { forOwn, isArray } from 'lodash';
import { isLimaComponent } from './helpers';

class CompositeComponent {
  constructor(element) {
    this.currentElement = element;
    this.renderedJsx = null;
    this.publicInstance = null;
    this.internalInstance = null;
  }

  getPublicInstance() {
    return this.publicInstance;
  }

  receive(nextElement) {
    const prevProps = this.currentElement.props;
    const prevInternalInstance = this.internalInstance;
    const prevRenderedComponent = prevInternalInstance.currentElement;

    // update this
    this.currentElement = nextElement;
    this.publicInstance.componentWillUpdate
      && this.publicInstance.componentWillUpdate(nextElement.props);
    this.publicInstance.props = nextElement.props;
    // call rerender
    const nextRenderedElement = this.publicInstance.render();

  }

  mount() {
    // 1. create public instance of current element (this is the class the user has defined)
    // 2. attach props from the jsx to the instance (make it available to public instance before cwm)
    // 3. call first lifecycle if exists
    // 4. call the instance render to get the embedded jsx object
    this.publicInstance = new this.currentElement.type();
    this.publicInstance.props = this.currentElement.props;
    this.publicInstance.componentWillMount && this.publicInstance.componentWillMount();
    this.renderedJsx = this.publicInstance.render();

    // instantiate child (explains why class Component can only have one wrapping div)
    this.internalInstance = instantiateComponent(this.renderedJsx);
    return this.internalInstance.mount();
  }

  unmount() {
    this.publicInstance && this.publicInstance.componentWillUnmount
      && this.publicInstance.componentWillUnmount();
    this.internalInstance.unmount();
  }
}

class DOMComponent {
  constructor(element) {
    this.currentElement = element;
    this.internalInstances = [];
    this.node = null;
  }

  getPublicInstance() {
    return this.node;
  }

  receive(nextElement) {

  }

  mount() {
    const children = this.currentElement.props.children || [];
    if(!isArray(children)) {
      children = [children];
    }

    this.node = document.createElement(this.currentElement.type)

    // add event listeners and/or set attributes on node
    forOwn(this.currentElement.props, (value, key) => {
      if (key.startsWith('on')) {
        const eventType = key.toLowerCase().substring(2);
        this.node.addEventListener(eventType, value);
      }
      if (key === 'style') {
        forOwn(value, (_value, key) => {
          this.node.style[key] = _value;
        });
      }
      if (
        key !== 'children'
        && !key.startsWith('on')
        && key !== 'style'
      ) {
        // handle styles differently
        this.node.setAttribute(key, value);
      }
      if (key === 'children') {
        value.forEach(child => {
          if (typeof child === 'string') {
            this.node.textContent = child;
          } else {
            const internalInstance = instantiateComponent(child);
            this.internalInstances.push(internalInstance);
          }
        });

        const childNodes = [];
        this.internalInstances.forEach(instance => {
          // mount pushes another recursive call onto the stack
          const node = instance.mount();
          typeof node !== 'undefined' && childNodes.push(node);
        });
        childNodes.forEach(node => {
          this.node.appendChild(node);
        });
      }
    });
    // if this returns, we can pop down the recursive stack
    return this.node;
  }

  unmount() {
    // recursive if instance is a DOMComponent
    this.internalInstances.forEach(instance => {
      // doesnt do anything usefull here...
      instance.unmount()
    });
  }
}

function instantiateComponent(element) {
  if (isLimaComponent(element)) {
    return new CompositeComponent(element);
  } else {
    return new DOMComponent(element);
  }
}

function renderDOM(element, rootNode) {
  // destroy existing tree if exists
  rootNode.firstChild && unmountDOM(rootNode);

  const rootInternalInstance = instantiateComponent(element)

  // this mount starts the recursive process
  const node = rootInternalInstance.mount();
  node._internalInstance = rootInternalInstance;
  rootNode.appendChild(node);

  // the value of this return is insignificant
  return rootInternalInstance.getPublicInstance();
}

function unmountDOM(rootNode) {
  console.log('unmountDOM called');
  const node = rootNode.firstChild;
  const rootInternalInstance = node._internalInstance;

  // erm.. what the hell does unmount do?
  rootInternalInstance.unmount();
  rootNode.innerHTML = '';
}

export default renderDOM;
