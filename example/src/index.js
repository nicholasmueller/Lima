// import Lima from 'lima-react';
import { Lima } from '../../src/index';

class Button extends Lima.Component {
  constructor() {
    super(Button);
  }

  rennder() {
    return (
      <div>
        Button
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
      <div prop1='propuno'>
        Hello from class!
        <Button />
      </div>
    )
  }
}

// necessary step to make Lima aware of all custom classes
// initialize before exports
// Lima.initialize(Button);
// export default Button;
Lima.initialize(App, Button);
Lima.renderDOM(<App />, document.getElementById('root'))
