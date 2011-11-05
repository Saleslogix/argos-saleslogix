/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/OpportunityProduct/List', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.OpportunityProduct.List', [Sage.Platform.Mobile.List], {
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
            '<b>{%: Mobile.SalesLogix.Format.currency($.ExtendedPrice) %}</b>',
            '</h4>'
        ]),

        //Localization
        titleText: 'Products',

        //View Properties       
        id: 'opportunityproduct_list',
        security: 'Entities/OpportunityProduct/View',
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
        
        createToolLayout: function() {
            return this.tools || (this.tools = {
                tbar: []
            });
        },
        formatSearchQuery: function(query) {
            return dojo.string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});
