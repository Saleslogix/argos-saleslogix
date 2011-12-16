/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/TicketActivityItem/ProductList', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.TicketActivityItem.ProductList', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Name %}</h3>',
            '<h4>{%: $.ActualId %}</h4>',
            '<h4>{%: $.Description %}</h4>'
        ]),

        //Localization
        titleText: 'Products',

        //View Properties
        id: 'ticketactivityitem_productlist',
        security: 'Entities/TicketActivityItem/View',
        expose: false,
        icon: 'content/images/icons/product_24.png',
        queryOrderBy: 'Name asc',
        querySelect: [
            'ActualId',
            'Name',
            'Description'
        ],
        resourceKind: 'products',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('(upper(Name) like "${0}%" or upper(Family) like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});
