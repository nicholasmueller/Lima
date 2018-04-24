// import Lima from 'lima-react';
import { Lima } from '../../../src/index';

import LimuxStore from '../stores/LimuxStore';
import todoReducer from '../limux/reducers';

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

    this.reducers = {
      todos: todoReducer,
    }
    this.store = new LimuxStore(this.reducers);

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleClick() {
    this.store.dispatch({
      type: 'ADD_TODO',
      payload: {label: 'Eat Pizza'},
    });
  }

  handleInputChange(e) {
    console.log(e.target.value);
  }

  deleteItem(index) {
    console.log(index);
  }

  render() {
    return (
      <div style={this.styles.container}>
        <div>
          <Text text="To Do List (with Limux state)"/>
          <Input
            placeholder="Add a todo..."
            onChange={this.handleInputChange}
            value={''}
          />
          <Button
            text="Add"
            handleClick={this.handleClick}
          />
          <List
            data={[]}
            deleteItem={this.deleteItem}
          />
        </div>
      </div>
    )
  }
}

Lima.initialize(TodoLimuxState);
export default TodoLimuxState;
