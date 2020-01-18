import React, { Component } from 'react';
import { StatusBar, View, ScrollView } from 'react-native';
import { TouchableRipple, Title, Theme, withTheme, Divider } from 'react-native-paper';
import { navigate } from '../../services/NavigationService';
import Navbar from '../../components/Navbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBar from '../../components/NavigationBar';

interface Props {
  theme: Theme;
}

/**
 *
 */
class SettingsScreen extends Component<Props> {
  private _sections = [
    { key: 'Home Layout', icon: 'shape', action: () => navigate('/settings/home') },
    { key: 'Theme', icon: 'format-color-fill', action: () => navigate('/settings/theme') },
    { key: 'Colors', icon: 'brush', action: () => navigate('/settings/colors') },
    { key: 'About', icon: 'cellphone-screenshot', action: () => navigate('/about') },
  ];

  render() {
    const { theme } = this.props;
    const { colors } = theme;

    return (
      <>
        <StatusBar
          translucent
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor='rgba(0, 0, 0, 0.04)'
        />
        <NavigationBar dark={theme.dark} />

        <ScrollView style={{ width: '100%', backgroundColor: colors.background }}>
          <Navbar dark={theme.dark} title='Settings' underStatusBar />

          {this._sections.map((item, index) => (
            <TouchableRipple key={index} style={{ paddingVertical: 8, paddingHorizontal: 20 }} onPress={item.action}>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <Icon style={{ alignSelf: 'center' }} name={item.icon} size={24} color={colors.text} />
                <Title style={{ marginLeft: 10, fontSize: 16 }}>{item.key}</Title>
              </View>
            </TouchableRipple>
          ))}
        </ScrollView>
      </>
    );
  }
}

export default withTheme(SettingsScreen);
