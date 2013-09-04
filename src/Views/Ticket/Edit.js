/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Ticket/Edit', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    lang,
    string,
    format,
    validator,
    ErrorManager,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.Ticket.Edit', [Edit], {
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
        insertSecurity: 'Entities/Ticket/Add',
        updateSecurity: 'Entities/Ticket/Edit',
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
            this.inherited(arguments);

            this.connect(this.fields['Account'], 'onChange', this.onAccountChange);
            this.connect(this.fields['Contact'], 'onChange', this.onContactChange);
            this.connect(this.fields['Urgency'], 'onChange', this.onUrgencyChange);
            this.connect(this.fields['Area'], 'onChange', this.onAreaChange);
            this.connect(this.fields['Category'], 'onChange', this.onCategoryChange);
        },
        processTemplateEntry: function(entry) {
            this.inherited(arguments);

            if (entry['StatusCode']) {
                this.requestCodeData('name eq "Ticket Status"', entry['StatusCode'], this.fields['StatusCode']);
            }
        },
        createPicklistRequest: function(name) {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService())
                .setResourceKind('picklists')
                .setContractName('system');

            var uri = request.getUri();
            uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
            uri.setCollectionPredicate(name);

            request.allowCacheUse = true;
            return request;
        },
        requestCodeData: function(picklistName, code, field) {
            var request = this.createPicklistRequest(picklistName);
            request.read({
                success: lang.hitch(this, this.onRequestCodeDataSuccess, code, field),
                failure: this.onRequestCodeDataFailure,
                scope: this
            });
        },
        onRequestCodeDataSuccess: function(code, field, feed) {
            var value = this.processCodeDataFeed(feed, code);
            field.setValue(code);
            field.setText(value);
        },
        onRequestCodeDataFailure: function(response, o) {
            ErrorManager.addError(response, o, this.options, 'failure');
        },
        processCodeDataFeed: function(feed, currentValue, options) {
            var keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
            var textProperty = options && options.textProperty ? options.textProperty : 'text';

            for (var i = 0; i < feed.$resources.length; i++) {
                if (feed.$resources[i][keyProperty] === currentValue) {
                    return feed.$resources[i][textProperty];
                }
            }

            return currentValue;
        },

        setValues: function(entry) {
            this.inherited(arguments);

            if (entry['SourceText']) {
                this.fields['ViaCode'].setText(entry['SourceText']);
            }

            if (entry['Status']) {
                this.fields['StatusCode'].setText(entry['Status']);
            }
        },
        onUrgencyChange: function(value, field) {
            var selection = field.getSelection();
            if (selection) {
                this.fields['UrgencyCode'].setValue(selection['UrgencyCode']);
            }
        },
        onContactChange: function(value, field) {
            var selection = field.getSelection(),
                accountField = this.fields['Account'];

            if (selection && selection['Account'] && !accountField.getValue()) {
                accountField.setValue({
                    '$key': selection['Account']['$key'],
                    'AccountName': selection['Account']['AccountName']
                });
            }
        },
        onAccountChange: function(value, field) {
            var selection = field.getSelection();

            if (selection && selection['$key']) {
                var request = new Sage.SData.Client.SDataResourcePropertyRequest(this.getService())
                    .setResourceKind('accounts')
                    .setResourceSelector(string.substitute("'${0}'", [selection['$key']]))
                    .setResourceProperty('Contacts')
                    .setQueryArg('count', 1)
                    .setQueryArg('select', 'NameLF')
                    .setQueryArg('where', 'IsPrimary eq true');

                request.readFeed({
                    success: function(feed) {
                        if (feed && feed['$resources']) {
                            this.fields['Contact'].setValue(feed['$resources'][0]);
                        }
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

            return key ? string.substitute('Account.id eq "${0}"', [key]) : false;
        },
        applyContext: function() {
            var found = App.queryNavigationContext(function(o) {
                return (/^(accounts|contacts)$/).test(o.resourceKind) && o.key;
            });

            var lookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext
            };

            if (found && lookup[found.resourceKind]) {
                lookup[found.resourceKind].call(this, found);
            }
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            var accountField = this.fields['Account'];
            accountField.setValue(entry);
            this.onAccountChange(entry, accountField);
        },
        applyContactContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            var accountField = this.fields['Account'];
            accountField.setValue(entry.Account);
            this.onAccountChange(entry.Account, accountField);

            this.fields['Contact'].setValue(entry);
        },
        formatCategoryQuery: function(value) {
            return {
                'Area': value // dependent value
            };
        },
        formatIssueQuery: function(value) {
            return {
                'Area': this.fields['Area'].getValue(),
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
                    property: 'Account',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    requireSelection: true,
                    validator: validator.exists,
                    view: 'account_related'
                },
                {
                    label: this.contactText,
                    name: 'Contact',
                    property: 'Contact',
                    textProperty: 'NameLF',
                    type: 'lookup',
                    requireSelection: true,
                    validator: validator.exists,
                    view: 'contact_related',
                    where: this.formatAccountQuery.bindDelegate(this)
                },
                {
                    label: this.contractText,
                    name: 'Contract',
                    property: 'Contract',
                    textProperty: 'ReferenceNumber',
                    type: 'lookup',
                    requireSelection: true,
                    view: 'contract_related',
                    where: this.formatAccountQuery.bindDelegate(this)
                },
                {
                    label: this.areaText,
                    name: 'Area',
                    property: 'Area',
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
                    property: 'Category',
                    title: this.ticketCategoryTitleText,
                    type: 'lookup',
                    requireSelection: true,
                    dependsOn: 'Area',
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    where: this.formatCategoryQuery.bindDelegate(this),
                    view: 'areacategoryissue_lookup'
                },
                {
                    label: this.issueText,
                    name: 'Issue',
                    property: 'Issue',
                    title: this.ticketIssueTitleText,
                    type: 'lookup',
                    requireSelection: true,
                    dependsOn: 'Category',
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    where: this.formatIssueQuery.bindDelegate(this),
                    view: 'areacategoryissue_lookup'
                },
                {
                    label: this.sourceText,
                    name: 'ViaCode',
                    property: 'ViaCode',
                    picklist: 'Source',
                    requireSelection: true,
                    storageMode: 'id',
                    title: this.sourceTitleText,
                    type: 'picklist'
                },
                {
                    label: this.statusText,
                    name: 'StatusCode',
                    property: 'StatusCode',
                    picklist: 'Ticket Status',
                    requireSelection: true,
                    storageMode: 'id',
                    title: this.ticketStatusTitleText,
                    type: 'picklist'
                },
                {
                    name: 'UrgencyCode',
                    property: 'UrgencyCode',
                    type: 'hidden'
                },
                {
                    label: this.urgencyText,
                    name: 'Urgency',
                    property: 'Urgency',
                    title: this.ticketUrgencyTitleText,
                    requireSelection: true,
                    textProperty: 'Description',
                    type: 'lookup',
                    view: 'urgency_list'
                },
                {
                    label: this.needByText,
                    name: 'NeededByDate',
                    property: 'NeededByDate',
                    renderer: format.date,
                    type: 'date'
                },
                {
                    label: this.assignedDateText,
                    name: 'AssignedDate',
                    property: 'AssignedDate',
                    renderer: format.date,
                    type: 'date'
                },
                {
                    label: this.assignedToText,
                    name: 'AssignedTo',
                    property: 'AssignedTo',
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    view: 'owner_list'
                },
                {
                    label: this.subjectText,
                    name: 'Subject',
                    property: 'Subject',
                    type: 'text'
                },
                {
                    name: 'TicketProblem.$key',
                    property: 'TicketProblem.$key',
                    type: 'hidden',
                    include: this.includeIfValueExists
                },
                {
                    label: this.descriptionText,
                    name: 'TicketProblem',
                    property: 'TicketProblem',
                    title: this.descriptionTitleText,
                    type: 'note',
                    view: 'text_edit'
                },
                {
                    name: 'TicketSolution.$key',
                    property: 'TicketSolution.$key',
                    type: 'hidden',
                    include: this.includeIfValueExists
                },
                {
                    label: this.resolutionText,
                    name: 'TicketSolution',
                    property: 'TicketSolution',
                    title: this.resolutionTitleText,
                    type: 'note',
                    view: 'text_edit'
                },
                {
                    label: this.notesText,
                    name: 'Notes',
                    property: 'Notes',
                    noteProperty: false,
                    title: this.notesTitleText,
                    type: 'note',
                    view: 'text_edit'
                }
            ]);
        }
    });
});

