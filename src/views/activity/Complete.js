/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {      
    Mobile.SalesLogix.Activity.Complete = Ext.extend(Mobile.SalesLogix.Activity.CompleteBase, {
        //Localization
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',

        //View Properties
        id: 'activity_complete',
        followupView: 'activity_followup_edit',
       
        formatDependentQuery: function(dependentValue, format, property) {
            var getV = Sage.Platform.Mobile.Utility.getValue;

            property = property || '$key';
            
            return String.format(format, getV(dependentValue, property));
        },
        createLayout: function() {
            var layout = Mobile.SalesLogix.Activity.Complete.superclass.createLayout.apply(this, arguments),
                otherSection = layout[2].as;

            this.layout = layout;
            this.layout[2].as = otherSection.concat([
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
        }
    });    
})();
