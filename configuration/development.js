define('configuration/development', ['Mobile/SalesLogix/ApplicationModule'], function(ApplicationModule) {

    return {
        modules: [
            new ApplicationModule()
        ],
        connections: {
            'crm': {
                isDefault: true,
                offline: true,
                url: 'http://50.16.242.109/sdata/slx/dynamic/-/',
                json: true
            }
        },
        enableUpdateNotification: true
    };

});