/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.OpportunityProduct.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
define('crm/Views/OpportunityProduct/List', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    '../../Format',
    'argos/List'
], function (declare, lang, string, format, List) {
    var __class = declare('crm.Views.OpportunityProduct.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Product.Name %}</h3>',
            '<h4>',
            '{% if ($.Product) { %} {%: $.Product.Family %} | {% } %}',
            '{%: $.Program %} | {%: crm.Format.currency($.Price) %}',
            '</h4>',
            '<h4>',
            '{%: $.Quantity %} x {%: crm.Format.currency($.CalculatedPrice) %} ',
            '({%: crm.Format.percent($.Discount) %}) = ',
            '<strong>',
            '{% if (App.hasMultiCurrency()) { %}',
            '{%: crm.Format.multiCurrency($.ExtendedPrice, App.getBaseExchangeRate().code) %}',
            '{% } else { %}',
            '{%: crm.Format.currency($.ExtendedPrice) %}',
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
        formatSearchQuery: function (searchQuery) {
            return string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.OpportunityProduct.List', __class);
    return __class;
});
