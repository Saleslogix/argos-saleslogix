define('configuration/development', ['Mobile/SalesLogix/ApplicationModule'], function(ApplicationModule) {

    return {
        modules: [
            new ApplicationModule()
        ],
        connections: {
            'crm': {
                isDefault: true,
                offline: true,
                //url: 'http://localhost/sdata/slx/dynamic/-/',
                url: 'http://10.40.201.33/sdata/slx/dynamic/-/',
                json: true,
                userName: 'lee',
                password: ''
            }
        },
        enableUpdateNotification: true
    };

});
