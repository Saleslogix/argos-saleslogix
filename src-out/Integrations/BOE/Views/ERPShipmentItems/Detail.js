define('crm/Integrations/BOE/Views/ERPShipmentItems/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Detail, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var resource = (0, _I18n2.default)('erpShipmentItemsDetail');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPShipmentItems.Detail', [_Detail2.default], {
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
    modelName: _Names2.default.ERPSHIPMENTITEM,
    resourceKind: 'erpShipmentItems',
    enableOffline: true,

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.actionsText,
        list: true,
        cls: 'action-list',
        name: 'QuickActionsSection',
        children: []
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'ProductDescription',
          property: 'Description',
          label: this.productDescriptionText
        }, {
          name: 'ShipmentLineNumber',
          property: 'ErpLineNumber',
          label: this.shipmentLineNumberText
        }, {
          name: 'ShipmentID',
          property: 'ErpShipment.ErpExtId',
          label: this.shipmentIdText,
          view: 'erpshipments_detail',
          key: 'ErpShipment.$key'
        }, {
          name: 'SalesOrder',
          property: 'SalesOrder.SalesOrderNumber',
          label: this.salesOrderText,
          view: 'salesorder_detail',
          key: 'SalesOrder.$key'
        }, {
          name: 'ProductName',
          property: 'ProductName',
          label: this.productNameText
        }, {
          name: 'ShippedQuantity',
          property: 'ErpShippedQuantity',
          label: this.shippedQuantityText,
          renderer: function renderer(val) {
            if (this.entry.ErpShippedUOM && val) {
              return _Format2.default.multiCurrency.call(null, val, this.entry.ErpShippedUOM);
            }
            return _Format2.default.currency.call(null, val);
          }.bindDelegate(this)
        }, {
          name: 'OrderedQuantity',
          property: 'ErpOrderQuantity',
          label: this.orderedQuantityText,
          renderer: function renderer(val) {
            if (this.entry.ErpOrderUOM && val) {
              return _Format2.default.multiCurrency.call(null, val, this.entry.ErpOrderUOM);
            }
            return _Format2.default.currency.call(null, val);
          }.bindDelegate(this)
        }, {
          name: 'BackOrderedQuantity',
          property: 'ErpBackOrderedQuantity',
          label: this.backOrderedQuantityText,
          renderer: function renderer(val) {
            if (this.entry.ErpBackOrderedUOM && val) {
              return _Format2.default.multiCurrency.call(null, val, this.entry.ErpBackOrderedUOM);
            }
            return _Format2.default.currency.call(null, val);
          }.bindDelegate(this)
        }, {
          name: 'ErpUPCId',
          property: 'ErpUPCId',
          label: this.erpUpcIdText
        }]
      }]);
    }
  });

  _lang2.default.setObject('icboe.Views.ERPShipmentItems.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});