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
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('productsList');

const __class = declare('crm.Integrations.BOE.Views.Products.List', [List], {
  formatter: format,
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.Name %}</p>',
    '{% if ($.Description) { %}',
    '<p class="micro-text">{%: $.Description %}</p>',
    '{% } %}',
    '{% if ($.Family) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.familyText %}</label> {%: $.Family %}</p>',
    '{% } %}',
    '{% if ($.Status) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.statusText %}</label> {%: $.Status %}</p>',
    '{% } %}',
    '{% if ($.Price) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.priceText %} </label>',
    '{% if (App.hasMultiCurrency() && $.CurrencyCode) { %}',
    '{%: $$.formatter.multiCurrency($.Price, $.CurrencyCode) %}',
    '{% } else { %}',
    '{%: $$.formatter.currency($.Price) %} ',
    '{% } %}</p>',
    '{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,
  familyText: resource.familyText,
  statusText: resource.statusText,
  priceText: resource.priceText,

  // View Properties
  id: 'products_list',
  detailView: '',
  modelName: MODEL_NAMES.PRODUCT,
  resourceKind: 'products',
  enableActions: false,
  expose: false,
  security: 'Entities/Product/View',
  insertSecurity: 'Entities/Product/Add',

  // Card layout
  itemIconClass: '',

  // Metrics
  entityName: 'Product',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
    });
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Name) like "${q}%" or upper(Family) like "${q}%" or ActualId like "${q}%"`;
  },
});

lang.setObject('icboe.Views.Products.List', __class);
export default __class;
