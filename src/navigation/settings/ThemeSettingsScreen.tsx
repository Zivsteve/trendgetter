import React, { Component } from 'react';
import { StatusBar, Dimensions, View } from 'react-native';
import { Theme, withTheme } from 'react-native-paper';
import DummyThemeScreen from './DummyThemeScreen';
import Themes from '../../Themes';
import Carousel from 'react-native-snap-carousel';
import Navbar from '../../components/Navbar';
import { setTheme, getTheme } from '../../../App';
import NavigationBar from '../../components/NavigationBar';
import Animated, { Easing } from 'react-native-reanimated';

const { Value, timing } = Animated;
const window = Dimensions.get('window');

interface Props {
  theme: Theme;
}

class ThemeSettingsScreen extends Component<Props> {
  state = {
    index: Object.keys(Themes).indexOf(getTheme()),
    rippleSize: new Value(0),
    newTheme: this.props.theme,
  };

  render() {
    const { index, rippleSize, newTheme } = this.state;
    const { theme } = this.props;
    const themes = Themes;

    return (
      <>
        <StatusBar
          translucent
          barStyle={newTheme.dark ? 'light-content' : 'dark-content'}
          backgroundColor='rgba(0,0,0,0.05)'
        />
        <NavigationBar dark={newTheme.dark} />

        <View style={{ height: '100%' }}>
          <Navbar
            barStyle={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
            title='Theme'
            underStatusBar
            dark={newTheme.dark}
          />

          <Carousel
            containerCustomStyle={{ marginTop: -100 }}
            firstItem={index}
            sliderWidth={window.width}
            itemWidth={290}
            layoutCardOffset={0}
            useScrollView={true}
            data={Object.keys(themes)}
            onSnapToItem={(index) => this._changeTheme(index)}
            renderItem={({ item, index }) => (
              <View style={{ alignItems: 'center' }}>
                <View
                  key={index}
                  style={{
                    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                    width: window.width,
                    borderRadius: 20,
                    overflow: 'hidden',
                    borderColor: newTheme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                    borderWidth: 2,
                  }}>
                  <DummyThemeScreen theme={themes[item]} title={`${item} theme`} />
                </View>
              </View>
            )}
          />

          <View
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: theme.colors.background,
              zIndex: -2,
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              top: -100,
              left: -window.width,
              backgroundColor: newTheme.colors.background,
              borderRadius: window.height * 1.5,
              width: window.height * 1.5,
              height: window.height * 1.5,
              scaleX: rippleSize,
              scaleY: rippleSize,
              zIndex: -1,
            }}
            pointerEvents='none'
          />
        </View>
      </>
    );
  }

  private _changeTheme(index: number) {
    const name = Object.keys(Themes)[index];

    setTimeout(() => {
      timing(this.state.rippleSize, {
        duration: 500,
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
      }).start();
      this.setState({ newTheme: Themes[name] });
      setTimeout(() => {
        setTheme(name);
        this.state.rippleSize.setValue(0);
      }, 500);
    }, 100);
  }
}

export default withTheme(ThemeSettingsScreen);
