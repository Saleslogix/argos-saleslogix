/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.Lookup = Ext.extend(Sage.Platform.Mobile.List, {
    //Templates
    contentTemplate: new Simplate([
        '<h3>{%: $.AccountName %}</h3>'
    ]),

    //Localization
    titleText: 'Accounts',
    resourceKind: 'accounts',

    //View Properties
    expose: false,
    id: 'account_lookup',
    queryOrderBy: 'AccountName',
    querySelect: [
        'AccountName',
        'AccountManager/UserInfo/UserName',
        'AccountManager/UserInfo/LastName',
        'AccountManager/UserInfo/FirstName'
    ],
    formatSearchQuery: function(query) {
        return String.format('AccountNameUpper like "%{0}%"', query.toUpperCase());
    }
});