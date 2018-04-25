import { cloneDeep, forOwn } from 'lodash';
import { instantiateComponent } from './render';

class CompositeComponent {
  constructor(element) {
    this.currentElement = element;
    this.renderedJsx = null;
    this.publicInstance = null;
    this.internalInstance = null;
  }

  getPublicInstance() {
    return this.publicInstance;
  }

  updateState(stateFunc) {
    this.publicInstance.componentWillUpdate && this.publicInstance.componentWillUpdate();

    const prevState = cloneDeep(this.publicInstance.state);
    const prevProps = cloneDeep(this.publicInstance.props);
    const newState = stateFunc(prevState, prevProps);

    // naive way to merge state object
    let updatedState = {};
    forOwn(prevState, (value, key) => {
      updatedState[key] = newState.hasOwnProperty(key)
        ? newState[key]
        : value
    });
    this.publicInstance.state = updatedState;

    this.publicInstance.componentDidUpdate && this.publicInstance.componentDidUpdate();
    // call render
    this.renderedJsx = this.publicInstance.render();

    // update internal instances
    return this.internalInstance.mount(this.renderedJsx);
  }

  mount() {
    // 1. create public instance of current element (this is the class the user has defined)
    // 2. attach props from the jsx to the instance (make it available to public instance before cwm)
    // 3. call lifecycle if exists
    // 4. call the instance render to get the embedded jsx object
    this.publicInstance = new this.currentElement.type();
    this.publicInstance.props = this.currentElement.props;
    this.publicInstance.componentWillMount && this.publicInstance.componentWillMount();
    this.publicInstance.componentDidMount && this.publicInstance.componentDidMount();
    this.renderedJsx = this.publicInstance.render();

    // instantiate child (explains why class Component can only have one wrapping div)
    this.internalInstance = instantiateComponent(this.renderedJsx);
    return this.internalInstance.mount();
  }

  // TODO: implement unmount...
  unmount() {
    this.publicInstance && this.publicInstance.componentWillUnmount
      && this.publicInstance.componentWillUnmount();
    this.internalInstance.unmount();
  }
}

export default CompositeComponent;
