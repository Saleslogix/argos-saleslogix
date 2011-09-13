/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

(function() {
    var U = Sage.Platform.Mobile.Utility;

    Mobile.SalesLogix.Ticket.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        accountText: 'acct',
        areaText: 'area',
        assignedDateText: 'assigned date',
        assignedToText: 'assigned to',
        categoryText: 'category',
        contactText: 'contact',
        contractText: 'contract',
        descriptionText: 'desc',
        descriptionTitleText: 'Description',
        issueText: 'issue',
        needByText: 'needed date',
        notesText: 'comments',
        notesTitleText: 'Comments',
        phoneText: 'phone',
        relatedActivitiesText: 'Activities',
        relatedItemsText: 'Related Items',
        resolutionText: 'resolution',
        resolutionTitleText: 'Resolution',
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
            Mobile.SalesLogix.Ticket.Edit.superclass.init.apply(this, arguments);

            this.fields['Account'].on('change', this.onAccountChange, this);
            this.fields['Urgency'].on('change', this.onUrgencyChange, this);
            this.fields['Area'].on('change', this.onAreaChange, this);
            this.fields['Category'].on('change', this.onCategoryChange, this);
        },
        setValues: function(entry) {
            Mobile.SalesLogix.Ticket.Edit.superclass.setValues.apply(this, arguments);

            if (entry['SourceText'])
            {
                this.fields['ViaCode'].setText(entry['SourceText']);
            }

            if (entry['StatusText'])
            {
                this.fields['StatusCode'].setText(entry['StatusText']);
            }
        },
        onUrgencyChange: function(value, field) {
            var selection = field.getSelection();
            if (selection)
            {
                this.fields['UrgencyCode'].setValue(selection['UrgencyCode']);
            }
        },
        onAccountChange: function(value, field) {
            var selection = field.getSelection();
            if (selection && selection.$key)
            {
                var request = new Sage.SData.Client.SDataResourcePropertyRequest(this.getService())
                    .setResourceKind('accounts')
                    .setResourceSelector(String.format("'{0}'", selection.$key))
                    .setResourceProperty('Contacts')
                    .setQueryArg('count', 1)
                    .setQueryArg('select', 'NameLF')
                    .setQueryArg('where', 'IsPrimary eq true');

                request.readFeed({
                    success: function(feed) {
                        if (feed && feed.$resources) this.fields['Contact'].setValue(feed.$resources[0]);
                    },
                    failure: function() {
                    },
                    scope: this
                });
            }
        },
        onAreaChange: function(value, field) {
            this.fields['Issue'].clearValue();
            this.fields['Category'].clearValue();
        },
        onCategoryChange: function(value, field) {
            this.fields['Issue'].clearValue();
        },
        formatAccountQuery: function() {
            var value = this.fields['Account'].getValue(),
                key = value && value['$key'];

            return key ? String.format('Account.id eq "{0}"', key) : false;
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
        includeIfValueExists: function(value) {
            return value;
        },
        createLayout: function() {
            return this.layout || (this.layout = [                
                {
                    label: this.accountText,
                    name: 'Account',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    requireSelection: true,
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'account_related'
                },
                {
                    label: this.contactText,
                    name: 'Contact',
                    textProperty: 'NameLF',
                    type: 'lookup',
                    requireSelection: true,
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'contact_related',
                    where: this.formatAccountQuery.createDelegate(this)
                },
                {
                    label: this.contractText,
                    name: 'Contract',
                    textProperty: 'ReferenceNumber',
                    type: 'lookup',
                    requireSelection: true,
                    view: 'contract_related',
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
                    storageMode: 'id',
                    title: this.ticketStatusTitleText,
                    type: 'picklist'
                },
                {
                    name: 'UrgencyCode',
                    type: 'hidden'
                },
                {
                    label: this.urgencyText,
                    name: 'Urgency',
                    title: this.ticketUrgencyTitleText,
                    requireSelection: true,
                    textProperty: 'Description',
                    type: 'lookup',
                    view: 'urgency_list'
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
                    name: 'TicketProblem.$key',
                    type: 'hidden',
                    include: this.includeIfValueExists
                },
                {
                    label: this.descriptionText,
                    name: 'TicketProblem',
                    title: this.descriptionTitleText,
                    type: 'note',
                    view: 'text_edit'
                },
                {
                    name: 'TicketSolution.$key',
                    type: 'hidden',
                    include: this.includeIfValueExists
                },
                {
                    label: this.resolutionText,
                    name: 'TicketSolution',
                    title: this.resolutionTitleText,
                    type: 'note',
                    view: 'text_edit'
                },
                {
                    label: this.notesText,
                    name: 'Notes',
                    noteProperty: false,
                    title: this.notesTitleText,
                    type: 'note',
                    view: 'text_edit'
                }
            ]);
        }
    });
})();