/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Activity/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/query',
    'dojo/dom-class',
    'Mobile/SalesLogix/Views/_RightDrawerListMixin',
    'Sage/Platform/Mobile/GroupedList',
    'Mobile/SalesLogix/Views/_CardLayoutListMixin',
    'Sage/Platform/Mobile/Groups/DateTimeSection',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert'
], function(
    declare,
    string,
    query,
    domClass,
    _RightDrawerListMixin,
    GroupedList,
    _CardLayoutListMixin,
    DateTimeSection,
    format,
    convert
) {

    return declare('Mobile.SalesLogix.Views.Activity.List', [GroupedList, _RightDrawerListMixin, _CardLayoutListMixin], {
        //Card View 
        itemColorClass: 'color-activity',
        // Localization
        startDateFormatText: 'ddd M/d/yy',
        startTimeFormatText: 'h:mm',
        allDayText: 'All-Day',
        itemIcon: 'content/images/icons/ContactProfile_48x48.png',
        //Templates
        //Card View 
        itemColorClassTemplate: new Simplate([
           '{%: $$.activityColorClassByType[$.Type] || $$.itemColorClass  %}'
        ]),
        //Card View 
        itemTabValueTemplate: new Simplate([
       //'{%: $$.activityTextByType[$.Type] %}'
          '{%: Mobile.SalesLogix.Format.date($.StartDate, $$.startTimeFormatText) + " " + Mobile.SalesLogix.Format.date($.StartDate, "tt") %}'
        ]),
        //Card View 
        itemIconSourceTemplate: new Simplate([
          '{%: $$.itemIcon || $$.activityIconByType[$.Type] || $$.icon || $$.selectIcon %}'
        ]),
        //Card View 
        itemRowContainerTemplate: new Simplate([
       '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}"  data-color-class="{%! $$.itemColorClassTemplate %}" >',
           '{%! $$.itemRowContentTemplate %}',
       '</li>'
        ]),
        //Used if Card View is not mixed in
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
        activityIndicatorIconByType: {
            'atToDo': 'To_Do_24x24.png',
            'atPhoneCall': 'Call_24x24.png',
            'atAppointment': 'Meeting_24x24.png',
            'atLiterature': 'Schedule_Literature_Request_24x24.gif',
            'atPersonal': 'Personal_24x24.png',
            'atQuestion': 'help_24.png',
            'atNote': 'note_24.png',
            'atEMail': 'letters_24.png'
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
            'Timeless',
            'Alarm',
            'Priority',
            'ModifyDate',
            'RecurrenceState',
            'Recurring'
        ],
        resourceKind: 'activities',
        contractName: 'system',

        hashTagQueries: {
            'recurring': 'Recurring eq true',
            'timeless': 'Timeless eq true'
        },
        hashTagQueriesText: {
            'recurring': 'recurring',
            'timeless': 'timeless'
        },

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
        }, //Card View
        createIndicatorLayout: function() {
            return this.itemIndicators || (this.itemIndicators = [{
                id: '1',
                icon: 'AlarmClock_24x24.png',
                label: 'Alarm',
                onApply: function(entry, parent) {
                    this.isEnabled = parent.hasAlarm(entry);
                }
            }, {
                id: '2',
                icon: 'Touched_24x24.png',
                label: 'Touched',
                onApply: function(entry, parent) {
                    this.isEnabled = parent.hasBeenTouched(entry);
                }
            }, {
                id: '3',
                icon: 'Bang_24x24.png',
                label: 'Bang',
                onApply: function(entry, parent) {
                    this.isEnabled = parent.isImportant(entry);
                }
            }, {
                id: '4',
                icon: '',
                cls: 'indicator_Important',
                label: 'overdue',
                valueText: 'overdue',
                showIcon: false,
                location:'top',
                onApply: function(entry, parent) {
                    this.isEnabled = parent.isOverdue(entry);
                }
            }, {
                id: '5',
                icon: 'Recurring_24x24.png',
                label: 'Recurring',
                onApply: function(entry, parent) {
                    this.isEnabled = parent.isRecurring(entry, this);
                }
            }, {
                id: '6',
                icon: '',
                label: 'Activity',
                onApply: function(entry, parent) {
                    parent.applyActivityIndicator(entry, this);
                }
            }]
            );
        },
        onApplyRowActionPanel: function(actionsNode, rowNode) {
            var colorRowCls, colorCls

            colorRowCls = query(rowNode).closest('[data-color-class]')[0];
            colorCls = colorRowCls ? colorRowCls.getAttribute('data-color-class') : false;

            domClass.remove(actionsNode, this.activityColorClassByType['atToDo']);
            domClass.remove(actionsNode, this.activityColorClassByType['atPhoneCall']);
            domClass.remove(actionsNode, this.activityColorClassByType['atAppointment']);
            domClass.remove(actionsNode, this.activityColorClassByType['atLiterature']);
            domClass.remove(actionsNode, this.activityColorClassByType['atPersonal']);
            domClass.remove(actionsNode, this.activityColorClassByType['atQuestion']);
            domClass.remove(actionsNode, this.activityColorClassByType['atNote']);
            domClass.remove(actionsNode, this.activityColorClassByType['atEMail']);
            if (colorCls) {
                domClass.add(actionsNode, colorCls);
            }
        },
        hasBeenTouched: function(entry) {
            if (entry['ModifyDate']) {
                var modifydDate = convert.toDateFromString(entry['ModifyDate']);
                var currentDate = new Date();
                var seconds = Math.round((currentDate - modifydDate) / 1000);
                var hours = seconds / 360;
                var days = hours / 24;
                if (days <= 7) {
                    return true;
                }
            }
            return false;
        },
        isImportant: function(entry) {
            if (entry['Priority']) {
                if (entry['Priority'] === 'High') {
                    return true;
                }
            }
            return false;
        },
        isOverdue: function(entry) {
            if (entry['StartDate']) {
                var startDate = convert.toDateFromString(entry['StartDate']);
                var currentDate = new Date();
                var seconds = Math.round((currentDate - startDate) / 1000);
                var mins = seconds / 60;
                if (mins >= 1) {
                    return true;
                }
            }
            return false;
        },
        isRecurring: function(entry) {
            if (entry['RecurrenceState']) {
                if (entry['RecurrenceState'] === 'rstOccurrence') {
                    return true;
                }
            }
            return false;
        },
       applyActivityIndicator: function(entry, indicator) {
           this._applyActivityIndicator(entry['Type'], indicator);
       },
       _applyActivityIndicator: function(type, indicator) {
            indicator.isEnabled = false;
            indicator.showIcon = false;
            if (type) {
                indicator.icon = this.activityIndicatorIconByType[type];
                indicator.label = this.activityTextByType[type];
                indicator.isEnabled = true;
                indicator.showIcon = true;
            }
        }
    });
});

