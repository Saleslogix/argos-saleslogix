/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Event/List', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Event.List', [Sage.Platform.Mobile.List], {
        // Localization
        titleText: 'Events',
        eventDateFormatText: 'M/d/yyyy',
        eventText: 'Event',

        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $$.eventText %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
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
            return dojo.string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});
