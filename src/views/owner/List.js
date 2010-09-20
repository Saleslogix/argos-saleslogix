/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Owner");

Mobile.SalesLogix.Owner.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<h3>{%: $.OwnerDescription %}</h3>'        
    ]),
    id: 'owner_list',
    titleText: 'Owners',
    icon: 'content/images/Accounts_24x24.gif',
    resourceKind: 'owners',
    querySelect: [
        'OwnerDescription'
    ],
    queryOrderBy: 'OwnerDescription',
    formatSearchQuery: function(query) {
        return String.format('owner.OwnerDescription like "%{0}%"', query);
    }
});