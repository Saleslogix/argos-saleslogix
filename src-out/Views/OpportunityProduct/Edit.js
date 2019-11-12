define('crm/Views/OpportunityProduct/Edit', ['module', 'exports', 'dojo/_base/declare', '../../Validator', 'argos/Edit', 'argos/Utility', 'argos/I18n'], function (module, exports, _declare, _Validator, _Edit, _Utility, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('opportunityProductEdit');

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

  var __class = (0, _declare2.default)('crm.Views.OpportunityProduct.Edit', [_Edit2.default], {
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
    querySelect: ['Opportunity/Description', 'Product/Name', 'Product/Family', 'Program', 'Price', 'Discount', 'AdjustedPrice', 'CalculatedPrice', 'Quantity', 'ExtendedPrice'],
    queryInclude: ['$permissions'],
    init: function init() {
      this.inherited(arguments);
      this.connect(this.fields.Product, 'onChange', this.onProductChange);
      this.connect(this.fields.Program, 'onChange', this.onProgramChange);
      this.connect(this.fields.Discount, 'onChange', this.onDiscountChange);
      this.connect(this.fields.CalculatedPrice, 'onChange', this.onAdjustedPriceChange);
      this.connect(this.fields.CalculatedPriceMine, 'onChange', this.onAdjustedPriceMineChange);
      this.connect(this.fields.Quantity, 'onChange', this.onQuantityChange);
    },
    setValues: function setValues(values) {
      this.inherited(arguments);
      this.fields.Program.setValue({
        $key: '',
        Program: values.Program
      });

      if (values.Discount > 0) {
        // transform the discount into a percentage number 0.10 to 10.00%
        this.fields.Discount.setValue(values.Discount * 100);
      }

      var myCode = App.getMyExchangeRate().code;
      var baseCode = App.getBaseExchangeRate().code;
      this.fields.Price.setCurrencyCode(baseCode);
      this.fields.CalculatedPrice.setCurrencyCode(baseCode);

      if (App.hasMultiCurrency()) {
        this.fields.CalculatedPriceMine.setValueNoTrigger(this._getMyRate() * values.CalculatedPrice);
        this.fields.CalculatedPriceMine.setCurrencyCode(myCode);
      }

      this.fields.ExtendedPrice.setCurrencyCode(baseCode);
      this._updateExtendedPrice();

      if (values.Product.Family !== null && values.Price !== null) {
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
      var o = this.inherited(arguments);
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
      var entry = this.options && this.options.selectedEntry;

      if (entry) {
        this.fields.Opportunity.setValue(entry);
      }
    },
    onProductChange: function onProductChange(value, field) {
      var selection = field && field.currentSelection;
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
      var selection = field && field.currentSelection;
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
      var price = parseFloat(this.fields.Price.getValue()) || 0;
      var discount = this.fields.Discount.getValue();

      var adjusted = this._calculateAdjustedPrice(price, discount);
      this.fields.CalculatedPrice.setValueNoTrigger(adjusted);

      this._updateAdjustedPrices(adjusted);
      this._updateExtendedPrice();
    },
    onAdjustedPriceChange: function onAdjustedPriceChange() {
      var price = parseFloat(this.fields.Price.getValue()) || 0;
      var adjusted = parseFloat(this.fields.CalculatedPrice.getValue()) || 0;

      var discount = this._calculateDiscount(price, adjusted);
      this.fields.Discount.setValueNoTrigger(discount);

      if (App.hasMultiCurrency()) {
        var myadjusted = this._getMyRate() * adjusted;
        this.fields.CalculatedPriceMine.setValueNoTrigger(myadjusted);
      }
      this._updateExtendedPrice();
    },
    onAdjustedPriceMineChange: function onAdjustedPriceMineChange() {
      var myadjusted = this.fields.CalculatedPriceMine.getValue();
      var price = this.fields.Price.getValue() || 0;

      var myrate = this._getMyRate();
      var myprice = price * myrate; // get the price in the users exchange rate

      var discount = this._calculateDiscount(myprice, myadjusted);
      this.fields.Discount.setValueNoTrigger(discount);

      var adjusted = this._calculateAdjustedPrice(price, discount);
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
      var discount = void 0;
      if (price === 0) {
        discount = 0.0;
      } else {
        discount = (1 - adjusted / price) * 100;
      }
      return discount;
    },
    _calculateAdjustedPrice: function _calculateAdjustedPrice(price, discount) {
      var adjusted = void 0;
      if (discount === 0) {
        adjusted = price;
      } else {
        adjusted = price - price * (discount / 100);
      }
      return adjusted;
    },
    _updateAdjustedPrices: function _updateAdjustedPrices(adjusted) {
      var myadjusted = void 0;
      this.fields.CalculatedPrice.setValueNoTrigger(adjusted);
      if (App.hasMultiCurrency()) {
        myadjusted = this._getMyRate() * adjusted;
        this.fields.CalculatedPriceMine.setValueNoTrigger(myadjusted);
      }
    },
    _updateExtendedPrice: function _updateExtendedPrice() {
      var quantity = parseFloat(this.fields.Quantity.getValue()) || 0;
      var adjusted = parseFloat(this.fields.CalculatedPrice.getValue()) || 0;
      var extended = adjusted * quantity;
      this.fields.ExtendedPrice.setValueNoTrigger(extended);
    },
    onUpdateCompleted: function onUpdateCompleted() {
      this._refreshOpportunityViews();
      this.inherited(arguments);
    },
    onInsertCompleted: function onInsertCompleted() {
      this._refreshOpportunityViews();
      this.inherited(arguments);
    },
    _refreshOpportunityViews: function _refreshOpportunityViews() {
      var views = [App.getView('opportunityproduct_related'), App.getView('opportunity_detail'), App.getView('opportunity_list')];

      views.forEach(function (view) {
        if (view) {
          view.refreshRequired = true;
        }
      });
    },
    createLayout: function createLayout() {
      var details = {
        title: this.detailsText,
        name: 'OpportunityProductDetailsEdit',
        children: [{
          label: this.opportunityText,
          name: 'Opportunity',
          property: 'Opportunity',
          type: 'lookup',
          textProperty: 'Description',
          view: 'opportunity_related',
          validator: _Validator2.default.exists
        }, {
          name: 'ProductId',
          property: 'ProductId',
          type: 'hidden'
        }, {
          label: this.productText,
          name: 'Product',
          property: 'Product',
          type: 'lookup',
          textProperty: 'Name',
          view: 'product_related',
          validator: _Validator2.default.exists
        }, {
          label: this.productFamilyText,
          name: 'Product.Family',
          property: 'Product.Family',
          type: 'text',
          readonly: true
        }, {
          label: this.priceLevelText,
          name: 'Program',
          property: 'Program',
          textProperty: 'Program',
          type: 'lookup',
          view: 'productprogram_related',
          validator: _Validator2.default.exists,
          where: function where() {
            var val = this.fields.Product.getValue();
            return 'Product.Name eq "' + _Utility2.default.escapeSearchQuery(val.Name) + '"';
          }.bindDelegate(this)
        }, {
          label: App.hasMultiCurrency() ? this.basePriceText : this.priceText,
          name: 'Price',
          property: 'Price',
          type: 'multiCurrency',
          readonly: true
        }, {
          label: this.discountText,
          name: 'Discount',
          property: 'Discount',
          type: 'decimal',
          notificationTrigger: 'blur'
        }, {
          label: this.quantityText,
          name: 'Quantity',
          property: 'Quantity',
          type: 'decimal',
          notificationTrigger: 'blur'
        }]
      };

      if (!App.hasMultiCurrency()) {
        details.children.push({
          label: this.adjustedPriceText,
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          type: 'multiCurrency',
          notificationTrigger: 'blur'
        });
        details.children.push({
          label: this.extendedPriceText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          type: 'multiCurrency',
          readonly: true
        });
      }

      var extendedPrice = {
        title: this.extendedPriceSectionText,
        name: 'OpportunityProductExtendedPriceEdit',
        children: [{
          label: this.baseExtendedPriceText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          type: 'multiCurrency',
          readonly: true
        }]
      };

      var adjustedPrice = {
        title: this.adjustedPriceSectionText,
        name: 'OpportunityProductAdjustedPriceEdit',
        children: [{
          label: this.baseAdjustedPriceText,
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          type: 'multiCurrency',
          notificationTrigger: 'blur'
        }, {
          label: this.myAdjustedPriceText,
          name: 'CalculatedPriceMine',
          property: 'CalculatedPriceMine',
          type: App.hasMultiCurrency() ? 'multiCurrency' : 'hidden',
          notificationTrigger: 'blur'
        }]
      };

      var layout = this.layout || (this.layout = []);

      if (layout.length > 0) {
        return layout;
      }

      layout.push(details);

      if (App.hasMultiCurrency()) {
        layout.push(adjustedPrice);
        layout.push(extendedPrice);
      }
      return layout;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eVByb2R1Y3QvRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJkZXRhaWxzVGV4dCIsIm9wcG9ydHVuaXR5VGV4dCIsInByb2R1Y3RUZXh0IiwicHJvZHVjdEZhbWlseVRleHQiLCJwcmljZUxldmVsVGV4dCIsInByaWNlVGV4dCIsImJhc2VQcmljZVRleHQiLCJkaXNjb3VudFRleHQiLCJhZGp1c3RlZFByaWNlVGV4dCIsIm15QWRqdXN0ZWRQcmljZVRleHQiLCJiYXNlQWRqdXN0ZWRQcmljZVRleHQiLCJxdWFudGl0eVRleHQiLCJiYXNlRXh0ZW5kZWRQcmljZVRleHQiLCJleHRlbmRlZFByaWNlVGV4dCIsImV4dGVuZGVkUHJpY2VTZWN0aW9uVGV4dCIsImFkanVzdGVkUHJpY2VTZWN0aW9uVGV4dCIsImVudGl0eU5hbWUiLCJpZCIsInJlc291cmNlS2luZCIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiUHJvZHVjdCIsIm9uUHJvZHVjdENoYW5nZSIsIlByb2dyYW0iLCJvblByb2dyYW1DaGFuZ2UiLCJEaXNjb3VudCIsIm9uRGlzY291bnRDaGFuZ2UiLCJDYWxjdWxhdGVkUHJpY2UiLCJvbkFkanVzdGVkUHJpY2VDaGFuZ2UiLCJDYWxjdWxhdGVkUHJpY2VNaW5lIiwib25BZGp1c3RlZFByaWNlTWluZUNoYW5nZSIsIlF1YW50aXR5Iiwib25RdWFudGl0eUNoYW5nZSIsInNldFZhbHVlcyIsInZhbHVlcyIsInNldFZhbHVlIiwiJGtleSIsIm15Q29kZSIsIkFwcCIsImdldE15RXhjaGFuZ2VSYXRlIiwiY29kZSIsImJhc2VDb2RlIiwiZ2V0QmFzZUV4Y2hhbmdlUmF0ZSIsIlByaWNlIiwic2V0Q3VycmVuY3lDb2RlIiwiaGFzTXVsdGlDdXJyZW5jeSIsInNldFZhbHVlTm9UcmlnZ2VyIiwiX2dldE15UmF0ZSIsIkV4dGVuZGVkUHJpY2UiLCJfdXBkYXRlRXh0ZW5kZWRQcmljZSIsIkZhbWlseSIsIl9lbmFibGVVSSIsImVuYWJsZSIsImRpc2FibGUiLCJyYXRlIiwiZ2V0VmFsdWVzIiwibyIsIkFkanVzdGVkUHJpY2UiLCJhcHBseUNvbnRleHQiLCJlbnRyeSIsIm9wdGlvbnMiLCJzZWxlY3RlZEVudHJ5IiwiT3Bwb3J0dW5pdHkiLCJ2YWx1ZSIsImZpZWxkIiwic2VsZWN0aW9uIiwiY3VycmVudFNlbGVjdGlvbiIsIlByb2R1Y3RJZCIsImtleSIsImNsZWFyVmFsdWUiLCJwcmljZSIsInBhcnNlRmxvYXQiLCJnZXRWYWx1ZSIsImRpc2NvdW50IiwiYWRqdXN0ZWQiLCJfY2FsY3VsYXRlQWRqdXN0ZWRQcmljZSIsIl91cGRhdGVBZGp1c3RlZFByaWNlcyIsIl9jYWxjdWxhdGVEaXNjb3VudCIsIm15YWRqdXN0ZWQiLCJteXJhdGUiLCJteXByaWNlIiwiaXNOYU4iLCJxdWFudGl0eSIsImV4dGVuZGVkIiwib25VcGRhdGVDb21wbGV0ZWQiLCJfcmVmcmVzaE9wcG9ydHVuaXR5Vmlld3MiLCJvbkluc2VydENvbXBsZXRlZCIsInZpZXdzIiwiZ2V0VmlldyIsImZvckVhY2giLCJ2aWV3IiwicmVmcmVzaFJlcXVpcmVkIiwiY3JlYXRlTGF5b3V0IiwiZGV0YWlscyIsInRpdGxlIiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJwcm9wZXJ0eSIsInR5cGUiLCJ0ZXh0UHJvcGVydHkiLCJ2YWxpZGF0b3IiLCJleGlzdHMiLCJyZWFkb25seSIsIndoZXJlIiwidmFsIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJOYW1lIiwiYmluZERlbGVnYXRlIiwibm90aWZpY2F0aW9uVHJpZ2dlciIsInB1c2giLCJleHRlbmRlZFByaWNlIiwiYWRqdXN0ZWRQcmljZSIsImxheW91dCIsImxlbmd0aCJdLCJtYXBwaW5n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dXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vLi4vVmFsaWRhdG9yJztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBVdGlsaXR5IGZyb20gJ2FyZ29zL1V0aWxpdHknO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eVByb2R1Y3RFZGl0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5PcHBvcnR1bml0eVByb2R1Y3QuRWRpdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uVmFsaWRhdG9yXHJcbiAqIEByZXF1aXJlcyBjcm0uVGVtcGxhdGVcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuT3Bwb3J0dW5pdHlQcm9kdWN0LkVkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBkZXRhaWxzVGV4dDogcmVzb3VyY2UuZGV0YWlsc1RleHQsXHJcbiAgb3Bwb3J0dW5pdHlUZXh0OiByZXNvdXJjZS5vcHBvcnR1bml0eVRleHQsXHJcbiAgcHJvZHVjdFRleHQ6IHJlc291cmNlLnByb2R1Y3RUZXh0LFxyXG4gIHByb2R1Y3RGYW1pbHlUZXh0OiByZXNvdXJjZS5wcm9kdWN0RmFtaWx5VGV4dCxcclxuICBwcmljZUxldmVsVGV4dDogcmVzb3VyY2UucHJpY2VMZXZlbFRleHQsXHJcbiAgcHJpY2VUZXh0OiByZXNvdXJjZS5wcmljZVRleHQsXHJcbiAgYmFzZVByaWNlVGV4dDogcmVzb3VyY2UuYmFzZVByaWNlVGV4dCxcclxuICBkaXNjb3VudFRleHQ6IHJlc291cmNlLmRpc2NvdW50VGV4dCxcclxuICBhZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UuYWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgbXlBZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UubXlBZGp1c3RlZFByaWNlVGV4dCxcclxuICBiYXNlQWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICBxdWFudGl0eVRleHQ6IHJlc291cmNlLnF1YW50aXR5VGV4dCxcclxuICBiYXNlRXh0ZW5kZWRQcmljZVRleHQ6IHJlc291cmNlLmJhc2VFeHRlbmRlZFByaWNlVGV4dCxcclxuICBleHRlbmRlZFByaWNlVGV4dDogcmVzb3VyY2UuZXh0ZW5kZWRQcmljZVRleHQsXHJcbiAgZXh0ZW5kZWRQcmljZVNlY3Rpb25UZXh0OiByZXNvdXJjZS5leHRlbmRlZFByaWNlU2VjdGlvblRleHQsXHJcbiAgYWRqdXN0ZWRQcmljZVNlY3Rpb25UZXh0OiByZXNvdXJjZS5hZGp1c3RlZFByaWNlU2VjdGlvblRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGVudGl0eU5hbWU6ICdPcHBvcnR1bml0eScsXHJcbiAgaWQ6ICdvcHBvcnR1bml0eXByb2R1Y3RfZWRpdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAnb3Bwb3J0dW5pdHlQcm9kdWN0cycsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9PcHBvcnR1bml0eS9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiAnRW50aXRpZXMvT3Bwb3J0dW5pdHkvRWRpdCcsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdPcHBvcnR1bml0eS9EZXNjcmlwdGlvbicsXHJcbiAgICAnUHJvZHVjdC9OYW1lJyxcclxuICAgICdQcm9kdWN0L0ZhbWlseScsXHJcbiAgICAnUHJvZ3JhbScsXHJcbiAgICAnUHJpY2UnLFxyXG4gICAgJ0Rpc2NvdW50JyxcclxuICAgICdBZGp1c3RlZFByaWNlJyxcclxuICAgICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgJ1F1YW50aXR5JyxcclxuICAgICdFeHRlbmRlZFByaWNlJyxcclxuICBdLFxyXG4gIHF1ZXJ5SW5jbHVkZTogW1xyXG4gICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgXSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5Qcm9kdWN0LCAnb25DaGFuZ2UnLCB0aGlzLm9uUHJvZHVjdENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuUHJvZ3JhbSwgJ29uQ2hhbmdlJywgdGhpcy5vblByb2dyYW1DaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkRpc2NvdW50LCAnb25DaGFuZ2UnLCB0aGlzLm9uRGlzY291bnRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZSwgJ29uQ2hhbmdlJywgdGhpcy5vbkFkanVzdGVkUHJpY2VDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZU1pbmUsICdvbkNoYW5nZScsIHRoaXMub25BZGp1c3RlZFByaWNlTWluZUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuUXVhbnRpdHksICdvbkNoYW5nZScsIHRoaXMub25RdWFudGl0eUNoYW5nZSk7XHJcbiAgfSxcclxuICBzZXRWYWx1ZXM6IGZ1bmN0aW9uIHNldFZhbHVlcyh2YWx1ZXMpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmZpZWxkcy5Qcm9ncmFtLnNldFZhbHVlKHtcclxuICAgICAgJGtleTogJycsXHJcbiAgICAgIFByb2dyYW06IHZhbHVlcy5Qcm9ncmFtLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHZhbHVlcy5EaXNjb3VudCA+IDApIHtcclxuICAgICAgLy8gdHJhbnNmb3JtIHRoZSBkaXNjb3VudCBpbnRvIGEgcGVyY2VudGFnZSBudW1iZXIgMC4xMCB0byAxMC4wMCVcclxuICAgICAgdGhpcy5maWVsZHMuRGlzY291bnQuc2V0VmFsdWUodmFsdWVzLkRpc2NvdW50ICogMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBteUNvZGUgPSBBcHAuZ2V0TXlFeGNoYW5nZVJhdGUoKS5jb2RlO1xyXG4gICAgY29uc3QgYmFzZUNvZGUgPSBBcHAuZ2V0QmFzZUV4Y2hhbmdlUmF0ZSgpLmNvZGU7XHJcbiAgICB0aGlzLmZpZWxkcy5QcmljZS5zZXRDdXJyZW5jeUNvZGUoYmFzZUNvZGUpO1xyXG4gICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlLnNldEN1cnJlbmN5Q29kZShiYXNlQ29kZSk7XHJcblxyXG4gICAgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlTWluZS5zZXRWYWx1ZU5vVHJpZ2dlcih0aGlzLl9nZXRNeVJhdGUoKSAqIHZhbHVlcy5DYWxjdWxhdGVkUHJpY2UpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5DYWxjdWxhdGVkUHJpY2VNaW5lLnNldEN1cnJlbmN5Q29kZShteUNvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRzLkV4dGVuZGVkUHJpY2Uuc2V0Q3VycmVuY3lDb2RlKGJhc2VDb2RlKTtcclxuICAgIHRoaXMuX3VwZGF0ZUV4dGVuZGVkUHJpY2UoKTtcclxuXHJcbiAgICBpZiAoKHZhbHVlcy5Qcm9kdWN0LkZhbWlseSAhPT0gbnVsbCkgJiYgKHZhbHVlcy5QcmljZSAhPT0gbnVsbCkpIHtcclxuICAgICAgdGhpcy5fZW5hYmxlVUkodHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9lbmFibGVVSShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfZW5hYmxlVUk6IGZ1bmN0aW9uIF9lbmFibGVVSShlbmFibGUpIHtcclxuICAgIGlmIChlbmFibGUpIHtcclxuICAgICAgdGhpcy5maWVsZHMuRGlzY291bnQuZW5hYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLlF1YW50aXR5LmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5DYWxjdWxhdGVkUHJpY2UuZW5hYmxlKCk7XHJcbiAgICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlTWluZS5lbmFibGUoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWVsZHMuRGlzY291bnQuZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5kaXNhYmxlKCk7XHJcbiAgICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlTWluZS5kaXNhYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIF9nZXRNeVJhdGU6IGZ1bmN0aW9uIF9nZXRNeVJhdGUoKSB7XHJcbiAgICByZXR1cm4gQXBwLmdldE15RXhjaGFuZ2VSYXRlKCkucmF0ZTtcclxuICB9LFxyXG4gIGdldFZhbHVlczogZnVuY3Rpb24gZ2V0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgbyA9IHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBvLlByb2dyYW0gPSBvLlByb2dyYW0uUHJvZ3JhbTtcclxuXHJcbiAgICAvKlxyXG4gICAgICogJ0FkanVzdGVkUHJpY2UnIGlzIGEgbGllLiBUaGUgdW5kZXJseWluZyBkYXRhYmFzZSBmaWVsZCBpcyBhY3R1YWxseSBQUklDRUFESlVTVEVEIGFuZFxyXG4gICAgICogaXMgYSBib29sZWFuLCBub3QgYSBwcmljZSB0aGF0IGhhcyBiZWVuIGFkanVzdGVkLiBTaW5jZSB3ZSB1c2UgdGhlIGFkanVzdGVkIHByaWNlIHRvIGNhbGN1bGF0ZVxyXG4gICAgICogdGhlIGRpc2NvdW50ICUsIHdlIHdpbGwgcmVtb3ZlIGl0IGZyb20gZ2V0VmFsdWVzIHNvIHdlIGFyZW4ndCB0cnlpbmcgdG8gc2F2ZSB0aGUgd3JvbmcgZGF0YSB0eXBlIHdoZW4gc2VuZGluZ1xyXG4gICAgICogdGhlIHNkYXRhIHJlcXVlc3QuXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZSBvLkFkanVzdGVkUHJpY2U7XHJcbiAgICBkZWxldGUgby5DYWxjdWxhdGVkUHJpY2VNaW5lO1xyXG4gICAgLy8gdHJhbnNmb3JtIHRoZSBkaXNjb3VudCBiYWNrIGludG8gYSBkZWNpbWFsXHJcbiAgICBvLkRpc2NvdW50ID0gby5EaXNjb3VudCAvIDEwMDtcclxuXHJcbiAgICByZXR1cm4gbztcclxuICB9LFxyXG4gIGFwcGx5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250ZXh0KCkge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnNlbGVjdGVkRW50cnk7XHJcblxyXG4gICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLk9wcG9ydHVuaXR5LnNldFZhbHVlKGVudHJ5KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUHJvZHVjdENoYW5nZTogZnVuY3Rpb24gb25Qcm9kdWN0Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZmllbGQgJiYgZmllbGQuY3VycmVudFNlbGVjdGlvbjtcclxuICAgIGlmIChzZWxlY3Rpb24pIHtcclxuICAgICAgdGhpcy5maWVsZHMuUHJvZHVjdElkLnNldFZhbHVlTm9UcmlnZ2VyKHZhbHVlLmtleSk7XHJcbiAgICAgIHRoaXMuZmllbGRzWydQcm9kdWN0LkZhbWlseSddLnNldFZhbHVlTm9UcmlnZ2VyKHNlbGVjdGlvbi5GYW1pbHkpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5Qcm9ncmFtLmNsZWFyVmFsdWUoKTtcclxuXHJcbiAgICAgIHRoaXMuZmllbGRzLlByaWNlLnNldFZhbHVlTm9UcmlnZ2VyKHNlbGVjdGlvbi5QcmljZSk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkRpc2NvdW50LmNsZWFyVmFsdWUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlLnNldFZhbHVlTm9UcmlnZ2VyKHNlbGVjdGlvbi5QcmljZSk7XHJcblxyXG4gICAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZU1pbmUuc2V0VmFsdWVOb1RyaWdnZXIodGhpcy5fZ2V0TXlSYXRlKCkgKiBzZWxlY3Rpb24uUHJpY2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZmllbGRzLlF1YW50aXR5LnNldFZhbHVlTm9UcmlnZ2VyKDEpO1xyXG4gICAgICB0aGlzLl91cGRhdGVFeHRlbmRlZFByaWNlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblByb2dyYW1DaGFuZ2U6IGZ1bmN0aW9uIG9uUHJvZ3JhbUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGZpZWxkICYmIGZpZWxkLmN1cnJlbnRTZWxlY3Rpb247XHJcbiAgICBpZiAoc2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlByaWNlLnNldFZhbHVlTm9UcmlnZ2VyKHNlbGVjdGlvbi5QcmljZSk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkRpc2NvdW50LmNsZWFyVmFsdWUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlLnNldFZhbHVlTm9UcmlnZ2VyKHNlbGVjdGlvbi5QcmljZSk7XHJcbiAgICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlTWluZS5zZXRWYWx1ZU5vVHJpZ2dlcih0aGlzLl9nZXRNeVJhdGUoKSAqIHNlbGVjdGlvbi5QcmljZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fdXBkYXRlRXh0ZW5kZWRQcmljZSgpO1xyXG4gICAgICB0aGlzLl9lbmFibGVVSSh0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uRGlzY291bnRDaGFuZ2U6IGZ1bmN0aW9uIG9uRGlzY291bnRDaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQodGhpcy5maWVsZHMuUHJpY2UuZ2V0VmFsdWUoKSkgfHwgMDtcclxuICAgIGNvbnN0IGRpc2NvdW50ID0gdGhpcy5maWVsZHMuRGlzY291bnQuZ2V0VmFsdWUoKTtcclxuXHJcbiAgICBjb25zdCBhZGp1c3RlZCA9IHRoaXMuX2NhbGN1bGF0ZUFkanVzdGVkUHJpY2UocHJpY2UsIGRpc2NvdW50KTtcclxuICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5zZXRWYWx1ZU5vVHJpZ2dlcihhZGp1c3RlZCk7XHJcblxyXG4gICAgdGhpcy5fdXBkYXRlQWRqdXN0ZWRQcmljZXMoYWRqdXN0ZWQpO1xyXG4gICAgdGhpcy5fdXBkYXRlRXh0ZW5kZWRQcmljZSgpO1xyXG4gIH0sXHJcbiAgb25BZGp1c3RlZFByaWNlQ2hhbmdlOiBmdW5jdGlvbiBvbkFkanVzdGVkUHJpY2VDaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQodGhpcy5maWVsZHMuUHJpY2UuZ2V0VmFsdWUoKSkgfHwgMDtcclxuICAgIGNvbnN0IGFkanVzdGVkID0gcGFyc2VGbG9hdCh0aGlzLmZpZWxkcy5DYWxjdWxhdGVkUHJpY2UuZ2V0VmFsdWUoKSkgfHwgMDtcclxuXHJcbiAgICBjb25zdCBkaXNjb3VudCA9IHRoaXMuX2NhbGN1bGF0ZURpc2NvdW50KHByaWNlLCBhZGp1c3RlZCk7XHJcbiAgICB0aGlzLmZpZWxkcy5EaXNjb3VudC5zZXRWYWx1ZU5vVHJpZ2dlcihkaXNjb3VudCk7XHJcblxyXG4gICAgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkpIHtcclxuICAgICAgY29uc3QgbXlhZGp1c3RlZCA9IHRoaXMuX2dldE15UmF0ZSgpICogYWRqdXN0ZWQ7XHJcbiAgICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZU1pbmUuc2V0VmFsdWVOb1RyaWdnZXIobXlhZGp1c3RlZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl91cGRhdGVFeHRlbmRlZFByaWNlKCk7XHJcbiAgfSxcclxuICBvbkFkanVzdGVkUHJpY2VNaW5lQ2hhbmdlOiBmdW5jdGlvbiBvbkFkanVzdGVkUHJpY2VNaW5lQ2hhbmdlKCkge1xyXG4gICAgY29uc3QgbXlhZGp1c3RlZCA9IHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZU1pbmUuZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IHByaWNlID0gdGhpcy5maWVsZHMuUHJpY2UuZ2V0VmFsdWUoKSB8fCAwO1xyXG5cclxuICAgIGNvbnN0IG15cmF0ZSA9IHRoaXMuX2dldE15UmF0ZSgpO1xyXG4gICAgY29uc3QgbXlwcmljZSA9IHByaWNlICogbXlyYXRlOyAvLyBnZXQgdGhlIHByaWNlIGluIHRoZSB1c2VycyBleGNoYW5nZSByYXRlXHJcblxyXG4gICAgY29uc3QgZGlzY291bnQgPSB0aGlzLl9jYWxjdWxhdGVEaXNjb3VudChteXByaWNlLCBteWFkanVzdGVkKTtcclxuICAgIHRoaXMuZmllbGRzLkRpc2NvdW50LnNldFZhbHVlTm9UcmlnZ2VyKGRpc2NvdW50KTtcclxuXHJcbiAgICBjb25zdCBhZGp1c3RlZCA9IHRoaXMuX2NhbGN1bGF0ZUFkanVzdGVkUHJpY2UocHJpY2UsIGRpc2NvdW50KTtcclxuICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5zZXRWYWx1ZU5vVHJpZ2dlcihhZGp1c3RlZCk7XHJcblxyXG4gICAgdGhpcy5fdXBkYXRlRXh0ZW5kZWRQcmljZSgpO1xyXG4gIH0sXHJcbiAgb25RdWFudGl0eUNoYW5nZTogZnVuY3Rpb24gb25RdWFudGl0eUNoYW5nZSh2YWx1ZSkge1xyXG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5zZXRWYWx1ZU5vVHJpZ2dlcigwKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3VwZGF0ZUV4dGVuZGVkUHJpY2UoKTtcclxuICB9LFxyXG4gIF9jYWxjdWxhdGVEaXNjb3VudDogZnVuY3Rpb24gX2NhbGN1bGF0ZURpc2NvdW50KHByaWNlLCBhZGp1c3RlZCkge1xyXG4gICAgbGV0IGRpc2NvdW50O1xyXG4gICAgaWYgKHByaWNlID09PSAwKSB7XHJcbiAgICAgIGRpc2NvdW50ID0gMC4wO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzY291bnQgPSAoMSAtIChhZGp1c3RlZCAvIHByaWNlKSkgKiAxMDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGlzY291bnQ7XHJcbiAgfSxcclxuICBfY2FsY3VsYXRlQWRqdXN0ZWRQcmljZTogZnVuY3Rpb24gX2NhbGN1bGF0ZUFkanVzdGVkUHJpY2UocHJpY2UsIGRpc2NvdW50KSB7XHJcbiAgICBsZXQgYWRqdXN0ZWQ7XHJcbiAgICBpZiAoZGlzY291bnQgPT09IDApIHtcclxuICAgICAgYWRqdXN0ZWQgPSBwcmljZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFkanVzdGVkID0gcHJpY2UgLSAocHJpY2UgKiAoZGlzY291bnQgLyAxMDApKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhZGp1c3RlZDtcclxuICB9LFxyXG4gIF91cGRhdGVBZGp1c3RlZFByaWNlczogZnVuY3Rpb24gX3VwZGF0ZUFkanVzdGVkUHJpY2VzKGFkanVzdGVkKSB7XHJcbiAgICBsZXQgbXlhZGp1c3RlZDtcclxuICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5zZXRWYWx1ZU5vVHJpZ2dlcihhZGp1c3RlZCk7XHJcbiAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICBteWFkanVzdGVkID0gdGhpcy5fZ2V0TXlSYXRlKCkgKiBhZGp1c3RlZDtcclxuICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlTWluZS5zZXRWYWx1ZU5vVHJpZ2dlcihteWFkanVzdGVkKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF91cGRhdGVFeHRlbmRlZFByaWNlOiBmdW5jdGlvbiBfdXBkYXRlRXh0ZW5kZWRQcmljZSgpIHtcclxuICAgIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VGbG9hdCh0aGlzLmZpZWxkcy5RdWFudGl0eS5nZXRWYWx1ZSgpKSB8fCAwO1xyXG4gICAgY29uc3QgYWRqdXN0ZWQgPSBwYXJzZUZsb2F0KHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5nZXRWYWx1ZSgpKSB8fCAwO1xyXG4gICAgY29uc3QgZXh0ZW5kZWQgPSBhZGp1c3RlZCAqIHF1YW50aXR5O1xyXG4gICAgdGhpcy5maWVsZHMuRXh0ZW5kZWRQcmljZS5zZXRWYWx1ZU5vVHJpZ2dlcihleHRlbmRlZCk7XHJcbiAgfSxcclxuICBvblVwZGF0ZUNvbXBsZXRlZDogZnVuY3Rpb24gb25VcGRhdGVDb21wbGV0ZWQoKSB7XHJcbiAgICB0aGlzLl9yZWZyZXNoT3Bwb3J0dW5pdHlWaWV3cygpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIG9uSW5zZXJ0Q29tcGxldGVkOiBmdW5jdGlvbiBvbkluc2VydENvbXBsZXRlZCgpIHtcclxuICAgIHRoaXMuX3JlZnJlc2hPcHBvcnR1bml0eVZpZXdzKCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgX3JlZnJlc2hPcHBvcnR1bml0eVZpZXdzOiBmdW5jdGlvbiBfcmVmcmVzaE9wcG9ydHVuaXR5Vmlld3MoKSB7XHJcbiAgICBjb25zdCB2aWV3cyA9IFtcclxuICAgICAgQXBwLmdldFZpZXcoJ29wcG9ydHVuaXR5cHJvZHVjdF9yZWxhdGVkJyksXHJcbiAgICAgIEFwcC5nZXRWaWV3KCdvcHBvcnR1bml0eV9kZXRhaWwnKSxcclxuICAgICAgQXBwLmdldFZpZXcoJ29wcG9ydHVuaXR5X2xpc3QnKSxcclxuICAgIF07XHJcblxyXG4gICAgdmlld3MuZm9yRWFjaCgodmlldykgPT4ge1xyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIHZpZXcucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIGNvbnN0IGRldGFpbHMgPSB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnT3Bwb3J0dW5pdHlQcm9kdWN0RGV0YWlsc0VkaXQnLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5vcHBvcnR1bml0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ09wcG9ydHVuaXR5JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgdmlldzogJ29wcG9ydHVuaXR5X3JlbGF0ZWQnLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0SWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJvZHVjdElkJyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb2R1Y3RUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Byb2R1Y3QnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ05hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdwcm9kdWN0X3JlbGF0ZWQnLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb2R1Y3RGYW1pbHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQcm9kdWN0LkZhbWlseScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0LkZhbWlseScsXHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJpY2VMZXZlbFRleHQsXHJcbiAgICAgICAgbmFtZTogJ1Byb2dyYW0nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJvZ3JhbScsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnUHJvZ3JhbScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdmlldzogJ3Byb2R1Y3Rwcm9ncmFtX3JlbGF0ZWQnLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgICB3aGVyZTogKGZ1bmN0aW9uIHdoZXJlKCkge1xyXG4gICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5maWVsZHMuUHJvZHVjdC5nZXRWYWx1ZSgpO1xyXG4gICAgICAgICAgcmV0dXJuIGBQcm9kdWN0Lk5hbWUgZXEgXCIke1V0aWxpdHkuZXNjYXBlU2VhcmNoUXVlcnkodmFsLk5hbWUpfVwiYDtcclxuICAgICAgICB9KS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogQXBwLmhhc011bHRpQ3VycmVuY3koKSA/IHRoaXMuYmFzZVByaWNlVGV4dCA6IHRoaXMucHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ211bHRpQ3VycmVuY3knLFxyXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZGlzY291bnRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdEaXNjb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEaXNjb3VudCcsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIG5vdGlmaWNhdGlvblRyaWdnZXI6ICdibHVyJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1YW50aXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnUXVhbnRpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVhbnRpdHknLFxyXG4gICAgICAgIHR5cGU6ICdkZWNpbWFsJyxcclxuICAgICAgICBub3RpZmljYXRpb25UcmlnZ2VyOiAnYmx1cicsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIUFwcC5oYXNNdWx0aUN1cnJlbmN5KCkpIHtcclxuICAgICAgZGV0YWlscy5jaGlsZHJlbi5wdXNoKHtcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ211bHRpQ3VycmVuY3knLFxyXG4gICAgICAgIG5vdGlmaWNhdGlvblRyaWdnZXI6ICdibHVyJyxcclxuICAgICAgfSk7XHJcbiAgICAgIGRldGFpbHMuY2hpbGRyZW4ucHVzaCh7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXh0ZW5kZWRQcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ211bHRpQ3VycmVuY3knLFxyXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBleHRlbmRlZFByaWNlID0ge1xyXG4gICAgICB0aXRsZTogdGhpcy5leHRlbmRlZFByaWNlU2VjdGlvblRleHQsXHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eVByb2R1Y3RFeHRlbmRlZFByaWNlRWRpdCcsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhc2VFeHRlbmRlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICB0eXBlOiAnbXVsdGlDdXJyZW5jeScsXHJcbiAgICAgICAgcmVhZG9ubHk6IHRydWUsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBhZGp1c3RlZFByaWNlID0ge1xyXG4gICAgICB0aXRsZTogdGhpcy5hZGp1c3RlZFByaWNlU2VjdGlvblRleHQsXHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eVByb2R1Y3RBZGp1c3RlZFByaWNlRWRpdCcsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmJhc2VBZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgdHlwZTogJ211bHRpQ3VycmVuY3knLFxyXG4gICAgICAgIG5vdGlmaWNhdGlvblRyaWdnZXI6ICdibHVyJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm15QWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NhbGN1bGF0ZWRQcmljZU1pbmUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2FsY3VsYXRlZFByaWNlTWluZScsXHJcbiAgICAgICAgdHlwZTogQXBwLmhhc011bHRpQ3VycmVuY3koKSA/ICdtdWx0aUN1cnJlbmN5JyA6ICdoaWRkZW4nLFxyXG4gICAgICAgIG5vdGlmaWNhdGlvblRyaWdnZXI6ICdibHVyJyxcclxuICAgICAgfV0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGxheW91dCA9IHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFtdKTtcclxuXHJcbiAgICBpZiAobGF5b3V0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGxheW91dDtcclxuICAgIH1cclxuXHJcbiAgICBsYXlvdXQucHVzaChkZXRhaWxzKTtcclxuXHJcbiAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICBsYXlvdXQucHVzaChhZGp1c3RlZFByaWNlKTtcclxuICAgICAgbGF5b3V0LnB1c2goZXh0ZW5kZWRQcmljZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19