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
import template from '../../Template';
import validator from '../../Validator';
import ErrorManager from 'argos/ErrorManager';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('ticketActivityEdit');
const dtFormatResource = getResource('ticketActivityEditDateTimeFormat');

/**
 * @class crm.Views.TicketActivity.Edit
 *
 * @extends argos.Edit
 *
 * @requires argos.ErrorManager
 *
 * @requires crm.Template
 * @requires crm.Validator
 */
const __class = declare('crm.Views.TicketActivity.Edit', [Edit], {
  // Localization
  titleText: resource.titleText,
  activityTypeText: resource.activityTypeText,
  activityTypeTitleText: resource.activityTypeTitleText,
  publicAccessText: resource.publicAccessText,
  publicAccessTitleText: resource.publicAccessTitleText,
  userText: resource.userText,
  startDateText: resource.startDateText,
  endDateText: resource.endDateText,
  commentsText: resource.commentsText,
  startingFormatText: dtFormatResource.startingFormatText,
  startingFormatText24: dtFormatResource.startingFormatText24,

  // View Properties
  entityName: 'TicketActivity',
  id: 'ticketactivity_edit',
  querySelect: [],
  queryInclude: [],
  modelName: MODEL_NAMES.TICKETACTIVITY,
  resourceKind: 'ticketActivities',

  processTemplateEntry: function processTemplateEntry(entry) {
    this.inherited(arguments);

    if (entry.PublicAccessCode) {
      this.requestCodeData('name eq "Ticket Activity Public Access"', entry.PublicAccessCode, this.fields.PublicAccessCode);
    }
  },
  createPicklistRequest: function createPicklistRequest(name) {
    const request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService())
      .setResourceKind('picklists')
      .setContractName('system');

    const uri = request.getUri();
    uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
    uri.setCollectionPredicate(name);

    request.allowCacheUse = true;
    return request;
  },
  requestCodeData: function requestCodeData(picklistName, code, field) {
    const request = this.createPicklistRequest(picklistName);
    request.read({
      success: lang.hitch(this, this.onRequestCodeDataSuccess, code, field),
      failure: this.onRequestCodeDataFailure,
      scope: this,
    });
  },
  onRequestCodeDataSuccess: function onRequestCodeDataSuccess(code, field, feed) {
    const value = this.processCodeDataFeed(feed, code);
    field.setValue(code);
    field.setText(value);
  },
  onRequestCodeDataFailure: function onRequestCodeDataFailure(response, o) {
    ErrorManager.addError(response, o, this.options, 'failure');
  },
  processCodeDataFeed: function processCodeDataFeed(feed, currentValue, options) {
    const keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
    const textProperty = options && options.textProperty ? options.textProperty : 'text';

    for (let i = 0; i < feed.$resources.length; i++) {
      if (feed.$resources[i][keyProperty] === currentValue) {
        return feed.$resources[i][textProperty];
      }
    }

    return currentValue;
  },

  applyContext: function applyContext() {
    this.inherited(arguments);

    const ticketContext = App.isNavigationFromResourceKind(['tickets']);
    const ticketKey = ticketContext && ticketContext.key;
    const user = App.context.user;
    const userField = this.fields.User;

    if (ticketKey) {
      this.fields.TicketId.setValue(ticketKey);
    }

    if (userField) {
      userField.setValue(user);
    }
  },

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      name: 'TicketId',
      property: 'Ticket.$key',
      type: 'hidden',
    }, {
      label: this.commentsText,
      name: 'ActivityDescription',
      property: 'ActivityDescription',
      rows: 6,
      type: 'textarea',
    }, {
      label: this.activityTypeText,
      name: 'ActivityTypeCode',
      property: 'ActivityTypeCode',
      requireSelection: true,
      title: this.activityTypeTitleText,
      storageMode: 'id',
      picklist: 'Ticket Activity',
      type: 'picklist',
    }, {
      label: this.publicAccessText,
      name: 'PublicAccessCode',
      property: 'PublicAccessCode',
      title: this.publicAccessTitleText,
      storageMode: 'id',
      picklist: 'Ticket Activity Public Access',
      type: 'picklist',
    }, {
      label: this.userText,
      name: 'User',
      property: 'User',
      textProperty: 'UserInfo',
      textTemplate: template.nameLF,
      type: 'lookup',
      view: 'user_list',
    }, {
      label: this.startDateText,
      name: 'AssignedDate',
      property: 'AssignedDate',
      type: 'date',
      showTimePicker: true,
      dateFormatText: (App.is24HourClock()) ? this.startingFormatText24 : this.startingFormatText,
      minValue: (new Date(1900, 0, 1)),
      validator: [
        validator.exists,
        validator.isDateInRange,
      ],
    }, {
      label: this.endDateText,
      name: 'CompletedDate',
      property: 'CompletedDate',
      type: 'date',
      showTimePicker: true,
      dateFormatText: (App.is24HourClock()) ? this.startingFormatText24 : this.startingFormatText,
      minValue: (new Date(1900, 0, 1)),
      validator: [
        validator.exists,
        validator.isDateInRange,
      ],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.TicketActivity.Edit', __class);
export default __class;
