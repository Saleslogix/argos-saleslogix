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
import format from '../../Format';
import utility from 'argos/Utility';
import List from 'argos/List';
import _GroupListMixin from '../_GroupListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('leadList');

const __class = declare('crm.Views.Lead.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">',
    '{%: $$.joinFields(" | ", [$$.formatPicklist("Title")($.Title), $.Company]) %}',
    '</p>',
    '{% if ($.WorkPhone) { %}',
    '<p class="micro-text">',
    '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callWork" data-key="{%: $.$key %}">{%: argos.Format.phone($.WorkPhone) %}</span>', // TODO: Avoid global
    '</p>',
    '{% } %}',
    '{% if ($.Mobile) { %}',
    '<p class="micro-text">',
    '{%: $$.mobileAbbreviationText %} <span class="hyperlink" data-action="callMobile" data-key="{%: $.$key %}">{%: argos.Format.phone($.Mobile) %}</span>', // TODO: Avoid global
    '</p>',
    '{% } %}',
    '{% if ($.TollFree) { %}',
    '<p class="micro-text">',
    '{%: $$.tollFreeAbbreviationText %} {%: argos.Format.phone($.TollFree) %}', // TODO: Avoid global
    '</p>',
    '{% } %}',
    '<p class="micro-text">{%: $.WebAddress %}</p>',
    '{% if ($.Email) { %}',
    '<p class="micro-text">',
    '<span class="hyperlink" data-action="sendEmail" data-key="{%: $.$key %}">{%: $.Email %}</span>',
    '</p>',
    '{% } %}',
  ]),

  joinFields: function joinFields(sep, fields) {
    return utility.joinFields(sep, fields);
  },
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
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },

  // Localization
  titleText: resource.titleText,
  activitiesText: resource.activitiesText,
  notesText: resource.notesText,
  scheduleText: resource.scheduleText,
  emailedText: resource.emailedText,
  calledText: resource.calledText,
  editActionText: resource.editActionText,
  callMobileActionText: resource.callMobileActionText,
  callWorkActionText: resource.callWorkActionText,
  sendEmailActionText: resource.sendEmailActionText,
  addNoteActionText: resource.addNoteActionText,
  addActivityActionText: resource.addActivityActionText,
  addAttachmentActionText: resource.addAttachmentActionText,
  phoneAbbreviationText: resource.phoneAbbreviationText,
  mobileAbbreviationText: resource.mobileAbbreviationText,
  tollFreeAbbreviationText: resource.tollFreeAbbreviationText,

  // View Properties
  detailView: 'lead_detail',
  itemIconClass: 'agent',
  iconTemplate: new Simplate([
    '<span class="fa-stack">',
    '<i class="fa fa-square-o fa-stack-2x"></i>',
    '<i class="fa fa-user fa-stack-1x fa-inverse"></i>',
    '</span>',
  ]),
  id: 'lead_list',
  security: 'Entities/Lead/View',
  insertView: 'lead_edit',
  queryOrderBy: null,
  querySelect: [],
  modelName: MODEL_NAMES.LEAD,
  resourceKind: 'leads',
  entityName: 'Lead',
  groupsEnabled: true,
  allowSelection: true,
  enableActions: true,
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'edit',
      cls: 'edit',
      label: this.editActionText,
      action: 'navigateToEditView',
      security: 'Entities/Lead/Edit',
    }, {
      id: 'callWork',
      cls: 'phone',
      label: this.callWorkActionText,
      enabled: action.hasProperty.bindDelegate(this, 'WorkPhone'),
      fn: (act, selectionIn) => {
        const selectionOut = this.linkLeadProperties(selectionIn);
        action.callPhone.call(this, act, selectionOut, 'WorkPhone');
      },
    }, {
      id: 'callMobile',
      cls: 'phone',
      label: this.callMobileActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Mobile'),
      fn: (act, selectionIn) => {
        const selectionOut = this.linkLeadProperties(selectionIn);
        action.callPhone.call(this, act, selectionOut, 'Mobile');
      },
    }, {
      id: 'sendEmail',
      cls: 'mail',
      label: this.sendEmailActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Email'),
      fn: (act, selectionIn) => {
        const selectionOut = this.linkLeadProperties(selectionIn);
        action.sendEmail.call(this, act, selectionOut, 'Email');
      },
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

  linkLeadProperties: function linkLeadProperties(selection = {}) {
    const { data } = selection;

    if (data) {
      selection.data.LeadId = data.$key;
      selection.data.AccountName = data.Company;
      selection.data.LeadName = data.LeadNameLastFirst;
    }
    return selection;
  },

  groupInvokeActionByName: function groupInvokeActionByName(actionName, options) {
    if (options) {
      options.selection = this.linkLeadProperties(options.selection);
    }
    this.inherited(groupInvokeActionByName, arguments);
  },

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `(LastNameUpper like "${q}%" or upper(FirstName) like "${q}%" or CompanyUpper like "${q}%" or upper(LeadNameLastFirst) like "%${q}%")`;
  },
});

export default __class;
