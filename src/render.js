/*
renderToDOM is used when creating actual dom elements
- receives entire tree and recurses through nodes
*/

import { forOwn } from 'lodash';

// TODO:
// this function needs to take the entire tree and parse it recursively...
function renderToDOM(element) {
  const {
    type,
    props
  } = element;

  const domElement = document.createElement(type);

  // add event listeners or set attributes on domElement
  forOwn(props, (value, key) => {
    if (key.startsWith('on')) {
      const eventType = key.toLowerCase().substring(2);
      domElement.addEventListener(eventType, value);
    }
    if (key !== 'children') {
      domElement.setAttribute(key, value)
    }
    if (key === 'children') {
      value.forEach(child => {
        // TODO: support for textcontent needed...
        // recurse through children here
        const childNode = selectReconciler(child);
        domElement.appendChild(childNode);
      })
    }
  });
  console.log('domElement: ', domElement);
  return domElement;
}

export default renderToDOM;
