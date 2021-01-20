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
import action from '../../Action';
import utility from 'argos/Utility';
import List from 'argos/List';
import _GroupListMixin from '../_GroupListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import MODEL_NAMES from '../../Models/Names';
import ActivityTypeText from '../../Models/Activity/ActivityTypeText';
import getResource from 'argos/I18n';


const resource = getResource('accountList');

const __class = declare('crm.Views.Account.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">{%: $.Industry %}</p>',
    '<p class="micro-text">',
    '{%: $$.joinFields(" | ", [$.Type, $.SubType]) %}',
    '</p>',
    '<p class="micro-text">{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %}',
    '{% if ($.Owner && $.Owner.OwnerDescription) { %} | {%: $.Owner.OwnerDescription %}{% } %}</p>',
    '<p class="micro-text">{%: $.WebAddress %}</p>',
    '{% if ($.MainPhone) { %}',
    '<p class="micro-text">',
    '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callMain" data-key="{%: $.$key %}">{%: argos.Format.phone($.MainPhone) %}</span>', // TODO: Avoid global
    '</p>',
    '{% } %}',
    '{% if ($.Fax) { %}',
    '<p class="micro-text">',
    '{%: $$.faxAbbreviationText + argos.Format.phone($.Fax) %}', // TODO: Avoid global
    '</p>',
    '{% } %}',
  ]),
  groupsEnabled: true,
  enableDynamicGroupLayout: true,

  joinFields: function joinFields(sep, fields) {
    return utility.joinFields(sep, fields);
  },

  // Localization
  titleText: resource.titleText,
  activitiesText: resource.titleText,
  notesText: resource.notesText,
  scheduleText: resource.scheduleText,
  editActionText: resource.editActionText,
  callMainActionText: resource.callMainActionText,
  viewContactsActionText: resource.viewContactsActionText,
  addNoteActionText: resource.addNoteActionText,
  addActivityActionText: resource.addActivityActionText,
  addAttachmentActionText: resource.addAttachmentActionText,
  phoneAbbreviationText: resource.phoneAbbreviationText,
  faxAbbreviationText: resource.faxAbbreviationText,
  offlineText: resource.offlineText,

  // View Properties
  detailView: 'account_detail',
  itemIconClass: 'spreadsheet', // todo: replace with appropriate icon
  id: 'account_list',
  security: 'Entities/Account/View',
  insertView: 'account_edit',
  insertSecurity: 'Entities/Account/Add',
  entityName: 'Account',
  allowSelection: true,
  enableActions: true,
  offlineIds: null,
  resourceKind: 'accounts',
  modelName: MODEL_NAMES.ACCOUNT,

  callMain: function callMain(params) {
    this.invokeActionItemBy((a) => {
      return a.id === 'callMain';
    }, params.key);
  },
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'edit',
      cls: 'edit',
      label: this.editActionText,
      security: 'Entities/Account/Edit',
      action: 'navigateToEditView',
    }, {
      id: 'callMain',
      cls: 'phone',
      label: this.callMainActionText,
      enabled: action.hasProperty.bindDelegate(this, 'MainPhone'),
      fn: action.callPhone.bindDelegate(this, 'MainPhone', ActivityTypeText.atPhoneCall),
    }, {
      id: 'viewContacts',
      label: this.viewContactsActionText,
      fn: this.navigateToRelatedView.bindDelegate(this, 'contact_related', 'Account.id eq "${0}"'),
    }, {
      id: 'addNote',
      cls: 'quick-edit',
      label: this.addNoteActionText,
      fn: action.addNote.bindDelegate(this),
    }, {
      id: 'addActivity',
      cls: 'calendar',
      label: this.addActivityActionText,
      fn: action.addActivity.bindDelegate(this),
    }, {
      id: 'addAttachment',
      cls: 'attach',
      label: this.addAttachmentActionText,
      fn: action.addAttachment.bindDelegate(this),
    }]);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `AccountNameUpper like "${q}%"`;
  },
});

export default __class;
