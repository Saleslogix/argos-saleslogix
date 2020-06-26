define("crm/Views/ActivityAttendee/List", ["exports", "dojo/_base/declare", "argos/List", "../../Models/Names", "../../Action", "argos/I18n", "crm/Format", "../../Models/Activity/ActivityTypeText"], function (_exports, _declare, _List, _Names, _Action, _I18n, _Format, _ActivityTypeText) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _List = _interopRequireDefault(_List);
  _Names = _interopRequireDefault(_Names);
  _Action = _interopRequireDefault(_Action);
  _I18n = _interopRequireDefault(_I18n);
  _Format = _interopRequireDefault(_Format);
  _ActivityTypeText = _interopRequireDefault(_ActivityTypeText);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('activityAttendeeList');

  var __class = (0, _declare["default"])('crm.Views.ActivityAttendee.List', [_List["default"]], {
    // Localization
    titleText: resource.titleText,
    callPhoneActionText: resource.callPhoneActionText,
    deleteText: resource.deleteText,
    confirmDeleteText: resource.confirmDeleteText,
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">{%: $.AccountName %}</p>', '<p class="micro-text">{%: $.EntityType %}</p>', '<p class="micro-text">{%: $.RoleName %}</p>', '<span class="hyperlink" data-action="callPhone" data-key="{%: $.$key %}">{%: $$.formatPhone($.PhoneNumber) %}</span>', '<p class="micro-text">{%: $.Email %}</p>', '<p class="micro-text">{%: $.TimeZone %}</p>']),
    // View Properties
    id: 'activity_attendee_list',
    security: null,
    // 'Entities/Activity/View',
    itemIconClass: 'spreadsheet',
    detailView: 'activity_attendee_detail',
    insertView: 'activity_attendee_types_list',
    enableActions: true,
    pageSize: 105,
    resourceKind: 'activityAttendees',
    modelName: _Names["default"].ACTIVITYATTENDEE,
    callPhone: function callPhone(params) {
      this.invokeActionItemBy(function (a) {
        return a.id === 'callPhone';
      }, params.key);
    },
    formatPhone: function formatPhone(phone) {
      return _Format["default"].phone(phone);
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return "upper(Name) like \"%".concat(this.escapeSearchQuery(searchQuery.toUpperCase()), "%\"");
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
          _this.forceRefresh();
        });
      });
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'callPhone',
        cls: 'phone',
        label: this.callPhoneActionText,
        enabled: _Action["default"].hasProperty.bindDelegate(this, 'PhoneNumber'),
        fn: _Action["default"].callPhone.bindDelegate(this, 'PhoneNumber', _ActivityTypeText["default"].atPhoneCall)
      }, {
        id: 'deleteAttendee',
        cls: 'delete',
        label: this.deleteText,
        fn: this.deleteAttendee.bind(this)
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});