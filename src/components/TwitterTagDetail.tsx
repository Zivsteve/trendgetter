import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, TouchableRipple, Theme, withTheme } from 'react-native-paper';
import { formatNumber } from '../utils/NumberUtils';
import { openURL } from '../services/NavigationService';

interface Props {
  options: any;
  index: number;
  theme: Theme;
}

/**
 * 
 */
class TwitterTagDetail extends Component<Props> {
  render() {
    const { options: prop, index, theme } = this.props;
    const { colors } = theme;
    return (
      <TouchableRipple
        style={{ paddingHorizontal: 5, paddingVertical: 15, borderRadius: 10 }}
        rippleColor={colors.onSurface}
        onPress={() => openURL(prop.url)}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          <Text
            style={{
              width: 30,
              opacity: 0.7,
              marginRight: 5,
              fontSize: 18,
              alignSelf: 'center',
            }}>
            {index + 1}.
          </Text>
          <Text style={{ width: '70%', fontSize: 16, alignSelf: 'center' }} numberOfLines={1}>
            {prop.name || '#Hashtag'}
          </Text>
          <View style={{ marginLeft: 'auto' }}>
            <Text style={{ opacity: 0.95, fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>
              {formatNumber(prop.tweet_volume || '--')}
            </Text>
            <Text style={{ opacity: 0.8, fontSize: 13, textAlign: 'center' }}>Tweets</Text>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

export default withTheme(TwitterTagDetail);
