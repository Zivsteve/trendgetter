import React, { Fragment, Component } from 'react';
import Routes from './src/Routes';
import { Platform } from 'react-native';
import { AppContextProvider } from './src/AppContextProvider';

interface Props {}

/**
 *
 */
class App extends Component<Props> {
  render() {
    return (
      <AppContextProvider>
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
      </AppContextProvider>
    );
  }
}

export default App;
