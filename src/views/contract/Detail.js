/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Contract");

Mobile.SalesLogix.Contract.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    id: 'contract_detail',
    editView: 'contract_edit',
    titleText: 'Contract',
    refNumText: 'refNum',
    accountText: 'account',
    contactText: 'contact',
    svcTypeText: 'svc-Type',
    contractTypeText: 'contractType',
    quantityText: 'quantity',
    remainingText: 'remaining',
    startText: 'start',
    endText: 'end',
    activeText: 'active',
    createUserText: 'create user',
    createDateText: 'create date',
    relatedItemsText: 'Related Items',
    relatedTicketsText: 'Tickets',
    resourceKind: 'contracts',
    queryInclude: [
        'Account',
        'Address',
        'AccountManager',
        'AccountManager/UserInfo'
    ],
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
            title: 'home',
            cls: 'tool-note',
            icon: 'content/images/welcome_32x32.gif',
            fn: App.goHome,
            scope: this
        },{
            name: 'schedule',
            title: 'schedule',
            cls: 'tool-note',
            icon: 'content/images/Schdedule_To_Do_32x32.gif',
            fn: App.navigateToNewActivity,
            scope: this
        }];
    },
    createLayout: function() {
        return this.layout || (this.layout = [
            {name: 'ReferenceNumber', label: this.refNumText},
            {name: 'Account.AccountName', label: this.accountText, view: 'account_detail', key: 'Account.$key', property: true},
            {name: 'Contact.NameLF', label: this.contactText},
            {name: 'ServiceCode', label: this.svcTypeText},
            {name: 'TypeCode', label: this.contractTypeText},
            {name: 'Period', label: this.quantityText},
            {name: 'Remaining', label: this.remainingText},
            {name: 'StartDate', label: this.startText, renderer: Mobile.SalesLogix.Format.date},
            {name: 'EndingDate', label: this.endText , renderer: Mobile.SalesLogix.Format.date},
	        {name: 'IsActive', label: this.activeText},
	        {name: 'CreateUser', label: this.createUserText},
            {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date},
            {options: {title: this.relatedItemsText, list: true}, as: [
                {
                    view: 'ticket_related',
                    where: this.formatAccountRelatedQuery.createDelegate(this, ['Account.id eq "{0}"'], true),
                    label: this.relatedTicketsText,
                    icon: 'content/images/ticket_16x16.gif'
                }
            ]}
        ]);
    }
});
