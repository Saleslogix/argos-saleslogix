define('Mobile/SalesLogix/Views/Competitor/List', [
    'dojo/_base/declare',
    'dojo/string',
    'argos/List',
    'argos/_SDataListMixin'
], function(
    declare,
    string,
    List,
    _SDataListMixin
) {

    return declare('Mobile.SalesLogix.Views.Competitor.List', [List, _SDataListMixin], {
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