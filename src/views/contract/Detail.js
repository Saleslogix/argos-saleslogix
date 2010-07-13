/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
/// <reference path="../../Template.js"/>

Ext.namespace("Mobile.SalesLogix.Contract");

Mobile.SalesLogix.Contract.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Contract.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'contract_detail',
            title: 'Contract',
	    editor: 'contract_edit',//Added by Rajkumar. G to enable edit functionality
            resourceKind: 'contracts'
        });

        this.layout = [
            {name: 'ReferenceNumber', label: 'ref num'},
            {name: 'Account.AccountName', label: 'account', view: 'account_detail', key: 'Account.$key', property: true},
            {name: 'Contact.FullName', label: 'contact'},
            {name: 'ServiceCode', label: 'svc type'},
            {name: 'TypeCode', label: 'contract type'},
            {name: 'Period', label: 'quantity'},
            {name: 'Remaining', label: 'remaining'},
            {name: 'StartDate', label: 'start', renderer: Mobile.SalesLogix.Format.date},
            {name: 'EndingDate', label: 'end' , renderer: Mobile.SalesLogix.Format.date},
	        {name: 'IsActive', label: 'active'},
	        {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},
            {options: {title: 'Related Items', list: true}, as: [                
                {
                    view: 'ticket_related', 
                    where: this.formatAccountRelatedQuery.createDelegate(this, ['Account.id eq "{0}"'], true),
                    label: 'tickets',
                    icon: 'content/images/ticket_16x16.gif'
                }
            ]}           
        ];
    },        
    formatAccountRelatedQuery: function(entry, fmt) {
        return String.format(fmt, entry['Account']['$key']);
    },
    init: function() {     
        Mobile.SalesLogix.Contract.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Contract.Detail.superclass.createRequest.call(this);
        
        request         
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
            });
        
        return request;            
    } 
});
