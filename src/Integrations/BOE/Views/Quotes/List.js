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
import _GroupListMixin from 'crm/Views/_GroupListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';
import utility from '../../Utility';

const resource = getResource('quotesList');

const __class = declare('crm.Integrations.BOE.Views.Quotes.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  formatter: format,
  util: utility,
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text"><label class="group-label">{%: $$.quoteNumberText %}</label> {%: $.QuoteNumber %}</p>',
    '{% if ($.Account && $.Account.AccountName) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.accountText %}</label> {%: $.Account.AccountName %}</p>',
    '{% } %}',
    '<p class="micro-text"><label class="group-label">{%: $$.createDateText %}</label> {%: $$.formatter.date($.CreateDate) %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.grandTotalLabelText %} </label>',
    '{%: $$.util.formatMultiCurrency($.DocGrandTotal, $.CurrencyCode) %}',
    '</p>',
    '{% if ($.ErpExtId) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.erpStatusLabelText %}</label> {%: $$.formatErpStatus($.ErpStatus) %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.documentDateText %}</label> {%: $$.formatter.date($.DocumentDate) %}</p>',
    '{% } else { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.statusLabelText %}</label> {%: $.Status %}</p>',
    '{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,
  quoteNumberText: resource.quoteNumberText,
  versionText: resource.versionText,
  accountText: resource.accountText,
  createDateText: resource.createDateText,
  grandTotalLabelText: resource.grandTotalLabelText,
  viewAccountActionText: resource.viewAccountActionText,
  addLineItemsText: resource.addLineItemsText,
  statusLabelText: resource.statusLabelText,
  erpStatusLabelText: resource.erpStatusLabelText,
  documentDateText: resource.documentDateText,

  // View Properties
  id: 'quote_list',
  detailView: 'quote_detail',
  insertView: 'quote_edit',
  modelName: MODEL_NAMES.QUOTE,
  resourceKind: 'quotes',
  expose: true,
  allowSelection: true,
  enableActions: true,
  security: 'Entities/Quote/View',
  insertSecurity: 'Entities/Quote/Add',

  // Card layout
  itemIconClass: 'document2',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  // Metrics
  entityName: 'Quote',

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
      id: 'addQuoteItem',
      cls: 'bullet-list',
      label: this.addLineItemsText,
      fn: (evt, selection) => {
        const view = App.getView('quote_line_edit');
        if (view) {
          const options = {
            insert: true,
            context: {
              Quote: selection.data,
            },
          };
          view.show(options);
        }
      },
      security: 'Entities/Quote/Add',
    }]);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(QuoteNumber) like "${q}%" or Account.AccountName like "${q}%" or ErpExtId like "${q}%"`;
  },
  formatErpStatus: function formatErpStatus(value) {
    const text = App.picklistService.getPicklistItemTextByCode('ErpQuoteStatus', value);
    if (text) {
      return text;
    }
    return value;
  },
});

lang.setObject('icboe.Views.Quotes.List', __class);
export default __class;
