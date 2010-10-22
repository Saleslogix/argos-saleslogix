/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.SalesOrder");


(function() {
    Mobile.SalesLogix.SalesOrder.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        commentsText: 'comments',
        reqDateText: 'req date',
        salesOrderIdText: 'sales order id',
        statusText: 'status',
        titleText: 'SalesOrder',
        totalText: 'total',
        typeText: 'type',

        //View Properties
        entityName: 'SalesOrder',
        id: 'salesorder_edit',
        querySelect:  [
            'Account/AccountName',
            'Comments',
            'CreateDate',
            'CreateUser',
            'DatePromised',
            'OrderTotal',
            'OrderType',
            'SalesOrderNumber',
            'StartDate',
            'Status',
            'User/UserInfo/UserName'
        ],
        resourceKind: 'salesorders',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.salesOrderIdText,
                    name: 'SalesOrderNumber',
                    type: 'text'
                },
                {
                    label: this.typeText,
                    name: 'OrderType',
                    type: 'text'
                },
                {
                    label: this.statusText,
                    name: 'Status',
                    type: 'text'
                },
                {
                    label: this.totalText,
                    name: 'OrderTotal',
                    type: 'text',
                    validationTrigger: 'keyup',
                    validator: Mobile.SalesLogix.Validator.isDecimal
                },
                {
                    label: this.reqDateText,
                    name: 'DatePromised',
                    renderer: Mobile.SalesLogix.Format.date,
                    type: 'text'
                },
                {
                    label: this.commentsText,
                    name: 'Comments',
                    type: 'text'
                }
            ]);
        }
    });
})();