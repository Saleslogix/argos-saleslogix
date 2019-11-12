define('crm/Views/Calendar/MonthView', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', 'argos/ErrorManager', 'argos/Convert', 'argos/List', 'argos/_LegacySDataListMixin', 'argos/I18n', '../../Models/Activity/ActivityTypeIcon', 'crm/Format'], function (module, exports, _declare, _string, _ErrorManager, _Convert, _List, _LegacySDataListMixin2, _I18n, _ActivityTypeIcon) {
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

  var resource = (0, _I18n2.default)('calendarMonthView'); /* Copyright 2017 Infor
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

  var dtFormatResource = (0, _I18n2.default)('calendarMonthViewDateTimeFormat');

  /**
   * @class crm.Views.Calendar.MonthView
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
   * @requires crm.Format
   *
   * @requires moment
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Calendar.MonthView', [_List2.default, _LegacySDataListMixin3.default], {
    // Localization
    titleText: resource.titleText,
    todayText: resource.todayText,
    dayText: resource.dayText,
    weekText: resource.weekText,
    monthText: resource.monthText,
    monthTitleFormatText: dtFormatResource.monthTitleFormatText,
    dayTitleFormatText: dtFormatResource.dayTitleFormatText,
    eventDateFormatText: dtFormatResource.eventDateFormatText,
    startTimeFormatText: dtFormatResource.startTimeFormatText,
    startTimeFormatText24: dtFormatResource.startTimeFormatText24,
    allDayText: resource.allDayText,
    eventText: resource.eventText,
    eventHeaderText: resource.eventHeaderText,
    countMoreText: resource.countMoreText,
    activityHeaderText: resource.activityHeaderText,
    toggleCollapseText: resource.toggleCollapseText,
    weekDaysShortText: [resource.sundayShortText, resource.mondayShortText, resource.tuesdayShortText, resource.wednesdayShortText, resource.thursdayShortText, resource.fridayShortText, resource.saturdayShortText],

    toggleCollapseClass: 'fa fa-chevron-down',
    toggleExpandClass: 'fa fa-chevron-right',
    enablePullToRefresh: false,

    // Templates
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '<div data-dojo-attach-point="searchNode"></div>', '{%! $.navigationTemplate %}', '<div style="clear:both"></div>', '<div class="month-content" data-dojo-attach-point="monthNode">', '{%! $.navBarTemplate %}', '<div class="month-calendar" data-dojo-attach-point="contentNode"></div>', '</div>', '<div class="day-content">', '<h2 class="date-day-text" data-dojo-attach-point="dayTitleNode"></h2>', '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">', '<h2 data-action="toggleGroup"><button data-dojo-attach-point="collapseButton" class="{%= $$.toggleCollapseClass %}" aria-label="{%: $$.toggleCollapseText %}"></button>{%= $.eventHeaderText %}</h2>', '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>', '{%! $.eventMoreTemplate %}', '</div>', '<div class="activity-content" data-dojo-attach-point="activityContainerNode">', '<h2>{%= $.activityHeaderText %}</h2>', '<ul class="list-content" data-dojo-attach-point="activityContentNode"></ul>', '{%! $.activityMoreTemplate %}', '</div>', '</div>', '<div style="clear:both"></div>', '</div>']),
    navigationTemplate: new Simplate(['<div class="split-buttons">', '<button data-tool="today" data-action="getTodayMonthActivities" class="button">{%: $.todayText %}</button>', '<button data-tool="selectdate" data-action="selectDate" class="button fa fa-calendar"><span></span></button>', '<button data-tool="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>', '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>', '<button data-tool="month" class="button current">{%: $.monthText %}</button>', '</div>']),
    navBarTemplate: new Simplate(['<div class="nav-bar">', '<button data-tool="next" data-action="goToNextMonth" class="button button-next fa fa-arrow-right fa-lg"><span></span></button>', '<button data-tool="prev" data-action="goToPreviousMonth" class="button button-prev fa fa-arrow-left fa-lg"><span></span></button>', '<h4 class="date-text" data-dojo-attach-point="dateNode"></h4>', '</div>']),
    activityRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityTypeIcon[$.Type] %}">', '</button>', '</td>', '<td class="entry-table-time">{%! $$.activityTimeTemplate %}</td>', '<td class="entry-table-description">{%! $$.activityItemTemplate %}</td>', '</tr></table>', '</li>']),
    eventRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityTypeIcon.event %}">', '</button>', '</td>', '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>', '</tr></table>', '</li>']),
    activityTimeTemplate: new Simplate(['{% if ($.Timeless) { %}', '<span class="p-time">{%= $$.allDayText %}</span>', '{% } else { %}', '<span class="p-time">{%: crm.Format.date($.StartDate, (App.is24HourClock()) ? $$.startTimeFormatText24 : $$.startTimeFormatText) %}</span>', '{% } %}']),
    activityItemTemplate: new Simplate(['<p class="listview-heading p-description">{%: $.Description %}</p>', '<p class="micro-text">{%= $$.activityNameTemplate.apply($) %}</p>']),
    eventItemTemplate: new Simplate(['<p class="listview-heading p-description">{%: $.Description %} ({%: $.Type %})</p>', '<p class="micro-text">{%! $$.eventNameTemplate %}</p>']),
    activityNameTemplate: new Simplate(['{% if ($.ContactName) { %}', '{%: $.ContactName %} / {%: $.AccountName %}', '{% } else if ($.AccountName) { %}', '{%: $.AccountName %}', '{% } else { %}', '{%: $.LeadName %}', '{% } %}']),
    eventNameTemplate: new Simplate(['{%: crm.Format.date($.StartDate, $$.eventDateFormatText) %}', '&nbsp;-&nbsp;', '{%: crm.Format.date($.EndDate, $$.eventDateFormatText) %}']),
    activityMoreTemplate: new Simplate(['<div class="list-more" data-dojo-attach-point="activityMoreNode">', '<button class="button" data-action="activateActivityMore">', '<span data-dojo-attach-point="activityRemainingContentNode">{%= $.countMoreText %}</span>', '</button>', '</div>']),
    eventMoreTemplate: new Simplate(['<div class="list-more" data-dojo-attach-point="eventMoreNode">', '<button class="button" data-action="activateEventMore">', '<span data-dojo-attach-point="eventRemainingContentNode">{%= $.countMoreText %}</span>', '</button>', '</div>']),
    calendarStartTemplate: '<table class="old-calendar-table">',
    calendarWeekHeaderStartTemplate: '<tr class="old-calendar-week-header">',
    calendarWeekHeaderTemplate: '<td class="old-calendar-weekday">${0}</td>',
    calendarWeekHeaderEndTemplate: '</tr>',
    calendarWeekStartTemplate: '<tr class="old-calendar-week">',
    calendarEmptyDayTemplate: '<td>&nbsp;</td>',
    calendarDayTemplate: '<td class="old-calendar-day ${1}" data-action="selectDay" data-date="${2}">${0}</td>',
    calendarWeekEndTemplate: '</tr>',
    calendarEndTemplate: '</table>',
    calendarActivityCountTemplate: '<span class="old-activity-count" title="${0} events">${0}</span>',

    attributeMap: {
      calendarContent: {
        node: 'contentNode',
        type: 'innerHTML'
      },
      dateContent: {
        node: 'dateNode',
        type: 'innerHTML'
      },
      dayTitleContent: {
        node: 'dayTitleNode',
        type: 'innerHTML'
      },
      activityContent: {
        node: 'activityContentNode',
        type: 'innerHTML'
      },
      eventContent: {
        node: 'eventContentNode',
        type: 'innerHTML'
      },
      eventRemainingContent: {
        node: 'eventRemainingContentNode',
        type: 'innerHTML'
      },
      activityRemainingContent: {
        node: 'activityRemainingContentNode',
        type: 'innerHTML'
      }
    },
    eventContainerNode: null,
    activityContainerNode: null,

    // View Properties
    id: 'calendar_monthlist',
    cls: 'activities-for-month',
    dayView: 'calendar_daylist',
    datePickerView: 'generic_calendar',
    weekView: 'calendar_weeklist',
    insertView: 'activity_types_list',
    activityDetailView: 'activity_detail',
    eventDetailView: 'event_detail',
    enableSearch: false,
    expose: false,
    dateCounts: null,
    currentDate: null,

    pageSize: 500,
    queryWhere: null,
    queryOrderBy: 'StartDate desc',
    querySelect: ['StartDate', 'Timeless', 'Type'],
    feed: null,
    eventFeed: null,
    entries: null,
    selectedDateRequests: null,
    selectedDateEventRequests: null,
    monthRequests: null,
    monthEventRequests: null,

    eventPageSize: 3,
    eventQueryWhere: null,
    eventQuerySelect: ['StartDate', 'EndDate', 'Description', 'Type'],

    activityPageSize: 10,
    activityQueryWhere: null,
    activityQuerySelect: ['StartDate', 'Description', 'Type', 'AccountName', 'ContactName', 'LeadId', 'LeadName', 'UserId', 'Timeless', 'Recurring'],
    activityTypeIcon: activityTypeIcons.default,

    resourceKind: 'activities',

    constructor: function constructor() {
      this.feed = {};
      this.eventFeed = {};
      this.entries = {};
      this.dateCounts = [];
    },
    _onRefresh: function _onRefresh(o) {
      this.inherited(arguments);
      if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
        this.refreshRequired = true;
      }
    },
    clear: function clear() {},
    startup: function startup() {
      this.inherited(arguments);
      this.currentDate = moment().startOf('day');
    },
    render: function render() {
      this.inherited(arguments);
      this.renderCalendar();
    },
    activateActivityMore: function activateActivityMore() {
      this.navigateToDayView();
    },
    activateEventMore: function activateEventMore() {
      var view = App.getView('event_related');
      var where = this.getSelectedDateEventQuery();
      if (view) {
        view.show({
          where: where
        });
      }
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
    selectDay: function selectDay(params, evt, el) {
      if (this.selectedDateNode) {
        $(this.selectedDateNode).removeClass('selected');
      }

      this.selectedDateNode = el;
      $(el).addClass('selected');

      this.currentDate = moment(params.date, 'YYYY-MM-DD');
      this.getSelectedDate();
    },
    getFirstDayOfCurrentMonth: function getFirstDayOfCurrentMonth() {
      return this.currentDate.clone().startOf('month');
    },
    getLastDayOfCurrentMonth: function getLastDayOfCurrentMonth() {
      return this.currentDate.clone().endOf('month');
    },
    getTodayMonthActivities: function getTodayMonthActivities() {
      var today = moment().startOf('day');

      if (this.currentDate.format('YYYY-MM') === today.format('YYYY-MM')) {
        this.currentDate = today;
        this.highlightCurrentDate();
        this.getSelectedDate();
      } else {
        this.currentDate = today;
        this.refresh();
      }
    },
    goToNextMonth: function goToNextMonth() {
      this.currentDate.add({
        months: 1
      });
      this.refresh();
    },
    goToPreviousMonth: function goToPreviousMonth() {
      this.currentDate.subtract({
        months: 1
      });
      this.refresh();
    },
    refresh: function refresh() {
      this.renderCalendar();
      this.queryWhere = this.getActivityQuery();
      this.feed = null;
      this.eventFeed = null;
      this.dateCounts = [];
      this.requestData();
      this.requestEventData();
    },
    requestData: function requestData() {
      this.cancelRequests(this.monthRequests);
      this.monthRequests = [];

      var request = this.createRequest();
      request.setContractName(this.contractName || 'system');

      var xhr = request.read({
        success: this.onRequestDataSuccess,
        failure: this.onRequestDataFailure,
        aborted: this.onRequestDataAborted,
        scope: this
      });
      this.monthRequests.push(xhr);
    },
    createEventRequest: function createEventRequest() {
      var querySelect = this.eventQuerySelect;
      var queryWhere = this.getEventQuery();
      var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setCount(this.pageSize).setStartIndex(1).setResourceKind('events').setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(',')).setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);

      return request;
    },
    requestEventData: function requestEventData() {
      this.cancelRequests(this.monthEventRequests);
      this.monthEventRequests = [];

      var request = this.createEventRequest();
      var xhr = request.read({
        success: this.onRequestEventDataSuccess,
        failure: this.onRequestEventDataFailure,
        aborted: this.onRequestEventDataAborted,
        scope: this
      });
      this.monthEventRequests.push(xhr);
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
    getActivityQuery: function getActivityQuery() {
      var startDate = this.getFirstDayOfCurrentMonth();
      var endDate = this.getLastDayOfCurrentMonth();
      return _string2.default.substitute(['UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (', '(Timeless eq false and StartDate', ' between @${1}@ and @${2}@) or ', '(Timeless eq true and StartDate', ' between @${3}@ and @${4}@))'].join(''), [App.context.user && App.context.user.$key, _Convert2.default.toIsoStringFromDate(startDate.toDate()), _Convert2.default.toIsoStringFromDate(endDate.toDate()), startDate.format('YYYY-MM-DDT00:00:00[Z]'), endDate.format('YYYY-MM-DDT23:59:59[Z]')]);
    },
    getEventQuery: function getEventQuery() {
      var startDate = this.getFirstDayOfCurrentMonth();
      var endDate = this.getLastDayOfCurrentMonth();
      return _string2.default.substitute(['UserId eq "${0}" and (', '(StartDate gt @${1}@ or EndDate gt @${1}@) and ', 'StartDate lt @${2}@', ')'].join(''), [App.context.user && App.context.user.$key, _Convert2.default.toIsoStringFromDate(startDate.toDate()), _Convert2.default.toIsoStringFromDate(endDate.toDate())]);
    },
    processFeed: function processFeed(feed) {
      if (!feed) {
        return;
      }

      var r = feed.$resources;
      this.feed = feed;

      for (var i = 0; i < r.length; i++) {
        var row = r[i];

        // Preserve the isEvent flag if we have an existing entry for it already,
        // the order of processFeed and processEventFeed is not predictable
        row.isEvent = this.entries[row.$key] && this.entries[row.$key].isEvent;

        this.entries[row.$key] = row;

        var startDay = moment(_Convert2.default.toDateFromString(row.StartDate));
        if (r[i].Timeless) {
          startDay.subtract({
            minutes: startDay.utcOffset()
          });
        }

        var dateIndex = startDay.format('YYYY-MM-DD');
        this.dateCounts[dateIndex] = this.dateCounts[dateIndex] ? this.dateCounts[dateIndex] + 1 : 1;
      }

      this.highlightActivities();
    },
    processEventFeed: function processEventFeed(feed) {
      if (!feed) {
        return;
      }

      var r = feed.$resources;
      var feedLength = r.length;
      this.eventFeed = feed;

      for (var i = 0; i < feedLength; i++) {
        var row = r[i];
        // Preserve the isEvent flag if we have an existing entry for it already,
        // the order of processFeed and processEventFeed is not predictable
        row.isEvent = this.entries[row.$key] && this.entries[row.$key].isEvent;
        this.entries[row.$key] = row;

        var startDay = moment(_Convert2.default.toDateFromString(row.StartDate));
        var endDay = _Convert2.default.toDateFromString(row.EndDate);

        while (startDay.valueOf() <= endDay.valueOf()) {
          var dateIndex = startDay.format('YYYY-MM-DD');
          this.dateCounts[dateIndex] = this.dateCounts[dateIndex] ? this.dateCounts[dateIndex] + 1 : 1;
          startDay.add({
            days: 1
          });
        }
      }

      this.highlightActivities();
    },

    highlightActivities: function highlightActivities() {
      var _this = this;

      $('.old-calendar-day').each(function (i, node) {
        var dataDate = $(node).attr('data-date');
        if (!_this.dateCounts[dataDate]) {
          return;
        }

        $(node).addClass('activeDay');

        var countMarkup = _string2.default.substitute(_this.calendarActivityCountTemplate, [_this.dateCounts[dataDate]]);
        var existingCount = $(node).children('div');

        if (existingCount.length > 0) {
          $(existingCount[0]).empty().append(countMarkup);
        } else {
          $(node).prepend('<div>' + countMarkup + '</div>');
        }
      }, this);
    },
    setCurrentDateTitle: function setCurrentDateTitle() {
      this.set('dayTitleContent', this.currentDate.format(this.dayTitleFormatText));
    },
    hideEventList: function hideEventList() {
      $(this.eventContainerNode).addClass('event-hidden');
    },
    showEventList: function showEventList() {
      $(this.eventContainerNode).removeClass('event-hidden');
    },
    getSelectedDate: function getSelectedDate() {
      this.clearSelectedDate();
      this.setCurrentDateTitle();
      this.requestSelectedDateActivities();
      this.requestSelectedDateEvents();
    },
    clearSelectedDate: function clearSelectedDate() {
      $(this.activityContainerNode).addClass('list-loading');
      this.set('activityContent', this.loadingTemplate.apply(this));
      this.hideEventList();
    },
    cancelRequests: function cancelRequests(requests) {
      if (!requests) {
        return;
      }

      requests.forEach(function (xhr) {
        if (xhr) {
          // if request was fulfilled by offline storage, xhr will be undefined
          xhr.abort();
        }
      });
    },
    requestSelectedDateActivities: function requestSelectedDateActivities() {
      this.cancelRequests(this.selectedDateRequests);
      this.selectedDateRequests = [];

      var request = this.createSelectedDateRequest({
        pageSize: this.activityPageSize,
        resourceKind: 'activities',
        contractName: 'system',
        querySelect: this.activityQuerySelect,
        queryWhere: this.getSelectedDateActivityQuery()
      });

      var xhr = request.read({
        success: this.onRequestSelectedDateActivityDataSuccess,
        failure: this.onRequestDataFailure,
        aborted: this.onRequestDataAborted,
        scope: this
      });
      this.selectedDateRequests.push(xhr);
    },
    requestSelectedDateEvents: function requestSelectedDateEvents() {
      this.cancelRequests(this.selectedDateEventRequests);
      this.selectedDateEventRequests = [];

      var request = this.createSelectedDateRequest({
        pageSize: this.eventPageSize,
        resourceKind: 'events',
        contractName: 'dynamic',
        querySelect: this.eventQuerySelect,
        queryWhere: this.getSelectedDateEventQuery()
      });

      var xhr = request.read({
        success: this.onRequestSelectedDateEventDataSuccess,
        failure: this.onRequestDataFailure,
        aborted: this.onRequestDataAborted,
        scope: this
      });
      this.selectedDateEventRequests.push(xhr);
    },
    createSelectedDateRequest: function createSelectedDateRequest(o) {
      var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setCount(o.pageSize).setStartIndex(1).setResourceKind(o.resourceKind).setContractName(o.contractName || App.defaultService.getContractName().text).setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.OrderBy, o.queryOrderBy || this.queryOrderBy).setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(o.querySelect).join(',')).setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, o.queryWhere);
      return request;
    },
    getSelectedDateActivityQuery: function getSelectedDateActivityQuery() {
      var activityQuery = ['UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (', '(Timeless eq false and StartDate between @${1}@ and @${2}@) or ', '(Timeless eq true and StartDate between @${3}@ and @${4}@))'].join('');

      var results = _string2.default.substitute(activityQuery, [App.context.user && App.context.user.$key, _Convert2.default.toIsoStringFromDate(this.currentDate.toDate()), _Convert2.default.toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate()), this.currentDate.format('YYYY-MM-DDT00:00:00[Z]'), this.currentDate.format('YYYY-MM-DDT23:59:59[Z]')]);

      return results;
    },
    getSelectedDateEventQuery: function getSelectedDateEventQuery() {
      return _string2.default.substitute(['UserId eq "${0}" and (', '(StartDate gt @${1}@ or EndDate gt @${1}@) and ', 'StartDate lt @${2}@', ')'].join(''), [App.context.user && App.context.user.$key, _Convert2.default.toIsoStringFromDate(this.currentDate.toDate()), _Convert2.default.toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate())]);
    },
    onRequestSelectedDateActivityDataSuccess: function onRequestSelectedDateActivityDataSuccess(feed) {
      if (!feed) {
        return false;
      }

      $(this.activityContainerNode).removeClass('list-loading');

      var r = feed.$resources;
      var feedLength = r.length;
      var o = [];

      for (var i = 0; i < feedLength; i++) {
        var row = r[i];
        row.isEvent = false;
        this.entries[row.$key] = row;
        o.push(this.activityRowTemplate.apply(row, this));
      }

      if (feedLength === 0) {
        this.set('activityContent', this.noDataTemplate.apply(this));
        return false;
      }

      if (feed.$totalResults > feedLength) {
        $(this.activityContainerNode).addClass('list-has-more');
        this.set('activityRemainingContent', this.countMoreText);
      } else {
        $(this.activityContainerNode).removeClass('list-has-more');
        this.set('activityRemainingContent', '');
      }

      this.set('activityContent', o.join(''));
    },
    onRequestSelectedDateEventDataSuccess: function onRequestSelectedDateEventDataSuccess(feed) {
      if (!feed) {
        return false;
      }

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
        this.set('eventRemainingContent', this.countMoreText);
      } else {
        $(this.eventContainerNode).removeClass('list-has-more');
        this.set('eventRemainingContent', '');
      }

      this.set('eventContent', o.join(''));
    },

    renderCalendar: function renderCalendar() {
      var calHTML = [];
      var startingDay = this.getFirstDayOfCurrentMonth().day();
      var dayDate = this.currentDate.clone().startOf('month');
      var monthLength = this.currentDate.daysInMonth();
      var weekEnds = [0, 6];
      var weekendClass = '';
      var day = 1;

      calHTML.push(this.calendarStartTemplate);

      calHTML.push(this.calendarWeekHeaderStartTemplate);
      for (var i = 0; i <= 6; i++) {
        calHTML.push(_string2.default.substitute(this.calendarWeekHeaderTemplate, [this.weekDaysShortText[i]]));
      }
      calHTML.push(this.calendarWeekHeaderEndTemplate);

      // Weeks
      for (var _i = 0; _i <= 6; _i++) {
        calHTML.push(this.calendarWeekStartTemplate);
        // Days
        for (var j = 0; j <= 6; j++) {
          if (day <= monthLength && (_i > 0 || j >= startingDay)) {
            dayDate.date(day);
            weekendClass = weekEnds.indexOf(j) !== -1 ? ' weekend' : '';
            calHTML.push(_string2.default.substitute(this.calendarDayTemplate, [day, weekendClass, dayDate.format('YYYY-MM-DD')]));
            day++;
          } else {
            calHTML.push(this.calendarEmptyDayTemplate);
          }
        }
        calHTML.push(this.calendarWeekEndTemplate);
        // stop making rows if we've run out of days
        if (day > monthLength) {
          break;
        }
      }
      calHTML.push(this.calendarEndTemplate);

      this.set('calendarContent', calHTML.join(''));
      this.setDateTitle();
      this.highlightCurrentDate();
    },
    setDateTitle: function setDateTitle() {
      this.set('dateContent', this.currentDate.format(this.monthTitleFormatText));
    },
    show: function show(options) {
      this.inherited(arguments);

      if (options) {
        this.processShowOptions(options);
      } else {
        this.renderCalendar();
      }
    },
    processShowOptions: function processShowOptions(options) {
      if (options.currentDate) {
        this.currentDate = moment(options.currentDate).startOf('day') || moment().startOf('day');
        this.refreshRequired = true;
      }
    },
    highlightCurrentDate: function highlightCurrentDate() {
      var selectedDate = '.old-calendar-day[data-date=' + this.currentDate.format('YYYY-MM-DD') + ']';

      if (this.selectedDateNode) {
        $(this.selectedDateNode).removeClass('selected');
      }

      this.selectedDateNode = $(selectedDate, this.contentNode)[0];
      if (this.selectedDateNode) {
        $(this.selectedDateNode).addClass('selected');
      }

      this.getSelectedDate();
      this.highlightToday();
    },
    highlightToday: function highlightToday() {
      // Remove the existing "today" highlight class because it might be out of date,
      // like when we tick past midnight.
      var todayCls = '.old-calendar-day.today';
      var todayNode = $(todayCls, this.contentNode)[0];
      if (todayNode) {
        $(todayNode).removeClass('today');
      }

      // Get the updated "today"
      todayCls = '.old-calendar-day[data-date=' + moment().format('YYYY-MM-DD') + ']';
      todayNode = $(todayCls, this.contentNode)[0];
      if (todayNode) {
        $(todayNode).addClass('today');
      }
    },
    selectEntry: function selectEntry(params) {
      var row = $(params.$source).closest('[data-key]')[0];
      var key = row ? row.getAttribute('data-key') : false;

      this.navigateToDetailView(key);
    },
    selectDate: function selectDate() {
      var options = {
        date: this.currentDate.toDate(),
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
            cls: 'fa fa-ban fa-fw fa-lg',
            side: 'left',
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
      var options = {
        currentDate: this.currentDate.valueOf() || moment().startOf('day')
      };
      view.show(options);
    },
    navigateToDayView: function navigateToDayView() {
      var view = App.getView(this.dayView);
      var options = {
        currentDate: this.currentDate.valueOf() || moment().startOf('day')
      };
      view.show(options);
    },
    navigateToInsertView: function navigateToInsertView() {
      var view = App.getView(this.insertView || this.editView);

      if (!this.options) {
        this.options = {};
      }

      this.options.currentDate = this.currentDate.toString('yyyy-MM-dd') || moment().startOf('day');
      if (view) {
        view.show({
          negateHistory: true,
          returnTo: this.id,
          insert: true,
          currentDate: this.options.currentDate.valueOf()
        });
      }
    },
    navigateToDetailView: function navigateToDetailView(key, _descriptor) {
      var descriptor = _descriptor;
      var entry = this.entries[key];
      var detailView = entry.isEvent ? this.eventDetailView : this.activityDetailView;
      var view = App.getView(detailView);
      descriptor = entry.isEvent ? descriptor : entry.Description;
      if (view) {
        view.show({
          title: descriptor,
          key: key
        });
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DYWxlbmRhci9Nb250aFZpZXcuanMiXSwibmFtZXMiOlsiYWN0aXZpdHlUeXBlSWNvbnMiLCJyZXNvdXJjZSIsImR0Rm9ybWF0UmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwidG9kYXlUZXh0IiwiZGF5VGV4dCIsIndlZWtUZXh0IiwibW9udGhUZXh0IiwibW9udGhUaXRsZUZvcm1hdFRleHQiLCJkYXlUaXRsZUZvcm1hdFRleHQiLCJldmVudERhdGVGb3JtYXRUZXh0Iiwic3RhcnRUaW1lRm9ybWF0VGV4dCIsInN0YXJ0VGltZUZvcm1hdFRleHQyNCIsImFsbERheVRleHQiLCJldmVudFRleHQiLCJldmVudEhlYWRlclRleHQiLCJjb3VudE1vcmVUZXh0IiwiYWN0aXZpdHlIZWFkZXJUZXh0IiwidG9nZ2xlQ29sbGFwc2VUZXh0Iiwid2Vla0RheXNTaG9ydFRleHQiLCJzdW5kYXlTaG9ydFRleHQiLCJtb25kYXlTaG9ydFRleHQiLCJ0dWVzZGF5U2hvcnRUZXh0Iiwid2VkbmVzZGF5U2hvcnRUZXh0IiwidGh1cnNkYXlTaG9ydFRleHQiLCJmcmlkYXlTaG9ydFRleHQiLCJzYXR1cmRheVNob3J0VGV4dCIsInRvZ2dsZUNvbGxhcHNlQ2xhc3MiLCJ0b2dnbGVFeHBhbmRDbGFzcyIsImVuYWJsZVB1bGxUb1JlZnJlc2giLCJ3aWRnZXRUZW1wbGF0ZSIsIlNpbXBsYXRlIiwibmF2aWdhdGlvblRlbXBsYXRlIiwibmF2QmFyVGVtcGxhdGUiLCJhY3Rpdml0eVJvd1RlbXBsYXRlIiwiZXZlbnRSb3dUZW1wbGF0ZSIsImFjdGl2aXR5VGltZVRlbXBsYXRlIiwiYWN0aXZpdHlJdGVtVGVtcGxhdGUiLCJldmVudEl0ZW1UZW1wbGF0ZSIsImFjdGl2aXR5TmFtZVRlbXBsYXRlIiwiZXZlbnROYW1lVGVtcGxhdGUiLCJhY3Rpdml0eU1vcmVUZW1wbGF0ZSIsImV2ZW50TW9yZVRlbXBsYXRlIiwiY2FsZW5kYXJTdGFydFRlbXBsYXRlIiwiY2FsZW5kYXJXZWVrSGVhZGVyU3RhcnRUZW1wbGF0ZSIsImNhbGVuZGFyV2Vla0hlYWRlclRlbXBsYXRlIiwiY2FsZW5kYXJXZWVrSGVhZGVyRW5kVGVtcGxhdGUiLCJjYWxlbmRhcldlZWtTdGFydFRlbXBsYXRlIiwiY2FsZW5kYXJFbXB0eURheVRlbXBsYXRlIiwiY2FsZW5kYXJEYXlUZW1wbGF0ZSIsImNhbGVuZGFyV2Vla0VuZFRlbXBsYXRlIiwiY2FsZW5kYXJFbmRUZW1wbGF0ZSIsImNhbGVuZGFyQWN0aXZpdHlDb3VudFRlbXBsYXRlIiwiYXR0cmlidXRlTWFwIiwiY2FsZW5kYXJDb250ZW50Iiwibm9kZSIsInR5cGUiLCJkYXRlQ29udGVudCIsImRheVRpdGxlQ29udGVudCIsImFjdGl2aXR5Q29udGVudCIsImV2ZW50Q29udGVudCIsImV2ZW50UmVtYWluaW5nQ29udGVudCIsImFjdGl2aXR5UmVtYWluaW5nQ29udGVudCIsImV2ZW50Q29udGFpbmVyTm9kZSIsImFjdGl2aXR5Q29udGFpbmVyTm9kZSIsImlkIiwiY2xzIiwiZGF5VmlldyIsImRhdGVQaWNrZXJWaWV3Iiwid2Vla1ZpZXciLCJpbnNlcnRWaWV3IiwiYWN0aXZpdHlEZXRhaWxWaWV3IiwiZXZlbnREZXRhaWxWaWV3IiwiZW5hYmxlU2VhcmNoIiwiZXhwb3NlIiwiZGF0ZUNvdW50cyIsImN1cnJlbnREYXRlIiwicGFnZVNpemUiLCJxdWVyeVdoZXJlIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJmZWVkIiwiZXZlbnRGZWVkIiwiZW50cmllcyIsInNlbGVjdGVkRGF0ZVJlcXVlc3RzIiwic2VsZWN0ZWREYXRlRXZlbnRSZXF1ZXN0cyIsIm1vbnRoUmVxdWVzdHMiLCJtb250aEV2ZW50UmVxdWVzdHMiLCJldmVudFBhZ2VTaXplIiwiZXZlbnRRdWVyeVdoZXJlIiwiZXZlbnRRdWVyeVNlbGVjdCIsImFjdGl2aXR5UGFnZVNpemUiLCJhY3Rpdml0eVF1ZXJ5V2hlcmUiLCJhY3Rpdml0eVF1ZXJ5U2VsZWN0IiwiYWN0aXZpdHlUeXBlSWNvbiIsImRlZmF1bHQiLCJyZXNvdXJjZUtpbmQiLCJjb25zdHJ1Y3RvciIsIl9vblJlZnJlc2giLCJvIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwicmVmcmVzaFJlcXVpcmVkIiwiY2xlYXIiLCJzdGFydHVwIiwibW9tZW50Iiwic3RhcnRPZiIsInJlbmRlciIsInJlbmRlckNhbGVuZGFyIiwiYWN0aXZhdGVBY3Rpdml0eU1vcmUiLCJuYXZpZ2F0ZVRvRGF5VmlldyIsImFjdGl2YXRlRXZlbnRNb3JlIiwidmlldyIsIkFwcCIsImdldFZpZXciLCJ3aGVyZSIsImdldFNlbGVjdGVkRGF0ZUV2ZW50UXVlcnkiLCJzaG93IiwidG9nZ2xlR3JvdXAiLCJwYXJhbXMiLCIkc291cmNlIiwicGFyZW50Tm9kZSIsIiQiLCJ0b2dnbGVDbGFzcyIsImJ1dHRvbiIsImNvbGxhcHNlQnV0dG9uIiwic2VsZWN0RGF5IiwiZXZ0IiwiZWwiLCJzZWxlY3RlZERhdGVOb2RlIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImRhdGUiLCJnZXRTZWxlY3RlZERhdGUiLCJnZXRGaXJzdERheU9mQ3VycmVudE1vbnRoIiwiY2xvbmUiLCJnZXRMYXN0RGF5T2ZDdXJyZW50TW9udGgiLCJlbmRPZiIsImdldFRvZGF5TW9udGhBY3Rpdml0aWVzIiwidG9kYXkiLCJmb3JtYXQiLCJoaWdobGlnaHRDdXJyZW50RGF0ZSIsInJlZnJlc2giLCJnb1RvTmV4dE1vbnRoIiwiYWRkIiwibW9udGhzIiwiZ29Ub1ByZXZpb3VzTW9udGgiLCJzdWJ0cmFjdCIsImdldEFjdGl2aXR5UXVlcnkiLCJyZXF1ZXN0RGF0YSIsInJlcXVlc3RFdmVudERhdGEiLCJjYW5jZWxSZXF1ZXN0cyIsInJlcXVlc3QiLCJjcmVhdGVSZXF1ZXN0Iiwic2V0Q29udHJhY3ROYW1lIiwiY29udHJhY3ROYW1lIiwieGhyIiwicmVhZCIsInN1Y2Nlc3MiLCJvblJlcXVlc3REYXRhU3VjY2VzcyIsImZhaWx1cmUiLCJvblJlcXVlc3REYXRhRmFpbHVyZSIsImFib3J0ZWQiLCJvblJlcXVlc3REYXRhQWJvcnRlZCIsInNjb3BlIiwicHVzaCIsImNyZWF0ZUV2ZW50UmVxdWVzdCIsImdldEV2ZW50UXVlcnkiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJTRGF0YVJlc291cmNlQ29sbGVjdGlvblJlcXVlc3QiLCJnZXRTZXJ2aWNlIiwic2V0Q291bnQiLCJzZXRTdGFydEluZGV4Iiwic2V0UmVzb3VyY2VLaW5kIiwic2V0UXVlcnlBcmciLCJTRGF0YVVyaSIsIlF1ZXJ5QXJnTmFtZXMiLCJTZWxlY3QiLCJleHBhbmRFeHByZXNzaW9uIiwiam9pbiIsIldoZXJlIiwib25SZXF1ZXN0RXZlbnREYXRhU3VjY2VzcyIsIm9uUmVxdWVzdEV2ZW50RGF0YUZhaWx1cmUiLCJvblJlcXVlc3RFdmVudERhdGFBYm9ydGVkIiwicmVzcG9uc2UiLCJhbGVydCIsInN1YnN0aXR1dGUiLCJyZXF1ZXN0RXJyb3JUZXh0IiwiYWRkRXJyb3IiLCJvcHRpb25zIiwicHJvY2Vzc0V2ZW50RmVlZCIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJjb250ZXh0IiwidXNlciIsIiRrZXkiLCJ0b0lzb1N0cmluZ0Zyb21EYXRlIiwidG9EYXRlIiwicHJvY2Vzc0ZlZWQiLCJyIiwiJHJlc291cmNlcyIsImkiLCJsZW5ndGgiLCJyb3ciLCJpc0V2ZW50Iiwic3RhcnREYXkiLCJ0b0RhdGVGcm9tU3RyaW5nIiwiU3RhcnREYXRlIiwiVGltZWxlc3MiLCJtaW51dGVzIiwidXRjT2Zmc2V0IiwiZGF0ZUluZGV4IiwiaGlnaGxpZ2h0QWN0aXZpdGllcyIsImZlZWRMZW5ndGgiLCJlbmREYXkiLCJFbmREYXRlIiwidmFsdWVPZiIsImRheXMiLCJlYWNoIiwiZGF0YURhdGUiLCJhdHRyIiwiY291bnRNYXJrdXAiLCJleGlzdGluZ0NvdW50IiwiY2hpbGRyZW4iLCJlbXB0eSIsImFwcGVuZCIsInByZXBlbmQiLCJzZXRDdXJyZW50RGF0ZVRpdGxlIiwic2V0IiwiaGlkZUV2ZW50TGlzdCIsInNob3dFdmVudExpc3QiLCJjbGVhclNlbGVjdGVkRGF0ZSIsInJlcXVlc3RTZWxlY3RlZERhdGVBY3Rpdml0aWVzIiwicmVxdWVzdFNlbGVjdGVkRGF0ZUV2ZW50cyIsImxvYWRpbmdUZW1wbGF0ZSIsImFwcGx5IiwicmVxdWVzdHMiLCJmb3JFYWNoIiwiYWJvcnQiLCJjcmVhdGVTZWxlY3RlZERhdGVSZXF1ZXN0IiwiZ2V0U2VsZWN0ZWREYXRlQWN0aXZpdHlRdWVyeSIsIm9uUmVxdWVzdFNlbGVjdGVkRGF0ZUFjdGl2aXR5RGF0YVN1Y2Nlc3MiLCJvblJlcXVlc3RTZWxlY3RlZERhdGVFdmVudERhdGFTdWNjZXNzIiwiZGVmYXVsdFNlcnZpY2UiLCJnZXRDb250cmFjdE5hbWUiLCJ0ZXh0IiwiT3JkZXJCeSIsImFjdGl2aXR5UXVlcnkiLCJyZXN1bHRzIiwibm9EYXRhVGVtcGxhdGUiLCIkdG90YWxSZXN1bHRzIiwiY2FsSFRNTCIsInN0YXJ0aW5nRGF5IiwiZGF5IiwiZGF5RGF0ZSIsIm1vbnRoTGVuZ3RoIiwiZGF5c0luTW9udGgiLCJ3ZWVrRW5kcyIsIndlZWtlbmRDbGFzcyIsImoiLCJpbmRleE9mIiwic2V0RGF0ZVRpdGxlIiwicHJvY2Vzc1Nob3dPcHRpb25zIiwic2VsZWN0ZWREYXRlIiwiY29udGVudE5vZGUiLCJoaWdobGlnaHRUb2RheSIsInRvZGF5Q2xzIiwidG9kYXlOb2RlIiwic2VsZWN0RW50cnkiLCJjbG9zZXN0Iiwia2V5IiwiZ2V0QXR0cmlidXRlIiwibmF2aWdhdGVUb0RldGFpbFZpZXciLCJzZWxlY3REYXRlIiwic2hvd1RpbWVQaWNrZXIiLCJ0aW1lbGVzcyIsInRvb2xzIiwidGJhciIsImZuIiwic2VsZWN0RGF0ZVN1Y2Nlc3MiLCJzaWRlIiwiUmVVSSIsImJhY2siLCJnZXRQcmltYXJ5QWN0aXZlVmlldyIsImdldERhdGVUaW1lIiwibmF2aWdhdGVUb1dlZWtWaWV3IiwibmF2aWdhdGVUb0luc2VydFZpZXciLCJlZGl0VmlldyIsInRvU3RyaW5nIiwibmVnYXRlSGlzdG9yeSIsInJldHVyblRvIiwiaW5zZXJ0IiwiX2Rlc2NyaXB0b3IiLCJkZXNjcmlwdG9yIiwiZW50cnkiLCJkZXRhaWxWaWV3IiwiRGVzY3JpcHRpb24iLCJ0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXVCWUEsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWixNQUFNQyxXQUFXLG9CQUFZLG1CQUFaLENBQWpCLEMsQ0F6QkE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQyxtQkFBbUIsb0JBQVksaUNBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLE1BQU1DLFVBQVUsdUJBQVEsOEJBQVIsRUFBd0MsZ0RBQXhDLEVBQXVFO0FBQ3JGO0FBQ0FDLGVBQVdILFNBQVNHLFNBRmlFO0FBR3JGQyxlQUFXSixTQUFTSSxTQUhpRTtBQUlyRkMsYUFBU0wsU0FBU0ssT0FKbUU7QUFLckZDLGNBQVVOLFNBQVNNLFFBTGtFO0FBTXJGQyxlQUFXUCxTQUFTTyxTQU5pRTtBQU9yRkMsMEJBQXNCUCxpQkFBaUJPLG9CQVA4QztBQVFyRkMsd0JBQW9CUixpQkFBaUJRLGtCQVJnRDtBQVNyRkMseUJBQXFCVCxpQkFBaUJTLG1CQVQrQztBQVVyRkMseUJBQXFCVixpQkFBaUJVLG1CQVYrQztBQVdyRkMsMkJBQXVCWCxpQkFBaUJXLHFCQVg2QztBQVlyRkMsZ0JBQVliLFNBQVNhLFVBWmdFO0FBYXJGQyxlQUFXZCxTQUFTYyxTQWJpRTtBQWNyRkMscUJBQWlCZixTQUFTZSxlQWQyRDtBQWVyRkMsbUJBQWVoQixTQUFTZ0IsYUFmNkQ7QUFnQnJGQyx3QkFBb0JqQixTQUFTaUIsa0JBaEJ3RDtBQWlCckZDLHdCQUFvQmxCLFNBQVNrQixrQkFqQndEO0FBa0JyRkMsdUJBQW1CLENBQ2pCbkIsU0FBU29CLGVBRFEsRUFFakJwQixTQUFTcUIsZUFGUSxFQUdqQnJCLFNBQVNzQixnQkFIUSxFQUlqQnRCLFNBQVN1QixrQkFKUSxFQUtqQnZCLFNBQVN3QixpQkFMUSxFQU1q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QU0xRixPQUFQLEdBQWtCeUYsVUFBbEIsR0FBK0JDLE1BQU1FLFdBQWxEO0FBQ0EsVUFBSTFMLElBQUosRUFBVTtBQUNSQSxhQUFLSyxJQUFMLENBQVU7QUFDUnNMLGlCQUFPSixVQURDO0FBRVJ2QjtBQUZRLFNBQVY7QUFJRDtBQUNGO0FBLzJCb0YsR0FBdkUsQ0FBaEI7O29CQWszQmU5USxPIiwiZmlsZSI6Ik1vbnRoVmlldy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcbmltcG9ydCBjb252ZXJ0IGZyb20gJ2FyZ29zL0NvbnZlcnQnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IF9MZWdhY3lTRGF0YUxpc3RNaXhpbiBmcm9tICdhcmdvcy9fTGVnYWN5U0RhdGFMaXN0TWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCAqIGFzIGFjdGl2aXR5VHlwZUljb25zIGZyb20gJy4uLy4uL01vZGVscy9BY3Rpdml0eS9BY3Rpdml0eVR5cGVJY29uJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NhbGVuZGFyTW9udGhWaWV3Jyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY2FsZW5kYXJNb250aFZpZXdEYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQ2FsZW5kYXIuTW9udGhWaWV3XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICogQG1peGlucyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgYXJnb3MuX0xlZ2FjeVNEYXRhTGlzdE1peGluXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5MaXN0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5fTGVnYWN5U0RhdGFMaXN0TWl4aW5cclxuICogQHJlcXVpcmVzIGFyZ29zLkNvbnZlcnRcclxuICogQHJlcXVpcmVzIGFyZ29zLkVycm9yTWFuYWdlclxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgbW9tZW50XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkNhbGVuZGFyLk1vbnRoVmlldycsIFtMaXN0LCBfTGVnYWN5U0RhdGFMaXN0TWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgdG9kYXlUZXh0OiByZXNvdXJjZS50b2RheVRleHQsXHJcbiAgZGF5VGV4dDogcmVzb3VyY2UuZGF5VGV4dCxcclxuICB3ZWVrVGV4dDogcmVzb3VyY2Uud2Vla1RleHQsXHJcbiAgbW9udGhUZXh0OiByZXNvdXJjZS5tb250aFRleHQsXHJcbiAgbW9udGhUaXRsZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UubW9udGhUaXRsZUZvcm1hdFRleHQsXHJcbiAgZGF5VGl0bGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmRheVRpdGxlRm9ybWF0VGV4dCxcclxuICBldmVudERhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmV2ZW50RGF0ZUZvcm1hdFRleHQsXHJcbiAgc3RhcnRUaW1lRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydFRpbWVGb3JtYXRUZXh0LFxyXG4gIHN0YXJ0VGltZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydFRpbWVGb3JtYXRUZXh0MjQsXHJcbiAgYWxsRGF5VGV4dDogcmVzb3VyY2UuYWxsRGF5VGV4dCxcclxuICBldmVudFRleHQ6IHJlc291cmNlLmV2ZW50VGV4dCxcclxuICBldmVudEhlYWRlclRleHQ6IHJlc291cmNlLmV2ZW50SGVhZGVyVGV4dCxcclxuICBjb3VudE1vcmVUZXh0OiByZXNvdXJjZS5jb3VudE1vcmVUZXh0LFxyXG4gIGFjdGl2aXR5SGVhZGVyVGV4dDogcmVzb3VyY2UuYWN0aXZpdHlIZWFkZXJUZXh0LFxyXG4gIHRvZ2dsZUNvbGxhcHNlVGV4dDogcmVzb3VyY2UudG9nZ2xlQ29sbGFwc2VUZXh0LFxyXG4gIHdlZWtEYXlzU2hvcnRUZXh0OiBbXHJcbiAgICByZXNvdXJjZS5zdW5kYXlTaG9ydFRleHQsXHJcbiAgICByZXNvdXJjZS5tb25kYXlTaG9ydFRleHQsXHJcbiAgICByZXNvdXJjZS50dWVzZGF5U2hvcnRUZXh0LFxyXG4gICAgcmVzb3VyY2Uud2VkbmVzZGF5U2hvcnRUZXh0LFxyXG4gICAgcmVzb3VyY2UudGh1cnNkYXlTaG9ydFRleHQsXHJcbiAgICByZXNvdXJjZS5mcmlkYXlTaG9ydFRleHQsXHJcbiAgICByZXNvdXJjZS5zYXR1cmRheVNob3J0VGV4dCxcclxuICBdLFxyXG5cclxuICB0b2dnbGVDb2xsYXBzZUNsYXNzOiAnZmEgZmEtY2hldnJvbi1kb3duJyxcclxuICB0b2dnbGVFeHBhbmRDbGFzczogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnLFxyXG4gIGVuYWJsZVB1bGxUb1JlZnJlc2g6IGZhbHNlLFxyXG5cclxuICAvLyBUZW1wbGF0ZXNcclxuICB3aWRnZXRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGlkPVwieyU9ICQuaWQgJX1cIiBkYXRhLXRpdGxlPVwieyU9ICQudGl0bGVUZXh0ICV9XCIgY2xhc3M9XCJvdmVydGhyb3cgbGlzdCB7JT0gJC5jbHMgJX1cIiB7JSBpZiAoJC5yZXNvdXJjZUtpbmQpIHsgJX1kYXRhLXJlc291cmNlLWtpbmQ9XCJ7JT0gJC5yZXNvdXJjZUtpbmQgJX1cInslIH0gJX0+JyxcclxuICAgICc8ZGl2IGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJzZWFyY2hOb2RlXCI+PC9kaXY+JyxcclxuICAgICd7JSEgJC5uYXZpZ2F0aW9uVGVtcGxhdGUgJX0nLFxyXG4gICAgJzxkaXYgc3R5bGU9XCJjbGVhcjpib3RoXCI+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibW9udGgtY29udGVudFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJtb250aE5vZGVcIj4nLFxyXG4gICAgJ3slISAkLm5hdkJhclRlbXBsYXRlICV9JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibW9udGgtY2FsZW5kYXJcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiY29udGVudE5vZGVcIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImRheS1jb250ZW50XCI+JyxcclxuICAgICc8aDIgY2xhc3M9XCJkYXRlLWRheS10ZXh0XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImRheVRpdGxlTm9kZVwiPjwvaDI+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiZXZlbnQtY29udGVudCBldmVudC1oaWRkZW5cIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZXZlbnRDb250YWluZXJOb2RlXCI+JyxcclxuICAgICc8aDIgZGF0YS1hY3Rpb249XCJ0b2dnbGVHcm91cFwiPjxidXR0b24gZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImNvbGxhcHNlQnV0dG9uXCIgY2xhc3M9XCJ7JT0gJCQudG9nZ2xlQ29sbGFwc2VDbGFzcyAlfVwiIGFyaWEtbGFiZWw9XCJ7JTogJCQudG9nZ2xlQ29sbGFwc2VUZXh0ICV9XCI+PC9idXR0b24+eyU9ICQuZXZlbnRIZWFkZXJUZXh0ICV9PC9oMj4nLFxyXG4gICAgJzx1bCBjbGFzcz1cImxpc3QtY29udGVudFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJldmVudENvbnRlbnROb2RlXCI+PC91bD4nLFxyXG4gICAgJ3slISAkLmV2ZW50TW9yZVRlbXBsYXRlICV9JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJhY3Rpdml0eS1jb250ZW50XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImFjdGl2aXR5Q29udGFpbmVyTm9kZVwiPicsXHJcbiAgICAnPGgyPnslPSAkLmFjdGl2aXR5SGVhZGVyVGV4dCAlfTwvaDI+JyxcclxuICAgICc8dWwgY2xhc3M9XCJsaXN0LWNvbnRlbnRcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiYWN0aXZpdHlDb250ZW50Tm9kZVwiPjwvdWw+JyxcclxuICAgICd7JSEgJC5hY3Rpdml0eU1vcmVUZW1wbGF0ZSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzxkaXYgc3R5bGU9XCJjbGVhcjpib3RoXCI+PC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIG5hdmlnYXRpb25UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwic3BsaXQtYnV0dG9uc1wiPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJ0b2RheVwiIGRhdGEtYWN0aW9uPVwiZ2V0VG9kYXlNb250aEFjdGl2aXRpZXNcIiBjbGFzcz1cImJ1dHRvblwiPnslOiAkLnRvZGF5VGV4dCAlfTwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJzZWxlY3RkYXRlXCIgZGF0YS1hY3Rpb249XCJzZWxlY3REYXRlXCIgY2xhc3M9XCJidXR0b24gZmEgZmEtY2FsZW5kYXJcIj48c3Bhbj48L3NwYW4+PC9idXR0b24+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtdG9vbD1cImRheVwiIGRhdGEtYWN0aW9uPVwibmF2aWdhdGVUb0RheVZpZXdcIiBjbGFzcz1cImJ1dHRvblwiPnslOiAkLmRheVRleHQgJX08L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwid2Vla1wiIGRhdGEtYWN0aW9uPVwibmF2aWdhdGVUb1dlZWtWaWV3XCIgY2xhc3M9XCJidXR0b25cIj57JTogJC53ZWVrVGV4dCAlfTwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJtb250aFwiIGNsYXNzPVwiYnV0dG9uIGN1cnJlbnRcIj57JTogJC5tb250aFRleHQgJX08L2J1dHRvbj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgbmF2QmFyVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cIm5hdi1iYXJcIj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwibmV4dFwiIGRhdGEtYWN0aW9uPVwiZ29Ub05leHRNb250aFwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1uZXh0IGZhIGZhLWFycm93LXJpZ2h0IGZhLWxnXCI+PHNwYW4+PC9zcGFuPjwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJwcmV2XCIgZGF0YS1hY3Rpb249XCJnb1RvUHJldmlvdXNNb250aFwiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmV2IGZhIGZhLWFycm93LWxlZnQgZmEtbGdcIj48c3Bhbj48L3NwYW4+PC9idXR0b24+JyxcclxuICAgICc8aDQgY2xhc3M9XCJkYXRlLXRleHRcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZGF0ZU5vZGVcIj48L2g0PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBhY3Rpdml0eVJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBkYXRhLWFjdGlvbj1cImFjdGl2YXRlRW50cnlcIiBkYXRhLWtleT1cInslPSAkLiRrZXkgJX1cIiBkYXRhLWRlc2NyaXB0b3I9XCJ7JTogJC4kZGVzY3JpcHRvciAlfVwiIGRhdGEtYWN0aXZpdHktdHlwZT1cInslOiAkLlR5cGUgJX1cIj4nLFxyXG4gICAgJzx0YWJsZSBjbGFzcz1cImNhbGVuZGFyLWVudHJ5LXRhYmxlXCI+PHRyPicsXHJcbiAgICAnPHRkIGNsYXNzPVwiZW50cnktdGFibGUtaWNvblwiPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLWFjdGlvbj1cInNlbGVjdEVudHJ5XCIgY2xhc3M9XCJsaXN0LWl0ZW0tc2VsZWN0b3IgYnV0dG9uIHslPSAkJC5hY3Rpdml0eVR5cGVJY29uWyQuVHlwZV0gJX1cIj4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPC90ZD4nLFxyXG4gICAgJzx0ZCBjbGFzcz1cImVudHJ5LXRhYmxlLXRpbWVcIj57JSEgJCQuYWN0aXZpdHlUaW1lVGVtcGxhdGUgJX08L3RkPicsXHJcbiAgICAnPHRkIGNsYXNzPVwiZW50cnktdGFibGUtZGVzY3JpcHRpb25cIj57JSEgJCQuYWN0aXZpdHlJdGVtVGVtcGxhdGUgJX08L3RkPicsXHJcbiAgICAnPC90cj48L3RhYmxlPicsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG4gIGV2ZW50Um93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFbnRyeVwiIGRhdGEta2V5PVwieyU9ICQuJGtleSAlfVwiIGRhdGEtZGVzY3JpcHRvcj1cInslOiAkLiRkZXNjcmlwdG9yICV9XCIgZGF0YS1hY3Rpdml0eS10eXBlPVwiRXZlbnRcIj4nLFxyXG4gICAgJzx0YWJsZSBjbGFzcz1cImNhbGVuZGFyLWVudHJ5LXRhYmxlXCI+PHRyPicsXHJcbiAgICAnPHRkIGNsYXNzPVwiZW50cnktdGFibGUtaWNvblwiPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLWFjdGlvbj1cInNlbGVjdEVudHJ5XCIgY2xhc3M9XCJsaXN0LWl0ZW0tc2VsZWN0b3IgYnV0dG9uIHslPSAkJC5hY3Rpdml0eVR5cGVJY29uLmV2ZW50ICV9XCI+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzwvdGQ+JyxcclxuICAgICc8dGQgY2xhc3M9XCJlbnRyeS10YWJsZS1kZXNjcmlwdGlvblwiPnslISAkJC5ldmVudEl0ZW1UZW1wbGF0ZSAlfTwvdGQ+JyxcclxuICAgICc8L3RyPjwvdGFibGU+JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcbiAgYWN0aXZpdHlUaW1lVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQuVGltZWxlc3MpIHsgJX0nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwicC10aW1lXCI+eyU9ICQkLmFsbERheVRleHQgJX08L3NwYW4+JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJwLXRpbWVcIj57JTogY3JtLkZvcm1hdC5kYXRlKCQuU3RhcnREYXRlLCAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyAkJC5zdGFydFRpbWVGb3JtYXRUZXh0MjQgOiAkJC5zdGFydFRpbWVGb3JtYXRUZXh0KSAlfTwvc3Bhbj4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG4gIGFjdGl2aXR5SXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZyBwLWRlc2NyaXB0aW9uXCI+eyU6ICQuRGVzY3JpcHRpb24gJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JT0gJCQuYWN0aXZpdHlOYW1lVGVtcGxhdGUuYXBwbHkoJCkgJX08L3A+JyxcclxuICBdKSxcclxuICBldmVudEl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmcgcC1kZXNjcmlwdGlvblwiPnslOiAkLkRlc2NyaXB0aW9uICV9ICh7JTogJC5UeXBlICV9KTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslISAkJC5ldmVudE5hbWVUZW1wbGF0ZSAlfTwvcD4nLFxyXG4gIF0pLFxyXG4gIGFjdGl2aXR5TmFtZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkLkNvbnRhY3ROYW1lKSB7ICV9JyxcclxuICAgICd7JTogJC5Db250YWN0TmFtZSAlfSAvIHslOiAkLkFjY291bnROYW1lICV9JyxcclxuICAgICd7JSB9IGVsc2UgaWYgKCQuQWNjb3VudE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slOiAkLkFjY291bnROYW1lICV9JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAneyU6ICQuTGVhZE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG4gIGV2ZW50TmFtZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slOiBjcm0uRm9ybWF0LmRhdGUoJC5TdGFydERhdGUsICQkLmV2ZW50RGF0ZUZvcm1hdFRleHQpICV9JyxcclxuICAgICcmbmJzcDstJm5ic3A7JyxcclxuICAgICd7JTogY3JtLkZvcm1hdC5kYXRlKCQuRW5kRGF0ZSwgJCQuZXZlbnREYXRlRm9ybWF0VGV4dCkgJX0nLFxyXG4gIF0pLFxyXG4gIGFjdGl2aXR5TW9yZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJsaXN0LW1vcmVcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiYWN0aXZpdHlNb3JlTm9kZVwiPicsXHJcbiAgICAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVBY3Rpdml0eU1vcmVcIj4nLFxyXG4gICAgJzxzcGFuIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJhY3Rpdml0eVJlbWFpbmluZ0NvbnRlbnROb2RlXCI+eyU9ICQuY291bnRNb3JlVGV4dCAlfTwvc3Bhbj4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBldmVudE1vcmVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibGlzdC1tb3JlXCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImV2ZW50TW9yZU5vZGVcIj4nLFxyXG4gICAgJzxidXR0b24gY2xhc3M9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cImFjdGl2YXRlRXZlbnRNb3JlXCI+JyxcclxuICAgICc8c3BhbiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZXZlbnRSZW1haW5pbmdDb250ZW50Tm9kZVwiPnslPSAkLmNvdW50TW9yZVRleHQgJX08L3NwYW4+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgY2FsZW5kYXJTdGFydFRlbXBsYXRlOiAnPHRhYmxlIGNsYXNzPVwib2xkLWNhbGVuZGFyLXRhYmxlXCI+JyxcclxuICBjYWxlbmRhcldlZWtIZWFkZXJTdGFydFRlbXBsYXRlOiAnPHRyIGNsYXNzPVwib2xkLWNhbGVuZGFyLXdlZWstaGVhZGVyXCI+JyxcclxuICBjYWxlbmRhcldlZWtIZWFkZXJUZW1wbGF0ZTogJzx0ZCBjbGFzcz1cIm9sZC1jYWxlbmRhci13ZWVrZGF5XCI+JHswfTwvdGQ+JyxcclxuICBjYWxlbmRhcldlZWtIZWFkZXJFbmRUZW1wbGF0ZTogJzwvdHI+JyxcclxuICBjYWxlbmRhcldlZWtTdGFydFRlbXBsYXRlOiAnPHRyIGNsYXNzPVwib2xkLWNhbGVuZGFyLXdlZWtcIj4nLFxyXG4gIGNhbGVuZGFyRW1wdHlEYXlUZW1wbGF0ZTogJzx0ZD4mbmJzcDs8L3RkPicsXHJcbiAgY2FsZW5kYXJEYXlUZW1wbGF0ZTogJzx0ZCBjbGFzcz1cIm9sZC1jYWxlbmRhci1kYXkgJHsxfVwiIGRhdGEtYWN0aW9uPVwic2VsZWN0RGF5XCIgZGF0YS1kYXRlPVwiJHsyfVwiPiR7MH08L3RkPicsXHJcbiAgY2FsZW5kYXJXZWVrRW5kVGVtcGxhdGU6ICc8L3RyPicsXHJcbiAgY2FsZW5kYXJFbmRUZW1wbGF0ZTogJzwvdGFibGU+JyxcclxuICBjYWxlbmRhckFjdGl2aXR5Q291bnRUZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwib2xkLWFjdGl2aXR5LWNvdW50XCIgdGl0bGU9XCIkezB9IGV2ZW50c1wiPiR7MH08L3NwYW4+JyxcclxuXHJcbiAgYXR0cmlidXRlTWFwOiB7XHJcbiAgICBjYWxlbmRhckNvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2NvbnRlbnROb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgZGF0ZUNvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2RhdGVOb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgZGF5VGl0bGVDb250ZW50OiB7XHJcbiAgICAgIG5vZGU6ICdkYXlUaXRsZU5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBhY3Rpdml0eUNvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2FjdGl2aXR5Q29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBldmVudENvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2V2ZW50Q29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBldmVudFJlbWFpbmluZ0NvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2V2ZW50UmVtYWluaW5nQ29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBhY3Rpdml0eVJlbWFpbmluZ0NvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2FjdGl2aXR5UmVtYWluaW5nQ29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBldmVudENvbnRhaW5lck5vZGU6IG51bGwsXHJcbiAgYWN0aXZpdHlDb250YWluZXJOb2RlOiBudWxsLFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2NhbGVuZGFyX21vbnRobGlzdCcsXHJcbiAgY2xzOiAnYWN0aXZpdGllcy1mb3ItbW9udGgnLFxyXG4gIGRheVZpZXc6ICdjYWxlbmRhcl9kYXlsaXN0JyxcclxuICBkYXRlUGlja2VyVmlldzogJ2dlbmVyaWNfY2FsZW5kYXInLFxyXG4gIHdlZWtWaWV3OiAnY2FsZW5kYXJfd2Vla2xpc3QnLFxyXG4gIGluc2VydFZpZXc6ICdhY3Rpdml0eV90eXBlc19saXN0JyxcclxuICBhY3Rpdml0eURldGFpbFZpZXc6ICdhY3Rpdml0eV9kZXRhaWwnLFxyXG4gIGV2ZW50RGV0YWlsVmlldzogJ2V2ZW50X2RldGFpbCcsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGRhdGVDb3VudHM6IG51bGwsXHJcbiAgY3VycmVudERhdGU6IG51bGwsXHJcblxyXG4gIHBhZ2VTaXplOiA1MDAsXHJcbiAgcXVlcnlXaGVyZTogbnVsbCxcclxuICBxdWVyeU9yZGVyQnk6ICdTdGFydERhdGUgZGVzYycsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdTdGFydERhdGUnLFxyXG4gICAgJ1RpbWVsZXNzJyxcclxuICAgICdUeXBlJyxcclxuICBdLFxyXG4gIGZlZWQ6IG51bGwsXHJcbiAgZXZlbnRGZWVkOiBudWxsLFxyXG4gIGVudHJpZXM6IG51bGwsXHJcbiAgc2VsZWN0ZWREYXRlUmVxdWVzdHM6IG51bGwsXHJcbiAgc2VsZWN0ZWREYXRlRXZlbnRSZXF1ZXN0czogbnVsbCxcclxuICBtb250aFJlcXVlc3RzOiBudWxsLFxyXG4gIG1vbnRoRXZlbnRSZXF1ZXN0czogbnVsbCxcclxuXHJcbiAgZXZlbnRQYWdlU2l6ZTogMyxcclxuICBldmVudFF1ZXJ5V2hlcmU6IG51bGwsXHJcbiAgZXZlbnRRdWVyeVNlbGVjdDogW1xyXG4gICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAnRW5kRGF0ZScsXHJcbiAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgJ1R5cGUnLFxyXG4gIF0sXHJcblxyXG4gIGFjdGl2aXR5UGFnZVNpemU6IDEwLFxyXG4gIGFjdGl2aXR5UXVlcnlXaGVyZTogbnVsbCxcclxuICBhY3Rpdml0eVF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnU3RhcnREYXRlJyxcclxuICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAnVHlwZScsXHJcbiAgICAnQWNjb3VudE5hbWUnLFxyXG4gICAgJ0NvbnRhY3ROYW1lJyxcclxuICAgICdMZWFkSWQnLFxyXG4gICAgJ0xlYWROYW1lJyxcclxuICAgICdVc2VySWQnLFxyXG4gICAgJ1RpbWVsZXNzJyxcclxuICAgICdSZWN1cnJpbmcnLFxyXG4gIF0sXHJcbiAgYWN0aXZpdHlUeXBlSWNvbjogYWN0aXZpdHlUeXBlSWNvbnMuZGVmYXVsdCxcclxuXHJcbiAgcmVzb3VyY2VLaW5kOiAnYWN0aXZpdGllcycsXHJcblxyXG4gIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZmVlZCA9IHt9O1xyXG4gICAgdGhpcy5ldmVudEZlZWQgPSB7fTtcclxuICAgIHRoaXMuZW50cmllcyA9IHt9O1xyXG4gICAgdGhpcy5kYXRlQ291bnRzID0gW107XHJcbiAgfSxcclxuICBfb25SZWZyZXNoOiBmdW5jdGlvbiBfb25SZWZyZXNoKG8pIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBpZiAoby5yZXNvdXJjZUtpbmQgPT09ICdhY3Rpdml0aWVzJyB8fCBvLnJlc291cmNlS2luZCA9PT0gJ2V2ZW50cycpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge30sXHJcbiAgc3RhcnR1cDogZnVuY3Rpb24gc3RhcnR1cCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlID0gbW9tZW50KClcclxuICAgICAgLnN0YXJ0T2YoJ2RheScpO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5yZW5kZXJDYWxlbmRhcigpO1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVBY3Rpdml0eU1vcmU6IGZ1bmN0aW9uIGFjdGl2YXRlQWN0aXZpdHlNb3JlKCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvRGF5VmlldygpO1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVFdmVudE1vcmU6IGZ1bmN0aW9uIGFjdGl2YXRlRXZlbnRNb3JlKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdldmVudF9yZWxhdGVkJyk7XHJcbiAgICBjb25zdCB3aGVyZSA9IHRoaXMuZ2V0U2VsZWN0ZWREYXRlRXZlbnRRdWVyeSgpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICB3aGVyZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICB0b2dnbGVHcm91cDogZnVuY3Rpb24gdG9nZ2xlR3JvdXAocGFyYW1zKSB7XHJcbiAgICBjb25zdCBub2RlID0gcGFyYW1zLiRzb3VyY2U7XHJcbiAgICBpZiAobm9kZSAmJiBub2RlLnBhcmVudE5vZGUpIHtcclxuICAgICAgJChub2RlKS50b2dnbGVDbGFzcygnY29sbGFwc2VkJyk7XHJcbiAgICAgICQobm9kZS5wYXJlbnROb2RlKS50b2dnbGVDbGFzcygnY29sbGFwc2VkLWV2ZW50Jyk7XHJcblxyXG4gICAgICBjb25zdCBidXR0b24gPSB0aGlzLmNvbGxhcHNlQnV0dG9uO1xyXG5cclxuICAgICAgaWYgKGJ1dHRvbikge1xyXG4gICAgICAgICQoYnV0dG9uKS50b2dnbGVDbGFzcyh0aGlzLnRvZ2dsZUNvbGxhcHNlQ2xhc3MpO1xyXG4gICAgICAgICQoYnV0dG9uKS50b2dnbGVDbGFzcyh0aGlzLnRvZ2dsZUV4cGFuZENsYXNzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VsZWN0RGF5OiBmdW5jdGlvbiBzZWxlY3REYXkocGFyYW1zLCBldnQsIGVsKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZERhdGVOb2RlKSB7XHJcbiAgICAgICQodGhpcy5zZWxlY3RlZERhdGVOb2RlKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZU5vZGUgPSBlbDtcclxuICAgICQoZWwpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cclxuICAgIHRoaXMuY3VycmVudERhdGUgPSBtb21lbnQocGFyYW1zLmRhdGUsICdZWVlZLU1NLUREJyk7XHJcbiAgICB0aGlzLmdldFNlbGVjdGVkRGF0ZSgpO1xyXG4gIH0sXHJcbiAgZ2V0Rmlyc3REYXlPZkN1cnJlbnRNb250aDogZnVuY3Rpb24gZ2V0Rmlyc3REYXlPZkN1cnJlbnRNb250aCgpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnREYXRlLmNsb25lKClcclxuICAgICAgLnN0YXJ0T2YoJ21vbnRoJyk7XHJcbiAgfSxcclxuICBnZXRMYXN0RGF5T2ZDdXJyZW50TW9udGg6IGZ1bmN0aW9uIGdldExhc3REYXlPZkN1cnJlbnRNb250aCgpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnREYXRlLmNsb25lKClcclxuICAgICAgLmVuZE9mKCdtb250aCcpO1xyXG4gIH0sXHJcbiAgZ2V0VG9kYXlNb250aEFjdGl2aXRpZXM6IGZ1bmN0aW9uIGdldFRvZGF5TW9udGhBY3Rpdml0aWVzKCkge1xyXG4gICAgY29uc3QgdG9kYXkgPSBtb21lbnQoKVxyXG4gICAgICAuc3RhcnRPZignZGF5Jyk7XHJcblxyXG4gICAgaWYgKHRoaXMuY3VycmVudERhdGUuZm9ybWF0KCdZWVlZLU1NJykgPT09IHRvZGF5LmZvcm1hdCgnWVlZWS1NTScpKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudERhdGUgPSB0b2RheTtcclxuICAgICAgdGhpcy5oaWdobGlnaHRDdXJyZW50RGF0ZSgpO1xyXG4gICAgICB0aGlzLmdldFNlbGVjdGVkRGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHRvZGF5O1xyXG4gICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdvVG9OZXh0TW9udGg6IGZ1bmN0aW9uIGdvVG9OZXh0TW9udGgoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlLmFkZCh7XHJcbiAgICAgIG1vbnRoczogMSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfSxcclxuICBnb1RvUHJldmlvdXNNb250aDogZnVuY3Rpb24gZ29Ub1ByZXZpb3VzTW9udGgoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlLnN1YnRyYWN0KHtcclxuICAgICAgbW9udGhzOiAxLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9LFxyXG4gIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XHJcbiAgICB0aGlzLnJlbmRlckNhbGVuZGFyKCk7XHJcbiAgICB0aGlzLnF1ZXJ5V2hlcmUgPSB0aGlzLmdldEFjdGl2aXR5UXVlcnkoKTtcclxuICAgIHRoaXMuZmVlZCA9IG51bGw7XHJcbiAgICB0aGlzLmV2ZW50RmVlZCA9IG51bGw7XHJcbiAgICB0aGlzLmRhdGVDb3VudHMgPSBbXTtcclxuICAgIHRoaXMucmVxdWVzdERhdGEoKTtcclxuICAgIHRoaXMucmVxdWVzdEV2ZW50RGF0YSgpO1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgdGhpcy5jYW5jZWxSZXF1ZXN0cyh0aGlzLm1vbnRoUmVxdWVzdHMpO1xyXG4gICAgdGhpcy5tb250aFJlcXVlc3RzID0gW107XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuY3JlYXRlUmVxdWVzdCgpO1xyXG4gICAgcmVxdWVzdC5zZXRDb250cmFjdE5hbWUodGhpcy5jb250cmFjdE5hbWUgfHwgJ3N5c3RlbScpO1xyXG5cclxuICAgIGNvbnN0IHhociA9IHJlcXVlc3QucmVhZCh7XHJcbiAgICAgIHN1Y2Nlc3M6IHRoaXMub25SZXF1ZXN0RGF0YVN1Y2Nlc3MsXHJcbiAgICAgIGZhaWx1cmU6IHRoaXMub25SZXF1ZXN0RGF0YUZhaWx1cmUsXHJcbiAgICAgIGFib3J0ZWQ6IHRoaXMub25SZXF1ZXN0RGF0YUFib3J0ZWQsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1vbnRoUmVxdWVzdHMucHVzaCh4aHIpO1xyXG4gIH0sXHJcbiAgY3JlYXRlRXZlbnRSZXF1ZXN0OiBmdW5jdGlvbiBjcmVhdGVFdmVudFJlcXVlc3QoKSB7XHJcbiAgICBjb25zdCBxdWVyeVNlbGVjdCA9IHRoaXMuZXZlbnRRdWVyeVNlbGVjdDtcclxuICAgIGNvbnN0IHF1ZXJ5V2hlcmUgPSB0aGlzLmdldEV2ZW50UXVlcnkoKTtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFSZXNvdXJjZUNvbGxlY3Rpb25SZXF1ZXN0KHRoaXMuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0Q291bnQodGhpcy5wYWdlU2l6ZSlcclxuICAgICAgLnNldFN0YXJ0SW5kZXgoMSlcclxuICAgICAgLnNldFJlc291cmNlS2luZCgnZXZlbnRzJylcclxuICAgICAgLnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuU2VsZWN0LCB0aGlzLmV4cGFuZEV4cHJlc3Npb24ocXVlcnlTZWxlY3QpXHJcbiAgICAgICAgLmpvaW4oJywnKSlcclxuICAgICAgLnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuV2hlcmUsIHF1ZXJ5V2hlcmUpO1xyXG5cclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH0sXHJcbiAgcmVxdWVzdEV2ZW50RGF0YTogZnVuY3Rpb24gcmVxdWVzdEV2ZW50RGF0YSgpIHtcclxuICAgIHRoaXMuY2FuY2VsUmVxdWVzdHModGhpcy5tb250aEV2ZW50UmVxdWVzdHMpO1xyXG4gICAgdGhpcy5tb250aEV2ZW50UmVxdWVzdHMgPSBbXTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5jcmVhdGVFdmVudFJlcXVlc3QoKTtcclxuICAgIGNvbnN0IHhociA9IHJlcXVlc3QucmVhZCh7XHJcbiAgICAgIHN1Y2Nlc3M6IHRoaXMub25SZXF1ZXN0RXZlbnREYXRhU3VjY2VzcyxcclxuICAgICAgZmFpbHVyZTogdGhpcy5vblJlcXVlc3RFdmVudERhdGFGYWlsdXJlLFxyXG4gICAgICBhYm9ydGVkOiB0aGlzLm9uUmVxdWVzdEV2ZW50RGF0YUFib3J0ZWQsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1vbnRoRXZlbnRSZXF1ZXN0cy5wdXNoKHhocik7XHJcbiAgfSxcclxuICBvblJlcXVlc3RFdmVudERhdGFGYWlsdXJlOiBmdW5jdGlvbiBvblJlcXVlc3RFdmVudERhdGFGYWlsdXJlKHJlc3BvbnNlLCBvKSB7XHJcbiAgICBhbGVydChzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLnJlcXVlc3RFcnJvclRleHQsIFtyZXNwb25zZSwgb10pKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgRXJyb3JNYW5hZ2VyLmFkZEVycm9yKHJlc3BvbnNlLCBvLCB0aGlzLm9wdGlvbnMsICdmYWlsdXJlJyk7XHJcbiAgfSxcclxuICBvblJlcXVlc3RFdmVudERhdGFBYm9ydGVkOiBmdW5jdGlvbiBvblJlcXVlc3RFdmVudERhdGFBYm9ydGVkKCkge1xyXG4gICAgdGhpcy5vcHRpb25zID0gZmFsc2U7IC8vIGZvcmNlIGEgcmVmcmVzaFxyXG4gIH0sXHJcbiAgb25SZXF1ZXN0RXZlbnREYXRhU3VjY2VzczogZnVuY3Rpb24gb25SZXF1ZXN0RXZlbnREYXRhU3VjY2VzcyhmZWVkKSB7XHJcbiAgICB0aGlzLnByb2Nlc3NFdmVudEZlZWQoZmVlZCk7XHJcbiAgfSxcclxuICBnZXRBY3Rpdml0eVF1ZXJ5OiBmdW5jdGlvbiBnZXRBY3Rpdml0eVF1ZXJ5KCkge1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy5nZXRGaXJzdERheU9mQ3VycmVudE1vbnRoKCk7XHJcbiAgICBjb25zdCBlbmREYXRlID0gdGhpcy5nZXRMYXN0RGF5T2ZDdXJyZW50TW9udGgoKTtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShcclxuICAgICAgW1xyXG4gICAgICAgICdVc2VyQWN0aXZpdGllcy5Vc2VySWQgZXEgXCIkezB9XCIgYW5kIFR5cGUgbmUgXCJhdExpdGVyYXR1cmVcIiBhbmQgKCcsXHJcbiAgICAgICAgJyhUaW1lbGVzcyBlcSBmYWxzZSBhbmQgU3RhcnREYXRlJyxcclxuICAgICAgICAnIGJldHdlZW4gQCR7MX1AIGFuZCBAJHsyfUApIG9yICcsXHJcbiAgICAgICAgJyhUaW1lbGVzcyBlcSB0cnVlIGFuZCBTdGFydERhdGUnLFxyXG4gICAgICAgICcgYmV0d2VlbiBAJHszfUAgYW5kIEAkezR9QCkpJyxcclxuICAgICAgXS5qb2luKCcnKSwgW0FwcC5jb250ZXh0LnVzZXIgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5LFxyXG4gICAgICAgIGNvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZShzdGFydERhdGUudG9EYXRlKCkpLFxyXG4gICAgICAgIGNvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZShlbmREYXRlLnRvRGF0ZSgpKSxcclxuICAgICAgICBzdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyksXHJcbiAgICAgICAgZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tRERUMjM6NTk6NTlbWl0nKSxcclxuICAgICAgXVxyXG4gICAgKTtcclxuICB9LFxyXG4gIGdldEV2ZW50UXVlcnk6IGZ1bmN0aW9uIGdldEV2ZW50UXVlcnkoKSB7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmdldEZpcnN0RGF5T2ZDdXJyZW50TW9udGgoKTtcclxuICAgIGNvbnN0IGVuZERhdGUgPSB0aGlzLmdldExhc3REYXlPZkN1cnJlbnRNb250aCgpO1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdGl0dXRlKFxyXG4gICAgICBbXHJcbiAgICAgICAgJ1VzZXJJZCBlcSBcIiR7MH1cIiBhbmQgKCcsXHJcbiAgICAgICAgJyhTdGFydERhdGUgZ3QgQCR7MX1AIG9yIEVuZERhdGUgZ3QgQCR7MX1AKSBhbmQgJyxcclxuICAgICAgICAnU3RhcnREYXRlIGx0IEAkezJ9QCcsXHJcbiAgICAgICAgJyknLFxyXG4gICAgICBdLmpvaW4oJycpLCBbQXBwLmNvbnRleHQudXNlciAmJiBBcHAuY29udGV4dC51c2VyLiRrZXksXHJcbiAgICAgICAgY29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHN0YXJ0RGF0ZS50b0RhdGUoKSksXHJcbiAgICAgICAgY29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKGVuZERhdGUudG9EYXRlKCkpLFxyXG4gICAgICBdXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0ZlZWQ6IGZ1bmN0aW9uIHByb2Nlc3NGZWVkKGZlZWQpIHtcclxuICAgIGlmICghZmVlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgciA9IGZlZWQuJHJlc291cmNlcztcclxuICAgIHRoaXMuZmVlZCA9IGZlZWQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IHJbaV07XHJcblxyXG4gICAgICAvLyBQcmVzZXJ2ZSB0aGUgaXNFdmVudCBmbGFnIGlmIHdlIGhhdmUgYW4gZXhpc3RpbmcgZW50cnkgZm9yIGl0IGFscmVhZHksXHJcbiAgICAgIC8vIHRoZSBvcmRlciBvZiBwcm9jZXNzRmVlZCBhbmQgcHJvY2Vzc0V2ZW50RmVlZCBpcyBub3QgcHJlZGljdGFibGVcclxuICAgICAgcm93LmlzRXZlbnQgPSB0aGlzLmVudHJpZXNbcm93LiRrZXldICYmIHRoaXMuZW50cmllc1tyb3cuJGtleV0uaXNFdmVudDtcclxuXHJcbiAgICAgIHRoaXMuZW50cmllc1tyb3cuJGtleV0gPSByb3c7XHJcblxyXG4gICAgICBjb25zdCBzdGFydERheSA9IG1vbWVudChjb252ZXJ0LnRvRGF0ZUZyb21TdHJpbmcocm93LlN0YXJ0RGF0ZSkpO1xyXG4gICAgICBpZiAocltpXS5UaW1lbGVzcykge1xyXG4gICAgICAgIHN0YXJ0RGF5LnN1YnRyYWN0KHtcclxuICAgICAgICAgIG1pbnV0ZXM6IHN0YXJ0RGF5LnV0Y09mZnNldCgpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkYXRlSW5kZXggPSBzdGFydERheS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgdGhpcy5kYXRlQ291bnRzW2RhdGVJbmRleF0gPSAodGhpcy5kYXRlQ291bnRzW2RhdGVJbmRleF0pID8gdGhpcy5kYXRlQ291bnRzW2RhdGVJbmRleF0gKyAxIDogMTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhpZ2hsaWdodEFjdGl2aXRpZXMoKTtcclxuICB9LFxyXG4gIHByb2Nlc3NFdmVudEZlZWQ6IGZ1bmN0aW9uIHByb2Nlc3NFdmVudEZlZWQoZmVlZCkge1xyXG4gICAgaWYgKCFmZWVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByID0gZmVlZC4kcmVzb3VyY2VzO1xyXG4gICAgY29uc3QgZmVlZExlbmd0aCA9IHIubGVuZ3RoO1xyXG4gICAgdGhpcy5ldmVudEZlZWQgPSBmZWVkO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmVlZExlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IHJbaV07XHJcbiAgICAgIC8vIFByZXNlcnZlIHRoZSBpc0V2ZW50IGZsYWcgaWYgd2UgaGF2ZSBhbiBleGlzdGluZyBlbnRyeSBmb3IgaXQgYWxyZWFkeSxcclxuICAgICAgLy8gdGhlIG9yZGVyIG9mIHByb2Nlc3NGZWVkIGFuZCBwcm9jZXNzRXZlbnRGZWVkIGlzIG5vdCBwcmVkaWN0YWJsZVxyXG4gICAgICByb3cuaXNFdmVudCA9IHRoaXMuZW50cmllc1tyb3cuJGtleV0gJiYgdGhpcy5lbnRyaWVzW3Jvdy4ka2V5XS5pc0V2ZW50O1xyXG4gICAgICB0aGlzLmVudHJpZXNbcm93LiRrZXldID0gcm93O1xyXG5cclxuICAgICAgY29uc3Qgc3RhcnREYXkgPSBtb21lbnQoY29udmVydC50b0RhdGVGcm9tU3RyaW5nKHJvdy5TdGFydERhdGUpKTtcclxuICAgICAgY29uc3QgZW5kRGF5ID0gY29udmVydC50b0RhdGVGcm9tU3RyaW5nKHJvdy5FbmREYXRlKTtcclxuXHJcbiAgICAgIHdoaWxlIChzdGFydERheS52YWx1ZU9mKCkgPD0gZW5kRGF5LnZhbHVlT2YoKSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGVJbmRleCA9IHN0YXJ0RGF5LmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgIHRoaXMuZGF0ZUNvdW50c1tkYXRlSW5kZXhdID0gKHRoaXMuZGF0ZUNvdW50c1tkYXRlSW5kZXhdKSA/IHRoaXMuZGF0ZUNvdW50c1tkYXRlSW5kZXhdICsgMSA6IDE7XHJcbiAgICAgICAgc3RhcnREYXkuYWRkKHtcclxuICAgICAgICAgIGRheXM6IDEsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhpZ2hsaWdodEFjdGl2aXRpZXMoKTtcclxuICB9LFxyXG5cclxuICBoaWdobGlnaHRBY3Rpdml0aWVzOiBmdW5jdGlvbiBoaWdobGlnaHRBY3Rpdml0aWVzKCkge1xyXG4gICAgJCgnLm9sZC1jYWxlbmRhci1kYXknKVxyXG4gICAgICAuZWFjaCgoaSwgbm9kZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFEYXRlID0gJChub2RlKS5hdHRyKCdkYXRhLWRhdGUnKTtcclxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUNvdW50c1tkYXRhRGF0ZV0pIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQobm9kZSkuYWRkQ2xhc3MoJ2FjdGl2ZURheScpO1xyXG5cclxuICAgICAgICBjb25zdCBjb3VudE1hcmt1cCA9IHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuY2FsZW5kYXJBY3Rpdml0eUNvdW50VGVtcGxhdGUsIFt0aGlzLmRhdGVDb3VudHNbZGF0YURhdGVdXSk7XHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdDb3VudCA9ICQobm9kZSkuY2hpbGRyZW4oJ2RpdicpO1xyXG5cclxuICAgICAgICBpZiAoZXhpc3RpbmdDb3VudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAkKGV4aXN0aW5nQ291bnRbMF0pLmVtcHR5KCkuYXBwZW5kKGNvdW50TWFya3VwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJChub2RlKS5wcmVwZW5kKGA8ZGl2PiR7Y291bnRNYXJrdXB9PC9kaXY+YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCB0aGlzKTtcclxuICB9LFxyXG4gIHNldEN1cnJlbnREYXRlVGl0bGU6IGZ1bmN0aW9uIHNldEN1cnJlbnREYXRlVGl0bGUoKSB7XHJcbiAgICB0aGlzLnNldCgnZGF5VGl0bGVDb250ZW50JywgdGhpcy5jdXJyZW50RGF0ZS5mb3JtYXQodGhpcy5kYXlUaXRsZUZvcm1hdFRleHQpKTtcclxuICB9LFxyXG4gIGhpZGVFdmVudExpc3Q6IGZ1bmN0aW9uIGhpZGVFdmVudExpc3QoKSB7XHJcbiAgICAkKHRoaXMuZXZlbnRDb250YWluZXJOb2RlKS5hZGRDbGFzcygnZXZlbnQtaGlkZGVuJyk7XHJcbiAgfSxcclxuICBzaG93RXZlbnRMaXN0OiBmdW5jdGlvbiBzaG93RXZlbnRMaXN0KCkge1xyXG4gICAgJCh0aGlzLmV2ZW50Q29udGFpbmVyTm9kZSkucmVtb3ZlQ2xhc3MoJ2V2ZW50LWhpZGRlbicpO1xyXG4gIH0sXHJcbiAgZ2V0U2VsZWN0ZWREYXRlOiBmdW5jdGlvbiBnZXRTZWxlY3RlZERhdGUoKSB7XHJcbiAgICB0aGlzLmNsZWFyU2VsZWN0ZWREYXRlKCk7XHJcbiAgICB0aGlzLnNldEN1cnJlbnREYXRlVGl0bGUoKTtcclxuICAgIHRoaXMucmVxdWVzdFNlbGVjdGVkRGF0ZUFjdGl2aXRpZXMoKTtcclxuICAgIHRoaXMucmVxdWVzdFNlbGVjdGVkRGF0ZUV2ZW50cygpO1xyXG4gIH0sXHJcbiAgY2xlYXJTZWxlY3RlZERhdGU6IGZ1bmN0aW9uIGNsZWFyU2VsZWN0ZWREYXRlKCkge1xyXG4gICAgJCh0aGlzLmFjdGl2aXR5Q29udGFpbmVyTm9kZSkuYWRkQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gICAgdGhpcy5zZXQoJ2FjdGl2aXR5Q29udGVudCcsIHRoaXMubG9hZGluZ1RlbXBsYXRlLmFwcGx5KHRoaXMpKTtcclxuICAgIHRoaXMuaGlkZUV2ZW50TGlzdCgpO1xyXG4gIH0sXHJcbiAgY2FuY2VsUmVxdWVzdHM6IGZ1bmN0aW9uIGNhbmNlbFJlcXVlc3RzKHJlcXVlc3RzKSB7XHJcbiAgICBpZiAoIXJlcXVlc3RzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0cy5mb3JFYWNoKCh4aHIpID0+IHtcclxuICAgICAgaWYgKHhocikgeyAvLyBpZiByZXF1ZXN0IHdhcyBmdWxmaWxsZWQgYnkgb2ZmbGluZSBzdG9yYWdlLCB4aHIgd2lsbCBiZSB1bmRlZmluZWRcclxuICAgICAgICB4aHIuYWJvcnQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICByZXF1ZXN0U2VsZWN0ZWREYXRlQWN0aXZpdGllczogZnVuY3Rpb24gcmVxdWVzdFNlbGVjdGVkRGF0ZUFjdGl2aXRpZXMoKSB7XHJcbiAgICB0aGlzLmNhbmNlbFJlcXVlc3RzKHRoaXMuc2VsZWN0ZWREYXRlUmVxdWVzdHMpO1xyXG4gICAgdGhpcy5zZWxlY3RlZERhdGVSZXF1ZXN0cyA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmNyZWF0ZVNlbGVjdGVkRGF0ZVJlcXVlc3Qoe1xyXG4gICAgICBwYWdlU2l6ZTogdGhpcy5hY3Rpdml0eVBhZ2VTaXplLFxyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdhY3Rpdml0aWVzJyxcclxuICAgICAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICAgICAgcXVlcnlTZWxlY3Q6IHRoaXMuYWN0aXZpdHlRdWVyeVNlbGVjdCxcclxuICAgICAgcXVlcnlXaGVyZTogdGhpcy5nZXRTZWxlY3RlZERhdGVBY3Rpdml0eVF1ZXJ5KCksXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB4aHIgPSByZXF1ZXN0LnJlYWQoe1xyXG4gICAgICBzdWNjZXNzOiB0aGlzLm9uUmVxdWVzdFNlbGVjdGVkRGF0ZUFjdGl2aXR5RGF0YVN1Y2Nlc3MsXHJcbiAgICAgIGZhaWx1cmU6IHRoaXMub25SZXF1ZXN0RGF0YUZhaWx1cmUsXHJcbiAgICAgIGFib3J0ZWQ6IHRoaXMub25SZXF1ZXN0RGF0YUFib3J0ZWQsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZVJlcXVlc3RzLnB1c2goeGhyKTtcclxuICB9LFxyXG4gIHJlcXVlc3RTZWxlY3RlZERhdGVFdmVudHM6IGZ1bmN0aW9uIHJlcXVlc3RTZWxlY3RlZERhdGVFdmVudHMoKSB7XHJcbiAgICB0aGlzLmNhbmNlbFJlcXVlc3RzKHRoaXMuc2VsZWN0ZWREYXRlRXZlbnRSZXF1ZXN0cyk7XHJcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZUV2ZW50UmVxdWVzdHMgPSBbXTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0ID0gdGhpcy5jcmVhdGVTZWxlY3RlZERhdGVSZXF1ZXN0KHtcclxuICAgICAgcGFnZVNpemU6IHRoaXMuZXZlbnRQYWdlU2l6ZSxcclxuICAgICAgcmVzb3VyY2VLaW5kOiAnZXZlbnRzJyxcclxuICAgICAgY29udHJhY3ROYW1lOiAnZHluYW1pYycsXHJcbiAgICAgIHF1ZXJ5U2VsZWN0OiB0aGlzLmV2ZW50UXVlcnlTZWxlY3QsXHJcbiAgICAgIHF1ZXJ5V2hlcmU6IHRoaXMuZ2V0U2VsZWN0ZWREYXRlRXZlbnRRdWVyeSgpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgeGhyID0gcmVxdWVzdC5yZWFkKHtcclxuICAgICAgc3VjY2VzczogdGhpcy5vblJlcXVlc3RTZWxlY3RlZERhdGVFdmVudERhdGFTdWNjZXNzLFxyXG4gICAgICBmYWlsdXJlOiB0aGlzLm9uUmVxdWVzdERhdGFGYWlsdXJlLFxyXG4gICAgICBhYm9ydGVkOiB0aGlzLm9uUmVxdWVzdERhdGFBYm9ydGVkLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZWxlY3RlZERhdGVFdmVudFJlcXVlc3RzLnB1c2goeGhyKTtcclxuICB9LFxyXG4gIGNyZWF0ZVNlbGVjdGVkRGF0ZVJlcXVlc3Q6IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdGVkRGF0ZVJlcXVlc3Qobykge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVJlc291cmNlQ29sbGVjdGlvblJlcXVlc3QodGhpcy5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgIC5zZXRDb3VudChvLnBhZ2VTaXplKVxyXG4gICAgICAuc2V0U3RhcnRJbmRleCgxKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKG8ucmVzb3VyY2VLaW5kKVxyXG4gICAgICAuc2V0Q29udHJhY3ROYW1lKG8uY29udHJhY3ROYW1lIHx8IEFwcC5kZWZhdWx0U2VydmljZS5nZXRDb250cmFjdE5hbWUoKVxyXG4gICAgICAgIC50ZXh0KVxyXG4gICAgICAuc2V0UXVlcnlBcmcoU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFVcmkuUXVlcnlBcmdOYW1lcy5PcmRlckJ5LCBvLnF1ZXJ5T3JkZXJCeSB8fCB0aGlzLnF1ZXJ5T3JkZXJCeSlcclxuICAgICAgLnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuU2VsZWN0LCB0aGlzLmV4cGFuZEV4cHJlc3Npb24oby5xdWVyeVNlbGVjdClcclxuICAgICAgICAuam9pbignLCcpKVxyXG4gICAgICAuc2V0UXVlcnlBcmcoU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFVcmkuUXVlcnlBcmdOYW1lcy5XaGVyZSwgby5xdWVyeVdoZXJlKTtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH0sXHJcbiAgZ2V0U2VsZWN0ZWREYXRlQWN0aXZpdHlRdWVyeTogZnVuY3Rpb24gZ2V0U2VsZWN0ZWREYXRlQWN0aXZpdHlRdWVyeSgpIHtcclxuICAgIGNvbnN0IGFjdGl2aXR5UXVlcnkgPSBbXHJcbiAgICAgICdVc2VyQWN0aXZpdGllcy5Vc2VySWQgZXEgXCIkezB9XCIgYW5kIFR5cGUgbmUgXCJhdExpdGVyYXR1cmVcIiBhbmQgKCcsXHJcbiAgICAgICcoVGltZWxlc3MgZXEgZmFsc2UgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAkezF9QCBhbmQgQCR7Mn1AKSBvciAnLFxyXG4gICAgICAnKFRpbWVsZXNzIGVxIHRydWUgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAkezN9QCBhbmQgQCR7NH1AKSknLFxyXG4gICAgXS5qb2luKCcnKTtcclxuXHJcbiAgICBjb25zdCByZXN1bHRzID0gc3RyaW5nLnN1YnN0aXR1dGUoXHJcbiAgICAgIGFjdGl2aXR5UXVlcnksIFtBcHAuY29udGV4dC51c2VyICYmIEFwcC5jb250ZXh0LnVzZXIuJGtleSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodGhpcy5jdXJyZW50RGF0ZS50b0RhdGUoKSksXHJcbiAgICAgICAgY29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHRoaXMuY3VycmVudERhdGUuY2xvbmUoKVxyXG4gICAgICAgICAgLmVuZE9mKCdkYXknKVxyXG4gICAgICAgICAgLnRvRGF0ZSgpKSxcclxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpLFxyXG4gICAgICAgIHRoaXMuY3VycmVudERhdGUuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyksXHJcbiAgICAgIF0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH0sXHJcbiAgZ2V0U2VsZWN0ZWREYXRlRXZlbnRRdWVyeTogZnVuY3Rpb24gZ2V0U2VsZWN0ZWREYXRlRXZlbnRRdWVyeSgpIHtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShcclxuICAgICAgW1xyXG4gICAgICAgICdVc2VySWQgZXEgXCIkezB9XCIgYW5kICgnLFxyXG4gICAgICAgICcoU3RhcnREYXRlIGd0IEAkezF9QCBvciBFbmREYXRlIGd0IEAkezF9QCkgYW5kICcsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZSBsdCBAJHsyfUAnLFxyXG4gICAgICAgICcpJyxcclxuICAgICAgXS5qb2luKCcnKSwgW1xyXG4gICAgICAgIEFwcC5jb250ZXh0LnVzZXIgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5LFxyXG4gICAgICAgIGNvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh0aGlzLmN1cnJlbnREYXRlLnRvRGF0ZSgpKSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodGhpcy5jdXJyZW50RGF0ZS5jbG9uZSgpXHJcbiAgICAgICAgICAuZW5kT2YoJ2RheScpXHJcbiAgICAgICAgICAudG9EYXRlKCkpLFxyXG4gICAgICBdXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgb25SZXF1ZXN0U2VsZWN0ZWREYXRlQWN0aXZpdHlEYXRhU3VjY2VzczogZnVuY3Rpb24gb25SZXF1ZXN0U2VsZWN0ZWREYXRlQWN0aXZpdHlEYXRhU3VjY2VzcyhmZWVkKSB7XHJcbiAgICBpZiAoIWZlZWQpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgICQodGhpcy5hY3Rpdml0eUNvbnRhaW5lck5vZGUpLnJlbW92ZUNsYXNzKCdsaXN0LWxvYWRpbmcnKTtcclxuXHJcbiAgICBjb25zdCByID0gZmVlZC4kcmVzb3VyY2VzO1xyXG4gICAgY29uc3QgZmVlZExlbmd0aCA9IHIubGVuZ3RoO1xyXG4gICAgY29uc3QgbyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmVlZExlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IHJbaV07XHJcbiAgICAgIHJvdy5pc0V2ZW50ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZW50cmllc1tyb3cuJGtleV0gPSByb3c7XHJcbiAgICAgIG8ucHVzaCh0aGlzLmFjdGl2aXR5Um93VGVtcGxhdGUuYXBwbHkocm93LCB0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZlZWRMZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5zZXQoJ2FjdGl2aXR5Q29udGVudCcsIHRoaXMubm9EYXRhVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZlZWQuJHRvdGFsUmVzdWx0cyA+IGZlZWRMZW5ndGgpIHtcclxuICAgICAgJCh0aGlzLmFjdGl2aXR5Q29udGFpbmVyTm9kZSkuYWRkQ2xhc3MoJ2xpc3QtaGFzLW1vcmUnKTtcclxuICAgICAgdGhpcy5zZXQoJ2FjdGl2aXR5UmVtYWluaW5nQ29udGVudCcsIHRoaXMuY291bnRNb3JlVGV4dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKHRoaXMuYWN0aXZpdHlDb250YWluZXJOb2RlKS5yZW1vdmVDbGFzcygnbGlzdC1oYXMtbW9yZScpO1xyXG4gICAgICB0aGlzLnNldCgnYWN0aXZpdHlSZW1haW5pbmdDb250ZW50JywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0KCdhY3Rpdml0eUNvbnRlbnQnLCBvLmpvaW4oJycpKTtcclxuICB9LFxyXG4gIG9uUmVxdWVzdFNlbGVjdGVkRGF0ZUV2ZW50RGF0YVN1Y2Nlc3M6IGZ1bmN0aW9uIG9uUmVxdWVzdFNlbGVjdGVkRGF0ZUV2ZW50RGF0YVN1Y2Nlc3MoZmVlZCkge1xyXG4gICAgaWYgKCFmZWVkKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByID0gZmVlZC4kcmVzb3VyY2VzO1xyXG4gICAgY29uc3QgZmVlZExlbmd0aCA9IHIubGVuZ3RoO1xyXG4gICAgY29uc3QgbyA9IFtdO1xyXG5cclxuICAgIHRoaXMuZXZlbnRGZWVkID0gZmVlZDtcclxuXHJcbiAgICBpZiAoZmVlZExlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmhpZGVFdmVudExpc3QoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaG93RXZlbnRMaXN0KCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWVkTGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3Qgcm93ID0gcltpXTtcclxuICAgICAgcm93LmlzRXZlbnQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmVudHJpZXNbcm93LiRrZXldID0gcm93O1xyXG4gICAgICBvLnB1c2godGhpcy5ldmVudFJvd1RlbXBsYXRlLmFwcGx5KHJvdywgdGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChmZWVkLiR0b3RhbFJlc3VsdHMgPiBmZWVkTGVuZ3RoKSB7XHJcbiAgICAgICQodGhpcy5ldmVudENvbnRhaW5lck5vZGUpLmFkZENsYXNzKCdsaXN0LWhhcy1tb3JlJyk7XHJcbiAgICAgIHRoaXMuc2V0KCdldmVudFJlbWFpbmluZ0NvbnRlbnQnLCB0aGlzLmNvdW50TW9yZVRleHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCh0aGlzLmV2ZW50Q29udGFpbmVyTm9kZSkucmVtb3ZlQ2xhc3MoJ2xpc3QtaGFzLW1vcmUnKTtcclxuICAgICAgdGhpcy5zZXQoJ2V2ZW50UmVtYWluaW5nQ29udGVudCcsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldCgnZXZlbnRDb250ZW50Jywgby5qb2luKCcnKSk7XHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyQ2FsZW5kYXI6IGZ1bmN0aW9uIHJlbmRlckNhbGVuZGFyKCkge1xyXG4gICAgY29uc3QgY2FsSFRNTCA9IFtdO1xyXG4gICAgY29uc3Qgc3RhcnRpbmdEYXkgPSB0aGlzLmdldEZpcnN0RGF5T2ZDdXJyZW50TW9udGgoKVxyXG4gICAgICAuZGF5KCk7XHJcbiAgICBjb25zdCBkYXlEYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5jbG9uZSgpXHJcbiAgICAgIC5zdGFydE9mKCdtb250aCcpO1xyXG4gICAgY29uc3QgbW9udGhMZW5ndGggPSB0aGlzLmN1cnJlbnREYXRlLmRheXNJbk1vbnRoKCk7XHJcbiAgICBjb25zdCB3ZWVrRW5kcyA9IFswLCA2XTtcclxuICAgIGxldCB3ZWVrZW5kQ2xhc3MgPSAnJztcclxuICAgIGxldCBkYXkgPSAxO1xyXG5cclxuICAgIGNhbEhUTUwucHVzaCh0aGlzLmNhbGVuZGFyU3RhcnRUZW1wbGF0ZSk7XHJcblxyXG4gICAgY2FsSFRNTC5wdXNoKHRoaXMuY2FsZW5kYXJXZWVrSGVhZGVyU3RhcnRUZW1wbGF0ZSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSA2OyBpKyspIHtcclxuICAgICAgY2FsSFRNTC5wdXNoKHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuY2FsZW5kYXJXZWVrSGVhZGVyVGVtcGxhdGUsIFt0aGlzLndlZWtEYXlzU2hvcnRUZXh0W2ldXSkpO1xyXG4gICAgfVxyXG4gICAgY2FsSFRNTC5wdXNoKHRoaXMuY2FsZW5kYXJXZWVrSGVhZGVyRW5kVGVtcGxhdGUpO1xyXG5cclxuICAgIC8vIFdlZWtzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSA2OyBpKyspIHtcclxuICAgICAgY2FsSFRNTC5wdXNoKHRoaXMuY2FsZW5kYXJXZWVrU3RhcnRUZW1wbGF0ZSk7XHJcbiAgICAgIC8vIERheXNcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gNjsgaisrKSB7XHJcbiAgICAgICAgaWYgKGRheSA8PSBtb250aExlbmd0aCAmJiAoaSA+IDAgfHwgaiA+PSBzdGFydGluZ0RheSkpIHtcclxuICAgICAgICAgIGRheURhdGUuZGF0ZShkYXkpO1xyXG4gICAgICAgICAgd2Vla2VuZENsYXNzID0gKHdlZWtFbmRzLmluZGV4T2YoaikgIT09IC0xKSA/ICcgd2Vla2VuZCcgOiAnJztcclxuICAgICAgICAgIGNhbEhUTUwucHVzaChzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmNhbGVuZGFyRGF5VGVtcGxhdGUsIFtcclxuICAgICAgICAgICAgZGF5LFxyXG4gICAgICAgICAgICB3ZWVrZW5kQ2xhc3MsXHJcbiAgICAgICAgICAgIGRheURhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyksXHJcbiAgICAgICAgICBdKSk7XHJcbiAgICAgICAgICBkYXkrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY2FsSFRNTC5wdXNoKHRoaXMuY2FsZW5kYXJFbXB0eURheVRlbXBsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY2FsSFRNTC5wdXNoKHRoaXMuY2FsZW5kYXJXZWVrRW5kVGVtcGxhdGUpO1xyXG4gICAgICAvLyBzdG9wIG1ha2luZyByb3dzIGlmIHdlJ3ZlIHJ1biBvdXQgb2YgZGF5c1xyXG4gICAgICBpZiAoZGF5ID4gbW9udGhMZW5ndGgpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2FsSFRNTC5wdXNoKHRoaXMuY2FsZW5kYXJFbmRUZW1wbGF0ZSk7XHJcblxyXG4gICAgdGhpcy5zZXQoJ2NhbGVuZGFyQ29udGVudCcsIGNhbEhUTUwuam9pbignJykpO1xyXG4gICAgdGhpcy5zZXREYXRlVGl0bGUoKTtcclxuICAgIHRoaXMuaGlnaGxpZ2h0Q3VycmVudERhdGUoKTtcclxuICB9LFxyXG4gIHNldERhdGVUaXRsZTogZnVuY3Rpb24gc2V0RGF0ZVRpdGxlKCkge1xyXG4gICAgdGhpcy5zZXQoJ2RhdGVDb250ZW50JywgdGhpcy5jdXJyZW50RGF0ZS5mb3JtYXQodGhpcy5tb250aFRpdGxlRm9ybWF0VGV4dCkpO1xyXG4gIH0sXHJcbiAgc2hvdzogZnVuY3Rpb24gc2hvdyhvcHRpb25zKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMucHJvY2Vzc1Nob3dPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcHJvY2Vzc1Nob3dPcHRpb25zOiBmdW5jdGlvbiBwcm9jZXNzU2hvd09wdGlvbnMob3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMuY3VycmVudERhdGUpIHtcclxuICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IG1vbWVudChvcHRpb25zLmN1cnJlbnREYXRlKVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKSB8fCBtb21lbnQoKVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKTtcclxuICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaGlnaGxpZ2h0Q3VycmVudERhdGU6IGZ1bmN0aW9uIGhpZ2hsaWdodEN1cnJlbnREYXRlKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gYC5vbGQtY2FsZW5kYXItZGF5W2RhdGEtZGF0ZT0ke3RoaXMuY3VycmVudERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyl9XWA7XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRlTm9kZSkge1xyXG4gICAgICAkKHRoaXMuc2VsZWN0ZWREYXRlTm9kZSkucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZERhdGVOb2RlID0gJChzZWxlY3RlZERhdGUsIHRoaXMuY29udGVudE5vZGUpWzBdO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWREYXRlTm9kZSkge1xyXG4gICAgICAkKHRoaXMuc2VsZWN0ZWREYXRlTm9kZSkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nZXRTZWxlY3RlZERhdGUoKTtcclxuICAgIHRoaXMuaGlnaGxpZ2h0VG9kYXkoKTtcclxuICB9LFxyXG4gIGhpZ2hsaWdodFRvZGF5OiBmdW5jdGlvbiBoaWdobGlnaHRUb2RheSgpIHtcclxuICAgIC8vIFJlbW92ZSB0aGUgZXhpc3RpbmcgXCJ0b2RheVwiIGhpZ2hsaWdodCBjbGFzcyBiZWNhdXNlIGl0IG1pZ2h0IGJlIG91dCBvZiBkYXRlLFxyXG4gICAgLy8gbGlrZSB3aGVuIHdlIHRpY2sgcGFzdCBtaWRuaWdodC5cclxuICAgIGxldCB0b2RheUNscyA9ICcub2xkLWNhbGVuZGFyLWRheS50b2RheSc7XHJcbiAgICBsZXQgdG9kYXlOb2RlID0gJCh0b2RheUNscywgdGhpcy5jb250ZW50Tm9kZSlbMF07XHJcbiAgICBpZiAodG9kYXlOb2RlKSB7XHJcbiAgICAgICQodG9kYXlOb2RlKS5yZW1vdmVDbGFzcygndG9kYXknKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgdGhlIHVwZGF0ZWQgXCJ0b2RheVwiXHJcbiAgICB0b2RheUNscyA9IGAub2xkLWNhbGVuZGFyLWRheVtkYXRhLWRhdGU9JHttb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKX1dYDtcclxuICAgIHRvZGF5Tm9kZSA9ICQodG9kYXlDbHMsIHRoaXMuY29udGVudE5vZGUpWzBdO1xyXG4gICAgaWYgKHRvZGF5Tm9kZSkge1xyXG4gICAgICAkKHRvZGF5Tm9kZSkuYWRkQ2xhc3MoJ3RvZGF5Jyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZWxlY3RFbnRyeTogZnVuY3Rpb24gc2VsZWN0RW50cnkocGFyYW1zKSB7XHJcbiAgICBjb25zdCByb3cgPSAkKHBhcmFtcy4kc291cmNlKVxyXG4gICAgICAuY2xvc2VzdCgnW2RhdGEta2V5XScpWzBdO1xyXG4gICAgY29uc3Qga2V5ID0gcm93ID8gcm93LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSA6IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubmF2aWdhdGVUb0RldGFpbFZpZXcoa2V5KTtcclxuICB9LFxyXG4gIHNlbGVjdERhdGU6IGZ1bmN0aW9uIHNlbGVjdERhdGUoKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBkYXRlOiB0aGlzLmN1cnJlbnREYXRlLnRvRGF0ZSgpLFxyXG4gICAgICBzaG93VGltZVBpY2tlcjogZmFsc2UsXHJcbiAgICAgIHRpbWVsZXNzOiBmYWxzZSxcclxuICAgICAgdG9vbHM6IHtcclxuICAgICAgICB0YmFyOiBbe1xyXG4gICAgICAgICAgaWQ6ICdjb21wbGV0ZScsXHJcbiAgICAgICAgICBjbHM6ICdmYSBmYS1jaGVjayBmYS1mdyBmYS1sZycsXHJcbiAgICAgICAgICBmbjogdGhpcy5zZWxlY3REYXRlU3VjY2VzcyxcclxuICAgICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAnY2FuY2VsJyxcclxuICAgICAgICAgIGNsczogJ2ZhIGZhLWJhbiBmYS1mdyBmYS1sZycsXHJcbiAgICAgICAgICBzaWRlOiAnbGVmdCcsXHJcbiAgICAgICAgICBmbjogUmVVSS5iYWNrLFxyXG4gICAgICAgICAgc2NvcGU6IFJlVUksXHJcbiAgICAgICAgfV0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuZGF0ZVBpY2tlclZpZXcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VsZWN0RGF0ZVN1Y2Nlc3M6IGZ1bmN0aW9uIHNlbGVjdERhdGVTdWNjZXNzKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRQcmltYXJ5QWN0aXZlVmlldygpO1xyXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IG1vbWVudCh2aWV3LmdldERhdGVUaW1lKCkpXHJcbiAgICAgIC5zdGFydE9mKCdkYXknKTtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgUmVVSS5iYWNrKCk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvV2Vla1ZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9XZWVrVmlldygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLndlZWtWaWV3KTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGN1cnJlbnREYXRlOiB0aGlzLmN1cnJlbnREYXRlLnZhbHVlT2YoKSB8fCBtb21lbnQoKVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKSxcclxuICAgIH07XHJcbiAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvRGF5VmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0RheVZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5kYXlWaWV3KTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGN1cnJlbnREYXRlOiB0aGlzLmN1cnJlbnREYXRlLnZhbHVlT2YoKSB8fCBtb21lbnQoKVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKSxcclxuICAgIH07XHJcbiAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvSW5zZXJ0VmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0luc2VydFZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5pbnNlcnRWaWV3IHx8IHRoaXMuZWRpdFZpZXcpO1xyXG5cclxuICAgIGlmICghdGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZSA9IHRoaXMuY3VycmVudERhdGUudG9TdHJpbmcoJ3l5eXktTU0tZGQnKSB8fCBtb21lbnQoKVxyXG4gICAgICAuc3RhcnRPZignZGF5Jyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIG5lZ2F0ZUhpc3Rvcnk6IHRydWUsXHJcbiAgICAgICAgcmV0dXJuVG86IHRoaXMuaWQsXHJcbiAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgIGN1cnJlbnREYXRlOiB0aGlzLm9wdGlvbnMuY3VycmVudERhdGUudmFsdWVPZigpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG5hdmlnYXRlVG9EZXRhaWxWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvRGV0YWlsVmlldyhrZXksIF9kZXNjcmlwdG9yKSB7XHJcbiAgICBsZXQgZGVzY3JpcHRvciA9IF9kZXNjcmlwdG9yO1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNba2V5XTtcclxuICAgIGNvbnN0IGRldGFpbFZpZXcgPSAoZW50cnkuaXNFdmVudCkgPyB0aGlzLmV2ZW50RGV0YWlsVmlldyA6IHRoaXMuYWN0aXZpdHlEZXRhaWxWaWV3O1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGRldGFpbFZpZXcpO1xyXG4gICAgZGVzY3JpcHRvciA9IChlbnRyeS5pc0V2ZW50KSA/IGRlc2NyaXB0b3IgOiBlbnRyeS5EZXNjcmlwdGlvbjtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgdGl0bGU6IGRlc2NyaXB0b3IsXHJcbiAgICAgICAga2V5LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==