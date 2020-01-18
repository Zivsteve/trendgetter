import React, { Component } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { StatusBar, View, Dimensions, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Button, withTheme, Theme } from 'react-native-paper';
import Carousel from '../components/Carousel';
import ContentService from '../services/ContentService';
import YoutubeVideoDetail from '../components/YoutubeVideoDetail';
import GoogleSearchDetail from '../components/GoogleSearchDetail';
import TrendingTitle from '../components/TrendingTitle';
import { getReadableDate } from '../utils/NumberUtils';
import { Svg, Circle } from 'react-native-svg';
import { navigate, setMainDrawerState, setMainDrawer, openMainDrawer } from '../services/NavigationService';
import Navbar from '../components/Navbar';
import SnapchatStoryView from '../components/SnapchatStoryView';
import TwitterTagDetail from '../components/TwitterTagDetail';
import NavigationBar from '../components/NavigationBar';
import { MAX_CONTENT_WIDTH, savedHomeLayout, savedColors } from '../Config';
import { RefreshControl } from '../components/RefreshControl';
import DrawerContent from './DrawerContent';
import DrawerLayout from '../components/DrawerLayout';
import { setThemeColor } from '../utils/WebUtils';

interface Props {
  theme: Theme;
}

/**
 *
 */
class HomeScreen extends Component<Props> {
  state = {
    layout: savedHomeLayout,
    youtubeVideos: [] as any[],
    googleSearches: [] as any[],
    twitterTags: [] as any[],
    snapchatStories: [] as any[],
    refreshing: false,
  };

  componentDidMount() {
    // Fix unloaded content flashing by adding a timeout of 1 ms.
    setTimeout(() => {
      Platform.OS !== 'web' && RNBootSplash.hide({ duration: 200 });
      setTimeout(() => setThemeColor(), 300); // [web] Update theme-color meta.
    }, 1);
    this._refresh();
  }

  /**
   *
   */
  async _refresh() {
    try {
      this.setState({ refreshing: true });
      const videos = await ContentService.getYoutubeVideos();
      const searches = await ContentService.getGoogleSearches();
      const tags = await ContentService.getTwitterTags();
      const stories = await ContentService.getSnapchatStories();
      this.setState({
        layout: savedHomeLayout,
        youtubeVideos: videos.slice(0, 5),
        googleSearches: searches.slice(0, 5),
        twitterTags: tags.slice(0, 5),
        snapchatStories: stories.slice(0, 5),
        refreshing: false,
      });
    } catch (err) {}
  }

  render() {
    const windowDims = Dimensions.get('window');
    const { layout, refreshing } = this.state;
    const { theme } = this.props;
    const { colors } = theme;
    const date = getReadableDate();
    const circleColor = theme.dark ? '#fff' : '#000';
    return (
      <>
        <StatusBar
          translucent
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor='rgba(0,0,0,0.05)'
        />
        <NavigationBar dark={theme.dark} />

        <DrawerLayout
          ref={(drawer) => setMainDrawer(drawer as DrawerLayout)}
          drawerWidth={280}
          drawerBackgroundColor='#fff'
          onDrawerOpen={() => setMainDrawerState(true)}
          onDrawerClose={() => setMainDrawerState(false)}
          renderNavigationView={() => <DrawerContent />}>
          <ScrollView
            style={{ backgroundColor: colors.background }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._refresh()}
                colors={[theme.colors.primary]}
                tintColor='#007afd'
              />
            }>
            <Navbar icon='sort-variant' title={date} action={() => openMainDrawer()} underStatusBar dark={theme.dark} />

            <View style={{ width: '100%', marginBottom: 200, alignSelf: 'center' }}>
              {layout.map((name, index) => (
                <View key={index}>
                  {name === 'youtube' && this._renderYoutube()}
                  {name === 'google' && this._renderGoogle()}
                  {name === 'twitter' && this._renderTwitter()}
                  {name === 'snapchat' && this._renderSnapchat()}
                </View>
              ))}
            </View>

            <View
              style={{
                position: 'absolute',
                top: 0,
                left: '-40%',
                zIndex: -1,
              }}
              pointerEvents='none'>
              <Svg width={windowDims.width * 1.8} height={windowDims.height} viewBox='0 0 800 800'>
                <Circle fill={circleColor} opacity='0.010' cx='400' cy='400' r='400' />
                <Circle fill={circleColor} opacity='0.015' cx='400' cy='400' r='300' />
                <Circle fill={circleColor} opacity='0.020' cx='400' cy='400' r='200' />
                <Circle fill={circleColor} opacity='0.030' cx='400' cy='400' r='100' />
              </Svg>
            </View>
          </ScrollView>
        </DrawerLayout>
      </>
    );
  }

  /**
   *
   */
  _renderYoutube() {
    const windowDims = Dimensions.get('window');
    const videoWidth = Math.min(windowDims.width * 0.8, 400);
    const { youtubeVideos } = this.state;

    return (
      <View style={{ height: 400, marginTop: 50 }}>
        <TrendingTitle
          icon='youtube'
          name='YouTube'
          iconColor={savedColors.youtube}
          onPress={() => navigate('/youtube')}
        />
        <Carousel
          sliderWidth={windowDims.width}
          itemWidth={videoWidth}
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={0.7}
          data={youtubeVideos}
          renderItem={({ item, index }) => <YoutubeVideoDetail key={index} options={item} />}
        />
      </View>
    );
  }

  /**
   *
   */
  _renderGoogle() {
    const { googleSearches } = this.state;

    return (
      <View
        style={{
          alignSelf: 'center',
          width: '100%',
          maxWidth: MAX_CONTENT_WIDTH,
          minHeight: 300,
          marginHorizontal: 'auto',
          marginTop: 50,
        }}>
        <TrendingTitle icon='google' name='Google' iconColor={savedColors.google} onPress={() => navigate('/google')} />
        {googleSearches.map((item, index) => (
          <GoogleSearchDetail key={index} index={index} options={item} />
        ))}
        <Button style={{ width: 200, alignSelf: 'center' }} onPress={() => navigate('/google')}>
          More
        </Button>
      </View>
    );
  }

  /**
   *
   */
  _renderTwitter() {
    const { twitterTags } = this.state;

    return (
      <View
        style={{
          alignSelf: 'center',
          width: '100%',
          maxWidth: MAX_CONTENT_WIDTH,
          minHeight: 300,
          marginHorizontal: 'auto',
          marginTop: 50,
        }}>
        <TrendingTitle
          icon='twitter'
          name='Twitter'
          iconColor={savedColors.twitter}
          onPress={() => navigate('/twitter')}
        />
        {twitterTags.map((item, index) => (
          <TwitterTagDetail key={index} index={index} options={item} />
        ))}
        <Button style={{ width: 200, alignSelf: 'center' }} onPress={() => navigate('/twitter')}>
          More
        </Button>
      </View>
    );
  }

  /**
   *
   */
  _renderSnapchat() {
    const windowDims = Dimensions.get('window');
    const storyWidth = Math.min(windowDims.width / 2, MAX_CONTENT_WIDTH / 2);
    const { snapchatStories } = this.state;

    return (
      <View style={{ minHeight: 300, marginTop: 50 }}>
        <TrendingTitle
          icon='snapchat'
          name='Snapchat'
          iconColor={savedColors.snapchat}
          onPress={() => navigate('/snapchat')}
        />
        <Carousel
          sliderWidth={windowDims.width}
          itemWidth={storyWidth}
          data={snapchatStories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={{ width: storyWidth, borderRadius: 20, overflow: 'hidden' }}
              onPress={() => navigate('/snapchat/story', { options: item })}
              activeOpacity={0.6}>
              <SnapchatStoryView options={item} width={storyWidth} height={storyWidth * 2} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default withTheme(HomeScreen);
