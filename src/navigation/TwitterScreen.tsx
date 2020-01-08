import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView, FlatList } from 'react-native';
import ContentService from '../services/ContentService';
import TwitterTagDetail from '../components/TwitterTagDetail';
import TrendingTitle from '../components/TrendingTitle';
import Navbar from '../components/Navbar';
import { Theme, withTheme } from 'react-native-paper';
import NavigationBar from '../components/NavigationBar';
import { savedColors, MAX_CONTENT_WIDTH } from '../Config';
import { RefreshControl } from '../components/refresh-control';

const window = Dimensions.get('window');

interface Props {
  theme: Theme;
}

class TwitterScreen extends Component<Props> {
  private _themeColor = savedColors.twitter;
  state = {
    tags: [] as any[],
    refreshing: false,
  };

  componentDidMount() {
    this._refresh();
  }

  async _refresh() {
    this.setState({ refreshing: true });
    const tags = await ContentService.getTwitterTags();
    this.setState({ tags: tags, refreshing: false });
  }

  render() {
    const { tags, refreshing } = this.state;
    const { theme } = this.props;
    const { colors } = theme;

    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.04)' />
        <NavigationBar dark={theme.dark} />

        <View style={{ height: '100%', backgroundColor: this._themeColor }}>
          <Navbar barStyle={{ backgroundColor: this._themeColor }} title='Twitter' underStatusBar />

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
              <View style={{ width: '100%' }}>
                <TrendingTitle icon='twitter' name='Twitter' />

                <View style={{ width: MAX_CONTENT_WIDTH, marginTop: 20, alignSelf: 'center' }}>
                  {tags.map((item, index) => (
                    <TwitterTagDetail key={index} index={index} options={item} />
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

export default withTheme(TwitterScreen);
