/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

Mobile.SalesLogix.Return.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Return.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'return_detail',
            title: 'Return',
            editor: 'return_edit',
            resourceKind: 'returns'
        });

        this.layout = [
            {name: 'ReturnNumber', label: 'returnnumber'},
            {name: 'Account.AccountName', label: 'name'},
            {name: 'Priority', label: 'priority'},
            {name: 'ReturnType', label: 'returntype'},
            {name: 'ExpectedDate', label: 'expected date', renderer: Mobile.SalesLogix.Format.date},
            {name: 'AssignedTo.OwnerDescription', label: 'AssignedTo'},
            {name: 'ReturnedBy.FullName', label: 'returnedby'},
            {name: 'ShipTo.FullName', label: 'shipto fullname'},
            {name: 'CreateUser', label: 'create user'},
            {name: 'CreateDate', label: 'create date', renderer: Mobile.SalesLogix.Format.date},
          ];
    },
    init: function() {     
        Mobile.SalesLogix.Return.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Return.Detail.superclass.createRequest.call(this);
        
        request                     
            .setQueryArgs({
                'include': 'Account,AssignedTo,ReturnedBy,ShipTo',
                'select': [
                    'ReturnNumber',
                    'Account/AccountName',
                    'Priority',
                    'ReturnType',
                    'ExpectedDate',
                    'AssignedTo/OwnerDescription',
                    'ReturnedBy/FullName',
                    'ShipTo/FullName',
                    'CreateUser',
                    'CreateDate'
                  ].join(',')                  
            });     
        
        return request;                   
    } 
});