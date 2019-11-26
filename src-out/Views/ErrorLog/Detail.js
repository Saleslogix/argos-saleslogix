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

  /**
   * @class crm.Views.ErrorLog.Detail
   * @extends argos.Detail
   */
  var __class = (0, _declare2.default)('crm.Views.ErrorLog.Detail', [_Detail2.default], /** @lends crm.Views.ErrorLog.Detail# */{
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

    /**
     * Email address to be placed in the "To:" field when sending a report via a mobile device
     */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9FcnJvckxvZy9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsImRldGFpbHNUZXh0IiwiZXJyb3JEYXRlVGV4dCIsImVycm9yRGF0ZUZvcm1hdFRleHQiLCJlcnJvckRhdGVGb3JtYXRUZXh0MjQiLCJzdGF0dXNUZXh0VGV4dCIsInVybFRleHQiLCJlbnRpdHlUZXh0IiwiZXJyb3JUZXh0IiwiZW1haWxTdWJqZWN0VGV4dCIsImNvcGllZFN1Y2Nlc3NUZXh0IiwibG9uZ0RldGFpbFByb3BlcnR5IiwiU2ltcGxhdGUiLCJpZCIsImRlZmF1bHRUb0FkZHJlc3MiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsInB1c2giLCJhY3Rpb24iLCJzdmciLCJjb25zdHJ1Y3RSZXBvcnQiLCJib2R5IiwidG9Kc29uIiwiZW50cnkiLCJzZW5kRW1haWxSZXBvcnQiLCJlbWFpbCIsInN1YmplY3QiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ0aGVCb2R5IiwiQXBwIiwiaW5pdGlhdGVFbWFpbCIsInJlcXVlc3REYXRhIiwiZXJyb3JJdGVtIiwiZ2V0RXJyb3IiLCJvcHRpb25zIiwia2V5IiwicHJvY2Vzc0VudHJ5IiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwidGl0bGUiLCJuYW1lIiwiY2hpbGRyZW4iLCJsYWJlbCIsInByb3BlcnR5IiwicmVuZGVyZXIiLCJkYXRlIiwiYmluZERlbGVnYXRlIiwiaXMyNEhvdXJDbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1BLFdBQVcsb0JBQVksZ0JBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksOEJBQVosQ0FBekI7O0FBRUE7Ozs7QUFJQSxNQUFNQyxV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QVRPO0FBSDBCLE9BQUQsQ0FBOUIsQ0FBUDtBQWtCRDtBQXRGb0csR0FBdkYsQ0FBaEI7O29CQXlGZWhELE8iLCJmaWxlIjoiRGV0YWlsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGpzb24gZnJvbSAnZG9qby9fYmFzZS9qc29uJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICdjcm0vRm9ybWF0JztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgRGV0YWlsIGZyb20gJ2FyZ29zL0RldGFpbCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2Vycm9yTG9nRGV0YWlsJyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJyb3JMb2dEZXRhaWxEYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuRXJyb3JMb2cuRGV0YWlsXHJcbiAqIEBleHRlbmRzIGFyZ29zLkRldGFpbFxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5FcnJvckxvZy5EZXRhaWwnLCBbRGV0YWlsXSwgLyoqIEBsZW5kcyBjcm0uVmlld3MuRXJyb3JMb2cuRGV0YWlsIyAqL3tcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBkZXRhaWxzVGV4dDogcmVzb3VyY2UuZGV0YWlsc1RleHQsXHJcbiAgZXJyb3JEYXRlVGV4dDogcmVzb3VyY2UuZXJyb3JEYXRlVGV4dCxcclxuICBlcnJvckRhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmVycm9yRGF0ZUZvcm1hdFRleHQsXHJcbiAgZXJyb3JEYXRlRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLmVycm9yRGF0ZUZvcm1hdFRleHQyNCxcclxuICBzdGF0dXNUZXh0VGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dFRleHQsXHJcbiAgdXJsVGV4dDogcmVzb3VyY2UudXJsVGV4dCxcclxuICBlbnRpdHlUZXh0OiByZXNvdXJjZS5lbnRpdHlUZXh0LFxyXG4gIGVycm9yVGV4dDogcmVzb3VyY2UuZXJyb3JUZXh0LFxyXG4gIGVtYWlsU3ViamVjdFRleHQ6IHJlc291cmNlLmVtYWlsU3ViamVjdFRleHQsXHJcbiAgY29waWVkU3VjY2Vzc1RleHQ6IHJlc291cmNlLmNvcGllZFN1Y2Nlc3NUZXh0LFxyXG5cclxuICAvLyBUZW1wbGF0ZXNcclxuICBsb25nRGV0YWlsUHJvcGVydHk6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cInJvdyBub3RlLXRleHQtcm93XCIgZGF0YS1wcm9wZXJ0eT1cInslPSAkLm5hbWUgJX1cIj4nLFxyXG4gICAgJzxsYWJlbD57JTogJC5sYWJlbCAlfTwvbGFiZWw+JyxcclxuICAgICc8cHJlPicsXHJcbiAgICAneyU9ICQudmFsdWUgJX0nLFxyXG4gICAgJzwvcHJlPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnJvcmxvZ19kZXRhaWwnLFxyXG5cclxuICAvKipcclxuICAgKiBFbWFpbCBhZGRyZXNzIHRvIGJlIHBsYWNlZCBpbiB0aGUgXCJUbzpcIiBmaWVsZCB3aGVuIHNlbmRpbmcgYSByZXBvcnQgdmlhIGEgbW9iaWxlIGRldmljZVxyXG4gICAqL1xyXG4gIGRlZmF1bHRUb0FkZHJlc3M6IG51bGwsXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICBjb25zdCB0b29scyA9IHtcclxuICAgICAgdGJhcjogW10sXHJcbiAgICB9O1xyXG5cclxuICAgIHRvb2xzLnRiYXIucHVzaCh7XHJcbiAgICAgIGlkOiAnZ2VuZXJhdGVFbWFpbCcsXHJcbiAgICAgIGFjdGlvbjogJ2NvbnN0cnVjdFJlcG9ydCcsXHJcbiAgICAgIHN2ZzogJ21haWwnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgdG9vbHM7XHJcbiAgfSxcclxuXHJcbiAgY29uc3RydWN0UmVwb3J0OiBmdW5jdGlvbiBjb25zdHJ1Y3RSZXBvcnQoKSB7XHJcbiAgICBjb25zdCBib2R5ID0gYFxcclxcblxcclxcblxcclxcbi0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuJHtqc29uLnRvSnNvbih0aGlzLmVudHJ5LCB0cnVlKX1gO1xyXG4gICAgdGhpcy5zZW5kRW1haWxSZXBvcnQoYm9keSk7XHJcbiAgfSxcclxuXHJcbiAgc2VuZEVtYWlsUmVwb3J0OiBmdW5jdGlvbiBzZW5kRW1haWxSZXBvcnQoYm9keSkge1xyXG4gICAgY29uc3QgZW1haWwgPSB0aGlzLmRlZmF1bHRUb0FkZHJlc3MgfHwgJyc7XHJcbiAgICBjb25zdCBzdWJqZWN0ID0gZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuZW1haWxTdWJqZWN0VGV4dCk7XHJcbiAgICBjb25zdCB0aGVCb2R5ID0gZW5jb2RlVVJJQ29tcG9uZW50KGJvZHkpO1xyXG4gICAgQXBwLmluaXRpYXRlRW1haWwoZW1haWwsIHN1YmplY3QsIHRoZUJvZHkpO1xyXG4gIH0sXHJcblxyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgIGNvbnN0IGVycm9ySXRlbSA9IEVycm9yTWFuYWdlci5nZXRFcnJvcignJGtleScsIHRoaXMub3B0aW9ucy5rZXkpO1xyXG4gICAgdGhpcy5wcm9jZXNzRW50cnkoZXJyb3JJdGVtKTtcclxuICB9LFxyXG5cclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuZXJyb3JEYXRlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEYXRlJyxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmRhdGUuYmluZERlbGVnYXRlKHRoaXMsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuZXJyb3JEYXRlRm9ybWF0VGV4dDI0IDogdGhpcy5lcnJvckRhdGVGb3JtYXRUZXh0KSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXR1c1RleHRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5lcnJvclRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Vycm9yJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Vycm9yJyxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=