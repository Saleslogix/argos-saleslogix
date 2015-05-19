/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Activity.List
 *
 * @extends argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins crm.Views._CardLayoutListMixin
 *
 * @requires argos.List
 * @requires argos.Utility
 * @requires argos.Convert
 * @requires argos.ErrorManager
 * @requires crm.Action
 * @requires crm.Environment
 * @requires crm.Format
 * @requires crm.Views._CardLayoutListMixin
 * @requires crm.Views._RightDrawerListMixin
 *
 */
define('crm/Views/Activity/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/connect',
    'dojo/string',
    'dojo/query',
    'dojo/dom-class',
    '../_RightDrawerListMixin',
    'argos/List',
    '../_CardLayoutListMixin',
    '../../Format',
    'argos/Utility',
    'argos/Convert',
    '../../Action',
    '../../Environment',
    'argos/ErrorManager',
    'moment'
], function (declare, lang, connect, string, query, domClass, _RightDrawerListMixin, List, _CardLayoutListMixin, format, Utility, convert, action, environment, ErrorManager, moment) {
    var __class = declare('crm.Views.Activity.List', [List, _RightDrawerListMixin, _CardLayoutListMixin], {
        // Localization
        allDayText: 'Timeless',
        completeActivityText: 'Complete',
        callText: 'Call',
        calledText: 'Called',
        addAttachmentActionText: 'Add Attachment',
        overdueText: 'overdue',
        alarmText: 'alarm',
        touchedText: 'touched',
        importantText: 'important',
        recurringText: 'recurring',
        //Card View
        itemIcon: 'content/images/icons/man_1.png',
        //Templates
        //Card View
        itemRowContainerTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}" data-activity-type="{%: $.Type %}">',
            '{%! $$.itemRowContentTemplate %}',
            '</li>'
        ]),
        activityTimeTemplate: new Simplate([
            '{% if ($$.isTimelessToday($)) { %}',
            '{%: $$.allDayText %}',
            '{% } else { %}',
            '{%: crm.Format.relativeDate($.StartDate, argos.Convert.toBoolean($.Timeless)) %}',
            '{% } %}'
        ]),
        itemTemplate: new Simplate([
            '<h3>',
            '<span class="p-description">{%: $.Description %}</span>',
            '</h3>',
            '<h4>',
            '{%! $$.activityTimeTemplate %}',
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
        activityIndicatorIconByType: {
            'atToDo': 'fa fa-list-ul',
            'atPhoneCall': 'fa fa-phone',
            'atAppointment': 'fa fa-calendar-o',
            'atLiterature': 'fa fa-book',
            'atPersonal': 'fa fa-check-square-o',
            'atQuestion': 'fa fa-question-circle',
            'atNote': 'fa fa-file-text-o',
            'atEMail': 'fa fa-envelope'
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
        //Localization
        titleText: 'Activities',
        //View Properties
        id: 'activity_list',
        security: null,
        iconClass: 'fa fa-check-square-o fa-lg',
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
            'ContactId',
            'ContactName',
            'PhoneNumber',
            'LeadId',
            'LeadName',
            'TicketId',
            'OpportunityId',
            'Leader',
            'UserId',
            'Timeless',
            'Alarm',
            'Priority',
            'ModifyDate',
            'RecurrenceState',
            'Recurring'
        ],
        queryInclude: [
            '$descriptors'
        ],
        resourceKind: 'activities',
        contractName: 'system',
        pageSize: 105,
        hashTagQueries: {
            'alarm': 'Alarm eq true',
            'recurring': 'Recurring eq true',
            'timeless': 'Timeless eq true',
            'yesterday': function () {
                var now, yesterdayStart, yesterdayEnd, query;
                now = moment();
                yesterdayStart = now.clone().subtract(1, 'days').startOf('day');
                yesterdayEnd = yesterdayStart.clone().endOf('day');
                query = string.substitute('((Timeless eq false and StartDate between @${0}@ and @${1}@) or (Timeless eq true and StartDate between @${2}@ and @${3}@))', [
                    convert.toIsoStringFromDate(yesterdayStart.toDate()),
                    convert.toIsoStringFromDate(yesterdayEnd.toDate()),
                    yesterdayStart.format('YYYY-MM-DDT00:00:00[Z]'),
                    yesterdayEnd.format('YYYY-MM-DDT23:59:59[Z]')
                ]);
                return query;
            },
            'today': function () {
                var now, todayStart, todayEnd, query;
                now = moment();
                todayStart = now.clone().startOf('day');
                todayEnd = todayStart.clone().endOf('day');
                query = string.substitute('((Timeless eq false and StartDate between @${0}@ and @${1}@) or (Timeless eq true and StartDate between @${2}@ and @${3}@))', [
                    convert.toIsoStringFromDate(todayStart.toDate()),
                    convert.toIsoStringFromDate(todayEnd.toDate()),
                    todayStart.format('YYYY-MM-DDT00:00:00[Z]'),
                    todayEnd.format('YYYY-MM-DDT23:59:59[Z]')
                ]);
                return query;
            },
            'this-week': function () {
                var now, weekStartDate, weekEndDate, query;
                now = moment();
                weekStartDate = now.clone().startOf('week');
                weekEndDate = weekStartDate.clone().endOf('week');
                query = string.substitute('((Timeless eq false and StartDate between @${0}@ and @${1}@) or (Timeless eq true and StartDate between @${2}@ and @${3}@))', [
                    convert.toIsoStringFromDate(weekStartDate.toDate()),
                    convert.toIsoStringFromDate(weekEndDate.toDate()),
                    weekStartDate.format('YYYY-MM-DDT00:00:00[Z]'),
                    weekEndDate.format('YYYY-MM-DDT23:59:59[Z]')
                ]);
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
        defaultSearchTerm: function () {
            if (App.enableHashTags) {
                return '#' + this.hashTagQueriesText['this-week'];
            }
            return '';
        },
        formatSearchQuery: function (searchQuery) {
            return string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        formatDateTime: function () {
            return 'StartTime';
        },
        getItemActionKey: function (entry) {
            return entry.$key;
        },
        getItemDescriptor: function (entry) {
            return entry.$descriptor;
        },
        createIndicatorLayout: function () {
            return this.itemIndicators || (this.itemIndicators = [{
                    id: 'alarm',
                    cls: 'fa fa-bell-o fa-lg',
                    label: this.alarmText,
                    onApply: function (entry, parent) {
                        this.isEnabled = parent.hasAlarm(entry);
                    }
                }, {
                    id: 'touched',
                    cls: 'fa fa-hand-o-up fa-lg',
                    label: this.touchedText,
                    onApply: function (entry, parent) {
                        this.isEnabled = parent.hasBeenTouched(entry);
                    }
                }, {
                    id: 'important',
                    cls: 'fa fa-exclamation fa-lg',
                    label: this.importantText,
                    onApply: function (entry, parent) {
                        this.isEnabled = parent.isImportant(entry);
                    }
                }, {
                    id: 'recurring',
                    cls: 'fa fa-refresh fa-lg',
                    label: this.recurringText,
                    onApply: function (entry, parent) {
                        this.isEnabled = parent.isRecurring(entry, this);
                    }
                }, {
                    id: 'overdue',
                    cls: 'fa fa-exclamation-circle fa-lg',
                    label: this.overdueText,
                    onApply: function (entry, parent) {
                        this.isEnabled = parent.isOverdue(entry);
                    }
                }
            ]);
        },
        hasBeenTouched: function (entry) {
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
        isImportant: function (entry) {
            if (entry['Priority']) {
                if (entry['Priority'] === 'High') {
                    return true;
                }
            }
            return false;
        },
        isOverdue: function (entry) {
            var startDate, currentDate, seconds, mins;
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
        isTimelessToday: function (entry) {
            if (!entry || !entry.Timeless) {
                return false;
            }
            var start = moment(entry.StartDate);
            return this._isTimelessToday(start);
        },
        _isTimelessToday: function (start) {
            // Start is UTC, convert it to local time so we can compare it against "now"
            start.add({ minutes: start.zone() });
            return start.isAfter(moment().startOf('day')) && start.isBefore(moment().endOf('day'));
        },
        isRecurring: function (entry) {
            if (entry['RecurrenceState']) {
                if (entry['RecurrenceState'] === 'rstOccurrence') {
                    return true;
                }
            }
            return false;
        },
        hasAlarm: function (entry) {
            if (entry['Alarm'] === true) {
                return true;
            }
            return false;
        },
        getItemIconClass: function (entry) {
            var type = entry && entry.Type;
            return this._getItemIconClass(type);
        },
        _getItemIconClass: function (type) {
            var cls = this.activityIndicatorIconByType[type];
            if (cls) {
                cls = cls + ' fa-2x';
            }
            return cls;
        },
        createActionLayout: function () {
            return this.actions || (this.actions = [{
                    id: 'complete',
                    cls: 'fa fa-check-square fa-2x',
                    label: this.completeActivityText,
                    enabled: function (action, selection) {
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
                    fn: (function (action, selection) {
                        var entry;
                        entry = selection && selection.data && selection.data;
                        entry['CompletedDate'] = new Date();
                        entry['Result'] = 'Complete';
                        environment.refreshActivityLists();
                        this.completeActivity(entry);
                    }).bindDelegate(this)
                }, {
                    id: 'call',
                    cls: 'fa fa-phone-square fa-2x',
                    label: this.callText,
                    enabled: function (action, selection) {
                        var entry;
                        entry = selection && selection.data;
                        return entry && entry.PhoneNumber;
                    },
                    fn: function (action, selection) {
                        var entry, phone;
                        entry = selection && selection.data;
                        phone = entry && entry.PhoneNumber;
                        if (phone) {
                            this.recordCallToHistory(function () {
                                App.initiateCall(phone);
                            }.bindDelegate(this), entry);
                        }
                    }.bindDelegate(this)
                }, {
                    id: 'addAttachment',
                    cls: 'fa fa-paperclip fa-2x',
                    label: this.addAttachmentActionText,
                    fn: action.addAttachment.bindDelegate(this)
                }]);
        },
        recordCallToHistory: function (complete, entry) {
            var tempEntry = {
                '$name': 'History',
                'Type': 'atPhoneCall',
                'ContactName': entry['ContactName'],
                'ContactId': entry['ContactId'],
                'AccountName': entry['AccountName'],
                'AccountId': entry['AccountId'],
                'Description': string.substitute('${0} ${1}', [this.calledText, (entry['ContactName'] || '')]),
                'UserId': App.context && App.context.user['$key'],
                'UserName': App.context && App.context.user['UserName'],
                'Duration': 15,
                'CompletedDate': (new Date())
            };
            this.navigateToHistoryInsert('atPhoneCall', tempEntry, complete);
        },
        navigateToHistoryInsert: function (type, entry, complete) {
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
        completeActivity: function (entry) {
            var request, completeActivityEntry;
            completeActivityEntry = {
                '$name': 'ActivityComplete',
                'request': {
                    'entity': { '$key': entry['$key'] },
                    'ActivityId': entry['$key'],
                    'userId': entry['Leader']['$key'],
                    'result': entry['Result'],
                    'completeDate': entry['CompletedDate']
                }
            };
            request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
                .setResourceKind('activities')
                .setContractName('system')
                .setOperationName('Complete');
            request.execute(completeActivityEntry, {
                success: function () {
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
        onRequestFailure: function (response, o) {
            ErrorManager.addError(response, o, {}, 'failure');
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Activity.List', __class);
    return __class;
});
