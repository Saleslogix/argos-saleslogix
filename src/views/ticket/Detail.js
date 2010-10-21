/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

Mobile.SalesLogix.Ticket.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    id: 'ticket_detail',
    editView: 'ticket_edit',
    accountText: 'acct name',
    areaText: 'area',
    assignedDateText: 'assigned date',
    assignedToText: 'assigned to',
    categoryText: 'category',
    contactText: 'contact',
    contractText: ' ',
    descriptionText: 'desc',
    fbarHomeTitleText: 'home',
    fbarScheduleTitleText: 'schedule',
    issueText: 'issue',
    needByText: 'needed date',
    notesText: 'comments',
    phoneText: 'phone',
    relatedActivitiesText: 'Activities',
    relatedItemsText: 'Related Items',
    resolutionText: 'resolution',
    sourceText: 'source',
    statusText: 'status',
    subjectText: 'subject',
    ticketIdText: 'ticket number',
    titleText: 'Ticket',
    urgencyText: 'urgency',
    resourceKind: 'tickets',
    querySelect: [
        'Account/AccountName',
        'Area',
        'AssignedDate',
        'AssignedTo/OwnerDescription',
        'Category',
        'Contact/NameLF',
        'Contract',
        'Description',
        'Issue',
        'NeededByDate',
        'Notes',
        'Resolution',
        'Source',
        'StatusCode',
        'Subject',
        'TicketNumber',
        'UrgencyCode'
    ],
    init: function() {
        Mobile.SalesLogix.Ticket.Detail.superclass.init.call(this);

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
                name: 'TicketNumber',
                label: this.ticketIdText
            },
            {
                name: 'Account.AccountName',
                label: this.accountText
            },
            {
                name: 'Contact.NameLF',
                label: this.contactText
            },
            {
                name: 'Area',
                label: this.areaText
            },
            {
                name: 'Category',
                label: this.categoryText
            },
            {
                name: 'Issue',
                label: this.issueText
            },
            {
                name: 'Source',
                label: this.sourceText
            },
            {
                name: 'StatusCode',
                label: this.statusText
            },
            {
                name: 'UrgencyCode',
                label: this.urgencyText
            },
            {
                name: 'NeededByDate',
                label: this.needByText,
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                name: 'AssignedDate',
                label: this.assignedDateText,
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                name: 'AssignedTo.OwnerDescription',
                label: this.assignedToText
            },
            {
                name: 'Subject',
                label: this.subjectText
            },
            {
                name: 'Description',
                label: this.descriptionText
            },
            {
                name: 'Resolution',
                label: this.resolutionText
            },
            {
                name: 'Notes',
                label: this.notesText
            },
            {
                options: {
                    title: this.relatedItemsText,
                    list: true
                },
                as: [{
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(this, ['TicketId eq "{0}"'], true),
                    label: this.relatedActivitiesText,
                    icon: 'content/images/Task_List_3D_24x24.gif'
                }]
            }
        ]);
    }
});