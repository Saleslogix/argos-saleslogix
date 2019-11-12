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
      this.inherited(arguments);

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
    refreshRequiredFor: function refreshRequiredFor() {
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

      return this.inherited(arguments);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9Ib21lLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInJvd1RlbXBsYXRlIiwiU2ltcGxhdGUiLCJpdGVtVGVtcGxhdGUiLCJjb25maWd1cmVUZXh0IiwiYWRkQWNjb3VudENvbnRhY3RUZXh0IiwidGl0bGVUZXh0IiwiYWN0aW9uc1RleHQiLCJ2aWV3c1RleHQiLCJpZCIsImV4cG9zZSIsImVuYWJsZVNlYXJjaCIsInNlYXJjaFdpZGdldENsYXNzIiwiY3VzdG9taXphdGlvblNldCIsImNvbmZpZ3VyYXRpb25WaWV3IiwiYWRkQWNjb3VudENvbnRhY3RWaWV3Iiwic2VhcmNoVmlldyIsIm5hdmlnYXRlVG9WaWV3IiwicGFyYW1zIiwidmlldyIsIkFwcCIsImdldFZpZXciLCJzaG93IiwiYWRkQWNjb3VudENvbnRhY3QiLCJpbnNlcnQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwiZXhwcmVzc2lvbiIsIlJlZ0V4cCIsImVudHJ5IiwidGVzdCIsInRpdGxlIiwiaGFzTW9yZURhdGEiLCJnZXRHcm91cEZvckVudHJ5IiwidGFnIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNvbm5lY3QiLCJfb25SZWdpc3RlcmVkIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsImFjdGlvbiIsImNyZWF0ZUxheW91dCIsImNvbmZpZ3VyZWQiLCJsYXlvdXQiLCJ2aXNpYmxlIiwiaSIsImdldE9iamVjdCIsImNoaWxkcmVuIiwibGVuZ3RoIiwicHVzaCIsImljb24iLCJnZXRTZWN1cml0eSIsInJlcXVlc3REYXRhIiwiX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQiLCJqIiwicm93Iiwic2VjdGlvbiIsImxpc3QiLCJoYXNBY2Nlc3NUbyIsInF1ZXJ5IiwicHJvY2Vzc0RhdGEiLCJfb25TZWFyY2hFeHByZXNzaW9uIiwibmF2aWdhdGVUb0NvbmZpZ3VyYXRpb25WaWV3IiwicmVmcmVz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QUksQ0FBQ3RCLE9BQUQsSUFBWSxDQUFDcUIsS0FBYixJQUF1QnJCLFFBQVFJLE1BQVIsS0FBbUJpQixNQUFNakIsTUFBcEQsRUFBNkQ7QUFDM0QsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsV0FBS0gsSUFBSSxDQUFULEVBQVlBLElBQUlELFFBQVFJLE1BQXhCLEVBQWdDSCxHQUFoQyxFQUFxQztBQUNuQyxZQUFJRCxRQUFRQyxDQUFSLE1BQWVvQixNQUFNcEIsQ0FBTixFQUFTLE1BQVQsQ0FBbkIsRUFBcUM7QUFDbkMsaUJBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBRUQsYUFBTyxLQUFLWixTQUFMLENBQWVDLFNBQWYsQ0FBUDtBQUNEO0FBeExvRCxHQUF6QyxDQUFkOztvQkEyTGVyQyxPIiwiZmlsZSI6IkhvbWUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKmVzbGludC1kaXNhYmxlKi9cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IFNwZWVkU2VhcmNoV2lkZ2V0IGZyb20gJy4uL1NwZWVkU2VhcmNoV2lkZ2V0JztcclxuaW1wb3J0IEdyb3VwZWRMaXN0IGZyb20gJ2FyZ29zL0dyb3VwZWRMaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaG9tZScpO1xyXG5cclxuLyoqXHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuSG9tZVxyXG4gKlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5Hcm91cGVkTGlzdFxyXG4gKlxyXG4gKi9cclxudmFyIF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuSG9tZScsIFtHcm91cGVkTGlzdF0sIHtcclxuICAvL1RlbXBsYXRlc1xyXG4gIHJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBkYXRhLWFjdGlvbj1cInslPSAkLmFjdGlvbiAlfVwiIHslIGlmICgkLnZpZXcpIHsgJX1kYXRhLXZpZXc9XCJ7JT0gJC52aWV3ICV9XCJ7JSB9ICV9PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImxpc3QtaXRlbS1zdGF0aWMtc2VsZWN0b3JcIj4nLFxyXG4gICAgJ3slIGlmICgkLmljb24pIHsgJX0nLFxyXG4gICAgJzxpbWcgc3JjPVwieyU6ICQuaWNvbiAlfVwiIGFsdD1cImljb25cIiBjbGFzcz1cImljb25cIiAvPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibGlzdC1pdGVtLWNvbnRlbnRcIj57JSEgJCQuaXRlbVRlbXBsYXRlICV9PC9kaXY+JyxcclxuICAgICc8L2xpPidcclxuICBdKSxcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQudGl0bGUgJX08L3A+J1xyXG4gIF0pLFxyXG5cclxuICAvL0xvY2FsaXphdGlvblxyXG4gIGNvbmZpZ3VyZVRleHQ6IHJlc291cmNlLmNvbmZpZ3VyZVRleHQsXHJcbiAgYWRkQWNjb3VudENvbnRhY3RUZXh0OiByZXNvdXJjZS5hZGRBY2NvdW50Q29udGFjdFRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWN0aW9uc1RleHQ6IHJlc291cmNlLmFjdGlvbnNUZXh0LFxyXG4gIHZpZXdzVGV4dDogcmVzb3VyY2Uudmlld3NUZXh0LFxyXG5cclxuICAvL1ZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnaG9tZScsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBlbmFibGVTZWFyY2g6IHRydWUsXHJcbiAgc2VhcmNoV2lkZ2V0Q2xhc3M6IFNwZWVkU2VhcmNoV2lkZ2V0LFxyXG4gIGN1c3RvbWl6YXRpb25TZXQ6ICdob21lJyxcclxuICBjb25maWd1cmF0aW9uVmlldzogJ2NvbmZpZ3VyZScsXHJcbiAgYWRkQWNjb3VudENvbnRhY3RWaWV3OiAnYWRkX2FjY291bnRfY29udGFjdCcsXHJcbiAgc2VhcmNoVmlldzogJ3NwZWVkc2VhcmNoX2xpc3QnLFxyXG5cclxuICBuYXZpZ2F0ZVRvVmlldzogZnVuY3Rpb24ocGFyYW1zKSB7XHJcbiAgICB2YXIgdmlldyA9IEFwcC5nZXRWaWV3KHBhcmFtcyAmJiBwYXJhbXMudmlldyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFkZEFjY291bnRDb250YWN0OiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5hZGRBY2NvdW50Q29udGFjdFZpZXcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICBpbnNlcnQ6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24oc2VhcmNoUXVlcnkpIHtcclxuICAgIHZhciBleHByZXNzaW9uID0gbmV3IFJlZ0V4cChzZWFyY2hRdWVyeSwgJ2knKTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oZW50cnkpIHtcclxuICAgICAgcmV0dXJuIGV4cHJlc3Npb24udGVzdChlbnRyeS50aXRsZSk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgaGFzTW9yZURhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGb3JFbnRyeTogZnVuY3Rpb24oZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS52aWV3KSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAndmlldycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMudmlld3NUZXh0XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGFnOiAnYWN0aW9uJyxcclxuICAgICAgdGl0bGU6IHRoaXMuYWN0aW9uc1RleHRcclxuICAgIH07XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgdGhpcy5jb25uZWN0KEFwcCwgJ29uUmVnaXN0ZXJlZCcsIHRoaXMuX29uUmVnaXN0ZXJlZCk7XHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbe1xyXG4gICAgICAgIGlkOiAnY29uZmlndXJlJyxcclxuICAgICAgICBhY3Rpb246ICduYXZpZ2F0ZVRvQ29uZmlndXJhdGlvblZpZXcnXHJcbiAgICAgIH1dXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBkb24ndCBuZWVkIHRvIGNhY2hlIGFzIGl0IGlzIG9ubHkgcmUtcmVuZGVyZWQgd2hlbiB0aGVyZSBpcyBhIGNoYW5nZVxyXG4gICAgdmFyIGNvbmZpZ3VyZWQsXHJcbiAgICAgIGxheW91dCxcclxuICAgICAgdmlzaWJsZSxcclxuICAgICAgaSxcclxuICAgICAgdmlldztcclxuXHJcbiAgICBjb25maWd1cmVkID0gbGFuZy5nZXRPYmplY3QoJ3ByZWZlcmVuY2VzLmhvbWUudmlzaWJsZScsIGZhbHNlLCBBcHApIHx8IFtdO1xyXG4gICAgbGF5b3V0ID0gW3tcclxuICAgICAgaWQ6ICdhY3Rpb25zJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgJ25hbWUnOiAnQWRkQWNjb3VudENvbnRhY3RBY3Rpb24nLFxyXG4gICAgICAgICdhY3Rpb24nOiAnYWRkQWNjb3VudENvbnRhY3QnLFxyXG4gICAgICAgICd0aXRsZSc6IHRoaXMuYWRkQWNjb3VudENvbnRhY3RUZXh0XHJcbiAgICAgIH1dXHJcbiAgICB9XTtcclxuXHJcbiAgICB2aXNpYmxlID0ge1xyXG4gICAgICBpZDogJ3ZpZXdzJyxcclxuICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBjb25maWd1cmVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZpZXcgPSBBcHAuZ2V0Vmlldyhjb25maWd1cmVkW2ldKTtcclxuICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICB2aXNpYmxlLmNoaWxkcmVuLnB1c2goe1xyXG4gICAgICAgICAgJ2FjdGlvbic6ICduYXZpZ2F0ZVRvVmlldycsXHJcbiAgICAgICAgICAndmlldyc6IHZpZXcuaWQsXHJcbiAgICAgICAgICAnaWNvbic6IHZpZXcuaWNvbixcclxuICAgICAgICAgICd0aXRsZSc6IHZpZXcudGl0bGVUZXh0LFxyXG4gICAgICAgICAgJ3NlY3VyaXR5Jzogdmlldy5nZXRTZWN1cml0eSgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsYXlvdXQucHVzaCh2aXNpYmxlKTtcclxuXHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGxheW91dCA9IHRoaXMuX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQodGhpcy5jcmVhdGVMYXlvdXQoKSksXHJcbiAgICAgIGksXHJcbiAgICAgIGosXHJcbiAgICAgIHJvdyxcclxuICAgICAgc2VjdGlvbixcclxuICAgICAgbGlzdCA9IFtdO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBsYXlvdXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgc2VjdGlvbiA9IGxheW91dFtpXS5jaGlsZHJlbjtcclxuXHJcbiAgICAgIGZvciAoaiA9IDA7IGogPCBzZWN0aW9uLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgcm93ID0gc2VjdGlvbltqXTtcclxuXHJcbiAgICAgICAgaWYgKHJvd1snc2VjdXJpdHknXSAmJiAhQXBwLmhhc0FjY2Vzc1RvKHJvd1snc2VjdXJpdHknXSkpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucXVlcnkgIT09ICdmdW5jdGlvbicgfHwgdGhpcy5xdWVyeShyb3cpKSB7XHJcbiAgICAgICAgICBsaXN0LnB1c2gocm93KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb2Nlc3NEYXRhKGxpc3QpO1xyXG4gIH0sXHJcblxyXG4gIF9vblNlYXJjaEV4cHJlc3Npb246IGZ1bmN0aW9uKGV4cHJlc3Npb24pIHtcclxuICAgIHZhciB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5zZWFyY2hWaWV3KTtcclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIHF1ZXJ5OiBleHByZXNzaW9uXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG5hdmlnYXRlVG9Db25maWd1cmF0aW9uVmlldzogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuY29uZmlndXJhdGlvblZpZXcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfb25SZWdpc3RlcmVkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICB9LFxyXG4gIHJlZnJlc2hSZXF1aXJlZEZvcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdmlzaWJsZSA9IGxhbmcuZ2V0T2JqZWN0KCdwcmVmZXJlbmNlcy5ob21lLnZpc2libGUnLCBmYWxzZSwgQXBwKSB8fCBbXSxcclxuICAgICAgaSxcclxuICAgICAgc2hvd24gPSB0aGlzLmZlZWQgJiYgdGhpcy5mZWVkWyckcmVzb3VyY2VzJ107XHJcblxyXG4gICAgaWYgKCF2aXNpYmxlIHx8ICFzaG93biB8fCAodmlzaWJsZS5sZW5ndGggIT09IHNob3duLmxlbmd0aCkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHZpc2libGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHZpc2libGVbaV0gIT09IHNob3duW2ldWycka2V5J10pIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=