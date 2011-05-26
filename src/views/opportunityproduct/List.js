/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.OpportunityProduct");

(function() {
    Mobile.SalesLogix.OpportunityProduct.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
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
        
        init: function() {
            Mobile.SalesLogix.OpportunityProduct.List.superclass.init.apply(this, arguments);

            this.tools.tbar = [];
        },

        formatSearchQuery: function(query) {
            return String.format('(upper(Product.Name) like "{0}%" or upper(Product.Family) like "{0}%")', this.escapeSearchQuery(query.toUpperCase()));
        }
    });
})();
