import React, { Component, createContext } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Themes from './Themes';
import { AppearanceProvider, Appearance } from 'react-native-appearance';
import storage from './utils/StorageUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
    theme: 'light',
    updateTheme: (name: string) => {
      this.setState({ theme: name });
      currTheme = name;
      storage.save({ key: 'theme', data: name }).then();
    },
  };

  async componentDidMount() {
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
