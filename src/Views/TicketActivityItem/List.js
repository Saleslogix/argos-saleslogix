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
        id: 'ticketactivityitem_list',
        insertView: 'ticketactivityitem_edit',
        insertSecurity: 'Entities/TicketActivityItem/Add',
        security: 'Entities/TicketActivityItem/View',
        expose: false,
        icon: 'content/images/icons/product_24.png',
        querySelect: [
            'Product/Name',
            'ItemDescription',
            'ItemAmount',
            'ItemQuantity',
            'ItemTotalAmount'
        ],
        resourceKind: 'ticketActivityItems',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});
