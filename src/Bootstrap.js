import 'babel-polyfill';
import moment from 'moment';

import MingleUtility from './MingleUtility';
import Application from './Application';
import ApplicationModule from './ApplicationModule';
import BOEApplicationModule from './Integrations/BOE/ApplicationModule';
import ContourApplicationModule from './Integrations/Contour/ApplicationModule';
import '../../../argos-sdk/content/css/themes/crm.less';
import '../content/css/app.less';

export function bootstrap({
  currentLocale,
  parentLocale,
  isRegionMetric,
  rootElement,
  modules,
  userConfig,
}) {
  let mingleAuthResults;
  const ctx = window.ctx;
  const appConfig = Object.assign({}, userConfig, {
    modules: [
      new ApplicationModule(),
      new BOEApplicationModule(),
      new ContourApplicationModule(),
    ],
  });

  if (appConfig.mingleEnabled) {
    mingleAuthResults = MingleUtility.populateAccessToken(appConfig);
    if (!mingleAuthResults) {
      return;
    }
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
  if (modules && modules.length) {
    appConfig.modules = appConfig.modules.concat(modules);
  }

  const instance = new Application(appConfig);
  instance.localeContext = ctx;
  instance.isRegionMetric = isRegionMetric;
  instance.mingleAuthResults = mingleAuthResults;
  instance.activate();
  instance.init(rootElement);
  instance.run();
}
