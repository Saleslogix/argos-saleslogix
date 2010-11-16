/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.EditForLead = Ext.extend(Mobile.SalesLogix.Activity.EditBase, {
        //Localization
        companyText: 'company',
        leadText: 'lead',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',

        //View Properties
        id: 'activity_edit_for_lead',

        init: function() {
            Mobile.SalesLogix.Activity.EditForLead.superclass.init.apply(this, arguments);
            this.contextLookup = {
                'leads': this.applyLeadContext
            };
        },
        createLayout: function() {
            var layout = Mobile.SalesLogix.Activity.EditForLead.superclass.createLayout.apply(this, arguments);

            this.layout = this.layout.concat([
                {
                    label: this.companyText,
                    name: 'Company',
                    type: 'text'
                },
                {
                    label: this.leadText,
                    name: 'Lead',
                    textProperty: 'LeadNameLastFirst',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'leads_lookup'
                }
            ]);

            return this.layout;
        },
        applyContext: function() {
            this.setDefaultReminder();

            var matcher = /^(leads)$/,
                match = this.findMatchingContextEntry(matcher),
                lookup = this.contextLookup;

            if (lookup && match && lookup[match.resourceKind])
                lookup[match.resourceKind].call(this, match.entry);
        },
        applyLeadContext: function(entry) {
            this.fields['Company'].setValue(entry.Company);
            this.fields['Lead'].setValue(entry);
        },
        setValues: function(entry) {
            Sage.Platform.Mobile.Edit.prototype.setValues.apply(this, arguments);

            this.fields['Lead'].setValue({
                '$key': entry.LeadId,
                'LeadNameLastFirst': entry.LeadName
            });

            this.fields['Company'].setValue(entry.AccountName);
        },
        getValues: function() {
            var entry = Sage.Platform.Mobile.Edit.prototype.getValues.apply(this, arguments);

            entry.Type = entry.Type.$key;
            if (entry.Lead)
            {
                entry.LeadName = entry.Lead.$descriptor;
                entry.LeadId = entry.Lead.$key;
            }
            if (entry.UserId)
            {
                entry.UserId = entry.UserId.$key;
            }
            entry.AccountName = entry.Company;

            delete entry.Lead;
            delete entry.Company;

            return entry;
        }
    });        
})();