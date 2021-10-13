define('crm/Views/HistoryAttendee/List', ['module', 'exports', 'dojo/_base/declare', 'argos/List', '../../Models/Names', '../../Action', 'argos/I18n', 'crm/Format', '../../Models/Activity/ActivityTypeText'], function (module, exports, _declare, _List, _Names, _Action, _I18n, _Format, _ActivityTypeText) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _Names2 = _interopRequireDefault(_Names);

  var _Action2 = _interopRequireDefault(_Action);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Format2 = _interopRequireDefault(_Format);

  var _ActivityTypeText2 = _interopRequireDefault(_ActivityTypeText);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const resource = (0, _I18n2.default)('historyAttendeeList'); /* Copyright 2020 Infor
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

  const __class = (0, _declare2.default)('crm.Views.HistoryAttendee.List', [_List2.default], {
    // Localization
    titleText: resource.titleText,
    callPhoneActionText: resource.callPhoneActionText,

    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.AccountName %}</p>', '<p class="micro-text">{%: $.EntityType %}</p>', '<p class="micro-text">{%: $.RoleName %}</p>', '<span class="hyperlink" data-action="callPhone" data-key="{%: $.$key %}">{%: $$.formatPhone($.PhoneNumber) %}</span>', '<p class="micro-text">{%: $.Email %}</p>', '<p class="micro-text">{%: $.TimeZone %}</p>']),

    // View Properties
    id: 'history_attendee_list',
    security: null,
    itemIconClass: 'spreadsheet',
    detailView: 'history_attendee_detail',
    insertView: '',
    enableActions: true,
    pageSize: 105,
    resourceKind: 'historyAttendees',
    modelName: _Names2.default.HISTORYATTENDEE,

    callPhone: function callPhone(params) {
      this.invokeActionItemBy(a => {
        return a.id === 'callPhone';
      }, params.key);
    },
    formatPhone: function formatPhone(phone) {
      return _Format2.default.phone(phone);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return `upper(Name) like "%${this.escapeSearchQuery(searchQuery.toUpperCase())}%"`;
    },
    getTitle: function getTitle(entry) {
      if (!entry) {
        return '';
      }

      return this._model && this._model.getEntityDescription(entry) || entry.Name;
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'callPhone',
        cls: 'phone',
        label: this.callPhoneActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'PhoneNumber'),
        fn: _Action2.default.callPhone.bindDelegate(this, 'PhoneNumber', _ActivityTypeText2.default.atPhoneCall)
      }]);
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});