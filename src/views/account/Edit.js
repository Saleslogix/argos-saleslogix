/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {       
    constructor: function(o) {
        Mobile.SalesLogix.Account.Edit.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'account_edit',
            title: 'Account',
            resourceKind: 'accounts',
            entityName: 'Account'
        });

        this.layout = [
            {name: 'AccountName', label: 'account', type: 'text'},
            {name: 'MainPhone', label: 'phone', type: 'phone'},
            {name: 'WebAddress', label: 'web', type: 'text'},
            {name: 'Type', label: 'type', type: 'text'},
            {name: 'SubType', label: 'sub-type', type: 'text'},
            {name: 'Status', label: 'status', type: 'text'}           
        ];
    },
    init: function() {     
        Mobile.SalesLogix.Account.Edit.superclass.init.call(this);   
    },
    createRequest: function() {
        return Mobile.SalesLogix.Account.Edit.superclass.createRequest.call(this)    
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'AccountName',
                    'MainPhone',
                    'WebAddress',
                    'Type',
                    'SubType',
                    'Status'
                  ]
            });
    }
});