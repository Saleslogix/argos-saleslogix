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
        calledText: 'Called ${0}',

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
            'MainPhone',
            'AccountManager/UserInfo/UserName',
            'AccountManager/UserInfo/LastName',
            'AccountManager/UserInfo/FirstName'
        ],
        resourceKind: 'accounts',
        selectIcon: 'content/images/icons/Company_24.png',
        allowSelection: true,
        enableActions: true,

        createActionLayout: function() {
            return this.actions || (this.actions = [{
                    id: 'edit',
                    icon: 'content/images/icons/edit_24.png',
                    label: 'Edit',
                    action: 'navigateToEditView'
                },{
                    id: 'callMain',
                    icon: 'content/images/icons/Call_24x24.png',
                    label: 'Call Main',
                    action: 'callMainPhoneForAccount'
                },{
                    id: 'viewContacts',
                    icon: 'content/images/icons/Contacts_24x24.png',
                    label: 'Contacts',
                    action: 'navigateToContacts'
                },{
                    id: 'addNote',
                    icon: 'content/images/icons/New_Note_24x24.png',
                    label: 'Add Note',
                    action: 'addNoteToAccount'
                },{
                    id: 'addActivity',
                    icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                    label: 'Add Activity',
                    action: 'addActivityToAccount'
                }]
            );
        },
        callMainPhoneForAccount: function(params) {
            var key = params['key'],
                descriptor = params['descriptor'],
                entry = {};
            array.some(this.feed['$resources'], function(item){
                if (item['$key'] === key)
                {
                    entry = item;
                    return true;
                }
            });
            if (!entry['MainPhone']) return;

            action.callPhone(entry['MainPhone'], {
                'Type': 'atPhoneCall',
                'AccountId': key,
                'AccountName': descriptor,
                'Description': string.substitute(this.calledText, [descriptor])
            });
        },
        addActivityToAccount: function(params) {
            var options = {
                entry: {
                    AccountId: params['key'],
                    AccountName: params['descriptor']
                }
            };
            App.navigateToActivityInsertView(options);
        },
        addNoteToAccount: function(params) {
            var view = App.getView('history_edit');
            if (view)
            {
                view.show({
                    entry: {
                        AccountId: params['key'],
                        AccountName: params['descriptor']
                    },
                    insert: true
                });
            }
        },
        navigateToContacts: function(params) {
            var view = App.getView('contact_related'),
                options = {
                    where: string.substitute('Account.id eq "${0}"', [params['key']])
                };

            if (view && options)
                view.show(options);
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('AccountNameUpper like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});