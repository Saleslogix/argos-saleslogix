import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import connect from 'dojo/_base/connect';
import query from 'dojo/query';
import string from 'dojo/string';
import domAttr from 'dojo/dom-attr';
import domClass from 'dojo/dom-class';
import domConstruct from 'dojo/dom-construct';
import List from 'argos/List';
import Calendar from 'argos/Calendar';
import convert from 'argos/Convert';
import ErrorManager from 'argos/ErrorManager';
import Utility from '../../Utility';
import _LegacySDataListMixin from 'argos/_LegacySDataListMixin';

const resource = window.localeContext.getEntitySync('calendarView').attributes;

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
const __class = declare('crm.Views.Calendar.CalendarView', [List, _LegacySDataListMixin], {
  // Localization
  titleText: resource.titleText,
  monthTitleFormatText: resource.monthTitleFormatText,
  dayTitleFormatText: resource.dayTitleFormatText,
  eventDateFormatText: resource.eventDateFormatText,
  startTimeFormatText: resource.startTimeFormatText,
  allDayText: resource.allDayText,
  eventText: resource.eventText,
  eventHeaderText: resource.eventHeaderText,
  countMoreText: resource.countMoreText,
  toggleCollapseText: resource.toggleCollapseText,
  withFromText: resource.withFromText,
  withText: resource.withText,
  unspecifiedText: resource.unspecifiedText,

  enablePullToRefresh: false,
  string: string,
  Utility: Utility,
  trimTo: 16,
  toggleCollapseClass: 'fa fa-chevron-down',
  toggleExpandClass: 'fa fa-chevron-right',

  // Templates
  widgetTemplate: new Simplate([
    '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
      '<div class="panel-content">',
        '<div class="calendarContainer" data-dojo-attach-point="calendarNode"></div>',
        '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">',
          '<h2 data-action="toggleGroup"><button data-dojo-attach-point="collapseButton" class="{%= $$.toggleCollapseClass %}" aria-label="{%: $$.toggleCollapseText %}"></button>{%= $.eventHeaderText %}</h2>',
          '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>',
          '{%! $.eventMoreTemplate %}',
        '</div>',
        '<div class="activity-content" data-dojo-attach-point="activityContainerNode">',
          '<ul class="list-content" data-dojo-attach-point="activityContentNode"></ul>',
          '{%! $.activityMoreTemplate %}',
        '</div>',
        '<div style="clear:both"></div>',
      '</div>',
    '</div>',
  ]),
  activityRowTemplate: new Simplate([
    '<li class="activityEntry" data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
      '{%! $$.activityIconTemplate %}',
      '{%! $$.activityHeaderTemplate %}',
      '{%! $$.activityContentTemplate %}',
      '{%! $$.activityFooterTemplate %}',
    '</li>',
  ]),
  activityIconTemplate: new Simplate([
    '<div class="activityEntry__icon">',
      '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityIconByType[$.Type] %}">',
      '</button>',
    '</div>',
  ]),
  activityHeaderTemplate: new Simplate([
    '<div class="activityEntry__header">',
      '<div class="header__content">',
        '<h3 class="header__title">{%: $.Description %}</h3>',
        '<h4 class="header__subTitle">{%! $$.activityNameTemplate %}</h4>',
      '</div>',
      '<div class="header__timeStamp">',
        '<span class="timeStamp__time">',
          '{% if ($.Timeless) { %}',
            '{%= $$.allDayText %}',
          '{% } else { %}',
            '{%: crm.Format.date($.StartDate, $$.startTimeFormatText) %}',
          '{% } %}',
        '</span>',
      '</div>',
    '</div>',
  ]),
  activityContentTemplate: new Simplate([
    '<div class="activityEntry__content">',
      '{%: $$.Utility.trimText($.Notes, $$.trimTo) %}',
    '</div>',
  ]),
  activityFooterTemplate: new Simplate([
    '<div class="activityEntry__footer">',
    '</div>',
  ]),
  eventRowTemplate: new Simplate([
    '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">',
      '<table class="calendar-entry-table"><tr>',
        '<td class="entry-table-icon">',
          '<button data-action="selectEntry" class="list-item-selector button {%= $$.eventIcon %}">',
          '</button>',
        '</td>',
      '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>',
      '</tr></table>',
    '</li>',
  ]),
  eventItemTemplate: new Simplate([
    '<h3 class="p-description">{%: $.Description %} ({%: $.Type %})</h3>',
    '<h4>{%! $$.eventNameTemplate %}</h4>',
  ]),
  activityNameTemplate: new Simplate([
    '{% if ($.ContactName) { %}',
      '{%= $$.string.substitute($$.withFromText, { contactName: $$.parseName($.ContactName), accountName: $.AccountName}) %}',
    '{% } else if ($.AccountName) { %}',
      '{%= $$.string.substitute($$.withText, { object: $.AccountName }) %}',
    '{% } else if ($.LeadName) { %}',
      '{%= $$.string.substitute($$.withText, { object: $$.parseName($.LeadName) }) %}',
    '{% } else { %}',
      '{%= $$.string.substitute($$.withText, { object: $$.unspecifiedText }) %}',
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
  insertView: 'activity_types_list',
  activityDetailView: 'activity_detail',
  eventDetailView: 'event_detail',
  enableSearch: false,
  dateCounts: null,
  currentDate: null,

  pageSize: 500,
  queryWhere: null,
  queryOrderBy: 'StartDate asc', // desc
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
    'Notes',
  ],
  activityIconByType: {
    'atToDo': 'fa fa-list-ul',
    'atPhoneCall': 'fa fa-phone',
    'atAppointment': 'fa fa-calendar-o',
    'atLiterature': 'fa fa-calendar-o',
    'atPersonal': 'fa fa-check-square-o',
    'atQuestion': 'fa fa-question',
    'atNote': 'fa fa-calendar-o',
    'atEMail': 'fa fa-envelope',
  },
  eventIcon: 'fa fa-calendar-o',

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
  clear: function clear() {
  },
  startup: function startup() {
    this.inherited(arguments);
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
        'where': where,
      });
    }
  },
  toggleGroup: function toggleGroup(params) {
    const node = params.$source;
    if (node && node.parentNode) {
      domClass.toggle(node, 'collapsed');
      domClass.toggle(node.parentNode, 'collapsed-event');

      const button = this.collapseButton;

      if (button) {
        domClass.toggle(button, this.toggleCollapseClass);
        domClass.toggle(button, this.toggleExpandClass);
      }
    }
  },
  selectDay: function selectDay() {
    this.currentDate = this._calendar.getSelectedDateMoment();
    this.getSelectedDate();
  },
  getFirstDayOfCurrentMonth: function getFirstDayOfCurrentMonth() {
    return this.currentDate.clone().startOf('month');
  },
  getLastDayOfCurrentMonth: function getLastDayOfCurrentMonth() {
    return this.currentDate.clone().endOf('month');
  },
  getTodayMonthActivities: function getTodayMonthActivities() {
    const today = moment().startOf('day');

    if (this.currentDate.format('YYYY-MM') === today.format('YYYY-MM')) {
      this.currentDate = today;
      this.highlightCurrentDate();
      this.getSelectedDate();
    } else {
      this.currentDate = today;
      this.refresh();
    }
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
      .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(','))
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
    alert(string.substitute(this.requestErrorText, [response, o]));// eslint-disable-line
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
  parseName: function parseName(name = {}) {
    return name.split(' ').splice(-1);
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
        startDay.add({
          minutes: startDay.zone(),
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
    // TODO: Make this function add the indicator to the day to show there is an activity for that day
    array.forEach(this._calendar.weeksNode.childNodes, (week) => {
      array.forEach(week.childNodes, (day) => {
        if (!this.dateCounts[domAttr.get(day, 'data-date')]) {
          return;
        }
        day.subValue = this.dateCounts[domAttr.get(day, 'data-date')];
        this._calendar.setActiveDay(day);
      }, this);
    }, this);
    return this;
  },
  hideEventList: function hideEventList() {
    domClass.add(this.eventContainerNode, 'event-hidden');
  },
  showEventList: function showEventList() {
    domClass.remove(this.eventContainerNode, 'event-hidden');
  },
  getSelectedDate: function getSelectedDate() {
    this.clearSelectedDate();
    this.requestSelectedDateActivities();
    this.requestSelectedDateEvents();
  },
  clearSelectedDate: function clearSelectedDate() {
    domClass.add(this.activityContainerNode, 'list-loading');
    this.set('activityContent', this.loadingTemplate.apply(this));
    this.hideEventList();
  },
  cancelRequests: function cancelRequests(requests) {
    if (!requests) {
      return;
    }

    array.forEach(requests, function forEach(xhr) {
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
      .setContractName(o.contractName || App.defaultService.getContractName().text)
      .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.OrderBy, o.queryOrderBy || this.queryOrderBy)
      .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(o.querySelect).join(','))
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
        convert.toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate()),
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
        convert.toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate()),
      ]
    );
  },
  onRequestSelectedDateActivityDataSuccess: function onRequestSelectedDateActivityDataSuccess(feed) {
    if (!feed) {
      return false;
    }

    domClass.remove(this.activityContainerNode, 'list-loading');

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
      domClass.add(this.activityContainerNode, 'list-has-more');
      this.set('activityRemainingContent', this.countMoreText);
    } else {
      domClass.remove(this.activityContainerNode, 'list-has-more');
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
      domClass.add(this.eventContainerNode, 'list-has-more');
      this.set('eventRemainingContent', this.countMoreText);
    } else {
      domClass.remove(this.eventContainerNode, 'list-has-more');
      this.set('eventRemainingContent', '');
    }

    this.set('eventContent', o.join(''));
  },

  renderCalendar: function renderCalendar() {
    if (!this._calendar) {
      this._calendar = new Calendar({ id: 'calendar-view__calendar', noClearButton: true});
      domConstruct.place(this._calendar.domNode, this.calendarNode);
      connect.connect(this._calendar, 'changeDay', this, this.selectDay);
      this._calendar.show();
    }
    this.currentDate = this._calendar.getSelectedDateMoment();
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
  selectEntry: function selectEntry(params) {
    const row = query(params.$source).closest('[data-key]')[0];
    const key = row ? row.getAttribute('data-key') : false;

    this.navigateToDetailView(key);
  },
  navigateToInsertView: function navigateToInsertView() {
    const view = App.getView(this.insertView || this.editView);

    if (!this.options) {
      this.options = {};
    }

    this.options.currentDate = this.currentDate.toString('yyyy-MM-dd') || moment().startOf('day');
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
        key: key,
      });
    }
  },
});

export default __class;
