import React, { Component } from 'react';
import { View, StatusBar, Image, ScrollView } from 'react-native';
import { Text, Button, Paragraph, Theme, withTheme } from 'react-native-paper';
import { version as appVersion } from '../../package.json';
import { Svg, Path } from 'react-native-svg';
import { openURL } from '../services/NavigationService';
import { REP_URL, APP_NAME, APP_DESC } from '../Config';
import Navbar from '../components/Navbar';
import NavigationBar from '../components/NavigationBar';

interface Props {
  theme: Theme;
}

/**
 *
 */
class AboutScreen extends Component<Props> {
  render() {
    return (
      <>
        <StatusBar translucent barStyle='light-content' backgroundColor='rgba(0,0,0,0.05)' />
        <NavigationBar dark={true} />

        <View style={{ height: '100%', backgroundColor: '#1876d1', overflow: 'hidden' }}>
          <ScrollView style={{ height: '100%' }} contentContainerStyle={{ paddingBottom: 100 }}>
            <Navbar barStyle={{ backgroundColor: '#1876d1' }} title='About' underStatusBar />

            <View style={{ paddingVertical: '10%', alignSelf: 'center', width: '80%', maxWidth: 600 }}>
              <Image
                style={{ width: 60, height: 60, marginBottom: 10 }}
                source={require('../assets/logo-light-108x108.png')}
              />
              <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold' }}>{APP_NAME}</Text>

              <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 14, marginTop: 20 }}>Version</Text>
              <Text style={{ color: '#fff', fontSize: 17, marginLeft: 10 }}>{appVersion}</Text>

              <Text style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: 14, marginTop: 20 }}>Description</Text>
              <Paragraph style={{ color: '#fff', fontSize: 17, marginLeft: 10 }}>{APP_DESC}</Paragraph>
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
