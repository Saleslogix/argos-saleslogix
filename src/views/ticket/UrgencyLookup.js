/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

(function() {
    Mobile.SalesLogix.Ticket.UrgencyLookup = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.Description %}</h3>'
        ]),

        //Localization
        titleText: 'Ticket Urgency',

        //View Properties
        id: 'urgency_list',
        queryOrderBy: 'UrgencyCode asc',
        querySelect: [
            'Description',
            'UrgencyCode'
        ],
        resourceKind: 'urgencies',

        formatSearchQuery: function(query) {
            return String.format('upper(Description) like "%{0}%"', this.escapeSearchQuery(query.toUpperCase()));
        }
    });
})();