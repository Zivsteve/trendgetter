import React, { Component } from 'react';
import { StatusBar, Dimensions, View } from 'react-native';
import { Button, Appbar, Text, Theme, withTheme } from 'react-native-paper';
import SortableList from 'react-native-sortable-list';
import TrendingTitle from '../../components/TrendingTitle';
import Navbar from '../../components/Navbar';
import { saveHomeLayout, savedHomeLayout, defaultHomeLayout, MAX_CONTENT_WIDTH } from '../../Config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { goBack } from '../../services/NavigationService';

type LayoutDataType = { [index: string]: { icon: string; name: string } };

interface Props {
  theme: Theme;
}

/**
 *
 */
class HomeSettingsScreen extends Component<Props> {
  data: LayoutDataType = {
    youtube: { icon: 'youtube', name: 'YouTube' },
    google: { icon: 'google', name: 'Google' },
    twitter: { icon: 'twitter', name: 'Twitter' },
    snapchat: { icon: 'snapchat', name: 'Snapchat' },
  };
  state = {
    newOrder: savedHomeLayout,
  };

  /**
   *
   */
  _renderRow = ({ data, active }: any) => {
    const { theme } = this.props;
    const { colors } = theme;

    return (
      <View
        style={{
          width: '100%',
          maxWidth: MAX_CONTENT_WIDTH,
          height: 100,
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: theme.dark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
          marginBottom: 5,
          paddingLeft: '5%',
          borderRadius: 10,
        }}
        pointerEvents='none'>
        <View style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}>
          <TrendingTitle icon={data.icon} name={data.name} />
        </View>
        <Icon
          style={{ marginLeft: 'auto', marginRight: '5%', backgroundColor: 'transparent', opacity: 0.8 }}
          size={32}
          color={colors.text}
          name='equal'
        />
      </View>
    );
  };

  render() {
    const window = Dimensions.get('window');
    const { colors } = this.props.theme;

    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.05)' />

        <View style={{ backgroundColor: '#1e2226' }}>
          <Navbar barStyle={{ backgroundColor: '#1e2226' }} title='Home Layout' underStatusBar>
            <Appbar.Action
              icon='check'
              onPress={() => {
                saveHomeLayout(this.state.newOrder);
                goBack();
              }}
            />
          </Navbar>

          <View style={{ flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 15 }}>
            <Icon
              style={{ opacity: 0.8, marginRight: 5, alignSelf: 'center' }}
              name='cursor-pointer'
              size={30}
              color='#fff'
            />
            <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 16, opacity: 0.8, fontWeight: 'bold' }}>
              Drag to reorder
            </Text>
            <Button style={{ marginLeft: 'auto' }} onPress={() => this.setState({ newOrder: defaultHomeLayout })}>
              Reset all
            </Button>
          </View>

          <SortableList
            contentContainerStyle={{
              width: window.width,
              height: window.height,
              paddingTop: 50,
              backgroundColor: colors.background,
            }}
            data={this.data}
            order={this.state.newOrder}
            renderRow={this._renderRow}
            onChangeOrder={(order: string[]) => this._changeOrder(order)}
          />
        </View>
      </>
    );
  }

  /**
   *
   * @param order
   */
  private _changeOrder(order: string[]) {
    this.setState({ newOrder: order });
  }
}

export default withTheme(HomeSettingsScreen);
