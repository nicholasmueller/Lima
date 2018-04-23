// import Lima from 'lima-react';
import { Lima } from '../../src/index';

import Text from './components/Text';
import Button from './components/Button';
import Input from './components/Input';
import List from './components/List';

class App extends Lima.Component {
  constructor() {
    super(App);
    this.styles = {
      container: {
        border: '1px solid grey',
        borderRadius: '5px',
        padding: '20px',
        margin: '20px',
        maxWidth: '200px',
      },
    }

    this.state = {
      todoInput: '',
      todoList: ['john', 'bob'],
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleClick() {
    this.setState((prevState, prevProps) => {
      const newList = prevState.todoList.concat(prevState.todoInput);
      return {
        todoInput: '',
        todoList: newList,
      }
    });
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
      const newList = prevState.todoList.slice(0, index).concat(prevState.todoList.slice(index+1));
      return {
        todoList: newList,
      }
    })
  }

  render() {
    return (
      <div style={this.styles.container}>
        <div>
          <Text text="Test"/>
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

Lima.initialize(App);
Lima.renderDOM(<App />, document.getElementById('root'))
