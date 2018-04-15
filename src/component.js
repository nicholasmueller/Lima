/*
Base Component class
- ie. class App extends Lima.Component {}
- **important** to pass class ref in super of user created component
- used to create and keep track of Lima components
- can call Component.usertypes to check all user created instances
*/

import { updateTree } from './render';
import { uniqueID } from './helpers';

class Component {
  // flag to identify Lima components
  static get isLimaClass() {
    return true;
  }

  // keep track of user created components
  constructor(ref) {
    !Component.usertypes.includes(ref)
      && Component.usertypes.push(ref);

    // assign unique id to instance on creation
    // used to identify instances internally
    this.publicID = uniqueID();
  }

  setState(newState) {
    // call reRender method in render module passing element ref
    updateTree(this, newState);
  }
}
Component.usertypes = [];

export default Component;
