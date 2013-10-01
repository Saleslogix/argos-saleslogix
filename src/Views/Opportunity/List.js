/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Opportunity/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/array',
    'Mobile/SalesLogix/Action',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Format',
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
    platformFormat,
    HistoryRelatedView,
    List,
    _MetricListMixin,
    _RightDrawerListMixin,
    _CardLayoutListMixin
) {

    return declare('Mobile.SalesLogix.Views.Opportunity.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-type="{%: $.Type || $$.defaultActionType %}">',
            '<button data-action="selectEntry" class="list-item-selector button">',
            '<img src="{%= $$.statusIcons[$.Status] || $$.icon || $$.selectIcon %}" class="icon" />',
            '</button>',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),

        //TODO: Support ExchangeRateCode with proper symbol
        itemTemplate: new Simplate([
            '<h3>{%: $.Description %}</h3>',
            '{% if ($.Account) { %}',
                '<h4>',
                    '{%: $.Account.AccountName %}',
                '</h4>',
                '<h4>',
                    '{%: $.Account.AccountManager.UserInfo.UserName %}',
                    '{% if ($.Account && $.Account.AccountManager.UserInfo.Region) { %}',
                        ' | {%: $.Account.AccountManager.UserInfo.Region %}',
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

        hashTagQueriesText: {
            'my-opportunities': 'my-opportunities',
            'open': 'open',
            'closed': 'closed',
            'won': 'won',
            'lost': 'lost',
            'inactive': 'inactive',
            'prospect': 'prospect',
            'qualification': 'qualification',
            'negotiation': 'negotiation',
            'needs-analysis': 'needs-analysis',
            'demonstration': 'demonstration',
            'decision': 'decision'
        },

        //View Properties
        id: 'opportunity_list',
        security: 'Entities/Opportunity/View',
        icon: 'content/images/icons/opportunity_24.png',
        detailView: 'opportunity_detail',
        insertView: 'opportunity_edit',
        defaultSearchTerm: function() {
            return '#' + this.hashTagQueriesText['my-opportunities'];
        },
        hashTagQueries: {
            'my-opportunities': function() {
                return 'AccountManager.Id eq "' + App.context.user.$key + '"';
            },
            'open': 'Status eq "Open"',
            'won': 'Status eq "Closed - Won"',
            'lost': 'Status eq "Closed - Lost"',
            'inactive': 'Status eq "Inactive"',
            'prospect': 'Stage eq "1-Prospect"',
            'qualification': 'Stage eq "2-Qualification"',
            'needs-analysis': 'Stage eq "3-Needs Analysis"',
            'demonstration': 'Stage eq "4-Demonstration"',
            'negotiation': 'Stage eq "5-Negotiation"',
            'decision': 'Stage eq "6-Decision"'
        },
        statusIcons: {
            'Open': 'content/images/icons/opportunity_24.png',
            'Closed - Won': 'content/images/icons/Opportunity_Won_24.png',
            'Closed - Lost': 'content/images/icons/Opportunity_Lost_24.png'
        },
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
                id: 'viewContacts',
                icon: 'content/images/icons/Contacts_24x24.png',
                label: 'Contacts',
                fn: this.navigateToRelatedView.bindDelegate(this, 'opportunitycontact_related', 'Opportunity.Id eq "${0}"')
            }, {
                id: 'viewProducts',
                icon: 'content/images/icons/product_24.png',
                label: this.viewProductsActionText,
                fn: this.navigateToRelatedView.bindDelegate(this, 'opportunityproduct_related', 'Opportunity.Id eq "${0}"')
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
            return string.substitute('(upper(Description) like "${0}%" or Account.AccountNameUpper like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        createRelatedViewLayout: function() {
            return this.relatedViews || (this.relatedViews = [{
                widgetType: HistoryRelatedView,
                id: 'opp_relatedNotes',
                autoLoad: true,
                enabled: true,
                relatedProperty: 'OpportunityId',
                where: function(entry) { return "OpportunityId eq '" + entry.$key + "' and Type ne 'atDatabaseChange'"; }
            }]);
        }
    });
});

