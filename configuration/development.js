define('configuration/development', ['crm/ApplicationModule'], function cb(ApplicationModule) {
  return {
    modules: [
      new ApplicationModule(),
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
  };
});
