/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Opportunity");

(function() {
    Mobile.SalesLogix.Opportunity.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'opportunity_edit',
        titleText: 'Opportunity',
        opportunityText: 'opportunity',
        accountText: 'acct',
        acctMgrText: 'acct mgr',
        estCloseText: 'est close',
        potentialText: 'sales potential',
        statusText: 'status',
        typeText: 'type',
        probabilityText: 'close prob',
        importSourceText: 'lead source',
        ownerText: 'owner',
        opportunityTypeTitle: 'Opportunity Type',
        opportunityStatusTitle: 'Opportunity Status',
        opportunityProbabilityTitle: 'Opportunity Probability',
        resourceKind: 'opportunities',
        entityName: 'Opportunity',
        queryInclude: [
            'Account',
            'AccountManager',
            'AccountManager/UserInfo',
            'LeadSource'
        ],
        querySelect: [
            'Description',
            'Account/AccountName',
            'EstimatedClose',
            'SalesPotential',
            'CloseProbability',
            'Weighted',
            'Stage',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'Owner/OwnerDescription',
            'Status',
            'Type',
            'LeadSource/Description'
        ],
        init: function() {
            Mobile.SalesLogix.Opportunity.Edit.superclass.init.apply(this, arguments);
        },
        createLayout: function() {
            // todo: add account on change handling

            return this.layout || (this.layout = [
                {name: 'Description', label: this.opportunityText, type: 'text'},
                {name: 'Account', label: this.accountText, type: 'lookup', view: 'account_lookup', textProperty: 'AccountName'},
                {
                    name: 'AccountManager',
                    label: this.acctMgrText,
                    type: 'lookup',
                    view: 'user_list',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    alwaysUseValue: true
                },
                {name: 'EstimatedClose', label: this.estCloseText, type: 'date'},
                {
                    name: 'SalesPotential',
                    label: this.potentialText,
                    validator: Mobile.SalesLogix.Validator.isCurrency,
                    validationTrigger: 'keyup',
                    type: 'decimal',
                    precision: 2
                },
                {name: 'Type', label: this.typeText, type: 'picklist', picklist: 'Opportunity Type', title: 'Opportunity Type'},
                {name: 'Status', label: this.statusText, type: 'picklist', picklist: 'Opportunity Status', title: this.opportunityStatusTitle},
                {name: 'LeadSource', label: this.importSourceText, type: 'lookup', view: 'leadsource_list', textProperty: 'Description'},
                {name: 'Owner', label: this.ownerText, type: 'lookup', view: 'owner_list', keyProperty: '$key', textProperty: 'OwnerDescription'},
                {
                    name: 'CloseProbability',
                    label: this.probabilityText,
                    type: 'picklist',
                    picklist: 'Opportunity Probability',
                    title: this.opportunityProbabilityTitle
                }
            ]);
        }
    });
})();