import Storage from 'react-native-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: window.localStorage,
  defaultExpires: null,
  enableCache: true,
});

export default storage;