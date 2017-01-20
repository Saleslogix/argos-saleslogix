import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import connect from 'dojo/_base/connect';
import _CardLayoutListMixin from './_CardLayoutListMixin';
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
const __class = declare('crm.Views.Settings', [List, _CardLayoutListMixin], {
  // Templates
  itemIconTemplate: new Simplate([
    '<button data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %} class="list-item-selector button visible">',
    '{% if ($$.getItemIconClass($)) { %}',
    '<span class="{%= $$.getItemIconClass($) %}"></span>',
    '{% } else { %}',
    '<img id="list-item-image_{%: $.$key %}" src="{%: $$.getItemIconSource($) %}" alt="{%: $$.getItemIconAlt($) %}" class="icon" />',
    '{% } %}',
    '</button>',
  ]),

  itemTemplate: new Simplate([
    '<h3 data-action="{%= $.action %}">{%: $.title %}</h3>',
  ]),

  itemRowContainerTemplate: new Simplate([
    '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
    '{%! $$.itemRowContentTemplate %}',
    '</li>',
  ]),

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

  // View Properties
  id: 'settings',
  expose: false,
  enableSearch: false,
  enablePullToRefresh: false,
  selectionOnly: true,
  allowSelection: false,
  actions: null,
  actionOrder: [
    'clearAuthentication',
    'clearLocalStorage',
    'viewErrorLogs',
    'viewOfflineOptions',
    'use24HourClock',
  ],
  createActions: function createActions() {
    this.actions = {
      clearLocalStorage: {
        title: this.clearLocalStorageTitleText,
        cls: 'fa fa-database fa-2x',
      },
      clearAuthentication: {
        title: this.clearAuthenticationTitleText,
        cls: 'fa fa-unlock fa-2x',
      },
      viewErrorLogs: {
        title: this.errorLogTitleText,
        cls: 'fa fa-list-alt fa-2x',
      },
      viewOfflineOptions: {
        title: this.offlineOptionsText,
        cls: 'fa fa-list-alt fa-2x',
      },
      use24HourClock: {
        title: (App.is24HourClock()) ? this.use24HourClockText : this.use12HourClockText,
        cls: 'fa fa-user fa-2x',
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
      const action = this.actions[this.actionOrder[i]];
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
    this.createActions();
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
});

lang.setObject('Mobile.SalesLogix.Views.Settings', __class);
export default __class;
