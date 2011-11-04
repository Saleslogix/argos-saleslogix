/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/TicketActivityItem/List', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.TicketActivityItem.List', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Product.Name %}</h3>',
            '<h4>{%: $.ItemAmount %}</h4>'
        ]),

        //Localization
        titleText: 'Parts',

        //View Properties
        id: 'ticket_activity_item_list',
        security: 'Entities/TicketActivityPart/View',
        icon: 'content/images/icons/product_24.png',
        querySelect: [
            'Product/Name',
            'ItemDescription',
            'ItemAmount',
            'ItemQuantity',
            'ItemTotalAmount'
        ],
        resourceKind: 'ticketActivityItems',


        // feed example:
        // http://50.16.242.109/sdata/slx/dynamic/-/ticketActivityItems?format=json&where=TicketActivity.Id%20eq%20'QDEMOA0007G5'

        // which is tied to this ticket activity:
        // http://50.16.242.109/sdata/slx/dynamic/-/ticketActivities('QDEMOA0007G5')?format=json

        // which is tied to this ticket
        // http://50.16.242.109/sdata/slx/dynamic/-/tickets('tDEMOA00000K')?format=json


        formatSearchQuery: function(query) {
            return dojo.string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});
