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

import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import 'crm/Format';
import ErrorManager from 'argos/ErrorManager';
import convert from 'argos/Convert';
import List from 'argos/List';
import _LegacySDataListMixin from 'argos/_LegacySDataListMixin';
import getResource from 'argos/I18n';
import * as activityTypeIcons from '../../Models/Activity/ActivityTypeIcon';

const resource = getResource('calendarMonthView');
const dtFormatResource = getResource('calendarMonthViewDateTimeFormat');

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
const __class = declare('crm.Views.Calendar.MonthView', [List, _LegacySDataListMixin], {
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
  weekDaysShortText: [
    resource.sundayShortText,
    resource.mondayShortText,
    resource.tuesdayShortText,
    resource.wednesdayShortText,
    resource.thursdayShortText,
    resource.fridayShortText,
    resource.saturdayShortText,
  ],

  toggleCollapseClass: 'fa fa-chevron-down',
  toggleExpandClass: 'fa fa-chevron-right',
  enablePullToRefresh: false,

  // Templates
  widgetTemplate: new Simplate([
    '<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
    '<div data-dojo-attach-point="searchNode"></div>',
    '{%! $.navigationTemplate %}',
    '<div style="clear:both"></div>',
    '<div class="month-content" data-dojo-attach-point="monthNode">',
    '{%! $.navBarTemplate %}',
    '<div class="month-calendar" data-dojo-attach-point="contentNode"></div>',
    '</div>',
    '<div class="day-content">',
    '<h2 class="date-day-text" data-dojo-attach-point="dayTitleNode"></h2>',
    '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">',
    '<h2 data-action="toggleGroup"><button data-dojo-attach-point="collapseButton" class="{%= $$.toggleCollapseClass %}" aria-label="{%: $$.toggleCollapseText %}"></button>{%= $.eventHeaderText %}</h2>',
    '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>',
    '{%! $.eventMoreTemplate %}',
    '</div>',
    '<div class="activity-content" data-dojo-attach-point="activityContainerNode">',
    '<h2>{%= $.activityHeaderText %}</h2>',
    '<ul class="list-content" data-dojo-attach-point="activityContentNode"></ul>',
    '{%! $.activityMoreTemplate %}',
    '</div>',
    '</div>',
    '<div style="clear:both"></div>',
    '</div>',
  ]),
  navigationTemplate: new Simplate([
    '<div class="split-buttons">',
    '<button data-tool="today" data-action="getTodayMonthActivities" class="button">{%: $.todayText %}</button>',
    '<button data-tool="selectdate" data-action="selectDate" class="button fa fa-calendar"><span></span></button>',
    '<button data-tool="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>',
    '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>',
    '<button data-tool="month" class="button current">{%: $.monthText %}</button>',
    '</div>',
  ]),
  navBarTemplate: new Simplate([
    '<div class="nav-bar">',
    '<button data-tool="next" data-action="goToNextMonth" class="button button-next fa fa-arrow-right fa-lg"><span></span></button>',
    '<button data-tool="prev" data-action="goToPreviousMonth" class="button button-prev fa fa-arrow-left fa-lg"><span></span></button>',
    '<h4 class="date-text" data-dojo-attach-point="dateNode"></h4>',
    '</div>',
  ]),
  activityRowTemplate: new Simplate([
    '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
    '<table class="calendar-entry-table"><tr>',
    '<td class="entry-table-icon">',
    '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityTypeIcon[$.Type] %}">',
    '</button>',
    '</td>',
    '<td class="entry-table-time">{%! $$.activityTimeTemplate %}</td>',
    '<td class="entry-table-description">{%! $$.activityItemTemplate %}</td>',
    '</tr></table>',
    '</li>',
  ]),
  eventRowTemplate: new Simplate([
    '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">',
    '<table class="calendar-entry-table"><tr>',
    '<td class="entry-table-icon">',
    '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityTypeIcon.event %}">',
    '</button>',
    '</td>',
    '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>',
    '</tr></table>',
    '</li>',
  ]),
  activityTimeTemplate: new Simplate([
    '{% if ($.Timeless) { %}',
    '<span class="p-time">{%= $$.allDayText %}</span>',
    '{% } else { %}',
    '<span class="p-time">{%: crm.Format.date($.StartDate, (App.is24HourClock()) ? $$.startTimeFormatText24 : $$.startTimeFormatText) %}</span>',
    '{% } %}',
  ]),
  activityItemTemplate: new Simplate([
    '<p class="listview-heading p-description">{%: $.Description %}</p>',
    '<p class="micro-text">{%= $$.activityNameTemplate.apply($) %}</p>',
  ]),
  eventItemTemplate: new Simplate([
    '<p class="listview-heading p-description">{%: $.Description %} ({%: $.Type %})</p>',
    '<p class="micro-text">{%! $$.eventNameTemplate %}</p>',
  ]),
  activityNameTemplate: new Simplate([
    '{% if ($.ContactName) { %}',
    '{%: $.ContactName %} / {%: $.AccountName %}',
    '{% } else if ($.AccountName) { %}',
    '{%: $.AccountName %}',
    '{% } else { %}',
    '{%: $.LeadName %}',
    '{% } %}',
  ]),
  eventNameTemplate: new Simplate([
    '{%: crm.Format.date($.StartDate, $$.eventDateFormatText) %}',
    '&nbsp;-&nbsp;',
    '{%: crm.Format.date($.EndDate, $$.eventDateFormatText) %}',
  ]),
  activityMoreTemplate: new Simplate([
    '<div class="list-more" data-dojo-attach-point="activityMoreNode">',
    '<button class="button" data-action="activateActivityMore">',
    '<span data-dojo-attach-point="activityRemainingContentNode">{%= $.countMoreText %}</span>',
    '</button>',
    '</div>',
  ]),
  eventMoreTemplate: new Simplate([
    '<div class="list-more" data-dojo-attach-point="eventMoreNode">',
    '<button class="button" data-action="activateEventMore">',
    '<span data-dojo-attach-point="eventRemainingContentNode">{%= $.countMoreText %}</span>',
    '</button>',
    '</div>',
  ]),
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
      type: 'innerHTML',
    },
    dateContent: {
      node: 'dateNode',
      type: 'innerHTML',
    },
    dayTitleContent: {
      node: 'dayTitleNode',
      type: 'innerHTML',
    },
    activityContent: {
      node: 'activityContentNode',
      type: 'innerHTML',
    },
    eventContent: {
      node: 'eventContentNode',
      type: 'innerHTML',
    },
    eventRemainingContent: {
      node: 'eventRemainingContentNode',
      type: 'innerHTML',
    },
    activityRemainingContent: {
      node: 'activityRemainingContentNode',
      type: 'innerHTML',
    },
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
  querySelect: [
    'StartDate',
    'Timeless',
    'Type',
  ],
  feed: null,
  eventFeed: null,
  entries: null,
  selectedDateRequests: null,
  selectedDateEventRequests: null,
  monthRequests: null,
  monthEventRequests: null,

  eventPageSize: 3,
  eventQueryWhere: null,
  eventQuerySelect: [
    'StartDate',
    'EndDate',
    'Description',
    'Type',
  ],

  activityPageSize: 10,
  activityQueryWhere: null,
  activityQuerySelect: [
    'StartDate',
    'Description',
    'Type',
    'AccountName',
    'ContactName',
    'LeadId',
    'LeadName',
    'UserId',
    'Timeless',
    'Recurring',
  ],
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
    this.currentDate = moment()
      .startOf('day');
  },
  render: function render() {
    this.inherited(arguments);
    this.renderCalendar();
  },
  activateActivityMore: function activateActivityMore() {
    this.navigateToDayView();
  },
  activateEventMore: function activateEventMore() {
    const view = App.getView('event_related');
    const where = this.getSelectedDateEventQuery();
    if (view) {
      view.show({
        where,
      });
    }
  },
  toggleGroup: function toggleGroup(params) {
    const node = params.$source;
    if (node && node.parentNode) {
      $(node).toggleClass('collapsed');
      $(node.parentNode).toggleClass('collapsed-event');

      const button = this.collapseButton;

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
    return this.currentDate.clone()
      .startOf('month');
  },
  getLastDayOfCurrentMonth: function getLastDayOfCurrentMonth() {
    return this.currentDate.clone()
      .endOf('month');
  },
  getTodayMonthActivities: function getTodayMonthActivities() {
    const today = moment()
      .startOf('day');

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
      months: 1,
    });
    this.refresh();
  },
  goToPreviousMonth: function goToPreviousMonth() {
    this.currentDate.subtract({
      months: 1,
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

    const request = this.createRequest();
    request.setContractName(this.contractName || 'system');

    const xhr = request.read({
      success: this.onRequestDataSuccess,
      failure: this.onRequestDataFailure,
      aborted: this.onRequestDataAborted,
      scope: this,
    });
    this.monthRequests.push(xhr);
  },
  createEventRequest: function createEventRequest() {
    const querySelect = this.eventQuerySelect;
    const queryWhere = this.getEventQuery();
    const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
      .setCount(this.pageSize)
      .setStartIndex(1)
      .setResourceKind('events')
      .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect)
        .join(','))
      .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);

    return request;
  },
  requestEventData: function requestEventData() {
    this.cancelRequests(this.monthEventRequests);
    this.monthEventRequests = [];

    const request = this.createEventRequest();
    const xhr = request.read({
      success: this.onRequestEventDataSuccess,
      failure: this.onRequestEventDataFailure,
      aborted: this.onRequestEventDataAborted,
      scope: this,
    });
    this.monthEventRequests.push(xhr);
  },
  onRequestEventDataFailure: function onRequestEventDataFailure(response, o) {
    alert(string.substitute(this.requestErrorText, [response, o])); // eslint-disable-line
    ErrorManager.addError(response, o, this.options, 'failure');
  },
  onRequestEventDataAborted: function onRequestEventDataAborted() {
    this.options = false; // force a refresh
  },
  onRequestEventDataSuccess: function onRequestEventDataSuccess(feed) {
    this.processEventFeed(feed);
  },
  getActivityQuery: function getActivityQuery() {
    const startDate = this.getFirstDayOfCurrentMonth();
    const endDate = this.getLastDayOfCurrentMonth();
    return string.substitute(
      [
        'UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (',
        '(Timeless eq false and StartDate',
        ' between @${1}@ and @${2}@) or ',
        '(Timeless eq true and StartDate',
        ' between @${3}@ and @${4}@))',
      ].join(''), [App.context.user && App.context.user.$key,
        convert.toIsoStringFromDate(startDate.toDate()),
        convert.toIsoStringFromDate(endDate.toDate()),
        startDate.format('YYYY-MM-DDT00:00:00[Z]'),
        endDate.format('YYYY-MM-DDT23:59:59[Z]'),
      ]
    );
  },
  getEventQuery: function getEventQuery() {
    const startDate = this.getFirstDayOfCurrentMonth();
    const endDate = this.getLastDayOfCurrentMonth();
    return string.substitute(
      [
        'UserId eq "${0}" and (',
        '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
        'StartDate lt @${2}@',
        ')',
      ].join(''), [App.context.user && App.context.user.$key,
        convert.toIsoStringFromDate(startDate.toDate()),
        convert.toIsoStringFromDate(endDate.toDate()),
      ]
    );
  },
  processFeed: function processFeed(feed) {
    if (!feed) {
      return;
    }

    const r = feed.$resources;
    this.feed = feed;

    for (let i = 0; i < r.length; i++) {
      const row = r[i];

      // Preserve the isEvent flag if we have an existing entry for it already,
      // the order of processFeed and processEventFeed is not predictable
      row.isEvent = this.entries[row.$key] && this.entries[row.$key].isEvent;

      this.entries[row.$key] = row;

      const startDay = moment(convert.toDateFromString(row.StartDate));
      if (r[i].Timeless) {
        startDay.subtract({
          minutes: startDay.utcOffset(),
        });
      }

      const dateIndex = startDay.format('YYYY-MM-DD');
      this.dateCounts[dateIndex] = (this.dateCounts[dateIndex]) ? this.dateCounts[dateIndex] + 1 : 1;
    }

    this.highlightActivities();
  },
  processEventFeed: function processEventFeed(feed) {
    if (!feed) {
      return;
    }

    const r = feed.$resources;
    const feedLength = r.length;
    this.eventFeed = feed;

    for (let i = 0; i < feedLength; i++) {
      const row = r[i];
      // Preserve the isEvent flag if we have an existing entry for it already,
      // the order of processFeed and processEventFeed is not predictable
      row.isEvent = this.entries[row.$key] && this.entries[row.$key].isEvent;
      this.entries[row.$key] = row;

      const startDay = moment(convert.toDateFromString(row.StartDate));
      const endDay = convert.toDateFromString(row.EndDate);

      while (startDay.valueOf() <= endDay.valueOf()) {
        const dateIndex = startDay.format('YYYY-MM-DD');
        this.dateCounts[dateIndex] = (this.dateCounts[dateIndex]) ? this.dateCounts[dateIndex] + 1 : 1;
        startDay.add({
          days: 1,
        });
      }
    }

    this.highlightActivities();
  },

  highlightActivities: function highlightActivities() {
    $('.old-calendar-day')
      .each((i, node) => {
        const dataDate = $(node).attr('data-date');
        if (!this.dateCounts[dataDate]) {
          return;
        }

        $(node).addClass('activeDay');

        const countMarkup = string.substitute(this.calendarActivityCountTemplate, [this.dateCounts[dataDate]]);
        const existingCount = $(node).children('div');

        if (existingCount.length > 0) {
          $(existingCount[0]).empty().append(countMarkup);
        } else {
          $(node).prepend(`<div>${countMarkup}</div>`);
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

    requests.forEach((xhr) => {
      if (xhr) { // if request was fulfilled by offline storage, xhr will be undefined
        xhr.abort();
      }
    });
  },
  requestSelectedDateActivities: function requestSelectedDateActivities() {
    this.cancelRequests(this.selectedDateRequests);
    this.selectedDateRequests = [];

    const request = this.createSelectedDateRequest({
      pageSize: this.activityPageSize,
      resourceKind: 'activities',
      contractName: 'system',
      querySelect: this.activityQuerySelect,
      queryWhere: this.getSelectedDateActivityQuery(),
    });

    const xhr = request.read({
      success: this.onRequestSelectedDateActivityDataSuccess,
      failure: this.onRequestDataFailure,
      aborted: this.onRequestDataAborted,
      scope: this,
    });
    this.selectedDateRequests.push(xhr);
  },
  requestSelectedDateEvents: function requestSelectedDateEvents() {
    this.cancelRequests(this.selectedDateEventRequests);
    this.selectedDateEventRequests = [];

    const request = this.createSelectedDateRequest({
      pageSize: this.eventPageSize,
      resourceKind: 'events',
      contractName: 'dynamic',
      querySelect: this.eventQuerySelect,
      queryWhere: this.getSelectedDateEventQuery(),
    });

    const xhr = request.read({
      success: this.onRequestSelectedDateEventDataSuccess,
      failure: this.onRequestDataFailure,
      aborted: this.onRequestDataAborted,
      scope: this,
    });
    this.selectedDateEventRequests.push(xhr);
  },
  createSelectedDateRequest: function createSelectedDateRequest(o) {
    const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
      .setCount(o.pageSize)
      .setStartIndex(1)
      .setResourceKind(o.resourceKind)
      .setContractName(o.contractName || App.defaultService.getContractName()
        .text)
      .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.OrderBy, o.queryOrderBy || this.queryOrderBy)
      .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(o.querySelect)
        .join(','))
      .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, o.queryWhere);
    return request;
  },
  getSelectedDateActivityQuery: function getSelectedDateActivityQuery() {
    const activityQuery = [
      'UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (',
      '(Timeless eq false and StartDate between @${1}@ and @${2}@) or ',
      '(Timeless eq true and StartDate between @${3}@ and @${4}@))',
    ].join('');

    const results = string.substitute(
      activityQuery, [App.context.user && App.context.user.$key,
        convert.toIsoStringFromDate(this.currentDate.toDate()),
        convert.toIsoStringFromDate(this.currentDate.clone()
          .endOf('day')
          .toDate()),
        this.currentDate.format('YYYY-MM-DDT00:00:00[Z]'),
        this.currentDate.format('YYYY-MM-DDT23:59:59[Z]'),
      ]);

    return results;
  },
  getSelectedDateEventQuery: function getSelectedDateEventQuery() {
    return string.substitute(
      [
        'UserId eq "${0}" and (',
        '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
        'StartDate lt @${2}@',
        ')',
      ].join(''), [
        App.context.user && App.context.user.$key,
        convert.toIsoStringFromDate(this.currentDate.toDate()),
        convert.toIsoStringFromDate(this.currentDate.clone()
          .endOf('day')
          .toDate()),
      ]
    );
  },
  onRequestSelectedDateActivityDataSuccess: function onRequestSelectedDateActivityDataSuccess(feed) {
    if (!feed) {
      return false;
    }

    $(this.activityContainerNode).removeClass('list-loading');

    const r = feed.$resources;
    const feedLength = r.length;
    const o = [];

    for (let i = 0; i < feedLength; i++) {
      const row = r[i];
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

    const r = feed.$resources;
    const feedLength = r.length;
    const o = [];

    this.eventFeed = feed;

    if (feedLength === 0) {
      this.hideEventList();
      return false;
    }
    this.showEventList();

    for (let i = 0; i < feedLength; i++) {
      const row = r[i];
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
    const calHTML = [];
    const startingDay = this.getFirstDayOfCurrentMonth()
      .day();
    const dayDate = this.currentDate.clone()
      .startOf('month');
    const monthLength = this.currentDate.daysInMonth();
    const weekEnds = [0, 6];
    let weekendClass = '';
    let day = 1;

    calHTML.push(this.calendarStartTemplate);

    calHTML.push(this.calendarWeekHeaderStartTemplate);
    for (let i = 0; i <= 6; i++) {
      calHTML.push(string.substitute(this.calendarWeekHeaderTemplate, [this.weekDaysShortText[i]]));
    }
    calHTML.push(this.calendarWeekHeaderEndTemplate);

    // Weeks
    for (let i = 0; i <= 6; i++) {
      calHTML.push(this.calendarWeekStartTemplate);
      // Days
      for (let j = 0; j <= 6; j++) {
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
          dayDate.date(day);
          weekendClass = (weekEnds.indexOf(j) !== -1) ? ' weekend' : '';
          calHTML.push(string.substitute(this.calendarDayTemplate, [
            day,
            weekendClass,
            dayDate.format('YYYY-MM-DD'),
          ]));
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
      this.currentDate = moment(options.currentDate)
        .startOf('day') || moment()
        .startOf('day');
      this.refreshRequired = true;
    }
  },
  highlightCurrentDate: function highlightCurrentDate() {
    const selectedDate = `.old-calendar-day[data-date=${this.currentDate.format('YYYY-MM-DD')}]`;

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
    let todayCls = '.old-calendar-day.today';
    let todayNode = $(todayCls, this.contentNode)[0];
    if (todayNode) {
      $(todayNode).removeClass('today');
    }

    // Get the updated "today"
    todayCls = `.old-calendar-day[data-date=${moment().format('YYYY-MM-DD')}]`;
    todayNode = $(todayCls, this.contentNode)[0];
    if (todayNode) {
      $(todayNode).addClass('today');
    }
  },
  selectEntry: function selectEntry(params) {
    const row = $(params.$source)
      .closest('[data-key]')[0];
    const key = row ? row.getAttribute('data-key') : false;

    this.navigateToDetailView(key);
  },
  selectDate: function selectDate() {
    const options = {
      date: this.currentDate.toDate(),
      showTimePicker: false,
      timeless: false,
      tools: {
        tbar: [{
          id: 'complete',
          cls: 'fa fa-check fa-fw fa-lg',
          fn: this.selectDateSuccess,
          scope: this,
        }, {
          id: 'cancel',
          cls: 'fa fa-ban fa-fw fa-lg',
          side: 'left',
          fn: ReUI.back,
          scope: ReUI,
        }],
      },
    };
    const view = App.getView(this.datePickerView);
    if (view) {
      view.show(options);
    }
  },
  selectDateSuccess: function selectDateSuccess() {
    const view = App.getPrimaryActiveView();
    this.currentDate = moment(view.getDateTime())
      .startOf('day');
    this.refresh();
    ReUI.back();
  },
  navigateToWeekView: function navigateToWeekView() {
    const view = App.getView(this.weekView);
    const options = {
      currentDate: this.currentDate.valueOf() || moment()
        .startOf('day'),
    };
    view.show(options);
  },
  navigateToDayView: function navigateToDayView() {
    const view = App.getView(this.dayView);
    const options = {
      currentDate: this.currentDate.valueOf() || moment()
        .startOf('day'),
    };
    view.show(options);
  },
  navigateToInsertView: function navigateToInsertView() {
    const view = App.getView(this.insertView || this.editView);

    if (!this.options) {
      this.options = {};
    }

    this.options.currentDate = this.currentDate.toString('yyyy-MM-dd') || moment()
      .startOf('day');
    if (view) {
      view.show({
        negateHistory: true,
        returnTo: this.id,
        insert: true,
        currentDate: this.options.currentDate.valueOf(),
      });
    }
  },
  navigateToDetailView: function navigateToDetailView(key, _descriptor) {
    let descriptor = _descriptor;
    const entry = this.entries[key];
    const detailView = (entry.isEvent) ? this.eventDetailView : this.activityDetailView;
    const view = App.getView(detailView);
    descriptor = (entry.isEvent) ? descriptor : entry.Description;
    if (view) {
      view.show({
        title: descriptor,
        key,
      });
    }
  },
});

export default __class;
