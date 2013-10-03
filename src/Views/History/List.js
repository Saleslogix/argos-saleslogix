/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
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
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
            '<button data-action="selectEntry" class="list-item-selector button">',
            '<img src="{%= $$.entityIconByType[$.Type] || $$.icon || $$.selectIcon %}" class="icon" />',
            '</button>',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
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
        dateFormatText: "M/D/YY",
        hashTagQueriesText: {
            'my-history': 'my-history',
            'note': 'note',
            'phonecall': 'phonecall',
            'meeting': 'meeting',
            'personal': 'personal',
            'email': 'email'
        },
        titleText: 'Notes/History',
        viewAccountActionText: 'Account',
        viewOpportunityActionText: 'Opp.',
        viewContactActionText: 'Contact',
        addAttachmentActionText: 'Add Attachment',
        regardingText: 'Regarding: ',

        //View Properties
        detailView: 'history_detail',
        icon: 'content/images/icons/journal_24.png',
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
        defaultSearchTerm: function() {
            return '#' + this.hashTagQueriesText['my-history'];
        },
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
        entityIconByType: {
            'atToDo': 'content/images/icons/To_Do_24x24.png',
            'atPhoneCall': 'content/images/icons/Call_24x24.png',
            'atAppointment': 'content/images/icons/Meeting_24x24.png',
            'atLiterature': 'content/images/icons/Schedule_Literature_Request_24x24.gif',
            'atPersonal': 'content/images/icons/Personal_24x24.png',
            'atQuestion': 'content/images/icons/help_24.png',
            'atNote': 'content/images/icons/note_24.png',
            'atEMail': 'content/images/icons/letters_24.png'
        },
        activityIndicatorIconByType: {
            'atToDo': 'To_Do_24x24.png',
            'atPhoneCall': 'Call_24x24.png',
            'atAppointment': 'Meeting_24x24.png',
            'atLiterature': 'Schedule_Literature_Request_24x24.gif',
            'atPersonal': 'Personal_24x24.png',
            'atQuestion': 'help_24.png',
            'atNote': 'note_24.png',
            'atEMail': 'letters_24.png'
        },
        entityColorClassByType: {
            'atToDo': 'color-ToDo',
            'atPhoneCall': 'color-PhoneCall',
            'atAppointment': 'color-Meeting',
            //'atLiterature': 'color-LitRequest',
            'atPersonal': 'color-Personal'
            //'atQuestion': 'color-Question',
            //'atNote': 'color-Note',
            //'atEMail': 'color-Email'
        },
        allowSelection: true,
        enableActions: true,

        createActionLayout: function() {
            return this.actions || (this.actions = [{
                id: 'viewAccount',
                icon: 'content/images/icons/Company_24.png',
                label: this.viewAccountActionText,
                enabled: action.hasProperty.bindDelegate(this, 'AccountId'),
                fn: action.navigateToEntity.bindDelegate(this, {
                    view: 'account_detail',
                    keyProperty: 'AccountId',
                    textProperty: 'AccountName'
                })
            }, {
                id: 'viewOpportunity',
                icon: 'content/images/icons/opportunity_24.png',
                label: this.viewOpportunityActionText,
                enabled: action.hasProperty.bindDelegate(this, 'OpportunityId'),
                fn: action.navigateToEntity.bindDelegate(this, {
                    view: 'opportunity_detail',
                    keyProperty: 'OpportunityId',
                    textProperty: 'OpportunityName'
                })
            }, {
                id: 'viewContact',
                icon: 'content/images/icons/Contacts_24x24.png',
                label: this.viewContactActionText,
                action: 'navigateToContactOrLead',
                enabled: this.hasContactOrLead
            }, {
                id: 'addAttachment',
                icon: 'content/images/icons/Attachment_24.png',
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
        processFeed: function() {
            this.inherited(arguments);
        },
        onApplyRowActionPanel: function(actionsNode, rowNode) {
            var colorRowCls, colorCls;

            colorRowCls = query(rowNode).closest('[data-color-class]')[0];
            colorCls = colorRowCls ? colorRowCls.getAttribute('data-color-class') : false;
            for (var colorKey in this.entityColorClassByType) {
                domClass.remove(actionsNode, this.entityColorClassByType[colorKey]);
            }
            
            if (colorCls) {
                domClass.add(actionsNode, colorCls);
            }
        },
        getItemColorClass: function(entry) {
            return this.entityColorClassByType[entry.Type] || this.itemColorClass;
        },
        getItemIconSource: function(entry) {
            return this.itemIcon || this.entityIconByType[entry.Type] || this.icon || this.selectIcon;
        },
        createIndicatorLayout: function() {
            return this.itemIndicators || (this.itemIndicators = [{
                id: 'touched',
                icon: 'Touched_24x24.png',
                label: 'Touched',
                onApply: function(entry, parent) {
                    this.isEnabled = parent.hasBeenTouched(entry);
                }
            }, {
                id: 'activityIcon',
                icon: '',
                label: 'Activity',
                onApply: function(entry, parent) {
                    parent.applyActivityIndicator(entry, this);
                }
            }]
            );
        },
        applyActivityIndicator: function(entry, indicator) {
            this._applyActivityIndicator(entry['Type'], indicator);
        },
        _applyActivityIndicator: function(type, indicator) {
            indicator.isEnabled = false;
            indicator.showIcon = false;
            if (type) {
                indicator.icon = this.activityIndicatorIconByType[type];
                indicator.label = this.activityTypeText[type];
                indicator.isEnabled = true;
                indicator.showIcon = true;
            }
        }
    });
});

