// import Lima from 'lima-react';
import { Lima } from '../../../src/index';

import Text from '../components/Text';
import Button from '../components/Button';
import Input from '../components/Input';
import List from '../components/List';

class TodoVanillaState extends Lima.Component {
  constructor() {
    super(TodoVanillaState);
    this.styles = {
      container: {
        border: '1px solid grey',
        borderRadius: '5px',
        padding: '20px',
        margin: '20px',
        maxWidth: '200px',
        height: '100%',
        backgroundColor: '#ffede5',
      },
    }

    this.state = {
      todoInput: '',
      todoList: ['Type and click add', 'Click an item to delete'],
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleClick() {
    if (this.state.todoInput.length > 0) {
      this.setState((prevState, prevProps) => {
        const newList = prevState.todoList.concat(prevState.todoInput);
        return {
          todoInput: '',
          todoList: newList,
        }
      });
    }
  }

  handleInputChange(e) {
    this.setState((prevState, prevProps) => {
      return {
        todoInput: e.target.value,
      }
    });
  }

  deleteItem(index) {
    this.setState((prevState, prevProps) => {
      const newList = prevState.todoList
        .slice(0, index)
        .concat(prevState.todoList.slice(index+1));
      return {
        todoList: newList,
      }
    })
  }

  render() {
    return (
      <div style={this.styles.container}>
        <div>
          <Text text="To Do List (with vanilla state)"/>
          <Input
            placeholder="Add a todo..."
            onChange={this.handleInputChange}
            value={this.state.todoInput}
          />
          <Button
            text="Add"
            handleClick={this.handleClick}
          />
          <List
            data={this.state.todoList}
            deleteItem={this.deleteItem}
          />
        </div>
      </div>
    )
  }
}

Lima.initialize(TodoVanillaState);
export default TodoVanillaState;
