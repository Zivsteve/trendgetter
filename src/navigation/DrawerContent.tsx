import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Drawer, Text, Theme, withTheme, TouchableRipple } from 'react-native-paper';
import { navigate } from '../services/NavigationService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppConsumer } from '../AppContextProvider';
import { APP_NAME } from '../Config';

interface Props {
  theme: Theme;
}

/**
 *
 * @param props
 */
function DrawerHeader(props: any) {
  const insets = useSafeArea();
  return (
    <View
      style={{
        paddingTop: insets.top,
        width: '120%',
        paddingBottom: '5%',
        marginTop: '-8%',
        marginLeft: '-10%',
        height: 220,
        backgroundColor: '#1876d1',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200,
      }}>
      <Image style={{ width: 50, height: 50 }} source={require('../assets/logo-light-108x108.png')} />
      <Text style={{ color: '#fff', fontSize: 22, textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>
        {APP_NAME}
      </Text>
    </View>
  );
}

/**
 *
 * @param props
 */
function DrawerContent(props: Props) {
  const insets = useSafeArea();
  const { colors } = props.theme;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.background }}>
      <DrawerHeader />

      <View style={{ paddingBottom: insets.bottom }}>
        <Drawer.Section>
          <Drawer.Item label='Home' icon='trending-up' onPress={() => navigate('/')} />
        </Drawer.Section>

        <Drawer.Section title='Trending'>
          <Drawer.Item label='Google' icon='google' onPress={() => navigate('/google')} />
          <Drawer.Item label='YouTube' icon='youtube' onPress={() => navigate('/youtube')} />
          <Drawer.Item label='Twitter' icon='twitter' onPress={() => navigate('/twitter')} />
          <Drawer.Item label='Snapchat' icon='snapchat' onPress={() => navigate('/snapchat')} />
          <Drawer.Item label='TikTok' icon='music-note' onPress={() => navigate('/tiktok')} />
          <Drawer.Item label='Reddit' icon='reddit' onPress={() => navigate('/reddit')} />
          <Drawer.Item label='GitHub' icon='github-circle' onPress={() => navigate('/github')} />
        </Drawer.Section>

        <Drawer.Section title='App'>
          <Drawer.Item label='Settings' icon='settings' onPress={() => navigate('/settings')} />
          <Drawer.Item label='About' icon='cellphone-screenshot' onPress={() => navigate('/about')} />
        </Drawer.Section>

        <AppConsumer>
          {(consumer) => (
            <TouchableRipple
              style={{
                alignSelf: 'flex-end',
                width: 40,
                height: 40,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                overflow: 'hidden',
              }}
              onPress={() => consumer.updateTheme(props.theme.dark ? 'light' : 'dark')}>
              <Icon name={props.theme.dark ? 'weather-sunny' : 'weather-night'} size={26} color={colors.text} />
            </TouchableRipple>
          )}
        </AppConsumer>
      </View>
    </ScrollView>
  );
}

export default withTheme(DrawerContent);
