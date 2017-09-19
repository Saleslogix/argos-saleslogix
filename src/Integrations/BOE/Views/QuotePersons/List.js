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

const resource = getResource('quotePersonList');

const __class = declare('crm.Integrations.BOE.Views.QuotePersons.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  formatter: format,
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text"><label class="group-label">{%: $$.personNameText %}</label> {%: $.Person.Name %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.quoteNumberText %}</label> {%: $.Quote.QuoteNumber %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  personNameText: resource.personNameText,
  quoteNumberText: resource.quoteNumberText,

  // View Properties
  id: 'quotePerson_list',
  modelName: MODEL_NAMES.QUOTEPERSON,
  resourceKind: 'quotePersons',
  allowSelection: true,
  enableActions: false,
  expose: false,
  security: 'Entities/ErpPerson/View',
  insertSecurity: 'Entities/ErpPerson/Add',

  // Card layout
  itemIconClass: '',

  // Groups
  enableDynamicGroupLayout: false,
  groupsEnabled: false,

  // Metrics
  entityName: 'Quote Person',

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(Quote.QuoteNumber) like "${q}%" or upper(Person.Name) like "${q}%"`;
  },
});

lang.setObject('icboe.Views.QuotePersons.List', __class);
export default __class;
