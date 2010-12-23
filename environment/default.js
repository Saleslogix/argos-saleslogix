(function(){
    App.registerService('crm', {
        serverName: window.location.hostname,
        virtualDirectory: 'sdata',
        applicationName: 'slx',
        contractName: 'dynamic',
        port: window.location.port && window.location.port != 80 ? window.location.port : false,
        protocol: /https/i.test(window.location.protocol) ? 'https' : false,
        json: true
    }, { isDefault: true, offline: true });
})();