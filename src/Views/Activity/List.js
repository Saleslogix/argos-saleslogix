/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Activity/List', [
    'dojo/_base/declare',
    'dojo/_base/connect',
    'dojo/string',
    'dojo/query',
    'dojo/dom-class',
    'Mobile/SalesLogix/Views/_RightDrawerListMixin',
    'Sage/Platform/Mobile/List',
    'Mobile/SalesLogix/Views/_CardLayoutListMixin',
    'Sage/Platform/Mobile/Groups/DateTimeSection',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Convert',
    'Mobile/SalesLogix/Action',
    'Mobile/SalesLogix/Environment',
    'Sage/Platform/Mobile/ErrorManager',
    'moment'
], function(
    declare,
    connect,
    string,
    query,
    domClass,
    _RightDrawerListMixin,
    List,
    _CardLayoutListMixin,
    DateTimeSection,
    format,
    Utility,
    convert,
    action,
    environment,
    ErrorManager,
    moment
) {

    return declare('Mobile.SalesLogix.Views.Activity.List', [List, _RightDrawerListMixin, _CardLayoutListMixin], {
       
        // Localization
        startDateFormatText: 'ddd M/D/YYYY',
        startTimeFormatText: 'h:mm',
        allDayText: 'All-Day',
        completeActivityText: 'Complete',
        callText: 'Call',
        calledText: 'Called',
        addAttachmentActionText: 'Add Attachment',
        overdueText: 'overdue',
        alarmText: 'alarm',
        touchedText: 'touched',
        importantText: 'important',
        recurringText: 'recurring',
        activityText: 'activity',

        //Card View 
        itemIcon: 'content/images/icons/ContactProfile_48x48.png',
        itemColorClass: 'color-activity',
        //Templates
        //Card View 
        itemRowContainerTemplate: new Simplate([
       '<li data-action="activateEntry" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}" data-activity-type="{%: $.Type %}"  data-color-class="{%: $$.getItemColorClass($) %}" >',
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
            '{%: Mobile.SalesLogix.Format.relativeDate($.StartDate, Sage.Platform.Mobile.Convert.toBoolean($.Timeless)) %}'
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
        activityTypeText: {
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
        historyEditView: 'history_edit',
        enableActions: true,
        queryOrderBy: 'StartDate desc',
        querySelect: [
            'Description',
            'StartDate',
            'Type',
            'AccountId',
            'AccountName',
            'ConatactId',
            'ContactName',
            'PhoneNumber',
            'LeadId',
            'LeadName',
            'TicketId',
            'OpportunityId',
            'Leader/$key',
            'Leader/$descriptor',
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
        pageSize: 105,

        hashTagQueries: {
            'alarm': 'Alarm eq true',
            'recurring': 'Recurring eq true',
            'timeless': 'Timeless eq true',
            'yesterday': function() {
                var now, yesterdayStart, yesterdayEnd, query;

                now = moment();

                yesterdayStart = now.clone().subtract(1, 'days').startOf('day');
                yesterdayEnd = yesterdayStart.clone().endOf('day');

                query = string.substitute(
                        '((Timeless eq false and StartDate between @${0}@ and @${1}@) or (Timeless eq true and StartDate between @${2}@ and @${3}@))',
                        [
                        convert.toIsoStringFromDate(yesterdayStart.toDate()),
                        convert.toIsoStringFromDate(yesterdayEnd.toDate()),
                        yesterdayStart.format('YYYY-MM-DDT00:00:00[Z]'),
                        yesterdayEnd.format('YYYY-MM-DDT23:59:59[Z]')
                        ]
                );
                return query;
            },
            'today': function() {
                var now, todayStart, todayEnd, query;

                now = moment();

                todayStart = now.clone().startOf('day');
                todayEnd = todayStart.clone().endOf('day');

                query = string.substitute(
                        '((Timeless eq false and StartDate between @${0}@ and @${1}@) or (Timeless eq true and StartDate between @${2}@ and @${3}@))',
                        [
                        convert.toIsoStringFromDate(todayStart.toDate()),
                        convert.toIsoStringFromDate(todayEnd.toDate()),
                        todayStart.format('YYYY-MM-DDT00:00:00[Z]'),
                        todayEnd.format('YYYY-MM-DDT23:59:59[Z]')
                        ]
                );
                return query;
            },
            'this-week': function() {
                var now, weekStartDate, weekEndDate, query;

                now = moment();

                weekStartDate = now.clone().startOf('week');
                weekEndDate = weekStartDate.clone().endOf('week');

                query = string.substitute(
                        '((Timeless eq false and StartDate between @${0}@ and @${1}@) or (Timeless eq true and StartDate between @${2}@ and @${3}@))',
                        [
                        convert.toIsoStringFromDate(weekStartDate.toDate()),
                        convert.toIsoStringFromDate(weekEndDate.toDate()),
                        weekStartDate.format('YYYY-MM-DDT00:00:00[Z]'),
                        weekEndDate.format('YYYY-MM-DDT23:59:59[Z]')
                        ]
                );
                return query;
            }
        },
        hashTagQueriesText: {
            'alarm': 'alarm',
            'recurring': 'recurring',
            'timeless': 'timeless',
            'today': 'today',
            'this-week': 'this-week',
            'yesterday': 'yesterday'
        },
        defaultSearchTerm: function() {
            return '#' + this.hashTagQueriesText['this-week'];
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        formatDateTime: function(dateTime) {
            return 'StartTime';
        },
        getItemActionKey: function(entry) {
            return entry.$key;
        },
        getItemDescriptor: function(entry) {
            return entry.$descriptor;
        },
        getItemTabValue: function(entry){
            var value = '';
            if ((entry['$groupTag'] === 'Today') || (entry['$groupTag'] === 'Tomorrow') || (entry['$groupTag'] === 'Yesterday')) {
                value = format.date(entry.StartDate, this.startTimeFormatText) + " " + format.date(entry.StartDate, "A");
                } else {
                    value = format.date(entry.StartDate, this.startDateFormatText, entry.Timeless);
                }
                return value;
            },
            getItemColorClass: function(entry) {
                return  this.activityColorClassByType[entry.Type] || this.itemColorClass;
            },
            getItemIconSource: function(entry) {
                return this.itemIcon || this.activityIconByType[entry.Type] || this.icon || this.selectIcon;
            },        
            createIndicatorLayout: function() {
                return this.itemIndicators || (this.itemIndicators = [{
                    id: 'alarm',
                    icon: 'AlarmClock_24x24.png',
                    label: this.alarmText,
                    onApply: function(entry, parent) {
                        this.isEnabled = parent.hasAlarm(entry);
                    }
                }, {
                    id: 'touched',
                    icon: 'Touched_24x24.png',
                    label: this.touchedText,
                    onApply: function(entry, parent) {
                        this.isEnabled = parent.hasBeenTouched(entry);
                    }
                }, {
                    id: 'important',
                    icon: 'Bang_24x24.png',
                    label: this.importantText,
                    onApply: function(entry, parent) {
                        this.isEnabled = parent.isImportant(entry);
                    }
                }, {
                    id: 'overdue',
                    cls: 'indicator_Important',
                    label: this.overdueText,
                    valueText: this.overdueText,
                    showIcon: false,
                    location: 'top',
                    onApply: function(entry, parent) {
                        this.isEnabled = parent.isOverdue(entry);
                    }
                }, {
                    id: 'recurring',
                    icon: 'Recurring_24x24.png',
                    label: this.recurringText,
                    onApply: function(entry, parent) {
                        this.isEnabled = parent.isRecurring(entry, this);
                    }
                }, {
                    id: 'activityType',
                    icon: '',
                    label: this.activityText,
                    onApply: function(entry, parent) {
                        parent.applyActivityIndicator(entry, this);
                    }
                }]
            );
        },
        onApplyRowActionPanel: function(actionsNode, rowNode) {
            var colorRowCls, colorCls;

            colorRowCls = query(rowNode).closest('[data-color-class]')[0];
            colorCls = colorRowCls ? colorRowCls.getAttribute('data-color-class') : false;

            for (var colorKey in this.activityColorClassByType) {
                domClass.remove(actionsNode, this.activityColorClassByType[colorKey]);
            }           
            if (colorCls) {
                domClass.add(actionsNode, colorCls);
            }
        },
        hasBeenTouched: function(entry) {
            var modifiedDate, currentDate, weekAgo;
            if (entry['ModifyDate']) {
                modifiedDate = moment(convert.toDateFromString(entry['ModifyDate']));
                currentDate = moment().endOf('day');
                weekAgo = moment().subtract(1, 'weeks');

                return modifiedDate.isAfter(weekAgo) &&
                    modifiedDate.isBefore(currentDate);
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
            var startDate, currentDate, seconds, mins, days;
            if (entry['StartDate']) {
                startDate = convert.toDateFromString(entry['StartDate']);
                currentDate = new Date();
                seconds = Math.round((currentDate - startDate) / 1000);
                mins = seconds / 60;
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
        hasAlarm: function(entry) {
            if (entry['Alarm'] === true) {
                return true;
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
                indicator.label = this.activityTypeText[type];
                indicator.isEnabled = true;
                indicator.showIcon = true;
            }
       },
       createActionLayout: function() {
           return this.actions || (this.actions = [{
               id: 'complete',
               icon: 'content/images/icons/Clear_Activity_24x24.png',
               label: this.completeActivityText,
               enabled: function(action, selection) {
                   var recur, entry = selection && selection.data;
                   if (!entry) {
                       return false;
                   }
                   recur = false;
                   if (entry['RecurrenceState'] === 'rstOccurrence') {
                       recur = true;
                   }

                   return entry['Leader']['$key'] === App.context['user']['$key'] && !recur;
               },
               fn: (function(action, selection) {
                   var entry;

                   entry = selection && selection.data && selection.data;

                   entry['CompletedDate'] = new Date();
                   entry['Result'] = 'Complete';

                   environment.refreshActivityLists();
                   this.completeActivity(entry);

               }).bindDelegate(this)
           }, {
               id: 'call',
               icon: 'content/images/icons/Dial_24x24.png',
               label: this.callText,
               enabled: function(action, selection) {
                   var entry;
                   entry = selection && selection.data;
                   return entry && entry.PhoneNumber;
               },
               fn: function(action, selection) {
                   var entry, phone;
                   entry = selection && selection.data;
                   phone = entry && entry.PhoneNumber;
                   if (phone) {
                       this.recordCallToHistory(function() {
                           App.initiateCall(phone);
                       }.bindDelegate(this), entry);
                   }
               }.bindDelegate(this)
           }, {
               id: 'addAttachment',
               icon: 'content/images/icons/Attachment_24.png',
               label: this.addAttachmentActionText,
               fn: action.addAttachment.bindDelegate(this)
           }]
           );
       },
       recordCallToHistory: function(complete, entry) {
           var tempEntry = {
               '$name': 'History',
               'Type': 'atPhoneCall',
               'ContactName': entry['ContactName'],
               'ContactId': entry['ContactId'],
               'AccountName': entry['AccountName'],
               'AccountId': entry['AccountId'],
               'Description': string.substitute("${0} ${1}", [this.calledText, (entry['ContactName'] || '')]),
               'UserId': App.context && App.context.user['$key'],
               'UserName': App.context && App.context.user['UserName'],
               'Duration': 15,
               'CompletedDate': (new Date())
           };

           this.navigateToHistoryInsert('atPhoneCall', tempEntry, complete);
       },
       navigateToHistoryInsert: function(type, entry, complete) {
           var view = App.getView(this.historyEditView);
           if (view) {
               environment.refreshActivityLists();
               view.show({
                   title: this.activityTypeText[type],
                   template: {},
                   entry: entry,
                   insert: true
               }, {
                   complete: complete
               });
           }
       },
       completeActivity: function(entry) {
           var completeActivity, request, completeActivityEntry;

           completeActivityEntry = {
               "$name": "ActivityComplete",
               "request": {
                   "entity": { '$key': entry['$key'] },
                   "ActivityId": entry['$key'],
                   "userId": entry['Leader']['$key'],
                   "result": entry['Result'],
                   "completeDate": entry['CompletedDate']
               }
           };

           request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
               .setResourceKind('activities')
               .setContractName('system')
               .setOperationName('Complete');

           request.execute(completeActivityEntry, {
               success: function() {
                   connect.publish('/app/refresh', [{
                       resourceKind: 'history'
                   }]);

                   this.clear();
                   this.refresh();
               },
               failure: this.onRequestFailure,
               scope: this
           });
       },
       onRequestFailure: function(response, o) {
           ErrorManager.addError(response, o, {}, 'failure');
       }
    });
});

