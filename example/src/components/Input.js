// import Lima from 'lima-react';
import { Lima } from '../../../src/index';

class Input extends Lima.Component {
  constructor() {
    super(Input);
    this.styles = {
      container: {
        color: 'gray',
      },
      inputField: {
        border: '1px dashed gray',
        borderRadius: '5px',
        padding: '5px',
        margin: '10px 0',
        boxSizing: 'border-box',
        width: '100%',
      }
    };
  }

  render() {
    return (
      <div style={this.styles.container}>
        <input
          onChange={this.props.onChange}
          type="text"
          style={this.styles.inputField}
          placeholder={this.props.placeholder}
          value={this.props.value}
        ></input>
      </div>
    )
  }
}

Lima.initialize(Input);
export default Input;
