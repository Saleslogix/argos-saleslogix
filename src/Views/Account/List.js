/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Account.List
 *
 * @extends Sage.Platform.Mobile.List
 * @requires Sage.Platform.Mobile.List
 * @requires Sage.Platform.Mobile.Format
 * @requires Sage.Platform.Mobile.Utility
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Action
 * @requires Mobile.SalesLogix.Views._GroupListMixin
 * @requires Mobile.SalesLogix.Views._MetricListMixin
 * @requires Mobile.SalesLogix.Views._CardLayoutListMixin
 * @requires Mobile.SalesLogix.Views._RightDrawerListMixin
 *
 */
define('Mobile/SalesLogix/Views/Account/List', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'Mobile/SalesLogix/Action',
    'Sage/Platform/Mobile/Format',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/List',
    '../_GroupListMixin',
    '../_MetricListMixin',
    '../_CardLayoutListMixin',
    '../_RightDrawerListMixin'
], function(
    declare,
    array,
    string,
    action,
    format,
    utility,
    Convert,
    List,
    _GroupListMixin,
    _MetricListMixin,
    _CardLayoutListMixin,
    _RightDrawerListMixin
) {

    return declare('Mobile.SalesLogix.Views.Account.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.AccountName %}</h3>',
            '<h4>{%: $.Industry %}</h4>',
            '<h4>',
                '{%: $$.joinFields(" | ", [$.Type, $.SubType]) %}',
            '</h4>',
            '<h4>{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %} | {%: $.Owner.OwnerDescription %}</h4>',
            '<h4>{%: $.WebAddress %}</h4>',
            '{% if ($.MainPhone) { %}',
                '<h4>',
                    '{%: $$.phoneAbbreviationText %} <span class="href" data-action="callMain" data-key="{%: $.$key %}">{%: Sage.Platform.Mobile.Format.phone($.MainPhone) %}</span>',
                '</h4>',
            '{% } %}',
            '{% if ($.Fax) { %}',
                '<h4>',
                    '{%: $$.faxAbbreviationText + Sage.Platform.Mobile.Format.phone($.Fax) %}',
                '</h4>',
            '{% } %}'
        ]),

        joinFields: function(sep, fields) {
            return utility.joinFields(sep, fields);
        },

        //Localization
        titleText: 'Accounts',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',
        editActionText: 'Edit',
        callMainActionText: 'Call Main',
        viewContactsActionText: 'Contacts',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',
        addAttachmentActionText: 'Add Attachment',
        phoneAbbreviationText: 'Phone: ',
        faxAbbreviationText: 'Fax: ',

        //View Properties
        detailView: 'account_detail',
        iconClass: 'fa fa-building-o fa-lg',
        id: 'account_list',
        security: 'Entities/Account/View',
        insertView: 'account_edit',
        queryOrderBy: 'AccountNameUpper',
        insertSecurity: 'Entities/Account/Add',
        querySelect: [
            'AccountName',
            'AccountManager/UserInfo/UserName',
            'AccountManager/UserInfo/LastName',
            'AccountManager/UserInfo/FirstName',
            'Owner/OwnerDescription',
            'WebAddress',
            'Industry',
            'LeadSource/Description',
            'MainPhone',
            'Fax',
            'Status',
            'SubType',
            'Type',
            'ModifyDate'
        ],
        resourceKind: 'accounts',
        entityName: 'Account',
        groupsMode: true,
        allowSelection: true,
        enableActions: true,
        pageSize: 10,
        callMain: function(params) {
            this.invokeActionItemBy(function(action) {
                return action.id === 'callMain';
            }, params.key);
        },
        createActionLayout: function() {
            return this.actions || (this.actions = [{
                id: 'edit',
                cls: 'fa fa-pencil fa-2x',
                label: this.editActionText,
                action: 'navigateToEditView'
            }, {
                id: 'callMain',
                cls: 'fa fa-phone-square fa-2x',
                label: this.callMainActionText,
                enabled: action.hasProperty.bindDelegate(this, 'MainPhone'),
                fn: action.callPhone.bindDelegate(this, 'MainPhone')
            }, {
                id: 'viewContacts',
                label: this.viewContactsActionText,
                fn: this.navigateToRelatedView.bindDelegate(this, 'contact_related', 'Account.id eq "${0}"')
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
            return string.substitute('AccountNameUpper like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

