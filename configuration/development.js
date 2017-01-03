/* eslint-disable */
define('configuration/development', [
  'dojo/_base/lang',
  'configuration/development.default'
], function cb(lang, defaultConfig) {
  return lang.mixin(defaultConfig, {
    // Override default properties here, example:
    // enableOfflineSupport: true,
  });
});
