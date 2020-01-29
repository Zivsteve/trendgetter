import React, { useCallback } from 'react';
import { NativeModules, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { NavigationBarColor } = NativeModules;

interface Props {
  color?: string;
  dark?: boolean;
}

/**
 *
 * @param props
 */
function NavigationBar(props: Props) {
  updateBar(props);
  useFocusEffect(
    useCallback(() => {
      updateBar(props);
      return () => {};
    }, []),
  );

  return null;
}

/**
 *
 * @param props
 */
function updateBar(props: Props) {
  const { color, dark } = props;
  changeNavigationBarColor(color || '#00000000', !dark, false);
}

function changeNavigationBarColor(color: string, light = false, animated = true) {
  if (Platform.OS === 'android') {
    NavigationBarColor.changeNavigationBarColor(color, light, animated);
  }
}

function hideNavigationBar() {
  if (Platform.OS === 'android') {
    return NavigationBarColor.HideNavigationBar();
  }
}

function showNavigationBar() {
  if (Platform.OS === 'android') {
    NavigationBarColor.ShowNavigationBar();
  }
}

export default NavigationBar;
export { changeNavigationBarColor, hideNavigationBar, showNavigationBar };
