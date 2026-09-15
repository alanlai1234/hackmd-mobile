const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const sharedWebViewRoot = path.resolve(
  projectRoot,
  '../react-native-shared-webview'
);

const config = getDefaultConfig(projectRoot);

// The local shared-webview package has its own node_modules directory. If
// Metro resolves dependencies from there, it creates separate React Native and
// Nitro registries, and SharedWebView is registered in the wrong registry.
config.watchFolders = [...config.watchFolders, sharedWebViewRoot];
const appOrigin = path.resolve(projectRoot, 'package.json');
const singletonPackages = [
  'react',
  'react-native',
  'react-native-nitro-modules',
];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const isSingleton = singletonPackages.some(
    (packageName) =>
      moduleName === packageName || moduleName.startsWith(`${packageName}/`)
  );

  return context.resolveRequest(
    isSingleton ? { ...context, originModulePath: appOrigin } : context,
    moduleName,
    platform
  );
};

module.exports = config;
