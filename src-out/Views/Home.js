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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9Ib21lLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInJvd1RlbXBsYXRlIiwiU2ltcGxhdGUiLCJpdGVtVGVtcGxhdGUiLCJjb25maWd1cmVUZXh0IiwiYWRkQWNjb3VudENvbnRhY3RUZXh0IiwidGl0bGVUZXh0IiwiYWN0aW9uc1RleHQiLCJ2aWV3c1RleHQiLCJpZCIsImV4cG9zZSIsImVuYWJsZVNlYXJjaCIsInNlYXJjaFdpZGdldENsYXNzIiwiY3VzdG9taXphdGlvblNldCIsImNvbmZpZ3VyYXRpb25WaWV3IiwiYWRkQWNjb3VudENvbnRhY3RWaWV3Iiwic2VhcmNoVmlldyIsIm5hdmlnYXRlVG9WaWV3IiwicGFyYW1zIiwidmlldyIsIkFwcCIsImdldFZpZXciLCJzaG93IiwiYWRkQWNjb3VudENvbnRhY3QiLCJpbnNlcnQiLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwiZXhwcmVzc2lvbiIsIlJlZ0V4cCIsImVudHJ5IiwidGVzdCIsInRpdGxlIiwiaGFzTW9yZURhdGEiLCJnZXRHcm91cEZvckVudHJ5IiwidGFnIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNvbm5lY3QiLCJfb25SZWdpc3RlcmVkIiwiY3JlYXRlVG9vbExheW91dCIsInRvb2xzIiwidGJhciIsImFjdGlvbiIsImNyZWF0ZUxheW91dCIsImNvbmZpZ3VyZWQiLCJsYXlvdXQiLCJ2aXNpYmxlIiwiaSIsImdldE9iamVjdCIsImNoaWxkcmVuIiwibGVuZ3RoIiwicHVzaCIsImljb24iLCJnZXRTZWN1cml0eSIsInJlcXVlc3REYXRhIiwiX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQiLCJqIiwicm93Iiwic2VjdGlvbiIsImxpc3QiLCJoYXNBY2Nlc3NUbyIsInF1ZXJ5IiwicHJvY2Vzc0RhdGEiLCJfb25TZWFyY2hFeHByZXNzaW9uIiwibmF2aWdhdGVUb0NvbmZpZ3VyYXRpb25WaWV3IiwicmVmcmVz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QSxVQUVFb0IsUUFBUSxLQUFLQyxJQUFMLElBQWEsS0FBS0EsSUFBTCxDQUFVLFlBQVYsQ0FGdkI7O0FBSUEsVUFBSSxDQUFDdEIsT0FBRCxJQUFZLENBQUNxQixLQUFiLElBQXVCckIsUUFBUUksTUFBUixLQUFtQmlCLE1BQU1qQixNQUFwRCxFQUE2RDtBQUMzRCxlQUFPLElBQVA7QUFDRDs7QUFFRCxXQUFLSCxJQUFJLENBQVQsRUFBWUEsSUFBSUQsUUFBUUksTUFBeEIsRUFBZ0NILEdBQWhDLEVBQXFDO0FBQ25DLFlBQUlELFFBQVFDLENBQVIsTUFBZW9CLE1BQU1wQixDQUFOLEVBQVMsTUFBVCxDQUFuQixFQUFxQztBQUNuQyxpQkFBTyxJQUFQO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPLEtBQUtaLFNBQUwsQ0FBZStCLGtCQUFmLEVBQW1DOUIsU0FBbkMsQ0FBUDtBQUNELEtBaEJEO0FBeEtxRCxHQUF6QyxDQUFkOztvQkEyTGVyQyxPIiwiZmlsZSI6IkhvbWUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKmVzbGludC1kaXNhYmxlKi9cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IFNwZWVkU2VhcmNoV2lkZ2V0IGZyb20gJy4uL1NwZWVkU2VhcmNoV2lkZ2V0JztcclxuaW1wb3J0IEdyb3VwZWRMaXN0IGZyb20gJ2FyZ29zL0dyb3VwZWRMaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaG9tZScpO1xyXG5cclxuLyoqXHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuSG9tZVxyXG4gKlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5Hcm91cGVkTGlzdFxyXG4gKlxyXG4gKi9cclxudmFyIF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuSG9tZScsIFtHcm91cGVkTGlzdF0sIHtcclxuICAvL1RlbXBsYXRlc1xyXG4gIHJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBkYXRhLWFjdGlvbj1cInslPSAkLmFjdGlvbiAlfVwiIHslIGlmICgkLnZpZXcpIHsgJX1kYXRhLXZpZXc9XCJ7JT0gJC52aWV3ICV9XCJ7JSB9ICV9PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImxpc3QtaXRlbS1zdGF0aWMtc2VsZWN0b3JcIj4nLFxyXG4gICAgJ3slIGlmICgkLmljb24pIHsgJX0nLFxyXG4gICAgJzxpbWcgc3JjPVwieyU6ICQuaWNvbiAlfVwiIGFsdD1cImljb25cIiBjbGFzcz1cImljb25cIiAvPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibGlzdC1pdGVtLWNvbnRlbnRcIj57JSEgJCQuaXRlbVRlbXBsYXRlICV9PC9kaXY+JyxcclxuICAgICc8L2xpPidcclxuICBdKSxcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQudGl0bGUgJX08L3A+J1xyXG4gIF0pLFxyXG5cclxuICAvL0xvY2FsaXphdGlvblxyXG4gIGNvbmZpZ3VyZVRleHQ6IHJlc291cmNlLmNvbmZpZ3VyZVRleHQsXHJcbiAgYWRkQWNjb3VudENvbnRhY3RUZXh0OiByZXNvdXJjZS5hZGRBY2NvdW50Q29udGFjdFRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWN0aW9uc1RleHQ6IHJlc291cmNlLmFjdGlvbnNUZXh0LFxyXG4gIHZpZXdzVGV4dDogcmVzb3VyY2Uudmlld3NUZXh0LFxyXG5cclxuICAvL1ZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnaG9tZScsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBlbmFibGVTZWFyY2g6IHRydWUsXHJcbiAgc2VhcmNoV2lkZ2V0Q2xhc3M6IFNwZWVkU2VhcmNoV2lkZ2V0LFxyXG4gIGN1c3RvbWl6YXRpb25TZXQ6ICdob21lJyxcclxuICBjb25maWd1cmF0aW9uVmlldzogJ2NvbmZpZ3VyZScsXHJcbiAgYWRkQWNjb3VudENvbnRhY3RWaWV3OiAnYWRkX2FjY291bnRfY29udGFjdCcsXHJcbiAgc2VhcmNoVmlldzogJ3NwZWVkc2VhcmNoX2xpc3QnLFxyXG5cclxuICBuYXZpZ2F0ZVRvVmlldzogZnVuY3Rpb24ocGFyYW1zKSB7XHJcbiAgICB2YXIgdmlldyA9IEFwcC5nZXRWaWV3KHBhcmFtcyAmJiBwYXJhbXMudmlldyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFkZEFjY291bnRDb250YWN0OiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5hZGRBY2NvdW50Q29udGFjdFZpZXcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICBpbnNlcnQ6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBmb3JtYXRTZWFyY2hRdWVyeTogZnVuY3Rpb24oc2VhcmNoUXVlcnkpIHtcclxuICAgIHZhciBleHByZXNzaW9uID0gbmV3IFJlZ0V4cChzZWFyY2hRdWVyeSwgJ2knKTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oZW50cnkpIHtcclxuICAgICAgcmV0dXJuIGV4cHJlc3Npb24udGVzdChlbnRyeS50aXRsZSk7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgaGFzTW9yZURhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGb3JFbnRyeTogZnVuY3Rpb24oZW50cnkpIHtcclxuICAgIGlmIChlbnRyeS52aWV3KSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFnOiAndmlldycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMudmlld3NUZXh0XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGFnOiAnYWN0aW9uJyxcclxuICAgICAgdGl0bGU6IHRoaXMuYWN0aW9uc1RleHRcclxuICAgIH07XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3QoQXBwLCAnb25SZWdpc3RlcmVkJywgdGhpcy5fb25SZWdpc3RlcmVkKTtcclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICAgIHRiYXI6IFt7XHJcbiAgICAgICAgaWQ6ICdjb25maWd1cmUnLFxyXG4gICAgICAgIGFjdGlvbjogJ25hdmlnYXRlVG9Db25maWd1cmF0aW9uVmlldydcclxuICAgICAgfV1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbigpIHtcclxuICAgIC8vIGRvbid0IG5lZWQgdG8gY2FjaGUgYXMgaXQgaXMgb25seSByZS1yZW5kZXJlZCB3aGVuIHRoZXJlIGlzIGEgY2hhbmdlXHJcbiAgICB2YXIgY29uZmlndXJlZCxcclxuICAgICAgbGF5b3V0LFxyXG4gICAgICB2aXNpYmxlLFxyXG4gICAgICBpLFxyXG4gICAgICB2aWV3O1xyXG5cclxuICAgIGNvbmZpZ3VyZWQgPSBsYW5nLmdldE9iamVjdCgncHJlZmVyZW5jZXMuaG9tZS52aXNpYmxlJywgZmFsc2UsIEFwcCkgfHwgW107XHJcbiAgICBsYXlvdXQgPSBbe1xyXG4gICAgICBpZDogJ2FjdGlvbnMnLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAnbmFtZSc6ICdBZGRBY2NvdW50Q29udGFjdEFjdGlvbicsXHJcbiAgICAgICAgJ2FjdGlvbic6ICdhZGRBY2NvdW50Q29udGFjdCcsXHJcbiAgICAgICAgJ3RpdGxlJzogdGhpcy5hZGRBY2NvdW50Q29udGFjdFRleHRcclxuICAgICAgfV1cclxuICAgIH1dO1xyXG5cclxuICAgIHZpc2libGUgPSB7XHJcbiAgICAgIGlkOiAndmlld3MnLFxyXG4gICAgICBjaGlsZHJlbjogW11cclxuICAgIH07XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGNvbmZpZ3VyZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmlldyA9IEFwcC5nZXRWaWV3KGNvbmZpZ3VyZWRbaV0pO1xyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIHZpc2libGUuY2hpbGRyZW4ucHVzaCh7XHJcbiAgICAgICAgICAnYWN0aW9uJzogJ25hdmlnYXRlVG9WaWV3JyxcclxuICAgICAgICAgICd2aWV3Jzogdmlldy5pZCxcclxuICAgICAgICAgICdpY29uJzogdmlldy5pY29uLFxyXG4gICAgICAgICAgJ3RpdGxlJzogdmlldy50aXRsZVRleHQsXHJcbiAgICAgICAgICAnc2VjdXJpdHknOiB2aWV3LmdldFNlY3VyaXR5KClcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxheW91dC5wdXNoKHZpc2libGUpO1xyXG5cclxuICAgIHJldHVybiBsYXlvdXQ7XHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbGF5b3V0ID0gdGhpcy5fY3JlYXRlQ3VzdG9taXplZExheW91dCh0aGlzLmNyZWF0ZUxheW91dCgpKSxcclxuICAgICAgaSxcclxuICAgICAgaixcclxuICAgICAgcm93LFxyXG4gICAgICBzZWN0aW9uLFxyXG4gICAgICBsaXN0ID0gW107XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGxheW91dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBzZWN0aW9uID0gbGF5b3V0W2ldLmNoaWxkcmVuO1xyXG5cclxuICAgICAgZm9yIChqID0gMDsgaiA8IHNlY3Rpb24ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICByb3cgPSBzZWN0aW9uW2pdO1xyXG5cclxuICAgICAgICBpZiAocm93WydzZWN1cml0eSddICYmICFBcHAuaGFzQWNjZXNzVG8ocm93WydzZWN1cml0eSddKSkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5xdWVyeSAhPT0gJ2Z1bmN0aW9uJyB8fCB0aGlzLnF1ZXJ5KHJvdykpIHtcclxuICAgICAgICAgIGxpc3QucHVzaChyb3cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJvY2Vzc0RhdGEobGlzdCk7XHJcbiAgfSxcclxuXHJcbiAgX29uU2VhcmNoRXhwcmVzc2lvbjogZnVuY3Rpb24oZXhwcmVzc2lvbikge1xyXG4gICAgdmFyIHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLnNlYXJjaFZpZXcpO1xyXG5cclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgcXVlcnk6IGV4cHJlc3Npb25cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbmF2aWdhdGVUb0NvbmZpZ3VyYXRpb25WaWV3OiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5jb25maWd1cmF0aW9uVmlldyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9vblJlZ2lzdGVyZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gIH0sXHJcbiAgcmVmcmVzaFJlcXVpcmVkRm9yOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB2aXNpYmxlID0gbGFuZy5nZXRPYmplY3QoJ3ByZWZlcmVuY2VzLmhvbWUudmlzaWJsZScsIGZhbHNlLCBBcHApIHx8IFtdLFxyXG4gICAgICBpLFxyXG4gICAgICBzaG93biA9IHRoaXMuZmVlZCAmJiB0aGlzLmZlZWRbJyRyZXNvdXJjZXMnXTtcclxuXHJcbiAgICBpZiAoIXZpc2libGUgfHwgIXNob3duIHx8ICh2aXNpYmxlLmxlbmd0aCAhPT0gc2hvd24ubGVuZ3RoKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdmlzaWJsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodmlzaWJsZVtpXSAhPT0gc2hvd25baV1bJyRrZXknXSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaW5oZXJpdGVkKHJlZnJlc2hSZXF1aXJlZEZvciwgYXJndW1lbnRzKTtcclxuICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19