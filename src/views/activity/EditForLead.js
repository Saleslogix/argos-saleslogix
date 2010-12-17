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
       
        createLayout: function() {
            var layout = Mobile.SalesLogix.Activity.EditForLead.superclass.createLayout.apply(this, arguments);

            this.layout = layout.concat([
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
            Mobile.SalesLogix.Activity.EditForLead.superclass.init.apply(this, arguments);

            this.fields['Lead'].on('change', this.onLeadChange, this);
        },
        applyContext: function() {
            Mobile.SalesLogix.Activity.Edit.superclass.applyContext.apply(this, arguments);

            var found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;

                return /^(leads)$/.test(context.resourceKind) && context.key;
            });

            var context = (found && found.options && found.options.source) || found,
                lookup = {
                    'leads': this.applyLeadContext
                };

            if (context && lookup[context.resourceKind]) lookup[context.resourceKind].call(this, context);
        },       
        applyLeadContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;
            
            this.fields['Lead'].setValue({
                'LeadId': entry['$key'],
                'LeadName': entry['$descriptor']
            });

            this.fields['AccountName'].setValue(entry['Company']);            
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