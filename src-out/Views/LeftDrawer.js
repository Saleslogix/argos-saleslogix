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

      this.inherited(arguments);
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
      var footerItems = ['ConfigureMenu', 'SettingsAction', 'HelpAction', 'Logout', 'ConnectionIndicator'];

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
      this.inherited(arguments);
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
        }]
      };

      layout.push(footer);

      return layout;
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
      this.inherited(arguments);
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

      return this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9MZWZ0RHJhd2VyLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImNscyIsImVuYWJsZVB1bGxUb1JlZnJlc2giLCJyb3dUZW1wbGF0ZSIsIlNpbXBsYXRlIiwiY29uZmlndXJlVGV4dCIsImFkZEFjY291bnRDb250YWN0VGV4dCIsInRpdGxlVGV4dCIsImFjdGlvbnNUZXh0Iiwidmlld3NUZXh0IiwiZm9vdGVyVGV4dCIsInNldHRpbmdzVGV4dCIsImhlbHBUZXh0IiwibG9nT3V0VGV4dCIsImxvZ091dENvbmZpcm1UZXh0Iiwib25saW5lVGV4dCIsIm9mZmxpbmVUZXh0IiwiY29ubmVjdGlvblRleHQiLCJpZCIsImV4cG9zZSIsImVuYWJsZVNlYXJjaCIsInNlYXJjaFdpZGdldENsYXNzIiwiY3VzdG9taXphdGlvblNldCIsInBhZ2VTaXplIiwic2V0dGluZ3NWaWV3IiwiaGVscFZpZXciLCJjb25maWd1cmF0aW9uVmlldyIsImFkZEFjY291bnRDb250YWN0VmlldyIsInNlYXJjaFZpZXciLCJpbml0U29obyIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImFjY29yZGlvbiIsImVsZW1lbnQiLCJvbiIsImV2dCIsImhlYWRlciIsInRhcmdldCIsIiQiLCJnZXQiLCJfaW5pdGlhdGVBY3Rpb25Gcm9tRXZlbnQiLCJzaG91bGRDbG9zZUFwcE1lbnVPbkFjdGlvbiIsInNob3VsZENsb3NlQXBwTWVudSIsIm1lbnUiLCJBcHAiLCJhcHBsaWNhdGlvbm1lbnUiLCJpc0xhcmdlclRoYW5CcmVha3BvaW50IiwiY2xvc2VBcHBNZW51IiwiY2xvc2VNZW51IiwibG9nT3V0Iiwic3VyZSIsIndpbmRvdyIsImNvbmZpcm0iLCJkZXN0cm95IiwiaGlkZUFwcGxpY2F0aW9uTWVudSIsImJhcnMiLCJ0YmFyIiwiaGlkZSIsImxvYWRBbmROYXZpZ2F0ZVRvVmlldyIsInBhcmFtcyIsInZpZXciLCJnZXRWaWV3IiwibmF2aWdhdGVUb1ZpZXciLCJzaG93IiwiYWRkQWNjb3VudENvbnRhY3QiLCJpbnNlcnQiLCJuYXZpZ2F0ZVRvQ29uZmlndXJhdGlvblZpZXciLCJuYXZpZ2F0ZVRvU2V0dGluZ3NWaWV3IiwibmF2aWdhdGVUb0hlbHBWaWV3IiwiaGFzTW9yZURhdGEiLCJnZXRHcm91cEZvckVudHJ5IiwiZW50cnkiLCJmb290ZXJJdGVtcyIsInRhZyIsInRpdGxlIiwiaW5kZXhPZiIsIm5hbWUiLCJpbml0IiwiY29ubmVjdCIsIl9vblJlZ2lzdGVyZWQiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJxdWlja0FjdGlvbnMiLCJjaGlsZHJlbiIsImFjdGlvbiIsInNlY3VyaXR5IiwicHVzaCIsImdvVG8iLCJjb25maWd1cmVkIiwiZ2V0T2JqZWN0IiwiaSIsImxlbmd0aCIsImdldFNlY3VyaXR5IiwiZW5hYmxlT2ZmbGluZVN1cHBvcnQiLCJlbmFibGVPbmxpbmVTdXBwb3J0IiwiZGlzYWJsZWQiLCJpc0Rpc2FibGVkIiwiZm9vdGVyIiwic3Vic3RpdHV0ZSIsImNvbm5lY3Rpb25TdGF0dXMiLCJvbkxpbmUiLCJjcmVhdGVTdG9yZSIsIl9jcmVhdGVDdXN0b21pemVkTGF5b3V0IiwibGlzdCIsInRvdGFsIiwic2VjdGlvbiIsImoiLCJyb3ciLCIka2V5IiwiaGFzQWNjZXNzVG8iLCJpc09ubGluZSIsInF1ZXJ5Iiwic3RvcmUiLCJkYXRhIiwiaWRQcm9wZXJ0eSIsImNsZWFyIiwicmVmcmVzaCIsInJlcXVlc3REYXRhIiwic2VhcmNoV2lkZ2V0IiwiZW5hYmxlIiwiZGlzYWJsZSIsIm9uU2hvdyIsInJlZnJlc2hSZXF1aXJlZEZvciIsInZpc2libGUiLCJzaG93biIsImZlZWQiLCIkcmVzb3VyY2VzIiwicmVmcmVzaFJlcXVpcmVkIiwiX29uU2VhcmNoRXhwcmVzc2lvbiIsImV4cHJlc3Npb24iLCJjdXJyZW50IiwiZ2V0UHJpbWFyeUFjdGl2ZVZpZXciLCJzZXRUaW1lb3V0Iiwic2V0U2VhcmNoVGVybSIsInNlYXJjaCJdLCJtYXBw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OlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgTWVtb3J5IGZyb20gJ2Rvam8vc3RvcmUvTWVtb3J5JztcclxuaW1wb3J0IFNwZWVkU2VhcmNoV2lkZ2V0IGZyb20gJy4uL1NwZWVkU2VhcmNoV2lkZ2V0JztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBHcm91cGVkTGlzdCBmcm9tICdhcmdvcy9Hcm91cGVkTGlzdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdsZWZ0RHJhd2VyJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5MZWZ0RHJhd2VyXHJcbiAqIEBleHRlbmRzIGFyZ29zLkdyb3VwZWRMaXN0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkxlZnREcmF3ZXInLCBbR3JvdXBlZExpc3RdLCAvKiogQGxlbmRzIGNybS5WaWV3cy5MZWZ0RHJhd2VyIyAqL3tcclxuICAvLyBUZW1wbGF0ZXNcclxuICBjbHM6ICcgY29udGV4dHVhbENvbnRlbnQnLFxyXG4gIGVuYWJsZVB1bGxUb1JlZnJlc2g6IGZhbHNlLFxyXG4gIHJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhY2NvcmRpb24taGVhZGVyXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPicsXHJcbiAgICAnPGEgaHJlZj1cIiNcIiBkYXRhLWFjdGlvbj1cInslPSAkLmFjdGlvbiAlfVwiIHslIGlmICgkLnZpZXcpIHsgJX1kYXRhLXZpZXc9XCJ7JT0gJC52aWV3ICV9XCJ7JSB9ICV9PjxzcGFuPnslOiAkLnRpdGxlICV9PC9zcGFuPjwvYT4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcblxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGNvbmZpZ3VyZVRleHQ6IHJlc291cmNlLmNvbmZpZ3VyZVRleHQsXHJcbiAgYWRkQWNjb3VudENvbnRhY3RUZXh0OiByZXNvdXJjZS5hZGRBY2NvdW50Q29udGFjdFRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWN0aW9uc1RleHQ6IHJlc291cmNlLmFjdGlvbnNUZXh0LFxyXG4gIHZpZXdzVGV4dDogcmVzb3VyY2Uudmlld3NUZXh0LFxyXG4gIGZvb3RlclRleHQ6IHJlc291cmNlLmZvb3RlclRleHQsXHJcbiAgc2V0dGluZ3NUZXh0OiByZXNvdXJjZS5zZXR0aW5nc1RleHQsXHJcbiAgaGVscFRleHQ6IHJlc291cmNlLmhlbHBUZXh0LFxyXG4gIGxvZ091dFRleHQ6IHJlc291cmNlLmxvZ091dFRleHQsXHJcbiAgbG9nT3V0Q29uZmlybVRleHQ6IHJlc291cmNlLmxvZ091dENvbmZpcm1UZXh0LFxyXG4gIG9ubGluZVRleHQ6IHJlc291cmNlLm9ubGluZVRleHQsXHJcbiAgb2ZmbGluZVRleHQ6IHJlc291cmNlLm9mZmxpbmVUZXh0LFxyXG4gIGNvbm5lY3Rpb25UZXh0OiByZXNvdXJjZS5jb25uZWN0aW9uVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdsZWZ0X2RyYXdlcicsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBlbmFibGVTZWFyY2g6IHRydWUsXHJcbiAgc2VhcmNoV2lkZ2V0Q2xhc3M6IFNwZWVkU2VhcmNoV2lkZ2V0LFxyXG4gIGN1c3RvbWl6YXRpb25TZXQ6ICdsZWZ0X2RyYXdlcicsXHJcbiAgcGFnZVNpemU6IDEwMCxcclxuXHJcbiAgc2V0dGluZ3NWaWV3OiAnc2V0dGluZ3MnLFxyXG4gIGhlbHBWaWV3OiAnaGVscCcsXHJcbiAgY29uZmlndXJhdGlvblZpZXc6ICdjb25maWd1cmUnLFxyXG4gIGFkZEFjY291bnRDb250YWN0VmlldzogJ2FkZF9hY2NvdW50X2NvbnRhY3QnLFxyXG4gIHNlYXJjaFZpZXc6ICdzcGVlZHNlYXJjaF9saXN0JyxcclxuXHJcbiAgaW5pdFNvaG86IGZ1bmN0aW9uIGluaXRTb2hvKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMuYWNjb3JkaW9uLmVsZW1lbnQub24oJ3NlbGVjdGVkJywgKGV2dCwgaGVhZGVyKSA9PiB7XHJcbiAgICAgIC8vIEZpeCB1cCB0aGUgZXZlbnQgdGFyZ2V0IHRvIHRoZSBlbGVtZW50IHdpdGggb3VyIGRhdGEtYWN0aW9uIGF0dHJpYnV0ZS5cclxuICAgICAgZXZ0LnRhcmdldCA9ICQoJ2EnLCBoZWFkZXIpLmdldCgwKTtcclxuICAgICAgdGhpcy5faW5pdGlhdGVBY3Rpb25Gcm9tRXZlbnQoZXZ0KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2hvdWxkQ2xvc2VBcHBNZW51T25BY3Rpb246IGZ1bmN0aW9uIHNob3VsZENsb3NlQXBwTWVudSgpIHtcclxuICAgIGNvbnN0IG1lbnUgPSBBcHAuYXBwbGljYXRpb25tZW51O1xyXG4gICAgcmV0dXJuICFtZW51LmlzTGFyZ2VyVGhhbkJyZWFrcG9pbnQoKTtcclxuICB9LFxyXG4gIGNsb3NlQXBwTWVudTogZnVuY3Rpb24gY2xvc2VBcHBNZW51KCkge1xyXG4gICAgY29uc3QgbWVudSA9IEFwcC5hcHBsaWNhdGlvbm1lbnU7XHJcblxyXG4gICAgaWYgKG1lbnUgJiYgdGhpcy5zaG91bGRDbG9zZUFwcE1lbnVPbkFjdGlvbigpKSB7XHJcbiAgICAgIG1lbnUuY2xvc2VNZW51KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBsb2dPdXQ6IGZ1bmN0aW9uIGxvZ091dCgpIHtcclxuICAgIGNvbnN0IHN1cmUgPSB3aW5kb3cuY29uZmlybSh0aGlzLmxvZ091dENvbmZpcm1UZXh0KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgaWYgKHN1cmUpIHtcclxuICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgIEFwcC5oaWRlQXBwbGljYXRpb25NZW51KCk7XHJcbiAgICAgIEFwcC5iYXJzLnRiYXIuaGlkZSgpO1xyXG4gICAgICBBcHAubG9nT3V0KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBsb2FkQW5kTmF2aWdhdGVUb1ZpZXc6IGZ1bmN0aW9uIGxvYWRBbmROYXZpZ2F0ZVRvVmlldyhwYXJhbXMpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldyhwYXJhbXMgJiYgcGFyYW1zLnZpZXcpO1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvVmlldyh2aWV3KTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9WaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvVmlldyh2aWV3KSB7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coKTtcclxuICAgICAgdGhpcy5jbG9zZUFwcE1lbnUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFkZEFjY291bnRDb250YWN0OiBmdW5jdGlvbiBhZGRBY2NvdW50Q29udGFjdCgpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldygnYWRkX2FjY291bnRfY29udGFjdCcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNsb3NlQXBwTWVudSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0NvbmZpZ3VyYXRpb25WaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvQ29uZmlndXJhdGlvblZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5jb25maWd1cmF0aW9uVmlldyk7XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9WaWV3KHZpZXcpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb1NldHRpbmdzVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb1NldHRpbmdzVmlldygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLnNldHRpbmdzVmlldyk7XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9WaWV3KHZpZXcpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0hlbHBWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvSGVscFZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5oZWxwVmlldyk7XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9WaWV3KHZpZXcpO1xyXG4gIH0sXHJcbiAgaGFzTW9yZURhdGE6IGZ1bmN0aW9uIGhhc01vcmVEYXRhKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGb3JFbnRyeTogZnVuY3Rpb24gZ2V0R3JvdXBGb3JFbnRyeShlbnRyeSkge1xyXG4gICAgY29uc3QgZm9vdGVySXRlbXMgPSBbXHJcbiAgICAgICdDb25maWd1cmVNZW51JyxcclxuICAgICAgJ1NldHRpbmdzQWN0aW9uJyxcclxuICAgICAgJ0hlbHBBY3Rpb24nLFxyXG4gICAgICAnTG9nb3V0JyxcclxuICAgICAgJ0Nvbm5lY3Rpb25JbmRpY2F0b3InLFxyXG4gICAgXTtcclxuXHJcbiAgICBpZiAoZW50cnkudmlldykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhZzogJ3ZpZXcnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnZpZXdzVGV4dCxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm9vdGVySXRlbXMuaW5kZXhPZihlbnRyeS5uYW1lKSA+PSAwKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAnZm9vdGVyJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5mb290ZXJUZXh0LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRhZzogJ2FjdGlvbicsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGlvbnNUZXh0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jb25uZWN0KEFwcCwgJ29uUmVnaXN0ZXJlZCcsIHRoaXMuX29uUmVnaXN0ZXJlZCk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIGlmICh0aGlzLmxheW91dCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGF5b3V0ID0gW107XHJcblxyXG4gICAgY29uc3QgcXVpY2tBY3Rpb25zID0ge1xyXG4gICAgICBpZDogJ2FjdGlvbnMnLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQWRkQWNjb3VudENvbnRhY3RBY3Rpb24nLFxyXG4gICAgICAgIGFjdGlvbjogJ2FkZEFjY291bnRDb250YWN0JyxcclxuICAgICAgICB0aXRsZTogdGhpcy5hZGRBY2NvdW50Q29udGFjdFRleHQsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9BY2NvdW50L0FkZCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBsYXlvdXQucHVzaChxdWlja0FjdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IGdvVG8gPSB7XHJcbiAgICAgIGlkOiAndmlld3MnLFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZ3VyZWQgPSBsYW5nLmdldE9iamVjdCgncHJlZmVyZW5jZXMuaG9tZS52aXNpYmxlJywgZmFsc2UsIHdpbmRvdy5BcHApO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGNvbmZpZ3VyZWQgJiYgaSA8IGNvbmZpZ3VyZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbmZpZ3VyZWRbaV0pO1xyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIGdvVG8uY2hpbGRyZW4ucHVzaCh7XHJcbiAgICAgICAgICBhY3Rpb246ICdsb2FkQW5kTmF2aWdhdGVUb1ZpZXcnLFxyXG4gICAgICAgICAgdmlldzogdmlldy5pZCxcclxuICAgICAgICAgIHRpdGxlOiB2aWV3LnRpdGxlVGV4dCxcclxuICAgICAgICAgIHNlY3VyaXR5OiB2aWV3LmdldFNlY3VyaXR5KCksXHJcbiAgICAgICAgICBlbmFibGVPZmZsaW5lU3VwcG9ydDogdmlldy5lbmFibGVPZmZsaW5lU3VwcG9ydCxcclxuICAgICAgICAgIGVuYWJsZU9ubGluZVN1cHBvcnQ6IHZpZXcuZW5hYmxlT25saW5lU3VwcG9ydCxcclxuICAgICAgICAgIGRpc2FibGVkOiB2aWV3LmlzRGlzYWJsZWQoKSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxheW91dC5wdXNoKGdvVG8pO1xyXG5cclxuICAgIGNvbnN0IGZvb3RlciA9IHtcclxuICAgICAgaWQ6ICdmb290ZXInLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQ29uZmlndXJlTWVudScsXHJcbiAgICAgICAgYWN0aW9uOiAnbmF2aWdhdGVUb0NvbmZpZ3VyYXRpb25WaWV3JyxcclxuICAgICAgICB0aXRsZTogdGhpcy5jb25maWd1cmVUZXh0LFxyXG4gICAgICAgIGVuYWJsZU9mZmxpbmVTdXBwb3J0OiBmYWxzZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTZXR0aW5nc0FjdGlvbicsXHJcbiAgICAgICAgYWN0aW9uOiAnbmF2aWdhdGVUb1NldHRpbmdzVmlldycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuc2V0dGluZ3NUZXh0LFxyXG4gICAgICAgIGVuYWJsZU9mZmxpbmVTdXBwb3J0OiB0cnVlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0hlbHBBY3Rpb24nLFxyXG4gICAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9IZWxwVmlldycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuaGVscFRleHQsXHJcbiAgICAgICAgZW5hYmxlT2ZmbGluZVN1cHBvcnQ6IHRydWUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTG9nb3V0JyxcclxuICAgICAgICBhY3Rpb246ICdsb2dPdXQnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmxvZ091dFRleHQsXHJcbiAgICAgICAgZW5hYmxlT2ZmbGluZVN1cHBvcnQ6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0Nvbm5lY3Rpb25JbmRpY2F0b3InLFxyXG4gICAgICAgIHRpdGxlOiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmNvbm5lY3Rpb25UZXh0LCB7IGNvbm5lY3Rpb25TdGF0dXM6IEFwcC5vbkxpbmUgPyB0aGlzLm9ubGluZVRleHQgOiB0aGlzLm9mZmxpbmVUZXh0IH0pLFxyXG4gICAgICAgIGVuYWJsZU9mZmxpbmVTdXBwb3J0OiB0cnVlLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgbGF5b3V0LnB1c2goZm9vdGVyKTtcclxuXHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbiAgY3JlYXRlU3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xyXG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5fY3JlYXRlQ3VzdG9taXplZExheW91dCh0aGlzLmNyZWF0ZUxheW91dCgpKTtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICBsZXQgc2VjdGlvbjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheW91dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBzZWN0aW9uID0gbGF5b3V0W2ldLmNoaWxkcmVuO1xyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWN0aW9uLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgdG90YWwgPSB0b3RhbCArIDE7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gc2VjdGlvbltqXTtcclxuICAgICAgICByb3cuJGtleSA9IHRvdGFsO1xyXG5cclxuICAgICAgICBpZiAocm93LmRpc2FibGVkKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvdy5zZWN1cml0eSAmJiAhQXBwLmhhc0FjY2Vzc1RvKHJvdy5zZWN1cml0eSkpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFBcHAuaXNPbmxpbmUoKSAmJiAhcm93LmVuYWJsZU9mZmxpbmVTdXBwb3J0KSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChBcHAuaXNPbmxpbmUoKSAmJiByb3cuZW5hYmxlT25saW5lU3VwcG9ydCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnF1ZXJ5ICE9PSAnZnVuY3Rpb24nIHx8IHRoaXMucXVlcnkocm93KSkge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgTWVtb3J5KHtcclxuICAgICAgZGF0YTogbGlzdCxcclxuICAgIH0pO1xyXG4gICAgc3RvcmUuaWRQcm9wZXJ0eSA9ICcka2V5JztcclxuICAgIHJldHVybiBzdG9yZTtcclxuICB9LFxyXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAkKCcjYXBwbGljYXRpb24tbWVudScpLmRhdGEoJ2FwcGxpY2F0aW9ubWVudScpLmRlc3Ryb3koKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlIHRoZSBMaXN0IHJlZnJlc2ggdG8gYWxzbyBjbGVhciB0aGUgdmlldyAoc29tZXRoaW5nIHRoZSBiZWZvcmVUcmFuc2l0aW9uVG8gaGFuZGxlcywgYnV0IHdlIGFyZSBub3QgdXNpbmcpXHJcbiAgICovXHJcbiAgcmVmcmVzaDogZnVuY3Rpb24gcmVmcmVzaCgpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVxdWVzdERhdGEoKTtcclxuICAgIGlmICh0aGlzLnNlYXJjaFdpZGdldCkge1xyXG4gICAgICBpZiAoQXBwLm9uTGluZSkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoV2lkZ2V0LmVuYWJsZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoV2lkZ2V0LmRpc2FibGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMubGF5b3V0ID0gbnVsbDtcclxuICAgIHRoaXMuc3RvcmUgPSBudWxsO1xyXG4gIH0sXHJcbiAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcclxuICAgIGlmICh0aGlzLm9uU2hvdyh0aGlzKSA9PT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH0sXHJcbiAgcmVmcmVzaFJlcXVpcmVkRm9yOiBmdW5jdGlvbiByZWZyZXNoUmVxdWlyZWRGb3IoKSB7XHJcbiAgICBjb25zdCB2aXNpYmxlID0gbGFuZy5nZXRPYmplY3QoJ3ByZWZlcmVuY2VzLmhvbWUudmlzaWJsZScsIGZhbHNlLCBBcHApIHx8IFtdO1xyXG4gICAgY29uc3Qgc2hvd24gPSB0aGlzLmZlZWQgJiYgdGhpcy5mZWVkLiRyZXNvdXJjZXM7XHJcblxyXG4gICAgaWYgKCF2aXNpYmxlIHx8ICFzaG93biB8fCAodmlzaWJsZS5sZW5ndGggIT09IHNob3duLmxlbmd0aCkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aXNpYmxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh2aXNpYmxlW2ldICE9PSBzaG93bltpXS4ka2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF9vblJlZ2lzdGVyZWQ6IGZ1bmN0aW9uIF9vblJlZ2lzdGVyZWQoKSB7XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgfSxcclxuICBfb25TZWFyY2hFeHByZXNzaW9uOiBmdW5jdGlvbiBfb25TZWFyY2hFeHByZXNzaW9uKGV4cHJlc3Npb24pIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLnNlYXJjaFZpZXcpO1xyXG4gICAgY29uc3QgY3VycmVudCA9IEFwcC5nZXRQcmltYXJ5QWN0aXZlVmlldygpO1xyXG5cclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIC8vIElmIHRoZSBzcGVlZHNlYXJjaCBsaXN0IGlzIG5vdCBvdXIgY3VycmVudCB2aWV3LCBzaG93IGl0IGZpcnN0XHJcbiAgICAgIGlmICh2aWV3LmlkICE9PSBjdXJyZW50LmlkKSB7XHJcbiAgICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICAgIHF1ZXJ5OiBleHByZXNzaW9uLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXQgdGhlIHNlYXJjaCB0ZXJtIG9uIHRoZSBsaXN0IGFuZCBjYWxsIHNlYXJjaC5cclxuICAgICAgLy8gVGhpcyB3aWxsIGtlZXAgdGhlIHNlYXJjaCB0ZXJtcyBvbiBlYWNoIHdpZGdldCBpbiBzeW5jLlxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB2aWV3LnNldFNlYXJjaFRlcm0oZXhwcmVzc2lvbik7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudC5pZCA9PT0gdmlldy5pZCkge1xyXG4gICAgICAgICAgdmlldy5zZWFyY2goKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwKTtcclxuICAgICAgdGhpcy5jbG9zZUFwcE1lbnUoKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==