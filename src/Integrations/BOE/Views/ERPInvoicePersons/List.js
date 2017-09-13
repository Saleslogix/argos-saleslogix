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
import _RightDrawerListMixin from 'crm/Views/_RightDrawerListMixin';
import _MetricListMixin from 'crm/Views/_MetricListMixin';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoicePersonsList');

const __class = declare('crm.Integrations.BOE.Views.ERPInvoicePersons.List', [List, _RightDrawerListMixin, _MetricListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.ErpPerson.Name %}</p>',
    '<p class="micro-text address">{%: $.ErpPerson.Address.FullAddress %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'invoiceperson_list',
  modelName: MODEL_NAMES.ERPINVOICEPERSON,
  resourceKind: 'erpInvoicePersons',
  allowSelection: true,
  enableActions: true,
  security: 'Entities/ErpPerson/View',
  insertSecurity: 'Entities/ErpPerson/Add',

  // Card layout
  itemIconClass: 'user',

  // Groups
  enableDynamicGroupLayout: true,
  groupsEnabled: true,

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(ErpPerson.Name) like "%${q}%"`;
  },
});

lang.setObject('icboe.Views.ERPInvoicePersons.List', __class);
export default __class;
