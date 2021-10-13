define('crm/Views/ActivityAttendee/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/connect', 'argos/List', '../../Models/Names', '../../Action', 'argos/I18n', 'crm/Format', '../../Models/Activity/ActivityTypeText'], function (module, exports, _declare, _connect, _List, _Names, _Action, _I18n, _Format, _ActivityTypeText) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _connect2 = _interopRequireDefault(_connect);

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

  /* Copyright 2020 Infor
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

  var resource = (0, _I18n2.default)('activityAttendeeList');

  var __class = (0, _declare2.default)('crm.Views.ActivityAttendee.List', [_List2.default], {
    // Localization
    titleText: resource.titleText,
    callPhoneActionText: resource.callPhoneActionText,
    deleteText: resource.deleteText,
    confirmDeleteText: resource.confirmDeleteText,

    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.AccountName %}</p>', '<p class="micro-text">{%: $.EntityType %}</p>', '<p class="micro-text">{%: $.RoleName %}</p>', '<span class="hyperlink" data-action="callPhone" data-key="{%: $.$key %}">{%: $$.formatPhone($.PhoneNumber) %}</span>', '<p class="micro-text">{%: $.Email %}</p>', '<p class="micro-text">{%: $.TimeZone %}</p>']),

    // View Properties
    id: 'activity_attendee_list',
    security: null, // 'Entities/Activity/View',
    itemIconClass: 'spreadsheet',
    detailView: 'activity_attendee_detail',
    insertView: 'activity_attendee_types_list',
    enableActions: true,
    pageSize: 105,
    resourceKind: 'activityAttendees',
    modelName: _Names2.default.ACTIVITYATTENDEE,

    callPhone: function callPhone(params) {
      this.invokeActionItemBy(function (a) {
        return a.id === 'callPhone';
      }, params.key);
    },
    formatPhone: function formatPhone(phone) {
      return _Format2.default.phone(phone);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return 'upper(Name) like "%' + this.escapeSearchQuery(searchQuery.toUpperCase()) + '%"';
    },
    getTitle: function getTitle(entry) {
      if (!entry) {
        return '';
      }

      return this._model && this._model.getEntityDescription(entry) || entry.Name;
    },
    deleteAttendee: function deleteAttendee(_, selection) {
      var _this = this;

      App.modal.createSimpleDialog({
        title: 'alert',
        content: this.confirmDeleteText,
        getContent: function getContent() {}
      }).then(function () {
        var entry = selection && selection.data;
        var model = _this.getModel();
        model.deleteEntry(entry.$key).then(function () {
          _connect2.default.publish('/app/refresh', [{
            resourceKind: _this.resourceKind
          }]);
          _this.forceRefresh();
        });
      });
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'callPhone',
        cls: 'phone',
        label: this.callPhoneActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'PhoneNumber'),
        fn: _Action2.default.callPhone.bindDelegate(this, 'PhoneNumber', _ActivityTypeText2.default.atPhoneCall)
      }, {
        id: 'deleteAttendee',
        cls: 'delete',
        label: this.deleteText,
        fn: this.deleteAttendee.bind(this)
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});