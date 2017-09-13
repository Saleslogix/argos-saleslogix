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
import action from '../../Action';
import List from 'argos/List';
import _GroupListMixin from '../_GroupListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';
import format from 'crm/Format';

const resource = getResource('ticketList');

/**
 * @class crm.Views.Ticket.List
 *
 * @extends argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins crm.Views._MetricListMixin
 * @mixins crm.Views._GroupListMixin
 *
 * @requires crm.Action
 * @requires crm.Format
 */
const __class = declare('crm.Views.Ticket.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  format,
  // Templates
  itemTemplate: new Simplate([
    '<p class="micro-text">{%: $.Subject %}</p>',
    '{% if(($.Account) && (!$.Contact)) { %}',
    '<p class="micro-text">{%: $$.viewContactActionText + ": " + $.Account.AccountName %}</p>',
    '{% } %}',
    '{% if(($.Account) && ($.Contact)) { %}',
    '<p class="micro-text">{%: $$.viewContactActionText + ": " + $.Contact.NameLF + " | " + $.Account.AccountName %}</p>',
    '{% } %}',
    '<p class="micro-text"> {%: $.AssignedTo ? ($$.assignedToText + $.AssignedTo.OwnerDescription) : this.notAssignedText %}</p>',
    '{% if($.Urgency) { %}',
    '<p class="micro-text">{%: $$.urgencyText + $.Urgency.Description %}</p>',
    '{% } %}',
    '{% if($.Area) { %}',
    '<p class="micro-text">{%: $$._areaCategoryIssueText($) %}</p>',
    '{% } %}',
    '{% if($.CreateDate) { %}',
    '<p class="micro-text">{%: $$.createdOnText %}  {%: $$.format.relativeDate($.CreateDate) %}</p>',
    '{% } %}',
    '{% if($.ModifyDate) { %}',
    '<p class="micro-text">{%: $$.modifiedText %}  {%: $$.format.relativeDate($.ModifyDate) %}</p>',
    '{% } %}',
    '{% if($.NeededByDate) { %}',
    '<p class="micro-text">{%: $$.neededByText %}  {%: $$.format.relativeDate($.NeededByDate) %}</p>',
    '{% } %}',
  ]),

  _areaCategoryIssueText: function _areaCategoryIssueText(feedItem) {
    const results = [feedItem.Area, feedItem.Category, feedItem.Issue];
    return results.filter((item) => {
      return item !== '' && typeof item !== 'undefined' && item !== null;
    }).join(' > ');
  },

  // Localization
  titleText: resource.titleText,
  activitiesText: resource.activitiesText,
  scheduleText: resource.scheduleText,
  notAssignedText: resource.notAssignedText,
  editActionText: resource.editActionText,
  viewAccountActionText: resource.viewAccountActionText,
  viewContactActionText: resource.viewContactActionText,
  addNoteActionText: resource.addNoteActionText,
  addActivityActionText: resource.addActivityActionText,
  addAttachmentActionText: resource.addAttachmentActionText,
  assignedToText: resource.assignedToText,
  urgencyText: resource.urgencyText,
  createdOnText: resource.createdOnText,
  modifiedText: resource.modifiedText,
  neededByText: resource.neededByText,

  // View Properties
  detailView: 'ticket_detail',
  itemIconClass: 'expense-report',
  id: 'ticket_list',
  security: 'Entities/Ticket/View',
  insertView: 'ticket_edit',
  queryOrderBy: null,
  querySelect: [],
  modelName: MODEL_NAMES.TICKET,
  resourceKind: 'tickets',
  entityName: 'Ticket',
  groupsEnabled: true,
  allowSelection: true,
  enableActions: true,

  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'edit',
      cls: 'edit',
      label: this.editActionText,
      action: 'navigateToEditView',
      security: 'Entities/Ticket/Edit',
    }, {
      id: 'viewAccount',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'account_detail',
        keyProperty: 'Account.$key',
        textProperty: 'Account.AccountName',
      }),
    }, {
      id: 'viewContact',
      label: this.viewContactActionText,
      enabled: action.hasProperty.bindDelegate(this, 'Contact.$key'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'contact_detail',
        keyProperty: 'Contact.$key',
        textProperty: 'Contact.NameLF',
      }),
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
    return `TicketNumber like "${q}%" or AlternateKeySuffix like "${q}%" or upper(Subject) like "${q}%" or Account.AccountNameUpper like "${q}%"`;
  },
});

lang.setObject('Mobile.SalesLogix.Views.Ticket.List', __class);
export default __class;
