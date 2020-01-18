import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { ViewStyle, Platform, TextStyle } from 'react-native';
import { goBack } from '../services/NavigationService';
import { setThemeColor } from '../utils/WebUtils';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
  title?: string;
  subtitle?: string;
  icon?: string;
  action?: () => void;
  barStyle?: ViewStyle;
  titleStyle?: TextStyle;
  underStatusBar?: boolean;
  dark?: boolean;
  children?: JSX.Element[] | JSX.Element;
}

/**
 *
 * @param props
 */
function Navbar(props: Props) {
  const insets = useSafeArea();
  const backIcon = Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left';

  if (props.underStatusBar) {
    updateBar(props);
    useFocusEffect(
      useCallback(() => {
        updateBar(props);
        return () => {};
      }, []),
    );
  }

  return (
    <Appbar
      style={[
        {
          width: '100%',
          marginTop: props.underStatusBar ? insets.top : 0,
          backgroundColor: 'transparent',
          elevation: 0,
          zIndex: 10,
        },
        props.barStyle,
      ]}
      dark={props.dark !== undefined ? props.dark : true}>
      <Appbar.Action icon={props.icon || backIcon} onPress={props.action || goBack} />
      <Appbar.Content titleStyle={props.titleStyle} title={props.title || ''} subtitle={props.subtitle || ''} />
      {props.children}
    </Appbar>
  );
}

function updateBar(props: Props) {
  setThemeColor(props.barStyle?.backgroundColor);
}

export default Navbar;
