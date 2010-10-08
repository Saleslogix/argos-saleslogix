/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.SalesOrder");

(function() {
    Mobile.SalesLogix.SalesOrder.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        id: 'salesorder_detail',
        editView: 'salesorder_edit',
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
        resourceKind: 'salesorders',
        queryInclude: [
            'User/UserInfo',
            'Account',
            'Address',
            'AccountManager',
            'AccountManager/UserInfo'
        ],
        querySelect: [
            'SalesOrderNumber',
            'Account/AccountName',
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
        ],        
        formatAccountRelatedQuery: function(entry, fmt) {
            return String.format(fmt, entry['Account']['$key']);
        },
        init: function() {
            Mobile.SalesLogix.SalesOrder.Detail.superclass.init.call(this);

            this.tools.fbar = [{
                name: 'home',
                title: 'home',
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.navigateToHomeView,
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: App.navigateToActivityInsertView,
                scope: this
            }];
        },
        createLayout: function() {
            return this.layout || (this.layout = [
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
            ]);
        }
    });
})();