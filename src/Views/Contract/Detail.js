/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/Contract/Detail', ['Sage/Platform/Mobile/Detail'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Contract.Detail', [Sage.Platform.Mobile.Detail], {
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
        security: 'Entities/Contract/View',
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
            return dojo.string.substitute(fmt, [entry['Account']['$key']]);
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
            return this.layout || (this.layout = [{
                label: this.refNumText,
                property: 'ReferenceNumber'
            },
            {
                key: 'Account.$key',
                label: this.accountText,
                name: 'Account.AccountName',
                view: 'account_detail'
            },
            {
                label: this.contactText,
                property: 'Contact.NameLF'
            },
            {
                property: 'ServiceCode',
                label: this.svcTypeText
            },
            {
                label: this.contractTypeText,
                property: 'TypeCode'
            },
            {
                label: this.quantityText,
                property: 'Period'
            },
            {
                label: this.remainingText,
                property: 'Remaining'
            },
            {
                label: this.startText,
                property: 'StartDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                label: this.endText,
                property: 'EndingDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                label: this.activeText,
                property: 'IsActive'
            },
            {
                label: this.createUserText,
                property: 'CreateUser'
            },
            {
                label: this.createDateText,
                name: 'CreateDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                list: true,
                title: this.relatedItemsText,
                children: [{
                    icon: 'content/images/ticket_16x16.gif',
                    label: this.relatedTicketsText,
                    view: 'ticket_related',
                    where: this.formatAccountRelatedQuery.bindDelegate(
                        this, 'Account.id eq "${0}"'
                    )
                }]
            }]);
        }
    });
});