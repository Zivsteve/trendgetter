import React, { Component } from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { NavigationEvents } from 'react-navigation';

interface Props {
  color?: string;
  dark?: boolean;
}

export default class NavigationBar extends Component<Props> {
  componentDidUpdate() {
    this._update();
  }

  private _update() {
    const { color, dark } = this.props;
    changeNavigationBarColor(color || '#00000000', !dark, true);
  }

  render() {
    return <NavigationEvents onWillFocus={() => this._update()} />;
  }
}
