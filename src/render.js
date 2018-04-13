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
    this.renderedElement = null;
    this.publicInstance = null;
  }

  getPublicInstance() {
    return this.publicInstance;
  }

  mount() {
    // create instance of current element
    this.publicInstance = new this.currentElement.type();
    // attach props to instance (make it available to public instance before cwm)
    this.publicInstance.props = this.currentElement.props;
    // call first lifecycle if exists
    if (this.publicInstance.componentWillMount) {
      this.publicInstance.componentWillMount();
    }
    // call the render to get embedded jsx object
    this.renderedElement = this.publicInstance.render();

    // instantiate children
    console.log('renderedElement: ', this.renderedElement);
    this.renderedComponent = instantiateComponent(this.renderedElement);
    console.log('renderedComponent: ', this.renderedComponent);
    return this.renderedComponent.mount();
  }
}

class DOMComponent {
  // will always be a native component : div/h1/etc
  constructor(element) {

  }
}

// figures out which class to instantiate
function instantiateComponent(element) {
  if (isLimaComponent(element)) {
    return new CompositeComponent(element);
  } else {
    return new DOMComponent(element);
  }
}

// mountTree in implementation notes
function renderDOM(element, rootNode) {
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
