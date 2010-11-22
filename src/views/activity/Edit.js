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
       
        formatDependentQuery: function(dependentValue, format, property) {
            var getV = Sage.Platform.Mobile.Utility.getValue;

            property = property || '$key';
            
            return String.format(format, getV(dependentValue, property));
        },
        createLayout: function() {
            var layout = Mobile.SalesLogix.Activity.Edit.superclass.createLayout.apply(this, arguments);

            this.layout = layout.concat([
                {
                    label: this.accountText,
                    name: 'Account',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'AccountId',
                    valueTextProperty: 'AccountName',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'account_related'
                },
                {
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
                },
                {
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
                },
                {
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
                }
            ]);

            return this.layout;
        },
        applyContext: function() {
            Mobile.SalesLogix.Activity.Edit.superclass.applyContext.apply(this, arguments);

            var found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;

                return /^(accounts|contacts|opportunities|tickets)$/.test(context.resourceKind) && context.key;
            });

            var context = (found && found.options && found.options.source) || found,
                lookup = {
                    'accounts': this.applyAccountContext,
                    'contacts': this.applyContactContext,
                    'opportunities': this.applyOpportunityContext,
                    'tickets': this.applyTicketContext
                };

            if (context && lookup[context.resourceKind]) lookup[context.resourceKind].call(this, context);
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry);
            
            this.fields['Account'].setValue({
                'AccountId': entry['$key'],
                'AccountName': entry['$descriptor']
            });
        },
        applyContactContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;
            
            this.fields['Contact'].setValue({
                'ContactId': entry['$key'],
                'ContactName': entry['$descriptor']
            });

            this.fields['Account'].setValue({
                'AccountId': getV(entry, 'Account.$key'),
                'AccountName': getV(entry, 'Account.AccountName')
            });
        },
        applyTicketContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;

            this.fields['Ticket'].setValue({
                'TicketId': entry['$key'],
                'TicketNumber': entry['$descriptor']
            });

            this.fields['Contact'].setValue({
                'ContactId': getV(entry, 'Contact.$key'),
                'ContactName': getV(entry, 'Contact.NameLF')
            });

            this.fields['Account'].setValue({
                'AccountId': getV(entry, 'Account.$key'),
                'AccountName': getV(entry, 'Account.AccountName')
            });
        },
        applyOpportunityContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;

            this.fields['Opportunity'].setValue({
                'OpportunityId': entry['$key'],
                'OpportunityName': entry['$descriptor']
            });

            this.fields['Account'].setValue({
                'AccountId': getV(entry, 'Account.$key'),
                'AccountName': getV(entry, 'Account.AccountName')
            });
        }
    });    
})();
