/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/TicketActivityItem/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    format,
    List
) {

    return declare('Mobile.SalesLogix.Views.TicketActivityItem.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Product.Name %}</h3>',
            '<h4>{%: $.Product.ActualId %} - {%: Mobile.SalesLogix.Format.currency($.ItemAmount) %}</h4>',
            '<h4>{%: $.ItemDescription %}</h4>'
        ]),

        //Localization
        titleText: 'Ticket Activity Parts',

        //View Properties
        id: 'ticketactivityitem_list',
        detailView: 'ticketactivityitem_detail',
        expose: false,
        icon: 'content/images/icons/product_24.png',
        querySelect: [
            'Product/Name',
            'Product/ActualId',
            'ItemDescription',
            'ItemAmount'
        ],
        resourceKind: 'ticketActivityItems',

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

