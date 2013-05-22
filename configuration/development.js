define('configuration/development', ['Mobile/SalesLogix/ApplicationModule'], function(ApplicationModule) {

    return {
        modules: [
            new ApplicationModule()
        ],
        connections: {
            'crm': {
                isDefault: true,
                offline: true,
                url: 'http://localhost/sdata/slx/dynamic/-/',
                json: true
            }
        },
        enableUpdateNotification: true,
        multiCurrency: false,
        maxUploadFileSize: 40000000
    };

});
