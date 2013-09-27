/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Activity/Detail', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/query',
    'dojo/dom-class',
    'Mobile/SalesLogix/Template',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Environment',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/Detail',
    'Mobile/SalesLogix/Recurrence',
    'Mobile/SalesLogix/Utility',
    'Sage/Platform/Mobile/Utility'
], function(
    declare,
    string,
    query,
    domClass,
    template,
    format,
    environment,
    convert,
    Detail,
    recur,
    utility,
    platformUtility
) {

    return declare('Mobile.SalesLogix.Views.Activity.Detail', [Detail], {
        //Templates
        leaderTemplate: template.nameLF,

        //Localization
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity'
        },
        actionsText: 'Quick Actions',
        completeActivityText: 'Complete Activity',
        completeOccurrenceText: 'Complete Occurrence',
        completeSeriesText: 'Complete Series',
        locationText: 'location',
        alarmText: 'alarm',
        alarmTimeText: 'alarm',
        categoryText: 'category',
        durationText: 'duration',
        leaderText: 'leader',
        longNotesText: 'notes',
        priorityText: 'priority',
        regardingText: 'regarding',
        rolloverText: 'auto rollover',
        startTimeText: 'start time',
        allDayText: 'all day',
        timelessText: 'timeless',
        titleText: 'Activity',
        typeText: 'type',
        companyText: 'company',
        leadText: 'lead',
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        whenText: 'When',
        whoText: 'Who',
        startDateFormatText: 'M/D/YYYY h:mm:ss A',
        timelessDateFormatText: 'M/D/YYYY',
        alarmDateFormatText: 'M/D/YYYY h:mm:ss A',
        recurrenceText: 'recurrence',
        confirmEditRecurrenceText: 'Edit all Occurrences?\nCancel to edit single Occurrence.',
        relatedAttachmentText: 'Attachments',
        relatedAttachmentTitleText: 'Activity Attachments',
        relatedItemsText:'Related Items',
        phoneText: 'phone',

        //View Properties
        id: 'activity_detail',
        completeView: 'activity_complete',
        editView: 'activity_edit',
        security: null, //'Entities/Activity/View',
        contractName: 'system',
        querySelect: [
            'AccountId',
            'AccountName',
            'Alarm',
            'AlarmTime',
            'Category',
            'Company',
            'ContactId',
            'ContactName',
            'Description',
            'Duration',
            'Leader/$key',
            'LeadId',
            'LeadName',
            'Location',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'PhoneNumber',
            'Priority',
            'Rollover',
            'StartDate',
            'EndDate',
            'TicketId',
            'TicketNumber',
            'Timeless',
            'Type',
            'Recurring',
            'RecurPeriod',
            'RecurPeriodSpec',
            'RecurIterations',
            'RecurrenceState'
        ],
        resourceKind: 'activities',
        recurringActivityIdSeparator: ';',
        recurrence: {},

        formatActivityType: function(val) {
            return this.activityTypeText[val] || val;
        },
        navigateToEditView: function(el) {
            var view = App.getView(this.editView);

            if (view) {
                if (this.isActivityRecurringSeries(this.entry) && confirm(this.confirmEditRecurrenceText)) {
                    this.recurrence.Leader = this.entry.Leader;
                    view.show({entry: this.recurrence});

                } else {
                    view.show({entry: this.entry});
                }
            }
        },
        navigateToCompleteView: function(completionTitle, isSeries) {
            var view, options;

            view = App.getView(this.completeView);

            if (view) {
                environment.refreshActivityLists();
                options = {
                    title: completionTitle,
                    template: {}
                };

                if (isSeries) {
                    this.recurrence.Leader = this.entry.Leader;
                    options.entry = this.recurrence;
                } else {
                    options.entry = this.entry;
                }

                view.show(options, {
                    returnTo: -1
                });
            }
        },
        completeActivity: function() {
            this.navigateToCompleteView(this.completeActivityText);
        },
        completeOccurrence: function() {
            var request, key, entry = this.entry;
            key = entry['$key'];

            // Check to ensure we have a composite key (meaning we have the occurance, not the master)
            if (this.isActivityRecurring(entry) && key.split(this.recurringActivityIdSeparator).length !== 2) {
                // Fetch the occurance, and continue on to the complete screen
                request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
                    .setResourceKind('activities')
                    .setContractName('system')
                    .setQueryArg('where', "id eq '" + key + "'")
                    .setCount(1);

                request.read({
                    success: this.processOccurance,
                    scope: this
                });
            } else {
                this.navigateToCompleteView(this.completeOccurrenceText);
            }
        },
        processOccurance: function(feed) {
            if (feed && feed.$resources && feed.$resources.length > 0) {
                this.entry = feed.$resources[0];
                this.navigateToCompleteView(this.completeOccurrenceText);
            }
        },
        completeSeries: function() {
            this.navigateToCompleteView(this.completeSeriesText, true);
        },
        isActivityRecurring: function(entry) {
            return entry && (entry['Recurring'] || entry['RecurrenceState'] == 'rstOccurrence');
        },
        isActivityRecurringSeries: function(entry) {
            return this.isActivityRecurring(entry) && !recur.isAfterCompletion(entry['RecurPeriod']);
        },
        isActivityForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        isActivityTimeless: function(entry) {
            return entry && convert.toBoolean(entry['Timeless']);
        },
        doesActivityHaveReminder: function(entry) {
            return convert.toBoolean(entry && entry['Alarm']);
        },
        requestLeader: function(userId) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
                .setResourceKind('users')
                .setResourceSelector(string.substitute("'${0}'", [userId]))
                .setQueryArg('select', [
                    'UserInfo/FirstName',
                    'UserInfo/LastName'
                ].join(','));

            request.allowCacheUse = true;
            request.read({
                success: this.processLeader,
                failure: this.requestLeaderFailure,
                scope: this
            });
        },
        requestLeaderFailure: function(xhr, o) {
        },
        processLeader: function(leader) {
            if (leader) {
                this.entry['Leader'] = leader;

                var rowNode = query('[data-property="Leader"]'),
                    contentNode = rowNode && query('[data-property="Leader"] > span', this.domNode);

                if (rowNode) {
                    domClass.remove(rowNode[0], 'content-loading');
                }

                if (contentNode) {
                    contentNode[0].innerHTML = this.leaderTemplate.apply(leader['UserInfo']);
                }
            }
        },
        requestRecurrence: function(key) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
                .setResourceKind(this.resourceKind)
                .setResourceSelector(string.substitute("'${0}'", [key]))
                .setContractName(this.contractName)
                .setQueryArg('select', this.querySelect.join(','));

            request.allowCacheUse = false;
            request.read({
                success: this.processRecurrence,
                failure: this.requestRecurrenceFailure,
                scope: this
            });
            return;
        },
        processRecurrence: function(recurrence) {
            var rowNode, contentNode;

            if (recurrence) {
                this.recurrence = recurrence;

                rowNode = query('[data-property="RecurrenceUI"]');
                contentNode = rowNode && query('[data-property="RecurrenceUI"] > span', this.domNode);

                if (rowNode) {
                    domClass.remove(rowNode[0], 'content-loading');
                }

                if (contentNode) {
                    contentNode[0].innerHTML = recur.toString(this.recurrence);
                }
            }
        },
        requestRecurrenceFailure: function(xhr, o) {
        },
        checkCanComplete: function(entry) {
            return !entry || (entry['Leader']['$key'] !== App.context['user']['$key']);
        },
        processEntry: function(entry) {
            this.inherited(arguments);

            if (entry && entry['Leader']['$key']) {
                this.requestLeader(entry['Leader']['$key']);
            }
            if (this.isActivityRecurring(entry)) {
                this.requestRecurrence(entry['$key'].split(this.recurringActivityIdSeparator).shift());
            }
        },
        formatRelatedQuery: function(entry, fmt, property) {
            if (property === 'activityId') {
                  return string.substitute(fmt, [utility.getRealActivityId(entry.$key)]);
            } else {
                property = property || '$key';
                return string.substitute(fmt, [platformUtility.getValue(entry, property, "")]);
            }
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                    list: true,
                    title: this.actionsText,
                    cls: 'action-list',
                    name: 'QuickActionsSection',
                    children: [{
                            name: 'CompleteActivityAction',
                            property: 'Description',
                            label: this.completeActivityText,
                            icon: 'content/images/icons/Clear_Activity_24x24.png',
                            action: 'completeActivity',
                            disabled: this.checkCanComplete,
                            exclude: this.isActivityRecurringSeries
                        }, {
                            name: 'completeOccurrenceAction',
                            property: 'StartDate',
                            label: this.completeOccurrenceText,
                            icon: 'content/images/icons/Clear_Activity_24x24.png',
                            action: 'completeOccurrence',
                            disabled: this.checkCanComplete,
                            renderer: format.date.bindDelegate(this, this.startDateFormatText, false),
                            include: this.isActivityRecurringSeries
                        }, {
                            name: 'completeSeriesAction',
                            property: 'Description',
                            label: this.completeSeriesText,
                            icon: 'content/images/icons/Clear_Activity_24x24.png',
                            action: 'completeSeries',
                            disabled: this.checkCanComplete,
                            include: this.isActivityRecurringSeries
                        }]
                }, {
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            name: 'Type',
                            property: 'Type',
                            label: this.typeText,
                            renderer: this.formatActivityType.bindDelegate(this)
                        }, {
                            name: 'Description',
                            property: 'Description',
                            label: this.regardingText
                        }, {
                            name: 'Category',
                            property: 'Category',
                            label: this.categoryText
                        }, {
                            name: 'Location',
                            property: 'Location',
                            label: this.locationText
                        }, {
                            name: 'Priority',
                            property: 'Priority',
                            label: this.priorityText
                        }, {
                            name: 'LongNotes',
                            property: 'LongNotes',
                            label: this.longNotesText
                        }, {
                            name: 'PhoneNumber',
                            property: 'PhoneNumber',
                            label: this.phoneText,
                            renderer: format.phone.bindDelegate(this, false)
                        }]
                }, {
                    title: this.whenText,
                    name: 'WhenSection',
                    children: [{
                            name: 'StartDate',
                            property: 'StartDate',
                            label: this.startTimeText,
                            renderer: format.date.bindDelegate(this, this.startDateFormatText, false),
                            exclude: this.isActivityTimeless
                        }, {
                            name: 'StartDateTimeless',
                            property: 'StartDate',
                            label: this.allDayText,
                            renderer: format.date.bindDelegate(this, this.timelessDateFormatText, true),
                            include: this.isActivityTimeless
                        }, {
                            name: 'Timeless',
                            property: 'Timeless',
                            label: this.timelessText,
                            type: 'boolean',
                            include: false
                        }, {
                            name: 'Duration',
                            property: 'Duration',
                            label: this.durationText,
                            renderer: format.timespan,
                            exclude: this.isActivityTimeless
                        }, {
                            name: 'Alarm',
                            property: 'Alarm',
                            label: this.alarmText,
                            renderer: format.yesNo,
                            exclude: this.doesActivityHaveReminder
                        }, {
                            name: 'AlarmTime',
                            property: 'AlarmTime',
                            label: this.alarmTimeText,
                            renderer: format.date.bindDelegate(this, this.alarmDateFormatText, null, true),
                            include: this.doesActivityHaveReminder
                        }, {
                            name: 'Rollover',
                            property: 'Rollover',
                            label: this.rolloverText,
                            include: this.isActivityTimeless,
                            renderer: format.yesNo
                        }, {
                            name: 'RecurrenceUI',
                            property: 'RecurrenceUI',
                            label: this.recurrenceText,
                            include: this.isActivityRecurring,
                            cls: 'content-loading',
                            value: 'loading...'
                        }]
                }, {
                    title: this.whoText,
                    name: 'WhoSection',
                    children: [{
                            name: 'Leader',
                            property: 'Leader',
                            label: this.leaderText,
                            cls: 'content-loading',
                            value: 'loading...'
                        }, {
                            name: 'ContactName',
                            property: 'ContactName',
                            exclude: this.isActivityForLead,
                            label: this.contactText,
                            view: 'contact_detail',
                            key: 'ContactId',
                            descriptor: 'ContactName'
                        }, {
                            name: 'AccountName',
                            property: 'AccountName',
                            exclude: this.isActivityForLead,
                            label: this.accountText,
                            view: 'account_detail',
                            key: 'AccountId',
                            descriptor: 'AccountName'
                        }, {
                            name: 'OpportunityName',
                            property: 'OpportunityName',
                            exclude: this.isActivityForLead,
                            label: this.opportunityText,
                            view: 'opportunity_detail',
                            key: 'OpportunityId',
                            descriptor: 'OpportunityName'
                        }, {
                            name: 'TicketNumber',
                            property: 'TicketNumber',
                            exclude: this.isActivityForLead,
                            label: this.ticketNumberText,
                            view: 'ticket_detail',
                            key: 'TicketId',
                            descriptor: 'TicketNumber'
                        }, {
                            name: 'LeadName',
                            property: 'LeadName',
                            include: this.isActivityForLead,
                            label: this.leadText,
                            view: 'lead_detail',
                            key: 'LeadId',
                            descriptor: 'LeadName'
                        }, {
                            name: 'AccountName',
                            property: 'AccountName',
                            include: this.isActivityForLead,
                            label: this.companyText
                        }]
                },{
                    title: this.relatedItemsText,
                    list: true,
                    name: 'RelatedItemsSection',
                    children: [{
                        name: 'AttachmentRelated',
                        icon: 'content/images/icons/Attachment_24.png',
                        label: this.relatedAttachmentText,
                        where: this.formatRelatedQuery.bindDelegate(this, 'activityId eq "${0}"', 'activityId'),// must be lower case because of feed
                        view: 'activity_attachment_related',
                        title: this.relatedAttachmentTitleText
                    }]
                }]);
        }
    });
});

