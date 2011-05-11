/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.LeadSource");

(function() {
    Mobile.SalesLogix.LeadSource.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.Description %}</h3>',
            '<h4>{%: $.Status %}</h4>'
        ]),

        //Localization
        titleText: 'Lead Sources',

        //View Properties
        icon: 'content/images/Accounts_24x24.gif',
        id: 'leadsource_list',
        queryOrderBy: 'Description',
        querySelect: [
            'Description',
            'Status'
        ],
        resourceKind: 'leadsources',

        formatSearchQuery: function(query) {
            return String.format('upper(Description) like "{0}%"', this.escapeSearchQuery(query.toUpperCase()));
        }
    });
})();