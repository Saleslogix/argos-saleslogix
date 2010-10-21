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
        id: 'opportunity_edit',
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
        resourceKind: 'opportunities',
        entityName: 'Opportunity',
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
        setValues: function() {
            Mobile.SalesLogix.Opportunity.Edit.superclass.setValues.apply(this, arguments);

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
                    name: 'Description',
                    label: this.opportunityText,
                    type: 'text'
                },
                {
                    name: 'Account',
                    label: this.accountText,
                    type: 'lookup',
                    view: 'account_lookup',
                    textProperty: 'AccountName'
                },
                {
                    alwaysUseValue: true,
                    name: 'AccountManager',
                    label: this.acctMgrText,
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                },
                {
                    name: 'EstimatedClose',
                    label: this.estCloseText,
                    showTime: true,
                    type: 'date'
                },
                {
                    name: 'SalesPotential',
                    label: this.potentialText,
                    precision: 2,
                    type: 'decimal',
                    validationTrigger: 'keyup',
                    validator: Mobile.SalesLogix.Validator.isCurrency
                },
                {
                    name: 'Type',
                    label: this.typeText,
                    picklist: 'Opportunity Type',
                    title: 'Opportunity Type',
                    type: 'picklist'
                },
                {
                    name: 'Status',
                    label: this.statusText,
                    picklist: 'Opportunity Status',
                    title: this.opportunityStatusTitle,
                    type: 'picklist'
                },
                {
                    name: 'LeadSource',
                    label: this.importSourceText,
                    textProperty: 'Description',
                    type: 'lookup',
                    view: 'leadsource_list'
                },
                {
                    name: 'Owner',
                    label: this.ownerText,
                    keyProperty: '$key',
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    view: 'owner_list'
                },
                {
                    name: 'CloseProbability',
                    label: this.probabilityText,
                    picklist: 'Opportunity Probability',
                    title: this.opportunityProbabilityTitle,
                    type: 'picklist'
                }
            ]);
        }
    });
})();