define("crm/Integrations/BOE/Views/QuoteLines/List", ["exports", "dojo/_base/declare", "dojo/_base/lang", "argos/List", "crm/Action", "crm/Format", "crm/Views/_RightDrawerListMixin", "crm/Views/_MetricListMixin", "../../Models/Names", "argos/I18n", "../../Utility", "../Locations/QuoteItemAvailabilityList"], function (_exports, _declare, _lang, _List, _Action, _Format, _RightDrawerListMixin2, _MetricListMixin2, _Names, _I18n, _Utility, _QuoteItemAvailabilityList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _List = _interopRequireDefault(_List);
  _Action = _interopRequireDefault(_Action);
  _Format = _interopRequireDefault(_Format);
  _RightDrawerListMixin2 = _interopRequireDefault(_RightDrawerListMixin2);
  _MetricListMixin2 = _interopRequireDefault(_MetricListMixin2);
  _Names = _interopRequireDefault(_Names);
  _I18n = _interopRequireDefault(_I18n);
  _Utility = _interopRequireDefault(_Utility);
  _QuoteItemAvailabilityList = _interopRequireDefault(_QuoteItemAvailabilityList);

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
  var resource = (0, _I18n["default"])('quoteItemsList');

  var __class = (0, _declare["default"])('crm.Integrations.BOE.Views.QuoteLines.List', [_List["default"], _RightDrawerListMixin2["default"], _MetricListMixin2["default"]], {
    formatter: _Format["default"],
    util: _Utility["default"],
    // Localization
    titleText: resource.titleText,
    lineText: resource.lineText,
    quantityText: resource.quantityText,
    priceText: resource.priceText,
    adjustedPriceText: resource.adjustedPriceText,
    baseAdjustedPriceText: resource.baseAdjustedPriceText,
    baseAmountText: resource.baseAmountText,
    amountText: resource.amountText,
    productNameText: resource.productNameText,
    descriptionText: resource.descriptionText,
    accountingEntityRequiredText: resource.accountingEntityRequiredText,
    assignWarehouseText: resource.assignWarehouseText,
    warehousesTitleText: resource.warehouseTitleText,
    warehouseText: resource.warehouseText,
    totalAmountText: resource.totalAmountText,
    // Templates
    itemTemplate: new Simplate(['{% if ($.ErpLineNumber) { %}', '<p class="listview-heading"><label class="group-label">{%: $$.lineText %}</label> {%: $.ErpLineNumber %}</p>', '{% } %}', '{% if ($.SlxLocation) { %}', '<p class="micro-text"><label class="group-label">{%: $$.warehouseText %}</label> {%: $.SlxLocation.Description %}</p>', '{% } %}', '<p class="micro-text"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>', '<p class="micro-text"><label class="group-label">{%: $$.descriptionText %}</label> {%: $.Description %}</p>', '<p class="micro-text"> <label class="group-label">{%: $$.priceText %} </label>', '{%: $$.util.formatMultiCurrency($.Price, $.Quote.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.adjustedPriceText %}</label> ', '{%: $$.util.formatMultiCurrency($.DocCalculatedPrice, $.Quote.CurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.baseAdjustedPriceText %}</label> ', '{%: $$.util.formatMultiCurrency($.CalculatedPrice, $.Quote.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"><label class="group-label">{%: $$.quantityText %}</label> {%: $.Quantity %}</p>', '<p class="micro-text"> <label class="group-label">{%: $$.baseAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.ExtendedPrice, $.Quote.BaseCurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.amountText %}</label> ', '{%: $$.util.formatMultiCurrency($.DocExtendedPrice, $.Quote.CurrencyCode) %}', '</p>', '<p class="micro-text"> <label class="group-label">{%: $$.totalAmountText %}</label> ', '{%: $$.util.formatMultiCurrency($.DocTotalAmount, $.Quote.CurrencyCode) %}', '</p>']),
    // View Properties
    id: 'quote_lines_list',
    detailView: 'quote_line_detail',
    insertView: 'quote_line_edit',
    modelName: _Names["default"].QUOTEITEM,
    resourceKind: 'quoteItems',
    allowSelection: true,
    enableActions: true,
    security: 'Entities/Quote/View',
    insertSecurity: 'Entities/Quote/Add',
    // Card layout
    itemIconClass: 'bullet-list',
    // Metrics
    entityName: 'QuoteItem',
    readOnly: false,
    transitionTo: function transitionTo() {
      var entry = this.options && this.options.fromContext && this.options.fromContext.entry;

      if (entry && entry.IsClosed) {
        if (App.bars && App.bars.tbar) {
          App.bars.tbar.disableTool('new');
        }

        this.readOnly = entry.IsClosed;
      }

      this.inherited(transitionTo, arguments);
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'assignWarehouse',
        cls: 'warehouse',
        label: this.assignWarehouseText,
        enabled: function enabled(layoutAction, selection) {
          return App.warehouseDiscovery === 'auto' && _Action["default"].hasProperty(layoutAction, selection, 'Quote.ErpLogicalId');
        },
        action: 'assignWarehouseAction'
      }]);
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: [{
          id: 'new',
          svg: 'add',
          action: 'preNavigateToInsert',
          security: this.app.getViewSecurity(this.insertView, 'insert')
        }]
      });
    },
    preNavigateToInsert: function preNavigateToInsert() {
      var options = {};

      if (this.options && this.options.fromContext && this.options.fromContext.entry) {
        options = {
          context: {
            Quote: this.options.fromContext.entry
          }
        };
      }

      this.navigateToInsertView(options);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return "(upper(Description) like \"".concat(q, "%\") or (upper(ProductName) like \"").concat(q, "%\") or (upper(Quote.QuoteNumber) like \"").concat(q, "%\") or (upper(ErpLineNumber) like \"").concat(q, "%\")");
    },
    assignWarehouseAction: function assignWarehouseAction(theAction, selection) {
      var quote = this.options.fromContext.entry;
      var quoteItemKey = selection.tag.attributes['data-key'].value;
      var quoteItem = this.entries[quoteItemKey];

      if (quoteItem) {
        var view = this.getAvailabilityView();

        if (view) {
          var options = {
            quoteItem: quoteItem,
            quote: quote
          };
          this.refreshRequired = true;
          view.show(options);
        }
      }
    },
    getAvailabilityView: function getAvailabilityView() {
      var viewId = 'locations_quoteItemAvailabilityList';
      var view = App.getView(viewId);

      if (view) {
        return view;
      }

      App.registerView(new _QuoteItemAvailabilityList["default"]({
        id: viewId
      }));
      view = App.getView(viewId);
      return view;
    }
  });

  _lang["default"].setObject('icboe.Views.QuoteLines.List', __class);

  var _default = __class;
  _exports["default"] = _default;
});