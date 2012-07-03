define('Mobile/SalesLogix/Views/Opportunity/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/_SDataListMixin'
], function(
    declare,
    string,
    format,
    List,
    _SDataListMixin
) {

    return declare('Mobile.SalesLogix.Views.Opportunity.List', [List, _SDataListMixin], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-opportunity-status="{%: $.Status %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        //TODO: Support ExchangeRateCode with proper symbol
        itemTemplate: new Simplate([
            '<h3>{%: $.Description %} <span class="p-account">{% if ($.Account) { %}({%: $.Account.AccountName %}){% } %}</span></h3>',
            '<h4>',
            '{%: $.Status %} {%: Mobile.SalesLogix.Format.currency($.SalesPotential) %}',
            '{% if ($.Stage) { %} | {%: $.Stage %}{% } %}',
            '{% if ($.Account) { %} | {%: $.Account.AccountManager.UserInfo.UserName %}{% } %}',
            '{% if ($.Account && $.Account.AccountManager.UserInfo.Region) { %} - {%: $.Account.AccountManager.UserInfo.Region %}{% } %}',
            '</h4>'
        ]),

        //Localization
        titleText: 'Opportunities',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',
        hashTagQueriesText: {
          'open': 'open',
          'closed': 'closed',
          'won': 'won',
          'lost': 'lost'
        },

        //View Properties
        id: 'opportunity_list',
        security: 'Entities/Opportunity/View',
        icon: 'content/images/icons/opportunity_24.png',
        detailView: 'opportunity_detail',
        insertView: 'opportunity_edit',
        hashTagQueries: {
            'open': 'Closed eq false',
            'closed': 'Closed eq true',
            'won': 'Status eq "Closed - Won"',
            'lost': 'Status eq "Closed - Lost"'
        },
        queryOrderBy: 'EstimatedClose desc',
        querySelect: [
            'Account/AccountName',
            'Account/AccountManager/UserInfo/UserName',
            'Account/AccountManager/UserInfo/Region',
            'Description',
            'Stage',
            'Status',
            'SalesPotential'
        ],
        resourceKind: 'opportunities',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(upper(Description) like "${0}%" or Account.AccountNameUpper like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});