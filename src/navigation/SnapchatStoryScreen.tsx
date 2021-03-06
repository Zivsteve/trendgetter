import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView, TouchableHighlight, Image } from 'react-native';
import Video from '../components/Video';
import Navbar from '../components/Navbar';
import ContentService from '../services/ContentService';
import { Appbar, ActivityIndicator } from 'react-native-paper';
import { timeAgo } from '../utils/NumberUtils';
import { Route } from '@react-navigation/native';

interface Props {
  route: Route<string>;
}

/**
 *
 */
class SnapchatStoryScreen extends Component<Props> {
  state = {
    title: '',
    snaps: [] as any[],
    index: 0,
    loading: true,
    paused: true,
    muted: true,
  };

  componentDidMount() {
    this._refresh();
  }

  /**
   *
   */
  async _refresh() {
    const { route } = this.props;
    const { options } = route.params as any;
    const playlist = await ContentService.getSnapchatPlaylist(options.id);
    this.setState({ title: playlist.title || playlist.id, snaps: playlist.elements, paused: false });
  }

  render() {
    const window = Dimensions.get('window');
    const storyHeight = window.height;
    const storyWidth = window.width;
    const { route } = this.props;
    const { options } = route.params as any;
    const time = timeAgo(options.timestamp);
    const { title, snaps, index, loading, paused, muted } = this.state;
    const snap = snaps[index];
    const file = snap?.snapInfo.streamingMediaInfo.mediaWithOverlayUrl || snap?.snapInfo.streamingMediaInfo.mediaUrl;
    const filePrefix = snap?.snapInfo.streamingMediaInfo.prefixUrl;
    const snapUrl = `${filePrefix}${file}`;

    return (
      <View style={{ height: '100%', backgroundColor: '#000' }}>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.05)' />

        <ScrollView style={{ height: window.height }} showsVerticalScrollIndicator={false}>
          <Navbar
            barStyle={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
            title={title}
            subtitle={time}
            underStatusBar>
            <Appbar.Action icon='snapchat' />
          </Navbar>

          {loading && (
            <ActivityIndicator
              size='large'
              style={{
                position: 'absolute',
                top: (storyHeight - 40) / 2,
                left: (storyWidth - 40) / 2,
                width: 40,
                height: 40,
              }}
            />
          )}

          {snaps.length > 0 && snapUrl && (
            <TouchableHighlight
              style={{ width: storyWidth, height: storyHeight, alignItems: 'center' }}
              onPress={() => this.next()}>
              <View>
                <Video
                  style={{ width: storyWidth, height: storyHeight }}
                  resizeMode='cover'
                  source={{ uri: snapUrl }}
                  onEnd={() => this.next()}
                  onLoadStart={() => this.setState({ loading: true })}
                  onLoad={() => this.setState({ loading: false })}
                  paused={paused}
                  muted={muted}
                />
              </View>
            </TouchableHighlight>
          )}

          {snaps.length > 1 && (
            <View style={{ position: 'absolute', bottom: 50, flexDirection: 'row' }}>
              {[...Array(snaps.length)].map((v, key) => (
                <View
                  key={key}
                  style={{
                    width: storyWidth / snaps.length - 5,
                    marginHorizontal: 2.5,
                    height: 5,
                    backgroundColor: '#eee',
                    borderRadius: 10,
                    opacity: key === index ? 1 : 0.5,
                  }}
                />
              ))}
            </View>
          )}

          <Appbar
            style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.1)', elevation: 0 }}
            dark={true}>
            <Appbar.Action icon={paused ? 'play' : 'pause'} size={36} onPress={() => this.togglePaused()} />
            <Appbar.Action icon={muted ? 'volume-off' : 'volume-high'} size={36} onPress={() => this.toggleMuted()} />
          </Appbar>
        </ScrollView>
      </View>
    );
  }

  /**
   *
   */
  public next() {
    const { snaps, index } = this.state;
    let newIndex = index + 1;
    if (index >= snaps.length - 1) {
      newIndex = 0;
    }
    this.setState({ index: newIndex });
  }

  /**
   *
   */
  public prev() {
    this.setState({ index: this.state.index - 1 });
  }

  /**
   *
   */
  public togglePaused() {
    this.setState({ paused: !this.state.paused });
  }

  /**
   *
   */
  public toggleMuted() {
    this.setState({ muted: !this.state.muted });
  }
}

export default SnapchatStoryScreen;
