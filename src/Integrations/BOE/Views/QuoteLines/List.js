import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import action from 'crm/Action';
import format from 'crm/Format';
import _CardLayoutListMixin from 'crm/Views/_CardLayoutListMixin';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';
import utility from '../../Utility';
import QuoteItemAvailabilityList from '../Locations/QuoteItemAvailabilityList';

const resource = getResource('quoteItemsList');

const __class = declare('crm.Integrations.BOE.Views.QuoteLines.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
  formatter: format,
  util: utility,
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
  itemTemplate: new Simplate([
    '{% if ($.ErpLineNumber) { %}',
    '<h3><label class="group-label">{%: $$.lineText %}</label> {%: $.ErpLineNumber %}</h3>',
    '{% } %}',
    '{% if ($.SlxLocation) { %}',
    '<h4><label class="group-label">{%: $$.warehouseText %}</label> {%: $.SlxLocation.Description %}</h4>',
    '{% } %}',
    '<h4><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</h4>',
    '<h4><label class="group-label">{%: $$.descriptionText %}</label> {%: $.Description %}</h4>',
    '<h4> <label class="group-label">{%: $$.priceText %} </label>',
    '{%: $$.util.formatMultiCurrency($.Price, $.Quote.BaseCurrencyCode) %}',
    '</h4>',
    '<h4> <label class="group-label">{%: $$.adjustedPriceText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.DocCalculatedPrice, $.Quote.CurrencyCode) %}',
    '</h4>',
    '<h4> <label class="group-label">{%: $$.baseAdjustedPriceText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.CalculatedPrice, $.Quote.BaseCurrencyCode) %}',
    '</h4>',
    '<h4><label class="group-label">{%: $$.quantityText %}</label> {%: $$.formatter.fixedLocale($.Quantity, 2) %}</h4>',
    '<h4> <label class="group-label">{%: $$.baseAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ExtendedPrice, $.Quote.BaseCurrencyCode) %}',
    '</h4>',
    '<h4> <label class="group-label">{%: $$.amountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.DocExtendedPrice, $.Quote.CurrencyCode) %}',
    '</h4>',
    '<h4> <label class="group-label">{%: $$.totalAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.DocTotalAmount, $.Quote.CurrencyCode) %}',
    '</h4>',

  ]),
  // View Properties
  id: 'quote_lines_list',
  detailView: 'quote_line_detail',
  insertView: 'quote_line_edit',
  modelName: MODEL_NAMES.QUOTEITEM,
  resourceKind: 'quoteItems',
  allowSelection: true,
  enableActions: true,
  security: 'Entities/Quote/View',
  insertSecurity: 'Entities/Quote/Add',

  // Card layout
  itemIconClass: 'fa fa-list-ul fa-2x',

  // Metrics
  entityName: 'QuoteItem',

  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'assignWarehouse',
      cls: 'fa fa-truck fa-2x',
      label: this.assignWarehouseText,
      enabled: (layoutAction, selection) => {
        return App.warehouseDiscovery === 'auto' &&
          action.hasProperty(layoutAction, selection, 'Quote.ErpLogicalId');
      },
      action: 'assignWarehouseAction',
    }]);
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [{
        id: 'new',
        cls: 'fa fa-plus fa-fw fa-lg',
        action: 'preNavigateToInsert',
        security: this.app.getViewSecurity(this.insertView, 'insert'),
      }],
    });
  },
  preNavigateToInsert: function preNavigateToInsert(el) {
    let options = {};
    if (this.options && this.options.fromContext && this.options.fromContext.entry) {
      options = {
        context: {
          Quote: this.options.fromContext.entry,
        },
      };
    }
    this.navigateToInsertView(el, options);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('(upper(Description) like "${0}%") or (upper(ProductName) like "${0}%") or (upper(Quote.QuoteNumber) like "${0}%") or (upper(ErpLineNumber) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
  assignWarehouseAction: function assignWarehouseAction(theAction, selection) {
    const quote = this.options.fromContext.entry;
    const quoteItemKey = selection.tag.attributes['data-key'].value;
    const quoteItem = this.entries[quoteItemKey];
    if (quoteItem) {
      const view = this.getAvailabilityView();
      if (view) {
        const options = {
          quoteItem,
          quote,
        };
        this.refreshRequired = true;
        view.show(options);
      }
    }
  },
  getAvailabilityView: function getAvailabilityView() {
    const viewId = 'locations_quoteItemAvailabilityList';
    let view = App.getView(viewId);
    if (view) {
      return view;
    }

    App.registerView(new QuoteItemAvailabilityList({ id: viewId }));
    view = App.getView(viewId);
    return view;
  },
});

lang.setObject('icboe.Views.QuoteLines.List', __class);
export default __class;
