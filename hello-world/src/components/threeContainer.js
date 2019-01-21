import React, { Component } from 'react';
import threeEntryPoint from './../threejs/threeEntryPoint';
// https://itnext.io/how-to-use-plain-three-js-in-your-react-apps-417a79d926e0

export default class ThreeContainer extends Component {
  componentDidMount() {
    const { sceneName, eventBus } = this.props;
    threeEntryPoint(this.threeRootElement, sceneName, eventBus);
  }
  render () {
      return (
        <div className={'three-container'} ref={element => this.threeRootElement = element} />
      );
  }
}