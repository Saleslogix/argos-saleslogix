/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Opportunity.List
 *
 * @extends argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins crm.Views._MetricListMixin
 * @mixins crm.Views._GroupListMixin
 * @mixins crm.Views._CardLayoutListMixin
 *
 * @requires argos.Format
 *
 * @requires crm.Action
 * @requires crm.Format
 */
define('crm/Views/Opportunity/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/_base/array',
    '../../Action',
    '../../Format',
    'argos/Format',
    './QuickEdit',
    'argos/List',
    '../_GroupListMixin',
    '../_MetricListMixin',
    '../_RightDrawerListMixin',
    '../_CardLayoutListMixin'
], function (declare, lang, string, array, action, format, platformFormat, QuickEdit, List, _GroupListMixin, _MetricListMixin, _RightDrawerListMixin, _CardLayoutListMixin) {
    var __class = declare('crm.Views.Opportunity.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
        //Templates
        //TODO: Support ExchangeRateCode with proper symbol
        itemTemplate: new Simplate([
            '<h3>{%: $.Description %}</h3>',
            '{% if ($.Account) { %}',
            '<h4>',
            '{%: $.Account.AccountName %}',
            '</h4>',
            '<h4>',
            '{% if ($.Account.AccountManager && $.Account.AccountManager.UserInfo) { %}',
            '{%: $.Account.AccountManager.UserInfo.UserName %}',
            '{% if ($.Account && $.Account.AccountManager.UserInfo.Region) { %}',
            ' | {%: $.Account.AccountManager.UserInfo.Region %}',
            '{% } %}',
            '{% } %}',
            '</h4>',
            '{% } %}',
            '<h4>',
            '{%: $.Status %}',
            '{% if ($.Stage) { %}',
            ' | {%: $.Stage %}',
            '{% } %}',
            '</h4>',
            '{% if ($.SalesPotential) { %}',
            '<h4><strong>',
            '{% if (App.hasMultiCurrency()) { %}',
            '{%: crm.Format.multiCurrency($.SalesPotential * $.ExchangeRate, $.ExchangeRateCode) %}',
            '{% } else { %}',
            '{%: crm.Format.multiCurrency($.SalesPotential, App.getBaseExchangeRate().code) %}',
            '{% } %}',
            '</strong></h4>',
            '{% } %}',
            '<h4>{%: $$.formatDate($) %}</h4>'
        ]),
        //Localization
        titleText: 'Opportunities',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',
        editActionText: 'Edit',
        viewAccountActionText: 'Account',
        viewContactsActionText: 'Contacts',
        viewProductsActionText: 'Products',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',
        addAttachmentActionText: 'Add Attachment',
        actualCloseText: 'Closed ',
        estimatedCloseText: 'Estimated close ',
        quickEditActionText: 'Quick Edit',
        //View Properties
        id: 'opportunity_list',
        security: 'Entities/Opportunity/View',
        itemIconClass: 'fa fa-money fa-2x',
        detailView: 'opportunity_detail',
        insertView: 'opportunity_edit',
        queryOrderBy: 'EstimatedClose desc',
        querySelect: [
            'Account/AccountName',
            'Account/AccountManager/UserInfo/UserName',
            'Account/AccountManager/UserInfo/Region',
            'Description',
            'Stage',
            'Status',
            'SalesPotential',
            'ExchangeRate',
            'ExchangeRateCode',
            'ModifyDate',
            'ActualClose',
            'EstimatedClose'
        ],
        resourceKind: 'opportunities',
        entityName: 'Opportunity',
        groupsEnabled: true,
        allowSelection: true,
        enableActions: true,
        formatDate: function (entry) {
            if (entry.Status === 'Open' && entry.EstimatedClose) {
                return this.estimatedCloseText + format.relativeDate(entry.EstimatedClose);
            }
            else if (entry.ActualClose) {
                return this.actualCloseText + format.relativeDate(entry.ActualClose);
            }
            return '';
        },
        createActionLayout: function () {
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
                    id: 'viewContacts',
                    label: this.viewContactsActionText,
                    fn: this.navigateToRelatedView.bindDelegate(this, 'opportunitycontact_related', 'Opportunity.Id eq "${0}"')
                }, {
                    id: 'viewProducts',
                    label: this.viewProductsActionText,
                    fn: this.navigateToRelatedView.bindDelegate(this, 'opportunityproduct_related', 'Opportunity.Id eq "${0}"')
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
                }, {
                    id: 'quickEdit',
                    cls: 'fa fa-pencil fa-2x',
                    label: this.quickEditActionText,
                    editView: 'opportunity_quick_edit',
                    action: 'navigateToQuickEdit'
                }]);
        },
        formatSearchQuery: function (searchQuery) {
            return string.substitute('(upper(Description) like "${0}%" or Account.AccountNameUpper like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        groupFieldFormatter: {
            'CloseProbability': {
                name: 'CloseProbability',
                formatter: function (value) {
                    return format.fixedLocale(value, 0) + '%';
                }.bind(this)
            }
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Opportunity.List', __class);
    return __class;
});
