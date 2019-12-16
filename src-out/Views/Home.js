define('crm/Views/Home', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', '../SpeedSearchWidget', 'argos/GroupedList', 'argos/I18n'], function (module, exports, _declare, _lang, _SpeedSearchWidget, _GroupedList, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _SpeedSearchWidget2 = _interopRequireDefault(_SpeedSearchWidget);

  var _GroupedList2 = _interopRequireDefault(_GroupedList);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('home');

  /**
   * @deprecated
   * @class crm.Views.Home
   *
   *
   * @extends argos.GroupedList
   *
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

  /*eslint-disable*/
  var __class = (0, _declare2.default)('crm.Views.Home', [_GroupedList2.default], {
    //Templates
    rowTemplate: new Simplate(['<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>', '<div class="list-item-static-selector">', '{% if ($.icon) { %}', '<img src="{%: $.icon %}" alt="icon" class="icon" />', '{% } %}', '</div>', '<div class="list-item-content">{%! $$.itemTemplate %}</div>', '</li>']),
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.title %}</p>']),

    //Localization
    configureText: resource.configureText,
    addAccountContactText: resource.addAccountContactText,
    titleText: resource.titleText,
    actionsText: resource.actionsText,
    viewsText: resource.viewsText,

    //View Properties
    id: 'home',
    expose: false,
    enableSearch: true,
    searchWidgetClass: _SpeedSearchWidget2.default,
    customizationSet: 'home',
    configurationView: 'configure',
    addAccountContactView: 'add_account_contact',
    searchView: 'speedsearch_list',

    navigateToView: function navigateToView(params) {
      var view = App.getView(params && params.view);
      if (view) {
        view.show();
      }
    },
    addAccountContact: function addAccountContact() {
      var view = App.getView(this.addAccountContactView);
      if (view) {
        view.show({
          insert: true
        });
      }
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var expression = new RegExp(searchQuery, 'i');

      return function (entry) {
        return expression.test(entry.title);
      };
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    getGroupForEntry: function getGroupForEntry(entry) {
      if (entry.view) {
        return {
          tag: 'view',
          title: this.viewsText
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
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: [{
          id: 'configure',
          action: 'navigateToConfigurationView'
        }]
      });
    },
    createLayout: function createLayout() {
      // don't need to cache as it is only re-rendered when there is a change
      var configured, layout, visible, i, view;

      configured = _lang2.default.getObject('preferences.home.visible', false, App) || [];
      layout = [{
        id: 'actions',
        children: [{
          'name': 'AddAccountContactAction',
          'action': 'addAccountContact',
          'title': this.addAccountContactText
        }]
      }];

      visible = {
        id: 'views',
        children: []
      };

      for (i = 0; i < configured.length; i++) {
        view = App.getView(configured[i]);
        if (view) {
          visible.children.push({
            'action': 'navigateToView',
            'view': view.id,
            'icon': view.icon,
            'title': view.titleText,
            'security': view.getSecurity()
          });
        }
      }

      layout.push(visible);

      return layout;
    },
    requestData: function requestData() {
      var layout = this._createCustomizedLayout(this.createLayout()),
          i,
          j,
          row,
          section,
          list = [];

      for (i = 0; i < layout.length; i++) {
        section = layout[i].children;

        for (j = 0; j < section.length; j++) {
          row = section[j];

          if (row['security'] && !App.hasAccessTo(row['security'])) {
            continue;
          }
          if (typeof this.query !== 'function' || this.query(row)) {
            list.push(row);
          }
        }
      }

      this.processData(list);
    },

    _onSearchExpression: function _onSearchExpression(expression) {
      var view = App.getView(this.searchView);

      if (view) {
        view.show({
          query: expression
        });
      }
    },

    navigateToConfigurationView: function navigateToConfigurationView() {
      var view = App.getView(this.configurationView);
      if (view) {
        view.show();
      }
    },
    _onRegistered: function _onRegistered() {
      this.refreshRequired = true;
    },
    refreshRequiredFor: function (_refreshRequiredFor) {
      function refreshRequiredFor() {
        return _refreshRequiredFor.apply(this, arguments);
      }

      refreshRequiredFor.toString = function () {
        return _refreshRequiredFor.toString();
      };

      return refreshRequiredFor;
    }(function () {
      var visible = _lang2.default.getObject('preferences.home.visible', false, App) || [],
          i,
          shown = this.feed && this.feed['$resources'];

      if (!visible || !shown || visible.length !== shown.length) {
        return true;
      }

      for (i = 0; i < visible.length; i++) {
        if (visible[i] !== shown[i]['$key']) {
          return true;
        }
      }

      return this.inherited(refreshRequiredFor, arguments);
    })
  });

  exports.default = __class;
  module.exports = exports['default'];
});