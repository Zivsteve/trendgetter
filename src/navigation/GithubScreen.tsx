import React, { Component } from 'react';
import { View, StatusBar, Dimensions, RefreshControl, ScrollView, FlatList } from 'react-native';
import ContentService from '../services/ContentService';
import GithubRepositoryDetail from '../components/GithubRepositoryDetail';
import TrendingTitle from '../components/TrendingTitle';
import Navbar from '../components/Navbar';
import { Theme, withTheme } from 'react-native-paper';
import NavigationBar from '../components/NavigationBar';
import { savedColors } from '../Config';

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
                colors={['#007afd', 'blue', 'yellow']}
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

                <FlatList
                  data={reps}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={({ item }) => <GithubRepositoryDetail options={item} />}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

export default withTheme(GithubScreen);
