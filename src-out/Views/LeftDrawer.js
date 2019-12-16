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