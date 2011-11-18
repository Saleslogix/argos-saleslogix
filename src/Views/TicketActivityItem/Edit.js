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
        quantityText: 'quantity',

        //View Properties
        entityName: 'TicketActivityItem',
        id: 'ticket_activity_item_edit',
        insertSecurity: 'Entities/TicketActivityItem/Add',
        updateSecurity: 'Entities/TicketActivityItem/Edit',
        querySelect: [
            'Product/Name',
            'ItemDescription',
            'ItemAmount',
            'ItemQuantity',
            'ItemTotalAmount'
        ],
        resourceKind: 'ticketActivityItems',

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.productText,
                    name: 'Product',
                    property: 'Product',
                    textProperty: 'Name',
                    type: 'lookup',
                    view: 'ticket_activity_item_product_list'
                },
                {
                    label: this.quantityText,
                    name: 'ItemQuantity',
                    property: 'ItemQuantity',
                    type: 'text'
                }
            ]);
        }
    });
});