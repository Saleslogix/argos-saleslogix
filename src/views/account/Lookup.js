/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.Lookup = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<h3>{%: $.AccountName %}</h3>'
    ]),
    id: 'account_lookup',
    expose: false,
    titleText: 'Accounts',
    resourceKind: 'accounts',
    querySelect: [
        'AccountName',
        'AccountManager/UserInfo/UserName',
        'AccountManager/UserInfo/LastName',
        'AccountManager/UserInfo/FirstName'
    ],
    queryOrderBy: 'AccountName',
    formatSearchQuery: function(query) {
        return String.format('AccountName like "%{0}%"', query);
    }
});