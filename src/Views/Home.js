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
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import SpeedSearchWidget from '../SpeedSearchWidget';
import GroupedList from 'argos/GroupedList';
import getResource from 'argos/I18n';

const resource = getResource('home');

var __class = declare('crm.Views.Home', [GroupedList], {
  //Templates
  rowTemplate: new Simplate([
    '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
    '<div class="list-item-static-selector">',
    '{% if ($.icon) { %}',
    '<img src="{%: $.icon %}" alt="icon" class="icon" />',
    '{% } %}',
    '</div>',
    '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
    '</li>'
  ]),
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $.title %}</p>'
  ]),

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
  searchWidgetClass: SpeedSearchWidget,
  customizationSet: 'home',
  configurationView: 'configure',
  addAccountContactView: 'add_account_contact',
  searchView: 'speedsearch_list',

  navigateToView: function(params) {
    var view = App.getView(params && params.view);
    if (view) {
      view.show();
    }
  },
  addAccountContact: function() {
    var view = App.getView(this.addAccountContactView);
    if (view) {
      view.show({
        insert: true
      });
    }
  },
  formatSearchQuery: function(searchQuery) {
    var expression = new RegExp(searchQuery, 'i');

    return function(entry) {
      return expression.test(entry.title);
    };
  },
  hasMoreData: function() {
    return false;
  },
  getGroupForEntry: function(entry) {
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
  createToolLayout: function() {
    return this.tools || (this.tools = {
      tbar: [{
        id: 'configure',
        action: 'navigateToConfigurationView'
      }]
    });
  },
  createLayout: function() {
    // don't need to cache as it is only re-rendered when there is a change
    var configured,
      layout,
      visible,
      i,
      view;

    configured = lang.getObject('preferences.home.visible', false, App) || [];
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
  requestData: function() {
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

  _onSearchExpression: function(expression) {
    var view = App.getView(this.searchView);

    if (view) {
      view.show({
        query: expression
      });
    }
  },

  navigateToConfigurationView: function() {
    var view = App.getView(this.configurationView);
    if (view) {
      view.show();
    }
  },
  _onRegistered: function() {
    this.refreshRequired = true;
  },
  refreshRequiredFor: function() {
    var visible = lang.getObject('preferences.home.visible', false, App) || [],
      i,
      shown = this.feed && this.feed['$resources'];

    if (!visible || !shown || (visible.length !== shown.length)) {
      return true;
    }

    for (i = 0; i < visible.length; i++) {
      if (visible[i] !== shown[i]['$key']) {
        return true;
      }
    }

    return this.inherited(refreshRequiredFor, arguments);
  }
});

export default __class;
