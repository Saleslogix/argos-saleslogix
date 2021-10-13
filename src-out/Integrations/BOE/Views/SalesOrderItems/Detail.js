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

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var resource = (0, _I18n2.default)('salesOrderItemsDetail');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SalesOrderItems.Detail', [_Detail2.default], {
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
      var entry = {
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
      var _this = this;

      // TODO: [INFORCRM-7712] Implement this in the model (model needs remove call)
      App.modal.createSimpleDialog({
        title: 'alert',
        content: this.confirmDeleteText,
        getContent: function getContent() {}
      }).then(function () {
        var entry = _this.createEntryForDelete(_this.entry);
        var request = _this.store._createEntryRequest(_this.entry.$key, {});

        if (request) {
          request.delete(entry, {
            success: _this.onDeleteSuccess,
            failure: _this.onRequestDataFailure,
            scope: _this
          });
        }
      });
    },
    onDeleteSuccess: function onDeleteSuccess() {
      var views = [App.getView('salesorder_items_related'), App.getView('salesorder_detail'), App.getView('salesorder_list')];

      views.forEach(function (view) {
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
      var tools = this.inherited(createToolLayout, arguments);
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
      var _this2 = this;

      _PricingAvailabilityService2.default.getOrderItemAvailability(this.entry).then(function (result) {
        var _result = _slicedToArray(result, 1),
            warehouse = _result[0];

        var ErrorCode = warehouse.ErrorCode,
            AvailableQuantity = warehouse.AvailableQuantity;

        if (ErrorCode) {
          App.modal.createSimpleAlert({ title: ErrorCode });
        } else if (AvailableQuantity) {
          App.modal.createSimpleAlert({ title: _this2.availableQuantityText + AvailableQuantity });
        }
      });
    },
    createLayout: function createLayout() {
      var _this3 = this;

      var _App$getBaseExchangeR = App.getBaseExchangeRate(),
          baseCurrencyCode = _App$getBaseExchangeR.code;

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
          disabled: function disabled() {
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
          renderer: function renderer(value) {
            var code = _this3.entry.SalesOrder.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'Discount',
          property: 'Discount',
          label: this.discountText,
          renderer: function renderer(value) {
            var code = _this3.entry.SalesOrder.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          label: this.baseAdjustedPriceText,
          renderer: function renderer(value) {
            var code = _this3.entry.SalesOrder.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'DocCalculatedPrice',
          property: 'DocCalculatedPrice',
          label: this.adjustedPriceText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this3.entry.SalesOrder.CurrencyCode);
          }
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
          renderer: function renderer(value) {
            var code = _this3.entry.SalesOrder.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'DocExtendedPrice',
          property: 'DocExtendedPrice',
          label: this.extendedAmountText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this3.entry.SalesOrder.CurrencyCode);
          }
        }, {
          name: 'DocTotalAmount',
          property: 'DocTotalAmount',
          label: this.totalAmountText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this3.entry.SalesOrder.CurrencyCode);
          }
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