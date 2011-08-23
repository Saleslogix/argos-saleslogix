Ext.namespace("Configuration.development");

Ext.apply(Configuration.development, {
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
            protocol: /https/i.test(window.location.protocol) ? 'https' : false,
            json: true
        }
    },
    enableUpdateNotification: true
});