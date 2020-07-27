/* Copyright 2020 Infor
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
import MODEL_NAMES from '../../Models/Names';
import action from '../../Action';
import getResource from 'argos/I18n';
import format from 'crm/Format';
import ActivityTypeText from '../../Models/Activity/ActivityTypeText';

const resource = getResource('historyAttendeeList');

const __class = declare('crm.Views.HistoryAttendee.List', [List], {
  // Localization
  titleText: resource.titleText,
  callPhoneActionText: resource.callPhoneActionText,

  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">{%: $.AccountName %}</p>',
    '<p class="micro-text">{%: $.EntityType %}</p>',
    '<p class="micro-text">{%: $.RoleName %}</p>',
    '<span class="hyperlink" data-action="callPhone" data-key="{%: $.$key %}">{%: $$.formatPhone($.PhoneNumber) %}</span>',
    '<p class="micro-text">{%: $.Email %}</p>',
    '<p class="micro-text">{%: $.TimeZone %}</p>',
  ]),

  // View Properties
  id: 'history_attendee_list',
  security: null,
  itemIconClass: 'spreadsheet',
  detailView: 'history_attendee_detail',
  insertView: '',
  enableActions: true,
  pageSize: 105,
  resourceKind: 'historyAttendees',
  modelName: MODEL_NAMES.HISTORYATTENDEE,

  callPhone: function callPhone(params) {
    this.invokeActionItemBy((a) => {
      return a.id === 'callPhone';
    }, params.key);
  },
  formatPhone: function formatPhone(phone) {
    return format.phone(phone);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return `upper(Name) like "%${this.escapeSearchQuery(searchQuery.toUpperCase())}%"`;
  },
  getTitle: function getTitle(entry) {
    if (!entry) {
      return '';
    }

    return (this._model && this._model.getEntityDescription(entry)) || entry.Name;
  },
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'callPhone',
      cls: 'phone',
      label: this.callPhoneActionText,
      enabled: action.hasProperty.bindDelegate(this, 'PhoneNumber'),
      fn: action.callPhone.bindDelegate(this, 'PhoneNumber', ActivityTypeText.atPhoneCall),
    }]);
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
});

export default __class;
