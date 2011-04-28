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
        accountText: 'account',
        noteDescriptionTitleText: 'Note Description',
        contactText: 'contact',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        regardingText: 'regarding',
        isLeadText: 'for lead',
        startingText: 'time',
        titleText: 'Note',
        companyText: 'company',
        leadText: 'lead',
        relatedItemsText: 'Related Items',

        //View Properties
        id: 'history_edit',
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
            'Notes',
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
            Mobile.SalesLogix.History.Edit.superclass.beforeTransitionTo.apply(this, arguments);

            // we hide the lead or standard fields here, as the view is currently hidden, in order to prevent flashing.
            // the value for the 'IsLead' field will be set later, based on the value derived here.

            // todo: there is an issue when refreshing the edit view as options.isLead is persisted in the navigation state.
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
            var found = App.queryNavigationContext(function(o) {
                return /^(accounts|contacts|opportunities|leads|tickets)$/.test(o.resourceKind) && o.key;
            });

            var lookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext,
                'opportunities': this.applyOpportunityContext,
                'leads': this.applyLeadContext,
                'tickets': this.applyTicketContext
            };

            if (found && lookup[found.resourceKind]) lookup[found.resourceKind].call(this, found);
            
            var user = App.context && App.context.user;
            
            this.fields['Type'].setValue('atNote');
            this.fields['UserId'].setValue(user && user['$key']);
            this.fields['UserName'].setValue(user && user['$descriptor']);
            this.fields['StartDate'].setValue(new Date());
        },
        applyAccountContext: function(context) {
            this.fields['Account'].setValue({
                'AccountId': context.key,
                'AccountName': context.descriptor
            });
        },
        applyLeadContext: function(context) {
            this.fields['Lead'].setValue({
                'LeadId': context.key,
                'LeadName': context.descriptor
            });

            var view = App.getView(context.id),
                entry = view && view.entry;

            if (entry && entry['Company']) this.fields['AccountName'].setValue(entry['Company']);
        },
        applyOpportunityContext: function(context) {
            this.fields['Opportunity'].setValue({
                'OpportunityId': context.key,
                'OpportunityName': context.descriptor
            });

            var view = App.getView(context.id),
                entry = view && view.entry;

            if (entry && entry['Account'])
            {
                this.fields['Account'].setValue({
                    'AccountId': entry['Account']['$key'],
                    'AccountName': entry['Account']['AccountName']
                });
            }

            // todo: find a good way to get the primary contact and apply
        },
        applyContactContext: function(context) {
            this.fields['Contact'].setValue({
                'ContactId': context.key,
                'ContactName': context.descriptor
            });

            var view = App.getView(context.id),
                entry = view && view.entry;

            if (entry && entry['Account'])
            {
                this.fields['Account'].setValue({
                    'AccountId': entry['Account']['$key'],
                    'AccountName': entry['Account']['AccountName']
                });
            }
        },
        applyTicketContext: function(context) {
            this.fields['Ticket'].setValue({
                'TicketId': context.key,
                'TicketNumber': context.descriptor
            });

            var view = App.getView(context.id),
                entry = view && view.entry;

            if (entry && entry['Account'])
            {
                this.fields['Account'].setValue({
                    'AccountId': entry['Account']['$key'],
                    'AccountName': entry['Account']['AccountName']
                });
            }

            if (entry && entry['Contact'])
            {
                 this.fields['Contact'].setValue({
                    'ContactId': entry['Contact']['$key'],
                    'ContactName': entry['Contact']['NameLF']
                });
            }            
        },
        setValues: function(values) {
            Mobile.SalesLogix.History.Edit.superclass.setValues.apply(this, arguments);

            this.fields['IsLead'].setValue(this.options.isForLead);
            this.fields['Text'].setValue(values['LongNotes'] || values['Notes'] || '');
        },
        formatDependentQuery: function(dependentValue, format, property) {
            var getV = Sage.Platform.Mobile.Utility.getValue;

            property = property || '$key';

            return String.format(format, getV(dependentValue, property));
        },
        getValues: function() {
            var values = Mobile.SalesLogix.History.Edit.superclass.getValues.apply(this, arguments);

            if (this.fields['Text'].isDirty())
            {
                var text = this.fields['Text'].getValue();

                values = values || {};
                values['LongNotes'] = text;
                values['Notes'] = text && text.length > 250
                    ? text.substr(0, 250)
                    : text;
            }

            return values;
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                options: {
                    title: this.detailsText
                },
                as: [{
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
                }]
            },{
                options: {
                    title: this.longNotesTitleText
                },
                as: [{
                    name: 'Text',
                    label: this.longNotesText,
                    cls: 'row-edit-text',
                    type: 'text',
                    multiline: true
                }]
            },{
                options: {
                    title: this.relatedItemsText
                },
                as: [{
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
                    view: 'account_related',
                    validator: Mobile.SalesLogix.Validator.exists
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
                    view: 'lead_related',
                    validator: Mobile.SalesLogix.Validator.exists
                },{
                    label: this.companyText,
                    name: 'AccountName',
                    type: 'text'
                }]                        
            }]);
        }
    });
})();
