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
    ticketIdText: 'ticket number',
    accountText: 'acct name',
    contactText: 'contact',
    contractText: ' ',
    sourceText: 'source',
    phoneText: 'phone',
    subjectText: 'subject',
    descriptionText: 'desc',
    resolutionText: 'resolution',
    notesText: 'comments',
    urgencyText: 'urgency',
    areaText: 'area',
    categoryText: 'category',
    issueText: 'issue',
    statusText: 'status',
    assignedDateText: 'assigned date',
    needbyText: 'needed date',
    relatedItemsText: 'Related Items',
    relatedActivitiesText: 'Activities',
    assignedToText: 'assigned to',
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
            //{name: 'Contract', label: this.contractText},
            {name: 'Area', label: this.areaText},
            {name: 'Category', label: this.categoryText},
            {name: 'Issue', label: this.issueText},
            {name: 'Source', label: this.sourceText},
            {name: 'StatusCode', label: this.statusText},
            {name: 'UrgencyCode', label: this.urgencyText},
            {name: 'NeededByDate', label: this.needbyText, renderer: Mobile.SalesLogix.Format.date},
            {name: 'AssignedDate', label: this.assignedDateText, renderer: Mobile.SalesLogix.Format.date},
            {name: 'AssignedTo.OwnerDescription', label: this.assignedToText},
            {name: 'Subject', label: this.subjectText},
            {name: 'Description', label: this.descriptionText},
            {name: 'Resolution', label: this.resolutionText},
            {name: 'Notes', label: this.notesText},
            {options: {title: this.relatedItemsText, list: true}, as: [
                {
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['TicketId eq "{0}"'], true),
                    label: this.relatedActivitiesText,
                    icon: 'content/images/Task_List_3D_24x24.gif'
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
                    'Contract',
                    'Area',
                    'Category',
                    'Issue',
                    'Source',
                    'StatusCode',
                    'UrgencyCode',
                    'NeededByDate',
                    'AssignedDate',
                    'AssignedTo/OwnerDescription',
                    'Subject',
                    'Description',
                    'Resolution',
                    'Notes'
                   ].join(',')
            });

        return request;
    }
});