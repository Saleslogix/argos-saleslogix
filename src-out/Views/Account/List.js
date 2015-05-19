/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Account.List
 *
 * @extends argos.List
 * @requires argos.List
 * @requires argos.Format
 * @requires argos.Utility
 * @requires argos.Convert
 *
 * @requires crm.Action
 * @requires crm.Views._GroupListMixin
 * @requires crm.Views._MetricListMixin
 * @requires crm.Views._CardLayoutListMixin
 * @requires crm.Views._RightDrawerListMixin
 *
 */
define('crm/Views/Account/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/string',
    '../../Action',
    'argos/Format',
    'argos/Utility',
    'argos/Convert',
    'argos/List',
    '../_GroupListMixin',
    '../_MetricListMixin',
    '../_CardLayoutListMixin',
    '../_RightDrawerListMixin'
], function (declare, lang, array, string, action, format, utility, Convert, List, _GroupListMixin, _MetricListMixin, _CardLayoutListMixin, _RightDrawerListMixin) {
    var __class = declare('crm.Views.Account.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
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
            '{%: $$.phoneAbbreviationText %} <span class="href" data-action="callMain" data-key="{%: $.$key %}">{%: argos.Format.phone($.MainPhone) %}</span>',
            '</h4>',
            '{% } %}',
            '{% if ($.Fax) { %}',
            '<h4>',
            '{%: $$.faxAbbreviationText + argos.Format.phone($.Fax) %}',
            '</h4>',
            '{% } %}'
        ]),
        groupsEnabled: true,
        enableDynamicGroupLayout: true,
        groupLayoutItemTemplate: new Simplate([
            '<div style="float:left; ">',
            '<h3><span class="group-label">{%= $$.getGroupFieldLabelByName($,"AccountName") %} </span><span class="group-entry"><strong>{%= $$.getGroupFieldValueByName($,"AccountName") %}</strong></span></h2>',
            '<h4><span class="group-label">{%= $$.getGroupFieldLabelByName($,"MainPhone") %} </span><span class="group-entry">{%= $$.getGroupFieldValueByName($, "MainPhone") %}</span></h4>',
            '</div><div style="float:left;">',
            '<h4><span class="group-label">{%= $$.getGroupFieldLabelByName($,"Status") %} </span><span class="group-entry">{%= $$.getGroupFieldValueByName($, "Status") %}</span></h4>',
            '<h4><span class="group-label">{%= $$.getGroupFieldLabelByName($,"Type") %} </span><span class="group-entry">{%= $$.getGroupFieldValueByName($, "Type") %}</span></h4>',
            '</div>'
        ]),
        joinFields: function (sep, fields) {
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
        itemIconClass: 'fa fa-building-o fa-2x',
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
        allowSelection: true,
        enableActions: true,
        pageSize: 10,
        callMain: function (params) {
            this.invokeActionItemBy(function (action) {
                return action.id === 'callMain';
            }, params.key);
        },
        createActionLayout: function () {
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
                }]);
        },
        formatSearchQuery: function (searchQuery) {
            return string.substitute('AccountNameUpper like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Account.List', __class);
    return __class;
});
