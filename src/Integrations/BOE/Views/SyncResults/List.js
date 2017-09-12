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

const resource = getResource('syncResultsList');
const dtFormatResource = getResource('syncResultsListDateTimeFormat');

const __class = declare('crm.Integrations.BOE.Views.SyncResults.List', [List], {
  formatter: format,
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading"><label class="group-label">{%: $$.directionText %}: </label>{%: $.RunName %}</p>',
    '<p class="micro-text"><label class="group-label">{%: $$.statusText %}: </label>{%: $.HttpStatus %}</p>',
    '{% if ($.ErrorMessage) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.errorMessageText %}: </label>{%: $.ErrorMessage %}</p>',
    '{% } %}',
    '{% if ($.SyncedFrom) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.sentFromText %}: </label>{%: $.SyncedFrom.Name %}</p>',
    '{% } %}',
    '{% if ($.SyncedTo) { %}',
    '<p class="micro-text"><label class="group-label">{%: $$.processedByText %}: </label>{%: $.SyncedTo.Name %}</p>',
    '{% } %}',
    '<p class="micro-text"><label class="group-label">{%: $$.loggedText %}: </label>{%: $$.formatter.date($.Stamp, $$.dateFormatText) %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  directionText: resource.directionText,
  userText: resource.userText,
  sentFromText: resource.sentFromText,
  processedByText: resource.processedByText,
  loggedText: resource.loggedText,
  statusText: resource.statusText,
  errorMessageText: resource.errorMessageText,
  dateFormatText: dtFormatResource.dateFormatText,

  // View Properties
  id: 'syncresult_list',
  detailView: '',
  modelName: MODEL_NAMES.SYNCRESULT,
  resourceKind: 'syncResults',
  enableActions: false,
  groupsEnabled: false,
  hasSettings: false,
  expose: false,

  // Card layout
  itemIconClass: '',

  // Metrics
  entityName: 'SyncResult',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
    });
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `upper(HttpStatus) like "${q}%"`;
  },
});

lang.setObject('icboe.Views.SyncResults.List', __class);
export default __class;
