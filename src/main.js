import { bootstrapLocalization } from './Bootstrap.localization';

const currentLocale = 'en';

bootstrapLocalization({
  supportedLocales: [
    'en',
    'en-GB',
    'de',
    'fr',
    'it',
    'ru',
    'zh-CN',
    'zh-TW',
    'es',
    'pt',
  ],
  defaultLocale: 'en',
  currentLocale,
  localeFiles: [
    './localization/locales/crm/en/strings.l20n',
    './localization/locales/crm/en/regional.l20n',
    './localization/locales/icboe/en/strings.l20n',
    './localization/locales/icboe/en/regional.l20n',
    './localization/locales/contour/en/strings.l20n',
    '../../argos-sdk/localization/locales/argos/en/strings.l20n',
    '../../argos-sdk/localization/locales/argos/en/regional.l20n',
  ],
}).then(() => {
  require.ensure([], (require) => {
    require('../../../argos-sdk/libraries/Simplate');
    const mobile = require('./Bootstrap');
    const rootElement = document.getElementById('rootNode');
    mobile.bootstrap({
      currentLocale,
      parentLocale: 'en',
      isRegionMetric: false,
      rootElement,
    });
  });
    // var rootElement = document.getElementById('rootNode');
    // icrm.core.bootstrap({
    //   currentLocale: currentLocale,
    //   parentLocale: 'en',
    //   isRegionMetric: false,
    //   rootElement: rootElement
    // });
  // }
  // document.head.appendChild(script);
});
