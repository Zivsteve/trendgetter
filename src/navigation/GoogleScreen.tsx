import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView, FlatList } from 'react-native';
import ContentService from '../services/ContentService';
import { Theme, withTheme } from 'react-native-paper';
import TrendingTitle from '../components/TrendingTitle';
import GoogleSearchDetail from '../components/GoogleSearchDetail';
import Navbar from '../components/Navbar';
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
class GoogleScreen extends Component<Props> {
  private _themeColor = savedColors.google;
  state = {
    searches: [] as any[],
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
    const searches = await ContentService.getGoogleSearches();
    this.setState({ searches: searches, refreshing: false });
  }

  render() {
    const { searches, refreshing } = this.state;
    const { theme } = this.props;
    const { colors } = theme;

    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.04)' />
        <NavigationBar dark={theme.dark} />

        <View style={{ height: '100%', backgroundColor: this._themeColor }}>
          <Navbar barStyle={{ backgroundColor: this._themeColor }} title='Google Trends' underStatusBar />

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
                width: '100%',
                alignItems: 'center',
                backgroundColor: colors.background,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                minHeight: window.height,
                paddingBottom: 100,
              }}>
              <TrendingTitle icon='google' name='Google' />

              <View style={{ marginTop: 20, width: MAX_CONTENT_WIDTH, alignSelf: 'center' }}>
                {searches.map((item, index) => (
                  <GoogleSearchDetail key={index} index={index} options={item} />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

export default withTheme(GoogleScreen);
