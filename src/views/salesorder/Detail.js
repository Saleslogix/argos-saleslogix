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
        accountText: 'account',
        acctMgrText: 'acct mgr',
        commentsText: 'comments',
        createDateText: 'create date',
        createUserText: 'create user',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        reqDateText: 'req date',
        salesOrderIdText: 'sales order id',
        statusText: 'status',
        titleText: 'SalesOrder',
        totalText: 'total',
        typeText: 'type',
        resourceKind: 'salesorders',
        querySelect: [
            'Account/AccountName',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'AccountManager/UserInfo/UserName',
            'Comments',
            'CreateDate',
            'CreateUser',
            'DatePromised',
            'OrderTotal',
            'OrderType',
            'SalesOrderNumber',
            'StartDate',
            'Status'
        ],        
        formatAccountRelatedQuery: function(entry, fmt) {
            return String.format(fmt, entry['Account']['$key']);
        },
        init: function() {
            Mobile.SalesLogix.SalesOrder.Detail.superclass.init.call(this);

            this.tools.fbar = [{
                name: 'home',
                title: this.fbarHomeTitleText,
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.navigateToHomeView,
                scope: this
            },
            {
                name: 'schedule',
                title: this.fbarScheduleTitleText,
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: App.navigateToActivityInsertView,
                scope: this
            }];
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'SalesOrderNumber',
                    label: this.salesOrderIdText
                },
                {
                    name: 'Account.AccountName',
                    label: this.accountText,
                    view: 'account_detail',
                    key: 'Account.$key',
                    property: true
                },
                {
                    name: 'OrderType',
                    label: this.typeText
                },
                {
                    name: 'Status',
                    label: this.statusText
                },
                {
                    name: 'OrderTotal',
                    label: this.totalText
                },
                {
                    name: 'DatePromised',
                    label: this.reqDateText,
                    renderer: Mobile.SalesLogix.Format.date
                },
                {
                    name: 'Comments',
                    label: this.commentsText
                },
                {
                    name: 'AccountManager.UserInfo',
                    label: this.acctMgrText,
                    tpl: Mobile.SalesLogix.Template.nameLF
                },
                {
                    name: 'CreateUser',
                    label: this.createUserText
                },
                {
                    name: 'CreateDate',
                    label: this.createDateText,
                    renderer: Mobile.SalesLogix.Format.date
                }
            ]);
        }
    });
})();