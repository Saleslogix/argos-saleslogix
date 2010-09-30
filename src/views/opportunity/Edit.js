/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
//Rajkumar. G 05-07-2010
Ext.namespace("Mobile.SalesLogix.Opportunity");

Mobile.SalesLogix.Opportunity.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
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
    constructor: function(o) {
        Mobile.SalesLogix.Opportunity.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'opportunity_edit',
            title: this.titleText,
            resourceKind: 'Opportunities',
            entityName: 'Opportunity'
        });
        
        var setAccountManager = function(entry) {
            this.editor.fields['AccountManager'].setValue(entry['AccountManager']);
        };

        this.layout = [
            {name: 'Description', label: this.opportunityText, type: 'text'},
            //{name: 'Account.AccountName', label: this.accountText, type: 'text'},
            {name: 'Account', label: this.accountText, type: 'lookup', view: 'acc_list', keyProperty: '$key', textProperty: 'AccountName', onSelect: setAccountManager},
            {name: 'AccountManager', label: this.acctMgrText, type: 'lookup', view: 'user_list', keyProperty: '$key', textProperty: 'UserInfo', textTemplate: Mobile.SalesLogix.Template.nameLF, alwaysUseValue: true, readonly: true},
            {name: 'EstimatedClose', label: this.estCloseText, type: 'text'},
            {name: 'SalesPotential', label: this.potentialText, validator: Mobile.SalesLogix.Validator.isCurrency, validationTrigger: 'keyup', type: 'decimal', precision: 2},
            {name: 'Type', label: this.typeText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Opportunity Type"', title: 'Opportunity Type'},
            {name: 'Status', label: this.statusText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Opportunity Status"', title: 'Opportunity Status'},
            {name: 'LeadSource', label: this.importSourceText, type: 'lookup', view: 'leadsource_list', keyProperty: '$key', textProperty: 'Description'},
            {name: 'Owner', label: this.ownerText, type: 'lookup', view: 'owner_list', keyProperty: '$key', textProperty: 'OwnerDescription'},
            {name: 'CloseProbability', label: this.probabilityText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Opportunity Probability"', title: 'Opportunity Probability'},
        ];
    },
    init: function() {
        Mobile.SalesLogix.Opportunity.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Opportunity.Edit.superclass.createRequest.call(this)
            .setResourceKind(this.resourceKind)
          .setQueryArgs({
                'include': 'Account,AccountManager,AccountManager/UserInfo,LeadSource',
                'select': [
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
                ].join(',')
            })
    }
});
//Rajkumar. G
