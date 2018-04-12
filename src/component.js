/*
Base Component class
- used to create and keep track of Lima components
- ie. class App extends Lima.Component {}
- **important** to pass class ref in super of user created component
- can call Component.children to check all user created instances
*/

class Component {
  // flag to identify Lima components
  static get isLimaClass() {
    return true;
  }

  // keep track of user created components
  constructor(ref) {
    !Component.usertypes.includes(ref)
      && Component.usertypes.push(ref)
  }
}
Component.usertypes = [];

export default Component;
