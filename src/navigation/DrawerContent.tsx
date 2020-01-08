import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Drawer, Text, Theme, withTheme, TouchableRipple } from 'react-native-paper';
import { navigate } from '../services/NavigationService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setTheme } from '../../App';

interface Props {
  theme: Theme;
}

function DrawerHeader(props: any) {
  const insets = useSafeArea();

  return (
    <View
      style={{
        paddingTop: insets.top,
        width: '120%',
        marginLeft: '-10%',
        height: 180,
        backgroundColor: '#1876d1',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
      }}>
      <Image style={{ width: 50, height: 50 }} source={require('../assets/logo-light-1024x1024.png')} />
      <Text style={{ color: '#fff', fontSize: 22, textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>
        Trendgetter
      </Text>
      <View style={{ backgroundColor: '#fff', width: 100, height: 2, marginVertical: 10 }} />
    </View>
  );
}

function DrawerContent(props: Props) {
  const insets = useSafeArea();
  const { colors } = props.theme;

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <DrawerHeader />

      <View style={{ paddingBottom: insets.bottom }}>
        <Drawer.Item style={styles.item} label='Home' icon='trending-up' onPress={() => navigate('/')} />

        <Drawer.Section title='Trending'>
          <Drawer.Item style={styles.item} label='Google' icon='google' onPress={() => navigate('/google')} />
          <Drawer.Item style={styles.item} label='YouTube' icon='youtube' onPress={() => navigate('/youtube')} />
          <Drawer.Item style={styles.item} label='Twitter' icon='twitter' onPress={() => navigate('/twitter')} />
          <Drawer.Item style={styles.item} label='Reddit' icon='reddit' onPress={() => navigate('/reddit')} />
          <Drawer.Item style={styles.item} label='GitHub' icon='github-circle' onPress={() => navigate('/github')} />
          <Drawer.Item style={styles.item} label='Snapchat' icon='snapchat' onPress={() => navigate('/snapchat')} />
        </Drawer.Section>

        <Drawer.Section title='App'>
          <Drawer.Item style={styles.item} label='Settings' icon='settings' onPress={() => navigate('/settings')} />
          <Drawer.Item
            style={styles.item}
            label='About'
            icon='cellphone-screenshot'
            onPress={() => navigate('/about')}
          />
        </Drawer.Section>

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
          onPress={() => setTheme(props.theme.dark ? 'light' : 'dark')}>
          <Icon name={props.theme.dark ? 'weather-sunny' : 'weather-night'} size={26} color={colors.text} />
        </TouchableRipple>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {},
});

export default withTheme(DrawerContent);
