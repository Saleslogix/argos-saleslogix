define('Mobile/SalesLogix/Views/Ticket/List', [
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

    return declare('Mobile.SalesLogix.Views.Ticket.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.TicketNumber %} <span class="p-ticket-subject"> {%: $.Subject %} </span></h3>',
            '<h4>{%: $.Account ? ($.Contact.NameLF + " / " + $.Account.AccountName) : "" %}</h4>',
            '<h4>{%: $.Area ? ($.Area + " | ") : "" %} {%: $.AssignedTo ? $.AssignedTo.OwnerDescription : this.notAssignedText %}</h4>'
        ]),

        //Localization
        titleText: 'Tickets',
        activitiesText: 'Activities',
        scheduleText: 'Schedule',
        notAssignedText: 'Not assigned',
        editActionText: 'Edit',
        viewAccountActionText: 'Account',
        viewContactActionText: 'Contact',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',

        //View Properties       
        detailView: 'ticket_detail',
        icon: 'content/images/icons/Ticket_24x24.png',
        id: 'ticket_list',
        security: 'Entities/Ticket/View',
        insertView: 'ticket_edit',
        queryOrderBy: 'TicketNumber',
        querySelect: [
            'Account/AccountName',
            'Area',
            'AssignedTo/OwnerDescription',
            'Contact/NameLF',
            'ReceivedDate',
            'StatusCode',
            'Subject',
            'TicketNumber',
            'UrgencyCode'
        ],
        resourceKind: 'tickets',
        allowSelection: true,
        enableActions: true,

        createActionLayout: function() {
            return this.actions || (this.actions = [{
                    id: 'edit',
                    icon: 'content/images/icons/edit_24.png',
                    label: this.editActionText,
                    action: 'navigateToEditView'
                },{
                    id: 'viewAccount',
                    icon: 'content/images/icons/Company_24.png',
                    label: this.viewAccountActionText,
                    enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
                    fn: action.navigateToEntity.bindDelegate(this, {
                        view: 'account_detail',
                        keyProperty: 'Account.$key',
                        textProperty: 'Account.AccountName'
                    })
                },{
                    id: 'viewContact',
                    icon: 'content/images/icons/Contacts_24x24.png',
                    label: this.viewContactActionText,
                    enabled: action.hasProperty.bindDelegate(this, 'Contact.$key'),
                    fn: action.navigateToEntity.bindDelegate(this, {
                        view: 'contact_detail',
                        keyProperty: 'Contact.$key',
                        textProperty: 'Contact.NameLF'
                    })
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
            return string.substitute(
                'TicketNumber like "${0}%" or AlternateKeySuffix like "${0}%" or upper(Subject) like "${0}%" or Account.AccountNameUpper like "${0}%"',
                [this.escapeSearchQuery(searchQuery.toUpperCase())]
            );
        }
    });
});