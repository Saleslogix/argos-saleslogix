/* eslint-disable */
define('configuration/production', [
  'dojo/_base/lang',
  'configuration/production.default'
], function cb(lang, defaultConfig) {
  return lang.mixin(defaultConfig, {
    // Override default properties here, example:
    // enableOfflineSupport: true,
  });
});
