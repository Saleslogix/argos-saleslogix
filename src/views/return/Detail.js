/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

(function() {
    Mobile.SalesLogix.Return.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        id: 'return_detail',
        editView: 'return_edit',
        titleText: 'Return',
        returnIdText: 'return id',
        accountText: 'account',
        priorityText: 'priority',
        typeText: 'type',
        regDateText: 'reg date',
        assignedToText: 'AssignedTo',
        returnedByText: 'returned by',
        shipToText: 'ship to',
        createUserText: 'create user',
        createDateText: 'create date',
        resourceKind: 'returns',
        queryInclude: [
            'Account',
            'AssignedTo',
            'ReturnedBy',
            'ShipTo'
        ],
        querySelect: [
            'ReturnNumber',
            'Account/AccountName',
            'Priority',
            'ReturnType',
            'ExpectedDate',
            'AssignedTo/OwnerDescription',
            'ReturnedBy/NameLF',
            'ShipTo/NameLF',
            'CreateUser',
            'CreateDate'
        ],
        init: function() {
            Mobile.SalesLogix.Return.Detail.superclass.init.call(this);

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
                {name: 'ReturnNumber', label: this.returnIdText},
                {name: 'Account.AccountName', label: this.accountText},
                {name: 'Priority', label: this.priorityText},
                {name: 'ReturnType', label: this.typeText},
                {name: 'ExpectedDate', label: this.regDateText, renderer: Mobile.SalesLogix.Format.date},
                {name: 'AssignedTo.OwnerDescription', label: this.assignedToText},
                {name: 'ReturnedBy.NameLF', label: this.returnedByText},
                {name: 'ShipTo.NameLF', label: this.shipToText},
                {name: 'CreateUser', label: this.createUserText},
                {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date}
            ]);
        }
    });
})();