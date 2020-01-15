import { NavigationContainerRef, NavigationState, CommonActions } from '@react-navigation/native';
import { Linking, Platform, BackHandler, ToastAndroid } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

let navigator: NavigationContainerRef;
let isNavigating = false;
let backPressed = false;
let mainDrawer: DrawerLayout | null;
let mainDrawerOpened = false;

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
    if (!mainDrawerOpened && !navigator?.canGoBack()) {
      if (backPressed) {
        return false;
      }
      backPressed = true;
      ToastAndroid.show('Double tap back to exit.', ToastAndroid.SHORT);
      setTimeout(() => (backPressed = false), 500);
    }
    goBack();
    return true;
  });
}

/**
 *
 * @param drawer
 */
export function setMainDrawer(drawer: DrawerLayout | null) {
  mainDrawer = drawer;
}

/**
 *
 */
export function getMainDrawer() {
  return mainDrawer;
}

/**
 *
 * @param open
 */
export function setMainDrawerState(open: boolean) {
  mainDrawerOpened = open;
}

/**
 *
 */
export function openMainDrawer() {
  mainDrawer?.openDrawer();
}

/**
 *
 */
export function closeMainDrawer() {
  mainDrawer?.closeDrawer();
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
 * @param routeName
 * @param params
 */
export function navigate(routeName = '/', params?: any) {
  if (!navigator) {
    return;
  }
  mainDrawer?.closeDrawer();
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
  if (mainDrawerOpened || !navigator?.canGoBack()) {
    mainDrawer?.closeDrawer();
    return;
  }
  navigator.goBack();
}

/**
 *
 * @param route
 */
export function getActiveRouteState(route: NavigationState) {
  let rte: any = route.routes.slice(-1)[0];
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
