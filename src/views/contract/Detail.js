/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Contract");

Mobile.SalesLogix.Contract.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    //Localization
    accountText: 'account',
    activeText: 'active',
    contactText: 'contact',
    contractTypeText: 'contractType',
    createDateText: 'create date',
    createUserText: 'create user',
    endText: 'end',
    fbarHomeTitleText: 'home',
    fbarScheduleTitleText: 'schedule',
    quantityText: 'quantity',
    refNumText: 'refNum',
    relatedItemsText: 'Related Items',
    relatedTicketsText: 'Tickets',
    remainingText: 'remaining',
    startText: 'start',
    svcTypeText: 'svc-Type',
    titleText: 'Contract',

    //View Properties
    editView: 'contract_edit',
    id: 'contract_detail',
    querySelect: [
        'Account/AccountName',
        'Contact/NameLF',
        'CreateDate',
        'CreateUser',
        'EndingDate',
        'IsActive',
        'Period',
        'ReferenceNumber',
        'Remaining',
        'ServiceCode',
        'StartDate',
        'TypeCode'
    ],   
    resourceKind: 'contracts',

    formatAccountRelatedQuery: function(entry, fmt) {
        return String.format(fmt, entry['Account']['$key']);
    },
    init: function() {
        Mobile.SalesLogix.Contract.Detail.superclass.init.call(this);

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
                label: this.refNumText,
                name: 'ReferenceNumber'
            },
            {
                key: 'Account.$key',
                label: this.accountText,
                name: 'Account.AccountName',
                property: true,
                view: 'account_detail'
            },
            {
                label: this.contactText,
                name: 'Contact.NameLF'
            },
            {
                name: 'ServiceCode',
                label: this.svcTypeText
            },
            {
                label: this.contractTypeText,
                name: 'TypeCode'
            },
            {
                label: this.quantityText,
                name: 'Period'
            },
            {
                label: this.remainingText,
                name: 'Remaining'
            },
            {
                label: this.startText,
                name: 'StartDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                label: this.endText,
                name: 'EndingDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                label: this.activeText,
                name: 'IsActive'
            },
            {
                label: this.createUserText,
                name: 'CreateUser'
            },
            {
                label: this.createDateText,
                name: 'CreateDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                options: {
                    list: true,
                    title: this.relatedItemsText
                },
                as: [{
                    icon: 'content/images/ticket_16x16.gif',
                    label: this.relatedTicketsText,
                    view: 'ticket_related',
                    where: this.formatAccountRelatedQuery.createDelegate(
                        this, ['Account.id eq "{0}"'], true
                    ),
                }]
            }
        ]);
    }
});