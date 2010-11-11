/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

(function() {
    Mobile.SalesLogix.Ticket.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
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

        //View Properties
        entityName: 'Ticket',
        id: 'ticket_edit',
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
            'ViaCode',
            'StatusCode',
            'Subject',
            'TicketNumber',
            'UrgencyCode'
        ],
        resourceKind: 'tickets',

        formatAccountQuery: function() {
            var value = this.fields['Account'].getValue(),
                key = value && value['$key'];

            return key ? String.format('Account.id eq "{0}"', key) : false;
        },
        show: function(options) {
            Mobile.SalesLogix.Ticket.Edit.superclass.show.apply(this, arguments);

            if (options.insert === true) this.applyContext();
        },
        applyContext: function() {
            var found = App.queryNavigationContext(function(o) {
                return /^(accounts|contacts)$/.test(o.resourceKind) && o.key;
            });

            var lookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext
            };

            if (found && lookup[found.resourceKind]) lookup[found.resourceKind].call(this, found);
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            this.fields['Account'].setValue(entry);
        },
        applyContactContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            this.fields['Account'].setValue(entry.Account);
            this.fields['Contact'].setValue(entry);
        },
        formatCategoryQuery: function(value) {
            return {
                'Area': value // dependent value
            };
        },
        formatIssueQuery: function(value) {
            return {
                'Area': this.fields['Area'].getValue(), // todo: find a better way?
                'Category': value // dependent value
            };
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.ticketIdText,
                    name: 'TicketNumber',
                    type: 'text',
                    readonly: true
                },
                {
                    label: this.accountText,
                    name: 'Account',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'account_lookup'
                },
                {
                    label: this.contactText,
                    name: 'Contact',
                    textProperty: 'NameLF',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'contact_lookup',
                    where: this.formatAccountQuery.createDelegate(this)
                },
                {
                    label: this.areaText,
                    name: 'Area',
                    title: this.ticketAreaTitleText,
                    type: 'lookup',
                    requireSelection: true,
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    view: 'areacategoryissue_lookup'
                },
                {
                    label: this.categoryText,
                    name: 'Category',
                    title: this.ticketCategoryTitleText,
                    type: 'lookup',
                    requireSelection: true,
                    dependsOn: 'Area',
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    where: this.formatCategoryQuery.createDelegate(this),
                    view: 'areacategoryissue_lookup'
                },
                {
                    label: this.issueText,
                    name: 'Issue',
                    title: this.ticketIssueTitleText,
                    type: 'lookup',
                    requireSelection: true,
                    dependsOn: 'Category',
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    where: this.formatIssueQuery.createDelegate(this),
                    view: 'areacategoryissue_lookup'
                },
                {
                    label: this.sourceText,
                    name: 'ViaCode',
                    picklist: 'Source',
                    requireSelection: true,
                    storageMode: 'id',
                    title: this.sourceTitleText,
                    type: 'picklist'
                },
                {
                    label: this.statusText,
                    name: 'StatusCode',
                    picklist: 'Ticket Status',
                    requireSelection: true,
                    storageMode: 'code',
                    title: this.ticketStatusTitleText,
                    type: 'picklist'
                },
                // todo: there is no Ticket Urgency picklist
                {
                    label: this.urgencyText,
                    name: 'UrgencyCode',
                    picklist: 'Ticket Urgency',
                    title: this.ticketUrgencyTitleText,
                    type: 'picklist'
                },
                {
                    label: this.needByText,
                    name: 'NeededByDate',
                    renderer: Mobile.SalesLogix.Format.date,
                    type: 'date'
                },
                {
                    label: this.assignedDateText,
                    name: 'AssignedDate',
                    renderer: Mobile.SalesLogix.Format.date,
                    type: 'date'
                },
                {
                    label: this.assignedToText,
                    name: 'AssignedTo',
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    view: 'owner_list'
                },
                {
                    label: this.subjectText,
                    name: 'Subject',
                    type: 'text'
                },
                {
                    label: this.descriptionText,
                    name: 'Description',
                    type: 'text'
                },
                {
                    label: this.resolutionText,
                    name: 'Resolution',
                    type: 'text'
                },
                {
                    label: this.notesText,
                    name: 'Notes',
                    type: 'text'
                }
            ]);
        }
    });
})();