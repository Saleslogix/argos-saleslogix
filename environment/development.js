(function(){
    App.registerService('crm', {
        serverName: '50.16.242.109', 
        virtualDirectory: 'sdata',
        applicationName: 'slx',
        contractName: 'dynamic',
        port: 80,
        json: true,
        protocol: /https/i.test(window.location.protocol) ? 'https' : false
    }, { isDefault: true, offline: true });
})();

