/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/LeadSource/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    List
) {

    return declare('Mobile.SalesLogix.Views.LeadSource.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Description %}</h3>',
            '<h4>{%: $.Status %}</h4>'
        ]),

        //Localization
        titleText: 'Lead Sources',

        //View Properties
        icon: 'content/images/Accounts_24x24.gif',
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

