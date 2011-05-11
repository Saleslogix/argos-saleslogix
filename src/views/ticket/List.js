/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

(function() {
    Mobile.SalesLogix.Ticket.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        itemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-ticket-type="{%: $.Status %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
        contentTemplate: new Simplate([
            '<h3>{%: $.TicketNumber %} <span class="p-ticket-subject"> {%: $.Subject %} </span></h3>',
            '<h4>{%: $.Account ? ($.Contact.NameLF + " / " + $.Account.AccountName) : "" %}</h4>',
            '<h4>{%: $.Area ? ($.Area + " | ") : "" %} {%: $.AssignedTo.OwnerDescription %}</h4>'
        ]),

        //Localization
        titleText: 'Tickets',
        activitiesText: 'Activities',
        scheduleText: 'Schedule',

        //View Properties       
        detailView: 'ticket_detail',
        icon: 'content/images/icons/Ticket_24x24.png',
        id: 'ticket_list',
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

        formatSearchQuery: function(query) {
            return String.format(
                'TicketNumber like "{0}%" or AlternateKeySuffix like "{0}%" or upper(Subject) like "{0}%" or Account.AccountNameUpper like "{0}%"',
                this.escapeSearchQuery(query.toUpperCase())
            );
        }
    });
})();
