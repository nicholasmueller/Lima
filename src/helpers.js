/*
Helpers used in main codebase
*/

// helper method to determine if component is a class
export function isLimaClass(element) {
  return typeof(element) === 'function' && element.isLimaClass
    ? true
    : false;
}
