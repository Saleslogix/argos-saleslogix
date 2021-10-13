define('crm/Integrations/BOE/Views/SalesOrderItems/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/connect', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n', '../../Utility', '../../PricingAvailabilityService'], function (module, exports, _declare, _lang, _connect, _Format, _Detail, _Names, _I18n, _Utility, _PricingAvailabilityService) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _connect2 = _interopRequireDefault(_connect);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _PricingAvailabilityService2 = _interopRequireDefault(_PricingAvailabilityService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('salesOrderItemsDetail'); /* Copyright 2017 Infor
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


  const __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SalesOrderItems.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    lineText: resource.lineText,
    quantityText: resource.quantityText,
    priceText: resource.priceText,
    extendedAmountText: resource.extendedAmountText,
    productNameText: resource.productNameText,
    descriptionText: resource.descriptionText,
    salesOrderIdText: resource.salesOrderIdText,
    skuText: resource.skuText,
    baseExtendedAmountText: resource.baseExtendedAmountText,
    baseAdjustedPriceText: resource.baseAdjustedPriceText,
    discountText: resource.discountText,
    adjustedPriceText: resource.adjustedPriceText,
    statusText: resource.statusText,
    shippedQuantityText: resource.shippedQuantityText,
    openQuantityText: resource.openQuantityText,
    dropShipText: resource.dropShipText,
    backOrderedText: resource.backOrderedText,
    partialShipAllowedText: resource.partialShipAllowedText,
    fixedPriceItemText: resource.fixedPriceItemText,
    rushRequestText: resource.rushRequestText,
    warehouseText: resource.warehouseText,
    substituteItemText: resource.substituteItemText,
    detailsText: resource.detailsText,
    relatedItemsText: resource.relatedItemsText,
    entityText: resource.entityText,
    confirmDeleteText: resource.confirmDeleteText,
    removeOrderLineText: resource.removeOrderLineText,
    unitOfMeasureText: resource.unitOfMeasureText,
    totalAmountText: resource.totalAmountText,
    availableQuantityText: resource.availableQuantityText,
    checkWarehouseAvailabilityText: resource.checkWarehouseAvailabilityText,
    // View Properties
    id: 'salesorder_item_detail',
    editView: 'salesorder_item_edit',
    resourceKind: 'salesorderitems',
    modelName: _Names2.default.SALESORDERITEM,
    enableOffline: true,

    createEntryForDelete: function createEntryForDelete(e) {
      const entry = {
        $key: e.$key,
        $etag: e.$etag,
        $name: e.$name
      };
      return entry;
    },
    processEntry: function processEntry() {
      this.inherited(processEntry, arguments);
      if (this.options && this.options.fromContext && this.options.fromContext.readOnly) {
        if (App.bars && App.bars.tbar) {
          App.bars.tbar.disableTool('removeOrderLine');
          App.bars.tbar.disableTool('edit');
        }
      }
    },
    removeOrderLine: function removeOrderLine() {
      // TODO: [INFORCRM-7712] Implement this in the model (model needs remove call)
      App.modal.createSimpleDialog({
        title: 'alert',
        content: this.confirmDeleteText,
        getContent: () => {}
      }).then(() => {
        const entry = this.createEntryForDelete(this.entry);
        const request = this.store._createEntryRequest(this.entry.$key, {});

        if (request) {
          request.delete(entry, {
            success: this.onDeleteSuccess,
            failure: this.onRequestDataFailure,
            scope: this
          });
        }
      });
    },
    onDeleteSuccess: function onDeleteSuccess() {
      const views = [App.getView('salesorder_items_related'), App.getView('salesorder_detail'), App.getView('salesorder_list')];

      views.forEach(view => {
        if (view) {
          view.refreshRequired = true;
        }
      }, this);

      _connect2.default.publish('/app/refresh', [{
        resourceKind: this.resourceKind
      }]);
      ReUI.back();
    },
    refreshRequiredFor: function refreshRequiredFor(options) {
      if (this.options) {
        return !!options; // if options provided, then refresh
      }

      return true;
    },
    createToolLayout: function createToolLayout() {
      if (this.tools) {
        return this.tools;
      }
      const tools = this.inherited(createToolLayout, arguments);
      if (tools && tools.tbar) {
        tools.tbar.push({
          id: 'removeOrderLine',
          svg: 'close',
          action: 'removeOrderLine',
          title: this.removeOrderLineText,
          security: 'Entities/SalesOrder/Delete'
        });
      }
      return tools;
    },
    onAvailability: function onAvailability() {
      _PricingAvailabilityService2.default.getOrderItemAvailability(this.entry).then(result => {
        const [warehouse] = result;
        const { ErrorCode, AvailableQuantity } = warehouse;
        if (ErrorCode) {
          App.modal.createSimpleAlert({ title: ErrorCode });
        } else if (AvailableQuantity) {
          App.modal.createSimpleAlert({ title: this.availableQuantityText + AvailableQuantity });
        }
      });
    },
    createLayout: function createLayout() {
      const { code: baseCurrencyCode } = App.getBaseExchangeRate();

      return this.layout || (this.layout = [{
        title: this.actionsText,
        list: true,
        cls: 'action-list',
        name: 'QuickActionsSection',
        children: [{
          name: 'CheckAvailability',
          property: 'SlxLocation.Name',
          label: this.checkWarehouseAvailabilityText,
          iconClass: 'redo', // TODO: look for a better icon
          action: 'onAvailability',
          disabled: () => {
            return App.warehouseDiscovery === 'auto';
          },
          security: 'Entities/SalesOrder/Add'
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'LineNumber',
          property: 'ErpLineNumber',
          label: this.lineText
        }, {
          name: 'SalesOrder_SalesOrderNumber',
          property: 'SalesOrder.SalesOrderNumber',
          label: this.salesOrderIdText,
          view: 'salesorder_detail',
          key: 'SalesOrder.$key'
        }, {
          name: 'ProductName',
          property: 'ProductName',
          label: this.productNameText
        }, {
          name: 'Description',
          property: 'Description',
          label: this.descriptionText
        }, {
          name: 'ActualID',
          property: 'ActualID',
          label: this.skuText
        }, {
          name: 'Price',
          property: 'Price',
          label: this.priceText,
          renderer: value => {
            const code = this.entry.SalesOrder.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'Discount',
          property: 'Discount',
          label: this.discountText,
          renderer: value => {
            const code = this.entry.SalesOrder.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          label: this.baseAdjustedPriceText,
          renderer: value => {
            const code = this.entry.SalesOrder.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'DocCalculatedPrice',
          property: 'DocCalculatedPrice',
          label: this.adjustedPriceText,
          renderer: value => _Utility2.default.formatMultiCurrency(value, this.entry.SalesOrder.CurrencyCode)
        }, {
          name: 'Quantity',
          property: 'Quantity',
          label: this.quantityText,
          renderer: function renderer(val) {
            return _Format2.default.fixedLocale(val, 2);
          }
        }, {
          name: 'UnitOfMeasure',
          property: 'UnitOfMeasure',
          label: this.unitOfMeasureText,
          renderer: function renderer(val) {
            if (val && val.Name) {
              return val.Name;
            }
            return null;
          }
        }, {
          label: this.baseExtendedAmountText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          renderer: value => {
            const code = this.entry.SalesOrder.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'DocExtendedPrice',
          property: 'DocExtendedPrice',
          label: this.extendedAmountText,
          renderer: value => _Utility2.default.formatMultiCurrency(value, this.entry.SalesOrder.CurrencyCode)
        }, {
          name: 'DocTotalAmount',
          property: 'DocTotalAmount',
          label: this.totalAmountText,
          renderer: value => _Utility2.default.formatMultiCurrency(value, this.entry.SalesOrder.CurrencyCode)
        }, {
          name: 'ErpStatus',
          property: 'ErpStatus',
          label: this.statusText
        }, {
          name: 'Warehouse',
          property: 'SlxLocation.Description',
          label: this.warehouseText
        }, {
          name: 'ErpShippedQuantity',
          property: 'ErpShippedQuantity',
          label: this.shippedQuantityText,
          renderer: function renderer(val) {
            return _Format2.default.fixedLocale(val, 2);
          }
        }, {
          name: 'ErpOpenQuantity',
          property: 'ErpOpenQuantity',
          label: this.openQuantityText,
          renderer: function renderer(val) {
            return _Format2.default.fixedLocale(val, 2);
          }
        }, {
          name: 'ErpBackOrdered',
          property: 'ErpBackOrdered',
          label: this.backOrderedText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ErpDropShip',
          property: 'ErpDropShip',
          label: this.dropShipText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ErpPartialShipAllowed',
          property: 'ErpPartialShipAllowed',
          label: this.partialShipAllowedText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ErpFixedPriceItem',
          property: 'ErpFixedPriceItem',
          label: this.fixedPriceItemText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ErpRushRequest',
          property: 'ErpRushRequest',
          label: this.rushRequestText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'ErpSubstituteItem',
          property: 'ErpSubstituteItem',
          label: this.substituteItemText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }]
      }, {
        title: this.relatedItemsText,
        list: true,
        name: 'RelatedItemsSection',
        children: []
      }]);
    }
  });

  _lang2.default.setObject('icboe.Views.SalesOrderItems.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});