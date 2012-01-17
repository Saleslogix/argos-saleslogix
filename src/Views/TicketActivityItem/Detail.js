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

        removeItemTitleText: 'Remove Item',
        confirmDeleteText: 'Remove "${0}" from the ticket activity?',

        //View Properties
        id: 'ticketactivityitem_detail',
        editView: 'ticketactivityitem_edit',
        querySelect: [
            'Product/Name',
            'Product/ActualId',
            'AccountProduct/SerialNumber',
            'ItemDescription',
            'ItemAmount',
            'TicketActivity/$key'
        ],
        resourceKind: 'ticketActivityItems',

        createEntryForDelete: function(){
           var entry = {
                '$key': this.entry['$key'],
                '$etag': this.entry['$etag'],
                '$name': this.entry['$name']
            };
            return entry;
        },
        removeItem: function(){
            var confirmMessage = dojo.string.substitute(this.confirmDeleteText, [this.entry.Product.Name]);
            if (!confirm(confirmMessage))
                return;

            var entry = this.createEntryForDelete(),
                request = this.createRequest();
            if (request)
                request['delete'](entry, {
                    success: this.onDeleteSuccess,
                    failure: this.onRequestDataFailure,
                    scope: this
                });
        },
        onDeleteSuccess: function(){
            App.onRefresh({resourceKind: this.resourceKind});
            ReUI.back();
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': [{
                    id: 'edit',
                    action: 'navigateToEditView',
                    security: App.getViewSecurity(this.editView, 'update')
                },{
                    id: 'removeItem',
                    icon: 'content/images/icons/del_24.png',
                    action: 'removeItem',
                    title: this.removeItemTitleText
                }]
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
                }]
            },{
                title: this.moreDetailsText,
                name: 'MoreDetailsSection',
                collapsed: true,
                children: [{
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