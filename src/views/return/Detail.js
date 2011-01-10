/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

(function() {
    Mobile.SalesLogix.Return.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        accountText: 'account',
        assignedToText: 'AssignedTo',
        createDateText: 'create date',
        createUserText: 'create user',
        editView: 'return_edit',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        priorityText: 'priority',
        regDateText: 'reg date',
        returnedByText: 'returned by',
        returnIdText: 'return id',
        shipToText: 'ship to',
        titleText: 'Return',
        typeText: 'type',

        //View Properties
        id: 'return_detail',
        querySelect: [
            'Account/AccountName',
            'AssignedTo/OwnerDescription',
            'CreateDate',
            'CreateUser',
            'ExpectedDate',
            'Priority',
            'ReturnedBy/NameLF',
            'ReturnNumber',
            'ReturnType',
            'ShipTo/NameLF'
        ],
        resourceKind: 'returns',

        init: function() {
            Mobile.SalesLogix.Return.Detail.superclass.init.call(this);

            this.tools.fbar = [{
                cls: '',
                fn: App.navigateToActivityInsertView,
                icon: 'content/images/icons/Scheduling_24x24.png',
                name: 'schedule',
                scope: App,
                title: this.fbarScheduleTitleText
            }];
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.returnIdText,
                    name: 'ReturnNumber'
                },
                {
                    label: this.accountText,
                    name: 'Account.AccountName'
                },
                {
                    label: this.priorityText,
                    name: 'Priority'
                },
                {
                    label: this.typeText,
                    name: 'ReturnType'
                },
                {
                    label: this.regDateText,
                    name: 'ExpectedDate',
                    renderer: Mobile.SalesLogix.Format.date
                },
                {
                    label: this.assignedToText,
                    name: 'AssignedTo.OwnerDescription'
                },
                {
                    label: this.returnedByText,
                    name: 'ReturnedBy.NameLF'
                },
                {
                    label: this.shipToText,
                    name: 'ShipTo.NameLF'
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