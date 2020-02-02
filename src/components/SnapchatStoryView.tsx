import React, { Component } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { timeAgo } from '../utils/NumberUtils';
import { navigate } from '../services/NavigationService';

interface Props {
  options: any;
  width: number;
  height: number;
}

/**
 *
 */
class SnapchatStoryView extends Component<Props> {
  render() {
    const { options: prop, width, height } = this.props;
    const time = timeAgo(prop.timestamp);

    return (
      <TouchableOpacity
        style={{ width: width }}
        onPress={() => navigate('/snapchat/story', { options: prop })}
        activeOpacity={0.6}>
        <View style={{ overflow: 'hidden' }}>
          <ImageBackground style={{ width: width, height: height }} source={{ uri: prop.thumb.url }} />

          <LinearGradient
            style={{ position: 'absolute', bottom: 0, width: 300, height: 100 }}
            colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          />
          <View style={{ position: 'absolute', bottom: 0, padding: 10 }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>{prop.title}</Text>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 11 }}>{time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SnapchatStoryView;
