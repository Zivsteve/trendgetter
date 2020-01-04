import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { timeAgo } from '../utils/NumberUtils';

interface Props {
  options: any;
  width: number;
  height: number;
}

export default class SnapchatStoryView extends Component<Props> {
  render() {
    const { options: prop, width, height } = this.props;
    const time = timeAgo(prop.timestampInSec * 1000);

    return (
      <View>
        <ImageBackground style={{ width: width, height: height }} source={{ uri: prop.thumbnailUrl[0] }} />

        <LinearGradient
          style={{ position: 'absolute', bottom: 0, width: 300, height: 100 }}
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
        />
        <View style={{ position: 'absolute', bottom: 0, padding: 10 }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>{prop.storyTitle}</Text>
          <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 11 }}>{time}</Text>
        </View>
      </View>
    );
  }
}
