import React, { Component } from 'react';
import { StatusBar, View, FlatList } from 'react-native';
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
  render() {
    const { theme } = this.props;
    const { colors } = theme;

    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0, 0, 0, 0.1)' />
        <NavigationBar dark={theme.dark} />

        <View style={{ height: '100%', backgroundColor: '#1e2226' }}>
          <Navbar barStyle={{ backgroundColor: '#1e2226' }} title='Settings' underStatusBar />

          <FlatList
            style={{ backgroundColor: colors.background }}
            data={[
              { key: 'Home Layout', icon: 'shape', action: () => navigate('/settings/home') },
              { key: 'Theme', icon: 'format-color-fill', action: () => navigate('/settings/theme') },
              { key: 'Colors', icon: 'brush', action: () => navigate('/settings/colors') },
              { key: 'About', icon: 'cellphone-screenshot', action: () => navigate('/about') },
            ]}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => (
              <View>
                <Divider style={{ height: 0.8 }} />
                <TouchableRipple style={{ paddingVertical: 8, paddingHorizontal: 20 }} onPress={item.action}>
                  <View style={{ width: '100%', flexDirection: 'row' }}>
                    <Icon style={{ alignSelf: 'center' }} name={item.icon} size={24} color={colors.text} />
                    <Title style={{ marginLeft: 10, fontSize: 16 }}>{item.key}</Title>
                  </View>
                </TouchableRipple>
              </View>
            )}
          />
        </View>
      </>
    );
  }
}

export default withTheme(SettingsScreen);
