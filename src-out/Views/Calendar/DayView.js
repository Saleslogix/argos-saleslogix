define('crm/Views/Calendar/DayView', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', 'argos/ErrorManager', 'argos/Convert', 'argos/List', 'argos/_LegacySDataListMixin', 'argos/I18n', '../../Models/Activity/ActivityTypeIcon'], function (module, exports, _declare, _string, _ErrorManager, _Convert, _List, _LegacySDataListMixin2, _I18n, _ActivityTypeIcon) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _List2 = _interopRequireDefault(_List);

  var _LegacySDataListMixin3 = _interopRequireDefault(_LegacySDataListMixin2);

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

  var resource = (0, _I18n2.default)('calendarDayView');
  var dtFormatResource = (0, _I18n2.default)('calendarDayViewDateTimeFormat');

  /**
   * @class crm.Views.Calendar.DayView
   *
   * @extends argos.List
   * @mixins argos.List
   * @mixins argos._LegacySDataListMixin
   *
   * @requires argos.List
   * @requires argos._LegacySDataListMixin
   * @requires argos.Convert
   * @requires argos.ErrorManager
   *
   * @requires moment
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Calendar.DayView', [_List2.default, _LegacySDataListMixin3.default], {
    // Localization
    titleText: resource.titleText,
    eventDateFormatText: dtFormatResource.eventDateFormatText,
    dateHeaderFormatText: dtFormatResource.dateHeaderFormatText,
    startTimeFormatText: dtFormatResource.startTimeFormatText,
    startTimeFormatText24: dtFormatResource.startTimeFormatText24,
    todayText: resource.todayText,
    dayText: resource.dayText,
    weekText: resource.weekText,
    monthText: resource.monthText,
    allDayText: resource.allDayText,
    eventHeaderText: resource.eventHeaderText,
    activityHeaderText: resource.activityHeaderText,
    eventMoreText: resource.eventMoreText,
    toggleCollapseText: resource.toggleCollapseText,

    enablePullToRefresh: false,
    toggleCollapseClass: 'fa fa-chevron-down',
    toggleExpandClass: 'fa fa-chevron-right',

    // Templates
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '<div data-dojo-attach-point="searchNode"></div>', '{%! $.navigationTemplate %}', '<div style="clear:both"></div>', '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">', '<h2 data-action="toggleGroup"><button data-dojo-attach-point="collapseButton" class="{%= $$.toggleCollapseClass %}" aria-label="{%: $$.toggleCollapseText %}"></button>{%= $.eventHeaderText %}</h2>', '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>', '{%! $.eventMoreTemplate %}', '</div>', '<h2>{%= $.activityHeaderText %}</h2>', '<ul class="list-content" data-dojo-attach-point="contentNode"></ul>', '{%! $.moreTemplate %}', '</div>']),
    rowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.Description %}" data-activity-type="{%: $.Type %}">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityTypeIcon[$.Type] %}">', '</button>', '</td>', '<td class="entry-table-time">{%! $$.timeTemplate %}</td>', '<td class="entry-table-description">{%! $$.itemTemplate %}</td>', '</tr></table>', '</li>']),
    eventRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityTypeIcon.event %}">', '</button>', '</td>', '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>', '</tr></table>', '</li>']),
    timeTemplate: new Simplate(['{% if ($.Timeless) { %}', '<span class="p-time">{%= $$.allDayText %}</span>', '{% } else { %}', '<span class="p-time">{%: crm.Format.date($.StartDate, (App.is24HourClock()) ? $$.startTimeFormatText24 : $$.startTimeFormatText) %}</span>', '{% } %}']),
    itemTemplate: new Simplate(['<p class="listview-heading p-description">{%: $.Description %}</p>', '<p class="micro-text">{%= $$.nameTemplate.apply($) %}</p>']),
    eventItemTemplate: new Simplate(['<p class="listview-heading p-description">{%: $.Description %} ({%: $.Type %})</p>', '<p class="micro-text">{%! $$.eventNameTemplate %}</p>']),
    nameTemplate: new Simplate(['{% if ($.ContactName) { %}', '{%: $.ContactName %} / {%: $.AccountName %}', '{% } else if ($.AccountName) { %}', '{%: $.AccountName %}', '{% } else { %}', '{%: $.LeadName %}', '{% } %}']),
    eventNameTemplate: new Simplate(['{%: crm.Format.date($.StartDate, $$.eventDateFormatText) %}', '&nbsp;-&nbsp;', '{%: crm.Format.date($.EndDate, $$.eventDateFormatText) %}']),
    navigationTemplate: new Simplate(['<div class="split-buttons">', '<button data-tool="today" data-action="getToday" class="button">{%: $.todayText %}</button>', '<button data-tool="selectdate" data-action="selectDate" class="button fa fa-calendar"><span></span></button>', '<button data-tool="day" class="button current">{%: $.dayText %}</button>', '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>', '<button data-tool="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>', '</div>', '<div class="nav-bar">', '<button data-tool="next" data-action="getNextDay" class="button button-next fa fa-arrow-right fa-lg"><span></span></button>', '<button data-tool="prev" data-action="getPrevDay" class="button button-prev fa fa-arrow-left fa-lg"><span></span></button>', '<h4 class="date-text" data-dojo-attach-point="dateNode"></h4>', '</div>']),
    eventMoreTemplate: new Simplate(['<div class="list-more" data-dojo-attach-point="eventMoreNode">', '<button class="button" data-action="activateEventMore">', '<span data-dojo-attach-point="eventRemainingContentNode">{%= $.eventMoreText %}</span>', '</button>', '</div>']),
    attributeMap: {
      listContent: {
        node: 'contentNode',
        type: 'innerHTML'
      },
      eventListContent: {
        node: 'eventContentNode',
        type: 'innerHTML'
      },
      dateContent: {
        node: 'dateNode',
        type: 'innerHTML'
      },
      eventRemainingContent: {
        node: 'eventRemainingContentNode',
        type: 'innerHTML'
      },
      remainingContent: {
        node: 'remainingContentNode',
        type: 'innerHTML'
      }
    },

    // View Properties
    id: 'calendar_daylist',
    cls: 'activities-for-day',
    iconClass: 'fa fa-calendar fa-lg',

    datePickerView: 'generic_calendar',
    monthView: 'calendar_monthlist',
    weekView: 'calendar_weeklist',
    activityDetailView: 'activity_detail',
    eventDetailView: 'event_detail',
    insertView: 'activity_types_list',
    enableSearch: false,
    currentDate: null,
    contractName: 'system',
    queryOrderBy: 'StartDate desc',
    querySelect: ['Description', 'StartDate', 'Type', 'AccountName', 'ContactName', 'LeadId', 'LeadName', 'UserId', 'Timeless', 'Recurring'],
    eventFeed: null,
    eventPageSize: 3,
    eventQuerySelect: ['StartDate', 'EndDate', 'Description', 'Type'],
    activityTypeIcon: activityTypeIcons.default,
    resourceKind: 'activities',
    pageSize: 1000,
    expose: false,

    continuousScrolling: false,

    _onRefresh: function _onRefresh(o) {
      this.inherited(_onRefresh, arguments);
      if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
        this.refreshRequired = true;
      }
    },
    init: function init() {
      this.inherited(init, arguments);
      this.currentDate = moment().startOf('day');
    },
    toggleGroup: function toggleGroup(params) {
      var node = params.$source;
      if (node && node.parentNode) {
        $(node).toggleClass('collapsed');
        $(node.parentNode).toggleClass('collapsed-event');

        var button = this.collapseButton;

        if (button) {
          $(button).toggleClass(this.toggleCollapseClass);
          $(button).toggleClass(this.toggleExpandClass);
        }
      }
    },
    refresh: function refresh() {
      this.clear();

      this.options = this.options || {};
      this.options.where = this.formatQueryForActivities();
      this.feed = null;
      this.eventFeed = null;
      this.set('dateContent', this.currentDate.format(this.dateHeaderFormatText));

      this.requestData();
      this.requestEventData();
    },
    requestEventData: function requestEventData() {
      var request = this.createEventRequest();
      request.read({
        success: this.onRequestEventDataSuccess,
        failure: this.onRequestEventDataFailure,
        aborted: this.onRequestEventDataAborted,
        scope: this
      });
    },
    onRequestEventDataFailure: function onRequestEventDataFailure(response, o) {
      alert(_string2.default.substitute(this.requestErrorText, [response, o])); // eslint-disable-line
      _ErrorManager2.default.addError(response, o, this.options, 'failure');
    },
    onRequestEventDataAborted: function onRequestEventDataAborted() {
      this.options = false; // force a refresh
    },
    onRequestEventDataSuccess: function onRequestEventDataSuccess(feed) {
      this.processEventFeed(feed);
    },
    createEventRequest: function createEventRequest() {
      var eventSelect = this.eventQuerySelect;
      var eventWhere = this.getEventQuery();
      var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setCount(this.eventPageSize).setStartIndex(1).setResourceKind('events').setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(eventSelect).join(',')).setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, eventWhere);
      return request;
    },
    getEventQuery: function getEventQuery() {
      return _string2.default.substitute(['UserId eq "${0}" and (', '(StartDate gt @${1}@ or EndDate gt @${1}@) and ', 'StartDate lt @${2}@', ')'].join(''), [App.context.user && App.context.user.$key, _Convert2.default.toIsoStringFromDate(this.currentDate.clone().startOf('day').toDate()), _Convert2.default.toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate())]);
    },
    activateEventMore: function activateEventMore() {
      var view = App.getView('event_related');
      if (view) {
        var where = this.getEventQuery();
        view.show({
          where: where
        });
      }
    },
    hideEventList: function hideEventList() {
      $(this.eventContainerNode).addClass('event-hidden');
    },
    showEventList: function showEventList() {
      $(this.eventContainerNode).removeClass('event-hidden');
    },
    processEventFeed: function processEventFeed(feed) {
      var r = feed.$resources;
      var feedLength = r.length;
      var o = [];
      this.eventFeed = feed;

      if (feedLength === 0) {
        this.hideEventList();
        return false;
      }
      this.showEventList();

      for (var i = 0; i < feedLength; i++) {
        var row = r[i];
        row.isEvent = true;
        this.entries[row.$key] = row;
        o.push(this.eventRowTemplate.apply(row, this));
      }

      if (feed.$totalResults > feedLength) {
        $(this.eventContainerNode).addClass('list-has-more');
        this.set('eventRemainingContent', this.eventMoreText);
      } else {
        $(this.eventContainerNode).removeClass('list-has-more');
        this.set('eventRemainingContent', '');
      }

      this.set('eventListContent', o.join(''));
    },
    processFeed: function processFeed(feed) {
      var r = feed.$resources;
      var feedLength = r.length;
      var o = [];

      this.feed = feed;
      for (var i = 0; i < feedLength; i++) {
        var row = r[i];
        row.isEvent = false;
        this.entries[row.$key] = row;
        o.push(this.rowTemplate.apply(row, this));
      }

      // If we fetched a page that has no data due to un-reliable counts,
      // check if we fetched anything in the previous pages before assuming there is no data.
      if (feedLength === 0 && Object.keys(this.entries).length === 0) {
        this.set('listContent', this.noDataTemplate.apply(this));
        return false;
      }

      if (o.length > 0) {
        this.set('listContent', '');
        $(this.contentNode).append(o.join(''));
      }

      this.set('remainingContent', ''); // Feed does not return reliable data, don't show remaining

      $(this.domNode).toggleClass('list-has-more', this.hasMoreData()); // This could be wrong, handle it on the next processFeed if so

      if (this.options.allowEmptySelection) {
        $(this.domNode).addClass('list-has-empty-opt');
      }

      this._loadPreviousSelections();
    },
    show: function show(options) {
      if (options) {
        this.processShowOptions(options);
      }

      var theOptions = options || {};
      theOptions.where = this.formatQueryForActivities();

      this.set('dateContent', this.currentDate.format(this.dateHeaderFormatText));
      this.inherited(arguments, [theOptions]);
    },
    processShowOptions: function processShowOptions(options) {
      if (options.currentDate) {
        this.currentDate = moment(options.currentDate).startOf('day') || moment().startOf('day');
        this.refreshRequired = true;
      }
    },
    isLoading: function isLoading() {
      return $(this.domNode).hasClass('list-loading');
    },
    getNextDay: function getNextDay() {
      if (this.isLoading()) {
        return;
      }

      this.currentDate.add({
        days: 1
      });
      this.refresh();
    },
    getToday: function getToday() {
      if (this.isLoading()) {
        return;
      }

      if (this.currentDate === moment().startOf('day')) {
        return;
      }

      this.currentDate = moment().startOf('day');
      this.refresh();
    },
    getPrevDay: function getPrevDay() {
      if (this.isLoading()) {
        return;
      }

      this.currentDate.subtract({
        days: 1
      });
      this.refresh();
    },
    formatQueryForActivities: function formatQueryForActivities() {
      var queryWhere = ['UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (', '(Timeless eq false and StartDate between @${1}@ and @${2}@) or ', '(Timeless eq true and StartDate between @${3}@ and @${4}@))'].join('');

      var startDate = this.currentDate.clone().startOf('day').toDate();
      var endDate = this.currentDate.clone().endOf('day').toDate();

      return _string2.default.substitute(queryWhere, [App.context.user && App.context.user.$key, _Convert2.default.toIsoStringFromDate(startDate), _Convert2.default.toIsoStringFromDate(endDate), this.currentDate.format('YYYY-MM-DDT00:00:00[Z]'), this.currentDate.format('YYYY-MM-DDT23:59:59[Z]')]);
    },
    selectEntry: function selectEntry(params) {
      var row = $(params.$source).closest('[data-key]')[0];
      var key = row ? row.getAttribute('data-key') : false;

      this.navigateToDetailView(key);
    },
    selectDate: function selectDate() {
      var options = {
        date: this.currentDate,
        showTimePicker: false,
        timeless: false,
        tools: {
          tbar: [{
            id: 'complete',
            cls: 'fa fa-check fa-fw fa-lg',
            fn: this.selectDateSuccess,
            scope: this
          }, {
            id: 'cancel',
            side: 'left',
            cls: 'fa fa-ban fa-fw fa-lg',
            fn: ReUI.back,
            scope: ReUI
          }]
        }
      };
      var view = App.getView(this.datePickerView);
      if (view) {
        view.show(options);
      }
    },
    selectDateSuccess: function selectDateSuccess() {
      var view = App.getPrimaryActiveView();
      this.currentDate = moment(view.getDateTime()).startOf('day');
      this.refresh();
      ReUI.back();
    },
    navigateToWeekView: function navigateToWeekView() {
      var view = App.getView(this.weekView);
      var navDate = this.currentDate ? this.currentDate : moment().startOf('day');
      var options = {
        currentDate: navDate.valueOf()
      };
      view.show(options);
    },
    navigateToMonthView: function navigateToMonthView() {
      var view = App.getView(this.monthView);
      var navDate = this.currentDate ? this.currentDate : moment().startOf('day');
      var options = {
        currentDate: navDate.valueOf()
      };
      view.show(options);
    },
    navigateToInsertView: function navigateToInsertView() {
      var view = App.getView(this.insertView || this.editView);

      this.options.currentDate = this.currentDate.format('YYYY-MM-DD') || moment().startOf('day');
      if (view) {
        view.show({
          negateHistory: true,
          returnTo: this.id,
          insert: true,
          currentDate: this.options.currentDate.valueOf()
        });
      }
    },
    navigateToDetailView: function navigateToDetailView(key, descriptor) {
      var entry = this.entries[key];
      var detailView = entry.isEvent ? this.eventDetailView : this.activityDetailView;
      var view = App.getView(detailView);

      var theDescriptor = entry.isEvent ? descriptor : entry.Description;
      if (view) {
        view.show({
          title: theDescriptor,
          key: key
        });
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DYWxlbmRhci9EYXlWaWV3LmpzIl0sIm5hbWVzIjpbImFjdGl2aXR5VHlwZUljb25zIiwicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsImV2ZW50RGF0ZUZvcm1hdFRleHQiLCJkYXRlSGVhZGVyRm9ybWF0VGV4dCIsInN0YXJ0VGltZUZvcm1hdFRleHQiLCJzdGFydFRpbWVGb3JtYXRUZXh0MjQiLCJ0b2RheVRleHQiLCJkYXlUZXh0Iiwid2Vla1RleHQiLCJtb250aFRleHQiLCJhbGxEYXlUZXh0IiwiZXZlbnRIZWFkZXJUZXh0IiwiYWN0aXZpdHlIZWFkZXJUZXh0IiwiZXZlbnRNb3JlVGV4dCIsInRvZ2dsZUNvbGxhcHNlVGV4dCIsImVuYWJsZVB1bGxUb1JlZnJlc2giLCJ0b2dnbGVDb2xsYXBzZUNsYXNzIiwidG9nZ2xlRXhwYW5kQ2xhc3MiLCJ3aWRnZXRUZW1wbGF0ZSIsIlNpbXBsYXRlIiwicm93VGVtcGxhdGUiLCJldmVudFJvd1RlbXBsYXRlIiwidGltZVRlbXBsYXRlIiwiaXRlbVRlbXBsYXRlIiwiZXZlbnRJdGVtVGVtcGxhdGUiLCJuYW1lVGVtcGxhdGUiLCJldmVudE5hbWVUZW1wbGF0ZSIsIm5hdmlnYXRpb25UZW1wbGF0ZSIsImV2ZW50TW9yZVRlbXBsYXRlIiwiYXR0cmlidXRlTWFwIiwibGlzdENvbnRlbnQiLCJub2RlIiwidHlwZSIsImV2ZW50TGlzdENvbnRlbnQiLCJkYXRlQ29udGVudCIsImV2ZW50UmVtYWluaW5nQ29udGVudCIsInJlbWFpbmluZ0NvbnRlbnQiLCJpZCIsImNscyIsImljb25DbGFzcyIsImRhdGVQaWNrZXJWaWV3IiwibW9udGhWaWV3Iiwid2Vla1ZpZXciLCJhY3Rpdml0eURldGFpbFZpZXciLCJldmVudERldGFpbFZpZXciLCJpbnNlcnRWaWV3IiwiZW5hYmxlU2VhcmNoIiwiY3VycmVudERhdGUiLCJjb250cmFjdE5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsImV2ZW50RmVlZCIsImV2ZW50UGFnZVNpemUiLCJldmVudFF1ZXJ5U2VsZWN0IiwiYWN0aXZpdHlUeXBlSWNvbiIsImRlZmF1bHQiLCJyZXNvdXJjZUtpbmQiLCJwYWdlU2l6ZSIsImV4cG9zZSIsImNvbnRpbnVvdXNTY3JvbGxpbmciLCJfb25SZWZyZXNoIiwibyIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInJlZnJlc2hSZXF1aXJlZCIsImluaXQiLCJtb21lbnQiLCJzdGFydE9mIiwidG9nZ2xlR3JvdXAiLCJwYXJhbXMiLCIkc291cmNlIiwicGFyZW50Tm9kZSIsIiQiLCJ0b2dnbGVDbGFzcyIsImJ1dHRvbiIsImNvbGxhcHNlQnV0dG9uIiwicmVmcmVzaCIsImNsZWFyIiwib3B0aW9ucyIsIndoZXJlIiwiZm9ybWF0UXVlcnlGb3JBY3Rpdml0aWVzIiwiZmVlZCIsInNldCIsImZvcm1hdCIsInJlcXVlc3REYXRhIiwicmVxdWVzdEV2ZW50RGF0YSIsInJlcXVlc3QiLCJjcmVhdGVFdmVudFJlcXVlc3QiLCJyZWFkIiwic3VjY2VzcyIsIm9uUmVxdWVzdEV2ZW50RGF0YVN1Y2Nlc3MiLCJmYWlsdXJlIiwib25SZXF1ZXN0RXZlbnREYXRhRmFpbHVyZSIsImFib3J0ZWQiLCJvblJlcXVlc3RFdmVudERhdGFBYm9ydGVkIiwic2NvcGUiLCJyZXNwb25zZSIsImFsZXJ0Iiwic3Vic3RpdHV0ZSIsInJlcXVlc3RFcnJvclRleHQiLCJhZGRFcnJvciIsInByb2Nlc3NFdmVudEZlZWQiLCJldmVudFNlbGVjdCIsImV2ZW50V2hlcmUiLCJnZXRFdmVudFF1ZXJ5IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFSZXNvdXJjZUNvbGxlY3Rpb25SZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldENvdW50Iiwic2V0U3RhcnRJbmRleCIsInNldFJlc291cmNlS2luZCIsInNldFF1ZXJ5QXJnIiwiU0RhdGFVcmkiLCJRdWVyeUFyZ05hbWVzIiwiU2VsZWN0IiwiZXhwYW5kRXhwcmVzc2lvbiIsImpvaW4iLCJXaGVyZSIsIkFwcCIsImNvbnRleHQiLCJ1c2VyIiwiJGtleSIsInRvSXNvU3RyaW5nRnJvbURhdGUiLCJjbG9uZSIsInRvRGF0ZSIsImVuZE9mIiwiYWN0aXZhdGVFdmVudE1vcmUiLCJ2aWV3IiwiZ2V0VmlldyIsInNob3ciLCJoaWRlRXZlbnRMaXN0IiwiZXZlbnRDb250YWluZXJOb2RlIiwiYWRkQ2xhc3MiLCJzaG93RXZlbnRMaXN0IiwicmVtb3ZlQ2xhc3MiLCJyIiwiJHJlc291cmNlcyIsImZlZWRMZW5ndGgiLCJsZW5ndGgiLCJpIiwicm93IiwiaXNFdmVudCIsImVudHJpZXMiLCJwdXNoIiwiYXBwbHkiLCIkdG90YWxSZXN1bHRzIiwicHJvY2Vzc0ZlZWQiLCJPYmplY3QiLCJrZXlzIiwibm9EYXRhVGVtcGxhdGUiLCJjb250ZW50Tm9kZSIsImFwcGVuZCIsImRvbU5vZGUiLCJoYXNNb3JlRGF0YSIsImFsbG93RW1wdHlTZWxlY3Rpb24iLCJfbG9hZFByZXZpb3VzU2VsZWN0aW9ucyIsInByb2Nlc3NTaG93T3B0aW9ucyIsInRoZU9wdGlvbnMiLCJpc0xvYWRpbmciLCJoYXNDbGFzcyIsImdldE5leHREYXkiLCJhZGQiLCJkYXlzIiwiZ2V0VG9kYXkiLCJnZXRQcmV2RGF5Iiwic3VidHJhY3QiLCJxdWVyeVdoZXJlIiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsInNlbGVjdEVudHJ5IiwiY2xvc2VzdCIsImtleSIsImdldEF0dHJpYnV0ZSIsIm5hdmlnYXRlVG9EZXRhaWxWaWV3Iiwic2VsZWN0RGF0ZSIsImRhdGUiLCJzaG93VGltZVBpY2tlciIsInRpbWVsZXNzIiwidG9vbHMiLCJ0YmFyIiwiZm4iLCJzZWxlY3REYXRlU3VjY2VzcyIsInNpZGUiLCJSZVVJIiwiYmFjayIsImdldFByaW1hcnlBY3RpdmVWaWV3IiwiZ2V0RGF0ZVRpbWUiLCJuYXZpZ2F0ZVRvV2Vla1ZpZXciLCJuYXZEYXRlIiwidmFsdWVPZiIsIm5hdmlnYXRlVG9Nb250aFZpZXciLCJuYXZpZ2F0ZVRvSW5zZXJ0VmlldyIsImVkaXRWaWV3IiwibmVnYXRlSGlzdG9yeSIsInJldHVyblRvIiwiaW5zZXJ0IiwiZGVzY3JpcHRvciIsImVudHJ5IiwiZGV0YWlsVmlldyIsInRoZURlc2NyaXB0b3IiLCJEZXNjcmlwdGlvbiIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bc0JZQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXRCWjs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1DLFdBQVcsb0JBQVksaUJBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksK0JBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU1DLFVBQVUsdUJBQVEsNEJBQVIsRUFBc0MsZ0RBQXRDLEVBQXFFO0FBQ25GO0FBQ0FDLGVBQVdILFNBQVNHLFNBRitEO0FBR25GQyx5QkFBcUJILGlCQUFpQkcsbUJBSDZDO0FBSW5GQywwQkFBc0JKLGlCQUFpQkksb0JBSjRDO0FBS25GQyx5QkFBcUJMLGlCQUFpQkssbUJBTDZDO0FBTW5GQywyQkFBdUJOLGlCQUFpQk0scUJBTjJDO0FBT25GQyxlQUFXUixTQUFTUSxTQVArRDtBQVFuRkMsYUFBU1QsU0FBU1MsT0FSaUU7QUFTbkZDLGNBQVVWLFNBQVNVLFFBVGdFO0FBVW5GQyxlQUFXWCxTQUFTVyxTQVYrRDtBQVduRkMsZ0JBQVlaLFNBQVNZLFVBWDhEO0FBWW5GQyxxQkFBaUJiLFNBQVNhLGVBWnlEO0FBYW5GQyx3QkFBb0JkLFNBQVNjLGtCQWJzRDtBQWNuRkMsbUJBQWVmLFNBQVNlLGFBZDJEO0FBZW5GQyx3QkFBb0JoQixTQUFTZ0Isa0JBZnNEOztBQWlCbkZDLHlCQUFxQixLQWpCOEQ7QUFrQm5GQyx5QkFBcUIsb0JBbEI4RDtBQW1CbkZDLHVCQUFtQixxQkFuQmdFOztBQXFCbkY7QUFDQUMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxDQUMzQix5S0FEMkIsRUFFM0IsaURBRjJCLEVBRzNC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RCxPQUFQLEdBQWtCLEtBQUtuRyxlQUF2QixHQUF5QyxLQUFLRCxrQkFBakU7QUFDQSxVQUFNc0YsT0FBT1QsSUFBSVUsT0FBSixDQUFZc0UsVUFBWixDQUFiOztBQUVBLFVBQU1DLGdCQUFpQkYsTUFBTXhELE9BQVAsR0FBa0J1RCxVQUFsQixHQUErQkMsTUFBTUcsV0FBM0Q7QUFDQSxVQUFJekUsSUFBSixFQUFVO0FBQ1JBLGFBQUtFLElBQUwsQ0FBVTtBQUNSd0UsaUJBQU9GLGFBREM7QUFFUjVCO0FBRlEsU0FBVjtBQUlEO0FBQ0Y7QUFuZWtGLEdBQXJFLENBQWhCOztvQkFzZWU3SyxPIiwiZmlsZSI6IkRheVZpZXcuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBfTGVnYWN5U0RhdGFMaXN0TWl4aW4gZnJvbSAnYXJnb3MvX0xlZ2FjeVNEYXRhTGlzdE1peGluJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgKiBhcyBhY3Rpdml0eVR5cGVJY29ucyBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlSWNvbic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdjYWxlbmRhckRheVZpZXcnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdjYWxlbmRhckRheVZpZXdEYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQ2FsZW5kYXIuRGF5Vmlld1xyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgYXJnb3MuTGlzdFxyXG4gKiBAbWl4aW5zIGFyZ29zLl9MZWdhY3lTRGF0YUxpc3RNaXhpblxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuTGlzdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuX0xlZ2FjeVNEYXRhTGlzdE1peGluXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5Db252ZXJ0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FcnJvck1hbmFnZXJcclxuICpcclxuICogQHJlcXVpcmVzIG1vbWVudFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5DYWxlbmRhci5EYXlWaWV3JywgW0xpc3QsIF9MZWdhY3lTRGF0YUxpc3RNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBldmVudERhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmV2ZW50RGF0ZUZvcm1hdFRleHQsXHJcbiAgZGF0ZUhlYWRlckZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZGF0ZUhlYWRlckZvcm1hdFRleHQsXHJcbiAgc3RhcnRUaW1lRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydFRpbWVGb3JtYXRUZXh0LFxyXG4gIHN0YXJ0VGltZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydFRpbWVGb3JtYXRUZXh0MjQsXHJcbiAgdG9kYXlUZXh0OiByZXNvdXJjZS50b2RheVRleHQsXHJcbiAgZGF5VGV4dDogcmVzb3VyY2UuZGF5VGV4dCxcclxuICB3ZWVrVGV4dDogcmVzb3VyY2Uud2Vla1RleHQsXHJcbiAgbW9udGhUZXh0OiByZXNvdXJjZS5tb250aFRleHQsXHJcbiAgYWxsRGF5VGV4dDogcmVzb3VyY2UuYWxsRGF5VGV4dCxcclxuICBldmVudEhlYWRlclRleHQ6IHJlc291cmNlLmV2ZW50SGVhZGVyVGV4dCxcclxuICBhY3Rpdml0eUhlYWRlclRleHQ6IHJlc291cmNlLmFjdGl2aXR5SGVhZGVyVGV4dCxcclxuICBldmVudE1vcmVUZXh0OiByZXNvdXJjZS5ldmVudE1vcmVUZXh0LFxyXG4gIHRvZ2dsZUNvbGxhcHNlVGV4dDogcmVzb3VyY2UudG9nZ2xlQ29sbGFwc2VUZXh0LFxyXG5cclxuICBlbmFibGVQdWxsVG9SZWZyZXNoOiBmYWxzZSxcclxuICB0b2dnbGVDb2xsYXBzZUNsYXNzOiAnZmEgZmEtY2hldnJvbi1kb3duJyxcclxuICB0b2dnbGVFeHBhbmRDbGFzczogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnLFxyXG5cclxuICAvLyBUZW1wbGF0ZXNcclxuICB3aWRnZXRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGlkPVwieyU9ICQuaWQgJX1cIiBkYXRhLXRpdGxlPVwieyU9ICQudGl0bGVUZXh0ICV9XCIgY2xhc3M9XCJvdmVydGhyb3cgbGlzdCB7JT0gJC5jbHMgJX1cIiB7JSBpZiAoJC5yZXNvdXJjZUtpbmQpIHsgJX1kYXRhLXJlc291cmNlLWtpbmQ9XCJ7JT0gJC5yZXNvdXJjZUtpbmQgJX1cInslIH0gJX0+JyxcclxuICAgICc8ZGl2IGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJzZWFyY2hOb2RlXCI+PC9kaXY+JyxcclxuICAgICd7JSEgJC5uYXZpZ2F0aW9uVGVtcGxhdGUgJX0nLFxyXG4gICAgJzxkaXYgc3R5bGU9XCJjbGVhcjpib3RoXCI+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiZXZlbnQtY29udGVudCBldmVudC1oaWRkZW5cIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZXZlbnRDb250YWluZXJOb2RlXCI+JyxcclxuICAgICc8aDIgZGF0YS1hY3Rpb249XCJ0b2dnbGVHcm91cFwiPjxidXR0b24gZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImNvbGxhcHNlQnV0dG9uXCIgY2xhc3M9XCJ7JT0gJCQudG9nZ2xlQ29sbGFwc2VDbGFzcyAlfVwiIGFyaWEtbGFiZWw9XCJ7JTogJCQudG9nZ2xlQ29sbGFwc2VUZXh0ICV9XCI+PC9idXR0b24+eyU9ICQuZXZlbnRIZWFkZXJUZXh0ICV9PC9oMj4nLFxyXG4gICAgJzx1bCBjbGFzcz1cImxpc3QtY29udGVudFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJldmVudENvbnRlbnROb2RlXCI+PC91bD4nLFxyXG4gICAgJ3slISAkLmV2ZW50TW9yZVRlbXBsYXRlICV9JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzxoMj57JT0gJC5hY3Rpdml0eUhlYWRlclRleHQgJX08L2gyPicsXHJcbiAgICAnPHVsIGNsYXNzPVwibGlzdC1jb250ZW50XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImNvbnRlbnROb2RlXCI+PC91bD4nLFxyXG4gICAgJ3slISAkLm1vcmVUZW1wbGF0ZSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICByb3dUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8bGkgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUVudHJ5XCIgZGF0YS1rZXk9XCJ7JT0gJC4ka2V5ICV9XCIgZGF0YS1kZXNjcmlwdG9yPVwieyU6ICQuRGVzY3JpcHRpb24gJX1cIiBkYXRhLWFjdGl2aXR5LXR5cGU9XCJ7JTogJC5UeXBlICV9XCI+JyxcclxuICAgICc8dGFibGUgY2xhc3M9XCJjYWxlbmRhci1lbnRyeS10YWJsZVwiPjx0cj4nLFxyXG4gICAgJzx0ZCBjbGFzcz1cImVudHJ5LXRhYmxlLWljb25cIj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS1hY3Rpb249XCJzZWxlY3RFbnRyeVwiIGNsYXNzPVwibGlzdC1pdGVtLXNlbGVjdG9yIGJ1dHRvbiB7JT0gJCQuYWN0aXZpdHlUeXBlSWNvblskLlR5cGVdICV9XCI+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzwvdGQ+JyxcclxuICAgICc8dGQgY2xhc3M9XCJlbnRyeS10YWJsZS10aW1lXCI+eyUhICQkLnRpbWVUZW1wbGF0ZSAlfTwvdGQ+JyxcclxuICAgICc8dGQgY2xhc3M9XCJlbnRyeS10YWJsZS1kZXNjcmlwdGlvblwiPnslISAkJC5pdGVtVGVtcGxhdGUgJX08L3RkPicsXHJcbiAgICAnPC90cj48L3RhYmxlPicsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG4gIGV2ZW50Um93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFbnRyeVwiIGRhdGEta2V5PVwieyU9ICQuJGtleSAlfVwiIGRhdGEtZGVzY3JpcHRvcj1cInslOiAkLiRkZXNjcmlwdG9yICV9XCIgZGF0YS1hY3Rpdml0eS10eXBlPVwiRXZlbnRcIj4nLFxyXG4gICAgJzx0YWJsZSBjbGFzcz1cImNhbGVuZGFyLWVudHJ5LXRhYmxlXCI+PHRyPicsXHJcbiAgICAnPHRkIGNsYXNzPVwiZW50cnktdGFibGUtaWNvblwiPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLWFjdGlvbj1cInNlbGVjdEVudHJ5XCIgY2xhc3M9XCJsaXN0LWl0ZW0tc2VsZWN0b3IgYnV0dG9uIHslPSAkJC5hY3Rpdml0eVR5cGVJY29uLmV2ZW50ICV9XCI+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzwvdGQ+JyxcclxuICAgICc8dGQgY2xhc3M9XCJlbnRyeS10YWJsZS1kZXNjcmlwdGlvblwiPnslISAkJC5ldmVudEl0ZW1UZW1wbGF0ZSAlfTwvdGQ+JyxcclxuICAgICc8L3RyPjwvdGFibGU+JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcbiAgdGltZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkLlRpbWVsZXNzKSB7ICV9JyxcclxuICAgICc8c3BhbiBjbGFzcz1cInAtdGltZVwiPnslPSAkJC5hbGxEYXlUZXh0ICV9PC9zcGFuPicsXHJcbiAgICAneyUgfSBlbHNlIHsgJX0nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwicC10aW1lXCI+eyU6IGNybS5Gb3JtYXQuZGF0ZSgkLlN0YXJ0RGF0ZSwgKEFwcC5pczI0SG91ckNsb2NrKCkpID8gJCQuc3RhcnRUaW1lRm9ybWF0VGV4dDI0IDogJCQuc3RhcnRUaW1lRm9ybWF0VGV4dCkgJX08L3NwYW4+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nIHAtZGVzY3JpcHRpb25cIj57JTogJC5EZXNjcmlwdGlvbiAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslPSAkJC5uYW1lVGVtcGxhdGUuYXBwbHkoJCkgJX08L3A+JyxcclxuICBdKSxcclxuICBldmVudEl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmcgcC1kZXNjcmlwdGlvblwiPnslOiAkLkRlc2NyaXB0aW9uICV9ICh7JTogJC5UeXBlICV9KTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslISAkJC5ldmVudE5hbWVUZW1wbGF0ZSAlfTwvcD4nLFxyXG4gIF0pLFxyXG4gIG5hbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJC5Db250YWN0TmFtZSkgeyAlfScsXHJcbiAgICAneyU6ICQuQ29udGFjdE5hbWUgJX0gLyB7JTogJC5BY2NvdW50TmFtZSAlfScsXHJcbiAgICAneyUgfSBlbHNlIGlmICgkLkFjY291bnROYW1lKSB7ICV9JyxcclxuICAgICd7JTogJC5BY2NvdW50TmFtZSAlfScsXHJcbiAgICAneyUgfSBlbHNlIHsgJX0nLFxyXG4gICAgJ3slOiAkLkxlYWROYW1lICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICBldmVudE5hbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JTogY3JtLkZvcm1hdC5kYXRlKCQuU3RhcnREYXRlLCAkJC5ldmVudERhdGVGb3JtYXRUZXh0KSAlfScsXHJcbiAgICAnJm5ic3A7LSZuYnNwOycsXHJcbiAgICAneyU6IGNybS5Gb3JtYXQuZGF0ZSgkLkVuZERhdGUsICQkLmV2ZW50RGF0ZUZvcm1hdFRleHQpICV9JyxcclxuICBdKSxcclxuICBuYXZpZ2F0aW9uVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cInNwbGl0LWJ1dHRvbnNcIj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwidG9kYXlcIiBkYXRhLWFjdGlvbj1cImdldFRvZGF5XCIgY2xhc3M9XCJidXR0b25cIj57JTogJC50b2RheVRleHQgJX08L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwic2VsZWN0ZGF0ZVwiIGRhdGEtYWN0aW9uPVwic2VsZWN0RGF0ZVwiIGNsYXNzPVwiYnV0dG9uIGZhIGZhLWNhbGVuZGFyXCI+PHNwYW4+PC9zcGFuPjwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJkYXlcIiBjbGFzcz1cImJ1dHRvbiBjdXJyZW50XCI+eyU6ICQuZGF5VGV4dCAlfTwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJ3ZWVrXCIgZGF0YS1hY3Rpb249XCJuYXZpZ2F0ZVRvV2Vla1ZpZXdcIiBjbGFzcz1cImJ1dHRvblwiPnslOiAkLndlZWtUZXh0ICV9PC9idXR0b24+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtdG9vbD1cIm1vbnRoXCIgZGF0YS1hY3Rpb249XCJuYXZpZ2F0ZVRvTW9udGhWaWV3XCIgY2xhc3M9XCJidXR0b25cIj57JTogJC5tb250aFRleHQgJX08L2J1dHRvbj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cIm5hdi1iYXJcIj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwibmV4dFwiIGRhdGEtYWN0aW9uPVwiZ2V0TmV4dERheVwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1uZXh0IGZhIGZhLWFycm93LXJpZ2h0IGZhLWxnXCI+PHNwYW4+PC9zcGFuPjwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJwcmV2XCIgZGF0YS1hY3Rpb249XCJnZXRQcmV2RGF5XCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLXByZXYgZmEgZmEtYXJyb3ctbGVmdCBmYS1sZ1wiPjxzcGFuPjwvc3Bhbj48L2J1dHRvbj4nLFxyXG4gICAgJzxoNCBjbGFzcz1cImRhdGUtdGV4dFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJkYXRlTm9kZVwiPjwvaDQ+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGV2ZW50TW9yZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJsaXN0LW1vcmVcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZXZlbnRNb3JlTm9kZVwiPicsXHJcbiAgICAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFdmVudE1vcmVcIj4nLFxyXG4gICAgJzxzcGFuIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJldmVudFJlbWFpbmluZ0NvbnRlbnROb2RlXCI+eyU9ICQuZXZlbnRNb3JlVGV4dCAlfTwvc3Bhbj4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBhdHRyaWJ1dGVNYXA6IHtcclxuICAgIGxpc3RDb250ZW50OiB7XHJcbiAgICAgIG5vZGU6ICdjb250ZW50Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICAgIGV2ZW50TGlzdENvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2V2ZW50Q29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBkYXRlQ29udGVudDoge1xyXG4gICAgICBub2RlOiAnZGF0ZU5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBldmVudFJlbWFpbmluZ0NvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2V2ZW50UmVtYWluaW5nQ29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICByZW1haW5pbmdDb250ZW50OiB7XHJcbiAgICAgIG5vZGU6ICdyZW1haW5pbmdDb250ZW50Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2NhbGVuZGFyX2RheWxpc3QnLFxyXG4gIGNsczogJ2FjdGl2aXRpZXMtZm9yLWRheScsXHJcbiAgaWNvbkNsYXNzOiAnZmEgZmEtY2FsZW5kYXIgZmEtbGcnLFxyXG5cclxuICBkYXRlUGlja2VyVmlldzogJ2dlbmVyaWNfY2FsZW5kYXInLFxyXG4gIG1vbnRoVmlldzogJ2NhbGVuZGFyX21vbnRobGlzdCcsXHJcbiAgd2Vla1ZpZXc6ICdjYWxlbmRhcl93ZWVrbGlzdCcsXHJcbiAgYWN0aXZpdHlEZXRhaWxWaWV3OiAnYWN0aXZpdHlfZGV0YWlsJyxcclxuICBldmVudERldGFpbFZpZXc6ICdldmVudF9kZXRhaWwnLFxyXG4gIGluc2VydFZpZXc6ICdhY3Rpdml0eV90eXBlc19saXN0JyxcclxuICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gIGN1cnJlbnREYXRlOiBudWxsLFxyXG4gIGNvbnRyYWN0TmFtZTogJ3N5c3RlbScsXHJcbiAgcXVlcnlPcmRlckJ5OiAnU3RhcnREYXRlIGRlc2MnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAnVHlwZScsXHJcbiAgICAnQWNjb3VudE5hbWUnLFxyXG4gICAgJ0NvbnRhY3ROYW1lJyxcclxuICAgICdMZWFkSWQnLFxyXG4gICAgJ0xlYWROYW1lJyxcclxuICAgICdVc2VySWQnLFxyXG4gICAgJ1RpbWVsZXNzJyxcclxuICAgICdSZWN1cnJpbmcnLFxyXG4gIF0sXHJcbiAgZXZlbnRGZWVkOiBudWxsLFxyXG4gIGV2ZW50UGFnZVNpemU6IDMsXHJcbiAgZXZlbnRRdWVyeVNlbGVjdDogW1xyXG4gICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAnRW5kRGF0ZScsXHJcbiAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgJ1R5cGUnLFxyXG4gIF0sXHJcbiAgYWN0aXZpdHlUeXBlSWNvbjogYWN0aXZpdHlUeXBlSWNvbnMuZGVmYXVsdCxcclxuICByZXNvdXJjZUtpbmQ6ICdhY3Rpdml0aWVzJyxcclxuICBwYWdlU2l6ZTogMTAwMCxcclxuICBleHBvc2U6IGZhbHNlLFxyXG5cclxuICBjb250aW51b3VzU2Nyb2xsaW5nOiBmYWxzZSxcclxuXHJcbiAgX29uUmVmcmVzaDogZnVuY3Rpb24gX29uUmVmcmVzaChvKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChfb25SZWZyZXNoLCBhcmd1bWVudHMpO1xyXG4gICAgaWYgKG8ucmVzb3VyY2VLaW5kID09PSAnYWN0aXZpdGllcycgfHwgby5yZXNvdXJjZUtpbmQgPT09ICdldmVudHMnKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gIH0sXHJcbiAgdG9nZ2xlR3JvdXA6IGZ1bmN0aW9uIHRvZ2dsZUdyb3VwKHBhcmFtcykge1xyXG4gICAgY29uc3Qgbm9kZSA9IHBhcmFtcy4kc291cmNlO1xyXG4gICAgaWYgKG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XHJcbiAgICAgICQobm9kZSkudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG4gICAgICAkKG5vZGUucGFyZW50Tm9kZSkudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZC1ldmVudCcpO1xyXG5cclxuICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy5jb2xsYXBzZUJ1dHRvbjtcclxuXHJcbiAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAkKGJ1dHRvbikudG9nZ2xlQ2xhc3ModGhpcy50b2dnbGVDb2xsYXBzZUNsYXNzKTtcclxuICAgICAgICAkKGJ1dHRvbikudG9nZ2xlQ2xhc3ModGhpcy50b2dnbGVFeHBhbmRDbGFzcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IHt9O1xyXG4gICAgdGhpcy5vcHRpb25zLndoZXJlID0gdGhpcy5mb3JtYXRRdWVyeUZvckFjdGl2aXRpZXMoKTtcclxuICAgIHRoaXMuZmVlZCA9IG51bGw7XHJcbiAgICB0aGlzLmV2ZW50RmVlZCA9IG51bGw7XHJcbiAgICB0aGlzLnNldCgnZGF0ZUNvbnRlbnQnLCB0aGlzLmN1cnJlbnREYXRlLmZvcm1hdCh0aGlzLmRhdGVIZWFkZXJGb3JtYXRUZXh0KSk7XHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgdGhpcy5yZXF1ZXN0RXZlbnREYXRhKCk7XHJcbiAgfSxcclxuICByZXF1ZXN0RXZlbnREYXRhOiBmdW5jdGlvbiByZXF1ZXN0RXZlbnREYXRhKCkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuY3JlYXRlRXZlbnRSZXF1ZXN0KCk7XHJcbiAgICByZXF1ZXN0LnJlYWQoe1xyXG4gICAgICBzdWNjZXNzOiB0aGlzLm9uUmVxdWVzdEV2ZW50RGF0YVN1Y2Nlc3MsXHJcbiAgICAgIGZhaWx1cmU6IHRoaXMub25SZXF1ZXN0RXZlbnREYXRhRmFpbHVyZSxcclxuICAgICAgYWJvcnRlZDogdGhpcy5vblJlcXVlc3RFdmVudERhdGFBYm9ydGVkLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25SZXF1ZXN0RXZlbnREYXRhRmFpbHVyZTogZnVuY3Rpb24gb25SZXF1ZXN0RXZlbnREYXRhRmFpbHVyZShyZXNwb25zZSwgbykge1xyXG4gICAgYWxlcnQoc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5yZXF1ZXN0RXJyb3JUZXh0LCBbcmVzcG9uc2UsIG9dKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywgdGhpcy5vcHRpb25zLCAnZmFpbHVyZScpO1xyXG4gIH0sXHJcbiAgb25SZXF1ZXN0RXZlbnREYXRhQWJvcnRlZDogZnVuY3Rpb24gb25SZXF1ZXN0RXZlbnREYXRhQWJvcnRlZCgpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IGZhbHNlOyAvLyBmb3JjZSBhIHJlZnJlc2hcclxuICB9LFxyXG4gIG9uUmVxdWVzdEV2ZW50RGF0YVN1Y2Nlc3M6IGZ1bmN0aW9uIG9uUmVxdWVzdEV2ZW50RGF0YVN1Y2Nlc3MoZmVlZCkge1xyXG4gICAgdGhpcy5wcm9jZXNzRXZlbnRGZWVkKGZlZWQpO1xyXG4gIH0sXHJcbiAgY3JlYXRlRXZlbnRSZXF1ZXN0OiBmdW5jdGlvbiBjcmVhdGVFdmVudFJlcXVlc3QoKSB7XHJcbiAgICBjb25zdCBldmVudFNlbGVjdCA9IHRoaXMuZXZlbnRRdWVyeVNlbGVjdDtcclxuICAgIGNvbnN0IGV2ZW50V2hlcmUgPSB0aGlzLmdldEV2ZW50UXVlcnkoKTtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFSZXNvdXJjZUNvbGxlY3Rpb25SZXF1ZXN0KHRoaXMuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0Q291bnQodGhpcy5ldmVudFBhZ2VTaXplKVxyXG4gICAgICAuc2V0U3RhcnRJbmRleCgxKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKCdldmVudHMnKVxyXG4gICAgICAuc2V0UXVlcnlBcmcoU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFVcmkuUXVlcnlBcmdOYW1lcy5TZWxlY3QsIHRoaXMuZXhwYW5kRXhwcmVzc2lvbihldmVudFNlbGVjdCkuam9pbignLCcpKVxyXG4gICAgICAuc2V0UXVlcnlBcmcoU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFVcmkuUXVlcnlBcmdOYW1lcy5XaGVyZSwgZXZlbnRXaGVyZSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxuICB9LFxyXG4gIGdldEV2ZW50UXVlcnk6IGZ1bmN0aW9uIGdldEV2ZW50UXVlcnkoKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUoXHJcbiAgICAgIFtcclxuICAgICAgICAnVXNlcklkIGVxIFwiJHswfVwiIGFuZCAoJyxcclxuICAgICAgICAnKFN0YXJ0RGF0ZSBndCBAJHsxfUAgb3IgRW5kRGF0ZSBndCBAJHsxfUApIGFuZCAnLFxyXG4gICAgICAgICdTdGFydERhdGUgbHQgQCR7Mn1AJyxcclxuICAgICAgICAnKScsXHJcbiAgICAgIF0uam9pbignJyksIFtcclxuICAgICAgICBBcHAuY29udGV4dC51c2VyICYmIEFwcC5jb250ZXh0LnVzZXIuJGtleSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodGhpcy5jdXJyZW50RGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpLnRvRGF0ZSgpKSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodGhpcy5jdXJyZW50RGF0ZS5jbG9uZSgpLmVuZE9mKCdkYXknKS50b0RhdGUoKSksXHJcbiAgICAgIF1cclxuICAgICk7XHJcbiAgfSxcclxuICBhY3RpdmF0ZUV2ZW50TW9yZTogZnVuY3Rpb24gYWN0aXZhdGVFdmVudE1vcmUoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ2V2ZW50X3JlbGF0ZWQnKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIGNvbnN0IHdoZXJlID0gdGhpcy5nZXRFdmVudFF1ZXJ5KCk7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgd2hlcmUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaGlkZUV2ZW50TGlzdDogZnVuY3Rpb24gaGlkZUV2ZW50TGlzdCgpIHtcclxuICAgICQodGhpcy5ldmVudENvbnRhaW5lck5vZGUpLmFkZENsYXNzKCdldmVudC1oaWRkZW4nKTtcclxuICB9LFxyXG4gIHNob3dFdmVudExpc3Q6IGZ1bmN0aW9uIHNob3dFdmVudExpc3QoKSB7XHJcbiAgICAkKHRoaXMuZXZlbnRDb250YWluZXJOb2RlKS5yZW1vdmVDbGFzcygnZXZlbnQtaGlkZGVuJyk7XHJcbiAgfSxcclxuICBwcm9jZXNzRXZlbnRGZWVkOiBmdW5jdGlvbiBwcm9jZXNzRXZlbnRGZWVkKGZlZWQpIHtcclxuICAgIGNvbnN0IHIgPSBmZWVkLiRyZXNvdXJjZXM7XHJcbiAgICBjb25zdCBmZWVkTGVuZ3RoID0gci5sZW5ndGg7XHJcbiAgICBjb25zdCBvID0gW107XHJcbiAgICB0aGlzLmV2ZW50RmVlZCA9IGZlZWQ7XHJcblxyXG4gICAgaWYgKGZlZWRMZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5oaWRlRXZlbnRMaXN0KCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuc2hvd0V2ZW50TGlzdCgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmVlZExlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IHJbaV07XHJcbiAgICAgIHJvdy5pc0V2ZW50ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5lbnRyaWVzW3Jvdy4ka2V5XSA9IHJvdztcclxuICAgICAgby5wdXNoKHRoaXMuZXZlbnRSb3dUZW1wbGF0ZS5hcHBseShyb3csIHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmVlZC4kdG90YWxSZXN1bHRzID4gZmVlZExlbmd0aCkge1xyXG4gICAgICAkKHRoaXMuZXZlbnRDb250YWluZXJOb2RlKS5hZGRDbGFzcygnbGlzdC1oYXMtbW9yZScpO1xyXG4gICAgICB0aGlzLnNldCgnZXZlbnRSZW1haW5pbmdDb250ZW50JywgdGhpcy5ldmVudE1vcmVUZXh0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQodGhpcy5ldmVudENvbnRhaW5lck5vZGUpLnJlbW92ZUNsYXNzKCdsaXN0LWhhcy1tb3JlJyk7XHJcbiAgICAgIHRoaXMuc2V0KCdldmVudFJlbWFpbmluZ0NvbnRlbnQnLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXQoJ2V2ZW50TGlzdENvbnRlbnQnLCBvLmpvaW4oJycpKTtcclxuICB9LFxyXG4gIHByb2Nlc3NGZWVkOiBmdW5jdGlvbiBwcm9jZXNzRmVlZChmZWVkKSB7XHJcbiAgICBjb25zdCByID0gZmVlZC4kcmVzb3VyY2VzO1xyXG4gICAgY29uc3QgZmVlZExlbmd0aCA9IHIubGVuZ3RoO1xyXG4gICAgY29uc3QgbyA9IFtdO1xyXG5cclxuICAgIHRoaXMuZmVlZCA9IGZlZWQ7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZlZWRMZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCByb3cgPSByW2ldO1xyXG4gICAgICByb3cuaXNFdmVudCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmVudHJpZXNbcm93LiRrZXldID0gcm93O1xyXG4gICAgICBvLnB1c2godGhpcy5yb3dUZW1wbGF0ZS5hcHBseShyb3csIHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB3ZSBmZXRjaGVkIGEgcGFnZSB0aGF0IGhhcyBubyBkYXRhIGR1ZSB0byB1bi1yZWxpYWJsZSBjb3VudHMsXHJcbiAgICAvLyBjaGVjayBpZiB3ZSBmZXRjaGVkIGFueXRoaW5nIGluIHRoZSBwcmV2aW91cyBwYWdlcyBiZWZvcmUgYXNzdW1pbmcgdGhlcmUgaXMgbm8gZGF0YS5cclxuICAgIGlmIChmZWVkTGVuZ3RoID09PSAwICYmIE9iamVjdC5rZXlzKHRoaXMuZW50cmllcykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsIHRoaXMubm9EYXRhVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG8ubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnNldCgnbGlzdENvbnRlbnQnLCAnJyk7XHJcbiAgICAgICQodGhpcy5jb250ZW50Tm9kZSkuYXBwZW5kKG8uam9pbignJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0KCdyZW1haW5pbmdDb250ZW50JywgJycpOyAvLyBGZWVkIGRvZXMgbm90IHJldHVybiByZWxpYWJsZSBkYXRhLCBkb24ndCBzaG93IHJlbWFpbmluZ1xyXG5cclxuICAgICQodGhpcy5kb21Ob2RlKS50b2dnbGVDbGFzcygnbGlzdC1oYXMtbW9yZScsIHRoaXMuaGFzTW9yZURhdGEoKSk7IC8vIFRoaXMgY291bGQgYmUgd3JvbmcsIGhhbmRsZSBpdCBvbiB0aGUgbmV4dCBwcm9jZXNzRmVlZCBpZiBzb1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dFbXB0eVNlbGVjdGlvbikge1xyXG4gICAgICAkKHRoaXMuZG9tTm9kZSkuYWRkQ2xhc3MoJ2xpc3QtaGFzLWVtcHR5LW9wdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2xvYWRQcmV2aW91c1NlbGVjdGlvbnMoKTtcclxuICB9LFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3cob3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5wcm9jZXNzU2hvd09wdGlvbnMob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGhlT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICB0aGVPcHRpb25zLndoZXJlID0gdGhpcy5mb3JtYXRRdWVyeUZvckFjdGl2aXRpZXMoKTtcclxuXHJcbiAgICB0aGlzLnNldCgnZGF0ZUNvbnRlbnQnLCB0aGlzLmN1cnJlbnREYXRlLmZvcm1hdCh0aGlzLmRhdGVIZWFkZXJGb3JtYXRUZXh0KSk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMsIFt0aGVPcHRpb25zXSk7XHJcbiAgfSxcclxuICBwcm9jZXNzU2hvd09wdGlvbnM6IGZ1bmN0aW9uIHByb2Nlc3NTaG93T3B0aW9ucyhvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5jdXJyZW50RGF0ZSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnREYXRlID0gbW9tZW50KG9wdGlvbnMuY3VycmVudERhdGUpLnN0YXJ0T2YoJ2RheScpIHx8IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBpc0xvYWRpbmc6IGZ1bmN0aW9uIGlzTG9hZGluZygpIHtcclxuICAgIHJldHVybiAkKHRoaXMuZG9tTm9kZSkuaGFzQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gIH0sXHJcbiAgZ2V0TmV4dERheTogZnVuY3Rpb24gZ2V0TmV4dERheSgpIHtcclxuICAgIGlmICh0aGlzLmlzTG9hZGluZygpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnREYXRlLmFkZCh7XHJcbiAgICAgIGRheXM6IDEsXHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH0sXHJcbiAgZ2V0VG9kYXk6IGZ1bmN0aW9uIGdldFRvZGF5KCkge1xyXG4gICAgaWYgKHRoaXMuaXNMb2FkaW5nKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnREYXRlID09PSBtb21lbnQoKS5zdGFydE9mKCdkYXknKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfSxcclxuICBnZXRQcmV2RGF5OiBmdW5jdGlvbiBnZXRQcmV2RGF5KCkge1xyXG4gICAgaWYgKHRoaXMuaXNMb2FkaW5nKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudERhdGUuc3VidHJhY3Qoe1xyXG4gICAgICBkYXlzOiAxLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9LFxyXG4gIGZvcm1hdFF1ZXJ5Rm9yQWN0aXZpdGllczogZnVuY3Rpb24gZm9ybWF0UXVlcnlGb3JBY3Rpdml0aWVzKCkge1xyXG4gICAgY29uc3QgcXVlcnlXaGVyZSA9IFtcclxuICAgICAgJ1VzZXJBY3Rpdml0aWVzLlVzZXJJZCBlcSBcIiR7MH1cIiBhbmQgVHlwZSBuZSBcImF0TGl0ZXJhdHVyZVwiIGFuZCAoJyxcclxuICAgICAgJyhUaW1lbGVzcyBlcSBmYWxzZSBhbmQgU3RhcnREYXRlIGJldHdlZW4gQCR7MX1AIGFuZCBAJHsyfUApIG9yICcsXHJcbiAgICAgICcoVGltZWxlc3MgZXEgdHJ1ZSBhbmQgU3RhcnREYXRlIGJldHdlZW4gQCR7M31AIGFuZCBAJHs0fUApKScsXHJcbiAgICBdLmpvaW4oJycpO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuY3VycmVudERhdGUuY2xvbmUoKS5zdGFydE9mKCdkYXknKS50b0RhdGUoKTtcclxuICAgIGNvbnN0IGVuZERhdGUgPSB0aGlzLmN1cnJlbnREYXRlLmNsb25lKCkuZW5kT2YoJ2RheScpLnRvRGF0ZSgpO1xyXG5cclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShcclxuICAgICAgcXVlcnlXaGVyZSwgW0FwcC5jb250ZXh0LnVzZXIgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5LFxyXG4gICAgICAgIGNvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZShzdGFydERhdGUpLFxyXG4gICAgICAgIGNvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZShlbmREYXRlKSxcclxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpLFxyXG4gICAgICAgIHRoaXMuY3VycmVudERhdGUuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyksXHJcbiAgICAgIF1cclxuICAgICk7XHJcbiAgfSxcclxuICBzZWxlY3RFbnRyeTogZnVuY3Rpb24gc2VsZWN0RW50cnkocGFyYW1zKSB7XHJcbiAgICBjb25zdCByb3cgPSAkKHBhcmFtcy4kc291cmNlKS5jbG9zZXN0KCdbZGF0YS1rZXldJylbMF07XHJcbiAgICBjb25zdCBrZXkgPSByb3cgPyByb3cuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpIDogZmFsc2U7XHJcblxyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvRGV0YWlsVmlldyhrZXkpO1xyXG4gIH0sXHJcbiAgc2VsZWN0RGF0ZTogZnVuY3Rpb24gc2VsZWN0RGF0ZSgpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGRhdGU6IHRoaXMuY3VycmVudERhdGUsXHJcbiAgICAgIHNob3dUaW1lUGlja2VyOiBmYWxzZSxcclxuICAgICAgdGltZWxlc3M6IGZhbHNlLFxyXG4gICAgICB0b29sczoge1xyXG4gICAgICAgIHRiYXI6IFt7XHJcbiAgICAgICAgICBpZDogJ2NvbXBsZXRlJyxcclxuICAgICAgICAgIGNsczogJ2ZhIGZhLWNoZWNrIGZhLWZ3IGZhLWxnJyxcclxuICAgICAgICAgIGZuOiB0aGlzLnNlbGVjdERhdGVTdWNjZXNzLFxyXG4gICAgICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgaWQ6ICdjYW5jZWwnLFxyXG4gICAgICAgICAgc2lkZTogJ2xlZnQnLFxyXG4gICAgICAgICAgY2xzOiAnZmEgZmEtYmFuIGZhLWZ3IGZhLWxnJyxcclxuICAgICAgICAgIGZuOiBSZVVJLmJhY2ssXHJcbiAgICAgICAgICBzY29wZTogUmVVSSxcclxuICAgICAgICB9XSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5kYXRlUGlja2VyVmlldyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZWxlY3REYXRlU3VjY2VzczogZnVuY3Rpb24gc2VsZWN0RGF0ZVN1Y2Nlc3MoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFByaW1hcnlBY3RpdmVWaWV3KCk7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlID0gbW9tZW50KHZpZXcuZ2V0RGF0ZVRpbWUoKSkuc3RhcnRPZignZGF5Jyk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIFJlVUkuYmFjaygpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb1dlZWtWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvV2Vla1ZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy53ZWVrVmlldyk7XHJcbiAgICBjb25zdCBuYXZEYXRlID0gdGhpcy5jdXJyZW50RGF0ZSA/IHRoaXMuY3VycmVudERhdGUgOiBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGN1cnJlbnREYXRlOiBuYXZEYXRlLnZhbHVlT2YoKSxcclxuICAgIH07XHJcbiAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvTW9udGhWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvTW9udGhWaWV3KCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMubW9udGhWaWV3KTtcclxuICAgIGNvbnN0IG5hdkRhdGUgPSB0aGlzLmN1cnJlbnREYXRlID8gdGhpcy5jdXJyZW50RGF0ZSA6IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgY3VycmVudERhdGU6IG5hdkRhdGUudmFsdWVPZigpLFxyXG4gICAgfTtcclxuICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9JbnNlcnRWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvSW5zZXJ0VmlldygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmluc2VydFZpZXcgfHwgdGhpcy5lZGl0Vmlldyk7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zLmN1cnJlbnREYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSB8fCBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgbmVnYXRlSGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICByZXR1cm5UbzogdGhpcy5pZCxcclxuICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgICAgY3VycmVudERhdGU6IHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZS52YWx1ZU9mKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0RldGFpbFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9EZXRhaWxWaWV3KGtleSwgZGVzY3JpcHRvcikge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNba2V5XTtcclxuICAgIGNvbnN0IGRldGFpbFZpZXcgPSAoZW50cnkuaXNFdmVudCkgPyB0aGlzLmV2ZW50RGV0YWlsVmlldyA6IHRoaXMuYWN0aXZpdHlEZXRhaWxWaWV3O1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGRldGFpbFZpZXcpO1xyXG5cclxuICAgIGNvbnN0IHRoZURlc2NyaXB0b3IgPSAoZW50cnkuaXNFdmVudCkgPyBkZXNjcmlwdG9yIDogZW50cnkuRGVzY3JpcHRpb247XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIHRpdGxlOiB0aGVEZXNjcmlwdG9yLFxyXG4gICAgICAgIGtleSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=