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
import action from 'crm/Action';
import format from 'argos/Format';
import List from 'argos/List';
import _GroupListMixin from '../_GroupListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('contactList');

const __class = declare('crm.Views.Contact.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  format,
  // Template
  // Card Layout
  itemIconClass: 'user',
  itemTemplate: new Simplate([
    '<p class="micro-text">{% if($.Title) { %} {%: $.Title %} | {% } %} {%: $.AccountName %}</p>',
    '<p class="micro-text">{%: $.WebAddress %}</p>',
    '{% if ($.WorkPhone) { %}',
    '<p class="micro-text">',
    '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callWork" data-key="{%: $.$key %}">{%: $$.format.phone($.WorkPhone) %}</span>', // TODO: Avoid global
    '</p>',
    '{% } %}',
    '{% if ($.Mobile) { %}',
    '<p class="micro-text">',
    '{%: $$.mobileAbbreviationText %} <span class="hyperlink" data-action="callMobile" data-key="{%: $.$key %}">{%: $$.format.phone($.Mobile) %}</span>', // TODO: Avoid global
    '</p>',
    '{% } %}',
    '{% if ($.Email) { %}',
    '<p class="micro-text">',
    '<span class="hyperlink" data-action="sendEmail" data-key="{%: $.$key %}">{%: $.Email %}</span>',
    '</p>',
    '{% } %}',
  ]),

  // Localization
  titleText: resource.titleText,
  activitiesText: resource.activitiesText,
  notesText: resource.notesText,
  scheduleText: resource.scheduleText,
  editActionText: resource.editActionText,
  callMainActionText: resource.callMainActionText,
  callWorkActionText: resource.callWorkActionText,
  callMobileActionText: resource.callMobileActionText,
  sendEmailActionText: resource.sendEmailActionText,
  viewAccountActionText: resource.viewAccountActionText,
  addNoteActionText: resource.addNoteActionText,
  addActivityActionText: resource.addActivityActionText,
  addAttachmentActionText: resource.addAttachmentActionText,
  phoneAbbreviationText: resource.phoneAbbreviationText,
  mobileAbbreviationText: resource.mobileAbbreviationText,

  // View Properties
  detailView: 'contact_detail',
  iconClass: 'user',
  id: 'contact_list',
  security: 'Entities/Contact/View',
  insertView: 'contact_edit',
  queryOrderBy: null,
  querySelect: [],
  resourceKind: 'contacts',
  entityName: 'Contact',
  modelName: MODEL_NAMES.CONTACT,
  groupsEnabled: true,
  enableActions: true,
  callWork: function callWork(params) {
    this.invokeActionItemBy((theAction) => {
      return theAction.id === 'callWork';
    }, params.key);
  },
  callMobile: function callMobile(params) {
    this.invokeActionItemBy((theAction) => {
      return theAction.id === 'callMobile';
    }, params.key);
  },
  sendEmail: function sendEmail(params) {
    this.invokeActionItemBy((theAction) => {
      return theAction.id === 'sendEmail';
    }, params.key);
  },
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'edit',
      cls: 'edit',
      label: this.editActionText,
      security: 'Entities/Contact/Edit',
      action: 'navigateToEditView',
    }, {
      id: 'callWork',
      cls: 'phone',
      label: this.callWorkActionText,
      enabled: action.hasProperty.bindDelegate(this, 'WorkPhone'),
      fn: action.callPhone.bindDelegate(this, 'WorkPhone'),
    }, {
      id: 'callMobile',
      cls: 'phone',
      label: this.callMobileActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Mobile'),
      fn: action.callPhone.bindDelegate(this, 'Mobile'),
    }, {
      id: 'viewAccount',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'account_detail',
        keyProperty: 'Account.$key',
        textProperty: 'AccountName',
      }),
    }, {
      id: 'sendEmail',
      cls: 'mail',
      label: this.sendEmailActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Email'),
      fn: action.sendEmail.bindDelegate(this, 'Email'),
    }, {
      id: 'addNote',
      cls: 'edit',
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
    return `(LastNameUpper like "${q}%" or upper(FirstName) like "${q}%" or upper(NameLF) like "%${q}%") or (AccountName like "%${q}%")`;
  },
});

export default __class;
