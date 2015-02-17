/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.Ticket.UrgencyLookup
 *
 * @extends argos.List
 */
define('crm/Views/Ticket/UrgencyLookup', [
    'dojo/_base/declare',
    'dojo/string',
    'argos/List'
], function(
    declare,
    string,
    List
) {

    return declare('crm.Views.Ticket.UrgencyLookup', [List], {
        //Localization
        titleText: 'Ticket Urgency',

        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Description %}</h3>'
        ]),

        //View Properties
        id: 'urgency_list',
        queryOrderBy: 'UrgencyCode asc',
        querySelect: [
            'Description',
            'UrgencyCode'
        ],
        resourceKind: 'urgencies',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Description) like "%${0}%"', this.escapeSearchQuery(searchQuery.toUpperCase()));
        }
    });
});

