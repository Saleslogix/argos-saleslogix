/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Competitor/List', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Competitor.List', [Sage.Platform.Mobile.List], {
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

        formatSearchQuery: function(query) {
            return dojo.string.substitute('(CompetitorName like "%${0}%")', [this.escapeSearchQuery(query)]);
        }
    });
});