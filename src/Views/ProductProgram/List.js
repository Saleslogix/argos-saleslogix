/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/ProductProgram/List', [
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

    return declare('Mobile.SalesLogix.Views.ProductProgram.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Program %}</h3>',
            '<h4>',
            '{%: $.Price %}',
            '</h4>'
        ]),

        //Localization
        titleText: 'Product Programs',

        //View Properties       
        id: 'productprogram_list',
        security: 'Entities/ProductProgram/View',
        icon: 'content/images/icons/product_24.png',
        queryOrderBy: 'Program',
        querySelect: [
            'DefaultProgram',
            'Program',
            'Price'
        ],
        resourceKind: 'productPrograms',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(upper(Program) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

