import { forOwn } from 'lodash';

const stringElement = {
  tag: 'div',
  props: {
    onClick: () => alert('hello'),
    id: 'container',
    className: 'appElement'
  },
  children: 'yay'
}

const nestedElement = {
  tag: 'div',
  props: {},
  children: [
    {
      tag: 'h1',
      props: {},
      children: 'yay'
    },
    {
      tag: 'p',
      props: {},
      children: [
        {
          tag: 'div',
          props: {},
          children: 'hi'
        }
      ]
    }
  ]
}

function createElement(tag = 'div', props = {}, ...children) {
  (props === null || props === false) && (props = {});
  (children === null || children === false) && (children = []);

  const jsxObject = {
    tag,
    props,
    children
  }

  return jsxObject
};

function renderToDOM(elementToRender, locationToRender) {
  const {
    tag = 'div',
    props = {},
    children = [],
  } = elementToRender;

  console.log('children: ', children)

  const domElement = typeof(children) === 'string'
    ? document.createTextNode(children)
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

  // append child to parent node
  locationToRender.appendChild(domElement);
}

export const Lima = {
  createElement,
  renderToDOM
}
// renderToDOM(appElement, document.getElementById('root'));
