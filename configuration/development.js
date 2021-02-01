/* eslint-disable */
define('configuration/development', [
  'dojo/_base/lang',
  'configuration/development.default'
], function cb(lang, defaultConfig) {
  return lang.mixin(defaultConfig, {
    /**
     * Un-comment settings below to override defaults
     */

    /**
     * @property {Boolean} enableMultiCurrency
     * Set to true to enable multicurrency support. This must also be configured properly on the SData server.
     */
    // enableMultiCurrency: false,

    /**
     * @property {Boolean} enableGroups
     * Set to true to enable groups support. Set to false to turn off groups. Custom hashtags will load in either mode.
     */
    // enableGroups: true,

    /**
     * @property {Boolean} enableHashTags
     * Set to true to enable hashtag support. Turning this off will remove all hashtags from the right menu, even if a customization adds them.
     */
    // enableHashTags: true,

    /**
     * @property {Boolean} maxUploadFileSize
     * The maximum upload file size for attachments, in bytes.
     */
    // maxUploadFileSize: 40000000,

    /**
     * @property {Boolean} enableConcurrencyCheck
     * Turns on concurrency checks if two users modify the same record. A validation error will show for the second user that clicks save, explaining the error and forcing them to re-save.
     * If this option is false, the last person to save "wins" if they happen to edit the same field.
     */
    // enableConcurrencyCheck: false,

    /**
     * @property {Boolean} enableOfflineSupport
     * Enables offline support for briefcasing data offline, that can be viewed when the connection is lost.
     */
    // enableOfflineSupport: false,

    /**
     * @property {Boolean} enableServiceWorker
     * Enables use of a web service worker to cache offline files. This is a replacement for the old cache manifest.
     * If offline support is true, this setting will be ignored and a service worker will be used. The website
     * MUST be secure for this to function.
     */
    // enableServiceWorker: true,

    /**
     * @property {Boolean} enableMingle
     * Enables mingle SSO support
     */
    // enableMingle: false,

    /**
     * @property {String} warehouseDiscovery
     * Defaults to "auto", set to "manual" for ERP systems that cannot query warehouses for availability.
     */
    // warehouseDiscovery: 'auto',

    /**
     * @property mingleSettings
     * Settings downloaded from the mingle site after adding the crm mobile app
     */
    // mingleSettings: {
    //     "ti": "ICRMMIG2_TST",
    //     "cn": "CRM Mobile",
    //     "ci": "ICRMMIG2_TST~XOVG6ovrohVO4nu-LX7RcevsF6XDjhPw587iDkEKDHE",
    //     "cs": "NSX_U8atSS_ShcUDNCVCL91Uu6vU4ZR5oEjA81y6oy-35B4LqO31yV3y7beRpm9xQnRh49CJouspYUMFkh4C-A",
    //     "iu": "https://mingleinteg01-ionapi.mingledev.infor.com",
    //     "pu": "https://mingleinteg01-sso.mingledev.infor.com/ICRMMIG2_TST/as/",
    //     "oa": "authorization.oauth2", "ot": "token.oauth2", "or": "revoke_token.oauth2", "ev": "M1448056811"
    // },

    /**
     * @property mingleRedirectUrl
     * This should be the same url that was added in mingle as redirected url
     */
    // mingleRedirectUrl: 'http://test.infor.com:8000/products/argos-saleslogix/index-dev.html',

    /**
     * @property enableRememberMe
     * Turn on/off the UI for "Remember Me" on the login view.
     */
    // enableRememberMe: true,

    /**
     * @property speedSearch
     * Speedsearch service call settings
     */
    // speedSearch: {
    //   includeStemming: true,
    //   includePhonic: true,
    //   includeThesaurus: false,
    //   useFrequentFilter: false,
    //   searchType: 1,
    // }
  });
});
