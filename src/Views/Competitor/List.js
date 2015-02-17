/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.Competitor.List
 *
 * @extends argos.List
 *
 * @requires argos.List
 *
 */
define('crm/Views/Competitor/List', [
    'dojo/_base/declare',
    'dojo/string',
    'argos/List'
], function(
    declare,
    string,
    List
) {

    return declare('crm.Views.Competitor.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%= $.CompetitorName %}</h3>',
            '{% if ($.WebAddress) { %}<h4>{%= $.WebAddress %}</h4>{% } %}'
        ]),

        //Localization
        titleText: 'Competitors',

        //View Properties
        detailView: 'competitor_detail',
        id: 'competitor_list',
        security: 'Entities/Competitor/View',
        insertView: 'competitor_edit',
        queryOrderBy: 'CompetitorName asc',
        querySelect: [
            'CompetitorName',
            'WebAddress'
        ],
        resourceKind: 'competitors',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(CompetitorName like "%${0}%")', [this.escapeSearchQuery(searchQuery)]);
        }
    });
});

