/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    titleText: 'Account',
    accountText: 'Account',
    phoneText: 'Phone - Main',
    addressText: 'Address',
    webText: 'Web',
    typeText: 'Type',
    subTypeText: 'Subtype',
    acctMgrText: 'AccountManager',
    notesText: 'Notes',
    ownerText: 'Owner',
    statusText: 'status',
    createUserText: 'create user',
    createDateText: 'create date',
    relatedItemsText: 'Related Items',
    relatedContactsText: 'Contacts',
    relatedOpportunitiesText: 'Opportunities',
    relatedTicketsText: 'Tickets',
    relatedActivitiesText: 'Activities',
    relatedNotesText: 'Notes',
    constructor: function(o) {
        Mobile.SalesLogix.Account.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'account_detail',
            title: this.titleText,
            editor: 'account_edit',
            resourceKind: 'accounts'
        });

        this.layout = [
            {name: 'AccountName', label: this.accountText},
            {name: 'MainPhone', label: this.phoneText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Address', label: this.addressText, renderer: Mobile.SalesLogix.Format.address},
            {name: 'WebAddress', label: this.webText, renderer: Mobile.SalesLogix.Format.link},
            {name: 'Type', label: this.typeText},
            {name: 'SubType', label: this.subTypeText},
            {name: 'AccountManager.UserInfo', label: this.acctMgrText, tpl: Mobile.SalesLogix.Template.nameLF},
            {name: 'Notes', label: this.notesText},
            {name: 'Owner.OwnerDescription', label: this.ownerText},
            {name: 'Status', label: this.statusText},
            {name: 'CreateUser', label: this.createUserText},
            {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date},
            {options: {title: this.relatedItemsText, list: true}, as: [
                {
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['AccountId eq "{0}"'], true),
                    label: this.relatedActivitiesText,
                    icon: 'content/images/Task_List_3D_24x24.gif'
                },
                {
                    view: 'note_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['AccountId eq "{0}" and Type eq "atNote"'], true),
                    label: this.relatedNotesText,
                    icon: 'content/images/note_24x24.gif'
                },
                {
                    view: 'contact_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['Account.id eq "{0}"'], true),
                    label: this.relatedContactsText,
                    icon: 'content/images/Contacts_24x24.gif'
                },
                {
                    view: 'opportunity_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['Account.id eq "{0}"'], true),
                    label: this.relatedOpportunitiesText,
                    icon: 'content/images/Opportunity_List_24x24.gif'
                },
                {
                    view: 'ticket_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['Account.id eq "{0}"'], true),
                    label: this.relatedTicketsText,
                    icon: 'content/images/Ticket_List_3D_32x32.gif'
                }
            ]}
        ];
    },
    init: function() {
        Mobile.SalesLogix.Account.Detail.superclass.init.call(this);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Account.Detail.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'Address,AccountManager,AccountManager/UserInfo,Owner',
                'select': [
                    'AccountName',
                    'Description',
                    'MainPhone',
                    'Address/*',
                    'WebAddress',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName',
                    'Notes',
                    'Owner/OwnerDescription',
                    'ImportSource',
                    'Status',
                    'AccountName',
                    'WebAddress',
                    'MainPhone',
                    'FullAddress',
                    'Description',
                    'IsPrimary',
                    'IsMailing',
                    'Address1',
                    'Address2',
                    'Address3',
                    'City',
                    'State',
                    'PostalCode',
                    'Country',
                    'Fax',
                    'Type',
                    'SubType',
                    'Status',
                    'Industry',
                    'BusinessDescription',
                    'CreateDate',
                    'CreateUser',
                    'GlobalSyncID'
                ].join(',')
            });

        return request;
    }
});
