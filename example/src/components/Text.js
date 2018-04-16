// import Lima from 'lima-react';
import { Lima } from '../../../src/index';

class Text extends Lima.Component {
  constructor() {
    super(Text);
    this.styles = {
      container: {
        fontWeight: 'bold',
      }
    };
  }

  render() {
    return (
      <div style={this.styles.container}>
        {this.props.text}
      </div>
    )
  }
}

Lima.initialize(Text);
export default Text;
