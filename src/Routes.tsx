import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainerRef, NavigationContainer, RouteProp } from '@react-navigation/native';
import { setTopLevelNavigator, onNavigationStateChange } from './services/NavigationService';

import DrawerContent from './navigation/DrawerContent';
import BlankScreen from './navigation/BlankScreen';
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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer
      ref={(navigatorRef: NavigationContainerRef) => setTopLevelNavigator(navigatorRef)}
      onStateChange={(p) => onNavigationStateChange(p)}>
      <Drawer.Navigator initialRouteName='/' drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name='/'
          component={() => (
            <Stack.Navigator
              initialRouteName='home'
              headerMode='none'
              screenOptions={{ gestureEnabled: false, ...TransitionPresets.SlideFromRightIOS }}>
              <Stack.Screen name='/' component={HomeScreen} />
              <Stack.Screen name='/youtube' component={YoutubeScreen} />
              <Stack.Screen name='/google' component={GoogleScreen} />
              <Stack.Screen name='/twitter' component={TwitterScreen} />
              <Stack.Screen name='/reddit' component={RedditScreen} />
              <Stack.Screen name='/github' component={GithubScreen} />
              <Stack.Screen name='/snapchat' component={SnapchatScreen} />
              <Stack.Screen
                name='/snapchat/story'
                component={SnapchatStoryScreen}
                options={SnapchatStoryScreen.navigationOptions}
              />
              <Stack.Screen name='/settings' component={SettingsRoutes} />
              <Stack.Screen name='/about' component={AboutScreen} options={AboutScreen.navigationOptions} />
            </Stack.Navigator>
          )}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
