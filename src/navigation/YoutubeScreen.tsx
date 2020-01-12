import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView, FlatList } from 'react-native';
import ContentService from '../services/ContentService';
import { Theme, withTheme } from 'react-native-paper';
import TrendingTitle from '../components/TrendingTitle';
import YoutubeVideoDetail from '../components/YoutubeVideoDetail';
import Navbar from '../components/Navbar';
import NavigationBar from '../components/NavigationBar';
import { savedColors } from '../Config';
import { RefreshControl } from '../components/refresh-control';

const window = Dimensions.get('window');

interface Props {
  theme: Theme;
}

/**
 *
 */
class YoutubeScreen extends Component<Props> {
  private _themeColor = savedColors.youtube;
  state = {
    videos: [] as any[],
    refreshing: false,
  };

  componentDidMount() {
    this._refresh();
  }

  /**
   *
   */
  async _refresh() {
    this.setState({ refreshing: true });
    const videos = await ContentService.getYoutubeVideos();
    this.setState({ videos: videos, refreshing: false });
  }

  render() {
    const { videos, refreshing } = this.state;
    const { theme } = this.props;
    const { colors } = theme;
    const videoWidth = Math.min(window.width * 0.8, 600);

    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.04)' />
        <NavigationBar dark={theme.dark} />

        <View style={{ height: '100%', backgroundColor: this._themeColor }}>
          <Navbar barStyle={{ backgroundColor: this._themeColor }} title='YouTube' underStatusBar />

          <ScrollView
            style={{ backgroundColor: this._themeColor }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._refresh()}
                colors={[this._themeColor]}
                tintColor='#007afd'
              />
            }>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: colors.background,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                minHeight: window.height,
                paddingBottom: 100,
              }}>
              <View style={{ alignItems: 'center' }}>
                <TrendingTitle icon='youtube' name='YouTube' />

                <View style={{ marginTop: 20 }}>
                  {videos.map((item, index) => (
                    <View key={index} style={{ width: videoWidth, marginTop: 20 }}>
                      <YoutubeVideoDetail options={item} />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

export default withTheme(YoutubeScreen);
