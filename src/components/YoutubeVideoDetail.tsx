import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, TouchableRipple, Title, withTheme, Theme } from 'react-native-paper';
import { formatNumber } from '../utils/NumberUtils';
import IconBadge from './IconBadge';
import { openURL } from '../services/NavigationService';

interface Props {
  options: any;
  theme: Theme;
}

/**
 * 
 */
class YoutubeVideoDetail extends Component<Props> {
  render() {
    const { options: prop, theme } = this.props;
    const { colors } = theme;

    return (
      <Card style={{ width: '100%', borderRadius: 10, overflow: 'hidden' }}>
        <TouchableRipple onPress={() => openURL(`https://youtu.be/${prop.id}`)} rippleColor={colors.onSurface}>
          <View>
            <View style={{ padding: 5 }}>
              <Title style={{ color: colors.text, fontSize: 14, lineHeight: 15 }} numberOfLines={1}>
                {prop?.snippet?.title || 'Video Title'}
              </Title>
            </View>
            <Card.Cover style={{ width: '100%' }} source={{ uri: prop?.snippet?.thumbnails?.high?.url }} />
            <View style={{ flexDirection: 'row' }}>
              <IconBadge textStyle={{ color: colors.text, fontSize: 12 }} icon='eye' iconColor={colors.text}>
                {formatNumber(prop?.statistics?.viewCount || 0)}
              </IconBadge>
              <IconBadge textStyle={{ color: colors.text, fontSize: 12 }} icon='thumb-up' iconColor={colors.text}>
                {formatNumber(prop?.statistics?.likeCount || 0)}
              </IconBadge>
              <IconBadge textStyle={{ color: colors.text, fontSize: 12 }} icon='thumb-down' iconColor={colors.text}>
                {formatNumber(prop?.statistics?.dislikeCount || 0)}
              </IconBadge>
            </View>
          </View>
        </TouchableRipple>
      </Card>
    );
  }
}

export default withTheme(YoutubeVideoDetail);
