define('Mobile/SalesLogix/Views/Activity/Detail', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/query',
    'dojo/dom-class',
    'Mobile/SalesLogix/Template',
    'Mobile/SalesLogix/Format',
    'Argos/Convert',
    'Argos/Detail',
    'Mobile/SalesLogix/Recurrence',
    'Argos/_SDataDetailMixin',
    'argos!scene'
], function(
    declare,
    string,
    query,
    domClass,
    template,
    format,
    convert,
    Detail,
    recur,
    _SDataDetailMixin,
    scene
) {

    return declare('Mobile.SalesLogix.Views.Activity.Detail', [Detail, _SDataDetailMixin], {
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
            if (this.isActivityRecurringSeries(this.item) && confirm(this.confirmEditRecurrenceText)) {
                this.recurrence.Leader = this.item.Leader;
                scene().showView( this.editView, {
                    item: this.recurrence
                });

            } else {
                scene().showView( this.editView, {
                    item: this.item
                });
            }
        },
        navigateToCompleteView: function(completionTitle, isSeries) {
            this.refreshRequired = true;

            var options = {
                title: completionTitle,
                template: {}
            };

            if (isSeries){
                this.recurrence.Leader = this.item.Leader;
                options.item = this.recurrence;
            } else {
                options.item = this.item;
            }

            scene().showView( this.completeView, options, {
                returnTo: -1
            });
        },
        completeActivity: function() {
            this.navigateToCompleteView(this.completeActivityText);
        },
        completeOccurrence: function() {
            this.navigateToCompleteView(this.completeOccurrenceText);
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
        requestLeader: function(entry) {
            if (this.item && this.item['Leader']['$key']) {
                var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getConnection())
                    .setResourceKind('users')
                    .setResourceSelector(string.substitute("'${0}'", [this.item['Leader']['$key']]))
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
            }
        },
        requestLeaderFailure: function(xhr, o) {
        },
        processLeader: function(leader) {
            if (leader)
            {
                this.item['Leader'] = leader;

                var rowNode = query('[data-property="Leader"]'),
                    contentNode = rowNode && query('[data-property="Leader"] > span', this.domNode);

                if (rowNode)
                    domClass.remove(rowNode[0], 'content-loading');

                if (contentNode)
                    contentNode[0].innerHTML = this.leaderTemplate.apply(leader['UserInfo']);
            }
        },
        requestRecurrence: function(entry) {
            var key = this.isActivityRecurring(this.item) ? this.item['$key'].split(this.recurringActivityIdSeparator).shift() : null;

            if (key) {
                var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getConnection())
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
            }
        },
        processRecurrence: function(recurrence) {
            if (recurrence)
            {
                this.recurrence = recurrence;

                var rowNode = query('[data-property="RecurrenceUI"]'),
                    contentNode = rowNode && query('[data-property="RecurrenceUI"] > span', this.domNode);
                if (rowNode) { domClass.remove(rowNode[0], 'content-loading'); }
                if (contentNode) { contentNode[0].innerHTML = recur.toString(this.recurrence); }
            }
        },
        requestRecurrenceFailure: function(xhr, o) {
        },
        checkCanComplete: function(entry) {
            return !entry || (entry['Leader']['$key'] !== App.context['user']['$key'])
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
                },{
                    name: 'completeOccurrenceAction',
                    property: 'StartDate',
                    label: this.completeOccurrenceText,
                    icon: 'content/images/icons/Clear_Activity_24x24.png',
                    action: 'completeOccurrence',
                    disabled: this.checkCanComplete,
                    renderer: format.date.bindDelegate(this, this.startDateFormatText, false),
                    include: this.isActivityRecurringSeries
                },{
                    name: 'completeSeriesAction',
                    property: 'Description',
                    label: this.completeSeriesText,
                    icon: 'content/images/icons/Clear_Activity_24x24.png',
                    action: 'completeSeries',
                    disabled: this.checkCanComplete,
                    include: this.isActivityRecurringSeries
                }]
            },{
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    name: 'Type',
                    property: 'Type',
                    label: this.typeText,
                    renderer: this.formatActivityType.bindDelegate(this)
                },{
                    name: 'Description',
                    property: 'Description',
                    label: this.regardingText
                },{
                    name: 'Category',
                    property: 'Category',
                    label: this.categoryText
                },{
                    name: 'Location',
                    property: 'Location',
                    label: this.locationText
                },{
                    name: 'Priority',
                    property: 'Priority',
                    label: this.priorityText
                },{
                    name: 'LongNotes',
                    property: 'LongNotes',
                    label: this.longNotesText
                }]
            },{
                title: this.whenText,
                name: 'WhenSection',
                children: [{
                    name: 'StartDate',
                    property: 'StartDate',
                    label: this.startTimeText,
                    renderer: format.date.bindDelegate(this, this.startDateFormatText, false),
                    exclude: this.isActivityTimeless
                },{
                    name: 'StartDateTimeless',
                    property: 'StartDate',
                    label: this.allDayText,
                    renderer: format.date.bindDelegate(this, this.timelessDateFormatText, true),
                    include: this.isActivityTimeless
                },{
                    name: 'Timeless',
                    property: 'Timeless',
                    label: this.timelessText,
                    type: 'boolean',
                    include: false
                },{
                    name: 'Duration',
                    property: 'Duration',
                    label: this.durationText,
                    renderer: format.timespan,
                    exclude: this.isActivityTimeless
                },{
                    name: 'Alarm',
                    property: 'Alarm',
                    label: this.alarmText,
                    exclude: this.doesActivityHaveReminder
                },{
                    name: 'AlarmTime',
                    property: 'AlarmTime',
                    label: this.alarmTimeText,
                    renderer: format.date.bindDelegate(this, this.alarmDateFormatText, null, true),
                    include: this.doesActivityHaveReminder
                },{
                    name: 'Rollover',
                    property: 'Rollover',
                    label: this.rolloverText,
                    include: this.isActivityTimeless,
                    renderer: format.yesNo
                },{
                    name: 'RecurrenceUI',
                    property: 'RecurrenceUI',
                    label: this.recurrenceText,
                    include: this.isActivityRecurring,
                    cls: 'content-loading',
                    value: 'loading...',
                    onCreate: this.requestRecurrence.bindDelegate(this)
                }]
            },{
                title: this.whoText,
                name: 'WhoSection',
                children: [{
                    name: 'Leader',
                    property: 'Leader',
                    label: this.leaderText,
                    cls: 'content-loading',
                    value: 'loading...',
                    onCreate: this.requestLeader.bindDelegate(this)
                },{
                    name: 'ContactName',
                    property: 'ContactName',
                    exclude: this.isActivityForLead,
                    label: this.contactText,
                    view: 'contact_detail',
                    key: 'ContactId',
                    descriptor: 'ContactName'
                },{
                    name: 'AccountName',
                    property: 'AccountName',
                    exclude: this.isActivityForLead,
                    label: this.accountText,
                    view: 'account_detail',
                    key: 'AccountId',
                    descriptor: 'AccountName'
                },{
                    name: 'OpportunityName',
                    property: 'OpportunityName',
                    exclude: this.isActivityForLead,
                    label: this.opportunityText,
                    view: 'opportunity_detail',
                    key: 'OpportunityId',
                    descriptor: 'OpportunityName'
                },{
                    name: 'TicketNumber',
                    property: 'TicketNumber',
                    exclude: this.isActivityForLead,
                    label: this.ticketNumberText,
                    view: 'ticket_detail',
                    key: 'TicketId',
                    descriptor: 'TicketNumber'
                },{
                    name: 'LeadName',
                    property: 'LeadName',
                    include: this.isActivityForLead,
                    label: this.leadText,
                    view: 'lead_detail',
                    key: 'LeadId',
                    descriptor: 'LeadName'
                },{
                    name: 'AccountName',
                    property: 'AccountName',
                    include: this.isActivityForLead,
                    label: this.companyText
                }]
            }]);
        }        
    });
});
