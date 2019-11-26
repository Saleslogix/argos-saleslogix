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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJJdGVtcy9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwibGluZVRleHQiLCJxdWFudGl0eVRleHQiLCJwcmljZVRleHQiLCJleHRlbmRlZEFtb3VudFRleHQiLCJwcm9kdWN0TmFtZVRleHQiLCJkZXNjcmlwdGlvblRleHQiLCJzYWxlc09yZGVySWRUZXh0Iiwic2t1VGV4dCIsImJhc2VFeHRlbmRlZEFtb3VudFRleHQiLCJiYXNlQWRqdXN0ZWRQcmljZVRleHQiLCJkaXNjb3VudFRleHQiLCJhZGp1c3RlZFByaWNlVGV4dCIsInN0YXR1c1RleHQiLCJzaGlwcGVkUXVhbnRpdHlUZXh0Iiwib3BlblF1YW50aXR5VGV4dCIsImRyb3BTaGlwVGV4dCIsImJhY2tPcmRlcmVkVGV4dCIsInBhcnRpYWxTaGlwQWxsb3dlZFRleHQiLCJmaXhlZFByaWNlSXRlbVRleHQiLCJydXNoUmVxdWVzdFRleHQiLCJ3YXJlaG91c2VUZXh0Iiwic3Vic3RpdHV0ZUl0ZW1UZXh0IiwiZGV0YWlsc1RleHQiLCJyZWxhdGVkSXRlbXNUZXh0IiwiZW50aXR5VGV4dCIsImNvbmZpcm1EZWxldGVUZXh0IiwicmVtb3ZlT3JkZXJMaW5lVGV4dCIsInVuaXRPZk1lYXN1cmVUZXh0IiwidG90YWxBbW91bnRUZXh0IiwiYXZhaWxhYmxlUXVhbnRpdHlUZXh0IiwiY2hlY2tXYXJlaG91c2VBdmFpbGFiaWxpdHlUZXh0IiwiaWQiLCJlZGl0VmlldyIsInJlc291cmNlS2luZCIsIm1vZGVsTmFtZSIsIlNBTEVTT1JERVJJVEVNIiwiZW5hYmxlT2ZmbGluZSIsImNyZWF0ZUVudHJ5Rm9yRGVsZXRlIiwiZSIsImVudHJ5IiwiJGtleSIsIiRldGFnIiwiJG5hbWUiLCJwcm9jZXNzRW50cnkiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJvcHRpb25zIiwiZnJvbUNvbnRleHQiLCJyZWFkT25seSIsIkFwcCIsImJhcnMiLCJ0YmFyIiwiZGlzYWJsZVRvb2wiLCJyZW1vdmVPcmRlckxpbmUiLCJtb2RhbCIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ0aGVuIiwicmVxdWVzdCIsInN0b3JlIiwiX2NyZWF0ZUVudHJ5UmVxdWVzdCIsImRlbGV0ZSIsInN1Y2Nlc3MiLCJvbkRlbGV0ZVN1Y2Nlc3MiLCJmYWlsdXJlIiwib25SZXF1ZXN0RGF0YUZhaWx1cmUiLCJzY29wZSIsInZpZXdzIiwiZ2V0VmlldyIsImZvckVhY2giLCJ2aWV3IiwicmVmcmVzaFJlcXVpcmVkIiwicHVibGlzaCIsIlJlVUkiLCJiYWNrIiwicmVmcmVzaFJlcXVpcmVkRm9yIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwicHVzaCIsInN2ZyIsImFjdGlvbiIsInNlY3VyaXR5Iiwib25BdmFpbGFiaWxpdHkiLCJnZXRPcmRlckl0ZW1BdmFpbGFiaWxpdHkiLCJyZXN1bHQiLCJ3YXJlaG91c2UiLCJFcnJvckNvZGUiLCJBdmFpbGFibGVRdWFudGl0eSIsImNyZWF0ZVNpbXBsZUFsZXJ0IiwiY3JlYXRlTGF5b3V0IiwiZ2V0QmFzZUV4Y2hhbmdlUmF0ZSIsImJhc2VDdXJyZW5jeUNvZGUiLCJjb2RlIiwibGF5b3V0IiwiYWN0aW9uc1RleHQiLCJsaXN0IiwiY2xzIiwibmFtZSIsImNoaWxkcmVuIiwicHJvcGVydHkiLCJsYWJlbCIsImljb25DbGFzcyIsImRpc2FibGVkIiwid2FyZWhvdXNlRGlzY292ZXJ5Iiwia2V5IiwicmVuZGVyZXIiLCJ2YWx1ZSIsIlNhbGVzT3JkZXIiLCJCYXNlQ3VycmVuY3lDb2RlIiwiZm9ybWF0TXVsdGlDdXJyZW5jeSIsIkN1cnJlbmN5Q29kZSIsInZhbCIsImZpeGVkTG9jYWxlIiwiTmFtZSIsImRhdGEiLCJ5ZXNObyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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ckYsc0JBSFg7QUFJRDBGLG9CQUFVLFNBQVNBLFFBQVQsQ0FBa0JTLElBQWxCLEVBQXdCO0FBQ2hDLG1CQUFPLGlCQUFPQyxLQUFQLENBQWFELElBQWIsQ0FBUDtBQUNEO0FBTkEsU0ExSE8sRUFpSVA7QUFDRGpCLGdCQUFNLG1CQURMO0FBRURFLG9CQUFVLG1CQUZUO0FBR0RDLGlCQUFPLEtBQUtwRixrQkFIWDtBQUlEeUYsb0JBQVUsU0FBU0EsUUFBVCxDQUFrQlMsSUFBbEIsRUFBd0I7QUFDaEMsbUJBQU8saUJBQU9DLEtBQVAsQ0FBYUQsSUFBYixDQUFQO0FBQ0Q7QUFOQSxTQWpJTyxFQXdJUDtBQUNEakIsZ0JBQU0sZ0JBREw7QUFFREUsb0JBQVUsZ0JBRlQ7QUFHREMsaUJBQU8sS0FBS25GLGVBSFg7QUFJRHdGLG9CQUFVLFNBQVNBLFFBQVQsQ0FBa0JTLElBQWxCLEVBQXdCO0FBQ2hDLG1CQUFPLGlCQUFPQyxLQUFQLENBQWFELElBQWIsQ0FBUDtBQUNEO0FBTkEsU0F4SU8sRUErSVA7QUFDRGpCLGdCQUFNLG1CQURMO0FBRURFLG9CQUFVLG1CQUZUO0FBR0RDLGlCQUFPLEtBQUtqRixrQkFIWDtBQUlEc0Ysb0JBQVUsU0FBU0EsUUFBVCxDQUFrQlMsSUFBbEIsRUFBd0I7QUFDaEMsbUJBQU8saUJBQU9DLEtBQVAsQ0FBYUQsSUFBYixDQUFQO0FBQ0Q7QUFOQSxTQS9JTztBQUhULE9BaEJrQyxFQTBLbEM7QUFDRDVELGVBQU8sS0FBS2pDLGdCQURYO0FBRUQwRSxjQUFNLElBRkw7QUFHREUsY0FBTSxxQkFITDtBQUlEQyxrQkFBVTtBQUpULE9BMUtrQyxDQUE5QixDQUFQO0FBZ0xEO0FBclRxSixHQUF4SSxDQUFoQjs7QUF3VEEsaUJBQUtrQixTQUFMLENBQWUsb0NBQWYsRUFBcUR4SCxPQUFyRDtvQkFDZUEsTyIsImZpbGUiOiJEZXRhaWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlNhbGVzT3JkZXJJdGVtcy5EZXRhaWxcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5EZXRhaWxcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICpcclxuICovXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBjb25uZWN0IGZyb20gJ2Rvam8vX2Jhc2UvY29ubmVjdCc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnY3JtL0Zvcm1hdCc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcbmltcG9ydCBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZSBmcm9tICcuLi8uLi9QcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZSc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdzYWxlc09yZGVySXRlbXNEZXRhaWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5TYWxlc09yZGVySXRlbXMuRGV0YWlsJywgW0RldGFpbF0sIC8qKiBAbGVuZHMgY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuU2FsZXNPcmRlckl0ZW1zLkRldGFpbCMgKi8ge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGxpbmVUZXh0OiByZXNvdXJjZS5saW5lVGV4dCxcclxuICBxdWFudGl0eVRleHQ6IHJlc291cmNlLnF1YW50aXR5VGV4dCxcclxuICBwcmljZVRleHQ6IHJlc291cmNlLnByaWNlVGV4dCxcclxuICBleHRlbmRlZEFtb3VudFRleHQ6IHJlc291cmNlLmV4dGVuZGVkQW1vdW50VGV4dCxcclxuICBwcm9kdWN0TmFtZVRleHQ6IHJlc291cmNlLnByb2R1Y3ROYW1lVGV4dCxcclxuICBkZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLmRlc2NyaXB0aW9uVGV4dCxcclxuICBzYWxlc09yZGVySWRUZXh0OiByZXNvdXJjZS5zYWxlc09yZGVySWRUZXh0LFxyXG4gIHNrdVRleHQ6IHJlc291cmNlLnNrdVRleHQsXHJcbiAgYmFzZUV4dGVuZGVkQW1vdW50VGV4dDogcmVzb3VyY2UuYmFzZUV4dGVuZGVkQW1vdW50VGV4dCxcclxuICBiYXNlQWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICBkaXNjb3VudFRleHQ6IHJlc291cmNlLmRpc2NvdW50VGV4dCxcclxuICBhZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UuYWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICBzaGlwcGVkUXVhbnRpdHlUZXh0OiByZXNvdXJjZS5zaGlwcGVkUXVhbnRpdHlUZXh0LFxyXG4gIG9wZW5RdWFudGl0eVRleHQ6IHJlc291cmNlLm9wZW5RdWFudGl0eVRleHQsXHJcbiAgZHJvcFNoaXBUZXh0OiByZXNvdXJjZS5kcm9wU2hpcFRleHQsXHJcbiAgYmFja09yZGVyZWRUZXh0OiByZXNvdXJjZS5iYWNrT3JkZXJlZFRleHQsXHJcbiAgcGFydGlhbFNoaXBBbGxvd2VkVGV4dDogcmVzb3VyY2UucGFydGlhbFNoaXBBbGxvd2VkVGV4dCxcclxuICBmaXhlZFByaWNlSXRlbVRleHQ6IHJlc291cmNlLmZpeGVkUHJpY2VJdGVtVGV4dCxcclxuICBydXNoUmVxdWVzdFRleHQ6IHJlc291cmNlLnJ1c2hSZXF1ZXN0VGV4dCxcclxuICB3YXJlaG91c2VUZXh0OiByZXNvdXJjZS53YXJlaG91c2VUZXh0LFxyXG4gIHN1YnN0aXR1dGVJdGVtVGV4dDogcmVzb3VyY2Uuc3Vic3RpdHV0ZUl0ZW1UZXh0LFxyXG4gIGRldGFpbHNUZXh0OiByZXNvdXJjZS5kZXRhaWxzVGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIGVudGl0eVRleHQ6IHJlc291cmNlLmVudGl0eVRleHQsXHJcbiAgY29uZmlybURlbGV0ZVRleHQ6IHJlc291cmNlLmNvbmZpcm1EZWxldGVUZXh0LFxyXG4gIHJlbW92ZU9yZGVyTGluZVRleHQ6IHJlc291cmNlLnJlbW92ZU9yZGVyTGluZVRleHQsXHJcbiAgdW5pdE9mTWVhc3VyZVRleHQ6IHJlc291cmNlLnVuaXRPZk1lYXN1cmVUZXh0LFxyXG4gIHRvdGFsQW1vdW50VGV4dDogcmVzb3VyY2UudG90YWxBbW91bnRUZXh0LFxyXG4gIGF2YWlsYWJsZVF1YW50aXR5VGV4dDogcmVzb3VyY2UuYXZhaWxhYmxlUXVhbnRpdHlUZXh0LFxyXG4gIGNoZWNrV2FyZWhvdXNlQXZhaWxhYmlsaXR5VGV4dDogcmVzb3VyY2UuY2hlY2tXYXJlaG91c2VBdmFpbGFiaWxpdHlUZXh0LFxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnc2FsZXNvcmRlcl9pdGVtX2RldGFpbCcsXHJcbiAgZWRpdFZpZXc6ICdzYWxlc29yZGVyX2l0ZW1fZWRpdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAnc2FsZXNvcmRlcml0ZW1zJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlNBTEVTT1JERVJJVEVNLFxyXG4gIGVuYWJsZU9mZmxpbmU6IHRydWUsXHJcblxyXG4gIGNyZWF0ZUVudHJ5Rm9yRGVsZXRlOiBmdW5jdGlvbiBjcmVhdGVFbnRyeUZvckRlbGV0ZShlKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHtcclxuICAgICAgJGtleTogZS4ka2V5LFxyXG4gICAgICAkZXRhZzogZS4kZXRhZyxcclxuICAgICAgJG5hbWU6IGUuJG5hbWUsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGVudHJ5O1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0VudHJ5OiBmdW5jdGlvbiBwcm9jZXNzRW50cnkoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChwcm9jZXNzRW50cnksIGFyZ3VtZW50cyk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dCAmJiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQucmVhZE9ubHkpIHtcclxuICAgICAgaWYgKEFwcC5iYXJzICYmIEFwcC5iYXJzLnRiYXIpIHtcclxuICAgICAgICBBcHAuYmFycy50YmFyLmRpc2FibGVUb29sKCdyZW1vdmVPcmRlckxpbmUnKTtcclxuICAgICAgICBBcHAuYmFycy50YmFyLmRpc2FibGVUb29sKCdlZGl0Jyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHJlbW92ZU9yZGVyTGluZTogZnVuY3Rpb24gcmVtb3ZlT3JkZXJMaW5lKCkge1xyXG4gICAgLy8gVE9ETzogW0lORk9SQ1JNLTc3MTJdIEltcGxlbWVudCB0aGlzIGluIHRoZSBtb2RlbCAobW9kZWwgbmVlZHMgcmVtb3ZlIGNhbGwpXHJcbiAgICBBcHAubW9kYWwuY3JlYXRlU2ltcGxlRGlhbG9nKHtcclxuICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgIGNvbnRlbnQ6IHRoaXMuY29uZmlybURlbGV0ZVRleHQsXHJcbiAgICAgIGdldENvbnRlbnQ6ICgpID0+IHsgfSxcclxuICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuY3JlYXRlRW50cnlGb3JEZWxldGUodGhpcy5lbnRyeSk7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnN0b3JlLl9jcmVhdGVFbnRyeVJlcXVlc3QodGhpcy5lbnRyeS4ka2V5LCB7fSk7XHJcblxyXG4gICAgICBpZiAocmVxdWVzdCkge1xyXG4gICAgICAgIHJlcXVlc3QuZGVsZXRlKGVudHJ5LCB7XHJcbiAgICAgICAgICBzdWNjZXNzOiB0aGlzLm9uRGVsZXRlU3VjY2VzcyxcclxuICAgICAgICAgIGZhaWx1cmU6IHRoaXMub25SZXF1ZXN0RGF0YUZhaWx1cmUsXHJcbiAgICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBvbkRlbGV0ZVN1Y2Nlc3M6IGZ1bmN0aW9uIG9uRGVsZXRlU3VjY2VzcygpIHtcclxuICAgIGNvbnN0IHZpZXdzID0gW1xyXG4gICAgICBBcHAuZ2V0Vmlldygnc2FsZXNvcmRlcl9pdGVtc19yZWxhdGVkJyksXHJcbiAgICAgIEFwcC5nZXRWaWV3KCdzYWxlc29yZGVyX2RldGFpbCcpLFxyXG4gICAgICBBcHAuZ2V0Vmlldygnc2FsZXNvcmRlcl9saXN0JyksXHJcbiAgICBdO1xyXG5cclxuICAgIHZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcclxuICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICB2aWV3LnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGNvbm5lY3QucHVibGlzaCgnL2FwcC9yZWZyZXNoJywgW3tcclxuICAgICAgcmVzb3VyY2VLaW5kOiB0aGlzLnJlc291cmNlS2luZCxcclxuICAgIH1dKTtcclxuICAgIFJlVUkuYmFjaygpO1xyXG4gIH0sXHJcbiAgcmVmcmVzaFJlcXVpcmVkRm9yOiBmdW5jdGlvbiByZWZyZXNoUmVxdWlyZWRGb3Iob3B0aW9ucykge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gISFvcHRpb25zOyAvLyBpZiBvcHRpb25zIHByb3ZpZGVkLCB0aGVuIHJlZnJlc2hcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICBpZiAodGhpcy50b29scykge1xyXG4gICAgICByZXR1cm4gdGhpcy50b29scztcclxuICAgIH1cclxuICAgIGNvbnN0IHRvb2xzID0gdGhpcy5pbmhlcml0ZWQoY3JlYXRlVG9vbExheW91dCwgYXJndW1lbnRzKTtcclxuICAgIGlmICh0b29scyAmJiB0b29scy50YmFyKSB7XHJcbiAgICAgIHRvb2xzLnRiYXIucHVzaCh7XHJcbiAgICAgICAgaWQ6ICdyZW1vdmVPcmRlckxpbmUnLFxyXG4gICAgICAgIHN2ZzogJ2Nsb3NlJyxcclxuICAgICAgICBhY3Rpb246ICdyZW1vdmVPcmRlckxpbmUnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnJlbW92ZU9yZGVyTGluZVRleHQsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL0RlbGV0ZScsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvb2xzO1xyXG4gIH0sXHJcbiAgb25BdmFpbGFiaWxpdHk6IGZ1bmN0aW9uIG9uQXZhaWxhYmlsaXR5KCkge1xyXG4gICAgUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UuZ2V0T3JkZXJJdGVtQXZhaWxhYmlsaXR5KHRoaXMuZW50cnkpXHJcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBjb25zdCBbd2FyZWhvdXNlXSA9IHJlc3VsdDtcclxuICAgICAgICBjb25zdCB7IEVycm9yQ29kZSwgQXZhaWxhYmxlUXVhbnRpdHkgfSA9IHdhcmVob3VzZTtcclxuICAgICAgICBpZiAoRXJyb3JDb2RlKSB7XHJcbiAgICAgICAgICBBcHAubW9kYWwuY3JlYXRlU2ltcGxlQWxlcnQoeyB0aXRsZTogRXJyb3JDb2RlIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoQXZhaWxhYmxlUXVhbnRpdHkpIHtcclxuICAgICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVBbGVydCh7IHRpdGxlOiB0aGlzLmF2YWlsYWJsZVF1YW50aXR5VGV4dCArIEF2YWlsYWJsZVF1YW50aXR5IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIGNvbnN0IHsgY29kZTogYmFzZUN1cnJlbmN5Q29kZSB9ID0gQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgdGl0bGU6IHRoaXMuYWN0aW9uc1RleHQsXHJcbiAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgIGNsczogJ2FjdGlvbi1saXN0JyxcclxuICAgICAgbmFtZTogJ1F1aWNrQWN0aW9uc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQ2hlY2tBdmFpbGFiaWxpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2x4TG9jYXRpb24uTmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY2hlY2tXYXJlaG91c2VBdmFpbGFiaWxpdHlUZXh0LFxyXG4gICAgICAgIGljb25DbGFzczogJ3JlZG8nLCAvLyBUT0RPOiBsb29rIGZvciBhIGJldHRlciBpY29uXHJcbiAgICAgICAgYWN0aW9uOiAnb25BdmFpbGFiaWxpdHknLFxyXG4gICAgICAgIGRpc2FibGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gQXBwLndhcmVob3VzZURpc2NvdmVyeSA9PT0gJ2F1dG8nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL0FkZCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0xpbmVOdW1iZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTGluZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubGluZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2FsZXNPcmRlcl9TYWxlc09yZGVyTnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NhbGVzT3JkZXIuU2FsZXNPcmRlck51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2FsZXNPcmRlcklkVGV4dCxcclxuICAgICAgICB2aWV3OiAnc2FsZXNvcmRlcl9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ1NhbGVzT3JkZXIuJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUHJvZHVjdE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJvZHVjdE5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb2R1Y3ROYW1lVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZGVzY3JpcHRpb25UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjdHVhbElEJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjdHVhbElEJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5za3VUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1ByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1ByaWNlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wcmljZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY29kZSA9IHRoaXMuZW50cnkuU2FsZXNPcmRlci5CYXNlQ3VycmVuY3lDb2RlIHx8IGJhc2VDdXJyZW5jeUNvZGU7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCBjb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0Rpc2NvdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rpc2NvdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5kaXNjb3VudFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY29kZSA9IHRoaXMuZW50cnkuU2FsZXNPcmRlci5CYXNlQ3VycmVuY3lDb2RlIHx8IGJhc2VDdXJyZW5jeUNvZGU7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCBjb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5lbnRyeS5TYWxlc09yZGVyLkJhc2VDdXJyZW5jeUNvZGUgfHwgYmFzZUN1cnJlbmN5Q29kZTtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIGNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRG9jQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHZhbHVlID0+IHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5TYWxlc09yZGVyLkN1cnJlbmN5Q29kZSksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUXVhbnRpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVhbnRpdHknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1YW50aXR5VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmZpeGVkTG9jYWxlKHZhbCwgMik7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdVbml0T2ZNZWFzdXJlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1VuaXRPZk1lYXN1cmUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnVuaXRPZk1lYXN1cmVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIGlmICh2YWwgJiYgdmFsLk5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbC5OYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhc2VFeHRlbmRlZEFtb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY29kZSA9IHRoaXMuZW50cnkuU2FsZXNPcmRlci5CYXNlQ3VycmVuY3lDb2RlIHx8IGJhc2VDdXJyZW5jeUNvZGU7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCBjb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0RvY0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXh0ZW5kZWRBbW91bnRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB2YWx1ZSA9PiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuU2FsZXNPcmRlci5DdXJyZW5jeUNvZGUpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0RvY1RvdGFsQW1vdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY1RvdGFsQW1vdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy50b3RhbEFtb3VudFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHZhbHVlID0+IHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5TYWxlc09yZGVyLkN1cnJlbmN5Q29kZSksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwU3RhdHVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFN0YXR1cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdXYXJlaG91c2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2x4TG9jYXRpb24uRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLndhcmVob3VzZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwU2hpcHBlZFF1YW50aXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFNoaXBwZWRRdWFudGl0eScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2hpcHBlZFF1YW50aXR5VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmZpeGVkTG9jYWxlKHZhbCwgMik7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBPcGVuUXVhbnRpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwT3BlblF1YW50aXR5JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5vcGVuUXVhbnRpdHlUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZml4ZWRMb2NhbGUodmFsLCAyKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEJhY2tPcmRlcmVkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEJhY2tPcmRlcmVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5iYWNrT3JkZXJlZFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBEcm9wU2hpcCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBEcm9wU2hpcCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZHJvcFNoaXBUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwUGFydGlhbFNoaXBBbGxvd2VkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycFBhcnRpYWxTaGlwQWxsb3dlZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGFydGlhbFNoaXBBbGxvd2VkVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0VycEZpeGVkUHJpY2VJdGVtJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycEZpeGVkUHJpY2VJdGVtJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5maXhlZFByaWNlSXRlbVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdFcnBSdXNoUmVxdWVzdCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBSdXNoUmVxdWVzdCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucnVzaFJlcXVlc3RUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRXJwU3Vic3RpdHV0ZUl0ZW0nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwU3Vic3RpdHV0ZUl0ZW0nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN1YnN0aXR1dGVJdGVtVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEl0ZW1zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgbmFtZTogJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuU2FsZXNPcmRlckl0ZW1zLkRldGFpbCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=