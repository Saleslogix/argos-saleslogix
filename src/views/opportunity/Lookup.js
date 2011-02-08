/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Opportunity");

(function() {
    Mobile.SalesLogix.Opportunity.Lookup = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.Account ? $.Account.AccountName : "" %}</h3>',
            '<h4>{%: $.Description %}</h4>'
        ]),

        //Localization
        titleText: 'Opportunities',

        //View Properties
        expose: false,
        id: 'opportunity_lookup',
        queryOrderBy: 'Description',
        querySelect: [
            'Account/AccountName',
            'Description',
            'Stage'
        ],
        resourceKind: 'opportunities',

        formatSearchQuery: function(query) {
            return String.format('(upper(Description) like "%{0}%" or Account.AccountNameUpper like "%{0}%")', query.toUpperCase());
        }
    });
})();