import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { TouchableRipple, Card, Theme, withTheme } from 'react-native-paper';
import { API_URL } from '../Config';
import { formatNumber } from '../utils/NumberUtils';
import IconBadge from './IconBadge';
import { openURL } from '../services/NavigationService';

const window = Dimensions.get('window');

interface Props {
  options: any;
  theme: Theme;
}

class GithubRepositoryDetail extends Component<Props> {
  state = {
    unknownLang: false,
  };

  render() {
    const { options: prop, theme: theme } = this.props;
    const { colors } = theme;
    let langColor, languageIcon, emptyIcon;
    const { unknownLang } = this.state;

    if (prop.language) {
      langColor = prop.language.color;
      languageIcon = (
        <Image
          style={{ width: 20, height: 20, tintColor: langColor }}
          source={{ uri: this._getIconPath(prop.language.name) }}
          onError={() => this.setState({ unknownLang: true })}
        />
      );
      emptyIcon = <View style={{ width: 20, height: 20, backgroundColor: langColor, borderRadius: 100 }} />;
    }

    return (
      <Card
        style={{
          width: window.width - 30,
          margin: 10,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <TouchableRipple
          onPress={() => openURL(`https://github.com${prop.repo.link}`)}
          rippleColor={colors.onSurface}>
          <View style={{ padding: 10, paddingBottom: 4 }}>
            <View style={{ marginBottom: 5, flexDirection: 'row', flexWrap: 'wrap-reverse' }}>
              <Text style={{ color: colors.text, opacity: 0.7, fontSize: 16, fontWeight: 'bold' }}>
                {prop.repo.rawName}
              </Text>
              {prop.language && (
                <View
                  style={{
                    marginLeft: 'auto',
                    flexDirection: 'row',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    borderRadius: 100,
                  }}>
                  <View style={{ marginRight: 5 }}>{unknownLang ? emptyIcon : languageIcon}</View>
                  <Text style={{ color: langColor, fontWeight: 'bold', fontSize: 14 }}>{prop.language.name}</Text>
                </View>
              )}
            </View>
            <Text style={{ color: colors.text, opacity: 0.5, fontSize: 16 }}>{prop.repo.description}</Text>

            <View style={{ marginTop: 5, flex: 1, flexDirection: 'row' }}>
              <IconBadge textStyle={{ color: colors.text, opacity: 0.5, fontWeight: 'normal' }} icon='star'>
                {formatNumber(prop.stars.count)}
              </IconBadge>

              <IconBadge textStyle={{ color: colors.text, opacity: 0.5, fontWeight: 'normal' }} icon='source-fork'>
                {formatNumber(prop.forks.count)}
              </IconBadge>

              <IconBadge
                style={{ marginLeft: 'auto' }}
                textStyle={{ color: colors.text, opacity: 0.5 }}
                icon='star-outline'>
                {formatNumber(prop.todayStars)} today
              </IconBadge>
            </View>
          </View>
        </TouchableRipple>
      </Card>
    );
  }

  private _getIconPath(name: string) {
    const exceptions = [
      { r: '++', v: 'plusplus' },
      { r: '#', v: 'sharp' },
    ];
    let filteredName = name.replace(/\s/g, '-').toLowerCase();
    exceptions.forEach((ex) => (filteredName = filteredName.replace(ex.r, ex.v)));
    return `${API_URL}/assets/${filteredName}.png`;
  }
}

export default withTheme(GithubRepositoryDetail);
