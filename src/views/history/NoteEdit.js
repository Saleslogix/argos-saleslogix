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
        isLeadText: 'lead',
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
            Mobile.SalesLogix.History.Edit.superclass.init.apply(this, arguments);

            this.fields['isLead'].on('change', this.onLeadChange, this);
        },
        isHistoryForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        beforeTransitionTo: function() {
            Mobile.SalesLogix.Activity.Complete.superclass.beforeTransitionTo.apply(this, arguments);

            var insert = this.options && this.options.insert,
                entry = this.options && this.options.entry,
                lead = (insert && App.isNavigationFromResourceKind('leads', function(o, c) { return c.key; })) || this.isHistoryForLead(entry);

            this.onLeadChange(lead, this.fields['isLead']);
        },
        applyContext: function() {
            this.fields['Type'].setValue('atNote');
        },
        onLeadChange: function(lead, field) {
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
                name: 'isLead',
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
            }]);
        }
    });
})();
