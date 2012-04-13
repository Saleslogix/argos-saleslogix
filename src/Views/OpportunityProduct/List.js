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
        formatSearchQuery: function(searchQuery) {
            return string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});