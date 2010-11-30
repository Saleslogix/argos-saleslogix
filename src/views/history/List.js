/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.ActivityTypesLookup = {
        'atQuestion': 'Question',
        'atEMail': 'E-mail'
    };

    Mobile.SalesLogix.History.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        itemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
        contentTemplate: new Simplate([
            '<h3>',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.StartDate, "h:mm") %}</span>',
            '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.StartDate, "tt") %}</span>,',
            '<span class="p-description">&nbsp;{%: $.Description %}</span>',
            '</h3>',
            '<h4>{%: Mobile.SalesLogix.Format.date($.StartDate, "ddd M/d/yy") %} - {%= $$.nameTemplate.apply($) %}</h4>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.ContactName) { %}',
            '{%: $.ContactName %} / {%: $.AccountName %}',
            '{% } else if ($.AccountName) { %}',
            '{%: $.AccountName %}',
            '{% } else { %}',
            '{%: $.LeadName %}',
            '{% } %}'
        ]),

        //Localization
        titleText: 'History',
        
        //View Properties
        detailView: 'history_detail',
        icon: 'content/images/icons/journal_24.png',
        id: 'history_related',
        insertView: 'history_edit',
        queryOrderBy: 'StartDate desc',
        querySelect: [
            'StartDate',
            'AccountName',
            'Type',
            'Description'
        ],
        resourceKind: 'history',

        init: function() {
            Mobile.SalesLogix.History.List.superclass.init.apply(this, arguments);

            this.tools.tbar = [];
        },
        formatSearchQuery: function(query) {
            return String.format('Description like "%{0}%"', query);
        }
    });
})();