define('Mobile/SalesLogix/Views/Activity/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert'
], function(
    declare,
    string,
    List
) {

    return declare('Mobile.SalesLogix.Views.Activity.List', [List], {
        // Localization
        startDateFormatText: 'ddd M/d/yy',
        startTimeFormatText: 'h:mm',
        allDayText: 'All-Day',

        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        activityTimeTemplate: new Simplate([
            '{% if ($.Timeless) { %}',
            '<span class="p-meridiem">{%: $$.allDayText %}</span>',
            '{% } else { %}',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.StartDate, $$.startTimeFormatText) %}</span>',
            '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.StartDate, "tt") %}</span>,',
            '{% } %}'
        ]),
        itemTemplate: new Simplate([
            '<h3>',
            '{%! $$.activityTimeTemplate %}',
            '<span class="p-description">&nbsp;{%: $.Description %}</span>',
            '</h3>',
            '<h4>{%: Mobile.SalesLogix.Format.date($.StartDate, $$.startDateFormatText, Sage.Platform.Mobile.Convert.toBoolean($.Timeless)) %} - {%! $$.nameTemplate %}</h4>'
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
        titleText: 'Activities',      

        //View Properties
        id: 'activity_list',
        security: null, //'Entities/Activity/View',
        icon: 'content/images/icons/To_Do_24x24.png',
        detailView: 'activity_detail',
        insertView: 'activity_types_list',
        queryOrderBy: 'Timeless desc, StartDate desc',
        querySelect: [
            'Description',
            'StartDate',
            'Type',
            'AccountName',
            'ContactName',
            'LeadId',
            'LeadName',
            'UserId',
            'Timeless'
        ],
        resourceKind: 'activities',
                
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});