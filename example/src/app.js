// import Lima from 'lima-react';
import Lima from '../../src/index';

import style from './main.css';

const Title = (props) => {
  return (
    <div>
      {props.data}
    </div>
  )
}

class App extends Lima.Component {
  render() {
    return (
      <div>
        <Title
          data="This is the title!"
        />
        Hello world!
      </div>
    );
  }
}

export default App;
