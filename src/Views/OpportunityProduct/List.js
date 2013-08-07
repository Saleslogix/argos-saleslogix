/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/OpportunityProduct/List', [
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

    return declare('Mobile.SalesLogix.Views.OpportunityProduct.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Product.Name %}</h3>',
            '<h4>',
                '{% if ($.Product) { %} {%: $.Product.Family %} | {% } %}',
                '{%: $.Program %} | {%: Mobile.SalesLogix.Format.currency($.Price) %}',
            '</h4>',
            '<h4>',
                '{%: $.Quantity %} x {%: Mobile.SalesLogix.Format.currency($.CalculatedPrice) %} ',
                '({%: Mobile.SalesLogix.Format.percent($.Discount) %}) = ',
                '<strong>',
                    '{% if (App.hasMultiCurrency()) { %}',
                        '{%: Mobile.SalesLogix.Format.multiCurrency($.ExtendedPrice, App.getBaseExchangeRate().code) %}',
                    '{% } else { %}',
                        '{%: Mobile.SalesLogix.Format.currency($.ExtendedPrice) %}',
                    '{% } %}',
                '</strong>',
            '</h4>'
        ]),

        //Localization
        titleText: 'Products',

        //View Properties       
        id: 'opportunityproduct_list',
        security: 'Entities/Opportunity/View',
        detailView: 'opportunityproduct_detail',
        insertView: 'opportunityproduct_edit',
        icon: 'content/images/icons/product_24.png',
        queryOrderBy: 'Sort',
        querySelect: [
            'Product/Name',
            'Product/Family',
            'Program',
            'Price',
            'Discount',
            'CalculatedPrice',
            'Quantity',
            'ExtendedPrice'
        ],
        resourceKind: 'opportunityproducts',
        allowSelection: true,
        enableActions: true,

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

