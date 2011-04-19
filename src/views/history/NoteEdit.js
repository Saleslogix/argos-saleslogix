/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.NoteEdit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        accountText: 'account',
        noteDescriptionTitleText: 'Note Description',
        contactText: 'contact',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        regardingText: 'regarding',
        isLeadText: 'for lead',
        startingText: 'start time',
        titleText: 'Note/History',
        companyText: 'company',
        leadText: 'lead',

        //View Properties
        id: 'history_note_edit',
        fieldsForLeads: ['AccountName', 'Lead'],
        fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
        entityName: 'History',
        resourceKind: 'history',
        querySelect: [
            'AccountId',
            'AccountName',
            'ContactId',
            'ContactName',
            'Description',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'TicketId',
            'TicketNumber',
            'Type',
            'LeadId',
            'LeadName',
            'StartDate'
        ],

        init: function() {
            Mobile.SalesLogix.History.NoteEdit.superclass.init.apply(this, arguments);

            this.fields['Lead'].on('change', this.onLeadChange, this);
            this.fields['IsLead'].on('change', this.onIsLeadChange, this);
        },
        isHistoryForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        isInLeadContext: function() {
            var insert = this.options && this.options.insert,
                entry = this.options && this.options.entry,
                lead = (insert && App.isNavigationFromResourceKind('leads', function(o, c) { return c.key; })) || this.isHistoryForLead(entry);

            return !!lead;
        },
        beforeTransitionTo: function() {
            Mobile.SalesLogix.History.NoteEdit.superclass.beforeTransitionTo.apply(this, arguments);

            // we hide the lead or standard fields here, as the view is currently hidden, in order to prevent flashing.
            // the value for the 'IsLead' field will be set later, based on the value derived here.

            if (this.options.isForLead != undefined) return;

            this.options.isForLead = this.isInLeadContext();

            if (this.options.isForLead)
                this.showFieldsForLead();
            else
                this.showFieldsForStandard();
        },
        onIsLeadChange: function(value, field) {
            this.options.isForLead = value;

            if (this.options.isForLead)
                this.showFieldsForLead();
            else
                this.showFieldsForStandard();
        },
        onLeadChange: function(value, field) {
            var selection = field.getSelection(),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (selection && this.insert)
            {
                this.fields['AccountName'].setValue(getV(selection, 'Company'));
            }
        },
        showFieldsForLead: function() {
            Ext.each(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item])
                    this.fields[item].hide();
            }, this);

            Ext.each(this.fieldsForLeads, function(item) {
                if (this.fields[item])
                    this.fields[item].show();
            }, this);
        },
        showFieldsForStandard: function() {
            Ext.each(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item])
                    this.fields[item].hide();
            }, this);

            Ext.each(this.fieldsForStandard, function(item) {
                    if (this.fields[item])
                        this.fields[item].show();
                }, this);
        },
        applyContext: function() {
            var user = App.context && App.context.user;
            
            this.fields['Type'].setValue('atNote');
            this.fields['UserId'].setValue(user && user['$key']);
            this.fields['UserName'].setValue(user && user['$descriptor']);
        },
        setValues: function(values) {
            Mobile.SalesLogix.History.NoteEdit.superclass.setValues.apply(this, arguments);

            this.fields['IsLead'].setValue(this.options.isForLead);
        },
        formatDependentQuery: function(dependentValue, format, property) {
            var getV = Sage.Platform.Mobile.Utility.getValue;

            property = property || '$key';

            return String.format(format, getV(dependentValue, property));
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                name: 'Type',
                type: 'hidden'
            },{
                name: 'UserId',
                type: 'hidden'
            },{
                name: 'UserName',
                type: 'hidden'
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
                dependsOn: 'Type',
                label: this.regardingText,
                name: 'Description',
                picklist: 'Note Regarding',
                orderBy: 'text asc',
                title: this.noteDescriptionTitleText,
                type: 'picklist'
            },{
                name: 'LongNotes',
                label: this.longNotesText,
                noteProperty: false,
                title: this.longNotesTitleText,
                type: 'note',
                view: 'text_edit'
            },{
                label: this.isLeadText,
                name: 'IsLead',
                include: false,
                type: 'boolean'
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
            }]);
        }
    });
})();
