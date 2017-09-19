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

/**
 * @class crm.Views.ErrorLog.Detail
 * @extends argos.Detail
 */
const __class = declare('crm.Views.ErrorLog.Detail', [Detail], /** @lends crm.Views.ErrorLog.Detail# */{
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

  // Templates
  longDetailProperty: new Simplate([
    '<div class="row note-text-row" data-property="{%= $.name %}">',
    '<label>{%: $.label %}</label>',
    '<pre>',
    '{%= $.value %}',
    '</pre>',
    '</div>',
  ]),
  copyButtonTemplate: new Simplate([
    '<div class="copyButton button toolButton toolButton-right">',
    '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="40" height="36" id="errorlog-detail-copy" class="fa fa-clipboard fa-lg">',
    '<param name="movie" value="content/clippy.swf"/>',
    '<param name="allowScriptAccess" value="always" />',
    '<param name="quality" value="high" />',
    '<param name="scale" value="noscale" />',
    '<param name="FlashVars" value="{%= $.flashVars %}" />',
    '<param name="wmode" value="transparent" />',
    '<embed src="content/clippy.swf" width="45" height="36" scale="noscale" name="clippy" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" FlashVars="{%= $.flashVars %}" wmode="transparent" />',
    '</object>',
    '</div>',
  ]),


  // View Properties
  id: 'errorlog_detail',
  sendType: null,

  /**
   * Email address to be placed in the "To:" field when sending a report via a mobile device
   */
  defaultToAddress: null,

  init: function init() {
    this.inherited(arguments);
    this.determineSendType();
  },

  createToolLayout: function createToolLayout() {
    const tools = {
      tbar: [],
    };

    if (this.sendType === 'mailto') {
      tools.tbar.push({
        id: 'generateEmail',
        action: 'constructReport',
        svg: 'mail',
        title: 'Generate Email Report',
      });
    }

    if (this.sendType === 'copy') {
      const flashVars = this.constructFlashVars({
        retrieveFunction: `App.views.${this.id}.constructReport`,
        callbackFunction: `App.views.${this.id}.onCopySuccess`,
        labelVisible: '0',
      });

      tools.tbar.push({
        template: this.copyButtonTemplate,
        flashVars,
      });
    }

    return this.tools || tools;
  },

  /**
   * Determines the method to use for sending the error report
   * 'mailto': Used on Mobile devices to indicate to form a mailto: url
   * 'copy': Used on desktops to indicate a "copy" button should be placed on the page
   */
  determineSendType: function determineSendType() {
    switch (true) {
      case (typeof window.orientation !== 'undefined'):
        this.sendType = 'mailto';
        break;
      default:
        this.sendType = 'copy';
    }
  },

  constructFlashVars: function constructFlashVars(options) {
    const flashVars = [];
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        flashVars.push(`${key}=${options[key]}`);
      }
    }

    return flashVars.join('&');
  },

  onCopySuccess: function onCopySuccess() {
    alert(this.copiedSuccessText); // eslint-disable-line
  },

  constructReport: function constructReport() {
    const body = `\r\n\r\n\r\n-----------------\r\n${json.toJson(this.entry, true)}`;

    if (this.sendType === 'mailto') {
      this.sendEmailReport(body);
    } else {
      return body;
    }
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
