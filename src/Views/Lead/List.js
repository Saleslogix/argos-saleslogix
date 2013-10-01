/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Lead/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Action',
    'Sage/Platform/Mobile/Format',
    'Sage/Platform/Mobile/Utility',
    'Mobile/SalesLogix/Views/History/RelatedView',
    'Sage/Platform/Mobile/List',
    '../_MetricListMixin',
    '../_RightDrawerListMixin',
    '../_CardLayoutListMixin'
], function(
    declare,
    string,
    action,
    format,
    utility,
    HistoryRelatedView,
    List,
    _MetricListMixin,
    _RightDrawerListMixin,
    _CardLayoutListMixin
) {

    return declare('Mobile.SalesLogix.Views.Lead.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.LeadNameLastFirst %}</h3>',
            '<h4>',
                '{%: $$.joinFields(" | ", [$.Title, $.Company]) %}',
            '</h4>',
            '{% if ($.WorkPhone) { %}',
                '<h4>',
                    '{%: $$.phoneAbbreviationText + Sage.Platform.Mobile.Format.phone($.WorkPhone) %}',
                '</h4>',
            '{% } %}',
            '{% if ($.Mobile) { %}',
                '<h4>',
                    '{%: $$.mobileAbbreviationText + Sage.Platform.Mobile.Format.phone($.Mobile) %}',
                '</h4>',
            '{% } %}',
            '{% if ($.TollFree) { %}',
                '<h4>',
                    '{%: $$.tollFreeAbbreviationText + Sage.Platform.Mobile.Format.phone($.TollFree) %}',
                '</h4>',
            '{% } %}',
            '<h4>{%: $.WebAddress %}</h4>',
            '{% if ($.Email) { %}',
                '<h4>',
                    '{%: $.Email %}',
                '</h4>',
            '{% } %}'
        ]),

        joinFields: function(sep, fields) {
            return utility.joinFields(sep, fields);
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
        icon: 'content/images/icons/Leads_24x24.png',
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
        allowSelection: true,
        enableActions: true,
        defaultSearchTerm: function() {
            return '#' + this.hashTagQueriesText['my-leads'];
        },
        hashTagQueries: {
            'my-leads': function() {
                return 'AccountManager.Id eq "' + App.context.user.$key + '"';
            },
            'can-email': 'DoNotEmail eq false',
            'can-phone': 'DoNotPhone eq false',
            'can-fax': 'DoNotFAX eq false',
            'can-mail': 'DoNotMail eq false',
            'can-solicit': 'DoNotSolicit eq false'
        },
        hashTagQueriesText: {
            'my-leads': 'my-leads',
            'can-email': 'can-email',
            'can-phone': 'can-phone',
            'can-fax': 'can-fax',
            'can-mail': 'can-mail',
            'can-solicit': 'can-solicit'
        },

        createActionLayout: function() {
            return this.actions || (this.actions = [{
                        id: 'edit',
                        icon: 'content/images/icons/edit_24.png',
                        label: this.editActionText,
                        action: 'navigateToEditView'
                    }, {
                        id: 'callWork',
                        icon: 'content/images/icons/Call_24x24.png',
                        label: this.callWorkActionText,
                        enabled: action.hasProperty.bindDelegate(this, 'WorkPhone'),
                        fn: action.callPhone.bindDelegate(this, 'WorkPhone')
                    }, {
                        id: 'callMobile',
                        icon: 'content/images/icons/Call_24x24.png',
                        label: this.callMobileActionText,
                        enabled: action.hasProperty.bindDelegate(this, 'Mobile'),
                        fn: action.callPhone.bindDelegate(this, 'Mobile')
                    }, {
                        id: 'sendEmail',
                        icon: 'content/images/icons/Send_Write_email_24x24.png',
                        label: this.sendEmailActionText,
                        enabled: action.hasProperty.bindDelegate(this, 'Email'),
                        fn: action.sendEmail.bindDelegate(this, 'Email')
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
            return string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%" or CompanyUpper like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        createRelatedViewLayout: function() {
            return this.relatedViews || (this.relatedViews = [{
                widgetType: HistoryRelatedView,
                id: 'lead_relatedNotes',
                autoLoad: true,
                enabled: true,
                relatedProperty: 'LeadId',
                where: function(entry) { return "LeadId eq '" + entry.$key + "' and Type ne 'atDatabaseChange'"; }
            }]);
        }
    });
});

