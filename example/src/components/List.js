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
    console.log('list props: ', this.props);
    return (
      <div>
        <ul>
          {
            this.props.data.map(item => (
              <li
                style={this.styles.container}
                onClick={(item) => this.props.deleteItem}
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
