import React, { Component } from 'react';
import { View, StatusBar, Dimensions, Image, ScrollView } from 'react-native';
import { Text, Button, Paragraph, Theme, withTheme } from 'react-native-paper';
import { version as appVersion } from '../../package.json';
import { Svg, Defs, RadialGradient, Stop, G, Path } from 'react-native-svg';
import { openURL } from '../services/NavigationService';
import { REP_URL } from '../Config';
import Navbar from '../components/Navbar';
import NavigationBar from '../components/NavigationBar';

const window = Dimensions.get('window');

interface Props {
  theme: Theme;
}

/**
 * 
 */
class AboutScreen extends Component<Props> {
  static navigationOptions = { gestureEnabled: true };

  render() {
    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
        <NavigationBar dark={true} />

        <View style={{ height: '100%', backgroundColor: '#1876d1', overflow: 'hidden' }}>
          <ScrollView style={{ paddingBottom: 80, height: '100%' }}>
            <Navbar barStyle={{ backgroundColor: 'transparent' }} title='About' underStatusBar />

            <View style={{ paddingVertical: '10%', alignSelf: 'center', width: '80%' }}>
              <Image
                style={{ width: 60, height: 60, marginBottom: 10 }}
                source={require('../assets/logo-light-108x108.png')}
              />
              <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold' }}>Trendgetter</Text>
              <View style={{ width: 100, height: 2, backgroundColor: '#fff', marginVertical: 10 }} />

              <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 14, marginTop: 20 }}>Version</Text>
              <Text style={{ color: '#fff', fontSize: 17, marginLeft: 10 }}>{appVersion}</Text>

              <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 14, marginTop: 20 }}>Description</Text>
              <Paragraph style={{ color: '#fff', fontSize: 17, marginLeft: 10 }}>
                Trendgetter is an app made for displaying trending content from various social medias. If you are
                interested, the code is open-sourced on GitHub, including the API itself.
              </Paragraph>
            </View>

            <Button
              style={{ width: 200, alignSelf: 'center' }}
              icon='github-circle'
              onPress={() => openURL(REP_URL)}
              color='#fff'>
              View on GitHub
            </Button>
            <Button
              style={{ width: 200, alignSelf: 'center' }}
              icon='alert-circle-outline'
              onPress={() => openURL(`${REP_URL}/issues`)}
              color='#fff'>
              Report an issue
            </Button>
          </ScrollView>

          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0.03,
              width: window.width * 2,
              height: window.width * 2,
            }}
            pointerEvents='none'>
            <Svg width='100%' height='100%' viewBox='0 0 800 800'>
              <Defs>
                <RadialGradient id='b' cx='400' cy='400' r='100%' gradientUnits='userSpaceOnUse'>
                  <Stop offset='0' stopColor='#ffffff' />
                  <Stop offset='1' stopColor='#0FF' />
                </RadialGradient>
              </Defs>
              <G fillOpacity='0.8'>
                <Path
                  fill='url(#b)'
                  d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'
                />
              </G>
            </Svg>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: -10,
              right: 0,
            }}
            pointerEvents='none'>
            <Svg width={400} height={100} viewBox='0 0 1440 320'>
              <Path
                fill='#1e2226'
                fillOpacity='1'
                d='M0,320L48,314.7C96,309,192,299,288,272C384,245,480,203,576,160C672,117,768,75,864,74.7C960,75,1056,117,1152,138.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></Path>
            </Svg>
          </View>
        </View>
      </>
    );
  }
}

export default withTheme(AboutScreen);
