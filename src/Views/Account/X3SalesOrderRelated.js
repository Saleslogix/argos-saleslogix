/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Account/X3SalesOrderRelated', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/RelatedViewWidget',
    'moment'
], function(
    declare,
    format,
    convert,
    RelatedViewWidget,
    moment
) {
    return declare('Mobile.SalesLogix.Views.History.X3SalesOrderRelated', [RelatedViewWidget], {
        id: 'relatedSalesOrders',
        icon: 'content/images/icons/journal_24.png',
        itemIcon: 'content/images/icons/journal_24.png',
        title: 'Accounting Sales Orders',
        enabled: true,
        showTab: false,
        enableActions: false,
        showTotalInTab: false,
        showSelectMore: true,
        hideWhenNoData: true,
        resourceKind: 'tradingAccounts',
        contractName: 'proxy',
        resourceProperty: 'salesOrders',
        select: [
            'Id',
            '$key',
            'reference',
            'date',
            'status',
            'statusFlagText',
            'type',
            'customerReference',
            'netTotal',
            'discountTotal',
            'chargesTotal',
            'taxTotal',
            'grossTotal',
            'currency'
        ],
        pageSize: 3,
        relatedItemHeaderTemplate: new Simplate([
            '<h4 ><strong>{%: $$.getDescription($) %}</strong></h4>'
        ]),
        relatedItemDetailTemplate: new Simplate([
            '<div>',
                '<p></p>',
                '<h3>Order Date: {%: $.date %}</h3>',
                '<h3>Status: {%: $.status %}</h3>',
                '<h3>Hold Status: {%: $.statusFlagText %}</h3>',
                '<h3>Type: {%: $.type %}</h3>',
                '<h3>PO Number: {%: $.customerReference %}</h3>',
                '<p></p>',
                '<h3>Net Total: {%: $.netTotal %}</h3>',
                //'<h3>Discount Total: {%: $.discountTotal %}</h3>',
                //'<h3>Charges Total: {%: $.chargesTotal %}</h3>',
                '<h3>Tax: {%: $.taxTotal %}</h3>',
                '<h3>Gross: {%: $.grossTotal %}</h3>',
                '<h3>Currency: {%: $.currency %}</h3>',
            '</div>'
        ]),
        relatedViewHeaderTemplate: new Simplate([
             '<div class="line-bar"></div>'
        ]),
        relatedViewFooterTemplate: new Simplate([
            '<div  data-dojo-attach-point="selectMoreNode" class="action" data-dojo-attach-event="onclick:onSelectMoreData"></div>'
        ]),
        getDescription: function(entry) {
            return 'Order Number: ' + entry.reference;
        },
        fetchData: function() {
            if (!this.parentEntry.OperatingCompany) {
                return [];
            }

            return this.inherited(arguments);
        },
        getQueryOptions: function() {
            var options = this.inherited(arguments);
            if (this.parentEntry && this.parentEntry.OperatingCompany) {
                options.dataSet = this.parentEntry.OperatingCompany.$key;
                options.resourceProperty = this.resourceProperty;
                options.resourcePredicate = "$uuid eq '" + this.parentEntry.$uuid + "'";
            }

            return options;
        }
    });
});
