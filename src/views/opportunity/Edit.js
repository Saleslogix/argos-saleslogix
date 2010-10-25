/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Opportunity");

(function() {
    var U = Sage.Platform.Mobile.Utility;
    
    Mobile.SalesLogix.Opportunity.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        accountText: 'acct',
        acctMgrText: 'acct mgr',
        estCloseText: 'est close',
        importSourceText: 'lead source',
        opportunityProbabilityTitle: 'Opportunity Probability',
        opportunityStatusTitle: 'Opportunity Status',
        opportunityText: 'opportunity',
        opportunityTypeTitle: 'Opportunity Type',
        ownerText: 'owner',
        potentialText: 'sales potential',
        probabilityText: 'close prob',
        statusText: 'status',
        titleText: 'Opportunity',
        typeText: 'type',

        //Error Strings
        errorAccountName: 'account is required',
        errorOwner: 'owner is required',

        //View Properties
        entityName: 'Opportunity',
        id: 'opportunity_edit',
        querySelect: [
            'Account/AccountName',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'CloseProbability',
            'Description',
            'EstimatedClose',
            'LeadSource/Description',
            'Owner/OwnerDescription',
            'SalesPotential',
            'Stage',
            'Status',
            'Type',
            'Weighted'
        ],
        resourceKind: 'opportunities',

        processTemplateEntry: function() {
            Mobile.SalesLogix.Opportunity.Edit.superclass.processTemplateEntry.apply(this, arguments);

            this.applyContext();
        },
        show: function(options) {
            Mobile.SalesLogix.Opportunity.Edit.superclass.show.apply(this, arguments);

            if (options.insert === true) this.applyContext();
        },
        applyContext: function() {
            var contexts = ['accounts'],
                primaryContext = App.queryNavigationContext(function(){return true}, 1),
                secondaryContext = App.getMatchingContext(contexts), entry;

            if (!secondaryContext) return;

            entry = App.getView(secondaryContext.id).entry;

            if (entry && secondaryContext.resourceKind === 'accounts')
            {
                this.applyAccountContext(entry);
            }
        },
        applyAccountContext: function(entry) {
            this.fields['Account'].setValue(entry);
            //Is it possible to fire "onChange" even when field updated programatically?
            this.fields['AccountManager'].setValue(U.getValue(entry, 'AccountManager'));
        },
        init: function() {
            Mobile.SalesLogix.Opportunity.Edit.superclass.init.apply(this, arguments);

            this.fields['Account'].on('change', this.onAccountChange, this);
        },
        onAccountChange: function(value, field) {
            var selection = field.getSelection();
            if (selection)
            {
                this.fields['AccountManager'].setValue(U.getValue(selection, 'AccountManager'));
            }
        },
        createLayout: function() {
            // todo: add account on change handling

            return this.layout || (this.layout = [
                {
                    label: this.opportunityText,
                    name: 'Description',
                    type: 'text',
                    validator: Mobile.SalesLogix.Validator.hasText
                },
                {
                    alwaysUseValue: true,
                    label: this.accountText,
                    name: 'Account',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    validator: function(value, field, view) {
                        if (!value) return view.errorAccountName;
                        return false;
                    },
                    view: 'account_lookup'
                },
                {
                    alwaysUseValue: true,
                    label: this.acctMgrText,
                    name: 'AccountManager',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    type: 'lookup'
                },
                {
                    label: this.estCloseText,
                    name: 'EstimatedClose',
                    showTime: true,
                    type: 'date'
                },
                {
                    label: this.potentialText,
                    name: 'SalesPotential',
                    precision: 2,
                    type: 'decimal',
                    validationTrigger: 'keyup',
                    validator: Mobile.SalesLogix.Validator.isCurrency
                },
                {
                    label: this.typeText,
                    name: 'Type',
                    picklist: 'Opportunity Type',
                    title: 'Opportunity Type',
                    type: 'picklist'
                },
                {
                    label: this.statusText,
                    name: 'Status',
                    picklist: 'Opportunity Status',
                    title: this.opportunityStatusTitle,
                    type: 'picklist'
                },
                {
                    label: this.importSourceText,
                    name: 'LeadSource',
                    textProperty: 'Description',
                    type: 'lookup',
                    view: 'leadsource_list'
                },
                {
                    label: this.ownerText,
                    name: 'Owner',
                    keyProperty: '$key',
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    validator: function(value, field, view) {
                        if (!value) return view.errorOwner;
                        return false;
                    },
                    view: 'owner_list'
                },
                {
                    label: this.probabilityText,
                    name: 'CloseProbability',
                    picklist: 'Opportunity Probability',
                    title: this.opportunityProbabilityTitle,
                    type: 'picklist'
                }
            ]);
        }
    });
})();