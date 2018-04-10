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

// https://jaketrent.com/post/how-jsx-transform-works/
function createElement(tag = 'div', props = {}, children = []) {
  // goal of function: create an 'appElement object' as defined above
  if (props === null) {
    props = {};
  };
  if (children === null) {
    children = [];
  }

  if (typeof(children) === 'string') {
    tag = 'text'
  }

  return {
    tag,
    props,
    children
  }
};

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
  if (typeof(children !== 'string')){
    children.forEach(element => renderToDOM(element, domElement));
  }

  // append child to parent node
  locationToRender.appendChild(domElement);
}

renderToDOM(appElement, document.getElementById('root'));
