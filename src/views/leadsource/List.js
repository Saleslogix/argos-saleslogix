/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.LeadSource");

Mobile.SalesLogix.LeadSource.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<h3>{%: $.Description %}</h3>',
        '<h4>{%: $.Status %}</h4>'        
    ]),
    id: 'leadsource_list',
    icon: 'content/images/Accounts_24x24.gif',
    titleText: 'Lead Sources',
    resourceKind: 'leadsources',
    querySelect: [
        'Description',
        'Status'
    ],
    queryOrderBy: 'Description',
    formatSearchQuery: function(query) {
        return String.format('Description like "%{0}%"', query);
    }
});
