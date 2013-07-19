define('Mobile/SalesLogix/Views/Activity/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/GroupedList',
    'Mobile/SalesLogix/_CardLayoutListMixin',
    'Sage/Platform/Mobile/Groups/DateTimeSection',
     'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert'
], function(
    declare,
    string,
    GroupedList,
    _CardLayoutListMixin,
    DateTimeSection
) {

    return declare('Mobile.SalesLogix.Views.Activity.List', [GroupedList, _CardLayoutListMixin], {

        itemColorClass: 'color-activity',
        // Localization
        startDateFormatText: 'ddd M/d/yy',
        startTimeFormatText: 'h:mm',
        allDayText: 'All-Day',

        //Templates
        itemColorClassTemplate: new Simplate([
           '{%: $$.activityColorClassByType[$.Type] || $$.itemColorClass  %}'
        ]),
        itemTabValueTemplate: new Simplate([
       //'{%: $$.activityTextByType[$.Type] %}'
          '{%: Mobile.SalesLogix.Format.date($.StartDate, $$.startTimeFormatText) + " " + Mobile.SalesLogix.Format.date($.StartDate, "tt") %}'
        ]),
        itemIconSourceTemplate: new Simplate([
          '{%: $$.activityIconByType[$.Type] || $$.icon || $$.selectIcon %}'
        ]),
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
                '<div class="list-item-static-selector">',
                    '<img src="{%= $$.activityIconByType[$.Type] || $$.icon || $$.selectIcon %}" class="icon" />',
                '</div>',
                '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        activityTimeTemplate: new Simplate([
            '{% if ($.Timeless) { %}',
            '{%: $$.allDayText %},',
            '{% } else { %}',
            '{%: Mobile.SalesLogix.Format.date($.StartDate, $$.startTimeFormatText) %}',
            '&nbsp;{%: Mobile.SalesLogix.Format.date($.StartDate, "tt") %},',
            '{% } %}',
            '&nbsp;{%: Mobile.SalesLogix.Format.date($.StartDate, $$.startDateFormatText, Sage.Platform.Mobile.Convert.toBoolean($.Timeless)) %}'
        ]),
        itemTemplate: new Simplate([
            '<h3>',
                '<span class="p-description">{%: $.Description %}</span>',
            '</h3>',
            '<h4>',
                '<strong>{%! $$.activityTimeTemplate %}</strong>',
            '</h4>',
            '<h4>{%! $$.nameTemplate %}</h4>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.ContactName) { %}',
            '{%: $.ContactName %} | {%: $.AccountName %}',
            '{% } else if ($.AccountName) { %}',
            '{%: $.AccountName %}',
            '{% } else { %}',
            '{%: $.LeadName %}',
            '{% } %}'
        ]),
        activityIconByType: {
            'atToDo': 'content/images/icons/To_Do_24x24.png',
            'atPhoneCall': 'content/images/icons/Call_24x24.png',
            'atAppointment': 'content/images/icons/Meeting_24x24.png',
            'atLiterature': 'content/images/icons/Schedule_Literature_Request_24x24.gif',
            'atPersonal': 'content/images/icons/Personal_24x24.png',
            'atQuestion': 'content/images/icons/help_24.png',
            'atNote': 'content/images/icons/note_24.png',
            'atEMail': 'content/images/icons/letters_24.png'
        },
        activityTextByType: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Lit Request',
            'atPersonal': 'Personal',
            'atQuestion': 'Question',
            'atNote': 'Note',
            'atEMail': 'Email'
        },
        activityColorClassByType: {
            'atToDo': 'color-ToDo',
            'atPhoneCall': 'color-PhoneCall',
            'atAppointment': 'color-Meeting',
            'atLiterature': 'color-LitRequest',
            'atPersonal': 'color-Personal',
            'atQuestion': 'color-Question',
            'atNote': 'color-Note',
            'atEMail': 'color-Email'
        },
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
        contractName: 'system',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        formatDateTime: function(dateTime) {
            return 'StartTime';
        },
        getGroupBySections: function() {
            var groupBySections = [{
                id: 'section_StartDate',
                description: 'Start Date',
                section: new DateTimeSection({ groupByProperty: 'StartDate', sortDirection: 'desc' })
            }];
            return groupBySections;
        },
        createIndicatorLayout: function() {
            return this.itemIndicators || (this.itemIndicators = [{
                id: '1',
                icon: 'content/images/icons/edit_24.png',
                label: '1',
                onApply: function(entry, indicator) {
                    if(entry["xyz"]) {
                        indicator.isEnbaled = true;
                    }
                    indicator.isEnbaled = false;
                }
             }, {
                id: '2',
                icon: 'content/images/icons/edit_24.png',
                label: '2',
                onApply: function(entry, indicator) {
                    if (entry["xyz"]) {
                        indicator.isEnbaled = true;
                    }
                    indicator.isEnbaled = false;
                }
             }]
            );
        }
    });
});

