import React, { Component } from 'react';
import PullToRefresh from './PullToRefresh';
import { RefreshControlProps } from 'react-native';

class RefreshControl extends Component<RefreshControlProps> {
  render() {
    return <PullToRefresh {...this.props}>{this.props.children}</PullToRefresh>;
  }
}

export { RefreshControl };
