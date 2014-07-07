/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Ticket.List
 *
 * @extends Sage.Platform.Mobile.List
 * @mixins Mobile.SalesLogix.Views._RightDrawerListMixin
 * @mixins Mobile.SalesLogix.Views._MetricListMixin
 * @mixins Mobile.SalesLogix.Views._GroupListMixin
 * @mixins Mobile.SalesLogix.Views._CardLayoutListMixin
 *
 * @requires Mobile.SalesLogix.Action
 * @requires Mobile.SalesLogix.Format
 */
define('Mobile/SalesLogix/Views/Ticket/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/array',
    'Mobile/SalesLogix/Action',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/List',
    '../_GroupListMixin',
    '../_MetricListMixin',
    '../_RightDrawerListMixin',
    '../_CardLayoutListMixin'
], function(
    declare,
    string,
    array,
    action,
    format,
    List,
    _GroupListMixin,
    _MetricListMixin,
    _RightDrawerListMixin,
    _CardLayoutListMixin
) {

    return declare('Mobile.SalesLogix.Views.Ticket.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.TicketNumber %}</h3>',
            '<h4>{%: $.Subject %}</h3>',
            '{% if(($.Account) && (!$.Contact)) { %}',
                '<h4>{%: $$.viewContactActionText + ": " + $.Account.AccountName %}</h4>',
            '{% } %}',
            '{% if(($.Account) && ($.Contact)) { %}',
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
        iconClass: 'fa fa-ticket fa-lg',
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
        groupsMode: true,
        allowSelection: true,
        enableActions: true,

        createActionLayout: function() {
            return this.actions || (this.actions = [{
                id: 'edit',
                cls: 'fa fa-pencil fa-2x',
                label: this.editActionText,
                action: 'navigateToEditView'
            }, {
                id: 'viewAccount',
                label: this.viewAccountActionText,
                enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
                fn: action.navigateToEntity.bindDelegate(this, {
                    view: 'account_detail',
                    keyProperty: 'Account.$key',
                    textProperty: 'Account.AccountName'
                })
            }, {
                id: 'viewContact',
                label: this.viewContactActionText,
                enabled: action.hasProperty.bindDelegate(this, 'Contact.$key'),
                fn: action.navigateToEntity.bindDelegate(this, {
                    view: 'contact_detail',
                    keyProperty: 'Contact.$key',
                    textProperty: 'Contact.NameLF'
                })
            }, {
                id: 'addNote',
                cls: 'fa fa-edit fa-2x',
                label: this.addNoteActionText,
                fn: action.addNote.bindDelegate(this)
            }, {
                id: 'addActivity',
                cls: 'fa fa-calendar fa-2x',
                label: this.addActivityActionText,
                fn: action.addActivity.bindDelegate(this)
            }, {
                id: 'addAttachment',
                cls: 'fa fa-paperclip fa-2x',
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
        }
    });
});

