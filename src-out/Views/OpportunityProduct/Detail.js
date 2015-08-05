define('crm/Views/OpportunityProduct/Detail', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dojo/_base/connect', 'dojo/_base/array', '../../Format', 'argos/Detail', 'argos/_LegacySDataDetailMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _dojo_baseConnect, _dojo_baseArray, _Format, _argosDetail, _argos_LegacySDataDetailMixin) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _connect = _interopRequireDefault(_dojo_baseConnect);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _format = _interopRequireDefault(_Format);

  var _Detail = _interopRequireDefault(_argosDetail);

  var _LegacySDataDetailMixin2 = _interopRequireDefault(_argos_LegacySDataDetailMixin);

  /**
   * @class crm.Views.OpportunityProduct.Detail
   *
   * @extends argos.Detail
   * @mixins argos._LegacySDataDetailMixin
   *
   * @requires crm.Format
   */
  var __class = (0, _declare['default'])('crm.Views.OpportunityProduct.Detail', [_Detail['default'], _LegacySDataDetailMixin2['default']], {
    // Localization
    detailsText: 'Details',
    opportunityText: 'opportunity',
    productText: 'product',
    productFamilyText: 'product family',
    priceLevelText: 'price level',
    priceText: 'price',
    basePriceText: 'base price',
    discountText: 'discount',
    quantityText: 'quantity',
    baseExtendedPriceText: 'base',
    extendedPriceText: 'extended price',
    extendedPriceSectionText: 'Extended Price',
    adjustedPriceSectionText: 'Adjusted Price',
    baseAdjustedPriceText: 'base',
    adjustedPriceText: 'adjusted price',
    myAdjustedPriceText: 'user',
    confirmDeleteText: 'Remove ${0} from the opportunity products?',
    removeOppProductTitleText: 'remove opportunity product',

    // View Properties
    id: 'opportunityproduct_detail',
    editView: 'opportunityproduct_edit',

    security: 'Entities/Opportunity/View',
    querySelect: ['Opportunity/Description', 'Product/Description', 'Product/Family', 'Product/Name', 'Product/Price', 'Product/Program', 'Product/FixedCost', 'AdjustedPrice', 'CalculatedPrice', 'Discount', 'ExtendedPrice', 'Price', 'Program', 'Quantity'],
    resourceKind: 'opportunityProducts',

    createEntryForDelete: function createEntryForDelete(e) {
      var entry = {
        '$key': e.$key,
        '$etag': e.$etag,
        '$name': e.$name
      };
      return entry;
    },
    removeOpportunityProduct: function removeOpportunityProduct() {
      var confirmMessage = _string['default'].substitute(this.confirmDeleteText, [this.entry.Product.Name]);

      if (!confirm(confirmMessage)) {
        // eslint-disable-line
        return;
      }

      var entry = this.createEntryForDelete(this.entry);
      var request = this.createRequest();

      if (request) {
        request['delete'](entry, {
          success: this.onDeleteSuccess,
          failure: this.onRequestDataFailure,
          scope: this
        });
      }
    },
    onDeleteSuccess: function onDeleteSuccess() {
      var views = [App.getView('opportunityproduct_related'), App.getView('opportunity_detail'), App.getView('opportunity_list')];

      _array['default'].forEach(views, function setViewRefresh(view) {
        if (view) {
          view.refreshRequired = true;
        }
      }, this);

      _connect['default'].publish('/app/refresh', [{
        resourceKind: this.resourceKind
      }]);
      ReUI.back();
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        'tbar': [{
          id: 'edit',
          cls: 'fa fa-pencil fa-lg',
          action: 'navigateToEditView',
          security: App.getViewSecurity(this.editView, 'update')
        }, {
          id: 'removeOpportunityProduct',
          cls: 'fa fa-times-circle fa-lg',
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
          renderer: (function renderPrice(val) {
            if (App.hasMultiCurrency()) {
              var exhangeRate = App.getBaseExchangeRate();
              var convertedValue = val * exhangeRate.rate;
              return _format['default'].multiCurrency.call(null, convertedValue, exhangeRate.code);
            }

            return _format['default'].currency.call(null, val);
          }).bindDelegate(this)
        }, {
          label: this.discountText,
          name: 'Discount',
          property: 'Discount',
          renderer: _format['default'].percent
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
          renderer: _format['default'].currency
        });
        details.children.push({
          label: this.extendedPriceText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          renderer: _format['default'].currency
        });
      }

      var extendedPrice = {
        title: this.extendedPriceSectionText,
        name: 'OpportunityProductExtendedPriceDetail',
        children: [{
          label: this.baseExtendedPriceText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          renderer: (function renderExtendedPrice(val) {
            if (App.hasMultiCurrency()) {
              var exchangeRate = App.getBaseExchangeRate();
              var convertedValue = val * exchangeRate.rate;
              return _format['default'].multiCurrency.call(null, convertedValue, exchangeRate.code);
            }

            return _format['default'].currency.call(null, val);
          }).bindDelegate(this)
        }]
      };

      var adjustedPrice = {
        title: this.adjustedPriceSectionText,
        name: 'OpportunityProductAdjustedPriceDetail',
        children: [{
          label: this.baseAdjustedPriceText,
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          renderer: (function renderCalculatedPrice(val) {
            if (App.hasMultiCurrency()) {
              var exhangeRate = App.getBaseExchangeRate();
              var convertedValue = val * exhangeRate.rate;
              return _format['default'].multiCurrency.call(null, convertedValue, exhangeRate.code);
            }

            return _format['default'].currency.call(null, val);
          }).bindDelegate(this)
        }, {
          label: this.myAdjustedPriceText,
          name: 'CalculatedPriceMine',
          property: 'CalculatedPrice',
          renderer: (function renderMyCalculatedPrice(val) {
            var exhangeRate = App.getMyExchangeRate();
            var convertedValue = val * exhangeRate.rate;
            return _format['default'].multiCurrency.call(null, convertedValue, exhangeRate.code);
          }).bindDelegate(this)
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

  _lang['default'].setObject('Mobile.SalesLogix.Views.OpportunityProduct.Detail', __class);
  module.exports = __class;
});
