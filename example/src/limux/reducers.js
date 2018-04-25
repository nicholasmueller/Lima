export const initialState = {
  todos: ['Type and click add', 'Click an item to delete'],
  input: '',
};

export const todoReducer = (prevState = initialState, action) => {
  let nextTodos;
  switch (action.type) {
    case 'ADD_TODO':
      nextTodos = [...prevState.todos, action.payload];
      return {
        todos: nextTodos,
        input: prevState.input,
      }
    case 'UPDATE_INPUT':
      return {
        todos: prevState.todos,
        input: action.payload,
      }
    case 'DELETE_TODO':
      nextTodos = prevState.todos
        .slice(0, action.payload)
        .concat(prevState.todos.slice(action.payload+1));
      return {
        todos: nextTodos,
        input: prevState.input,
      }
    default:
      return prevState;
  }
}
