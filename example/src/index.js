// import Lima from 'lima-react';
import { Lima } from '../../src/index';
// import App from './app';

const jsx = (
  <h1>
    <div>
      Sup
      <p>
        Hello
      </p>
    </div>
    <div>
      Another
    </div>
  </h1>
)

console.log(jsx);

Lima.renderToDOM(jsx, document.getElementById('root'));
