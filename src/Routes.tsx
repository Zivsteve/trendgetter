import React, { ComponentType } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { setTopLevelNavigator, onNavigationStateChange } from './services/NavigationService';

import HomeScreen from './navigation/HomeScreen';
import YoutubeScreen from './navigation/YoutubeScreen';
import GoogleScreen from './navigation/GoogleScreen';
import TwitterScreen from './navigation/TwitterScreen';
import GithubScreen from './navigation/GithubScreen';
import SnapchatScreen from './navigation/SnapchatScreen';
import RedditScreen from './navigation/RedditScreen';
import SnapchatStoryScreen from './navigation/SnapchatStoryScreen';
import AboutScreen from './navigation/AboutScreen';
import SettingsScreen from './navigation/settings/SettingsScreen';
import HomeSettingsScreen from './navigation/settings/HomeSettingsScreen';
import ThemeSettingsScreen from './navigation/settings/ThemeSettingsScreen';
import ColorSettingsScreen from './navigation/settings/ColorSettingsScreen';
import { Platform } from 'react-native';

/** */
export type Screen = ComponentType<any>;

const Stack = createStackNavigator();

/**
 *
 */
function Routes() {
  return (
    <NavigationContainer
      ref={(navigatorRef: NavigationContainerRef) => setTopLevelNavigator(navigatorRef)}
      onStateChange={(p) => onNavigationStateChange(p)}>
      <Stack.Navigator
        initialRouteName={Platform.OS === 'web' ? location.pathname : '/'}
        headerMode='none'
        screenOptions={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }}>
        <Stack.Screen name='/' component={HomeScreen as Screen} />
        <Stack.Screen name='/youtube' component={YoutubeScreen as Screen} />
        <Stack.Screen name='/google' component={GoogleScreen as Screen} />
        <Stack.Screen name='/twitter' component={TwitterScreen as Screen} />
        <Stack.Screen name='/reddit' component={RedditScreen as Screen} />
        <Stack.Screen name='/github' component={GithubScreen as Screen} />
        <Stack.Screen name='/snapchat' component={SnapchatScreen as Screen} />
        <Stack.Screen
          name='/snapchat/story'
          component={SnapchatStoryScreen as Screen}
          options={{ gestureEnabled: true }}
        />
        <Stack.Screen name='/settings' component={SettingsScreen as Screen} />
        <Stack.Screen name='/settings/home' component={HomeSettingsScreen as Screen} />
        <Stack.Screen name='/settings/theme' component={ThemeSettingsScreen as Screen} />
        <Stack.Screen name='/settings/colors' component={ColorSettingsScreen as Screen} />
        <Stack.Screen name='/about' component={AboutScreen as Screen} options={{ gestureEnabled: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
