define('configuration/development', ['Mobile/SalesLogix/ApplicationModule'], function() {

    return {
        modules: [
            new Mobile.SalesLogix.ApplicationModule()
        ],
        connections: {
            'crm': {
                isDefault: true,
                offline: true,
                serverName: '50.16.242.109',
                virtualDirectory: 'sdata',
                applicationName: 'slx',
                contractName: 'dynamic',
                port: 80,
                protocol: false,
                json: true            }
        },
        enableUpdateNotification: true
    };

});