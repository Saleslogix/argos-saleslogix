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
    allowSelection: true, // adds list-show-selectors class to listview for displaying icons
    activityTypeIcon: activityTypeIcons.default,
    activateEntry: function activateEntry(params) {
      if (params.key) {
        var view = App.getView(params.key === 'event' ? this.eventEditView : this.editView);

        if (view) {
          var source = this.options && this.options.source;
          view.show({
            insert: true,
            entry: this.options && this.options.entry || null,
            source: source,
            activityType: params.key,
            title: this.activityTypeText[params.key],
            returnTo: this.options && this.options.returnTo,
            currentDate: this.options && this.options.currentDate
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
      this.inherited(arguments);
    },
    onTransitionAway: function onTransitionAway() {
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY3Rpdml0eS9UeXBlc0xpc3QuanMiXSwibmFtZXMiOlsiYWN0aXZpdHlUeXBlSWNvbnMiLCJyZXNvdXJjZSIsIl9fY2xhc3MiLCJsaVJvd1RlbXBsYXRlIiwiU2ltcGxhdGUiLCJpdGVtVGVtcGxhdGUiLCJpc0NhcmRWaWV3IiwidGl0bGVUZXh0IiwiYWN0aXZpdHlUeXBlVGV4dCIsImF0VG9EbyIsInRvRG8iLCJhdFBob25lQ2FsbCIsInBob25lQ2FsbCIsImF0QXBwb2ludG1lbnQiLCJtZWV0aW5nIiwiYXRMaXRlcmF0dXJlIiwibGl0ZXJhdHVyZSIsImF0UGVyc29uYWwiLCJwZXJzb25hbCIsImV2ZW50IiwiZXZlbnRUZXh0IiwiYWN0aXZpdHlUeXBlT3JkZXIiLCJleHBvc2UiLCJlbmFibGVTZWFyY2giLCJlbmFibGVQdWxsVG9SZWZyZXNoIiwiaWQiLCJlZGl0VmlldyIsImV2ZW50RWRpdFZpZXciLCJhbGxvd1NlbGVjdGlvbiIsImFjdGl2aXR5VHlwZUljb24iLCJkZWZhdWx0IiwiYWN0aXZhdGVFbnRyeSIsInBhcmFtcyIsImtleSIsInZpZXciLCJBcHAiLCJnZXRWaWV3Iiwic291cmNlIiwib3B0aW9ucyIsInNob3ciLCJpbnNlcnQiLCJlbnRyeSIsImFjdGl2aXR5VHlwZSIsInRpdGxlIiwicmV0dXJuVG8iLCJjdXJyZW50RGF0ZSIsInJlZnJlc2hSZXF1aXJlZEZvciIsInRvUmV0dXJuIiwiaGFzTW9yZURhdGEiLCJjcmVhdGVTdG9yZSIsImxpc3QiLCJldmVudFZpZXdzIiwiaSIsImxlbmd0aCIsInB1c2giLCIka2V5IiwiJGRlc2NyaXB0b3IiLCJpY29uIiwidHlwZSIsImluZGV4T2YiLCJwb3AiLCJzdG9yZSIsImRhdGEiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwib25UcmFuc2l0aW9uQXdheSIsInJlZnJlc2hSZXF1aXJlZCIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsInRiYXIi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O0FBQ2pDQyxjQUFNO0FBRDJCLE9BQTVCLENBQVA7QUFHRDtBQTNINkQsR0FBaEQsQ0FBaEI7O29CQThIZXBFLE8iLCJmaWxlIjoiVHlwZXNMaXN0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBNZW1vcnlTdG9yZSBmcm9tICdkb2pvL3N0b3JlL01lbW9yeSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0ICogYXMgYWN0aXZpdHlUeXBlSWNvbnMgZnJvbSAnLi4vLi4vTW9kZWxzL0FjdGl2aXR5L0FjdGl2aXR5VHlwZUljb24nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aXZpdHlUeXBlc0xpc3QnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkFjdGl2aXR5LlR5cGVzTGlzdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgYXJnb3MuX0xlZ2FjeVNEYXRhTGlzdE1peGluXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5MaXN0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5fTGVnYWN5U0RhdGFMaXN0TWl4aW5cclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQWN0aXZpdHkuVHlwZXNMaXN0JywgW0xpc3RdLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgbGlSb3dUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8bGkgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUVudHJ5XCIgZGF0YS1rZXk9XCJ7JT0gJC4ka2V5ICV9XCIgZGF0YS1kZXNjcmlwdG9yPVwieyU6ICQuJGRlc2NyaXB0b3IgJX1cIj4nLFxyXG4gICAgJ3slIGlmICgkLmljb24pIHsgJX0nLFxyXG4gICAgYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWljb24gaGlkZS1mb2N1cyBsaXN0LWl0ZW0tc2VsZWN0b3IgdmlzaWJsZVwiPlxyXG4gICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiIGZvY3VzYWJsZT1cImZhbHNlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxyXG4gICAgICAgICAgPHVzZSB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bGluazpocmVmPVwiI2ljb24teyU6ICQuaWNvbiB8fCBcIlwiICV9XCI+PC91c2U+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9idXR0b24+YCxcclxuICAgICd7JSB9IGVsc2UgaWYgKCQuaWNvbkNsYXNzKSB7ICV9JyxcclxuICAgICc8ZGl2IGNsYXNzPVwieyU9ICQuaWNvbkNsYXNzICV9XCI+PC9kaXY+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICd7JSEgJCQuaXRlbVRlbXBsYXRlICV9JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxoNCBjbGFzcz1cIicsXHJcbiAgICAneyUgaWYgKCQuaWNvbikgeyAlfScsXHJcbiAgICAnbGlzdC1pdGVtLWNvbnRlbnQnLFxyXG4gICAgJ3slIH0gJX0gXCI+JyxcclxuICAgICd7JTogJC4kZGVzY3JpcHRvciAlfTwvaDQ+JyxcclxuICBdKSxcclxuICBpc0NhcmRWaWV3OiBmYWxzZSxcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBhY3Rpdml0eVR5cGVUZXh0OiB7XHJcbiAgICBhdFRvRG86IHJlc291cmNlLnRvRG8sXHJcbiAgICBhdFBob25lQ2FsbDogcmVzb3VyY2UucGhvbmVDYWxsLFxyXG4gICAgYXRBcHBvaW50bWVudDogcmVzb3VyY2UubWVldGluZyxcclxuICAgIGF0TGl0ZXJhdHVyZTogcmVzb3VyY2UubGl0ZXJhdHVyZSxcclxuICAgIGF0UGVyc29uYWw6IHJlc291cmNlLnBlcnNvbmFsLFxyXG4gICAgZXZlbnQ6IHJlc291cmNlLmV2ZW50VGV4dCxcclxuICB9LFxyXG5cclxuICBhY3Rpdml0eVR5cGVPcmRlcjogW1xyXG4gICAgJ2F0QXBwb2ludG1lbnQnLFxyXG4gICAgLy8gJ2F0TGl0ZXJhdHVyZScsIC8vIEZvciBbIzcyMDY3OTFdLCBXZSB3aWxsIGVuYWJsZSB0aGlzIGxhdGVyLlxyXG4gICAgJ2F0UGVyc29uYWwnLFxyXG4gICAgJ2F0UGhvbmVDYWxsJyxcclxuICAgICdhdFRvRG8nLFxyXG4gICAgJ2V2ZW50JyxcclxuICBdLFxyXG4gIGV4cG9zZTogZmFsc2UsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBlbmFibGVQdWxsVG9SZWZyZXNoOiBmYWxzZSxcclxuICBpZDogJ2FjdGl2aXR5X3R5cGVzX2xpc3QnLFxyXG4gIGVkaXRWaWV3OiAnYWN0aXZpdHlfZWRpdCcsXHJcbiAgZXZlbnRFZGl0VmlldzogJ2V2ZW50X2VkaXQnLFxyXG4gIGFsbG93U2VsZWN0aW9uOiB0cnVlLCAvLyBhZGRzIGxpc3Qtc2hvdy1zZWxlY3RvcnMgY2xhc3MgdG8gbGlzdHZpZXcgZm9yIGRpc3BsYXlpbmcgaWNvbnNcclxuICBhY3Rpdml0eVR5cGVJY29uOiBhY3Rpdml0eVR5cGVJY29ucy5kZWZhdWx0LFxyXG4gIGFjdGl2YXRlRW50cnk6IGZ1bmN0aW9uIGFjdGl2YXRlRW50cnkocGFyYW1zKSB7XHJcbiAgICBpZiAocGFyYW1zLmtleSkge1xyXG4gICAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoKHBhcmFtcy5rZXkgPT09ICdldmVudCcpID8gdGhpcy5ldmVudEVkaXRWaWV3IDogdGhpcy5lZGl0Vmlldyk7XHJcblxyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuc291cmNlO1xyXG4gICAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgICAgICBlbnRyeTogKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZW50cnkpIHx8IG51bGwsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBhY3Rpdml0eVR5cGU6IHBhcmFtcy5rZXksXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5hY3Rpdml0eVR5cGVUZXh0W3BhcmFtcy5rZXldLFxyXG4gICAgICAgICAgcmV0dXJuVG86IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucmV0dXJuVG8sXHJcbiAgICAgICAgICBjdXJyZW50RGF0ZTogdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICByZXR1cm5UbzogLTEsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHJlZnJlc2hSZXF1aXJlZEZvcjogZnVuY3Rpb24gcmVmcmVzaFJlcXVpcmVkRm9yKG9wdGlvbnMpIHtcclxuICAgIGxldCB0b1JldHVybjtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgdG9SZXR1cm4gPSBvcHRpb25zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9SZXR1cm4gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xyXG4gIH0sXHJcbiAgaGFzTW9yZURhdGE6IGZ1bmN0aW9uIGhhc01vcmVEYXRhKCkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgY3JlYXRlU3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xyXG4gICAgY29uc3QgbGlzdCA9IFtdO1xyXG4gICAgY29uc3QgZXZlbnRWaWV3cyA9IFtcclxuICAgICAgJ2NhbGVuZGFyX3ZpZXcnLFxyXG4gICAgICAnY2FsZW5kYXJfbW9udGhsaXN0JyxcclxuICAgICAgJ2NhbGVuZGFyX3dlZWtsaXN0JyxcclxuICAgICAgJ2NhbGVuZGFyX2RheWxpc3QnLFxyXG4gICAgICAnY2FsZW5kYXJfeWVhcmxpc3QnLFxyXG4gICAgXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZpdHlUeXBlT3JkZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGlzdC5wdXNoKHtcclxuICAgICAgICAka2V5OiB0aGlzLmFjdGl2aXR5VHlwZU9yZGVyW2ldLFxyXG4gICAgICAgICRkZXNjcmlwdG9yOiB0aGlzLmFjdGl2aXR5VHlwZVRleHRbdGhpcy5hY3Rpdml0eVR5cGVPcmRlcltpXV0sXHJcbiAgICAgICAgaWNvbjogdGhpcy5hY3Rpdml0eVR5cGVJY29uW3RoaXMuYWN0aXZpdHlUeXBlT3JkZXJbaV1dLFxyXG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aXZpdHlUeXBlT3JkZXJbaV0sXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChldmVudFZpZXdzLmluZGV4T2YodGhpcy5vcHRpb25zLnJldHVyblRvKSA9PT0gLTEpIHtcclxuICAgICAgbGlzdC5wb3AoKTsgLy8gcmVtb3ZlIGV2ZW50IGZvciBub24gZXZlbnQgdmlld3NcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBNZW1vcnlTdG9yZSh7XHJcbiAgICAgIGRhdGE6IGxpc3QsXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdG9yZTtcclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgb25UcmFuc2l0aW9uQXdheTogZnVuY3Rpb24gb25UcmFuc2l0aW9uQXdheSgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB0aGlzLnN0b3JlID0gbnVsbDtcclxuICB9LFxyXG4gIGNyZWF0ZVRvb2xMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZVRvb2xMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b29scyB8fCAodGhpcy50b29scyA9IHtcclxuICAgICAgdGJhcjogW10sXHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==