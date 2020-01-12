import React, { Component } from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Title, Text, withTheme, Theme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getReadableDate } from '../utils/NumberUtils';

interface Props {
  icon: string;
  name: string;
  iconColor?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  theme: Theme;
}

/**
 *
 */
class TrendingTitle extends Component<Props> {
  render() {
    const { icon, name, iconColor, onPress, theme } = this.props;
    const date = getReadableDate();

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ alignItems: 'center', marginTop: 10, marginBottom: 15 }}
        activeOpacity={onPress ? 0.8 : 1}>
        <Icon style={{ marginBottom: 10 }} size={32} name={icon} color={iconColor || theme.colors.text} />
        <Title style={{ opacity: 0.8, fontSize: 20 }}>Trending on {name}</Title>
        <Text style={{ opacity: 0.3 }}>{date}</Text>
      </TouchableOpacity>
    );
  }
}

export default withTheme(TrendingTitle);
