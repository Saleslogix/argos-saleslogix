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
      var o = this.inherited(getValues, arguments);
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
      this.inherited(onUpdateCompleted, arguments);
    },
    onInsertCompleted: function onInsertCompleted() {
      this._refreshOpportunityViews();
      this.inherited(onInsertCompleted, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eVByb2R1Y3QvRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJkZXRhaWxzVGV4dCIsIm9wcG9ydHVuaXR5VGV4dCIsInByb2R1Y3RUZXh0IiwicHJvZHVjdEZhbWlseVRleHQiLCJwcmljZUxldmVsVGV4dCIsInByaWNlVGV4dCIsImJhc2VQcmljZVRleHQiLCJkaXNjb3VudFRleHQiLCJhZGp1c3RlZFByaWNlVGV4dCIsIm15QWRqdXN0ZWRQcmljZVRleHQiLCJiYXNlQWRqdXN0ZWRQcmljZVRleHQiLCJxdWFudGl0eVRleHQiLCJiYXNlRXh0ZW5kZWRQcmljZVRleHQiLCJleHRlbmRlZFByaWNlVGV4dCIsImV4dGVuZGVkUHJpY2VTZWN0aW9uVGV4dCIsImFkanVzdGVkUHJpY2VTZWN0aW9uVGV4dCIsImVudGl0eU5hbWUiLCJpZCIsInJlc291cmNlS2luZCIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiUHJvZHVjdCIsIm9uUHJvZHVjdENoYW5nZSIsIlByb2dyYW0iLCJvblByb2dyYW1DaGFuZ2UiLCJEaXNjb3VudCIsIm9uRGlzY291bnRDaGFuZ2UiLCJDYWxjdWxhdGVkUHJpY2UiLCJvbkFkanVzdGVkUHJpY2VDaGFuZ2UiLCJDYWxjdWxhdGVkUHJpY2VNaW5lIiwib25BZGp1c3RlZFByaWNlTWluZUNoYW5nZSIsIlF1YW50aXR5Iiwib25RdWFudGl0eUNoYW5nZSIsInNldFZhbHVlcyIsInZhbHVlcyIsInNldFZhbHVlIiwiJGtleSIsIm15Q29kZSIsIkFwcCIsImdldE15RXhjaGFuZ2VSYXRlIiwiY29kZSIsImJhc2VDb2RlIiwiZ2V0QmFzZUV4Y2hhbmdlUmF0ZSIsIlByaWNlIiwic2V0Q3VycmVuY3lDb2RlIiwiaGFzTXVsdGlDdXJyZW5jeSIsInNldFZhbHVlTm9UcmlnZ2VyIiwiX2dldE15UmF0ZSIsIkV4dGVuZGVkUHJpY2UiLCJfdXBkYXRlRXh0ZW5kZWRQcmljZSIsIkZhbWlseSIsIl9lbmFibGVVSSIsImVuYWJsZSIsImRpc2FibGUiLCJyYXRlIiwiZ2V0VmFsdWVzIiwibyIsIkFkanVzdGVkUHJpY2UiLCJhcHBseUNvbnRleHQiLCJlbnRyeSIsIm9wdGlvbnMiLCJzZWxlY3RlZEVudHJ5IiwiT3Bwb3J0dW5pdHkiLCJ2YWx1ZSIsImZpZWxkIiwic2VsZWN0aW9uIiwiY3VycmVudFNlbGVjdGlvbiIsIlByb2R1Y3RJZCIsImtleSIsImNsZWFyVmFsdWUiLCJwcmljZSIsInBhcnNlRmxvYXQiLCJnZXRWYWx1ZSIsImRpc2NvdW50IiwiYWRqdXN0ZWQiLCJfY2FsY3VsYXRlQWRqdXN0ZWRQcmljZSIsIl91cGRhdGVBZGp1c3RlZFByaWNlcyIsIl9jYWxjdWxhdGVEaXNjb3VudCIsIm15YWRqdXN0ZWQiLCJteXJhdGUiLCJteXByaWNlIiwiaXNOYU4iLCJxdWFudGl0eSIsImV4dGVuZGVkIiwib25VcGRhdGVDb21wbGV0ZWQiLCJfcmVmcmVzaE9wcG9ydHVuaXR5Vmlld3MiLCJvbkluc2VydENvbXBsZXRlZCIsInZpZXdzIiwiZ2V0VmlldyIsImZvckVhY2giLCJ2aWV3IiwicmVmcmVzaFJlcXVpcmVkIiwiY3JlYXRlTGF5b3V0IiwiZGV0YWlscyIsInRpdGxlIiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJwcm9wZXJ0eSIsInR5cGUiLCJ0ZXh0UHJvcGVydHkiLCJ2YWxpZGF0b3IiLCJleGlzdHMiLCJyZWFkb25seSIsIndoZXJlIiwidmFsIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJOYW1lIiwiYmluZERlbGVnYXRlIiwibm90aWZpY2F0aW9uVHJpZ2dlciIsInB1c2giLCJleHRlbmRlZFByaWNlIiwiYWRqdXN0ZWRQcmljZSIsImxheW91dCIsImxlbmd0aCJdLCJtYXBwaW5n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O0FBQ0QsYUFBT0UsTUFBUDtBQUNEO0FBeFhrRSxHQUFyRCxDQUFoQjs7b0JBMlhlMUgsTyIsImZpbGUiOiJFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi8uLi9WYWxpZGF0b3InO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IFV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29wcG9ydHVuaXR5UHJvZHVjdEVkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9wcG9ydHVuaXR5UHJvZHVjdC5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLlV0aWxpdHlcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5WYWxpZGF0b3JcclxuICogQHJlcXVpcmVzIGNybS5UZW1wbGF0ZVxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5PcHBvcnR1bml0eVByb2R1Y3QuRWRpdCcsIFtFZGl0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGRldGFpbHNUZXh0OiByZXNvdXJjZS5kZXRhaWxzVGV4dCxcclxuICBvcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICBwcm9kdWN0VGV4dDogcmVzb3VyY2UucHJvZHVjdFRleHQsXHJcbiAgcHJvZHVjdEZhbWlseVRleHQ6IHJlc291cmNlLnByb2R1Y3RGYW1pbHlUZXh0LFxyXG4gIHByaWNlTGV2ZWxUZXh0OiByZXNvdXJjZS5wcmljZUxldmVsVGV4dCxcclxuICBwcmljZVRleHQ6IHJlc291cmNlLnByaWNlVGV4dCxcclxuICBiYXNlUHJpY2VUZXh0OiByZXNvdXJjZS5iYXNlUHJpY2VUZXh0LFxyXG4gIGRpc2NvdW50VGV4dDogcmVzb3VyY2UuZGlzY291bnRUZXh0LFxyXG4gIGFkanVzdGVkUHJpY2VUZXh0OiByZXNvdXJjZS5hZGp1c3RlZFByaWNlVGV4dCxcclxuICBteUFkanVzdGVkUHJpY2VUZXh0OiByZXNvdXJjZS5teUFkanVzdGVkUHJpY2VUZXh0LFxyXG4gIGJhc2VBZGp1c3RlZFByaWNlVGV4dDogcmVzb3VyY2UuYmFzZUFkanVzdGVkUHJpY2VUZXh0LFxyXG4gIHF1YW50aXR5VGV4dDogcmVzb3VyY2UucXVhbnRpdHlUZXh0LFxyXG4gIGJhc2VFeHRlbmRlZFByaWNlVGV4dDogcmVzb3VyY2UuYmFzZUV4dGVuZGVkUHJpY2VUZXh0LFxyXG4gIGV4dGVuZGVkUHJpY2VUZXh0OiByZXNvdXJjZS5leHRlbmRlZFByaWNlVGV4dCxcclxuICBleHRlbmRlZFByaWNlU2VjdGlvblRleHQ6IHJlc291cmNlLmV4dGVuZGVkUHJpY2VTZWN0aW9uVGV4dCxcclxuICBhZGp1c3RlZFByaWNlU2VjdGlvblRleHQ6IHJlc291cmNlLmFkanVzdGVkUHJpY2VTZWN0aW9uVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZW50aXR5TmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICBpZDogJ29wcG9ydHVuaXR5cHJvZHVjdF9lZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdvcHBvcnR1bml0eVByb2R1Y3RzJyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL09wcG9ydHVuaXR5L0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6ICdFbnRpdGllcy9PcHBvcnR1bml0eS9FZGl0JyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ09wcG9ydHVuaXR5L0Rlc2NyaXB0aW9uJyxcclxuICAgICdQcm9kdWN0L05hbWUnLFxyXG4gICAgJ1Byb2R1Y3QvRmFtaWx5JyxcclxuICAgICdQcm9ncmFtJyxcclxuICAgICdQcmljZScsXHJcbiAgICAnRGlzY291bnQnLFxyXG4gICAgJ0FkanVzdGVkUHJpY2UnLFxyXG4gICAgJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAnUXVhbnRpdHknLFxyXG4gICAgJ0V4dGVuZGVkUHJpY2UnLFxyXG4gIF0sXHJcbiAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAnJHBlcm1pc3Npb25zJyxcclxuICBdLFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlByb2R1Y3QsICdvbkNoYW5nZScsIHRoaXMub25Qcm9kdWN0Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5Qcm9ncmFtLCAnb25DaGFuZ2UnLCB0aGlzLm9uUHJvZ3JhbUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuRGlzY291bnQsICdvbkNoYW5nZScsIHRoaXMub25EaXNjb3VudENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlLCAnb25DaGFuZ2UnLCB0aGlzLm9uQWRqdXN0ZWRQcmljZUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlTWluZSwgJ29uQ2hhbmdlJywgdGhpcy5vbkFkanVzdGVkUHJpY2VNaW5lQ2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5RdWFudGl0eSwgJ29uQ2hhbmdlJywgdGhpcy5vblF1YW50aXR5Q2hhbmdlKTtcclxuICB9LFxyXG4gIHNldFZhbHVlczogZnVuY3Rpb24gc2V0VmFsdWVzKHZhbHVlcykge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoc2V0VmFsdWVzLCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5maWVsZHMuUHJvZ3JhbS5zZXRWYWx1ZSh7XHJcbiAgICAgICRrZXk6ICcnLFxyXG4gICAgICBQcm9ncmFtOiB2YWx1ZXMuUHJvZ3JhbSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh2YWx1ZXMuRGlzY291bnQgPiAwKSB7XHJcbiAgICAgIC8vIHRyYW5zZm9ybSB0aGUgZGlzY291bnQgaW50byBhIHBlcmNlbnRhZ2UgbnVtYmVyIDAuMTAgdG8gMTAuMDAlXHJcbiAgICAgIHRoaXMuZmllbGRzLkRpc2NvdW50LnNldFZhbHVlKHZhbHVlcy5EaXNjb3VudCAqIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbXlDb2RlID0gQXBwLmdldE15RXhjaGFuZ2VSYXRlKCkuY29kZTtcclxuICAgIGNvbnN0IGJhc2VDb2RlID0gQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKS5jb2RlO1xyXG4gICAgdGhpcy5maWVsZHMuUHJpY2Uuc2V0Q3VycmVuY3lDb2RlKGJhc2VDb2RlKTtcclxuICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5zZXRDdXJyZW5jeUNvZGUoYmFzZUNvZGUpO1xyXG5cclxuICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZU1pbmUuc2V0VmFsdWVOb1RyaWdnZXIodGhpcy5fZ2V0TXlSYXRlKCkgKiB2YWx1ZXMuQ2FsY3VsYXRlZFByaWNlKTtcclxuICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlTWluZS5zZXRDdXJyZW5jeUNvZGUobXlDb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpZWxkcy5FeHRlbmRlZFByaWNlLnNldEN1cnJlbmN5Q29kZShiYXNlQ29kZSk7XHJcbiAgICB0aGlzLl91cGRhdGVFeHRlbmRlZFByaWNlKCk7XHJcblxyXG4gICAgaWYgKCh2YWx1ZXMuUHJvZHVjdC5GYW1pbHkgIT09IG51bGwpICYmICh2YWx1ZXMuUHJpY2UgIT09IG51bGwpKSB7XHJcbiAgICAgIHRoaXMuX2VuYWJsZVVJKHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZW5hYmxlVUkoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2VuYWJsZVVJOiBmdW5jdGlvbiBfZW5hYmxlVUkoZW5hYmxlKSB7XHJcbiAgICBpZiAoZW5hYmxlKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkRpc2NvdW50LmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5lbmFibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlLmVuYWJsZSgpO1xyXG4gICAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZU1pbmUuZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkRpc2NvdW50LmRpc2FibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuUXVhbnRpdHkuZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5DYWxjdWxhdGVkUHJpY2UuZGlzYWJsZSgpO1xyXG4gICAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZU1pbmUuZGlzYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBfZ2V0TXlSYXRlOiBmdW5jdGlvbiBfZ2V0TXlSYXRlKCkge1xyXG4gICAgcmV0dXJuIEFwcC5nZXRNeUV4Y2hhbmdlUmF0ZSgpLnJhdGU7XHJcbiAgfSxcclxuICBnZXRWYWx1ZXM6IGZ1bmN0aW9uIGdldFZhbHVlcygpIHtcclxuICAgIGNvbnN0IG8gPSB0aGlzLmluaGVyaXRlZChnZXRWYWx1ZXMsIGFyZ3VtZW50cyk7XHJcbiAgICBvLlByb2dyYW0gPSBvLlByb2dyYW0uUHJvZ3JhbTtcclxuXHJcbiAgICAvKlxyXG4gICAgICogJ0FkanVzdGVkUHJpY2UnIGlzIGEgbGllLiBUaGUgdW5kZXJseWluZyBkYXRhYmFzZSBmaWVsZCBpcyBhY3R1YWxseSBQUklDRUFESlVTVEVEIGFuZFxyXG4gICAgICogaXMgYSBib29sZWFuLCBub3QgYSBwcmljZSB0aGF0IGhhcyBiZWVuIGFkanVzdGVkLiBTaW5jZSB3ZSB1c2UgdGhlIGFkanVzdGVkIHByaWNlIHRvIGNhbGN1bGF0ZVxyXG4gICAgICogdGhlIGRpc2NvdW50ICUsIHdlIHdpbGwgcmVtb3ZlIGl0IGZyb20gZ2V0VmFsdWVzIHNvIHdlIGFyZW4ndCB0cnlpbmcgdG8gc2F2ZSB0aGUgd3JvbmcgZGF0YSB0eXBlIHdoZW4gc2VuZGluZ1xyXG4gICAgICogdGhlIHNkYXRhIHJlcXVlc3QuXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZSBvLkFkanVzdGVkUHJpY2U7XHJcbiAgICBkZWxldGUgby5DYWxjdWxhdGVkUHJpY2VNaW5lO1xyXG4gICAgLy8gdHJhbnNmb3JtIHRoZSBkaXNjb3VudCBiYWNrIGludG8gYSBkZWNpbWFsXHJcbiAgICBvLkRpc2NvdW50ID0gby5EaXNjb3VudCAvIDEwMDtcclxuXHJcbiAgICByZXR1cm4gbztcclxuICB9LFxyXG4gIGFwcGx5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250ZXh0KCkge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnNlbGVjdGVkRW50cnk7XHJcblxyXG4gICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLk9wcG9ydHVuaXR5LnNldFZhbHVlKGVudHJ5KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUHJvZHVjdENoYW5nZTogZnVuY3Rpb24gb25Qcm9kdWN0Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZmllbGQgJiYgZmllbGQuY3VycmVudFNlbGVjdGlvbjtcclxuICAgIGlmIChzZWxlY3Rpb24pIHtcclxuICAgICAgdGhpcy5maWVsZHMuUHJvZHVjdElkLnNldFZhbHVlTm9UcmlnZ2VyKHZhbHVlLmtleSk7XHJcbiAgICAgIHRoaXMuZmllbGRzWydQcm9kdWN0LkZhbWlseSddLnNldFZhbHVlTm9UcmlnZ2VyKHNlbGVjdGlvbi5GYW1pbHkpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5Qcm9ncmFtLmNsZWFyVmFsdWUoKTtcclxuXHJcbiAgICAgIHRoaXMuZmllbGRzLlByaWNlLnNldFZhbHVlTm9UcmlnZ2VyKHNlbGVjdGlvbi5QcmljZSk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkRpc2NvdW50LmNsZWFyVmFsdWUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlLnNldFZhbHVlTm9UcmlnZ2VyKHNlbGVjdGlvbi5QcmljZSk7XHJcblxyXG4gICAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZU1pbmUuc2V0VmFsdWVOb1RyaWdnZXIodGhpcy5fZ2V0TXlSYXRlKCkgKiBzZWxlY3Rpb24uUHJpY2UpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZmllbGRzLlF1YW50aXR5LnNldFZhbHVlTm9UcmlnZ2VyKDEpO1xyXG4gICAgICB0aGlzLl91cGRhdGVFeHRlbmRlZFByaWNlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblByb2dyYW1DaGFuZ2U6IGZ1bmN0aW9uIG9uUHJvZ3JhbUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGZpZWxkICYmIGZpZWxkLmN1cnJlbnRTZWxlY3Rpb247XHJcbiAgICBpZiAoc2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLlByaWNlLnNldFZhbHVlTm9UcmlnZ2VyKHNlbGVjdGlvbi5QcmljZSk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkRpc2NvdW50LmNsZWFyVmFsdWUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlLnNldFZhbHVlTm9UcmlnZ2VyKHNlbGVjdGlvbi5QcmljZSk7XHJcbiAgICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlTWluZS5zZXRWYWx1ZU5vVHJpZ2dlcih0aGlzLl9nZXRNeVJhdGUoKSAqIHNlbGVjdGlvbi5QcmljZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fdXBkYXRlRXh0ZW5kZWRQcmljZSgpO1xyXG4gICAgICB0aGlzLl9lbmFibGVVSSh0cnVlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uRGlzY291bnRDaGFuZ2U6IGZ1bmN0aW9uIG9uRGlzY291bnRDaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQodGhpcy5maWVsZHMuUHJpY2UuZ2V0VmFsdWUoKSkgfHwgMDtcclxuICAgIGNvbnN0IGRpc2NvdW50ID0gdGhpcy5maWVsZHMuRGlzY291bnQuZ2V0VmFsdWUoKTtcclxuXHJcbiAgICBjb25zdCBhZGp1c3RlZCA9IHRoaXMuX2NhbGN1bGF0ZUFkanVzdGVkUHJpY2UocHJpY2UsIGRpc2NvdW50KTtcclxuICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5zZXRWYWx1ZU5vVHJpZ2dlcihhZGp1c3RlZCk7XHJcblxyXG4gICAgdGhpcy5fdXBkYXRlQWRqdXN0ZWRQcmljZXMoYWRqdXN0ZWQpO1xyXG4gICAgdGhpcy5fdXBkYXRlRXh0ZW5kZWRQcmljZSgpO1xyXG4gIH0sXHJcbiAgb25BZGp1c3RlZFByaWNlQ2hhbmdlOiBmdW5jdGlvbiBvbkFkanVzdGVkUHJpY2VDaGFuZ2UoKSB7XHJcbiAgICBjb25zdCBwcmljZSA9IHBhcnNlRmxvYXQodGhpcy5maWVsZHMuUHJpY2UuZ2V0VmFsdWUoKSkgfHwgMDtcclxuICAgIGNvbnN0IGFkanVzdGVkID0gcGFyc2VGbG9hdCh0aGlzLmZpZWxkcy5DYWxjdWxhdGVkUHJpY2UuZ2V0VmFsdWUoKSkgfHwgMDtcclxuXHJcbiAgICBjb25zdCBkaXNjb3VudCA9IHRoaXMuX2NhbGN1bGF0ZURpc2NvdW50KHByaWNlLCBhZGp1c3RlZCk7XHJcbiAgICB0aGlzLmZpZWxkcy5EaXNjb3VudC5zZXRWYWx1ZU5vVHJpZ2dlcihkaXNjb3VudCk7XHJcblxyXG4gICAgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkpIHtcclxuICAgICAgY29uc3QgbXlhZGp1c3RlZCA9IHRoaXMuX2dldE15UmF0ZSgpICogYWRqdXN0ZWQ7XHJcbiAgICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZU1pbmUuc2V0VmFsdWVOb1RyaWdnZXIobXlhZGp1c3RlZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl91cGRhdGVFeHRlbmRlZFByaWNlKCk7XHJcbiAgfSxcclxuICBvbkFkanVzdGVkUHJpY2VNaW5lQ2hhbmdlOiBmdW5jdGlvbiBvbkFkanVzdGVkUHJpY2VNaW5lQ2hhbmdlKCkge1xyXG4gICAgY29uc3QgbXlhZGp1c3RlZCA9IHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZU1pbmUuZ2V0VmFsdWUoKTtcclxuICAgIGNvbnN0IHByaWNlID0gdGhpcy5maWVsZHMuUHJpY2UuZ2V0VmFsdWUoKSB8fCAwO1xyXG5cclxuICAgIGNvbnN0IG15cmF0ZSA9IHRoaXMuX2dldE15UmF0ZSgpO1xyXG4gICAgY29uc3QgbXlwcmljZSA9IHByaWNlICogbXlyYXRlOyAvLyBnZXQgdGhlIHByaWNlIGluIHRoZSB1c2VycyBleGNoYW5nZSByYXRlXHJcblxyXG4gICAgY29uc3QgZGlzY291bnQgPSB0aGlzLl9jYWxjdWxhdGVEaXNjb3VudChteXByaWNlLCBteWFkanVzdGVkKTtcclxuICAgIHRoaXMuZmllbGRzLkRpc2NvdW50LnNldFZhbHVlTm9UcmlnZ2VyKGRpc2NvdW50KTtcclxuXHJcbiAgICBjb25zdCBhZGp1c3RlZCA9IHRoaXMuX2NhbGN1bGF0ZUFkanVzdGVkUHJpY2UocHJpY2UsIGRpc2NvdW50KTtcclxuICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5zZXRWYWx1ZU5vVHJpZ2dlcihhZGp1c3RlZCk7XHJcblxyXG4gICAgdGhpcy5fdXBkYXRlRXh0ZW5kZWRQcmljZSgpO1xyXG4gIH0sXHJcbiAgb25RdWFudGl0eUNoYW5nZTogZnVuY3Rpb24gb25RdWFudGl0eUNoYW5nZSh2YWx1ZSkge1xyXG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5RdWFudGl0eS5zZXRWYWx1ZU5vVHJpZ2dlcigwKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3VwZGF0ZUV4dGVuZGVkUHJpY2UoKTtcclxuICB9LFxyXG4gIF9jYWxjdWxhdGVEaXNjb3VudDogZnVuY3Rpb24gX2NhbGN1bGF0ZURpc2NvdW50KHByaWNlLCBhZGp1c3RlZCkge1xyXG4gICAgbGV0IGRpc2NvdW50O1xyXG4gICAgaWYgKHByaWNlID09PSAwKSB7XHJcbiAgICAgIGRpc2NvdW50ID0gMC4wO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzY291bnQgPSAoMSAtIChhZGp1c3RlZCAvIHByaWNlKSkgKiAxMDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGlzY291bnQ7XHJcbiAgfSxcclxuICBfY2FsY3VsYXRlQWRqdXN0ZWRQcmljZTogZnVuY3Rpb24gX2NhbGN1bGF0ZUFkanVzdGVkUHJpY2UocHJpY2UsIGRpc2NvdW50KSB7XHJcbiAgICBsZXQgYWRqdXN0ZWQ7XHJcbiAgICBpZiAoZGlzY291bnQgPT09IDApIHtcclxuICAgICAgYWRqdXN0ZWQgPSBwcmljZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFkanVzdGVkID0gcHJpY2UgLSAocHJpY2UgKiAoZGlzY291bnQgLyAxMDApKTtcclxuICAgIH1cclxuICAgIHJldHVybiBhZGp1c3RlZDtcclxuICB9LFxyXG4gIF91cGRhdGVBZGp1c3RlZFByaWNlczogZnVuY3Rpb24gX3VwZGF0ZUFkanVzdGVkUHJpY2VzKGFkanVzdGVkKSB7XHJcbiAgICBsZXQgbXlhZGp1c3RlZDtcclxuICAgIHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5zZXRWYWx1ZU5vVHJpZ2dlcihhZGp1c3RlZCk7XHJcbiAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICBteWFkanVzdGVkID0gdGhpcy5fZ2V0TXlSYXRlKCkgKiBhZGp1c3RlZDtcclxuICAgICAgdGhpcy5maWVsZHMuQ2FsY3VsYXRlZFByaWNlTWluZS5zZXRWYWx1ZU5vVHJpZ2dlcihteWFkanVzdGVkKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF91cGRhdGVFeHRlbmRlZFByaWNlOiBmdW5jdGlvbiBfdXBkYXRlRXh0ZW5kZWRQcmljZSgpIHtcclxuICAgIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VGbG9hdCh0aGlzLmZpZWxkcy5RdWFudGl0eS5nZXRWYWx1ZSgpKSB8fCAwO1xyXG4gICAgY29uc3QgYWRqdXN0ZWQgPSBwYXJzZUZsb2F0KHRoaXMuZmllbGRzLkNhbGN1bGF0ZWRQcmljZS5nZXRWYWx1ZSgpKSB8fCAwO1xyXG4gICAgY29uc3QgZXh0ZW5kZWQgPSBhZGp1c3RlZCAqIHF1YW50aXR5O1xyXG4gICAgdGhpcy5maWVsZHMuRXh0ZW5kZWRQcmljZS5zZXRWYWx1ZU5vVHJpZ2dlcihleHRlbmRlZCk7XHJcbiAgfSxcclxuICBvblVwZGF0ZUNvbXBsZXRlZDogZnVuY3Rpb24gb25VcGRhdGVDb21wbGV0ZWQoKSB7XHJcbiAgICB0aGlzLl9yZWZyZXNoT3Bwb3J0dW5pdHlWaWV3cygpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQob25VcGRhdGVDb21wbGV0ZWQsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBvbkluc2VydENvbXBsZXRlZDogZnVuY3Rpb24gb25JbnNlcnRDb21wbGV0ZWQoKSB7XHJcbiAgICB0aGlzLl9yZWZyZXNoT3Bwb3J0dW5pdHlWaWV3cygpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQob25JbnNlcnRDb21wbGV0ZWQsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfcmVmcmVzaE9wcG9ydHVuaXR5Vmlld3M6IGZ1bmN0aW9uIF9yZWZyZXNoT3Bwb3J0dW5pdHlWaWV3cygpIHtcclxuICAgIGNvbnN0IHZpZXdzID0gW1xyXG4gICAgICBBcHAuZ2V0Vmlldygnb3Bwb3J0dW5pdHlwcm9kdWN0X3JlbGF0ZWQnKSxcclxuICAgICAgQXBwLmdldFZpZXcoJ29wcG9ydHVuaXR5X2RldGFpbCcpLFxyXG4gICAgICBBcHAuZ2V0Vmlldygnb3Bwb3J0dW5pdHlfbGlzdCcpLFxyXG4gICAgXTtcclxuXHJcbiAgICB2aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XHJcbiAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgdmlldy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgY29uc3QgZGV0YWlscyA9IHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eVByb2R1Y3REZXRhaWxzRWRpdCcsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnT3Bwb3J0dW5pdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3Bwb3J0dW5pdHknLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICB2aWV3OiAnb3Bwb3J0dW5pdHlfcmVsYXRlZCcsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3RJZCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0SWQnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJvZHVjdFRleHQsXHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJvZHVjdCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnTmFtZScsXHJcbiAgICAgICAgdmlldzogJ3Byb2R1Y3RfcmVsYXRlZCcsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJvZHVjdEZhbWlseVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3QuRmFtaWx5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Byb2R1Y3QuRmFtaWx5JyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgcmVhZG9ubHk6IHRydWUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wcmljZUxldmVsVGV4dCxcclxuICAgICAgICBuYW1lOiAnUHJvZ3JhbScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9ncmFtJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdQcm9ncmFtJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB2aWV3OiAncHJvZHVjdHByb2dyYW1fcmVsYXRlZCcsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICAgIHdoZXJlOiAoZnVuY3Rpb24gd2hlcmUoKSB7XHJcbiAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmZpZWxkcy5Qcm9kdWN0LmdldFZhbHVlKCk7XHJcbiAgICAgICAgICByZXR1cm4gYFByb2R1Y3QuTmFtZSBlcSBcIiR7VXRpbGl0eS5lc2NhcGVTZWFyY2hRdWVyeSh2YWwuTmFtZSl9XCJgO1xyXG4gICAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiBBcHAuaGFzTXVsdGlDdXJyZW5jeSgpID8gdGhpcy5iYXNlUHJpY2VUZXh0IDogdGhpcy5wcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1ByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1ByaWNlJyxcclxuICAgICAgICB0eXBlOiAnbXVsdGlDdXJyZW5jeScsXHJcbiAgICAgICAgcmVhZG9ubHk6IHRydWUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5kaXNjb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Rpc2NvdW50JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rpc2NvdW50JyxcclxuICAgICAgICB0eXBlOiAnZGVjaW1hbCcsXHJcbiAgICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucXVhbnRpdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdRdWFudGl0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdRdWFudGl0eScsXHJcbiAgICAgICAgdHlwZTogJ2RlY2ltYWwnLFxyXG4gICAgICAgIG5vdGlmaWNhdGlvblRyaWdnZXI6ICdibHVyJyxcclxuICAgICAgfV0sXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICBkZXRhaWxzLmNoaWxkcmVuLnB1c2goe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkanVzdGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICB0eXBlOiAnbXVsdGlDdXJyZW5jeScsXHJcbiAgICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgICB9KTtcclxuICAgICAgZGV0YWlscy5jaGlsZHJlbi5wdXNoKHtcclxuICAgICAgICBsYWJlbDogdGhpcy5leHRlbmRlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICB0eXBlOiAnbXVsdGlDdXJyZW5jeScsXHJcbiAgICAgICAgcmVhZG9ubHk6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4dGVuZGVkUHJpY2UgPSB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmV4dGVuZGVkUHJpY2VTZWN0aW9uVGV4dCxcclxuICAgICAgbmFtZTogJ09wcG9ydHVuaXR5UHJvZHVjdEV4dGVuZGVkUHJpY2VFZGl0JyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZUV4dGVuZGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHR5cGU6ICdtdWx0aUN1cnJlbmN5JyxcclxuICAgICAgICByZWFkb25seTogdHJ1ZSxcclxuICAgICAgfV0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGFkanVzdGVkUHJpY2UgPSB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmFkanVzdGVkUHJpY2VTZWN0aW9uVGV4dCxcclxuICAgICAgbmFtZTogJ09wcG9ydHVuaXR5UHJvZHVjdEFkanVzdGVkUHJpY2VFZGl0JyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZUFkanVzdGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICB0eXBlOiAnbXVsdGlDdXJyZW5jeScsXHJcbiAgICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubXlBZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ2FsY3VsYXRlZFByaWNlTWluZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYWxjdWxhdGVkUHJpY2VNaW5lJyxcclxuICAgICAgICB0eXBlOiBBcHAuaGFzTXVsdGlDdXJyZW5jeSgpID8gJ211bHRpQ3VycmVuY3knIDogJ2hpZGRlbicsXHJcbiAgICAgICAgbm90aWZpY2F0aW9uVHJpZ2dlcjogJ2JsdXInLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW10pO1xyXG5cclxuICAgIGlmIChsYXlvdXQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbGF5b3V0O1xyXG4gICAgfVxyXG5cclxuICAgIGxheW91dC5wdXNoKGRldGFpbHMpO1xyXG5cclxuICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgIGxheW91dC5wdXNoKGFkanVzdGVkUHJpY2UpO1xyXG4gICAgICBsYXlvdXQucHVzaChleHRlbmRlZFByaWNlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYXlvdXQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=