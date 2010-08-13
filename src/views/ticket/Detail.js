/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

Mobile.SalesLogix.Ticket.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    titleText: 'Ticket',
    ticketIdText: 'ticket id',
    accountText: 'account',
    contactText: 'contact',
    phoneText: 'phone',
    subjectText: 'subject',
    urgencyText: 'urgency',
    areaText: 'area',
    receivedText: 'received',
    assignedToText: 'assigned to',
    statusText: 'status',
    createUserText: 'create user',
    createDateText: 'create date',
    relatedItemsText: 'Related Items',
    relatedReturnsText: 'Returns',
    relatedActivitiesText: 'Activities',
    relatedNotesText: 'Notes',
    constructor: function(o) {
        Mobile.SalesLogix.Ticket.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'ticket_detail',
            title: this.titleText,
            editor: 'ticket_edit',
            resourceKind: 'tickets'
        });

        this.layout = [
            {name: 'TicketNumber', label: this.ticketIdText},
            {name: 'Account.AccountName', label: this.accountText},
            {name: 'Contact.NameLF', label: this.contactText},
            {name: 'Contact.WorkPhone', label: this.phoneText, renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Subject', label: this.subjectText},
            {name: 'UrgencyCode', label: this.urgencyText},
            {name: 'Area', label: this.areaText},
            {name: 'ReceivedDate', label: this.receivedText, renderer: Mobile.SalesLogix.Format.date},
            {name: 'AssignedTo.OwnerDescription', label: this.assignedToText},
            {name: 'StatusCode', label: this.statusText},
            {name: 'CreateUser', label: this.createUserText},
            {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date},
            {options: {title: this.relatedItemsText, list: true}, as: [
                {
                    view: 'return_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['Account.Id eq "{0}"'], true),
                    label: this.relatedReturnsText,
                    icon: 'content/images/return_detail_24x24.gif'
                },
                {
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['Account.Id eq "{0}"'], true),
                    label: this.relatedActivitiesText,
                    icon: 'content/images/Task_List_3D_24x24.gif'
                },
                {
                    view: 'note_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['Account.Id eq "{0}" and Type eq "atNote"'], true),
                    label: this.relatedNotesText,
                    icon: 'content/images/note_24x24.gif'
                }
            ]}
        ];
    },

    init: function() {
        Mobile.SalesLogix.Ticket.Detail.superclass.init.call(this);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Ticket.Detail.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'Account,Contact,AssignedTo,AccountManager/UserInfo,Owner',
                'select': [
                    'TicketNumber',
                    'Account/AccountName',
                    'Contact/NameLF',
                    'Contact/WorkPhone',
                    'Subject',
                    'UrgencyCode',
                    'Area',
                    'ReceivedDate',
                    'AssignedTo/OwnerDescription',
                    'StatusCode',
                    'CreateUser',
                    'CreateDate',
                    'Category',
                    'Issue'
                   ].join(',')
            });

        return request;
    }
});