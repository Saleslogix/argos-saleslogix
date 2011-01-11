Ext.namespace("Configuration.production");

Ext.apply(Configuration.production, {
    modules: [
        new Mobile.SalesLogix.ApplicationModule()
    ],
    connections: {
        'crm': {
            isDefault: true,
            offline: true,
            serverName: window.location.hostname,
            virtualDirectory: 'sdata',
            applicationName: 'slx',
            contractName: 'dynamic',
            port: window.location.port && window.location.port != 80 ? window.location.port : false,
            protocol: /https/i.test(window.location.protocol) ? 'https' : false,
            json: true
        }
    }
});