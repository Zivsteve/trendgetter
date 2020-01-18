import React, { Component } from 'react';
import { StatusBar, Dimensions, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Theme, withTheme, Text } from 'react-native-paper';
import DummyThemeScreen from './DummyThemeScreen';
import Themes from '../../Themes';
import Navbar from '../../components/Navbar';
import NavigationBar from '../../components/NavigationBar';
import Animated, { Easing } from 'react-native-reanimated';
import { AppConsumer, AppConsumerState, getTheme } from '../../AppContextProvider';
import Carousel from '../../components/Carousel';

interface Props {
  theme: Theme;
}

class ThemeSettingsScreen extends Component<Props> {
  state = {
    index: Object.keys(Themes).indexOf(getTheme()),
    rippleSize: new Animated.Value(0),
    newTheme: this.props.theme,
  };
  private _rippleDelay: number | undefined;

  render() {
    const window = Dimensions.get('window');
    const { index, rippleSize, newTheme } = this.state;
    const { theme } = this.props;
    return (
      <AppConsumer>
        {(consumer) => (
          <>
            <StatusBar
              translucent
              barStyle={newTheme.dark ? 'light-content' : 'dark-content'}
              backgroundColor='rgba(0,0,0,0.05)'
            />
            <NavigationBar dark={newTheme.dark} />

            <ScrollView style={{ height: '100%' }}>
              <Navbar title='Theme' subtitle='Tap to select' underStatusBar dark={newTheme.dark} />

              <Carousel
                containerCustomStyle={{ marginTop: -50 }}
                firstItem={index}
                sliderWidth={window.width}
                itemWidth={300}
                layoutCardOffset={0}
                enableMomentum
                data={Object.keys(Themes)}
                renderItem={({ item, index }) => (
                  <TouchableWithoutFeedback onPress={() => this._changeTheme(consumer, index)}>
                    <View
                      key={index}
                      style={{
                        alignSelf: 'center',
                        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                        width: window.width,
                        maxWidth: 400,
                        borderRadius: 20,
                        overflow: 'hidden',
                        borderColor: newTheme.dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                        borderWidth: 2,
                      }}>
                      <DummyThemeScreen theme={Themes[item]} title={`${item} theme`} />
                    </View>
                  </TouchableWithoutFeedback>
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
            </ScrollView>
          </>
        )}
      </AppConsumer>
    );
  }

  /**
   *
   * @param consumer
   * @param index
   */
  private _changeTheme(consumer: AppConsumerState, index: number) {
    clearTimeout(this._rippleDelay);
    this.state.rippleSize.setValue(0);
    this._rippleDelay = setTimeout(() => {
      const name = Object.keys(Themes)[index];
      Animated.timing(this.state.rippleSize, {
        duration: 500,
        toValue: 1,
        easing: Easing.inOut(Easing.ease),
      }).start(() => consumer.updateTheme(name));
      this.setState({ newTheme: Themes[name] });
    }, 0);
  }
}

export default withTheme(ThemeSettingsScreen);
