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