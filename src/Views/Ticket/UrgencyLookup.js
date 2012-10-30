define('Mobile/SalesLogix/Views/Ticket/UrgencyLookup', [
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

    return declare('Mobile.SalesLogix.Views.Ticket.UrgencyLookup', [List, _SDataListMixin], {
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