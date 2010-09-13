/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

Mobile.SalesLogix.Ticket.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
    titleText: 'Ticket',
    ticketIdText: 'ticket number',
    accountText: 'acct name',
    contactText: 'contact',
    phoneText: 'phone',
    subjectText: 'subject',
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
        Mobile.SalesLogix.Ticket.Edit.superclass.constructor.call(this);

       Ext.apply(this, o, {
            id: 'ticket_edit',
            title: this.titleText,
            resourceKind: 'tickets',
            entityName: 'Ticket'
        });

        this.layout = [
            {name: 'TicketNumber', label: this.ticketIdText,type: 'text'},
            {name: 'Account', label: this.accountText, type: 'lookup', view: 'acc_list', keyProperty: '$key', textProperty: 'AccountName'},
            {name: 'Contact', label: this.contactText, type: 'lookup', view: 'con_list', keyProperty: '$key', textProperty: 'NameLF', where: new Simplate(['name eq "Account {%= Type %}"']},
            {name: 'Area', label: this.areaText,type: 'text'},
            {name: 'Category', label: this.categoryText,type: 'text'},
            {name: 'Issue', label: this.issueText,type: 'text'},
            {name: 'StatusCode', label: this.statusText, type: 'pickup', view: 'pick_list', resourcePredicate: 'name eq "Ticket Status"', title: 'Ticket Status'},
            {name: 'UrgencyCode', label: this.urgencyText,type: 'text'},
            {name: 'NeededByDate', label: this.needbyText, renderer: Mobile.SalesLogix.Format.date,type: 'text'},
            {name: 'AssignedDate', label: this.assignedDateText, renderer: Mobile.SalesLogix.Format.date,type: 'text'},
            {name: 'AssignedTo', label: this.assignedToText,type: 'lookup', view: 'owner_list', keyProperty: '$key', textProperty: 'OwnerDescription'},
            {name: 'Subject', label: this.subjectText,type: 'text'},
            {name: 'Notes', label: this.notesText,type: 'text'},
        ];
    },
    init: function() {
        Mobile.SalesLogix.Ticket.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Ticket.Edit.superclass.createRequest.call(this) 
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'select': [
                    'TicketNumber',
                    'Subject',
                    'Area',
                    'Category',
                    'Issue'
                 ]
            })
    }
});