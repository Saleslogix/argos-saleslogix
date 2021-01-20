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
import List from 'argos/List';
import action from 'crm/Action';
import format from 'crm/Format';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';
import utility from '../../Utility';
import SalesOrderItemAvailabilityList from '../Locations/SalesOrderItemAvailabilityList';


const resource = getResource('salesOrderItemsList');

const __class = declare('crm.Integrations.BOE.Views.SalesOrderItems.List', [List, _RightDrawerListMixin, _MetricListMixin], {
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
    '<p class="listview-heading"><label class="group-label">{%: $$.lineText %}</label> {%: $.ErpLineNumber %}</p>',
    '{% } %}',
    '{% if ($.SlxLocation) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.warehouseText %}</label> {%: $.SlxLocation.Description %}</p>',
    '{% } %}',
    '<p class="micro-text"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.descriptionText %}</label> {%: $.Description %}</p>',
    '<p class="micro-text"> <label class="group-label">{%: $$.priceText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.Price, $.SalesOrder.BaseCurrencyCode) %}',
    '</p>',
    '<p class="micro-text"> <label class="group-label">{%: $$.adjustedPriceText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.DocCalculatedPrice, $.SalesOrder.CurrencyCode) %}',
    '</p>',
    '<p class="micro-text"> <label class="group-label">{%: $$.baseAdjustedPriceText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.CalculatedPrice, $.SalesOrder.BaseCurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.quantityText %}</label> {%: $.Quantity %}</p>',
    '<p class="micro-text"> <label class="group-label">{%: $$.baseAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ExtendedPrice, $.SalesOrder.BaseCurrencyCode) %}',
    '</p>',
    '<p class="micro-text"> <label class="group-label">{%: $$.amountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.DocExtendedPrice, $.SalesOrder.CurrencyCode) %}',
    '</p>',
    '<p class="micro-text"> <label class="group-label">{%: $$.totalAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.DocTotalAmount, $.SalesOrder.CurrencyCode) %}',
    '</p>',
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
  itemIconClass: 'bullet-list',

  // Metrics
  entityName: 'SalesOrderItem',

  readOnly: false,

  transitionTo: function transitionTo() {
    const entry = this.options && this.options.fromContext && this.options.fromContext.entry;
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
        svg: 'add',
        action: 'preNavigateToInsert',
        security: this.app.getViewSecurity(this.insertView, 'insert'),
      }],
    });
  },
  preNavigateToInsert: function preNavigateToInsert() {
    let options = {};
    if (this.options && this.options.fromContext && this.options.fromContext.entry) {
      options = {
        context: {
          SalesOrder: this.options.fromContext.entry,
        },
      };
    }
    this.navigateToInsertView(options);
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
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `(upper(Description) like "${q}%") or (upper(ProductName) like "${q}%") or (upper(SalesOrder.SalesOrderNumber) like "${q}%") or (upper(ErpLineNumber) like "${q}%")`;
  },
});

lang.setObject('icboe.Views.SalesOrderItems.List', __class);
export default __class;
