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
import format from 'crm/Format';
import action from 'crm/Action';
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';
import utility from '../../Utility';

const resource = getResource('salesOrdersList');

const __class = declare('crm.Integrations.BOE.Views.SalesOrders.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  formatter: format,
  util: utility,
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.SalesOrderNumber %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.erpOrderIdText %}</label> {%: $.ErpExtId %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.customerPONumberText %}</label> {%: $.CustomerPurchaseOrderNumber %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.accountText %}</label> {%: $.Account.AccountName %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.orderDateText %}</label> {%: $$.formatter.date($.OrderDate) %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.baseGrandTotalText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.GrandTotal, $.BaseCurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.grandTotalText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.DocGrandTotal, $.CurrencyCode) %}',
    '</p>',
    '{% if ($.ErpExtId) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.erpStatusLabelText %}</label> {%: $$.formatErpStatus($.ERPSalesOrder.ERPStatus) %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</p>',
    '{% } else { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.statusLabelText %}</label> {%: $.Status %}</p>',
    '{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,
  accountText: resource.accountText,
  erpOrderIdText: resource.erpOrderIdText,
  grandTotalText: resource.grandTotalText,
  baseGrandTotalText: resource.baseGrandTotalText,
  statusLabelText: resource.statusLabelText,
  erpStatusLabelText: resource.erpStatusLabelText,
  customerPONumberText: resource.customerPONumberText,
  orderDateText: resource.orderDateText,
  viewAccountActionText: resource.viewAccountActionText,
  addLineItemsText: resource.addLineItemsText,
  documentDateText: resource.documentDateText,

  // View Properties
  id: 'salesorder_list',
  modelName: MODEL_NAMES.SALESORDER,
  resourceKind: 'salesOrders',
  allowSelection: true,
  enableActions: true,
  detailView: 'salesorder_detail',
  insertView: 'salesorder_edit',
  security: 'Entities/SalesOrder/View',
  insertSecurity: 'Entities/SalesOrder/Add',

  // Card layout
  itemIconClass: 'cart',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  // Metrics
  entityName: 'SalesOrder',

  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'viewAccount',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'account_detail',
        keyProperty: 'Account.$key',
        textProperty: 'Account.AccountName',
      }),
    }, {
      id: 'addOrderItem',
      cls: 'bullet-list',
      label: this.addLineItemsText,
      fn: (evt, selection) => {
        const view = App.getView('salesorder_item_edit');
        if (view) {
          const options = {
            insert: true,
            context: {
              SalesOrder: selection.data,
            },
          };
          view.show(options);
        }
      },
      security: 'Entities/SalesOrder/Add',
    }]);
  },

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `(upper(SalesOrderNumber) like "${q}%" ) or (upper(ErpExtId) like "${0}%" ) or (upper(CustomerPurchaseOrderNumber) like "${q}%" ) or (upper(Account.AccountName) like "${q}%" ) `;
  },
  formatErpStatus: function formatErpStatus(value) {
    const text = App.picklistService.getPicklistItemTextByCode('ErpSalesOrderStatus', value);
    if (text) {
      return text;
    }
    return value;
  },
});

lang.setObject('icboe.Views.SalesOrders.List', __class);
export default __class;
