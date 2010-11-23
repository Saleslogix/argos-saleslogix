/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.Detail = Ext.extend(Mobile.SalesLogix.Activity.DetailBase, {
        //Localization
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',

        //View Properties
        editView: 'activity_edit',
        id: 'activity_detail',

        createLayout: function() {
            var layout = Mobile.SalesLogix.Activity.Detail.superclass.createLayout.apply(this, arguments);

            this.layout = layout.concat([
                {
                    name: 'ContactName',
                    label: this.contactText
                },
                {
                    name: 'AccountName',
                    label: this.accountText
                },
                {
                    name: 'OpportunityName',
                    label: this.opportunityText
                },
                {
                    name: 'TicketNumber',
                    label: this.ticketNumberText
                }
            ]);

            return this.layout;
        }
    });
})();