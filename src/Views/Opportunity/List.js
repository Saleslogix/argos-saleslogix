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
import format from '../../Format';
import List from 'argos/List';
import _GroupListMixin from '../_GroupListMixin';
import _MetricListMixin from '../_MetricListMixin';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('opportunityList');

/**
 * @class crm.Views.Opportunity.List
 *
 * @extends argos.List
 * @mixins crm.Views._RightDrawerListMixin
 * @mixins crm.Views._MetricListMixin
 * @mixins crm.Views._GroupListMixin
 *
 * @requires argos.Format
 *
 * @requires crm.Action
 * @requires crm.Format
 */
const __class = declare('crm.Views.Opportunity.List', [List, _RightDrawerListMixin, _MetricListMixin, _GroupListMixin], {
  // Templates
  // TODO: Support ExchangeRateCode with proper symbol
  itemTemplate: new Simplate([
    '{% if ($.Account) { %}',
    '<p class="micro-text">',
    '{%: $.Account.AccountName %}',
    '</p>',
    '<p class="micro-text">',
    '{% if ($.Account.AccountManager && $.Account.AccountManager.UserInfo) { %}',
    '{%: $.Account.AccountManager.UserInfo.UserName %}',
    '{% if ($.Account && $.Account.AccountManager.UserInfo.Region) { %}',
    ' | {%: $.Account.AccountManager.UserInfo.Region %}',
    '{% } %}',
    '{% } %}',
    '</p>',
    '{% } %}',
    '<p class="micro-text">',
    '{%: $.Status %}',
    '{% if ($.Stage) { %}',
    ' | {%: $.Stage %}',
    '{% } %}',
    '</p>',
    '{% if ($.SalesPotential) { %}',
    '<p class="micro-text"><strong>',
    '{% if (App.hasMultiCurrency()) { %}',
    '{%: crm.Format.multiCurrency($.SalesPotential * $.ExchangeRate, $.ExchangeRateCode) %}',
    '{% } else { %}',
    '{%: crm.Format.multiCurrency($.SalesPotential, App.getBaseExchangeRate().code) %}',
    '{% } %}',
    '</strong></p>',
    '{% } %}',
    '<p class="micro-text">{%: $$.formatDate($) %}</p>',
  ]),

  // Localization
  titleText: resource.titleText,
  activitiesText: resource.activitiesText,
  notesText: resource.notesText,
  scheduleText: resource.scheduleText,
  editActionText: resource.editActionText,
  viewAccountActionText: resource.viewAccountActionText,
  viewContactsActionText: resource.viewContactsActionText,
  viewProductsActionText: resource.viewProductsActionText,
  addNoteActionText: resource.addNoteActionText,
  addActivityActionText: resource.addActivityActionText,
  addAttachmentActionText: resource.addAttachmentActionText,
  actualCloseText: resource.actualCloseText,
  estimatedCloseText: resource.estimatedCloseText,
  quickEditActionText: resource.quickEditActionText,

  // View Properties
  id: 'opportunity_list',
  security: 'Entities/Opportunity/View',
  itemIconClass: 'finance',
  detailView: 'opportunity_detail',
  insertView: 'opportunity_edit',
  queryOrderBy: null,
  querySelect: [],
  modelName: MODEL_NAMES.OPPORTUNITY,
  resourceKind: 'opportunities',
  entityName: 'Opportunity',
  groupsEnabled: true,
  allowSelection: true,
  enableActions: true,

  formatDate: function formatDate(entry) {
    if (entry.Status === 'Open' && entry.EstimatedClose) {
      return this.estimatedCloseText + format.relativeDate(entry.EstimatedClose);
    } else if (entry.ActualClose) {
      return this.actualCloseText + format.relativeDate(entry.ActualClose);
    }

    return '';
  },
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'edit',
      cls: 'edit',
      label: this.editActionText,
      action: 'navigateToEditView',
      security: 'Entities/Opportunity/Edit',
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
      id: 'viewContacts',
      label: this.viewContactsActionText,
      fn: this.navigateToRelatedView.bindDelegate(this, 'opportunitycontact_related', 'Opportunity.Id eq "${0}"'),
    }, {
      id: 'viewProducts',
      label: this.viewProductsActionText,
      fn: this.navigateToRelatedView.bindDelegate(this, 'opportunityproduct_related', 'Opportunity.Id eq "${0}"'),
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
    }, {
      id: 'quickEdit',
      cls: 'edit',
      label: this.quickEditActionText,
      editView: 'opportunity_quick_edit',
      action: 'navigateToQuickEdit',
      security: 'Entities/Opportunity/Edit',
    }]);
  },

  formatSearchQuery: function formatSearchQuery(searchQuery) {
    const q = this.escapeSearchQuery(searchQuery.toUpperCase());
    return `(upper(Description) like "${q}%" or Account.AccountNameUpper like "${q}%")`;
  },
  groupFieldFormatter: {
    CloseProbability: {
      name: 'CloseProbability',
      formatter: function formatter(value) {
        return `${format.fixedLocale(value, 0)}%`;
      },
    },
  },
});

lang.setObject('Mobile.SalesLogix.Views.Opportunity.List', __class);
export default __class;
