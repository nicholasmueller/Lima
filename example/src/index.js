// import Lima from 'lima-react';
import { Lima } from '../../src/index';

class Icon extends Lima.Component {
  constructor() {
    super(Icon);
  }

  render() {
    return (
      <div>
        I am an icon
      </div>
    )
  }
}

class Button extends Lima.Component {
  constructor() {
    super(Button);
  }

  render() {
    return (
      <div>
        Hello from Button!
      </div>
    )
  }
}

class App extends Lima.Component  {
  constructor() {
    super(App);
    this.styles = {
      container: {
        backgroundColor: 'green',
        color: 'white',
      },
      innerContainer: {
        color: 'red',
        fontWeight: 'bold',
      }
    }

    this.state = {
      counter: 1
    }
  }

  increaseCounter() {
    this.state.counter += 1;
    console.log('counter updated...', this.state.counter);
  }

  render() {
    console.log(this.state.counter)
    return (
      <div
        style={this.styles.container}
      >
        <Icon />
        <div
          style={this.styles.innerContainer}
          onClick={() => this.increaseCounter()}
        >
          {this.state.counter}
        </div>
        <Button />
      </div>
    )
  }
}

// initialize all your classes!
Lima.initialize(App, Button, Icon);
Lima.renderDOM(<App />, document.getElementById('root'))
