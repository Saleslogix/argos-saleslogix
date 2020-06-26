define("crm/Views/OpportunityProduct/Detail", ["exports", "dojo/_base/declare", "dojo/string", "dojo/_base/connect", "../../Format", "argos/Detail", "argos/_LegacySDataDetailMixin", "argos/I18n"], function (_exports, _declare, _string, _connect, _Format, _Detail, _LegacySDataDetailMixin2, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _string = _interopRequireDefault(_string);
  _connect = _interopRequireDefault(_connect);
  _Format = _interopRequireDefault(_Format);
  _Detail = _interopRequireDefault(_Detail);
  _LegacySDataDetailMixin2 = _interopRequireDefault(_LegacySDataDetailMixin2);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('opportunityProductDetail');

  var __class = (0, _declare["default"])('crm.Views.OpportunityProduct.Detail', [_Detail["default"], _LegacySDataDetailMixin2["default"]], {
    // Localization
    detailsText: resource.detailsText,
    opportunityText: resource.opportunityText,
    productText: resource.productText,
    productFamilyText: resource.productFamilyText,
    priceLevelText: resource.priceLevelText,
    priceText: resource.priceText,
    basePriceText: resource.basePriceText,
    discountText: resource.discountText,
    quantityText: resource.quantityText,
    baseExtendedPriceText: resource.baseExtendedPriceText,
    extendedPriceText: resource.extendedPriceText,
    extendedPriceSectionText: resource.extendedPriceSectionText,
    adjustedPriceSectionText: resource.adjustedPriceSectionText,
    baseAdjustedPriceText: resource.baseAdjustedPriceText,
    adjustedPriceText: resource.adjustedPriceText,
    myAdjustedPriceText: resource.myAdjustedPriceText,
    confirmDeleteText: resource.confirmDeleteText,
    removeOppProductTitleText: resource.removeOppProductTitleText,
    entityText: resource.entityText,
    // View Properties
    id: 'opportunityproduct_detail',
    editView: 'opportunityproduct_edit',
    security: 'Entities/Opportunity/View',
    querySelect: ['Opportunity/Description', 'Product/Description', 'Product/Family', 'Product/Name', 'Product/Price', 'Product/Program', 'Product/FixedCost', 'AdjustedPrice', 'CalculatedPrice', 'Discount', 'ExtendedPrice', 'Price', 'Program', 'Quantity'],
    resourceKind: 'opportunityProducts',
    createEntryForDelete: function createEntryForDelete(e) {
      var entry = {
        $key: e.$key,
        $etag: e.$etag,
        $name: e.$name
      };
      return entry;
    },
    removeOpportunityProduct: function removeOpportunityProduct() {
      var confirmMessage = _string["default"].substitute(this.confirmDeleteText, [this.entry.Product.Name]);

      if (!confirm(confirmMessage)) {
        // eslint-disable-line
        return;
      }

      var entry = this.createEntryForDelete(this.entry);
      var request = this.createRequest();

      if (request) {
        request["delete"](entry, {
          success: this.onDeleteSuccess,
          failure: this.onRequestDataFailure,
          scope: this
        });
      }
    },
    onDeleteSuccess: function onDeleteSuccess() {
      var views = [App.getView('opportunityproduct_related'), App.getView('opportunity_detail'), App.getView('opportunity_list')];
      views.forEach(function (view) {
        if (view) {
          view.refreshRequired = true;
        }
      });

      _connect["default"].publish('/app/refresh', [{
        resourceKind: this.resourceKind
      }]);

      ReUI.back();
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: [{
          id: 'edit',
          title: this.editText,
          svg: 'edit',
          action: 'navigateToEditView',
          security: App.getViewSecurity(this.editView, 'update')
        }, {
          id: 'removeOpportunityProduct',
          svg: 'close',
          action: 'removeOpportunityProduct',
          title: this.removeOppProductTitleText
        }]
      });
    },
    createLayout: function createLayout() {
      var layout = this.layout || (this.layout = []);

      if (layout.length > 0) {
        return layout;
      }

      var details = {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.opportunityText,
          name: 'Opportunity.Description',
          property: 'Opportunity.Description'
        }, {
          label: this.productText,
          name: 'Product.Name',
          property: 'Product.Name'
        }, {
          label: this.productFamilyText,
          name: 'Product.Family',
          property: 'Product.Family'
        }, {
          label: this.priceLevelText,
          name: 'Program',
          property: 'Program'
        }, {
          label: App.hasMultiCurrency() ? this.basePriceText : this.priceText,
          name: 'Price',
          property: 'Price',
          renderer: function renderPrice(val) {
            if (App.hasMultiCurrency()) {
              var exhangeRate = App.getBaseExchangeRate();
              var convertedValue = val * exhangeRate.rate;
              return _Format["default"].multiCurrency.call(null, convertedValue, exhangeRate.code);
            }

            return _Format["default"].currency.call(null, val);
          }.bindDelegate(this)
        }, {
          label: this.discountText,
          name: 'Discount',
          property: 'Discount',
          renderer: _Format["default"].percent
        }, {
          label: this.quantityText,
          name: 'Quantity',
          property: 'Quantity'
        }]
      };

      if (!App.hasMultiCurrency()) {
        details.children.push({
          label: this.adjustedPriceText,
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          renderer: _Format["default"].currency
        });
        details.children.push({
          label: this.extendedPriceText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          renderer: _Format["default"].currency
        });
      }

      var extendedPrice = {
        title: this.extendedPriceSectionText,
        name: 'OpportunityProductExtendedPriceDetail',
        children: [{
          label: this.baseExtendedPriceText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          renderer: function renderExtendedPrice(val) {
            if (App.hasMultiCurrency()) {
              var exchangeRate = App.getBaseExchangeRate();
              var convertedValue = val * exchangeRate.rate;
              return _Format["default"].multiCurrency.call(null, convertedValue, exchangeRate.code);
            }

            return _Format["default"].currency.call(null, val);
          }.bindDelegate(this)
        }]
      };
      var adjustedPrice = {
        title: this.adjustedPriceSectionText,
        name: 'OpportunityProductAdjustedPriceDetail',
        children: [{
          label: this.baseAdjustedPriceText,
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          renderer: function renderCalculatedPrice(val) {
            if (App.hasMultiCurrency()) {
              var exhangeRate = App.getBaseExchangeRate();
              var convertedValue = val * exhangeRate.rate;
              return _Format["default"].multiCurrency.call(null, convertedValue, exhangeRate.code);
            }

            return _Format["default"].currency.call(null, val);
          }.bindDelegate(this)
        }, {
          label: this.myAdjustedPriceText,
          name: 'CalculatedPriceMine',
          property: 'CalculatedPrice',
          renderer: function renderMyCalculatedPrice(val) {
            var exhangeRate = App.getMyExchangeRate();
            var convertedValue = val * exhangeRate.rate;
            return _Format["default"].multiCurrency.call(null, convertedValue, exhangeRate.code);
          }.bindDelegate(this)
        }]
      };
      layout = this.layout || (this.layout = []);

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

  var _default = __class;
  _exports["default"] = _default;
});