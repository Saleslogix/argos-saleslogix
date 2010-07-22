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
    constructor: function(o) {
        Mobile.SalesLogix.Opportunity.Edit.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'opportunity_edit',
            title: 'Opportunity',
            resourceKind: 'Opportunities'
        });

        this.layout = [
            {name: 'Description', label: 'opportunity', type: 'text'},
            {name: 'EstimatedClose', label: 'est close', type: 'text'},
            {name: 'SalesPotential', label: 'potential', type: 'text', validator: Mobile.SalesLogix.Validator.isDecimal, validationTrigger: 'keyup'}, 
            {name: 'CloseProbability', label: 'probability', type: 'text', validator: Mobile.SalesLogix.Validator.isInteger, validationTrigger: 'keyup'},
            {name: 'Weighted', label: 'weighted', type: 'text', validator: Mobile.SalesLogix.Validator.isDecimal, validationTrigger: 'keyup'},
            {name: 'Stage', label: 'stage', type: 'text'},
            {name: 'Status', label: 'status', type: 'text'}
                  
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Opportunity.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
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
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});
//Rajkumar. G
