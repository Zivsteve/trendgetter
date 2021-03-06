import { DefaultTheme, DarkTheme, Theme } from 'react-native-paper';
import { PRIMARY_COLOR } from './Config';

/**
 *
 */
const Themes: { [key: string]: Theme } = {
  light: {
    ...DefaultTheme,
    roundness: 5,
    colors: {
      ...DefaultTheme.colors,
      primary: PRIMARY_COLOR,
      accent: PRIMARY_COLOR,
      background: '#f5f5f5',
      text: '#374851',
      onSurface: 'rgba(0, 0, 0, 0.2)',
    },
  },

  dark: {
    ...DarkTheme,
    roundness: 5,
    colors: {
      ...DarkTheme.colors,
      primary: PRIMARY_COLOR,
      accent: PRIMARY_COLOR,
      background: '#263238',
      text: '#fff',
      surface: '#1e2226',
      onSurface: 'rgba(255, 255, 255, 0.2)',
    },
  },

  blueish: {
    ...DarkTheme,
    roundness: 5,
    colors: {
      ...DarkTheme.colors,
      primary: PRIMARY_COLOR,
      accent: PRIMARY_COLOR,
      background: '#203754',
      text: '#fff',
      surface: '#2e4f77',
      onSurface: 'rgba(255, 255, 255, 0.2)',
    },
  },

  amoled: {
    ...DarkTheme,
    roundness: 5,
    colors: {
      ...DarkTheme.colors,
      primary: PRIMARY_COLOR,
      accent: PRIMARY_COLOR,
      background: '#000',
      text: '#eee',
      surface: '#1e2226',
      onSurface: 'rgba(255, 255, 255, 0.2)',
    },
  },

  dry: {
    ...DarkTheme,
    roundness: 5,
    colors: {
      ...DarkTheme.colors,
      primary: PRIMARY_COLOR,
      accent: PRIMARY_COLOR,
      background: '#343134',
      text: '#eee',
      surface: '#242024',
      onSurface: 'rgba(255, 255, 255, 0.2)',
    },
  },

  code: {
    ...DarkTheme,
    roundness: 5,
    colors: {
      ...DarkTheme.colors,
      primary: PRIMARY_COLOR,
      accent: PRIMARY_COLOR,
      background: '#011627',
      text: '#43e000',
      surface: '#00111e',
      onSurface: 'rgba(0, 250, 0, 0.2)',
    },
  },
};

export default Themes;
