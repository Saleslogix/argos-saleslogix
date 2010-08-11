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
    descriptionText: 'description',
    estCloseText: 'est. close',
    potentialText: 'potential',
    probabilityText: 'probability',
    weightedText: 'weighted',
    stageText: 'stage',
    statusText: 'status',
    constructor: function(o) {
        Mobile.SalesLogix.Opportunity.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'opportunity_edit',
            title: this.titleText,
            resourceKind: 'Opportunities',
            entityName: 'Opportunity'
        });

        this.layout = [
            {name: 'Description', label: this.descriptionText, type: 'text'},
            {name: 'EstimatedClose', label: this.estCloseText, type: 'text'},
            {name: 'SalesPotential', label: this.potentialText, validator: Mobile.SalesLogix.Validator.isCurrency, validationTrigger: 'keyup', type: 'text'},
            {name: 'CloseProbability', label: this.probabilityText, validator: Mobile.SalesLogix.Validator.isInteger, validationTrigger: 'keyup', type: 'text'},
            {name: 'Weighted', label: this.weightedText, validator: Mobile.SalesLogix.Validator.isCurrency, validationTrigger: 'keyup', type: 'text'},
            {name: 'Stage', label: this.stageText, type: 'text'},
            {name: 'Status', label: this.statusText, type: 'text'}

        ];
    },
    init: function() {
        Mobile.SalesLogix.Opportunity.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Opportunity.Edit.superclass.createRequest.call(this)
            .setResourceKind(this.resourceKind)
          .setQueryArgs({
                'include': 'Account,AccountManager,AccountManager/UserInfo',
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
                    'CreateDate',
                    'CreateUser'
                ].join(',')
            })
    }
});
//Rajkumar. G
