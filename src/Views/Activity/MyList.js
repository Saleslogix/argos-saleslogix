/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Activity/MyList', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/query',
    'dojo/_base/connect',
    'Sage/Platform/Mobile/List',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Environment',
    'Sage/Platform/Mobile/Format',
    'Mobile/SalesLogix/Views/Activity/List',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/Groups/DateTimeSection',
    'moment',
    'Mobile/SalesLogix/Action'
], function(
    declare,
    string,
    query,
    connect,
    List,
    format,
    environment,
    platformFormat,
    ActivityList,
    Utility,
    convert,
    ErrorManager,
    DateTimeSection,
    moment,
    action
) {

    return declare('Mobile.SalesLogix.Views.Activity.MyList', [ActivityList], {

        //Templates
        //Card View 
       itemRowContainerTemplate: new Simplate([
           '<li data-action="activateEntry" data-my-activity-key="{%= $.$key %}" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}" data-activity-type="{%: $.Activity.Type %}"  data-color-class="{%: $$.getItemColorClass($) %}" >',
            '{%! $$.itemRowContentTemplate %}',
          '</li>'
        ]),
        //Used if Card View is not mixed in
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-my-activity-key="{%= $.$key %}" data-key="{%= $.Activity.$key %}" data-descriptor="{%: $.Activity.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
            '<div data-action="selectEntry" class="list-item-static-selector">',
            '<img src="{%= $$.activityIconByType[$.Activity.Type] || $$.icon || $$.selectIcon %}" class="icon" />',
            '</div>',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        activityTimeTemplate: new Simplate([
            '{%: Mobile.SalesLogix.Format.relativeDate($.Activity.StartDate, Sage.Platform.Mobile.Convert.toBoolean($.Activity.Timeless)) %}'
        ]),
        itemTemplate: new Simplate([
            '<h3>',
                '<span class="p-description">{%: $.Activity.Description %}{% if ($.Status === "asUnconfirmed") { %} ({%: Mobile.SalesLogix.Format.userActivityStatus($.Status) %}) {% } %}</span>',
            '</h3>',
            '<h4>',
                '<strong>{%! $$.activityTimeTemplate %}</strong>',
            '</h4>',
            '<h4>{%! $$.nameTemplate %}</h4>',
            '<h4>',
                '{% if ($.Activity.PhoneNumber) { %}',
                    '{%: Sage.Platform.Mobile.Format.phone($.Activity.PhoneNumber) %}',
                '{% } %}',
            '</h4>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.Activity.ContactName) { %}',
            '{%: $.Activity.ContactName %} | {%: $.Activity.AccountName %}',
            '{% } else if ($.Activity.AccountName) { %}',
            '{%: $.Activity.AccountName %}',
            '{% } else { %}',
            '{%: $.Activity.LeadName %}',
            '{% } %}'
        ]),

        //Localization
        titleText: 'My Activities',
        completeActivityText: 'Complete',
        acceptActivityText: 'Accept',
        declineActivityText: 'Decline',
        callText: 'Call',
        calledText: 'Called',
        addAttachmentActionText: 'Add Attachment',
        viewContactActionText: 'Contact',
        viewAccountActionText: 'Account',
        viewOpportunityActionText: 'Opportunity',
        
        //View Properties
        id: 'myactivity_list',

        historyEditView: 'history_edit',
        existsRE: /^[\w]{12}$/,
        queryWhere: function() {
            return string.substitute('User.Id eq "${0}" and Status ne "asDeclned" and Activity.Type ne "atLiterature"', [App.context['user'].$key]);
        },
        queryOrderBy: 'Activity.StartDate desc',
        querySelect: [
            'Alarm',
            'AlarmTime',
            'Status',
            'Activity/Description',
            'Activity/StartDate',
            'Activity/EndDate',
            'Activity/Type',
            'Activity/AccountName',
            'Activity/AccountId',
            'Activity/ContactId',
            'Activity/ContactName',
            'Activity/Leader/$key',
            'Activity/Leader/$descriptor',
            'Activity/LeadName',
            'Activity/LeadId',
            'Activity/OpportunityId',
            'Activity/TicketId',
            'Activity/UserId',
            'Activity/Timeless',
            'Activity/PhoneNumber',
            'Activity/Recurring',
            'Activity/Alarm',
            'Activity/ModifyDate',
            'Activity/Priority'
        ],
        resourceKind: 'userActivities',
        allowSelection: true,
        enableActions: true,
        hashTagQueries: {
            'alarm': 'Alarm eq true',
            'status-unconfirmed': 'Status eq "asUnconfirmed"',
            'status-accepted': 'Status eq "asAccepted"',
            'status-declined': 'Status eq "asDeclned"',
            'recurring': 'Activity.Recurring eq true',
            'timeless': 'Activity.Timeless eq true',
            'yesterday': function() {
                var now, yesterdayStart, yesterdayEnd, query;

                now = moment();

                yesterdayStart = now.clone().subtract(1, 'days').startOf('day');
                yesterdayEnd = yesterdayStart.clone().endOf('day');

                query = string.substitute(
                        '((Activity.Timeless eq false and Activity.StartDate between @${0}@ and @${1}@) or (Activity.Timeless eq true and Activity.StartDate between @${2}@ and @${3}@))',
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
                        '((Activity.Timeless eq false and Activity.StartDate between @${0}@ and @${1}@) or (Activity.Timeless eq true and Activity.StartDate between @${2}@ and @${3}@))',
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
                        '((Activity.Timeless eq false and Activity.StartDate between @${0}@ and @${1}@) or (Activity.Timeless eq true and Activity.StartDate between @${2}@ and @${3}@))',
                        [
                        convert.toIsoStringFromDate(weekStartDate.toDate()),
                        convert.toIsoStringFromDate(weekEndDate.toDate()),
                        weekStartDate.format('YYYY-MM-DDT00:00:00[Z]'),
                        weekEndDate.format('YYYY-MM-DDT23:59:59[Z]')]
                );
                return query;
            }
        },
        hashTagQueriesText: {
            'alarm': 'alarm',
            'status-unconfirmed': 'status-unconfirmed',
            'status-accepted': 'status-accepted',
            'status-declined': 'status-declined',
            'recurring': 'recurring',
            'timeless': 'timeless',
            'today': 'today',
            'this-week': 'this-week',
            'yesterday': 'yesterday'
        },
        defaultSearchTerm: function() {
            return '#' + this.hashTagQueriesText['this-week'];
        },
        createActionLayout: function() {
            return this.actions || (this.actions = [{
                id: 'viewAccount',
                icon: 'content/images/icons/Company_24.png',
                label: this.viewAccountActionText,
                enabled: function(action, selection) {
                    var entry = selection && selection.data;
                    if (!entry) {
                        return false;
                    }
                    if (entry.Activity['AccountId']) {
                        return true;
                    }
                    return false;
                }, 
                fn: function(action, selection) {
                    var viewId, options, view;

                    viewId = 'account_detail';
                    options = {
                        key: selection.data['Activity']['AccountId'],
                        descriptor: selection.data['Activity']['AccountName']
                    };

                    view = App.getView(viewId);
                    if (view && options) {
                        view.show(options);
                    }
                }
            }, {
                id: 'viewOpportunity',
                icon: 'content/images/icons/opportunity_24.png',
                label: this.viewOpportunityActionText,
                enabled: function(action, selection) {
                    var entry = selection && selection.data;
                    if (!entry) {
                        return false;
                    }
                    if (entry.Activity['OpportunityId']) {
                        return true;
                    }
                    return false;
                }, 
                fn: function(action, selection) {
                    var viewId, options, view;

                    viewId = 'opportunity_detail';
                    options = {
                        key: selection.data['Activity']['OpportunityId'],
                        descriptor: selection.data['Activity']['OpportunityName']
                    };
                    view = App.getView(viewId);
                    if (view && options) {
                        view.show(options);
                    }
                }
            }, {
                id: 'viewContact',
                icon: 'content/images/icons/Contacts_24x24.png',
                label: this.viewContactActionText,
                action: 'navigateToContactOrLead',
                enabled: this.hasContactOrLead
            }, {
                id: 'complete',
                icon: 'content/images/icons/Clear_Activity_24x24.png',
                label: this.completeActivityText,
                enabled: function(action, selection) {
                    var recur, entry = selection && selection.data;
                    if (!entry) {
                        return false;
                    }

                    recur = entry.Activity.Recurring;

                    return entry.Activity['Leader']['$key'] === App.context['user']['$key'] && !recur;
                },
                fn: (function(action, selection) {
                    var entry;

                    entry = selection && selection.data && selection.data.Activity;

                    entry['CompletedDate'] = new Date();
                    entry['Result'] = 'Complete';

                    environment.refreshActivityLists();
                    this.completeActivity(entry);

                }).bindDelegate(this)
            }, {
                id: 'accept',
                icon: 'content/images/icons/OK_24.png',
                label: this.acceptActivityText,
                enabled: function(action, selection) {
                    var entry = selection && selection.data;
                    if (!entry) {
                        return false;
                    }

                    return entry.Status === 'asUnconfirmed';
                },
                fn: (function(action, selection) {
                    var entry;

                    entry = selection && selection.data;
                    environment.refreshActivityLists();
                    this.confirmActivityFor(entry.Activity.$key, App.context['user']['$key']);

                }).bindDelegate(this)
            }, {
                id: 'decline',
                icon: 'content/images/icons/cancl_24.png',
                label: this.declineActivityText,
                enabled: function(action, selection) {
                    var entry = selection && selection.data;
                    if (!entry) {
                        return false;
                    }

                    return entry.Status === 'asUnconfirmed';
                },
                fn: (function(action, selection) {
                    var entry;
                    entry = selection && selection.data;

                    environment.refreshActivityLists();
                    this.declineActivityFor(entry.Activity.$key, App.context['user']['$key']);
                }).bindDelegate(this)
            }, {
                id: 'call',
                icon: 'content/images/icons/Dial_24x24.png',
                label: this.callText,
                enabled: function(action, selection) {
                    var entry;
                    entry = selection && selection.data;
                    return entry && entry.Activity && entry.Activity.PhoneNumber;
                },
                fn: function(action, selection) {
                    var entry, phone;
                    entry = selection && selection.data;
                    phone = entry && entry.Activity && entry.Activity.PhoneNumber;
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
        selectEntry: function(params, evt, node) {
            /* Override selectEntry from the base List mixin.
             * Grabbing a different key here, since we use entry.Activity.$key as the main data-key.
             * TODO: Make [data-key] overrideable in the base class.
             */
            var row = query(node).closest('[data-my-activity-key]')[0],
                key = row ? row.getAttribute('data-my-activity-key') : false;

            if (this._selectionModel && key) {
                this._selectionModel.toggle(key, this.entries[key], row);
            }

            if (this.options.singleSelect && this.options.singleSelectAction && !this.enableActions) {
                this.invokeSingleSelectAction();
            }
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Activity.Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        declineActivityFor: function(activityId, userId) {
            this._getUserNotifications(activityId, userId, false);
        },
        confirmActivityFor: function(activityId, userId) {
            this._getUserNotifications(activityId, userId, true);
        },
        _getUserNotifications: function(activityId, userId, accept) {
            var req;

            if (activityId) {
                activityId = activityId.substring(0, 12);
            }

            req = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService());
            req.setResourceKind('userNotifications');
            req.setContractName('dynamic');
            req.setQueryArg('where', string.substitute('ActivityId eq \'${0}\' and ToUser.Id eq \'${1}\'', [activityId, userId]));
            req.setQueryArg('precedence', '0');
            req.read({
                success: function(userNotifications) {
                    if (userNotifications['$resources'] && userNotifications['$resources'].length > 0) {
                        if (accept) {
                            this.acceptConfirmation(userNotifications['$resources'][0]);
                        } else {
                            this.declineConfirmation(userNotifications['$resources'][0]);
                        }
                    }
                },
                failure: this.onRequestFailure,
                scope: this
            });
        },
        declineConfirmation: function(notification) {
            this._postUserNotifications(notification, 'Decline');
        },
        acceptConfirmation: function(notification) {
            this._postUserNotifications(notification, 'Accept');
        },
        _postUserNotifications: function(notification, operation) {
            if (!notification || typeof operation !== "string") {
                return;
            }

            var payload, request;

            /*
             * To get the payload template:
             * http://localhost:6666/SlxClient/slxdata.ashx/slx/dynamic/-/userNotifications/$service/accept/$template?format=json
            */
            payload = {
                "$name": operation,
                "request": {
                    "entity": notification,
                    "UserNotificationId": notification['$key']
                }
            };

            request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
                .setContractName('dynamic')
                .setResourceKind('usernotifications')
                .setOperationName(operation.toLowerCase());
            request.execute(payload, {
                success: function() {
                    this.clear();
                    this.refresh();
                },
                failure: this.onRequestFailure,
                scope: this
            });
        },
        completeActivity: function(entry) {
            var completeActivity, request, completeActivityEntry;

            completeActivityEntry = {
                "$name": "ActivityComplete",
                "request": {
                    "entity": {'$key': entry['$key']},
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
        },
        hasAlarm: function(entry) {
            if (entry.Activity && entry.Activity.Alarm === true) {
                return true;
            }

            return false;
        },
        hasBeenTouched: function(entry) {
            var modifiedDate, currentDate, weekAgo;
            if (entry['Activity']['ModifyDate']) {
                modifiedDate = moment(convert.toDateFromString(entry['Activity']['ModifyDate']));
                currentDate = moment().endOf('day');
                weekAgo = moment().subtract(1, 'weeks');

                return modifiedDate.isAfter(weekAgo) &&
                    modifiedDate.isBefore(currentDate);
            }
            return false;
        },
        isImportant: function(entry) {
            if (entry["Activity"]['Priority']) {
                if (entry["Activity"]['Priority'] === 'High') {
                    return true;
                }
            }           
            return false;
        },
        isOverdue: function(entry) {
            var startDate, currentDate, seconds, mins, days;
            if (entry['Activity']['StartDate']) {
                startDate = convert.toDateFromString(entry['Activity']['StartDate']);
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
            if (entry['Activity']['Recurring']) {
                   return true;
            }
            return false;
        },
        applyActivityIndicator: function(entry, indicator) {
            this._applyActivityIndicator(entry['Activity']['Type'], indicator);
        },
        getItemActionKey: function(entry) {
            return entry.Activity.$key;
        },
        getItemDescriptor: function(entry) {
            return entry.Activity.$descriptor;
        },
        getItemTabValue: function(entry) {
            var value = '';
            if ((entry['$groupTag'] === 'Today') || (entry['$groupTag'] === 'Tomorrow') || (entry['$groupTag'] === 'Yesterday')) {
                value = format.date(entry.Activity.StartDate, this.startTimeFormatText, entry.Activity.Timeless) + " " + format.date(entry.Activity.StartDate, "A", entry.Activity.Timeless);
            } else {
                value = format.date(entry.Activity.StartDate, this.startDateFormatText, entry.Activity.Timeless);
            }
            return value;
        },
        getItemColorClass: function(entry) {
            return this.activityColorClassByType[entry.Activity.Type] || this.itemColorClass;
        },
        getItemIconSource: function(entry) {
            return this.itemIcon || this.activityIconByType[entry.Activity.Type] || this.icon || this.selectIcon;
        },
        hasContactOrLead: function(action, selection) {
            return (selection.data['Activity']['ContactId']) || (selection.data['Activity']['LeadId']);
        },
        navigateToContactOrLead: function(action, selection) {
            var entry = selection.data["Activity"];
            var entity = this.resolveContactOrLeadEntity(entry),
                viewId,
                options;

            switch (entity) {
                case 'Contact':
                    viewId = 'contact_detail';
                    options = {
                        key: entry['ContactId'],
                        descriptor: entry['ContactName']
                    };
                    break;
                case 'Lead':
                    viewId = 'lead_detail';
                    options = {
                        key: entry['LeadId'],
                        descriptor: entry['LeadName']
                    };
                    break;
            }

            var view = App.getView(viewId);

            if (view && options) {
                view.show(options);
            }
        },
        resolveContactOrLeadEntity: function(entry) {
            var exists = this.existsRE;

            if (entry) {
                if (exists.test(entry['LeadId'])) {
                    return 'Lead';
                }
                if (exists.test(entry['ContactId'])) {
                    return 'Contact';
                }
            }
        },
        recordCallToHistory: function(complete, entry) {
            var tempEntry = {
                '$name': 'History',
                'Type': 'atPhoneCall',
                'ContactName': entry['Activity']['ContactName'],
                'ContactId': entry['Activity']['ContactId'],
                'AccountName': entry['Activity']['AccountName'],
                'AccountId': entry['Activity']['AccountId'],
                'Description': string.substitute("${0} ${1}", [this.calledText, (entry['Activity']['ContactName'] || '')]),
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
        }
    });
});

