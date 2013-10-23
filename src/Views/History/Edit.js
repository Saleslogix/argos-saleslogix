/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/History/Edit', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'Mobile/SalesLogix/Environment',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    array,
    string,
    environment,
    validator,
    utility,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.History.Edit', [Edit], {
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
        startingFormatText : 'M/D/YYYY h:mm A',
        titleText: 'Note',
        companyText: 'company',
        leadText: 'lead',
        relatedItemsText: 'Related Items',
        yesText: 'YES',
        noText: 'NO',

        //View Properties
        id: 'history_edit',
        fieldsForLeads: ['AccountName', 'Lead'],
        fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
        entityName: 'History',
        resourceKind: 'history',
        insertSecurity: null, //'Entities/History/Add',
        updateSecurity: null, //'Entities/History/Edit',
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
        existsRE: /^[\w]{12}$/,
        init: function() {
            this.inherited(arguments);

            this.connect(this.fields['Lead'], 'onChange', this.onLeadChange);
            this.connect(this.fields['IsLead'], 'onChange', this.onIsLeadChange);

            this.connect(this.fields['Account'], 'onChange', this.onAccountChange);
            this.connect(this.fields['Contact'], 'onChange', this.onAccountDependentChange);
            this.connect(this.fields['Opportunity'], 'onChange', this.onAccountDependentChange);
            this.connect(this.fields['Ticket'], 'onChange', this.onAccountDependentChange);
        },
        isHistoryForLead: function(entry) {
            return entry &&  this.existsRE.test(entry['LeadId']);
        },
        isInLeadContext: function() {
            var insert, entry, isLeadContext, lead;
            insert = this.options && this.options.insert;
            entry = this.options && this.options.entry;
            isLeadContext = App.isNavigationFromResourceKind('leads', function(o, c) {
                    var result = false;
                    if (c.resourceKind === 'leads'){
                        result = true;
                    }
                    return result;
                });
            lead = (insert && isLeadContext) || this.isHistoryForLead(entry);
            return !!lead;
        },
        beforeTransitionTo: function() {
            this.inherited(arguments);

            // we hide the lead or standard fields here, as the view is currently hidden, in order to prevent flashing.
            // the value for the 'IsLead' field will be set later, based on the value derived here.

            // todo: there is an issue when refreshing the edit view as options.isLead is persisted in the navigation state.
            if (this.options.isForLead !== undefined) {
                return;
            }

            this.options.isForLead = this.isInLeadContext();

            if (this.options.isForLead) {
                this.showFieldsForLead();
            } else {
                this.showFieldsForStandard();
            }
        },
        onIsLeadChange: function(value, field) {
            this.options.isForLead = value;

            if (this.options.isForLead) {
                this.showFieldsForLead();
            } else {
                this.showFieldsForStandard();
            }
        },
        onLeadChange: function(value, field) {
            var selection = field.getSelection();

            if (selection && this.insert) {
                this.fields['AccountName'].setValue(utility.getValue(selection, 'Company'));
            }
        },
        onAccountChange: function(value, field) {
            var fields = this.fields;
            array.forEach(['Contact', 'Opportunity', 'Ticket'], function(f) {
                if (value) {
                    fields[f].dependsOn = 'Account';
                    fields[f].where = string.substitute('Account.Id eq "${0}"', [value['AccountId'] || value['key']]);

                    if (fields[f].currentSelection &&
                        fields[f].currentSelection.Account['$key'] != (value['AccountId'] || value['key'])) {

                        fields[f].setValue(false);
                    }

                } else {
                    fields[f].dependsOn = null;
                    fields[f].where = 'Account.AccountName ne null';
                }
            });
        },
        onAccountDependentChange: function(value, field) {
            if (value && !field.dependsOn && field.currentSelection && field.currentSelection.Account) {

                var accountField = this.fields['Account'];
                accountField.setValue({
                    'AccountId': field.currentSelection.Account['$key'],
                    'AccountName': field.currentSelection.Account['AccountName']
                });
                this.onAccountChange(accountField.getValue(), accountField);
            }
        },
        showFieldsForLead: function() {
            array.forEach(this.fieldsForStandard.concat(this.fieldsForStandard), function(item) {
                if (this.fields[item]) {
                    this.fields[item].hide();
                }
            }, this);

            array.forEach(this.fieldsForLeads, function(item) {
                if (this.fields[item]) {
                    this.fields[item].show();
                }
            }, this);
        },
        showFieldsForStandard: function() {
            array.forEach(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item]) {
                    this.fields[item].hide();
                }
            }, this);

            array.forEach(this.fieldsForStandard, function(item) {
                if (this.fields[item]) {
                    this.fields[item].show();
                }
            }, this);
        },
        onInsertSuccess: function() {
            environment.refreshStaleDetailViews();
            this.inherited(arguments);
        },
        applyContext: function() {
            var found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;
                return (/^(accounts|contacts|opportunities|leads|tickets)$/).test(context.resourceKind) && context.key;
            });

            found = (found && found.options && found.options.source) || found;

            var lookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext,
                'opportunities': this.applyOpportunityContext,
                'leads': this.applyLeadContext,
                'tickets': this.applyTicketContext
            };

            if (found && lookup[found.resourceKind]) {
                lookup[found.resourceKind].call(this, found);
            }

            this.context = found;

            var user = App.context && App.context.user;

            this.fields['Type'].setValue('atNote');
            this.fields['UserId'].setValue(user && user['$key']);
            this.fields['UserName'].setValue(user && user['$descriptor']);
            this.fields['StartDate'].setValue(new Date());
            this.fields['Text'].setValue('');
        },
        applyAccountContext: function(context) {
            var accountField = this.fields['Account'],
                accountValue = {
                    'AccountId': context.key,
                    'AccountName': context.descriptor
                };
            accountField.setValue(accountValue);
            this.onAccountChange(accountValue, accountField);
        },
        applyLeadContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry);

            if (!entry || !entry['$key']) {
                return;
            }

            var leadField = this.fields['Lead'],
                leadValue = {
                    'LeadId': entry['$key'],
                    'LeadName': entry['$descriptor']
                };
            leadField.setValue(leadValue);
            this.onLeadChange(leadValue, leadField);

            this.fields['AccountName'].setValue(entry['Company']);

            var isLeadField = this.fields['IsLead'];
            isLeadField.setValue(context.resourceKind == 'leads');
            this.onIsLeadChange(isLeadField.getValue(), isLeadField);
        },
        applyOpportunityContext: function(context) {
            var opportunityField = this.fields['Opportunity'];
            opportunityField.setValue({
                'OpportunityId': context.key,
                'OpportunityName': context.descriptor
            });
            this.onAccountDependentChange(opportunityField.getValue, opportunityField);

            var accountEntry;
            if (context.entry && context.entry['Account']) {
                accountEntry = context.entry['Account'];
            } else {
                var view = App.getView(context.id),
                    entry = view && view.entry;
                accountEntry = entry && entry['Account'];
            }

            if (accountEntry) {
                var accountField = this.fields['Account'];
                accountField.setValue({
                    'AccountId': accountEntry['$key'],
                    'AccountName': accountEntry['AccountName']
                });
                this.onAccountChange(accountField.getValue(), accountField);
            }

            // todo: find a good way to get the primary contact and apply
        },
        applyContactContext: function(context) {
            var contactField = this.fields['Contact'];
            contactField.setValue({
                'ContactId': context.key,
                'ContactName': context.descriptor
            });
            this.onAccountDependentChange(contactField.getValue(), contactField);

            var accountEntry;
            if (context.entry && context.entry['Account']) {
                accountEntry = context.entry['Account'];
            } else {
                var view = App.getView(context.id),
                    entry = view && view.entry;
                accountEntry = entry && entry['Account'];
            }

            if (accountEntry) {
                var accountField = this.fields['Account'];
                accountField.setValue({
                    'AccountId': accountEntry['$key'],
                    'AccountName': accountEntry['AccountName']
                });
                this.onAccountChange(accountField.getValue(), accountField);
            }
        },
        applyTicketContext: function(context) {
            var ticketField = this.fields['Ticket'];
            ticketField.setValue({
                'TicketId': context.key,
                'TicketNumber': context.descriptor
            });
            this.onAccountDependentChange(ticketField.getValue(), ticketField);

            var accountEntry, contactEntry;
            if (context.entry && context.entry['Account']) {
                accountEntry = context.entry['Account'];
                contactEntry = context.entry['Contact'];
            } else {
                var view = App.getView(context.id),
                    entry = view && view.entry;
                accountEntry = entry && entry['Account'];
                contactEntry = entry && entry['Contact'];
            }

            if (accountEntry) {
                var accountField = this.fields['Account'];
                accountField.setValue({
                    'AccountId': accountEntry['$key'],
                    'AccountName': accountEntry['AccountName']
                });
                this.onAccountChange(accountField.getValue(), accountField);
            }

            if (contactEntry) {
                var contactField = this.fields['Contact'];
                contactField.setValue({
                    'ContactId': contactEntry['$key'],
                    'ContactName': contactEntry['NameLF']
                });
                this.onAccountDependentChange(contactField.getValue(), contactField);
            }
        },
        setValues: function(values) {
            var isLeadField, field, value, leadCompany, longNotes, insert;

            this.inherited(arguments);
            isLeadField = this.fields['IsLead'];
            if (this.isInLeadContext()) {
                isLeadField.setValue(true);
                this.onIsLeadChange(true, isLeadField);
                field = this.fields['Lead'];
                value = utility.getValue(values, field.applyTo, {});
                field.setValue(value, true);
                leadCompany = utility.getValue(values, 'AccountName');
                if (leadCompany) {
                    this.fields['AccountName'].setValue(leadCompany);
                }
            } else {
                isLeadField.setValue(false);
            }

            longNotes = utility.getValue(values, 'LongNotes');
            if (longNotes) {
                this.fields['Text'].setValue(longNotes);
            }

            insert = this.options && this.options.insert;
            // entry may have been passed as full entry, reapply context logic to extract properties
            if (insert && this.context && this.context.resourceKind) {
                var lookup = {
                    'accounts': this.applyAccountContext,
                    'contacts': this.applyContactContext,
                    'opportunities': this.applyOpportunityContext,
                    'leads': this.applyLeadContext,
                    'tickets': this.applyTicketContext
                };
                lookup[this.context.resourceKind].call(this, this.context);
            }
        },
        formatDependentQuery: function(dependentValue, format, property) {
            property = property || '$key';

            return string.substitute(format, [utility.getValue(dependentValue, property)]);
        },
        getValues: function() {
            var values = this.inherited(arguments);

            if (this.fields['Text'].isDirty()) {
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
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            name: 'Type',
                            property: 'Type',
                            type: 'hidden'
                        }, {
                            name: 'UserId',
                            property: 'UserId',
                            type: 'hidden'
                        }, {
                            name: 'UserName',
                            property: 'UserName',
                            type: 'hidden'
                        }, {
                            label: this.startingText,
                            name: 'StartDate',
                            property: 'StartDate',
                            type: 'date',
                            showTimePicker: true,
                            dateFormatText: this.startingFormatText,
                            minValue: (new Date(1900, 0, 1)),
                            validator: [
                                validator.exists,
                                validator.isDateInRange
                            ]
                        }, {
                            dependsOn: 'Type',
                            label: this.regardingText,
                            name: 'Description',
                            property: 'Description',
                            picklist: 'Note Regarding',
                            orderBy: 'text asc',
                            title: this.noteDescriptionTitleText,
                            type: 'picklist'
                        }]
                }, {
                    title: this.longNotesTitleText,
                    name: 'NotesSection',
                    children: [{
                        name: 'Text',
                        property: 'Text',
                        label: this.longNotesText,
                        cls: 'row-edit-text',
                        type: 'textarea'
                    }]
                }, {
                    title: this.relatedItemsText,
                    name: 'RelatedItemsSection',
                    children: [{
                            label: this.isLeadText,
                            name: 'IsLead',
                            include: false,
                            type: 'boolean',
                            onText: this.yesText,
                            offText: this.noText
                        }, {
                            label: this.accountText,
                            name: 'Account',
                            property: 'Account',
                            type: 'lookup',
                            emptyText: '',
                            applyTo: '.',
                            valueKeyProperty: 'AccountId',
                            valueTextProperty: 'AccountName',
                            view: 'account_related'
                        }, {
                            dependsOn: 'Account',
                            label: this.contactText,
                            name: 'Contact',
                            property: 'Contact',
                            type: 'lookup',
                            emptyText: '',
                            applyTo: '.',
                            valueKeyProperty: 'ContactId',
                            valueTextProperty: 'ContactName',
                            view: 'contact_related',
                            where: this.formatDependentQuery.bindDelegate(
                                this, 'Account.Id eq "${0}"', 'AccountId'
                            )
                        }, {
                            dependsOn: 'Account',
                            label: this.opportunityText,
                            name: 'Opportunity',
                            property: 'Opportunity',
                            type: 'lookup',
                            emptyText: '',
                            applyTo: '.',
                            valueKeyProperty: 'OpportunityId',
                            valueTextProperty: 'OpportunityName',
                            view: 'opportunity_related',
                            where: this.formatDependentQuery.bindDelegate(
                                this, 'Account.Id eq "${0}"', 'AccountId'
                            )
                        }, {
                            dependsOn: 'Account',
                            label: this.ticketNumberText,
                            name: 'Ticket',
                            property: 'Ticket',
                            type: 'lookup',
                            emptyText: '',
                            applyTo: '.',
                            valueKeyProperty: 'TicketId',
                            valueTextProperty: 'TicketNumber',
                            view: 'ticket_related',
                            where: this.formatDependentQuery.bindDelegate(
                                this, 'Account.Id eq "${0}"', 'AccountId'
                            )
                        }, {
                            label: this.leadText,
                            name: 'Lead',
                            property: 'Lead',
                            type: 'lookup',
                            emptyText: '',
                            applyTo: '.',
                            valueKeyProperty: 'LeadId',
                            valueTextProperty: 'LeadName',
                            view: 'lead_related',
                            validator: validator.exists
                        }, {
                            label: this.companyText,
                            name: 'AccountName',
                            property: 'AccountName',
                            type: 'text'
                        }]
                }]);
        }
    });
});

