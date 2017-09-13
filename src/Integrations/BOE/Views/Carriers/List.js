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
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('carriersList');

const __class = declare('crm.Integrations.BOE.Views.Carriers.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.CarrierName %}</p>',
    '<p class="micro-text">{%: $.LogicalId %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'carriers_list',
  detailView: '',
  modelName: MODEL_NAMES.CARRIER,
  resourceKind: 'carriers',
  enableActions: false,
  expose: false,
  security: 'Entities/Carrier/View',
  insertSecurity: 'Entities/Carrier/Add',

  // Card layout
  itemIconClass: '',

  // Metrics
  entityName: 'Carrier',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
    });
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(CarrierName) like "${q}%"`;
  },
});

lang.setObject('icboe.Views.Carriers.List', __class);
export default __class;
