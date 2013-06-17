define('Mobile/SalesLogix/Views/Account/List', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'Mobile/SalesLogix/Action',
    'Sage/Platform/Mobile/Format',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    array,
    string,
    action,
    format,
    utility,
    List
) {

    return declare('Mobile.SalesLogix.Views.Account.List', [List], {
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
                    '{%: $$.phoneAbbreviationText + Sage.Platform.Mobile.Format.phone($.MainPhone) %}',
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
        phoneAbbreviationText: 'Phone: ',
        faxAbbreviationText: 'Fax: ',

        //View Properties        
        detailView: 'account_detail',
        icon: 'content/images/icons/Company_24.png',
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
            'MainPhone',
            'WebAddress',
            'Industry',
            'LeadSource/Description',
            'MainPhone',
            'Fax',
            'Status',
            'SubType',
            'Type'
        ],
        resourceKind: 'accounts',
        allowSelection: true,
        enableActions: true,
        pageSize: 10,

        createActionLayout: function() {
            return this.actions || (this.actions = [{
                        id: 'edit',
                        icon: 'content/images/icons/edit_24.png',
                        label: this.editActionText,
                        action: 'navigateToEditView'
                    }, {
                        id: 'callMain',
                        icon: 'content/images/icons/Call_24x24.png',
                        label: this.callMainActionText,
                        enabled: action.hasProperty.bindDelegate(this, 'MainPhone'),
                        fn: action.callPhone.bindDelegate(this, 'MainPhone')
                    }, {
                        id: 'viewContacts',
                        icon: 'content/images/icons/Contacts_24x24.png',
                        label: this.viewContactsActionText,
                        fn: this.navigateToRelatedView.bindDelegate(this, 'contact_related', 'Account.id eq "${0}"')
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
                    }]
            );
        },

        formatSearchQuery: function(searchQuery) {
            return string.substitute('AccountNameUpper like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

