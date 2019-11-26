define('crm/Integrations/BOE/Views/SalesOrderItems/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/Utility', 'argos/Edit', 'argos/I18n', '../../PricingAvailabilityService', 'crm/Validator', '../../Models/Names', 'argos/Models/Types'], function (module, exports, _declare, _lang, _string, _Utility, _Edit, _I18n, _PricingAvailabilityService, _Validator, _Names, _Types) {
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

  var resource = (0, _I18n2.default)('salesOrderItemEdit');

  /**
   * @class crm.Views.QuoteLines.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Edit
   *
   */
  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.SalesOrderItems.Edit', [_Edit2.default], {
    // View Properties
    id: 'salesorder_item_edit',
    detailView: 'salesorder_item_detail',
    insertSecurity: 'Entities/SalesOrder/Add',
    updateSecurity: 'Entities/SalesOrder/Edit',
    resourceKind: 'salesOrderItems',
    titleText: resource.titleText,
    productText: resource.productText,
    quantityText: resource.quantityText,
    orderText: resource.orderText,
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
      if (App.warehouseDiscovery === 'auto') {
        this.fields.SlxLocation.disable();
      }

      this.fields.SalesOrder.disable();
      this.fields.Price.disable();
      this.fields.ExtendedPrice.disable();
      this.fields.DocExtendedPrice.disable();
      this.fields.CalculatedPrice.disable();
      this.fields.DocCalculatedPrice.disable();
      this.fields.DocTotalAmount.disable();
      this.connect(this.fields.Product, 'onChange', this.onProductChange);
      this.connect(this.fields.Quantity, 'onChange', this.onQuantityChange);
    },
    _applyLogicValues: function _applyLogicValues(values) {
      var product = this.fields.Product.getSelection();
      values.ProductName = product.Name;
      values.Family = product.Family;
      values.ActualID = product.ActualId;
      values.CommodityType = product.CommodityType;
    },
    applyContext: function applyContext() {
      this.inherited(applyContext, arguments);
      if (this.options && this.options.context) {
        if (this.options.context.SalesOrder) {
          this.fields.SalesOrder.setSelection(this.options.context.SalesOrder);
          this.fields.SalesOrder.disable();
          if (this.options.context.SalesOrder.Account) {
            this.accountLinked = this.options.context.SalesOrder.Account.ErpExtId === true;
          }
        } else {
          this.fields.SalesOrder.enable();
        }
      }
      this.setProductDependentFields();
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
    getProductDependants: function getProductDependants() {
      return ['UnitOfMeasure'];
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

      var salesOrder = null;
      if (this.options && this.options.context && this.options.context.SalesOrder) {
        salesOrder = this.options.context.SalesOrder;
      } else {
        if (this.fields.SalesOrder) {
          salesOrder = this.fields.SalesOrder.getValue();
        }
      }
      if (salesOrder && salesOrder.$key && !this.isProcessingPricingRequest) {
        this.isProcessingPricingRequest = true;
        this.enablePricingControls(false);
        _PricingAvailabilityService2.default.getOrderItemPricing(this.entry, salesOrder, product, quantity, slxLocation, unitOfMeasure).then(function (results) {
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
        this.fields.SlxLocation.enable();
        this.fields.UnitOfMeasure.enable();
      } else {
        this.fields.Product.disable();
        this.fields.Quantity.disable();
        this.fields.SlxLocation.disable();
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
    formatDependentQuery: function formatDependentQuery(dependentValue, theFormat, property) {
      return _string2.default.substitute(theFormat, [_Utility2.default.getValue(dependentValue, property || '$key')]);
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
      var views = [App.getView('salesorder_item_detail'), App.getView('salesorder_items_list')];

      views.forEach(function (view) {
        if (view) {
          view.refreshRequired = true;
        }
      });
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
          label: this.orderText,
          name: 'SalesOrder',
          property: 'SalesOrder',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'SalesOrderNumber',
          view: 'orderitem_salesorder_list'
        }, {
          label: this.productText,
          name: 'Product',
          property: 'Product',
          type: 'lookup',
          emptyText: '',
          valueTextProperty: 'Name',
          view: 'salesorder_product_related',
          autoFocus: true,
          required: true,
          where: function where() {
            if (_this6.fields.SalesOrder.currentSelection && _this6.fields.SalesOrder.currentSelection.ErpLogicalId || _this6.options && _this6.options.context && _this6.options.context.SalesOrder && _this6.options.context.SalesOrder.ErpLogicalId) {
              return 'ErpLogicalId eq "' + (_this6.fields.SalesOrder.currentSelection.ErpLogicalId || _this6.options.context.SalesOrder.ErpLogicalId) + '"';
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
          view: 'orderitem_unitofmeasure_list',
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

  _lang2.default.setObject('icboe.Views.SalesOrderItems.Edit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJJdGVtcy9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImlkIiwiZGV0YWlsVmlldyIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJyZXNvdXJjZUtpbmQiLCJ0aXRsZVRleHQiLCJwcm9kdWN0VGV4dCIsInF1YW50aXR5VGV4dCIsIm9yZGVyVGV4dCIsInByaWNlVGV4dCIsImJhc2VBZGp1c3RlZFByaWNlVGV4dCIsImRvY0FkanVzdGVkUHJpY2VUZXh0IiwiYmFzZUV4dGVuZGVkUHJpY2VUZXh0IiwiZG9jRXh0ZW5kZWRQcmljZVRleHQiLCJ1bml0T2ZNZWFzdXJlVGV4dCIsInVuaXRzT2ZNZWFzdXJlVGl0bGUiLCJkb2NUb3RhbEFtb3VudFRleHQiLCJsaW5lVGV4dCIsIndhcmVob3VzZVRleHQiLCJhY2NvdW50TGlua2VkIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImZpZWxkcyIsIkVycExpbmVOdW1iZXIiLCJkaXNhYmxlIiwiQXBwIiwid2FyZWhvdXNlRGlzY292ZXJ5IiwiU2x4TG9jYXRpb24iLCJTYWxlc09yZGVyIiwiUHJpY2UiLCJFeHRlbmRlZFByaWNlIiwiRG9jRXh0ZW5kZWRQcmljZSIsIkNhbGN1bGF0ZWRQcmljZSIsIkRvY0NhbGN1bGF0ZWRQcmljZSIsIkRvY1RvdGFsQW1vdW50IiwiY29ubmVjdCIsIlByb2R1Y3QiLCJvblByb2R1Y3RDaGFuZ2UiLCJRdWFudGl0eSIsIm9uUXVhbnRpdHlDaGFuZ2UiLCJfYXBwbHlMb2dpY1ZhbHVlcyIsInZhbHVlcyIsInByb2R1Y3QiLCJnZXRTZWxlY3Rpb24iLCJQcm9kdWN0TmFtZSIsIk5hbWUiLCJGYW1pbHkiLCJBY3R1YWxJRCIsIkFjdHVhbElkIiwiQ29tbW9kaXR5VHlwZSIsImFwcGx5Q29udGV4dCIsIm9wdGlvbnMiLCJjb250ZXh0Iiwic2V0U2VsZWN0aW9uIiwiQWNjb3VudCIsIkVycEV4dElkIiwiZW5hYmxlIiwic2V0UHJvZHVjdERlcGVuZGVudEZpZWxkcyIsImRlcGVuZGFudHMiLCJnZXRQcm9kdWN0RGVwZW5kYW50cyIsImZvckVhY2giLCJmIiwiZGVwZW5kc09uIiwid2hlcmUiLCIka2V5Iiwib25JbnNlcnQiLCJvblJlZnJlc2giLCJwcm9jZXNzRW50cnkiLCJlbnRyeSIsInJlcXVlc3RQcm9kdWN0UHJpY2luZyIsInF1YW50aXR5Iiwic2x4TG9jYXRpb24iLCJ1bml0T2ZNZWFzdXJlIiwic2FsZXNPcmRlciIsImdldFZhbHVlIiwiaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QiLCJlbmFibGVQcmljaW5nQ29udHJvbHMiLCJnZXRPcmRlckl0ZW1QcmljaW5nIiwidGhlbiIsInJlc3VsdHMiLCJvblByb2R1Y3RQcmljaW5nU3VjY2VzcyIsImVycm9yIiwib25Qcm9kdWN0UHJpY2luZ0ZhaWxlZCIsInJlc3VsdCIsInByb2Nlc3NQcm9kdWN0UHJpY2luZyIsInJlQ2FsY3VsYXRlIiwibW9kYWwiLCJjcmVhdGVTaW1wbGVEaWFsb2ciLCJ0aXRsZSIsImNvbnRlbnQiLCJSZXN1bHRzIiwic2V0VW9tRnJvbUNvZGUiLCJ1b21Db2RlIiwiY3VycmVtdFVvbSIsIlVuaXRPZk1lYXN1cmUiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJfdW9tTW9kZWwiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIlVOSVRPRk1FQVNVUkUiLCJTREFUQSIsImdldFVuaXRPZk1lYXN1cmVGcm9tQ29kZSIsInVvbSIsInNldFZhbHVlIiwicHJpY2luZ0RhdGEiLCJ2YWx1ZSIsIlNseExvY2F0aW9uSWQiLCJTbHhMb2NhdGlvbkNvZGUiLCJmaWVsZCIsImN1cnJlbnRTZWxlY3Rpb24iLCJ0ZXh0IiwiaXNOYU4iLCJzZXRWYWx1ZU5vVHJpZ2dlciIsImlzQWRIb2NQcm9kdWN0IiwiTGluZVR5cGUiLCJwcmljZSIsImZvcm1hdERlcGVuZGVudFF1ZXJ5IiwiZGVwZW5kZW50VmFsdWUiLCJ0aGVGb3JtYXQiLCJwcm9wZXJ0eSIsInN1YnN0aXR1dGUiLCJvblVwZGF0ZUNvbXBsZXRlZCIsIl9yZWZyZXNoUmVsYXRlZFZpZXdzIiwib25JbnNlcnRDb21wbGV0ZWQiLCJ2aWV3cyIsImdldFZpZXciLCJ2aWV3IiwicmVmcmVzaFJlcXVpcmVkIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwiZGV0YWlsc1RleHQiLCJuYW1lIiwiY2hpbGRyZW4iLCJsYWJlbCIsInR5cGUiLCJlbXB0eVRleHQiLCJ2YWx1ZVRleHRQcm9wZXJ0eSIsImF1dG9Gb2N1cyIsInJlcXVpcmVkIiwiRXJwTG9naWNhbElkIiwiZGVmYXVsdCIsIm5vdGlmaWNhdGlvblRyaWdnZXIiLCJ2YWxpZGF0b3IiLCJleGlzdHMiLCJ0ZXh0UHJvcGVydHkiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLE1BQU1BLFdBQVcsb0JBQVksb0JBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7O0FBUUEsTUFBTUMsVUFBVSx1QkFBUSxpREFBUixFQUEyRCxnQkFBM0QsRUFBbUU7QUFDakY7QUFDQUMsUUFBSSxzQkFGNkU7QUFHakZDLGdCQUFZLHdCQUhxRTtBQUlqRkMsb0JBQWdCLHlCQUppRTtBQUtqRkMsb0JBQWdCLDBCQUxpRTtBQU1qRkMsa0JBQWMsaUJBTm1FO0FBT2pGQyxlQUFXUCxTQUFTTyxTQVA2RDtBQVFqRkMsaUJBQWFSLFNBQVNRLFdBUjJEO0FBU2pGQyxrQkFBY1QsU0FBU1MsWUFUMEQ7QUFVakZDLGVBQVdWLFNBQVNVLFNBVjZEO0FBV2pGQyxlQUFXWCxTQUFTVyxTQVg2RDtBQVlqRkMsMkJBQXVCWixTQUFTWSxxQkFaaUQ7QUFhakZDLDBCQUFzQmIsU0FBU2Esb0JBYmtEO0FBY2pGQywyQkFBdUJkLFNBQVNjLHFCQWRpRDtBQWVqRkMsMEJBQXNCZixTQUFTZSxvQkFma0Q7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O0FBSURlLGdCQUFNLFNBSkw7QUFLRE0sbUJBQVM7QUFMUixTQTVFTyxFQWtGUDtBQUNEUCxpQkFBTyxLQUFLNUgsb0JBRFg7QUFFRDBILGdCQUFNLGtCQUZMO0FBR0RaLG9CQUFVLGtCQUhUO0FBSURlLGdCQUFNLFNBSkw7QUFLRE0sbUJBQVM7QUFMUixTQWxGTyxFQXdGUDtBQUNEUCxpQkFBTyxLQUFLekgsa0JBRFg7QUFFRHVILGdCQUFNLGdCQUZMO0FBR0RaLG9CQUFVLGdCQUhUO0FBSURlLGdCQUFNLFNBSkw7QUFLRE0sbUJBQVM7QUFMUixTQXhGTyxDQUgwQixFQUFELENBQTlCLENBQVA7QUFvR0Q7QUExV2dGLEdBQW5FLENBQWhCOztBQTZXQSxpQkFBS0ssU0FBTCxDQUFlLGtDQUFmLEVBQW1EdEosT0FBbkQ7b0JBQ2VBLE8iLCJmaWxlIjoiRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlIGZyb20gJy4uLy4uL1ByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlJztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICdjcm0vVmFsaWRhdG9yJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlckl0ZW1FZGl0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5RdW90ZUxpbmVzLkVkaXRcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlNhbGVzT3JkZXJJdGVtcy5FZGl0JywgW0VkaXRdLCB7XHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdzYWxlc29yZGVyX2l0ZW1fZWRpdCcsXHJcbiAgZGV0YWlsVmlldzogJ3NhbGVzb3JkZXJfaXRlbV9kZXRhaWwnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvU2FsZXNPcmRlci9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiAnRW50aXRpZXMvU2FsZXNPcmRlci9FZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdzYWxlc09yZGVySXRlbXMnLFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHByb2R1Y3RUZXh0OiByZXNvdXJjZS5wcm9kdWN0VGV4dCxcclxuICBxdWFudGl0eVRleHQ6IHJlc291cmNlLnF1YW50aXR5VGV4dCxcclxuICBvcmRlclRleHQ6IHJlc291cmNlLm9yZGVyVGV4dCxcclxuICBwcmljZVRleHQ6IHJlc291cmNlLnByaWNlVGV4dCxcclxuICBiYXNlQWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICBkb2NBZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UuZG9jQWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgYmFzZUV4dGVuZGVkUHJpY2VUZXh0OiByZXNvdXJjZS5iYXNlRXh0ZW5kZWRQcmljZVRleHQsXHJcbiAgZG9jRXh0ZW5kZWRQcmljZVRleHQ6IHJlc291cmNlLmRvY0V4dGVuZGVkUHJpY2VUZXh0LFxyXG4gIHVuaXRPZk1lYXN1cmVUZXh0OiByZXNvdXJjZS51bml0T2ZNZWFzdXJlVGV4dCxcclxuICB1bml0c09mTWVhc3VyZVRpdGxlOiByZXNvdXJjZS51bml0c09mTWVhc3VyZVRpdGxlLFxyXG4gIGRvY1RvdGFsQW1vdW50VGV4dDogcmVzb3VyY2UuZG9jVG90YWxBbW91bnRUZXh0LFxyXG4gIGxpbmVUZXh0OiByZXNvdXJjZS5saW5lVGV4dCxcclxuICB3YXJlaG91c2VUZXh0OiByZXNvdXJjZS53YXJlaG91c2VUZXh0LFxyXG4gIGFjY291bnRMaW5rZWQ6IGZhbHNlLFxyXG5cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuZmllbGRzLkVycExpbmVOdW1iZXIuZGlzYWJsZSgpO1xyXG4gICAgaWYgKEFwcC53YXJlaG91c2VEaXNjb3ZlcnkgPT09ICdhdXRvJykge1xyXG4gICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5kaXNhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWVsZHMuU2FsZXNPcmRlci5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5QcmljZS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5FeHRlbmRlZFByaWNlLmRpc2FibGUoKTtcclxuICAgIHRoaXMuZmllbGRzLkRvY0V4dGVuZGVkUHJpY2UuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlLmRpc2FibGUoKTtcclxuICAgIHRoaXMuZmllbGRzLkRvY0NhbGN1bGF0ZWRQcmljZS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Eb2NUb3RhbEFtb3VudC5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuUHJvZHVjdCwgJ29uQ2hhbmdlJywgdGhpcy5vblByb2R1Y3RDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlF1YW50aXR5LCAnb25DaGFuZ2UnLCB0aGlzLm9uUXVhbnRpdHlDaGFuZ2UpO1xyXG4gIH0sXHJcbiAgX2FwcGx5TG9naWNWYWx1ZXM6IGZ1bmN0aW9uIF9hcHBseUxvZ2ljVmFsdWVzKHZhbHVlcykge1xyXG4gICAgY29uc3QgcHJvZHVjdCA9IHRoaXMuZmllbGRzLlByb2R1Y3QuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICB2YWx1ZXMuUHJvZHVjdE5hbWUgPSBwcm9kdWN0Lk5hbWU7XHJcbiAgICB2YWx1ZXMuRmFtaWx5ID0gcHJvZHVjdC5GYW1pbHk7XHJcbiAgICB2YWx1ZXMuQWN0dWFsSUQgPSBwcm9kdWN0LkFjdHVhbElkO1xyXG4gICAgdmFsdWVzLkNvbW1vZGl0eVR5cGUgPSBwcm9kdWN0LkNvbW1vZGl0eVR5cGU7XHJcbiAgfSxcclxuICBhcHBseUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGV4dCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFwcGx5Q29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmNvbnRleHQpIHtcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZXh0LlNhbGVzT3JkZXIpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5TYWxlc09yZGVyLnNldFNlbGVjdGlvbih0aGlzLm9wdGlvbnMuY29udGV4dC5TYWxlc09yZGVyKTtcclxuICAgICAgICB0aGlzLmZpZWxkcy5TYWxlc09yZGVyLmRpc2FibGUoKTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRleHQuU2FsZXNPcmRlci5BY2NvdW50KSB7XHJcbiAgICAgICAgICB0aGlzLmFjY291bnRMaW5rZWQgPSB0aGlzLm9wdGlvbnMuY29udGV4dC5TYWxlc09yZGVyLkFjY291bnQuRXJwRXh0SWQgPT09IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLlNhbGVzT3JkZXIuZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2V0UHJvZHVjdERlcGVuZGVudEZpZWxkcygpO1xyXG4gIH0sXHJcbiAgc2V0UHJvZHVjdERlcGVuZGVudEZpZWxkczogZnVuY3Rpb24gc2V0UHJvZHVjdERlcGVuZGVudEZpZWxkcyhwcm9kdWN0KSB7XHJcbiAgICBjb25zdCBkZXBlbmRhbnRzID0gdGhpcy5nZXRQcm9kdWN0RGVwZW5kYW50cygpO1xyXG4gICAgaWYgKHByb2R1Y3QpIHtcclxuICAgICAgZGVwZW5kYW50cy5mb3JFYWNoKChmKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZW5hYmxlKCk7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZGVwZW5kc09uID0gJ1Byb2R1Y3QnO1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gYFByb2R1Y3QuSWQgZXEgXCIke3Byb2R1Y3QuJGtleX1cImA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGVwZW5kYW50cy5mb3JFYWNoKChmKSA9PiB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0uZGlzYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLmRlcGVuZHNPbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbZl0ud2hlcmUgPSBudWxsO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldFByb2R1Y3REZXBlbmRhbnRzOiBmdW5jdGlvbiBnZXRQcm9kdWN0RGVwZW5kYW50cygpIHtcclxuICAgIHJldHVybiBbJ1VuaXRPZk1lYXN1cmUnXTtcclxuICB9LFxyXG4gIG9uSW5zZXJ0OiBmdW5jdGlvbiBvbkluc2VydCh2YWx1ZXMpIHtcclxuICAgIHRoaXMuX2FwcGx5TG9naWNWYWx1ZXModmFsdWVzKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKG9uSW5zZXJ0LCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgb25SZWZyZXNoOiBmdW5jdGlvbiBvblJlZnJlc2goKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChvblJlZnJlc2gsIGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLnNldFByb2R1Y3REZXBlbmRlbnRGaWVsZHMoKTtcclxuICB9LFxyXG4gIHByb2Nlc3NFbnRyeTogZnVuY3Rpb24gcHJvY2Vzc0VudHJ5KGVudHJ5KSB7XHJcbiAgICB0aGlzLnNldFByb2R1Y3REZXBlbmRlbnRGaWVsZHMoZW50cnkuUHJvZHVjdCk7XHJcbiAgICByZXR1cm4gZW50cnk7XHJcbiAgfSxcclxuICByZXF1ZXN0UHJvZHVjdFByaWNpbmc6IGZ1bmN0aW9uIHJlcXVlc3RQcm9kdWN0UHJpY2luZyhwcm9kdWN0LCBxdWFudGl0eSwgc2x4TG9jYXRpb24sIHVuaXRPZk1lYXN1cmUpIHtcclxuICAgIGxldCBzYWxlc09yZGVyID0gbnVsbDtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmNvbnRleHQgJiYgdGhpcy5vcHRpb25zLmNvbnRleHQuU2FsZXNPcmRlcikge1xyXG4gICAgICBzYWxlc09yZGVyID0gdGhpcy5vcHRpb25zLmNvbnRleHQuU2FsZXNPcmRlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmZpZWxkcy5TYWxlc09yZGVyKSB7XHJcbiAgICAgICAgc2FsZXNPcmRlciA9IHRoaXMuZmllbGRzLlNhbGVzT3JkZXIuZ2V0VmFsdWUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHNhbGVzT3JkZXIgJiYgc2FsZXNPcmRlci4ka2V5ICYmICF0aGlzLmlzUHJvY2Vzc2luZ1ByaWNpbmdSZXF1ZXN0KSB7XHJcbiAgICAgIHRoaXMuaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QgPSB0cnVlO1xyXG4gICAgICB0aGlzLmVuYWJsZVByaWNpbmdDb250cm9scyhmYWxzZSk7XHJcbiAgICAgIFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlLmdldE9yZGVySXRlbVByaWNpbmcodGhpcy5lbnRyeSwgc2FsZXNPcmRlciwgcHJvZHVjdCwgcXVhbnRpdHksIHNseExvY2F0aW9uLCB1bml0T2ZNZWFzdXJlKS50aGVuKFxyXG4gICAgICAgIChyZXN1bHRzKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm9uUHJvZHVjdFByaWNpbmdTdWNjZXNzKHJlc3VsdHMpO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vblByb2R1Y3RQcmljaW5nRmFpbGVkKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUHJvZHVjdFByaWNpbmdTdWNjZXNzOiBmdW5jdGlvbiBvblByb2R1Y3RQcmljaW5nU3VjY2VzcyhyZXN1bHQpIHtcclxuICAgIHRoaXMucHJvY2Vzc1Byb2R1Y3RQcmljaW5nKHJlc3VsdCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVDYWxjdWxhdGUoKTtcclxuICAgICAgdGhpcy5pc1Byb2Nlc3NpbmdQcmljaW5nUmVxdWVzdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmVuYWJsZVByaWNpbmdDb250cm9scyh0cnVlKTtcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgdGhpcy5pc1Byb2Nlc3NpbmdQcmljaW5nUmVxdWVzdCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmVuYWJsZVByaWNpbmdDb250cm9scyh0cnVlKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25Qcm9kdWN0UHJpY2luZ0ZhaWxlZDogZnVuY3Rpb24gb25Qcm9kdWN0UHJpY2luZ0ZhaWxlZChyZXN1bHQpIHtcclxuICAgIHRoaXMuaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QgPSBmYWxzZTtcclxuICAgIHRoaXMuZW5hYmxlUHJpY2luZ0NvbnRyb2xzKHRydWUpO1xyXG4gICAgdGhpcy5BcHAubW9kYWwuY3JlYXRlU2ltcGxlRGlhbG9nKHtcclxuICAgICAgdGl0bGU6ICdhbGVydCcsXHJcbiAgICAgIGNvbnRlbnQ6IHJlc3VsdC5SZXN1bHRzLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBzZXRVb21Gcm9tQ29kZTogZnVuY3Rpb24gc2V0VW9tRnJvbUNvZGUodW9tQ29kZSkge1xyXG4gICAgY29uc3QgY3VycmVtdFVvbSA9IHRoaXMuZmllbGRzLlVuaXRPZk1lYXN1cmUuZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IHByb2R1Y3QgPSB0aGlzLmZpZWxkcy5Qcm9kdWN0LmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuX3VvbU1vZGVsKSB7XHJcbiAgICAgICAgdGhpcy5fdW9tTW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKE1PREVMX05BTUVTLlVOSVRPRk1FQVNVUkUsIE1PREVMX1RZUEVTLlNEQVRBKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5fdW9tTW9kZWwgJiYgcHJvZHVjdCkge1xyXG4gICAgICAgIGlmICgoY3VycmVtdFVvbSAmJiAoY3VycmVtdFVvbS5OYW1lICE9PSB1b21Db2RlKSkgfHwgKCFjdXJyZW10VW9tKSkge1xyXG4gICAgICAgICAgdGhpcy5fdW9tTW9kZWwuZ2V0VW5pdE9mTWVhc3VyZUZyb21Db2RlKHVvbUNvZGUsIHByb2R1Y3QuJGtleSkudGhlbigodW9tKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLlVuaXRPZk1lYXN1cmUuc2V0VmFsdWUodW9tKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBwcm9jZXNzUHJvZHVjdFByaWNpbmc6IGZ1bmN0aW9uIHByb2Nlc3NQcm9kdWN0UHJpY2luZyhwcmljaW5nRGF0YSkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHByaWNpbmdEYXRhKSB7XHJcbiAgICAgICAgaWYgKHByaWNpbmdEYXRhLkRvY0NhbGN1bGF0ZWRQcmljZSkge1xyXG4gICAgICAgICAgdGhpcy5maWVsZHMuRG9jQ2FsY3VsYXRlZFByaWNlLnNldFZhbHVlKHByaWNpbmdEYXRhLkRvY0NhbGN1bGF0ZWRQcmljZS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcmljaW5nRGF0YS5Eb2NFeHRlbmRlZFByaWNlKSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkcy5Eb2NFeHRlbmRlZFByaWNlLnNldFZhbHVlKHByaWNpbmdEYXRhLkRvY0V4dGVuZGVkUHJpY2UudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJpY2luZ0RhdGEuRG9jVG90YWxBbW91bnQpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzLkRvY1RvdGFsQW1vdW50LnNldFZhbHVlKHByaWNpbmdEYXRhLkRvY1RvdGFsQW1vdW50LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByaWNpbmdEYXRhLlNseExvY2F0aW9uSWQpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzLlNseExvY2F0aW9uLnNldFZhbHVlKHtcclxuICAgICAgICAgICAgJGtleTogcHJpY2luZ0RhdGEuU2x4TG9jYXRpb25JZC52YWx1ZSxcclxuICAgICAgICAgICAgTmFtZTogcHJpY2luZ0RhdGEuU2x4TG9jYXRpb25Db2RlLnZhbHVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcmljaW5nRGF0YS5Vbml0T2ZNZWFzdXJlKSB7XHJcbiAgICAgICAgICB0aGlzLnNldFVvbUZyb21Db2RlKHByaWNpbmdEYXRhLlVuaXRPZk1lYXN1cmUudmFsdWUpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9LFxyXG4gIG9uUHJvZHVjdENoYW5nZTogZnVuY3Rpb24gb25Qcm9kdWN0Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgdGhpcy5zZXRQcm9kdWN0RGVwZW5kZW50RmllbGRzKGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24pO1xyXG4gICAgdGhpcy5maWVsZHMuUHJvZHVjdE5hbWUuc2V0VmFsdWUodmFsdWUudGV4dCk7XHJcbiAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5zZXRWYWx1ZShudWxsKTtcclxuICAgIHRoaXMucmVxdWVzdFByb2R1Y3RQcmljaW5nKFxyXG4gICAgICBmaWVsZC5jdXJyZW50U2VsZWN0aW9uLFxyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5nZXRWYWx1ZSgpLFxyXG4gICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5nZXRWYWx1ZSgpLFxyXG4gICAgICB0aGlzLmZpZWxkcy5Vbml0T2ZNZWFzdXJlLmdldFZhbHVlKClcclxuICAgICk7XHJcbiAgfSxcclxuICBvblF1YW50aXR5Q2hhbmdlOiBmdW5jdGlvbiBvblF1YW50aXR5Q2hhbmdlKHZhbHVlKSB7XHJcbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlF1YW50aXR5LnNldFZhbHVlTm9UcmlnZ2VyKDApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNBZEhvY1Byb2R1Y3QodGhpcy5maWVsZHMuUHJvZHVjdC5nZXRWYWx1ZSgpKSkge1xyXG4gICAgICB0aGlzLnJlQ2FsY3VsYXRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlcXVlc3RQcm9kdWN0UHJpY2luZyhcclxuICAgICAgICB0aGlzLmZpZWxkcy5Qcm9kdWN0LmdldFZhbHVlKCksXHJcbiAgICAgICAgdGhpcy5maWVsZHMuUXVhbnRpdHkuZ2V0VmFsdWUoKSxcclxuICAgICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5nZXRWYWx1ZSgpLFxyXG4gICAgICAgIHRoaXMuZmllbGRzLlVuaXRPZk1lYXN1cmUuZ2V0VmFsdWUoKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZW5hYmxlUHJpY2luZ0NvbnRyb2xzOiBmdW5jdGlvbiBlbmFibGVQcmljaW5nQ29udHJvbHMoZW5hYmxlKSB7XHJcbiAgICBpZiAoZW5hYmxlKSB7IC8vIFRvLWRvIG1ha2UgdGhpcyBtb3JlIGR5bmFtaWMuXHJcbiAgICAgIHRoaXMuZmllbGRzLlByb2R1Y3QuZW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlF1YW50aXR5LmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5lbmFibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuVW5pdE9mTWVhc3VyZS5lbmFibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlByb2R1Y3QuZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlNseExvY2F0aW9uLmRpc2FibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuVW5pdE9mTWVhc3VyZS5kaXNhYmxlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBpc0FkSG9jUHJvZHVjdDogZnVuY3Rpb24gaXNBZEhvY1Byb2R1Y3QocHJvZHVjdCkge1xyXG4gICAgaWYgKHByb2R1Y3QuTGluZVR5cGUgPT09ICdGcmVlVGV4dCcpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICByZUNhbGN1bGF0ZTogZnVuY3Rpb24gcmVDYWxjdWxhdGUoKSB7XHJcbiAgICBjb25zdCBwcmljZSA9IHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5nZXRWYWx1ZSgpO1xyXG4gICAgY29uc3QgcXVhbnRpdHkgPSB0aGlzLmZpZWxkcy5RdWFudGl0eS5nZXRWYWx1ZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuRXh0ZW5kZWRQcmljZS5zZXRWYWx1ZShxdWFudGl0eSAqIHByaWNlKTtcclxuICB9LFxyXG4gIGZvcm1hdERlcGVuZGVudFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXREZXBlbmRlbnRRdWVyeShkZXBlbmRlbnRWYWx1ZSwgdGhlRm9ybWF0LCBwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdGl0dXRlKHRoZUZvcm1hdCwgW3V0aWxpdHkuZ2V0VmFsdWUoZGVwZW5kZW50VmFsdWUsIHByb3BlcnR5IHx8ICcka2V5JyldKTtcclxuICB9LFxyXG4gIG9uVXBkYXRlQ29tcGxldGVkOiBmdW5jdGlvbiBvblVwZGF0ZUNvbXBsZXRlZCgpIHtcclxuICAgIHRoaXMuX3JlZnJlc2hSZWxhdGVkVmlld3MoKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKG9uVXBkYXRlQ29tcGxldGVkLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgb25JbnNlcnRDb21wbGV0ZWQ6IGZ1bmN0aW9uIG9uSW5zZXJ0Q29tcGxldGVkKCkge1xyXG4gICAgdGhpcy5fcmVmcmVzaFJlbGF0ZWRWaWV3cygpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQob25JbnNlcnRDb21wbGV0ZWQsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfcmVmcmVzaFJlbGF0ZWRWaWV3czogZnVuY3Rpb24gX3JlZnJlc2hSZWxhdGVkVmlld3MoKSB7XHJcbiAgICBjb25zdCB2aWV3cyA9IFtcclxuICAgICAgQXBwLmdldFZpZXcoJ3NhbGVzb3JkZXJfaXRlbV9kZXRhaWwnKSxcclxuICAgICAgQXBwLmdldFZpZXcoJ3NhbGVzb3JkZXJfaXRlbXNfbGlzdCcpLFxyXG4gICAgXTtcclxuXHJcbiAgICB2aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XHJcbiAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgdmlldy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5saW5lVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXJwTGluZU51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFcnBMaW5lTnVtYmVyJyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5vcmRlclRleHQsXHJcbiAgICAgICAgbmFtZTogJ1NhbGVzT3JkZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2FsZXNPcmRlcicsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ1NhbGVzT3JkZXJOdW1iZXInLFxyXG4gICAgICAgIHZpZXc6ICdvcmRlcml0ZW1fc2FsZXNvcmRlcl9saXN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb2R1Y3RUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Byb2R1Y3QnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdOYW1lJyxcclxuICAgICAgICB2aWV3OiAnc2FsZXNvcmRlcl9wcm9kdWN0X3JlbGF0ZWQnLFxyXG4gICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB3aGVyZTogKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuZmllbGRzLlNhbGVzT3JkZXIuY3VycmVudFNlbGVjdGlvbiAmJiB0aGlzLmZpZWxkcy5TYWxlc09yZGVyLmN1cnJlbnRTZWxlY3Rpb24uRXJwTG9naWNhbElkIHx8IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuY29udGV4dCAmJiB0aGlzLm9wdGlvbnMuY29udGV4dC5TYWxlc09yZGVyICYmIHRoaXMub3B0aW9ucy5jb250ZXh0LlNhbGVzT3JkZXIuRXJwTG9naWNhbElkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgRXJwTG9naWNhbElkIGVxIFwiJHt0aGlzLmZpZWxkcy5TYWxlc09yZGVyLmN1cnJlbnRTZWxlY3Rpb24uRXJwTG9naWNhbElkIHx8IHRoaXMub3B0aW9ucy5jb250ZXh0LlNhbGVzT3JkZXIuRXJwTG9naWNhbElkfVwiYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnUHJvZHVjdE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJvZHVjdE5hbWUnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucXVhbnRpdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdRdWFudGl0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdRdWFudGl0eScsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIGRlZmF1bHQ6IDEsXHJcbiAgICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnVuaXRPZk1lYXN1cmVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdVbml0T2ZNZWFzdXJlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1VuaXRPZk1lYXN1cmUnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdOYW1lJyxcclxuICAgICAgICB2aWV3OiAnb3JkZXJpdGVtX3VuaXRvZm1lYXN1cmVfbGlzdCcsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMudW5pdHNPZk1lYXN1cmVUaXRsZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTbHhMb2NhdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTbHhMb2NhdGlvbicsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMud2FyZWhvdXNlVGV4dCxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB2aWV3OiAnbG9jYXRpb25zX2xpc3QnLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIGRlZmF1bHQ6IDAuMDAsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5iYXNlQWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIHR5cGU6ICdkZWNpbWFsJyxcclxuICAgICAgICBkZWZhdWx0OiAwLjAwLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZG9jQWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0RvY0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEb2NDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIHR5cGU6ICdkZWNpbWFsJyxcclxuICAgICAgICBkZWZhdWx0OiAwLjAwLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZUV4dGVuZGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHR5cGU6ICdkZWNpbWFsJyxcclxuICAgICAgICBkZWZhdWx0OiAwLjAwLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZG9jRXh0ZW5kZWRQcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0RvY0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIGRlZmF1bHQ6IDAuMDAsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5kb2NUb3RhbEFtb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0RvY1RvdGFsQW1vdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY1RvdGFsQW1vdW50JyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgZGVmYXVsdDogMC4wMCxcclxuICAgICAgfSxcclxuICAgICAgXSB9LFxyXG4gICAgXSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuVmlld3MuU2FsZXNPcmRlckl0ZW1zLkVkaXQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19