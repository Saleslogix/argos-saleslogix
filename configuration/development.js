define('configuration/development', [
  'crm/ApplicationModule',
  'crm/Integrations/BOE/ApplicationModule',
  'crm/Integrations/Contour/ApplicationModule',
], function cb(ApplicationModule, BOEApplicationModule, ContourApplicationModule) {
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
    ],
    connections: {
      'crm': {
        isDefault: true,
        offline: true,
        url: 'http://localhost:8000/sdata/slx/dynamic/-/',
        /* serverName: 'mingleinteg01-ionapi.mingledev.infor.com/ICRMMIG3_TST/CRMSData',
        virtualDirectory: 'sdata',
        applicationName: 'slx',
        contractName: 'dynamic',
        dataSet: '-',
        port: false, // window.location.port && window.location.port !== '80' ? window.location.port : false,
        protocol: 'https', // /https/i.test(window.location.protocol) ? 'https' : false, */
        timeout: 30000,
        compact: true,
        json: true,
      },
    },
    enableUpdateNotification: true,
    multiCurrency: true,
    enableGroups: true,
    enableHashTags: true,
    maxUploadFileSize: 40000000,
    enableConcurrencyCheck: false,
    enableOfflineSupport: false,
    mingleEnabled: false,
    mingleSettings: {
        "ti": "ICRMMIG3_TST",
        "cn": "dev1",
        "ci": "ICRMMIG3_TST~Cz_mgs9JKyVLW1cU_4xIS9Uqqz-sABao7mXzYFmx9oo",
        "cs": "se_lrEsPHGyZ9UagxOFw50hN4bmTQK3qpHcUG3ioqcbGSZxPa2fPtjle5ynKQKa7nv25tA9gb8MdU4n3wpomwQ",
        "iu": "https://mingleinteg01-ionapi.mingledev.infor.com",
        "pu": "https://mingleinteg01-sso.mingledev.infor.com/ICRMMIG3_TST/as/",
        "oa": "authorization.oauth2", "ot": "token.oauth2", "or": "revoke_token.oauth2", "ev": "M1448056811",
    },
    mingleRedirectUrl: 'http://test.infor.com:8000/products/argos-saleslogix/index-dev.html'
  };
});
