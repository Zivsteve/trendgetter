import React, { useCallback } from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
  color?: string;
  dark?: boolean;
}

function NavigationBar(props: Props) {
  useFocusEffect(
    useCallback(() => {
      const { color, dark } = props;
      changeNavigationBarColor(color || '#00000000', !dark, true);
      return () => {};
    }, []),
  );

  return null;
}

export default NavigationBar;
