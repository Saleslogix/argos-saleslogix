/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
/// <reference path="../../Template.js"/>

Ext.namespace("Mobile.SalesLogix.SalesOrder");

Mobile.SalesLogix.SalesOrder.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.SalesOrder.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'salesorder_detail',
            title: 'SalesOrder',
	        editor: 'salesorder_edit',//Added by Rajkumar. G to enable edit functionality
            resourceKind: 'salesorders'
        });

        this.layout = [
            {name: 'SalesOrderNumber', label: 'sales order id'},
            {name: 'Account.AccountName', label: 'account', view: 'account_detail', key: 'Account.$key', property: true},
            {name: 'OrderType', label: 'type'},
            {name: 'Status', label: 'status'},
            {name: 'OrderTotal', label: 'total'},
            {name: 'DatePromised', label: 'req date', renderer: Mobile.SalesLogix.Format.date},
            {name: 'Comments', label: 'comments'},
            {name: 'AccountManager.UserInfo.UserName', label: 'acct mgr'},
            {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},
       
        ];
    },        
    formatAccountRelatedQuery: function(entry, fmt) {
        return String.format(fmt, entry['Account']['$key']);
    },
    init: function() {     
        Mobile.SalesLogix.SalesOrder.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.SalesOrder.Detail.superclass.createRequest.call(this);
        
        request         
            .setQueryArgs({
                'include': 'User/UserInfo,Account,Address,AccountManager,AccountManager/UserInfo',                
                'select': [
                'SalesOrderNumber',
	            'Account/AccountName',
		        'OrderType',
		        'Status',
		        'OrderTotal',
		        'DatePromised',
		        'Comments',
		        'StartDate',
		        'AccountManager/UserInfo/UserName',
		        'CreateUser',
		        'CreateDate'
                ].join(',')             
            });
        
        return request;            
    } 
});
