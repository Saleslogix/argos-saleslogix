define('crm/Views/ErrorLog/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/json', 'crm/Format', 'argos/ErrorManager', 'argos/Detail', 'argos/I18n'], function (module, exports, _declare, _json, _Format, _ErrorManager, _Detail, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _json2 = _interopRequireDefault(_json);

  var _Format2 = _interopRequireDefault(_Format);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('errorLogDetail');
  var dtFormatResource = (0, _I18n2.default)('errorLogDetailDateTimeFormat');

  var __class = (0, _declare2.default)('crm.Views.ErrorLog.Detail', [_Detail2.default], {
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
    longDetailProperty: new Simplate(['<div class="row note-text-row" data-property="{%= $.name %}">', '<label>{%: $.label %}</label>', '<pre>', '{%= $.value %}', '</pre>', '</div>']),

    // View Properties
    id: 'errorlog_detail',

    // Email address to be placed in the "To:" field when sending a report via a mobile device
    defaultToAddress: null,

    init: function init() {
      this.inherited(init, arguments);
    },

    createToolLayout: function createToolLayout() {
      var tools = {
        tbar: []
      };

      tools.tbar.push({
        id: 'generateEmail',
        action: 'constructReport',
        svg: 'mail'
      });

      return this.tools || tools;
    },

    constructReport: function constructReport() {
      var body = '\r\n\r\n\r\n-----------------\r\n' + _json2.default.toJson(this.entry, true);
      this.sendEmailReport(body);
    },

    sendEmailReport: function sendEmailReport(body) {
      var email = this.defaultToAddress || '';
      var subject = encodeURIComponent(this.emailSubjectText);
      var theBody = encodeURIComponent(body);
      App.initiateEmail(email, subject, theBody);
    },

    requestData: function requestData() {
      var errorItem = _ErrorManager2.default.getError('$key', this.options.key);
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
          renderer: _Format2.default.date.bindDelegate(this, App.is24HourClock() ? this.errorDateFormatText24 : this.errorDateFormatText)
        }, {
          label: this.statusTextText,
          name: 'Description',
          property: 'Description'
        }, {
          label: this.errorText,
          name: 'Error',
          property: 'Error'
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});