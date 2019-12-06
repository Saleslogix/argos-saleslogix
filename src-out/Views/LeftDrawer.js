define('crm/Views/LeftDrawer', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/store/Memory', '../SpeedSearchWidget', 'dojo/string', 'argos/GroupedList', 'argos/I18n'], function (module, exports, _declare, _lang, _Memory, _SpeedSearchWidget, _string, _GroupedList, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Memory2 = _interopRequireDefault(_Memory);

  var _SpeedSearchWidget2 = _interopRequireDefault(_SpeedSearchWidget);

  var _string2 = _interopRequireDefault(_string);

  var _GroupedList2 = _interopRequireDefault(_GroupedList);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('leftDrawer');

  /**
   * @class crm.Views.LeftDrawer
   * @extends argos.GroupedList
   */
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

  var __class = (0, _declare2.default)('crm.Views.LeftDrawer', [_GroupedList2.default], /** @lends crm.Views.LeftDrawer# */{
    // Templates
    cls: ' contextualContent',
    enablePullToRefresh: false,
    rowTemplate: new Simplate(['<div class="accordion-header" role="presentation">', '<a href="#" data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}><span>{%: $.title %}</span></a>', '</div>']),

    // Localization
    configureText: resource.configureText,
    addAccountContactText: resource.addAccountContactText,
    titleText: resource.titleText,
    actionsText: resource.actionsText,
    viewsText: resource.viewsText,
    footerText: resource.footerText,
    settingsText: resource.settingsText,
    helpText: resource.helpText,
    logOutText: resource.logOutText,
    logOutConfirmText: resource.logOutConfirmText,
    onlineText: resource.onlineText,
    offlineText: resource.offlineText,
    connectionText: resource.connectionText,
    aboutText: resource.aboutText,

    // View Properties
    id: 'left_drawer',
    expose: false,
    enableSearch: true,
    searchWidgetClass: _SpeedSearchWidget2.default,
    customizationSet: 'left_drawer',
    pageSize: 100,

    settingsView: 'settings',
    helpView: 'help',
    configurationView: 'configure',
    addAccountContactView: 'add_account_contact',
    searchView: 'speedsearch_list',

    initSoho: function initSoho() {
      var _this = this;

      this.inherited(initSoho, arguments);
      this.accordion.element.on('selected', function (evt, header) {
        // Fix up the event target to the element with our data-action attribute.
        evt.target = $('a', header).get(0);
        _this._initiateActionFromEvent(evt);
      });
    },
    shouldCloseAppMenuOnAction: function shouldCloseAppMenu() {
      var menu = App.applicationmenu;
      return !menu.isLargerThanBreakpoint();
    },
    closeAppMenu: function closeAppMenu() {
      var menu = App.applicationmenu;

      if (menu && this.shouldCloseAppMenuOnAction()) {
        menu.closeMenu();
      }
    },
    logOut: function logOut() {
      var sure = window.confirm(this.logOutConfirmText); // eslint-disable-line
      if (sure) {
        this.destroy();
        App.hideApplicationMenu();
        App.bars.tbar.hide();
        App.logOut();
      }
    },
    loadAndNavigateToView: function loadAndNavigateToView(params) {
      var view = App.getView(params && params.view);
      this.navigateToView(view);
    },
    navigateToView: function navigateToView(view) {
      if (view) {
        view.show();
        this.closeAppMenu();
      }
    },
    addAccountContact: function addAccountContact() {
      var view = App.getView('add_account_contact');
      if (view) {
        view.show({
          insert: true
        });
        this.closeAppMenu();
      }
    },
    navigateToConfigurationView: function navigateToConfigurationView() {
      var view = App.getView(this.configurationView);
      this.navigateToView(view);
    },
    navigateToSettingsView: function navigateToSettingsView() {
      var view = App.getView(this.settingsView);
      this.navigateToView(view);
    },
    navigateToHelpView: function navigateToHelpView() {
      var view = App.getView(this.helpView);
      this.navigateToView(view);
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    getGroupForEntry: function getGroupForEntry(entry) {
      var footerItems = ['ConfigureMenu', 'SettingsAction', 'HelpAction', 'Logout', 'ConnectionIndicator', 'AboutAction'];

      if (entry.view) {
        return {
          tag: 'view',
          title: this.viewsText
        };
      }

      if (footerItems.indexOf(entry.name) >= 0) {
        return {
          tag: 'footer',
          title: this.footerText
        };
      }

      return {
        tag: 'action',
        title: this.actionsText
      };
    },
    init: function init() {
      this.inherited(init, arguments);
      this.connect(App, 'onRegistered', this._onRegistered);
    },
    createLayout: function createLayout() {
      if (this.layout) {
        return this.layout;
      }

      var layout = [];

      var quickActions = {
        id: 'actions',
        children: [{
          name: 'AddAccountContactAction',
          action: 'addAccountContact',
          title: this.addAccountContactText,
          security: 'Entities/Account/Add'
        }]
      };

      layout.push(quickActions);

      var goTo = {
        id: 'views',
        children: []
      };

      var configured = _lang2.default.getObject('preferences.home.visible', false, window.App);
      for (var i = 0; configured && i < configured.length; i++) {
        var view = App.getView(configured[i]);
        if (view) {
          goTo.children.push({
            action: 'loadAndNavigateToView',
            view: view.id,
            title: view.titleText,
            security: view.getSecurity(),
            enableOfflineSupport: view.enableOfflineSupport,
            enableOnlineSupport: view.enableOnlineSupport,
            disabled: view.isDisabled()
          });
        }
      }

      layout.push(goTo);

      var footer = {
        id: 'footer',
        children: [{
          name: 'ConfigureMenu',
          action: 'navigateToConfigurationView',
          title: this.configureText,
          enableOfflineSupport: false
        }, {
          name: 'SettingsAction',
          action: 'navigateToSettingsView',
          title: this.settingsText,
          enableOfflineSupport: true
        }, {
          name: 'HelpAction',
          action: 'navigateToHelpView',
          title: this.helpText,
          enableOfflineSupport: true
        }, {
          name: 'Logout',
          action: 'logOut',
          title: this.logOutText,
          enableOfflineSupport: false
        }, {
          name: 'ConnectionIndicator',
          title: _string2.default.substitute(this.connectionText, { connectionStatus: App.onLine ? this.onlineText : this.offlineText }),
          enableOfflineSupport: true
        }, {
          name: 'AboutAction',
          title: this.aboutText,
          action: 'showAbout'
        }]
      };

      layout.push(footer);

      return layout;
    },
    showAbout: function showAbout() {
      $('body').about({
        appName: 'Infor CRM',
        version: App.getVersionInfo()
      });
    },
    createStore: function createStore() {
      var layout = this._createCustomizedLayout(this.createLayout());
      var list = [];
      var total = 0;
      var section = void 0;

      for (var i = 0; i < layout.length; i++) {
        section = layout[i].children;

        for (var j = 0; j < section.length; j++) {
          total = total + 1;
          var row = section[j];
          row.$key = total;

          if (row.disabled) {
            continue;
          }
          if (row.security && !App.hasAccessTo(row.security)) {
            continue;
          }

          if (!App.isOnline() && !row.enableOfflineSupport) {
            continue;
          }

          if (App.isOnline() && row.enableOnlineSupport === false) {
            continue;
          }

          if (typeof this.query !== 'function' || this.query(row)) {
            list.push(row);
          }
        }
      }

      var store = new _Memory2.default({
        data: list
      });
      store.idProperty = '$key';
      return store;
    },
    destroy: function destroy() {
      this.clear();
      $('#application-menu').data('applicationmenu').destroy();
    },
    /**
     * Override the List refresh to also clear the view (something the beforeTransitionTo handles, but we are not using)
     */
    refresh: function refresh() {
      this.clear();
      this.requestData();
      if (this.searchWidget) {
        if (App.onLine) {
          this.searchWidget.enable();
        } else {
          this.searchWidget.disable();
        }
      }
    },
    clear: function clear() {
      this.inherited(clear, arguments);
      this.layout = null;
      this.store = null;
    },
    show: function show() {
      if (this.onShow(this) === false) {
        return;
      }

      this.refresh();
    },
    refreshRequiredFor: function refreshRequiredFor() {
      var visible = _lang2.default.getObject('preferences.home.visible', false, App) || [];
      var shown = this.feed && this.feed.$resources;

      if (!visible || !shown || visible.length !== shown.length) {
        return true;
      }

      for (var i = 0; i < visible.length; i++) {
        if (visible[i] !== shown[i].$key) {
          return true;
        }
      }

      return this.inherited(refreshRequiredFor, arguments);
    },
    _onRegistered: function _onRegistered() {
      this.refreshRequired = true;
    },
    _onSearchExpression: function _onSearchExpression(expression) {
      var view = App.getView(this.searchView);
      var current = App.getPrimaryActiveView();

      if (view) {
        // If the speedsearch list is not our current view, show it first
        if (view.id !== current.id) {
          view.show({
            query: expression
          });
        }

        // Set the search term on the list and call search.
        // This will keep the search terms on each widget in sync.
        setTimeout(function () {
          view.setSearchTerm(expression);
          if (current && current.id === view.id) {
            view.search();
          }
        }, 10);
        this.closeAppMenu();
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9MZWZ0RHJhd2VyLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImNscyIsImVuYWJsZVB1bGxUb1JlZnJlc2giLCJyb3dUZW1wbGF0ZSIsIlNpbXBsYXRlIiwiY29uZmlndXJlVGV4dCIsImFkZEFjY291bnRDb250YWN0VGV4dCIsInRpdGxlVGV4dCIsImFjdGlvbnNUZXh0Iiwidmlld3NUZXh0IiwiZm9vdGVyVGV4dCIsInNldHRpbmdzVGV4dCIsImhlbHBUZXh0IiwibG9nT3V0VGV4dCIsImxvZ091dENvbmZpcm1UZXh0Iiwib25saW5lVGV4dCIsIm9mZmxpbmVUZXh0IiwiY29ubmVjdGlvblRleHQiLCJhYm91dFRleHQiLCJpZCIsImV4cG9zZSIsImVuYWJsZVNlYXJjaCIsInNlYXJjaFdpZGdldENsYXNzIiwiY3VzdG9taXphdGlvblNldCIsInBhZ2VTaXplIiwic2V0dGluZ3NWaWV3IiwiaGVscFZpZXciLCJjb25maWd1cmF0aW9uVmlldyIsImFkZEFjY291bnRDb250YWN0VmlldyIsInNlYXJjaFZpZXciLCJpbml0U29obyIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImFjY29yZGlvbiIsImVsZW1lbnQiLCJvbiIsImV2dCIsImhlYWRlciIsInRhcmdldCIsIiQiLCJnZXQiLCJfaW5pdGlhdGVBY3Rpb25Gcm9tRXZlbnQiLCJzaG91bGRDbG9zZUFwcE1lbnVPbkFjdGlvbiIsInNob3VsZENsb3NlQXBwTWVudSIsIm1lbnUiLCJBcHAiLCJhcHBsaWNhdGlvbm1lbnUiLCJpc0xhcmdlclRoYW5CcmVha3BvaW50IiwiY2xvc2VBcHBNZW51IiwiY2xvc2VNZW51IiwibG9nT3V0Iiwic3VyZSIsIndpbmRvdyIsImNvbmZpcm0iLCJkZXN0cm95IiwiaGlkZUFwcGxpY2F0aW9uTWVudSIsImJhcnMiLCJ0YmFyIiwiaGlkZSIsImxvYWRBbmROYXZpZ2F0ZVRvVmlldyIsInBhcmFtcyIsInZpZXciLCJnZXRWaWV3IiwibmF2aWdhdGVUb1ZpZXciLCJzaG93IiwiYWRkQWNjb3VudENvbnRhY3QiLCJpbnNlcnQiLCJuYXZpZ2F0ZVRvQ29uZmlndXJhdGlvblZpZXciLCJuYXZpZ2F0ZVRvU2V0dGluZ3NWaWV3IiwibmF2aWdhdGVUb0hlbHBWaWV3IiwiaGFzTW9yZURhdGEiLCJnZXRHcm91cEZvckVudHJ5IiwiZW50cnkiLCJmb290ZXJJdGVtcyIsInRhZyIsInRpdGxlIiwiaW5kZXhPZiIsIm5hbWUiLCJpbml0IiwiY29ubmVjdCIsIl9vblJlZ2lzdGVyZWQiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJxdWlja0FjdGlvbnMiLCJjaGlsZHJlbiIsImFjdGlvbiIsInNlY3VyaXR5IiwicHVzaCIsImdvVG8iLCJjb25maWd1cmVkIiwiZ2V0T2JqZWN0IiwiaSIsImxlbmd0aCIsImdldFNlY3VyaXR5IiwiZW5hYmxlT2ZmbGluZVN1cHBvcnQiLCJlbmFibGVPbmxpbmVTdXBwb3J0IiwiZGlzYWJsZWQiLCJpc0Rpc2FibGVkIiwiZm9vdGVyIiwic3Vic3RpdHV0ZSIsImNvbm5lY3Rpb25TdGF0dXMiLCJvbkxpbmUiLCJzaG93QWJvdXQiLCJhYm91dCIsImFwcE5hbWUiLCJ2ZXJzaW9uIiwiZ2V0VmVyc2lvbkluZm8iLCJjcmVhdGVTdG9yZSIsIl9jcmVhdGVDdXN0b21pemVkTGF5b3V0IiwibGlzdCIsInRvdGFsIiwic2VjdGlvbiIsImoiLCJyb3ciLCIka2V5IiwiaGFzQWNjZXNzVG8iLCJpc09ubGluZSIsInF1ZXJ5Iiwic3RvcmUiLCJkYXRhIiwiaWRQcm9wZXJ0eSIsImNsZWFyIiwicmVmcmVzaCIsInJlcXVlc3REYXRhIiwic2VhcmNoV2lkZ2V0IiwiZW5hYmxlIiwiZGlzYWJsZSIsIm9uU2hvdyIsInJlZnJlc2hSZXF1aXJlZEZvciIsInZpc2libGUiLCJzaG93biIsImZlZWQiLCIkcmVzb3VyY2VzIiwicmVmcmVzaFJlcXVpcmVkIiwiX29uU2VhcmNoRXhwcmVzc2lvbiIsImV4cHJlc3Npb24iLCJjdXJyZW50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QUFDQSxZQUFJQSxLQUFLMUMsRUFBTCxLQUFZcUgsUUFBUXJILEVBQXhCLEVBQTRCO0FBQzFCMEMsZUFBS0csSUFBTCxDQUFVO0FBQ1JxRCxtQkFBT2tCO0FBREMsV0FBVjtBQUdEOztBQUVEO0FBQ0E7QUFDQUcsbUJBQVcsWUFBTTtBQUNmN0UsZUFBSzhFLGFBQUwsQ0FBbUJKLFVBQW5CO0FBQ0EsY0FBSUMsV0FBV0EsUUFBUXJILEVBQVIsS0FBZTBDLEtBQUsxQyxFQUFuQyxFQUF1QztBQUNyQzBDLGlCQUFLK0UsTUFBTDtBQUNEO0FBQ0YsU0FMRCxFQUtHLEVBTEg7QUFNQSxhQUFLNUYsWUFBTDtBQUNEO0FBQ0Y7QUE1VStGLEdBQWxGLENBQWhCOztvQkErVWVoRCxPIiwiZmlsZSI6IkxlZnREcmF3ZXIuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTWVtb3J5IGZyb20gJ2Rvam8vc3RvcmUvTWVtb3J5JztcclxuaW1wb3J0IFNwZWVkU2VhcmNoV2lkZ2V0IGZyb20gJy4uL1NwZWVkU2VhcmNoV2lkZ2V0JztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBHcm91cGVkTGlzdCBmcm9tICdhcmdvcy9Hcm91cGVkTGlzdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdsZWZ0RHJhd2VyJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5MZWZ0RHJhd2VyXHJcbiAqIEBleHRlbmRzIGFyZ29zLkdyb3VwZWRMaXN0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkxlZnREcmF3ZXInLCBbR3JvdXBlZExpc3RdLCAvKiogQGxlbmRzIGNybS5WaWV3cy5MZWZ0RHJhd2VyIyAqL3tcclxuICAvLyBUZW1wbGF0ZXNcclxuICBjbHM6ICcgY29udGV4dHVhbENvbnRlbnQnLFxyXG4gIGVuYWJsZVB1bGxUb1JlZnJlc2g6IGZhbHNlLFxyXG4gIHJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhY2NvcmRpb24taGVhZGVyXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPicsXHJcbiAgICAnPGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cInslPSAkLmFjdGlvbiAlfVwiIHslIGlmICgkLnZpZXcpIHsgJX1kYXRhLXZpZXc9XCJ7JT0gJC52aWV3ICV9XCJ7JSB9ICV9PjxzcGFuPnslOiAkLnRpdGxlICV9PC9zcGFuPjwvYT4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGNvbmZpZ3VyZVRleHQ6IHJlc291cmNlLmNvbmZpZ3VyZVRleHQsXHJcbiAgYWRkQWNjb3VudENvbnRhY3RUZXh0OiByZXNvdXJjZS5hZGRBY2NvdW50Q29udGFjdFRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWN0aW9uc1RleHQ6IHJlc291cmNlLmFjdGlvbnNUZXh0LFxyXG4gIHZpZXdzVGV4dDogcmVzb3VyY2Uudmlld3NUZXh0LFxyXG4gIGZvb3RlclRleHQ6IHJlc291cmNlLmZvb3RlclRleHQsXHJcbiAgc2V0dGluZ3NUZXh0OiByZXNvdXJjZS5zZXR0aW5nc1RleHQsXHJcbiAgaGVscFRleHQ6IHJlc291cmNlLmhlbHBUZXh0LFxyXG4gIGxvZ091dFRleHQ6IHJlc291cmNlLmxvZ091dFRleHQsXHJcbiAgbG9nT3V0Q29uZmlybVRleHQ6IHJlc291cmNlLmxvZ091dENvbmZpcm1UZXh0LFxyXG4gIG9ubGluZVRleHQ6IHJlc291cmNlLm9ubGluZVRleHQsXHJcbiAgb2ZmbGluZVRleHQ6IHJlc291cmNlLm9mZmxpbmVUZXh0LFxyXG4gIGNvbm5lY3Rpb25UZXh0OiByZXNvdXJjZS5jb25uZWN0aW9uVGV4dCxcclxuICBhYm91dFRleHQ6IHJlc291cmNlLmFib3V0VGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdsZWZ0X2RyYXdlcicsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBlbmFibGVTZWFyY2g6IHRydWUsXHJcbiAgc2VhcmNoV2lkZ2V0Q2xhc3M6IFNwZWVkU2VhcmNoV2lkZ2V0LFxyXG4gIGN1c3RvbWl6YXRpb25TZXQ6ICdsZWZ0X2RyYXdlcicsXHJcbiAgcGFnZVNpemU6IDEwMCxcclxuXHJcbiAgc2V0dGluZ3NWaWV3OiAnc2V0dGluZ3MnLFxyXG4gIGhlbHBWaWV3OiAnaGVscCcsXHJcbiAgY29uZmlndXJhdGlvblZpZXc6ICdjb25maWd1cmUnLFxyXG4gIGFkZEFjY291bnRDb250YWN0VmlldzogJ2FkZF9hY2NvdW50X2NvbnRhY3QnLFxyXG4gIHNlYXJjaFZpZXc6ICdzcGVlZHNlYXJjaF9saXN0JyxcclxuXHJcbiAgaW5pdFNvaG86IGZ1bmN0aW9uIGluaXRTb2hvKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdFNvaG8sIGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmFjY29yZGlvbi5lbGVtZW50Lm9uKCdzZWxlY3RlZCcsIChldnQsIGhlYWRlcikgPT4ge1xyXG4gICAgICAvLyBGaXggdXAgdGhlIGV2ZW50IHRhcmdldCB0byB0aGUgZWxlbWVudCB3aXRoIG91ciBkYXRhLWFjdGlvbiBhdHRyaWJ1dGUuXHJcbiAgICAgIGV2dC50YXJnZXQgPSAkKCdhJywgaGVhZGVyKS5nZXQoMCk7XHJcbiAgICAgIHRoaXMuX2luaXRpYXRlQWN0aW9uRnJvbUV2ZW50KGV2dCk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHNob3VsZENsb3NlQXBwTWVudU9uQWN0aW9uOiBmdW5jdGlvbiBzaG91bGRDbG9zZUFwcE1lbnUoKSB7XHJcbiAgICBjb25zdCBtZW51ID0gQXBwLmFwcGxpY2F0aW9ubWVudTtcclxuICAgIHJldHVybiAhbWVudS5pc0xhcmdlclRoYW5CcmVha3BvaW50KCk7XHJcbiAgfSxcclxuICBjbG9zZUFwcE1lbnU6IGZ1bmN0aW9uIGNsb3NlQXBwTWVudSgpIHtcclxuICAgIGNvbnN0IG1lbnUgPSBBcHAuYXBwbGljYXRpb25tZW51O1xyXG5cclxuICAgIGlmIChtZW51ICYmIHRoaXMuc2hvdWxkQ2xvc2VBcHBNZW51T25BY3Rpb24oKSkge1xyXG4gICAgICBtZW51LmNsb3NlTWVudSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbG9nT3V0OiBmdW5jdGlvbiBsb2dPdXQoKSB7XHJcbiAgICBjb25zdCBzdXJlID0gd2luZG93LmNvbmZpcm0odGhpcy5sb2dPdXRDb25maXJtVGV4dCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgIGlmIChzdXJlKSB7XHJcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICBBcHAuaGlkZUFwcGxpY2F0aW9uTWVudSgpO1xyXG4gICAgICBBcHAuYmFycy50YmFyLmhpZGUoKTtcclxuICAgICAgQXBwLmxvZ091dCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbG9hZEFuZE5hdmlnYXRlVG9WaWV3OiBmdW5jdGlvbiBsb2FkQW5kTmF2aWdhdGVUb1ZpZXcocGFyYW1zKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcocGFyYW1zICYmIHBhcmFtcy52aWV3KTtcclxuICAgIHRoaXMubmF2aWdhdGVUb1ZpZXcodmlldyk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb1ZpZXcodmlldykge1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KCk7XHJcbiAgICAgIHRoaXMuY2xvc2VBcHBNZW51KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhZGRBY2NvdW50Q29udGFjdDogZnVuY3Rpb24gYWRkQWNjb3VudENvbnRhY3QoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ2FkZF9hY2NvdW50X2NvbnRhY3QnKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jbG9zZUFwcE1lbnUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG5hdmlnYXRlVG9Db25maWd1cmF0aW9uVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0NvbmZpZ3VyYXRpb25WaWV3KCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuY29uZmlndXJhdGlvblZpZXcpO1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvVmlldyh2aWV3KTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9TZXR0aW5nc1ZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9TZXR0aW5nc1ZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5zZXR0aW5nc1ZpZXcpO1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvVmlldyh2aWV3KTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9IZWxwVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0hlbHBWaWV3KCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuaGVscFZpZXcpO1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvVmlldyh2aWV3KTtcclxuICB9LFxyXG4gIGhhc01vcmVEYXRhOiBmdW5jdGlvbiBoYXNNb3JlRGF0YSgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGdldEdyb3VwRm9yRW50cnk6IGZ1bmN0aW9uIGdldEdyb3VwRm9yRW50cnkoZW50cnkpIHtcclxuICAgIGNvbnN0IGZvb3Rlckl0ZW1zID0gW1xyXG4gICAgICAnQ29uZmlndXJlTWVudScsXHJcbiAgICAgICdTZXR0aW5nc0FjdGlvbicsXHJcbiAgICAgICdIZWxwQWN0aW9uJyxcclxuICAgICAgJ0xvZ291dCcsXHJcbiAgICAgICdDb25uZWN0aW9uSW5kaWNhdG9yJyxcclxuICAgICAgJ0Fib3V0QWN0aW9uJyxcclxuICAgIF07XHJcblxyXG4gICAgaWYgKGVudHJ5LnZpZXcpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0YWc6ICd2aWV3JyxcclxuICAgICAgICB0aXRsZTogdGhpcy52aWV3c1RleHQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZvb3Rlckl0ZW1zLmluZGV4T2YoZW50cnkubmFtZSkgPj0gMCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhZzogJ2Zvb3RlcicsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuZm9vdGVyVGV4dCxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0YWc6ICdhY3Rpb24nLFxyXG4gICAgICB0aXRsZTogdGhpcy5hY3Rpb25zVGV4dCxcclxuICAgIH07XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuY29ubmVjdChBcHAsICdvblJlZ2lzdGVyZWQnLCB0aGlzLl9vblJlZ2lzdGVyZWQpO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICBpZiAodGhpcy5sYXlvdXQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubGF5b3V0O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxheW91dCA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHF1aWNrQWN0aW9ucyA9IHtcclxuICAgICAgaWQ6ICdhY3Rpb25zJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0FkZEFjY291bnRDb250YWN0QWN0aW9uJyxcclxuICAgICAgICBhY3Rpb246ICdhZGRBY2NvdW50Q29udGFjdCcsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuYWRkQWNjb3VudENvbnRhY3RUZXh0LFxyXG4gICAgICAgIHNlY3VyaXR5OiAnRW50aXRpZXMvQWNjb3VudC9BZGQnLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgbGF5b3V0LnB1c2gocXVpY2tBY3Rpb25zKTtcclxuXHJcbiAgICBjb25zdCBnb1RvID0ge1xyXG4gICAgICBpZDogJ3ZpZXdzJyxcclxuICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjb25maWd1cmVkID0gbGFuZy5nZXRPYmplY3QoJ3ByZWZlcmVuY2VzLmhvbWUudmlzaWJsZScsIGZhbHNlLCB3aW5kb3cuQXBwKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBjb25maWd1cmVkICYmIGkgPCBjb25maWd1cmVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb25maWd1cmVkW2ldKTtcclxuICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICBnb1RvLmNoaWxkcmVuLnB1c2goe1xyXG4gICAgICAgICAgYWN0aW9uOiAnbG9hZEFuZE5hdmlnYXRlVG9WaWV3JyxcclxuICAgICAgICAgIHZpZXc6IHZpZXcuaWQsXHJcbiAgICAgICAgICB0aXRsZTogdmlldy50aXRsZVRleHQsXHJcbiAgICAgICAgICBzZWN1cml0eTogdmlldy5nZXRTZWN1cml0eSgpLFxyXG4gICAgICAgICAgZW5hYmxlT2ZmbGluZVN1cHBvcnQ6IHZpZXcuZW5hYmxlT2ZmbGluZVN1cHBvcnQsXHJcbiAgICAgICAgICBlbmFibGVPbmxpbmVTdXBwb3J0OiB2aWV3LmVuYWJsZU9ubGluZVN1cHBvcnQsXHJcbiAgICAgICAgICBkaXNhYmxlZDogdmlldy5pc0Rpc2FibGVkKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsYXlvdXQucHVzaChnb1RvKTtcclxuXHJcbiAgICBjb25zdCBmb290ZXIgPSB7XHJcbiAgICAgIGlkOiAnZm9vdGVyJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ0NvbmZpZ3VyZU1lbnUnLFxyXG4gICAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9Db25maWd1cmF0aW9uVmlldycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuY29uZmlndXJlVGV4dCxcclxuICAgICAgICBlbmFibGVPZmZsaW5lU3VwcG9ydDogZmFsc2UsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnU2V0dGluZ3NBY3Rpb24nLFxyXG4gICAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9TZXR0aW5nc1ZpZXcnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnNldHRpbmdzVGV4dCxcclxuICAgICAgICBlbmFibGVPZmZsaW5lU3VwcG9ydDogdHJ1ZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdIZWxwQWN0aW9uJyxcclxuICAgICAgICBhY3Rpb246ICduYXZpZ2F0ZVRvSGVscFZpZXcnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmhlbHBUZXh0LFxyXG4gICAgICAgIGVuYWJsZU9mZmxpbmVTdXBwb3J0OiB0cnVlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0xvZ291dCcsXHJcbiAgICAgICAgYWN0aW9uOiAnbG9nT3V0JyxcclxuICAgICAgICB0aXRsZTogdGhpcy5sb2dPdXRUZXh0LFxyXG4gICAgICAgIGVuYWJsZU9mZmxpbmVTdXBwb3J0OiBmYWxzZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdDb25uZWN0aW9uSW5kaWNhdG9yJyxcclxuICAgICAgICB0aXRsZTogc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5jb25uZWN0aW9uVGV4dCwgeyBjb25uZWN0aW9uU3RhdHVzOiBBcHAub25MaW5lID8gdGhpcy5vbmxpbmVUZXh0IDogdGhpcy5vZmZsaW5lVGV4dCB9KSxcclxuICAgICAgICBlbmFibGVPZmZsaW5lU3VwcG9ydDogdHJ1ZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdBYm91dEFjdGlvbicsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuYWJvdXRUZXh0LFxyXG4gICAgICAgIGFjdGlvbjogJ3Nob3dBYm91dCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBsYXlvdXQucHVzaChmb290ZXIpO1xyXG5cclxuICAgIHJldHVybiBsYXlvdXQ7XHJcbiAgfSxcclxuICBzaG93QWJvdXQ6IGZ1bmN0aW9uIHNob3dBYm91dCgpIHtcclxuICAgICQoJ2JvZHknKS5hYm91dCh7XHJcbiAgICAgIGFwcE5hbWU6ICdJbmZvciBDUk0nLFxyXG4gICAgICB2ZXJzaW9uOiBBcHAuZ2V0VmVyc2lvbkluZm8oKSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlU3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xyXG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5fY3JlYXRlQ3VzdG9taXplZExheW91dCh0aGlzLmNyZWF0ZUxheW91dCgpKTtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICBsZXQgc2VjdGlvbjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheW91dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBzZWN0aW9uID0gbGF5b3V0W2ldLmNoaWxkcmVuO1xyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWN0aW9uLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgdG90YWwgPSB0b3RhbCArIDE7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gc2VjdGlvbltqXTtcclxuICAgICAgICByb3cuJGtleSA9IHRvdGFsO1xyXG5cclxuICAgICAgICBpZiAocm93LmRpc2FibGVkKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvdy5zZWN1cml0eSAmJiAhQXBwLmhhc0FjY2Vzc1RvKHJvdy5zZWN1cml0eSkpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFBcHAuaXNPbmxpbmUoKSAmJiAhcm93LmVuYWJsZU9mZmxpbmVTdXBwb3J0KSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChBcHAuaXNPbmxpbmUoKSAmJiByb3cuZW5hYmxlT25saW5lU3VwcG9ydCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnF1ZXJ5ICE9PSAnZnVuY3Rpb24nIHx8IHRoaXMucXVlcnkocm93KSkge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgTWVtb3J5KHtcclxuICAgICAgZGF0YTogbGlzdCxcclxuICAgIH0pO1xyXG4gICAgc3RvcmUuaWRQcm9wZXJ0eSA9ICcka2V5JztcclxuICAgIHJldHVybiBzdG9yZTtcclxuICB9LFxyXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAkKCcjYXBwbGljYXRpb24tbWVudScpLmRhdGEoJ2FwcGxpY2F0aW9ubWVudScpLmRlc3Ryb3koKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlIHRoZSBMaXN0IHJlZnJlc2ggdG8gYWxzbyBjbGVhciB0aGUgdmlldyAoc29tZXRoaW5nIHRoZSBiZWZvcmVUcmFuc2l0aW9uVG8gaGFuZGxlcywgYnV0IHdlIGFyZSBub3QgdXNpbmcpXHJcbiAgICovXHJcbiAgcmVmcmVzaDogZnVuY3Rpb24gcmVmcmVzaCgpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVxdWVzdERhdGEoKTtcclxuICAgIGlmICh0aGlzLnNlYXJjaFdpZGdldCkge1xyXG4gICAgICBpZiAoQXBwLm9uTGluZSkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoV2lkZ2V0LmVuYWJsZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoV2lkZ2V0LmRpc2FibGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoY2xlYXIsIGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmxheW91dCA9IG51bGw7XHJcbiAgICB0aGlzLnN0b3JlID0gbnVsbDtcclxuICB9LFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy5vblNob3codGhpcykgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9LFxyXG4gIHJlZnJlc2hSZXF1aXJlZEZvcjogZnVuY3Rpb24gcmVmcmVzaFJlcXVpcmVkRm9yKCkge1xyXG4gICAgY29uc3QgdmlzaWJsZSA9IGxhbmcuZ2V0T2JqZWN0KCdwcmVmZXJlbmNlcy5ob21lLnZpc2libGUnLCBmYWxzZSwgQXBwKSB8fCBbXTtcclxuICAgIGNvbnN0IHNob3duID0gdGhpcy5mZWVkICYmIHRoaXMuZmVlZC4kcmVzb3VyY2VzO1xyXG5cclxuICAgIGlmICghdmlzaWJsZSB8fCAhc2hvd24gfHwgKHZpc2libGUubGVuZ3RoICE9PSBzaG93bi5sZW5ndGgpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlzaWJsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodmlzaWJsZVtpXSAhPT0gc2hvd25baV0uJGtleSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaW5oZXJpdGVkKHJlZnJlc2hSZXF1aXJlZEZvciwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF9vblJlZ2lzdGVyZWQ6IGZ1bmN0aW9uIF9vblJlZ2lzdGVyZWQoKSB7XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgfSxcclxuICBfb25TZWFyY2hFeHByZXNzaW9uOiBmdW5jdGlvbiBfb25TZWFyY2hFeHByZXNzaW9uKGV4cHJlc3Npb24pIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLnNlYXJjaFZpZXcpO1xyXG4gICAgY29uc3QgY3VycmVudCA9IEFwcC5nZXRQcmltYXJ5QWN0aXZlVmlldygpO1xyXG5cclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIC8vIElmIHRoZSBzcGVlZHNlYXJjaCBsaXN0IGlzIG5vdCBvdXIgY3VycmVudCB2aWV3LCBzaG93IGl0IGZpcnN0XHJcbiAgICAgIGlmICh2aWV3LmlkICE9PSBjdXJyZW50LmlkKSB7XHJcbiAgICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICAgIHF1ZXJ5OiBleHByZXNzaW9uLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXQgdGhlIHNlYXJjaCB0ZXJtIG9uIHRoZSBsaXN0IGFuZCBjYWxsIHNlYXJjaC5cclxuICAgICAgLy8gVGhpcyB3aWxsIGtlZXAgdGhlIHNlYXJjaCB0ZXJtcyBvbiBlYWNoIHdpZGdldCBpbiBzeW5jLlxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB2aWV3LnNldFNlYXJjaFRlcm0oZXhwcmVzc2lvbik7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudC5pZCA9PT0gdmlldy5pZCkge1xyXG4gICAgICAgICAgdmlldy5zZWFyY2goKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwKTtcclxuICAgICAgdGhpcy5jbG9zZUFwcE1lbnUoKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==