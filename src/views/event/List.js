/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Event");

(function() {
    Mobile.SalesLogix.Event.List = Ext.extend(Sage.Platform.Mobile.List, {
        // Localization
        titleText: 'Events',
        eventDateFormatText: 'M/d/yyyy',

        //Templates
        itemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
        contentTemplate: new Simplate([
            '<h3>{%= $.Description %}</h3>',
            '<h4>',
                '{%: Mobile.SalesLogix.Format.date($.StartDate, $$.eventDateFormatText) %}',
                '&nbsp;-&nbsp;',
                '{%: Mobile.SalesLogix.Format.date($.EndDate, $$.eventDateFormatText) %}',
            '</h4>'
        ]),

        //View Properties
        id: 'event_list',
        icon: 'content/images/icons/To_Do_24x24.png',
        detailView: 'event_detail',
        insertView: 'event_edit',
        queryOrderBy: 'StartDate asc',
        querySelect: [
            'Description',
            'StartDate',
            'EndDate',
            'UserId',
            'Type'
        ],
        resourceKind: 'events',

        formatSearchQuery: function(query) {
            return String.format('upper(Description) like "%{0}%"', this.escapeSearchQuery(query.toUpperCase()));
        }
    });
})();
