import { NavigationActions, NavigationContainerComponent, NavigationState } from 'react-navigation';
import { Linking, Platform } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';

let _navigator: NavigationContainerComponent;
let hasLoaded = false;
let isNavigating = false;

export function getNavigator() {
  return _navigator;
}

export function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
  _navigator = navigatorRef;
  if (Platform.OS === 'web') {
    const onload = () => {
      isNavigating = true;
      navigate(
        location.pathname
          .replace('/', '')
          .replace('/', '_')
          .replace(/\//g, '') || undefined,
      );
    };
    window.onpopstate = () => onload();
    if (!hasLoaded) {
      onload();
      hasLoaded = true;
    }
  }
}

export function onNavigationStateChange(state: NavigationState) {
  if (Platform.OS === 'web' && !isNavigating) {
    const route: NavigationState = getActiveRouteState(state);
    const path = route.params?.path || route.key;
    if (path === 'home') {
      history.replaceState({}, '', '/');
      return;
    }
    console.log(path);
    history.pushState({}, path, `/${path}`);
  }
  isNavigating = false;
}

export function toggleDrawer() {
  _navigator.dispatch(DrawerActions.toggleDrawer());
}

export function navigate(routeName = 'home', params?: any) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

export function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

export function getActiveRouteState(route: NavigationState): NavigationState {
  if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
    return route;
  }
  const childActiveRoute = route.routes[route.index] as NavigationState;
  return getActiveRouteState(childActiveRoute);
}

export function openURL(url: string) {
  Linking.openURL(url);
}
