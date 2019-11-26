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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9MZWZ0RHJhd2VyLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImNscyIsImVuYWJsZVB1bGxUb1JlZnJlc2giLCJyb3dUZW1wbGF0ZSIsIlNpbXBsYXRlIiwiY29uZmlndXJlVGV4dCIsImFkZEFjY291bnRDb250YWN0VGV4dCIsInRpdGxlVGV4dCIsImFjdGlvbnNUZXh0Iiwidmlld3NUZXh0IiwiZm9vdGVyVGV4dCIsInNldHRpbmdzVGV4dCIsImhlbHBUZXh0IiwibG9nT3V0VGV4dCIsImxvZ091dENvbmZpcm1UZXh0Iiwib25saW5lVGV4dCIsIm9mZmxpbmVUZXh0IiwiY29ubmVjdGlvblRleHQiLCJpZCIsImV4cG9zZSIsImVuYWJsZVNlYXJjaCIsInNlYXJjaFdpZGdldENsYXNzIiwiY3VzdG9taXphdGlvblNldCIsInBhZ2VTaXplIiwic2V0dGluZ3NWaWV3IiwiaGVscFZpZXciLCJjb25maWd1cmF0aW9uVmlldyIsImFkZEFjY291bnRDb250YWN0VmlldyIsInNlYXJjaFZpZXciLCJpbml0U29obyIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImFjY29yZGlvbiIsImVsZW1lbnQiLCJvbiIsImV2dCIsImhlYWRlciIsInRhcmdldCIsIiQiLCJnZXQiLCJfaW5pdGlhdGVBY3Rpb25Gcm9tRXZlbnQiLCJzaG91bGRDbG9zZUFwcE1lbnVPbkFjdGlvbiIsInNob3VsZENsb3NlQXBwTWVudSIsIm1lbnUiLCJBcHAiLCJhcHBsaWNhdGlvbm1lbnUiLCJpc0xhcmdlclRoYW5CcmVha3BvaW50IiwiY2xvc2VBcHBNZW51IiwiY2xvc2VNZW51IiwibG9nT3V0Iiwic3VyZSIsIndpbmRvdyIsImNvbmZpcm0iLCJkZXN0cm95IiwiaGlkZUFwcGxpY2F0aW9uTWVudSIsImJhcnMiLCJ0YmFyIiwiaGlkZSIsImxvYWRBbmROYXZpZ2F0ZVRvVmlldyIsInBhcmFtcyIsInZpZXciLCJnZXRWaWV3IiwibmF2aWdhdGVUb1ZpZXciLCJzaG93IiwiYWRkQWNjb3VudENvbnRhY3QiLCJpbnNlcnQiLCJuYXZpZ2F0ZVRvQ29uZmlndXJhdGlvblZpZXciLCJuYXZpZ2F0ZVRvU2V0dGluZ3NWaWV3IiwibmF2aWdhdGVUb0hlbHBWaWV3IiwiaGFzTW9yZURhdGEiLCJnZXRHcm91cEZvckVudHJ5IiwiZW50cnkiLCJmb290ZXJJdGVtcyIsInRhZyIsInRpdGxlIiwiaW5kZXhPZiIsIm5hbWUiLCJpbml0IiwiY29ubmVjdCIsIl9vblJlZ2lzdGVyZWQiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJxdWlja0FjdGlvbnMiLCJjaGlsZHJlbiIsImFjdGlvbiIsInNlY3VyaXR5IiwicHVzaCIsImdvVG8iLCJjb25maWd1cmVkIiwiZ2V0T2JqZWN0IiwiaSIsImxlbmd0aCIsImdldFNlY3VyaXR5IiwiZW5hYmxlT2ZmbGluZVN1cHBvcnQiLCJlbmFibGVPbmxpbmVTdXBwb3J0IiwiZGlzYWJsZWQiLCJpc0Rpc2FibGVkIiwiZm9vdGVyIiwic3Vic3RpdHV0ZSIsImNvbm5lY3Rpb25TdGF0dXMiLCJvbkxpbmUiLCJjcmVhdGVTdG9yZSIsIl9jcmVhdGVDdXN0b21pemVkTGF5b3V0IiwibGlzdCIsInRvdGFsIiwic2VjdGlvbiIsImoiLCJyb3ciLCIka2V5IiwiaGFzQWNjZXNzVG8iLCJpc09ubGluZSIsInF1ZXJ5Iiwic3RvcmUiLCJkYXRhIiwiaWRQcm9wZXJ0eSIsImNsZWFyIiwicmVmcmVzaCIsInJlcXVlc3REYXRhIiwic2VhcmNoV2lkZ2V0IiwiZW5hYmxlIiwiZGlzYWJsZSIsIm9uU2hvdyIsInJlZnJlc2hSZXF1aXJlZEZvciIsInZpc2libGUiLCJzaG93biIsImZlZWQiLCIkcmVzb3VyY2VzIiwicmVmcmVzaFJlcXVpcmVkIiwiX29uU2VhcmNoRXhwcmVzc2lvbiIsImV4cHJlc3Npb24iLCJjdXJyZW50IiwiZ2V0UHJpbWFyeUFjdGl2ZVZpZXciLCJzZXRUaW1lb3V0Iiwic2V0U2VhcmNoVGVybSIsInNlYXJjaCJdLCJtYXBw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LCJmaWxlIjoiTGVmdERyYXdlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBNZW1vcnkgZnJvbSAnZG9qby9zdG9yZS9NZW1vcnknO1xyXG5pbXBvcnQgU3BlZWRTZWFyY2hXaWRnZXQgZnJvbSAnLi4vU3BlZWRTZWFyY2hXaWRnZXQnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IEdyb3VwZWRMaXN0IGZyb20gJ2FyZ29zL0dyb3VwZWRMaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2xlZnREcmF3ZXInKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkxlZnREcmF3ZXJcclxuICogQGV4dGVuZHMgYXJnb3MuR3JvdXBlZExpc3RcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuTGVmdERyYXdlcicsIFtHcm91cGVkTGlzdF0sIC8qKiBAbGVuZHMgY3JtLlZpZXdzLkxlZnREcmF3ZXIjICove1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGNsczogJyBjb250ZXh0dWFsQ29udGVudCcsXHJcbiAgZW5hYmxlUHVsbFRvUmVmcmVzaDogZmFsc2UsXHJcbiAgcm93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImFjY29yZGlvbi1oZWFkZXJcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+JyxcclxuICAgICc8YSBocmVmPVwiI1wiIGRhdGEtYWN0aW9uPVwieyU9ICQuYWN0aW9uICV9XCIgeyUgaWYgKCQudmlldykgeyAlfWRhdGEtdmlldz1cInslPSAkLnZpZXcgJX1cInslIH0gJX0+PHNwYW4+eyU6ICQudGl0bGUgJX08L3NwYW4+PC9hPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgY29uZmlndXJlVGV4dDogcmVzb3VyY2UuY29uZmlndXJlVGV4dCxcclxuICBhZGRBY2NvdW50Q29udGFjdFRleHQ6IHJlc291cmNlLmFkZEFjY291bnRDb250YWN0VGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBhY3Rpb25zVGV4dDogcmVzb3VyY2UuYWN0aW9uc1RleHQsXHJcbiAgdmlld3NUZXh0OiByZXNvdXJjZS52aWV3c1RleHQsXHJcbiAgZm9vdGVyVGV4dDogcmVzb3VyY2UuZm9vdGVyVGV4dCxcclxuICBzZXR0aW5nc1RleHQ6IHJlc291cmNlLnNldHRpbmdzVGV4dCxcclxuICBoZWxwVGV4dDogcmVzb3VyY2UuaGVscFRleHQsXHJcbiAgbG9nT3V0VGV4dDogcmVzb3VyY2UubG9nT3V0VGV4dCxcclxuICBsb2dPdXRDb25maXJtVGV4dDogcmVzb3VyY2UubG9nT3V0Q29uZmlybVRleHQsXHJcbiAgb25saW5lVGV4dDogcmVzb3VyY2Uub25saW5lVGV4dCxcclxuICBvZmZsaW5lVGV4dDogcmVzb3VyY2Uub2ZmbGluZVRleHQsXHJcbiAgY29ubmVjdGlvblRleHQ6IHJlc291cmNlLmNvbm5lY3Rpb25UZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2xlZnRfZHJhd2VyJyxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGVuYWJsZVNlYXJjaDogdHJ1ZSxcclxuICBzZWFyY2hXaWRnZXRDbGFzczogU3BlZWRTZWFyY2hXaWRnZXQsXHJcbiAgY3VzdG9taXphdGlvblNldDogJ2xlZnRfZHJhd2VyJyxcclxuICBwYWdlU2l6ZTogMTAwLFxyXG5cclxuICBzZXR0aW5nc1ZpZXc6ICdzZXR0aW5ncycsXHJcbiAgaGVscFZpZXc6ICdoZWxwJyxcclxuICBjb25maWd1cmF0aW9uVmlldzogJ2NvbmZpZ3VyZScsXHJcbiAgYWRkQWNjb3VudENvbnRhY3RWaWV3OiAnYWRkX2FjY291bnRfY29udGFjdCcsXHJcbiAgc2VhcmNoVmlldzogJ3NwZWVkc2VhcmNoX2xpc3QnLFxyXG5cclxuICBpbml0U29obzogZnVuY3Rpb24gaW5pdFNvaG8oKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0U29obywgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuYWNjb3JkaW9uLmVsZW1lbnQub24oJ3NlbGVjdGVkJywgKGV2dCwgaGVhZGVyKSA9PiB7XHJcbiAgICAgIC8vIEZpeCB1cCB0aGUgZXZlbnQgdGFyZ2V0IHRvIHRoZSBlbGVtZW50IHdpdGggb3VyIGRhdGEtYWN0aW9uIGF0dHJpYnV0ZS5cclxuICAgICAgZXZ0LnRhcmdldCA9ICQoJ2EnLCBoZWFkZXIpLmdldCgwKTtcclxuICAgICAgdGhpcy5faW5pdGlhdGVBY3Rpb25Gcm9tRXZlbnQoZXZ0KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgc2hvdWxkQ2xvc2VBcHBNZW51T25BY3Rpb246IGZ1bmN0aW9uIHNob3VsZENsb3NlQXBwTWVudSgpIHtcclxuICAgIGNvbnN0IG1lbnUgPSBBcHAuYXBwbGljYXRpb25tZW51O1xyXG4gICAgcmV0dXJuICFtZW51LmlzTGFyZ2VyVGhhbkJyZWFrcG9pbnQoKTtcclxuICB9LFxyXG4gIGNsb3NlQXBwTWVudTogZnVuY3Rpb24gY2xvc2VBcHBNZW51KCkge1xyXG4gICAgY29uc3QgbWVudSA9IEFwcC5hcHBsaWNhdGlvbm1lbnU7XHJcblxyXG4gICAgaWYgKG1lbnUgJiYgdGhpcy5zaG91bGRDbG9zZUFwcE1lbnVPbkFjdGlvbigpKSB7XHJcbiAgICAgIG1lbnUuY2xvc2VNZW51KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBsb2dPdXQ6IGZ1bmN0aW9uIGxvZ091dCgpIHtcclxuICAgIGNvbnN0IHN1cmUgPSB3aW5kb3cuY29uZmlybSh0aGlzLmxvZ091dENvbmZpcm1UZXh0KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgaWYgKHN1cmUpIHtcclxuICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgIEFwcC5oaWRlQXBwbGljYXRpb25NZW51KCk7XHJcbiAgICAgIEFwcC5iYXJzLnRiYXIuaGlkZSgpO1xyXG4gICAgICBBcHAubG9nT3V0KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBsb2FkQW5kTmF2aWdhdGVUb1ZpZXc6IGZ1bmN0aW9uIGxvYWRBbmROYXZpZ2F0ZVRvVmlldyhwYXJhbXMpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldyhwYXJhbXMgJiYgcGFyYW1zLnZpZXcpO1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvVmlldyh2aWV3KTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9WaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvVmlldyh2aWV3KSB7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coKTtcclxuICAgICAgdGhpcy5jbG9zZUFwcE1lbnUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFkZEFjY291bnRDb250YWN0OiBmdW5jdGlvbiBhZGRBY2NvdW50Q29udGFjdCgpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldygnYWRkX2FjY291bnRfY29udGFjdCcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmNsb3NlQXBwTWVudSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0NvbmZpZ3VyYXRpb25WaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvQ29uZmlndXJhdGlvblZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5jb25maWd1cmF0aW9uVmlldyk7XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9WaWV3KHZpZXcpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb1NldHRpbmdzVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb1NldHRpbmdzVmlldygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLnNldHRpbmdzVmlldyk7XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9WaWV3KHZpZXcpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0hlbHBWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvSGVscFZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5oZWxwVmlldyk7XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9WaWV3KHZpZXcpO1xyXG4gIH0sXHJcbiAgaGFzTW9yZURhdGE6IGZ1bmN0aW9uIGhhc01vcmVEYXRhKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGb3JFbnRyeTogZnVuY3Rpb24gZ2V0R3JvdXBGb3JFbnRyeShlbnRyeSkge1xyXG4gICAgY29uc3QgZm9vdGVySXRlbXMgPSBbXHJcbiAgICAgICdDb25maWd1cmVNZW51JyxcclxuICAgICAgJ1NldHRpbmdzQWN0aW9uJyxcclxuICAgICAgJ0hlbHBBY3Rpb24nLFxyXG4gICAgICAnTG9nb3V0JyxcclxuICAgICAgJ0Nvbm5lY3Rpb25JbmRpY2F0b3InLFxyXG4gICAgXTtcclxuXHJcbiAgICBpZiAoZW50cnkudmlldykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhZzogJ3ZpZXcnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnZpZXdzVGV4dCxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm9vdGVySXRlbXMuaW5kZXhPZihlbnRyeS5uYW1lKSA+PSAwKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAnZm9vdGVyJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5mb290ZXJUZXh0LFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRhZzogJ2FjdGlvbicsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjdGlvbnNUZXh0LFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jb25uZWN0KEFwcCwgJ29uUmVnaXN0ZXJlZCcsIHRoaXMuX29uUmVnaXN0ZXJlZCk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIGlmICh0aGlzLmxheW91dCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5sYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGF5b3V0ID0gW107XHJcblxyXG4gICAgY29uc3QgcXVpY2tBY3Rpb25zID0ge1xyXG4gICAgICBpZDogJ2FjdGlvbnMnLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQWRkQWNjb3VudENvbnRhY3RBY3Rpb24nLFxyXG4gICAgICAgIGFjdGlvbjogJ2FkZEFjY291bnRDb250YWN0JyxcclxuICAgICAgICB0aXRsZTogdGhpcy5hZGRBY2NvdW50Q29udGFjdFRleHQsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9BY2NvdW50L0FkZCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBsYXlvdXQucHVzaChxdWlja0FjdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IGdvVG8gPSB7XHJcbiAgICAgIGlkOiAndmlld3MnLFxyXG4gICAgICBjaGlsZHJlbjogW10sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZ3VyZWQgPSBsYW5nLmdldE9iamVjdCgncHJlZmVyZW5jZXMuaG9tZS52aXNpYmxlJywgZmFsc2UsIHdpbmRvdy5BcHApO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGNvbmZpZ3VyZWQgJiYgaSA8IGNvbmZpZ3VyZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbmZpZ3VyZWRbaV0pO1xyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIGdvVG8uY2hpbGRyZW4ucHVzaCh7XHJcbiAgICAgICAgICBhY3Rpb246ICdsb2FkQW5kTmF2aWdhdGVUb1ZpZXcnLFxyXG4gICAgICAgICAgdmlldzogdmlldy5pZCxcclxuICAgICAgICAgIHRpdGxlOiB2aWV3LnRpdGxlVGV4dCxcclxuICAgICAgICAgIHNlY3VyaXR5OiB2aWV3LmdldFNlY3VyaXR5KCksXHJcbiAgICAgICAgICBlbmFibGVPZmZsaW5lU3VwcG9ydDogdmlldy5lbmFibGVPZmZsaW5lU3VwcG9ydCxcclxuICAgICAgICAgIGVuYWJsZU9ubGluZVN1cHBvcnQ6IHZpZXcuZW5hYmxlT25saW5lU3VwcG9ydCxcclxuICAgICAgICAgIGRpc2FibGVkOiB2aWV3LmlzRGlzYWJsZWQoKSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxheW91dC5wdXNoKGdvVG8pO1xyXG5cclxuICAgIGNvbnN0IGZvb3RlciA9IHtcclxuICAgICAgaWQ6ICdmb290ZXInLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQ29uZmlndXJlTWVudScsXHJcbiAgICAgICAgYWN0aW9uOiAnbmF2aWdhdGVUb0NvbmZpZ3VyYXRpb25WaWV3JyxcclxuICAgICAgICB0aXRsZTogdGhpcy5jb25maWd1cmVUZXh0LFxyXG4gICAgICAgIGVuYWJsZU9mZmxpbmVTdXBwb3J0OiBmYWxzZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTZXR0aW5nc0FjdGlvbicsXHJcbiAgICAgICAgYWN0aW9uOiAnbmF2aWdhdGVUb1NldHRpbmdzVmlldycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuc2V0dGluZ3NUZXh0LFxyXG4gICAgICAgIGVuYWJsZU9mZmxpbmVTdXBwb3J0OiB0cnVlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0hlbHBBY3Rpb24nLFxyXG4gICAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9IZWxwVmlldycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuaGVscFRleHQsXHJcbiAgICAgICAgZW5hYmxlT2ZmbGluZVN1cHBvcnQ6IHRydWUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTG9nb3V0JyxcclxuICAgICAgICBhY3Rpb246ICdsb2dPdXQnLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLmxvZ091dFRleHQsXHJcbiAgICAgICAgZW5hYmxlT2ZmbGluZVN1cHBvcnQ6IGZhbHNlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0Nvbm5lY3Rpb25JbmRpY2F0b3InLFxyXG4gICAgICAgIHRpdGxlOiBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmNvbm5lY3Rpb25UZXh0LCB7IGNvbm5lY3Rpb25TdGF0dXM6IEFwcC5vbkxpbmUgPyB0aGlzLm9ubGluZVRleHQgOiB0aGlzLm9mZmxpbmVUZXh0IH0pLFxyXG4gICAgICAgIGVuYWJsZU9mZmxpbmVTdXBwb3J0OiB0cnVlLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgbGF5b3V0LnB1c2goZm9vdGVyKTtcclxuXHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbiAgY3JlYXRlU3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xyXG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5fY3JlYXRlQ3VzdG9taXplZExheW91dCh0aGlzLmNyZWF0ZUxheW91dCgpKTtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgIGxldCB0b3RhbCA9IDA7XHJcbiAgICBsZXQgc2VjdGlvbjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheW91dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBzZWN0aW9uID0gbGF5b3V0W2ldLmNoaWxkcmVuO1xyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWN0aW9uLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgdG90YWwgPSB0b3RhbCArIDE7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gc2VjdGlvbltqXTtcclxuICAgICAgICByb3cuJGtleSA9IHRvdGFsO1xyXG5cclxuICAgICAgICBpZiAocm93LmRpc2FibGVkKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvdy5zZWN1cml0eSAmJiAhQXBwLmhhc0FjY2Vzc1RvKHJvdy5zZWN1cml0eSkpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFBcHAuaXNPbmxpbmUoKSAmJiAhcm93LmVuYWJsZU9mZmxpbmVTdXBwb3J0KSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChBcHAuaXNPbmxpbmUoKSAmJiByb3cuZW5hYmxlT25saW5lU3VwcG9ydCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnF1ZXJ5ICE9PSAnZnVuY3Rpb24nIHx8IHRoaXMucXVlcnkocm93KSkge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgTWVtb3J5KHtcclxuICAgICAgZGF0YTogbGlzdCxcclxuICAgIH0pO1xyXG4gICAgc3RvcmUuaWRQcm9wZXJ0eSA9ICcka2V5JztcclxuICAgIHJldHVybiBzdG9yZTtcclxuICB9LFxyXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAkKCcjYXBwbGljYXRpb24tbWVudScpLmRhdGEoJ2FwcGxpY2F0aW9ubWVudScpLmRlc3Ryb3koKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlIHRoZSBMaXN0IHJlZnJlc2ggdG8gYWxzbyBjbGVhciB0aGUgdmlldyAoc29tZXRoaW5nIHRoZSBiZWZvcmVUcmFuc2l0aW9uVG8gaGFuZGxlcywgYnV0IHdlIGFyZSBub3QgdXNpbmcpXHJcbiAgICovXHJcbiAgcmVmcmVzaDogZnVuY3Rpb24gcmVmcmVzaCgpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVxdWVzdERhdGEoKTtcclxuICAgIGlmICh0aGlzLnNlYXJjaFdpZGdldCkge1xyXG4gICAgICBpZiAoQXBwLm9uTGluZSkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoV2lkZ2V0LmVuYWJsZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoV2lkZ2V0LmRpc2FibGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoY2xlYXIsIGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmxheW91dCA9IG51bGw7XHJcbiAgICB0aGlzLnN0b3JlID0gbnVsbDtcclxuICB9LFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy5vblNob3codGhpcykgPT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9LFxyXG4gIHJlZnJlc2hSZXF1aXJlZEZvcjogZnVuY3Rpb24gcmVmcmVzaFJlcXVpcmVkRm9yKCkge1xyXG4gICAgY29uc3QgdmlzaWJsZSA9IGxhbmcuZ2V0T2JqZWN0KCdwcmVmZXJlbmNlcy5ob21lLnZpc2libGUnLCBmYWxzZSwgQXBwKSB8fCBbXTtcclxuICAgIGNvbnN0IHNob3duID0gdGhpcy5mZWVkICYmIHRoaXMuZmVlZC4kcmVzb3VyY2VzO1xyXG5cclxuICAgIGlmICghdmlzaWJsZSB8fCAhc2hvd24gfHwgKHZpc2libGUubGVuZ3RoICE9PSBzaG93bi5sZW5ndGgpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlzaWJsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodmlzaWJsZVtpXSAhPT0gc2hvd25baV0uJGtleSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaW5oZXJpdGVkKHJlZnJlc2hSZXF1aXJlZEZvciwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIF9vblJlZ2lzdGVyZWQ6IGZ1bmN0aW9uIF9vblJlZ2lzdGVyZWQoKSB7XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgfSxcclxuICBfb25TZWFyY2hFeHByZXNzaW9uOiBmdW5jdGlvbiBfb25TZWFyY2hFeHByZXNzaW9uKGV4cHJlc3Npb24pIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLnNlYXJjaFZpZXcpO1xyXG4gICAgY29uc3QgY3VycmVudCA9IEFwcC5nZXRQcmltYXJ5QWN0aXZlVmlldygpO1xyXG5cclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIC8vIElmIHRoZSBzcGVlZHNlYXJjaCBsaXN0IGlzIG5vdCBvdXIgY3VycmVudCB2aWV3LCBzaG93IGl0IGZpcnN0XHJcbiAgICAgIGlmICh2aWV3LmlkICE9PSBjdXJyZW50LmlkKSB7XHJcbiAgICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICAgIHF1ZXJ5OiBleHByZXNzaW9uLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXQgdGhlIHNlYXJjaCB0ZXJtIG9uIHRoZSBsaXN0IGFuZCBjYWxsIHNlYXJjaC5cclxuICAgICAgLy8gVGhpcyB3aWxsIGtlZXAgdGhlIHNlYXJjaCB0ZXJtcyBvbiBlYWNoIHdpZGdldCBpbiBzeW5jLlxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB2aWV3LnNldFNlYXJjaFRlcm0oZXhwcmVzc2lvbik7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudC5pZCA9PT0gdmlldy5pZCkge1xyXG4gICAgICAgICAgdmlldy5zZWFyY2goKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEwKTtcclxuICAgICAgdGhpcy5jbG9zZUFwcE1lbnUoKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==