/*
Helpers used in main codebase
*/

// helper method to determine if component is a class
export function isLimaClass(element) {
  return typeof(element) === 'function' && element.isLimaClass
    ? true
    : false;
}

// we can check if jsx is user defined if type is capitalized
export function isLimaComponent(element) {
  if (typeof element.type === 'string') {
    return element.type[0] === element.type[0].toUpperCase()
  }
  return typeof element.type === 'function';
}

// function used to initialize all user created components to make
// base component class aware of its existence
// used for parsing jsx trees (combat type reference returning string)
export function initialize(...components){
  components.forEach(component => new component);
}

export function uniqueID() {
  return Math.random().toString(36).substring(2);
}
