/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.History.List
 *
 * @extends Sage.Platform.Mobile.List
 * @mixins Mobile.SalesLogix.Views._RightDrawerListMixin
 * @mixins Mobile.SalesLogix.Views._MetricListMixin
 * @mixins Mobile.SalesLogix.Views._GroupListMixin
 * @mixins Mobile.SalesLogix.Views._CardLayoutListMixin
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 * @requires Mobile.SalesLogix.Action
 *
 * @requires moment
 */
define('Mobile/SalesLogix/Views/History/List', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dojo/query',
    'dojo/dom-class',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Mobile/SalesLogix/Action',
    'Sage/Platform/Mobile/List',
    '../_RightDrawerListMixin',
    '../_MetricListMixin',
    '../_CardLayoutListMixin',
    'moment'
], function(
    declare,
    array,
    string,
    domStyle,
    domGeom,
    query,
    domClass,
    format,
    convert,
    action,
    List,
    _RightDrawerListMixin,
    _MetricListMixin,
    _CardLayoutListMixin,
    moment
) {

    return declare('Mobile.SalesLogix.Views.History.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>',
            '{% if ($.Type === "atNote") { %}',
                '{%: $$.formatDate($.ModifyDate) %}',
            '{% } else { %}',
                '{%: $$.formatDate($.CompletedDate) %}',
            '{% } %}',
            '</h3>',
            '<h4>{%= $$.nameTemplate.apply($) %}</h4>',
            '{% if($.Description) { %}',
                '<h4>{%: $$.regardingText + $.Description %}</h4>',
            '{% } %}',
            '<div class="note-text-item">',
            '<div class="note-text-wrap">',
            '{%: $.Notes %}',
            '</div>',
            '</div>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.LeadName && $.AccountName) { %}',
            '{%: $.LeadName %} | {%: $.AccountName %}',
            '{% } else if ($.LeadName) { %}',
            '{%: $.LeadName %}',
            '{% } else if ($.ContactName && $.AccountName) { %}',
            '{%: $.ContactName %} | {%: $.AccountName %}',
            '{% } else if ($.ContactName) { %}',
            '{%: $.ContactName %}',
            '{% } else { %}',
            '{%: $.AccountName %}',
            '{% } %}'
        ]),

        //Localization
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity',
            'atQuestion': 'Question',
            'atEMail': 'E-mail'
        },
        hourMinuteFormatText: "h:mm A",
        hashTagQueriesText: {
            'my-history': 'my-history',
            'note': 'note',
            'phonecall': 'phonecall',
            'meeting': 'meeting',
            'personal': 'personal',
            'email': 'email'
        },
        dateFormatText: "M/D/YY",
        titleText: 'Notes/History',
        viewAccountActionText: 'Account',
        viewOpportunityActionText: 'Opp.',
        viewContactActionText: 'Contact',
        addAttachmentActionText: 'Add Attachment',
        regardingText: 'Regarding: ',

        //View Properties
        detailView: 'history_detail',
        iconClass: 'fa fa-archive fa-lg',
        id: 'history_list',
        security: null, //'Entities/History/View',
        existsRE: /^[\w]{12}$/,
        insertView: 'history_edit',
        queryOrderBy: 'CompletedDate desc',
        querySelect: [
            'AccountName',
            'ContactName',
            'LeadName',
            'CompletedDate',
            'Description',
            'StartDate',
            'TimeLess',
            'Type',
            'LeadId',
            'OpportunityId',
            'OpportunityName',
            'AccountId',
            'ContactId',
            'TicketId',
            'ModifyDate',
            'Notes'

        ],
        queryWhere: 'Type ne "atDatabaseChange"',
        resourceKind: 'history',
        entityName: 'History',
        hashTagQueries: {
            'my-history': function() {
                return 'UserId eq "' + App.context.user.$key + '"';
            },
            'note': 'Type eq "atNote"',
            'phonecall': 'Type eq "atPhoneCall"',
            'meeting': 'Type eq "atAppointment"',
            'personal': 'Type eq "atPersonal"',
            'email': 'Type eq "atEMail"'
        },
        activityIndicatorIconByType: {
            'atToDo': 'fa fa-list-ul fa-lg',
            'atPhoneCall': 'fa fa-phone fa-lg',
            'atAppointment': 'fa fa-users fa-lg',
            'atLiterature': 'fa fa-book fa-lg',
            'atPersonal': 'fa fa-check-square-o fa-lg',
            'atQuestion': 'fa fa-question-circle fa-lg',
            'atNote': 'fa fa-file-text-o fa-lg',
            'atEMail': 'fa fa-envelope fa-lg'
        },
        allowSelection: true,
        enableActions: true,

        createActionLayout: function() {
            return this.actions || (this.actions = [{
                id: 'viewAccount',
                label: this.viewAccountActionText,
                enabled: action.hasProperty.bindDelegate(this, 'AccountId'),
                fn: action.navigateToEntity.bindDelegate(this, {
                    view: 'account_detail',
                    keyProperty: 'AccountId',
                    textProperty: 'AccountName'
                })
            }, {
                id: 'viewOpportunity',
                label: this.viewOpportunityActionText,
                enabled: action.hasProperty.bindDelegate(this, 'OpportunityId'),
                fn: action.navigateToEntity.bindDelegate(this, {
                    view: 'opportunity_detail',
                    keyProperty: 'OpportunityId',
                    textProperty: 'OpportunityName'
                })
            }, {
                id: 'viewContact',
                label: this.viewContactActionText,
                action: 'navigateToContactOrLead',
                enabled: this.hasContactOrLead
            }, {
                id: 'addAttachment',
                cls: 'fa fa-paperclip fa-2x',
                label: this.addAttachmentActionText,
                fn: action.addAttachment.bindDelegate(this)
            }]
            );
        },
        hasContactOrLead: function(action, selection) {
            return (selection.data['ContactId']) || (selection.data['LeadId']);
        },
        navigateToContactOrLead: function(action, selection) {
            var entity = this.resolveContactOrLeadEntity(selection.data),
                viewId,
                options;

            switch (entity) {
                case 'Contact':
                    viewId = 'contact_detail';
                    options = {
                        key: selection.data['ContactId'],
                        descriptor: selection.data['ContactName']
                    };
                    break;
                case 'Lead':
                    viewId = 'lead_detail';
                    options = {
                        key: selection.data['LeadId'],
                        descriptor: selection.data['LeadName']
                    };
                    break;
            }

            var view = App.getView(viewId);

            if (view && options) {
                view.show(options);
            }
        },
        resolveContactOrLeadEntity: function(entry) {
            var exists = this.existsRE;

            if (entry) {
                if (exists.test(entry['LeadId'])) {
                    return 'Lead';
                }
                if (exists.test(entry['ContactId'])) {
                    return 'Contact';
                }
            }
        },
        formatDate: function(date) {
            var startDate = moment(convert.toDateFromString(date)),
                nextDate = startDate.clone().add({hours: 24}),
                fmt = this.dateFormatText;

            if (startDate.valueOf() < nextDate.valueOf() && startDate.valueOf() > moment().startOf('day').valueOf())
                fmt = this.hourMinuteFormatText;

            return format.date(startDate.toDate(), fmt);
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        createIndicatorLayout: function() {
            return this.itemIndicators || (this.itemIndicators = [{
                id: 'touched',
                cls: 'fa fa-hand-o-up fa-lg',
                label: 'Touched',
                onApply: function(entry, parent) {
                    this.isEnabled = parent.hasBeenTouched(entry);
                }
            }]
            );
        },
        getItemIconClass: function(entry) {
            var type = entry && entry.Type;
            return this._getItemIconClass(type);
        },
        _getItemIconClass: function(type) {
            var cls = this.activityIndicatorIconByType[type];
            if (cls) {
                cls = cls + ' fa-2x';
            }

            return cls;
        }
    });
});

