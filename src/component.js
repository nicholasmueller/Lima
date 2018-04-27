/*
Base Component class
- ie. class App extends Lima.Component {}
- **important** to pass class ref in super of user created component
- used to create and keep track of Lima components
- can call Component.usertypes to check all user created instances
*/

import { updateTree } from './render';
import { uniqueID } from './helpers';
import { errors } from './errors';

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

  setState(stateFunc) {
    // only allow state changes to be made with functions.
    if(typeof stateFunc !== 'function') {
      errors.invalidSetState(stateFunc);
      return;
    }

    // call reRender method in render module passing element ref
    updateTree(this, stateFunc);
  }

  setContext(incomingContext) {
    // incomingContext should be an object
    if(typeof incomingContext !== 'object') {
      errors.invalidContext();
      return;
    }
    // https://repl.it/repls/MagentaSorrowfulDoom
  }
}
Component.usertypes = [];

export default Component;
