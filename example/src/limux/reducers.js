const initialState = {
  todos: [],
  input: '',
};

function todoReducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TODO': {
      const data = [...state.todos, action.payload];
      return {
        ...state,
        data,
      };
    }
  }

  // return default state if no action match
  return state;
}

export default todoReducer;
