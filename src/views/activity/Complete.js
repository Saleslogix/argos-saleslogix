/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.Complete = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        activityInfoText: 'Activity Info',
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        companyText: 'company',
        leadText: 'lead',
        asScheduledText: 'as scheduled',
        categoryText: 'category',
        categoryTitleText: 'Activity Category',
        completedText: 'completed date',
        completionText: 'Completion',
        durationText: 'duration',
        carryOverNotesText: 'carry over notes',
        followUpText: 'follow-up',
        followUpTitleText: 'Activity Follow Up',
        leaderText: 'leader',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',
        otherInfoText: 'Other Info',
        priorityText: 'priority',
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        regardingTitleText: 'Activity Regarding',
        resultText: 'result',
        resultTitleText: 'Result',
        startingText: 'start date',
        timelessText: 'timeless',
        durationValueText: {
            0: 'none',
            15: '15 minutes',
            30: '30 minutes',
            60: '1 hour',
            90: '1.5 hours',
            120: '2 hours'
        },
        followupValueText: {
            'none': 'None',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atToDo': 'To-Do'
        },

        //View Properties
        id: 'activity_complete',
        followupView: 'activity_edit',
        fieldsForLeads: ['AccountName', 'Lead'],
        fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
        picklistsByType: {
            'atAppointment': {
                'Category': 'Meeting Category Codes',
                'Description': 'Meeting Regarding',
                'Result': 'Meeting Result Codes'
            },
            'atLiterature': {
                'Description': 'Lit Request Regarding'
            },
            'atPersonal': {
                'Category': 'Meeting Category Codes',
                'Description': 'Personal Activity Regarding',
                'Result': 'Personal Activity Result Codes'
            },
            'atPhoneCall': {
                'Category': 'Phone Call Category Codes',
                'Description': 'Phone Call Regarding',
                'Result': 'Phone Call Result Codes'
            },
            'atToDo': {
                'Category': 'To Do Category Codes',
                'Description': 'To Do Regarding',
                'Result': 'To Do Result Codes'
            },
            'atEMail': {
                'Category': 'E-mail Category Codes',
                'Description': 'E-mail Regarding'
            }
        },       

        entityName: 'Activity', // todo: is this correct?
        querySelect: [
            'AccountId',
            'AccountName',
            'Alarm',
            'AlarmTime',
            'Category',
            'ContactId',
            'ContactName',
            'CompletedDate',
            'Description',
            'Duration',
            'LeadId',
            'LeadName',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'Priority',
            'Regarding',
            'Result',
            'Rollover',
            'StartDate',
            'TicketId',
            'TicketNumber',
            'Timeless',
            'Type',
            'UserId'
        ],
        resourceKind: 'activities',

        init: function() {
            Mobile.SalesLogix.Activity.Complete.superclass.init.apply(this, arguments);

            this.fields['Leader'].on('change', this.onLeaderChange, this);
            this.fields['Timeless'].on('change', this.onTimelessChange, this);
            this.fields['AsScheduled'].on('change', this.onAsScheduledChange, this);
            this.fields['Followup'].on('change', this.onFollowupChange, this);
            this.fields['Lead'].on('change', this.onLeadChange, this);
        },
        isActivityForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        beforeTransitionTo: function() {
            Mobile.SalesLogix.Activity.Complete.superclass.beforeTransitionTo.apply(this, arguments);

            Ext.each(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item])
                    this.fields[item].hide();
            }, this);

            var entry = this.options && this.options.entry;
            if (this.isActivityForLead(entry))
            {
                Ext.each(this.fieldsForLeads, function(item) {
                    if (this.fields[item])
                        this.fields[item].show();
                }, this);
            }
            else
            {
                Ext.each(this.fieldsForStandard, function(item) {
                    if (this.fields[item])
                        this.fields[item].show();
                }, this);
            }
        },
        toggleSelectField: function(field, disable, options) {
            disable === true ? field.disable() : field.enable();
        },
        onTimelessChange: function(value, field) {
            this.toggleSelectField(this.fields['Duration'], value);
        },
        onAsScheduledChange: function(scheduled, field) {
            if (scheduled)
            {
                this.toggleSelectField(this.fields['CompletedDate'], true);
                this.fields['CompletedDate'].setValue(this.fields['StartDate'].getValue());
            }
            else
            {
                this.toggleSelectField(this.fields['CompletedDate'], false);
                this.fields['CompletedDate'].setValue(new Date());
            }
        },
        onFollowupChange: function(value, field) {
            var disable = (value === 'none' || (value && value.key === 'none'));
            this.toggleSelectField(this.fields['CarryOverNotes'], disable);
        },
        onLeadChange: function(value, field) {
            var selection = field.getSelection(),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (selection && this.insert)
            {
                this.fields['Company'].setValue(getV(selection, 'Company'));
            }
        },
        formatPicklistForType: function(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        setValues: function(values) {
            Mobile.SalesLogix.Activity.Complete.superclass.setValues.apply(this, arguments);
            this.fields['CarryOverNotes'].setValue(true);
            this.fields['CompletedDate'].setValue(new Date());
            this.fields['Followup'].setValue('none');
            this.fields['Result'].setValue('Complete');

            this.toggleSelectField(this.fields['CarryOverNotes'], true);
            this.toggleSelectField(this.fields['CompletedDate'], false);
        },
        onLeaderChange: function(value, field) {
            this.fields['UserId'].setValue(value && value['key']);
        },
        formatDurationText: function(val, key, text) {
            return this.durationValueText[key] || text;
        },
        formatFollowupText: function(val, key, text) {
            return this.followupValueText[key] || text;
        },
        createDurationData: function() {
            var list = [];

            for (var duration in this.durationValueText)
            {
                list.push({
                    '$key': duration,
                    '$descriptor': this.durationValueText[duration]
                });
            }

            return {'$resources': list};
        },        
        createFollowupData: function() {
            var list = [];

            for (var followup in this.followupValueText)
            {
                list.push({
                    '$key': followup,
                    '$descriptor': this.followupValueText[followup]
                });
            }

            return {'$resources': list};
        },
        navigateToFollowUpView: function(entry) {
            var view = App.getView(this.followupView),
                followupEntry = {
                    'Type': this.fields['Followup'].getValue(),
                    'Description': entry.Description,
                    'AccountId': entry.AccountId,
                    'AccountName': entry.AccountName,
                    'ContactId': entry.ContactId,
                    'ContactName': entry.ContactName,
                    'LeadId': entry.LeadId,
                    'LeadName': entry.LeadName,
                    'LongNotes': (this.fields['CarryOverNotes'].getValue() && entry['LongNotes']) || '',
                    'OpportunityId': entry.OpportunityId,
                    'OpportunityName': entry.OpportunityName,
                    'TicketId': entry.TicketId,
                    'TicketNumber': entry.TicketNumber
                };

            //Return to activity list view after follow up.
            view.show({
                entry: followupEntry,
                insert: true,
                title: this.followupValueText[this.fields['Followup'].getValue()]
            }, {
                returnTo: -1
            });
        },
        completeActivity: function(entry, callback) {
            var completeActivityEntry = {
                "$name": "ActivityComplete",
                "request": {
                    "ActivityId": entry.$key,
                    "userId": entry.UserId,
                    "result": this.fields['Result'].getValue(),
                    "completeDate":  this.fields['CompletedDate'].getValue()
                }
            };

            var success = (function(scope, callback, entry) {
                return function() {
                    App.fireEvent('refresh', {
                        resourceKind: 'history'
                    });

                    callback.apply(scope, [entry]);
                };
            })(this, callback, entry);

            var request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
                .setResourceKind('activities')
                .setOperationName('Complete');

            request.execute(completeActivityEntry, {
                success: success,
                failure: function() {},
                scope: this
            });
        },
        onUpdateCompleted: function(entry) {
            var followup = this.fields['Followup'].getValue() !== 'none'
                    ? this.navigateToFollowUpView
                    : Mobile.SalesLogix.Activity.Complete.superclass.onUpdateCompleted;

            this.completeActivity(entry, followup);
        },
        formatDependentQuery: function(dependentValue, format, property) {
            var getV = Sage.Platform.Mobile.Utility.getValue;

            property = property || '$key';

            return String.format(format, getV(dependentValue, property));
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                options: {
                    title: this.activityInfoText,
                    collapsed: false
                },
                as: [{
                    name: 'Type',
                    type: 'hidden'
                },{
                    dependsOn: 'Type',
                    label: this.regardingText,
                    name: 'Description',
                    picklist: this.formatPicklistForType.createDelegate(
                        this, ['Description'], true
                    ),
                    title: this.regardingTitleText,
                    orderBy: 'text asc',
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },{
                    label: this.startingText,
                    name: 'StartDate',
                    type: 'date',
                    showTimePicker: true,
                    formatString: 'M/d/yyyy h:mm tt',
                    minValue: (new Date(1900, 0, 1)),
                    validator: [
                        Mobile.SalesLogix.Validator.exists,
                        Mobile.SalesLogix.Validator.isDateInRange
                    ]
                },{
                    label: this.durationText,
                    name: 'Duration',
                    type: 'select',
                    view: 'select_list',
                    textRenderer: this.formatDurationText.createDelegate(this),
                    requireSelection: true,
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    data: this.createDurationData(),
                    validator: {
                        fn: function(val, field) {
                            if (field.isDisabled()) return false;
                            if (!/^\d+$/.test(val)) return true;
                        },
                        message: "The field '{2}' must have a value."
                    }
                },{
                    label: this.timelessText,
                    name: 'Timeless',
                    type: 'boolean'
                }]
            },{
                options: {
                    title: this.completionText,
                    collapsed: false
                },
                as: [{
                    label: this.asScheduledText,
                    include: false,
                    name: 'AsScheduled',
                    type: 'boolean'
                },{
                    label: this.completedText,
                    name: 'CompletedDate',
                    type: 'date',
                    showTimePicker: true,
                    formatString: 'M/d/yyyy h:mm tt',
                    minValue: (new Date(1900, 0, 1)),
                    validator: [
                        Mobile.SalesLogix.Validator.exists,
                        Mobile.SalesLogix.Validator.isDateInRange
                    ]
                },{
                    dependsOn: 'Type',
                    label: this.resultText,
                    name: 'Result',
                    picklist: this.formatPicklistForType.createDelegate(
                        this, ['Result'], true
                    ),
                    title: this.resultTitleText,
                    orderBy: 'text asc',
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },{
                    label: this.followUpText,
                    name: 'Followup',
                    type: 'select',
                    view: 'select_list',
                    textRenderer: this.formatFollowupText.createDelegate(this),
                    requireSelection: true,
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    data: this.createFollowupData(),
                    include: false
                },{
                    label: this.carryOverNotesText,
                    include: false,
                    name: 'CarryOverNotes',
                    type: 'boolean'
                },{
                    label: this.longNotesText,
                    noteProperty: false,
                    name: 'LongNotes',
                    title: this.longNotesTitleText,
                    type: 'note',
                    view: 'text_edit'
                },{
                    label: this.accountText,
                    name: 'Account',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'AccountId',
                    valueTextProperty: 'AccountName',
                    validator: {
                        //Personal activities don't require an account. We'll just manually
                        //call the validator if it's a non-personal activity.
                        fn: function(value, field, view) {
                            if (view.fields['Type'].getValue() === 'atPersonal') {
                                return false;
                            } else {
                                return Mobile.SalesLogix.Validator.exists.fn(value, field, view);
                            }
                        },
                        message: Mobile.SalesLogix.Validator.exists.message
                    },
                    view: 'account_related'
                },{
                    dependsOn: 'Account',
                    label: this.contactText,
                    name: 'Contact',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'ContactId',
                    valueTextProperty: 'ContactName',
                    view: 'contact_related',
                    where: this.formatDependentQuery.createDelegate(
                        this, ['Account.Id eq "{0}"', 'AccountId'], true
                    )
                },{
                    dependsOn: 'Account',
                    label: this.opportunityText,
                    name: 'Opportunity',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'OpportunityId',
                    valueTextProperty: 'OpportunityName',
                    view: 'opportunity_related',
                    where: this.formatDependentQuery.createDelegate(
                        this, ['Account.Id eq "{0}"', 'AccountId'], true
                    )
                },{
                    dependsOn: 'Account',
                    label: this.ticketNumberText,
                    name: 'Ticket',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'TicketId',
                    valueTextProperty: 'TicketNumber',
                    view: 'ticket_related',
                    where: this.formatDependentQuery.createDelegate(
                        this, ['Account.Id eq "{0}"', 'AccountId'], true
                    )
                },{
                    label: this.leadText,
                    name: 'Lead',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'LeadId',
                    valueTextProperty: 'LeadName',
                    view: 'lead_related'
                },{
                    label: this.companyText,
                    name: 'AccountName',
                    type: 'text'
                }]
            },{
                options: {
                    title: this.otherInfoText,
                    collapsed: false
                },
                as: [{
                    label: this.priorityText,
                    name: 'Priority',
                    picklist: 'Priorities',
                    title: this.priorityTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },{
                    dependsOn: 'Type',
                    label: this.categoryText,
                    name: 'Category',
                    picklist: this.formatPicklistForType.createDelegate(
                        this, ['Category'], true
                    ),
                    orderBy: 'text asc',
                    title: this.categoryTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },{
                    type: 'hidden',
                    name: 'UserId'
                },{
                    label: this.leaderText,
                    name: 'Leader',
                    include: false,
                    type: 'lookup',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    requireSelection: true,
                    view: 'user_list'
                }]
            }]);
        }
    });     
})();
