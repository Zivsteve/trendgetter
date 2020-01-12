import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import ContentService from '../services/ContentService';
import { Theme, withTheme } from 'react-native-paper';
import SnapchatStoryView from '../components/SnapchatStoryView';
import TrendingTitle from '../components/TrendingTitle';
import Navbar from '../components/Navbar';
import { navigate } from '../services/NavigationService';
import NavigationBar from '../components/NavigationBar';
import { savedColors, MAX_CONTENT_WIDTH } from '../Config';
import { RefreshControl } from '../components/refresh-control';

const window = Dimensions.get('window');

interface Props {
  theme: Theme;
}

/**
 * 
 */
class SnapchatScreen extends Component<Props> {
  private _themeColor = savedColors.snapchat;
  state = {
    stories: [],
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
    const stories = await ContentService.getSnapchatStories();
    this.setState({ stories: stories, refreshing: false });
  }

  render() {
    const storyWidth = MAX_CONTENT_WIDTH / 2 - 10;
    const storyHeight = storyWidth * 2;
    const { stories, refreshing } = this.state;
    const { theme } = this.props;
    const { colors } = theme;

    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.04)' />
        <NavigationBar dark={theme.dark} />

        <View style={{ height: '100%', backgroundColor: this._themeColor }}>
          <Navbar barStyle={{ backgroundColor: this._themeColor }} title='Snapchat' underStatusBar />

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
              <View>
                <TrendingTitle icon='snapchat' name='Snapchat' />

                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: MAX_CONTENT_WIDTH,
                    alignSelf: 'center',
                    marginTop: 20,
                  }}>
                  {stories.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{ margin: 5, borderRadius: 10, overflow: 'hidden' }}
                      onPress={() => navigate('/snapchat/story', { options: item })}
                      activeOpacity={0.6}>
                      <SnapchatStoryView options={item} width={storyWidth} height={storyHeight} />
                    </TouchableOpacity>
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

export default withTheme(SnapchatScreen);
