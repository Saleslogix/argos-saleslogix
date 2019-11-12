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
      this.inherited(arguments);
    },
    _onRefresh: function _onRefresh(args) {
      var _this2 = this;

      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9IaXN0b3J5L0xpc3RPZmZsaW5lLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZGF0ZVJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsIml0ZW1UZW1wbGF0ZSIsIlNpbXBsYXRlIiwiZGV0YWlsVmlldyIsImlkIiwic2VjdXJpdHkiLCJpbnNlcnRWaWV3IiwiZWRpdFZpZXciLCJlbnRpdHlOYW1lIiwicGFnZVNpemUiLCJyZXNvdXJjZUtpbmQiLCJtb2RlbE5hbWUiLCJISVNUT1JZIiwiZW5hYmxlT2ZmbGluZVN1cHBvcnQiLCJlbmFibGVPbmxpbmVTdXBwb3J0IiwiZW5hYmxlU2VhcmNoIiwiZXhwb3NlIiwibGFiZWxQcm9wZXJ0eSIsImVuYWJsZUFjdGlvbnMiLCJfYXBwbHlTdGF0ZVRvUXVlcnlPcHRpb25zIiwicXVlcnlPcHRpb25zIiwiZmlsdGVyIiwiZW50aXR5IiwiVGV4dCIsImdldElkZW50aXR5IiwiZW50cnkiLCIkb2ZmbGluZURhdGUiLCJnZXRUaXRsZSIsIkFwcCIsImlzMjRIb3VyQ2xvY2siLCJkYXRlIiwiZGF0ZUZvcm1hdFRleHQyNCIsImRhdGVGb3JtYXRUZXh0IiwiZ2V0TW9kZWwiLCJtb2RlbCIsIk1vZGVsTWFuYWdlciIsIk9GRkxJTkUiLCJjcmVhdGVBY3Rpb25MYXlvdXQiLCJhY3Rpb25zIiwiY2xzIiwibGFiZWwiLCJzYXZlVG9DUk1UZXh0IiwiYWN0aW9uIiwiZW5hYmxlZCIsImlzT25saW5lIiwiZGVsZXRlTm90ZVRleHQiLCJuYXZpZ2F0ZVRvRWRpdFZpZXciLCJzZWxlY3Rpb24iLCJ2aWV3IiwiYXBwIiwiZ2V0VmlldyIsImtleSIsImRhdGEiLCJpZFByb3BlcnR5Iiwib3B0aW9ucyIsInNlbGVjdGVkRW50cnkiLCJmcm9tQ29udGV4dCIsImluc2VydCIsImZyb21PZmZsaW5lIiwic2hvdyIsImRlbGV0ZU5vdGUiLCJyZW1vdmVFbnRyeSIsInRoZW4iLCJmb3JjZVJlZnJlc2giLCJyZWZyZXNoUmVxdWlyZWQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJfb25SZWZyZXNoIiwiYXJncyIsIlVJRCIsIm9rIiwiZGVsZXRlRW50cnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNQSxXQUFXLG9CQUFZLG9CQUFaLENBQWpCO0FBQ0EsTUFBTUMsZUFBZSxvQkFBWSwwQkFBWixDQUFyQjs7QUFFQSxNQUFNQyxVQUFVLHVCQUFRLCtCQUFSLEVBQXlDLG9CQUF6QyxFQUFzRDtBQUNwRTtBQUNBQyxlQUFXSCxTQUFTRyxTQUZnRDs7QUFJcEU7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLGtDQUFiLENBTHNEOztBQVNwRTtBQUNBQyxnQkFBWSx3QkFWd0Q7QUFXcEVDLFFBQUksc0JBWGdFO0FBWXBFQyxjQUFVLHVCQVowRDtBQWFwRUMsZ0JBQVksc0JBYndEO0FBY3BFQyxjQUFVLGNBZDBEO0FBZXBFQyxnQkFBWSxTQWZ3RDtBQWdCcEVDLGNBQVUsR0FoQjBEO0FBaUJwRUMsa0JBQWMsU0FqQnNEO0FBa0JwRUMsZUFBVyxnQkFBWUMsT0FsQjZDO0FBbUJwRUMsMEJBQXNCLElBbkI4QztBQW9CcEVDLHlCQUFxQixJQXBCK0M7QUFxQnBFQyxrQkFBYyxLQXJCc0Q7QUFzQnBFQyxZQUFRLElBdEI0RDtBQXVCcEVDLG1CQUFlLE1BdkJxRDtBQXdCcEVDLG1CQUFlLElBeEJxRDtBQXlCcEVDLCtCQUEyQixTQUFTQSx5QkFBVCxDQUFtQ0MsWUFBbkMsRUFBaUQ7QUFDMUVBLG1CQUFhQyxNQUFiLEdBQXNCLFVBQUNDLE1BQUQsRUFBWTtBQUNoQyxlQUFPQSxVQUFVLE9BQU9BLE9BQU9DLElBQWQsS0FBdUIsUUFBeEM7QUFDRCxPQUZEOztBQUlBLGFBQU9ILFlBQVA7QUFDRCxLQS9CbUU7QUFnQ3BFSSxpQkFBYSxTQUFTQSxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUN2QyxhQUFPQSxTQUFTQSxNQUFNQyxZQUF0QjtB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LEdBQWpCO0FBQ0EsYUFBS1IsV0FBTCxDQUFpQnBDLEtBQWpCLEVBQXdCcUMsSUFBeEIsQ0FBNkIsWUFBTTtBQUNqQyxpQkFBS0MsWUFBTDtBQUNELFNBRkQ7QUFHRDs7QUFFRDtBQUNBLFVBQUl0QyxNQUFNNkMsRUFBTixLQUFhLElBQWpCLEVBQXVCO0FBQ3JCLGFBQUtOLGVBQUwsR0FBdUIsSUFBdkI7QUFDRDtBQUNGLEtBOUdtRTtBQStHcEVILGlCQUFhLFNBQVNBLFdBQVQsQ0FBcUJwQyxLQUFyQixFQUE0QjtBQUN2QyxVQUFNUyxRQUFRLEtBQUtELFFBQUwsRUFBZDtBQUNBLGFBQU9DLE1BQU1xQyxXQUFOLENBQWtCOUMsS0FBbEIsQ0FBUDtBQUNEO0FBbEhtRSxHQUF0RCxDQUFoQjs7b0JBcUhlMUIsTyIsImZpbGUiOiJMaXN0T2ZmbGluZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBfTGlzdEJhc2UgZnJvbSAnYXJnb3MvX0xpc3RCYXNlJztcclxuaW1wb3J0IE1PREVMX1RZUEVTIGZyb20gJ2FyZ29zL01vZGVscy9UeXBlcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2hpc3RvcnlMaXN0T2ZmbGluZScpO1xyXG5jb25zdCBkYXRlUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaGlzdG9yeUxpc3RPZmZsaW5lRm9ybWF0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkFjY291bnQuTGlzdE9mZmxpbmUnLCBbX0xpc3RCYXNlXSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG5cclxuICAvLyBUZW1wbGF0ZXNcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbYFxyXG4gICAgPHA+eyU6ICQuVGV4dCAlfTwvcD5cclxuICBgXSksXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGRldGFpbFZpZXc6ICdoaXN0b3J5X2RldGFpbF9vZmZsaW5lJyxcclxuICBpZDogJ2hpc3RvcnlfbGlzdF9vZmZsaW5lJyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0FjY291bnQvVmlldycsXHJcbiAgaW5zZXJ0VmlldzogJ2hpc3RvcnlfZWRpdF9vZmZsaW5lJyxcclxuICBlZGl0VmlldzogJ2hpc3RvcnlfZWRpdCcsXHJcbiAgZW50aXR5TmFtZTogJ0hpc3RvcnknLFxyXG4gIHBhZ2VTaXplOiAxMDAsXHJcbiAgcmVzb3VyY2VLaW5kOiAnaGlzdG9yeScsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5ISVNUT1JZLFxyXG4gIGVuYWJsZU9mZmxpbmVTdXBwb3J0OiB0cnVlLFxyXG4gIGVuYWJsZU9ubGluZVN1cHBvcnQ6IHRydWUsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBleHBvc2U6IHRydWUsXHJcbiAgbGFiZWxQcm9wZXJ0eTogJ1RleHQnLFxyXG4gIGVuYWJsZUFjdGlvbnM6IHRydWUsXHJcbiAgX2FwcGx5U3RhdGVUb1F1ZXJ5T3B0aW9uczogZnVuY3Rpb24gX2FwcGx5U3RhdGVUb1F1ZXJ5T3B0aW9ucyhxdWVyeU9wdGlvbnMpIHtcclxuICAgIHF1ZXJ5T3B0aW9ucy5maWx0ZXIgPSAoZW50aXR5KSA9PiB7XHJcbiAgICAgIHJldHVybiBlbnRpdHkgJiYgdHlwZW9mIGVudGl0eS5UZXh0ID09PSAnc3RyaW5nJztcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHF1ZXJ5T3B0aW9ucztcclxuICB9LFxyXG4gIGdldElkZW50aXR5OiBmdW5jdGlvbiBnZXRJZGVudGl0eShlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LiRvZmZsaW5lRGF0ZTtcclxuICB9LFxyXG4gIGdldFRpdGxlOiBmdW5jdGlvbiBnZXRUaXRsZShlbnRyeSkge1xyXG4gICAgaWYgKEFwcC5pczI0SG91ckNsb2NrKCkpIHtcclxuICAgICAgcmV0dXJuIGAke2Zvcm1hdC5kYXRlKGVudHJ5LiRvZmZsaW5lRGF0ZSwgZGF0ZVJlc291cmNlLmRhdGVGb3JtYXRUZXh0MjQpfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGAke2Zvcm1hdC5kYXRlKGVudHJ5LiRvZmZsaW5lRGF0ZSwgZGF0ZVJlc291cmNlLmRhdGVGb3JtYXRUZXh0KX1gO1xyXG4gIH0sXHJcbiAgZ2V0TW9kZWw6IGZ1bmN0aW9uIGdldE1vZGVsKCkge1xyXG4gICAgY29uc3QgbW9kZWwgPSBBcHAuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKE1PREVMX05BTUVTLkhJU1RPUlksIE1PREVMX1RZUEVTLk9GRkxJTkUpO1xyXG4gICAgcmV0dXJuIG1vZGVsO1xyXG4gIH0sXHJcbiAgY3JlYXRlQWN0aW9uTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25MYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zIHx8ICh0aGlzLmFjdGlvbnMgPSBbe1xyXG4gICAgICBpZDogJ2VkaXQnLFxyXG4gICAgICBjbHM6ICdlZGl0JyxcclxuICAgICAgbGFiZWw6IHJlc291cmNlLnNhdmVUb0NSTVRleHQsXHJcbiAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvQWNjb3VudC9FZGl0JyxcclxuICAgICAgYWN0aW9uOiAnbmF2aWdhdGVUb0VkaXRWaWV3JyxcclxuICAgICAgZW5hYmxlZDogZnVuY3Rpb24gZW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gQXBwLmlzT25saW5lKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnZGVsZXRlJyxcclxuICAgICAgY2xzOiAnZGVsZXRlJyxcclxuICAgICAgbGFiZWw6IHJlc291cmNlLmRlbGV0ZU5vdGVUZXh0LFxyXG4gICAgICBhY3Rpb246ICdkZWxldGVOb3RlJyxcclxuICAgIH1dKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9FZGl0VmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0VkaXRWaWV3KGFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5hcHAuZ2V0Vmlldyh0aGlzLmVkaXRWaWV3KTtcclxuICAgIGNvbnN0IGtleSA9IHNlbGVjdGlvbi5kYXRhW3RoaXMuaWRQcm9wZXJ0eV07XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBrZXksXHJcbiAgICAgIHNlbGVjdGVkRW50cnk6IHNlbGVjdGlvbi5kYXRhLFxyXG4gICAgICBmcm9tQ29udGV4dDogdGhpcyxcclxuICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICBmcm9tT2ZmbGluZTogdHJ1ZSxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGVsZXRlTm90ZTogZnVuY3Rpb24gZGVsZXRlTm90ZShhY3Rpb24sIHNlbGVjdGlvbikge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRFbnRyeSA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZGF0YTtcclxuICAgIHRoaXMucmVtb3ZlRW50cnkoc2VsZWN0ZWRFbnRyeSkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuZm9yY2VSZWZyZXNoKCk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgX29uUmVmcmVzaDogZnVuY3Rpb24gX29uUmVmcmVzaChhcmdzKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKHR5cGVvZiBhcmdzID09PSAndW5kZWZpbmVkJyB8fCBhcmdzID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlbnRyeSA9IGFyZ3MuZGF0YTtcclxuICAgIGlmICh0eXBlb2YgZW50cnkgPT09ICd1bmRlZmluZWQnIHx8IGVudHJ5ID09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChhcmdzLnJlc291cmNlS2luZCA9PT0gJ2hpc3RvcnknICYmIHR5cGVvZiBhcmdzLmlkID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgYXJncy5rZXkgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGVudHJ5LlVJRCA9IGFyZ3MuVUlEO1xyXG4gICAgICB0aGlzLnJlbW92ZUVudHJ5KGVudHJ5KS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmZvcmNlUmVmcmVzaCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFZGl0IHdpbGwgcGFzcyByZXNwb25zZSBtZXNzYWdlIGZyb20gcG91Y2ggdGhhdCB0aGUgZGF0YSB3YXMgc2F2ZWQ6IHsgb2s6IHRydWUsIC4uLiB9XHJcbiAgICBpZiAoZW50cnkub2sgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVtb3ZlRW50cnk6IGZ1bmN0aW9uIHJlbW92ZUVudHJ5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwoKTtcclxuICAgIHJldHVybiBtb2RlbC5kZWxldGVFbnRyeShlbnRyeSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=