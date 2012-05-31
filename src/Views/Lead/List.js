define('Mobile/SalesLogix/Views/Lead/List', [
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

    return declare('Mobile.SalesLogix.Views.Lead.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.LeadNameLastFirst %}</h3>',
            '<h4>{%: $.Company %}</h4>'
        ]),

        //Localization
        titleText: 'Leads',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',
        emailedText: 'E-mailed ${0}',
        calledText: 'Called ${0}',
        editActionText: 'Edit',
        callMainActionText: 'Call Main',
        sendEmailActionText: 'Email',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',

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
            'Email',
            'WorkPhone'
        ],
        resourceKind: 'leads',
        selectIcon: 'content/images/icons/Leads_24x24.png',
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
                selectedEntry: selectedEntry,
                entry: {
                    'LeadId': key,
                    'LeadName': descriptor,
                    'AccountName': selectedEntry['Company']
                }
            };
        },

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%" or CompanyUpper like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});