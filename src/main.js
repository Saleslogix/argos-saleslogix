import { bootstrapLocalization } from './Bootstrap.localization';

export function main(langConfig, appConfig) {
  bootstrapLocalization(langConfig).then(() => {
    require.ensure(['../configuration/development'], (require) => {
      const mobile = require('./Bootstrap');
      const rootElement = document.getElementById('rootNode');
      mobile.bootstrap({
        currentLocale: langConfig.currentLocale,
        parentLocale: langConfig.parentLocale,
        isRegionMetric: langConfig.isRegionMetric,
        rootElement,
        appConfig,
      });
    });
  });
}
