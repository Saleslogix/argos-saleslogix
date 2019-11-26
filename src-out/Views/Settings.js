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
      this.inherited(init, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9TZXR0aW5ncy5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtSWNvblRlbXBsYXRlIiwiU2ltcGxhdGUiLCJpdGVtVGVtcGxhdGUiLCJsaVJvd1RlbXBsYXRlIiwiaXNDYXJkVmlldyIsImNsZWFyTG9jYWxTdG9yYWdlVGl0bGVUZXh0IiwiY2xlYXJBdXRoZW50aWNhdGlvblRpdGxlVGV4dCIsImVycm9yTG9nVGl0bGVUZXh0IiwibG9jYWxTdG9yYWdlQ2xlYXJlZFRleHQiLCJjcmVkZW50aWFsc0NsZWFyZWRUZXh0IiwidGl0bGVUZXh0Iiwib2ZmbGluZU9wdGlvbnNUZXh0IiwidXNlMjRIb3VyQ2xvY2tUZXh0IiwidXNlMTJIb3VyQ2xvY2tUZXh0IiwiY29uZmlybTI0SG91ckNsb2NrTWVzc2FnZSIsImNvbmZpcm0xMkhvdXJDbG9ja01lc3NhZ2UiLCJjb25maXJtQ2xlYXJMb2NhbFN0b3JhZ2VNZXNzYWdlIiwibGFuZ3VhZ2VTZXR0aW5nVGV4dCIsImFjdGlvbnNUZXh0IiwiaWQiLCJleHBvc2UiLCJlbmFibGVTZWFyY2giLCJlbmFibGVQdWxsVG9SZWZyZXNoIiwic2VsZWN0aW9uT25seSIsImFsbG93U2VsZWN0aW9uIiwiYWN0aW9uSXRlbXMiLCJhY3Rpb25PcmRlciIsImNyZWF0ZUFjdGlvbnNMaXN0IiwiY2xlYXJMb2NhbFN0b3JhZ2UiLCJ0aXRsZSIsImNscyIsImNsZWFyQXV0aGVudGljYXRpb24iLCJ2aWV3RXJyb3JMb2dzIiwidmlld09mZmxpbmVPcHRpb25zIiwidXNlMjRIb3VyQ2xvY2siLCJBcHAiLCJpczI0SG91ckNsb2NrIiwidmlld0xhbmd1YWdlT3B0aW9ucyIsImdldEl0ZW1JY29uQ2xhc3MiLCJlbnRyeSIsImNyZWF0ZUluZGljYXRvckxheW91dCIsIml0ZW1JbmRpY2F0b3JzIiwidmlldyIsImdldFZpZXciLCJzaG93IiwiY29uZmlybSIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImNsZWFyIiwicHVibGlzaCIsInJlc291cmNlS2luZCIsImFsZXJ0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJyZW1vdmVJdGVtIiwibWVzc2FnZSIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwiaGFzTW9yZURhdGEiLCJyZXF1ZXN0RGF0YSIsImxpc3QiLCJpIiwibGVuZ3RoIiwiYWN0aW9uIiwicHVzaCIsImljb24iLCJzZXQiLCJwcm9jZXNzRGF0YSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjcmVhdGVUb29sTGF5b3V0IiwidG9vbHMiLCJ0YmFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLFVBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFPQSxNQUFNQyxVQUFVLHVCQUFRLG9CQUFSLEVBQThCLGdCQUE5QixFQUFzQztBQUNwRDtBQUNBQyxzQkFBa0IsSUFBSUMsUUFBSixDQUFhLGtaQUFiLENBRmtDO0FBVXBEQyxrQkFBYyxJQUFJRCxRQUFKLENBQWEsQ0FDekIsNkRBRHlCLEVBRXpCLHFCQUZ5QixFQUd6QixtQkFIeUIsRUFJekIsWUFKeUIsRUFLekIscUJBTHlCLENBQWIsQ0FWc0M7QUFpQnBERSxtQkFBZSxJQUFJRixRQUFKLENBQWEsQ0FDMUIsd0ZBRDBCLEVBRTFCLDRCQUYwQixFQUcxQix3QkFIMEIsRUFJMUIsT0FKMEIsQ0FBYixDQWpCcUM7QUF1QnBERyxnQkFBWSxLQXZCd0M7QUF3QnBEO0FBQ0FDLGdDQUE0QlAsU0FBU08sMEJBekJlO0FBMEJwREMsa0NBQThCUixTQUFTUSw0QkExQmE7QUEyQnBEQyx1QkFBbUJULFNBQVNTLGlCQTNCd0I7QUE0QnBEQyw2QkFBeUJWLFNBQVNVLHVCQTVCa0I7QUE2QnBEQyw0QkFBd0JYLFNBQVNXLHNCQTdCbUI7QUE4QnBEQyxlQUFXWixTQUFTWSxTQTlCZ0M7QUErQnBEQyx3QkFBb0JiLFNBQVNhLGtCQS9CdUI7QUFnQ3BEQyx3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SSxJQUFMLENBQVU7QUFDUkQsb0JBQVEsS0FBS3RDLFdBQUwsQ0FBaUJvQyxDQUFqQixDQURBO0FBRVJqQyxtQkFBT21DLE9BQU9uQyxLQUZOO0FBR1JxQyxrQkFBTUYsT0FBT0UsSUFITDtBQUlScEMsaUJBQUtrQyxPQUFPbEM7QUFKSixXQUFWO0FBTUQ7QUFDRjtBQUNELFdBQUtxQyxHQUFMLENBQVMsYUFBVCxFQUF3QixFQUF4Qjs7QUFFQSxXQUFLQyxXQUFMLENBQWlCUCxJQUFqQjtBQUNELEtBaEttRDtBQWlLcERRLFVBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixXQUFLQyxTQUFMLENBQWVELElBQWYsRUFBcUJFLFNBQXJCO0FBQ0EsV0FBSzVDLGlCQUFMO0FBQ0QsS0FwS21EO0FBcUtwRDZDLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxhQUFPLEtBQUtDLEtBQUwsS0FBZSxLQUFLQSxLQUFMLEdBQWE7QUFDakNDLGNBQU07QUFEMkIsT0FBNUIsQ0FBUDtBQUdEO0FBekttRCxHQUF0QyxDQUFoQjs7b0JBNEtlM0UsTyIsImZpbGUiOiJTZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBjb25uZWN0IGZyb20gJ2Rvam8vX2Jhc2UvY29ubmVjdCc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdzZXR0aW5ncycpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuU2V0dGluZ3NcclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5TZXR0aW5ncycsIFtMaXN0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1JY29uVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJ7JT0gJC5hY3Rpb24gJX1cIiB7JSBpZiAoJC52aWV3KSB7ICV9ZGF0YS12aWV3PVwieyU9ICQudmlldyAlfVwieyUgfSAlfSBjbGFzcz1cImJ0bi1hY3Rpb25zIGxpc3QtaXRlbS1zZWxlY3RvciBidXR0b24gdmlzaWJsZVwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImF1ZGlibGVcIj57JTogJCQuYWN0aW9uc1RleHQgJX08L3NwYW4+XHJcbiAgICAgIDxzdmcgY2xhc3M9XCJpY29uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+XHJcbiAgICAgICAgPHVzZSB4bGluazpocmVmPVwiI2ljb24teyU9ICQkLmdldEl0ZW1JY29uQ2xhc3MoJCkgJX1cIj48L3VzZT5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L2J1dHRvbj5gLFxyXG4gIF0pLFxyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8aDQgZGF0YS1hY3Rpb249XCJ7JT0gJC5hY3Rpb24gJX1cIiBjbGFzcz1cImxpc3QtaXRlbS1jb250ZW50ICcsXHJcbiAgICAneyUgaWYgKCQuaWNvbikgeyAlfScsXHJcbiAgICAnbGlzdC1pdGVtLWNvbnRlbnQnLFxyXG4gICAgJ3slIH0gJX0gXCI+JyxcclxuICAgICd7JTogJC50aXRsZSAlfTwvaDQ+JyxcclxuICBdKSxcclxuICBsaVJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBkYXRhLWFjdGlvbj1cInslPSAkLmFjdGlvbiAlfVwiIHslIGlmICgkLnZpZXcpIHsgJX1kYXRhLXZpZXc9XCJ7JT0gJC52aWV3ICV9XCJ7JSB9ICV9PicsXHJcbiAgICAneyUhICQkLml0ZW1JY29uVGVtcGxhdGUgJX0nLFxyXG4gICAgJ3slISAkJC5pdGVtVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvbGk+JyxcclxuICBdKSxcclxuICBpc0NhcmRWaWV3OiBmYWxzZSxcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBjbGVhckxvY2FsU3RvcmFnZVRpdGxlVGV4dDogcmVzb3VyY2UuY2xlYXJMb2NhbFN0b3JhZ2VUaXRsZVRleHQsXHJcbiAgY2xlYXJBdXRoZW50aWNhdGlvblRpdGxlVGV4dDogcmVzb3VyY2UuY2xlYXJBdXRoZW50aWNhdGlvblRpdGxlVGV4dCxcclxuICBlcnJvckxvZ1RpdGxlVGV4dDogcmVzb3VyY2UuZXJyb3JMb2dUaXRsZVRleHQsXHJcbiAgbG9jYWxTdG9yYWdlQ2xlYXJlZFRleHQ6IHJlc291cmNlLmxvY2FsU3RvcmFnZUNsZWFyZWRUZXh0LFxyXG4gIGNyZWRlbnRpYWxzQ2xlYXJlZFRleHQ6IHJlc291cmNlLmNyZWRlbnRpYWxzQ2xlYXJlZFRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgb2ZmbGluZU9wdGlvbnNUZXh0OiByZXNvdXJjZS5vZmZsaW5lT3B0aW9uc1RleHQsXHJcbiAgdXNlMjRIb3VyQ2xvY2tUZXh0OiByZXNvdXJjZS51c2UyNEhvdXJDbG9ja1RleHQsXHJcbiAgdXNlMTJIb3VyQ2xvY2tUZXh0OiByZXNvdXJjZS51c2UxMkhvdXJDbG9ja1RleHQsXHJcbiAgY29uZmlybTI0SG91ckNsb2NrTWVzc2FnZTogcmVzb3VyY2UuY29uZmlybTI0SG91ckNsb2NrTWVzc2FnZSxcclxuICBjb25maXJtMTJIb3VyQ2xvY2tNZXNzYWdlOiByZXNvdXJjZS5jb25maXJtMTJIb3VyQ2xvY2tNZXNzYWdlLFxyXG4gIGNvbmZpcm1DbGVhckxvY2FsU3RvcmFnZU1lc3NhZ2U6IHJlc291cmNlLmNvbmZpcm1DbGVhckxvY2FsU3RvcmFnZU1lc3NhZ2UsXHJcbiAgbGFuZ3VhZ2VTZXR0aW5nVGV4dDogcmVzb3VyY2UubGFuZ3VhZ2VTZXR0aW5nVGV4dCxcclxuICBhY3Rpb25zVGV4dDogcmVzb3VyY2UuYWN0aW9uc1RleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnc2V0dGluZ3MnLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBlbmFibGVQdWxsVG9SZWZyZXNoOiBmYWxzZSxcclxuICBzZWxlY3Rpb25Pbmx5OiB0cnVlLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLCAvLyBhZGRzIGxpc3Qtc2hvdy1zZWxlY3RvcnMgY2xhc3MgdG8gbGlzdHZpZXcgZm9yIGRpc3BsYXlpbmcgaWNvbnNcclxuICBhY3Rpb25JdGVtczogbnVsbCxcclxuICBhY3Rpb25PcmRlcjogW1xyXG4gICAgJ2NsZWFyQXV0aGVudGljYXRpb24nLFxyXG4gICAgJ2NsZWFyTG9jYWxTdG9yYWdlJyxcclxuICAgICd2aWV3RXJyb3JMb2dzJyxcclxuICAgICd2aWV3T2ZmbGluZU9wdGlvbnMnLFxyXG4gICAgJ3VzZTI0SG91ckNsb2NrJyxcclxuICAgICd2aWV3TGFuZ3VhZ2VPcHRpb25zJyxcclxuICBdLFxyXG4gIGNyZWF0ZUFjdGlvbnNMaXN0OiBmdW5jdGlvbiBjcmVhdGVBY3Rpb25zTGlzdCgpIHtcclxuICAgIHRoaXMuYWN0aW9uSXRlbXMgPSB7XHJcbiAgICAgIGNsZWFyTG9jYWxTdG9yYWdlOiB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMuY2xlYXJMb2NhbFN0b3JhZ2VUaXRsZVRleHQsXHJcbiAgICAgICAgY2xzOiAndGVjaG5vbG9neScsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNsZWFyQXV0aGVudGljYXRpb246IHtcclxuICAgICAgICB0aXRsZTogdGhpcy5jbGVhckF1dGhlbnRpY2F0aW9uVGl0bGVUZXh0LFxyXG4gICAgICAgIGNsczogJ3VubG9ja2VkJyxcclxuICAgICAgfSxcclxuICAgICAgdmlld0Vycm9yTG9nczoge1xyXG4gICAgICAgIHRpdGxlOiB0aGlzLmVycm9yTG9nVGl0bGVUZXh0LFxyXG4gICAgICAgIGNsczogJ2J1bGxldC1saXN0JyxcclxuICAgICAgfSxcclxuICAgICAgdmlld09mZmxpbmVPcHRpb25zOiB7XHJcbiAgICAgICAgdGl0bGU6IHRoaXMub2ZmbGluZU9wdGlvbnNUZXh0LFxyXG4gICAgICAgIGNsczogJ2J1bGxldC1saXN0JyxcclxuICAgICAgfSxcclxuICAgICAgdXNlMjRIb3VyQ2xvY2s6IHtcclxuICAgICAgICB0aXRsZTogKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy51c2UyNEhvdXJDbG9ja1RleHQgOiB0aGlzLnVzZTEySG91ckNsb2NrVGV4dCxcclxuICAgICAgICBjbHM6ICd1c2VyJyxcclxuICAgICAgfSxcclxuICAgICAgdmlld0xhbmd1YWdlT3B0aW9uczoge1xyXG4gICAgICAgIHRpdGxlOiB0aGlzLmxhbmd1YWdlU2V0dGluZ1RleHQsXHJcbiAgICAgICAgY2xzOiAndXJsJyxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfSxcclxuICBnZXRJdGVtSWNvbkNsYXNzOiBmdW5jdGlvbiBnZXRJdGVtSWNvbkNsYXNzKGVudHJ5KSB7XHJcbiAgICByZXR1cm4gZW50cnkuY2xzO1xyXG4gIH0sXHJcbiAgY3JlYXRlSW5kaWNhdG9yTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVJbmRpY2F0b3JMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pdGVtSW5kaWNhdG9ycyB8fCAodGhpcy5pdGVtSW5kaWNhdG9ycyA9IFtdKTtcclxuICB9LFxyXG4gIHZpZXdFcnJvckxvZ3M6IGZ1bmN0aW9uIHZpZXdFcnJvckxvZ3MoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ2Vycm9ybG9nX2xpc3QnKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xlYXJMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uIGNsZWFyTG9jYWxTdG9yYWdlKCkge1xyXG4gICAgaWYgKGNvbmZpcm0odGhpcy5jb25maXJtQ2xlYXJMb2NhbFN0b3JhZ2VNZXNzYWdlKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25uZWN0LnB1Ymxpc2goJy9hcHAvcmVmcmVzaCcsIFt7XHJcbiAgICAgICAgcmVzb3VyY2VLaW5kOiAnbG9jYWxTdG9yYWdlJyxcclxuICAgICAgfV0pO1xyXG5cclxuICAgICAgYWxlcnQodGhpcy5sb2NhbFN0b3JhZ2VDbGVhcmVkVGV4dCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyAvLyByZWxvYWRlZCBiZWNhdXNlIG9mIHRoZSBjbG9jayBzZXR0aW5nXHJcbiAgICB9XHJcbiAgfSxcclxuICBjbGVhckF1dGhlbnRpY2F0aW9uOiBmdW5jdGlvbiBjbGVhckF1dGhlbnRpY2F0aW9uKCkge1xyXG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjcmVkZW50aWFscycpO1xyXG4gICAgfVxyXG5cclxuICAgIGFsZXJ0KHRoaXMuY3JlZGVudGlhbHNDbGVhcmVkVGV4dCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9LFxyXG4gIHZpZXdPZmZsaW5lT3B0aW9uczogZnVuY3Rpb24gdmlld09mZmxpbmVPcHRpb25zKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdvZmZsaW5lX29wdGlvbnNfZWRpdCcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICB2aWV3TGFuZ3VhZ2VPcHRpb25zOiBmdW5jdGlvbiB2aWV3TGFuZ3VhZ2VPcHRpb25zKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdsYW5ndWFnZV9vcHRpb25zX2VkaXQnKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdXNlMjRIb3VyQ2xvY2s6IGZ1bmN0aW9uIHVzZTI0SG91ckNsb2NrKCkge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IEFwcC5pczI0SG91ckNsb2NrKCkgPyB0aGlzLmNvbmZpcm0xMkhvdXJDbG9ja01lc3NhZ2UgOiB0aGlzLmNvbmZpcm0yNEhvdXJDbG9ja01lc3NhZ2U7XHJcbiAgICBpZiAoY29uZmlybShtZXNzYWdlKSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgIGlmIChBcHAuaXMyNEhvdXJDbG9jaygpKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2UyNEhvdXJDbG9jaycsIEpTT04uc3RyaW5naWZ5KGZhbHNlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2UyNEhvdXJDbG9jaycsIEpTT04uc3RyaW5naWZ5KHRydWUpKTtcclxuICAgICAgfVxyXG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBoYXNNb3JlRGF0YTogZnVuY3Rpb24gaGFzTW9yZURhdGEoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XHJcbiAgICBjb25zdCBsaXN0ID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGlvbk9yZGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuYWN0aW9uSXRlbXNbdGhpcy5hY3Rpb25PcmRlcltpXV07XHJcbiAgICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgICBsaXN0LnB1c2goe1xyXG4gICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbk9yZGVyW2ldLFxyXG4gICAgICAgICAgdGl0bGU6IGFjdGlvbi50aXRsZSxcclxuICAgICAgICAgIGljb246IGFjdGlvbi5pY29uLFxyXG4gICAgICAgICAgY2xzOiBhY3Rpb24uY2xzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldCgnbGlzdENvbnRlbnQnLCAnJyk7XHJcblxyXG4gICAgdGhpcy5wcm9jZXNzRGF0YShsaXN0KTtcclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jcmVhdGVBY3Rpb25zTGlzdCgpO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbXSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19