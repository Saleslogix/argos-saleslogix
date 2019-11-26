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
      this.inherited(init, arguments);
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
      this.inherited(applyContext, arguments);
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
      this.inherited(onInsert, arguments);
    },
    onRefresh: function onRefresh() {
      this.inherited(onRefresh, arguments);
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
      this.inherited(onUpdateCompleted, arguments);
    },
    onInsertCompleted: function onInsertCompleted() {
      this._refreshRelatedViews();
      this.inherited(onInsertCompleted, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1F1b3RlTGluZXMvRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpZCIsImRldGFpbFZpZXciLCJpbnNlcnRTZWN1cml0eSIsInVwZGF0ZVNlY3VyaXR5IiwicmVzb3VyY2VLaW5kIiwibW9kZWxOYW1lIiwiUVVPVEVJVEVNIiwidGl0bGVUZXh0IiwicHJvZHVjdFRleHQiLCJxdWFudGl0eVRleHQiLCJxdW90ZVRleHQiLCJwcmljZVRleHQiLCJiYXNlQWRqdXN0ZWRQcmljZVRleHQiLCJkb2NBZGp1c3RlZFByaWNlVGV4dCIsImJhc2VFeHRlbmRlZFByaWNlVGV4dCIsImRvY0V4dGVuZGVkUHJpY2VUZXh0IiwidW5pdE9mTWVhc3VyZVRleHQiLCJ1bml0c09mTWVhc3VyZVRpdGxlIiwiZG9jVG90YWxBbW91bnRUZXh0IiwibGluZVRleHQiLCJ3YXJlaG91c2VUZXh0IiwiYWNjb3VudExpbmtlZCIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJmaWVsZHMiLCJFcnBMaW5lTnVtYmVyIiwiZGlzYWJsZSIsIlF1b3RlIiwiUHJpY2UiLCJFeHRlbmRlZFByaWNlIiwiRG9jVG90YWxBbW91bnQiLCJEb2NFeHRlbmRlZFByaWNlIiwiQ2FsY3VsYXRlZFByaWNlIiwiRG9jQ2FsY3VsYXRlZFByaWNlIiwiY29ubmVjdCIsIlByb2R1Y3QiLCJvblByb2R1Y3RDaGFuZ2UiLCJRdWFudGl0eSIsIm9uUXVhbnRpdHlDaGFuZ2UiLCJfYXBwbHlMb2dpY1ZhbHVlcyIsInZhbHVlcyIsInByb2R1Y3QiLCJnZXRTZWxlY3Rpb24iLCJQcm9kdWN0TmFtZSIsIk5hbWUiLCJGYW1pbHkiLCJBY3R1YWxJZCIsIkNvbW1vZGl0eVR5cGUiLCJhcHBseUNvbnRleHQiLCJvcHRpb25zIiwiY29udGV4dCIsInNldFNlbGVjdGlvbiIsIkFjY291bnQiLCJFcnBFeHRJZCIsImVuYWJsZSIsInNldFByb2R1Y3REZXBlbmRlbnRGaWVsZHMiLCJnZXRQcm9kdWN0RGVwZW5kYW50cyIsImRlcGVuZGFudHMiLCJmb3JFYWNoIiwiZiIsImRlcGVuZHNPbiIsIndoZXJlIiwiJGtleSIsIm9uSW5zZXJ0Iiwib25SZWZyZXNoIiwicHJvY2Vzc0VudHJ5IiwiZW50cnkiLCJyZXF1ZXN0UHJvZHVjdFByaWNpbmciLCJxdWFudGl0eSIsInNseExvY2F0aW9uIiwidW5pdE9mTWVhc3VyZSIsInF1b3RlIiwiZ2V0VmFsdWUiLCJpc1Byb2Nlc3NpbmdQcmljaW5nUmVxdWVzdCIsImVuYWJsZVByaWNpbmdDb250cm9scyIsImdldFF1b3RlSXRlbVByaWNpbmciLCJ0aGVuIiwicmVzdWx0cyIsIm9uUHJvZHVjdFByaWNpbmdTdWNjZXNzIiwiZXJyb3IiLCJvblByb2R1Y3RQcmljaW5nRmFpbGVkIiwicmVzdWx0IiwicHJvY2Vzc1Byb2R1Y3RQcmljaW5nIiwicmVDYWxjdWxhdGUiLCJBcHAiLCJtb2RhbCIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsIlJlc3VsdHMiLCJzZXRVb21Gcm9tQ29kZSIsInVvbUNvZGUiLCJjdXJyZW10VW9tIiwiVW5pdE9mTWVhc3VyZSIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIl91b21Nb2RlbCIsIk1vZGVsTWFuYWdlciIsImdldE1vZGVsIiwiVU5JVE9GTUVBU1VSRSIsIlNEQVRBIiwiZ2V0VW5pdE9mTWVhc3VyZUZyb21Db2RlIiwidW9tIiwic2V0VmFsdWUiLCJwcmljaW5nRGF0YSIsInZhbHVlIiwiU2x4TG9jYXRpb25JZCIsIlNseExvY2F0aW9uIiwiU2x4TG9jYXRpb25Db2RlIiwiZm9ybWF0RGVwZW5kZW50UXVlcnkiLCJkZXBlbmRlbnRWYWx1ZSIsInRoZUZvcm1hdCIsInByb3BlcnR5Iiwic3Vic3RpdHV0ZSIsImZpZWxkIiwiY3VycmVudFNlbGVjdGlvbiIsInRleHQiLCJpc05hTiIsInNldFZhbHVlTm9UcmlnZ2VyIiwiaXNBZEhvY1Byb2R1Y3QiLCJ3YXJlaG91c2VEaXNjb3ZlcnkiLCJMaW5lVHlwZSIsInByaWNlIiwib25VcGRhdGVDb21wbGV0ZWQiLCJfcmVmcmVzaFJlbGF0ZWRWaWV3cyIsIm9uSW5zZXJ0Q29tcGxldGVkIiwidmlld3MiLCJnZXRWaWV3IiwidmlldyIsInJlZnJlc2hSZXF1aXJlZCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsImRldGFpbHNUZXh0IiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJ0eXBlIiwiZW1wdHlUZXh0IiwidmFsdWVUZXh0UHJvcGVydHkiLCJhdXRvRm9jdXMiLCJyZXF1aXJlZCIsInZhbGlkYXRvciIsImV4aXN0cyIsImxvZ2ljYWxJZEZyb21TZWxlY3Rpb24iLCJFcnBMb2dpY2FsSWQiLCJsb2dpY2FsSWRGcm9tT3B0aW9ucyIsImxvZ2ljYWxJZEZyb21FbnRyeSIsImxvZ2ljYWxJZCIsImRlZmF1bHQiLCJub3RpZmljYXRpb25UcmlnZ2VyIiwidGV4dFByb3BlcnR5Iiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxXQUFXLG9CQUFZLGVBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7O0FBUUEsTUFBTUMsVUFBVSx1QkFBUSw0Q0FBUixFQUFzRCxnQkFBdEQsRUFBOEQseURBQXlEO0FBQ3JJO0FBQ0FDLFFBQUksaUJBRmlJO0FBR3JJQyxnQkFBWSxtQkFIeUg7QUFJcklDLG9CQUFnQixvQkFKcUg7QUFLcklDLG9CQUFnQixxQkFMcUg7QUFNcklDLGtCQUFjLFlBTnVIO0FBT3JJQyxlQUFXLGdCQUFZQyxTQVA4RztBQVFySUMsZUFBV1QsU0FBU1MsU0FSaUg7QUFTcklDLGlCQUFhVixTQUFTVSxXQVQrRztBQVVySUMsa0JBQWNYLFNBQVNXLFlBVjhHO0FBV3JJQyxlQUFXWixTQUFTWSxTQVhpSDtBQVlySUMsZUFBV2IsU0FBU2EsU0FaaUg7QUFh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LGlCQUFPLEtBQUs5SCxxQkFEWDtBQUVENEgsZ0JBQU0saUJBRkw7QUFHRHJCLG9CQUFVLGlCQUhUO0FBSUR3QixnQkFBTSxTQUpMO0FBS0RZLG1CQUFTO0FBTFIsU0FyRU8sRUEyRVA7QUFDRGIsaUJBQU8sS0FBSzdILG9CQURYO0FBRUQySCxnQkFBTSxvQkFGTDtBQUdEckIsb0JBQVUsb0JBSFQ7QUFJRHdCLGdCQUFNLFNBSkw7QUFLRFksbUJBQVM7QUFMUixTQTNFTyxFQWlGUDtBQUNEYixpQkFBTyxLQUFLNUgscUJBRFg7QUFFRDBILGdCQUFNLGVBRkw7QUFHRHJCLG9CQUFVLGVBSFQ7QUFJRHdCLGdCQUFNLFNBSkw7QUFLRFksbUJBQVM7QUFMUixTQWpGTyxFQXVGUDtBQUNEYixpQkFBTyxLQUFLM0gsb0JBRFg7QUFFRHlILGdCQUFNLGtCQUZMO0FBR0RyQixvQkFBVSxrQkFIVDtBQUlEd0IsZ0JBQU0sU0FKTDtBQUtEWSxtQkFBUztBQUxSLFNBdkZPLEVBNkZQO0FBQ0RiLGlCQUFPLEtBQUt4SCxrQkFEWDtBQUVEc0gsZ0JBQU0sZ0JBRkw7QUFHRHJCLG9CQUFVLGdCQUhUO0FBSUR3QixnQkFBTSxTQUpMO0FBS0RZLG1CQUFTO0FBTFIsU0E3Rk8sQ0FIMEIsRUFBRCxDQUE5QixDQUFQO0FBeUdEO0FBblhvSSxHQUF2SCxDQUFoQjs7QUFzWEEsaUJBQUtHLFNBQUwsQ0FBZSw2QkFBZixFQUE4QzNKLE9BQTlDO29CQUNlQSxPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZSBmcm9tICcuLi8uLi9QcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZSc7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnY3JtL1ZhbGlkYXRvcic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3F1b3RlSXRlbUVkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuUXVvdGVMaW5lcy5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkVkaXRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5RdW90ZUxpbmVzLkVkaXQnLCBbRWRpdF0sIC8qKiBAbGVuZHMgY3JtLkludGVncmF0aW9ucy5CT0UuVmlld3MuUXVvdGVMaW5lcy5FZGl0IyAqL3tcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ3F1b3RlX2xpbmVfZWRpdCcsXHJcbiAgZGV0YWlsVmlldzogJ3F1b3RlX2xpbmVfZGV0YWlsJyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL1F1b3RlL0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9FZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdxdW90ZUl0ZW1zJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlFVT1RFSVRFTSxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBwcm9kdWN0VGV4dDogcmVzb3VyY2UucHJvZHVjdFRleHQsXHJcbiAgcXVhbnRpdHlUZXh0OiByZXNvdXJjZS5xdWFudGl0eVRleHQsXHJcbiAgcXVvdGVUZXh0OiByZXNvdXJjZS5xdW90ZVRleHQsXHJcbiAgcHJpY2VUZXh0OiByZXNvdXJjZS5wcmljZVRleHQsXHJcbiAgYmFzZUFkanVzdGVkUHJpY2VUZXh0OiByZXNvdXJjZS5iYXNlQWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgZG9jQWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmRvY0FkanVzdGVkUHJpY2VUZXh0LFxyXG4gIGJhc2VFeHRlbmRlZFByaWNlVGV4dDogcmVzb3VyY2UuYmFzZUV4dGVuZGVkUHJpY2VUZXh0LFxyXG4gIGRvY0V4dGVuZGVkUHJpY2VUZXh0OiByZXNvdXJjZS5kb2NFeHRlbmRlZFByaWNlVGV4dCxcclxuICB1bml0T2ZNZWFzdXJlVGV4dDogcmVzb3VyY2UudW5pdE9mTWVhc3VyZVRleHQsXHJcbiAgdW5pdHNPZk1lYXN1cmVUaXRsZTogcmVzb3VyY2UudW5pdHNPZk1lYXN1cmVUaXRsZSxcclxuICBkb2NUb3RhbEFtb3VudFRleHQ6IHJlc291cmNlLmRvY1RvdGFsQW1vdW50VGV4dCxcclxuICBsaW5lVGV4dDogcmVzb3VyY2UubGluZVRleHQsXHJcbiAgd2FyZWhvdXNlVGV4dDogcmVzb3VyY2Uud2FyZWhvdXNlVGV4dCxcclxuICBhY2NvdW50TGlua2VkOiBmYWxzZSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuZmllbGRzLkVycExpbmVOdW1iZXIuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuUXVvdGUuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuUHJpY2UuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuRXh0ZW5kZWRQcmljZS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Eb2NUb3RhbEFtb3VudC5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Eb2NFeHRlbmRlZFByaWNlLmRpc2FibGUoKTtcclxuICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Eb2NDYWxjdWxhdGVkUHJpY2UuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlByb2R1Y3QsICdvbkNoYW5nZScsIHRoaXMub25Qcm9kdWN0Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5RdWFudGl0eSwgJ29uQ2hhbmdlJywgdGhpcy5vblF1YW50aXR5Q2hhbmdlKTtcclxuICB9LFxyXG4gIF9hcHBseUxvZ2ljVmFsdWVzOiBmdW5jdGlvbiBfYXBwbHlMb2dpY1ZhbHVlcyh2YWx1ZXMpIHtcclxuICAgIGNvbnN0IHByb2R1Y3QgPSB0aGlzLmZpZWxkcy5Qcm9kdWN0LmdldFNlbGVjdGlvbigpO1xyXG4gICAgdmFsdWVzLlByb2R1Y3ROYW1lID0gcHJvZHVjdC5OYW1lO1xyXG4gICAgdmFsdWVzLkZhbWlseSA9IHByb2R1Y3QuRmFtaWx5O1xyXG4gICAgdmFsdWVzLkFjdHVhbElkID0gcHJvZHVjdC5BY3R1YWxJZDtcclxuICAgIHZhbHVlcy5Db21tb2RpdHlUeXBlID0gcHJvZHVjdC5Db21tb2RpdHlUeXBlO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcHBseUNvbnRleHQsIGFyZ3VtZW50cyk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5jb250ZXh0KSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGV4dC5RdW90ZSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLlF1b3RlLnNldFNlbGVjdGlvbih0aGlzLm9wdGlvbnMuY29udGV4dC5RdW90ZSk7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuUXVvdGUuZGlzYWJsZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGV4dC5RdW90ZS5BY2NvdW50KSB7XHJcbiAgICAgICAgICB0aGlzLmFjY291bnRMaW5rZWQgPSB0aGlzLm9wdGlvbnMuY29udGV4dC5RdW90ZS5BY2NvdW50LkVycEV4dElkID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5RdW90ZS5lbmFibGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRQcm9kdWN0RGVwZW5kZW50RmllbGRzKCk7XHJcbiAgfSxcclxuICBnZXRQcm9kdWN0RGVwZW5kYW50czogZnVuY3Rpb24gZ2V0UHJvZHVjdERlcGVuZGFudHMoKSB7XHJcbiAgICByZXR1cm4gWydVbml0T2ZNZWFzdXJlJ107XHJcbiAgfSxcclxuICBzZXRQcm9kdWN0RGVwZW5kZW50RmllbGRzOiBmdW5jdGlvbiBzZXRQcm9kdWN0RGVwZW5kZW50RmllbGRzKHByb2R1Y3QpIHtcclxuICAgIGNvbnN0IGRlcGVuZGFudHMgPSB0aGlzLmdldFByb2R1Y3REZXBlbmRhbnRzKCk7XHJcbiAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICBkZXBlbmRhbnRzLmZvckVhY2goKGYpID0+IHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tmXS5lbmFibGUoKTtcclxuICAgICAgICB0aGlzLmZpZWxkc1tmXS5kZXBlbmRzT24gPSAnUHJvZHVjdCc7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0ud2hlcmUgPSBgUHJvZHVjdC5JZCBlcSBcIiR7cHJvZHVjdC4ka2V5fVwiYDtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkZXBlbmRhbnRzLmZvckVhY2goKGYpID0+IHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tmXS5kaXNhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZGVwZW5kc09uID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZpZWxkc1tmXS53aGVyZSA9IG51bGw7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25JbnNlcnQ6IGZ1bmN0aW9uIG9uSW5zZXJ0KHZhbHVlcykge1xyXG4gICAgdGhpcy5fYXBwbHlMb2dpY1ZhbHVlcyh2YWx1ZXMpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQob25JbnNlcnQsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBvblJlZnJlc2g6IGZ1bmN0aW9uIG9uUmVmcmVzaCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKG9uUmVmcmVzaCwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuc2V0UHJvZHVjdERlcGVuZGVudEZpZWxkcygpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0VudHJ5OiBmdW5jdGlvbiBwcm9jZXNzRW50cnkoZW50cnkpIHtcclxuICAgIHRoaXMuc2V0UHJvZHVjdERlcGVuZGVudEZpZWxkcyhlbnRyeS5Qcm9kdWN0KTtcclxuICAgIHJldHVybiBlbnRyeTtcclxuICB9LFxyXG4gIHJlcXVlc3RQcm9kdWN0UHJpY2luZzogZnVuY3Rpb24gcmVxdWVzdFByb2R1Y3RQcmljaW5nKHByb2R1Y3QsIHF1YW50aXR5LCBzbHhMb2NhdGlvbiwgdW5pdE9mTWVhc3VyZSkge1xyXG4gICAgbGV0IHF1b3RlID0gbnVsbDtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmNvbnRleHQgJiYgdGhpcy5vcHRpb25zLmNvbnRleHQuUXVvdGUpIHtcclxuICAgICAgcXVvdGUgPSB0aGlzLm9wdGlvbnMuY29udGV4dC5RdW90ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmZpZWxkcy5RdW90ZSkge1xyXG4gICAgICAgIHF1b3RlID0gdGhpcy5maWVsZHMuUXVvdGUuZ2V0VmFsdWUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHF1b3RlICYmIHF1b3RlLiRrZXkgJiYgIXRoaXMuaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QpIHtcclxuICAgICAgdGhpcy5pc1Byb2Nlc3NpbmdQcmljaW5nUmVxdWVzdCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZW5hYmxlUHJpY2luZ0NvbnRyb2xzKGZhbHNlKTtcclxuICAgICAgUHJpY2luZ0F2YWlsYWJpbGl0eVNlcnZpY2UuZ2V0UXVvdGVJdGVtUHJpY2luZyh0aGlzLmVudHJ5LCBxdW90ZSwgcHJvZHVjdCwgcXVhbnRpdHksIHNseExvY2F0aW9uLCB1bml0T2ZNZWFzdXJlKS50aGVuKFxyXG4gICAgICAgIChyZXN1bHRzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm9uUHJvZHVjdFByaWNpbmdTdWNjZXNzKHJlc3VsdHMpO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vblByb2R1Y3RQcmljaW5nRmFpbGVkKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUHJvZHVjdFByaWNpbmdTdWNjZXNzOiBmdW5jdGlvbiBvblByb2R1Y3RQcmljaW5nU3VjY2VzcyhyZXN1bHQpIHtcclxuICAgIHRoaXMucHJvY2Vzc1Byb2R1Y3RQcmljaW5nKHJlc3VsdCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVDYWxjdWxhdGUoKTtcclxuICAgICAgdGhpcy5pc1Byb2Nlc3NpbmdQcmljaW5nUmVxdWVzdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmVuYWJsZVByaWNpbmdDb250cm9scyh0cnVlKTtcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgdGhpcy5pc1Byb2Nlc3NpbmdQcmljaW5nUmVxdWVzdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmVuYWJsZVByaWNpbmdDb250cm9scyh0cnVlKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25Qcm9kdWN0UHJpY2luZ0ZhaWxlZDogZnVuY3Rpb24gb25Qcm9kdWN0UHJpY2luZ0ZhaWxlZChyZXN1bHQpIHtcclxuICAgIHRoaXMuaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QgPSBmYWxzZTtcclxuICAgIHRoaXMuZW5hYmxlUHJpY2luZ0NvbnRyb2xzKHRydWUpO1xyXG4gICAgdGhpcy5BcHAubW9kYWwuY3JlYXRlU2ltcGxlRGlhbG9nKHtcclxuICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgIGNvbnRlbnQ6IHJlc3VsdC5SZXN1bHRzLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBzZXRVb21Gcm9tQ29kZTogZnVuY3Rpb24gc2V0VW9tRnJvbUNvZGUodW9tQ29kZSkge1xyXG4gICAgY29uc3QgY3VycmVtdFVvbSA9IHRoaXMuZmllbGRzLlVuaXRPZk1lYXN1cmUuZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IHByb2R1Y3QgPSB0aGlzLmZpZWxkcy5Qcm9kdWN0LmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuX3VvbU1vZGVsKSB7XHJcbiAgICAgICAgdGhpcy5fdW9tTW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKE1PREVMX05BTUVTLlVOSVRPRk1FQVNVUkUsIE1PREVMX1RZUEVTLlNEQVRBKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5fdW9tTW9kZWwgJiYgcHJvZHVjdCkge1xyXG4gICAgICAgIGlmICgoY3VycmVtdFVvbSAmJiAoY3VycmVtdFVvbS5OYW1lICE9PSB1b21Db2RlKSkgfHwgKCFjdXJyZW10VW9tKSkge1xyXG4gICAgICAgICAgdGhpcy5fdW9tTW9kZWwuZ2V0VW5pdE9mTWVhc3VyZUZyb21Db2RlKHVvbUNvZGUsIHByb2R1Y3QuJGtleSkudGhlbigodW9tKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLlVuaXRPZk1lYXN1cmUuc2V0VmFsdWUodW9tKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBwcm9jZXNzUHJvZHVjdFByaWNpbmc6IGZ1bmN0aW9uIHByb2Nlc3NQcm9kdWN0UHJpY2luZyhwcmljaW5nRGF0YSkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHByaWNpbmdEYXRhKSB7XHJcbiAgICAgICAgaWYgKHByaWNpbmdEYXRhLkRvY0NhbGN1bGF0ZWRQcmljZSkge1xyXG4gICAgICAgICAgdGhpcy5maWVsZHMuRG9jQ2FsY3VsYXRlZFByaWNlLnNldFZhbHVlKHByaWNpbmdEYXRhLkRvY0NhbGN1bGF0ZWRQcmljZS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcmljaW5nRGF0YS5Eb2NFeHRlbmRlZFByaWNlKSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkcy5Eb2NFeHRlbmRlZFByaWNlLnNldFZhbHVlKHByaWNpbmdEYXRhLkRvY0V4dGVuZGVkUHJpY2UudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJpY2luZ0RhdGEuRG9jVG90YWxBbW91bnQpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzLkRvY1RvdGFsQW1vdW50LnNldFZhbHVlKHByaWNpbmdEYXRhLkRvY1RvdGFsQW1vdW50LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByaWNpbmdEYXRhLlNseExvY2F0aW9uSWQpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzLlNseExvY2F0aW9uLnNldFZhbHVlKHtcclxuICAgICAgICAgICAgJGtleTogcHJpY2luZ0RhdGEuU2x4TG9jYXRpb25JZC52YWx1ZSxcclxuICAgICAgICAgICAgTmFtZTogcHJpY2luZ0RhdGEuU2x4TG9jYXRpb25Db2RlLnZhbHVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcmljaW5nRGF0YS5Vbml0T2ZNZWFzdXJlKSB7XHJcbiAgICAgICAgICB0aGlzLnNldFVvbUZyb21Db2RlKHByaWNpbmdEYXRhLlVuaXRPZk1lYXN1cmUudmFsdWUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG4gIGZvcm1hdERlcGVuZGVudFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXREZXBlbmRlbnRRdWVyeShkZXBlbmRlbnRWYWx1ZSwgdGhlRm9ybWF0LCBwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdGl0dXRlKHRoZUZvcm1hdCwgW3V0aWxpdHkuZ2V0VmFsdWUoZGVwZW5kZW50VmFsdWUsIHByb3BlcnR5IHx8ICcka2V5JyldKTtcclxuICB9LFxyXG4gIG9uUHJvZHVjdENoYW5nZTogZnVuY3Rpb24gb25Qcm9kdWN0Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5zZXRQcm9kdWN0RGVwZW5kZW50RmllbGRzKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gICAgdGhpcy5maWVsZHMuUHJvZHVjdE5hbWUuc2V0VmFsdWUodmFsdWUudGV4dCk7XHJcbiAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5zZXRWYWx1ZShudWxsKTtcclxuICAgIHRoaXMucmVxdWVzdFByb2R1Y3RQcmljaW5nKFxyXG4gICAgICBmaWVsZC5jdXJyZW50U2VsZWN0aW9uLFxyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5nZXRWYWx1ZSgpLFxyXG4gICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5nZXRWYWx1ZSgpLFxyXG4gICAgICB0aGlzLmZpZWxkcy5Vbml0T2ZNZWFzdXJlLmdldFZhbHVlKClcclxuICAgICk7XHJcbiAgfSxcclxuICBvblF1YW50aXR5Q2hhbmdlOiBmdW5jdGlvbiBvblF1YW50aXR5Q2hhbmdlKHZhbHVlKSB7XHJcbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlF1YW50aXR5LnNldFZhbHVlTm9UcmlnZ2VyKDApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNBZEhvY1Byb2R1Y3QodGhpcy5maWVsZHMuUHJvZHVjdC5nZXRWYWx1ZSgpKSkge1xyXG4gICAgICB0aGlzLnJlQ2FsY3VsYXRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlcXVlc3RQcm9kdWN0UHJpY2luZyhcclxuICAgICAgICB0aGlzLmZpZWxkcy5Qcm9kdWN0LmdldFZhbHVlKCksXHJcbiAgICAgICAgdGhpcy5maWVsZHMuUXVhbnRpdHkuZ2V0VmFsdWUoKSxcclxuICAgICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5nZXRWYWx1ZSgpLFxyXG4gICAgICAgIHRoaXMuZmllbGRzLlVuaXRPZk1lYXN1cmUuZ2V0VmFsdWUoKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZW5hYmxlUHJpY2luZ0NvbnRyb2xzOiBmdW5jdGlvbiBlbmFibGVQcmljaW5nQ29udHJvbHMoZW5hYmxlKSB7XHJcbiAgICBpZiAoZW5hYmxlKSB7IC8vIFRvLWRvIG1ha2UgdGhpcyBtb3JlIGR5bmFtaWMuXHJcbiAgICAgIHRoaXMuZmllbGRzLlByb2R1Y3QuZW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlF1YW50aXR5LmVuYWJsZSgpO1xyXG5cclxuICAgICAgaWYgKEFwcC53YXJlaG91c2VEaXNjb3ZlcnkgPT09ICdhdXRvJykge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLlNseExvY2F0aW9uLmVuYWJsZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmZpZWxkcy5Vbml0T2ZNZWFzdXJlLmVuYWJsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWVsZHMuUHJvZHVjdC5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlF1YW50aXR5LmRpc2FibGUoKTtcclxuXHJcbiAgICAgIGlmIChBcHAud2FyZWhvdXNlRGlzY292ZXJ5ID09PSAnYXV0bycpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5kaXNhYmxlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmllbGRzLlVuaXRPZk1lYXN1cmUuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaXNBZEhvY1Byb2R1Y3Q6IGZ1bmN0aW9uIGlzQWRIb2NQcm9kdWN0KHByb2R1Y3QpIHtcclxuICAgIGlmIChwcm9kdWN0LkxpbmVUeXBlID09PSAnRnJlZVRleHQnKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgcmVDYWxjdWxhdGU6IGZ1bmN0aW9uIHJlQ2FsY3VsYXRlKCkge1xyXG4gICAgY29uc3QgcHJpY2UgPSB0aGlzLmZpZWxkcy5DYWxjdWxhdGVkUHJpY2UuZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IHF1YW50aXR5ID0gdGhpcy5maWVsZHMuUXVhbnRpdHkuZ2V0VmFsdWUoKTtcclxuICAgIHRoaXMuZmllbGRzLkV4dGVuZGVkUHJpY2Uuc2V0VmFsdWUocXVhbnRpdHkgKiBwcmljZSk7XHJcbiAgfSxcclxuICBvblVwZGF0ZUNvbXBsZXRlZDogZnVuY3Rpb24gb25VcGRhdGVDb21wbGV0ZWQoKSB7XHJcbiAgICB0aGlzLl9yZWZyZXNoUmVsYXRlZFZpZXdzKCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChvblVwZGF0ZUNvbXBsZXRlZCwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIG9uSW5zZXJ0Q29tcGxldGVkOiBmdW5jdGlvbiBvbkluc2VydENvbXBsZXRlZCgpIHtcclxuICAgIHRoaXMuX3JlZnJlc2hSZWxhdGVkVmlld3MoKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKG9uSW5zZXJ0Q29tcGxldGVkLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgX3JlZnJlc2hSZWxhdGVkVmlld3M6IGZ1bmN0aW9uIF9yZWZyZXNoUmVsYXRlZFZpZXdzKCkge1xyXG4gICAgY29uc3Qgdmlld3MgPSBbXHJcbiAgICAgIEFwcC5nZXRWaWV3KCdxdW90ZV9saW5lX2RldGFpbCcpLFxyXG4gICAgICBBcHAuZ2V0VmlldygncXVvdGVfbGluZXNfbGlzdCcpLFxyXG4gICAgXTtcclxuXHJcbiAgICB2aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XHJcbiAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgdmlldy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5saW5lVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXJwTGluZU51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBMaW5lTnVtYmVyJyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5xdW90ZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1F1b3RlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1F1b3RlJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnUXVvdGVOdW1iZXInLFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZWxpbmVfcXVvdGVfbGlzdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9kdWN0VGV4dCxcclxuICAgICAgICBuYW1lOiAnUHJvZHVjdCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTmFtZScsXHJcbiAgICAgICAgdmlldzogJ3F1b3RlbGluZV9wcm9kdWN0X3JlbGF0ZWQnLFxyXG4gICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgICAgd2hlcmU6ICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGxvZ2ljYWxJZEZyb21TZWxlY3Rpb24gPSB0aGlzLmZpZWxkcy5RdW90ZS5jdXJyZW50U2VsZWN0aW9uICYmIHRoaXMuZmllbGRzLlF1b3RlLmN1cnJlbnRTZWxlY3Rpb24uRXJwTG9naWNhbElkO1xyXG4gICAgICAgICAgY29uc3QgbG9naWNhbElkRnJvbU9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmNvbnRleHQgJiYgdGhpcy5vcHRpb25zLmNvbnRleHQuUXVvdGUgJiYgdGhpcy5vcHRpb25zLmNvbnRleHQuUXVvdGUuRXJwTG9naWNhbElkO1xyXG4gICAgICAgICAgY29uc3QgbG9naWNhbElkRnJvbUVudHJ5ID0gdGhpcy5lbnRyeSAmJiB0aGlzLmVudHJ5LlF1b3RlICYmIHRoaXMuZW50cnkuUXVvdGUuRXJwTG9naWNhbElkO1xyXG4gICAgICAgICAgY29uc3QgbG9naWNhbElkID0gbG9naWNhbElkRnJvbVNlbGVjdGlvbiB8fCBsb2dpY2FsSWRGcm9tT3B0aW9ucyB8fCBsb2dpY2FsSWRGcm9tRW50cnk7XHJcbiAgICAgICAgICBpZiAobG9naWNhbElkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgRXJwTG9naWNhbElkIGVxIFwiJHtsb2dpY2FsSWR9XCJgO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0TmFtZScsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5xdWFudGl0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1F1YW50aXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1F1YW50aXR5JyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgZGVmYXVsdDogMSxcclxuICAgICAgICBub3RpZmljYXRpb25UcmlnZ2VyOiAnYmx1cicsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudW5pdE9mTWVhc3VyZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1VuaXRPZk1lYXN1cmUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVW5pdE9mTWVhc3VyZScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdxdW90ZWxpbmVfdW5pdG9mbWVhc3VyZV9saXN0JyxcclxuICAgICAgICB0aXRsZTogdGhpcy51bml0c09mTWVhc3VyZVRpdGxlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NseExvY2F0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NseExvY2F0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy53YXJlaG91c2VUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHZpZXc6ICdsb2NhdGlvbnNfbGlzdCcsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTmFtZScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1ByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1ByaWNlJyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgZGVmYXVsdDogMC4wMCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIGRlZmF1bHQ6IDAuMDAsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5kb2NBZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRG9jQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIGRlZmF1bHQ6IDAuMDAsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5iYXNlRXh0ZW5kZWRQcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIGRlZmF1bHQ6IDAuMDAsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5kb2NFeHRlbmRlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRG9jRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEb2NFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgZGVmYXVsdDogMC4wMCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRvY1RvdGFsQW1vdW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnRG9jVG90YWxBbW91bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jVG90YWxBbW91bnQnLFxyXG4gICAgICAgIHR5cGU6ICdkZWNpbWFsJyxcclxuICAgICAgICBkZWZhdWx0OiAwLjAwLFxyXG4gICAgICB9LFxyXG4gICAgICBdIH0sXHJcbiAgICBdKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5RdW90ZUxpbmVzLkVkaXQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19