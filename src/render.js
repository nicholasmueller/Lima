// renderDOM creates internal instances and mounts nodes to the dom

import { forOwn, forEach, isArray, merge } from 'lodash';
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

  updateState(newState) {
    // publicInstance - update state object directly
    this.publicInstance.state = merge(this.publicInstance.state, newState);

    // update renderedJSX with new state.. call hook before rerender
    this.publicInstance.componentWillUpdate && this.publicInstance.componentWillUpdate();
    this.renderedJsx = this.publicInstance.render();

    // update internal instances
    return this.internalInstance.mount(this.renderedJsx);
  }

  mount() {
    // 1. create public instance of current element (this is the class the user has defined)
    // 2. attach props from the jsx to the instance (make it available to public instance before cwm)
    // 3. call lifecycle if exists
    // 4. call the instance render to get the embedded jsx object
    this.publicInstance = new this.currentElement.type();
    this.publicInstance.props = this.currentElement.props;
    this.publicInstance.componentWillMount && this.publicInstance.componentWillMount();
    this.renderedJsx = this.publicInstance.render();

    // instantiate child (explains why class Component can only have one wrapping div)
    this.internalInstance = instantiateComponent(this.renderedJsx);
    return this.internalInstance.mount();
  }

  // TODO: implement unmount...
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

  mount(newJsx) {
    // convenience flag to signal if an update mount
    let initialMount = (typeof newJsx === 'undefined');

    if (initialMount) {
      this.node = document.createElement(this.currentElement.type)
    } else {
      // use already created node
      this.currentElement = newJsx;
      this.internalInstances = [];
    }

    const children = this.currentElement.props.children || [];
    if(!isArray(children)) {
      children = [children];
    }

    // add event listeners and/or set attributes on node
    forOwn(this.currentElement.props, (value, key) => {
      if (key.startsWith('on') && initialMount) {
        // we do NOT re-add event listeners on state updates
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
          typeof node !== 'undefined' && childNodes.push(node);
        });

        // replace child node if type/attributes/etc are different on state update
        if (!initialMount && this.node.hasChildNodes()) {
          const currentChildren = this.node.childNodes;
          currentChildren.forEach((currentChild, index) => {
            if (!currentChild.isEqualNode(childNodes[index])) {
              currentChild.replaceWith(childNodes[index])
            }
          })
        } else {
          childNodes.forEach(node => {
            this.node.appendChild(node);
          });
        }
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

// look through the tree to find the instance matching passed id
function walkTree(tree, id) {
  // base case
  if(tree.publicInstance && (tree.publicInstance.publicID === id)) {
    return tree;
  }

  if(tree.internalInstances && tree.internalInstances.length > 0) {
    let result = null;
    tree.internalInstances.forEach(instance => {
      if(instance.hasOwnProperty('publicInstance')) {
        result = walkTree(instance, id);
      }
    });
    return result;
  } else if (tree.internalInstance) {
    // recurse and push another stack frame
    return walkTree(tree.internalInstance, id);
  } else {
    return null;
  }
}

export function updateTree(element, newState) {
  // invoked from setState from Component baseclass
  const internalInstanceTree = globalTree._internalInstance;
  const elementToUpdate = element.publicID;

  const matchedInstance = walkTree(internalInstanceTree, elementToUpdate);
  // sanity check to make sure we are actually matching
  if (matchedInstance.publicInstance.publicID !== elementToUpdate) {
    console.error('shit... match is off. check walkTree()');
  }

  // once we match, then we can call a method on the instance
  // and that method can take care of updating itself and
  // its children if necessary.
  matchedInstance.updateState(newState);

  // nothing to return, except we trust dom has been updated
  return;
}

export default renderDOM;
