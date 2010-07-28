/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.SalesOrder");

Mobile.SalesLogix.SalesOrder.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'SalesOrder',
    salesOrderIdText: 'sales order id',
    typeText: 'type',
    statusText: 'status',
    totalText: 'total',
    reqDateText: 'req date',
    commentsText: 'comments',
    constructor: function(o) {
        Mobile.SalesLogix.SalesOrder.Edit.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'salesorder_edit',
            title: this.titleText,
            resourceKind: 'salesorders'
        });

        this.layout = [
            {name: 'SalesOrderNumber', label: this.salesOrderIdText, type: 'text'},
            {name: 'OrderType', label: this.typeText, type: 'text'},
            {name: 'Status', label: this.statusText, type: 'text'},
            {name: 'OrderTotal', label: this.totalText, validator: Mobile.SalesLogix.Validator.isDecimal, validationTrigger: 'keyup', type: 'text'},
            {name: 'DatePromised', label: this.reqDateText, type: 'text', renderer: Mobile.SalesLogix.Format.date},
            {name: 'Comments', label: this.commentsText, type: 'text'},
        ];
    },
    init: function() {
        Mobile.SalesLogix.SalesOrder.Edit.superclass.init.call(this);
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
