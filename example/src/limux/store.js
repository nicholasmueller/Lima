class LimuxStore {
  constructor(reducers = {}, initialState = {}) {
    this.initialState = initialState;
    this.reducers = reducers;

    this.state = this.reduce(initialState, {});
    this.subscribers = [];
  }

  get value() {
    return this.state;
  }

  dispatch(action) {
    // update state tree here
    this.state = this.reduce(this.state, action);
  }

  // root reducer
  reduce(state, action) {
    // calculate and return new state
    const newState = {};
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
  }
}

export default LimuxStore;
