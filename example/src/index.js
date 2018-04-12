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

const Functional = () => {
  return (
    <div prop2='propdos'>
      Hello from function!
    </div>
  )
}

const jsx = (
  <div prop1='hello'>
    <div>
      <input />
    </div>
  </div>
)

// createElements are called first
// then entire jsx object is returned

// const jsxExpanded =
//   Lima.createElement(
//   "div",
//   { prop1: "hello" },
//     createElement(
//       "div",
//       {},
//         createElement(
//           "input",
//           {},
//           []
//         ),
//     ),
//   );

console.log('jsx: ', jsx);
// now that we have the jsx object we can call the reconciler
// on the entire object

// Lima.renderToDOM(App, document.getElementById('root'));
