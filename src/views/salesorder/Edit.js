/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Salesorder");

Mobile.SalesLogix.Salesorder.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {       
    constructor: function(o) {
        Mobile.SalesLogix.Salesorder.Edit.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'salesorder_edit',
            title: 'Salesorder',
            resourceKind: 'salesorders'
        });

        this.layout = [
            {name: 'SalesOrderNumber', label: 'sales order id', type: 'text'},
            {name: 'OrderType', label: 'type', type: 'text'}, 
	    {name: 'Status', label: 'status', type: 'text'},
        {name: 'OrderTotal', label: 'total', type: 'text'},
        {name: 'DatePromised', label: 'req date', type: 'text', renderer: Mobile.SalesLogix.Format.date},
        {name: 'Comments', label: 'comments', type: 'text'},       
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Salesorder.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'include': 'User,Account,Address,AccountManager,AccountManager/UserInfo',                
                'select': [
                  'SalesOrderNumber',
	          'Account/AccountName',
		  'OrderType',
		  'Status',
		  'OrderTotal',
		  'DatePromised',
		  'Comments',
		  'StartDate',
		  'User/UserInfo/UserName',
		  'CreateUser',
		  'CreateDate'
       ].join(',')          
            })
            .setResourceSelector(String.format("'{0}'", this.entry['$key']));
    }
});
