// import Lima from 'lima-react';
import { Lima } from '../../src/index';
// import App from './app';

class Classed extends Lima.Component  {
  render() {
    return (
      <div prop1='propuno'>
        Hello from class!
      </div>
    )
  }
}

// const Functional = () => {
//   return (
//     <div prop2='propdos'>
//       Hello from function!
//     </div>
//   )
// }

const jsx = (
  <div prop1='hello'>
    <div>
      <input />
    </div>
  </div>
)

console.log('jsx: ', jsx);

// Lima.renderToDOM(App, document.getElementById('root'));
