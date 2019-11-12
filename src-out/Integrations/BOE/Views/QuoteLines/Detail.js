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
      this.inherited(arguments);
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
      var tools = this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3RlTGluZXMvRGV0YWlsLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsImxpbmVUZXh0IiwicXVhbnRpdHlUZXh0IiwicHJpY2VUZXh0IiwiZXh0ZW5kZWRBbW91bnRUZXh0IiwicHJvZHVjdE5hbWVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwicXVvdGVJRFRleHQiLCJza3VUZXh0IiwiYmFzZUV4dGVuZGVkQW1vdW50VGV4dCIsImJhc2VBZGp1c3RlZFByaWNlVGV4dCIsImRpc2NvdW50VGV4dCIsImFkanVzdGVkUHJpY2VUZXh0Iiwic3RhdHVzVGV4dCIsIm9wZW5RdWFudGl0eVRleHQiLCJkcm9wU2hpcFRleHQiLCJmaXhlZFByaWNlVGV4dCIsInJ1c2hSZXF1ZXN0VGV4dCIsIndhcmVob3VzZVRleHQiLCJkZXRhaWxzVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJlbnRpdHlUZXh0IiwiY29uZmlybURlbGV0ZVRleHQiLCJ1bml0T2ZNZWFzdXJlVGV4dCIsImxvY2F0aW9uVGV4dCIsInRvdGFsQW1vdW50VGV4dCIsImF2YWlsYWJsZVF1YW50aXR5VGV4dCIsImNoZWNrV2FyZWhvdXNlQXZhaWxhYmlsaXR5VGV4dCIsImlkIiwiZWRpdFZpZXciLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJRVU9URUlURU0iLCJlbnRpdHlOYW1lIiwiZW5hYmxlT2ZmbGluZSIsImNyZWF0ZUVudHJ5Rm9yRGVsZXRlIiwiZSIsImVudHJ5IiwiJGtleSIsIiRldGFnIiwiJG5hbWUiLCJwcm9jZXNzRW50cnkiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJvcHRpb25zIiwiZnJvbUNvbnRleHQiLCJyZWFkT25seSIsIkFwcCIsImJhcnMiLCJ0YmFyIiwiZGlzYWJsZVRvb2wiLCJyZW1vdmVRdW90ZUxpbmUiLCJtb2RhbCIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ0aGVuIiwicmVxdWVzdCIsInN0b3JlIiwiX2NyZWF0ZUVudHJ5UmVxdWVzdCIsImRlbGV0ZSIsInN1Y2Nlc3MiLCJvbkRlbGV0ZVN1Y2Nlc3MiLCJmYWlsdXJlIiwib25SZXF1ZXN0RGF0YUZhaWx1cmUiLCJzY29wZSIsIm9uQXZhaWxhYmlsaXR5IiwiZ2V0UXVvdGVJdGVtQXZhaWxhYmlsaXR5IiwicmVzdWx0Iiwid2FyZWhvdXNlIiwiRXJyb3JDb2RlIiwiQXZhaWxhYmxlUXVhbnRpdHkiLCJjcmVhdGVTaW1wbGVBbGVydCIsInZpZXdzIiwiZ2V0VmlldyIsImZvckVhY2giLCJ2aWV3IiwicmVmcmVzaFJlcXVpcmVkIiwicHVibGlzaCIsIlJlVUkiLCJiYWNrIiwicmVmcmVzaFJlcXVpcmVkRm9yIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwicHVzaCIsInN2ZyIsImFjdGlvbiIsInJlbW92ZVF1b3RlTGluZVRleHQiLCJzZWN1cml0eSIsImNyZWF0ZUxheW91dCIsImdldEJhc2VFeGNoYW5nZVJhdGUiLCJiYXNlQ3VycmVuY3lDb2RlIiwiY29kZSIsImxheW91dCIsImFjdGlvbnNUZXh0IiwibGlzdCIsImNscyIsIm5hbWUiLCJjaGlsZHJlbiIsInByb3BlcnR5IiwibGFiZWwiLCJpY29uQ2xhc3MiLCJkaXNhYmxlZCIsIndhcmVob3VzZURpc2NvdmVyeSIsImtleSIsInJlbmRlcmVyIiwidmFsdWUiLCJRdW90ZSIsIkJhc2VDdXJyZW5jeUNvZGUiLCJmb3JtYXRNdWx0aUN1cnJlbmN5IiwiQ3VycmVuY3lDb2RlIiwidmFsIiwiZml4ZWRMb2NhbGUiLCJOYW1lIiwiZGF0YSIsInllc05vIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLE1BQU1BLFdBQVcsb0JBQVksa0JBQVosQ0FBakI7O0FB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QVNBLFFBQVQsQ0FBa0JNLEdBQWxCLEVBQXVCO0FBQy9CLG1CQUFPLGlCQUFPQyxXQUFQLENBQW1CRCxHQUFuQixFQUF3QixDQUF4QixDQUFQO0FBQ0Q7QUFOQSxTQTlGTyxFQXFHUDtBQUNEZCxnQkFBTSxVQURMO0FBRURFLG9CQUFVLFVBRlQ7QUFHREMsaUJBQU8sS0FBS3RGLFlBSFg7QUFJRDJGLG9CQUFVLFNBQVNBLFFBQVQsQ0FBa0JTLElBQWxCLEVBQXdCO0FBQ2hDLG1CQUFPLGlCQUFPQyxLQUFQLENBQWFELElBQWIsQ0FBUDtBQUNEO0FBTkEsU0FyR08sRUE0R1A7QUFDRGpCLGdCQUFNLFlBREw7QUFFREUsb0JBQVUsWUFGVDtBQUdEQyxpQkFBTyxLQUFLckYsY0FIWDtBQUlEMEYsb0JBQVU7QUFBQSxtQkFBUyxrQkFBUUksbUJBQVIsQ0FBNEJILEtBQTVCLEVBQW1DLE9BQUt0RSxLQUFMLENBQVd1RSxLQUFYLENBQWlCRyxZQUFwRCxDQUFUO0FBQUE7QUFKVCxTQTVHTyxFQWlIUDtBQUNEYixnQkFBTSxhQURMO0FBRURFLG9CQUFVLGFBRlQ7QUFHREMsaUJBQU8sS0FBS3BGLGVBSFg7QUFJRHlGLG9CQUFVLFNBQVNBLFFBQVQsQ0FBa0JTLElBQWxCLEVBQXdCO0FBQ2hDLG1CQUFPLGlCQUFPQyxLQUFQLENBQWFELElBQWIsQ0FBUDtBQUNEO0FBTkEsU0FqSE87QUFIVCxPQWhCa0MsRUE0SWxDO0FBQ0Q3RCxlQUFPLEtBQUtsQyxnQkFEWDtBQUVENEUsY0FBTSxJQUZMO0FBR0RFLGNBQU0scUJBSEw7QUFJREMsa0JBQVU7QUFKVCxPQTVJa0MsQ0FBOUIsQ0FBUDtBQWtKRDtBQXBSMEksR0FBN0gsQ0FBaEI7O0FBdVJBLGlCQUFLa0IsU0FBTCxDQUFlLCtCQUFmLEVBQWdEdEgsT0FBaEQ7b0JBQ2VBLE8iLCJmaWxlIjoiRGV0YWlsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5RdW90ZUxpbmVzLkRldGFpbFxyXG4gKlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5EZXRhaWxcclxuICogQHJlcXVpcmVzIGFyZ29zLkRldGFpbFxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKlxyXG4gKi9cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGNvbm5lY3QgZnJvbSAnZG9qby9fYmFzZS9jb25uZWN0JztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICcuLi8uLi9VdGlsaXR5JztcclxuaW1wb3J0IFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlIGZyb20gJy4uLy4uL1ByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3F1b3RlSXRlbXNEZXRhaWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5RdW90ZUxpbmVzLkRldGFpbCcsIFtEZXRhaWxdLCAvKiogQGxlbmRzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlF1b3RlTGluZXMuRGV0YWlsIyAqL3tcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBsaW5lVGV4dDogcmVzb3VyY2UubGluZVRleHQsXHJcbiAgcXVhbnRpdHlUZXh0OiByZXNvdXJjZS5xdWFudGl0eVRleHQsXHJcbiAgcHJpY2VUZXh0OiByZXNvdXJjZS5wcmljZVRleHQsXHJcbiAgZXh0ZW5kZWRBbW91bnRUZXh0OiByZXNvdXJjZS5leHRlbmRlZEFtb3VudFRleHQsXHJcbiAgcHJvZHVjdE5hbWVUZXh0OiByZXNvdXJjZS5wcm9kdWN0TmFtZVRleHQsXHJcbiAgZGVzY3JpcHRpb25UZXh0OiByZXNvdXJjZS5kZXNjcmlwdGlvblRleHQsXHJcbiAgcXVvdGVJRFRleHQ6IHJlc291cmNlLnF1b3RlSURUZXh0LFxyXG4gIHNrdVRleHQ6IHJlc291cmNlLnNrdVRleHQsXHJcbiAgYmFzZUV4dGVuZGVkQW1vdW50VGV4dDogcmVzb3VyY2UuYmFzZUV4dGVuZGVkQW1vdW50VGV4dCxcclxuICBiYXNlQWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICBkaXNjb3VudFRleHQ6IHJlc291cmNlLmRpc2NvdW50VGV4dCxcclxuICBhZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UuYWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICBvcGVuUXVhbnRpdHlUZXh0OiByZXNvdXJjZS5vcGVuUXVhbnRpdHlUZXh0LFxyXG4gIGRyb3BTaGlwVGV4dDogcmVzb3VyY2UuZHJvcFNoaXBUZXh0LFxyXG4gIGZpeGVkUHJpY2VUZXh0OiByZXNvdXJjZS5maXhlZFByaWNlVGV4dCxcclxuICBydXNoUmVxdWVzdFRleHQ6IHJlc291cmNlLnJ1c2hSZXF1ZXN0VGV4dCxcclxuICB3YXJlaG91c2VUZXh0OiByZXNvdXJjZS53YXJlaG91c2VUZXh0LFxyXG4gIGRldGFpbHNUZXh0OiByZXNvdXJjZS5kZXRhaWxzVGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIGVudGl0eVRleHQ6IHJlc291cmNlLmVudGl0eVRleHQsXHJcbiAgY29uZmlybURlbGV0ZVRleHQ6IHJlc291cmNlLmNvbmZpcm1EZWxldGVUZXh0LFxyXG4gIHVuaXRPZk1lYXN1cmVUZXh0OiByZXNvdXJjZS51bml0T2ZNZWFzdXJlVGV4dCxcclxuICBsb2NhdGlvblRleHQ6IHJlc291cmNlLmxvY2F0aW9uVGV4dCxcclxuICB0b3RhbEFtb3VudFRleHQ6IHJlc291cmNlLnRvdGFsQW1vdW50VGV4dCxcclxuICBhdmFpbGFibGVRdWFudGl0eVRleHQ6IHJlc291cmNlLmF2YWlsYWJsZVF1YW50aXR5VGV4dCxcclxuICBjaGVja1dhcmVob3VzZUF2YWlsYWJpbGl0eVRleHQ6IHJlc291cmNlLmNoZWNrV2FyZWhvdXNlQXZhaWxhYmlsaXR5VGV4dCxcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3F1b3RlX2xpbmVfZGV0YWlsJyxcclxuICBlZGl0VmlldzogJ3F1b3RlX2xpbmVfZWRpdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAncXVvdGVJdGVtcycsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5RVU9URUlURU0sXHJcbiAgZW50aXR5TmFtZTogJ1F1b3RlSXRlbScsXHJcbiAgZW5hYmxlT2ZmbGluZTogdHJ1ZSxcclxuXHJcbiAgY3JlYXRlRW50cnlGb3JEZWxldGU6IGZ1bmN0aW9uIGNyZWF0ZUVudHJ5Rm9yRGVsZXRlKGUpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAka2V5OiBlLiRrZXksXHJcbiAgICAgICRldGFnOiBlLiRldGFnLFxyXG4gICAgICAkbmFtZTogZS4kbmFtZSxcclxuICAgIH07XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfSxcclxuICBwcm9jZXNzRW50cnk6IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeSgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5mcm9tQ29udGV4dCAmJiB0aGlzLm9wdGlvbnMuZnJvbUNvbnRleHQucmVhZE9ubHkpIHtcclxuICAgICAgaWYgKEFwcC5iYXJzICYmIEFwcC5iYXJzLnRiYXIpIHtcclxuICAgICAgICBBcHAuYmFycy50YmFyLmRpc2FibGVUb29sKCdyZW1vdmVRdW90ZUxpbmUnKTtcclxuICAgICAgICBBcHAuYmFycy50YmFyLmRpc2FibGVUb29sKCdlZGl0Jyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHJlbW92ZVF1b3RlTGluZTogZnVuY3Rpb24gcmVtb3ZlUXVvdGVMaW5lKCkge1xyXG4gICAgLy8gVE9ETzogW0lORk9SQ1JNLTc3MTJdIEltcGxlbWVudCB0aGlzIGluIHRoZSBtb2RlbCAobW9kZWwgbmVlZHMgcmVtb3ZlIGNhbGwpXHJcbiAgICBBcHAubW9kYWwuY3JlYXRlU2ltcGxlRGlhbG9nKHtcclxuICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgIGNvbnRlbnQ6IHRoaXMuY29uZmlybURlbGV0ZVRleHQsXHJcbiAgICAgIGdldENvbnRlbnQ6ICgpID0+IHsgfSxcclxuICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuY3JlYXRlRW50cnlGb3JEZWxldGUodGhpcy5lbnRyeSk7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnN0b3JlLl9jcmVhdGVFbnRyeVJlcXVlc3QodGhpcy5lbnRyeS4ka2V5LCB7fSk7XHJcblxyXG4gICAgICBpZiAocmVxdWVzdCkge1xyXG4gICAgICAgIHJlcXVlc3QuZGVsZXRlKGVudHJ5LCB7XHJcbiAgICAgICAgICBzdWNjZXNzOiB0aGlzLm9uRGVsZXRlU3VjY2VzcyxcclxuICAgICAgICAgIGZhaWx1cmU6IHRoaXMub25SZXF1ZXN0RGF0YUZhaWx1cmUsXHJcbiAgICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBvbkF2YWlsYWJpbGl0eTogZnVuY3Rpb24gb25BdmFpbGFiaWxpdHkoKSB7XHJcbiAgICBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZS5nZXRRdW90ZUl0ZW1BdmFpbGFiaWxpdHkodGhpcy5lbnRyeSlcclxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFt3YXJlaG91c2VdID0gcmVzdWx0O1xyXG4gICAgICAgIGNvbnN0IHsgRXJyb3JDb2RlLCBBdmFpbGFibGVRdWFudGl0eSB9ID0gd2FyZWhvdXNlO1xyXG4gICAgICAgIGlmIChFcnJvckNvZGUpIHtcclxuICAgICAgICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVBbGVydCh7IHRpdGxlOiBFcnJvckNvZGUgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChBdmFpbGFibGVRdWFudGl0eSkge1xyXG4gICAgICAgICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZUFsZXJ0KHsgdGl0bGU6IHRoaXMuYXZhaWxhYmxlUXVhbnRpdHlUZXh0ICsgQXZhaWxhYmxlUXVhbnRpdHkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIG9uRGVsZXRlU3VjY2VzczogZnVuY3Rpb24gb25EZWxldGVTdWNjZXNzKCkge1xyXG4gICAgY29uc3Qgdmlld3MgPSBbXHJcbiAgICAgIEFwcC5nZXRWaWV3KCdxdW90ZV9saW5lc19yZWxhdGVkJyksXHJcbiAgICAgIEFwcC5nZXRWaWV3KCdxdW90ZV9kZXRhaWwnKSxcclxuICAgICAgQXBwLmdldFZpZXcoJ3F1b3RlX2xpc3QnKSxcclxuICAgIF07XHJcblxyXG4gICAgdmlld3MuZm9yRWFjaCgodmlldykgPT4ge1xyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIHZpZXcucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgY29ubmVjdC5wdWJsaXNoKCcvYXBwL3JlZnJlc2gnLCBbe1xyXG4gICAgICByZXNvdXJjZUtpbmQ6IHRoaXMucmVzb3VyY2VLaW5kLFxyXG4gICAgfV0pO1xyXG4gICAgUmVVSS5iYWNrKCk7XHJcbiAgfSxcclxuICByZWZyZXNoUmVxdWlyZWRGb3I6IGZ1bmN0aW9uIHJlZnJlc2hSZXF1aXJlZEZvcihvcHRpb25zKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHJldHVybiAhIW9wdGlvbnM7IC8vIGlmIG9wdGlvbnMgcHJvdmlkZWQsIHRoZW4gcmVmcmVzaFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIGlmICh0aGlzLnRvb2xzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRvb2xzO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdG9vbHMgPSB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKHRvb2xzICYmIHRvb2xzLnRiYXIpIHtcclxuICAgICAgdG9vbHMudGJhci5wdXNoKHtcclxuICAgICAgICBpZDogJ3JlbW92ZVF1b3RlTGluZScsXHJcbiAgICAgICAgc3ZnOiAnY2xvc2UnLFxyXG4gICAgICAgIGFjdGlvbjogJ3JlbW92ZVF1b3RlTGluZScsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMucmVtb3ZlUXVvdGVMaW5lVGV4dCxcclxuICAgICAgICBzZWN1cml0eTogJ0VudGl0aWVzL1F1b3RlL0RlbGV0ZScsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvb2xzO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICBjb25zdCB7IGNvZGU6IGJhc2VDdXJyZW5jeUNvZGUgfSA9IEFwcC5nZXRCYXNlRXhjaGFuZ2VSYXRlKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGlvbnNUZXh0LFxyXG4gICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICBjbHM6ICdhY3Rpb24tbGlzdCcsXHJcbiAgICAgIG5hbWU6ICdRdWlja0FjdGlvbnNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0NoZWNrQXZhaWxhYmlsaXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NseExvY2F0aW9uLk5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNoZWNrV2FyZWhvdXNlQXZhaWxhYmlsaXR5VGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdyZWRvJywgLy8gY2hlY2sgZm9yIGEgYmV0dGVyIGljb25cclxuICAgICAgICBhY3Rpb246ICdvbkF2YWlsYWJpbGl0eScsXHJcbiAgICAgICAgZGlzYWJsZWQ6ICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBBcHAud2FyZWhvdXNlRGlzY292ZXJ5ID09PSAnYXV0byc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWN1cml0eTogJ0VudGl0aWVzL1NhbGVzT3JkZXIvQWRkJyxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnTGluZU51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBMaW5lTnVtYmVyJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5saW5lVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdRdW90ZU51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdRdW90ZS5RdW90ZU51bWJlcicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucXVvdGVJRFRleHQsXHJcbiAgICAgICAgdmlldzogJ3F1b3RlX2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnUXVvdGUuJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUHJvZHVjdE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJvZHVjdE5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb2R1Y3ROYW1lVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZGVzY3JpcHRpb25UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjdHVhbElkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjdHVhbElkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5za3VUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1ByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1ByaWNlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5wcmljZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY29kZSA9IHRoaXMuZW50cnkuUXVvdGUuQmFzZUN1cnJlbmN5Q29kZSB8fCBiYXNlQ3VycmVuY3lDb2RlO1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgY29kZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEaXNjb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEaXNjb3VudCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZGlzY291bnRUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNvZGUgPSB0aGlzLmVudHJ5LlF1b3RlLkJhc2VDdXJyZW5jeUNvZGUgfHwgYmFzZUN1cnJlbmN5Q29kZTtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIGNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZUFkanVzdGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNvZGUgPSB0aGlzLmVudHJ5LlF1b3RlLkJhc2VDdXJyZW5jeUNvZGUgfHwgYmFzZUN1cnJlbmN5Q29kZTtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIGNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRG9jQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHZhbHVlID0+IHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5RdW90ZS5DdXJyZW5jeUNvZGUpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1F1YW50aXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1F1YW50aXR5JyxcclxuICAgICAgICBsYWJlbDogdGhpcy5xdWFudGl0eVRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZ1bmN0aW9uIHJlbmRlcmVyKHZhbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5maXhlZExvY2FsZSh2YWwsIDIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnVW5pdE9mTWVhc3VyZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdVbml0T2ZNZWFzdXJlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy51bml0T2ZNZWFzdXJlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICBpZiAodmFsICYmIHZhbC5OYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWwuTmFtZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5iYXNlRXh0ZW5kZWRBbW91bnRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHJlbmRlcmVyOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNvZGUgPSB0aGlzLmVudHJ5LlF1b3RlLkJhc2VDdXJyZW5jeUNvZGUgfHwgYmFzZUN1cnJlbmN5Q29kZTtcclxuICAgICAgICAgIHJldHVybiB1dGlsaXR5LmZvcm1hdE11bHRpQ3VycmVuY3kodmFsdWUsIGNvZGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRG9jRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEb2NFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5leHRlbmRlZEFtb3VudFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHZhbHVlID0+IHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5RdW90ZS5DdXJyZW5jeUNvZGUpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0RvY1RvdGFsQW1vdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY1RvdGFsQW1vdW50JyxcclxuICAgICAgICBsYWJlbDogdGhpcy50b3RhbEFtb3VudFRleHQsXHJcbiAgICAgICAgcmVuZGVyZXI6IHZhbHVlID0+IHV0aWxpdHkuZm9ybWF0TXVsdGlDdXJyZW5jeSh2YWx1ZSwgdGhpcy5lbnRyeS5RdW90ZS5DdXJyZW5jeUNvZGUpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1N0YXR1cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdGF0dXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXR1c1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2x4TG9jYXRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2x4TG9jYXRpb24uRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLndhcmVob3VzZVRleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnT3BlblF1YW50aXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ09wZW5RdWFudGl0eScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3BlblF1YW50aXR5VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIodmFsKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmZpeGVkTG9jYWxlKHZhbCwgMik7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdEcm9wU2hpcCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEcm9wU2hpcCcsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZHJvcFNoaXBUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiBmdW5jdGlvbiByZW5kZXJlcihkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0Lnllc05vKGRhdGEpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnRml4ZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdGaXhlZFByaWNlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5maXhlZFByaWNlVGV4dCxcclxuICAgICAgICByZW5kZXJlcjogdmFsdWUgPT4gdXRpbGl0eS5mb3JtYXRNdWx0aUN1cnJlbmN5KHZhbHVlLCB0aGlzLmVudHJ5LlF1b3RlLkN1cnJlbmN5Q29kZSksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUnVzaFJlcXVlc3QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUnVzaFJlcXVlc3QnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJ1c2hSZXF1ZXN0VGV4dCxcclxuICAgICAgICByZW5kZXJlcjogZnVuY3Rpb24gcmVuZGVyZXIoZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC55ZXNObyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEl0ZW1zVGV4dCxcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgbmFtZTogJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuUXVvdGVMaW5lcy5EZXRhaWwnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19