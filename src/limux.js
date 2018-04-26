// https://levelup.gitconnected.com/learn-redux-by-building-redux-from-scratch-dcbcbd31b0d0
// simple functional implementation

export const createStore = (reducer, initialState) => {
  const store = {};
  store.state = initialState;
  store.listeners = [];

  store.getState = () => store.state;

  store.subscribe = (listener) => {
    store.listeners.push(listener);
  };

  store.dispatch = (action) => {
    store.state = reducer(store.state, action);
    store.listeners.forEach(listener => listener());
  };

  return store;
};


// https://toddmotto.com/redux-typescript-store
// class implementaiton (not used)

export class LimuxStore {
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
    this.subscribers.forEach(fn => fn(this.value));
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
    fn(this.value);

    // unsubscribe by invoking subsription return
    // filter out the current fn
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }
}

// function to inject Limux store into every component on internal tree
// use context function on component base class
