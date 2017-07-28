/* eslint-disable */
define('configuration/development.default', [
  'crm/ApplicationModule',
  'crm/Integrations/BOE/ApplicationModule',
  'crm/Integrations/Contour/ApplicationModule',
  'crm/Integrations/SalesNavigator/ApplicationModule',
], function cb(ApplicationModule, BOEApplicationModule, ContourApplicationModule, SalesNavigatorApplicationModule) {
  // Toggle console logs for PouchDB
  // PouchDB.debug.enable('*');
  PouchDB.debug.disable();

  return {
    modules: [
      new ApplicationModule(),
      new BOEApplicationModule({
        enableDashboards: true,
      }),
      new ContourApplicationModule(),
      new SalesNavigatorApplicationModule(),
    ],
    connections: {
      'crm': {
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
    warehouseDiscovery: 'auto',
    mingleSettings: {
        "ti": "ICRMMIG2_TST",
        "cn": "CRM Mobile",
        "ci": "ICRMMIG2_TST~XOVG6ovrohVO4nu-LX7RcevsF6XDjhPw587iDkEKDHE",
        "cs": "NSX_U8atSS_ShcUDNCVCL91Uu6vU4ZR5oEjA81y6oy-35B4LqO31yV3y7beRpm9xQnRh49CJouspYUMFkh4C-A",
        "iu": "https://mingleinteg01-ionapi.mingledev.infor.com",
        "pu": "https://mingleinteg01-sso.mingledev.infor.com/ICRMMIG2_TST/as/",
        "oa": "authorization.oauth2", "ot": "token.oauth2", "or": "revoke_token.oauth2", "ev": "M1448056811"
    },
    mingleRedirectUrl: 'http://test.infor.com:8000/products/argos-saleslogix/index-dev.html'
  };
});
