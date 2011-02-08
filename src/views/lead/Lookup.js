/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

(function() {
    Mobile.SalesLogix.Lead.Lookup = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.LeadNameLastFirst %}</h3>',
            '<h4>{%: $.Company %}</h4>'
        ]),

        //Localization
        titleText: 'Leads',

        //View Properties
        expose: false,
        id: 'leads_lookup',
        queryOrderBy: 'Company',
        querySelect: [
            'Company',
            'LeadNameLastFirst'
        ],
        resourceKind: 'leads',

        formatSearchQuery: function(query) {
            return String.format('(LastNameUpper like "%{0}%" or CompanyUpper like "%{0}%" or upper(FirstName) like "%{0}%")', query.toUpperCase());
        }
    });
})();