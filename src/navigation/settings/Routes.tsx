import React, { Component } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen';
import HomeSettingsScreen from './HomeSettingsScreen';
import ThemeSettingsScreen from './ThemeSettingsScreen';
import ColorSettingsScreen from './ColorSettingsScreen';

const Stack = createStackNavigator();

/**
 *
 */
class SettingsRoutes extends Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName='/settings'
        headerMode='none'
        screenOptions={{ gestureEnabled: false, ...TransitionPresets.RevealFromBottomAndroid }}>
        <Stack.Screen name='/settings' component={SettingsScreen as any} />
        <Stack.Screen name='/settings/home' component={HomeSettingsScreen as any} />
        <Stack.Screen name='/settings/theme' component={ThemeSettingsScreen as any} />
        <Stack.Screen name='/settings/colors' component={ColorSettingsScreen as any} />
      </Stack.Navigator>
    );
  }
}

export default SettingsRoutes;
