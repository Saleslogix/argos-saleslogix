/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/TicketActivityItem/Detail', ['Sage/Platform/Mobile/Detail'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.TicketActivityItem.Detail', [Sage.Platform.Mobile.Detail], {
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
                },{
                    name: 'ProductActualId',
                    property: 'Product.ActualId',
                    label: this.skuText
                },{
                    name: 'SerialNumber',
                    property: 'AccountProduct.SerialNumber',
                    label: this.serialNumberText
                },{
                    name: 'ItemAmount',
                    property: 'ItemAmount',
                    label: this.itemAmountText,
                    renderer: Mobile.SalesLogix.Format.currency
                },{
                    name: 'ItemDescription',
                    property: 'ItemDescription',
                    label: this.itemDescriptionText
                }]
            }]);
        }
    });
});