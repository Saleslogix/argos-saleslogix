define('Mobile/SalesLogix/Views/Contact/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Action',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    action,
    List
) {

    return declare('Mobile.SalesLogix.Views.Contact.List', [List], {
        //Template
        itemTemplate: new Simplate([
            '<h3>{%: $.NameLF %}</h3>',
            '<h4>{%: $.AccountName %}</h4>'
        ]),

        //Localization
        titleText: 'Contacts',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',
        editActionText: 'Edit',
        callMainActionText: 'Call Main',
        callMobileActionText: 'Call Mobile',
        sendEmailActionText: 'Email',
        viewAccountActionText: 'Account',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',

        //View Properties        
        detailView: 'contact_detail',
        icon: 'content/images/icons/Contacts_24x24.png',
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
            'Email'
        ],
        resourceKind: 'contacts',
        selectIcon: 'content/images/icons/Contacts_24x24.png',
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
                    fn: action.callPhone.bindDelegate(this, 'WorkPhone', this.getEntry)
                },{
                    id: 'callMobile',
                    icon: 'content/images/icons/Call_24x24.png',
                    label: this.callMobileActionText,
                    fn: action.callPhone.bindDelegate(this, 'Mobile', this.getEntry)
                },{
                    id: 'viewAccount',
                    icon: 'content/images/icons/Company_24.png',
                    label: this.viewAccountActionText,
                    fn: action.navigateToEntity.bindDelegate(this, {
                        view: 'account_detail',
                        keyProperty: 'Account.$key',
                        textProperty: 'AccountName',
                        entry: this.getEntry
                    })
                },{
                    id: 'sendEmail',
                    icon: 'content/images/icons/Send_Write_email_24x24.png',
                    label: this.sendEmailActionText,
                    fn: action.sendEmail.bindDelegate(this, 'Email', this.getEntry)
                },{
                    id: 'addNote',
                    icon: 'content/images/icons/New_Note_24x24.png',
                    label: this.addNoteActionText,
                    fn: action.addNote.bindDelegate(this, this.getEntry)
                },{
                    id: 'addActivity',
                    icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                    label: this.addActivityActionText,
                    fn: action.addActivity.bindDelegate(this, this.getEntry)
                }]
            );
        },
        getEntry: function(key, descriptor) {
            var selectedEntry = this.entries[key];
            return {
                'selectedEntry': selectedEntry,
                'entry': {
                    'ContactId': key,
                    'ContactName': descriptor,
                    'AccountId': selectedEntry['Account']['$key'],
                    'AccountName': selectedEntry['AccountName']
                }
            };
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});