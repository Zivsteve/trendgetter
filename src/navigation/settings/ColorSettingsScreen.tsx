import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Theme, withTheme, Portal, Dialog, Colors, Title, Appbar, Button } from 'react-native-paper';
import Navbar from '../../components/Navbar';
import NavigationBar from '../../components/NavigationBar';
import { ColorType, defaultColors, saveColors, savedColors } from '../../Config';
import { goBack } from '../../services/NavigationService';

interface Props {
  theme: Theme;
}

/**
 *
 */
class ColorSettingsScreen extends Component<Props> {
  state = {
    selectedItem: '',
    allColors: Object.assign({}, savedColors as ColorType),
    showColors: false,
  };

  render() {
    const window = Dimensions.get('window');
    const { theme } = this.props;
    const { colors, dark } = theme;
    const { allColors } = this.state;

    return (
      <>
        <StatusBar translucent barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor='rgba(0,0,0,0.05)' />
        <NavigationBar dark={dark} />

        <ScrollView style={{ height: '100%', backgroundColor: colors.background }}>
          <Navbar title='Colors' underStatusBar dark={theme.dark}>
            <Appbar.Action
              icon='check'
              onPress={() => {
                saveColors(allColors);
                goBack();
              }}
            />
          </Navbar>
          <Button
            style={{ alignSelf: 'flex-end', marginTop: 20, marginRight: 10 }}
            onPress={() => this._setColors(defaultColors)}>
            Reset all
          </Button>

          <View style={{ marginBottom: 80 }}>
            {Object.keys(allColors).map((item) => (
              <View key={item} style={{ marginTop: 30, marginHorizontal: 20 }}>
                <Navbar
                  barStyle={{ backgroundColor: allColors[item], zIndex: 0 }}
                  titleStyle={{ textTransform: 'capitalize' }}
                  title={item}
                  action={() => null}
                  dark={true}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 20,
                    backgroundColor: allColors[item],
                    width: 35,
                    height: 35,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: '#fff',
                    elevation: 5,
                  }}
                  activeOpacity={0.7}
                  onPress={() => this._selectItem(item)}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        <Portal>
          <Dialog visible={this.state.showColors} onDismiss={() => this.setState({ showColors: false })}>
            <Title style={{ paddingVertical: 5, paddingHorizontal: 15 }}>Pick a color</Title>
            <ScrollView style={{ width: '100%', padding: 10, maxHeight: window.height / 2 }}>
              <View style={{ paddingBottom: 20, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                {[defaultColors[this.state.selectedItem], ...Object.values(Colors)].map((color, key) => (
                  <TouchableOpacity
                    key={key}
                    style={{
                      backgroundColor: color,
                      width: 35,
                      height: 35,
                      borderRadius: 100,
                      elevation: 5,
                      margin: 10,
                      transform: [{ scaleX: key === 0 ? 1.4 : 1 }, { scaleY: key === 0 ? 1.4 : 1 }],
                    }}
                    activeOpacity={0.6}
                    onPress={() => this._onChange(color)}
                  />
                ))}
              </View>
            </ScrollView>
          </Dialog>
        </Portal>
      </>
    );
  }

  /**
   *
   * @param colors
   */
  private _setColors(colors: ColorType) {
    this.setState({ allColors: Object.assign({}, colors) });
  }

  /**
   *
   * @param item
   */
  private _selectItem(item: string) {
    this.setState({ selectedItem: item, showColors: true });
  }

  /**
   *
   * @param color
   */
  private _onChange(color: string) {
    const colors = this.state.allColors;
    colors[this.state.selectedItem] = color;
    this.setState({ allColors: colors, showColors: false });
  }
}

export default withTheme(ColorSettingsScreen);
