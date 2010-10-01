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
    contractText: ' ',
    sourceText: 'source',
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
    descriptionText: 'desc',
    resolutionText: 'resolution',
    constructor: function(o) {
        Mobile.SalesLogix.Ticket.Edit.superclass.constructor.call(this);

       Ext.apply(this, o, {
            id: 'ticket_edit',
            title: this.titleText,
            resourceKind: 'tickets',
            entityName: 'Ticket'
        });

        var filterByAccountId = function(view) {
            var accId;

            if (view && view.fields['Account'].selected !== false)
            {
                accId = view.fields['Account'].selected.key;
                return "Account.Id eq '" + accId + "'";
            }
            return false;
        };

        this.layout = [
            {name: 'TicketNumber', label: this.ticketIdText,type: 'text', readonly: true},
            {name: 'Account', label: this.accountText, type: 'lookup', view: 'acc_list', keyProperty: '$key', textProperty: 'AccountName'},
            {name: 'Contact', label: this.contactText, type: 'lookup', view: 'con_list', keyProperty: '$key', textProperty: 'NameLF', where: filterByAccountId},
            //{name: 'Contract', label: this.contractText, type: 'lookup', view: 'con_list', keyProperty: '$key', textProperty: 'NameLF', where: new Simplate(['name eq "Account {%= Type %}"'])},
            {name: 'Area', label: this.areaText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "Ticket Area"', title: 'Ticket Area', orderBy: 'sort asc'},
            {name: 'Category', label: this.categoryText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "Ticket Category"', title: 'Ticket Category'},
            {name: 'Issue', label: this.issueText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "Ticket Issue"', title: 'Ticket Issue'},
            {name: 'Source', label: this.sourceText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "Source"', title: 'Source', orderBy: 'sort asc'},
            {name: 'StatusCode', label: this.statusText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "Ticket Status"', title: 'Ticket Status', orderBy: 'sort asc'},
            {name: 'UrgencyCode', label: this.urgencyText, type: 'picklist', view: 'pick_list', resourcePredicate: 'name eq "TicketUrgency"', title: 'Ticket Urgency'},
            {name: 'NeededByDate', label: this.needbyText, renderer: Mobile.SalesLogix.Format.date,type: 'text'},
            {name: 'AssignedDate', label: this.assignedDateText, renderer: Mobile.SalesLogix.Format.date,type: 'text'},
            {name: 'AssignedTo', label: this.assignedToText,type: 'lookup', view: 'owner_list', keyProperty: '$key', textProperty: 'OwnerDescription'},
            {name: 'Subject', label: this.subjectText,type: 'text'},
            {name: 'Description', label: this.descriptionText, type: 'text'},
            {name: 'Resolution', label: this.resolutionText, type: 'text'},
            {name: 'Notes', label: this.notesText, type: 'text'},
        ];
    },
    init: function() {
        Mobile.SalesLogix.Ticket.Edit.superclass.init.call(this);
    },
    createRequest: function() {
        return Mobile.SalesLogix.Ticket.Edit.superclass.createRequest.call(this) 
            .setResourceKind(this.resourceKind)
            .setQueryArgs({
                'include': 'Account,Contact,AssignedTo,AccountManager/UserInfo,Owner',
                'select': [
                    'TicketNumber',
                    'Account/AccountName',
                    'Contact/NameLF',
                    'Contract/*',
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
            })
    }
});