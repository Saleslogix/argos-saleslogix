define('crm/Views/OpportunityProduct/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', 'dojo/_base/connect', '../../Format', 'argos/Detail', 'argos/_LegacySDataDetailMixin', 'argos/I18n'], function (module, exports, _declare, _string, _connect, _Format, _Detail, _LegacySDataDetailMixin2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _connect2 = _interopRequireDefault(_connect);

  var _Format2 = _interopRequireDefault(_Format);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _LegacySDataDetailMixin3 = _interopRequireDefault(_LegacySDataDetailMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('opportunityProductDetail');

  /**
   * @class crm.Views.OpportunityProduct.Detail
   *
   * @extends argos.Detail
   * @mixins argos._LegacySDataDetailMixin
   *
   * @requires crm.Format
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

  var __class = (0, _declare2.default)('crm.Views.OpportunityProduct.Detail', [_Detail2.default, _LegacySDataDetailMixin3.default], {
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
      var confirmMessage = _string2.default.substitute(this.confirmDeleteText, [this.entry.Product.Name]);

      if (!confirm(confirmMessage)) {
        // eslint-disable-line
        return;
      }

      var entry = this.createEntryForDelete(this.entry);
      var request = this.createRequest();

      if (request) {
        request.delete(entry, {
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

      _connect2.default.publish('/app/refresh', [{
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
              return _Format2.default.multiCurrency.call(null, convertedValue, exhangeRate.code);
            }

            return _Format2.default.currency.call(null, val);
          }.bindDelegate(this)
        }, {
          label: this.discountText,
          name: 'Discount',
          property: 'Discount',
          renderer: _Format2.default.percent
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
          renderer: _Format2.default.currency
        });
        details.children.push({
          label: this.extendedPriceText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          renderer: _Format2.default.currency
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
              return _Format2.default.multiCurrency.call(null, convertedValue, exchangeRate.code);
            }

            return _Format2.default.currency.call(null, val);
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
              return _Format2.default.multiCurrency.call(null, convertedValue, exhangeRate.code);
            }

            return _Format2.default.currency.call(null, val);
          }.bindDelegate(this)
        }, {
          label: this.myAdjustedPriceText,
          name: 'CalculatedPriceMine',
          property: 'CalculatedPrice',
          renderer: function renderMyCalculatedPrice(val) {
            var exhangeRate = App.getMyExchangeRate();
            var convertedValue = val * exhangeRate.rate;
            return _Format2.default.multiCurrency.call(null, convertedValue, exhangeRate.code);
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eVByb2R1Y3QvRGV0YWlsLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImRldGFpbHNUZXh0Iiwib3Bwb3J0dW5pdHlUZXh0IiwicHJvZHVjdFRleHQiLCJwcm9kdWN0RmFtaWx5VGV4dCIsInByaWNlTGV2ZWxUZXh0IiwicHJpY2VUZXh0IiwiYmFzZVByaWNlVGV4dCIsImRpc2NvdW50VGV4dCIsInF1YW50aXR5VGV4dCIsImJhc2VFeHRlbmRlZFByaWNlVGV4dCIsImV4dGVuZGVkUHJpY2VUZXh0IiwiZXh0ZW5kZWRQcmljZVNlY3Rpb25UZXh0IiwiYWRqdXN0ZWRQcmljZVNlY3Rpb25UZXh0IiwiYmFzZUFkanVzdGVkUHJpY2VUZXh0IiwiYWRqdXN0ZWRQcmljZVRleHQiLCJteUFkanVzdGVkUHJpY2VUZXh0IiwiY29uZmlybURlbGV0ZVRleHQiLCJyZW1vdmVPcHBQcm9kdWN0VGl0bGVUZXh0IiwiZW50aXR5VGV4dCIsImlkIiwiZWRpdFZpZXciLCJzZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicmVzb3VyY2VLaW5kIiwiY3JlYXRlRW50cnlGb3JEZWxldGUiLCJlIiwiZW50cnkiLCIka2V5IiwiJGV0YWciLCIkbmFtZSIsInJlbW92ZU9wcG9ydHVuaXR5UHJvZHVjdCIsImNvbmZpcm1NZXNzYWdlIiwic3Vic3RpdHV0ZSIsIlByb2R1Y3QiLCJOYW1lIiwiY29uZmlybSIsInJlcXVlc3QiLCJjcmVhdGVSZXF1ZXN0IiwiZGVsZXRlIiwic3VjY2VzcyIsIm9uRGVsZXRlU3VjY2VzcyIsImZhaWx1cmUiLCJvblJlcXVlc3REYXRhRmFpbHVyZSIsInNjb3BlIiwidmlld3MiLCJBcHAiLCJnZXRWaWV3IiwiZm9yRWFjaCIsInZpZXciLCJyZWZyZXNoUmVxdWlyZWQiLCJwdWJsaXNoIiwiUmVVSSIsImJhY2siLCJjcmVhdGVUb29sTGF5b3V0IiwidG9vbHMiLCJ0YmFyIiwidGl0bGUiLCJlZGl0VGV4dCIsInN2ZyIsImFjdGlvbiIsImdldFZpZXdTZWN1cml0eSIsImNyZWF0ZUxheW91dCIsImxheW91dCIsImxlbmd0aCIsImRldGFpbHMiLCJuYW1lIiwiY2hpbGRyZW4iLCJsYWJlbCIsInByb3BlcnR5IiwiaGFzTXVsdGlDdXJyZW5jeSIsInJlbmRlcmVyIiwicmVuZGVyUHJpY2UiLCJ2YWwiLCJleGhhbmdlUmF0ZSIsImdldEJhc2VFeGNoYW5nZVJhdGUiLCJjb252ZXJ0ZWRWYWx1ZSIsInJhdGUiLCJtdWx0aUN1cnJlbmN5IiwiY2FsbCIsImNvZGUiLCJjdXJyZW5jeSIsImJpbmREZWxlZ2F0ZSIsInBlcmNlbnQiLCJwdXNoIiwiZXh0ZW5kZWRQcmljZSIsInJlbmRlckV4dGVuZGVkUHJpY2UiLCJleGNoYW5nZVJhdGUiLCJhZGp1c3RlZFByaWNlIiwicmVuZGVyQ2FsY3VsYXRlZFByaWNlIiwicmVuZGVyTXlDYWxjdWxhdGVkUHJpY2UiLCJnZXRNeUV4Y2hhbmdlUmF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxXQUFXLG9CQUFZLDBCQUFaLENBQWpCOztBQUVBOzs7Ozs7OztBQXpCQTs7Ozs7Ozs7Ozs7Ozs7O0FBaUNBLE1BQU1DLFVBQVUsdUJBQVEscUNBQVIsRUFBK0Msb0RBQS9DLEVBQWtGO0FBQ2hHO0FBQ0FDLGlCQUFhRixTQUFTRSxXQUYwRTtBQUdoR0MscUJBQWlCSCxTQUFTRyxlQUhzRTtBQUloR0MsaUJBQWFKLFNBQVNJLFdBSjBFO0FBS2hHQyx1QkFBbUJMLFNBQVNLLGlCQUxvRTtBQU1oR0Msb0JBQWdCTixTQUFTTSxjQU51RTtBQU9oR0MsZUFBV1AsU0FBU08sU0FQNEU7QUFRaEdDLG1CQUFlUixTQUFTUSxhQVJ3RTtBQVNoR0Msa0JBQWNULFNBQVNTLFlBVHlFO0FBVWhHQyxrQkFBY1YsU0FBU1UsWUFWeUU7QUFXaEdDLDJCQUF1QlgsU0FBU1cscUJBWGdFO0FBWWhHQyx1QkFBbUJaLFNBQVNZLGlCQVpvRTtBQWFo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LElBQXJCLENBQTBCLElBQTFCLEVBQWdDSCxjQUFoQyxFQUFnREYsWUFBWU0sSUFBNUQsQ0FBUDtBQUNELFdBSlMsQ0FJUEUsWUFKTyxDQUlNLElBSk47QUFKVCxTQWJPO0FBSFUsT0FBdEI7O0FBNEJBbkIsZUFBUyxLQUFLQSxNQUFMLEtBQWdCLEtBQUtBLE1BQUwsR0FBYyxFQUE5QixDQUFUOztBQUVBLFVBQUlBLE9BQU9DLE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsZUFBT0QsTUFBUDtBQUNEOztBQUVEQSxhQUFPcUIsSUFBUCxDQUFZbkIsT0FBWjs7QUFFQSxVQUFJbkIsSUFBSXdCLGdCQUFKLEVBQUosRUFBNEI7QUFDMUJQLGVBQU9xQixJQUFQLENBQVlJLGFBQVo7QUFDQXpCLGVBQU9xQixJQUFQLENBQVlDLGFBQVo7QUFDRDtBQUNELGFBQU90QixNQUFQO0FBQ0Q7QUF2TytGLEdBQWxGLENBQWhCOztvQkEwT2UvRCxPIiwiZmlsZSI6IkRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgY29ubmVjdCBmcm9tICdkb2pvL19iYXNlL2Nvbm5lY3QnO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IF9MZWdhY3lTRGF0YURldGFpbE1peGluIGZyb20gJ2FyZ29zL19MZWdhY3lTRGF0YURldGFpbE1peGluJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb3Bwb3J0dW5pdHlQcm9kdWN0RGV0YWlsJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5PcHBvcnR1bml0eVByb2R1Y3QuRGV0YWlsXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkRldGFpbFxyXG4gKiBAbWl4aW5zIGFyZ29zLl9MZWdhY3lTRGF0YURldGFpbE1peGluXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLk9wcG9ydHVuaXR5UHJvZHVjdC5EZXRhaWwnLCBbRGV0YWlsLCBfTGVnYWN5U0RhdGFEZXRhaWxNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBkZXRhaWxzVGV4dDogcmVzb3VyY2UuZGV0YWlsc1RleHQsXHJcbiAgb3Bwb3J0dW5pdHlUZXh0OiByZXNvdXJjZS5vcHBvcnR1bml0eVRleHQsXHJcbiAgcHJvZHVjdFRleHQ6IHJlc291cmNlLnByb2R1Y3RUZXh0LFxyXG4gIHByb2R1Y3RGYW1pbHlUZXh0OiByZXNvdXJjZS5wcm9kdWN0RmFtaWx5VGV4dCxcclxuICBwcmljZUxldmVsVGV4dDogcmVzb3VyY2UucHJpY2VMZXZlbFRleHQsXHJcbiAgcHJpY2VUZXh0OiByZXNvdXJjZS5wcmljZVRleHQsXHJcbiAgYmFzZVByaWNlVGV4dDogcmVzb3VyY2UuYmFzZVByaWNlVGV4dCxcclxuICBkaXNjb3VudFRleHQ6IHJlc291cmNlLmRpc2NvdW50VGV4dCxcclxuICBxdWFudGl0eVRleHQ6IHJlc291cmNlLnF1YW50aXR5VGV4dCxcclxuICBiYXNlRXh0ZW5kZWRQcmljZVRleHQ6IHJlc291cmNlLmJhc2VFeHRlbmRlZFByaWNlVGV4dCxcclxuICBleHRlbmRlZFByaWNlVGV4dDogcmVzb3VyY2UuZXh0ZW5kZWRQcmljZVRleHQsXHJcbiAgZXh0ZW5kZWRQcmljZVNlY3Rpb25UZXh0OiByZXNvdXJjZS5leHRlbmRlZFByaWNlU2VjdGlvblRleHQsXHJcbiAgYWRqdXN0ZWRQcmljZVNlY3Rpb25UZXh0OiByZXNvdXJjZS5hZGp1c3RlZFByaWNlU2VjdGlvblRleHQsXHJcbiAgYmFzZUFkanVzdGVkUHJpY2VUZXh0OiByZXNvdXJjZS5iYXNlQWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgYWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLmFkanVzdGVkUHJpY2VUZXh0LFxyXG4gIG15QWRqdXN0ZWRQcmljZVRleHQ6IHJlc291cmNlLm15QWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgY29uZmlybURlbGV0ZVRleHQ6IHJlc291cmNlLmNvbmZpcm1EZWxldGVUZXh0LFxyXG4gIHJlbW92ZU9wcFByb2R1Y3RUaXRsZVRleHQ6IHJlc291cmNlLnJlbW92ZU9wcFByb2R1Y3RUaXRsZVRleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdvcHBvcnR1bml0eXByb2R1Y3RfZGV0YWlsJyxcclxuICBlZGl0VmlldzogJ29wcG9ydHVuaXR5cHJvZHVjdF9lZGl0JyxcclxuXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9PcHBvcnR1bml0eS9WaWV3JyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ09wcG9ydHVuaXR5L0Rlc2NyaXB0aW9uJyxcclxuICAgICdQcm9kdWN0L0Rlc2NyaXB0aW9uJyxcclxuICAgICdQcm9kdWN0L0ZhbWlseScsXHJcbiAgICAnUHJvZHVjdC9OYW1lJyxcclxuICAgICdQcm9kdWN0L1ByaWNlJyxcclxuICAgICdQcm9kdWN0L1Byb2dyYW0nLFxyXG4gICAgJ1Byb2R1Y3QvRml4ZWRDb3N0JyxcclxuICAgICdBZGp1c3RlZFByaWNlJyxcclxuICAgICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgJ0Rpc2NvdW50JyxcclxuICAgICdFeHRlbmRlZFByaWNlJyxcclxuICAgICdQcmljZScsXHJcbiAgICAnUHJvZ3JhbScsXHJcbiAgICAnUXVhbnRpdHknLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAnb3Bwb3J0dW5pdHlQcm9kdWN0cycsXHJcblxyXG4gIGNyZWF0ZUVudHJ5Rm9yRGVsZXRlOiBmdW5jdGlvbiBjcmVhdGVFbnRyeUZvckRlbGV0ZShlKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHtcclxuICAgICAgJGtleTogZS4ka2V5LFxyXG4gICAgICAkZXRhZzogZS4kZXRhZyxcclxuICAgICAgJG5hbWU6IGUuJG5hbWUsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGVudHJ5O1xyXG4gIH0sXHJcbiAgcmVtb3ZlT3Bwb3J0dW5pdHlQcm9kdWN0OiBmdW5jdGlvbiByZW1vdmVPcHBvcnR1bml0eVByb2R1Y3QoKSB7XHJcbiAgICBjb25zdCBjb25maXJtTWVzc2FnZSA9IHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuY29uZmlybURlbGV0ZVRleHQsIFt0aGlzLmVudHJ5LlByb2R1Y3QuTmFtZV0pO1xyXG5cclxuICAgIGlmICghY29uZmlybShjb25maXJtTWVzc2FnZSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmNyZWF0ZUVudHJ5Rm9yRGVsZXRlKHRoaXMuZW50cnkpO1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuY3JlYXRlUmVxdWVzdCgpO1xyXG5cclxuICAgIGlmIChyZXF1ZXN0KSB7XHJcbiAgICAgIHJlcXVlc3QuZGVsZXRlKGVudHJ5LCB7XHJcbiAgICAgICAgc3VjY2VzczogdGhpcy5vbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgICAgICAgZmFpbHVyZTogdGhpcy5vblJlcXVlc3REYXRhRmFpbHVyZSxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkRlbGV0ZVN1Y2Nlc3M6IGZ1bmN0aW9uIG9uRGVsZXRlU3VjY2VzcygpIHtcclxuICAgIGNvbnN0IHZpZXdzID0gW1xyXG4gICAgICBBcHAuZ2V0Vmlldygnb3Bwb3J0dW5pdHlwcm9kdWN0X3JlbGF0ZWQnKSxcclxuICAgICAgQXBwLmdldFZpZXcoJ29wcG9ydHVuaXR5X2RldGFpbCcpLFxyXG4gICAgICBBcHAuZ2V0Vmlldygnb3Bwb3J0dW5pdHlfbGlzdCcpLFxyXG4gICAgXTtcclxuXHJcbiAgICB2aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XHJcbiAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgdmlldy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25uZWN0LnB1Ymxpc2goJy9hcHAvcmVmcmVzaCcsIFt7XHJcbiAgICAgIHJlc291cmNlS2luZDogdGhpcy5yZXNvdXJjZUtpbmQsXHJcbiAgICB9XSk7XHJcbiAgICBSZVVJLmJhY2soKTtcclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgICAgdGJhcjogW3tcclxuICAgICAgICBpZDogJ2VkaXQnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmVkaXRUZXh0LFxyXG4gICAgICAgIHN2ZzogJ2VkaXQnLFxyXG4gICAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9FZGl0VmlldycsXHJcbiAgICAgICAgc2VjdXJpdHk6IEFwcC5nZXRWaWV3U2VjdXJpdHkodGhpcy5lZGl0VmlldywgJ3VwZGF0ZScpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgaWQ6ICdyZW1vdmVPcHBvcnR1bml0eVByb2R1Y3QnLFxyXG4gICAgICAgIHN2ZzogJ2Nsb3NlJyxcclxuICAgICAgICBhY3Rpb246ICdyZW1vdmVPcHBvcnR1bml0eVByb2R1Y3QnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnJlbW92ZU9wcFByb2R1Y3RUaXRsZVRleHQsXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIGxldCBsYXlvdXQgPSB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbXSk7XHJcblxyXG4gICAgaWYgKGxheW91dC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGV0YWlscyA9IHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnT3Bwb3J0dW5pdHkuRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3Bwb3J0dW5pdHkuRGVzY3JpcHRpb24nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJvZHVjdFRleHQsXHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3QuTmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdQcm9kdWN0Lk5hbWUnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJvZHVjdEZhbWlseVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1Byb2R1Y3QuRmFtaWx5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Byb2R1Y3QuRmFtaWx5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByaWNlTGV2ZWxUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdQcm9ncmFtJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Byb2dyYW0nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkgPyB0aGlzLmJhc2VQcmljZVRleHQgOiB0aGlzLnByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHJpY2UnLFxyXG4gICAgICAgIHJlbmRlcmVyOiAoZnVuY3Rpb24gcmVuZGVyUHJpY2UodmFsKSB7XHJcbiAgICAgICAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICAgICAgICBjb25zdCBleGhhbmdlUmF0ZSA9IEFwcC5nZXRCYXNlRXhjaGFuZ2VSYXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZFZhbHVlID0gdmFsICogZXhoYW5nZVJhdGUucmF0ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgY29udmVydGVkVmFsdWUsIGV4aGFuZ2VSYXRlLmNvZGUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiBmb3JtYXQuY3VycmVuY3kuY2FsbChudWxsLCB2YWwpO1xyXG4gICAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmRpc2NvdW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnRGlzY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGlzY291bnQnLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQucGVyY2VudCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnF1YW50aXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnUXVhbnRpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUXVhbnRpdHknLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgIGRldGFpbHMuY2hpbGRyZW4ucHVzaCh7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWRqdXN0ZWRQcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NhbGN1bGF0ZWRQcmljZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuY3VycmVuY3ksXHJcbiAgICAgIH0pO1xyXG4gICAgICBkZXRhaWxzLmNoaWxkcmVuLnB1c2goe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmV4dGVuZGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeHRlbmRlZFByaWNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuY3VycmVuY3ksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4dGVuZGVkUHJpY2UgPSB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmV4dGVuZGVkUHJpY2VTZWN0aW9uVGV4dCxcclxuICAgICAgbmFtZTogJ09wcG9ydHVuaXR5UHJvZHVjdEV4dGVuZGVkUHJpY2VEZXRhaWwnLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5iYXNlRXh0ZW5kZWRQcmljZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0V4dGVuZGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXh0ZW5kZWRQcmljZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IChmdW5jdGlvbiByZW5kZXJFeHRlbmRlZFByaWNlKHZhbCkge1xyXG4gICAgICAgICAgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkpIHtcclxuICAgICAgICAgICAgY29uc3QgZXhjaGFuZ2VSYXRlID0gQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKTtcclxuICAgICAgICAgICAgY29uc3QgY29udmVydGVkVmFsdWUgPSB2YWwgKiBleGNoYW5nZVJhdGUucmF0ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgY29udmVydGVkVmFsdWUsIGV4Y2hhbmdlUmF0ZS5jb2RlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gZm9ybWF0LmN1cnJlbmN5LmNhbGwobnVsbCwgdmFsKTtcclxuICAgICAgICB9KS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBhZGp1c3RlZFByaWNlID0ge1xyXG4gICAgICB0aXRsZTogdGhpcy5hZGp1c3RlZFByaWNlU2VjdGlvblRleHQsXHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eVByb2R1Y3RBZGp1c3RlZFByaWNlRGV0YWlsJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYmFzZUFkanVzdGVkUHJpY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2FsY3VsYXRlZFByaWNlJyxcclxuICAgICAgICByZW5kZXJlcjogKGZ1bmN0aW9uIHJlbmRlckNhbGN1bGF0ZWRQcmljZSh2YWwpIHtcclxuICAgICAgICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aGFuZ2VSYXRlID0gQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKTtcclxuICAgICAgICAgICAgY29uc3QgY29udmVydGVkVmFsdWUgPSB2YWwgKiBleGhhbmdlUmF0ZS5yYXRlO1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0Lm11bHRpQ3VycmVuY3kuY2FsbChudWxsLCBjb252ZXJ0ZWRWYWx1ZSwgZXhoYW5nZVJhdGUuY29kZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5jdXJyZW5jeS5jYWxsKG51bGwsIHZhbCk7XHJcbiAgICAgICAgfSkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubXlBZGp1c3RlZFByaWNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ2FsY3VsYXRlZFByaWNlTWluZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDYWxjdWxhdGVkUHJpY2UnLFxyXG4gICAgICAgIHJlbmRlcmVyOiAoZnVuY3Rpb24gcmVuZGVyTXlDYWxjdWxhdGVkUHJpY2UodmFsKSB7XHJcbiAgICAgICAgICBjb25zdCBleGhhbmdlUmF0ZSA9IEFwcC5nZXRNeUV4Y2hhbmdlUmF0ZSgpO1xyXG4gICAgICAgICAgY29uc3QgY29udmVydGVkVmFsdWUgPSB2YWwgKiBleGhhbmdlUmF0ZS5yYXRlO1xyXG4gICAgICAgICAgcmV0dXJuIGZvcm1hdC5tdWx0aUN1cnJlbmN5LmNhbGwobnVsbCwgY29udmVydGVkVmFsdWUsIGV4aGFuZ2VSYXRlLmNvZGUpO1xyXG4gICAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgfV0sXHJcbiAgICB9O1xyXG5cclxuICAgIGxheW91dCA9IHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFtdKTtcclxuXHJcbiAgICBpZiAobGF5b3V0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGxheW91dDtcclxuICAgIH1cclxuXHJcbiAgICBsYXlvdXQucHVzaChkZXRhaWxzKTtcclxuXHJcbiAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICBsYXlvdXQucHVzaChhZGp1c3RlZFByaWNlKTtcclxuICAgICAgbGF5b3V0LnB1c2goZXh0ZW5kZWRQcmljZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19