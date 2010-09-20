/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
/// <reference path="../../Template.js"/>

Ext.namespace("Mobile.SalesLogix.Contract");

Mobile.SalesLogix.Contract.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
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
    constructor: function(o) {
        Mobile.SalesLogix.Contract.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'contract_detail',
            title: this.titleText,
            editor: 'contract_edit',
            resourceKind: 'contracts'
        });

        Ext.apply(this.tools || {}, {
            fbar: [{
                name: 'home',
                title: 'home',                        
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.goHome,
                scope: this
            },{
                name: 'new',
                title: 'new',                        
                cls: 'tool-note',
                icon: 'content/images/Note_32x32.gif',
                fn: function(){
                  App.getView('contract_list').navigateToInsert.call({editor:'contract_edit'});
                },
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',                        
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: function() { alert("two");},
                scope: this
            }]
        });
        
        this.layout = [
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
        ];
    },
    formatAccountRelatedQuery: function(entry, fmt) {
        return String.format(fmt, entry['Account']['$key']);
    },
    init: function() {
        Mobile.SalesLogix.Contract.Detail.superclass.init.call(this);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Contract.Detail.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'Account,Address,AccountManager,AccountManager/UserInfo',
                'select': [
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
                ].join(',')
            });

        return request;
    }
});
