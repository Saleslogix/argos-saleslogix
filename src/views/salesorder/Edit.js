/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.SalesOrder");


(function() {
    Mobile.SalesLogix.SalesOrder.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'salesorder_edit',
        titleText: 'SalesOrder',
        salesOrderIdText: 'sales order id',
        typeText: 'type',
        statusText: 'status',
        totalText: 'total',
        reqDateText: 'req date',
        commentsText: 'comments',
        resourceKind: 'salesorders',
        entityName: 'SalesOrder',
        queryInclude: [
            'User',
            'Account',
            'Address',
            'AccountManager',
            'AccountManager/UserInfo'
        ],
        querySelect:  [
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
        ],
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'SalesOrderNumber', label: this.salesOrderIdText, type: 'text'},
                {name: 'OrderType', label: this.typeText, type: 'text'},
                {name: 'Status', label: this.statusText, type: 'text'},
                {name: 'OrderTotal', label: this.totalText, validator: Mobile.SalesLogix.Validator.isDecimal, validationTrigger: 'keyup', type: 'text'},
                {name: 'DatePromised', label: this.reqDateText, type: 'text', renderer: Mobile.SalesLogix.Format.date},
                {name: 'Comments', label: this.commentsText, type: 'text'}
            ]);
        }
    });
})();