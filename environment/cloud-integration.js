/* 
 * include this file in order to force the application to connect
 * to the cloud instance used for the Integration Demo @ Insights 2010.
 */
(function(){
    App.registerService('crm', {
        serverName: 'ec2-174-129-171-80.compute-1.amazonaws.com',
        virtualDirectory: 'sdata-integration',
        applicationName: 'slx',
        contractName: 'dynamic',
        port: 80,
        protocol: /https/i.test(window.location.protocol) ? 'https' : false
    }, { isDefault: true, offline: true });

    App.registerService('erp', {
        serverName: 'ec2-67-202-57-59.compute-1.amazonaws.com',
        virtualDirectory: 'sage50',
        applicationName: 'accounts50',
        contractName: 'gcrm',
        port: 80,
        protocol: /https/i.test(window.location.protocol) ? 'https' : false,
        userName: 'manager',
        password: '',
        version: { major: 0, minor: 9 }
    }, { offline: true });
})();

