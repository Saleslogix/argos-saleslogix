define('crm/Views/History/ListOffline', ['module', 'exports', 'dojo/_base/declare', 'argos/_ListBase', 'argos/Models/Types', 'argos/I18n', '../../Models/Names', '../../Format'], function (module, exports, _declare, _ListBase2, _Types, _I18n, _Names, _Format) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ListBase3 = _interopRequireDefault(_ListBase2);

  var _Types2 = _interopRequireDefault(_Types);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  var _Format2 = _interopRequireDefault(_Format);

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

  const resource = (0, _I18n2.default)('historyListOffline');
  const dateResource = (0, _I18n2.default)('historyListOfflineFormat');

  const __class = (0, _declare2.default)('crm.Views.Account.ListOffline', [_ListBase3.default], {
    // Localization
    titleText: resource.titleText,

    // Templates
    itemTemplate: new Simplate([`
    <p>{%: $.Text %}</p>
  `]),

    // View Properties
    detailView: 'history_detail_offline',
    id: 'history_list_offline',
    security: 'Entities/Account/View',
    insertView: 'history_edit_offline',
    editView: 'history_edit',
    entityName: 'History',
    pageSize: 100,
    resourceKind: 'history',
    modelName: _Names2.default.HISTORY,
    enableOfflineSupport: true,
    enableOnlineSupport: true,
    enableSearch: false,
    expose: true,
    labelProperty: 'Text',
    enableActions: true,
    _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
      queryOptions.filter = entity => {
        return entity && typeof entity.Text === 'string';
      };

      return queryOptions;
    },
    getIdentity: function getIdentity(entry) {
      return entry && entry.$offlineDate;
    },
    getTitle: function getTitle(entry) {
      if (App.is24HourClock()) {
        return `${_Format2.default.date(entry.$offlineDate, dateResource.dateFormatText24)}`;
      }

      return `${_Format2.default.date(entry.$offlineDate, dateResource.dateFormatText)}`;
    },
    getModel: function getModel() {
      const model = App.ModelManager.getModel(_Names2.default.HISTORY, _Types2.default.OFFLINE);
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
      const view = this.app.getView(this.editView);
      const key = selection.data[this.idProperty];
      const options = {
        key,
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
      const selectedEntry = selection && selection.data;
      this.removeEntry(selectedEntry).then(() => {
        this.forceRefresh();
      });
    },
    show: function show() {
      this.refreshRequired = true;
      this.inherited(show, arguments);
    },
    _onRefresh: function _onRefresh(args) {
      this.inherited(_onRefresh, arguments);
      if (typeof args === 'undefined' || args === null) {
        return;
      }

      const entry = args.data;
      if (typeof entry === 'undefined' || entry == null) {
        return;
      }

      if (args.resourceKind === 'history' && typeof args.id === 'undefined' && typeof args.key === 'undefined') {
        entry.UID = args.UID;
        this.removeEntry(entry).then(() => {
          this.forceRefresh();
        });
      }

      // Edit will pass response message from pouch that the data was saved: { ok: true, ... }
      if (entry.ok === true) {
        this.refreshRequired = true;
      }
    },
    removeEntry: function removeEntry(entry) {
      const model = this.getModel();
      return model.deleteEntry(entry);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});