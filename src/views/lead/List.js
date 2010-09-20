/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

Mobile.SalesLogix.Lead.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<h3>{%: $.LeadNameLastFirst %}</h3>',
        '<h4>{%: $.Company %}</h4>'        
    ]),
    id: 'lead_list',
    icon: 'content/images/Leads_24x24.gif',
    titleText: 'Leads',
    insertView: 'lead_edit',
    contextView: 'context_dialog',
    resourceKind: 'leads',
    querySelect: [
        'LeadNameLastFirst',
        'Company'
    ],
    queryOrderBy: 'Company',
    formatSearchQuery: function(query) {
        return String.format('(LeadNameLastFirst like "%{0}%")', query);
    }
});
