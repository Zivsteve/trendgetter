import { NavigationContainerRef, NavigationState, Route, CommonActions, PartialState } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/routers';
import { Linking, Platform, BackHandler } from 'react-native';

let _navigator: NavigationContainerRef;
let isNavigating = false;

export function getNavigator() {
  return _navigator;
}

export function setTopLevelNavigator(navigatorRef: NavigationContainerRef) {
  _navigator = navigatorRef;
  if (Platform.OS === 'web') {
    const onload = () => {
      isNavigating = true;
      navigate(location.pathname);
    };
    window.onpopstate = () => onload();
    window.onload = () => onload();
  }
  BackHandler.addEventListener('hardwareBackPress', () => {
    goBack();
    return true;
  });
}

export function onNavigationStateChange(state: NavigationState | undefined) {
  if (!state) {
    return;
  }
  if (Platform.OS === 'web' && !isNavigating) {
    const path = getActiveRouteState(state)?.name || '/';
    console.log(path);
    history.pushState({}, path, path);
  }
  isNavigating = false;
}

export function toggleDrawer() {
  if (!_navigator) {
    return;
  }
  _navigator.dispatch(DrawerActions.toggleDrawer());
}

export function navigate(routeName = '/', params?: any) {
  if (!_navigator) {
    return;
  }
  const screens = routeName.split('/')[1];
  if (screens.length > 2) {
    _navigator.dispatch(CommonActions.navigate({ name: `/${routeName.split('/')[1]}` }));
  }
  _navigator.dispatch(CommonActions.navigate({ name: routeName, params: params }));
}

export function goBack() {
  if (!_navigator) {
    return;
  }
  _navigator.dispatch(CommonActions.goBack());
}

export function getActiveRouteState(route: NavigationState) {
  let rte: any = route.routes[0];
  while (rte) {
    if (!rte?.state?.routes?.length) {
      return rte;
    }
    rte = rte.state?.routes[1] || rte.state?.routes[0];
  }
}

export function openURL(url: string) {
  Linking.openURL(url);
}
