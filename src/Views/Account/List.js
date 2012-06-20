define('Mobile/SalesLogix/Views/Account/List', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'Mobile/SalesLogix/Action',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    array,
    string,
    action,
    List
) {

    return declare('Mobile.SalesLogix.Views.Account.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.AccountName %}</h3>',
            '<h4>{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %}</h4>'
        ]),

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
            'MainPhone'
        ],
        resourceKind: 'accounts',
        allowSelection: true,
        enableActions: true,

        createActionLayout: function() {
            return this.actions || (this.actions = [{
                    id: 'edit',
                    icon: 'content/images/icons/edit_24.png',
                    label: this.editActionText,
                    action: 'navigateToEditView'
                },{
                    id: 'callMain',
                    icon: 'content/images/icons/Call_24x24.png',
                    label: this.callMainActionText,
                    enabled: action.hasProperty.bindDelegate(this, 'MainPhone'),
                    fn: action.callPhone.bindDelegate(this, 'MainPhone')
                },{
                    id: 'viewContacts',
                    icon: 'content/images/icons/Contacts_24x24.png',
                    label: this.viewContactsActionText,
                    fn: this.navigateToRelatedView.bindDelegate(this, 'contact_related', 'Account.id eq "${0}"')
                },{
                    id: 'addNote',
                    icon: 'content/images/icons/New_Note_24x24.png',
                    label: this.addNoteActionText,
                    fn: action.addNote.bindDelegate(this)
                },{
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