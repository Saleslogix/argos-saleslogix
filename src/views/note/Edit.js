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
            'AccountId',
            'ContactId',
            'LeadId',
            'OpportunityId',
            'TicketId'
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
        insertCompleted: function(entry) {
            var found = App.queryNavigationContext(function(o) {
                    var context = (o.options && o.options.source) || o;

                    return /^(accounts|contacts|opportunities|tickets|leads)$/.test(context.resourceKind) && context.key;
                });
            var context = (found && found.options && found.options.source) || found,
                view = App.getView(context.id),
                lookup = {
                    'accounts': 'AccountId eq "{%: $.AccountId %}" and Type eq "atNote"',
                    'contacts': 'ContactId eq "{%: $.ContactId %}" and Type eq "atNote"',
                    'opportunities': 'OpportunityId eq "{%: $.OpportunityId %}" and Type eq "atNote"',
                    'tickets': 'TicketId eq "{%: $.TicketId %}" and Type eq "atNote"',
                    'leads': 'LeadId eq "{%: $.LeadId %}" and Type eq "atNote"'
                }, tmpl;

            if (view && view.navigateToRelatedView) //Check for detail view???
            {
                tmpl = lookup[context.resourceKind] && new Simplate([lookup[context.resourceKind]]);
                App.getView('note_related').show({
                    where: tmpl.apply(entry)
                }, {
                    returnTo: -1
                });
            }
            else Mobile.SalesLogix.Note.Edit.superclass.insertCompleted.apply(this, arguments);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.notesText,
                    multiline: true,
                    name: 'Notes',
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