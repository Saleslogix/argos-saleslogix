/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.Edit = Ext.extend(Mobile.SalesLogix.History.EditBase, {
        //Localization
        accountText: 'account',
        contactText: 'contact',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',

        //View Properties
        id: 'history_edit',
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
            'UserName'
        ],

        formatDependentQuery: function(dependentValue, format, property) {
            var getV = Sage.Platform.Mobile.Utility.getValue;

            property = property || '$key';
            
            return String.format(format, getV(dependentValue, property));
        },
        createLayout: function() {
            var layout = Mobile.SalesLogix.History.Edit.superclass.createLayout.apply(this, arguments),
                lastItem = layout.length - 1,
                moreSection = layout[lastItem];
                
            this.layout = layout;
            this.layout[lastItem].as = moreSection.as.concat([
                {
                    label: this.accountText,
                    name: 'Account',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'AccountId',
                    valueTextProperty: 'AccountName',
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
        }
    });
})();