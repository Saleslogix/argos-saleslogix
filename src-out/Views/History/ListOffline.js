define("crm/Views/History/ListOffline", ["exports", "dojo/_base/declare", "argos/_ListBase", "argos/Models/Types", "argos/I18n", "../../Models/Names", "../../Format"], function (_exports, _declare, _ListBase2, _Types, _I18n, _Names, _Format) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _ListBase2 = _interopRequireDefault(_ListBase2);
  _Types = _interopRequireDefault(_Types);
  _I18n = _interopRequireDefault(_I18n);
  _Names = _interopRequireDefault(_Names);
  _Format = _interopRequireDefault(_Format);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('historyListOffline');
  var dateResource = (0, _I18n["default"])('historyListOfflineFormat');

  var __class = (0, _declare["default"])('crm.Views.Account.ListOffline', [_ListBase2["default"]], {
    // Localization
    titleText: resource.titleText,
    // Templates
    itemTemplate: new Simplate(["\n    <p>{%: $.Text %}</p>\n  "]),
    // View Properties
    detailView: 'history_detail_offline',
    id: 'history_list_offline',
    security: 'Entities/Account/View',
    insertView: 'history_edit_offline',
    editView: 'history_edit',
    entityName: 'History',
    pageSize: 100,
    resourceKind: 'history',
    modelName: _Names["default"].HISTORY,
    enableOfflineSupport: true,
    enableOnlineSupport: true,
    enableSearch: false,
    expose: true,
    labelProperty: 'Text',
    enableActions: true,
    _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
      queryOptions.filter = function (entity) {
        return entity && typeof entity.Text === 'string';
      };

      return queryOptions;
    },
    getIdentity: function getIdentity(entry) {
      return entry && entry.$offlineDate;
    },
    getTitle: function getTitle(entry) {
      if (App.is24HourClock()) {
        return "".concat(_Format["default"].date(entry.$offlineDate, dateResource.dateFormatText24));
      }

      return "".concat(_Format["default"].date(entry.$offlineDate, dateResource.dateFormatText));
    },
    getModel: function getModel() {
      var model = App.ModelManager.getModel(_Names["default"].HISTORY, _Types["default"].OFFLINE);
      return model;
    },
    createActionLayout: function createActionLayout() {
      return this.actions || (this.actions = [{
        id: 'edit',
        cls: 'edit',
        label: resource.saveToCRMText,
        security: 'Entities/Account/Edit',
        action: 'navigateToEditView',
        enabled: function enabled() {
          return App.isOnline();
        }
      }, {
        id: 'delete',
        cls: 'delete',
        label: resource.deleteNoteText,
        action: 'deleteNote'
      }]);
    },
    navigateToEditView: function navigateToEditView(action, selection) {
      var view = this.app.getView(this.editView);
      var key = selection.data[this.idProperty];
      var options = {
        key: key,
        selectedEntry: selection.data,
        fromContext: this,
        insert: true,
        fromOffline: true
      };

      if (view) {
        view.show(options);
      }
    },
    deleteNote: function deleteNote(action, selection) {
      var _this = this;

      var selectedEntry = selection && selection.data;
      this.removeEntry(selectedEntry).then(function () {
        _this.forceRefresh();
      });
    },
    show: function show() {
      this.refreshRequired = true;
      this.inherited(show, arguments);
    },
    _onRefresh: function _onRefresh(args) {
      var _this2 = this;

      this.inherited(_onRefresh, arguments);

      if (typeof args === 'undefined' || args === null) {
        return;
      }

      var entry = args.data;

      if (typeof entry === 'undefined' || entry == null) {
        return;
      }

      if (args.resourceKind === 'history' && typeof args.id === 'undefined' && typeof args.key === 'undefined') {
        entry.UID = args.UID;
        this.removeEntry(entry).then(function () {
          _this2.forceRefresh();
        });
      } // Edit will pass response message from pouch that the data was saved: { ok: true, ... }


      if (entry.ok === true) {
        this.refreshRequired = true;
      }
    },
    removeEntry: function removeEntry(entry) {
      var model = this.getModel();
      return model.deleteEntry(entry);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});