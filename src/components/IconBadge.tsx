import React, { Component } from 'react';
import { StyleProp, ViewStyle, View, TextStyle } from 'react-native';
import { Text, Theme, withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';

interface Props {
  icon: string;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  theme: Theme;
}

class IconBadge extends Component<Props> {
  render() {
    const { icon, iconColor, children, textStyle, style, theme } = this.props;
    const { colors } = theme;

    return (
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            paddingVertical: 2,
            paddingHorizontal: 10,
            borderRadius: 100,
          },
          style,
        ]}>
        <Icon
          style={{ backgroundColor: 'transparent', marginRight: 5 }}
          color={iconColor || new Color(colors.text).fade(0.4).hex()}
          size={20}
          name={icon}
        />
        <Text
          style={[
            { color: new Color(colors.text).fade(0.5).hex(), fontSize: 14, alignSelf: 'center', fontWeight: 'bold' },
            textStyle,
          ]}>
          {children}
        </Text>
      </View>
    );
  }
}

export default withTheme(IconBadge);
