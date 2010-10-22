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
        accountText: 'acct name',
        areaText: 'area',
        assignedDateText: 'assigned date',
        assignedToText: 'assigned to',
        categoryText: 'category',
        contactText: 'contact',
        contractText: ' ',
        descriptionText: 'desc',
        issueText: 'issue',
        needByText: 'needed date',
        notesText: 'comments',
        phoneText: 'phone',
        relatedActivitiesText: 'Activities',
        relatedItemsText: 'Related Items',
        resolutionText: 'resolution',
        sourceText: 'source',
        sourceTitleText: 'Source',
        statusText: 'status',
        subjectText: 'subject',
        ticketAreaTitleText: 'Ticket Area',
        ticketCategoryTitleText: 'Ticket Category',
        ticketIdText: 'ticket number',
        ticketIssueTitleText: 'Ticket Issue',
        ticketStatusTitleText: 'Ticket Status',
        ticketUrgencyTitleText: 'Ticket Urgency',
        titleText: 'Ticket',
        urgencyText: 'urgency',
        resourceKind: 'tickets',
        entityName: 'Ticket',
        querySelect: [
            'Account/AccountName',
            'Area',
            'AssignedDate',
            'AssignedTo/OwnerDescription',
            'Category',
            'Contact/NameLF',
            'Contract/*',
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
        formatAccountQuery: function() {
            var value = this.fields['Account'].getValue(),
                key = value && value['$key'];

            return key ? String.format('Account.id eq "{0}"', key) : false;
        },
        setValues: function() {
            Mobile.SalesLogix.Ticket.Edit.superclass.setValues.apply(this, arguments);

            var contexts = ['accounts', 'contacts'],
                primaryContext = App.queryNavigationContext(function(){return true}, 1),
                secondaryContext = App.getMatchingContext(contexts), entry;

            if (!secondaryContext) return;

            entry = App.getView(secondaryContext.id).entry;

            if (entry && secondaryContext.resourceKind === 'accounts')
            {
                this.applyAccountContext(entry);
            }
            else if (entry && secondaryContext.resourceKind === 'contacts')
            {
                this.applyContactContext(entry);
            }
        },
        applyAccountContext: function(entry) {
            this.fields['Account'].setValue(entry);
        },
        applyContactContext: function(entry) {
            this.fields['Account'].setValue(entry.Account);
            this.fields['Contact'].setValue(entry);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'TicketNumber',
                    label: this.ticketIdText,
                    type: 'text',
                    readonly: true
                },
                {
                    name: 'Account',
                    label: this.accountText,
                    type: 'lookup',
                    view: 'account_lookup',
                    textProperty: 'AccountName'
                },
                {
                    name: 'Contact',
                    label: this.contactText,
                    type: 'lookup',
                    view: 'contact_lookup',
                    textProperty: 'NameLF',
                    where: this.formatAccountQuery.createDelegate(this)
                },
                {
                    name: 'Area',
                    label: this.areaText,
                    type: 'picklist',
                    picklist: 'Ticket Area',
                    title: 'Ticket Area'
                },
                {
                    name: 'Category',
                    label: this.categoryText,
                    type: 'picklist',
                    picklist: 'Ticket Category',
                    title: this.ticketCategoryTitleText
                },
                {
                    name: 'Issue',
                    label: this.issueText,
                    type: 'picklist',
                    picklist: 'Ticket Issue',
                    title: this.ticketIssueTitleText
                },
                {
                    name: 'Source',
                    label: this.sourceText,
                    type: 'picklist',
                    picklist: 'Source',
                    title: this.sourceTitleText
                },
                {
                    name: 'StatusCode',
                    label: this.statusText,
                    type: 'picklist',
                    picklist: 'Ticket Status',
                    title: this.ticketStatusTitleText,
                    storageMode: 'code'
                },
                // todo: there is no Ticket Urgency picklist
                {
                    name: 'UrgencyCode',
                    label: this.urgencyText,
                    type: 'picklist',
                    picklist: 'Ticket Urgency',
                    title: this.ticketUrgencyTitleText
                },
                {
                    name: 'NeededByDate',
                    label: this.needByText,
                    renderer: Mobile.SalesLogix.Format.date,
                    type: 'date'
                },
                {
                    name: 'AssignedDate',
                    label: this.assignedDateText,
                    renderer: Mobile.SalesLogix.Format.date,
                    type: 'date'
                },
                {
                    name: 'AssignedTo',
                    label: this.assignedToText,
                    type: 'lookup',
                    view: 'owner_list',
                    textProperty: 'OwnerDescription'
                },
                {
                    name: 'Subject',
                    label: this.subjectText,
                    type: 'text'
                },
                {
                    name: 'Description',
                    label: this.descriptionText,
                    type: 'text'
                },
                {
                    name: 'Resolution',
                    label: this.resolutionText,
                    type: 'text'
                },
                {
                    name: 'Notes',
                    label: this.notesText,
                    type: 'text'
                }
            ]);
        }
    });
})();