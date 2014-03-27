/*
 * Copyright (c) 1997-2014, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/SalesOrder/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    '../_CardLayoutListMixin',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    format,
    _CardLayoutListMixin,
    List
) {

    return declare('Mobile.SalesLogix.Views.SalesOrder.List', [List, _CardLayoutListMixin], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>Order Number {%: $.reference %}</h3>',
            '<h4>Order Date: {%: $.date %}</h4>',
            '<h4>Status: {%: $.status %}</h4>',
            '<h4>Hold Status: {%: $.statusFlagText %}</h4>',
            '<h4>Type: {%: $.type %}</h4>',
            '<h4>PO Number: {%: $.customerReference %}</h4>',
            '<hr />',
            '<h4>Net Total: {%: $.netTotal %}</h4>',
            //'<h3>Discount Total: {%: $.discountTotal %}</h3>',
            //'<h3>Charges Total: {%: $.chargesTotal %}</h3>',
            '<h4>Tax: {%: $.taxTotal %}</h4>',
            '<h4>Gross: {%: $.grossTotal %}</h4>',
            '<h4>Currency: {%: $.currency %}</h4>',
        ]),

        //Localization
        titleText: 'Sales Orders',

        //View Properties
        id: 'salesorder_list',
        icon: 'content/images/icons/accountant_link_24.png',

        resourceKind: 'tradingAccounts',
        contractName: 'proxy',
        resourceProperty: 'salesOrders',
        querySelect: [
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
        enableSearch: false,
        createRequest: function() {
            var req = this.inherited(arguments);
            if (this.options && this.options.dataSet) {
                this.dataSet = this.options.dataSet;
                req.setDataSet(this.dataSet);
            }

            return req;
        }
    });
});

