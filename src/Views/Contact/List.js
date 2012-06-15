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
                    enabled: action.hasProperty.bindDelegate(this, 'WorkPhone'),
                    fn: action.callPhone.bindDelegate(this, 'WorkPhone')
                },{
                    id: 'callMobile',
                    icon: 'content/images/icons/Call_24x24.png',
                    label: this.callMobileActionText,
                    enabled: action.hasProperty.bindDelegate(this, 'Mobile'),
                    fn: action.callPhone.bindDelegate(this, 'Mobile')
                },{
                    id: 'viewAccount',
                    icon: 'content/images/icons/Company_24.png',
                    label: this.viewAccountActionText,
                    enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
                    fn: action.navigateToEntity.bindDelegate(this, {
                        view: 'account_detail',
                        keyProperty: 'Account.$key',
                        textProperty: 'AccountName'
                    })
                },{
                    id: 'sendEmail',
                    icon: 'content/images/icons/Send_Write_email_24x24.png',
                    label: this.sendEmailActionText,
                    enabled: action.hasProperty.bindDelegate(this, 'Email'),
                    fn: action.sendEmail.bindDelegate(this, 'Email')
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
            return string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});