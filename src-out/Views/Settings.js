define('crm/Views/Settings', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/connect', 'argos/List', 'argos/I18n'], function (module, exports, _declare, _connect, _List, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _connect2 = _interopRequireDefault(_connect);

  var _List2 = _interopRequireDefault(_List);

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

  var resource = (0, _I18n2.default)('settings');

  /**
   * @class crm.Views.Settings
   *
   *
   * @extends argos.List
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Settings', [_List2.default], {
    // Templates
    itemIconTemplate: new Simplate(['<button type="button" data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %} class="btn-actions list-item-selector button visible">\n      <span class="audible">{%: $$.actionsText %}</span>\n      <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n        <use xlink:href="#icon-{%= $$.getItemIconClass($) %}"></use>\n      </svg>\n    </button>']),
    itemTemplate: new Simplate(['<h4 data-action="{%= $.action %}" class="list-item-content ', '{% if ($.icon) { %}', 'list-item-content', '{% } %} ">', '{%: $.title %}</h4>']),
    liRowTemplate: new Simplate(['<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>', '{%! $$.itemIconTemplate %}', '{%! $$.itemTemplate %}', '</li>']),
    isCardView: false,
    // Localization
    clearLocalStorageTitleText: resource.clearLocalStorageTitleText,
    clearAuthenticationTitleText: resource.clearAuthenticationTitleText,
    errorLogTitleText: resource.errorLogTitleText,
    localStorageClearedText: resource.localStorageClearedText,
    credentialsClearedText: resource.credentialsClearedText,
    titleText: resource.titleText,
    offlineOptionsText: resource.offlineOptionsText,
    use24HourClockText: resource.use24HourClockText,
    use12HourClockText: resource.use12HourClockText,
    confirm24HourClockMessage: resource.confirm24HourClockMessage,
    confirm12HourClockMessage: resource.confirm12HourClockMessage,
    confirmClearLocalStorageMessage: resource.confirmClearLocalStorageMessage,
    languageSettingText: resource.languageSettingText,
    actionsText: resource.actionsText,

    // View Properties
    id: 'settings',
    expose: false,
    enableSearch: false,
    enablePullToRefresh: false,
    selectionOnly: true,
    allowSelection: true, // adds list-show-selectors class to listview for displaying icons
    actionItems: null,
    actionOrder: ['clearAuthentication', 'clearLocalStorage', 'viewErrorLogs', 'viewOfflineOptions', 'use24HourClock', 'viewLanguageOptions'],
    createActionsList: function createActionsList() {
      this.actionItems = {
        clearLocalStorage: {
          title: this.clearLocalStorageTitleText,
          cls: 'technology'
        },
        clearAuthentication: {
          title: this.clearAuthenticationTitleText,
          cls: 'unlocked'
        },
        viewErrorLogs: {
          title: this.errorLogTitleText,
          cls: 'bullet-list'
        },
        viewOfflineOptions: {
          title: this.offlineOptionsText,
          cls: 'bullet-list'
        },
        use24HourClock: {
          title: App.is24HourClock() ? this.use24HourClockText : this.use12HourClockText,
          cls: 'user'
        },
        viewLanguageOptions: {
          title: this.languageSettingText,
          cls: 'url'
        }
      };
    },
    getItemIconClass: function getItemIconClass(entry) {
      return entry.cls;
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = []);
    },
    viewErrorLogs: function viewErrorLogs() {
      var view = App.getView('errorlog_list');
      if (view) {
        view.show();
      }
    },
    clearLocalStorage: function clearLocalStorage() {
      if (confirm(this.confirmClearLocalStorageMessage)) {
        // eslint-disable-line
        if (window.localStorage) {
          window.localStorage.clear();
        }

        _connect2.default.publish('/app/refresh', [{
          resourceKind: 'localStorage'
        }]);

        alert(this.localStorageClearedText); // eslint-disable-line
        window.location.reload(); // reloaded because of the clock setting
      }
    },
    clearAuthentication: function clearAuthentication() {
      if (window.localStorage) {
        window.localStorage.removeItem('credentials');
      }

      alert(this.credentialsClearedText); // eslint-disable-line
    },
    viewOfflineOptions: function viewOfflineOptions() {
      var view = App.getView('offline_options_edit');
      if (view) {
        view.show();
      }
    },
    viewLanguageOptions: function viewLanguageOptions() {
      var view = App.getView('language_options_edit');
      if (view) {
        view.show();
      }
    },
    use24HourClock: function use24HourClock() {
      var message = App.is24HourClock() ? this.confirm12HourClockMessage : this.confirm24HourClockMessage;
      if (confirm(message)) {
        // eslint-disable-line
        if (App.is24HourClock()) {
          window.localStorage.setItem('use24HourClock', JSON.stringify(false));
        } else {
          window.localStorage.setItem('use24HourClock', JSON.stringify(true));
        }
        window.location.reload();
      }
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    requestData: function requestData() {
      var list = [];

      for (var i = 0; i < this.actionOrder.length; i++) {
        var action = this.actionItems[this.actionOrder[i]];
        if (action) {
          list.push({
            action: this.actionOrder[i],
            title: action.title,
            icon: action.icon,
            cls: action.cls
          });
        }
      }
      this.set('listContent', '');

      this.processData(list);
    },
    init: function init() {
      this.inherited(arguments);
      this.createActionsList();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9TZXR0aW5ncy5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtSWNvblRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpdGVtVGVtcGxhdGUiLCJsaVJvd1RlbXBsYXRlIiwiaXNDYXJkVmlldyIsImNsZWFyTG9jYWxTdG9yYWdlVGl0bGVUZXh0IiwiY2xlYXJBdXRoZW50aWNhdGlvblRpdGxlVGV4dCIsImVycm9yTG9nVGl0bGVUZXh0IiwibG9jYWxTdG9yYWdlQ2xlYXJlZFRleHQiLCJjcmVkZW50aWFsc0NsZWFyZWRUZXh0IiwidGl0bGVUZXh0Iiwib2ZmbGluZU9wdGlvbnNUZXh0IiwidXNlMjRIb3VyQ2xvY2tUZXh0IiwidXNlMTJIb3VyQ2xvY2tUZXh0IiwiY29uZmlybTI0SG91ckNsb2NrTWVzc2FnZSIsImNvbmZpcm0xMkhvdXJDbG9ja01lc3NhZ2UiLCJjb25maXJtQ2xlYXJMb2NhbFN0b3JhZ2VNZXNzYWdlIiwibGFuZ3VhZ2VTZXR0aW5nVGV4dCIsImFjdGlvbnNUZXh0IiwiaWQiLCJleHBvc2UiLCJlbmFibGVTZWFyY2giLCJlbmFibGVQdWxsVG9SZWZyZXNoIiwic2VsZWN0aW9uT25seSIsImFsbG93U2VsZWN0aW9uIiwiYWN0aW9uSXRlbXMiLCJhY3Rpb25PcmRlciIsImNyZWF0ZUFjdGlvbnNMaXN0IiwiY2xlYXJMb2NhbFN0b3JhZ2UiLCJ0aXRsZSIsImNscyIsImNsZWFyQXV0aGVudGljYXRpb24iLCJ2aWV3RXJyb3JMb2dzIiwidmlld09mZmxpbmVPcHRpb25zIiwidXNlMjRIb3VyQ2xvY2siLCJBcHAiLCJpczI0SG91ckNsb2NrIiwidmlld0xhbmd1YWdlT3B0aW9ucyIsImdldEl0ZW1JY29uQ2xhc3MiLCJlbnRyeSIsImNyZWF0ZUluZGljYXRvckxheW91dCIsIml0ZW1JbmRpY2F0b3JzIiwidmlldyIsImdldFZpZXciLCJzaG93IiwiY29uZmlybSIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImNsZWFyIiwicHVibGlzaCIsInJlc291cmNlS2luZCIsImFsZXJ0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJyZW1vdmVJdGVtIiwibWVzc2FnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiaGFzTW9yZURhdGEiLCJyZXF1ZXN0RGF0YSIsImxpc3QiLCJpIiwibGVuZ3RoIiwiYWN0aW9uIiwicHVzaCIsImljb24iLCJzZXQiLCJwcm9jZXNzRGF0YSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjcmVhdGVUb29sTGF5b3V0IiwidG9vbHMiLCJ0YmFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLFVBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFPQSxNQUFNQyxVQUFVLHVCQUFRLG9CQUFSLEVBQThCLGdCQUE5QixFQUFzQztBQUNwRDtBQUNBQyxzQkFBa0IsSUFBSUMsUUFBSixDQUFhLGtaQUFiLENBRmtDO0FBVXBEQyxrQkFBYyxJQUFJRCxRQUFKLENBQWEsQ0FDekIsNkRBRHlCLEVBRXpCLHFCQUZ5QixFQUd6QixtQkFIeUIsRUFJekIsWUFKeUIsRUFLekIscUJBTHlCLENBQWIsQ0FWc0M7QUFpQnBERSxtQkFBZSxJQUFJRixRQUFKLENBQWEsQ0FDMUIsd0ZBRDBCLEVBRTFCLDRCQUYwQixFQUcxQix3QkFIMEIsRUFJMUIsT0FKMEIsQ0FBYixDQWpCcUM7QUF1QnBERyxnQkFBWSxLQXZCd0M7QUF3QnBEO0FBQ0FDLGdDQUE0QlAsU0FBU08sMEJBekJlO0FBMEJwREMsa0NBQThCUixTQUFTUSw0QkExQmE7QUEyQnBEQyx1QkFBbUJULFNBQVNTLGlCQTNCd0I7QUE0QnBEQyw2QkFBeUJWLFNBQVNVLHVCQTVCa0I7QUE2QnBEQyw0QkFBd0JYLFNBQVNXLHNCQTdCbUI7QUE4QnBEQyxlQUFXWixTQUFTWSxTQTlCZ0M7QUErQnBEQyx3QkFBb0JiLFNBQVNhLGtCQS9CdUI7QUFnQ3BEQyx3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SSxJQUFMLENBQVU7QUFDUkQsb0JBQVEsS0FBS3RDLFdBQUwsQ0FBaUJvQyxDQUFqQixDQURBO0FBRVJqQyxtQkFBT21DLE9BQU9uQyxLQUZOO0FBR1JxQyxrQkFBTUYsT0FBT0UsSUFITDtBQUlScEMsaUJBQUtrQyxPQUFPbEM7QUFKSixXQUFWO0FBTUQ7QUFDRjtBQUNELFdBQUtxQyxHQUFMLENBQVMsYUFBVCxFQUF3QixFQUF4Qjs7QUFFQSxXQUFLQyxXQUFMLENBQWlCUCxJQUFqQjtBQUNELEtBaEttRDtBQWlLcERRLFVBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixXQUFLQyxTQUFMLENBQWVDLFNBQWY7QUFDQSxXQUFLNUMsaUJBQUw7QUFDRCxLQXBLbUQ7QUFxS3BENkMsc0JBQWtCLFNBQVNBLGdCQUFULEdBQTRCO0FBQzVDLGFBQU8sS0FBS0MsS0FBTCxLQUFlLEtBQUtBLEtBQUwsR0FBYTtBQUNqQ0MsY0FBTTtBQUQyQixPQUE1QixDQUFQO0FBR0Q7QUF6S21ELEdBQXRDLENBQWhCOztvQkE0S2UzRSxPIiwiZmlsZSI6IlNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGNvbm5lY3QgZnJvbSAnZG9qby9fYmFzZS9jb25uZWN0JztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3NldHRpbmdzJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5TZXR0aW5nc1xyXG4gKlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLlNldHRpbmdzJywgW0xpc3RdLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbUljb25UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgIGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInslPSAkLmFjdGlvbiAlfVwiIHslIGlmICgkLnZpZXcpIHsgJX1kYXRhLXZpZXc9XCJ7JT0gJC52aWV3ICV9XCJ7JSB9ICV9IGNsYXNzPVwiYnRuLWFjdGlvbnMgbGlzdC1pdGVtLXNlbGVjdG9yIGJ1dHRvbiB2aXNpYmxlXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiYXVkaWJsZVwiPnslOiAkJC5hY3Rpb25zVGV4dCAlfTwvc3Bhbj5cclxuICAgICAgPHN2ZyBjbGFzcz1cImljb25cIiBmb2N1c2FibGU9XCJmYWxzZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cclxuICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi17JT0gJCQuZ2V0SXRlbUljb25DbGFzcygkKSAlfVwiPjwvdXNlPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIDwvYnV0dG9uPmAsXHJcbiAgXSksXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxoNCBkYXRhLWFjdGlvbj1cInslPSAkLmFjdGlvbiAlfVwiIGNsYXNzPVwibGlzdC1pdGVtLWNvbnRlbnQgJyxcclxuICAgICd7JSBpZiAoJC5pY29uKSB7ICV9JyxcclxuICAgICdsaXN0LWl0ZW0tY29udGVudCcsXHJcbiAgICAneyUgfSAlfSBcIj4nLFxyXG4gICAgJ3slOiAkLnRpdGxlICV9PC9oND4nLFxyXG4gIF0pLFxyXG4gIGxpUm93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGRhdGEtYWN0aW9uPVwieyU9ICQuYWN0aW9uICV9XCIgeyUgaWYgKCQudmlldykgeyAlfWRhdGEtdmlldz1cInslPSAkLnZpZXcgJX1cInslIH0gJX0+JyxcclxuICAgICd7JSEgJCQuaXRlbUljb25UZW1wbGF0ZSAlfScsXHJcbiAgICAneyUhICQkLml0ZW1UZW1wbGF0ZSAlfScsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG4gIGlzQ2FyZFZpZXc6IGZhbHNlLFxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGNsZWFyTG9jYWxTdG9yYWdlVGl0bGVUZXh0OiByZXNvdXJjZS5jbGVhckxvY2FsU3RvcmFnZVRpdGxlVGV4dCxcclxuICBjbGVhckF1dGhlbnRpY2F0aW9uVGl0bGVUZXh0OiByZXNvdXJjZS5jbGVhckF1dGhlbnRpY2F0aW9uVGl0bGVUZXh0LFxyXG4gIGVycm9yTG9nVGl0bGVUZXh0OiByZXNvdXJjZS5lcnJvckxvZ1RpdGxlVGV4dCxcclxuICBsb2NhbFN0b3JhZ2VDbGVhcmVkVGV4dDogcmVzb3VyY2UubG9jYWxTdG9yYWdlQ2xlYXJlZFRleHQsXHJcbiAgY3JlZGVudGlhbHNDbGVhcmVkVGV4dDogcmVzb3VyY2UuY3JlZGVudGlhbHNDbGVhcmVkVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBvZmZsaW5lT3B0aW9uc1RleHQ6IHJlc291cmNlLm9mZmxpbmVPcHRpb25zVGV4dCxcclxuICB1c2UyNEhvdXJDbG9ja1RleHQ6IHJlc291cmNlLnVzZTI0SG91ckNsb2NrVGV4dCxcclxuICB1c2UxMkhvdXJDbG9ja1RleHQ6IHJlc291cmNlLnVzZTEySG91ckNsb2NrVGV4dCxcclxuICBjb25maXJtMjRIb3VyQ2xvY2tNZXNzYWdlOiByZXNvdXJjZS5jb25maXJtMjRIb3VyQ2xvY2tNZXNzYWdlLFxyXG4gIGNvbmZpcm0xMkhvdXJDbG9ja01lc3NhZ2U6IHJlc291cmNlLmNvbmZpcm0xMkhvdXJDbG9ja01lc3NhZ2UsXHJcbiAgY29uZmlybUNsZWFyTG9jYWxTdG9yYWdlTWVzc2FnZTogcmVzb3VyY2UuY29uZmlybUNsZWFyTG9jYWxTdG9yYWdlTWVzc2FnZSxcclxuICBsYW5ndWFnZVNldHRpbmdUZXh0OiByZXNvdXJjZS5sYW5ndWFnZVNldHRpbmdUZXh0LFxyXG4gIGFjdGlvbnNUZXh0OiByZXNvdXJjZS5hY3Rpb25zVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdzZXR0aW5ncycsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gIGVuYWJsZVB1bGxUb1JlZnJlc2g6IGZhbHNlLFxyXG4gIHNlbGVjdGlvbk9ubHk6IHRydWUsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsIC8vIGFkZHMgbGlzdC1zaG93LXNlbGVjdG9ycyBjbGFzcyB0byBsaXN0dmlldyBmb3IgZGlzcGxheWluZyBpY29uc1xyXG4gIGFjdGlvbkl0ZW1zOiBudWxsLFxyXG4gIGFjdGlvbk9yZGVyOiBbXHJcbiAgICAnY2xlYXJBdXRoZW50aWNhdGlvbicsXHJcbiAgICAnY2xlYXJMb2NhbFN0b3JhZ2UnLFxyXG4gICAgJ3ZpZXdFcnJvckxvZ3MnLFxyXG4gICAgJ3ZpZXdPZmZsaW5lT3B0aW9ucycsXHJcbiAgICAndXNlMjRIb3VyQ2xvY2snLFxyXG4gICAgJ3ZpZXdMYW5ndWFnZU9wdGlvbnMnLFxyXG4gIF0sXHJcbiAgY3JlYXRlQWN0aW9uc0xpc3Q6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbnNMaXN0KCkge1xyXG4gICAgdGhpcy5hY3Rpb25JdGVtcyA9IHtcclxuICAgICAgY2xlYXJMb2NhbFN0b3JhZ2U6IHtcclxuICAgICAgICB0aXRsZTogdGhpcy5jbGVhckxvY2FsU3RvcmFnZVRpdGxlVGV4dCxcclxuICAgICAgICBjbHM6ICd0ZWNobm9sb2d5JyxcclxuICAgICAgfSxcclxuICAgICAgY2xlYXJBdXRoZW50aWNhdGlvbjoge1xyXG4gICAgICAgIHRpdGxlOiB0aGlzLmNsZWFyQXV0aGVudGljYXRpb25UaXRsZVRleHQsXHJcbiAgICAgICAgY2xzOiAndW5sb2NrZWQnLFxyXG4gICAgICB9LFxyXG4gICAgICB2aWV3RXJyb3JMb2dzOiB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMuZXJyb3JMb2dUaXRsZVRleHQsXHJcbiAgICAgICAgY2xzOiAnYnVsbGV0LWxpc3QnLFxyXG4gICAgICB9LFxyXG4gICAgICB2aWV3T2ZmbGluZU9wdGlvbnM6IHtcclxuICAgICAgICB0aXRsZTogdGhpcy5vZmZsaW5lT3B0aW9uc1RleHQsXHJcbiAgICAgICAgY2xzOiAnYnVsbGV0LWxpc3QnLFxyXG4gICAgICB9LFxyXG4gICAgICB1c2UyNEhvdXJDbG9jazoge1xyXG4gICAgICAgIHRpdGxlOiAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyB0aGlzLnVzZTI0SG91ckNsb2NrVGV4dCA6IHRoaXMudXNlMTJIb3VyQ2xvY2tUZXh0LFxyXG4gICAgICAgIGNsczogJ3VzZXInLFxyXG4gICAgICB9LFxyXG4gICAgICB2aWV3TGFuZ3VhZ2VPcHRpb25zOiB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMubGFuZ3VhZ2VTZXR0aW5nVGV4dCxcclxuICAgICAgICBjbHM6ICd1cmwnLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGdldEl0ZW1JY29uQ2xhc3M6IGZ1bmN0aW9uIGdldEl0ZW1JY29uQ2xhc3MoZW50cnkpIHtcclxuICAgIHJldHVybiBlbnRyeS5jbHM7XHJcbiAgfSxcclxuICBjcmVhdGVJbmRpY2F0b3JMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUluZGljYXRvckxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLml0ZW1JbmRpY2F0b3JzIHx8ICh0aGlzLml0ZW1JbmRpY2F0b3JzID0gW10pO1xyXG4gIH0sXHJcbiAgdmlld0Vycm9yTG9nczogZnVuY3Rpb24gdmlld0Vycm9yTG9ncygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldygnZXJyb3Jsb2dfbGlzdCcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjbGVhckxvY2FsU3RvcmFnZTogZnVuY3Rpb24gY2xlYXJMb2NhbFN0b3JhZ2UoKSB7XHJcbiAgICBpZiAoY29uZmlybSh0aGlzLmNvbmZpcm1DbGVhckxvY2FsU3RvcmFnZU1lc3NhZ2UpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbm5lY3QucHVibGlzaCgnL2FwcC9yZWZyZXNoJywgW3tcclxuICAgICAgICByZXNvdXJjZUtpbmQ6ICdsb2NhbFN0b3JhZ2UnLFxyXG4gICAgICB9XSk7XHJcblxyXG4gICAgICBhbGVydCh0aGlzLmxvY2FsU3RvcmFnZUNsZWFyZWRUZXh0KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7IC8vIHJlbG9hZGVkIGJlY2F1c2Ugb2YgdGhlIGNsb2NrIHNldHRpbmdcclxuICAgIH1cclxuICB9LFxyXG4gIGNsZWFyQXV0aGVudGljYXRpb246IGZ1bmN0aW9uIGNsZWFyQXV0aGVudGljYXRpb24oKSB7XHJcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xyXG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NyZWRlbnRpYWxzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgYWxlcnQodGhpcy5jcmVkZW50aWFsc0NsZWFyZWRUZXh0KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIH0sXHJcbiAgdmlld09mZmxpbmVPcHRpb25zOiBmdW5jdGlvbiB2aWV3T2ZmbGluZU9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ29mZmxpbmVfb3B0aW9uc19lZGl0Jyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHZpZXdMYW5ndWFnZU9wdGlvbnM6IGZ1bmN0aW9uIHZpZXdMYW5ndWFnZU9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ2xhbmd1YWdlX29wdGlvbnNfZWRpdCcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICB1c2UyNEhvdXJDbG9jazogZnVuY3Rpb24gdXNlMjRIb3VyQ2xvY2soKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gQXBwLmlzMjRIb3VyQ2xvY2soKSA/IHRoaXMuY29uZmlybTEySG91ckNsb2NrTWVzc2FnZSA6IHRoaXMuY29uZmlybTI0SG91ckNsb2NrTWVzc2FnZTtcclxuICAgIGlmIChjb25maXJtKG1lc3NhZ2UpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgaWYgKEFwcC5pczI0SG91ckNsb2NrKCkpIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZTI0SG91ckNsb2NrJywgSlNPTi5zdHJpbmdpZnkoZmFsc2UpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZTI0SG91ckNsb2NrJywgSlNPTi5zdHJpbmdpZnkodHJ1ZSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGhhc01vcmVEYXRhOiBmdW5jdGlvbiBoYXNNb3JlRGF0YSgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aW9uT3JkZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy5hY3Rpb25JdGVtc1t0aGlzLmFjdGlvbk9yZGVyW2ldXTtcclxuICAgICAgaWYgKGFjdGlvbikge1xyXG4gICAgICAgIGxpc3QucHVzaCh7XHJcbiAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9uT3JkZXJbaV0sXHJcbiAgICAgICAgICB0aXRsZTogYWN0aW9uLnRpdGxlLFxyXG4gICAgICAgICAgaWNvbjogYWN0aW9uLmljb24sXHJcbiAgICAgICAgICBjbHM6IGFjdGlvbi5jbHMsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsICcnKTtcclxuXHJcbiAgICB0aGlzLnByb2Nlc3NEYXRhKGxpc3QpO1xyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmNyZWF0ZUFjdGlvbnNMaXN0KCk7XHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICAgIHRiYXI6IFtdLFxyXG4gICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=