import ready from 'dojo/ready';
import moment from 'moment';

import MingleUtility from './MingleUtility';
import Application from './Application';
import ApplicationModule from './ApplicationModule';
import BOEApplicationModule from './Integrations/BOE/ApplicationModule';
import ContourApplicationModule from './Integrations/Contour/ApplicationModule';
// import appConfig from './configuration/development';

const appConfig = {
  modules: [
    new ApplicationModule(),
    new BOEApplicationModule({
      enableDashboards: true,
    }),
    new ContourApplicationModule(),
  ],
  connections: {
    crm: {
      isDefault: true,
      offline: true,
      url: 'http://localhost:8000/sdata/slx/dynamic/-/',
      timeout: 30000,
      compact: true,
      json: true,
    },
  },
  enableUpdateNotification: true,
  multiCurrency: false,
  enableGroups: true,
  enableHashTags: true,
  maxUploadFileSize: 40000000,
  enableConcurrencyCheck: false,
  enableOfflineSupport: false,
  mingleEnabled: false,
  mingleSettings: {
    ti: 'ICRMMIG2_TST',
    cn: 'CRM Mobile',
    ci: 'ICRMMIG2_TST~XOVG6ovrohVO4nu-LX7RcevsF6XDjhPw587iDkEKDHE',
    cs: 'NSX_U8atSS_ShcUDNCVCL91Uu6vU4ZR5oEjA81y6oy-35B4LqO31yV3y7beRpm9xQnRh49CJouspYUMFkh4C-A',
    iu: 'https://mingleinteg01-ionapi.mingledev.infor.com',
    pu: 'https://mingleinteg01-sso.mingledev.infor.com/ICRMMIG2_TST/as/',
    oa: 'authorization.oauth2',
    ot: 'token.oauth2',
    or: 'revoke_token.oauth2',
    ev: 'M1448056811',
  },
  mingleRedirectUrl: 'http://test.infor.com:8000/products/argos-saleslogix/index-dev.html',
};

export function bootstrap({
  currentLocale,
  parentLocale,
  isRegionMetric,
}) {
  let completed = false;
  let mingleAuthResults;
  const ctx = window.ctx;

  if (appConfig.mingleEnabled) {
    mingleAuthResults = MingleUtility.populateAccessToken(appConfig);
    if (!mingleAuthResults) {
      return;
    }
  }
  // const req = (requires) => {
  //   window.require(requires, () => {
  ready(() => {
    if (completed) {
      return;
    }

    let results = moment.locale(parentLocale);

    // moment will return the set culture if successful, otherwise it returns the currently set culture.
    // Check to see if the culture set failed, and attept to use the specific culture instead
    if (results !== parentLocale) {
      results = moment.locale(currentLocale);
      if (results !== currentLocale) {
        console.error(`Failed to set the culture for moment.js, culture set to ${results}`); // eslint-disable-line
      }
    }
    const instance = new Application(appConfig);
    instance.localeContext = ctx;
    instance.isRegionMetric = isRegionMetric;
    instance.mingleAuthResults = mingleAuthResults;
    instance.activate();
    instance.init();
    instance.run();
    completed = true;
  });
    // });
  // };

  // window.require.on('error', () => {
  //   console.log('Error loading localization, falling back to "en"'); // eslint-disable-line
  //   req(legacyLocalizationFallback);
  // });

  // req(legacyLocalization);
}
