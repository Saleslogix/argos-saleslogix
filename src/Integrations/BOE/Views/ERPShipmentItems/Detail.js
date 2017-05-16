import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from 'crm/Format';
import Detail from 'argos/Detail';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipmentItemsDetail');

const __class = declare('crm.Integrations.BOE.Views.ERPShipmentItems.Detail', [Detail], {
  // Localization
  titleText: resource.titleText,
  actionsText: resource.actionsText,
  relatedItemsText: resource.relatedItemsText,
  shipmentLineNumberText: resource.shipmentLineNumberText,
  shipmentIdText: resource.shipmentIdText,
  salesOrderText: resource.salesOrderText,
  productNameText: resource.productNameText,
  productDescriptionText: resource.productDescriptionText,
  shippedQuantityText: resource.shippedQuantityText,
  orderedQuantityText: resource.orderedQuantityText,
  backOrderedQuantityText: resource.backOrderedQuantityText,
  unitOfMeasureText: resource.unitOfMeasureText,
  erpUpcIdText: resource.erpUpcIdText,
  entityText: resource.entityText,

  // View Properties
  id: 'erpshipment_items_detail',
  modelName: MODEL_NAMES.ERPSHIPMENTITEM,
  resourceKind: 'erpShipmentItems',
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
        name: 'ProductDescription',
        property: 'Description',
        label: this.productDescriptionText,
      }, {
        name: 'ShipmentLineNumber',
        property: 'ErpLineNumber',
        label: this.shipmentLineNumberText,
      }, {
        name: 'ShipmentID',
        property: 'ErpShipment.ErpExtId',
        label: this.shipmentIdText,
        view: 'erpshipments_detail',
        key: 'ErpShipment.$key',
      }, {
        name: 'SalesOrder',
        property: 'SalesOrder.SalesOrderNumber',
        label: this.salesOrderText,
        view: 'salesorder_detail',
        key: 'SalesOrder.$key',
      }, {
        name: 'ProductName',
        property: 'ProductName',
        label: this.productNameText,
      }, {
        name: 'ShippedQuantity',
        property: 'ErpShippedQuantity',
        label: this.shippedQuantityText,
        renderer: (function renderer(val) {
          if (this.entry.ErpShippedUOM && val) {
            return format.multiCurrency.call(null, val, this.entry.ErpShippedUOM);
          }
          return format.currency.call(null, val);
        }).bindDelegate(this),
      }, {
        name: 'OrderedQuantity',
        property: 'ErpOrderQuantity',
        label: this.orderedQuantityText,
        renderer: (function renderer(val) {
          if (this.entry.ErpOrderUOM && val) {
            return format.multiCurrency.call(null, val, this.entry.ErpOrderUOM);
          }
          return format.currency.call(null, val);
        }).bindDelegate(this),
      }, {
        name: 'BackOrderedQuantity',
        property: 'ErpBackOrderedQuantity',
        label: this.backOrderedQuantityText,
        renderer: (function renderer(val) {
          if (this.entry.ErpBackOrderedUOM && val) {
            return format.multiCurrency.call(null, val, this.entry.ErpBackOrderedUOM);
          }
          return format.currency.call(null, val);
        }).bindDelegate(this),
      }, {
        name: 'ErpUPCId',
        property: 'ErpUPCId',
        label: this.erpUpcIdText,
      }],
    }]);
  },
});

lang.setObject('icboe.Views.ERPShipmentItems.Detail', __class);
export default __class;
