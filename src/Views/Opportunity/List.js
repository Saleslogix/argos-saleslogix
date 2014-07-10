/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Opportunity.List
 *
 * @extends Sage.Platform.Mobile.List
 * @mixins Mobile.SalesLogix.Views._RightDrawerListMixin
 * @mixins Mobile.SalesLogix.Views._MetricListMixin
 * @mixins Mobile.SalesLogix.Views._GroupListMixin
 * @mixins Mobile.SalesLogix.Views._CardLayoutListMixin
 *
 * @requires Sage.Platform.Mobile.Format
 *
 * @requires Mobile.SalesLogix.Action
 * @requires Mobile.SalesLogix.Format
 */
define('Mobile/SalesLogix/Views/Opportunity/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/array',
    'Mobile/SalesLogix/Action',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Format',
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
    platformFormat,
    List,
    _GroupListMixin,
    _MetricListMixin,
    _RightDrawerListMixin,
    _CardLayoutListMixin
) {

    return declare('Mobile.SalesLogix.Views.Opportunity.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin, _GroupListMixin], {
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
                    '{%: Mobile.SalesLogix.Format.multiCurrency($.SalesPotential * $.ExchangeRate, $.ExchangeRateCode) %}',
                '{% } else { %}',
                    '{%: Mobile.SalesLogix.Format.multiCurrency($.SalesPotential, App.getBaseExchangeRate().code) %}',
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

        //View Properties
        id: 'opportunity_list',
        security: 'Entities/Opportunity/View',
        iconClass: 'fa fa-bar-chart-o fa-lg',
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
        groupsMode: true,
        allowSelection: true,
        enableActions: true,

        formatDate: function(entry) {
            if (entry.Status === 'Open' && entry.EstimatedClose) {
                return this.estimatedCloseText + format.relativeDate(entry.EstimatedClose);
            } else if (entry.ActualClose) {
                return this.actualCloseText + format.relativeDate(entry.ActualClose);
            }

            return '';
        },
        createActionLayout: function() {
            return this.actions || (this.actions = [{
                id: 'edit',
                cls: 'fa fa-pencil fa-lg',
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
            }]
            );
        },

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(upper(Description) like "${0}%" or Account.AccountNameUpper like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

