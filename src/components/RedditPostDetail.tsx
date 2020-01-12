import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { TouchableRipple, Card, Text, Theme, withTheme } from 'react-native-paper';
import { isValidImage } from '../utils/ImageUtils';
import { formatNumber, timeAgo } from '../utils/NumberUtils';
import IconBadge from './IconBadge';
import { openURL } from '../services/NavigationService';
import Video from '../components/Video';

interface Props {
  options: any;
  width: number;
  theme: Theme;
}

class RedditPostDetail extends Component<Props> {
  render() {
    const { options: prop, width: imageWidth, theme } = this.props;
    const { colors } = theme;
    const data = prop?.data;
    const imageScale = data?.thumbnail_height / data?.thumbnail_width || 0;
    const imageHeight = imageWidth * imageScale;
    const isVideo = data?.is_video;
    const blur = data?.over_18 || data?.spoiler;

    return (
      <Card style={{ width: imageWidth, marginBottom: 10, borderRadius: 10, overflow: 'hidden', maxWidth: 500 }}>
        <TouchableRipple
          style={{ borderRadius: 10 }}
          onPress={() => openURL(`https://www.reddit.com${data?.permalink}`)}
          rippleColor='rgba(0, 0, 0, 0.2)'>
          <View>
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', padding: 5 }}>
              {isValidImage(data.sr_detail.icon_img) && (
                <Image
                  style={{ width: 30, height: 30, borderRadius: 10, marginTop: 5 }}
                  source={{ uri: data.sr_detail.icon_img }}
                />
              )}
              <View style={{ marginLeft: 5 }}>
                <Text style={{ width: '100%', color: colors.text, opacity: 0.8, textAlign: 'left' }}>
                  r/{data?.subreddit}
                </Text>
                <Text style={{ width: '100%', color: colors.text, opacity: 0.5, textAlign: 'left', fontSize: 12 }}>
                  by u/{data?.author} • {timeAgo(data?.created_utc * 1000)}
                </Text>
              </View>
            </View>

            <Text style={{ width: '100%', color: colors.text, opacity: 0.8, padding: 10, textAlign: 'left' }}>
              {data?.title}
            </Text>
            {isValidImage(prop.data.url) && (
              <Image
                resizeMode='contain'
                style={{ width: imageWidth, height: imageHeight, borderRadius: 10 }}
                source={{ uri: prop.data.url }}
                blurRadius={blur ? 20 : 0}
              />
            )}
          </View>
        </TouchableRipple>

        {isVideo && (
          <View style={{ width: '100%', height: imageHeight }}>
            <Video
              style={{ width: '100%', height: '100%' }}
              resizeMode='cover'
              source={{ uri: data?.secure_media?.reddit_video?.hls_url }}
              repeat
            />
          </View>
        )}

        <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap-reverse' }}>
          <ScrollView horizontal style={{ maxWidth: 250 }}>
            {data?.all_awardings.map((item: any, key: number) => (
              <View key={key} style={{ flexDirection: 'row', flexWrap: 'nowrap', marginLeft: 5, alignItems: 'center' }}>
                <Image style={{ width: 15, height: 15 }} source={{ uri: item?.icon_url }} />
                <Text style={{ fontSize: 12, color: colors.text, opacity: 0.8, marginLeft: 2 }}>{item?.count}</Text>
              </View>
            ))}
          </ScrollView>

          <IconBadge style={{ marginLeft: 'auto' }} textStyle={{ color: '#bbb' }} icon='comment' iconColor='#bbb'>
            {formatNumber(data?.num_comments)}
          </IconBadge>
          <IconBadge
            style={{ marginLeft: 'auto' }}
            textStyle={{ color: '#ff3f18' }}
            icon='arrow-up-bold'
            iconColor='#ff3f18'>
            {formatNumber(data?.ups)}
          </IconBadge>
        </View>
      </Card>
    );
  }
}

export default withTheme(RedditPostDetail);
