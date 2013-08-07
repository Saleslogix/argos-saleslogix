/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Event/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    format,
    List
) {

    return declare('Mobile.SalesLogix.Views.Event.List', [List], {
        // Localization
        titleText: 'Events',
        eventDateFormatText: 'M/D/YYYY',
        eventText: 'Event',

        //Templates
        itemTemplate: new Simplate([
            '<h3>{%= $.Description %}</h3>',
            '<h4>',
            '{%: Mobile.SalesLogix.Format.date($.StartDate, $$.eventDateFormatText) %}',
            '&nbsp;-&nbsp;',
            '{%: Mobile.SalesLogix.Format.date($.EndDate, $$.eventDateFormatText) %}',
            '</h4>'
        ]),

        //View Properties
        id: 'event_list',
        security: null, //'Entities/Event/View',
        icon: 'content/images/icons/Holiday_schemes_24.png',
        detailView: 'event_detail',
        insertView: 'event_edit',
        queryOrderBy: 'StartDate asc',
        queryWhere: null,
        querySelect: [
            'Description',
            'StartDate',
            'EndDate',
            'UserId',
            'Type'
        ],
        resourceKind: 'events',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

