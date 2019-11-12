define('crm/Integrations/BOE/Views/QuoteLines/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/Utility', 'argos/Edit', 'argos/I18n', '../../PricingAvailabilityService', 'crm/Validator', '../../Models/Names', 'argos/Models/Types'], function (module, exports, _declare, _lang, _string, _Utility, _Edit, _I18n, _PricingAvailabilityService, _Validator, _Names, _Types) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _PricingAvailabilityService2 = _interopRequireDefault(_PricingAvailabilityService);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Names2 = _interopRequireDefault(_Names);

  var _Types2 = _interopRequireDefault(_Types);

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

  var resource = (0, _I18n2.default)('quoteItemEdit');

  /**
   * @class crm.Integrations.BOE.Views.QuoteLines.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Edit
   *
   */
  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.QuoteLines.Edit', [_Edit2.default], /** @lends crm.Integrations.BOE.Views.QuoteLines.Edit# */{
    // View Properties
    id: 'quote_line_edit',
    detailView: 'quote_line_detail',
    insertSecurity: 'Entities/Quote/Add',
    updateSecurity: 'Entities/Quote/Edit',
    resourceKind: 'quoteItems',
    modelName: _Names2.default.QUOTEITEM,
    titleText: resource.titleText,
    productText: resource.productText,
    quantityText: resource.quantityText,
    quoteText: resource.quoteText,
    priceText: resource.priceText,
    baseAdjustedPriceText: resource.baseAdjustedPriceText,
    docAdjustedPriceText: resource.docAdjustedPriceText,
    baseExtendedPriceText: resource.baseExtendedPriceText,
    docExtendedPriceText: resource.docExtendedPriceText,
    unitOfMeasureText: resource.unitOfMeasureText,
    unitsOfMeasureTitle: resource.unitsOfMeasureTitle,
    docTotalAmountText: resource.docTotalAmountText,
    lineText: resource.lineText,
    warehouseText: resource.warehouseText,
    accountLinked: false,
    init: function init() {
      this.inherited(arguments);
      this.fields.ErpLineNumber.disable();
      this.fields.Quote.disable();
      this.fields.Price.disable();
      this.fields.ExtendedPrice.disable();
      this.fields.DocTotalAmount.disable();
      this.fields.DocExtendedPrice.disable();
      this.fields.CalculatedPrice.disable();
      this.fields.DocCalculatedPrice.disable();
      this.connect(this.fields.Product, 'onChange', this.onProductChange);
      this.connect(this.fields.Quantity, 'onChange', this.onQuantityChange);
    },
    _applyLogicValues: function _applyLogicValues(values) {
      var product = this.fields.Product.getSelection();
      values.ProductName = product.Name;
      values.Family = product.Family;
      values.ActualId = product.ActualId;
      values.CommodityType = product.CommodityType;
    },
    applyContext: function applyContext() {
      this.inherited(arguments);
      if (this.options && this.options.context) {
        if (this.options.context.Quote) {
          this.fields.Quote.setSelection(this.options.context.Quote);
          this.fields.Quote.disable();
          if (this.options.context.Quote.Account) {
            this.accountLinked = this.options.context.Quote.Account.ErpExtId ? true : false;
          }
        } else {
          this.fields.Quote.enable();
        }
      }
      this.setProductDependentFields();
    },
    getProductDependants: function getProductDependants() {
      return ['UnitOfMeasure'];
    },
    setProductDependentFields: function setProductDependentFields(product) {
      var _this = this;

      var dependants = this.getProductDependants();
      if (product) {
        dependants.forEach(function (f) {
          _this.fields[f].enable();
          _this.fields[f].dependsOn = 'Product';
          _this.fields[f].where = 'Product.Id eq "' + product.$key + '"';
        });
      } else {
        dependants.forEach(function (f) {
          _this.fields[f].disable();
          _this.fields[f].dependsOn = null;
          _this.fields[f].where = null;
        });
      }
    },
    onInsert: function onInsert(values) {
      this._applyLogicValues(values);
      this.inherited(arguments);
    },
    onRefresh: function onRefresh() {
      this.inherited(arguments);
      this.setProductDependentFields();
    },
    processEntry: function processEntry(entry) {
      this.setProductDependentFields(entry.Product);
      return entry;
    },
    requestProductPricing: function requestProductPricing(product, quantity, slxLocation, unitOfMeasure) {
      var _this2 = this;

      var quote = null;
      if (this.options && this.options.context && this.options.context.Quote) {
        quote = this.options.context.Quote;
      } else {
        if (this.fields.Quote) {
          quote = this.fields.Quote.getValue();
        }
      }
      if (quote && quote.$key && !this.isProcessingPricingRequest) {
        this.isProcessingPricingRequest = true;
        this.enablePricingControls(false);
        _PricingAvailabilityService2.default.getQuoteItemPricing(this.entry, quote, product, quantity, slxLocation, unitOfMeasure).then(function (results) {
          _this2.onProductPricingSuccess(results);
        }, function (error) {
          _this2.onProductPricingFailed(error);
        });
      }
    },
    onProductPricingSuccess: function onProductPricingSuccess(result) {
      var _this3 = this;

      this.processProductPricing(result).then(function () {
        _this3.reCalculate();
        _this3.isProcessingPricingRequest = false;
        _this3.enablePricingControls(true);
      }, function () {
        _this3.isProcessingPricingRequest = false;
        _this3.enablePricingControls(true);
      });
    },
    onProductPricingFailed: function onProductPricingFailed(result) {
      this.isProcessingPricingRequest = false;
      this.enablePricingControls(true);
      this.App.modal.createSimpleDialog({
        title: 'alert',
        content: result.Results
      });
    },
    setUomFromCode: function setUomFromCode(uomCode) {
      var _this4 = this;

      var curremtUom = this.fields.UnitOfMeasure.getValue();
      var product = this.fields.Product.getValue();
      var promise = new Promise(function (resolve, reject) {
        if (!_this4._uomModel) {
          _this4._uomModel = App.ModelManager.getModel(_Names2.default.UNITOFMEASURE, _Types2.default.SDATA);
        }
        if (_this4._uomModel && product) {
          if (curremtUom && curremtUom.Name !== uomCode || !curremtUom) {
            _this4._uomModel.getUnitOfMeasureFromCode(uomCode, product.$key).then(function (uom) {
              _this4.fields.UnitOfMeasure.setValue(uom);
              resolve(true);
            }, function (error) {
              reject(error);
            });
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      });
      return promise;
    },
    processProductPricing: function processProductPricing(pricingData) {
      var _this5 = this;

      var promise = new Promise(function (resolve, reject) {
        if (pricingData) {
          if (pricingData.DocCalculatedPrice) {
            _this5.fields.DocCalculatedPrice.setValue(pricingData.DocCalculatedPrice.value);
          }
          if (pricingData.DocExtendedPrice) {
            _this5.fields.DocExtendedPrice.setValue(pricingData.DocExtendedPrice.value);
          }
          if (pricingData.DocTotalAmount) {
            _this5.fields.DocTotalAmount.setValue(pricingData.DocTotalAmount.value);
          }
          if (pricingData.SlxLocationId) {
            _this5.fields.SlxLocation.setValue({
              $key: pricingData.SlxLocationId.value,
              Name: pricingData.SlxLocationCode.value
            });
          }
          if (pricingData.UnitOfMeasure) {
            _this5.setUomFromCode(pricingData.UnitOfMeasure.value).then(function () {
              resolve(true);
            }, function (error) {
              reject(error);
            });
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      });
      return promise;
    },
    formatDependentQuery: function formatDependentQuery(dependentValue, theFormat, property) {
      return _string2.default.substitute(theFormat, [_Utility2.default.getValue(dependentValue, property || '$key')]);
    },
    onProductChange: function onProductChange(value, field) {
      this.setProductDependentFields(field.currentSelection);
      this.fields.ProductName.setValue(value.text);
      this.fields.SlxLocation.setValue(null);
      this.requestProductPricing(field.currentSelection, this.fields.Quantity.getValue(), this.fields.SlxLocation.getValue(), this.fields.UnitOfMeasure.getValue());
    },
    onQuantityChange: function onQuantityChange(value) {
      if (isNaN(value)) {
        this.fields.Quantity.setValueNoTrigger(0);
      }
      if (this.isAdHocProduct(this.fields.Product.getValue())) {
        this.reCalculate();
      } else {
        this.requestProductPricing(this.fields.Product.getValue(), this.fields.Quantity.getValue(), this.fields.SlxLocation.getValue(), this.fields.UnitOfMeasure.getValue());
      }
    },
    enablePricingControls: function enablePricingControls(enable) {
      if (enable) {
        // To-do make this more dynamic.
        this.fields.Product.enable();
        this.fields.Quantity.enable();

        if (App.warehouseDiscovery === 'auto') {
          this.fields.SlxLocation.enable();
        }

        this.fields.UnitOfMeasure.enable();
      } else {
        this.fields.Product.disable();
        this.fields.Quantity.disable();

        if (App.warehouseDiscovery === 'auto') {
          this.fields.SlxLocation.disable();
        }

        this.fields.UnitOfMeasure.disable();
      }
    },
    isAdHocProduct: function isAdHocProduct(product) {
      if (product.LineType === 'FreeText') {
        return true;
      }
      return false;
    },
    reCalculate: function reCalculate() {
      var price = this.fields.CalculatedPrice.getValue();
      var quantity = this.fields.Quantity.getValue();
      this.fields.ExtendedPrice.setValue(quantity * price);
    },
    onUpdateCompleted: function onUpdateCompleted() {
      this._refreshRelatedViews();
      this.inherited(arguments);
    },
    onInsertCompleted: function onInsertCompleted() {
      this._refreshRelatedViews();
      this.inherited(arguments);
    },
    _refreshRelatedViews: function _refreshRelatedViews() {
      var views = [App.getView('quote_line_detail'), App.getView('quote_lines_list')];

      views.forEach(function (view) {
        if (view) {
          view.refreshRequired = true;
        }
      }, this);
    },
    createLayout: function createLayout() {
      var _this6 = this;

      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.lineText,
          name: 'ErpLineNumber',
          property: 'ErpLineNumber',
          type: 'text'
        }, {
          label: this.quoteText,
          name: 'Quote',
          property: 'Quote',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'QuoteNumber',
          view: 'quoteline_quote_list'
        }, {
          label: this.productText,
          name: 'Product',
          property: 'Product',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Name',
          view: 'quoteline_product_related',
          autoFocus: true,
          required: true,
          validator: _Validator2.default.exists,
          where: function where() {
            var logicalIdFromSelection = _this6.fields.Quote.currentSelection && _this6.fields.Quote.currentSelection.ErpLogicalId;
            var logicalIdFromOptions = _this6.options && _this6.options.context && _this6.options.context.Quote && _this6.options.context.Quote.ErpLogicalId;
            var logicalIdFromEntry = _this6.entry && _this6.entry.Quote && _this6.entry.Quote.ErpLogicalId;
            var logicalId = logicalIdFromSelection || logicalIdFromOptions || logicalIdFromEntry;
            if (logicalId) {
              return 'ErpLogicalId eq "' + logicalId + '"';
            }
            return null;
          }
        }, {
          name: 'ProductName',
          property: 'ProductName',
          type: 'hidden'
        }, {
          label: this.quantityText,
          name: 'Quantity',
          property: 'Quantity',
          type: 'decimal',
          default: 1,
          notificationTrigger: 'blur',
          validator: _Validator2.default.exists
        }, {
          label: this.unitOfMeasureText,
          name: 'UnitOfMeasure',
          property: 'UnitOfMeasure',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Name',
          view: 'quoteline_unitofmeasure_list',
          title: this.unitsOfMeasureTitle
        }, {
          name: 'SlxLocation',
          property: 'SlxLocation',
          label: this.warehouseText,
          type: 'lookup',
          view: 'locations_list',
          textProperty: 'Description',
          valueTextProperty: 'Name'
        }, {
          label: this.priceText,
          name: 'Price',
          property: 'Price',
          type: 'decimal',
          default: 0.00
        }, {
          label: this.baseAdjustedPriceText,
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          type: 'decimal',
          default: 0.00
        }, {
          label: this.docAdjustedPriceText,
          name: 'DocCalculatedPrice',
          property: 'DocCalculatedPrice',
          type: 'decimal',
          default: 0.00
        }, {
          label: this.baseExtendedPriceText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          type: 'decimal',
          default: 0.00
        }, {
          label: this.docExtendedPriceText,
          name: 'DocExtendedPrice',
          property: 'DocExtendedPrice',
          type: 'decimal',
          default: 0.00
        }, {
          label: this.docTotalAmountText,
          name: 'DocTotalAmount',
          property: 'DocTotalAmount',
          type: 'decimal',
          default: 0.00
        }] }]);
    }
  });

  _lang2.default.setObject('icboe.Views.QuoteLines.Edit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3RlTGluZXMvRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpZCIsImRldGFpbFZpZXciLCJpbnNlcnRTZWN1cml0eSIsInVwZGF0ZVNlY3VyaXR5IiwicmVzb3VyY2VLaW5kIiwibW9kZWxOYW1lIiwiUVVPVEVJVEVNIiwidGl0bGVUZXh0IiwicHJvZHVjdFRleHQiLCJxdWFudGl0eVRleHQiLCJxdW90ZVRleHQiLCJwcmljZVRleHQiLCJiYXNlQWRqdXN0ZWRQcmljZVRleHQiLCJkb2NBZGp1c3RlZFByaWNlVGV4dCIsImJhc2VFeHRlbmRlZFByaWNlVGV4dCIsImRvY0V4dGVuZGVkUHJpY2VUZXh0IiwidW5pdE9mTWVhc3VyZVRleHQiLCJ1bml0c09mTWVhc3VyZVRpdGxlIiwiZG9jVG90YWxBbW91bnRUZXh0IiwibGluZVRleHQiLCJ3YXJlaG91c2VUZXh0IiwiYWNjb3VudExpbmtlZCIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJmaWVsZHMiLCJFcnBMaW5lTnVtYmVyIiwiZGlzYWJsZSIsIlF1b3RlIiwiUHJpY2UiLCJFeHRlbmRlZFByaWNlIiwiRG9jVG90YWxBbW91bnQiLCJEb2NFeHRlbmRlZFByaWNlIiwiQ2FsY3VsYXRlZFByaWNlIiwiRG9jQ2FsY3VsYXRlZFByaWNlIiwiY29ubmVjdCIsIlByb2R1Y3QiLCJvblByb2R1Y3RDaGFuZ2UiLCJRdWFudGl0eSIsIm9uUXVhbnRpdHlDaGFuZ2UiLCJfYXBwbHlMb2dpY1ZhbHVlcyIsInZhbHVlcyIsInByb2R1Y3QiLCJnZXRTZWxlY3Rpb24iLCJQcm9kdWN0TmFtZSIsIk5hbWUiLCJGYW1pbHkiLCJBY3R1YWxJZCIsIkNvbW1vZGl0eVR5cGUiLCJhcHBseUNvbnRleHQiLCJvcHRpb25zIiwiY29udGV4dCIsInNldFNlbGVjdGlvbiIsIkFjY291bnQiLCJFcnBFeHRJZCIsImVuYWJsZSIsInNldFByb2R1Y3REZXBlbmRlbnRGaWVsZHMiLCJnZXRQcm9kdWN0RGVwZW5kYW50cyIsImRlcGVuZGFudHMiLCJmb3JFYWNoIiwiZiIsImRlcGVuZHNPbiIsIndoZXJlIiwiJGtleSIsIm9uSW5zZXJ0Iiwib25SZWZyZXNoIiwicHJvY2Vzc0VudHJ5IiwiZW50cnkiLCJyZXF1ZXN0UHJvZHVjdFByaWNpbmciLCJxdWFudGl0eSIsInNseExvY2F0aW9uIiwidW5pdE9mTWVhc3VyZSIsInF1b3RlIiwiZ2V0VmFsdWUiLCJpc1Byb2Nlc3NpbmdQcmljaW5nUmVxdWVzdCIsImVuYWJsZVByaWNpbmdDb250cm9scyIsImdldFF1b3RlSXRlbVByaWNpbmciLCJ0aGVuIiwicmVzdWx0cyIsIm9uUHJvZHVjdFByaWNpbmdTdWNjZXNzIiwiZXJyb3IiLCJvblByb2R1Y3RQcmljaW5nRmFpbGVkIiwicmVzdWx0IiwicHJvY2Vzc1Byb2R1Y3RQcmljaW5nIiwicmVDYWxjdWxhdGUiLCJBcHAiLCJtb2RhbCIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsIlJlc3VsdHMiLCJzZXRVb21Gcm9tQ29kZSIsInVvbUNvZGUiLCJjdXJyZW10VW9tIiwiVW5pdE9mTWVhc3VyZSIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIl91b21Nb2RlbCIsIk1vZGVsTWFuYWdlciIsImdldE1vZGVsIiwiVU5JVE9GTUVBU1VSRSIsIlNEQVRBIiwiZ2V0VW5pdE9mTWVhc3VyZUZyb21Db2RlIiwidW9tIiwic2V0VmFsdWUiLCJwcmljaW5nRGF0YSIsInZhbHVlIiwiU2x4TG9jYXRpb25JZCIsIlNseExvY2F0aW9uIiwiU2x4TG9jYXRpb25Db2RlIiwiZm9ybWF0RGVwZW5kZW50UXVlcnkiLCJkZXBlbmRlbnRWYWx1ZSIsInRoZUZvcm1hdCIsInByb3BlcnR5Iiwic3Vic3RpdHV0ZSIsImZpZWxkIiwiY3VycmVudFNlbGVjdGlvbiIsInRleHQiLCJpc05hTiIsInNldFZhbHVlTm9UcmlnZ2VyIiwiaXNBZEhvY1Byb2R1Y3QiLCJ3YXJlaG91c2VEaXNjb3ZlcnkiLCJMaW5lVHlwZSIsInByaWNlIiwib25VcGRhdGVDb21wbGV0ZWQiLCJfcmVmcmVzaFJlbGF0ZWRWaWV3cyIsIm9uSW5zZXJ0Q29tcGxldGVkIiwidmlld3MiLCJnZXRWaWV3IiwidmlldyIsInJlZnJlc2hSZXF1aXJlZCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsImRldGFpbHNUZXh0IiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJ0eXBlIiwiZW1wdHlUZXh0IiwidmFsdWVUZXh0UHJvcGVydHkiLCJhdXRvRm9jdXMiLCJyZXF1aXJlZCIsInZhbGlkYXRvciIsImV4aXN0cyIsImxvZ2ljYWxJZEZyb21TZWxlY3Rpb24iLCJFcnBMb2dpY2FsSWQiLCJsb2dpY2FsSWRGcm9tT3B0aW9ucyIsImxvZ2ljYWxJZEZyb21FbnRyeSIsImxvZ2ljYWxJZCIsImRlZmF1bHQiLCJub3RpZmljYXRpb25UcmlnZ2VyIiwidGV4dFByb3BlcnR5Iiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxXQUFXLG9CQUFZLGVBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7O0FBUUEsTUFBTUMsVUFBVSx1QkFBUSw0Q0FBUixFQUFzRCxnQkFBdEQsRUFBOEQseURBQXlEO0FBQ3JJO0FBQ0FDLFFBQUksaUJBRmlJO0FBR3JJQyxnQkFBWSxtQkFIeUg7QUFJcklDLG9CQUFnQixvQkFKcUg7QUFLcklDLG9CQUFnQixxQkFMcUg7QUFNcklDLGtCQUFjLFlBTnVIO0FBT3JJQyxlQUFXLGdCQUFZQyxTQVA4RztBQVFySUMsZUFBV1QsU0FBU1MsU0FSaUg7QUFTcklDLGlCQUFhVixTQUFTVSxXQVQrRztBQVVySUMsa0JBQWNYLFNBQVNXLFlBVjhHO0FBV3JJQyxlQUFXWixTQUFTWSxTQVhpSDtBQVlySUMsZUFBV2IsU0FBU2EsU0FaaUg7QUFh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TFIsU0FyRU8sRUEyRVA7QUFDRGIsaUJBQU8sS0FBSzdILG9CQURYO0FBRUQySCxnQkFBTSxvQkFGTDtBQUdEckIsb0JBQVUsb0JBSFQ7QUFJRHdCLGdCQUFNLFNBSkw7QUFLRFksbUJBQVM7QUFMUixTQTNFTyxFQWlGUDtBQUNEYixpQkFBTyxLQUFLNUgscUJBRFg7QUFFRDBILGdCQUFNLGVBRkw7QUFHRHJCLG9CQUFVLGVBSFQ7QUFJRHdCLGdCQUFNLFNBSkw7QUFLRFksbUJBQVM7QUFMUixTQWpGTyxFQXVGUDtBQUNEYixpQkFBTyxLQUFLM0gsb0JBRFg7QUFFRHlILGdCQUFNLGtCQUZMO0FBR0RyQixvQkFBVSxrQkFIVDtBQUlEd0IsZ0JBQU0sU0FKTDtBQUtEWSxtQkFBUztBQUxSLFNBdkZPLEVBNkZQO0FBQ0RiLGlCQUFPLEtBQUt4SCxrQkFEWDtBQUVEc0gsZ0JBQU0sZ0JBRkw7QUFHRHJCLG9CQUFVLGdCQUhUO0FBSUR3QixnQkFBTSxTQUpMO0FBS0RZLG1CQUFTO0FBTFIsU0E3Rk8sQ0FIMEIsRUFBRCxDQUE5QixDQUFQO0FBeUdEO0FBblhvSSxHQUF2SCxDQUFoQjs7QUFzWEEsaUJBQUtHLFNBQUwsQ0FBZSw2QkFBZixFQUE4QzNKLE9BQTlDO29CQUNlQSxPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZSBmcm9tICcuLi8uLi9QcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZSc7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnY3JtL1ZhbGlkYXRvcic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3F1b3RlSXRlbUVkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuUXVvdGVMaW5lcy5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkVkaXRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5RdW90ZUxpbmVzLkVkaXQnLCBbRWRpdF0sIC8qKiBAbGVuZHMgY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuUXVvdGVMaW5lcy5FZGl0IyAqL3tcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3F1b3RlX2xpbmVfZWRpdCcsXHJcbiAgZGV0YWlsVmlldzogJ3F1b3RlX2xpbmVfZGV0YWlsJyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL1F1b3RlL0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9FZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdxdW90ZUl0ZW1zJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlFVT1RFSVRFTSxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBwcm9kdWN0VGV4dDogcmVzb3VyY2UucHJvZHVjdFRleHQsXHJcbiAgcXVhbnRpdHlUZXh0OiByZXNvdXJjZS5xdWFudGl0eVRleHQsXHJcbiAgcXVvdGVUZXh0OiByZXNvdXJjZS5xdW90ZVRleHQsXHJcbiAgcHJpY2VUZXh0OiByZXNvdXJjZS5wcmljZVRleHQsXHJcbiAgYmFzZUFkanVzdGVkUHJpY2VUZXh0OiByZXNvdXJjZS5iYXNlQWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgZG9jQWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmRvY0FkanVzdGVkUHJpY2VUZXh0LFxyXG4gIGJhc2VFeHRlbmRlZFByaWNlVGV4dDogcmVzb3VyY2UuYmFzZUV4dGVuZGVkUHJpY2VUZXh0LFxyXG4gIGRvY0V4dGVuZGVkUHJpY2VUZXh0OiByZXNvdXJjZS5kb2NFeHRlbmRlZFByaWNlVGV4dCxcclxuICB1bml0T2ZNZWFzdXJlVGV4dDogcmVzb3VyY2UudW5pdE9mTWVhc3VyZVRleHQsXHJcbiAgdW5pdHNPZk1lYXN1cmVUaXRsZTogcmVzb3VyY2UudW5pdHNPZk1lYXN1cmVUaXRsZSxcclxuICBkb2NUb3RhbEFtb3VudFRleHQ6IHJlc291cmNlLmRvY1RvdGFsQW1vdW50VGV4dCxcclxuICBsaW5lVGV4dDogcmVzb3VyY2UubGluZVRleHQsXHJcbiAgd2FyZWhvdXNlVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlVGV4dCxcclxuICBhY2NvdW50TGlua2VkOiBmYWxzZSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMuZmllbGRzLkVycExpbmVOdW1iZXIuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuUXVvdGUuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuUHJpY2UuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuRXh0ZW5kZWRQcmljZS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Eb2NUb3RhbEFtb3VudC5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Eb2NFeHRlbmRlZFByaWNlLmRpc2FibGUoKTtcclxuICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Eb2NDYWxjdWxhdGVkUHJpY2UuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlByb2R1Y3QsICdvbkNoYW5nZScsIHRoaXMub25Qcm9kdWN0Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5RdWFudGl0eSwgJ29uQ2hhbmdlJywgdGhpcy5vblF1YW50aXR5Q2hhbmdlKTtcclxuICB9LFxyXG4gIF9hcHBseUxvZ2ljVmFsdWVzOiBmdW5jdGlvbiBfYXBwbHlMb2dpY1ZhbHVlcyh2YWx1ZXMpIHtcclxuICAgIGNvbnN0IHByb2R1Y3QgPSB0aGlzLmZpZWxkcy5Qcm9kdWN0LmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFsdWVzLlByb2R1Y3ROYW1lID0gcHJvZHVjdC5OYW1lO1xyXG4gICAgdmFsdWVzLkZhbWlseSA9IHByb2R1Y3QuRmFtaWx5O1xyXG4gICAgdmFsdWVzLkFjdHVhbElkID0gcHJvZHVjdC5BY3R1YWxJZDtcclxuICAgIHZhbHVlcy5Db21tb2RpdHlUeXBlID0gcHJvZHVjdC5Db21tb2RpdHlUeXBlO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuY29udGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRleHQuUXVvdGUpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5RdW90ZS5zZXRTZWxlY3Rpb24odGhpcy5vcHRpb25zLmNvbnRleHQuUXVvdGUpO1xyXG4gICAgICAgIHRoaXMuZmllbGRzLlF1b3RlLmRpc2FibGUoKTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRleHQuUXVvdGUuQWNjb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5hY2NvdW50TGlua2VkID0gdGhpcy5vcHRpb25zLmNvbnRleHQuUXVvdGUuQWNjb3VudC5FcnBFeHRJZCA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuUXVvdGUuZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2V0UHJvZHVjdERlcGVuZGVudEZpZWxkcygpO1xyXG4gIH0sXHJcbiAgZ2V0UHJvZHVjdERlcGVuZGFudHM6IGZ1bmN0aW9uIGdldFByb2R1Y3REZXBlbmRhbnRzKCkge1xyXG4gICAgcmV0dXJuIFsnVW5pdE9mTWVhc3VyZSddO1xyXG4gIH0sXHJcbiAgc2V0UHJvZHVjdERlcGVuZGVudEZpZWxkczogZnVuY3Rpb24gc2V0UHJvZHVjdERlcGVuZGVudEZpZWxkcyhwcm9kdWN0KSB7XHJcbiAgICBjb25zdCBkZXBlbmRhbnRzID0gdGhpcy5nZXRQcm9kdWN0RGVwZW5kYW50cygpO1xyXG4gICAgaWYgKHByb2R1Y3QpIHtcclxuICAgICAgZGVwZW5kYW50cy5mb3JFYWNoKChmKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZW5hYmxlKCk7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZGVwZW5kc09uID0gJ1Byb2R1Y3QnO1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gYFByb2R1Y3QuSWQgZXEgXCIke3Byb2R1Y3QuJGtleX1cImA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGVwZW5kYW50cy5mb3JFYWNoKChmKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZGlzYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLmRlcGVuZHNPbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0ud2hlcmUgPSBudWxsO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uSW5zZXJ0OiBmdW5jdGlvbiBvbkluc2VydCh2YWx1ZXMpIHtcclxuICAgIHRoaXMuX2FwcGx5TG9naWNWYWx1ZXModmFsdWVzKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBvblJlZnJlc2g6IGZ1bmN0aW9uIG9uUmVmcmVzaCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLnNldFByb2R1Y3REZXBlbmRlbnRGaWVsZHMoKTtcclxuICB9LFxyXG4gIHByb2Nlc3NFbnRyeTogZnVuY3Rpb24gcHJvY2Vzc0VudHJ5KGVudHJ5KSB7XHJcbiAgICB0aGlzLnNldFByb2R1Y3REZXBlbmRlbnRGaWVsZHMoZW50cnkuUHJvZHVjdCk7XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfSxcclxuICByZXF1ZXN0UHJvZHVjdFByaWNpbmc6IGZ1bmN0aW9uIHJlcXVlc3RQcm9kdWN0UHJpY2luZyhwcm9kdWN0LCBxdWFudGl0eSwgc2x4TG9jYXRpb24sIHVuaXRPZk1lYXN1cmUpIHtcclxuICAgIGxldCBxdW90ZSA9IG51bGw7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5jb250ZXh0ICYmIHRoaXMub3B0aW9ucy5jb250ZXh0LlF1b3RlKSB7XHJcbiAgICAgIHF1b3RlID0gdGhpcy5vcHRpb25zLmNvbnRleHQuUXVvdGU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHMuUXVvdGUpIHtcclxuICAgICAgICBxdW90ZSA9IHRoaXMuZmllbGRzLlF1b3RlLmdldFZhbHVlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChxdW90ZSAmJiBxdW90ZS4ka2V5ICYmICF0aGlzLmlzUHJvY2Vzc2luZ1ByaWNpbmdSZXF1ZXN0KSB7XHJcbiAgICAgIHRoaXMuaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmVuYWJsZVByaWNpbmdDb250cm9scyhmYWxzZSk7XHJcbiAgICAgIFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlLmdldFF1b3RlSXRlbVByaWNpbmcodGhpcy5lbnRyeSwgcXVvdGUsIHByb2R1Y3QsIHF1YW50aXR5LCBzbHhMb2NhdGlvbiwgdW5pdE9mTWVhc3VyZSkudGhlbihcclxuICAgICAgICAocmVzdWx0cykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vblByb2R1Y3RQcmljaW5nU3VjY2VzcyhyZXN1bHRzKTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHRoaXMub25Qcm9kdWN0UHJpY2luZ0ZhaWxlZChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblByb2R1Y3RQcmljaW5nU3VjY2VzczogZnVuY3Rpb24gb25Qcm9kdWN0UHJpY2luZ1N1Y2Nlc3MocmVzdWx0KSB7XHJcbiAgICB0aGlzLnByb2Nlc3NQcm9kdWN0UHJpY2luZyhyZXN1bHQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlQ2FsY3VsYXRlKCk7XHJcbiAgICAgIHRoaXMuaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QgPSBmYWxzZTtcclxuICAgICAgdGhpcy5lbmFibGVQcmljaW5nQ29udHJvbHModHJ1ZSk7XHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QgPSBmYWxzZTtcclxuICAgICAgdGhpcy5lbmFibGVQcmljaW5nQ29udHJvbHModHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9uUHJvZHVjdFByaWNpbmdGYWlsZWQ6IGZ1bmN0aW9uIG9uUHJvZHVjdFByaWNpbmdGYWlsZWQocmVzdWx0KSB7XHJcbiAgICB0aGlzLmlzUHJvY2Vzc2luZ1ByaWNpbmdSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICB0aGlzLmVuYWJsZVByaWNpbmdDb250cm9scyh0cnVlKTtcclxuICAgIHRoaXMuQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyh7XHJcbiAgICAgIHRpdGxlOiAnYWxlcnQnLFxyXG4gICAgICBjb250ZW50OiByZXN1bHQuUmVzdWx0cyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2V0VW9tRnJvbUNvZGU6IGZ1bmN0aW9uIHNldFVvbUZyb21Db2RlKHVvbUNvZGUpIHtcclxuICAgIGNvbnN0IGN1cnJlbXRVb20gPSB0aGlzLmZpZWxkcy5Vbml0T2ZNZWFzdXJlLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCBwcm9kdWN0ID0gdGhpcy5maWVsZHMuUHJvZHVjdC5nZXRWYWx1ZSgpO1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLl91b21Nb2RlbCkge1xyXG4gICAgICAgIHRoaXMuX3VvbU1vZGVsID0gQXBwLk1vZGVsTWFuYWdlci5nZXRNb2RlbChNT0RFTF9OQU1FUy5VTklUT0ZNRUFTVVJFLCBNT0RFTF9UWVBFUy5TREFUQSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuX3VvbU1vZGVsICYmIHByb2R1Y3QpIHtcclxuICAgICAgICBpZiAoKGN1cnJlbXRVb20gJiYgKGN1cnJlbXRVb20uTmFtZSAhPT0gdW9tQ29kZSkpIHx8ICghY3VycmVtdFVvbSkpIHtcclxuICAgICAgICAgIHRoaXMuX3VvbU1vZGVsLmdldFVuaXRPZk1lYXN1cmVGcm9tQ29kZSh1b21Db2RlLCBwcm9kdWN0LiRrZXkpLnRoZW4oKHVvbSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5Vbml0T2ZNZWFzdXJlLnNldFZhbHVlKHVvbSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc1Byb2R1Y3RQcmljaW5nOiBmdW5jdGlvbiBwcm9jZXNzUHJvZHVjdFByaWNpbmcocHJpY2luZ0RhdGEpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmIChwcmljaW5nRGF0YSkge1xyXG4gICAgICAgIGlmIChwcmljaW5nRGF0YS5Eb2NDYWxjdWxhdGVkUHJpY2UpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzLkRvY0NhbGN1bGF0ZWRQcmljZS5zZXRWYWx1ZShwcmljaW5nRGF0YS5Eb2NDYWxjdWxhdGVkUHJpY2UudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJpY2luZ0RhdGEuRG9jRXh0ZW5kZWRQcmljZSkge1xyXG4gICAgICAgICAgdGhpcy5maWVsZHMuRG9jRXh0ZW5kZWRQcmljZS5zZXRWYWx1ZShwcmljaW5nRGF0YS5Eb2NFeHRlbmRlZFByaWNlLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByaWNpbmdEYXRhLkRvY1RvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkcy5Eb2NUb3RhbEFtb3VudC5zZXRWYWx1ZShwcmljaW5nRGF0YS5Eb2NUb3RhbEFtb3VudC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcmljaW5nRGF0YS5TbHhMb2NhdGlvbklkKSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5zZXRWYWx1ZSh7XHJcbiAgICAgICAgICAgICRrZXk6IHByaWNpbmdEYXRhLlNseExvY2F0aW9uSWQudmFsdWUsXHJcbiAgICAgICAgICAgIE5hbWU6IHByaWNpbmdEYXRhLlNseExvY2F0aW9uQ29kZS52YWx1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJpY2luZ0RhdGEuVW5pdE9mTWVhc3VyZSkge1xyXG4gICAgICAgICAgdGhpcy5zZXRVb21Gcm9tQ29kZShwcmljaW5nRGF0YS5Vbml0T2ZNZWFzdXJlLnZhbHVlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBmb3JtYXREZXBlbmRlbnRRdWVyeTogZnVuY3Rpb24gZm9ybWF0RGVwZW5kZW50UXVlcnkoZGVwZW5kZW50VmFsdWUsIHRoZUZvcm1hdCwgcHJvcGVydHkpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGVGb3JtYXQsIFt1dGlsaXR5LmdldFZhbHVlKGRlcGVuZGVudFZhbHVlLCBwcm9wZXJ0eSB8fCAnJGtleScpXSk7XHJcbiAgfSxcclxuICBvblByb2R1Y3RDaGFuZ2U6IGZ1bmN0aW9uIG9uUHJvZHVjdENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMuc2V0UHJvZHVjdERlcGVuZGVudEZpZWxkcyhmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICAgIHRoaXMuZmllbGRzLlByb2R1Y3ROYW1lLnNldFZhbHVlKHZhbHVlLnRleHQpO1xyXG4gICAgdGhpcy5maWVsZHMuU2x4TG9jYXRpb24uc2V0VmFsdWUobnVsbCk7XHJcbiAgICB0aGlzLnJlcXVlc3RQcm9kdWN0UHJpY2luZyhcclxuICAgICAgZmllbGQuY3VycmVudFNlbGVjdGlvbixcclxuICAgICAgdGhpcy5maWVsZHMuUXVhbnRpdHkuZ2V0VmFsdWUoKSxcclxuICAgICAgdGhpcy5maWVsZHMuU2x4TG9jYXRpb24uZ2V0VmFsdWUoKSxcclxuICAgICAgdGhpcy5maWVsZHMuVW5pdE9mTWVhc3VyZS5nZXRWYWx1ZSgpXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgb25RdWFudGl0eUNoYW5nZTogZnVuY3Rpb24gb25RdWFudGl0eUNoYW5nZSh2YWx1ZSkge1xyXG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5zZXRWYWx1ZU5vVHJpZ2dlcigwKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzQWRIb2NQcm9kdWN0KHRoaXMuZmllbGRzLlByb2R1Y3QuZ2V0VmFsdWUoKSkpIHtcclxuICAgICAgdGhpcy5yZUNhbGN1bGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZXF1ZXN0UHJvZHVjdFByaWNpbmcoXHJcbiAgICAgICAgdGhpcy5maWVsZHMuUHJvZHVjdC5nZXRWYWx1ZSgpLFxyXG4gICAgICAgIHRoaXMuZmllbGRzLlF1YW50aXR5LmdldFZhbHVlKCksXHJcbiAgICAgICAgdGhpcy5maWVsZHMuU2x4TG9jYXRpb24uZ2V0VmFsdWUoKSxcclxuICAgICAgICB0aGlzLmZpZWxkcy5Vbml0T2ZNZWFzdXJlLmdldFZhbHVlKClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGVuYWJsZVByaWNpbmdDb250cm9sczogZnVuY3Rpb24gZW5hYmxlUHJpY2luZ0NvbnRyb2xzKGVuYWJsZSkge1xyXG4gICAgaWYgKGVuYWJsZSkgeyAvLyBUby1kbyBtYWtlIHRoaXMgbW9yZSBkeW5hbWljLlxyXG4gICAgICB0aGlzLmZpZWxkcy5Qcm9kdWN0LmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5lbmFibGUoKTtcclxuXHJcbiAgICAgIGlmIChBcHAud2FyZWhvdXNlRGlzY292ZXJ5ID09PSAnYXV0bycpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5lbmFibGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5maWVsZHMuVW5pdE9mTWVhc3VyZS5lbmFibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlByb2R1Y3QuZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5kaXNhYmxlKCk7XHJcblxyXG4gICAgICBpZiAoQXBwLndhcmVob3VzZURpc2NvdmVyeSA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuU2x4TG9jYXRpb24uZGlzYWJsZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmZpZWxkcy5Vbml0T2ZNZWFzdXJlLmRpc2FibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGlzQWRIb2NQcm9kdWN0OiBmdW5jdGlvbiBpc0FkSG9jUHJvZHVjdChwcm9kdWN0KSB7XHJcbiAgICBpZiAocHJvZHVjdC5MaW5lVHlwZSA9PT0gJ0ZyZWVUZXh0Jykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIHJlQ2FsY3VsYXRlOiBmdW5jdGlvbiByZUNhbGN1bGF0ZSgpIHtcclxuICAgIGNvbnN0IHByaWNlID0gdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCBxdWFudGl0eSA9IHRoaXMuZmllbGRzLlF1YW50aXR5LmdldFZhbHVlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5FeHRlbmRlZFByaWNlLnNldFZhbHVlKHF1YW50aXR5ICogcHJpY2UpO1xyXG4gIH0sXHJcbiAgb25VcGRhdGVDb21wbGV0ZWQ6IGZ1bmN0aW9uIG9uVXBkYXRlQ29tcGxldGVkKCkge1xyXG4gICAgdGhpcy5fcmVmcmVzaFJlbGF0ZWRWaWV3cygpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIG9uSW5zZXJ0Q29tcGxldGVkOiBmdW5jdGlvbiBvbkluc2VydENvbXBsZXRlZCgpIHtcclxuICAgIHRoaXMuX3JlZnJlc2hSZWxhdGVkVmlld3MoKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfcmVmcmVzaFJlbGF0ZWRWaWV3czogZnVuY3Rpb24gX3JlZnJlc2hSZWxhdGVkVmlld3MoKSB7XHJcbiAgICBjb25zdCB2aWV3cyA9IFtcclxuICAgICAgQXBwLmdldFZpZXcoJ3F1b3RlX2xpbmVfZGV0YWlsJyksXHJcbiAgICAgIEFwcC5nZXRWaWV3KCdxdW90ZV9saW5lc19saXN0JyksXHJcbiAgICBdO1xyXG5cclxuICAgIHZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcclxuICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICB2aWV3LnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxpbmVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFcnBMaW5lTnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExpbmVOdW1iZXInLFxyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1b3RlVGV4dCxcclxuICAgICAgICBuYW1lOiAnUXVvdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVvdGUnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdRdW90ZU51bWJlcicsXHJcbiAgICAgICAgdmlldzogJ3F1b3RlbGluZV9xdW90ZV9saXN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb2R1Y3RUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Byb2R1Y3QnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdOYW1lJyxcclxuICAgICAgICB2aWV3OiAncXVvdGVsaW5lX3Byb2R1Y3RfcmVsYXRlZCcsXHJcbiAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgICB3aGVyZTogKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbG9naWNhbElkRnJvbVNlbGVjdGlvbiA9IHRoaXMuZmllbGRzLlF1b3RlLmN1cnJlbnRTZWxlY3Rpb24gJiYgdGhpcy5maWVsZHMuUXVvdGUuY3VycmVudFNlbGVjdGlvbi5FcnBMb2dpY2FsSWQ7XHJcbiAgICAgICAgICBjb25zdCBsb2dpY2FsSWRGcm9tT3B0aW9ucyA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuY29udGV4dCAmJiB0aGlzLm9wdGlvbnMuY29udGV4dC5RdW90ZSAmJiB0aGlzLm9wdGlvbnMuY29udGV4dC5RdW90ZS5FcnBMb2dpY2FsSWQ7XHJcbiAgICAgICAgICBjb25zdCBsb2dpY2FsSWRGcm9tRW50cnkgPSB0aGlzLmVudHJ5ICYmIHRoaXMuZW50cnkuUXVvdGUgJiYgdGhpcy5lbnRyeS5RdW90ZS5FcnBMb2dpY2FsSWQ7XHJcbiAgICAgICAgICBjb25zdCBsb2dpY2FsSWQgPSBsb2dpY2FsSWRGcm9tU2VsZWN0aW9uIHx8IGxvZ2ljYWxJZEZyb21PcHRpb25zIHx8IGxvZ2ljYWxJZEZyb21FbnRyeTtcclxuICAgICAgICAgIGlmIChsb2dpY2FsSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBFcnBMb2dpY2FsSWQgZXEgXCIke2xvZ2ljYWxJZH1cImA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3ROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Byb2R1Y3ROYW1lJyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1YW50aXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnUXVhbnRpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVhbnRpdHknLFxyXG4gICAgICAgIHR5cGU6ICdkZWNpbWFsJyxcclxuICAgICAgICBkZWZhdWx0OiAxLFxyXG4gICAgICAgIG5vdGlmaWNhdGlvblRyaWdnZXI6ICdibHVyJyxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy51bml0T2ZNZWFzdXJlVGV4dCxcclxuICAgICAgICBuYW1lOiAnVW5pdE9mTWVhc3VyZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdVbml0T2ZNZWFzdXJlJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTmFtZScsXHJcbiAgICAgICAgdmlldzogJ3F1b3RlbGluZV91bml0b2ZtZWFzdXJlX2xpc3QnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnVuaXRzT2ZNZWFzdXJlVGl0bGUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2x4TG9jYXRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2x4TG9jYXRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLndhcmVob3VzZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdmlldzogJ2xvY2F0aW9uc19saXN0JyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdOYW1lJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJpY2UnLFxyXG4gICAgICAgIHR5cGU6ICdkZWNpbWFsJyxcclxuICAgICAgICBkZWZhdWx0OiAwLjAwLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZUFkanVzdGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgZGVmYXVsdDogMC4wMCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRvY0FkanVzdGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdEb2NDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgZGVmYXVsdDogMC4wMCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhc2VFeHRlbmRlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgZGVmYXVsdDogMC4wMCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRvY0V4dGVuZGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdEb2NFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHR5cGU6ICdkZWNpbWFsJyxcclxuICAgICAgICBkZWZhdWx0OiAwLjAwLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZG9jVG90YWxBbW91bnRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdEb2NUb3RhbEFtb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEb2NUb3RhbEFtb3VudCcsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIGRlZmF1bHQ6IDAuMDAsXHJcbiAgICAgIH0sXHJcbiAgICAgIF0gfSxcclxuICAgIF0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLlF1b3RlTGluZXMuRWRpdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=