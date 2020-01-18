import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView, FlatList } from 'react-native';
import ContentService from '../services/ContentService';
import { Theme, withTheme, Button } from 'react-native-paper';
import RedditPostDetail from '../components/RedditPostDetail';
import TrendingTitle from '../components/TrendingTitle';
import Navbar from '../components/Navbar';
import NavigationBar from '../components/NavigationBar';
import { savedColors, MAX_CONTENT_WIDTH } from '../Config';
import { RefreshControl } from '../components/RefreshControl';

interface Props {
  theme: Theme;
}

/**
 *
 */
class RedditScreen extends Component<Props> {
  private _themeColor = savedColors.reddit;
  state = {
    posts: [] as any[],
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
    const posts = await ContentService.getRedditPosts();
    this.setState({ posts: posts, refreshing: false });
  }

  render() {
    const window = Dimensions.get('window');
    const postWidth = Math.min(window.width, MAX_CONTENT_WIDTH);
    const { posts, refreshing } = this.state;
    const { theme } = this.props;
    const { colors } = theme;

    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.04)' />
        <NavigationBar dark={theme.dark} />

        <View style={{ height: '100%', backgroundColor: this._themeColor }}>
          <Navbar barStyle={{ backgroundColor: this._themeColor }} title='Reddit' underStatusBar />

          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              width: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: colors.background,
              minHeight: window.height,
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => this._refresh()}
                colors={[this._themeColor]}
                tintColor='#007afd'
              />
            }
            data={posts}
            ListHeaderComponent={() => <TrendingTitle icon='reddit' name='Reddit' />}
            keyExtractor={(item, index) => `${Math.random()}`}
            renderItem={({ item, index }) => (
              <View style={{ marginTop: 20 }}>
                <RedditPostDetail options={item} width={postWidth - 10} />
              </View>
            )}
          />
        </View>
      </>
    );
  }
}

export default withTheme(RedditScreen);
