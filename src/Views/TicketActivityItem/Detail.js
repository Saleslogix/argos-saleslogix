import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import Detail from 'argos/Detail';

/**
 * @class crm.Views.TicketActivityItem.Detail
 *
 * @extends argos.Detail
 *
 * @requires crm.Format
 */
var __class = declare('crm.Views.TicketActivityItem.Detail', [Detail], {
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

lang.setObject('Mobile.SalesLogix.Views.TicketActivityItem.Detail', __class);
export default __class;
