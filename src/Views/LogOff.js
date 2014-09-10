/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/LogOff', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/View'
], function(
    declare,
    View
) {

    return declare('Mobile.SalesLogix.Views.LogOff', [View], {
        //Templates
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%: $.titleText %}" class="panel {%= $.cls %}" hideBackButton="true">',
                '<h3>{%= $.messageText %}</h3>',
                '<a href="" data-action="login">{%: $.loginText %}</a>',
            '</div>'
        ]),

        //Localization
        messageText: 'You have been logged out. Please close your browser window.',
        loginText: 'Click here to log back in.',
        titleText: 'Logged Out',

        id: 'logoff',

        login: function() {
            window.open('#_login', '_blank', 'menubar,status,scrollbars,toolbar,location,personalbar');
        },

        createToolLayout: function() {
            return this.tools || (this.tools = {
                bbar: false,
                tbar: false
            });
        }
    });
});

