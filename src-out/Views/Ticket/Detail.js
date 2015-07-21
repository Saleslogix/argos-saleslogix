/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.Ticket.Detail
 *
 * @extends argos.Detail
 *
 * @requires argos.ErrorManager
 *
 * @requires crm.Format
 */
define('crm/Views/Ticket/Detail', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/dom-class',
    '../../Format',
    'argos/ErrorManager',
    'argos/Detail'
], function(
    declare,
    lang,
    query,
    domClass,
    format,
    ErrorManager,
    Detail
) {

    var __class = declare('crm.Views.Ticket.Detail', [Detail], {
        //Localization
        accountText: 'account',
        areaText: 'area',
        assignedDateText: 'assigned date',
        assignedToText: 'assigned to',
        completedByText: 'completed by',
        categoryText: 'category',
        contactText: 'contact',
        contractText: 'contract',
        descriptionText: 'desc',
        issueText: 'issue',
        needByText: 'needed date',
        notesText: 'comments',
        phoneText: 'phone',
        actionsText: 'Quick Actions',
        relatedAttachmentText: 'Attachments',
        relatedAttachmentTitleText: 'Ticket Attachments',
        relatedActivitiesText: 'Activities',
        relatedItemsText: 'Related Items',
        resolutionText: 'resolution',
        sourceText: 'source',
        statusText: 'status',
        subjectText: 'subject',
        ticketIdText: 'ticket number',
        titleText: 'Ticket',
        urgencyText: 'urgency',
        scheduleActivityText: 'Schedule activity',
        moreDetailsText: 'More Details',
        relatedTicketActivitiesText: 'Ticket Activities',
        loadingText: 'loading...',

        //View Properties
        id: 'ticket_detail',
        editView: 'ticket_edit',
        security: 'Entities/Ticket/View',
        querySelect: [
            'Account/AccountName',
            'Account/MainPhone',
            'Area',
            'AssignedDate',
            'AssignedTo/OwnerDescription',
            'Category',
            'Contact/NameLF',
            'Contact/WorkPhone',
            'Contract/ReferenceNumber',
            'Issue',
            'NeededByDate',
            'Notes',
            'ViaCode',
            'StatusCode',
            'UrgencyCode',
            'Subject',
            'TicketNumber',
            'TicketProblem/Notes',
            'TicketSolution/Notes',
            'Urgency/Description',
            'Urgency/UrgencyCode',
            'CompletedBy/OwnerDescription'
        ],
        resourceKind: 'tickets',

        scheduleActivity: function() {
            App.navigateToActivityInsertView();
        },

        createPicklistRequest: function(predicate) {
            var request,
                uri;

            request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService())
                .setResourceKind('picklists')
                .setContractName('system');
            uri = request.getUri();

            uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
            uri.setCollectionPredicate(predicate);

            request.allowCacheUse = true;

            return request;
        },

        requestCodeData: function(row, node, value, entry, predicate) {
            var request = this.createPicklistRequest(predicate);
            request.read({
                success: lang.hitch(this, this.onRequestCodeDataSuccess, row, node, value, entry),
                failure: this.onRequestCodeDataFailure,
                scope: this
            });
        },

        onRequestCodeDataSuccess: function(row, node, value, entry, data) {
            var codeText = this.processCodeDataFeed(data, entry[row.property]);
            this.setNodeText(node, codeText);
            this.entry[row.name] = codeText;
        },

        onRequestCodeDataFailure: function(response, o) {
            ErrorManager.addError(response, o, this.options, 'failure');
        },

        processCodeDataFeed: function(feed, currentValue, options) {
            var keyProperty,
                textProperty,
                i;

            keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
            textProperty = options && options.textProperty ? options.textProperty : 'text';

            for (i = 0; i < feed.$resources.length; i++) {
                if (feed.$resources[i][keyProperty] === currentValue) {
                    return feed.$resources[i][textProperty];
                }
            }

            return currentValue;
        },
        setNodeText: function(node, value) {
            domClass.remove(node, 'content-loading');

            query('span', node).text(value);
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                    list: true,
                    title: this.actionsText,
                    cls: 'action-list',
                    name: 'QuickActionsSection',
                    children: [{
                        name: 'ScheduleActivityAction',
                        property: 'TicketNumber',
                        label: this.scheduleActivityText,
                        iconClass: 'fa fa-calendar fa-lg',
                        action: 'scheduleActivity'
                    }]
                }, {
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            name: 'Account.AccountName',
                            property: 'Account.AccountName',
                            descriptor: 'Account.AccountName',
                            label: this.accountText,
                            view: 'account_detail',
                            key: 'Account.$key'
                        }, {
                            name: 'Contact.NameLF',
                            property: 'Contact.NameLF',
                            descriptor: 'Contact.NameLF',
                            label: this.contactText,
                            view: 'contact_detail',
                            key: 'Contact.$key'
                        }, {
                            label: this.assignedToText,
                            name: 'AssignedTo.OwnerDescription',
                            property: 'AssignedTo.OwnerDescription'
                        }, {
                            label: this.urgencyText,
                            name: 'Urgency.Description',
                            property: 'Urgency.Description'
                        }, {
                            label: this.needByText,
                            name: 'NeededByDate',
                            property: 'NeededByDate',
                            renderer: format.date
                        }]
                }, {
                    title: this.moreDetailsText,
                    name: 'MoreDetailsSection',
                    collapsed: true,
                    children: [{
                            label: this.areaText,
                            name: 'Area',
                            property: 'Area'
                        }, {
                            label: this.categoryText,
                            name: 'Category',
                            property: 'Category'
                        }, {
                            label: this.issueText,
                            name: 'Issue',
                            property: 'Issue'
                        }, {
                            label: this.subjectText,
                            name: 'Subject',
                            property: 'Subject'
                        }, {
                            label: this.descriptionText,
                            name: 'TicketProblem.Notes',
                            property: 'TicketProblem.Notes'
                        }, {
                            label: this.statusText,
                            cls: 'content-loading',
                            value: this.loadingText,
                            name: 'StatusCode',
                            property: 'StatusCode',
                            onCreate: this.requestCodeData.bindDelegate(this, 'name eq "Ticket Status"')
                        }, {
                            label: this.completedByText,
                            name: 'CompletedBy.OwnerDescription',
                            property: 'CompletedBy.OwnerDescription'
                        }, {
                            label: this.contractText,
                            name: 'Contract.ReferenceNumber',
                            property: 'Contract.ReferenceNumber'
                        }, {
                            label: this.sourceText,
                            name: 'ViaCode',
                            property: 'ViaCode',
                            value: this.loadingText,
                            cls: 'content-loading',
                            onCreate: this.requestCodeData.bindDelegate(this, 'name eq "Source"')
                        }, {
                            label: this.assignedDateText,
                            name: 'AssignedDate',
                            property: 'AssignedDate',
                            renderer: format.date
                        }, {
                            label: this.resolutionText,
                            name: 'TicketSolution.Notes',
                            property: 'TicketSolution.Notes'
                        }, {
                            label: this.notesText,
                            name: 'Notes',
                            property: 'Notes'
                        }]
                }, {
                    list: true,
                    title: this.relatedItemsText,
                    name: 'RelatedItemsSection',
                    children: [{
                            name: 'ActivityRelated',
                            label: this.relatedActivitiesText,
                            view: 'activity_related',
                            where: this.formatRelatedQuery.bindDelegate(this, 'TicketId eq "${0}"')
                        }, {
                            name: 'TicketActivityRelated',
                            label: this.relatedTicketActivitiesText,
                            view: 'ticketactivity_related',
                            where: this.formatRelatedQuery.bindDelegate(this, 'Ticket.Id eq "${0}"')
                        }, {
                            name: 'AttachmentRelated',
                            label: this.relatedAttachmentText,
                            where: this.formatRelatedQuery.bindDelegate(this, 'ticketId eq "${0}"'),// must be lower case because of feed
                            view: 'ticket_attachment_related',
                            title:  this.relatedAttachmentTitleText
                        }]
                }]);
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.Ticket.Detail', __class);
    return __class;
});

