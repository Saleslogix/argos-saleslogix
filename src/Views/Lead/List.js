/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.Lead.List
 *
 * @extends argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins crm.Views._MetricListMixin
 * @mixins crm.Views._GroupListMixin
 * @mixins crm.Views._CardLayoutListMixin
 *
 * @requires argos.Format
 * @requires argos.Utility
 *
 * @requires crm.Action
 */
define('crm/Views/Lead/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    '../../Action',
    'argos/Format',
    'argos/Utility',
    'argos/List',
    '../_GroupListMixin',
    '../_MetricListMixin',
    '../_RightDrawerListMixin',
    '../_CardLayoutListMixin'
], function(
    declare,
    lang,
    string,
    action,
    format,
    utility,
    List,
    _GroupListMixin,
    _MetricListMixin,
    _RightDrawerListMixin,
    _CardLayoutListMixin
) {

    var __class = declare('crm.Views.Lead.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.LeadNameLastFirst %}</h3>',
            '<h4>',
                '{%: $$.joinFields(" | ", [$.Title, $.Company]) %}',
            '</h4>',
            '{% if ($.WorkPhone) { %}',
                '<h4>',
                    '{%: $$.phoneAbbreviationText %} <span class="href" data-action="callWork" data-key="{%: $.$key %}">{%: argos.Format.phone($.WorkPhone) %}</span>',
                '</h4>',
            '{% } %}',
            '{% if ($.Mobile) { %}',
                '<h4>',
                    '{%: $$.mobileAbbreviationText %} <span class="href" data-action="callMobile" data-key="{%: $.$key %}">{%: argos.Format.phone($.Mobile) %}</span>',
                '</h4>',
            '{% } %}',
            '{% if ($.TollFree) { %}',
                '<h4>',
                    '{%: $$.tollFreeAbbreviationText %} {%: argos.Format.phone($.TollFree) %}',
                '</h4>',
            '{% } %}',
            '<h4>{%: $.WebAddress %}</h4>',
            '{% if ($.Email) { %}',
                '<h4>',
                    '<span class="href" data-action="sendEmail" data-key="{%: $.$key %}">{%: $.Email %}</span>',
                '</h4>',
            '{% } %}'
        ]),

        joinFields: function(sep, fields) {
            return utility.joinFields(sep, fields);
        },
        callWork: function(params) {
            this.invokeActionItemBy(function(action) {
                return action.id === 'callWork';
            }, params.key);
        },
        callMobile: function(params) {
            this.invokeActionItemBy(function(action) {
                return action.id === 'callMobile';
            }, params.key);
        },
        sendEmail: function(params) {
            this.invokeActionItemBy(function(action) {
                return action.id === 'sendEmail';
            }, params.key);
        },

        //Localization
        titleText: 'Leads',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',
        emailedText: 'E-mailed ${0}',
        calledText: 'Called ${0}',
        editActionText: 'Edit',
        callMobileActionText: 'Call Mobile',
        callWorkActionText: 'Call Work',
        sendEmailActionText: 'Email',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',
        addAttachmentActionText: 'Add Attachment',
        phoneAbbreviationText: 'Work: ',
        mobileAbbreviationText: 'Mobile: ',
        tollFreeAbbreviationText: 'Toll Free: ',

        //View Properties
        detailView: 'lead_detail',
        itemIconClass: 'fa fa-filter fa-2x',
        iconTemplate: new Simplate([
            '<span class="fa-stack">',
                '<i class="fa fa-square-o fa-stack-2x"></i>',
                '<i class="fa fa-user fa-stack-1x fa-inverse"></i>',
            '</span>'
        ]),
        id: 'lead_list',
        security: 'Entities/Lead/View',
        insertView: 'lead_edit',
        queryOrderBy: 'LastNameUpper,FirstName',
        querySelect: [
            'Company',
            'LeadNameLastFirst',
            'WebAddress',
            'Email',
            'WorkPhone',
            'Mobile',
            'TollFree',
            'Title',
            'ModifyDate'
        ],
        resourceKind: 'leads',
        entityName: 'Lead',
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
                        id: 'callWork',
                        cls: 'fa fa-phone-square fa-2x',
                        label: this.callWorkActionText,
                        enabled: action.hasProperty.bindDelegate(this, 'WorkPhone'),
                        fn: action.callPhone.bindDelegate(this, 'WorkPhone')
                    }, {
                        id: 'callMobile',
                        cls: 'fa fa-mobile fa-2x',
                        label: this.callMobileActionText,
                        enabled: action.hasProperty.bindDelegate(this, 'Mobile'),
                        fn: action.callPhone.bindDelegate(this, 'Mobile')
                    }, {
                        id: 'sendEmail',
                        cls: 'fa fa-envelope fa-2x',
                        label: this.sendEmailActionText,
                        enabled: action.hasProperty.bindDelegate(this, 'Email'),
                        fn: action.sendEmail.bindDelegate(this, 'Email')
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
            return string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%" or CompanyUpper like "${0}%" or upper(LeadNameLastFirst) like "%${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.Lead.List', __class);
    return __class;
});

