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
    titleText: 'SalesOrder',
    salesOrderIdText: 'sales order id',
    accountText: 'account',
    typeText: 'type',
    statusText: 'status',
    totalText: 'total',
    reqDateText: 'req date',
    commentsText: 'comments',
    acctMgrText: 'acct mgr',
    createUserText: 'create user',
    createDateText: 'create date',
    constructor: function(o) {
        Mobile.SalesLogix.SalesOrder.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'salesorder_detail',
            title: this.titleText,
            editor: 'salesorder_edit',//Added by Rajkumar. G to enable edit functionality
            resourceKind: 'salesorders'
        });

        Ext.apply(this.tools || {}, {
            fbar: [{
                name: 'home',
                title: 'home',                        
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.goHome,
                scope: this
            },{
                name: 'new',
                title: 'new',                        
                cls: 'tool-note',
                icon: 'content/images/Note_32x32.gif',
                fn: function(){
                  App.getView('salesorder_list').navigateToInsert.call({editor:'salesorder_edit'});
                },
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',                        
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: App.navigateToNewActivity,
                scope: this
            }]
        });
        
        this.layout = [
            {name: 'SalesOrderNumber', label: this.salesOrderIdText},
            {name: 'Account.AccountName', label: this.accountText, view: 'account_detail', key: 'Account.$key', property: true},
            {name: 'OrderType', label: this.typeText},
            {name: 'Status', label: this.statusText},
            {name: 'OrderTotal', label: this.totalText},
            {name: 'DatePromised', label: this.reqDateText, renderer: Mobile.SalesLogix.Format.date},
            {name: 'Comments', label: this.commentsText},
            {name: 'AccountManager.UserInfo', label: this.acctMgrText, tpl: Mobile.SalesLogix.Template.nameLF},
            {name: 'CreateUser', label: this.createUserText},
            {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date},
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
                'SalesOrderNumber','Account/AccountName',
                'OrderType',
                'Status',
                'OrderTotal',
                'DatePromised',
                'Comments',
                'StartDate',
                'AccountManager/UserInfo/UserName',
                'AccountManager/UserInfo/FirstName',
                'AccountManager/UserInfo/LastName',
                'CreateUser',
                'CreateDate'
                ].join(',')
            });

        return request;
    }
});
