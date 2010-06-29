/* 
 * include this file in order to force the application to connect
 * to the cloud instance used for the Mobile Demo @ Insights 2010.
 */
(function(){
    App.registerService('crm', {
        serverName: window.location.hostname,
        virtualDirectory: 'sdata',
        applicationName: 'slx',
        contractName: 'dynamic',
        port: window.location.port && window.location.port != 80 ? window.location.port : false,
        protocol: /https/i.test(window.location.protocol) ? 'https' : false
    }, { isDefault: true, offline: true });
})();

