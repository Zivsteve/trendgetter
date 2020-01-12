import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView, FlatList } from 'react-native';
import ContentService from '../services/ContentService';
import { Theme, withTheme } from 'react-native-paper';
import RedditPostDetail from '../components/RedditPostDetail';
import TrendingTitle from '../components/TrendingTitle';
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
    const { posts, refreshing } = this.state;
    const { theme } = this.props;
    const { colors } = theme;

    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.04)' />
        <NavigationBar dark={theme.dark} />

        <View style={{ height: '100%', backgroundColor: this._themeColor }}>
          <Navbar barStyle={{ backgroundColor: this._themeColor }} title='Reddit' underStatusBar />

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
                <TrendingTitle icon='reddit' name='Reddit' />

                <View style={{ marginTop: 20 }}>
                  {posts.map((item, index) => (
                    <RedditPostDetail key={index} options={item} width={window.width - 10} />
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

export default withTheme(RedditScreen);
