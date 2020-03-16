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
import json from 'dojo/_base/json';
import format from 'crm/Format';
import ErrorManager from 'argos/ErrorManager';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';

const resource = getResource('errorLogDetail');
const dtFormatResource = getResource('errorLogDetailDateTimeFormat');

const __class = declare('crm.Views.ErrorLog.Detail', [Detail], {
  // Localization
  titleText: resource.titleText,
  detailsText: resource.detailsText,
  errorDateText: resource.errorDateText,
  errorDateFormatText: dtFormatResource.errorDateFormatText,
  errorDateFormatText24: dtFormatResource.errorDateFormatText24,
  statusTextText: resource.statusTextText,
  urlText: resource.urlText,
  entityText: resource.entityText,
  errorText: resource.errorText,
  emailSubjectText: resource.emailSubjectText,
  copiedSuccessText: resource.copiedSuccessText,
  emailText: resource.emailText,

  // Templates
  longDetailProperty: new Simplate([
    '<div class="row note-text-row" data-property="{%= $.name %}">',
    '<label>{%: $.label %}</label>',
    '<pre>',
    '{%= $.value %}',
    '</pre>',
    '</div>',
  ]),

  // View Properties
  id: 'errorlog_detail',


  // Email address to be placed in the "To:" field when sending a report via a mobile device
  defaultToAddress: null,

  init: function init() {
    this.inherited(init, arguments);
  },

  createToolLayout: function createToolLayout() {
    const tools = {
      tbar: [],
    };

    tools.tbar.push({
      id: 'generateEmail',
      title: this.emailText,
      action: 'constructReport',
      svg: 'mail',
    });

    return this.tools || tools;
  },

  constructReport: function constructReport() {
    const body = `\r\n\r\n\r\n-----------------\r\n${json.toJson(this.entry, true)}`;
    this.sendEmailReport(body);
  },

  sendEmailReport: function sendEmailReport(body) {
    const email = this.defaultToAddress || '';
    const subject = encodeURIComponent(this.emailSubjectText);
    const theBody = encodeURIComponent(body);
    App.initiateEmail(email, subject, theBody);
  },

  requestData: function requestData() {
    const errorItem = ErrorManager.getError('$key', this.options.key);
    this.processEntry(errorItem);
  },

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        label: this.errorDateText,
        name: 'Date',
        property: 'Date',
        renderer: format.date.bindDelegate(this, (App.is24HourClock()) ? this.errorDateFormatText24 : this.errorDateFormatText),
      }, {
        label: this.statusTextText,
        name: 'Description',
        property: 'Description',
      }, {
        label: this.errorText,
        name: 'Error',
        property: 'Error',
      }],
    }]);
  },
});

export default __class;
