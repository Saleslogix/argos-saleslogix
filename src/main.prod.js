import { bootstrapLocalization } from './Bootstrap.localization';
import ready from 'dojo/ready';

export function main(langConfig) {
  ready(() => {
    bootstrapLocalization(langConfig).then(() => {
      require.ensure([], (require) => {
        const mobile = require('./Bootstrap');
        const { getConfig } = require('../configuration/production');
        const rootElement = document.getElementById('rootNode');
        const configFn = getConfig;
        mobile.bootstrap({
          currentLocale: langConfig.currentLocale,
          parentLocale: langConfig.parentLocale,
          isRegionMetric: langConfig.isRegionMetric,
          rootElement,
          configFn,
        });
      });
    });
  });
}
