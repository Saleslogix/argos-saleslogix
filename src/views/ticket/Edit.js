/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

(function() {
    Mobile.SalesLogix.Ticket.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        id: 'ticket_edit',
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
        needByText: 'needed date',
        relatedItemsText: 'Related Items',
        relatedActivitiesText: 'Activities',
        assignedToText: 'assigned to',
        descriptionText: 'desc',
        resolutionText: 'resolution',
        ticketAreaTitleText: 'Ticket Area',
        ticketCategoryTitleText: 'Ticket Category',
        ticketIssueTitleText: 'Ticket Issue',
        ticketStatusTitleText: 'Ticket Status',
        ticketUrgencyTitleText: 'Ticket Urgency',
        sourceTitleText: 'Source',
        resourceKind: 'tickets',
        entityName: 'Ticket',
        queryInclude: [
            'Account',
            'Contact',
            'AssignedTo',
            'AccountManager/UserInfo',
            'Owner'
        ],
        querySelect: [
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
        ],
        formatAccountQuery: function() {
            var value = this.fields['Account'].getValue(),
                key = value && value['$key'];

            return key ? String.format('Account.id eq "{0}"', key) : false;
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'TicketNumber', label: this.ticketIdText,type: 'text', readonly: true},
                {name: 'Account', label: this.accountText, type: 'lookup', view: 'account_lookup', textProperty: 'AccountName'},
                {name: 'Contact', label: this.contactText, type: 'lookup', view: 'contact_lookup', textProperty: 'NameLF', where: this.formatAccountQuery.createDelegate(this)},
                {name: 'Area', label: this.areaText, type: 'picklist', picklist: 'Ticket Area', title: 'Ticket Area'},
                {name: 'Category', label: this.categoryText, type: 'picklist', picklist: 'Ticket Category', title: this.ticketCategoryTitleText},
                {name: 'Issue', label: this.issueText, type: 'picklist', picklist: 'Ticket Issue', title: this.ticketIssueTitleText},
                {name: 'Source', label: this.sourceText, type: 'picklist', picklist: 'Source', title: this.sourceTitleText},
                {name: 'StatusCode', label: this.statusText, type: 'picklist', picklist: 'Ticket Status', title: this.ticketStatusTitleText},
                // todo: there is no Ticket Urgency picklist
                {name: 'UrgencyCode', label: this.urgencyText, type: 'picklist', picklist: 'Ticket Urgency', title: this.ticketUrgencyTitleText},
                {name: 'NeededByDate', label: this.needByText, renderer: Mobile.SalesLogix.Format.date, type: 'date'},
                {name: 'AssignedDate', label: this.assignedDateText, renderer: Mobile.SalesLogix.Format.date, type: 'date'},
                {name: 'AssignedTo', label: this.assignedToText,type: 'lookup', view: 'owner_list', textProperty: 'OwnerDescription'},
                {name: 'Subject', label: this.subjectText,type: 'text'},
                {name: 'Description', label: this.descriptionText, type: 'text'},
                {name: 'Resolution', label: this.resolutionText, type: 'text'},
                {name: 'Notes', label: this.notesText, type: 'text'}
            ]);
        }
    });
})();