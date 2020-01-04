import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerContentComponentProps } from 'react-navigation-drawer';
import { createAppContainer, NavigationContainerComponent } from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';
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
import { SettingsNavigator } from './navigation/settings/Routes';

type DrawerContentType =
  | React.ComponentClass<DrawerContentComponentProps, any>
  | React.FunctionComponent<DrawerContentComponentProps>;

const StackNavigator = createStackNavigator(
  {
    home: {
      screen: HomeScreen,
      params: { path: 'home' },
    },
    youtube: {
      screen: YoutubeScreen,
      params: { path: 'youtube' },
    },
    google: {
      screen: GoogleScreen,
      params: { path: 'google' },
    },
    twitter: {
      screen: TwitterScreen,
      params: { path: 'twitter' },
    },
    reddit: {
      screen: RedditScreen,
      params: { path: 'reddit' },
    },
    github: {
      screen: GithubScreen,
      params: { path: 'github' },
    },
    snapchat: {
      screen: SnapchatScreen,
      params: { path: 'snapchat' },
    },
    story: {
      screen: SnapchatStoryScreen,
      params: { path: 'snapchat/story' },
    },
    settings: SettingsNavigator,
    about: {
      screen: AboutScreen,
      params: { path: 'about' },
    },
  },
  {
    initialRouteName: 'home',
    headerMode: 'none',
    transitionConfig: () => fromRight(500),
  },
);

const DrawerNavigator = createDrawerNavigator(
  {
    default: StackNavigator,
  },
  {
    initialRouteName: 'default',
    contentComponent: DrawerContent as DrawerContentType,
    drawerBackgroundColor: 'transparent',
  },
);

const Container = createAppContainer(DrawerNavigator);

export default function Routes() {
  return (
    <Container
      ref={(navigatorRef: NavigationContainerComponent) => setTopLevelNavigator(navigatorRef)}
      onNavigationStateChange={(p) => onNavigationStateChange(p)}
    />
  );
}
