import React, { Component, createContext } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Themes from './Themes';
import { AppearanceProvider, Appearance } from 'react-native-appearance';
import storage from './utils/StorageUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, Dimensions, View } from 'react-native';
import { DEFAULT_THEME } from './Config';

/**
 *
 */
export interface AppConsumerState {
  theme: string;
  updateTheme: (name: string) => void;
}

const Context = createContext({} as AppConsumerState);
let currTheme: string;

/**
 *
 */
export function getTheme() {
  return currTheme;
}

/**
 *
 */
export class AppContextProvider extends Component {
  state: AppConsumerState = {
    theme: DEFAULT_THEME,
    updateTheme: (name: string) => {
      this.setState({ theme: name });
      currTheme = name;
      storage.save({ key: 'theme', data: name }).then();
    },
  };

  async componentDidMount() {
    if (Platform.OS === 'web') {
      let rt: number;
      window.onresize = () => {
        clearTimeout(rt);
        rt = setTimeout(() => {
          /* Hack: Updating theme causes all components to re-render. */
          const theme = this.state.theme;
          this.setState({ theme: 'x' });
          this.setState({ theme: theme });
        }, 100);
      };
    }

    try {
      const theme = await storage.load({ key: 'theme' });
      this.state.updateTheme(theme);
    } catch (err) {
      this.state.updateTheme(Appearance.getColorScheme());
      Appearance.addChangeListener(({ colorScheme }) => this.state.updateTheme(colorScheme));
    }
  }

  render() {
    const { theme } = this.state;
    return (
      <Context.Provider value={this.state}>
        <SafeAreaProvider>
          <AppearanceProvider>
            <PaperProvider theme={Themes[theme]}>{this.props.children}</PaperProvider>
          </AppearanceProvider>
        </SafeAreaProvider>
      </Context.Provider>
    );
  }
}

export const AppConsumer = Context.Consumer;
export const AppContext = Context;
