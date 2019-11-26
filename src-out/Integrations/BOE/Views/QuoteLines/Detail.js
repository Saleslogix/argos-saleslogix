define('crm/Integrations/BOE/Views/QuoteLines/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/connect', 'crm/Format', 'argos/Detail', '../../Models/Names', 'argos/I18n', '../../Utility', '../../PricingAvailabilityService'], function (module, exports, _declare, _lang, _connect, _Format, _Detail, _Names, _I18n, _Utility, _PricingAvailabilityService) {
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

  var resource = (0, _I18n2.default)('quoteItemsDetail');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.QuoteLines.Detail', [_Detail2.default], /** @lends crm.Integrations.BOE.Views.QuoteLines.Detail# */{
    // Localization
    titleText: resource.titleText,
    lineText: resource.lineText,
    quantityText: resource.quantityText,
    priceText: resource.priceText,
    extendedAmountText: resource.extendedAmountText,
    productNameText: resource.productNameText,
    descriptionText: resource.descriptionText,
    quoteIDText: resource.quoteIDText,
    skuText: resource.skuText,
    baseExtendedAmountText: resource.baseExtendedAmountText,
    baseAdjustedPriceText: resource.baseAdjustedPriceText,
    discountText: resource.discountText,
    adjustedPriceText: resource.adjustedPriceText,
    statusText: resource.statusText,
    openQuantityText: resource.openQuantityText,
    dropShipText: resource.dropShipText,
    fixedPriceText: resource.fixedPriceText,
    rushRequestText: resource.rushRequestText,
    warehouseText: resource.warehouseText,
    detailsText: resource.detailsText,
    relatedItemsText: resource.relatedItemsText,
    entityText: resource.entityText,
    confirmDeleteText: resource.confirmDeleteText,
    unitOfMeasureText: resource.unitOfMeasureText,
    locationText: resource.locationText,
    totalAmountText: resource.totalAmountText,
    availableQuantityText: resource.availableQuantityText,
    checkWarehouseAvailabilityText: resource.checkWarehouseAvailabilityText,
    // View Properties
    id: 'quote_line_detail',
    editView: 'quote_line_edit',
    resourceKind: 'quoteItems',
    modelName: _Names2.default.QUOTEITEM,
    entityName: 'QuoteItem',
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
          App.bars.tbar.disableTool('removeQuoteLine');
          App.bars.tbar.disableTool('edit');
        }
      }
    },
    removeQuoteLine: function removeQuoteLine() {
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
    onAvailability: function onAvailability() {
      var _this2 = this;

      _PricingAvailabilityService2.default.getQuoteItemAvailability(this.entry).then(function (result) {
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
    onDeleteSuccess: function onDeleteSuccess() {
      var views = [App.getView('quote_lines_related'), App.getView('quote_detail'), App.getView('quote_list')];

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
          id: 'removeQuoteLine',
          svg: 'close',
          action: 'removeQuoteLine',
          title: this.removeQuoteLineText,
          security: 'Entities/Quote/Delete'
        });
      }
      return tools;
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
          iconClass: 'redo', // check for a better icon
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
          name: 'QuoteNumber',
          property: 'Quote.QuoteNumber',
          label: this.quoteIDText,
          view: 'quote_detail',
          key: 'Quote.$key'
        }, {
          name: 'ProductName',
          property: 'ProductName',
          label: this.productNameText
        }, {
          name: 'Description',
          property: 'Description',
          label: this.descriptionText
        }, {
          name: 'ActualId',
          property: 'ActualId',
          label: this.skuText
        }, {
          name: 'Price',
          property: 'Price',
          label: this.priceText,
          renderer: function renderer(value) {
            var code = _this3.entry.Quote.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'Discount',
          property: 'Discount',
          label: this.discountText,
          renderer: function renderer(value) {
            var code = _this3.entry.Quote.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          label: this.baseAdjustedPriceText,
          renderer: function renderer(value) {
            var code = _this3.entry.Quote.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'DocCalculatedPrice',
          property: 'DocCalculatedPrice',
          label: this.adjustedPriceText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this3.entry.Quote.CurrencyCode);
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
            var code = _this3.entry.Quote.BaseCurrencyCode || baseCurrencyCode;
            return _Utility2.default.formatMultiCurrency(value, code);
          }
        }, {
          name: 'DocExtendedPrice',
          property: 'DocExtendedPrice',
          label: this.extendedAmountText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this3.entry.Quote.CurrencyCode);
          }
        }, {
          name: 'DocTotalAmount',
          property: 'DocTotalAmount',
          label: this.totalAmountText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this3.entry.Quote.CurrencyCode);
          }
        }, {
          name: 'Status',
          property: 'Status',
          label: this.statusText
        }, {
          name: 'SlxLocation',
          property: 'SlxLocation.Description',
          label: this.warehouseText
        }, {
          name: 'OpenQuantity',
          property: 'OpenQuantity',
          label: this.openQuantityText,
          renderer: function renderer(val) {
            return _Format2.default.fixedLocale(val, 2);
          }
        }, {
          name: 'DropShip',
          property: 'DropShip',
          label: this.dropShipText,
          renderer: function renderer(data) {
            return _Format2.default.yesNo(data);
          }
        }, {
          name: 'FixedPrice',
          property: 'FixedPrice',
          label: this.fixedPriceText,
          renderer: function renderer(value) {
            return _Utility2.default.formatMultiCurrency(value, _this3.entry.Quote.CurrencyCode);
          }
        }, {
          name: 'RushRequest',
          property: 'RushRequest',
          label: this.rushRequestText,
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

  _lang2.default.setObject('icboe.Views.QuoteLines.Detail', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3RlTGluZXMvRGV0YWlsLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsImxpbmVUZXh0IiwicXVhbnRpdHlUZXh0IiwicHJpY2VUZXh0IiwiZXh0ZW5kZWRBbW91bnRUZXh0IiwicHJvZHVjdE5hbWVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwicXVvdGVJRFRleHQiLCJza3VUZXh0IiwiYmFzZUV4dGVuZGVkQW1vdW50VGV4dCIsImJhc2VBZGp1c3RlZFByaWNlVGV4dCIsImRpc2NvdW50VGV4dCIsImFkanVzdGVkUHJpY2VUZXh0Iiwic3RhdHVzVGV4dCIsIm9wZW5RdWFudGl0eVRleHQiLCJkcm9wU2hpcFRleHQiLCJmaXhlZFByaWNlVGV4dCIsInJ1c2hSZXF1ZXN0VGV4dCIsIndhcmVob3VzZVRleHQiLCJkZXRhaWxzVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJlbnRpdHlUZXh0IiwiY29uZmlybURlbGV0ZVRleHQiLCJ1bml0T2ZNZWFzdXJlVGV4dCIsImxvY2F0aW9uVGV4dCIsInRvdGFsQW1vdW50VGV4dCIsImF2YWlsYWJsZVF1YW50aXR5VGV4dCIsImNoZWNrV2FyZWhvdXNlQXZhaWxhYmlsaXR5VGV4dCIsImlkIiwiZWRpdFZpZXciLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJRVU9URUlURU0iLCJlbnRpdHlOYW1lIiwiZW5hYmxlT2ZmbGluZSIsImNyZWF0ZUVudHJ5Rm9yRGVsZXRlIiwiZSIsImVudHJ5IiwiJGtleSIsIiRldGFnIiwiJG5hbWUiLCJwcm9jZXNzRW50cnkiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJvcHRpb25zIiwiZnJvbUNvbnRleHQiLCJyZWFkT25seSIsIkFwcCIsImJhcnMiLCJ0YmFyIiwiZGlzYWJsZVRvb2wiLCJyZW1vdmVRdW90ZUxpbmUiLCJtb2RhbCIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ0aGVuIiwicmVxdWVzdCIsInN0b3JlIiwiX2NyZWF0ZUVudHJ5UmVxdWVzdCIsImRlbGV0ZSIsInN1Y2Nlc3MiLCJvbkRlbGV0ZVN1Y2Nlc3MiLCJmYWlsdXJlIiwib25SZXF1ZXN0RGF0YUZhaWx1cmUiLCJzY29wZSIsIm9uQXZhaWxhYmlsaXR5IiwiZ2V0UXVvdGVJdGVtQXZhaWxhYmlsaXR5IiwicmVzdWx0Iiwid2FyZWhvdXNlIiwiRXJyb3JDb2RlIiwiQXZhaWxhYmxlUXVhbnRpdHkiLCJjcmVhdGVTaW1wbGVBbGVydCIsInZpZXdzIiwiZ2V0VmlldyIsImZvckVhY2giLCJ2aWV3IiwicmVmcmVzaFJlcXVpcmVkIiwicHVibGlzaCIsIlJlVUkiLCJiYWNrIiwicmVmcmVzaFJlcXVpcmVkRm9yIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwicHVzaCIsInN2ZyIsImFjdGlvbiIsInJlbW92ZVF1b3RlTGluZVRleHQiLCJzZWN1cml0eSIsImNyZWF0ZUxheW91dCIsImdldEJhc2VFeGNoYW5nZVJhdGUiLCJiYXNlQ3VycmVuY3lDb2RlIiwiY29kZSIsImxheW91dCIsImFjdGlvbnNUZXh0IiwibGlzdCIsImNscyIsIm5hbWUiLCJjaGlsZHJlbiIsInByb3BlcnR5IiwibGFiZWwiLCJpY29uQ2xhc3MiLCJkaXNhYmxlZCIsIndhcmVob3VzZURpc2NvdmVyeSIsImtleSIsInJlbmRlcmVyIiwidmFsdWUiLCJRdW90ZSIsIkJhc2VDdXJyZW5jeUNvZGUiLCJmb3JtYXRNdWx0aUN1cnJlbmN5IiwiQ3VycmVuY3lDb2RlIiwidmFsIiwiZml4ZWRMb2NhbGUiLCJOYW1lIiwiZGF0YSIsInllc05vIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLE1BQU1BLFdBQVcsb0JBQVksa0JBQVosQ0FBakI7O0FB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SW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlF1b3RlTGluZXMuRGV0YWlsXHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkRldGFpbFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRGV0YWlsXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqXHJcbiAqL1xyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgY29ubmVjdCBmcm9tICdkb2pvL19iYXNlL2Nvbm5lY3QnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgRGV0YWlsIGZyb20gJ2FyZ29zL0RldGFpbCc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJy4uLy4uL1V0aWxpdHknO1xyXG5pbXBvcnQgUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UgZnJvbSAnLi4vLi4vUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncXVvdGVJdGVtc0RldGFpbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlF1b3RlTGluZXMuRGV0YWlsJywgW0RldGFpbF0sIC8qKiBAbGVuZHMgY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuUXVvdGVMaW5lcy5EZXRhaWwjICove1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGxpbmVUZXh0OiByZXNvdXJjZS5saW5lVGV4dCxcclxuICBxdWFudGl0eVRleHQ6IHJlc291cmNlLnF1YW50aXR5VGV4dCxcclxuICBwcmljZVRleHQ6IHJlc291cmNlLnByaWNlVGV4dCxcclxuICBleHRlbmRlZEFtb3VudFRleHQ6IHJlc291cmNlLmV4dGVuZGVkQW1vdW50VGV4dCxcclxuICBwcm9kdWN0TmFtZVRleHQ6IHJlc291cmNlLnByb2R1Y3ROYW1lVGV4dCxcclxuICBkZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLmRlc2NyaXB0aW9uVGV4dCxcclxuICBxdW90ZUlEVGV4dDogcmVzb3VyY2UucXVvdGVJRFRleHQsXHJcbiAgc2t1VGV4dDogcmVzb3VyY2Uuc2t1VGV4dCxcclxuICBiYXNlRXh0ZW5kZWRBbW91bnRUZXh0OiByZXNvdXJjZS5iYXNlRXh0ZW5kZWRBbW91bnRUZXh0LFxyXG4gIGJhc2VBZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UuYmFzZUFkanVzdGVkUHJpY2VUZXh0LFxyXG4gIGRpc2NvdW50VGV4dDogcmVzb3VyY2UuZGlzY291bnRUZXh0LFxyXG4gIGFkanVzdGVkUHJpY2VUZXh0OiByZXNvdXJjZS5hZGp1c3RlZFByaWNlVGV4dCxcclxuICBzdGF0dXNUZXh0OiByZXNvdXJjZS5zdGF0dXNUZXh0LFxyXG4gIG9wZW5RdWFudGl0eVRleHQ6IHJlc291cmNlLm9wZW5RdWFudGl0eVRleHQsXHJcbiAgZHJvcFNoaXBUZXh0OiByZXNvdXJjZS5kcm9wU2hpcFRleHQsXHJcbiAgZml4ZWRQcmljZVRleHQ6IHJlc291cmNlLmZpeGVkUHJpY2VUZXh0LFxyXG4gIHJ1c2hSZXF1ZXN0VGV4dDogcmVzb3VyY2UucnVzaFJlcXVlc3RUZXh0LFxyXG4gIHdhcmVob3VzZVRleHQ6IHJlc291cmNlLndhcmVob3VzZVRleHQsXHJcbiAgZGV0YWlsc1RleHQ6IHJlc291cmNlLmRldGFpbHNUZXh0LFxyXG4gIHJlbGF0ZWRJdGVtc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuICBjb25maXJtRGVsZXRlVGV4dDogcmVzb3VyY2UuY29uZmlybURlbGV0ZVRleHQsXHJcbiAgdW5pdE9mTWVhc3VyZVRleHQ6IHJlc291cmNlLnVuaXRPZk1lYXN1cmVUZXh0LFxyXG4gIGxvY2F0aW9uVGV4dDogcmVzb3VyY2UubG9jYXRpb25UZXh0LFxyXG4gIHRvdGFsQW1vdW50VGV4dDogcmVzb3VyY2UudG90YWxBbW91bnRUZXh0LFxyXG4gIGF2YWlsYWJsZVF1YW50aXR5VGV4dDogcmVzb3VyY2UuYXZhaWxhYmxlUXVhbnRpdHlUZXh0LFxyXG4gIGNoZWNrV2FyZWhvdXNlQXZhaWxhYmlsaXR5VGV4dDogcmVzb3VyY2UuY2hlY2tXYXJlaG91c2VBdmFpbGFiaWxpdHlUZXh0LFxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAncXVvdGVfbGluZV9kZXRhaWwnLFxyXG4gIGVkaXRWaWV3OiAncXVvdGVfbGluZV9lZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdxdW90ZUl0ZW1zJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlFVT1RFSVRFTSxcclxuICBlbnRpdHlOYW1lOiAnUXVvdGVJdGVtJyxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG5cclxuICBjcmVhdGVFbnRyeUZvckRlbGV0ZTogZnVuY3Rpb24gY3JlYXRlRW50cnlGb3JEZWxldGUoZSkge1xyXG4gICAgY29uc3QgZW50cnkgPSB7XHJcbiAgICAgICRrZXk6IGUuJGtleSxcclxuICAgICAgJGV0YWc6IGUuJGV0YWcsXHJcbiAgICAgICRuYW1lOiBlLiRuYW1lLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBlbnRyeTtcclxuICB9LFxyXG4gIHByb2Nlc3NFbnRyeTogZnVuY3Rpb24gcHJvY2Vzc0VudHJ5KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQocHJvY2Vzc0VudHJ5LCBhcmd1bWVudHMpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQgJiYgdGhpcy5vcHRpb25zLmZyb21Db250ZXh0LnJlYWRPbmx5KSB7XHJcbiAgICAgIGlmIChBcHAuYmFycyAmJiBBcHAuYmFycy50YmFyKSB7XHJcbiAgICAgICAgQXBwLmJhcnMudGJhci5kaXNhYmxlVG9vbCgncmVtb3ZlUXVvdGVMaW5lJyk7XHJcbiAgICAgICAgQXBwLmJhcnMudGJhci5kaXNhYmxlVG9vbCgnZWRpdCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICByZW1vdmVRdW90ZUxpbmU6IGZ1bmN0aW9uIHJlbW92ZVF1b3RlTGluZSgpIHtcclxuICAgIC8vIFRPRE86IFtJTkZPUkNSTS03NzEyXSBJbXBsZW1lbnQgdGhpcyBpbiB0aGUgbW9kZWwgKG1vZGVsIG5lZWRzIHJlbW92ZSBjYWxsKVxyXG4gICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyh7XHJcbiAgICAgIHRpdGxlOiAnYWxlcnQnLFxyXG4gICAgICBjb250ZW50OiB0aGlzLmNvbmZpcm1EZWxldGVUZXh0LFxyXG4gICAgICBnZXRDb250ZW50OiAoKSA9PiB7IH0sXHJcbiAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgY29uc3QgZW50cnkgPSB0aGlzLmNyZWF0ZUVudHJ5Rm9yRGVsZXRlKHRoaXMuZW50cnkpO1xyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5zdG9yZS5fY3JlYXRlRW50cnlSZXF1ZXN0KHRoaXMuZW50cnkuJGtleSwge30pO1xyXG5cclxuICAgICAgaWYgKHJlcXVlc3QpIHtcclxuICAgICAgICByZXF1ZXN0LmRlbGV0ZShlbnRyeSwge1xyXG4gICAgICAgICAgc3VjY2VzczogdGhpcy5vbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgICAgICAgICBmYWlsdXJlOiB0aGlzLm9uUmVxdWVzdERhdGFGYWlsdXJlLFxyXG4gICAgICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25BdmFpbGFiaWxpdHk6IGZ1bmN0aW9uIG9uQXZhaWxhYmlsaXR5KCkge1xyXG4gICAgUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UuZ2V0UXVvdGVJdGVtQXZhaWxhYmlsaXR5KHRoaXMuZW50cnkpXHJcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICBjb25zdCBbd2FyZWhvdXNlXSA9IHJlc3VsdDtcclxuICAgICAgICBjb25zdCB7IEVycm9yQ29kZSwgQXZhaWxhYmxlUXVhbnRpdHkgfSA9IHdhcmVob3VzZTtcclxuICAgICAgICBpZiAoRXJyb3JDb2RlKSB7XHJcbiAgICAgICAgICBBcHAubW9kYWwuY3JlYXRlU2ltcGxlQWxlcnQoeyB0aXRsZTogRXJyb3JDb2RlIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoQXZhaWxhYmxlUXVhbnRpdHkpIHtcclxuICAgICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVBbGVydCh7IHRpdGxlOiB0aGlzLmF2YWlsYWJsZVF1YW50aXR5VGV4dCArIEF2YWlsYWJsZVF1YW50aXR5IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBvbkRlbGV0ZVN1Y2Nlc3M6IGZ1bmN0aW9uIG9uRGVsZXRlU3VjY2VzcygpIHtcclxuICAgIGNvbnN0IHZpZXdzID0gW1xyXG4gICAgICBBcHAuZ2V0VmlldygncXVvdGVfbGluZXNfcmVsYXRlZCcpLFxyXG4gICAgICBBcHAuZ2V0VmlldygncXVvdGVfZGV0YWlsJyksXHJcbiAgICAgIEFwcC5nZXRWaWV3KCdxdW90ZV9saXN0JyksXHJcbiAgICBdO1xyXG5cclxuICAgIHZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcclxuICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICB2aWV3LnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGNvbm5lY3QucHVibGlzaCgnL2FwcC9yZWZyZXNoJywgW3tcclxuICAgICAgcmVzb3VyY2VLaW5kOiB0aGlzLnJlc291cmNlS2luZCxcclxuICAgIH1dKTtcclxuICAgIFJlVUkuYmFjaygpO1xyXG4gIH0sXHJcbiAgcmVmcmVzaFJlcXVpcmVkRm9yOiBmdW5jdGlvbiByZWZyZXNoUmVxdWlyZWRGb3Iob3B0aW9ucykge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gISFvcHRpb25zOyAvLyBpZiBvcHRpb25zIHByb3ZpZGVkLCB0aGVuIHJlZnJlc2hcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICBpZiAodGhpcy50b29scykge1xyXG4gICAgICByZXR1cm4gdGhpcy50b29scztcclxuICAgIH1cclxuICAgIGNvbnN0IHRvb2xzID0gdGhpcy5pbmhlcml0ZWQoY3JlYXRlVG9vbExheW91dCwgYXJndW1lbnRzKTtcclxuICAgIGlmICh0b29scyAmJiB0b29scy50YmFyKSB7XHJcbiAgICAgIHRvb2xzLnRiYXIucHVzaCh7XHJcbiAgICAgICAgaWQ6ICdyZW1vdmVRdW90ZUxpbmUnLFxyXG4gICAgICAgIHN2ZzogJ2Nsb3NlJyxcclxuICAgICAgICBhY3Rpb246ICdyZW1vdmVRdW90ZUxpbmUnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnJlbW92ZVF1b3RlTGluZVRleHQsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9EZWxldGUnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0b29scztcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgY29uc3QgeyBjb2RlOiBiYXNlQ3VycmVuY3lDb2RlIH0gPSBBcHAuZ2V0QmFzZUV4Y2hhbmdlUmF0ZSgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgY2xzOiAnYWN0aW9uLWxpc3QnLFxyXG4gICAgICBuYW1lOiAnUXVpY2tBY3Rpb25zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdDaGVja0F2YWlsYWJpbGl0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTbHhMb2NhdGlvbi5OYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5jaGVja1dhcmVob3VzZUF2YWlsYWJpbGl0eVRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAncmVkbycsIC8vIGNoZWNrIGZvciBhIGJldHRlciBpY29uXHJcbiAgICAgICAgYWN0aW9uOiAnb25BdmFpbGFiaWxpdHknLFxyXG4gICAgICAgIGRpc2FibGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gQXBwLndhcmVob3VzZURpc2NvdmVyeSA9PT0gJ2F1dG8nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL0FkZCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0xpbmVOdW1iZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJwTGluZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubGluZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUXVvdGVOdW1iZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVvdGUuUXVvdGVOdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1b3RlSURUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZV9kZXRhaWwnLFxyXG4gICAgICAgIGtleTogJ1F1b3RlLiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3ROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Byb2R1Y3ROYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9kdWN0TmFtZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRlc2NyaXB0aW9uVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBY3R1YWxJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY3R1YWxJZCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc2t1VGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcmljZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJpY2VUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNvZGUgPSB0aGlzLmVudHJ5LlF1b3RlLkJhc2VDdXJyZW5jeUNvZGUgfHwgYmFzZUN1cnJlbmN5Q29kZTtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIGNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRGlzY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGlzY291bnQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRpc2NvdW50VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5lbnRyeS5RdW90ZS5CYXNlQ3VycmVuY3lDb2RlIHx8IGJhc2VDdXJyZW5jeUNvZGU7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCBjb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5lbnRyeS5RdW90ZS5CYXNlQ3VycmVuY3lDb2RlIHx8IGJhc2VDdXJyZW5jeUNvZGU7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCBjb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0RvY0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEb2NDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkanVzdGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB2YWx1ZSA9PiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuUXVvdGUuQ3VycmVuY3lDb2RlKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdRdWFudGl0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdRdWFudGl0eScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucXVhbnRpdHlUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcih2YWwpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuZml4ZWRMb2NhbGUodmFsLCAyKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1VuaXRPZk1lYXN1cmUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVW5pdE9mTWVhc3VyZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudW5pdE9mTWVhc3VyZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgaWYgKHZhbCAmJiB2YWwuTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsLk5hbWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZUV4dGVuZGVkQW1vdW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICByZW5kZXJlcjogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5lbnRyeS5RdW90ZS5CYXNlQ3VycmVuY3lDb2RlIHx8IGJhc2VDdXJyZW5jeUNvZGU7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCBjb2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0RvY0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXh0ZW5kZWRBbW91bnRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB2YWx1ZSA9PiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuUXVvdGUuQ3VycmVuY3lDb2RlKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEb2NUb3RhbEFtb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEb2NUb3RhbEFtb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMudG90YWxBbW91bnRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB2YWx1ZSA9PiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIHRoaXMuZW50cnkuUXVvdGUuQ3VycmVuY3lDb2RlKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhdHVzJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NseExvY2F0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NseExvY2F0aW9uLkRlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy53YXJlaG91c2VUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ09wZW5RdWFudGl0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdPcGVuUXVhbnRpdHknLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wZW5RdWFudGl0eVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5maXhlZExvY2FsZSh2YWwsIDIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRHJvcFNoaXAnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRHJvcFNoaXAnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRyb3BTaGlwVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0ZpeGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRml4ZWRQcmljZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZml4ZWRQcmljZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHZhbHVlID0+IHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5RdW90ZS5DdXJyZW5jeUNvZGUpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1J1c2hSZXF1ZXN0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1J1c2hSZXF1ZXN0JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5ydXNoUmVxdWVzdFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBmb3JtYXQueWVzTm8oZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgIG5hbWU6ICdSZWxhdGVkSXRlbXNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLlF1b3RlTGluZXMuRGV0YWlsJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==