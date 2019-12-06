define('crm/Views/Activity/TypesList', ['module', 'exports', 'dojo/_base/declare', 'argos/List', 'dojo/store/Memory', 'argos/I18n', '../../Models/Activity/ActivityTypeIcon'], function (module, exports, _declare, _List, _Memory, _I18n, _ActivityTypeIcon) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _List2 = _interopRequireDefault(_List);

  var _Memory2 = _interopRequireDefault(_Memory);

  var _I18n2 = _interopRequireDefault(_I18n);

  var activityTypeIcons = _interopRequireWildcard(_ActivityTypeIcon);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('activityTypesList');

  /**
   * @class crm.Views.Activity.TypesList
   *
   * @extends argos.List
   * @mixins argos._LegacySDataListMixin
   *
   * @requires argos.List
   * @requires argos._LegacySDataListMixin
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

  var __class = (0, _declare2.default)('crm.Views.Activity.TypesList', [_List2.default], {
    // Templates
    liRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">', '{% if ($.icon) { %}', '<button type="button" class="btn-icon hide-focus list-item-selector visible">\n      <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%: $.icon || "" %}"></use>\n      </svg>\n    </button>', '{% } else if ($.iconClass) { %}', '<div class="{%= $.iconClass %}"></div>', '{% } %}', '{%! $$.itemTemplate %}', '</li>']),
    itemTemplate: new Simplate(['<h4 class="', '{% if ($.icon) { %}', 'list-item-content', '{% } %} ">', '{%: $.$descriptor %}</h4>']),
    isCardView: false,
    // Localization
    titleText: resource.titleText,
    activityTypeText: {
      atToDo: resource.toDo,
      atPhoneCall: resource.phoneCall,
      atAppointment: resource.meeting,
      atLiterature: resource.literature,
      atPersonal: resource.personal,
      event: resource.eventText
    },

    activityTypeOrder: ['atAppointment',
    // 'atLiterature', // For [#7206791], We will enable this later.
    'atPersonal', 'atPhoneCall', 'atToDo', 'event'],
    expose: false,
    enableSearch: false,
    enablePullToRefresh: false,
    id: 'activity_types_list',
    editView: 'activity_edit',
    eventEditView: 'event_edit',
    unscheduledView: 'activity_complete',

    allowSelection: true, // adds list-show-selectors class to listview for displaying icons
    activityTypeIcon: activityTypeIcons.default,
    activateEntry: function activateEntry(params) {
      if (params.key) {
        var view = App.getView(params.key === 'event' ? this.eventEditView : this.editView);

        if (this.options.unscheduled === true) {
          view = App.getView(this.unscheduledView);
        }

        if (view) {
          var source = this.options && this.options.source;
          view.show({
            insert: true,
            entry: this.options && this.options.entry || null,
            source: source,
            activityType: params.key,
            title: this.activityTypeText[params.key],
            returnTo: this.options && this.options.returnTo,
            currentDate: this.options && this.options.currentDate,
            unscheduled: this.options.unscheduled
          }, {
            returnTo: -1
          });
        }
      }
    },
    refreshRequiredFor: function refreshRequiredFor(options) {
      var toReturn = void 0;
      if (this.options) {
        toReturn = options;
      } else {
        toReturn = true;
      }
      return toReturn;
    },
    hasMoreData: function hasMoreData() {
      return false;
    },
    createStore: function createStore() {
      var list = [];
      var eventViews = ['calendar_view', 'calendar_monthlist', 'calendar_weeklist', 'calendar_daylist', 'calendar_yearlist'];

      for (var i = 0; i < this.activityTypeOrder.length; i++) {
        list.push({
          $key: this.activityTypeOrder[i],
          $descriptor: this.activityTypeText[this.activityTypeOrder[i]],
          icon: this.activityTypeIcon[this.activityTypeOrder[i]],
          type: this.activityTypeOrder[i]
        });
      }

      if (eventViews.indexOf(this.options.returnTo) === -1) {
        list.pop(); // remove event for non event views
      }

      var store = new _Memory2.default({
        data: list
      });
      return store;
    },
    init: function init() {
      this.inherited(init, arguments);
    },
    onTransitionAway: function onTransitionAway() {
      this.inherited(onTransitionAway, arguments);
      this.refreshRequired = true;
      this.store = null;
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9UeXBlc0xpc3QuanMiXSwibmFtZXMiOlsiYWN0aXZpdHlUeXBlSWNvbnMiLCJyZXNvdXJjZSIsIl9fY2xhc3MiLCJsaVJvd1RlbXBsYXRlIiwiU2ltcGxhdGUiLCJpdGVtVGVtcGxhdGUiLCJpc0NhcmRWaWV3IiwidGl0bGVUZXh0IiwiYWN0aXZpdHlUeXBlVGV4dCIsImF0VG9EbyIsInRvRG8iLCJhdFBob25lQ2FsbCIsInBob25lQ2FsbCIsImF0QXBwb2ludG1lbnQiLCJtZWV0aW5nIiwiYXRMaXRlcmF0dXJlIiwibGl0ZXJhdHVyZSIsImF0UGVyc29uYWwiLCJwZXJzb25hbCIsImV2ZW50IiwiZXZlbnRUZXh0IiwiYWN0aXZpdHlUeXBlT3JkZXIiLCJleHBvc2UiLCJlbmFibGVTZWFyY2giLCJlbmFibGVQdWxsVG9SZWZyZXNoIiwiaWQiLCJlZGl0VmlldyIsImV2ZW50RWRpdFZpZXciLCJ1bnNjaGVkdWxlZFZpZXciLCJhbGxvd1NlbGVjdGlvbiIsImFjdGl2aXR5VHlwZUljb24iLCJkZWZhdWx0IiwiYWN0aXZhdGVFbnRyeSIsInBhcmFtcyIsImtleSIsInZpZXciLCJBcHAiLCJnZXRWaWV3Iiwib3B0aW9ucyIsInVuc2NoZWR1bGVkIiwic291cmNlIiwic2hvdyIsImluc2VydCIsImVudHJ5IiwiYWN0aXZpdHlUeXBlIiwidGl0bGUiLCJyZXR1cm5UbyIsImN1cnJlbnREYXRlIiwicmVmcmVzaFJlcXVpcmVkRm9yIiwidG9SZXR1cm4iLCJoYXNNb3JlRGF0YSIsImNyZWF0ZVN0b3JlIiwibGlzdCIsImV2ZW50Vmlld3MiLCJpIiwibGVuZ3RoIiwicHVzaCIsIiRrZXkiLCIkZGVzY3JpcHRvciIsImljb24iLCJ0eXBlIiwiaW5kZXhPZiIsInBvcCIsInN0b3JlIiwiZGF0YSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJvblRyYW5zaXRpb25Bd2F5IiwicmVmcmVzaFJlcXVpcmVkIiwi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eEg2RDtBQXlIOURDLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxXQUFLRixTQUFMLENBQWVFLGdCQUFmLEVBQWlDRCxTQUFqQztBQUNBLFdBQUtFLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxXQUFLTixLQUFMLEdBQWEsSUFBYjtBQUNELEtBN0g2RDtBQThIOURPLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxhQUFPLEtBQUtDLEtBQUwsS0FBZSxLQUFLQSxLQUFMLEdBQWE7QUFDakNDLGNBQU07QUFEMkIsT0FBNUIsQ0FBUDtBQUdEO0FBbEk2RCxHQUFoRCxDQUFoQjs7b0JBcUlldEUsTyIsImZpbGUiOiJUeXBlc0xpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IE1lbW9yeVN0b3JlIGZyb20gJ2Rvam8vc3RvcmUvTWVtb3J5JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgKiBhcyBhY3Rpdml0eVR5cGVJY29ucyBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlSWNvbic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY3Rpdml0eVR5cGVzTGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWN0aXZpdHkuVHlwZXNMaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICogQG1peGlucyBhcmdvcy5fTGVnYWN5U0RhdGFMaXN0TWl4aW5cclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkxpc3RcclxuICogQHJlcXVpcmVzIGFyZ29zLl9MZWdhY3lTRGF0YUxpc3RNaXhpblxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BY3Rpdml0eS5UeXBlc0xpc3QnLCBbTGlzdF0sIHtcclxuICAvLyBUZW1wbGF0ZXNcclxuICBsaVJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBkYXRhLWFjdGlvbj1cImFjdGl2YXRlRW50cnlcIiBkYXRhLWtleT1cInslPSAkLiRrZXkgJX1cIiBkYXRhLWRlc2NyaXB0b3I9XCJ7JTogJC4kZGVzY3JpcHRvciAlfVwiPicsXHJcbiAgICAneyUgaWYgKCQuaWNvbikgeyAlfScsXHJcbiAgICBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4taWNvbiBoaWRlLWZvY3VzIGxpc3QtaXRlbS1zZWxlY3RvciB2aXNpYmxlXCI+XHJcbiAgICAgIDxzdmcgY2xhc3M9XCJpY29uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+XHJcbiAgICAgICAgICA8dXNlIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhsaW5rOmhyZWY9XCIjaWNvbi17JTogJC5pY29uIHx8IFwiXCIgJX1cIj48L3VzZT5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L2J1dHRvbj5gLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJC5pY29uQ2xhc3MpIHsgJX0nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJ7JT0gJC5pY29uQ2xhc3MgJX1cIj48L2Rpdj4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJ3slISAkJC5pdGVtVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvbGk+JyxcclxuICBdKSxcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGg0IGNsYXNzPVwiJyxcclxuICAgICd7JSBpZiAoJC5pY29uKSB7ICV9JyxcclxuICAgICdsaXN0LWl0ZW0tY29udGVudCcsXHJcbiAgICAneyUgfSAlfSBcIj4nLFxyXG4gICAgJ3slOiAkLiRkZXNjcmlwdG9yICV9PC9oND4nLFxyXG4gIF0pLFxyXG4gIGlzQ2FyZFZpZXc6IGZhbHNlLFxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIGFjdGl2aXR5VHlwZVRleHQ6IHtcclxuICAgIGF0VG9EbzogcmVzb3VyY2UudG9EbyxcclxuICAgIGF0UGhvbmVDYWxsOiByZXNvdXJjZS5waG9uZUNhbGwsXHJcbiAgICBhdEFwcG9pbnRtZW50OiByZXNvdXJjZS5tZWV0aW5nLFxyXG4gICAgYXRMaXRlcmF0dXJlOiByZXNvdXJjZS5saXRlcmF0dXJlLFxyXG4gICAgYXRQZXJzb25hbDogcmVzb3VyY2UucGVyc29uYWwsXHJcbiAgICBldmVudDogcmVzb3VyY2UuZXZlbnRUZXh0LFxyXG4gIH0sXHJcblxyXG4gIGFjdGl2aXR5VHlwZU9yZGVyOiBbXHJcbiAgICAnYXRBcHBvaW50bWVudCcsXHJcbiAgICAvLyAnYXRMaXRlcmF0dXJlJywgLy8gRm9yIFsjNzIwNjc5MV0sIFdlIHdpbGwgZW5hYmxlIHRoaXMgbGF0ZXIuXHJcbiAgICAnYXRQZXJzb25hbCcsXHJcbiAgICAnYXRQaG9uZUNhbGwnLFxyXG4gICAgJ2F0VG9EbycsXHJcbiAgICAnZXZlbnQnLFxyXG4gIF0sXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gIGVuYWJsZVB1bGxUb1JlZnJlc2g6IGZhbHNlLFxyXG4gIGlkOiAnYWN0aXZpdHlfdHlwZXNfbGlzdCcsXHJcbiAgZWRpdFZpZXc6ICdhY3Rpdml0eV9lZGl0JyxcclxuICBldmVudEVkaXRWaWV3OiAnZXZlbnRfZWRpdCcsXHJcbiAgdW5zY2hlZHVsZWRWaWV3OiAnYWN0aXZpdHlfY29tcGxldGUnLFxyXG5cclxuICBhbGxvd1NlbGVjdGlvbjogdHJ1ZSwgLy8gYWRkcyBsaXN0LXNob3ctc2VsZWN0b3JzIGNsYXNzIHRvIGxpc3R2aWV3IGZvciBkaXNwbGF5aW5nIGljb25zXHJcbiAgYWN0aXZpdHlUeXBlSWNvbjogYWN0aXZpdHlUeXBlSWNvbnMuZGVmYXVsdCxcclxuICBhY3RpdmF0ZUVudHJ5OiBmdW5jdGlvbiBhY3RpdmF0ZUVudHJ5KHBhcmFtcykge1xyXG4gICAgaWYgKHBhcmFtcy5rZXkpIHtcclxuICAgICAgbGV0IHZpZXcgPSBBcHAuZ2V0VmlldygocGFyYW1zLmtleSA9PT0gJ2V2ZW50JykgPyB0aGlzLmV2ZW50RWRpdFZpZXcgOiB0aGlzLmVkaXRWaWV3KTtcclxuXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudW5zY2hlZHVsZWQgPT09IHRydWUpIHtcclxuICAgICAgICB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy51bnNjaGVkdWxlZFZpZXcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuc291cmNlO1xyXG4gICAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgICAgICBlbnRyeTogKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZW50cnkpIHx8IG51bGwsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBhY3Rpdml0eVR5cGU6IHBhcmFtcy5rZXksXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5hY3Rpdml0eVR5cGVUZXh0W3BhcmFtcy5rZXldLFxyXG4gICAgICAgICAgcmV0dXJuVG86IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucmV0dXJuVG8sXHJcbiAgICAgICAgICBjdXJyZW50RGF0ZTogdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZSxcclxuICAgICAgICAgIHVuc2NoZWR1bGVkOiB0aGlzLm9wdGlvbnMudW5zY2hlZHVsZWQsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgcmV0dXJuVG86IC0xLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICByZWZyZXNoUmVxdWlyZWRGb3I6IGZ1bmN0aW9uIHJlZnJlc2hSZXF1aXJlZEZvcihvcHRpb25zKSB7XHJcbiAgICBsZXQgdG9SZXR1cm47XHJcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHRvUmV0dXJuID0gb3B0aW9ucztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvUmV0dXJuID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0b1JldHVybjtcclxuICB9LFxyXG4gIGhhc01vcmVEYXRhOiBmdW5jdGlvbiBoYXNNb3JlRGF0YSgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGNyZWF0ZVN0b3JlOiBmdW5jdGlvbiBjcmVhdGVTdG9yZSgpIHtcclxuICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgIGNvbnN0IGV2ZW50Vmlld3MgPSBbXHJcbiAgICAgICdjYWxlbmRhcl92aWV3JyxcclxuICAgICAgJ2NhbGVuZGFyX21vbnRobGlzdCcsXHJcbiAgICAgICdjYWxlbmRhcl93ZWVrbGlzdCcsXHJcbiAgICAgICdjYWxlbmRhcl9kYXlsaXN0JyxcclxuICAgICAgJ2NhbGVuZGFyX3llYXJsaXN0JyxcclxuICAgIF07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2aXR5VHlwZU9yZGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxpc3QucHVzaCh7XHJcbiAgICAgICAgJGtleTogdGhpcy5hY3Rpdml0eVR5cGVPcmRlcltpXSxcclxuICAgICAgICAkZGVzY3JpcHRvcjogdGhpcy5hY3Rpdml0eVR5cGVUZXh0W3RoaXMuYWN0aXZpdHlUeXBlT3JkZXJbaV1dLFxyXG4gICAgICAgIGljb246IHRoaXMuYWN0aXZpdHlUeXBlSWNvblt0aGlzLmFjdGl2aXR5VHlwZU9yZGVyW2ldXSxcclxuICAgICAgICB0eXBlOiB0aGlzLmFjdGl2aXR5VHlwZU9yZGVyW2ldLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnRWaWV3cy5pbmRleE9mKHRoaXMub3B0aW9ucy5yZXR1cm5UbykgPT09IC0xKSB7XHJcbiAgICAgIGxpc3QucG9wKCk7IC8vIHJlbW92ZSBldmVudCBmb3Igbm9uIGV2ZW50IHZpZXdzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgTWVtb3J5U3RvcmUoe1xyXG4gICAgICBkYXRhOiBsaXN0LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoaW5pdCwgYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIG9uVHJhbnNpdGlvbkF3YXk6IGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkF3YXkoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChvblRyYW5zaXRpb25Bd2F5LCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zdG9yZSA9IG51bGw7XHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICAgIHRiYXI6IFtdLFxyXG4gICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=