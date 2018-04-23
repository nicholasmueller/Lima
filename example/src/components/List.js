// import Lima from 'lima-react';
import { Lima } from '../../../src/index';

class List extends Lima.Component {
  constructor() {
    super(List);

    this.styles = {
      container: {
        cursor: 'pointer',
      }
    }
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.data.map((item, index) => (
              <li
                style={this.styles.container}
                onClick={() => this.props.deleteItem(index)}
              >
                {item}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

Lima.initialize(List);
export default List;
