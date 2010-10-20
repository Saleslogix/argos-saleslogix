/* 
 * include this file in order to force the application to connect
 * to the cloud instance used for the Mobile Demo @ Insights 2010.
 */
 //http://slxbrowser.sagesaleslogixcloud.com/sdata/slx/dynamic/-/accounts?_includeContent=false&count=10&startIndex=1&include=Address&orderby=AccountName&select=AccountName%2CAddress%2FCity&_dc=1277929430553
(function(){
    App.registerService('crm', {
        serverName: 'slxbrowser.sagesaleslogixcloud.com', 
        virtualDirectory: 'sdata',
        applicationName: 'slx',
        contractName: 'dynamic',
        port: 80,
        protocol: /https/i.test(window.location.protocol) ? 'https' : false
    }, { isDefault: true, offline: true });
})();

