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
  };
});
