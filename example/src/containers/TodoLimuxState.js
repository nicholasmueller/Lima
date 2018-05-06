// import Lima from 'lima-react';
import { Lima } from '../../../src/index';

import { todoReducer, initialState } from '../limux/reducers';

import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';
import List from '../components/List';

class TodoLimuxState extends Lima.Component {
  constructor() {
    super(TodoLimuxState);
    this.styles = {
      container: {
        border: '1px solid grey',
        borderRadius: '5px',
        padding: '20px',
        margin: '20px',
        maxWidth: '200px',
        height: '100%',
        backgroundColor: '#e5efff',
      },
    }

    this.store = Lima.createStore(todoReducer, initialState);
    // const reducers = { todos }
    // this.store = new Lima.LimuxStore(reducers, initialState);

    this.store.subscribe(() => {
      // force repaint
      this.setState((prevState, prevProps) => {
        this.store.getState();
      });
    });

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleClick() {
    this.store.dispatch({
      type: 'ADD_TODO',
      payload: this.store.state.input,
    });
  }

  handleInputChange(e) {
    this.store.dispatch({
      type: 'UPDATE_INPUT',
      payload: e.target.value,
    });
  }

  deleteItem(index) {
    this.store.dispatch({
      type: 'DELETE_TODO',
      payload: index,
    });
  }

  render() {
    return (
      <div style={this.styles.container}>
        <div>
          <Text text="To Do List (with Limux state)"/>
          <Input
            placeholder="Add a todo..."
            onChange={this.handleInputChange}
            value={this.store.state.input}
          />
          <Button
            text="Add"
            handleClick={this.handleClick}
          />
          <List
            data={this.store.state.todos}
            deleteItem={this.deleteItem}
          />
        </div>
      </div>
    )
  }
}

Lima.initialize(TodoLimuxState);
export default TodoLimuxState;
