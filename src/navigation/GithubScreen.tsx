import React, { Component } from 'react';
import { View, StatusBar, Dimensions, ScrollView } from 'react-native';
import ContentService from '../services/ContentService';
import GithubRepositoryDetail from '../components/GithubRepositoryDetail';
import TrendingTitle from '../components/TrendingTitle';
import Navbar from '../components/Navbar';
import { Theme, withTheme } from 'react-native-paper';
import NavigationBar from '../components/NavigationBar';
import { savedColors } from '../Config';
import { RefreshControl } from '../components/refresh-control';

const window = Dimensions.get('window');

interface Props {
  theme: Theme;
}

class GithubScreen extends Component<Props> {
  private _themeColor = savedColors.github;
  state = {
    reps: [],
    refreshing: false,
  };

  componentDidMount() {
    this._refresh();
  }

  async _refresh() {
    this.setState({ refreshing: true });
    const reps = await ContentService.getGithubRepositories();
    this.setState({ reps: reps, refreshing: false });
  }

  render() {
    const { refreshing, reps } = this.state;
    const { theme } = this.props;
    const { colors } = theme;
    const contentWidth = Math.min(window.width, 600);

    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.1)' />
        <NavigationBar dark={theme.dark} />

        <View style={{ height: '100%', backgroundColor: this._themeColor }}>
          <Navbar barStyle={{ backgroundColor: this._themeColor }} title='GitHub' underStatusBar />

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
              <View style={{ maxWidth: contentWidth }}>
                <TrendingTitle icon='github-circle' name='GitHub' />

                {reps.map((item, index) => (
                  <GithubRepositoryDetail key={index} options={item} />
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

export default withTheme(GithubScreen);
