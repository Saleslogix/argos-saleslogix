/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

Mobile.SalesLogix.Ticket.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    //Localization
    accountText: 'acct name',
    areaText: 'area',
    assignedDateText: 'assigned date',
    assignedToText: 'assigned to',
    categoryText: 'category',
    contactText: 'contact',
    contractText: 'contract',
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

    //View Properties
    editView: 'ticket_edit',
    id: 'ticket_detail',
    querySelect: [
        'Account/AccountName',
        'Area',
        'AssignedDate',
        'AssignedTo/OwnerDescription',
        'Category',
        'Contact/NameLF',
        'Contract/ReferenceNumber',
        'Issue',
        'NeededByDate',
        'Notes',
        'ViaCode',
        'StatusCode',
        'Subject',
        'TicketNumber',
        'TicketProblem/Notes',
        'TicketSolution/Notes',
        'UrgencyCode'
    ],
    resourceKind: 'tickets',

    init: function() {
        Mobile.SalesLogix.Ticket.Detail.superclass.init.call(this);

        this.tools.fbar = [{
            cls: 'tool-note',
            fn: function() {
                App.navigateToActivityInsertView.call(App, {"id": this.id});
            },
            icon: 'content/images/icons/job_24.png',
            name: 'schedule',
            scope: this,
            title: this.fbarScheduleTitleText
        }];
    },
    createLayout: function() {
        return this.layout || (this.layout = [
            {
                label: this.ticketIdText,
                name: 'TicketNumber'
            },
            {
                label: this.accountText,
                name: 'Account.AccountName'
            },
            {
                label: this.contactText,
                name: 'Contact.NameLF'
            },
            {
                label: this.contractText,
                name: 'Contract.ReferenceNumber'
            },
            {
                label: this.areaText,
                name: 'Area'
            },
            {
                label: this.categoryText,
                name: 'Category'
            },
            {
                label: this.issueText,
                name: 'Issue'
            },
            {
                label: this.sourceText,
                name: 'ViaCode'
            },
            {
                label: this.statusText,
                name: 'StatusCode'
            },
            {
                label: this.urgencyText,
                name: 'UrgencyCode'
            },
            {
                label: this.needByText,
                name: 'NeededByDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                label: this.assignedDateText,
                name: 'AssignedDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                label: this.assignedToText,
                name: 'AssignedTo.OwnerDescription'
            },
            {
                label: this.subjectText,
                name: 'Subject'
            },
            {
                label: this.descriptionText,
                name: 'TicketProblem.Notes'
            },
            {
                label: this.resolutionText,
                name: 'TicketSolution.Notes'
            },
            {
                label: this.notesText,
                name: 'Notes'
            },
            {
                options: {
                    list: true,
                    title: this.relatedItemsText
                },
                as: [{
                    icon: 'content/images/icons/job_24.png',
                    label: this.relatedActivitiesText,
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(
                        this, ['TicketId eq "{0}"'], true
                    )
                }]
            }
        ]);
    }
});