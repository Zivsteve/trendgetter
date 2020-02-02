import React, { Component } from 'react';
import { View, Image, Animated, Easing } from 'react-native';
import { Text, TouchableRipple, Theme, withTheme, IconButton, Paragraph } from 'react-native-paper';
import { formatNumberShort } from '../utils/NumberUtils';
import { openURL } from '../services/NavigationService';

interface Props {
  options: any;
  index: number;
  theme: Theme;
}

/**
 *
 */
class TiktokTagDetail extends Component<Props> {
  private _showAnim = new Animated.Value(0);
  private _showDesc = false;

  private _toggleDesc() {
    Animated.timing(this._showAnim, {
      toValue: this._showDesc ? 0 : 1,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    }).start();
    this._showDesc = !this._showDesc;
  }

  componentDidUpdate() {
    this._showDesc = true;
    this._toggleDesc();
  }

  render() {
    const { options: prop, index, theme } = this.props;
    const { colors } = theme;

    return (
      <TouchableRipple
        style={{ paddingVertical: 15, borderRadius: 10 }}
        rippleColor={colors.onSurface}
        onPress={() => openURL(prop.link)}>
        <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 10 }}>
          <Text
            style={{
              width: 20,
              height: 20,
              opacity: 0.7,
              marginRight: 10,
              fontSize: 14,
              fontWeight: 'bold',
              alignSelf: 'center',
              color: '#000',
              borderRadius: 100,
              backgroundColor: '#52e0db',
              textAlign: 'center',
            }}>
            {index + 1}
          </Text>
          <Image
            style={{ width: 80, height: 80, alignSelf: 'center', backgroundColor: '#ddd', borderRadius: 10 }}
            source={{ uri: prop.cover }}
          />
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }} numberOfLines={1}>
              {prop.title || '#Hashtag'}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ opacity: 0.8, fontSize: 15, textAlign: 'center', fontWeight: 'bold' }}>
                {formatNumberShort(prop.extraInfo.views || '--', 2)}
              </Text>
              <Text
                style={{
                  opacity: 0.8,
                  fontSize: 13,
                  paddingVertical: 3,
                  paddingHorizontal: 5,
                  textAlign: 'center',
                }}>
                Views
              </Text>
            </View>
          </View>
          <IconButton
            style={{ position: 'absolute', top: 0, right: 0, opacity: 0.7 }}
            icon='information-outline'
            onPress={() => this._toggleDesc()}
          />

          <Animated.View
            style={{
              position: 'absolute',
              right: 50,
              alignSelf: 'center',
              backgroundColor: '#fff',
              width: 300,
              padding: '5%',
              borderRadius: 10,
              elevation: 2,
              opacity: this._showAnim,
              transform: [{ scale: this._showAnim }],
            }}
            pointerEvents='none'>
            <Paragraph style={{ color: '#555' }}>{prop.description}</Paragraph>
          </Animated.View>
        </View>
      </TouchableRipple>
    );
  }
}

export default withTheme(TiktokTagDetail);
