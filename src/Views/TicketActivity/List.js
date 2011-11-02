/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/TicketActivity/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.TicketActivity.List', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.ActivityType %} ({%: $.PublicAccess %})</h3>',
            '<h4>{%: Mobile.SalesLogix.Format.date($.AssignedDate, $$.startDateFormatText) %} - {%: $.ModifyUser %}</h4>',
            '<h4>{%: $.ActivityDescription %}</h4>'
        ]),

        //Localization
        titleText: 'Ticket Activities',
        startDateFormatText: 'MM/dd/yyyy',

        //View Properties       
        id: 'ticket_activity_list',
        security: 'Entities/TicketActivity/View',
        expose: false,
        detailView: 'ticket_activity_detail',
        insertView: 'ticket_activity_edit',
        queryOrderBy: 'AssignedDate asc',
        querySelect: [
            'ActivityType',
            'ActivityDescription',
            'AssignedDate',
            'PublicAccess',
            'ModifyUser'
        ],
        resourceKind: 'ticketActivities',

        formatSearchQuery: function(query) {
            return dojo.string.substitute(
                'ActivityDescription like "${0}%" or ActivityType like "${0}%"',
                [this.escapeSearchQuery(query.toUpperCase())]
            );
        }
    });
});
