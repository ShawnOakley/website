import React, { Component } from 'react';
// HOC Component to manage binding and handling of Events
// Mainly used to communicate with Three.js Scenes

export default class EventManager extends Component {
  componentDidMount() {
    const { eventBus } = this.props;
    eventBus.on('test', () => {
        console.log('received Test')
    });
}

  render () {
      return this.props.children;
  }
}