// renderDOM creates internal instances and mounts nodes to the dom

import { forOwn, isArray } from 'lodash';
import { isLimaComponent, uniqueID } from './helpers';
import { errors } from './errors';

var globalTree;

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

  getHostNode() {
    return this.internalInstance.getHostNode();
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

  shouldUpdate(updatingInstance, newState) {
    if(updatingInstance.publicID === this.publicInstance.publicID) {
      // this is the component that needs to update
      console.log('found me!');
    }
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

  getHostNode() {
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
    this.node.setAttribute('nodeID', uniqueID());

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
        this.node.setAttribute(key, value);
      }
      if (key === 'children') {
        value.forEach(child => {
          if (typeof child === 'string' || typeof child === 'number') {
            this.node.textContent = child;
          } else if ('type' in child) {
            const internalInstance = instantiateComponent(child);
            this.internalInstances.push(internalInstance);
          } else {
            errors.invalidObjectChild(child);
          }
        });

        const childNodes = [];
        this.internalInstances.forEach(instance => {
          // mount pushes another recursive call onto the stack
          const node = instance.mount();

          // not sure if below _internalInstance is useful yet...
          node._internalInstance = instance;

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

  // save the entire tree to global object
  globalTree = rootNode.firstChild;

  // the value of this return is insignificant
  return rootInternalInstance.getPublicInstance();
}

function unmountDOM(rootNode) {
  console.log('unmountDOM called');
  const node = rootNode.firstChild;
  const rootInternalInstance = node._internalInstance;

  // erm.. what the hell does unmount here do?
  rootInternalInstance.unmount();
  rootNode.innerHTML = '';
}

// recursively walk the tree to find instance matching id
function walkTree(tree, id) {
  // base case
  if(tree.publicInstance) {
    if(id === tree.publicInstance.publicID) {
      console.log('matched!: ', tree);
      return tree;
    }
  }

  if(tree.internalInstances && tree.internalInstances.length > 0) {
    tree.internalInstances.forEach(instance => {
      const matched = walkTree(instance, id);
      if (matched !== 'undefined') {
        return matched;
      }
    })
  } else if (tree.internalInstance) {
    return walkTree(tree.internalInstance, id);
  } else {
    console.log('oops... nothing in this dom node');
  }
}

export function updateTree(element, newState) {
  // invoked from setState from Component baseclass
  const internalInstanceTree = globalTree._internalInstance;
  const elementToUpdate = element.publicID;

  console.log('rootTree: ', internalInstanceTree);
  const match = walkTree(internalInstanceTree, elementToUpdate);
  console.log('element: ', elementToUpdate)
  console.log('match: ', match);

  // walk internal instance tree
  // at each level, check if publicInstance.publicID matches elementToUpdate
  // if not, go into internalInstance.internalInstances
  // loop through each child, checking their publicInstance.publicID
  // once we match, then we can update that instance py passing in our new state
}

export default renderDOM;
