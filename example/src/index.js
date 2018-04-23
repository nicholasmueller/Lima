// import Lima from 'lima-react';
import { Lima } from '../../src/index';

import TodoVanillaState from './containers/TodoVanillaState';
import TodoLimuxState from './containers/TodoLimuxState';

class App extends Lima.Component {
  constructor() {
    super(App);
    this.styles = {
      container: {
        padding: '30px',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }
    }
  }

  render() {
    return (
      <div style={this.styles.container}>
        <TodoVanillaState />
        <TodoLimuxState />
      </div>
    )
  }
}

Lima.initialize(App);
Lima.renderDOM(<App />, document.getElementById('root'))
