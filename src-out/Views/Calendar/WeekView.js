define('crm/Views/Calendar/WeekView', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', 'argos/ErrorManager', 'argos/Convert', 'argos/List', 'argos/_LegacySDataListMixin', 'argos/I18n', '../../Models/Activity/ActivityTypeIcon'], function (module, exports, _declare, _string, _ErrorManager, _Convert, _List, _LegacySDataListMixin2, _I18n, _ActivityTypeIcon) {
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

  var resource = (0, _I18n2.default)('calendarWeekView');
  var dtFormatResource = (0, _I18n2.default)('calendarWeekViewDateTimeFormat');

  var __class = (0, _declare2.default)('crm.Views.Calendar.WeekView', [_List2.default, _LegacySDataListMixin3.default], {
    // Localization
    titleText: resource.titleText,
    weekTitleFormatText: dtFormatResource.weekTitleFormatText,
    dayHeaderLeftFormatText: dtFormatResource.dayHeaderLeftFormatText,
    dayHeaderRightFormatText: dtFormatResource.dayHeaderRightFormatText,
    eventDateFormatText: dtFormatResource.eventDateFormatText,
    startTimeFormatText: dtFormatResource.startTimeFormatText,
    startTimeFormatText24: dtFormatResource.startTimeFormatText24,
    todayText: resource.todayText,
    dayText: resource.dayText,
    weekText: resource.weekText,
    monthText: resource.monthText,
    allDayText: resource.allDayText,
    eventHeaderText: resource.eventHeaderText,
    eventMoreText: resource.eventMoreText,
    toggleCollapseText: resource.toggleCollapseText,

    toggleCollapseClass: 'fa fa-chevron-down',
    toggleExpandClass: 'fa fa-chevron-right',
    enablePullToRefresh: false,

    // Templates
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '<div data-dojo-attach-point="searchNode"></div>', '{%! $.navigationTemplate %}', '<div style="clear:both"></div>', '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">', '<h2 data-action="toggleGroup"><button data-dojo-attach-point="collapseButton" class="{%= $$.toggleCollapseClass %}" aria-label="{%: $$.toggleCollapseText %}"></button>{%= $.eventHeaderText %}</h2>', '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>', '{%! $.eventMoreTemplate %}', '</div>', '<div class="list-content" data-dojo-attach-point="contentNode"></div>', '{%! $.moreTemplate %}', '</div>']),
    navigationTemplate: new Simplate(['<div class="split-buttons">', '<button data-tool="today" data-action="getThisWeekActivities" class="button">{%: $.todayText %}</button>', '<button data-tool="selectdate" data-action="selectDate" class="button fa fa-calendar"><span></span></button>', '<button data-tool="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>', '<button data-tool="week" class="button current">{%: $.weekText %}</button>', '<button data-tool="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>', '</div>', '<div class="nav-bar">', '<button data-tool="next" data-action="getNextWeekActivities" class="button button-next fa fa-arrow-right fa-lg"><span></span></button>', '<button data-tool="prev" data-action="getPrevWeekActivities" class="button button-prev fa fa-arrow-left fa-lg"><span></span></button>', '<h4 class="date-text" data-dojo-attach-point="dateNode"></h4>', '</div>']),
    groupTemplate: new Simplate(['<h2 data-action="activateDayHeader" class="dayHeader {%= $.headerClass %}" data-date="{%: moment($.StartDate).format(\'YYYY-MM-DD\') %}">', '<span class="dayHeaderLeft">{%: moment($.StartDate).format($$.dayHeaderLeftFormatText) %}</span>', '<span class="dayHeaderRight">{%: moment($.StartDate).format($$.dayHeaderRightFormatText) %}</span>', '<div style="clear:both"></div>', '</h2>', '<ul class="list-content">']),
    groupEndTemplate: new Simplate(['</ul>']),
    rowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityTypeIcon[$.Type] %}">', '</button>', '</td>', '<td class="entry-table-time">{%! $$.timeTemplate %}</td>', '<td class="entry-table-description">{%! $$.itemTemplate %}</td>', '</tr></table>', '</li>']),
    eventRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityTypeIcon.event %}">', '</button>', '</td>', '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>', '</tr></table>', '</li>']),
    timeTemplate: new Simplate(['{% if ($.Timeless) { %}', '<span class="p-time">{%= $$.allDayText %}</span>', '{% } else { %}', '<span class="p-time">{%: crm.Format.date($.StartDate, (App.is24HourClock()) ? $$.startTimeFormatText24 : $$.startTimeFormatText) %}</span>', '{% } %}']),
    itemTemplate: new Simplate(['<p class="listview-heading p-description">{%: $.Description %}</p>', '<p class="micro-text">{%= $$.nameTemplate.apply($) %}</p>']),
    eventItemTemplate: new Simplate(['<p class="listview-heading p-description">{%: $.Description %} ({%: $.Type %})</p>', '<p class="micro-text">{%! $$.eventNameTemplate %}</p>']),
    nameTemplate: new Simplate(['{% if ($.ContactName) { %}', '{%: $.ContactName %} / {%: $.AccountName %}', '{% } else if ($.AccountName) { %}', '{%: $.AccountName %}', '{% } else { %}', '{%: $.LeadName %}', '{% } %}']),
    eventNameTemplate: new Simplate(['{%: moment($.StartDate).format($$.eventDateFormatText) %}', '&nbsp;-&nbsp;', '{%: moment($.EndDate).format($$.eventDateFormatText) %}']),
    eventMoreTemplate: new Simplate(['<div class="list-more" data-dojo-attach-point="eventMoreNode">', '<button class="button" data-action="activateEventMore">', '<span data-dojo-attach-point="eventRemainingContentNode"></span>', '</button>', '</div>']),
    noDataTemplate: new Simplate(['<div class="no-data"><p>{%= $.noDataText %}</p></div>']),
    eventRemainingContentNode: null,
    eventContentNode: null,
    attributeMap: {
      listContent: {
        node: 'contentNode',
        type: 'innerHTML'
      },
      dateContent: {
        node: 'dateNode',
        type: 'innerHTML'
      },
      eventListContent: {
        node: 'eventContentNode',
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
    id: 'calendar_weeklist',
    cls: 'list activities-for-week',
    activityDetailView: 'activity_detail',
    eventDetailView: 'event_detail',
    monthView: 'calendar_monthlist',
    datePickerView: 'generic_calendar',
    activityListView: 'calendar_daylist',
    insertView: 'activity_types_list',
    currentDate: null,
    enableSearch: false,
    expose: false,
    entryGroups: {},
    weekStartDate: null,
    weekEndDate: null,
    todayDate: null,
    continuousScrolling: false,

    queryWhere: null,
    queryOrderBy: 'StartDate desc',
    querySelect: ['Description', 'StartDate', 'Type', 'AccountName', 'ContactName', 'LeadId', 'LeadName', 'UserId', 'Timeless'],
    eventQuerySelect: ['StartDate', 'EndDate', 'Description', 'Type'],
    activityTypeIcon: activityTypeIcons.default,

    contractName: 'system',
    pageSize: 105, // gives 15 activities per day
    eventPageSize: 5,
    resourceKind: 'activities',

    _onRefresh: function _onRefresh(o) {
      this.inherited(_onRefresh, arguments);
      if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
        this.refreshRequired = true;
      }
    },
    init: function init() {
      this.inherited(init, arguments);
      this.todayDate = moment().startOf('day');
      this.currentDate = this.todayDate.clone();
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
    activateDayHeader: function activateDayHeader(params) {
      this.currentDate = moment(params.date, 'YYYY-MM-DD');
      this.navigateToDayView();
    },
    getThisWeekActivities: function getThisWeekActivities() {
      if (!this.isInCurrentWeek(this.todayDate)) {
        this.currentDate = this.todayDate.clone();
        this.refresh();
      }
    },
    getStartDay: function getStartDay(date) {
      return date.clone().startOf('week');
    },
    getEndDay: function getEndDay(date) {
      return date.clone().endOf('week');
    },
    getNextWeekActivities: function getNextWeekActivities() {
      this.currentDate = this.getStartDay(this.weekEndDate.clone().add({
        days: 1
      }));
      this.refresh();
    },
    getPrevWeekActivities: function getPrevWeekActivities() {
      this.currentDate = this.getStartDay(this.weekStartDate.clone().subtract({
        days: 1
      }));
      this.refresh();
    },
    setWeekQuery: function setWeekQuery() {
      var setDate = this.currentDate || this.todayDate;
      this.weekStartDate = this.getStartDay(setDate);
      this.weekEndDate = this.getEndDay(setDate);
      this.queryWhere = _string2.default.substitute(['UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (', '(Timeless eq false and StartDate between @${1}@ and @${2}@) or ', '(Timeless eq true and StartDate between @${3}@ and @${4}@))'].join(''), [App.context.user && App.context.user.$key, _Convert2.default.toIsoStringFromDate(this.weekStartDate.toDate()), _Convert2.default.toIsoStringFromDate(this.weekEndDate.toDate()), this.weekStartDate.format('YYYY-MM-DDT00:00:00[Z]'), this.weekEndDate.format('YYYY-MM-DDT23:59:59[Z]')]);
    },
    setWeekTitle: function setWeekTitle() {
      var start = this.getStartDay(this.currentDate);
      var end = this.getEndDay(this.currentDate);

      this.set('dateContent', start.format(this.weekTitleFormatText) + '-' + end.format(this.weekTitleFormatText));
    },
    isInCurrentWeek: function isInCurrentWeek(date) {
      return date.valueOf() > this.weekStartDate.valueOf() && date.valueOf() < this.weekEndDate.valueOf();
    },
    processFeed: function processFeed(feed) {
      this.feed = feed;

      var todayNode = this.addTodayDom();
      var entryGroups = this.entryGroups;
      var feedLength = feed.$resources.length;
      var entryOrder = [];
      var dateCompareString = 'YYYY-MM-DD';
      var o = [];
      this.set('listContent', '');

      // If we fetched a page that has no data due to un-reliable counts,
      // check if we fetched anything in the previous pages before assuming there is no data.
      if (feedLength === 0 && Object.keys(this.entries).length === 0) {
        $(this.contentNode).append(this.noDataTemplate.apply(this));
      } else if (feed.$resources) {
        if (todayNode && !entryGroups[this.todayDate.format(dateCompareString)]) {
          entryGroups[this.todayDate.format(dateCompareString)] = [todayNode];
        }

        for (var i = 0; i < feed.$resources.length; i++) {
          var currentEntry = feed.$resources[i];
          var startDate = _Convert2.default.toDateFromString(currentEntry.StartDate);
          if (currentEntry.Timeless) {
            startDate = this.dateToUTC(startDate);
          }
          currentEntry.StartDate = startDate;
          currentEntry.isEvent = false;
          this.entries[currentEntry.$key] = currentEntry;

          var currentDateCompareKey = moment(currentEntry.StartDate).format(dateCompareString);
          var currentGroup = entryGroups[currentDateCompareKey];
          if (currentGroup) {
            if (currentEntry.Timeless) {
              currentGroup.splice(1, 0, this.rowTemplate.apply(currentEntry, this));
            } else {
              currentGroup.push(this.rowTemplate.apply(currentEntry, this));
            }
            continue;
          }
          currentGroup = [this.groupTemplate.apply(currentEntry, this)];
          currentGroup.push(this.rowTemplate.apply(currentEntry, this));
          entryGroups[currentDateCompareKey] = currentGroup;
        }

        for (var entryGroup in entryGroups) {
          if (entryGroups.hasOwnProperty(entryGroup)) {
            entryOrder.push(moment(entryGroup, dateCompareString));
          }
        }

        entryOrder.sort(function (a, b) {
          if (a.valueOf() < b.valueOf()) {
            return 1;
          } else if (a.valueOf() > b.valueOf()) {
            return -1;
          }

          return 0;
        });

        var entryOrderLength = entryOrder.length;
        for (var _i = 0; _i < entryOrderLength; _i++) {
          o.push(entryGroups[entryOrder[_i].format(dateCompareString)].join('') + this.groupEndTemplate.apply(this));
        }

        if (o.length > 0) {
          this.set('listContent', o.join(''));
        }
      }

      this.set('remainingContent', ''); // Feed does not return reliable data, don't show remaining

      $(this.domNode).toggleClass('list-has-more', this.hasMoreData());
      this._loadPreviousSelections();
    },
    addTodayDom: function addTodayDom() {
      if (!this.isInCurrentWeek(this.todayDate)) {
        return null;
      }

      var todayEntry = {
        StartDate: this.todayDate.toDate(),
        headerClass: 'currentDate'
      };

      return this.groupTemplate.apply(todayEntry, this);
    },
    dateToUTC: function dateToUTC(date) {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
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
      var querySelect = this.eventQuerySelect;
      var queryWhere = this.getEventQuery();
      var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setCount(this.eventPageSize).setStartIndex(1).setResourceKind('events').setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(',')).setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);
      return request;
    },
    getEventQuery: function getEventQuery() {
      var startDate = this.weekStartDate;
      var endDate = this.weekEndDate;
      return _string2.default.substitute(['UserId eq "${0}" and (', '(StartDate gt @${1}@ or EndDate gt @${1}@) and ', 'StartDate lt @${2}@', ')'].join(''), [App.context.user && App.context.user.$key, startDate.format('YYYY-MM-DDT00:00:00[Z]'), endDate.format('YYYY-MM-DDT23:59:59[Z]')]);
    },
    hideEventList: function hideEventList() {
      $(this.eventContainerNode).addClass('event-hidden');
    },
    showEventList: function showEventList() {
      $(this.eventContainerNode).removeClass('event-hidden');
    },
    processEventFeed: function processEventFeed(feed) {
      var o = [];
      var feedLength = feed.$resources.length;

      if (feedLength === 0) {
        this.hideEventList();
        return false;
      }

      this.showEventList();

      for (var i = 0; i < feedLength; i++) {
        var event = feed.$resources[i];
        event.isEvent = true;
        event.StartDate = moment(_Convert2.default.toDateFromString(event.StartDate));
        event.EndDate = moment(_Convert2.default.toDateFromString(event.EndDate));
        this.entries[event.$key] = event;
        o.push(this.eventRowTemplate.apply(event, this));
      }

      if (feed.$totalResults > feedLength) {
        $(this.eventContainerNode).addClass('list-has-more');
        this.set('eventRemainingContent', _string2.default.substitute(this.eventMoreText, [feed.$totalResults - feedLength]));
      } else {
        $(this.eventContainerNode).removeClass('list-has-more');
        $(this.eventRemainingContentNode).empty();
      }

      this.set('eventListContent', o.join(''));
    },
    refresh: function refresh() {
      var startDate = this.currentDate.clone();
      this.currentDate = startDate.clone();
      this.weekStartDate = this.getStartDay(startDate);
      this.weekEndDate = this.getEndDay(startDate);
      this.setWeekTitle();
      this.setWeekQuery();

      this.clear();
      this.requestData();
      this.requestEventData();
    },
    show: function show(options) {
      if (options) {
        this.processShowOptions(options);
      }

      this.inherited(show, arguments);
    },
    processShowOptions: function processShowOptions(options) {
      if (options.currentDate) {
        this.currentDate = moment(options.currentDate).startOf('day') || moment().startOf('day');
        this.refreshRequired = true;
      }
    },
    activateEventMore: function activateEventMore() {
      var view = App.getView('event_related');
      var where = this.getEventQuery();
      if (view) {
        view.show({
          where: where
        });
      }
    },
    clear: function clear() {
      this.inherited(clear, arguments);
      this.entryGroups = {};
      this.set('eventContent', '');
      this.set('listContent', this.loadingTemplate.apply(this));
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
    navigateToDayView: function navigateToDayView() {
      var view = App.getView(this.activityListView);
      var options = {
        currentDate: this.currentDate.toDate().valueOf() || moment().startOf('day').valueOf()
      };
      view.show(options);
    },
    navigateToMonthView: function navigateToMonthView() {
      var view = App.getView(this.monthView);
      var options = {
        currentDate: this.currentDate.toDate().valueOf() || moment().startOf('day').valueOf()
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