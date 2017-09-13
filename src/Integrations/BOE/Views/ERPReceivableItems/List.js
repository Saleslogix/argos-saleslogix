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
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpReceivableItemsList');

const __class = declare('crm.Integrations.BOE.Views.ERPReceivableItems.List', [List, _RightDrawerListMixin, _MetricListMixin], {
  formatter: format,
  itemTemplate: new Simplate([
    '<p class="listview-heading"><label class="group-label">{%: $$.lineNumberText %}</label> {%: $.ErpLineNumber %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.receivablesIdText %}</label> {%: $.ErpReceivable.ErpExtId %}</p>',
    '{% if ($.ErpInvoice && $.ErpInvoice.ErpExtId) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.invoiceIDText %}</label> {%: $.ErpInvoice.ErpExtId %}</p>',
    '{% } %}',
    '<p class="micro-text"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>',
    '{% if ($.ErpLineTotalAmount) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.lineTotalText %}</label> ',
    '{% if (App.hasMultiCurrency() && $.ErpReceivable.CurrencyCode) { %}',
    '{%: $$.formatter.multiCurrency($.ErpLineTotalAmount, $.ErpReceivable.CurrencyCode) %}',
    '{% } else { %}',
    '{%: $$.formatter.currency($.ErpLineTotalAmount) %} ',
    '{% } %}</p>',
    '{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,
  lineNumberText: resource.lineNumberText,
  receivablesIdText: resource.receivablesIdText,
  productNameText: resource.productNameText,
  lineTotalText: resource.lineTotalText,
  invoiceIDText: resource.invoiceIDText,

  // Card layout
  itemIconClass: 'confirm',

  // View Properties
  id: 'erpreceivable_items_list',
  modelName: MODEL_NAMES.ERPRECEIVABLEITEM,
  resourceKind: 'erpReceivableItems',
  detailView: 'erpreceivableitems_detail',
  expose: false,
  allowSelection: true,
  enableActions: true,
  security: 'Entities/Receivable/View',
  insertSecurity: 'Entities/Receivable/Add',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(ErpReceivable.ErpExtId) like "%${q}%" or upper(ErpInvoice.ErpExtId) like "%${q}%"`;
  },
});

lang.setObject('icboe.Views.ERPReceivableItems.List', __class);
export default __class;
