// renderDOM creates internal instances and mounts nodes to the dom

import { forOwn, forEach, isArray, cloneDeep } from 'lodash';
import { isLimaComponent, uniqueID } from './helpers';
import { errors } from './errors';

import CompositeComponent from './compositeComponent';
import DOMComponent from './domComponent';

var globalTree;

export function instantiateComponent(element) {
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
    let result = [];
    tree.internalInstances.forEach(instance => {
      if(instance.hasOwnProperty('publicInstance')) {
        result.push(walkTree(instance, id));
      }
    });
    return result;
  } else if (tree.internalInstance) {
    // recurse and push another stack frame
    return walkTree(tree.internalInstance, id);
  } else {
    console.warn('oops, check walkTree()');
    return null;
  }
}

export function updateTree(element, stateFunc) {
  // invoked from setState from Component baseclass
  const internalInstanceTree = globalTree._internalInstance;
  const elementToUpdate = element.publicID;

  const matchedInstances = walkTree(internalInstanceTree, elementToUpdate);
  const matchedInstance = matchedInstances.filter(instance => {
    if (instance.hasOwnProperty('publicInstance')) {
      return instance.publicInstance.publicID === elementToUpdate;
    }
  })[0];

  // sanity check to make sure we are actually matching
  if (matchedInstance.publicInstance.publicID !== elementToUpdate) {
    console.error('shit... match is off. check walkTree()');
  }

  matchedInstance.updateState(stateFunc);
  return;
}

export default renderDOM;
