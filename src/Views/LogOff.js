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
                '<h2>{%= $.messageText %}</h2>',
            '</div>'
        ]),

        //Localization
        messageText: 'You have been logged out. Please close your browser window.',
        titleText: 'Logged Out',

        id: 'logoff',

        createToolLayout: function() {
            return this.tools || (this.tools = {
                bbar: false,
                tbar: false
            });
        }
    });
});

