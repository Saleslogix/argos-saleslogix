import { bootstrapLocalization, makeRequest } from './Bootstrap.localization';

// Import all of our potential configurations
import defaultDev from '../configuration/default.development.json';
import defaultProd from '../configuration/default.production.json';
import userDev from '../configuration/development.json';
import userProd from '../configuration/production.json';

import ready from 'dojo/ready';

function main(langConfig, userConfig) {
  ready(() => {
    // TODO: Determine if we want to load production or development, and merge
    // the default config with the user.
    bootstrapLocalization(langConfig).then(() => {
      require.ensure([], (require) => {
        const mobile = require('./Bootstrap');
        const rootElement = document.getElementById('rootNode');
        mobile.bootstrap({
          currentLocale: langConfig.currentLocale,
          parentLocale: langConfig.parentLocale,
          isRegionMetric: langConfig.isRegionMetric,
          rootElement,
          userConfig,
        });
      });
    });
  });
}

function loadConfig(defaultConfig, userConfig) {
  const defaultRequest = makeRequest(defaultConfig);
  const userRequest = makeRequest(userConfig);
  // Don't use promise.all here, assume one of the configs will fail
  return defaultRequest.then((results) => {
    const loadedDefaultConfig = JSON.parse(results);
    return userRequest.then((userResults) => {
      const loadedUserConfig = JSON.parse(userResults);
      return Object.assign({}, loadedDefaultConfig, loadedUserConfig);
    }, () => {
      // Rejected
      return Object.assign({}, loadedDefaultConfig);
    });
  });
}

export function development(langConfig) {
  loadConfig(defaultDev, userDev)
    .then((config) => {
      main(langConfig, config);
    }, (defaultConfig) => {
      main(langConfig, defaultConfig);
    });
}

export function production(langConfig) {
  loadConfig(defaultProd, userProd)
    .then((config) => {
      main(langConfig, config);
    }, (defaultConfig) => {
      main(langConfig, defaultConfig);
    });
}
