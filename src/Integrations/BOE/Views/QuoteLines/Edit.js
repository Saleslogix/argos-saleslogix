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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import utility from 'argos/Utility';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';
import PricingAvailabilityService from '../../PricingAvailabilityService';
import validator from 'crm/Validator';
import MODEL_NAMES from '../../Models/Names';
import MODEL_TYPES from 'argos/Models/Types';

const resource = getResource('quoteItemEdit');

const __class = declare('crm.Integrations.BOE.Views.QuoteLines.Edit', [Edit], {
  // View Properties
  id: 'quote_line_edit',
  detailView: 'quote_line_detail',
  insertSecurity: 'Entities/Quote/Add',
  updateSecurity: 'Entities/Quote/Edit',
  resourceKind: 'quoteItems',
  modelName: MODEL_NAMES.QUOTEITEM,
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
    const product = this.fields.Product.getSelection();
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
    const dependants = this.getProductDependants();
    if (product) {
      dependants.forEach((f) => {
        this.fields[f].enable();
        this.fields[f].dependsOn = 'Product';
        this.fields[f].where = `Product.Id eq "${product.$key}"`;
      });
    } else {
      dependants.forEach((f) => {
        this.fields[f].disable();
        this.fields[f].dependsOn = null;
        this.fields[f].where = null;
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
    let quote = null;
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
      PricingAvailabilityService.getQuoteItemPricing(this.entry, quote, product, quantity, slxLocation, unitOfMeasure).then(
        (results) => {
          if (results.messageText && results.messageText.value && typeof results.messageText.value === 'string') {
            this.onProductPricingFailed({ Results: results.messageText.value });
          } else {
            this.onProductPricingSuccess(results);
          }
        }, (error) => {
          this.onProductPricingFailed(error);
        });
    }
  },
  onProductPricingSuccess: function onProductPricingSuccess(result) {
    this.processProductPricing(result).then(() => {
      this.reCalculate();
      this.isProcessingPricingRequest = false;
      this.enablePricingControls(true);
    }, () => {
      this.isProcessingPricingRequest = false;
      this.enablePricingControls(true);
    });
  },
  onProductPricingFailed: function onProductPricingFailed(result) {
    this.isProcessingPricingRequest = false;
    this.enablePricingControls(true);
    App.modal.createSimpleDialog({
      title: 'alert',
      content: result.Results,
    });
  },
  setUomFromCode: function setUomFromCode(uomCode) {
    const curremtUom = this.fields.UnitOfMeasure.getValue();
    const product = this.fields.Product.getValue();
    const promise = new Promise((resolve, reject) => {
      if (!this._uomModel) {
        this._uomModel = App.ModelManager.getModel(MODEL_NAMES.UNITOFMEASURE, MODEL_TYPES.SDATA);
      }
      if (this._uomModel && product) {
        if ((curremtUom && (curremtUom.Name !== uomCode)) || (!curremtUom)) {
          this._uomModel.getUnitOfMeasureFromCode(uomCode, product.$key).then((uom) => {
            this.fields.UnitOfMeasure.setValue(uom);
            resolve(true);
          }, (error) => {
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
    const promise = new Promise((resolve, reject) => {
      if (pricingData) {
        if (pricingData.DocCalculatedPrice) {
          this.fields.DocCalculatedPrice.setValue(pricingData.DocCalculatedPrice.value);
        }
        if (pricingData.DocExtendedPrice) {
          this.fields.DocExtendedPrice.setValue(pricingData.DocExtendedPrice.value);
        }
        if (pricingData.DocTotalAmount) {
          this.fields.DocTotalAmount.setValue(pricingData.DocTotalAmount.value);
        }
        if (pricingData.SlxLocationId) {
          this.fields.SlxLocation.setValue({
            $key: pricingData.SlxLocationId.value,
            Name: pricingData.SlxLocationCode.value,
          });
        }
        if (pricingData.UnitOfMeasure) {
          this.setUomFromCode(pricingData.UnitOfMeasure.value).then(() => {
            resolve(true);
          }, (error) => {
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
    return string.substitute(theFormat, [utility.getValue(dependentValue, property || '$key')]);
  },
  onProductChange: function onProductChange(value, field) {
    this.setProductDependentFields(field.currentSelection);
    this.fields.ProductName.setValue(value.text);
    this.fields.SlxLocation.setValue(null);
    this.requestProductPricing(
      field.currentSelection,
      this.fields.Quantity.getValue(),
      this.fields.SlxLocation.getValue(),
      this.fields.UnitOfMeasure.getValue()
    );
  },
  onQuantityChange: function onQuantityChange(value) {
    if (isNaN(value)) {
      this.fields.Quantity.setValueNoTrigger(0);
    }
    if (this.isAdHocProduct(this.fields.Product.getValue())) {
      this.reCalculate();
    } else {
      this.requestProductPricing(
        this.fields.Product.getValue(),
        this.fields.Quantity.getValue(),
        this.fields.SlxLocation.getValue(),
        this.fields.UnitOfMeasure.getValue()
      );
    }
  },
  enablePricingControls: function enablePricingControls(enable) {
    if (enable) { // To-do make this more dynamic.
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
    const price = this.fields.CalculatedPrice.getValue();
    const quantity = this.fields.Quantity.getValue();
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
    const views = [
      App.getView('quote_line_detail'),
      App.getView('quote_lines_list'),
    ];

    views.forEach((view) => {
      if (view) {
        view.refreshRequired = true;
      }
    }, this);
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        label: this.lineText,
        name: 'ErpLineNumber',
        property: 'ErpLineNumber',
        type: 'text',
      }, {
        label: this.quoteText,
        name: 'Quote',
        property: 'Quote',
        type: 'lookup',
        emptyText: '',
        valueTextProperty: 'QuoteNumber',
        view: 'quoteline_quote_list',
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
        validator: validator.exists,
        where: () => {
          const logicalIdFromSelection = this.fields.Quote.currentSelection && this.fields.Quote.currentSelection.ErpLogicalId;
          const logicalIdFromOptions = this.options && this.options.context && this.options.context.Quote && this.options.context.Quote.ErpLogicalId;
          const logicalIdFromEntry = this.entry && this.entry.Quote && this.entry.Quote.ErpLogicalId;
          const logicalId = logicalIdFromSelection || logicalIdFromOptions || logicalIdFromEntry;
          if (logicalId) {
            return `ErpLogicalId eq "${logicalId}"`;
          }
          return null;
        },
      }, {
        name: 'ProductName',
        property: 'ProductName',
        type: 'hidden',
      }, {
        label: this.quantityText,
        name: 'Quantity',
        property: 'Quantity',
        type: 'decimal',
        default: 1,
        notificationTrigger: 'blur',
        validator: validator.exists,
      }, {
        label: this.unitOfMeasureText,
        name: 'UnitOfMeasure',
        property: 'UnitOfMeasure',
        type: 'lookup',
        emptyText: '',
        valueTextProperty: 'Name',
        view: 'quoteline_unitofmeasure_list',
        title: this.unitsOfMeasureTitle,
      }, {
        name: 'SlxLocation',
        property: 'SlxLocation',
        label: this.warehouseText,
        type: 'lookup',
        view: 'locations_list',
        textProperty: 'Description',
        valueTextProperty: 'Name',
      }, {
        label: this.priceText,
        name: 'Price',
        property: 'Price',
        type: 'decimal',
        default: 0.00,
      }, {
        label: this.baseAdjustedPriceText,
        name: 'CalculatedPrice',
        property: 'CalculatedPrice',
        type: 'decimal',
        default: 0.00,
      }, {
        label: this.docAdjustedPriceText,
        name: 'DocCalculatedPrice',
        property: 'DocCalculatedPrice',
        type: 'decimal',
        default: 0.00,
      }, {
        label: this.baseExtendedPriceText,
        name: 'ExtendedPrice',
        property: 'ExtendedPrice',
        type: 'decimal',
        default: 0.00,
      }, {
        label: this.docExtendedPriceText,
        name: 'DocExtendedPrice',
        property: 'DocExtendedPrice',
        type: 'decimal',
        default: 0.00,
      }, {
        label: this.docTotalAmountText,
        name: 'DocTotalAmount',
        property: 'DocTotalAmount',
        type: 'decimal',
        default: 0.00,
      },
      ] },
    ]);
  },
});

lang.setObject('icboe.Views.QuoteLines.Edit', __class);
export default __class;
