import { getTheme } from '../AppContextProvider';
import Themes from '../Themes';
import { Platform } from 'react-native';

/**
 *
 * @param name
 * @param value
 */
export function setMetaTag(name: string, value = '') {
  if (Platform.OS === 'web') {
    document.querySelector(`meta[name="${name}"]`)?.setAttribute('content', value);
  }
}

/**
 *
 * @param color
 */
export function setThemeColor(color?: string) {
  setMetaTag('theme-color', color || Themes[getTheme()]?.colors.background);
}
