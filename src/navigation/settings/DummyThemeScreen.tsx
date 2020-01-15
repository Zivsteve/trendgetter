import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Theme, Title, Text, Card, Button, TouchableRipple } from 'react-native-paper';
import Navbar from '../../components/Navbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getReadableDate } from '../../utils/NumberUtils';

interface Props {
  theme: Theme;
  title: string;
}

/**
 * 
 */
class DummyThemeScreen extends Component<Props> {
  render() {
    const window = Dimensions.get('window');
    const { theme, title } = this.props;
    const { colors } = theme;
    const date = getReadableDate();

    return (
      <View style={{ height: '100%', alignItems: 'center', backgroundColor: colors.background }}>
        <Navbar titleStyle={{ textTransform: 'capitalize' }} title={title} dark={theme.dark} />

        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <Icon style={{ marginBottom: 10 }} size={42} name='trending-up' color={colors.text} />
          <Title style={{ opacity: 0.8, fontSize: 20, color: colors.text }}>Trending</Title>
          <Text style={{ opacity: 0.3, color: colors.text }}>{date}</Text>

          <Card
            style={{
              backgroundColor: colors.surface,
              marginVertical: 50,
              width: window.width * 0.8,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Card.Cover source={require('../../assets/dummy.jpg')} />
            <Card.Content>
              <Title style={{ color: colors.text }}>Title</Title>
              <Text style={{ color: colors.text }}>The quick brown fox jumps over the lazy dog</Text>
            </Card.Content>
          </Card>

          {[...Array(3)].map((prop, index) => (
            <TouchableRipple
              key={index}
              style={{ paddingHorizontal: 5, paddingVertical: 15, borderRadius: 10 }}
              onPress={() => null}>
              <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                <Text
                  style={{
                    width: 30,
                    opacity: 0.7,
                    marginRight: 5,
                    fontSize: 18,
                    alignSelf: 'center',
                    color: colors.text,
                  }}>
                  {index + 1}.
                </Text>
                <Text style={{ color: colors.text, width: '70%', fontSize: 16, alignSelf: 'center' }} numberOfLines={1}>
                  Dummy Text
                </Text>
                <Text
                  style={{
                    marginLeft: 'auto',
                    opacity: 0.95,
                    fontSize: 16,
                    color: colors.text,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  1,000
                </Text>
              </View>
            </TouchableRipple>
          ))}

          <Button style={{ marginTop: 25, width: 200, alignSelf: 'center' }} onPress={() => null}>
            More
          </Button>
        </View>
      </View>
    );
  }
}

export default DummyThemeScreen;
