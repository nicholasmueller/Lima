// import Lima from 'lima-react';
import { Lima } from '../../../src/index';

class Button extends Lima.Component {
  constructor() {
    super(Button);
    this.styles = {
      container: {
        border: '1px solid gray',
        borderRadius: '5px',
        padding: '10px',
        textAlign: 'center',
        cursor: 'pointer',
      }
    };
  }

  render() {
    return (
      <div
        onClick={() => this.props.handleClick()}
        style={this.styles.container}
      >
        {this.props.text}
      </div>
    )
  }
}

Lima.initialize(Button);
export default Button;
