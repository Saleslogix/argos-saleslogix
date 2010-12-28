/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Note");

(function() {
    Mobile.SalesLogix.Note.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        notesText: 'notes',
        titleText: 'Note',

        //View Properties
        entityName: 'History',
        id: 'note_edit',
        querySelect: [
            'Notes',
            'LongNotes'
        ],
        resourceKind: 'history',

        applyAccountContext: function(context) {
            this.fields['AccountId'].setValue(context.key);
            this.fields['AccountName'].setValue(context.descriptor);
        },
        applyLeadContext: function(context) {
            this.fields['LeadId'].setValue(context.key);
            this.fields['LeadName'].setValue(context.descriptor);
        },
        applyOpportunityContext: function(context) {
            this.fields['OpportunityId'].setValue(context.key);
            this.fields['OpportunityName'].setValue(context.descriptor);

            var view = App.getView(context.id),
                entry = view && view.entry;

            if (entry && entry['Account'])
            {
                this.fields['AccountId'].setValue(entry['Account']['$key']);
                this.fields['AccountName'].setValue(entry['Account']['AccountName']);
            }

            // todo: find a good way to get the primary contact and apply
        },
        applyContactContext: function(context) {
            this.fields['ContactId'].setValue(context.key);
            this.fields['ContactName'].setValue(context.descriptor);

            var view = App.getView(context.id),
                entry = view && view.entry;

            if (entry && entry['Account'])
            {
                this.fields['AccountId'].setValue(entry['Account']['$key']);
                this.fields['AccountName'].setValue(entry['Account']['AccountName']);
            }
        },
        applyTicketContext: function(context) {
            this.fields['ContactId'].setValue(context.key);
            this.fields['ContactName'].setValue(context.descriptor);

            var view = App.getView(context.id),
                entry = view && view.entry;

            if (entry && entry['Account'])
            {
                this.fields['AccountId'].setValue(entry['Account']['$key']);
                this.fields['AccountName'].setValue(entry['Account']['AccountName']);
            }

            if (entry && entry['Contact'])
            {
                this.fields['ContactId'].setValue(entry['Contact']['$key']);
                this.fields['ContactName'].setValue(entry['Contact']['NameLF']);
            }
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

            this.fields['Type'].setValue('atNote');
        },
        setValues: function(values) {
            values['Text'] = values['LongNotes']
                ? values['LongNotes']
                : values['Notes'];

            Mobile.SalesLogix.Note.Edit.superclass.setValues.apply(this, arguments);
        },
        getValues: function() {
            var values = Mobile.SalesLogix.Note.Edit.superclass.getValues.apply(this, arguments);

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
            return this.layout || (this.layout = [
                {
                    label: this.notesText,
                    include: false,
                    multiline: true,
                    name: 'Text',
                    type: 'text'
                },
                {
                    name: 'Type',
                    type: 'hidden'
                },
                {
                    name: 'AccountId',
                    type: 'hidden'
                },
                {
                    name: 'AccountName',
                    type: 'hidden'
                },
                {
                    name: 'ContactId',
                    type: 'hidden'
                },
                {
                    name: 'ContactName',
                    type: 'hidden'
                },
                {
                    name: 'OpportunityId',
                    type: 'hidden'
                },
                {
                    name: 'OpportunityName',
                    type: 'hidden'
                },
                {
                    name: 'TicketId',
                    type: 'hidden'
                },
                {
                    name: 'TicketNumber',
                    type: 'hidden'
                },
                {
                    name: 'LeadId',
                    type: 'hidden'
                },
                {
                    name: 'LeadName',
                    type: 'hidden'
                }
            ]);
        }
    });
})();