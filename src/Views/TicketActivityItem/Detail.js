/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/TicketActivityItem/Detail', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    format,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.TicketActivityItem.Detail', [Detail], {
        //Localization
        titleText: 'Ticket Activity Part',
        productNameText: 'product',
        skuText: 'SKU',
        serialNumberText: 'serial #',
        itemAmountText: 'price',
        itemDescriptionText: 'description',

        //View Properties
        id: 'ticketactivityitem_detail',

        querySelect: [
            'Product/Name',
            'Product/ActualId',
            'AccountProduct/SerialNumber',
            'ItemDescription',
            'ItemAmount',
            'TicketActivity/$key'
        ],
        resourceKind: 'ticketActivityItems',

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            name: 'ProductName',
                            property: 'Product.Name',
                            label: this.productNameText
                        }, {
                            name: 'ProductActualId',
                            property: 'Product.ActualId',
                            label: this.skuText
                        }, {
                            name: 'SerialNumber',
                            property: 'AccountProduct.SerialNumber',
                            label: this.serialNumberText
                        }, {
                            name: 'ItemAmount',
                            property: 'ItemAmount',
                            label: this.itemAmountText,
                            renderer: format.currency
                        }, {
                            name: 'ItemDescription',
                            property: 'ItemDescription',
                            label: this.itemDescriptionText
                        }]
                }]);
        }
    });
});

