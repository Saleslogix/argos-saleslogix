/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.Ticket.List
 *
 * @extends argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins crm.Views._MetricListMixin
 * @mixins crm.Views._GroupListMixin
 * @mixins crm.Views._CardLayoutListMixin
 *
 * @requires crm.Action
 * @requires crm.Format
 */
define('crm/Views/Ticket/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/_base/array',
    '../../Action',
    '../../Format',
    'argos/List',
    '../_GroupListMixin',
    '../_MetricListMixin',
    '../_RightDrawerListMixin',
    '../_CardLayoutListMixin'
], function(
    declare,
    lang,
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

    var __class = declare('crm.Views.Ticket.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
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
                '<h4>{%: $$.createdOnText %}  {%: crm.Format.relativeDate($.CreateDate) %}</h4>',
            '{% } %}',
            '{% if($.ModifyDate) { %}',
                '<h4>{%: $$.modifiedText %}  {%: crm.Format.relativeDate($.ModifyDate) %}</h4>',
            '{% } %}',
            '{% if($.NeededByDate) { %}',
                '<h4>{%: $$.neededByText %}  {%: crm.Format.relativeDate($.NeededByDate) %}</h4>',
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
        itemIconClass: 'fa fa-clipboard fa-2x',
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
        groupsEnabled: true,
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

    lang.setObject('Mobile.SalesLogix.Views.Ticket.List', __class);
    return __class;
});

