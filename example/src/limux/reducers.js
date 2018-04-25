const getInitialState = () => {
  return {
    todos: [],
    input: '',
  }
};

export const todoReducer = (prevState = getInitialState(), action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const nextTodos = [...prevState.todos, action.payload];
      return {
        todos: nextTodos,
        input: '',
      }
    case 'UPDATE_INPUT':
      return {
        todos: prevState.todos,
        input: action.payload,
      }
    default:
      return prevState;
  }
}
