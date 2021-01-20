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
import template from '../../Template';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('historyDetail');
const dtFormatResource = getResource('historyDetailDateTimeFormat');

const __class = declare('crm.Views.History.Detail', [Detail], {
  // Templates
  createUserTemplate: template.nameLF,

  // Localization
  categoryText: resource.categoryText,
  completedText: resource.completedText,
  durationText: resource.durationText,
  leaderText: resource.leaderText,
  longNotesText: resource.longNotesText,
  notesText: resource.notesText,
  priorityText: resource.priorityText,
  regardingText: resource.regardingText,
  completedByText: resource.completedByText,
  scheduledText: resource.scheduledText,
  timelessText: resource.timelessText,
  companyText: resource.companyText,
  leadText: resource.leadText,
  titleText: resource.titleText,
  accountText: resource.accountText,
  contactText: resource.contactText,
  opportunityText: resource.opportunityText,
  ticketNumberText: resource.ticketNumberText,
  relatedItemsText: resource.relatedItemsText,
  relatedAttendeeText: resource.relatedAttendeeText,
  relatedAttachmentText: resource.relatedAttachmentText,
  relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
  modifiedText: resource.modifiedText,
  typeText: resource.typeText,
  entityText: resource.entityText,
  activityTypeText: {
    atToDo: resource.toDo,
    atPhoneCall: resource.phoneCall,
    atAppointment: resource.meeting,
    atLiterature: resource.literature,
    atPersonal: resource.personal,
    atQuestion: resource.question,
    atEMail: resource.email,
  },
  // View Properties
  id: 'history_detail',
  existsRE: /^[\w]{12}$/,
  editView: 'history_edit',
  dateFormatText: dtFormatResource.dateFormatText,
  dateFormatText24: dtFormatResource.dateFormatText24,
  resourceKind: 'history',
  modelName: MODEL_NAMES.HISTORY,
  security: null, // 'Entities/History/View',

  formatActivityType: function formatActivityType(val) {
    return this.activityTypeText[val] || val;
  },
  isHistoryForLead: function isHistoryForLead(entry) {
    return this.existsRE.test(entry && entry.LeadId);
  },
  isHistoryForActivity: function isHistoryForActivity(entry) {
    return this.existsRE.test(entry && entry.ActivityId);
  },
  isHistoryOfType: function isHistoryOfType(entry, type) {
    return entry && (entry.Type === type);
  },
  provideText: function provideText(entry) {
    return entry && (entry.LongNotes || entry.Notes);
  },
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.notesText,
      name: 'NotesSection',
      children: [{
        name: 'LongNotes',
        property: 'LongNotes',
        encode: false,
        label: this.longNotesText,
        provider: this.provideText.bindDelegate(this),
        use: template.noteDetailProperty,
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'StartDate',
        property: 'StartDate',
        label: this.scheduledText,
        renderer: format.date.bindDelegate(this, (App.is24HourClock()) ? this.dateFormatText24 : this.dateFormatText),
        exclude: this.isHistoryOfType.bindDelegate(this, 'atNote'),
      }, {
        name: 'CompletedDate',
        property: 'CompletedDate',
        label: this.completedText,
        renderer: format.date.bindDelegate(this, (App.is24HourClock()) ? this.dateFormatText24 : this.dateFormatText),
        exclude: this.isHistoryOfType.bindDelegate(this, 'atNote'),
      }, {
        name: 'ModifyDate',
        property: 'ModifyDate',
        label: this.modifiedText,
        renderer: format.date.bindDelegate(this, (App.is24HourClock()) ? this.dateFormatText24 : this.dateFormatText),
        include: this.isHistoryOfType.bindDelegate(this, 'atNote'),
      }, {
        name: 'Description',
        property: 'Description',
        label: this.regardingText,
        renderer: this.formatPicklist('Description'),
      }, {
        name: 'CompletedUser',
        property: 'CompletedUser.UserInfo',
        label: this.completedByText,
        template: template.nameLF,
      }, {
        name: 'AccountName',
        property: 'AccountName',
        exclude: this.isHistoryForLead.bind(this),
        label: this.accountText,
        view: 'account_detail',
        key: 'AccountId',
        descriptor: 'AccountName',
      }, {
        name: 'ContactName',
        property: 'ContactName',
        exclude: this.isHistoryForLead.bind(this),
        label: this.contactText,
        view: 'contact_detail',
        key: 'ContactId',
        descriptor: 'ContactName',
      }, {
        name: 'OpportunityName',
        property: 'OpportunityName',
        exclude: this.isHistoryForLead.bind(this),
        label: this.opportunityText,
        view: 'opportunity_detail',
        key: 'OpportunityId',
        descriptor: 'OpportunityName',
      }, {
        name: 'TicketNumber',
        property: 'TicketNumber',
        exclude: this.isHistoryForLead.bind(this),
        label: this.ticketNumberText,
        view: 'ticket_detail',
        key: 'TicketId',
        descriptor: 'TicketNumber',
      }, {
        name: 'LeadName',
        property: 'LeadName',
        include: this.isHistoryForLead.bind(this),
        label: this.leadText,
        view: 'lead_detail',
        key: 'LeadId',
        descriptor: 'LeadName',
      }, {
        name: 'AccountName',
        property: 'AccountName',
        include: this.isHistoryForLead.bind(this),
        label: this.companyText,
      }],
    }, {
      title: this.relatedItemsText,
      list: true,
      name: 'RelatedItemsSection',
      children: [{
        name: 'AttendeeRelated',
        label: this.relatedAttendeeText,
        where: this.formatRelatedQuery.bindDelegate(this, 'HistoryId eq "${0}"'),
        view: 'history_attendee_related',
        title: this.relatedAttendeeTitleText,
      }, {
        name: 'AttachmentRelated',
        label: this.relatedAttachmentText,
        where: this.formatRelatedQuery.bindDelegate(this, 'historyId eq "${0}"'),
        view: 'history_attachment_related',
        title: this.relatedAttachmentTitleText,
      }],
    }]);
  },
});

export default __class;
