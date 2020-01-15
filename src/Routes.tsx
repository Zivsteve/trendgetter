import React from 'react';
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
import SettingsRoutes from './navigation/settings/Routes';

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
        initialRouteName='/'
        headerMode='none'
        screenOptions={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }}>
        <Stack.Screen name='/' component={HomeScreen as any} />
        <Stack.Screen name='/youtube' component={YoutubeScreen as any} />
        <Stack.Screen name='/google' component={GoogleScreen as any} />
        <Stack.Screen name='/twitter' component={TwitterScreen as any} />
        <Stack.Screen name='/reddit' component={RedditScreen as any} />
        <Stack.Screen name='/github' component={GithubScreen as any} />
        <Stack.Screen name='/snapchat' component={SnapchatScreen as any} />
        <Stack.Screen
          name='/snapchat/story'
          component={SnapchatStoryScreen as any}
          options={SnapchatStoryScreen.navigationOptions}
        />
        <Stack.Screen name='/settings' component={SettingsRoutes} />
        <Stack.Screen name='/about' component={AboutScreen as any} options={AboutScreen.navigationOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
