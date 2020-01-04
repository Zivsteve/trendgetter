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

class GoogleSearchDetail extends Component<Props> {
  render() {
    const { options: prop, index } = this.props;

    return (
      <TouchableRipple
        style={{ paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10 }}
        onPress={() => openURL(prop?.url)}
        rippleColor='rgba(255, 255, 255, 0.2)'>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <Text
            style={{
              width: 30,
              opacity: 0.7,
              marginRight: 10,
              fontSize: 18,
              alignSelf: 'center',
            }}>
            {index + 1}.
          </Text>
          <Text style={{ width: '70%', fontSize: 15, alignSelf: 'center', fontWeight: 'bold' }}>
            {prop?.title?.query || 'Search Title'}
          </Text>
          <View style={{ marginLeft: 'auto' }}>
            <Text style={{ opacity: 0.95, fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>
              {formatNumber(prop?.searchCount || '--')}+
            </Text>
            <Text style={{ opacity: 0.8, fontSize: 13, textAlign: 'center' }}>Searches</Text>
          </View>
        </View>
      </TouchableRipple>
    );
  }
}

export default withTheme(GoogleSearchDetail);
