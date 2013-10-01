/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Ticket/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/array',
    'Mobile/SalesLogix/Action',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Views/History/RelatedView',
    'Sage/Platform/Mobile/List',
    '../_MetricListMixin',
    '../_RightDrawerListMixin',
    '../_CardLayoutListMixin'
], function(
    declare,
    string,
    array,
    action,
    format,
    HistoryRelatedView,
    List,
    _MetricListMixin,
    _RightDrawerListMixin,
    _CardLayoutListMixin
) {

    return declare('Mobile.SalesLogix.Views.Ticket.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.TicketNumber %}</h3>',
            '<h4>{%: $.Subject %}</h3>',
            '{% if($.Account) { %}',
                '<h4>{%: $$.viewContactActionText + ": " + $.Contact.NameLF + " | " + $.Account.AccountName %}</h4>',
            '{% } %}',
            '<h4> {%: $.AssignedTo ? ($$.assignedToText + $.AssignedTo.OwnerDescription) : this.notAssignedText %}</h4>',
            '{% if($.Urgency) { %}',
                '<h4>{%: $$.urgencyText + $.Urgency.Description %}</h4>',
            '{% } %}',
            '{% if($.Area) { %}',
                '<h4>{%: $$._areaCategoryIssueText($) %}</h4>',
            '{% } %}',
            '{% if($.CreateDate) { %}',
                '<h4>{%: $$.createdOnText %}  {%: Mobile.SalesLogix.Format.relativeDate($.CreateDate) %}</h4>',
            '{% } %}',
            '{% if($.ModifyDate) { %}',
                '<h4>{%: $$.modifiedText %}  {%: Mobile.SalesLogix.Format.relativeDate($.ModifyDate) %}</h4>',
            '{% } %}',
            '{% if($.NeededByDate) { %}',
                '<h4>{%: $$.neededByText %}  {%: Mobile.SalesLogix.Format.relativeDate($.NeededByDate) %}</h4>',
            '{% } %}'
        ]),

        _areaCategoryIssueText: function(feedItem) {
            var results = [feedItem.Area, feedItem.Category, feedItem.Issue];
            return array.filter(results, function(item) {
                return item !== '' && typeof item !== 'undefined' && item !== null;
            }).join(' > ');
        },

        //Localization
        titleText: 'Tickets',
        activitiesText: 'Activities',
        scheduleText: 'Schedule',
        notAssignedText: 'Not assigned',
        editActionText: 'Edit',
        viewAccountActionText: 'Account',
        viewContactActionText: 'Contact',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',
        addAttachmentActionText:'Add Attachment',
        assignedToText: 'Assigned To: ',
        urgencyText: 'Urgency: ',
        createdOnText: 'Created  ',
        modifiedText: 'Modified ',
        neededByText: 'Needed  ',

        //View Properties       
        detailView: 'ticket_detail',
        icon: 'content/images/icons/Ticket_24x24.png',
        id: 'ticket_list',
        security: 'Entities/Ticket/View',
        insertView: 'ticket_edit',
        queryOrderBy: 'TicketNumber',
        querySelect: [
            'Account/AccountName',
            'Account/MainPhone',
            'Area',
            'Category',
            'Issue',
            'AssignedTo/OwnerDescription',
            'Contact/NameLF',
            'Contact/WorkPhone',
            'ReceivedDate',
            'StatusCode',
            'Subject',
            'TicketNumber',
            'UrgencyCode',
            'Urgency/Description',
            'ModifyDate',
            'CreateDate',
            'NeededByDate'
        ],
        resourceKind: 'tickets',
        entityName: 'Ticket',
        allowSelection: true,
        enableActions: true,
        defaultSearchTerm: function() {
            return '#' + this.hashTagQueriesText['assigned-to-me'];
        },
        hashTagQueries: {
            'assigned-to-me': function() {
                return 'AssignedTo.OwnerDescription eq "' + App.context.user.$descriptor + '"';
            },
            'completed-by-me': function() {
                return 'CompletedBy.OwnerDescription eq "' + App.context.user.$descriptor + '"';
            }
        },
        hashTagQueriesText: {
            'assigned-to-me': 'assigned-to-me',
            'completed-by-me': 'completed-by-me'
        },

        createActionLayout: function() {
            return this.actions || (this.actions = [{
                id: 'edit',
                icon: 'content/images/icons/edit_24.png',
                label: this.editActionText,
                action: 'navigateToEditView'
            }, {
                id: 'viewAccount',
                icon: 'content/images/icons/Company_24.png',
                label: this.viewAccountActionText,
                enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
                fn: action.navigateToEntity.bindDelegate(this, {
                    view: 'account_detail',
                    keyProperty: 'Account.$key',
                    textProperty: 'Account.AccountName'
                })
            }, {
                id: 'viewContact',
                icon: 'content/images/icons/Contacts_24x24.png',
                label: this.viewContactActionText,
                enabled: action.hasProperty.bindDelegate(this, 'Contact.$key'),
                fn: action.navigateToEntity.bindDelegate(this, {
                    view: 'contact_detail',
                    keyProperty: 'Contact.$key',
                    textProperty: 'Contact.NameLF'
                })
            }, {
                id: 'addNote',
                icon: 'content/images/icons/New_Note_24x24.png',
                label: this.addNoteActionText,
                fn: action.addNote.bindDelegate(this)
            }, {
                id: 'addActivity',
                icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                label: this.addActivityActionText,
                fn: action.addActivity.bindDelegate(this)
            }, {
                id: 'addAttachment',
                icon: 'content/images/icons/Attachment_24.png',
                label: this.addAttachmentActionText,
                fn: action.addAttachment.bindDelegate(this)
            }]
            );
        },

        formatSearchQuery: function(searchQuery) {
            return string.substitute(
                'TicketNumber like "${0}%" or AlternateKeySuffix like "${0}%" or upper(Subject) like "${0}%" or Account.AccountNameUpper like "${0}%"',
                [this.escapeSearchQuery(searchQuery.toUpperCase())]
            );
        },
        createRelatedViewLayout: function() {
            return this.relatedViews || (this.relatedViews = [{
                widgetType: HistoryRelatedView,
                id: 'ticket_relatedNotes',
                autoLoad:true,
                enabled: true,
                relatedProperty: 'TicketId',
                where: function(entry) { return "TicketId eq '" + entry.$key + "' and Type ne 'atDatabaseChange'"; }
            }]);
        }
    });
});

