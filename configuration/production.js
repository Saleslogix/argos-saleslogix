/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('configuration/production', ['Mobile/SalesLogix/ApplicationModule'], function(ApplicationModule) {
    return {
        modules: [
            new ApplicationModule()
        ],
        connections: {
            'crm': {
                isDefault: true,
                offline: true,
                serverName: window.location.hostname,
                virtualDirectory: 'sdata',
                applicationName: 'slx',
                contractName: 'dynamic',
                dataSet: '-',
                port: window.location.port && window.location.port != 80 ? window.location.port : false,
                protocol: /https/i.test(window.location.protocol) ? 'https' : false,
                json: true
            }
        },
        enableUpdateNotification: true,
        multiCurrency: false,
        maxUploadFileSize: 40000000
    };
});
