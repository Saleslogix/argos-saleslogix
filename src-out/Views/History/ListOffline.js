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

  var resource = (0, _I18n2.default)('historyListOffline');
  var dateResource = (0, _I18n2.default)('historyListOfflineFormat');

  var __class = (0, _declare2.default)('crm.Views.Account.ListOffline', [_ListBase3.default], {
    // Localization
    titleText: resource.titleText,

    // Templates
    itemTemplate: new Simplate(['\n    <p>{%: $.Text %}</p>\n  ']),

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
        return '' + _Format2.default.date(entry.$offlineDate, dateResource.dateFormatText24);
      }

      return '' + _Format2.default.date(entry.$offlineDate, dateResource.dateFormatText);
    },
    getModel: function getModel() {
      var model = App.ModelManager.getModel(_Names2.default.HISTORY, _Types2.default.OFFLINE);
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
      }

      // Edit will pass response message from pouch that the data was saved: { ok: true, ... }
      if (entry.ok === true) {
        this.refreshRequired = true;
      }
    },
    removeEntry: function removeEntry(entry) {
      var model = this.getModel();
      return model.deleteEntry(entry);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9IaXN0b3J5L0xpc3RPZmZsaW5lLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZGF0ZVJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwiZGV0YWlsVmlldyIsImlkIiwic2VjdXJpdHkiLCJpbnNlcnRWaWV3IiwiZWRpdFZpZXciLCJlbnRpdHlOYW1lIiwicGFnZVNpemUiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJISVNUT1JZIiwiZW5hYmxlT2ZmbGluZVN1cHBvcnQiLCJlbmFibGVPbmxpbmVTdXBwb3J0IiwiZW5hYmxlU2VhcmNoIiwiZXhwb3NlIiwibGFiZWxQcm9wZXJ0eSIsImVuYWJsZUFjdGlvbnMiLCJfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zIiwicXVlcnlPcHRpb25zIiwiZmlsdGVyIiwiZW50aXR5IiwiVGV4dCIsImdldElkZW50aXR5IiwiZW50cnkiLCIkb2ZmbGluZURhdGUiLCJnZXRUaXRsZSIsIkFwcCIsImlzMjRIb3VyQ2xvY2siLCJkYXRlIiwiZGF0ZUZvcm1hdFRleHQyNCIsImRhdGVGb3JtYXRUZXh0IiwiZ2V0TW9kZWwiLCJtb2RlbCIsIk1vZGVsTWFuYWdlciIsIk9GRkxJTkUiLCJjcmVhdGVBY3Rpb25MYXlvdXQiLCJhY3Rpb25zIiwiY2xzIiwibGFiZWwiLCJzYXZlVG9DUk1UZXh0IiwiYWN0aW9uIiwiZW5hYmxlZCIsImlzT25saW5lIiwiZGVsZXRlTm90ZVRleHQiLCJuYXZpZ2F0ZVRvRWRpdFZpZXciLCJzZWxlY3Rpb24iLCJ2aWV3IiwiYXBwIiwiZ2V0VmlldyIsImtleSIsImRhdGEiLCJpZFByb3BlcnR5Iiwib3B0aW9ucyIsInNlbGVjdGVkRW50cnkiLCJmcm9tQ29udGV4dCIsImluc2VydCIsImZyb21PZmZsaW5lIiwic2hvdyIsImRlbGV0ZU5vdGUiLCJyZW1vdmVFbnRyeSIsInRoZW4iLCJmb3JjZVJlZnJlc2giLCJyZWZyZXNoUmVxdWlyZWQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJfb25SZWZyZXNoIiwiYXJncyIsIlVJRCIsIm9rIiwiZGVsZXRlRW50cnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxXQUFXLG9CQUFZLG9CQUFaLENBQWpCO0FBQ0EsTUFBTUMsZUFBZSxvQkFBWSwwQkFBWixDQUFyQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLCtCQUFSLEVBQXlDLG9CQUF6QyxFQUFzRDtBQUNwRTtBQUNBQyxlQUFXSCxTQUFTRyxTQUZnRDs7QUFJcEU7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLGtDQUFiLENBTHNEOztBQVNwRTtBQUNBQyxnQkFBWSx3QkFWd0Q7QUFXcEVDLFFBQUksc0JBWGdFO0FBWXBFQyxjQUFVLHVCQVowRDtBQWFwRUMsZ0JBQVksc0JBYndEO0FBY3BFQyxjQUFVLGNBZDBEO0FBZXBFQyxnQkFBWSxTQWZ3RDtBQWdCcEVDLGNBQVUsR0FoQjBEO0FBaUJwRUMsa0JBQWMsU0FqQnNEO0FBa0JwRUMsZUFBVyxnQkFBWUMsT0FsQjZDO0FBbUJwRUMsMEJBQXNCLElBbkI4QztBQW9CcEVDLHlCQUFxQixJQXBCK0M7QUFxQnBFQyxrQkFBYyxLQXJCc0Q7QUFzQnBFQyxZQUFRLElBdEI0RDtBQXVCcEVDLG1CQUFlLE1BdkJxRDtBQXdCcEVDLG1CQUFlLElBeEJxRDtBQXlCcEVDLCtCQUEyQixTQUFTQSx5QkFBVCxDQUFtQ0MsWUFBbkMsRUFBaUQ7QUFDMUVBLG1CQUFhQyxNQUFiLEdBQXNCLFVBQUNDLE1BQUQsRUFBWTtBQUNoQyxlQUFPQSxVQUFVLE9BQU9BLE9BQU9DLElBQWQsS0FBdUIsUUFBeEM7QUFDRCxPQUZEOztBQUlBLGFBQU9ILFlBQVA7QUFDRCxLQS9CbUU7QUFnQ3BFSSxpQkFBYSxTQUFTQSxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUN2QyxhQUFPQSxTQUFTQSxNQUFNQyxZQUF0QjtB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MUIsY0FBTTRDLEdBQU4sR0FBWUQsS0FBS0MsR0FBakI7QUFDQSxhQUFLUixXQUFMLENBQWlCcEMsS0FBakIsRUFBd0JxQyxJQUF4QixDQUE2QixZQUFNO0FBQ2pDLGlCQUFLQyxZQUFMO0FBQ0QsU0FGRDtBQUdEOztBQUVEO0FBQ0EsVUFBSXRDLE1BQU02QyxFQUFOLEtBQWEsSUFBakIsRUFBdUI7QUFDckIsYUFBS04sZUFBTCxHQUF1QixJQUF2QjtBQUNEO0FBQ0YsS0E5R21FO0FBK0dwRUgsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQnBDLEtBQXJCLEVBQTRCO0FBQ3ZDLFVBQU1TLFFBQVEsS0FBS0QsUUFBTCxFQUFkO0FBQ0EsYUFBT0MsTUFBTXFDLFdBQU4sQ0FBa0I5QyxLQUFsQixDQUFQO0FBQ0Q7QUFsSG1FLEdBQXRELENBQWhCOztvQkFxSGUxQixPIiwiZmlsZSI6Ikxpc3RPZmZsaW5lLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IF9MaXN0QmFzZSBmcm9tICdhcmdvcy9fTGlzdEJhc2UnO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaGlzdG9yeUxpc3RPZmZsaW5lJyk7XHJcbmNvbnN0IGRhdGVSZXNvdXJjZSA9IGdldFJlc291cmNlKCdoaXN0b3J5TGlzdE9mZmxpbmVGb3JtYXQnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWNjb3VudC5MaXN0T2ZmbGluZScsIFtfTGlzdEJhc2VdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcblxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtgXHJcbiAgICA8cD57JTogJC5UZXh0ICV9PC9wPlxyXG4gIGBdKSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZGV0YWlsVmlldzogJ2hpc3RvcnlfZGV0YWlsX29mZmxpbmUnLFxyXG4gIGlkOiAnaGlzdG9yeV9saXN0X29mZmxpbmUnLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvQWNjb3VudC9WaWV3JyxcclxuICBpbnNlcnRWaWV3OiAnaGlzdG9yeV9lZGl0X29mZmxpbmUnLFxyXG4gIGVkaXRWaWV3OiAnaGlzdG9yeV9lZGl0JyxcclxuICBlbnRpdHlOYW1lOiAnSGlzdG9yeScsXHJcbiAgcGFnZVNpemU6IDEwMCxcclxuICByZXNvdXJjZUtpbmQ6ICdoaXN0b3J5JyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkhJU1RPUlksXHJcbiAgZW5hYmxlT2ZmbGluZVN1cHBvcnQ6IHRydWUsXHJcbiAgZW5hYmxlT25saW5lU3VwcG9ydDogdHJ1ZSxcclxuICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gIGV4cG9zZTogdHJ1ZSxcclxuICBsYWJlbFByb3BlcnR5OiAnVGV4dCcsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zOiBmdW5jdGlvbiBfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zKHF1ZXJ5T3B0aW9ucykge1xyXG4gICAgcXVlcnlPcHRpb25zLmZpbHRlciA9IChlbnRpdHkpID0+IHtcclxuICAgICAgcmV0dXJuIGVudGl0eSAmJiB0eXBlb2YgZW50aXR5LlRleHQgPT09ICdzdHJpbmcnO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gcXVlcnlPcHRpb25zO1xyXG4gIH0sXHJcbiAgZ2V0SWRlbnRpdHk6IGZ1bmN0aW9uIGdldElkZW50aXR5KGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnkuJG9mZmxpbmVEYXRlO1xyXG4gIH0sXHJcbiAgZ2V0VGl0bGU6IGZ1bmN0aW9uIGdldFRpdGxlKGVudHJ5KSB7XHJcbiAgICBpZiAoQXBwLmlzMjRIb3VyQ2xvY2soKSkge1xyXG4gICAgICByZXR1cm4gYCR7Zm9ybWF0LmRhdGUoZW50cnkuJG9mZmxpbmVEYXRlLCBkYXRlUmVzb3VyY2UuZGF0ZUZvcm1hdFRleHQyNCl9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYCR7Zm9ybWF0LmRhdGUoZW50cnkuJG9mZmxpbmVEYXRlLCBkYXRlUmVzb3VyY2UuZGF0ZUZvcm1hdFRleHQpfWA7XHJcbiAgfSxcclxuICBnZXRNb2RlbDogZnVuY3Rpb24gZ2V0TW9kZWwoKSB7XHJcbiAgICBjb25zdCBtb2RlbCA9IEFwcC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoTU9ERUxfTkFNRVMuSElTVE9SWSwgTU9ERUxfVFlQRVMuT0ZGTElORSk7XHJcbiAgICByZXR1cm4gbW9kZWw7XHJcbiAgfSxcclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAnZWRpdCcsXHJcbiAgICAgIGNsczogJ2VkaXQnLFxyXG4gICAgICBsYWJlbDogcmVzb3VyY2Uuc2F2ZVRvQ1JNVGV4dCxcclxuICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9BY2NvdW50L0VkaXQnLFxyXG4gICAgICBhY3Rpb246ICduYXZpZ2F0ZVRvRWRpdFZpZXcnLFxyXG4gICAgICBlbmFibGVkOiBmdW5jdGlvbiBlbmFibGVkKCkge1xyXG4gICAgICAgIHJldHVybiBBcHAuaXNPbmxpbmUoKTtcclxuICAgICAgfSxcclxuICAgIH0sIHtcclxuICAgICAgaWQ6ICdkZWxldGUnLFxyXG4gICAgICBjbHM6ICdkZWxldGUnLFxyXG4gICAgICBsYWJlbDogcmVzb3VyY2UuZGVsZXRlTm90ZVRleHQsXHJcbiAgICAgIGFjdGlvbjogJ2RlbGV0ZU5vdGUnLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0VkaXRWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvRWRpdFZpZXcoYWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLmFwcC5nZXRWaWV3KHRoaXMuZWRpdFZpZXcpO1xyXG4gICAgY29uc3Qga2V5ID0gc2VsZWN0aW9uLmRhdGFbdGhpcy5pZFByb3BlcnR5XTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGtleSxcclxuICAgICAgc2VsZWN0ZWRFbnRyeTogc2VsZWN0aW9uLmRhdGEsXHJcbiAgICAgIGZyb21Db250ZXh0OiB0aGlzLFxyXG4gICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgIGZyb21PZmZsaW5lOiB0cnVlLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBkZWxldGVOb3RlOiBmdW5jdGlvbiBkZWxldGVOb3RlKGFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZEVudHJ5ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5kYXRhO1xyXG4gICAgdGhpcy5yZW1vdmVFbnRyeShzZWxlY3RlZEVudHJ5KS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5mb3JjZVJlZnJlc2goKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcclxuICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHNob3csIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfb25SZWZyZXNoOiBmdW5jdGlvbiBfb25SZWZyZXNoKGFyZ3MpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKF9vblJlZnJlc2gsIGFyZ3VtZW50cyk7XHJcbiAgICBpZiAodHlwZW9mIGFyZ3MgPT09ICd1bmRlZmluZWQnIHx8IGFyZ3MgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVudHJ5ID0gYXJncy5kYXRhO1xyXG4gICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ3VuZGVmaW5lZCcgfHwgZW50cnkgPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFyZ3MucmVzb3VyY2VLaW5kID09PSAnaGlzdG9yeScgJiYgdHlwZW9mIGFyZ3MuaWQgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBhcmdzLmtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgZW50cnkuVUlEID0gYXJncy5VSUQ7XHJcbiAgICAgIHRoaXMucmVtb3ZlRW50cnkoZW50cnkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZm9yY2VSZWZyZXNoKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEVkaXQgd2lsbCBwYXNzIHJlc3BvbnNlIG1lc3NhZ2UgZnJvbSBwb3VjaCB0aGF0IHRoZSBkYXRhIHdhcyBzYXZlZDogeyBvazogdHJ1ZSwgLi4uIH1cclxuICAgIGlmIChlbnRyeS5vayA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZW1vdmVFbnRyeTogZnVuY3Rpb24gcmVtb3ZlRW50cnkoZW50cnkpIHtcclxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5nZXRNb2RlbCgpO1xyXG4gICAgcmV0dXJuIG1vZGVsLmRlbGV0ZUVudHJ5KGVudHJ5KTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==