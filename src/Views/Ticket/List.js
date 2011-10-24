/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Ticket/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Ticket.List', [Sage.Platform.Mobile.List], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-ticket-type="{%: $.Status %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
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

        //View Properties       
        detailView: 'ticket_detail',
        icon: 'content/images/icons/Ticket_24x24.png',
        id: 'ticket_list',
        insertView: 'ticket_edit',
        queryOrderBy: 'TicketNumber',
        insertSecurity: 'Entities/Ticket/Add',
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

        formatSearchQuery: function(query) {
            return dojo.string.substitute(
                'TicketNumber like "${0}%" or AlternateKeySuffix like "${0}%" or upper(Subject) like "${0}%" or Account.AccountNameUpper like "${0}%"',
                [this.escapeSearchQuery(query.toUpperCase())]
            );
        }
    });
});
