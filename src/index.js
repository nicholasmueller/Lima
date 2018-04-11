import { isLimaClass } from './helpers';
import Component from './component';
import renderToDOM from './render';

// mount native components (<div /> etc.)
function mountHost(element) {
  console.log('mountHostCall: ', element);
  let children = element.props.children || [];
  element.props.children = children.filter(Boolean); // filter out falsey values
  renderToDOM(element)
}

// mount user created components (<App /> etc.)
function mountComposite(element) {
  console.log('mountCompositeCall: ', element);
  const {
    type,
    props,
  } = element;

  let renderedElement;
  // if class, call render
  if (isLimaClass(type)) {
    const publicInstance = new type(props);
    if (publicInstance.componentWillMount) {
      publicInstance.componentWillMount();
    }

    // render is not called... i think its an es6 tranpiling bug...
    console.log('public: ', publicInstance.render())
    renderedElement = publicInstance.render();
    console.log('renderedclass: ', renderedElement);

  // so we can be sure it is a functional component, call it
  } else {
    renderedElement = type(props);
  }

  // recurse the tree to reach a native component
  return selectReconciler(renderedElement);
}

function selectReconciler(element) {
  if (typeof(element.type) === 'function') {
    return mountComposite(element);
  } else if (typeof(element.type) === 'string') {
    return mountHost(element);
  }
}

// entry point
function createElement({elementName, attributes, children}) {
  let type = elementName;
  let props = attributes;
  (props === null || props === false) && (props = {});
  (children === null || children === false) && (children = []);
  props.children = children;

  // package & start reconciliation
  const element = { type, props }

  console.log('element passed to reconciler: ', element);
  return selectReconciler(element)
}

// api export
export const Lima = {
  Component,
  createElement,
  renderToDOM
}
