/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        activityCategoryTitleText: 'Activity Category',
        activityDescriptionTitleText: 'Activity Description',
        categoryText: 'category',
        completedText: 'completed',
        durationText: 'duration',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        leaderText: 'leader',
        accountText: 'account',
        contactText: 'contact',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        moreDetailsText: 'More Details',
        priorityText: 'priority',
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        scheduledText: 'scheduled',
        timelessText: 'timeless',
        titleText: 'History',
        typeText: 'type',
        companyText: 'company',
        leadText: 'lead',

        //View Properties
        id: 'history_edit',
        fieldsForLeads: ['AccountName', 'Lead'],
        fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
        picklistsByType: {
            'atAppointment': {
                'Category': 'Meeting Category Codes',
                'Description': 'Meeting Regarding'
            },
            'atLiterature': {
                'Description': 'Lit Request Regarding'
            },
            'atPersonal': {
                'Category': 'Meeting Category Codes',
                'Description': 'Personal Activity Regarding'
            },
            'atPhoneCall': {
                'Category': 'Phone Call Category Codes',
                'Description': 'Phone Call Regarding'
            },
            'atToDo': {
                'Category': 'To Do Category Codes',
                'Description': 'To Do Regarding'
            },
            'atEMail': {
                'Category': 'E-mail Category Codes',
                'Description': 'E-Mail Regarding'
            }
        },
        durationValueText: {
            0: 'none',
            15: '15 minutes',
            30: '30 minutes',
            60: '1 hour',
            90: '1.5 hours',
            120: '2 hours'
        },
        entityName: 'History',
        resourceKind: 'history',
        querySelect: [
            'AccountId',
            'AccountName',
            'Category',
            'ContactId',
            'ContactName',
            'Description',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'Priority',
            'TicketId',
            'TicketNumber',
            'Type',
            'UserId',
            'UserName',
            'LeadId',
            'LeadName'
        ],

        init: function() {
            Mobile.SalesLogix.History.Edit.superclass.init.apply(this, arguments);

            this.fields['Timeless'].on('change', this.onTimelessChange, this);
        },
        isHistoryForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        beforeTransitionTo: function() {
            Mobile.SalesLogix.Activity.Complete.superclass.beforeTransitionTo.apply(this, arguments);

            var insert = this.options && this.options.insert,
                entry = this.options && this.options.entry,
                lead = (insert && App.isNavigationFromResourceKind('leads', function(o, c) { return c.key; })) || this.isHistoryForLead(entry);

            Ext.each(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item])
                    this.fields[item].hide();
            }, this);

            if (lead)
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
        onTimelessChange: function(value, field) {
            var field = this.fields['Duration'];

            value === true ? field.disable() : field.enable();
        },
        formatPicklistForType: function(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        formatDurationText: function(val, key, text) {
            return this.durationValueText[key] || text;
        },
        formatDependentQuery: function(dependentValue, format, property) {
            var getV = Sage.Platform.Mobile.Utility.getValue;

            property = property || '$key';

            return String.format(format, getV(dependentValue, property));
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
        createLayout: function() {
            return this.layout || (this.layout = [{
                name: 'Type',
                type: 'hidden'
            },{
                dependsOn: 'Type',
                label: this.regardingText,
                name: 'Description',
                picklist: this.formatPicklistForType.createDelegate(
                    this, ['Description'], true
                ),
                orderBy: 'text asc',
                title: this.activityDescriptionTitleText,
                type: 'picklist'
            },{
                name: 'LongNotes',
                label: this.longNotesText,
                noteProperty: false,
                title: this.longNotesTitleText,
                type: 'note',
                view: 'text_edit'
            },{
                options: {
                    title: this.moreDetailsText,
                    collapsed: true
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
                    title: this.activityCategoryTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                },{
                    label: this.completedText,
                    name: 'CompletedDate',
                    type: 'date',
                    showTimePicker: true,
                    formatString: 'M/d/yyyy h:mm tt',
                    minValue: (new Date(1900, 0, 1)),
                    validator: Mobile.SalesLogix.Validator.isDateInRange
                },{
                    label: this.scheduledText,
                    name: 'StartDate',
                    type: 'date',
                    showTimePicker: true,
                    formatString: 'M/d/yyyy h:mm tt',
                    minValue: (new Date(1900, 0, 1)),
                    validator: Mobile.SalesLogix.Validator.isDateInRange
                },{
                    label: this.timelessText,
                    name: 'Timeless',
                    type: 'boolean'
                },{
                    label: this.durationText,
                    name: 'Duration',
                    type: 'select',
                    view: 'select_list',
                    textRenderer: this.formatDurationText.createDelegate(this),
                    requireSelection: true,
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    data: this.createDurationData()
                },{
                    label: this.leaderText,
                    name: 'User',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'UserId',
                    valueTextProperty: 'UserName',
                    type: 'lookup',
                    view: 'user_list'
                },{
                    label: this.accountText,
                    name: 'Account',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'AccountId',
                    valueTextProperty: 'AccountName',
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
                    label: this.companyText,
                    name: 'AccountName',
                    type: 'text'
                },{
                    label: this.leadText,
                    name: 'Lead',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'LeadId',
                    valueTextProperty: 'LeadName',
                    view: 'lead_related'
                }]
            }]);
        }
    });
})();
