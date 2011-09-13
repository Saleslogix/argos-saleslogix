/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.SalesOrder");

(function() {
    Mobile.SalesLogix.SalesOrder.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
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

        //View Properties
        editView: 'salesorder_edit',
        id: 'salesorder_detail',
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
        resourceKind: 'salesorders',

        formatAccountRelatedQuery: function(entry, fmt) {
            return String.format(fmt, entry['Account']['$key']);
        },
        init: function() {
            Mobile.SalesLogix.SalesOrder.Detail.superclass.init.call(this);

            this.tools.fbar = [{
                cls: '',
                fn: function() {
                    App.navigateToActivityInsertView.call(App, {"id": this.id});
                },
                icon: 'content/images/icons/Scheduling_24x24.png',
                name: 'schedule',
                scope: this,
                title: this.fbarScheduleTitleText
            }];
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.salesOrderIdText,
                    name: 'SalesOrderNumber'
                },
                {
                    label: this.accountText,
                    name: 'Account.AccountName',
                    key: 'Account.$key',
                    property: true,
                    view: 'account_detail'
                },
                {
                    label: this.typeText,
                    name: 'OrderType'
                },
                {
                    label: this.statusText,
                    name: 'Status'
                },
                {
                    label: this.totalText,
                    name: 'OrderTotal'
                },
                {
                    label: this.reqDateText,
                    name: 'DatePromised',
                    renderer: Mobile.SalesLogix.Format.date
                },
                {
                    label: this.commentsText,
                    name: 'Comments'
                },
                {
                    label: this.acctMgrText,
                    name: 'AccountManager.UserInfo',
                    tpl: Mobile.SalesLogix.Template.nameLF
                },
                {
                    label: this.createUserText,
                    name: 'CreateUser'
                },
                {
                    label: this.createDateText,
                    name: 'CreateDate',
                    renderer: Mobile.SalesLogix.Format.date
                }
            ]);
        }
    });
})();