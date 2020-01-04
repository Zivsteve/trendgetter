import { Dimensions } from 'react-native';
import storage from './utils/StorageUtils';

export const API_URL = 'http://trendgetter-api.herokuapp.com';
export const REP_URL = 'https://github.com/Zivsteve/trendgetter';
export const MAX_CONTENT_WIDTH = Math.min(Dimensions.get('window').width, 600);

export type ColorType = { [name: string]: string };
export const defaultColors: ColorType = {
  youtube: '#ff0000',
  google: '#4285f4',
  twitter: '#5da9dd',
  reddit: '#ff3f18',
  github: '#24292e',
  snapchat: '#fdd835',
};
export const defaultHomeLayout = ['youtube', 'google', 'twitter', 'snapchat'];

export let savedColors = defaultColors;
export let savedHomeLayout = defaultHomeLayout;

export async function updateSavedColors() {
  savedColors = (await storage.load({ key: 'colors' }).catch((err) => null)) || defaultColors;
}
updateSavedColors();

export async function saveColors(colors: ColorType) {
  await storage.save({ key: 'colors', data: colors });
  updateSavedColors();
}

export async function updateSavedHomeLayout() {
  savedHomeLayout = (await storage.load({ key: 'homelayout' }).catch((err) => null)) || defaultHomeLayout;
}
updateSavedHomeLayout();

export async function saveHomeLayout(layout: string[]) {
  await storage.save({ key: 'homelayout', data: layout });
  updateSavedHomeLayout();
}
