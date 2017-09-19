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
import connect from 'dojo/_base/connect';
import List from 'argos/List';
import getResource from 'argos/I18n';

const resource = getResource('settings');

/**
 * @class crm.Views.Settings
 *
 *
 * @extends argos.List
 *
 */
const __class = declare('crm.Views.Settings', [List], {
  // Templates
  itemIconTemplate: new Simplate([
    `<button type="button" data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %} class="btn-actions list-item-selector button visible">
      <span class="audible">{%: $$.actionsText %}</span>
      <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
        <use xlink:href="#icon-{%= $$.getItemIconClass($) %}"></use>
      </svg>
    </button>`,
  ]),
  itemTemplate: new Simplate([
    '<h4 data-action="{%= $.action %}" class="list-item-content ',
    '{% if ($.icon) { %}',
    'list-item-content',
    '{% } %} ">',
    '{%: $.title %}</h4>',
  ]),
  liRowTemplate: new Simplate([
    '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
    '{%! $$.itemIconTemplate %}',
    '{%! $$.itemTemplate %}',
    '</li>',
  ]),
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
  actionOrder: [
    'clearAuthentication',
    'clearLocalStorage',
    'viewErrorLogs',
    'viewOfflineOptions',
    'use24HourClock',
    'viewLanguageOptions',
  ],
  createActionsList: function createActionsList() {
    this.actionItems = {
      clearLocalStorage: {
        title: this.clearLocalStorageTitleText,
        cls: 'technology',
      },
      clearAuthentication: {
        title: this.clearAuthenticationTitleText,
        cls: 'unlocked',
      },
      viewErrorLogs: {
        title: this.errorLogTitleText,
        cls: 'bullet-list',
      },
      viewOfflineOptions: {
        title: this.offlineOptionsText,
        cls: 'bullet-list',
      },
      use24HourClock: {
        title: (App.is24HourClock()) ? this.use24HourClockText : this.use12HourClockText,
        cls: 'user',
      },
      viewLanguageOptions: {
        title: this.languageSettingText,
        cls: 'url',
      },
    };
  },
  getItemIconClass: function getItemIconClass(entry) {
    return entry.cls;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return this.itemIndicators || (this.itemIndicators = []);
  },
  viewErrorLogs: function viewErrorLogs() {
    const view = App.getView('errorlog_list');
    if (view) {
      view.show();
    }
  },
  clearLocalStorage: function clearLocalStorage() {
    if (confirm(this.confirmClearLocalStorageMessage)) { // eslint-disable-line
      if (window.localStorage) {
        window.localStorage.clear();
      }

      connect.publish('/app/refresh', [{
        resourceKind: 'localStorage',
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
    const view = App.getView('offline_options_edit');
    if (view) {
      view.show();
    }
  },
  viewLanguageOptions: function viewLanguageOptions() {
    const view = App.getView('language_options_edit');
    if (view) {
      view.show();
    }
  },
  use24HourClock: function use24HourClock() {
    const message = App.is24HourClock() ? this.confirm12HourClockMessage : this.confirm24HourClockMessage;
    if (confirm(message)) { // eslint-disable-line
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
    const list = [];

    for (let i = 0; i < this.actionOrder.length; i++) {
      const action = this.actionItems[this.actionOrder[i]];
      if (action) {
        list.push({
          action: this.actionOrder[i],
          title: action.title,
          icon: action.icon,
          cls: action.cls,
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
      tbar: [],
    });
  },
});

export default __class;
