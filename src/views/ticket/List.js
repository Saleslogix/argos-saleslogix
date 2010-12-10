/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

(function() {
    Mobile.SalesLogix.Ticket.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.Subject %}</h3>',
            '<h4>{%: $.TicketNumber %}, {%: $.Account ? $.Account.AccountName : "" %}</h4>'
        ]),

        //Localization
        titleText: 'Tickets',
        activitiesText: 'Activities',
        scheduleText: 'Schedule',

        //View Properties       
        detailView: 'ticket_detail',
        icon: 'content/images/icons/job_24.png',
        id: 'ticket_list',
        insertView: 'ticket_edit',
        queryOrderBy: 'TicketNumber',
        querySelect: [
            'Account/AccountName',
            'Contact/NameLF',
            'Subject',
            'TicketNumber'
        ],
        resourceKind: 'tickets',

        formatSearchQuery: function(query) {
            return String.format('TicketNumber like "%{0}%"', query);
        }
    });
})();