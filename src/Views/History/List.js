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
import format from '../../Format';
import convert from 'argos/Convert';
import action from '../../Action';
import List from 'argos/List';
import _RightDrawerListMixin from '../_RightDrawerListMixin';
import _MetricListMixin from '../_MetricListMixin';
import getResource from 'argos/I18n';
import * as activityTypeIcons from '../../Models/Activity/ActivityTypeIcon';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('historyList');
const activityTypeResource = getResource('activityTypeText');
const hashTagResource = getResource('historyListHashTags');
const dtFormatResource = getResource('historyListDateTimeFormat');

const __class = declare('crm.Views.History.List', [List, _RightDrawerListMixin, _MetricListMixin], {
  format,
  // Templates
  itemTemplate: new Simplate([
    '<p class="listview-heading">',
    '{% if ($.Type === "atNote") { %}',
    '{%: $$.formatDate($.ModifyDate) %}',
    '{% } else { %}',
    '{%: $$.formatDate($.CompletedDate) %}',
    '{% } %}',
    '</p>',
    '<p class="micro-text">{%= $$.nameTemplate.apply($) %}</p>',
    '{% if($.Description) { %}',
    '<p class="micro-text">{%= $$.regardingText + $$.formatPicklist("Description")($.Description) %}</p>',
    '{% } %}',
    '<div class="note-text-item">',
    '<div class="note-text-wrap">',
    '{%: $.Notes %}',
    '</div>',
    '</div>',
  ]),
  nameTemplate: new Simplate([
    '{% if ($.ContactName) { %}',
    '{%: $.ContactName %} | {%: $.AccountName %}',
    '{% } else if ($.AccountName) { %}',
    '{%: $.AccountName %}',
    '{% } else { %}',
    '{%: $.LeadName %}',
    '{% } %}',
  ]),

  // Localization
  hourMinuteFormatText: dtFormatResource.hourMinuteFormatText,
  hourMinuteFormatText24: dtFormatResource.hourMinuteFormatText24,
  dateFormatText: dtFormatResource.dateFormatText,
  titleText: resource.titleText,
  viewAccountActionText: resource.viewAccountActionText,
  viewOpportunityActionText: resource.viewOpportunityActionText,
  viewContactActionText: resource.viewContactActionText,
  addAttachmentActionText: resource.addAttachmentActionText,
  regardingText: resource.regardingText,
  touchedText: resource.touchedText,
  activityTypeText: {
    atToDo: activityTypeResource.atToDoText,
    atPhoneCall: activityTypeResource.atPhoneCallText,
    atAppointment: activityTypeResource.atAppointmentText,
    atLiterature: activityTypeResource.atLiteratureText,
    atPersonal: activityTypeResource.atPersonalText,
    atQuestion: activityTypeResource.atQuestionText,
    atEMail: activityTypeResource.atEMailText,
    atNote: activityTypeResource.atNoteText,
  },
  hashTagQueriesText: {
    'my-history': hashTagResource.myHistoryHash,
    note: hashTagResource.noteHash,
    phonecall: hashTagResource.phoneCallHash,
    meeting: hashTagResource.meetingHash,
    personal: hashTagResource.personalHash,
    email: hashTagResource.emailHash,
  },

  // View Properties
  detailView: 'history_detail',
  itemIconClass: 'folder',
  id: 'history_list',
  security: null, // 'Entities/History/View',
  existsRE: /^[\w]{12}$/,
  insertView: 'history_edit',
  queryOrderBy: null,
  querySelect: [],
  queryWhere: null,
  resourceKind: 'history',
  entityName: 'History',
  hashTagQueries: {
    'my-history': function myHistory() {
      return `UserId eq "${App.context.user.$key}"`;
    },
    note: 'Type eq "atNote"',
    phonecall: 'Type eq "atPhoneCall"',
    meeting: 'Type eq "atAppointment"',
    personal: 'Type eq "atPersonal"',
    email: 'Type eq "atEMail"',
  },
  activityTypeIcon: activityTypeIcons.default,
  allowSelection: true,
  enableActions: true,
  modelName: MODEL_NAMES.HISTORY,

  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'viewAccount',
      label: this.viewAccountActionText,
      enabled: action.hasProperty.bindDelegate(this, 'AccountId'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'account_detail',
        keyProperty: 'AccountId',
        textProperty: 'AccountName',
      }),
    }, {
      id: 'viewOpportunity',
      label: this.viewOpportunityActionText,
      enabled: action.hasProperty.bindDelegate(this, 'OpportunityId'),
      fn: action.navigateToEntity.bindDelegate(this, {
        view: 'opportunity_detail',
        keyProperty: 'OpportunityId',
        textProperty: 'OpportunityName',
      }),
    }, {
      id: 'viewContact',
      label: this.viewContactActionText,
      action: 'navigateToContactOrLead',
      enabled: this.hasContactOrLead,
    }, {
      id: 'addAttachment',
      cls: 'attach',
      label: this.addAttachmentActionText,
      fn: action.addAttachment.bindDelegate(this),
    }]);
  },
  hasContactOrLead: function hasContactOrLead(theAction, selection) {
    return (selection.data.ContactId) || (selection.data.LeadId);
  },
  navigateToContactOrLead: function navigateToContactOrLead(theAction, selection) {
    const entity = this.resolveContactOrLeadEntity(selection.data);
    let viewId;
    let options;

    switch (entity) {
      case 'Contact':
        viewId = 'contact_detail';
        options = {
          key: selection.data.ContactId,
          descriptor: selection.data.ContactName,
        };
        break;
      case 'Lead':
        viewId = 'lead_detail';
        options = {
          key: selection.data.LeadId,
          descriptor: selection.data.LeadName,
        };
        break;
      default:
    }

    const view = App.getView(viewId);

    if (view && options) {
      view.show(options);
    }
  },
  resolveContactOrLeadEntity: function resolveContactOrLeadEntity(entry) {
    const exists = this.existsRE;

    if (entry) {
      if (exists.test(entry.LeadId)) {
        return 'Lead';
      }
      if (exists.test(entry.ContactId)) {
        return 'Contact';
      }
    }
  },
  formatDate: function formatDate(date) {
    const startDate = moment(convert.toDateFromString(date));
    const nextDate = startDate.clone().add({
      hours: 24,
    });
    let fmt = this.dateFormatText;

    if (startDate.valueOf() < nextDate.valueOf() && startDate.valueOf() > moment().startOf('day').valueOf()) {
      fmt = (App.is24HourClock()) ? this.hourMinuteFormatText24 : this.hourMinuteFormatText;
    }

    return format.date(startDate.toDate(), fmt);
  },
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return `upper(Description) like "%${this.escapeSearchQuery(searchQuery.toUpperCase())}%"`;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return this.itemIndicators || (this.itemIndicators = [{
      id: 'touched',
      cls: 'flag',
      title: this.touchedText,
      onApply: function onApply(entry, parent) {
        this.isEnabled = parent.hasBeenTouched(entry);
      },
    }]);
  },
  hasBeenTouched: function hasBeenTouched(entry) {
    if (entry.ModifyDate) {
      const modifiedDate = moment(convert.toDateFromString(entry.ModifyDate));
      const currentDate = moment().endOf('day');
      const weekAgo = moment().subtract(1, 'weeks');

      return modifiedDate.isAfter(weekAgo) &&
        modifiedDate.isBefore(currentDate);
    }
    return false;
  },
  getItemIconClass: function getItemIconClass(entry) {
    const type = entry && entry.Type;
    return this._getItemIconClass(type);
  },
  getTitle: function getTitle(entry) {
    const type = entry && entry.Type;
    return this.activityTypeText[type] || this.titleText;
  },
  _getItemIconClass: function _getItemIconClass(type) {
    let cls = this.activityTypeIcon[type];
    if (!cls) {
      cls = this.itemIconClass;
    }
    return cls;
  },
  init: function init() {
    this.inherited(init, arguments);
  },
  activateEntry: function activateEntry(params) {
    const entry = this.entries[params.key];
    if (entry) {
      const activityParams = params;
      activityParams.descriptor = this.getTitle(entry);
      this.inherited(arguments, [activityParams]);
    } else {
      this.inherited(activateEntry, arguments);
    }
  },
});

export default __class;
