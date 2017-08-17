/**
 * @class crm.Integrations.BOE.Views.ERPInvocieItems.Detail
 *
 *
 * @extends argos.Detail
 * @requires argos.Detail
 * @requires crm.Format
 * @requires crm.Template
 *
 */
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from 'crm/Format';
import Detail from 'argos/Detail';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoiceItemsDetail');

const __class = declare('crm.Integrations.BOE.Views.ERPInvociesItems.Detail', [Detail], /** @lends crm.Integrations.BOE.Views.ERPInvocieItems.Detail# */ {
  // Localization
  titleText: resource.titleText,
  invoiceNumberText: resource.invoiceNumberText,
  lineText: resource.lineText,
  quantityText: resource.quantityText,
  priceText: resource.priceText,
  amountText: resource.amountText,
  productNameText: resource.productNameText,
  descriptionText: resource.descriptionText,
  totalText: resource.totalText,
  requestedDeliveryDateText: resource.requestedDeliveryDateText,
  unitPriceText: resource.unitPriceText,
  salesOrderNumberText: resource.salesOrderNumberText,
  unitPricePerQuanityText: resource.unitPricePerQuanityText,
  unitPricePerQuanityUOMText: resource.unitPricePerQuanityUOMText,
  salesOrderLineNumberText: resource.salesOrderLineNumberText,
  extendedCostText: resource.extendedCostText,
  entityText: resource.entityText,

  // View Properties
  id: 'invoice_item_detail',
  modelName: MODEL_NAMES.ERPINVOICEITEM,
  resourceKind: 'erpInvoiceItems',
  enableOffline: true,

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.actionsText,
      list: true,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'ErpLineNumber',
        property: 'ErpLineNumber',
        label: this.lineText,
      }, {
        name: 'ErpInvoice.InvoiceNumber',
        property: 'ErpInvoice.InvoiceNumber',
        label: this.invoiceNumberText,
        descriptor: 'InvoiceNumber',
        view: 'invoice_detail',
        key: 'ErpInvoice.$key',
      }, {
        name: 'ProductName',
        property: 'ProductName',
        label: this.productNameText,
      }, {
        name: 'Description',
        property: 'Description',
        label: this.descriptionText,
      }, {
        name: 'Quantity',
        property: 'Quantity',
        label: this.quantityText,
        renderer: (function renderer(val) {
          if (val) {
            if (this.entry.UnitOfMeasure) {
              return format.multiCurrency.call(null, val, this.entry.UnitOfMeasure.Name);
            }
            return format.currency.call(null, val);
          }
        }).bindDelegate(this),
      }, {
        label: this.amountText,
        property: 'ExtendedPrice',
        renderer: (this.formatMultiCurrency).bindDelegate(this),
      }, {
        label: this.extendedCostText,
        property: 'ExtendedCost',
        renderer: (this.formatMultiCurrency).bindDelegate(this),
      }, {
        label: this.totalText,
        name: 'ErpLineTotalAmount',
        property: 'ErpLineTotalAmount',
        renderer: (this.formatMultiCurrency).bindDelegate(this),
      }, {
        name: 'ErpRequestedDeliveryDate',
        property: 'ErpRequestedDeliveryDate',
        label: this.requestedDeliveryDateText,
        renderer: (function renderer(val) {
          return format.date.call(null, val);
        }).bindDelegate(this),
      }, {
        name: 'SalesOrder',
        property: 'SalesOrder.SalesOrderNumber',
        label: this.salesOrderNumberText,
        descriptor: 'SalesOrderNumber',
        view: 'salesorder_detail',
        key: 'SalesOrder.$key',
      }, {
        name: 'SalesOrderLineNumber',
        property: 'SalesOrderLineReference',
        label: this.salesOrderLineNumberText,
      }, {
        label: this.unitPriceText,
        name: 'BaseUnitPrice',
        property: 'BaseUnitPrice',
        renderer: (function renderer(val) {
          if (val) {
            if (App.hasMultiCurrency()) {
              if (this.entry.BaseCurrencyCode) {
                return format.multiCurrency.call(null, val, this.entry.BaseCurrencyCode);
              }
              return format.currency.call(null, val);
            }
          }
          return format.currency.call(null, val);
        }).bindDelegate(this),
      }, {
        label: this.unitPricePerQuanityText,
        property: 'ErpUnitPricePerQuanity',
        renderer: (function renderer(val) {
          if (val) {
            if (this.entry.ErpUnitPricePerQuanityUOM) {
              return format.multiCurrency.call(null, val, this.entry.ErpUnitPricePerQuanityUOM);
            }
            return format.currency.call(null, val);
          }
        }).bindDelegate(this),
      }],
    }]);
  },
  formatMultiCurrency: function formatMultiCurrency(val) {
    if (App.hasMultiCurrency() && val) {
      if (this.entry.ErpInvoice.CurrencyCode) {
        return format.multiCurrency.call(null, val, this.entry.ErpInvoice.CurrencyCode);
      }
      return format.currency.call(null, val);
    }
    return format.currency.call(null, val);
  },
});

lang.setObject('icboe.Views.ERPInvociesItems.Detail', __class);
export default __class;
