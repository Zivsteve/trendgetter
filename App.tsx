import React, { Fragment, Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/Routes';
import { Platform } from 'react-native';
import Themes from './src/Themes';
import storage from './src/utils/StorageUtils';
import { AppearanceProvider, Appearance } from 'react-native-appearance';

let app: App;

export async function setTheme(name = 'dark') {
  try {
    if (!Themes.hasOwnProperty(name)) {
      return;
    }
    app.setState({ theme: name });
    await storage.save({ key: 'theme', data: name });
  } catch (err) {}
}

export function getTheme() {
  return app.state.theme;
}

export async function loadTheme() {
  try {
    const savedTheme = (await storage.load({ key: 'theme' })) || Appearance.getColorScheme();
    setTheme(savedTheme);
  } catch (err) {
    Appearance.addChangeListener(({ colorScheme }) => setTheme(colorScheme));
  }
}

interface Props {}
export default class App extends Component<Props> {
  state = {
    theme: 'dark',
  };

  constructor(props: Props) {
    super(props);
    app = this;
  }

  componentDidMount() {
    loadTheme();
  }

  render() {
    const { theme } = this.state;

    return (
      <SafeAreaProvider>
        <AppearanceProvider>
          <PaperProvider theme={Themes[theme]}>
            <Fragment>
              {Platform.OS === 'web' && (
                <style>{`
                @font-face {
                  font-family: 'MaterialCommunityIcons';
                  src: url(${require('./src/assets/fonts/MaterialCommunityIcons.ttf')}) format('truetype');
                }
              `}</style>
              )}
              <Routes />
            </Fragment>
          </PaperProvider>
        </AppearanceProvider>
      </SafeAreaProvider>
    );
  }
}
