/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Ticket");

Mobile.SalesLogix.Ticket.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<h3>{%: $.Account ? $.Account.AccountName : "" %}</h3>',
        '<h4>{%: $.TicketNumber %}</h4>'       
    ]),
    id: 'ticket_list',
    icon: 'content/images/Ticket_List_3D_32x32.gif',
    titleText: 'Tickets',
    insertView: 'ticket_edit',
    contextView: 'context_dialog',
    resourceKind: 'tickets',
    queryInclude: [
        'Account'
    ],
    querySelect: [
        'Account/AccountName',
        'TicketNumber'
    ],
    queryOrderBy: 'TicketNumber',
    formatSearchQuery: function(query) {
        return String.format('TicketNumber like "%{0}%"', query);
    }
});
