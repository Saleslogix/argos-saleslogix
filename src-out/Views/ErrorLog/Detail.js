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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9FcnJvckxvZy9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsImRldGFpbHNUZXh0IiwiZXJyb3JEYXRlVGV4dCIsImVycm9yRGF0ZUZvcm1hdFRleHQiLCJlcnJvckRhdGVGb3JtYXRUZXh0MjQiLCJzdGF0dXNUZXh0VGV4dCIsInVybFRleHQiLCJlbnRpdHlUZXh0IiwiZXJyb3JUZXh0IiwiZW1haWxTdWJqZWN0VGV4dCIsImNvcGllZFN1Y2Nlc3NUZXh0IiwibG9uZ0RldGFpbFByb3BlcnR5IiwiU2ltcGxhdGUiLCJpZCIsImRlZmF1bHRUb0FkZHJlc3MiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsInB1c2giLCJhY3Rpb24iLCJzdmciLCJjb25zdHJ1Y3RSZXBvcnQiLCJib2R5IiwidG9Kc29uIiwiZW50cnkiLCJzZW5kRW1haWxSZXBvcnQiLCJlbWFpbCIsInN1YmplY3QiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ0aGVCb2R5IiwiQXBwIiwiaW5pdGlhdGVFbWFpbCIsInJlcXVlc3REYXRhIiwiZXJyb3JJdGVtIiwiZ2V0RXJyb3IiLCJvcHRpb25zIiwia2V5IiwicHJvY2Vzc0VudHJ5IiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwidGl0bGUiLCJuYW1lIiwiY2hpbGRyZW4iLCJsYWJlbCIsInByb3BlcnR5IiwicmVuZGVyZXIiLCJkYXRlIiwiYmluZERlbGVnYXRlIiwiaXMyNEhvdXJDbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1BLFdBQVcsb0JBQVksZ0JBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksOEJBQVosQ0FBekI7O0FBRUE7Ozs7QUFJQSxNQUFNQyxV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RCxDQUE5QixDQUFQO0FBa0JEO0FBdEZvRyxHQUF2RixDQUFoQjs7b0JBeUZlaEQsTyIsImZpbGUiOiJEZXRhaWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQganNvbiBmcm9tICdkb2pvL19iYXNlL2pzb24nO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJyb3JMb2dEZXRhaWwnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnJvckxvZ0RldGFpbERhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5FcnJvckxvZy5EZXRhaWxcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkVycm9yTG9nLkRldGFpbCcsIFtEZXRhaWxdLCAvKiogQGxlbmRzIGNybS5WaWV3cy5FcnJvckxvZy5EZXRhaWwjICove1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGRldGFpbHNUZXh0OiByZXNvdXJjZS5kZXRhaWxzVGV4dCxcclxuICBlcnJvckRhdGVUZXh0OiByZXNvdXJjZS5lcnJvckRhdGVUZXh0LFxyXG4gIGVycm9yRGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZXJyb3JEYXRlRm9ybWF0VGV4dCxcclxuICBlcnJvckRhdGVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2UuZXJyb3JEYXRlRm9ybWF0VGV4dDI0LFxyXG4gIHN0YXR1c1RleHRUZXh0OiByZXNvdXJjZS5zdGF0dXNUZXh0VGV4dCxcclxuICB1cmxUZXh0OiByZXNvdXJjZS51cmxUZXh0LFxyXG4gIGVudGl0eVRleHQ6IHJlc291cmNlLmVudGl0eVRleHQsXHJcbiAgZXJyb3JUZXh0OiByZXNvdXJjZS5lcnJvclRleHQsXHJcbiAgZW1haWxTdWJqZWN0VGV4dDogcmVzb3VyY2UuZW1haWxTdWJqZWN0VGV4dCxcclxuICBjb3BpZWRTdWNjZXNzVGV4dDogcmVzb3VyY2UuY29waWVkU3VjY2Vzc1RleHQsXHJcblxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGxvbmdEZXRhaWxQcm9wZXJ0eTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwicm93IG5vdGUtdGV4dC1yb3dcIiBkYXRhLXByb3BlcnR5PVwieyU9ICQubmFtZSAlfVwiPicsXHJcbiAgICAnPGxhYmVsPnslOiAkLmxhYmVsICV9PC9sYWJlbD4nLFxyXG4gICAgJzxwcmU+JyxcclxuICAgICd7JT0gJC52YWx1ZSAlfScsXHJcbiAgICAnPC9wcmU+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2Vycm9ybG9nX2RldGFpbCcsXHJcblxyXG4gIC8qKlxyXG4gICAqIEVtYWlsIGFkZHJlc3MgdG8gYmUgcGxhY2VkIGluIHRoZSBcIlRvOlwiIGZpZWxkIHdoZW4gc2VuZGluZyBhIHJlcG9ydCB2aWEgYSBtb2JpbGUgZGV2aWNlXHJcbiAgICovXHJcbiAgZGVmYXVsdFRvQWRkcmVzczogbnVsbCxcclxuXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIGNvbnN0IHRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbXSxcclxuICAgIH07XHJcblxyXG4gICAgdG9vbHMudGJhci5wdXNoKHtcclxuICAgICAgaWQ6ICdnZW5lcmF0ZUVtYWlsJyxcclxuICAgICAgYWN0aW9uOiAnY29uc3RydWN0UmVwb3J0JyxcclxuICAgICAgc3ZnOiAnbWFpbCcsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCB0b29scztcclxuICB9LFxyXG5cclxuICBjb25zdHJ1Y3RSZXBvcnQ6IGZ1bmN0aW9uIGNvbnN0cnVjdFJlcG9ydCgpIHtcclxuICAgIGNvbnN0IGJvZHkgPSBgXFxyXFxuXFxyXFxuXFxyXFxuLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4ke2pzb24udG9Kc29uKHRoaXMuZW50cnksIHRydWUpfWA7XHJcbiAgICB0aGlzLnNlbmRFbWFpbFJlcG9ydChib2R5KTtcclxuICB9LFxyXG5cclxuICBzZW5kRW1haWxSZXBvcnQ6IGZ1bmN0aW9uIHNlbmRFbWFpbFJlcG9ydChib2R5KSB7XHJcbiAgICBjb25zdCBlbWFpbCA9IHRoaXMuZGVmYXVsdFRvQWRkcmVzcyB8fCAnJztcclxuICAgIGNvbnN0IHN1YmplY3QgPSBlbmNvZGVVUklDb21wb25lbnQodGhpcy5lbWFpbFN1YmplY3RUZXh0KTtcclxuICAgIGNvbnN0IHRoZUJvZHkgPSBlbmNvZGVVUklDb21wb25lbnQoYm9keSk7XHJcbiAgICBBcHAuaW5pdGlhdGVFbWFpbChlbWFpbCwgc3ViamVjdCwgdGhlQm9keSk7XHJcbiAgfSxcclxuXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgY29uc3QgZXJyb3JJdGVtID0gRXJyb3JNYW5hZ2VyLmdldEVycm9yKCcka2V5JywgdGhpcy5vcHRpb25zLmtleSk7XHJcbiAgICB0aGlzLnByb2Nlc3NFbnRyeShlcnJvckl0ZW0pO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5lcnJvckRhdGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0RhdGUnLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZGF0ZS5iaW5kRGVsZWdhdGUodGhpcywgKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy5lcnJvckRhdGVGb3JtYXRUZXh0MjQgOiB0aGlzLmVycm9yRGF0ZUZvcm1hdFRleHQpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhdHVzVGV4dFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVycm9yVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXJyb3InLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXJyb3InLFxyXG4gICAgICB9XSxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==