/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/History/Detail', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/dom-class',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/ErrorManager',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Detail',
    'dojo/NodeList-manipulate'
], function(
    declare,
    string,
    lang,
    query,
    domClass,
    format,
    ErrorManager,
    template,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.History.Detail', [Detail], {
        //Templates
        createUserTemplate: template.nameLF,

        //Localization
        categoryText: 'category',
        completedText: 'completed',
        durationText: 'duration',
        leaderText: 'leader',
        longNotesText: 'notes',
        notesText: 'Notes',
        priorityText: 'priority',
        regardingText: 'regarding',
        completedByText: 'completed by',
        scheduledText: 'scheduled',
        timelessText: 'timeless',
        companyText: 'company',
        leadText: 'lead',
        titleText: 'History',
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        moreDetailsText: 'More Details',
        relatedItemsText: 'Related Items',
        relatedAttachmentText: 'Attachments',
        relatedAttachmentTitleText: 'History Attachments',
        modifiedText: 'modified',
        typeText: 'type',
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity',
            'atQuestion': 'Question',
            'atEMail': 'E-mail'
        },
        //View Properties
        id: 'history_detail',
        existsRE: /^[\w]{12}$/,
        editView: 'history_edit',
        dateFormatText: 'M/D/YYYY h:mm:ss A',
        resourceKind: 'history',
        security: null, //'Entities/History/View',
        querySelect: [
            'AccountId',
            'AccountName',
            'Category',
            'ModifyDate',
            'CompletedDate',
            'ContactId',
            'ContactName',
            'CompletedUser',
            'Description',
            'Duration',
            'Notes',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'Priority',
            'StartDate',
            'TicketId',
            'TicketNumber',
            'LeadId',
            'LeadName',
            'Timeless',
            'Type',
            'UserName'
        ],

        formatActivityType: function(val) {
            return this.activityTypeText[val] || val;
        },
        isHistoryForLead: function(entry) {
            return this.existsRE.test(entry && entry['LeadId']);
        },
        isHistoryForActivity: function(entry) {
            return this.existsRE.test(entry && entry['ActivityId']);
        },
        isHistoryOfType: function(entry, type) {
            return entry && (entry['Type'] === type);
        },
        provideText: function(entry) {
            return entry && (entry['LongNotes'] || entry['Notes']);
        },
        requestCompletedUser: function(entry) {
            var request, completedUser;
            completedUser = entry['CompletedUser'];

            if (completedUser) {
                request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
                    .setResourceKind('users')
                    .setResourceSelector(string.substitute("'${0}'", [completedUser]))
                    .setQueryArg('select', [
                        'UserInfo/FirstName',
                        'UserInfo/LastName'
                    ].join(','));

                request.allowCacheUse = true;

                return request;
            }
        },
        requestCodeData: function(row, node, value, entry, predicate) {
            var request = this.requestCompletedUser(entry);
            if (request) {
                request.read({
                    success: lang.hitch(this, this.onRequestCodeDataSuccess, row, node, value, entry),
                    failure: this.onRequestCodeDataFailure,
                    scope: this
                });
            } else {
               this.onCodeDataNull();
            }
        },
        onRequestCodeDataSuccess: function(row, node, value, entry, data) {
            var codeText = entry[row.property];
            this.setNodeText(node, this.createUserTemplate.apply(data.UserInfo));
            this.entry[row.name] = codeText;
        },
        onRequestCodeDataFailure: function(response, o) {
            var rowNode = query('[data-property="CompletedUser"]');
            if (rowNode) {
                this.setNodeText(rowNode[0], this.entry['UserName']);
            }

            ErrorManager.addError(response, o, this.options, 'failure');
        },
        onCodeDataNull: function() {
            var rowNode = query('[data-property="CompletedUser"]');
            if (rowNode) {
                this.setNodeText(rowNode[0], '');
            }
        },
        setNodeText: function(node, value) {
            domClass.remove(node, 'content-loading');

            query('span', node).text(value);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            name: 'StartDate',
                            property: 'StartDate',
                            label: this.scheduledText,
                            renderer: format.date.bindDelegate(this, this.dateFormatText),
                            exclude: this.isHistoryOfType.bindDelegate(this, 'atNote')
                        }, {
                            name: 'CompletedDate',
                            property: 'CompletedDate',
                            label: this.completedText,
                            renderer: format.date.bindDelegate(this, this.dateFormatText),
                            exclude: this.isHistoryOfType.bindDelegate(this, 'atNote')
                        }, {
                            name: 'ModifyDate',
                            property: 'ModifyDate',
                            label: this.modifiedText,
                            renderer: format.date.bindDelegate(this, this.dateFormatText),
                            include: this.isHistoryOfType.bindDelegate(this, 'atNote')
                        }, {
                            name: 'Description',
                            property: 'Description',
                            label: this.regardingText
                        }, {
                            name: 'CompletedUser',
                            property: 'CompletedUser',
                            label: this.completedByText,
                            value: this.loadingText,
                            cls: 'content-loading',
                            onCreate: this.requestCodeData.bindDelegate(this)
                        }]
                }, {
                    title: this.notesText,
                    name: 'NotesSection',
                    children: [{
                        name: 'LongNotes',
                        property: 'LongNotes',
                        encode: false,
                        label: this.longNotesText,
                        provider: this.provideText.bindDelegate(this),
                        use: template.noteDetailProperty
                    }]
                }, {
                    title: this.relatedItemsText,
                    name: 'RelatedItemsSection',
                    children: [{
                            name: 'AccountName',
                            property: 'AccountName',
                            exclude: this.isHistoryForLead,
                            label: this.accountText,
                            view: 'account_detail',
                            key: 'AccountId',
                            descriptor: 'AccountName'
                        }, {
                            name: 'ContactName',
                            property: 'ContactName',
                            exclude: this.isHistoryForLead,
                            label: this.contactText,
                            view: 'contact_detail',
                            key: 'ContactId',
                            descriptor: 'ContactName'
                        }, {
                            name: 'OpportunityName',
                            property: 'OpportunityName',
                            exclude: this.isHistoryForLead,
                            label: this.opportunityText,
                            view: 'opportunity_detail',
                            key: 'OpportunityId',
                            descriptor: 'OpportunityName'
                        }, {
                            name: 'TicketNumber',
                            property: 'TicketNumber',
                            exclude: this.isHistoryForLead,
                            label: this.ticketNumberText,
                            view: 'ticket_detail',
                            key: 'TicketId',
                            descriptor: 'TicketNumber'
                        }, {
                            name: 'LeadName',
                            property: 'LeadName',
                            include: this.isHistoryForLead,
                            label: this.leadText,
                            view: 'lead_detail',
                            key: 'LeadId',
                            descriptor: 'LeadName'
                        }, {
                            name: 'AccountName',
                            property: 'AccountName',
                            include: this.isHistoryForLead,
                            label: this.companyText
                        }]
                }, {
                    title: this.relatedItemsText,
                    list: true,
                    name: 'RelatedItemsSection',
                    children: [{
                        name: 'AttachmentRelated',
                        icon: 'content/images/icons/Attachment_24.png',
                        label: this.relatedAttachmentText,
                        where: this.formatRelatedQuery.bindDelegate(this, 'historyId eq "${0}"'),// must be lower case because of feed
                        view: 'history_attachment_related',
                        title:  this.relatedAttachmentTitleText
                    }]
                }]);
        }
    });
});

