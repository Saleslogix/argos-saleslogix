/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/TicketActivityItem/ProductList', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.TicketActivityItem.ProductList', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Name %}',
                '{% if ($.Family) { %}',
                    '- {%: $.Family %}',
                '{% } %}',
            '</h3>',
            '<h4>{%: $.Price %}</h4>'
        ]),

        //Localization
        titleText: 'Products',

        //View Properties
        id: 'ticket_activity_item_product_list',
        security: 'Entities/TicketActivityItem/View',
        expose: false,
        icon: 'content/images/icons/product_24.png',
        queryOrderBy: 'Sort',
        querySelect: [
            'Name',
            'Family',
            'Program',
            'Price'
        ],
        resourceKind: 'products',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('(upper(Name) like "${0}%" or upper(Family) like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});
