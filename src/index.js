import { isLimaClass, isLimaComponent, initialize } from './helpers';
import Component from './component';
import renderDOM from './render';

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

// generic function that gets called on all jsx
// elements that evaluate on the page
function createElement(element) {
  let type = element.elementName;
  let props = element.attributes;
  let children = element.children;

  props.children = children;
  const cleaned = { type, props }

  // replace class refs by checking base Component class
  if (isLimaComponent(cleaned)){
    cleaned.type = Component.usertypes.filter(usertype => {
      return usertype.name === cleaned.type;
    })[0];
  }

  return cleaned;
}

// api export
export const Lima = {
  Component,
  createElement,
  renderDOM,
  initialize,
}
