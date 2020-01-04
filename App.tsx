import React, { Fragment, Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './src/Routes';
import { Platform } from 'react-native';
import Themes from './src/Themes';
import storage from './src/utils/StorageUtils';

let app: App;

export async function setTheme(name = 'dark') {
  app.setState({ theme: name });
  await storage.save({ key: 'theme', data: name });
}

export function getTheme() {
  return app.state.theme;
}

export async function loadTheme() {
  setTheme(await storage.load({ key: 'theme' }));
}

interface Props {}
export default class App extends Component<Props> {
  public state = {
    theme: 'dark',
  };

  constructor(props: Props) {
    super(props);
    app = this;
    loadTheme();
  }

  render() {
    const { theme } = this.state;

    return (
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    );
  }
}
