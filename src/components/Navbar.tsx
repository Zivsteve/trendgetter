import React from 'react';
import { Appbar } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { ViewStyle, StyleProp, Platform, TextStyle } from 'react-native';
import { goBack } from '../services/NavigationService';

interface Props {
  title?: string;
  subtitle?: string;
  icon?: string;
  action?: () => void;
  barStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
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

export default Navbar;
