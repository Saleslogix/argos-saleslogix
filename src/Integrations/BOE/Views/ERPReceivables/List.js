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
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';
import utility from '../../Utility';

const resource = getResource('erpReceivablesList');

const __class = declare('crm.Integrations.BOE.Views.ERPReceivables.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  formatter: format,
  util: utility,
  itemTemplate: new Simplate([
    '<p class="micro-text"><label class="group-label">{%: $$.receivableIDText %}</label> {%: $.ErpExtId %}</p>',
    '{% if ($.ErpInvoice && $.ErpInvoice.InvoiceNumber) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.invoiceIDText %}</label> {%: $.ErpInvoice.InvoiceNumber %}</p>',
    '{% } %}',
    '{% if ($.Account && $.Account.AccountName) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.accountNameText %}</label> {%: $.Account.AccountName %}</p>',
    '{% } %}',
    '<p class="micro-text"><label class="group-label">{%: $$.receivedBaseAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ReceivedBaseAmount, $.BaseCurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.receivedAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ReceivedAmount, $.CurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.receivableBaseAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ReceivableBaseAmount, $.BaseCurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.receivableAmountText %}</label> ',
    '{%: $$.util.formatMultiCurrency($.ReceivableAmount, $.CurrencyCode) %}',
    '</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.erpStatusText %}</label> {%: $.ErpStatus %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.erpStatusDateText %}</label> {%: $$.formatter.date($.ErpStatusDate) %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.ErpDocumentDate) %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  receivableIDText: resource.receivableIDText,
  invoiceIDText: resource.invoiceIDText,
  erpStatusText: resource.erpStatusText,
  erpStatusDateText: resource.erpStatusDateText,
  receivedAmountText: resource.receivedAmountText,
  receivedBaseAmountText: resource.receivedBaseAmountText,
  receivableAmountText: resource.receivableAmountText,
  receivableBaseAmountText: resource.receivableBaseAmountText,
  accountNameText: resource.accountNameText,
  documentDateText: resource.documentDateText,

  // View Properties
  id: 'erpreceivables_list',
  detailView: 'erpreceivables_detail',
  modelName: MODEL_NAMES.ERPRECEIVABLE,
  resourceKind: 'erpReceivables',
  allowSelection: true,
  enableActions: true,
  expose: true,
  security: 'Entities/ErpReceivable/View',
  insertSecurity: 'Entities/ErpReceivable/Add',

  // Card layout
  itemIconClass: 'confirm',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,
  entityName: 'ERPReceivable',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(ErpExtId) like "%${q}%" or upper(Account.AccountName) like "%${q}%" or upper(ErpInvoice.InvoiceNumber) like "%${q}%"`;
  },
});

lang.setObject('icboe.Views.ERPReceivables.List', __class);
export default __class;
