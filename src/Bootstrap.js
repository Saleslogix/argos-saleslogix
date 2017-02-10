import 'babel-polyfill';
import ready from 'dojo/ready';
import moment from 'moment';

import MingleUtility from './MingleUtility';
import Application from './Application';
import '../../../argos-sdk/content/css/themes/crm.less';
import '../content/css/app.less';

export function bootstrap({
  currentLocale,
  parentLocale,
  isRegionMetric,
  rootElement,
  modules,
  configFn,
}) {
  let completed = false;
  let mingleAuthResults;
  const ctx = window.ctx;

  ready(() => {
    const appConfig = configFn();
    if (appConfig.mingleEnabled) {
      mingleAuthResults = MingleUtility.populateAccessToken(appConfig);
      if (!mingleAuthResults) {
        return;
      }
    }

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
    if (modules && modules.length) {
      appConfig.modules = appConfig.modules.concat(modules);
    }

    console.log('Creating app instance');
    const instance = new Application(appConfig);
    instance.localeContext = ctx;
    instance.isRegionMetric = isRegionMetric;
    instance.mingleAuthResults = mingleAuthResults;
    console.log('activating..');
    instance.activate();

    console.log('initing...');
    instance.init(rootElement);

    console.log('running');
    instance.run();
    completed = true;
  });
}
