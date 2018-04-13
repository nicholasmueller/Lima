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
  }

  render() {
    return (
      <div onClick={() => alert('hello!')}>
        Hello world
      </div>
    )
  }
}

// initialize all your classes!
Lima.initialize(App, Button, Icon);
Lima.renderDOM(<App />, document.getElementById('root'))
