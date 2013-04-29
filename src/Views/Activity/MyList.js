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
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/ErrorManager'
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
    convert,
    ErrorManager
) {

    return declare('Mobile.SalesLogix.Views.Activity.MyList', [ActivityList], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-my-activity-key="{%= $.$key %}" data-key="{%= $.Activity.$key %}" data-descriptor="{%: $.Activity.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
            '<div data-action="selectEntry" class="list-item-static-selector">',
            '<img src="{%= $$.activityIconByType[$.Activity.Type] || $$.icon || $$.selectIcon %}" class="icon" />',
            '</div>',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        activityTimeTemplate: new Simplate([
            '{% if ($.Activity.Timeless) { %}',
            '<span class="p-meridiem">{%: $$.allDayText %}</span>',
            '{% } else { %}',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, $$.startTimeFormatText) %}</span>',
            '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "tt") %}</span>,',
            '{% } %}'
        ]),
        itemTemplate: new Simplate([
            '<h3>',
            '{%! $$.activityTimeTemplate %}',
            '<span class="p-description">&nbsp;{%: $.Activity.Description %}{% if ($.Status === "asUnconfirmed") { %} ({%: Mobile.SalesLogix.Format.userActivityStatus($.Status) %}) {% } %}</span>',
            '</h3>',
            '<h4>{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, $$.startDateFormatText, Sage.Platform.Mobile.Convert.toBoolean($.Activity.Timeless)) %} - {%! $$.nameTemplate %}</h4>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.Activity.ContactName) { %}',
            '{%: $.Activity.ContactName %} / {%: $.Activity.AccountName %}',
            '{% } else if ($.Activity.AccountName) { %}',
            '{%: $.Activity.AccountName %}',
            '{% } else { %}',
            '{%: $.Activity.LeadName %}',
            '{% } %}',
            '{% if ($.Activity.PhoneNumber) { %}',
            ' [{%: Sage.Platform.Mobile.Format.phone($.Activity.PhoneNumber) %}]',
            '{% } %}'
        ]),

        //Localization
        titleText: 'My Activities',
        completeActivityText: 'Complete',
        acceptActivityText: 'Accept',
        declineActivityText: 'Decline',
        callText: 'Call',
        calledText: 'Called',
        activityTypeText: {
            'atPhoneCall': 'Phone Call',
            'atEMail': 'E-mail'
        },

        //View Properties
        id: 'myactivity_list',

        historyEditView: 'history_edit',

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
            'Activity/Type',
            'Activity/AccountName',
            'Activity/AccountId',
            'Activity/ContactId',
            'Activity/ContactName',
            'Activity/Leader/$key',
            'Activity/LeadName',
            'Activity/UserId',
            'Activity/Timeless',
            'Activity/PhoneNumber',
            'Activity/Recurring'
        ],
        resourceKind: 'userActivities',
        allowSelection: true,
        enableActions: true,

        recordCallToHistory: function(complete, entry) {
            var entry = {
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

            this.navigateToHistoryInsert('atPhoneCall', entry, complete);
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
            var payload = {
                "$name": operation,
                "request": {
                    "entity": notification,
                    "UserNotificationId": notification['$key']
                }
            };

            var request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
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
            var completeActivity, request;

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
    });
});

