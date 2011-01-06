/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Settings = Ext.extend(Sage.Platform.Mobile.List, {
    //Templates
    contentTemplate: new Simplate([
        '<h3 data-action="{%= $.action %}">',
        '{% if ($.icon) { %}',
        '<img src="{%: $.icon %}" alt="icon" class="icon" />',
        '{% } %}',
        '<span>{%: $.title %}</span>',
        '</h3>'
    ]),

    //Localization
    localStorageClearedText: 'Local storage cleared successfully.',
    credentialsClearedText: 'Saved credentials cleared successfully.',
    titleText: 'Settings',

    //View Properties
    id: 'settings',
    icon: 'content/images/icons/settings_24.png',
    expose: false,
    hideSearch: true,
    selectionOnly: true,
    allowSelection: false,
    actions: {
        'clearLocalStorage': {
            title: 'Clear Storage',
            icon: 'content/images/icons/database_24.png'            
        },
        'clearAuthentication': {
            title: 'Clear Saved Credentials',
            icon: 'content/images/icons/security_24.png'
        }
    },
    actionOrder: [
        'clearAuthentication',
        'clearLocalStorage'   
    ],

    clearLocalStorage: function() {
        if (window.localStorage)
            window.localStorage.clear();

        alert(this.localStorageClearedText);
    },
    clearAuthentication: function() {
        if (window.localStorage)
            window.localStorage.removeItem('credentials');

        alert(this.credentialsClearedText);
    },
    hasMoreData: function() {
        return false;
    },
    requestData: function() {
        var list = [];

        for (var i = 0; i < this.actionOrder.length; i++)
        {
            var action = this.actions[this.actionOrder[i]];
            if (action)
            {
                list.push({
                    action: this.actionOrder[i],
                    title: action.title,
                    icon: action.icon
                });
            }
        }

        this.processFeed({'$resources': list});
    },
    init: function() {
        Mobile.SalesLogix.Home.superclass.init.apply(this, arguments);        
     
        this.tools.tbar = [];
    }
});