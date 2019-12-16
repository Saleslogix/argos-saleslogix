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