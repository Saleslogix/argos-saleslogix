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
import validator from '../../Validator';
import Edit from 'argos/Edit';
import Utility from 'argos/Utility';
import getResource from 'argos/I18n';

const resource = getResource('opportunityProductEdit');

/**
 * @class crm.Views.OpportunityProduct.Edit
 *
 * @extends argos.Edit
 *
 * @requires argos.Utility
 *
 * @requires crm.Validator
 * @requires crm.Template
 */
const __class = declare('crm.Views.OpportunityProduct.Edit', [Edit], {
  // Localization
  titleText: resource.titleText,
  detailsText: resource.detailsText,
  opportunityText: resource.opportunityText,
  productText: resource.productText,
  productFamilyText: resource.productFamilyText,
  priceLevelText: resource.priceLevelText,
  priceText: resource.priceText,
  basePriceText: resource.basePriceText,
  discountText: resource.discountText,
  adjustedPriceText: resource.adjustedPriceText,
  myAdjustedPriceText: resource.myAdjustedPriceText,
  baseAdjustedPriceText: resource.baseAdjustedPriceText,
  quantityText: resource.quantityText,
  baseExtendedPriceText: resource.baseExtendedPriceText,
  extendedPriceText: resource.extendedPriceText,
  extendedPriceSectionText: resource.extendedPriceSectionText,
  adjustedPriceSectionText: resource.adjustedPriceSectionText,

  // View Properties
  entityName: 'Opportunity',
  id: 'opportunityproduct_edit',
  resourceKind: 'opportunityProducts',
  insertSecurity: 'Entities/Opportunity/Add',
  updateSecurity: 'Entities/Opportunity/Edit',
  querySelect: [
    'Opportunity/Description',
    'Product/Name',
    'Product/Family',
    'Program',
    'Price',
    'Discount',
    'AdjustedPrice',
    'CalculatedPrice',
    'Quantity',
    'ExtendedPrice',
  ],
  queryInclude: [
    '$permissions',
  ],
  init: function init() {
    this.inherited(init, arguments);
    this.connect(this.fields.Product, 'onChange', this.onProductChange);
    this.connect(this.fields.Program, 'onChange', this.onProgramChange);
    this.connect(this.fields.Discount, 'onChange', this.onDiscountChange);
    this.connect(this.fields.CalculatedPrice, 'onChange', this.onAdjustedPriceChange);
    this.connect(this.fields.CalculatedPriceMine, 'onChange', this.onAdjustedPriceMineChange);
    this.connect(this.fields.Quantity, 'onChange', this.onQuantityChange);
  },
  setValues: function setValues(values) {
    this.inherited(setValues, arguments);
    this.fields.Program.setValue({
      $key: '',
      Program: values.Program,
    });

    if (values.Discount > 0) {
      // transform the discount into a percentage number 0.10 to 10.00%
      this.fields.Discount.setValue(values.Discount * 100);
    }

    const myCode = App.getMyExchangeRate().code;
    const baseCode = App.getBaseExchangeRate().code;
    this.fields.Price.setCurrencyCode(baseCode);
    this.fields.CalculatedPrice.setCurrencyCode(baseCode);

    if (App.hasMultiCurrency()) {
      this.fields.CalculatedPriceMine.setValueNoTrigger(this._getMyRate() * values.CalculatedPrice);
      this.fields.CalculatedPriceMine.setCurrencyCode(myCode);
    }

    this.fields.ExtendedPrice.setCurrencyCode(baseCode);
    this._updateExtendedPrice();

    if ((values.Product.Family !== null) && (values.Price !== null)) {
      this._enableUI(true);
    } else {
      this._enableUI(false);
    }
  },
  _enableUI: function _enableUI(enable) {
    if (enable) {
      this.fields.Discount.enable();
      this.fields.Quantity.enable();
      this.fields.CalculatedPrice.enable();
      if (App.hasMultiCurrency()) {
        this.fields.CalculatedPriceMine.enable();
      }
    } else {
      this.fields.Discount.disable();
      this.fields.Quantity.disable();
      this.fields.CalculatedPrice.disable();
      if (App.hasMultiCurrency()) {
        this.fields.CalculatedPriceMine.disable();
      }
    }
  },
  _getMyRate: function _getMyRate() {
    return App.getMyExchangeRate().rate;
  },
  getValues: function getValues() {
    const o = this.inherited(getValues, arguments);
    o.Program = o.Program.Program;

    /*
     * 'AdjustedPrice' is a lie. The underlying database field is actually PRICEADJUSTED and
     * is a boolean, not a price that has been adjusted. Since we use the adjusted price to calculate
     * the discount %, we will remove it from getValues so we aren't trying to save the wrong data type when sending
     * the sdata request.
     */
    delete o.AdjustedPrice;
    delete o.CalculatedPriceMine;
    // transform the discount back into a decimal
    o.Discount = o.Discount / 100;

    return o;
  },
  applyContext: function applyContext() {
    const entry = this.options && this.options.selectedEntry;

    if (entry) {
      this.fields.Opportunity.setValue(entry);
    }
  },
  onProductChange: function onProductChange(value, field) {
    const selection = field && field.currentSelection;
    if (selection) {
      this.fields.ProductId.setValueNoTrigger(value.key);
      this.fields['Product.Family'].setValueNoTrigger(selection.Family);
      this.fields.Program.clearValue();

      this.fields.Price.setValueNoTrigger(selection.Price);
      this.fields.Discount.clearValue();
      this.fields.CalculatedPrice.setValueNoTrigger(selection.Price);

      if (App.hasMultiCurrency()) {
        this.fields.CalculatedPriceMine.setValueNoTrigger(this._getMyRate() * selection.Price);
      }
      this.fields.Quantity.setValueNoTrigger(1);
      this._updateExtendedPrice();
    }
  },
  onProgramChange: function onProgramChange(value, field) {
    const selection = field && field.currentSelection;
    if (selection) {
      this.fields.Price.setValueNoTrigger(selection.Price);
      this.fields.Discount.clearValue();
      this.fields.CalculatedPrice.setValueNoTrigger(selection.Price);
      if (App.hasMultiCurrency()) {
        this.fields.CalculatedPriceMine.setValueNoTrigger(this._getMyRate() * selection.Price);
      }
      this._updateExtendedPrice();
      this._enableUI(true);
    }
  },
  onDiscountChange: function onDiscountChange() {
    const price = parseFloat(this.fields.Price.getValue()) || 0;
    const discount = this.fields.Discount.getValue();

    const adjusted = this._calculateAdjustedPrice(price, discount);
    this.fields.CalculatedPrice.setValueNoTrigger(adjusted);

    this._updateAdjustedPrices(adjusted);
    this._updateExtendedPrice();
  },
  onAdjustedPriceChange: function onAdjustedPriceChange() {
    const price = parseFloat(this.fields.Price.getValue()) || 0;
    const adjusted = parseFloat(this.fields.CalculatedPrice.getValue()) || 0;

    const discount = this._calculateDiscount(price, adjusted);
    this.fields.Discount.setValueNoTrigger(discount);

    if (App.hasMultiCurrency()) {
      const myadjusted = this._getMyRate() * adjusted;
      this.fields.CalculatedPriceMine.setValueNoTrigger(myadjusted);
    }
    this._updateExtendedPrice();
  },
  onAdjustedPriceMineChange: function onAdjustedPriceMineChange() {
    const myadjusted = this.fields.CalculatedPriceMine.getValue();
    const price = this.fields.Price.getValue() || 0;

    const myrate = this._getMyRate();
    const myprice = price * myrate; // get the price in the users exchange rate

    const discount = this._calculateDiscount(myprice, myadjusted);
    this.fields.Discount.setValueNoTrigger(discount);

    const adjusted = this._calculateAdjustedPrice(price, discount);
    this.fields.CalculatedPrice.setValueNoTrigger(adjusted);

    this._updateExtendedPrice();
  },
  onQuantityChange: function onQuantityChange(value) {
    if (isNaN(value)) {
      this.fields.Quantity.setValueNoTrigger(0);
    }
    this._updateExtendedPrice();
  },
  _calculateDiscount: function _calculateDiscount(price, adjusted) {
    let discount;
    if (price === 0) {
      discount = 0.0;
    } else {
      discount = (1 - (adjusted / price)) * 100;
    }
    return discount;
  },
  _calculateAdjustedPrice: function _calculateAdjustedPrice(price, discount) {
    let adjusted;
    if (discount === 0) {
      adjusted = price;
    } else {
      adjusted = price - (price * (discount / 100));
    }
    return adjusted;
  },
  _updateAdjustedPrices: function _updateAdjustedPrices(adjusted) {
    let myadjusted;
    this.fields.CalculatedPrice.setValueNoTrigger(adjusted);
    if (App.hasMultiCurrency()) {
      myadjusted = this._getMyRate() * adjusted;
      this.fields.CalculatedPriceMine.setValueNoTrigger(myadjusted);
    }
  },
  _updateExtendedPrice: function _updateExtendedPrice() {
    const quantity = parseFloat(this.fields.Quantity.getValue()) || 0;
    const adjusted = parseFloat(this.fields.CalculatedPrice.getValue()) || 0;
    const extended = adjusted * quantity;
    this.fields.ExtendedPrice.setValueNoTrigger(extended);
  },
  onUpdateCompleted: function onUpdateCompleted() {
    this._refreshOpportunityViews();
    this.inherited(onUpdateCompleted, arguments);
  },
  onInsertCompleted: function onInsertCompleted() {
    this._refreshOpportunityViews();
    this.inherited(onInsertCompleted, arguments);
  },
  _refreshOpportunityViews: function _refreshOpportunityViews() {
    const views = [
      App.getView('opportunityproduct_related'),
      App.getView('opportunity_detail'),
      App.getView('opportunity_list'),
    ];

    views.forEach((view) => {
      if (view) {
        view.refreshRequired = true;
      }
    });
  },
  createLayout: function createLayout() {
    const details = {
      title: this.detailsText,
      name: 'OpportunityProductDetailsEdit',
      children: [{
        label: this.opportunityText,
        name: 'Opportunity',
        property: 'Opportunity',
        type: 'lookup',
        textProperty: 'Description',
        view: 'opportunity_related',
        validator: validator.exists,
      }, {
        name: 'ProductId',
        property: 'ProductId',
        type: 'hidden',
      }, {
        label: this.productText,
        name: 'Product',
        property: 'Product',
        type: 'lookup',
        textProperty: 'Name',
        view: 'product_related',
        validator: validator.exists,
      }, {
        label: this.productFamilyText,
        name: 'Product.Family',
        property: 'Product.Family',
        type: 'text',
        readonly: true,
      }, {
        label: this.priceLevelText,
        name: 'Program',
        property: 'Program',
        textProperty: 'Program',
        type: 'lookup',
        view: 'productprogram_related',
        validator: validator.exists,
        where: (function where() {
          const val = this.fields.Product.getValue();
          return `Product.Name eq "${Utility.escapeSearchQuery(val.Name)}"`;
        }).bindDelegate(this),
      }, {
        label: App.hasMultiCurrency() ? this.basePriceText : this.priceText,
        name: 'Price',
        property: 'Price',
        type: 'multiCurrency',
        readonly: true,
      }, {
        label: this.discountText,
        name: 'Discount',
        property: 'Discount',
        type: 'decimal',
        notificationTrigger: 'blur',
      }, {
        label: this.quantityText,
        name: 'Quantity',
        property: 'Quantity',
        type: 'decimal',
        notificationTrigger: 'blur',
      }],
    };

    if (!App.hasMultiCurrency()) {
      details.children.push({
        label: this.adjustedPriceText,
        name: 'CalculatedPrice',
        property: 'CalculatedPrice',
        type: 'multiCurrency',
        notificationTrigger: 'blur',
      });
      details.children.push({
        label: this.extendedPriceText,
        name: 'ExtendedPrice',
        property: 'ExtendedPrice',
        type: 'multiCurrency',
        readonly: true,
      });
    }

    const extendedPrice = {
      title: this.extendedPriceSectionText,
      name: 'OpportunityProductExtendedPriceEdit',
      children: [{
        label: this.baseExtendedPriceText,
        name: 'ExtendedPrice',
        property: 'ExtendedPrice',
        type: 'multiCurrency',
        readonly: true,
      }],
    };

    const adjustedPrice = {
      title: this.adjustedPriceSectionText,
      name: 'OpportunityProductAdjustedPriceEdit',
      children: [{
        label: this.baseAdjustedPriceText,
        name: 'CalculatedPrice',
        property: 'CalculatedPrice',
        type: 'multiCurrency',
        notificationTrigger: 'blur',
      }, {
        label: this.myAdjustedPriceText,
        name: 'CalculatedPriceMine',
        property: 'CalculatedPriceMine',
        type: App.hasMultiCurrency() ? 'multiCurrency' : 'hidden',
        notificationTrigger: 'blur',
      }],
    };

    const layout = this.layout || (this.layout = []);

    if (layout.length > 0) {
      return layout;
    }

    layout.push(details);

    if (App.hasMultiCurrency()) {
      layout.push(adjustedPrice);
      layout.push(extendedPrice);
    }
    return layout;
  },
});

export default __class;
