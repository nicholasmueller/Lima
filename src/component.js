/*
Base Component class
- used to create Lima components
- class App extends Lima.Component {}
*/

class Component {
  // flag to identify Lima components
  static get isLimaClass() {
    return true;
  }
}

export default Component;
