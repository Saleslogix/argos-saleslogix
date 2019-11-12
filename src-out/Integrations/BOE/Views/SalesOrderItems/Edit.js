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
      this.inherited(arguments);
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
      this.inherited(arguments);
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
      this.inherited(arguments);
    },
    onInsertCompleted: function onInsertCompleted() {
      this._refreshRelatedViews();
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL1NhbGVzT3JkZXJJdGVtcy9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImlkIiwiZGV0YWlsVmlldyIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJyZXNvdXJjZUtpbmQiLCJ0aXRsZVRleHQiLCJwcm9kdWN0VGV4dCIsInF1YW50aXR5VGV4dCIsIm9yZGVyVGV4dCIsInByaWNlVGV4dCIsImJhc2VBZGp1c3RlZFByaWNlVGV4dCIsImRvY0FkanVzdGVkUHJpY2VUZXh0IiwiYmFzZUV4dGVuZGVkUHJpY2VUZXh0IiwiZG9jRXh0ZW5kZWRQcmljZVRleHQiLCJ1bml0T2ZNZWFzdXJlVGV4dCIsInVuaXRzT2ZNZWFzdXJlVGl0bGUiLCJkb2NUb3RhbEFtb3VudFRleHQiLCJsaW5lVGV4dCIsIndhcmVob3VzZVRleHQiLCJhY2NvdW50TGlua2VkIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImZpZWxkcyIsIkVycExpbmVOdW1iZXIiLCJkaXNhYmxlIiwiQXBwIiwid2FyZWhvdXNlRGlzY292ZXJ5IiwiU2x4TG9jYXRpb24iLCJTYWxlc09yZGVyIiwiUHJpY2UiLCJFeHRlbmRlZFByaWNlIiwiRG9jRXh0ZW5kZWRQcmljZSIsIkNhbGN1bGF0ZWRQcmljZSIsIkRvY0NhbGN1bGF0ZWRQcmljZSIsIkRvY1RvdGFsQW1vdW50IiwiY29ubmVjdCIsIlByb2R1Y3QiLCJvblByb2R1Y3RDaGFuZ2UiLCJRdWFudGl0eSIsIm9uUXVhbnRpdHlDaGFuZ2UiLCJfYXBwbHlMb2dpY1ZhbHVlcyIsInZhbHVlcyIsInByb2R1Y3QiLCJnZXRTZWxlY3Rpb24iLCJQcm9kdWN0TmFtZSIsIk5hbWUiLCJGYW1pbHkiLCJBY3R1YWxJRCIsIkFjdHVhbElkIiwiQ29tbW9kaXR5VHlwZSIsImFwcGx5Q29udGV4dCIsIm9wdGlvbnMiLCJjb250ZXh0Iiwic2V0U2VsZWN0aW9uIiwiQWNjb3VudCIsIkVycEV4dElkIiwiZW5hYmxlIiwic2V0UHJvZHVjdERlcGVuZGVudEZpZWxkcyIsImRlcGVuZGFudHMiLCJnZXRQcm9kdWN0RGVwZW5kYW50cyIsImZvckVhY2giLCJmIiwiZGVwZW5kc09uIiwid2hlcmUiLCIka2V5Iiwib25JbnNlcnQiLCJvblJlZnJlc2giLCJwcm9jZXNzRW50cnkiLCJlbnRyeSIsInJlcXVlc3RQcm9kdWN0UHJpY2luZyIsInF1YW50aXR5Iiwic2x4TG9jYXRpb24iLCJ1bml0T2ZNZWFzdXJlIiwic2FsZXNPcmRlciIsImdldFZhbHVlIiwiaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QiLCJlbmFibGVQcmljaW5nQ29udHJvbHMiLCJnZXRPcmRlckl0ZW1QcmljaW5nIiwidGhlbiIsInJlc3VsdHMiLCJvblByb2R1Y3RQcmljaW5nU3VjY2VzcyIsImVycm9yIiwib25Qcm9kdWN0UHJpY2luZ0ZhaWxlZCIsInJlc3VsdCIsInByb2Nlc3NQcm9kdWN0UHJpY2luZyIsInJlQ2FsY3VsYXRlIiwibW9kYWwiLCJjcmVhdGVTaW1wbGVEaWFsb2ciLCJ0aXRsZSIsImNvbnRlbnQiLCJSZXN1bHRzIiwic2V0VW9tRnJvbUNvZGUiLCJ1b21Db2RlIiwiY3VycmVtdFVvbSIsIlVuaXRPZk1lYXN1cmUiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJfdW9tTW9kZWwiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIlVOSVRPRk1FQVNVUkUiLCJTREFUQSIsImdldFVuaXRPZk1lYXN1cmVGcm9tQ29kZSIsInVvbSIsInNldFZhbHVlIiwicHJpY2luZ0RhdGEiLCJ2YWx1ZSIsIlNseExvY2F0aW9uSWQiLCJTbHhMb2NhdGlvbkNvZGUiLCJmaWVsZCIsImN1cnJlbnRTZWxlY3Rpb24iLCJ0ZXh0IiwiaXNOYU4iLCJzZXRWYWx1ZU5vVHJpZ2dlciIsImlzQWRIb2NQcm9kdWN0IiwiTGluZVR5cGUiLCJwcmljZSIsImZvcm1hdERlcGVuZGVudFF1ZXJ5IiwiZGVwZW5kZW50VmFsdWUiLCJ0aGVGb3JtYXQiLCJwcm9wZXJ0eSIsInN1YnN0aXR1dGUiLCJvblVwZGF0ZUNvbXBsZXRlZCIsIl9yZWZyZXNoUmVsYXRlZFZpZXdzIiwib25JbnNlcnRDb21wbGV0ZWQiLCJ2aWV3cyIsImdldFZpZXciLCJ2aWV3IiwicmVmcmVzaFJlcXVpcmVkIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwiZGV0YWlsc1RleHQiLCJuYW1lIiwiY2hpbGRyZW4iLCJsYWJlbCIsInR5cGUiLCJlbXB0eVRleHQiLCJ2YWx1ZVRleHRQcm9wZXJ0eSIsImF1dG9Gb2N1cyIsInJlcXVpcmVkIiwiRXJwTG9naWNhbElkIiwiZGVmYXVsdCIsIm5vdGlmaWNhdGlvblRyaWdnZXIiLCJ2YWxpZGF0b3IiLCJleGlzdHMiLCJ0ZXh0UHJvcGVydHkiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLE1BQU1BLFdBQVcsb0JBQVksb0JBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7O0FBUUEsTUFBTUMsVUFBVSx1QkFBUSxpREFBUixFQUEyRCxnQkFBM0QsRUFBbUU7QUFDakY7QUFDQUMsUUFBSSxzQkFGNkU7QUFHakZDLGdCQUFZLHdCQUhxRTtBQUlqRkMsb0JBQWdCLHlCQUppRTtBQUtqRkMsb0JBQWdCLDBCQUxpRTtBQU1qRkMsa0JBQWMsaUJBTm1FO0FBT2pGQyxlQUFXUCxTQUFTTyxTQVA2RDtBQVFqRkMsaUJBQWFSLFNBQVNRLFdBUjJEO0FBU2pGQyxrQkFBY1QsU0FBU1MsWUFUMEQ7QUFVakZDLGVBQVdWLFNBQVNVLFNBVjZEO0FBV2pGQyxlQUFXWCxTQUFTVyxTQVg2RDtBQVlqRkMsMkJBQXVCWixTQUFTWSxxQkFaaUQ7QUFhakZDLDBCQUFzQmIsU0FBU2Esb0JBYmtEO0FBY2pGQywyQkFBdUJkLFNBQVNjLHFCQWRpRDtBQWVqRkMsMEJBQXNCZixTQUFTZSxvQkFma0Q7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O0FBR0RaLG9CQUFVLGtCQUhUO0FBSURlLGdCQUFNLFNBSkw7QUFLRE0sbUJBQVM7QUFMUixTQWxGTyxFQXdGUDtBQUNEUCxpQkFBTyxLQUFLekgsa0JBRFg7QUFFRHVILGdCQUFNLGdCQUZMO0FBR0RaLG9CQUFVLGdCQUhUO0FBSURlLGdCQUFNLFNBSkw7QUFLRE0sbUJBQVM7QUFMUixTQXhGTyxDQUgwQixFQUFELENBQTlCLENBQVA7QUFvR0Q7QUExV2dGLEdBQW5FLENBQWhCOztBQTZXQSxpQkFBS0ssU0FBTCxDQUFlLGtDQUFmLEVBQW1EdEosT0FBbkQ7b0JBQ2VBLE8iLCJmaWxlIjoiRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IFByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlIGZyb20gJy4uLy4uL1ByaWNpbmdBdmFpbGFiaWxpdHlTZXJ2aWNlJztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICdjcm0vVmFsaWRhdG9yJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBNT0RFTF9UWVBFUyBmcm9tICdhcmdvcy9Nb2RlbHMvVHlwZXMnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnc2FsZXNPcmRlckl0ZW1FZGl0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5RdW90ZUxpbmVzLkVkaXRcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLlNhbGVzT3JkZXJJdGVtcy5FZGl0JywgW0VkaXRdLCB7XHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdzYWxlc29yZGVyX2l0ZW1fZWRpdCcsXHJcbiAgZGV0YWlsVmlldzogJ3NhbGVzb3JkZXJfaXRlbV9kZXRhaWwnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvU2FsZXNPcmRlci9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiAnRW50aXRpZXMvU2FsZXNPcmRlci9FZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdzYWxlc09yZGVySXRlbXMnLFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHByb2R1Y3RUZXh0OiByZXNvdXJjZS5wcm9kdWN0VGV4dCxcclxuICBxdWFudGl0eVRleHQ6IHJlc291cmNlLnF1YW50aXR5VGV4dCxcclxuICBvcmRlclRleHQ6IHJlc291cmNlLm9yZGVyVGV4dCxcclxuICBwcmljZVRleHQ6IHJlc291cmNlLnByaWNlVGV4dCxcclxuICBiYXNlQWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICBkb2NBZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UuZG9jQWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgYmFzZUV4dGVuZGVkUHJpY2VUZXh0OiByZXNvdXJjZS5iYXNlRXh0ZW5kZWRQcmljZVRleHQsXHJcbiAgZG9jRXh0ZW5kZWRQcmljZVRleHQ6IHJlc291cmNlLmRvY0V4dGVuZGVkUHJpY2VUZXh0LFxyXG4gIHVuaXRPZk1lYXN1cmVUZXh0OiByZXNvdXJjZS51bml0T2ZNZWFzdXJlVGV4dCxcclxuICB1bml0c09mTWVhc3VyZVRpdGxlOiByZXNvdXJjZS51bml0c09mTWVhc3VyZVRpdGxlLFxyXG4gIGRvY1RvdGFsQW1vdW50VGV4dDogcmVzb3VyY2UuZG9jVG90YWxBbW91bnRUZXh0LFxyXG4gIGxpbmVUZXh0OiByZXNvdXJjZS5saW5lVGV4dCxcclxuICB3YXJlaG91c2VUZXh0OiByZXNvdXJjZS53YXJlaG91c2VUZXh0LFxyXG4gIGFjY291bnRMaW5rZWQ6IGZhbHNlLFxyXG5cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMuZmllbGRzLkVycExpbmVOdW1iZXIuZGlzYWJsZSgpO1xyXG4gICAgaWYgKEFwcC53YXJlaG91c2VEaXNjb3ZlcnkgPT09ICdhdXRvJykge1xyXG4gICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5kaXNhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWVsZHMuU2FsZXNPcmRlci5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5QcmljZS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5FeHRlbmRlZFByaWNlLmRpc2FibGUoKTtcclxuICAgIHRoaXMuZmllbGRzLkRvY0V4dGVuZGVkUHJpY2UuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlLmRpc2FibGUoKTtcclxuICAgIHRoaXMuZmllbGRzLkRvY0NhbGN1bGF0ZWRQcmljZS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5Eb2NUb3RhbEFtb3VudC5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuUHJvZHVjdCwgJ29uQ2hhbmdlJywgdGhpcy5vblByb2R1Y3RDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlF1YW50aXR5LCAnb25DaGFuZ2UnLCB0aGlzLm9uUXVhbnRpdHlDaGFuZ2UpO1xyXG4gIH0sXHJcbiAgX2FwcGx5TG9naWNWYWx1ZXM6IGZ1bmN0aW9uIF9hcHBseUxvZ2ljVmFsdWVzKHZhbHVlcykge1xyXG4gICAgY29uc3QgcHJvZHVjdCA9IHRoaXMuZmllbGRzLlByb2R1Y3QuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICB2YWx1ZXMuUHJvZHVjdE5hbWUgPSBwcm9kdWN0Lk5hbWU7XHJcbiAgICB2YWx1ZXMuRmFtaWx5ID0gcHJvZHVjdC5GYW1pbHk7XHJcbiAgICB2YWx1ZXMuQWN0dWFsSUQgPSBwcm9kdWN0LkFjdHVhbElkO1xyXG4gICAgdmFsdWVzLkNvbW1vZGl0eVR5cGUgPSBwcm9kdWN0LkNvbW1vZGl0eVR5cGU7XHJcbiAgfSxcclxuICBhcHBseUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGV4dCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5jb250ZXh0KSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGV4dC5TYWxlc09yZGVyKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuU2FsZXNPcmRlci5zZXRTZWxlY3Rpb24odGhpcy5vcHRpb25zLmNvbnRleHQuU2FsZXNPcmRlcik7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuU2FsZXNPcmRlci5kaXNhYmxlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZXh0LlNhbGVzT3JkZXIuQWNjb3VudCkge1xyXG4gICAgICAgICAgdGhpcy5hY2NvdW50TGlua2VkID0gdGhpcy5vcHRpb25zLmNvbnRleHQuU2FsZXNPcmRlci5BY2NvdW50LkVycEV4dElkID09PSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5TYWxlc09yZGVyLmVuYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldFByb2R1Y3REZXBlbmRlbnRGaWVsZHMoKTtcclxuICB9LFxyXG4gIHNldFByb2R1Y3REZXBlbmRlbnRGaWVsZHM6IGZ1bmN0aW9uIHNldFByb2R1Y3REZXBlbmRlbnRGaWVsZHMocHJvZHVjdCkge1xyXG4gICAgY29uc3QgZGVwZW5kYW50cyA9IHRoaXMuZ2V0UHJvZHVjdERlcGVuZGFudHMoKTtcclxuICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgIGRlcGVuZGFudHMuZm9yRWFjaCgoZikgPT4ge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLmVuYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLmRlcGVuZHNPbiA9ICdQcm9kdWN0JztcclxuICAgICAgICB0aGlzLmZpZWxkc1tmXS53aGVyZSA9IGBQcm9kdWN0LklkIGVxIFwiJHtwcm9kdWN0LiRrZXl9XCJgO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlcGVuZGFudHMuZm9yRWFjaCgoZikgPT4ge1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLmRpc2FibGUoKTtcclxuICAgICAgICB0aGlzLmZpZWxkc1tmXS5kZXBlbmRzT24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZmllbGRzW2ZdLndoZXJlID0gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRQcm9kdWN0RGVwZW5kYW50czogZnVuY3Rpb24gZ2V0UHJvZHVjdERlcGVuZGFudHMoKSB7XHJcbiAgICByZXR1cm4gWydVbml0T2ZNZWFzdXJlJ107XHJcbiAgfSxcclxuICBvbkluc2VydDogZnVuY3Rpb24gb25JbnNlcnQodmFsdWVzKSB7XHJcbiAgICB0aGlzLl9hcHBseUxvZ2ljVmFsdWVzKHZhbHVlcyk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgb25SZWZyZXNoOiBmdW5jdGlvbiBvblJlZnJlc2goKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5zZXRQcm9kdWN0RGVwZW5kZW50RmllbGRzKCk7XHJcbiAgfSxcclxuICBwcm9jZXNzRW50cnk6IGZ1bmN0aW9uIHByb2Nlc3NFbnRyeShlbnRyeSkge1xyXG4gICAgdGhpcy5zZXRQcm9kdWN0RGVwZW5kZW50RmllbGRzKGVudHJ5LlByb2R1Y3QpO1xyXG4gICAgcmV0dXJuIGVudHJ5O1xyXG4gIH0sXHJcbiAgcmVxdWVzdFByb2R1Y3RQcmljaW5nOiBmdW5jdGlvbiByZXF1ZXN0UHJvZHVjdFByaWNpbmcocHJvZHVjdCwgcXVhbnRpdHksIHNseExvY2F0aW9uLCB1bml0T2ZNZWFzdXJlKSB7XHJcbiAgICBsZXQgc2FsZXNPcmRlciA9IG51bGw7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5jb250ZXh0ICYmIHRoaXMub3B0aW9ucy5jb250ZXh0LlNhbGVzT3JkZXIpIHtcclxuICAgICAgc2FsZXNPcmRlciA9IHRoaXMub3B0aW9ucy5jb250ZXh0LlNhbGVzT3JkZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHMuU2FsZXNPcmRlcikge1xyXG4gICAgICAgIHNhbGVzT3JkZXIgPSB0aGlzLmZpZWxkcy5TYWxlc09yZGVyLmdldFZhbHVlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChzYWxlc09yZGVyICYmIHNhbGVzT3JkZXIuJGtleSAmJiAhdGhpcy5pc1Byb2Nlc3NpbmdQcmljaW5nUmVxdWVzdCkge1xyXG4gICAgICB0aGlzLmlzUHJvY2Vzc2luZ1ByaWNpbmdSZXF1ZXN0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5lbmFibGVQcmljaW5nQ29udHJvbHMoZmFsc2UpO1xyXG4gICAgICBQcmljaW5nQXZhaWxhYmlsaXR5U2VydmljZS5nZXRPcmRlckl0ZW1QcmljaW5nKHRoaXMuZW50cnksIHNhbGVzT3JkZXIsIHByb2R1Y3QsIHF1YW50aXR5LCBzbHhMb2NhdGlvbiwgdW5pdE9mTWVhc3VyZSkudGhlbihcclxuICAgICAgICAocmVzdWx0cykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vblByb2R1Y3RQcmljaW5nU3VjY2VzcyhyZXN1bHRzKTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHRoaXMub25Qcm9kdWN0UHJpY2luZ0ZhaWxlZChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblByb2R1Y3RQcmljaW5nU3VjY2VzczogZnVuY3Rpb24gb25Qcm9kdWN0UHJpY2luZ1N1Y2Nlc3MocmVzdWx0KSB7XHJcbiAgICB0aGlzLnByb2Nlc3NQcm9kdWN0UHJpY2luZyhyZXN1bHQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlQ2FsY3VsYXRlKCk7XHJcbiAgICAgIHRoaXMuaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QgPSBmYWxzZTtcclxuICAgICAgdGhpcy5lbmFibGVQcmljaW5nQ29udHJvbHModHJ1ZSk7XHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNQcm9jZXNzaW5nUHJpY2luZ1JlcXVlc3QgPSBmYWxzZTtcclxuICAgICAgdGhpcy5lbmFibGVQcmljaW5nQ29udHJvbHModHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9uUHJvZHVjdFByaWNpbmdGYWlsZWQ6IGZ1bmN0aW9uIG9uUHJvZHVjdFByaWNpbmdGYWlsZWQocmVzdWx0KSB7XHJcbiAgICB0aGlzLmlzUHJvY2Vzc2luZ1ByaWNpbmdSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICB0aGlzLmVuYWJsZVByaWNpbmdDb250cm9scyh0cnVlKTtcclxuICAgIHRoaXMuQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyh7XHJcbiAgICAgIHRpdGxlOiAnYWxlcnQnLFxyXG4gICAgICBjb250ZW50OiByZXN1bHQuUmVzdWx0cyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2V0VW9tRnJvbUNvZGU6IGZ1bmN0aW9uIHNldFVvbUZyb21Db2RlKHVvbUNvZGUpIHtcclxuICAgIGNvbnN0IGN1cnJlbXRVb20gPSB0aGlzLmZpZWxkcy5Vbml0T2ZNZWFzdXJlLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCBwcm9kdWN0ID0gdGhpcy5maWVsZHMuUHJvZHVjdC5nZXRWYWx1ZSgpO1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLl91b21Nb2RlbCkge1xyXG4gICAgICAgIHRoaXMuX3VvbU1vZGVsID0gQXBwLk1vZGVsTWFuYWdlci5nZXRNb2RlbChNT0RFTF9OQU1FUy5VTklUT0ZNRUFTVVJFLCBNT0RFTF9UWVBFUy5TREFUQSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuX3VvbU1vZGVsICYmIHByb2R1Y3QpIHtcclxuICAgICAgICBpZiAoKGN1cnJlbXRVb20gJiYgKGN1cnJlbXRVb20uTmFtZSAhPT0gdW9tQ29kZSkpIHx8ICghY3VycmVtdFVvbSkpIHtcclxuICAgICAgICAgIHRoaXMuX3VvbU1vZGVsLmdldFVuaXRPZk1lYXN1cmVGcm9tQ29kZSh1b21Db2RlLCBwcm9kdWN0LiRrZXkpLnRoZW4oKHVvbSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpZWxkcy5Vbml0T2ZNZWFzdXJlLnNldFZhbHVlKHVvbSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc1Byb2R1Y3RQcmljaW5nOiBmdW5jdGlvbiBwcm9jZXNzUHJvZHVjdFByaWNpbmcocHJpY2luZ0RhdGEpIHtcclxuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmIChwcmljaW5nRGF0YSkge1xyXG4gICAgICAgIGlmIChwcmljaW5nRGF0YS5Eb2NDYWxjdWxhdGVkUHJpY2UpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzLkRvY0NhbGN1bGF0ZWRQcmljZS5zZXRWYWx1ZShwcmljaW5nRGF0YS5Eb2NDYWxjdWxhdGVkUHJpY2UudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJpY2luZ0RhdGEuRG9jRXh0ZW5kZWRQcmljZSkge1xyXG4gICAgICAgICAgdGhpcy5maWVsZHMuRG9jRXh0ZW5kZWRQcmljZS5zZXRWYWx1ZShwcmljaW5nRGF0YS5Eb2NFeHRlbmRlZFByaWNlLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByaWNpbmdEYXRhLkRvY1RvdGFsQW1vdW50KSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkcy5Eb2NUb3RhbEFtb3VudC5zZXRWYWx1ZShwcmljaW5nRGF0YS5Eb2NUb3RhbEFtb3VudC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcmljaW5nRGF0YS5TbHhMb2NhdGlvbklkKSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5zZXRWYWx1ZSh7XHJcbiAgICAgICAgICAgICRrZXk6IHByaWNpbmdEYXRhLlNseExvY2F0aW9uSWQudmFsdWUsXHJcbiAgICAgICAgICAgIE5hbWU6IHByaWNpbmdEYXRhLlNseExvY2F0aW9uQ29kZS52YWx1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJpY2luZ0RhdGEuVW5pdE9mTWVhc3VyZSkge1xyXG4gICAgICAgICAgdGhpcy5zZXRVb21Gcm9tQ29kZShwcmljaW5nRGF0YS5Vbml0T2ZNZWFzdXJlLnZhbHVlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfSxcclxuICBvblByb2R1Y3RDaGFuZ2U6IGZ1bmN0aW9uIG9uUHJvZHVjdENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIHRoaXMuc2V0UHJvZHVjdERlcGVuZGVudEZpZWxkcyhmaWVsZC5jdXJyZW50U2VsZWN0aW9uKTtcclxuICAgIHRoaXMuZmllbGRzLlByb2R1Y3ROYW1lLnNldFZhbHVlKHZhbHVlLnRleHQpO1xyXG4gICAgdGhpcy5maWVsZHMuU2x4TG9jYXRpb24uc2V0VmFsdWUobnVsbCk7XHJcbiAgICB0aGlzLnJlcXVlc3RQcm9kdWN0UHJpY2luZyhcclxuICAgICAgZmllbGQuY3VycmVudFNlbGVjdGlvbixcclxuICAgICAgdGhpcy5maWVsZHMuUXVhbnRpdHkuZ2V0VmFsdWUoKSxcclxuICAgICAgdGhpcy5maWVsZHMuU2x4TG9jYXRpb24uZ2V0VmFsdWUoKSxcclxuICAgICAgdGhpcy5maWVsZHMuVW5pdE9mTWVhc3VyZS5nZXRWYWx1ZSgpXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgb25RdWFudGl0eUNoYW5nZTogZnVuY3Rpb24gb25RdWFudGl0eUNoYW5nZSh2YWx1ZSkge1xyXG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5zZXRWYWx1ZU5vVHJpZ2dlcigwKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzQWRIb2NQcm9kdWN0KHRoaXMuZmllbGRzLlByb2R1Y3QuZ2V0VmFsdWUoKSkpIHtcclxuICAgICAgdGhpcy5yZUNhbGN1bGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZXF1ZXN0UHJvZHVjdFByaWNpbmcoXHJcbiAgICAgICAgdGhpcy5maWVsZHMuUHJvZHVjdC5nZXRWYWx1ZSgpLFxyXG4gICAgICAgIHRoaXMuZmllbGRzLlF1YW50aXR5LmdldFZhbHVlKCksXHJcbiAgICAgICAgdGhpcy5maWVsZHMuU2x4TG9jYXRpb24uZ2V0VmFsdWUoKSxcclxuICAgICAgICB0aGlzLmZpZWxkcy5Vbml0T2ZNZWFzdXJlLmdldFZhbHVlKClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGVuYWJsZVByaWNpbmdDb250cm9sczogZnVuY3Rpb24gZW5hYmxlUHJpY2luZ0NvbnRyb2xzKGVuYWJsZSkge1xyXG4gICAgaWYgKGVuYWJsZSkgeyAvLyBUby1kbyBtYWtlIHRoaXMgbW9yZSBkeW5hbWljLlxyXG4gICAgICB0aGlzLmZpZWxkcy5Qcm9kdWN0LmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5lbmFibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuU2x4TG9jYXRpb24uZW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlVuaXRPZk1lYXN1cmUuZW5hYmxlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZpZWxkcy5Qcm9kdWN0LmRpc2FibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuUXVhbnRpdHkuZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5TbHhMb2NhdGlvbi5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlVuaXRPZk1lYXN1cmUuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaXNBZEhvY1Byb2R1Y3Q6IGZ1bmN0aW9uIGlzQWRIb2NQcm9kdWN0KHByb2R1Y3QpIHtcclxuICAgIGlmIChwcm9kdWN0LkxpbmVUeXBlID09PSAnRnJlZVRleHQnKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgcmVDYWxjdWxhdGU6IGZ1bmN0aW9uIHJlQ2FsY3VsYXRlKCkge1xyXG4gICAgY29uc3QgcHJpY2UgPSB0aGlzLmZpZWxkcy5DYWxjdWxhdGVkUHJpY2UuZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IHF1YW50aXR5ID0gdGhpcy5maWVsZHMuUXVhbnRpdHkuZ2V0VmFsdWUoKTtcclxuICAgIHRoaXMuZmllbGRzLkV4dGVuZGVkUHJpY2Uuc2V0VmFsdWUocXVhbnRpdHkgKiBwcmljZSk7XHJcbiAgfSxcclxuICBmb3JtYXREZXBlbmRlbnRRdWVyeTogZnVuY3Rpb24gZm9ybWF0RGVwZW5kZW50UXVlcnkoZGVwZW5kZW50VmFsdWUsIHRoZUZvcm1hdCwgcHJvcGVydHkpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGVGb3JtYXQsIFt1dGlsaXR5LmdldFZhbHVlKGRlcGVuZGVudFZhbHVlLCBwcm9wZXJ0eSB8fCAnJGtleScpXSk7XHJcbiAgfSxcclxuICBvblVwZGF0ZUNvbXBsZXRlZDogZnVuY3Rpb24gb25VcGRhdGVDb21wbGV0ZWQoKSB7XHJcbiAgICB0aGlzLl9yZWZyZXNoUmVsYXRlZFZpZXdzKCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgb25JbnNlcnRDb21wbGV0ZWQ6IGZ1bmN0aW9uIG9uSW5zZXJ0Q29tcGxldGVkKCkge1xyXG4gICAgdGhpcy5fcmVmcmVzaFJlbGF0ZWRWaWV3cygpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF9yZWZyZXNoUmVsYXRlZFZpZXdzOiBmdW5jdGlvbiBfcmVmcmVzaFJlbGF0ZWRWaWV3cygpIHtcclxuICAgIGNvbnN0IHZpZXdzID0gW1xyXG4gICAgICBBcHAuZ2V0Vmlldygnc2FsZXNvcmRlcl9pdGVtX2RldGFpbCcpLFxyXG4gICAgICBBcHAuZ2V0Vmlldygnc2FsZXNvcmRlcl9pdGVtc19saXN0JyksXHJcbiAgICBdO1xyXG5cclxuICAgIHZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcclxuICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICB2aWV3LnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxpbmVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFcnBMaW5lTnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VycExpbmVOdW1iZXInLFxyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9yZGVyVGV4dCxcclxuICAgICAgICBuYW1lOiAnU2FsZXNPcmRlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc09yZGVyJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnU2FsZXNPcmRlck51bWJlcicsXHJcbiAgICAgICAgdmlldzogJ29yZGVyaXRlbV9zYWxlc29yZGVyX2xpc3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJvZHVjdFRleHQsXHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJvZHVjdCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdzYWxlc29yZGVyX3Byb2R1Y3RfcmVsYXRlZCcsXHJcbiAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIHdoZXJlOiAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5maWVsZHMuU2FsZXNPcmRlci5jdXJyZW50U2VsZWN0aW9uICYmIHRoaXMuZmllbGRzLlNhbGVzT3JkZXIuY3VycmVudFNlbGVjdGlvbi5FcnBMb2dpY2FsSWQgfHwgdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5jb250ZXh0ICYmIHRoaXMub3B0aW9ucy5jb250ZXh0LlNhbGVzT3JkZXIgJiYgdGhpcy5vcHRpb25zLmNvbnRleHQuU2FsZXNPcmRlci5FcnBMb2dpY2FsSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBFcnBMb2dpY2FsSWQgZXEgXCIke3RoaXMuZmllbGRzLlNhbGVzT3JkZXIuY3VycmVudFNlbGVjdGlvbi5FcnBMb2dpY2FsSWQgfHwgdGhpcy5vcHRpb25zLmNvbnRleHQuU2FsZXNPcmRlci5FcnBMb2dpY2FsSWR9XCJgO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0TmFtZScsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5xdWFudGl0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1F1YW50aXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1F1YW50aXR5JyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgZGVmYXVsdDogMSxcclxuICAgICAgICBub3RpZmljYXRpb25UcmlnZ2VyOiAnYmx1cicsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudW5pdE9mTWVhc3VyZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1VuaXRPZk1lYXN1cmUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVW5pdE9mTWVhc3VyZScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdvcmRlcml0ZW1fdW5pdG9mbWVhc3VyZV9saXN0JyxcclxuICAgICAgICB0aXRsZTogdGhpcy51bml0c09mTWVhc3VyZVRpdGxlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1NseExvY2F0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NseExvY2F0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy53YXJlaG91c2VUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHZpZXc6ICdsb2NhdGlvbnNfbGlzdCcsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTmFtZScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1ByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1ByaWNlJyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgZGVmYXVsdDogMC4wMCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIGRlZmF1bHQ6IDAuMDAsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5kb2NBZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRG9jQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RvY0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIGRlZmF1bHQ6IDAuMDAsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5iYXNlRXh0ZW5kZWRQcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIGRlZmF1bHQ6IDAuMDAsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5kb2NFeHRlbmRlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRG9jRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEb2NFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgZGVmYXVsdDogMC4wMCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRvY1RvdGFsQW1vdW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnRG9jVG90YWxBbW91bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRG9jVG90YWxBbW91bnQnLFxyXG4gICAgICAgIHR5cGU6ICdkZWNpbWFsJyxcclxuICAgICAgICBkZWZhdWx0OiAwLjAwLFxyXG4gICAgICB9LFxyXG4gICAgICBdIH0sXHJcbiAgICBdKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5WaWV3cy5TYWxlc09yZGVySXRlbXMuRWRpdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=