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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SalesOrderItems.Detail', [_Detail2.default], /** @lends crm.Integrations.BOE.Views.SalesOrderItems.Detail# */{
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
      this.inherited(arguments);
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
      var tools = this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJJdGVtcy9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwibGluZVRleHQiLCJxdWFudGl0eVRleHQiLCJwcmljZVRleHQiLCJleHRlbmRlZEFtb3VudFRleHQiLCJwcm9kdWN0TmFtZVRleHQiLCJkZXNjcmlwdGlvblRleHQiLCJzYWxlc09yZGVySWRUZXh0Iiwic2t1VGV4dCIsImJhc2VFeHRlbmRlZEFtb3VudFRleHQiLCJiYXNlQWRqdXN0ZWRQcmljZVRleHQiLCJkaXNjb3VudFRleHQiLCJhZGp1c3RlZFByaWNlVGV4dCIsInN0YXR1c1RleHQiLCJzaGlwcGVkUXVhbnRpdHlUZXh0Iiwib3BlblF1YW50aXR5VGV4dCIsImRyb3BTaGlwVGV4dCIsImJhY2tPcmRlcmVkVGV4dCIsInBhcnRpYWxTaGlwQWxsb3dlZFRleHQiLCJmaXhlZFByaWNlSXRlbVRleHQiLCJydXNoUmVxdWVzdFRleHQiLCJ3YXJlaG91c2VUZXh0Iiwic3Vic3RpdHV0ZUl0ZW1UZXh0IiwiZGV0YWlsc1RleHQiLCJyZWxhdGVkSXRlbXNUZXh0IiwiZW50aXR5VGV4dCIsImNvbmZpcm1EZWxldGVUZXh0IiwicmVtb3ZlT3JkZXJMaW5lVGV4dCIsInVuaXRPZk1lYXN1cmVUZXh0IiwidG90YWxBbW91bnRUZXh0IiwiYXZhaWxhYmxlUXVhbnRpdHlUZXh0IiwiY2hlY2tXYXJlaG91c2VBdmFpbGFiaWxpdHlUZXh0IiwiaWQiLCJlZGl0VmlldyIsInJlc291cmNlS2luZCIsIm1vZGVsTmFtZSIsIlNBTEVTT1JERVJJVEVNIiwiZW5hYmxlT2ZmbGluZSIsImNyZWF0ZUVudHJ5Rm9yRGVsZXRlIiwiZSIsImVudHJ5IiwiJGtleSIsIiRldGFnIiwiJG5hbWUiLCJwcm9jZXNzRW50cnkiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJvcHRpb25zIiwiZnJvbUNvbnRleHQiLCJyZWFkT25seSIsIkFwcCIsImJhcnMiLCJ0YmFyIiwiZGlzYWJsZVRvb2wiLCJyZW1vdmVPcmRlckxpbmUiLCJtb2RhbCIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ0aGVuIiwicmVxdWVzdCIsInN0b3JlIiwiX2NyZWF0ZUVudHJ5UmVxdWVzdCIsImRlbGV0ZSIsInN1Y2Nlc3MiLCJvbkRlbGV0ZVN1Y2Nlc3MiLCJmYWlsdXJlIiwib25SZXF1ZXN0RGF0YUZhaWx1cmUiLCJzY29wZSIsInZpZXdzIiwiZ2V0VmlldyIsImZvckVhY2giLCJ2aWV3IiwicmVmcmVzaFJlcXVpcmVkIiwicHVibGlzaCIsIlJlVUkiLCJiYWNrIiwicmVmcmVzaFJlcXVpcmVkRm9yIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwicHVzaCIsInN2ZyIsImFjdGlvbiIsInNlY3VyaXR5Iiwib25BdmFpbGFiaWxpdHkiLCJnZXRPcmRlckl0ZW1BdmFpbGFiaWxpdHkiLCJyZXN1bHQiLCJ3YXJlaG91c2UiLCJFcnJvckNvZGUiLCJBdmFpbGFibGVRdWFudGl0eSIsImNyZWF0ZVNpbXBsZUFsZXJ0IiwiY3JlYXRlTGF5b3V0IiwiZ2V0QmFzZUV4Y2hhbmdlUmF0ZSIsImJhc2VDdXJyZW5jeUNvZGUiLCJjb2RlIiwibGF5b3V0IiwiYWN0aW9uc1RleHQiLCJsaXN0IiwiY2xzIiwibmFtZSIsImNoaWxkcmVuIiwicHJvcGVydHkiLCJsYWJlbCIsImljb25DbGFzcyIsImRpc2FibGVkIiwid2FyZWhvdXNlRGlzY292ZXJ5Iiwia2V5IiwicmVuZGVyZXIiLCJ2YWx1ZSIsIlNhbGVzT3JkZXIiLCJCYXNlQ3VycmVuY3lDb2RlIiwiZm9ybWF0TXVsdGlDdXJyZW5jeSIsIkN1cnJlbmN5Q29kZSIsInZhbCIsImZpeGVkTG9jYWxlIiwiTmFtZSIsImRhdGEiLCJ5ZXNObyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFULENBQWtCUyxJQUFsQixFQUF3QjtBQUNoQyxtQkFBTyxpQkFBT0MsS0FBUCxDQUFhRCxJQUFiLENBQVA7QUFDRDtBQU5BLFNBMUhPLEVBaUlQO0FBQ0RqQixnQkFBTSxtQkFETDtBQUVERSxvQkFBVSxtQkFGVDtBQUdEQyxpQkFBTyxLQUFLcEYsa0JBSFg7QUFJRHlGLG9CQUFVLFNBQVNBLFFBQVQsQ0FBa0JTLElBQWxCLEVBQXdCO0FBQ2hDLG1CQUFPLGlCQUFPQyxLQUFQLENBQWFELElBQWIsQ0FBUDtBQUNEO0FBTkEsU0FqSU8sRUF3SVA7QUFDRGpCLGdCQUFNLGdCQURMO0FBRURFLG9CQUFVLGdCQUZUO0FBR0RDLGlCQUFPLEtBQUtuRixlQUhYO0FBSUR3RixvQkFBVSxTQUFTQSxRQUFULENBQWtCUyxJQUFsQixFQUF3QjtBQUNoQyxtQkFBTyxpQkFBT0MsS0FBUCxDQUFhRCxJQUFiLENBQVA7QUFDRDtBQU5BLFNBeElPLEVBK0lQO0FBQ0RqQixnQkFBTSxtQkFETDtBQUVERSxvQkFBVSxtQkFGVDtBQUdEQyxpQkFBTyxLQUFLakYsa0JBSFg7QUFJRHNGLG9CQUFVLFNBQVNBLFFBQVQsQ0FBa0JTLElBQWxCLEVBQXdCO0FBQ2hDLG1CQUFPLGlCQUFPQyxLQUFQLENBQWFELElBQWIsQ0FBUDtBQUNEO0FBTkEsU0EvSU87QUFIVCxPQWhCa0MsRUEwS2xDO0FBQ0Q1RCxlQUFPLEtBQUtqQyxnQkFEWDtBQUVEMEUsY0FBTSxJQUZMO0FBR0RFLGNBQU0scUJBSEw7QUFJREMsa0JBQVU7QUFKVCxPQTFLa0MsQ0FBOUIsQ0FBUDtBQWdMRDtBQXJUcUosR0FBeEksQ0FBaEI7O0FBd1RBLGlCQUFLa0IsU0FBTCxDQUFlLG9DQUFmLEVBQXFEeEgsT0FBckQ7b0JBQ2VBLE8iLCJmaWxlIjoiRGV0YWlsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5TYWxlc09yZGVySXRlbXMuRGV0YWlsXHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkRldGFpbFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRGV0YWlsXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqXHJcbiAqL1xyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgY29ubmVjdCBmcm9tICdkb2pvL19iYXNlL2Nvbm5lY3QnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgRGV0YWlsIGZyb20gJ2FyZ29zL0RldGFpbCc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJy4uLy4uL1V0aWxpdHknO1xyXG5pbXBvcnQgUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UgZnJvbSAnLi4vLi4vUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlckl0ZW1zRGV0YWlsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuU2FsZXNPcmRlckl0ZW1zLkRldGFpbCcsIFtEZXRhaWxdLCAvKiogQGxlbmRzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlNhbGVzT3JkZXJJdGVtcy5EZXRhaWwjICovIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBsaW5lVGV4dDogcmVzb3VyY2UubGluZVRleHQsXHJcbiAgcXVhbnRpdHlUZXh0OiByZXNvdXJjZS5xdWFudGl0eVRleHQsXHJcbiAgcHJpY2VUZXh0OiByZXNvdXJjZS5wcmljZVRleHQsXHJcbiAgZXh0ZW5kZWRBbW91bnRUZXh0OiByZXNvdXJjZS5leHRlbmRlZEFtb3VudFRleHQsXHJcbiAgcHJvZHVjdE5hbWVUZXh0OiByZXNvdXJjZS5wcm9kdWN0TmFtZVRleHQsXHJcbiAgZGVzY3JpcHRpb25UZXh0OiByZXNvdXJjZS5kZXNjcmlwdGlvblRleHQsXHJcbiAgc2FsZXNPcmRlcklkVGV4dDogcmVzb3VyY2Uuc2FsZXNPcmRlcklkVGV4dCxcclxuICBza3VUZXh0OiByZXNvdXJjZS5za3VUZXh0LFxyXG4gIGJhc2VFeHRlbmRlZEFtb3VudFRleHQ6IHJlc291cmNlLmJhc2VFeHRlbmRlZEFtb3VudFRleHQsXHJcbiAgYmFzZUFkanVzdGVkUHJpY2VUZXh0OiByZXNvdXJjZS5iYXNlQWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgZGlzY291bnRUZXh0OiByZXNvdXJjZS5kaXNjb3VudFRleHQsXHJcbiAgYWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmFkanVzdGVkUHJpY2VUZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgc2hpcHBlZFF1YW50aXR5VGV4dDogcmVzb3VyY2Uuc2hpcHBlZFF1YW50aXR5VGV4dCxcclxuICBvcGVuUXVhbnRpdHlUZXh0OiByZXNvdXJjZS5vcGVuUXVhbnRpdHlUZXh0LFxyXG4gIGRyb3BTaGlwVGV4dDogcmVzb3VyY2UuZHJvcFNoaXBUZXh0LFxyXG4gIGJhY2tPcmRlcmVkVGV4dDogcmVzb3VyY2UuYmFja09yZGVyZWRUZXh0LFxyXG4gIHBhcnRpYWxTaGlwQWxsb3dlZFRleHQ6IHJlc291cmNlLnBhcnRpYWxTaGlwQWxsb3dlZFRleHQsXHJcbiAgZml4ZWRQcmljZUl0ZW1UZXh0OiByZXNvdXJjZS5maXhlZFByaWNlSXRlbVRleHQsXHJcbiAgcnVzaFJlcXVlc3RUZXh0OiByZXNvdXJjZS5ydXNoUmVxdWVzdFRleHQsXHJcbiAgd2FyZWhvdXNlVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlVGV4dCxcclxuICBzdWJzdGl0dXRlSXRlbVRleHQ6IHJlc291cmNlLnN1YnN0aXR1dGVJdGVtVGV4dCxcclxuICBkZXRhaWxzVGV4dDogcmVzb3VyY2UuZGV0YWlsc1RleHQsXHJcbiAgcmVsYXRlZEl0ZW1zVGV4dDogcmVzb3VyY2UucmVsYXRlZEl0ZW1zVGV4dCxcclxuICBlbnRpdHlUZXh0OiByZXNvdXJjZS5lbnRpdHlUZXh0LFxyXG4gIGNvbmZpcm1EZWxldGVUZXh0OiByZXNvdXJjZS5jb25maXJtRGVsZXRlVGV4dCxcclxuICByZW1vdmVPcmRlckxpbmVUZXh0OiByZXNvdXJjZS5yZW1vdmVPcmRlckxpbmVUZXh0LFxyXG4gIHVuaXRPZk1lYXN1cmVUZXh0OiByZXNvdXJjZS51bml0T2ZNZWFzdXJlVGV4dCxcclxuICB0b3RhbEFtb3VudFRleHQ6IHJlc291cmNlLnRvdGFsQW1vdW50VGV4dCxcclxuICBhdmFpbGFibGVRdWFudGl0eVRleHQ6IHJlc291cmNlLmF2YWlsYWJsZVF1YW50aXR5VGV4dCxcclxuICBjaGVja1dhcmVob3VzZUF2YWlsYWJpbGl0eVRleHQ6IHJlc291cmNlLmNoZWNrV2FyZWhvdXNlQXZhaWxhYmlsaXR5VGV4dCxcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3NhbGVzb3JkZXJfaXRlbV9kZXRhaWwnLFxyXG4gIGVkaXRWaWV3OiAnc2FsZXNvcmRlcl9pdGVtX2VkaXQnLFxyXG4gIHJlc291cmNlS2luZDogJ3NhbGVzb3JkZXJpdGVtcycsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5TQUxFU09SREVSSVRFTSxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG5cclxuICBjcmVhdGVFbnRyeUZvckRlbGV0ZTogZnVuY3Rpb24gY3JlYXRlRW50cnlGb3JEZWxldGUoZSkge1xyXG4gICAgY29uc3QgZW50cnkgPSB7XHJcbiAgICAgICRrZXk6IGUuJGtleSxcclxuICAgICAgJGV0YWc6IGUuJGV0YWcsXHJcbiAgICAgICRuYW1lOiBlLiRuYW1lLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBlbnRyeTtcclxuICB9LFxyXG4gIHByb2Nlc3NFbnRyeTogZnVuY3Rpb24gcHJvY2Vzc0VudHJ5KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZyb21Db250ZXh0ICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dC5yZWFkT25seSkge1xyXG4gICAgICBpZiAoQXBwLmJhcnMgJiYgQXBwLmJhcnMudGJhcikge1xyXG4gICAgICAgIEFwcC5iYXJzLnRiYXIuZGlzYWJsZVRvb2woJ3JlbW92ZU9yZGVyTGluZScpO1xyXG4gICAgICAgIEFwcC5iYXJzLnRiYXIuZGlzYWJsZVRvb2woJ2VkaXQnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVtb3ZlT3JkZXJMaW5lOiBmdW5jdGlvbiByZW1vdmVPcmRlckxpbmUoKSB7XHJcbiAgICAvLyBUT0RPOiBbSU5GT1JDUk0tNzcxMl0gSW1wbGVtZW50IHRoaXMgaW4gdGhlIG1vZGVsIChtb2RlbCBuZWVkcyByZW1vdmUgY2FsbClcclxuICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2coe1xyXG4gICAgICB0aXRsZTogJ2FsZXJ0JyxcclxuICAgICAgY29udGVudDogdGhpcy5jb25maXJtRGVsZXRlVGV4dCxcclxuICAgICAgZ2V0Q29udGVudDogKCkgPT4geyB9LFxyXG4gICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5jcmVhdGVFbnRyeUZvckRlbGV0ZSh0aGlzLmVudHJ5KTtcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuc3RvcmUuX2NyZWF0ZUVudHJ5UmVxdWVzdCh0aGlzLmVudHJ5LiRrZXksIHt9KTtcclxuXHJcbiAgICAgIGlmIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgcmVxdWVzdC5kZWxldGUoZW50cnksIHtcclxuICAgICAgICAgIHN1Y2Nlc3M6IHRoaXMub25EZWxldGVTdWNjZXNzLFxyXG4gICAgICAgICAgZmFpbHVyZTogdGhpcy5vblJlcXVlc3REYXRhRmFpbHVyZSxcclxuICAgICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9uRGVsZXRlU3VjY2VzczogZnVuY3Rpb24gb25EZWxldGVTdWNjZXNzKCkge1xyXG4gICAgY29uc3Qgdmlld3MgPSBbXHJcbiAgICAgIEFwcC5nZXRWaWV3KCdzYWxlc29yZGVyX2l0ZW1zX3JlbGF0ZWQnKSxcclxuICAgICAgQXBwLmdldFZpZXcoJ3NhbGVzb3JkZXJfZGV0YWlsJyksXHJcbiAgICAgIEFwcC5nZXRWaWV3KCdzYWxlc29yZGVyX2xpc3QnKSxcclxuICAgIF07XHJcblxyXG4gICAgdmlld3MuZm9yRWFjaCgodmlldykgPT4ge1xyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIHZpZXcucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgY29ubmVjdC5wdWJsaXNoKCcvYXBwL3JlZnJlc2gnLCBbe1xyXG4gICAgICByZXNvdXJjZUtpbmQ6IHRoaXMucmVzb3VyY2VLaW5kLFxyXG4gICAgfV0pO1xyXG4gICAgUmVVSS5iYWNrKCk7XHJcbiAgfSxcclxuICByZWZyZXNoUmVxdWlyZWRGb3I6IGZ1bmN0aW9uIHJlZnJlc2hSZXF1aXJlZEZvcihvcHRpb25zKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHJldHVybiAhIW9wdGlvbnM7IC8vIGlmIG9wdGlvbnMgcHJvdmlkZWQsIHRoZW4gcmVmcmVzaFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIGlmICh0aGlzLnRvb2xzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRvb2xzO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdG9vbHMgPSB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKHRvb2xzICYmIHRvb2xzLnRiYXIpIHtcclxuICAgICAgdG9vbHMudGJhci5wdXNoKHtcclxuICAgICAgICBpZDogJ3JlbW92ZU9yZGVyTGluZScsXHJcbiAgICAgICAgc3ZnOiAnY2xvc2UnLFxyXG4gICAgICAgIGFjdGlvbjogJ3JlbW92ZU9yZGVyTGluZScsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMucmVtb3ZlT3JkZXJMaW5lVGV4dCxcclxuICAgICAgICBzZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvRGVsZXRlJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG9vbHM7XHJcbiAgfSxcclxuICBvbkF2YWlsYWJpbGl0eTogZnVuY3Rpb24gb25BdmFpbGFiaWxpdHkoKSB7XHJcbiAgICBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZS5nZXRPcmRlckl0ZW1BdmFpbGFiaWxpdHkodGhpcy5lbnRyeSlcclxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFt3YXJlaG91c2VdID0gcmVzdWx0O1xyXG4gICAgICAgIGNvbnN0IHsgRXJyb3JDb2RlLCBBdmFpbGFibGVRdWFudGl0eSB9ID0gd2FyZWhvdXNlO1xyXG4gICAgICAgIGlmIChFcnJvckNvZGUpIHtcclxuICAgICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVBbGVydCh7IHRpdGxlOiBFcnJvckNvZGUgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChBdmFpbGFibGVRdWFudGl0eSkge1xyXG4gICAgICAgICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZUFsZXJ0KHsgdGl0bGU6IHRoaXMuYXZhaWxhYmxlUXVhbnRpdHlUZXh0ICsgQXZhaWxhYmxlUXVhbnRpdHkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgY29uc3QgeyBjb2RlOiBiYXNlQ3VycmVuY3lDb2RlIH0gPSBBcHAuZ2V0QmFzZUV4Y2hhbmdlUmF0ZSgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdDaGVja0F2YWlsYWJpbGl0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTbHhMb2NhdGlvbi5OYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jaGVja1dhcmVob3VzZUF2YWlsYWJpbGl0eVRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAncmVkbycsIC8vIFRPRE86IGxvb2sgZm9yIGEgYmV0dGVyIGljb25cclxuICAgICAgICBhY3Rpb246ICdvbkF2YWlsYWJpbGl0eScsXHJcbiAgICAgICAgZGlzYWJsZWQ6ICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBBcHAud2FyZWhvdXNlRGlzY292ZXJ5ID09PSAnYXV0byc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvQWRkJyxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnTGluZU51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBMaW5lTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5saW5lVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTYWxlc09yZGVyX1NhbGVzT3JkZXJOdW1iZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2FsZXNPcmRlci5TYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zYWxlc09yZGVySWRUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnU2FsZXNPcmRlci4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0TmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJvZHVjdE5hbWVUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kZXNjcmlwdGlvblRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQWN0dWFsSUQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWN0dWFsSUQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNrdVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJpY2UnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByaWNlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5lbnRyeS5TYWxlc09yZGVyLkJhc2VDdXJyZW5jeUNvZGUgfHwgYmFzZUN1cnJlbmN5Q29kZTtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIGNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRGlzY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGlzY291bnQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRpc2NvdW50VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5lbnRyeS5TYWxlc09yZGVyLkJhc2VDdXJyZW5jeUNvZGUgfHwgYmFzZUN1cnJlbmN5Q29kZTtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIGNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZUFkanVzdGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNvZGUgPSB0aGlzLmVudHJ5LlNhbGVzT3JkZXIuQmFzZUN1cnJlbmN5Q29kZSB8fCBiYXNlQ3VycmVuY3lDb2RlO1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgY29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEb2NDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogdmFsdWUgPT4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LlNhbGVzT3JkZXIuQ3VycmVuY3lDb2RlKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdRdWFudGl0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdRdWFudGl0eScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucXVhbnRpdHlUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZml4ZWRMb2NhbGUodmFsLCAyKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1VuaXRPZk1lYXN1cmUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVW5pdE9mTWVhc3VyZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudW5pdE9mTWVhc3VyZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHZhbCAmJiB2YWwuTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsLk5hbWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZUV4dGVuZGVkQW1vdW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5lbnRyeS5TYWxlc09yZGVyLkJhc2VDdXJyZW5jeUNvZGUgfHwgYmFzZUN1cnJlbmN5Q29kZTtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIGNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRG9jRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEb2NFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5leHRlbmRlZEFtb3VudFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHZhbHVlID0+IHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5TYWxlc09yZGVyLkN1cnJlbmN5Q29kZSksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRG9jVG90YWxBbW91bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jVG90YWxBbW91bnQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnRvdGFsQW1vdW50VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogdmFsdWUgPT4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LlNhbGVzT3JkZXIuQ3VycmVuY3lDb2RlKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1dhcmVob3VzZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTbHhMb2NhdGlvbi5EZXNjcmlwdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMud2FyZWhvdXNlVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBTaGlwcGVkUXVhbnRpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU2hpcHBlZFF1YW50aXR5JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zaGlwcGVkUXVhbnRpdHlUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZml4ZWRMb2NhbGUodmFsLCAyKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycE9wZW5RdWFudGl0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBPcGVuUXVhbnRpdHknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wZW5RdWFudGl0eVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5maXhlZExvY2FsZSh2YWwsIDIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwQmFja09yZGVyZWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwQmFja09yZGVyZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhY2tPcmRlcmVkVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycERyb3BTaGlwJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycERyb3BTaGlwJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kcm9wU2hpcFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBQYXJ0aWFsU2hpcEFsbG93ZWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwUGFydGlhbFNoaXBBbGxvd2VkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wYXJ0aWFsU2hpcEFsbG93ZWRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwRml4ZWRQcmljZUl0ZW0nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwRml4ZWRQcmljZUl0ZW0nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmZpeGVkUHJpY2VJdGVtVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycFJ1c2hSZXF1ZXN0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFJ1c2hSZXF1ZXN0JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5ydXNoUmVxdWVzdFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBTdWJzdGl0dXRlSXRlbScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBTdWJzdGl0dXRlSXRlbScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3Vic3RpdHV0ZUl0ZW1UZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBuYW1lOiAnUmVsYXRlZEl0ZW1zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbXSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5TYWxlc09yZGVySXRlbXMuRGV0YWlsJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==