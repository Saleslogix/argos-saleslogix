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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import Memory from 'dojo/store/Memory';
import SpeedSearchWidget from '../SpeedSearchWidget';
import string from 'dojo/string';
import GroupedList from 'argos/GroupedList';
import getResource from 'argos/I18n';


const resource = getResource('leftDrawer');

/**
 * @class crm.Views.LeftDrawer
 * @extends argos.GroupedList
 */
const __class = declare('crm.Views.LeftDrawer', [GroupedList], /** @lends crm.Views.LeftDrawer# */{
  // Templates
  cls: ' contextualContent',
  enablePullToRefresh: false,
  rowTemplate: new Simplate([
    '<div class="accordion-header" role="presentation">',
    '<a href="#" data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}><span>{%: $.title %}</span></a>',
    '</div>',
  ]),

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
  searchWidgetClass: SpeedSearchWidget,
  customizationSet: 'left_drawer',
  pageSize: 100,

  settingsView: 'settings',
  helpView: 'help',
  configurationView: 'configure',
  addAccountContactView: 'add_account_contact',
  searchView: 'speedsearch_list',

  initSoho: function initSoho() {
    this.inherited(initSoho, arguments);
    this.accordion.element.on('selected', (evt, header) => {
      // Fix up the event target to the element with our data-action attribute.
      evt.target = $('a', header).get(0);
      this._initiateActionFromEvent(evt);
    });
  },
  shouldCloseAppMenuOnAction: function shouldCloseAppMenu() {
    const menu = App.applicationmenu;
    return !menu.isLargerThanBreakpoint();
  },
  closeAppMenu: function closeAppMenu() {
    const menu = App.applicationmenu;

    if (menu && this.shouldCloseAppMenuOnAction()) {
      menu.closeMenu();
    }
  },
  logOut: function logOut() {
    const sure = window.confirm(this.logOutConfirmText); // eslint-disable-line
    if (sure) {
      this.destroy();
      App.hideApplicationMenu();
      App.bars.tbar.hide();
      App.logOut();
    }
  },
  loadAndNavigateToView: function loadAndNavigateToView(params) {
    const view = App.getView(params && params.view);
    this.navigateToView(view);
  },
  navigateToView: function navigateToView(view) {
    if (view) {
      view.show();
      this.closeAppMenu();
    }
  },
  addAccountContact: function addAccountContact() {
    const view = App.getView('add_account_contact');
    if (view) {
      view.show({
        insert: true,
      });
      this.closeAppMenu();
    }
  },
  navigateToConfigurationView: function navigateToConfigurationView() {
    const view = App.getView(this.configurationView);
    this.navigateToView(view);
  },
  navigateToSettingsView: function navigateToSettingsView() {
    const view = App.getView(this.settingsView);
    this.navigateToView(view);
  },
  navigateToHelpView: function navigateToHelpView() {
    const view = App.getView(this.helpView);
    this.navigateToView(view);
  },
  hasMoreData: function hasMoreData() {
    return false;
  },
  getGroupForEntry: function getGroupForEntry(entry) {
    const footerItems = [
      'ConfigureMenu',
      'SettingsAction',
      'HelpAction',
      'Logout',
      'ConnectionIndicator',
    ];

    if (entry.view) {
      return {
        tag: 'view',
        title: this.viewsText,
      };
    }

    if (footerItems.indexOf(entry.name) >= 0) {
      return {
        tag: 'footer',
        title: this.footerText,
      };
    }

    return {
      tag: 'action',
      title: this.actionsText,
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

    const layout = [];

    const quickActions = {
      id: 'actions',
      children: [{
        name: 'AddAccountContactAction',
        action: 'addAccountContact',
        title: this.addAccountContactText,
        security: 'Entities/Account/Add',
      }],
    };

    layout.push(quickActions);

    const goTo = {
      id: 'views',
      children: [],
    };

    const configured = lang.getObject('preferences.home.visible', false, window.App);
    for (let i = 0; configured && i < configured.length; i++) {
      const view = App.getView(configured[i]);
      if (view) {
        goTo.children.push({
          action: 'loadAndNavigateToView',
          view: view.id,
          title: view.titleText,
          security: view.getSecurity(),
          enableOfflineSupport: view.enableOfflineSupport,
          enableOnlineSupport: view.enableOnlineSupport,
          disabled: view.isDisabled(),
        });
      }
    }

    layout.push(goTo);

    const footer = {
      id: 'footer',
      children: [{
        name: 'ConfigureMenu',
        action: 'navigateToConfigurationView',
        title: this.configureText,
        enableOfflineSupport: false,
      }, {
        name: 'SettingsAction',
        action: 'navigateToSettingsView',
        title: this.settingsText,
        enableOfflineSupport: true,
      }, {
        name: 'HelpAction',
        action: 'navigateToHelpView',
        title: this.helpText,
        enableOfflineSupport: true,
      }, {
        name: 'Logout',
        action: 'logOut',
        title: this.logOutText,
        enableOfflineSupport: false,
      }, {
        name: 'ConnectionIndicator',
        title: string.substitute(this.connectionText, { connectionStatus: App.onLine ? this.onlineText : this.offlineText }),
        enableOfflineSupport: true,
      }],
    };

    layout.push(footer);

    return layout;
  },
  createStore: function createStore() {
    const layout = this._createCustomizedLayout(this.createLayout());
    const list = [];
    let total = 0;
    let section;

    for (let i = 0; i < layout.length; i++) {
      section = layout[i].children;

      for (let j = 0; j < section.length; j++) {
        total = total + 1;
        const row = section[j];
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

    const store = new Memory({
      data: list,
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
    const visible = lang.getObject('preferences.home.visible', false, App) || [];
    const shown = this.feed && this.feed.$resources;

    if (!visible || !shown || (visible.length !== shown.length)) {
      return true;
    }

    for (let i = 0; i < visible.length; i++) {
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
    const view = App.getView(this.searchView);
    const current = App.getPrimaryActiveView();

    if (view) {
      // If the speedsearch list is not our current view, show it first
      if (view.id !== current.id) {
        view.show({
          query: expression,
        });
      }

      // Set the search term on the list and call search.
      // This will keep the search terms on each widget in sync.
      setTimeout(() => {
        view.setSearchTerm(expression);
        if (current && current.id === view.id) {
          view.search();
        }
      }, 10);
      this.closeAppMenu();
    }
  },
});

export default __class;
