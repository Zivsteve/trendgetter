import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView, TouchableHighlight, Image } from 'react-native';
import Video from '../components/Video';
import Navbar from '../components/Navbar';
import ContentService from '../services/ContentService';
import { Appbar, ActivityIndicator } from 'react-native-paper';
import { timeAgo } from '../utils/NumberUtils';

const window = Dimensions.get('window');

interface Props {
  navigation: any;
}

export default class SnapchatStoryScreen extends Component<Props> {
  static navigationOptions = {
    gesturesEnabled: true,
  };
  state = {
    title: '',
    snaps: [] as any[],
    index: 0,
    loading: true,
    paused: false,
    muted: true,
  };

  componentDidMount() {
    this._refresh();
  }

  async _refresh() {
    const { navigation } = this.props;
    const { userName } = navigation.getParam('options', {});
    const story = await ContentService.getSnapchatStory(userName);
    this.setState({ title: story.metadata?.title || story.id, snaps: story.snaps });
  }

  render() {
    const storyHeight = window.height;
    const storyWidth = window.width;
    const { navigation } = this.props;
    const { timestampInSec } = navigation.getParam('options', {});
    const time = timeAgo(timestampInSec * 1000);
    const { title, snaps, index, loading, paused, muted } = this.state;
    const snap = snaps[index];

    return (
      <View style={{ height: '100%', backgroundColor: '#000' }}>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.2)' />

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

          {snaps.length > 0 && snap?.media?.mediaUrl && (
            <TouchableHighlight
              style={{ width: storyWidth, height: storyHeight, alignItems: 'center' }}
              onPress={() => this.next()}>
              <View>
                <Video
                  style={{ width: storyWidth, height: storyHeight }}
                  resizeMode='cover'
                  source={{ uri: snap?.media?.mediaUrl }}
                  onEnd={() => this.next()}
                  onLoadStart={() => this.setState({ loading: true })}
                  onLoad={() => this.setState({ loading: false })}
                  paused={paused}
                  muted={muted}
                />
                <Image source={{ uri: snap?.overlayImage?.mediaUrl }} />
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

  public next() {
    const { snaps, index } = this.state;
    let newIndex = index + 1;
    if (index >= snaps.length - 1) {
      newIndex = 0;
    }
    this.setState({ index: newIndex });
  }

  public prev() {
    this.setState({ index: this.state.index - 1 });
  }

  public togglePaused() {
    this.setState({ paused: !this.state.paused });
  }

  public toggleMuted() {
    this.setState({ muted: !this.state.muted });
  }
}
