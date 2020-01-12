import { NavigationContainerRef, NavigationState, Route, CommonActions, PartialState } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/routers';
import { Linking, Platform, BackHandler } from 'react-native';

let navigator: NavigationContainerRef;
let isNavigating = false;

/**
 *
 */
export function getNavigator() {
  return navigator;
}

/**
 *
 * @param navigatorRef
 */
export function setTopLevelNavigator(navigatorRef: NavigationContainerRef) {
  navigator = navigatorRef;
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

/**
 *
 * @param state
 */
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

/**
 *
 */
export function toggleDrawer() {
  if (!navigator) {
    return;
  }
  navigator.dispatch(DrawerActions.toggleDrawer());
}

/**
 *
 * @param routeName
 * @param params
 */
export function navigate(routeName = '/', params?: any) {
  if (!navigator) {
    return;
  }
  const screens = routeName.split('/')[1];
  if (screens.length > 2) {
    navigator.dispatch(CommonActions.navigate({ name: `/${routeName.split('/')[1]}` }));
  }
  navigator.dispatch(CommonActions.navigate({ name: routeName, params: params }));
}

/**
 *
 */
export function goBack() {
  if (!navigator) {
    return;
  }
  navigator.dispatch(CommonActions.goBack());
}

/**
 *
 * @param route
 */
export function getActiveRouteState(route: NavigationState) {
  let rte: any = route.routes[0];
  while (rte) {
    if (!rte?.state?.routes?.length) {
      return rte;
    }
    rte = rte.state?.routes[1] || rte.state?.routes[0];
  }
}

/**
 *
 * @param url
 */
export function openURL(url: string) {
  Linking.openURL(url);
}
