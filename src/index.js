import { forOwn } from 'lodash';

const appElement = {
  tag: 'div',
  props: {
    onClick: () => alert('hello'),
    id: 'container',
    className: 'appElement'
  },
  children: [
    {
      tag: 'text',
      children: ['foobar']
    },
  ]
}

function renderToDOM(elementToRender, locationToRender) {
  const {
    tag = 'div',
    props = {},
    children = [],
  } = elementToRender;

  // create appropriate dom element based on tag
  const domElement = tag === 'text'
    ? document.createTextNode('')
    : document.createElement(tag);

  // add event listeners or set props on domElement
  forOwn(props, (value, key) => {
    if (key.startsWith('on')) {
      const eventType = key.toLowerCase().substring(2);
      domElement.addEventListener(eventType, value);
    } else {
      domElement[key] = value;
    }
  });

  // render children recursively
  children.forEach(element => renderToDOM(element, domElement));

  // append child to parent node
  locationToRender.appendChild(domElement);
}

renderToDOM(appElement, document.getElementById('root'));
