/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Contract");

Mobile.SalesLogix.Contract.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {       
    constructor: function(o) {
        Mobile.SalesLogix.Contract.Edit.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'contract_edit',
            title: 'Contract',
            resourceKind: 'contracts'
        });

        this.layout = [
            {name: 'ReferenceNumber', label: 'referencenumber', type: 'text'},
            {name: 'Period', label: 'period', type: 'text'}, 
	    {name: 'IsActive', label: 'isactive', type: 'text'},
               
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Contract.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind(this.resourceKind)
           .setQueryArgs({
                'include': 'Account,Address,AccountManager,AccountManager/UserInfo',                
                'select': [
                  'ReferenceNumber',
	          'Account/AccountName',
		  'Contact/FullName',
		  'ServiceCode',
		  'TypeCode',
		  'Period',
		  'Remaining',
		  'StartDate',
		  'EndingDate',
		  'IsActive',
		  'CreateUser',
		  'CreateDate'
                ].join(',')               
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});