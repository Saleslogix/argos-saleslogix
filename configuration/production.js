/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class configuration.production
 *
 * @requires Mobile.SalesLogix.ApplicationModule
 *
 */
define('configuration/production', ['Mobile/SalesLogix/ApplicationModule'], function(ApplicationModule) {
    return {
        modules: [
            new ApplicationModule()
        ],
        connections: {
            'crm': {
                isDefault: true,
                offline: true,
                serverName: window.location.hostname,
                virtualDirectory: 'sdata',
                applicationName: 'slx',
                contractName: 'dynamic',
                dataSet: '-',
                port: window.location.port && window.location.port != 80 ? window.location.port : false,
                protocol: /https/i.test(window.location.protocol) ? 'https' : false,
                json: true
            }
        },
        /**
         * @property {Boolean} enableUpdateNotification
         * Turn on to notify users the mobile application has been updated. Uses HTML5 applilcation manifest update events to trigger.
         * The cache manifest the client gets from the server is kept in memory cache and is lost when the application pool resets, so users could potentially see that there is an update even though there is not.
         */
        enableUpdateNotification: true,

        /**
         * @property {Boolean} multiCurrency
         * Set to true to enable multicurrency support. This must also be configured properly on the SData server.
         */
        multiCurrency: false,

        /**
         * @property {Boolean} enableGroups
         * Set to true to enable groups support. Set to false to turn off groups. Custom hashtags will load in either mode.
         */
        enableGroups: true,

        /**
         * @property {Boolean} enableHashTags
         * Set to true to enable hashtag support. Turning this off will remove all hashtags from the right menu, even if a customization adds them.
         */
        enableHashTags: true,

        /**
         * @property {Boolean} maxUploadFileSize
         * The maximum upload file size for attachments, in bytes.
         */
        maxUploadFileSize: 40000000,

        /**
         * @property {Boolean} enableConcurrencyCheck
         * Turns on concurrency checks if two users modify the same record. A validation error will show for the second user that clicks save, explaining the error and forcing them to re-save.
         * If this option is false, the last person to save "wins" if they happen to edit the same field.
         */
        enableConcurrencyCheck: false
    };
});
