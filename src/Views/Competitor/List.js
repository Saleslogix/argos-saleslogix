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
import getResource from 'argos/I18n';

const resource = getResource('competitorList');

/**
 * @class crm.Views.Competitor.List
 *
 * @extends argos.List
 *
 * @requires argos.List
 *
 */
const __class = declare('crm.Views.Competitor.List', [List], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%= $.CompetitorName %}</p>',
    '{% if ($.WebAddress) { %}<p class="micro-text">{%= $.WebAddress %}</p>{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,

  // View Properties
  detailView: 'competitor_detail',
  id: 'competitor_list',
  security: 'Entities/Competitor/View',
  insertView: 'competitor_edit',
  queryOrderBy: 'CompetitorName asc',
  querySelect: [
    'CompetitorName',
    'WebAddress',
  ],
  resourceKind: 'competitors',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery);
    return `(CompetitorName like "%${q}%")`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Competitor.List', __class);
export default __class;
