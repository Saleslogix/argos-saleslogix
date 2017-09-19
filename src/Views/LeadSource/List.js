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
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('leadSourceList');

/**
 * @class crm.Views.LeadSource.List
 *
 * @extends argos.List
 */
const __class = declare('crm.Views.LeadSource.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">{%: $.Status %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  id: 'leadsource_list',
  security: 'Entities/LeadSource/View',
  queryOrderBy: 'Description',
  querySelect: [
    'Description',
    'Status',
  ],
  resourceKind: 'leadsources',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Description) like "${q}%"`;
  },
});

export default __class;
