/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

Mobile.SalesLogix.Return.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
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
    constructor: function(o) {
        Mobile.SalesLogix.Return.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'return_detail',
            title: this.titleText,
            editor: 'return_edit',
            resourceKind: 'returns'
        });

        this.layout = [
            {name: 'ReturnNumber', label: this.returnIdText},
            {name: 'Account.AccountName', label: this.accountText},
            {name: 'Priority', label: this.priorityText},
            {name: 'ReturnType', label: this.typeText},
            {name: 'ExpectedDate', label: this.regDateText, renderer: Mobile.SalesLogix.Format.date},
            {name: 'AssignedTo.OwnerDescription', label: this.assignedToText},
            {name: 'ReturnedBy.NameLF', label: this.returnedByText},
            {name: 'ShipTo.NameLF', label: this.shipToText},
            {name: 'CreateUser', label: this.createUserText},
            {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date},
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
                    'ReturnedBy/NameLF',
                    'ShipTo/NameLF',
                    'CreateUser',
                    'CreateDate'
                  ].join(',')
            });

        return request;
    }
});