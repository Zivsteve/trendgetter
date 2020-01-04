import { createStackNavigator } from 'react-navigation-stack';
import { fromBottom } from 'react-navigation-transitions';

import SettingsScreen from './SettingsScreen';
import HomeSettingsScreen from './HomeSettingsScreen';
import ThemeSettingsScreen from './ThemeSettingsScreen';
import ColorSettingsScreen from './ColorSettingsScreen';

export const SettingsNavigator = createStackNavigator(
  {
    default: {
      screen: SettingsScreen,
      params: { path: 'settings' },
    },
    settings_home: {
      screen: HomeSettingsScreen,
      params: { path: 'settings/home' },
    },
    settings_theme: {
      screen: ThemeSettingsScreen,
      params: { path: 'settings/theme' },
    },
    settings_color: {
      screen: ColorSettingsScreen,
      params: { path: 'settings/color' },
    },
  },
  {
    initialRouteName: 'default',
    headerMode: 'none',
    transitionConfig: () => fromBottom(500),
  },
);
