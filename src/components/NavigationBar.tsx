import React, { useCallback } from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useFocusEffect } from '@react-navigation/native';

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
  (changeNavigationBarColor as any)(color || '#00000000', !dark, true);
}

export default NavigationBar;
