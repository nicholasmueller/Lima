// https://tylermcginnis.com/build-your-own-react-router-v4/
// Lima routing based off of react-router api

import { Lima } from './index';

export class Route extends Lima.Component {
  // implement propTypes
  // proptypes = exact, path, component, render

  static propTypes() {
    return {
      exact: limaTypes.bool,
      path: limaTypes.string,
      component: limaTypes.func,
      render: limaTypes.func,
    }
  }

  render() {
  }
}
