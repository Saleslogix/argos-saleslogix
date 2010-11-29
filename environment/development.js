(function(){
    App.registerService('crm', {
        serverName: 'ec2-50-16-242-109.compute-1.amazonaws.com', 
        virtualDirectory: 'sdata',
        applicationName: 'slx',
        contractName: 'dynamic',
        port: window.location.port && window.location.port != 80 ? window.location.port : false,
        json: true,
        protocol: /https/i.test(window.location.protocol) ? 'https' : false
    }, { isDefault: true, offline: true });
})();

