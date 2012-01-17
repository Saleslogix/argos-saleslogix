/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/TicketActivityItem/Edit', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.TicketActivityItem.Edit', [Sage.Platform.Mobile.Edit], {
        //Localization
        titleText: 'Ticket Activity Part',
        productText: 'product',
        skuText: 'SKU',
        serialNumberText: 'serial',
        priceText: 'price',
        descriptionText: 'description',

        //View Properties
        entityName: 'TicketActivity',
        id: 'ticketactivityitem_edit',
        resourceKind: 'ticketActivityItems',

        setValues: function(values){
            this.inherited(arguments);

            if (values.Product && values.Product.DefaultPrice)
                this.fields['ItemAmount'].setValue(values.Product.DefaultPrice);
        },

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.productText,
                    name: 'ProductName',
                    property: 'Product.Name',
                    type: 'text',
                    readonly: true,
                    exclude: true
                },
                {
                    label: this.skuText,
                    name: 'ActualId',
                    property: 'Product.ActualId',
                    type: 'text',
                    readonly: true,
                    exclude: true
                },
                {
                    label: this.priceText,
                    name: 'ItemAmount',
                    property: 'ItemAmount',
                    type: 'decimal'
                },
                {
                    label: this.descriptionText,
                    name: 'ItemDescription',
                    property: 'ItemDescription',
                    type: 'textarea'
                },
                {
                    name: 'ProductKey',
                    property: 'Product.$key',
                    type: 'hidden',
                    include: true
                },
                {
                    name: 'TicketActivityKey',
                    property: 'TicketActivity.$key',
                    type: 'hidden',
                    include: true
                }
            ]);
        }
    });
});