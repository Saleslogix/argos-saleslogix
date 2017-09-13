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

const resource = getResource('erpShipmentItemsList');

const __class = declare('crm.Integrations.BOE.Views.ERPShipmentItems.List', [List, _RightDrawerListMixin, _MetricListMixin], {
  formatter: format,

  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading"><label class="group-label">{%: $$.productNameText %}</label> {%: $.ProductName %}</p>',
    '{% if ($.SalesOrder) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.salesOrderText %}</label> {%: $.SalesOrder.SalesOrderNumber %}</p>',
    '{% } %}',
    '<p class="micro-text"><label class="group-label">{%: $$.lineNumberText %}</label> {%: $.ErpLineNumber %}</p>',
    '{% if ($.ErpShipment) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.shipmentIDText %}</label> {%: $.ErpShipment.ErpExtId %}</p>',
    ' {% } %}',
    '<p class="micro-text"><label class="group-label">{%: $$.shippedQuantityText %}</label> {%: $.ErpShippedQuantity %} {%: $.ErpShippedUOM %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  productNameText: resource.productNameText,
  lineNumberText: resource.lineNumberText,
  shipmentIDText: resource.shipmentIDText,
  shippedQuantityText: resource.shippedQuantityText,
  salesOrderText: resource.salesOrderText,

  // View Properties
  id: 'erpshipment_items_list',
  detailView: 'erpshipment_items_detail',
  modelName: MODEL_NAMES.ERPSHIPMENTITEM,
  resourceKind: 'erpShipmentItems',
  allowSelection: true,
  enableActions: true,

  // Card layout
  itemIconClass: 'warehouse',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(ErpLineNumber) like "${q}%" or upper(SalesOrder.SalesOrderNumber) like "${q}%" or upper(ProductName) like "${q}%"`;
  },
});

lang.setObject('icboe.Views.ERPShipmentItems.List', __class);
export default __class;
