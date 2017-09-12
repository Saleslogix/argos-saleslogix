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
import string from 'dojo/string';
import action from '../../Action';
import format from '../../Format';
import MODEL_NAMES from '../../Models/Names';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';

const resource = getResource('leadDetail');

/**
 * @class crm.Views.Lead.Detail
 *
 * @extends argos.Detail
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.Lead.Detail', [Detail], {
  // Localization
  accountText: resource.accountText,
  addressText: resource.addressText,
  businessDescriptionText: resource.businessDescriptionText,
  createDateText: resource.createDateText,
  createUserText: resource.createUserText,
  eMailText: resource.eMailText,
  leadSourceText: resource.leadSourceText,
  industryText: resource.industryText,
  interestsText: resource.interestsText,
  leadTitleText: resource.leadTitleText,
  nameText: resource.nameText,
  notesText: resource.notesText,
  ownerText: resource.ownerText,
  relatedActivitiesText: resource.relatedActivitiesText,
  relatedHistoriesText: resource.relatedHistoriesText,
  relatedItemsText: resource.relatedItemsText,
  relatedNotesText: resource.relatedNotesText,
  relatedAttachmentText: resource.relatedAttachmentText,
  relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
  sicCodeText: resource.sicCodeText,
  titleText: resource.titleText,
  tollFreeText: resource.tollFreeText,
  mobileText: resource.mobileText,
  webText: resource.webText,
  workText: resource.workText,
  actionsText: resource.actionsText,
  callWorkNumberText: resource.callWorkNumberText,
  scheduleActivityText: resource.scheduleActivityText,
  addNoteText: resource.addNoteText,
  sendEmailText: resource.sendEmailText,
  viewAddressText: resource.viewAddressText,
  calledText: resource.calledText,
  emailedText: resource.emailedText,
  entityText: resource.entityText,

  // View Properties
  id: 'lead_detail',
  editView: 'lead_edit',
  historyEditView: 'history_edit',
  noteEditView: 'history_edit',
  enableOffline: true,
  resourceKind: 'leads',
  modelName: MODEL_NAMES.LEAD,

  navigateToHistoryInsert: function navigateToHistoryInsert(type, entry) {
    this.refreshRequired = true;
    action.navigateToHistoryInsert(entry);
  },
  recordCallToHistory: function recordCallToHistory(phoneNumber) {
    const entry = {
      $name: 'History',
      Type: 'atPhoneCall',
      AccountName: this.entry.Company,
      LeadId: this.entry.$key,
      LeadName: this.entry.LeadNameLastFirst,
      Description: string.substitute(this.calledText, [this.entry.LeadNameFirstLast]),
      UserId: App.context && App.context.user.$key,
      UserName: App.context && App.context.user.UserName,
      Duration: 15,
      CompletedDate: (new Date()),
    };

    this.navigateToHistoryInsert('atPhoneCall', entry);
    App.initiateCall(phoneNumber);
  },
  recordEmailToHistory: function recordEmailToHistory(email) {
    const entry = {
      $name: 'History',
      Type: 'atEMail',
      AccountName: this.entry.Company,
      LeadId: this.entry.$key,
      LeadName: this.entry.LeadNameLastFirst,
      Description: string.substitute(this.emailedText, [this.entry.LeadNameLastFirst]),
      UserId: App.context && App.context.user.$key,
      UserName: App.context && App.context.user.UserName,
      Duration: 15,
      CompletedDate: (new Date()),
    };

    this.navigateToHistoryInsert('atEMail', entry);
    App.initiateEmail(email);
  },
  callWorkPhone: function callWorkPhone() {
    this.recordCallToHistory(this.entry.WorkPhone);
  },
  checkWorkPhone: function checkWorkPhone(entry, value) {
    return !value;
  },
  sendEmail: function sendEmail() {
    this.recordEmailToHistory(this.entry.Email);
  },
  checkEmail: function checkEmail(entry, value) {
    return !value;
  },
  viewAddress: function viewAddress() {
    App.showMapForAddress(format.address(this.entry.Address, true, ' '));
  },
  checkAddress: function checkAddress(entry, value) {
    return !format.address(value, true, '');
  },
  scheduleActivity: function scheduleActivity() {
    App.navigateToActivityInsertView();
  },
  addNote: function addNote() {
    const view = App.getView(this.noteEditView);
    if (view) {
      view.show({
        template: {},
        insert: true,
      });
    }
  },
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      list: true,
      title: this.actionsText,
      cls: 'action-list',
      name: 'QuickActionsSection',
      children: [{
        name: 'CallWorkPhoneAction',
        property: 'WorkPhone',
        label: this.callWorkNumberText,
        action: 'callWorkPhone',
        iconClass: 'phone',
        disabled: this.checkWorkPhone,
        renderer: format.phone.bindDelegate(this, false),
      }, {
        name: 'CheckEmailAction',
        property: 'Email',
        label: this.sendEmailText,
        action: 'sendEmail',
        iconClass: 'mail',
        disabled: this.checkEmail,
      }, {
        name: 'ScheduleActivityAction',
        label: this.scheduleActivityText,
        action: 'scheduleActivity',
        iconClass: 'calendar',
        tpl: new Simplate([
          '{%: $.Company %} / {%: $.LeadNameLastFirst %}',
        ]),
      }, {
        name: 'AddNoteAction',
        property: 'LeadNameLastFirst',
        iconClass: 'quick-edit',
        label: this.addNoteText,
        action: 'addNote',
      }, {
        name: 'ViewAddressAction',
        property: 'Address',
        label: this.viewAddressText,
        action: 'viewAddress',
        iconClass: 'map-pin',
        disabled: this.checkAddress,
        renderer: format.address.bindDelegate(this, true, ' '),
      }],
    }, {
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        label: this.nameText,
        name: 'LeadNameLastFirst',
        property: 'LeadNameLastFirst',
      }, {
        label: this.accountText,
        name: 'Company',
        property: 'Company',
      }, {
        label: this.leadTitleText,
        name: 'Title',
        property: 'Title',
        renderer: this.formatPicklist('Title'),
      }, {
        label: this.workText,
        name: 'WorkPhone',
        property: 'WorkPhone',
        renderer: format.phone,
      }, {
        label: this.mobileText,
        name: 'Mobile',
        property: 'Mobile',
        renderer: format.phone,
      }, {
        label: this.tollFreeText,
        name: 'TollFree',
        property: 'TollFree',
        renderer: format.phone,
      }, {
        label: this.leadSourceText,
        name: 'LeadSource.Description',
        property: 'LeadSource.Description',
      }, {
        label: this.webText,
        name: 'WebAddress',
        property: 'WebAddress',
        renderer: format.link,
      }, {
        label: this.interestsText,
        name: 'Interests',
        property: 'Interests',
      }, {
        label: this.industryText,
        name: 'Industry',
        property: 'Industry',
        renderer: this.formatPicklist('Industry'),
      }, {
        label: this.sicCodeText,
        name: 'SICCode',
        property: 'SICCode',
      }, {
        label: this.businessDescriptionText,
        name: 'BusinessDescription',
        property: 'BusinessDescription',
      }, {
        label: this.notesText,
        name: 'Notes',
        property: 'Notes',
      }, {
        label: this.ownerText,
        name: 'Owner.OwnerDescription',
        property: 'Owner.OwnerDescription',
      }],
    }, {
      list: true,
      title: this.relatedItemsText,
      name: 'RelatedItemsSection',
      children: [{
        name: 'ActivityRelated',
        label: this.relatedActivitiesText,
        view: 'activity_related',
        where: this.formatRelatedQuery.bindDelegate(this, 'LeadId eq "${0}"'),
      }, {
        name: 'HistoryRelated',
        label: this.relatedHistoriesText,
        where: this.formatRelatedQuery.bindDelegate(this, 'LeadId eq "${0}" and Type ne "atDatabaseChange"'),
        view: 'history_related',
      }, {
        name: 'AttachmentRelated',
        label: this.relatedAttachmentText,
        where: this.formatRelatedQuery.bindDelegate(this, 'leadId eq "${0}"'), // must be lower case because of feed
        view: 'lead_attachment_related',
        title: this.relatedAttachmentTitleText,
      }],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.Lead.Detail', __class);
export default __class;
