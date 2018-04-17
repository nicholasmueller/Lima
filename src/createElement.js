import Component from './component';
import { isLimaComponent } from './helpers';

// generic function that gets called on all jsx
// elements that evaluate on the page
function createElement(element) {
  let type = element.elementName;
  let props = element.attributes;
  let children = element.children;

  // add children to props object
  props.children = children;

  // clean children passed as an array (from state objects, etc)
  props.children && props.children.forEach(child => {
    if(Array.isArray(child)) {
      child.forEach(element => {
        props.children.push(element);
      });
    }
  });

  // filter out the array
  if(props.children) {
    props.children = props.children.filter(child => !Array.isArray(child));
  }

  const cleaned = { type, props }

  // replace string class refs by checking base Component class
  if (isLimaComponent(cleaned)){
    cleaned.type = Component.usertypes.filter(usertype => {
      return usertype.name === cleaned.type;
    })[0];
  }
  return cleaned;
}

export default createElement;
