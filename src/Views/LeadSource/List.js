/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.LeadSource.List
 *
 * @extends argos.List
 */
define('crm/Views/LeadSource/List', [
    'dojo/_base/declare',
    'dojo/string',
    'argos/List'
], function(
    declare,
    string,
    List
) {

    return declare('crm.Views.LeadSource.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Description %}</h3>',
            '<h4>{%: $.Status %}</h4>'
        ]),

        //Localization
        titleText: 'Lead Sources',

        //View Properties
        id: 'leadsource_list',
        security: 'Entities/LeadSource/View',
        queryOrderBy: 'Description',
        querySelect: [
            'Description',
            'Status'
        ],
        resourceKind: 'leadsources',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Description) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

