/*
renderDOM mounts the entire tree to the actual dom
*/

import { forOwn } from 'lodash';
import { isLimaComponent } from './helpers';


class CompositeComponent {
  // will always be a user defined class component
  constructor(element) {
    this.currentElement = element;
    this.renderedComponent = null;
    this.publicInstance = null;
  }

  getPublicInstance() {
    return this.publicInstance;
  }

  mount() {
    this.publicInstance = new element();
    console.log('public: ', this.publicInstance);
  }
}

class DOMComponent {
  constructor(element) {

  }
}

// figures out which class to instantiate
function instantiateComponent(element) {
  console.log('instantiateComponent: ', element);

  if (isLimaComponent(element)) {
    return new CompositeComponent(element);
  } else {
    return new DOMComponent(element);
  }
}

// mountTree in implementation notes
function renderDOM(element, rootNode) {
  // element is required to be a class instance that has a render method
  const rootComponent = instantiateComponent(element)

  console.log('rootComponent: ', rootComponent);

  // call mount in the rootcomponent class
  const node = rootComponent.mount();
  rootNode.appendChild(node);

  return rootComponent.getPublicInstance();
}



//   const {
//     type,
//     props
//   } = element;

//   const domElement = document.createElement(type);

//   // add event listeners or set attributes on domElement
//   forOwn(props, (value, key) => {
//     if (key.startsWith('on')) {
//       const eventType = key.toLowerCase().substring(2);
//       domElement.addEventListener(eventType, value);
//     }
//     if (key !== 'children') {
//       domElement.setAttribute(key, value)
//     }
//     if (key === 'children') {
//       value.forEach(child => {
//         // TODO: support for textcontent needed...
//         // recurse through children here
//         const childNode = selectReconciler(child);
//         domElement.appendChild(childNode);
//       })
//     }
//   });
//   return domElement;
// }

export default renderDOM;
