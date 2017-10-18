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
import SalesOrderItemAvailabilityList from '../Locations/SalesOrderItemAvailabilityList';


const resource = getResource('salesOrderItemsList');

const __class = declare('crm.Integrations.BOE.Views.SalesOrderItems.List', [List, _RightDrawerListMixin, _MetricListMixin, _CardLayoutListMixin], {
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
  warehouseTitleText: resource.warehouseTitleText,
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
    '<h4> <label class="group-label">{%: $$.priceText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.Price, $.SalesOrder.BaseCurrencyCode) %}',
    '</h4>',
    '<h4> <label class="group-label">{%: $$.adjustedPriceText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.DocCalculatedPrice, $.SalesOrder.CurrencyCode) %}',
    '</h4>',
    '<h4> <label class="group-label">{%: $$.baseAdjustedPriceText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.CalculatedPrice, $.SalesOrder.BaseCurrencyCode) %}',
    '</h4>',
    '<h4><label class="group-label">{%: $$.quantityText %}</label> {%: $$.formatter.fixedLocale($.Quantity, 2) %}</h4>',
    '<h4> <label class="group-label">{%: $$.baseAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ExtendedPrice, $.SalesOrder.BaseCurrencyCode) %}',
    '</h4>',
    '<h4> <label class="group-label">{%: $$.amountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.DocExtendedPrice, $.SalesOrder.CurrencyCode) %}',
    '</h4>',
    '<h4> <label class="group-label">{%: $$.totalAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.DocTotalAmount, $.SalesOrder.CurrencyCode) %}',
    '</h4>',
  ]),
  // View Properties
  id: 'salessorder_items_list',
  detailView: 'salesorder_item_detail',
  insertView: 'salesorder_item_edit',
  modelName: MODEL_NAMES.SALESORDERITEM,
  resourceKind: 'salesOrderItems',
  allowSelection: true,
  enableActions: true,
  security: 'Entities/SalesOrder/View',
  insertSecurity: 'Entities/SalesOrder/Add',

  // Card layout
  itemIconClass: 'fa fa-list-ul fa-2x',

  // Metrics
  entityName: 'SalesOrderItem',

  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'assignWarehouse',
      cls: 'fa fa-truck fa-2x',
      label: this.assignWarehouseText,
      enabled: (layoutAction, selection) => {
        return App.warehouseDiscovery === 'auto' &&
          action.hasProperty(layoutAction, selection, 'SalesOrder.ErpLogicalId');
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
          SalesOrder: this.options.fromContext.entry,
        },
      };
    }
    this.navigateToInsertView(el, options);
  },
  assignWarehouseAction: function assignWarehouseAction(theAction, selection) {
    const order = this.options.fromContext.entry;
    const orderItemKey = selection.tag.attributes['data-key'].value;
    const orderItem = this.entries[orderItemKey];
    if (orderItem) {
      const view = this.getAvailabilityView();
      if (view) {
        const options = {
          orderItem,
          order,
        };
        this.refreshRequired = true;
        view.show(options);
      }
    }
  },
  getAvailabilityView: function getAvailabilityView() {
    const viewId = 'locations_salesOrderItemAvailabilityList';
    let view = App.getView(viewId);
    if (view) {
      return view;
    }

    App.registerView(new SalesOrderItemAvailabilityList({ id: viewId }));
    view = App.getView(viewId);
    return view;
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('(upper(Description) like "${0}%") or (upper(ProductName) like "${0}%") or (upper(SalesOrder.SalesOrderNumber) like "${0}%") or (upper(ErpLineNumber) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.SalesOrderItems.List', __class);
export default __class;
