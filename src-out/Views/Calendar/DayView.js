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
      this.inherited(arguments);
      if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
        this.refreshRequired = true;
      }
    },
    init: function init() {
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DYWxlbmRhci9EYXlWaWV3LmpzIl0sIm5hbWVzIjpbImFjdGl2aXR5VHlwZUljb25zIiwicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsImV2ZW50RGF0ZUZvcm1hdFRleHQiLCJkYXRlSGVhZGVyRm9ybWF0VGV4dCIsInN0YXJ0VGltZUZvcm1hdFRleHQiLCJzdGFydFRpbWVGb3JtYXRUZXh0MjQiLCJ0b2RheVRleHQiLCJkYXlUZXh0Iiwid2Vla1RleHQiLCJtb250aFRleHQiLCJhbGxEYXlUZXh0IiwiZXZlbnRIZWFkZXJUZXh0IiwiYWN0aXZpdHlIZWFkZXJUZXh0IiwiZXZlbnRNb3JlVGV4dCIsInRvZ2dsZUNvbGxhcHNlVGV4dCIsImVuYWJsZVB1bGxUb1JlZnJlc2giLCJ0b2dnbGVDb2xsYXBzZUNsYXNzIiwidG9nZ2xlRXhwYW5kQ2xhc3MiLCJ3aWRnZXRUZW1wbGF0ZSIsIlNpbXBsYXRlIiwicm93VGVtcGxhdGUiLCJldmVudFJvd1RlbXBsYXRlIiwidGltZVRlbXBsYXRlIiwiaXRlbVRlbXBsYXRlIiwiZXZlbnRJdGVtVGVtcGxhdGUiLCJuYW1lVGVtcGxhdGUiLCJldmVudE5hbWVUZW1wbGF0ZSIsIm5hdmlnYXRpb25UZW1wbGF0ZSIsImV2ZW50TW9yZVRlbXBsYXRlIiwiYXR0cmlidXRlTWFwIiwibGlzdENvbnRlbnQiLCJub2RlIiwidHlwZSIsImV2ZW50TGlzdENvbnRlbnQiLCJkYXRlQ29udGVudCIsImV2ZW50UmVtYWluaW5nQ29udGVudCIsInJlbWFpbmluZ0NvbnRlbnQiLCJpZCIsImNscyIsImljb25DbGFzcyIsImRhdGVQaWNrZXJWaWV3IiwibW9udGhWaWV3Iiwid2Vla1ZpZXciLCJhY3Rpdml0eURldGFpbFZpZXciLCJldmVudERldGFpbFZpZXciLCJpbnNlcnRWaWV3IiwiZW5hYmxlU2VhcmNoIiwiY3VycmVudERhdGUiLCJjb250cmFjdE5hbWUiLCJxdWVyeU9yZGVyQnkiLCJxdWVyeVNlbGVjdCIsImV2ZW50RmVlZCIsImV2ZW50UGFnZVNpemUiLCJldmVudFF1ZXJ5U2VsZWN0IiwiYWN0aXZpdHlUeXBlSWNvbiIsImRlZmF1bHQiLCJyZXNvdXJjZUtpbmQiLCJwYWdlU2l6ZSIsImV4cG9zZSIsImNvbnRpbnVvdXNTY3JvbGxpbmciLCJfb25SZWZyZXNoIiwibyIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsInJlZnJlc2hSZXF1aXJlZCIsImluaXQiLCJtb21lbnQiLCJzdGFydE9mIiwidG9nZ2xlR3JvdXAiLCJwYXJhbXMiLCIkc291cmNlIiwicGFyZW50Tm9kZSIsIiQiLCJ0b2dnbGVDbGFzcyIsImJ1dHRvbiIsImNvbGxhcHNlQnV0dG9uIiwicmVmcmVzaCIsImNsZWFyIiwib3B0aW9ucyIsIndoZXJlIiwiZm9ybWF0UXVlcnlGb3JBY3Rpdml0aWVzIiwiZmVlZCIsInNldCIsImZvcm1hdCIsInJlcXVlc3REYXRhIiwicmVxdWVzdEV2ZW50RGF0YSIsInJlcXVlc3QiLCJjcmVhdGVFdmVudFJlcXVlc3QiLCJyZWFkIiwic3VjY2VzcyIsIm9uUmVxdWVzdEV2ZW50RGF0YVN1Y2Nlc3MiLCJmYWlsdXJlIiwib25SZXF1ZXN0RXZlbnREYXRhRmFpbHVyZSIsImFib3J0ZWQiLCJvblJlcXVlc3RFdmVudERhdGFBYm9ydGVkIiwic2NvcGUiLCJyZXNwb25zZSIsImFsZXJ0Iiwic3Vic3RpdHV0ZSIsInJlcXVlc3RFcnJvclRleHQiLCJhZGRFcnJvciIsInByb2Nlc3NFdmVudEZlZWQiLCJldmVudFNlbGVjdCIsImV2ZW50V2hlcmUiLCJnZXRFdmVudFF1ZXJ5IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFSZXNvdXJjZUNvbGxlY3Rpb25SZXF1ZXN0IiwiZ2V0U2VydmljZSIsInNldENvdW50Iiwic2V0U3RhcnRJbmRleCIsInNldFJlc291cmNlS2luZCIsInNldFF1ZXJ5QXJnIiwiU0RhdGFVcmkiLCJRdWVyeUFyZ05hbWVzIiwiU2VsZWN0IiwiZXhwYW5kRXhwcmVzc2lvbiIsImpvaW4iLCJXaGVyZSIsIkFwcCIsImNvbnRleHQiLCJ1c2VyIiwiJGtleSIsInRvSXNvU3RyaW5nRnJvbURhdGUiLCJjbG9uZSIsInRvRGF0ZSIsImVuZE9mIiwiYWN0aXZhdGVFdmVudE1vcmUiLCJ2aWV3IiwiZ2V0VmlldyIsInNob3ciLCJoaWRlRXZlbnRMaXN0IiwiZXZlbnRDb250YWluZXJOb2RlIiwiYWRkQ2xhc3MiLCJzaG93RXZlbnRMaXN0IiwicmVtb3ZlQ2xhc3MiLCJyIiwiJHJlc291cmNlcyIsImZlZWRMZW5ndGgiLCJsZW5ndGgiLCJpIiwicm93IiwiaXNFdmVudCIsImVudHJpZXMiLCJwdXNoIiwiYXBwbHkiLCIkdG90YWxSZXN1bHRzIiwicHJvY2Vzc0ZlZWQiLCJPYmplY3QiLCJrZXlzIiwibm9EYXRhVGVtcGxhdGUiLCJjb250ZW50Tm9kZSIsImFwcGVuZCIsImRvbU5vZGUiLCJoYXNNb3JlRGF0YSIsImFsbG93RW1wdHlTZWxlY3Rpb24iLCJfbG9hZFByZXZpb3VzU2VsZWN0aW9ucyIsInByb2Nlc3NTaG93T3B0aW9ucyIsInRoZU9wdGlvbnMiLCJpc0xvYWRpbmciLCJoYXNDbGFzcyIsImdldE5leHREYXkiLCJhZGQiLCJkYXlzIiwiZ2V0VG9kYXkiLCJnZXRQcmV2RGF5Iiwic3VidHJhY3QiLCJxdWVyeVdoZXJlIiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsInNlbGVjdEVudHJ5IiwiY2xvc2VzdCIsImtleSIsImdldEF0dHJpYnV0ZSIsIm5hdmlnYXRlVG9EZXRhaWxWaWV3Iiwic2VsZWN0RGF0ZSIsImRhdGUiLCJzaG93VGltZVBpY2tlciIsInRpbWVsZXNzIiwidG9vbHMiLCJ0YmFyIiwiZm4iLCJzZWxlY3REYXRlU3VjY2VzcyIsInNpZGUiLCJSZVVJIiwiYmFjayIsImdldFByaW1hcnlBY3RpdmVWaWV3IiwiZ2V0RGF0ZVRpbWUiLCJuYXZpZ2F0ZVRvV2Vla1ZpZXciLCJuYXZEYXRlIiwidmFsdWVPZiIsIm5hdmlnYXRlVG9Nb250aFZpZXciLCJuYXZpZ2F0ZVRvSW5zZXJ0VmlldyIsImVkaXRWaWV3IiwibmVnYXRlSGlzdG9yeSIsInJldHVyblRvIiwiaW5zZXJ0IiwiZGVzY3JpcHRvciIsImVudHJ5IiwiZGV0YWlsVmlldyIsInRoZURlc2NyaXB0b3IiLCJEZXNjcmlwdGlvbiIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bc0JZQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXRCWjs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1DLFdBQVcsb0JBQVksaUJBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksK0JBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU1DLFVBQVUsdUJBQVEsNEJBQVIsRUFBc0MsZ0RBQXRDLEVBQXFFO0FBQ25GO0FBQ0FDLGVBQVdILFNBQVNHLFNBRitEO0FBR25GQyx5QkFBcUJILGlCQUFpQkcsbUJBSDZDO0FBSW5GQywwQkFBc0JKLGlCQUFpQkksb0JBSjRDO0FBS25GQyx5QkFBcUJMLGlCQUFpQkssbUJBTDZDO0FBTW5GQywyQkFBdUJOLGlCQUFpQk0scUJBTjJDO0FBT25GQyxlQUFXUixTQUFTUSxTQVArRDtBQVFuRkMsYUFBU1QsU0FBU1MsT0FSaUU7QUFTbkZDLGNBQVVWLFNBQVNVLFFBVGdFO0FBVW5GQyxlQUFXWCxTQUFTVyxTQVYrRDtBQVduRkMsZ0JBQVlaLFNBQVNZLFVBWDhEO0FBWW5GQyxxQkFBaUJiLFNBQVNhLGVBWnlEO0FBYW5GQyx3QkFBb0JkLFNBQVNjLGtCQWJzRDtBQWNuRkMsbUJBQWVmLFNBQVNlLGFBZDJEO0FBZW5GQyx3QkFBb0JoQixTQUFTZ0Isa0JBZnNEOztBQWlCbkZDLHlCQUFxQixLQWpCOEQ7QUFrQm5GQyx5QkFBcUIsb0JBbEI4RDtBQW1CbkZDLHVCQUFtQixxQkFuQmdFOztBQXFCbkY7QUFDQUMsb0JBQWdCLElBQUlDLFFBQUosQ0FBYSxDQUMzQix5S0FEMkIsRUFFM0IsaURBRjJCLEVBRzNC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R0FBeUMsS0FBS0Qsa0JBQWpFO0FBQ0EsVUFBTXNGLE9BQU9ULElBQUlVLE9BQUosQ0FBWXNFLFVBQVosQ0FBYjs7QUFFQSxVQUFNQyxnQkFBaUJGLE1BQU14RCxPQUFQLEdBQWtCdUQsVUFBbEIsR0FBK0JDLE1BQU1HLFdBQTNEO0FBQ0EsVUFBSXpFLElBQUosRUFBVTtBQUNSQSxhQUFLRSxJQUFMLENBQVU7QUFDUndFLGlCQUFPRixhQURDO0FBRVI1QjtBQUZRLFNBQVY7QUFJRDtBQUNGO0FBbmVrRixHQUFyRSxDQUFoQjs7b0JBc2VlN0ssTyIsImZpbGUiOiJEYXlWaWV3LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBFcnJvck1hbmFnZXIgZnJvbSAnYXJnb3MvRXJyb3JNYW5hZ2VyJztcclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgX0xlZ2FjeVNEYXRhTGlzdE1peGluIGZyb20gJ2FyZ29zL19MZWdhY3lTRGF0YUxpc3RNaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0ICogYXMgYWN0aXZpdHlUeXBlSWNvbnMgZnJvbSAnLi4vLi4vTW9kZWxzL0FjdGl2aXR5L0FjdGl2aXR5VHlwZUljb24nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY2FsZW5kYXJEYXlWaWV3Jyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY2FsZW5kYXJEYXlWaWV3RGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkNhbGVuZGFyLkRheVZpZXdcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuTGlzdFxyXG4gKiBAbWl4aW5zIGFyZ29zLkxpc3RcclxuICogQG1peGlucyBhcmdvcy5fTGVnYWN5U0RhdGFMaXN0TWl4aW5cclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkxpc3RcclxuICogQHJlcXVpcmVzIGFyZ29zLl9MZWdhY3lTRGF0YUxpc3RNaXhpblxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuQ29udmVydFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuRXJyb3JNYW5hZ2VyXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBtb21lbnRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuQ2FsZW5kYXIuRGF5VmlldycsIFtMaXN0LCBfTGVnYWN5U0RhdGFMaXN0TWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgZXZlbnREYXRlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5ldmVudERhdGVGb3JtYXRUZXh0LFxyXG4gIGRhdGVIZWFkZXJGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmRhdGVIZWFkZXJGb3JtYXRUZXh0LFxyXG4gIHN0YXJ0VGltZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRUaW1lRm9ybWF0VGV4dCxcclxuICBzdGFydFRpbWVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRUaW1lRm9ybWF0VGV4dDI0LFxyXG4gIHRvZGF5VGV4dDogcmVzb3VyY2UudG9kYXlUZXh0LFxyXG4gIGRheVRleHQ6IHJlc291cmNlLmRheVRleHQsXHJcbiAgd2Vla1RleHQ6IHJlc291cmNlLndlZWtUZXh0LFxyXG4gIG1vbnRoVGV4dDogcmVzb3VyY2UubW9udGhUZXh0LFxyXG4gIGFsbERheVRleHQ6IHJlc291cmNlLmFsbERheVRleHQsXHJcbiAgZXZlbnRIZWFkZXJUZXh0OiByZXNvdXJjZS5ldmVudEhlYWRlclRleHQsXHJcbiAgYWN0aXZpdHlIZWFkZXJUZXh0OiByZXNvdXJjZS5hY3Rpdml0eUhlYWRlclRleHQsXHJcbiAgZXZlbnRNb3JlVGV4dDogcmVzb3VyY2UuZXZlbnRNb3JlVGV4dCxcclxuICB0b2dnbGVDb2xsYXBzZVRleHQ6IHJlc291cmNlLnRvZ2dsZUNvbGxhcHNlVGV4dCxcclxuXHJcbiAgZW5hYmxlUHVsbFRvUmVmcmVzaDogZmFsc2UsXHJcbiAgdG9nZ2xlQ29sbGFwc2VDbGFzczogJ2ZhIGZhLWNoZXZyb24tZG93bicsXHJcbiAgdG9nZ2xlRXhwYW5kQ2xhc3M6ICdmYSBmYS1jaGV2cm9uLXJpZ2h0JyxcclxuXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgd2lkZ2V0VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBpZD1cInslPSAkLmlkICV9XCIgZGF0YS10aXRsZT1cInslPSAkLnRpdGxlVGV4dCAlfVwiIGNsYXNzPVwib3ZlcnRocm93IGxpc3QgeyU9ICQuY2xzICV9XCIgeyUgaWYgKCQucmVzb3VyY2VLaW5kKSB7ICV9ZGF0YS1yZXNvdXJjZS1raW5kPVwieyU9ICQucmVzb3VyY2VLaW5kICV9XCJ7JSB9ICV9PicsXHJcbiAgICAnPGRpdiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwic2VhcmNoTm9kZVwiPjwvZGl2PicsXHJcbiAgICAneyUhICQubmF2aWdhdGlvblRlbXBsYXRlICV9JyxcclxuICAgICc8ZGl2IHN0eWxlPVwiY2xlYXI6Ym90aFwiPjwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImV2ZW50LWNvbnRlbnQgZXZlbnQtaGlkZGVuXCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImV2ZW50Q29udGFpbmVyTm9kZVwiPicsXHJcbiAgICAnPGgyIGRhdGEtYWN0aW9uPVwidG9nZ2xlR3JvdXBcIj48YnV0dG9uIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJjb2xsYXBzZUJ1dHRvblwiIGNsYXNzPVwieyU9ICQkLnRvZ2dsZUNvbGxhcHNlQ2xhc3MgJX1cIiBhcmlhLWxhYmVsPVwieyU6ICQkLnRvZ2dsZUNvbGxhcHNlVGV4dCAlfVwiPjwvYnV0dG9uPnslPSAkLmV2ZW50SGVhZGVyVGV4dCAlfTwvaDI+JyxcclxuICAgICc8dWwgY2xhc3M9XCJsaXN0LWNvbnRlbnRcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZXZlbnRDb250ZW50Tm9kZVwiPjwvdWw+JyxcclxuICAgICd7JSEgJC5ldmVudE1vcmVUZW1wbGF0ZSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8aDI+eyU9ICQuYWN0aXZpdHlIZWFkZXJUZXh0ICV9PC9oMj4nLFxyXG4gICAgJzx1bCBjbGFzcz1cImxpc3QtY29udGVudFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJjb250ZW50Tm9kZVwiPjwvdWw+JyxcclxuICAgICd7JSEgJC5tb3JlVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgcm93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFbnRyeVwiIGRhdGEta2V5PVwieyU9ICQuJGtleSAlfVwiIGRhdGEtZGVzY3JpcHRvcj1cInslOiAkLkRlc2NyaXB0aW9uICV9XCIgZGF0YS1hY3Rpdml0eS10eXBlPVwieyU6ICQuVHlwZSAlfVwiPicsXHJcbiAgICAnPHRhYmxlIGNsYXNzPVwiY2FsZW5kYXItZW50cnktdGFibGVcIj48dHI+JyxcclxuICAgICc8dGQgY2xhc3M9XCJlbnRyeS10YWJsZS1pY29uXCI+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtYWN0aW9uPVwic2VsZWN0RW50cnlcIiBjbGFzcz1cImxpc3QtaXRlbS1zZWxlY3RvciBidXR0b24geyU9ICQkLmFjdGl2aXR5VHlwZUljb25bJC5UeXBlXSAlfVwiPicsXHJcbiAgICAnPC9idXR0b24+JyxcclxuICAgICc8L3RkPicsXHJcbiAgICAnPHRkIGNsYXNzPVwiZW50cnktdGFibGUtdGltZVwiPnslISAkJC50aW1lVGVtcGxhdGUgJX08L3RkPicsXHJcbiAgICAnPHRkIGNsYXNzPVwiZW50cnktdGFibGUtZGVzY3JpcHRpb25cIj57JSEgJCQuaXRlbVRlbXBsYXRlICV9PC90ZD4nLFxyXG4gICAgJzwvdHI+PC90YWJsZT4nLFxyXG4gICAgJzwvbGk+JyxcclxuICBdKSxcclxuICBldmVudFJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBkYXRhLWFjdGlvbj1cImFjdGl2YXRlRW50cnlcIiBkYXRhLWtleT1cInslPSAkLiRrZXkgJX1cIiBkYXRhLWRlc2NyaXB0b3I9XCJ7JTogJC4kZGVzY3JpcHRvciAlfVwiIGRhdGEtYWN0aXZpdHktdHlwZT1cIkV2ZW50XCI+JyxcclxuICAgICc8dGFibGUgY2xhc3M9XCJjYWxlbmRhci1lbnRyeS10YWJsZVwiPjx0cj4nLFxyXG4gICAgJzx0ZCBjbGFzcz1cImVudHJ5LXRhYmxlLWljb25cIj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS1hY3Rpb249XCJzZWxlY3RFbnRyeVwiIGNsYXNzPVwibGlzdC1pdGVtLXNlbGVjdG9yIGJ1dHRvbiB7JT0gJCQuYWN0aXZpdHlUeXBlSWNvbi5ldmVudCAlfVwiPicsXHJcbiAgICAnPC9idXR0b24+JyxcclxuICAgICc8L3RkPicsXHJcbiAgICAnPHRkIGNsYXNzPVwiZW50cnktdGFibGUtZGVzY3JpcHRpb25cIj57JSEgJCQuZXZlbnRJdGVtVGVtcGxhdGUgJX08L3RkPicsXHJcbiAgICAnPC90cj48L3RhYmxlPicsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG4gIHRpbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJC5UaW1lbGVzcykgeyAlfScsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJwLXRpbWVcIj57JT0gJCQuYWxsRGF5VGV4dCAlfTwvc3Bhbj4nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICc8c3BhbiBjbGFzcz1cInAtdGltZVwiPnslOiBjcm0uRm9ybWF0LmRhdGUoJC5TdGFydERhdGUsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/ICQkLnN0YXJ0VGltZUZvcm1hdFRleHQyNCA6ICQkLnN0YXJ0VGltZUZvcm1hdFRleHQpICV9PC9zcGFuPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZyBwLWRlc2NyaXB0aW9uXCI+eyU6ICQuRGVzY3JpcHRpb24gJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JT0gJCQubmFtZVRlbXBsYXRlLmFwcGx5KCQpICV9PC9wPicsXHJcbiAgXSksXHJcbiAgZXZlbnRJdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nIHAtZGVzY3JpcHRpb25cIj57JTogJC5EZXNjcmlwdGlvbiAlfSAoeyU6ICQuVHlwZSAlfSk8L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JSEgJCQuZXZlbnROYW1lVGVtcGxhdGUgJX08L3A+JyxcclxuICBdKSxcclxuICBuYW1lVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQuQ29udGFjdE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slOiAkLkNvbnRhY3ROYW1lICV9IC8geyU6ICQuQWNjb3VudE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJC5BY2NvdW50TmFtZSkgeyAlfScsXHJcbiAgICAneyU6ICQuQWNjb3VudE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JTogJC5MZWFkTmFtZSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcbiAgZXZlbnROYW1lVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyU6IGNybS5Gb3JtYXQuZGF0ZSgkLlN0YXJ0RGF0ZSwgJCQuZXZlbnREYXRlRm9ybWF0VGV4dCkgJX0nLFxyXG4gICAgJyZuYnNwOy0mbmJzcDsnLFxyXG4gICAgJ3slOiBjcm0uRm9ybWF0LmRhdGUoJC5FbmREYXRlLCAkJC5ldmVudERhdGVGb3JtYXRUZXh0KSAlfScsXHJcbiAgXSksXHJcbiAgbmF2aWdhdGlvblRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJzcGxpdC1idXR0b25zXCI+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtdG9vbD1cInRvZGF5XCIgZGF0YS1hY3Rpb249XCJnZXRUb2RheVwiIGNsYXNzPVwiYnV0dG9uXCI+eyU6ICQudG9kYXlUZXh0ICV9PC9idXR0b24+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtdG9vbD1cInNlbGVjdGRhdGVcIiBkYXRhLWFjdGlvbj1cInNlbGVjdERhdGVcIiBjbGFzcz1cImJ1dHRvbiBmYSBmYS1jYWxlbmRhclwiPjxzcGFuPjwvc3Bhbj48L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwiZGF5XCIgY2xhc3M9XCJidXR0b24gY3VycmVudFwiPnslOiAkLmRheVRleHQgJX08L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwid2Vla1wiIGRhdGEtYWN0aW9uPVwibmF2aWdhdGVUb1dlZWtWaWV3XCIgY2xhc3M9XCJidXR0b25cIj57JTogJC53ZWVrVGV4dCAlfTwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJtb250aFwiIGRhdGEtYWN0aW9uPVwibmF2aWdhdGVUb01vbnRoVmlld1wiIGNsYXNzPVwiYnV0dG9uXCI+eyU6ICQubW9udGhUZXh0ICV9PC9idXR0b24+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJuYXYtYmFyXCI+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtdG9vbD1cIm5leHRcIiBkYXRhLWFjdGlvbj1cImdldE5leHREYXlcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tbmV4dCBmYSBmYS1hcnJvdy1yaWdodCBmYS1sZ1wiPjxzcGFuPjwvc3Bhbj48L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwicHJldlwiIGRhdGEtYWN0aW9uPVwiZ2V0UHJldkRheVwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmV2IGZhIGZhLWFycm93LWxlZnQgZmEtbGdcIj48c3Bhbj48L3NwYW4+PC9idXR0b24+JyxcclxuICAgICc8aDQgY2xhc3M9XCJkYXRlLXRleHRcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZGF0ZU5vZGVcIj48L2g0PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBldmVudE1vcmVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibGlzdC1tb3JlXCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImV2ZW50TW9yZU5vZGVcIj4nLFxyXG4gICAgJzxidXR0b24gY2xhc3M9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cImFjdGl2YXRlRXZlbnRNb3JlXCI+JyxcclxuICAgICc8c3BhbiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZXZlbnRSZW1haW5pbmdDb250ZW50Tm9kZVwiPnslPSAkLmV2ZW50TW9yZVRleHQgJX08L3NwYW4+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgYXR0cmlidXRlTWFwOiB7XHJcbiAgICBsaXN0Q29udGVudDoge1xyXG4gICAgICBub2RlOiAnY29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBldmVudExpc3RDb250ZW50OiB7XHJcbiAgICAgIG5vZGU6ICdldmVudENvbnRlbnROb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgZGF0ZUNvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2RhdGVOb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRSZW1haW5pbmdDb250ZW50OiB7XHJcbiAgICAgIG5vZGU6ICdldmVudFJlbWFpbmluZ0NvbnRlbnROb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgcmVtYWluaW5nQ29udGVudDoge1xyXG4gICAgICBub2RlOiAncmVtYWluaW5nQ29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdjYWxlbmRhcl9kYXlsaXN0JyxcclxuICBjbHM6ICdhY3Rpdml0aWVzLWZvci1kYXknLFxyXG4gIGljb25DbGFzczogJ2ZhIGZhLWNhbGVuZGFyIGZhLWxnJyxcclxuXHJcbiAgZGF0ZVBpY2tlclZpZXc6ICdnZW5lcmljX2NhbGVuZGFyJyxcclxuICBtb250aFZpZXc6ICdjYWxlbmRhcl9tb250aGxpc3QnLFxyXG4gIHdlZWtWaWV3OiAnY2FsZW5kYXJfd2Vla2xpc3QnLFxyXG4gIGFjdGl2aXR5RGV0YWlsVmlldzogJ2FjdGl2aXR5X2RldGFpbCcsXHJcbiAgZXZlbnREZXRhaWxWaWV3OiAnZXZlbnRfZGV0YWlsJyxcclxuICBpbnNlcnRWaWV3OiAnYWN0aXZpdHlfdHlwZXNfbGlzdCcsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBjdXJyZW50RGF0ZTogbnVsbCxcclxuICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG4gIHF1ZXJ5T3JkZXJCeTogJ1N0YXJ0RGF0ZSBkZXNjJyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICdTdGFydERhdGUnLFxyXG4gICAgJ1R5cGUnLFxyXG4gICAgJ0FjY291bnROYW1lJyxcclxuICAgICdDb250YWN0TmFtZScsXHJcbiAgICAnTGVhZElkJyxcclxuICAgICdMZWFkTmFtZScsXHJcbiAgICAnVXNlcklkJyxcclxuICAgICdUaW1lbGVzcycsXHJcbiAgICAnUmVjdXJyaW5nJyxcclxuICBdLFxyXG4gIGV2ZW50RmVlZDogbnVsbCxcclxuICBldmVudFBhZ2VTaXplOiAzLFxyXG4gIGV2ZW50UXVlcnlTZWxlY3Q6IFtcclxuICAgICdTdGFydERhdGUnLFxyXG4gICAgJ0VuZERhdGUnLFxyXG4gICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICdUeXBlJyxcclxuICBdLFxyXG4gIGFjdGl2aXR5VHlwZUljb246IGFjdGl2aXR5VHlwZUljb25zLmRlZmF1bHQsXHJcbiAgcmVzb3VyY2VLaW5kOiAnYWN0aXZpdGllcycsXHJcbiAgcGFnZVNpemU6IDEwMDAsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuXHJcbiAgY29udGludW91c1Njcm9sbGluZzogZmFsc2UsXHJcblxyXG4gIF9vblJlZnJlc2g6IGZ1bmN0aW9uIF9vblJlZnJlc2gobykge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIGlmIChvLnJlc291cmNlS2luZCA9PT0gJ2FjdGl2aXRpZXMnIHx8IG8ucmVzb3VyY2VLaW5kID09PSAnZXZlbnRzJykge1xyXG4gICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIHRoaXMuY3VycmVudERhdGUgPSBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICB9LFxyXG4gIHRvZ2dsZUdyb3VwOiBmdW5jdGlvbiB0b2dnbGVHcm91cChwYXJhbXMpIHtcclxuICAgIGNvbnN0IG5vZGUgPSBwYXJhbXMuJHNvdXJjZTtcclxuICAgIGlmIChub2RlICYmIG5vZGUucGFyZW50Tm9kZSkge1xyXG4gICAgICAkKG5vZGUpLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnKTtcclxuICAgICAgJChub2RlLnBhcmVudE5vZGUpLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQtZXZlbnQnKTtcclxuXHJcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuY29sbGFwc2VCdXR0b247XHJcblxyXG4gICAgICBpZiAoYnV0dG9uKSB7XHJcbiAgICAgICAgJChidXR0b24pLnRvZ2dsZUNsYXNzKHRoaXMudG9nZ2xlQ29sbGFwc2VDbGFzcyk7XHJcbiAgICAgICAgJChidXR0b24pLnRvZ2dsZUNsYXNzKHRoaXMudG9nZ2xlRXhwYW5kQ2xhc3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICByZWZyZXNoOiBmdW5jdGlvbiByZWZyZXNoKCkge1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG5cclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCB7fTtcclxuICAgIHRoaXMub3B0aW9ucy53aGVyZSA9IHRoaXMuZm9ybWF0UXVlcnlGb3JBY3Rpdml0aWVzKCk7XHJcbiAgICB0aGlzLmZlZWQgPSBudWxsO1xyXG4gICAgdGhpcy5ldmVudEZlZWQgPSBudWxsO1xyXG4gICAgdGhpcy5zZXQoJ2RhdGVDb250ZW50JywgdGhpcy5jdXJyZW50RGF0ZS5mb3JtYXQodGhpcy5kYXRlSGVhZGVyRm9ybWF0VGV4dCkpO1xyXG5cclxuICAgIHRoaXMucmVxdWVzdERhdGEoKTtcclxuICAgIHRoaXMucmVxdWVzdEV2ZW50RGF0YSgpO1xyXG4gIH0sXHJcbiAgcmVxdWVzdEV2ZW50RGF0YTogZnVuY3Rpb24gcmVxdWVzdEV2ZW50RGF0YSgpIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmNyZWF0ZUV2ZW50UmVxdWVzdCgpO1xyXG4gICAgcmVxdWVzdC5yZWFkKHtcclxuICAgICAgc3VjY2VzczogdGhpcy5vblJlcXVlc3RFdmVudERhdGFTdWNjZXNzLFxyXG4gICAgICBmYWlsdXJlOiB0aGlzLm9uUmVxdWVzdEV2ZW50RGF0YUZhaWx1cmUsXHJcbiAgICAgIGFib3J0ZWQ6IHRoaXMub25SZXF1ZXN0RXZlbnREYXRhQWJvcnRlZCxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9uUmVxdWVzdEV2ZW50RGF0YUZhaWx1cmU6IGZ1bmN0aW9uIG9uUmVxdWVzdEV2ZW50RGF0YUZhaWx1cmUocmVzcG9uc2UsIG8pIHtcclxuICAgIGFsZXJ0KHN0cmluZy5zdWJzdGl0dXRlKHRoaXMucmVxdWVzdEVycm9yVGV4dCwgW3Jlc3BvbnNlLCBvXSkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICBFcnJvck1hbmFnZXIuYWRkRXJyb3IocmVzcG9uc2UsIG8sIHRoaXMub3B0aW9ucywgJ2ZhaWx1cmUnKTtcclxuICB9LFxyXG4gIG9uUmVxdWVzdEV2ZW50RGF0YUFib3J0ZWQ6IGZ1bmN0aW9uIG9uUmVxdWVzdEV2ZW50RGF0YUFib3J0ZWQoKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBmYWxzZTsgLy8gZm9yY2UgYSByZWZyZXNoXHJcbiAgfSxcclxuICBvblJlcXVlc3RFdmVudERhdGFTdWNjZXNzOiBmdW5jdGlvbiBvblJlcXVlc3RFdmVudERhdGFTdWNjZXNzKGZlZWQpIHtcclxuICAgIHRoaXMucHJvY2Vzc0V2ZW50RmVlZChmZWVkKTtcclxuICB9LFxyXG4gIGNyZWF0ZUV2ZW50UmVxdWVzdDogZnVuY3Rpb24gY3JlYXRlRXZlbnRSZXF1ZXN0KCkge1xyXG4gICAgY29uc3QgZXZlbnRTZWxlY3QgPSB0aGlzLmV2ZW50UXVlcnlTZWxlY3Q7XHJcbiAgICBjb25zdCBldmVudFdoZXJlID0gdGhpcy5nZXRFdmVudFF1ZXJ5KCk7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgLnNldENvdW50KHRoaXMuZXZlbnRQYWdlU2l6ZSlcclxuICAgICAgLnNldFN0YXJ0SW5kZXgoMSlcclxuICAgICAgLnNldFJlc291cmNlS2luZCgnZXZlbnRzJylcclxuICAgICAgLnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuU2VsZWN0LCB0aGlzLmV4cGFuZEV4cHJlc3Npb24oZXZlbnRTZWxlY3QpLmpvaW4oJywnKSlcclxuICAgICAgLnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuV2hlcmUsIGV2ZW50V2hlcmUpO1xyXG4gICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgfSxcclxuICBnZXRFdmVudFF1ZXJ5OiBmdW5jdGlvbiBnZXRFdmVudFF1ZXJ5KCkge1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdGl0dXRlKFxyXG4gICAgICBbXHJcbiAgICAgICAgJ1VzZXJJZCBlcSBcIiR7MH1cIiBhbmQgKCcsXHJcbiAgICAgICAgJyhTdGFydERhdGUgZ3QgQCR7MX1AIG9yIEVuZERhdGUgZ3QgQCR7MX1AKSBhbmQgJyxcclxuICAgICAgICAnU3RhcnREYXRlIGx0IEAkezJ9QCcsXHJcbiAgICAgICAgJyknLFxyXG4gICAgICBdLmpvaW4oJycpLCBbXHJcbiAgICAgICAgQXBwLmNvbnRleHQudXNlciAmJiBBcHAuY29udGV4dC51c2VyLiRrZXksXHJcbiAgICAgICAgY29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHRoaXMuY3VycmVudERhdGUuY2xvbmUoKS5zdGFydE9mKCdkYXknKS50b0RhdGUoKSksXHJcbiAgICAgICAgY29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHRoaXMuY3VycmVudERhdGUuY2xvbmUoKS5lbmRPZignZGF5JykudG9EYXRlKCkpLFxyXG4gICAgICBdXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVFdmVudE1vcmU6IGZ1bmN0aW9uIGFjdGl2YXRlRXZlbnRNb3JlKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdldmVudF9yZWxhdGVkJyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICBjb25zdCB3aGVyZSA9IHRoaXMuZ2V0RXZlbnRRdWVyeSgpO1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIHdoZXJlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGhpZGVFdmVudExpc3Q6IGZ1bmN0aW9uIGhpZGVFdmVudExpc3QoKSB7XHJcbiAgICAkKHRoaXMuZXZlbnRDb250YWluZXJOb2RlKS5hZGRDbGFzcygnZXZlbnQtaGlkZGVuJyk7XHJcbiAgfSxcclxuICBzaG93RXZlbnRMaXN0OiBmdW5jdGlvbiBzaG93RXZlbnRMaXN0KCkge1xyXG4gICAgJCh0aGlzLmV2ZW50Q29udGFpbmVyTm9kZSkucmVtb3ZlQ2xhc3MoJ2V2ZW50LWhpZGRlbicpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0V2ZW50RmVlZDogZnVuY3Rpb24gcHJvY2Vzc0V2ZW50RmVlZChmZWVkKSB7XHJcbiAgICBjb25zdCByID0gZmVlZC4kcmVzb3VyY2VzO1xyXG4gICAgY29uc3QgZmVlZExlbmd0aCA9IHIubGVuZ3RoO1xyXG4gICAgY29uc3QgbyA9IFtdO1xyXG4gICAgdGhpcy5ldmVudEZlZWQgPSBmZWVkO1xyXG5cclxuICAgIGlmIChmZWVkTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuaGlkZUV2ZW50TGlzdCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNob3dFdmVudExpc3QoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZlZWRMZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCByb3cgPSByW2ldO1xyXG4gICAgICByb3cuaXNFdmVudCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZW50cmllc1tyb3cuJGtleV0gPSByb3c7XHJcbiAgICAgIG8ucHVzaCh0aGlzLmV2ZW50Um93VGVtcGxhdGUuYXBwbHkocm93LCB0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZlZWQuJHRvdGFsUmVzdWx0cyA+IGZlZWRMZW5ndGgpIHtcclxuICAgICAgJCh0aGlzLmV2ZW50Q29udGFpbmVyTm9kZSkuYWRkQ2xhc3MoJ2xpc3QtaGFzLW1vcmUnKTtcclxuICAgICAgdGhpcy5zZXQoJ2V2ZW50UmVtYWluaW5nQ29udGVudCcsIHRoaXMuZXZlbnRNb3JlVGV4dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKHRoaXMuZXZlbnRDb250YWluZXJOb2RlKS5yZW1vdmVDbGFzcygnbGlzdC1oYXMtbW9yZScpO1xyXG4gICAgICB0aGlzLnNldCgnZXZlbnRSZW1haW5pbmdDb250ZW50JywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0KCdldmVudExpc3RDb250ZW50Jywgby5qb2luKCcnKSk7XHJcbiAgfSxcclxuICBwcm9jZXNzRmVlZDogZnVuY3Rpb24gcHJvY2Vzc0ZlZWQoZmVlZCkge1xyXG4gICAgY29uc3QgciA9IGZlZWQuJHJlc291cmNlcztcclxuICAgIGNvbnN0IGZlZWRMZW5ndGggPSByLmxlbmd0aDtcclxuICAgIGNvbnN0IG8gPSBbXTtcclxuXHJcbiAgICB0aGlzLmZlZWQgPSBmZWVkO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWVkTGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3Qgcm93ID0gcltpXTtcclxuICAgICAgcm93LmlzRXZlbnQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5lbnRyaWVzW3Jvdy4ka2V5XSA9IHJvdztcclxuICAgICAgby5wdXNoKHRoaXMucm93VGVtcGxhdGUuYXBwbHkocm93LCB0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgd2UgZmV0Y2hlZCBhIHBhZ2UgdGhhdCBoYXMgbm8gZGF0YSBkdWUgdG8gdW4tcmVsaWFibGUgY291bnRzLFxyXG4gICAgLy8gY2hlY2sgaWYgd2UgZmV0Y2hlZCBhbnl0aGluZyBpbiB0aGUgcHJldmlvdXMgcGFnZXMgYmVmb3JlIGFzc3VtaW5nIHRoZXJlIGlzIG5vIGRhdGEuXHJcbiAgICBpZiAoZmVlZExlbmd0aCA9PT0gMCAmJiBPYmplY3Qua2V5cyh0aGlzLmVudHJpZXMpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLnNldCgnbGlzdENvbnRlbnQnLCB0aGlzLm5vRGF0YVRlbXBsYXRlLmFwcGx5KHRoaXMpKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5zZXQoJ2xpc3RDb250ZW50JywgJycpO1xyXG4gICAgICAkKHRoaXMuY29udGVudE5vZGUpLmFwcGVuZChvLmpvaW4oJycpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldCgncmVtYWluaW5nQ29udGVudCcsICcnKTsgLy8gRmVlZCBkb2VzIG5vdCByZXR1cm4gcmVsaWFibGUgZGF0YSwgZG9uJ3Qgc2hvdyByZW1haW5pbmdcclxuXHJcbiAgICAkKHRoaXMuZG9tTm9kZSkudG9nZ2xlQ2xhc3MoJ2xpc3QtaGFzLW1vcmUnLCB0aGlzLmhhc01vcmVEYXRhKCkpOyAvLyBUaGlzIGNvdWxkIGJlIHdyb25nLCBoYW5kbGUgaXQgb24gdGhlIG5leHQgcHJvY2Vzc0ZlZWQgaWYgc29cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFsbG93RW1wdHlTZWxlY3Rpb24pIHtcclxuICAgICAgJCh0aGlzLmRvbU5vZGUpLmFkZENsYXNzKCdsaXN0LWhhcy1lbXB0eS1vcHQnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9sb2FkUHJldmlvdXNTZWxlY3Rpb25zKCk7XHJcbiAgfSxcclxuICBzaG93OiBmdW5jdGlvbiBzaG93KG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMucHJvY2Vzc1Nob3dPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRoZU9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgdGhlT3B0aW9ucy53aGVyZSA9IHRoaXMuZm9ybWF0UXVlcnlGb3JBY3Rpdml0aWVzKCk7XHJcblxyXG4gICAgdGhpcy5zZXQoJ2RhdGVDb250ZW50JywgdGhpcy5jdXJyZW50RGF0ZS5mb3JtYXQodGhpcy5kYXRlSGVhZGVyRm9ybWF0VGV4dCkpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzLCBbdGhlT3B0aW9uc10pO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc1Nob3dPcHRpb25zOiBmdW5jdGlvbiBwcm9jZXNzU2hvd09wdGlvbnMob3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMuY3VycmVudERhdGUpIHtcclxuICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IG1vbWVudChvcHRpb25zLmN1cnJlbnREYXRlKS5zdGFydE9mKCdkYXknKSB8fCBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaXNMb2FkaW5nOiBmdW5jdGlvbiBpc0xvYWRpbmcoKSB7XHJcbiAgICByZXR1cm4gJCh0aGlzLmRvbU5vZGUpLmhhc0NsYXNzKCdsaXN0LWxvYWRpbmcnKTtcclxuICB9LFxyXG4gIGdldE5leHREYXk6IGZ1bmN0aW9uIGdldE5leHREYXkoKSB7XHJcbiAgICBpZiAodGhpcy5pc0xvYWRpbmcoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50RGF0ZS5hZGQoe1xyXG4gICAgICBkYXlzOiAxLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9LFxyXG4gIGdldFRvZGF5OiBmdW5jdGlvbiBnZXRUb2RheSgpIHtcclxuICAgIGlmICh0aGlzLmlzTG9hZGluZygpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50RGF0ZSA9PT0gbW9tZW50KCkuc3RhcnRPZignZGF5JykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudERhdGUgPSBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH0sXHJcbiAgZ2V0UHJldkRheTogZnVuY3Rpb24gZ2V0UHJldkRheSgpIHtcclxuICAgIGlmICh0aGlzLmlzTG9hZGluZygpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnREYXRlLnN1YnRyYWN0KHtcclxuICAgICAgZGF5czogMSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfSxcclxuICBmb3JtYXRRdWVyeUZvckFjdGl2aXRpZXM6IGZ1bmN0aW9uIGZvcm1hdFF1ZXJ5Rm9yQWN0aXZpdGllcygpIHtcclxuICAgIGNvbnN0IHF1ZXJ5V2hlcmUgPSBbXHJcbiAgICAgICdVc2VyQWN0aXZpdGllcy5Vc2VySWQgZXEgXCIkezB9XCIgYW5kIFR5cGUgbmUgXCJhdExpdGVyYXR1cmVcIiBhbmQgKCcsXHJcbiAgICAgICcoVGltZWxlc3MgZXEgZmFsc2UgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAkezF9QCBhbmQgQCR7Mn1AKSBvciAnLFxyXG4gICAgICAnKFRpbWVsZXNzIGVxIHRydWUgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAkezN9QCBhbmQgQCR7NH1AKSknLFxyXG4gICAgXS5qb2luKCcnKTtcclxuXHJcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmN1cnJlbnREYXRlLmNsb25lKCkuc3RhcnRPZignZGF5JykudG9EYXRlKCk7XHJcbiAgICBjb25zdCBlbmREYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5jbG9uZSgpLmVuZE9mKCdkYXknKS50b0RhdGUoKTtcclxuXHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUoXHJcbiAgICAgIHF1ZXJ5V2hlcmUsIFtBcHAuY29udGV4dC51c2VyICYmIEFwcC5jb250ZXh0LnVzZXIuJGtleSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUoc3RhcnREYXRlKSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUoZW5kRGF0ZSksXHJcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZS5mb3JtYXQoJ1lZWVktTU0tRERUMDA6MDA6MDBbWl0nKSxcclxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpLFxyXG4gICAgICBdXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgc2VsZWN0RW50cnk6IGZ1bmN0aW9uIHNlbGVjdEVudHJ5KHBhcmFtcykge1xyXG4gICAgY29uc3Qgcm93ID0gJChwYXJhbXMuJHNvdXJjZSkuY2xvc2VzdCgnW2RhdGEta2V5XScpWzBdO1xyXG4gICAgY29uc3Qga2V5ID0gcm93ID8gcm93LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSA6IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubmF2aWdhdGVUb0RldGFpbFZpZXcoa2V5KTtcclxuICB9LFxyXG4gIHNlbGVjdERhdGU6IGZ1bmN0aW9uIHNlbGVjdERhdGUoKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBkYXRlOiB0aGlzLmN1cnJlbnREYXRlLFxyXG4gICAgICBzaG93VGltZVBpY2tlcjogZmFsc2UsXHJcbiAgICAgIHRpbWVsZXNzOiBmYWxzZSxcclxuICAgICAgdG9vbHM6IHtcclxuICAgICAgICB0YmFyOiBbe1xyXG4gICAgICAgICAgaWQ6ICdjb21wbGV0ZScsXHJcbiAgICAgICAgICBjbHM6ICdmYSBmYS1jaGVjayBmYS1mdyBmYS1sZycsXHJcbiAgICAgICAgICBmbjogdGhpcy5zZWxlY3REYXRlU3VjY2VzcyxcclxuICAgICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAnY2FuY2VsJyxcclxuICAgICAgICAgIHNpZGU6ICdsZWZ0JyxcclxuICAgICAgICAgIGNsczogJ2ZhIGZhLWJhbiBmYS1mdyBmYS1sZycsXHJcbiAgICAgICAgICBmbjogUmVVSS5iYWNrLFxyXG4gICAgICAgICAgc2NvcGU6IFJlVUksXHJcbiAgICAgICAgfV0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuZGF0ZVBpY2tlclZpZXcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VsZWN0RGF0ZVN1Y2Nlc3M6IGZ1bmN0aW9uIHNlbGVjdERhdGVTdWNjZXNzKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRQcmltYXJ5QWN0aXZlVmlldygpO1xyXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IG1vbWVudCh2aWV3LmdldERhdGVUaW1lKCkpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICBSZVVJLmJhY2soKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9XZWVrVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb1dlZWtWaWV3KCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMud2Vla1ZpZXcpO1xyXG4gICAgY29uc3QgbmF2RGF0ZSA9IHRoaXMuY3VycmVudERhdGUgPyB0aGlzLmN1cnJlbnREYXRlIDogbW9tZW50KCkuc3RhcnRPZignZGF5Jyk7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBjdXJyZW50RGF0ZTogbmF2RGF0ZS52YWx1ZU9mKCksXHJcbiAgICB9O1xyXG4gICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb01vbnRoVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb01vbnRoVmlldygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLm1vbnRoVmlldyk7XHJcbiAgICBjb25zdCBuYXZEYXRlID0gdGhpcy5jdXJyZW50RGF0ZSA/IHRoaXMuY3VycmVudERhdGUgOiBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGN1cnJlbnREYXRlOiBuYXZEYXRlLnZhbHVlT2YoKSxcclxuICAgIH07XHJcbiAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvSW5zZXJ0VmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0luc2VydFZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5pbnNlcnRWaWV3IHx8IHRoaXMuZWRpdFZpZXcpO1xyXG5cclxuICAgIHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZSA9IHRoaXMuY3VycmVudERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJykgfHwgbW9tZW50KCkuc3RhcnRPZignZGF5Jyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIG5lZ2F0ZUhpc3Rvcnk6IHRydWUsXHJcbiAgICAgICAgcmV0dXJuVG86IHRoaXMuaWQsXHJcbiAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgIGN1cnJlbnREYXRlOiB0aGlzLm9wdGlvbnMuY3VycmVudERhdGUudmFsdWVPZigpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG5hdmlnYXRlVG9EZXRhaWxWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvRGV0YWlsVmlldyhrZXksIGRlc2NyaXB0b3IpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5lbnRyaWVzW2tleV07XHJcbiAgICBjb25zdCBkZXRhaWxWaWV3ID0gKGVudHJ5LmlzRXZlbnQpID8gdGhpcy5ldmVudERldGFpbFZpZXcgOiB0aGlzLmFjdGl2aXR5RGV0YWlsVmlldztcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldyhkZXRhaWxWaWV3KTtcclxuXHJcbiAgICBjb25zdCB0aGVEZXNjcmlwdG9yID0gKGVudHJ5LmlzRXZlbnQpID8gZGVzY3JpcHRvciA6IGVudHJ5LkRlc2NyaXB0aW9uO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICB0aXRsZTogdGhlRGVzY3JpcHRvcixcclxuICAgICAgICBrZXksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19