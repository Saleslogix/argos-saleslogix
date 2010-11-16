/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {      
    Mobile.SalesLogix.Activity.Edit = Ext.extend(Mobile.SalesLogix.Activity.EditBase, {
        //Localization
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',

        //View Properties
        id: 'activity_edit',

        init: function() {
            Mobile.SalesLogix.Activity.Edit.superclass.init.apply(this, arguments);
            this.contextLookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext,
                'opportunities': this.applyOpportunityContext,
                'tickets': this.applyTicketContext
            };
        },
        formatDependentLookupQuery: function(dependentValue, format) {
            return String.format(format, dependentValue.$key);
        },
        createLayout: function() {
            var layout = Mobile.SalesLogix.Activity.Edit.superclass.createLayout.apply(this, arguments);

            this.layout = this.layout.concat([
                {
                    label: this.accountText,
                    name: 'Account',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'account_lookup'
                },
                {
                    dependsOn: 'Account',
                    label: this.contactText,
                    name: 'Contact',
                    textProperty: 'NameLF',
                    type: 'lookup',
                    view: 'contact_lookup',
                    where: this.formatDependentLookupQuery.createDelegate(
                        this, ['Account.Id eq "{0}"'], true
                    )
                },
                {
                    dependsOn: 'Account',
                    label: this.opportunityText,
                    name: 'Opportunity',
                    textProperty: 'Description',
                    type: 'lookup',
                    view: 'opportunity_lookup',
                    where: this.formatDependentLookupQuery.createDelegate(
                        this, ['Account.Id eq "{0}"'], true
                    )
                },
                {
                    dependsOn: 'Account',
                    label: this.ticketNumberText,
                    name: 'Ticket',
                    textProperty: 'TicketNumber',
                    type: 'lookup',
                    view: 'ticket_lookup',
                    where: this.formatDependentLookupQuery.createDelegate(
                        this, ['Account.Id eq "{0}"'], true
                    )
                }
            ]);

            return this.layout;
        },
        applyContext: function() {
            var matcher = /^(accounts|contacts|opportunities|tickets)$/,
                match = this.findMatchingContextEntry(matcher),
                lookup = this.contextLookup;

            if (lookup && match && lookup[match.resourceKind])
                lookup[match.resourceKind].call(this, match.entry);
        },
        applyAccountContext: function(entry) {
            this.fields['Account'].setValue(entry);
        },
        applyContactContext: function(entry) {
            this.fields['Contact'].setValue(entry);

            this.fields['Account'].setValue({
                '$key': entry.Account.$key,
                'AccountName': entry.AccountName
            });
        },
        applyTicketContext: function(entry) {
            this.fields['Contact'].setValue(entry.Contact);
            this.fields['Account'].setValue(entry.Account);
            this.fields['Ticket'].setValue(entry);
        },
        applyOpportunityContext: function(entry) {
            this.fields['Opportunity'].setValue(entry);
            this.fields['Account'].setValue(entry.Account);
        },
        setValues: function(entry) {
            Sage.Platform.Mobile.Edit.prototype.setValues.apply(this, arguments);

            this.fields['Account'].setValue({
                '$key': entry.AccountId,
                'AccountName': entry.AccountName
            });

            this.fields['Contact'].setValue({
                '$key': entry.ContactId,
                'NameLF': entry.ContactName
            });

            this.fields['Ticket'].setValue({
                '$key': entry.TicketId,
                'TicketNumber': entry.TicketNumber
            });

            this.fields['Opportunity'].setValue({
                '$key': entry.OpportunityId,
                'Description': entry.OpportunityName
            });

            if (this.inserting === true)
                this.fields['UserId'].setValue({
                    '$key': App.context.user,
                    'UserInfo': {
                        'LastName': App.context.user,
                        'FirstName': App.context.user
                    }
                })
        },
        getValues: function() {
            var entry = Sage.Platform.Mobile.Edit.prototype.getValues.apply(this, arguments);

            entry.Type = entry.Type.$key;
            if (entry.Account)
            {
                entry.AccountName = entry.Account.$descriptor;
                entry.AccountId = entry.Account.$key;
            }
            if (entry.Contact)
            {
                entry.ContactName = entry.Contact.$descriptor;
                entry.ContactId = entry.Contact.$key;
            }
            if (entry.Opportunity)
            {
                entry.OpportunityName = entry.Opportunity.$descriptor;
                entry.OpportunityId = entry.Opportunity.$key;
            }
            if (entry.Ticket)
            {
                entry.TicketNumber = entry.Ticket.$descriptor;
                entry.TicketId = entry.Ticket.$key;
            }
            if (entry.UserId)
            {
                entry.UserId = entry.UserId.$key;
            }

            delete entry.Account;
            delete entry.Contact;
            delete entry.Opportunity;
            delete entry.Ticket;

            return entry;
        }
    });    
})();