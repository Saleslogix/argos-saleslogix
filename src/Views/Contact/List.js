/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Contact/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/array',
    'Mobile/SalesLogix/Action',
    'Sage/Platform/Mobile/Format',
    'Sage/Platform/Mobile/Convert',
    'Mobile/SalesLogix/Views/History/RelatedView',
    'Sage/Platform/Mobile/List',
    '../_MetricListMixin',
     'Mobile/SalesLogix/Views/_CardLayoutListMixin',
    '../_RightDrawerListMixin'
], function(
    declare,
    string,
    array,
    action,
    format,
    Convert,
    HistoryRelatedView,
    List,
    _MetricListMixin,
    _CardLayoutListMixin,
    _RightDrawerListMixin
) {

    return declare('Mobile.SalesLogix.Views.Contact.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
        //Template
        //Card Layout
        itemIcon: 'content/images/icons/ContactProfile_48x48.png',
        itemTemplate: new Simplate([
            '<h3>{%: $.NameLF %}</h3>',
            '<h4>{% if($.Title) { %} {%: $.Title %} | {% } %} {%: $.AccountName %}</h4>',
            '<h4>{%: $.WebAddress %}</h4>',
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
            '{% if ($.Email) { %}',
                '<h4>',
                    '{%: $.Email %}',
                '</h4>',
            '{% } %}'
        ]),

        //Localization
        titleText: 'Contacts',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',
        editActionText: 'Edit',
        callMainActionText: 'Call Main',
        callWorkActionText: 'Call Work',
        callMobileActionText: 'Call Mobile',
        sendEmailActionText: 'Email',
        viewAccountActionText: 'Account',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',
        addAttachmentActionText: 'Add Attachment',
        phoneAbbreviationText: 'Work: ',
        mobileAbbreviationText: 'Mobile: ',

        //View Properties
        detailView: 'contact_detail',
        icon: 'content/images/icons/Contacts_24x24.png',
        cardLayoutIcon: 'content/images/icons/ContactProfile_48x48.png',
        id: 'contact_list',
        security: 'Entities/Contact/View',
        insertView: 'contact_edit',
        queryOrderBy: 'LastNameUpper,FirstName',
        querySelect: [
            'AccountName',
            'Account/AccountName',
            'NameLF',
            'WorkPhone',
            'Mobile',
            'Email',
            'Title',
            'LastHistoryDate',
            'ModifyDate'
        ],
        resourceKind: 'contacts',
        entityName: 'Contact',
        enableActions: true,
        defaultSearchTerm: function() {
            return '#' + this.hashTagQueriesText['my-contacts'];
        },
        hashTagQueries: {
            'my-contacts': function() {
                return 'AccountManager.Id eq "' + App.context.user.$key + '"';
            },
            'primary': 'IsPrimary eq true',
            'not-primary': 'IsPrimary eq false',
            'can-email': 'DoNotEmail eq false',
            'can-phone': 'DoNotPhone eq false',
            'can-fax': 'DoNotFax eq false',
            'can-mail': 'DoNotMail eq false',
            'can-solicit': 'DoNotSolicit eq false'
        },
        hashTagQueriesText: {
            'my-contacts': 'my-contacts',
            'primary': 'primary',
            'not-primary': 'not-primary',
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
                        id: 'viewAccount',
                        icon: 'content/images/icons/Company_24.png',
                        label: this.viewAccountActionText,
                        enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
                        fn: action.navigateToEntity.bindDelegate(this, {
                            view: 'account_detail',
                            keyProperty: 'Account.$key',
                            textProperty: 'AccountName'
                        })
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
            return string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        createRelatedViewLayout: function() {
            return this.relatedViews || (this.relatedViews = [{
                widgetType: HistoryRelatedView,
                id: 'contact_relatedNotes',
                autoLoad:true,
                enabled: true,
                relatedProperty: 'ContactId',
                where: function(entry) { return "ContactId eq '" + entry.$key + "' and Type ne 'atDatabaseChange'"; }
            }]);
        }
    });
});

