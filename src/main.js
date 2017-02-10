import { bootstrapLocalization, makeRequest } from './Bootstrap.localization';

// Import all of our potential configurations
import defaultDev from '../configuration/default.development.json';
import defaultProd from '../configuration/default.production.json';
import userDev from '../configuration/development.json';
import userProd from '../configuration/production.json';

import ready from 'dojo/ready';

export function main(langConfig) {
  ready(() => {
    makeRequest(defaultDev).then((results) => {
      const userConfig = JSON.parse(results);
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
  });
}
