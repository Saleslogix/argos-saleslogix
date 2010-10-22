/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Contract");

Mobile.SalesLogix.Contract.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    id: 'contract_detail',
    editView: 'contract_edit',
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
    resourceKind: 'contracts',
    querySelect: [
        'ReferenceNumber',
        'Account/AccountName',
        'Contact/NameLF',
        'ServiceCode',
        'TypeCode',
        'Period',
        'Remaining',
        'StartDate',
        'EndingDate',
        'IsActive',
        'CreateUser',
        'CreateDate'
    ],   
    formatAccountRelatedQuery: function(entry, fmt) {
        return String.format(fmt, entry['Account']['$key']);
    },
    init: function() {
        Mobile.SalesLogix.Contract.Detail.superclass.init.call(this);

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
                name: 'ReferenceNumber',
                label: this.refNumText
            },
            {
                name: 'Account.AccountName',
                label: this.accountText,
                view: 'account_detail',
                key: 'Account.$key',
                property: true
            },
            {
                name: 'Contact.NameLF',
                label: this.contactText
            },
            {
                name: 'ServiceCode',
                label: this.svcTypeText
            },
            {
                name: 'TypeCode',
                label: this.contractTypeText
            },
            {
                name: 'Period',
                label: this.quantityText
            },
            {
                name: 'Remaining',
                label: this.remainingText
            },
            {
                name: 'StartDate',
                label: this.startText,
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                name: 'EndingDate',
                label: this.endText,
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                name: 'IsActive',
                label: this.activeText
            },
            {
                name: 'CreateUser',
                label: this.createUserText
            },
            {
                name: 'CreateDate',
                label: this.createDateText,
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                options: {
                    title: this.relatedItemsText,
                    list: true
                },
                as: [{
                    view: 'ticket_related',
                    where: this.formatAccountRelatedQuery.createDelegate(
                                this,
                                ['Account.id eq "{0}"'],
                                true
                            ),
                    label: this.relatedTicketsText,
                    icon: 'content/images/ticket_16x16.gif'
                }]
            }
        ]);
    }
});
