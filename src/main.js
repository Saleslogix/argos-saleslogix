import { bootstrapLocalization, makeRequest } from './Bootstrap.localization';
import { getDefaultModules } from './modules';

// Import all of our potential configurations
import defaultDev from '../configuration/default.development.json';
import defaultProd from '../configuration/default.production.json';
import userDev from '../configuration/development.json';
import userProd from '../configuration/production.json';

import ready from 'dojo/ready';

/**
 * Main entry point into the application. Once the DOM is ready, main will
 * bootstrap the localization and then the rest of the application.
 * @param  {Object} langConfig    Language configuration object.
 * @param  {Object} userConfig    App configuration object, falls back to a default (development/production json)
 * @param  {Function} moduleFactory Returns a promise with an array of application modules.
 * @return {void}
 */
function main(langConfig, userConfig, moduleFactory) {
  ready(() => {
    // TODO: Determine if we want to load production or development, and merge
    // the default config with the user.
    bootstrapLocalization(langConfig).then(() => {
      require.ensure([], (require) => {
        const mobile = require('./Bootstrap');
        const rootElement = document.getElementById('rootNode');
        moduleFactory().then((results) => {
          mobile.bootstrap({
            currentLocale: langConfig.currentLocale,
            parentLocale: langConfig.parentLocale,
            isRegionMetric: langConfig.isRegionMetric,
            rootElement,
            userConfig,
            modules: results,
          });
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
      main(langConfig, config, getDefaultModules);
    }, (defaultConfig) => {
      main(langConfig, defaultConfig, getDefaultModules);
    });
}

export function production(langConfig) {
  loadConfig(defaultProd, userProd)
    .then((config) => {
      main(langConfig, config, getDefaultModules);
    }, (defaultConfig) => {
      main(langConfig, defaultConfig, getDefaultModules);
    });
}
