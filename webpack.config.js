const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.alias['RefreshControl'] = './src/components/refresh-control/RefreshControl.web';
  config.resolve.alias['react-native-linear-gradient'] = 'react-native-web-linear-gradient';
  return config;
};
