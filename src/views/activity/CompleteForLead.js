/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.CompleteForLead = Ext.extend(Mobile.SalesLogix.Activity.CompleteBase, {
        //Localization
        companyText: 'company',
        leadText: 'lead',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',

        //View Properties
        id: 'activity_complete_for_lead',
        followupView: 'activity_edit_for_lead',
       
        createLayout: function() {
            var layout = Mobile.SalesLogix.Activity.CompleteForLead.superclass.createLayout.apply(this, arguments),
                otherSection = layout[2].as;

            this.layout = layout;
            this.layout[2].as = otherSection.concat([
                {
                    label: this.companyText,
                    name: 'AccountName',
                    type: 'text'
                },
                {
                    label: this.leadText,
                    name: 'Lead',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'LeadId',
                    valueTextProperty: 'LeadName',
                    view: 'lead_related'
                }
            ]);

            return this.layout;
        },
        init: function() {
            Mobile.SalesLogix.Activity.CompleteForLead.superclass.init.apply(this, arguments);

            this.fields['Lead'].on('change', this.onLeadChange, this);
        },
        onLeadChange: function(value, field) {
            var selection = field.getSelection(),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (selection && this.insert)
            {
                this.fields['Company'].setValue(getV(selection, 'Company'));
            }
        }
    });        
})();