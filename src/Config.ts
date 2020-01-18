import storage from './utils/StorageUtils';
import { displayName, expo, repositoryUrl, apiUrl } from '../app.json';

/** */
export const APP_NAME = displayName;
/** */
export const APP_DESC = expo.description;
/** */
export const REP_URL = repositoryUrl;
/** */
export const API_URL = apiUrl;
/** */
export const PRIMARY_COLOR = expo.primaryColor;
/** */
export const MAX_CONTENT_WIDTH = 600;
/** */
export const DEFAULT_THEME = 'light';
/** */
export type ColorType = { [name: string]: string };
/** */
export const defaultColors: ColorType = {
  youtube: '#ff0000',
  google: '#4285f4',
  twitter: '#5da9dd',
  reddit: '#ff3f18',
  github: '#24292e',
  snapchat: '#fdd835',
};
/** */
export const defaultHomeLayout = ['youtube', 'google', 'twitter', 'snapchat'];
/** */
export let savedColors = defaultColors;
/** */
export let savedHomeLayout = defaultHomeLayout;

/** */
export async function updateSavedColors() {
  savedColors = (await storage.load({ key: 'colors' }).catch((err) => null)) || defaultColors;
}
updateSavedColors();

/** */
export async function saveColors(colors: ColorType) {
  await storage.save({ key: 'colors', data: colors });
  updateSavedColors();
}

/** */
export async function updateSavedHomeLayout() {
  savedHomeLayout = (await storage.load({ key: 'homelayout' }).catch((err) => null)) || defaultHomeLayout;
}
updateSavedHomeLayout();

/** */
export async function saveHomeLayout(layout: string[]) {
  await storage.save({ key: 'homelayout', data: layout });
  updateSavedHomeLayout();
}
