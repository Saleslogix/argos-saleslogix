/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Product/List', [
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

    return declare('Mobile.SalesLogix.Views.Product.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Name %} | {%: $.Description %}</h3>',
            '<h4>',
            '{%: $.Family %}',
            '</h4>'
        ]),

        //Localization
        titleText: 'Products',

        //View Properties       
        id: 'product_list',
        security: 'Entities/Product/View',
        icon: 'content/images/icons/product_24.png',
        queryOrderBy: 'Name',
        querySelect: [
            'Description',
            'Name',
            'Family',
            'Price',
            'Program',
            'FixedCost'
        ],
        resourceKind: 'products',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(upper(Name) like "${0}%" or upper(Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

