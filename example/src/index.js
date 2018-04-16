// import Lima from 'lima-react';
import { Lima } from '../../src/index';

class Icon extends Lima.Component {
  constructor() {
    super(Icon);
  }

  render() {
    return (
      <div onClick={() => console.log('hello')}>
        I
      </div>
    )
  }
}

class Button extends Lima.Component {
  constructor() {
    super(Button);

    this.styles = {
      innerContainer: {
        color: 'red',
        fontWeight: 'bold',
        padding: '10px',
        border: '1px solid black'
      }
    }

    this.state = {
      counter: 1
    }
  }

  componentWillUpdate() {
    // do something before rerender
  }

  increaseCounter() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  decreaseCounter() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {
    return (
      <div>
        <div
          onClick={() => this.increaseCounter()}
          style={this.styles.innerContainer}
        >
          +
        </div>
        <div>
          {this.state.counter}
        </div>
        <div
          onClick={() => this.decreaseCounter()}
          style={this.styles.innerContainer}
        >
          -
        </div>
      </div>
    )
  }
}

class App extends Lima.Component  {
  constructor() {
    super(App);
    this.styles = {
      container: {
        color: 'black',
      },
    }
  }

  render() {
    return (
      <div style={this.styles.container}>
        <Icon />
        <Button />
      </div>
    )
  }
}

// initialize all your classes!
Lima.initialize(App, Button, Icon);
Lima.renderDOM(<App />, document.getElementById('root'))
