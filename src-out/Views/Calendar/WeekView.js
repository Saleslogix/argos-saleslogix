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

  /**
   * @class crm.Views.Calendar.WeekView
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
    eventMoreTemplate: new Simplate(['<div class="list-more" data-dojo-attach-point="eventMoreNode">', '<button class="button" data-action="activateEventMore">', '<span data-dojo-attach-point="eventRemainingContentNode">{%= $$.eventMoreText %}</span>', '</button>', '</div>']),
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
      this.inherited(arguments);
      if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
        this.refreshRequired = true;
      }
    },
    init: function init() {
      this.inherited(arguments);
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

      this.inherited(arguments);
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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DYWxlbmRhci9XZWVrVmlldy5qcyJdLCJuYW1lcyI6WyJhY3Rpdml0eVR5cGVJY29ucyIsInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJ3ZWVrVGl0bGVGb3JtYXRUZXh0IiwiZGF5SGVhZGVyTGVmdEZvcm1hdFRleHQiLCJkYXlIZWFkZXJSaWdodEZvcm1hdFRleHQiLCJldmVudERhdGVGb3JtYXRUZXh0Iiwic3RhcnRUaW1lRm9ybWF0VGV4dCIsInN0YXJ0VGltZUZvcm1hdFRleHQyNCIsInRvZGF5VGV4dCIsImRheVRleHQiLCJ3ZWVrVGV4dCIsIm1vbnRoVGV4dCIsImFsbERheVRleHQiLCJldmVudEhlYWRlclRleHQiLCJldmVudE1vcmVUZXh0IiwidG9nZ2xlQ29sbGFwc2VUZXh0IiwidG9nZ2xlQ29sbGFwc2VDbGFzcyIsInRvZ2dsZUV4cGFuZENsYXNzIiwiZW5hYmxlUHVsbFRvUmVmcmVzaCIsIndpZGdldFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJuYXZpZ2F0aW9uVGVtcGxhdGUiLCJncm91cFRlbXBsYXRlIiwiZ3JvdXBFbmRUZW1wbGF0ZSIsInJvd1RlbXBsYXRlIiwiZXZlbnRSb3dUZW1wbGF0ZSIsInRpbWVUZW1wbGF0ZSIsIml0ZW1UZW1wbGF0ZSIsImV2ZW50SXRlbVRlbXBsYXRlIiwibmFtZVRlbXBsYXRlIiwiZXZlbnROYW1lVGVtcGxhdGUiLCJldmVudE1vcmVUZW1wbGF0ZSIsIm5vRGF0YVRlbXBsYXRlIiwiZXZlbnRSZW1haW5pbmdDb250ZW50Tm9kZSIsImV2ZW50Q29udGVudE5vZGUiLCJhdHRyaWJ1dGVNYXAiLCJsaXN0Q29udGVudCIsIm5vZGUiLCJ0eXBlIiwiZGF0ZUNvbnRlbnQiLCJldmVudExpc3RDb250ZW50IiwiZXZlbnRSZW1haW5pbmdDb250ZW50IiwicmVtYWluaW5nQ29udGVudCIsImlkIiwiY2xzIiwiYWN0aXZpdHlEZXRhaWxWaWV3IiwiZXZlbnREZXRhaWxWaWV3IiwibW9udGhWaWV3IiwiZGF0ZVBpY2tlclZpZXciLCJhY3Rpdml0eUxpc3RWaWV3IiwiaW5zZXJ0VmlldyIsImN1cnJlbnREYXRlIiwiZW5hYmxlU2VhcmNoIiwiZXhwb3NlIiwiZW50cnlHcm91cHMiLCJ3ZWVrU3RhcnREYXRlIiwid2Vla0VuZERhdGUiLCJ0b2RheURhdGUiLCJjb250aW51b3VzU2Nyb2xsaW5nIiwicXVlcnlXaGVyZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwiZXZlbnRRdWVyeVNlbGVjdCIsImFjdGl2aXR5VHlwZUljb24iLCJkZWZhdWx0IiwiY29udHJhY3ROYW1lIiwicGFnZVNpemUiLCJldmVudFBhZ2VTaXplIiwicmVzb3VyY2VLaW5kIiwiX29uUmVmcmVzaCIsIm8iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJyZWZyZXNoUmVxdWlyZWQiLCJpbml0IiwibW9tZW50Iiwic3RhcnRPZiIsImNsb25lIiwidG9nZ2xlR3JvdXAiLCJwYXJhbXMiLCIkc291cmNlIiwicGFyZW50Tm9kZSIsIiQiLCJ0b2dnbGVDbGFzcyIsImJ1dHRvbiIsImNvbGxhcHNlQnV0dG9uIiwiYWN0aXZhdGVEYXlIZWFkZXIiLCJkYXRlIiwibmF2aWdhdGVUb0RheVZpZXciLCJnZXRUaGlzV2Vla0FjdGl2aXRpZXMiLCJpc0luQ3VycmVudFdlZWsiLCJyZWZyZXNoIiwiZ2V0U3RhcnREYXkiLCJnZXRFbmREYXkiLCJlbmRPZiIsImdldE5leHRXZWVrQWN0aXZpdGllcyIsImFkZCIsImRheXMiLCJnZXRQcmV2V2Vla0FjdGl2aXRpZXMiLCJzdWJ0cmFjdCIsInNldFdlZWtRdWVyeSIsInNldERhdGUiLCJzdWJzdGl0dXRlIiwiam9pbiIsIkFwcCIsImNvbnRleHQiLCJ1c2VyIiwiJGtleSIsInRvSXNvU3RyaW5nRnJvbURhdGUiLCJ0b0RhdGUiLCJmb3JtYXQiLCJzZXRXZWVrVGl0bGUiLCJzdGFydCIsImVuZCIsInNldCIsInZhbHVlT2YiLCJwcm9jZXNzRmVlZCIsImZlZWQiLCJ0b2RheU5vZGUiLCJhZGRUb2RheURvbSIsImZlZWRMZW5ndGgiLCIkcmVzb3VyY2VzIiwibGVuZ3RoIiwiZW50cnlPcmRlciIsImRhdGVDb21wYXJlU3RyaW5nIiwiT2JqZWN0Iiwia2V5cyIsImVudHJpZXMiLCJjb250ZW50Tm9kZSIsImFwcGVuZCIsImFwcGx5IiwiaSIsImN1cnJlbnRFbnRyeSIsInN0YXJ0RGF0ZSIsInRvRGF0ZUZyb21TdHJpbmciLCJTdGFydERhdGUiLCJUaW1lbGVzcyIsImRhdGVUb1VUQyIsImlzRXZlbnQiLCJjdXJyZW50RGF0ZUNvbXBhcmVLZXkiLCJjdXJyZW50R3JvdXAiLCJzcGxpY2UiLCJwdXNoIiwiZW50cnlHcm91cCIsImhhc093blByb3BlcnR5Iiwic29ydCIsImEiLCJiIiwiZW50cnlPcmRlckxlbmd0aCIsImRvbU5vZGUiLCJoYXNNb3JlRGF0YSIsIl9sb2FkUHJldmlvdXNTZWxlY3Rpb25zIiwidG9kYXlFbnRyeSIsImhlYWRlckNsYXNzIiwiRGF0ZSIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsInJlcXVlc3RFdmVudERhdGEiLCJyZXF1ZXN0IiwiY3JlYXRlRXZlbnRSZXF1ZXN0IiwicmVhZCIsInN1Y2Nlc3MiLCJvblJlcXVlc3RFdmVudERhdGFTdWNjZXNzIiwiZmFpbHVyZSIsIm9uUmVxdWVzdEV2ZW50RGF0YUZhaWx1cmUiLCJhYm9ydGVkIiwib25SZXF1ZXN0RXZlbnREYXRhQWJvcnRlZCIsInNjb3BlIiwicmVzcG9uc2UiLCJhbGVydCIsInJlcXVlc3RFcnJvclRleHQiLCJhZGRFcnJvciIsIm9wdGlvbnMiLCJwcm9jZXNzRXZlbnRGZWVkIiwiZ2V0RXZlbnRRdWVyeSIsIlNhZ2UiLCJTRGF0YSIsIkNsaWVudCIsIlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdCIsImdldFNlcnZpY2UiLCJzZXRDb3VudCIsInNldFN0YXJ0SW5kZXgiLCJzZXRSZXNvdXJjZUtpbmQiLCJzZXRRdWVyeUFyZyIsIlNEYXRhVXJpIiwiUXVlcnlBcmdOYW1lcyIsIlNlbGVjdCIsImV4cGFuZEV4cHJlc3Npb24iLCJXaGVyZSIsImVuZERhdGUiLCJoaWRlRXZlbnRMaXN0IiwiZXZlbnRDb250YWluZXJOb2RlIiwiYWRkQ2xhc3MiLCJzaG93RXZlbnRMaXN0IiwicmVtb3ZlQ2xhc3MiLCJldmVudCIsIkVuZERhdGUiLCIkdG90YWxSZXN1bHRzIiwiZW1wdHkiLCJjbGVhciIsInJlcXVlc3REYXRhIiwic2hvdyIsInByb2Nlc3NTaG93T3B0aW9ucyIsImFjdGl2YXRlRXZlbnRNb3JlIiwidmlldyIsImdldFZpZXciLCJ3aGVyZSIsImxvYWRpbmdUZW1wbGF0ZSIsInNlbGVjdEVudHJ5Iiwicm93IiwiY2xvc2VzdCIsImtleSIsImdldEF0dHJpYnV0ZSIsIm5hdmlnYXRlVG9EZXRhaWxWaWV3Iiwic2VsZWN0RGF0ZSIsInNob3dUaW1lUGlja2VyIiwidGltZWxlc3MiLCJ0b29scyIsInRiYXIiLCJmbiIsInNlbGVjdERhdGVTdWNjZXNzIiwic2lkZSIsIlJlVUkiLCJiYWNrIiwiZ2V0UHJpbWFyeUFjdGl2ZVZpZXciLCJnZXREYXRlVGltZSIsIm5hdmlnYXRlVG9Nb250aFZpZXciLCJuYXZpZ2F0ZVRvSW5zZXJ0VmlldyIsImVkaXRWaWV3IiwibmVnYXRlSGlzdG9yeSIsInJldHVyblRvIiwiaW5zZXJ0IiwiZGVzY3JpcHRvciIsImVudHJ5IiwiZGV0YWlsVmlldyIsInRoZURlc2NyaXB0b3IiLCJEZXNjcmlwdGlvbiIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bc0JZQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXRCWjs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1DLFdBQVcsb0JBQVksa0JBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksZ0NBQVosQ0FBekI7O0FB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S0FBSy9MLEVBRlA7QUFHUmdNLGtCQUFRLElBSEE7QUFJUnhMLHVCQUFhLEtBQUs2SCxPQUFMLENBQWE3SCxXQUFiLENBQXlCZ0UsT0FBekI7QUFKTCxTQUFWO0FBTUQ7QUFDRixLQTFpQm1GO0FBMmlCcEZzRywwQkFBc0IsU0FBU0Esb0JBQVQsQ0FBOEJGLEdBQTlCLEVBQW1DcUIsVUFBbkMsRUFBK0M7QUFDbkUsVUFBTUMsUUFBUSxLQUFLOUcsT0FBTCxDQUFhd0YsR0FBYixDQUFkO0FBQ0EsVUFBTXVCLGFBQWNELE1BQU1uRyxPQUFQLEdBQWtCLEtBQUs1RixlQUF2QixHQUF5QyxLQUFLRCxrQkFBakU7QUFDQSxVQUFNbUssT0FBT3hHLElBQUl5RyxPQUFKLENBQVk2QixVQUFaLENBQWI7O0FBRUEsVUFBTUMsZ0JBQWlCRixNQUFNbkcsT0FBUCxHQUFrQmtHLFVBQWxCLEdBQStCQyxNQUFNRyxXQUEzRDs7QUFFQSxVQUFJaEMsSUFBSixFQUFVO0FBQ1JBLGFBQUtILElBQUwsQ0FBVTtBQUNSb0MsaUJBQU9GLGFBREM7QUFFUnhCO0FBRlEsU0FBVjtBQUlEO0FBQ0Y7QUF4akJtRixHQUF0RSxDQUFoQjs7b0JBMmpCZXZOLE8iLCJmaWxlIjoiV2Vla1ZpZXcuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IExpc3QgZnJvbSAnYXJnb3MvTGlzdCc7XHJcbmltcG9ydCBfTGVnYWN5U0RhdGFMaXN0TWl4aW4gZnJvbSAnYXJnb3MvX0xlZ2FjeVNEYXRhTGlzdE1peGluJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgKiBhcyBhY3Rpdml0eVR5cGVJY29ucyBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlSWNvbic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdjYWxlbmRhcldlZWtWaWV3Jyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY2FsZW5kYXJXZWVrVmlld0RhdGVUaW1lRm9ybWF0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5DYWxlbmRhci5XZWVrVmlld1xyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgYXJnb3MuTGlzdFxyXG4gKiBAbWl4aW5zIGFyZ29zLl9MZWdhY3lTRGF0YUxpc3RNaXhpblxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuTGlzdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuX0xlZ2FjeVNEYXRhTGlzdE1peGluXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5Db252ZXJ0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FcnJvck1hbmFnZXJcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICpcclxuICogQHJlcXVpcmVzIG1vbWVudFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5DYWxlbmRhci5XZWVrVmlldycsIFtMaXN0LCBfTGVnYWN5U0RhdGFMaXN0TWl4aW5dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgd2Vla1RpdGxlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS53ZWVrVGl0bGVGb3JtYXRUZXh0LFxyXG4gIGRheUhlYWRlckxlZnRGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmRheUhlYWRlckxlZnRGb3JtYXRUZXh0LFxyXG4gIGRheUhlYWRlclJpZ2h0Rm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5kYXlIZWFkZXJSaWdodEZvcm1hdFRleHQsXHJcbiAgZXZlbnREYXRlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5ldmVudERhdGVGb3JtYXRUZXh0LFxyXG4gIHN0YXJ0VGltZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRUaW1lRm9ybWF0VGV4dCxcclxuICBzdGFydFRpbWVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRUaW1lRm9ybWF0VGV4dDI0LFxyXG4gIHRvZGF5VGV4dDogcmVzb3VyY2UudG9kYXlUZXh0LFxyXG4gIGRheVRleHQ6IHJlc291cmNlLmRheVRleHQsXHJcbiAgd2Vla1RleHQ6IHJlc291cmNlLndlZWtUZXh0LFxyXG4gIG1vbnRoVGV4dDogcmVzb3VyY2UubW9udGhUZXh0LFxyXG4gIGFsbERheVRleHQ6IHJlc291cmNlLmFsbERheVRleHQsXHJcbiAgZXZlbnRIZWFkZXJUZXh0OiByZXNvdXJjZS5ldmVudEhlYWRlclRleHQsXHJcbiAgZXZlbnRNb3JlVGV4dDogcmVzb3VyY2UuZXZlbnRNb3JlVGV4dCxcclxuICB0b2dnbGVDb2xsYXBzZVRleHQ6IHJlc291cmNlLnRvZ2dsZUNvbGxhcHNlVGV4dCxcclxuXHJcbiAgdG9nZ2xlQ29sbGFwc2VDbGFzczogJ2ZhIGZhLWNoZXZyb24tZG93bicsXHJcbiAgdG9nZ2xlRXhwYW5kQ2xhc3M6ICdmYSBmYS1jaGV2cm9uLXJpZ2h0JyxcclxuICBlbmFibGVQdWxsVG9SZWZyZXNoOiBmYWxzZSxcclxuXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgd2lkZ2V0VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBpZD1cInslPSAkLmlkICV9XCIgZGF0YS10aXRsZT1cInslPSAkLnRpdGxlVGV4dCAlfVwiIGNsYXNzPVwib3ZlcnRocm93IHslPSAkLmNscyAlfVwiIHslIGlmICgkLnJlc291cmNlS2luZCkgeyAlfWRhdGEtcmVzb3VyY2Uta2luZD1cInslPSAkLnJlc291cmNlS2luZCAlfVwieyUgfSAlfT4nLFxyXG4gICAgJzxkaXYgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cInNlYXJjaE5vZGVcIj48L2Rpdj4nLFxyXG4gICAgJ3slISAkLm5hdmlnYXRpb25UZW1wbGF0ZSAlfScsXHJcbiAgICAnPGRpdiBzdHlsZT1cImNsZWFyOmJvdGhcIj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJldmVudC1jb250ZW50IGV2ZW50LWhpZGRlblwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJldmVudENvbnRhaW5lck5vZGVcIj4nLFxyXG4gICAgJzxoMiBkYXRhLWFjdGlvbj1cInRvZ2dsZUdyb3VwXCI+PGJ1dHRvbiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiY29sbGFwc2VCdXR0b25cIiBjbGFzcz1cInslPSAkJC50b2dnbGVDb2xsYXBzZUNsYXNzICV9XCIgYXJpYS1sYWJlbD1cInslOiAkJC50b2dnbGVDb2xsYXBzZVRleHQgJX1cIj48L2J1dHRvbj57JT0gJC5ldmVudEhlYWRlclRleHQgJX08L2gyPicsXHJcbiAgICAnPHVsIGNsYXNzPVwibGlzdC1jb250ZW50XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImV2ZW50Q29udGVudE5vZGVcIj48L3VsPicsXHJcbiAgICAneyUhICQuZXZlbnRNb3JlVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImxpc3QtY29udGVudFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJjb250ZW50Tm9kZVwiPjwvZGl2PicsXHJcbiAgICAneyUhICQubW9yZVRlbXBsYXRlICV9JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIG5hdmlnYXRpb25UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwic3BsaXQtYnV0dG9uc1wiPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJ0b2RheVwiIGRhdGEtYWN0aW9uPVwiZ2V0VGhpc1dlZWtBY3Rpdml0aWVzXCIgY2xhc3M9XCJidXR0b25cIj57JTogJC50b2RheVRleHQgJX08L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwic2VsZWN0ZGF0ZVwiIGRhdGEtYWN0aW9uPVwic2VsZWN0RGF0ZVwiIGNsYXNzPVwiYnV0dG9uIGZhIGZhLWNhbGVuZGFyXCI+PHNwYW4+PC9zcGFuPjwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJkYXlcIiBkYXRhLWFjdGlvbj1cIm5hdmlnYXRlVG9EYXlWaWV3XCIgY2xhc3M9XCJidXR0b25cIj57JTogJC5kYXlUZXh0ICV9PC9idXR0b24+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtdG9vbD1cIndlZWtcIiBjbGFzcz1cImJ1dHRvbiBjdXJyZW50XCI+eyU6ICQud2Vla1RleHQgJX08L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwibW9udGhcIiBkYXRhLWFjdGlvbj1cIm5hdmlnYXRlVG9Nb250aFZpZXdcIiBjbGFzcz1cImJ1dHRvblwiPnslOiAkLm1vbnRoVGV4dCAlfTwvYnV0dG9uPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibmF2LWJhclwiPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJuZXh0XCIgZGF0YS1hY3Rpb249XCJnZXROZXh0V2Vla0FjdGl2aXRpZXNcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tbmV4dCBmYSBmYS1hcnJvdy1yaWdodCBmYS1sZ1wiPjxzcGFuPjwvc3Bhbj48L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwicHJldlwiIGRhdGEtYWN0aW9uPVwiZ2V0UHJldldlZWtBY3Rpdml0aWVzXCIgY2xhc3M9XCJidXR0b24gYnV0dG9uLXByZXYgZmEgZmEtYXJyb3ctbGVmdCBmYS1sZ1wiPjxzcGFuPjwvc3Bhbj48L2J1dHRvbj4nLFxyXG4gICAgJzxoNCBjbGFzcz1cImRhdGUtdGV4dFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJkYXRlTm9kZVwiPjwvaDQ+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGdyb3VwVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGgyIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVEYXlIZWFkZXJcIiBjbGFzcz1cImRheUhlYWRlciB7JT0gJC5oZWFkZXJDbGFzcyAlfVwiIGRhdGEtZGF0ZT1cInslOiBtb21lbnQoJC5TdGFydERhdGUpLmZvcm1hdChcXCdZWVlZLU1NLUREXFwnKSAlfVwiPicsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJkYXlIZWFkZXJMZWZ0XCI+eyU6IG1vbWVudCgkLlN0YXJ0RGF0ZSkuZm9ybWF0KCQkLmRheUhlYWRlckxlZnRGb3JtYXRUZXh0KSAlfTwvc3Bhbj4nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwiZGF5SGVhZGVyUmlnaHRcIj57JTogbW9tZW50KCQuU3RhcnREYXRlKS5mb3JtYXQoJCQuZGF5SGVhZGVyUmlnaHRGb3JtYXRUZXh0KSAlfTwvc3Bhbj4nLFxyXG4gICAgJzxkaXYgc3R5bGU9XCJjbGVhcjpib3RoXCI+PC9kaXY+JyxcclxuICAgICc8L2gyPicsXHJcbiAgICAnPHVsIGNsYXNzPVwibGlzdC1jb250ZW50XCI+JyxcclxuICBdKSxcclxuICBncm91cEVuZFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzwvdWw+JyxcclxuICBdKSxcclxuICByb3dUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8bGkgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUVudHJ5XCIgZGF0YS1rZXk9XCJ7JT0gJC4ka2V5ICV9XCIgZGF0YS1kZXNjcmlwdG9yPVwieyU6ICQuJGRlc2NyaXB0b3IgJX1cIiBkYXRhLWFjdGl2aXR5LXR5cGU9XCJ7JTogJC5UeXBlICV9XCI+JyxcclxuICAgICc8dGFibGUgY2xhc3M9XCJjYWxlbmRhci1lbnRyeS10YWJsZVwiPjx0cj4nLFxyXG4gICAgJzx0ZCBjbGFzcz1cImVudHJ5LXRhYmxlLWljb25cIj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS1hY3Rpb249XCJzZWxlY3RFbnRyeVwiIGNsYXNzPVwibGlzdC1pdGVtLXNlbGVjdG9yIGJ1dHRvbiB7JT0gJCQuYWN0aXZpdHlUeXBlSWNvblskLlR5cGVdICV9XCI+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzwvdGQ+JyxcclxuICAgICc8dGQgY2xhc3M9XCJlbnRyeS10YWJsZS10aW1lXCI+eyUhICQkLnRpbWVUZW1wbGF0ZSAlfTwvdGQ+JyxcclxuICAgICc8dGQgY2xhc3M9XCJlbnRyeS10YWJsZS1kZXNjcmlwdGlvblwiPnslISAkJC5pdGVtVGVtcGxhdGUgJX08L3RkPicsXHJcbiAgICAnPC90cj48L3RhYmxlPicsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG4gIGV2ZW50Um93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFbnRyeVwiIGRhdGEta2V5PVwieyU9ICQuJGtleSAlfVwiIGRhdGEtZGVzY3JpcHRvcj1cInslOiAkLiRkZXNjcmlwdG9yICV9XCIgZGF0YS1hY3Rpdml0eS10eXBlPVwiRXZlbnRcIj4nLFxyXG4gICAgJzx0YWJsZSBjbGFzcz1cImNhbGVuZGFyLWVudHJ5LXRhYmxlXCI+PHRyPicsXHJcbiAgICAnPHRkIGNsYXNzPVwiZW50cnktdGFibGUtaWNvblwiPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLWFjdGlvbj1cInNlbGVjdEVudHJ5XCIgY2xhc3M9XCJsaXN0LWl0ZW0tc2VsZWN0b3IgYnV0dG9uIHslPSAkJC5hY3Rpdml0eVR5cGVJY29uLmV2ZW50ICV9XCI+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzwvdGQ+JyxcclxuICAgICc8dGQgY2xhc3M9XCJlbnRyeS10YWJsZS1kZXNjcmlwdGlvblwiPnslISAkJC5ldmVudEl0ZW1UZW1wbGF0ZSAlfTwvdGQ+JyxcclxuICAgICc8L3RyPjwvdGFibGU+JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcbiAgdGltZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkLlRpbWVsZXNzKSB7ICV9JyxcclxuICAgICc8c3BhbiBjbGFzcz1cInAtdGltZVwiPnslPSAkJC5hbGxEYXlUZXh0ICV9PC9zcGFuPicsXHJcbiAgICAneyUgfSBlbHNlIHsgJX0nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwicC10aW1lXCI+eyU6IGNybS5Gb3JtYXQuZGF0ZSgkLlN0YXJ0RGF0ZSwgKEFwcC5pczI0SG91ckNsb2NrKCkpID8gJCQuc3RhcnRUaW1lRm9ybWF0VGV4dDI0IDogJCQuc3RhcnRUaW1lRm9ybWF0VGV4dCkgJX08L3NwYW4+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICBpdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nIHAtZGVzY3JpcHRpb25cIj57JTogJC5EZXNjcmlwdGlvbiAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslPSAkJC5uYW1lVGVtcGxhdGUuYXBwbHkoJCkgJX08L3A+JyxcclxuICBdKSxcclxuICBldmVudEl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmcgcC1kZXNjcmlwdGlvblwiPnslOiAkLkRlc2NyaXB0aW9uICV9ICh7JTogJC5UeXBlICV9KTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPnslISAkJC5ldmVudE5hbWVUZW1wbGF0ZSAlfTwvcD4nLFxyXG4gIF0pLFxyXG4gIG5hbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJC5Db250YWN0TmFtZSkgeyAlfScsXHJcbiAgICAneyU6ICQuQ29udGFjdE5hbWUgJX0gLyB7JTogJC5BY2NvdW50TmFtZSAlfScsXHJcbiAgICAneyUgfSBlbHNlIGlmICgkLkFjY291bnROYW1lKSB7ICV9JyxcclxuICAgICd7JTogJC5BY2NvdW50TmFtZSAlfScsXHJcbiAgICAneyUgfSBlbHNlIHsgJX0nLFxyXG4gICAgJ3slOiAkLkxlYWROYW1lICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICBldmVudE5hbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JTogbW9tZW50KCQuU3RhcnREYXRlKS5mb3JtYXQoJCQuZXZlbnREYXRlRm9ybWF0VGV4dCkgJX0nLFxyXG4gICAgJyZuYnNwOy0mbmJzcDsnLFxyXG4gICAgJ3slOiBtb21lbnQoJC5FbmREYXRlKS5mb3JtYXQoJCQuZXZlbnREYXRlRm9ybWF0VGV4dCkgJX0nLFxyXG4gIF0pLFxyXG4gIGV2ZW50TW9yZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJsaXN0LW1vcmVcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZXZlbnRNb3JlTm9kZVwiPicsXHJcbiAgICAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFdmVudE1vcmVcIj4nLFxyXG4gICAgJzxzcGFuIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJldmVudFJlbWFpbmluZ0NvbnRlbnROb2RlXCI+eyU9ICQkLmV2ZW50TW9yZVRleHQgJX08L3NwYW4+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgbm9EYXRhVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cIm5vLWRhdGFcIj48cD57JT0gJC5ub0RhdGFUZXh0ICV9PC9wPjwvZGl2PicsXHJcbiAgXSksXHJcbiAgZXZlbnRSZW1haW5pbmdDb250ZW50Tm9kZTogbnVsbCxcclxuICBldmVudENvbnRlbnROb2RlOiBudWxsLFxyXG4gIGF0dHJpYnV0ZU1hcDoge1xyXG4gICAgbGlzdENvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2NvbnRlbnROb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgZGF0ZUNvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2RhdGVOb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRMaXN0Q29udGVudDoge1xyXG4gICAgICBub2RlOiAnZXZlbnRDb250ZW50Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICAgIGV2ZW50UmVtYWluaW5nQ29udGVudDoge1xyXG4gICAgICBub2RlOiAnZXZlbnRSZW1haW5pbmdDb250ZW50Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICAgIHJlbWFpbmluZ0NvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ3JlbWFpbmluZ0NvbnRlbnROb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnY2FsZW5kYXJfd2Vla2xpc3QnLFxyXG4gIGNsczogJ2xpc3QgYWN0aXZpdGllcy1mb3Itd2VlaycsXHJcbiAgYWN0aXZpdHlEZXRhaWxWaWV3OiAnYWN0aXZpdHlfZGV0YWlsJyxcclxuICBldmVudERldGFpbFZpZXc6ICdldmVudF9kZXRhaWwnLFxyXG4gIG1vbnRoVmlldzogJ2NhbGVuZGFyX21vbnRobGlzdCcsXHJcbiAgZGF0ZVBpY2tlclZpZXc6ICdnZW5lcmljX2NhbGVuZGFyJyxcclxuICBhY3Rpdml0eUxpc3RWaWV3OiAnY2FsZW5kYXJfZGF5bGlzdCcsXHJcbiAgaW5zZXJ0VmlldzogJ2FjdGl2aXR5X3R5cGVzX2xpc3QnLFxyXG4gIGN1cnJlbnREYXRlOiBudWxsLFxyXG4gIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgZXhwb3NlOiBmYWxzZSxcclxuICBlbnRyeUdyb3Vwczoge30sXHJcbiAgd2Vla1N0YXJ0RGF0ZTogbnVsbCxcclxuICB3ZWVrRW5kRGF0ZTogbnVsbCxcclxuICB0b2RheURhdGU6IG51bGwsXHJcbiAgY29udGludW91c1Njcm9sbGluZzogZmFsc2UsXHJcblxyXG4gIHF1ZXJ5V2hlcmU6IG51bGwsXHJcbiAgcXVlcnlPcmRlckJ5OiAnU3RhcnREYXRlIGRlc2MnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAnVHlwZScsXHJcbiAgICAnQWNjb3VudE5hbWUnLFxyXG4gICAgJ0NvbnRhY3ROYW1lJyxcclxuICAgICdMZWFkSWQnLFxyXG4gICAgJ0xlYWROYW1lJyxcclxuICAgICdVc2VySWQnLFxyXG4gICAgJ1RpbWVsZXNzJyxcclxuICBdLFxyXG4gIGV2ZW50UXVlcnlTZWxlY3Q6IFtcclxuICAgICdTdGFydERhdGUnLFxyXG4gICAgJ0VuZERhdGUnLFxyXG4gICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICdUeXBlJyxcclxuICBdLFxyXG4gIGFjdGl2aXR5VHlwZUljb246IGFjdGl2aXR5VHlwZUljb25zLmRlZmF1bHQsXHJcblxyXG4gIGNvbnRyYWN0TmFtZTogJ3N5c3RlbScsXHJcbiAgcGFnZVNpemU6IDEwNSwgLy8gZ2l2ZXMgMTUgYWN0aXZpdGllcyBwZXIgZGF5XHJcbiAgZXZlbnRQYWdlU2l6ZTogNSxcclxuICByZXNvdXJjZUtpbmQ6ICdhY3Rpdml0aWVzJyxcclxuXHJcbiAgX29uUmVmcmVzaDogZnVuY3Rpb24gX29uUmVmcmVzaChvKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKG8ucmVzb3VyY2VLaW5kID09PSAnYWN0aXZpdGllcycgfHwgby5yZXNvdXJjZUtpbmQgPT09ICdldmVudHMnKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy50b2RheURhdGUgPSBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICAgIHRoaXMuY3VycmVudERhdGUgPSB0aGlzLnRvZGF5RGF0ZS5jbG9uZSgpO1xyXG4gIH0sXHJcbiAgdG9nZ2xlR3JvdXA6IGZ1bmN0aW9uIHRvZ2dsZUdyb3VwKHBhcmFtcykge1xyXG4gICAgY29uc3Qgbm9kZSA9IHBhcmFtcy4kc291cmNlO1xyXG4gICAgaWYgKG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XHJcbiAgICAgICQobm9kZSkudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG4gICAgICAkKG5vZGUucGFyZW50Tm9kZSkudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZC1ldmVudCcpO1xyXG5cclxuICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy5jb2xsYXBzZUJ1dHRvbjtcclxuXHJcbiAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAkKGJ1dHRvbikudG9nZ2xlQ2xhc3ModGhpcy50b2dnbGVDb2xsYXBzZUNsYXNzKTtcclxuICAgICAgICAkKGJ1dHRvbikudG9nZ2xlQ2xhc3ModGhpcy50b2dnbGVFeHBhbmRDbGFzcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGFjdGl2YXRlRGF5SGVhZGVyOiBmdW5jdGlvbiBhY3RpdmF0ZURheUhlYWRlcihwYXJhbXMpIHtcclxuICAgIHRoaXMuY3VycmVudERhdGUgPSBtb21lbnQocGFyYW1zLmRhdGUsICdZWVlZLU1NLUREJyk7XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9EYXlWaWV3KCk7XHJcbiAgfSxcclxuICBnZXRUaGlzV2Vla0FjdGl2aXRpZXM6IGZ1bmN0aW9uIGdldFRoaXNXZWVrQWN0aXZpdGllcygpIHtcclxuICAgIGlmICghdGhpcy5pc0luQ3VycmVudFdlZWsodGhpcy50b2RheURhdGUpKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudERhdGUgPSB0aGlzLnRvZGF5RGF0ZS5jbG9uZSgpO1xyXG4gICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldFN0YXJ0RGF5OiBmdW5jdGlvbiBnZXRTdGFydERheShkYXRlKSB7XHJcbiAgICByZXR1cm4gZGF0ZS5jbG9uZSgpLnN0YXJ0T2YoJ3dlZWsnKTtcclxuICB9LFxyXG4gIGdldEVuZERheTogZnVuY3Rpb24gZ2V0RW5kRGF5KGRhdGUpIHtcclxuICAgIHJldHVybiBkYXRlLmNsb25lKCkuZW5kT2YoJ3dlZWsnKTtcclxuICB9LFxyXG4gIGdldE5leHRXZWVrQWN0aXZpdGllczogZnVuY3Rpb24gZ2V0TmV4dFdlZWtBY3Rpdml0aWVzKCkge1xyXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IHRoaXMuZ2V0U3RhcnREYXkodGhpcy53ZWVrRW5kRGF0ZS5jbG9uZSgpLmFkZCh7XHJcbiAgICAgIGRheXM6IDEsXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9LFxyXG4gIGdldFByZXZXZWVrQWN0aXZpdGllczogZnVuY3Rpb24gZ2V0UHJldldlZWtBY3Rpdml0aWVzKCkge1xyXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IHRoaXMuZ2V0U3RhcnREYXkodGhpcy53ZWVrU3RhcnREYXRlLmNsb25lKCkuc3VidHJhY3Qoe1xyXG4gICAgICBkYXlzOiAxLFxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgfSxcclxuICBzZXRXZWVrUXVlcnk6IGZ1bmN0aW9uIHNldFdlZWtRdWVyeSgpIHtcclxuICAgIGNvbnN0IHNldERhdGUgPSB0aGlzLmN1cnJlbnREYXRlIHx8IHRoaXMudG9kYXlEYXRlO1xyXG4gICAgdGhpcy53ZWVrU3RhcnREYXRlID0gdGhpcy5nZXRTdGFydERheShzZXREYXRlKTtcclxuICAgIHRoaXMud2Vla0VuZERhdGUgPSB0aGlzLmdldEVuZERheShzZXREYXRlKTtcclxuICAgIHRoaXMucXVlcnlXaGVyZSA9IHN0cmluZy5zdWJzdGl0dXRlKFxyXG4gICAgICBbXHJcbiAgICAgICAgJ1VzZXJBY3Rpdml0aWVzLlVzZXJJZCBlcSBcIiR7MH1cIiBhbmQgVHlwZSBuZSBcImF0TGl0ZXJhdHVyZVwiIGFuZCAoJyxcclxuICAgICAgICAnKFRpbWVsZXNzIGVxIGZhbHNlIGFuZCBTdGFydERhdGUgYmV0d2VlbiBAJHsxfUAgYW5kIEAkezJ9QCkgb3IgJyxcclxuICAgICAgICAnKFRpbWVsZXNzIGVxIHRydWUgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAkezN9QCBhbmQgQCR7NH1AKSknLFxyXG4gICAgICBdLmpvaW4oJycpLCBbXHJcbiAgICAgICAgQXBwLmNvbnRleHQudXNlciAmJiBBcHAuY29udGV4dC51c2VyLiRrZXksXHJcbiAgICAgICAgY29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHRoaXMud2Vla1N0YXJ0RGF0ZS50b0RhdGUoKSksXHJcbiAgICAgICAgY29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHRoaXMud2Vla0VuZERhdGUudG9EYXRlKCkpLFxyXG4gICAgICAgIHRoaXMud2Vla1N0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tRERUMDA6MDA6MDBbWl0nKSxcclxuICAgICAgICB0aGlzLndlZWtFbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpLFxyXG4gICAgICBdXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgc2V0V2Vla1RpdGxlOiBmdW5jdGlvbiBzZXRXZWVrVGl0bGUoKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuZ2V0U3RhcnREYXkodGhpcy5jdXJyZW50RGF0ZSk7XHJcbiAgICBjb25zdCBlbmQgPSB0aGlzLmdldEVuZERheSh0aGlzLmN1cnJlbnREYXRlKTtcclxuXHJcbiAgICB0aGlzLnNldCgnZGF0ZUNvbnRlbnQnLCBgJHtzdGFydC5mb3JtYXQodGhpcy53ZWVrVGl0bGVGb3JtYXRUZXh0KX0tJHtlbmQuZm9ybWF0KHRoaXMud2Vla1RpdGxlRm9ybWF0VGV4dCl9YCk7XHJcbiAgfSxcclxuICBpc0luQ3VycmVudFdlZWs6IGZ1bmN0aW9uIGlzSW5DdXJyZW50V2VlayhkYXRlKSB7XHJcbiAgICByZXR1cm4gKGRhdGUudmFsdWVPZigpID4gdGhpcy53ZWVrU3RhcnREYXRlLnZhbHVlT2YoKSAmJiBkYXRlLnZhbHVlT2YoKSA8IHRoaXMud2Vla0VuZERhdGUudmFsdWVPZigpKTtcclxuICB9LFxyXG4gIHByb2Nlc3NGZWVkOiBmdW5jdGlvbiBwcm9jZXNzRmVlZChmZWVkKSB7XHJcbiAgICB0aGlzLmZlZWQgPSBmZWVkO1xyXG5cclxuICAgIGNvbnN0IHRvZGF5Tm9kZSA9IHRoaXMuYWRkVG9kYXlEb20oKTtcclxuICAgIGNvbnN0IGVudHJ5R3JvdXBzID0gdGhpcy5lbnRyeUdyb3VwcztcclxuICAgIGNvbnN0IGZlZWRMZW5ndGggPSBmZWVkLiRyZXNvdXJjZXMubGVuZ3RoO1xyXG4gICAgY29uc3QgZW50cnlPcmRlciA9IFtdO1xyXG4gICAgY29uc3QgZGF0ZUNvbXBhcmVTdHJpbmcgPSAnWVlZWS1NTS1ERCc7XHJcbiAgICBjb25zdCBvID0gW107XHJcbiAgICB0aGlzLnNldCgnbGlzdENvbnRlbnQnLCAnJyk7XHJcblxyXG4gICAgLy8gSWYgd2UgZmV0Y2hlZCBhIHBhZ2UgdGhhdCBoYXMgbm8gZGF0YSBkdWUgdG8gdW4tcmVsaWFibGUgY291bnRzLFxyXG4gICAgLy8gY2hlY2sgaWYgd2UgZmV0Y2hlZCBhbnl0aGluZyBpbiB0aGUgcHJldmlvdXMgcGFnZXMgYmVmb3JlIGFzc3VtaW5nIHRoZXJlIGlzIG5vIGRhdGEuXHJcbiAgICBpZiAoZmVlZExlbmd0aCA9PT0gMCAmJiBPYmplY3Qua2V5cyh0aGlzLmVudHJpZXMpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAkKHRoaXMuY29udGVudE5vZGUpLmFwcGVuZCh0aGlzLm5vRGF0YVRlbXBsYXRlLmFwcGx5KHRoaXMpKTtcclxuICAgIH0gZWxzZSBpZiAoZmVlZC4kcmVzb3VyY2VzKSB7XHJcbiAgICAgIGlmICh0b2RheU5vZGUgJiYgIWVudHJ5R3JvdXBzW3RoaXMudG9kYXlEYXRlLmZvcm1hdChkYXRlQ29tcGFyZVN0cmluZyldKSB7XHJcbiAgICAgICAgZW50cnlHcm91cHNbdGhpcy50b2RheURhdGUuZm9ybWF0KGRhdGVDb21wYXJlU3RyaW5nKV0gPSBbdG9kYXlOb2RlXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWVkLiRyZXNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50RW50cnkgPSBmZWVkLiRyZXNvdXJjZXNbaV07XHJcbiAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IGNvbnZlcnQudG9EYXRlRnJvbVN0cmluZyhjdXJyZW50RW50cnkuU3RhcnREYXRlKTtcclxuICAgICAgICBpZiAoY3VycmVudEVudHJ5LlRpbWVsZXNzKSB7XHJcbiAgICAgICAgICBzdGFydERhdGUgPSB0aGlzLmRhdGVUb1VUQyhzdGFydERhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJyZW50RW50cnkuU3RhcnREYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgIGN1cnJlbnRFbnRyeS5pc0V2ZW50ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lbnRyaWVzW2N1cnJlbnRFbnRyeS4ka2V5XSA9IGN1cnJlbnRFbnRyeTtcclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudERhdGVDb21wYXJlS2V5ID0gbW9tZW50KGN1cnJlbnRFbnRyeS5TdGFydERhdGUpLmZvcm1hdChkYXRlQ29tcGFyZVN0cmluZyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRHcm91cCA9IGVudHJ5R3JvdXBzW2N1cnJlbnREYXRlQ29tcGFyZUtleV07XHJcbiAgICAgICAgaWYgKGN1cnJlbnRHcm91cCkge1xyXG4gICAgICAgICAgaWYgKGN1cnJlbnRFbnRyeS5UaW1lbGVzcykge1xyXG4gICAgICAgICAgICBjdXJyZW50R3JvdXAuc3BsaWNlKDEsIDAsIHRoaXMucm93VGVtcGxhdGUuYXBwbHkoY3VycmVudEVudHJ5LCB0aGlzKSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXJyZW50R3JvdXAucHVzaCh0aGlzLnJvd1RlbXBsYXRlLmFwcGx5KGN1cnJlbnRFbnRyeSwgdGhpcykpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnJlbnRHcm91cCA9IFt0aGlzLmdyb3VwVGVtcGxhdGUuYXBwbHkoY3VycmVudEVudHJ5LCB0aGlzKV07XHJcbiAgICAgICAgY3VycmVudEdyb3VwLnB1c2godGhpcy5yb3dUZW1wbGF0ZS5hcHBseShjdXJyZW50RW50cnksIHRoaXMpKTtcclxuICAgICAgICBlbnRyeUdyb3Vwc1tjdXJyZW50RGF0ZUNvbXBhcmVLZXldID0gY3VycmVudEdyb3VwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGVudHJ5R3JvdXAgaW4gZW50cnlHcm91cHMpIHtcclxuICAgICAgICBpZiAoZW50cnlHcm91cHMuaGFzT3duUHJvcGVydHkoZW50cnlHcm91cCkpIHtcclxuICAgICAgICAgIGVudHJ5T3JkZXIucHVzaChtb21lbnQoZW50cnlHcm91cCwgZGF0ZUNvbXBhcmVTdHJpbmcpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGVudHJ5T3JkZXIuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGlmIChhLnZhbHVlT2YoKSA8IGIudmFsdWVPZigpKSB7XHJcbiAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGEudmFsdWVPZigpID4gYi52YWx1ZU9mKCkpIHtcclxuICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGVudHJ5T3JkZXJMZW5ndGggPSBlbnRyeU9yZGVyLmxlbmd0aDtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRyeU9yZGVyTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBvLnB1c2goZW50cnlHcm91cHNbZW50cnlPcmRlcltpXS5mb3JtYXQoZGF0ZUNvbXBhcmVTdHJpbmcpXS5qb2luKCcnKSArIHRoaXMuZ3JvdXBFbmRUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLnNldCgnbGlzdENvbnRlbnQnLCBvLmpvaW4oJycpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0KCdyZW1haW5pbmdDb250ZW50JywgJycpOyAvLyBGZWVkIGRvZXMgbm90IHJldHVybiByZWxpYWJsZSBkYXRhLCBkb24ndCBzaG93IHJlbWFpbmluZ1xyXG5cclxuICAgICQodGhpcy5kb21Ob2RlKS50b2dnbGVDbGFzcygnbGlzdC1oYXMtbW9yZScsIHRoaXMuaGFzTW9yZURhdGEoKSk7XHJcbiAgICB0aGlzLl9sb2FkUHJldmlvdXNTZWxlY3Rpb25zKCk7XHJcbiAgfSxcclxuICBhZGRUb2RheURvbTogZnVuY3Rpb24gYWRkVG9kYXlEb20oKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbkN1cnJlbnRXZWVrKHRoaXMudG9kYXlEYXRlKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0b2RheUVudHJ5ID0ge1xyXG4gICAgICBTdGFydERhdGU6IHRoaXMudG9kYXlEYXRlLnRvRGF0ZSgpLFxyXG4gICAgICBoZWFkZXJDbGFzczogJ2N1cnJlbnREYXRlJyxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXBUZW1wbGF0ZS5hcHBseSh0b2RheUVudHJ5LCB0aGlzKTtcclxuICB9LFxyXG4gIGRhdGVUb1VUQzogZnVuY3Rpb24gZGF0ZVRvVVRDKGRhdGUpIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldFVUQ0Z1bGxZZWFyKCksXHJcbiAgICAgIGRhdGUuZ2V0VVRDTW9udGgoKSxcclxuICAgICAgZGF0ZS5nZXRVVENEYXRlKCksXHJcbiAgICAgIGRhdGUuZ2V0VVRDSG91cnMoKSxcclxuICAgICAgZGF0ZS5nZXRVVENNaW51dGVzKCksXHJcbiAgICAgIGRhdGUuZ2V0VVRDU2Vjb25kcygpXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgcmVxdWVzdEV2ZW50RGF0YTogZnVuY3Rpb24gcmVxdWVzdEV2ZW50RGF0YSgpIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmNyZWF0ZUV2ZW50UmVxdWVzdCgpO1xyXG4gICAgcmVxdWVzdC5yZWFkKHtcclxuICAgICAgc3VjY2VzczogdGhpcy5vblJlcXVlc3RFdmVudERhdGFTdWNjZXNzLFxyXG4gICAgICBmYWlsdXJlOiB0aGlzLm9uUmVxdWVzdEV2ZW50RGF0YUZhaWx1cmUsXHJcbiAgICAgIGFib3J0ZWQ6IHRoaXMub25SZXF1ZXN0RXZlbnREYXRhQWJvcnRlZCxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9uUmVxdWVzdEV2ZW50RGF0YUZhaWx1cmU6IGZ1bmN0aW9uIG9uUmVxdWVzdEV2ZW50RGF0YUZhaWx1cmUocmVzcG9uc2UsIG8pIHtcclxuICAgIGFsZXJ0KHN0cmluZy5zdWJzdGl0dXRlKHRoaXMucmVxdWVzdEVycm9yVGV4dCwgW3Jlc3BvbnNlLCBvXSkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICBFcnJvck1hbmFnZXIuYWRkRXJyb3IocmVzcG9uc2UsIG8sIHRoaXMub3B0aW9ucywgJ2ZhaWx1cmUnKTtcclxuICB9LFxyXG4gIG9uUmVxdWVzdEV2ZW50RGF0YUFib3J0ZWQ6IGZ1bmN0aW9uIG9uUmVxdWVzdEV2ZW50RGF0YUFib3J0ZWQoKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBmYWxzZTsgLy8gZm9yY2UgYSByZWZyZXNoXHJcbiAgfSxcclxuICBvblJlcXVlc3RFdmVudERhdGFTdWNjZXNzOiBmdW5jdGlvbiBvblJlcXVlc3RFdmVudERhdGFTdWNjZXNzKGZlZWQpIHtcclxuICAgIHRoaXMucHJvY2Vzc0V2ZW50RmVlZChmZWVkKTtcclxuICB9LFxyXG4gIGNyZWF0ZUV2ZW50UmVxdWVzdDogZnVuY3Rpb24gY3JlYXRlRXZlbnRSZXF1ZXN0KCkge1xyXG4gICAgY29uc3QgcXVlcnlTZWxlY3QgPSB0aGlzLmV2ZW50UXVlcnlTZWxlY3Q7XHJcbiAgICBjb25zdCBxdWVyeVdoZXJlID0gdGhpcy5nZXRFdmVudFF1ZXJ5KCk7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgLnNldENvdW50KHRoaXMuZXZlbnRQYWdlU2l6ZSlcclxuICAgICAgLnNldFN0YXJ0SW5kZXgoMSlcclxuICAgICAgLnNldFJlc291cmNlS2luZCgnZXZlbnRzJylcclxuICAgICAgLnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuU2VsZWN0LCB0aGlzLmV4cGFuZEV4cHJlc3Npb24ocXVlcnlTZWxlY3QpLmpvaW4oJywnKSlcclxuICAgICAgLnNldFF1ZXJ5QXJnKFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhVXJpLlF1ZXJ5QXJnTmFtZXMuV2hlcmUsIHF1ZXJ5V2hlcmUpO1xyXG4gICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgfSxcclxuICBnZXRFdmVudFF1ZXJ5OiBmdW5jdGlvbiBnZXRFdmVudFF1ZXJ5KCkge1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdGhpcy53ZWVrU3RhcnREYXRlO1xyXG4gICAgY29uc3QgZW5kRGF0ZSA9IHRoaXMud2Vla0VuZERhdGU7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUoXHJcbiAgICAgIFtcclxuICAgICAgICAnVXNlcklkIGVxIFwiJHswfVwiIGFuZCAoJyxcclxuICAgICAgICAnKFN0YXJ0RGF0ZSBndCBAJHsxfUAgb3IgRW5kRGF0ZSBndCBAJHsxfUApIGFuZCAnLFxyXG4gICAgICAgICdTdGFydERhdGUgbHQgQCR7Mn1AJyxcclxuICAgICAgICAnKScsXHJcbiAgICAgIF0uam9pbignJyksIFtBcHAuY29udGV4dC51c2VyICYmIEFwcC5jb250ZXh0LnVzZXIuJGtleSxcclxuICAgICAgICBzdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREVDAwOjAwOjAwW1pdJyksXHJcbiAgICAgICAgZW5kRGF0ZS5mb3JtYXQoJ1lZWVktTU0tRERUMjM6NTk6NTlbWl0nKSxcclxuICAgICAgXVxyXG4gICAgKTtcclxuICB9LFxyXG4gIGhpZGVFdmVudExpc3Q6IGZ1bmN0aW9uIGhpZGVFdmVudExpc3QoKSB7XHJcbiAgICAkKHRoaXMuZXZlbnRDb250YWluZXJOb2RlKS5hZGRDbGFzcygnZXZlbnQtaGlkZGVuJyk7XHJcbiAgfSxcclxuICBzaG93RXZlbnRMaXN0OiBmdW5jdGlvbiBzaG93RXZlbnRMaXN0KCkge1xyXG4gICAgJCh0aGlzLmV2ZW50Q29udGFpbmVyTm9kZSkucmVtb3ZlQ2xhc3MoJ2V2ZW50LWhpZGRlbicpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0V2ZW50RmVlZDogZnVuY3Rpb24gcHJvY2Vzc0V2ZW50RmVlZChmZWVkKSB7XHJcbiAgICBjb25zdCBvID0gW107XHJcbiAgICBjb25zdCBmZWVkTGVuZ3RoID0gZmVlZC4kcmVzb3VyY2VzLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoZmVlZExlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmhpZGVFdmVudExpc3QoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2hvd0V2ZW50TGlzdCgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmVlZExlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGV2ZW50ID0gZmVlZC4kcmVzb3VyY2VzW2ldO1xyXG4gICAgICBldmVudC5pc0V2ZW50ID0gdHJ1ZTtcclxuICAgICAgZXZlbnQuU3RhcnREYXRlID0gbW9tZW50KGNvbnZlcnQudG9EYXRlRnJvbVN0cmluZyhldmVudC5TdGFydERhdGUpKTtcclxuICAgICAgZXZlbnQuRW5kRGF0ZSA9IG1vbWVudChjb252ZXJ0LnRvRGF0ZUZyb21TdHJpbmcoZXZlbnQuRW5kRGF0ZSkpO1xyXG4gICAgICB0aGlzLmVudHJpZXNbZXZlbnQuJGtleV0gPSBldmVudDtcclxuICAgICAgby5wdXNoKHRoaXMuZXZlbnRSb3dUZW1wbGF0ZS5hcHBseShldmVudCwgdGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChmZWVkLiR0b3RhbFJlc3VsdHMgPiBmZWVkTGVuZ3RoKSB7XHJcbiAgICAgICQodGhpcy5ldmVudENvbnRhaW5lck5vZGUpLmFkZENsYXNzKCdsaXN0LWhhcy1tb3JlJyk7XHJcbiAgICAgIHRoaXMuc2V0KCdldmVudFJlbWFpbmluZ0NvbnRlbnQnLCBzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmV2ZW50TW9yZVRleHQsIFtmZWVkLiR0b3RhbFJlc3VsdHMgLSBmZWVkTGVuZ3RoXSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCh0aGlzLmV2ZW50Q29udGFpbmVyTm9kZSkucmVtb3ZlQ2xhc3MoJ2xpc3QtaGFzLW1vcmUnKTtcclxuICAgICAgJCh0aGlzLmV2ZW50UmVtYWluaW5nQ29udGVudE5vZGUpLmVtcHR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXQoJ2V2ZW50TGlzdENvbnRlbnQnLCBvLmpvaW4oJycpKTtcclxuICB9LFxyXG4gIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLmN1cnJlbnREYXRlLmNsb25lKCk7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlID0gc3RhcnREYXRlLmNsb25lKCk7XHJcbiAgICB0aGlzLndlZWtTdGFydERhdGUgPSB0aGlzLmdldFN0YXJ0RGF5KHN0YXJ0RGF0ZSk7XHJcbiAgICB0aGlzLndlZWtFbmREYXRlID0gdGhpcy5nZXRFbmREYXkoc3RhcnREYXRlKTtcclxuICAgIHRoaXMuc2V0V2Vla1RpdGxlKCk7XHJcbiAgICB0aGlzLnNldFdlZWtRdWVyeSgpO1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVxdWVzdERhdGEoKTtcclxuICAgIHRoaXMucmVxdWVzdEV2ZW50RGF0YSgpO1xyXG4gIH0sXHJcbiAgc2hvdzogZnVuY3Rpb24gc2hvdyhvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICB0aGlzLnByb2Nlc3NTaG93T3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc1Nob3dPcHRpb25zOiBmdW5jdGlvbiBwcm9jZXNzU2hvd09wdGlvbnMob3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMuY3VycmVudERhdGUpIHtcclxuICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IG1vbWVudChvcHRpb25zLmN1cnJlbnREYXRlKS5zdGFydE9mKCdkYXknKSB8fCBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYWN0aXZhdGVFdmVudE1vcmU6IGZ1bmN0aW9uIGFjdGl2YXRlRXZlbnRNb3JlKCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdldmVudF9yZWxhdGVkJyk7XHJcbiAgICBjb25zdCB3aGVyZSA9IHRoaXMuZ2V0RXZlbnRRdWVyeSgpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICB3aGVyZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5lbnRyeUdyb3VwcyA9IHt9O1xyXG4gICAgdGhpcy5zZXQoJ2V2ZW50Q29udGVudCcsICcnKTtcclxuICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsIHRoaXMubG9hZGluZ1RlbXBsYXRlLmFwcGx5KHRoaXMpKTtcclxuICB9LFxyXG4gIHNlbGVjdEVudHJ5OiBmdW5jdGlvbiBzZWxlY3RFbnRyeShwYXJhbXMpIHtcclxuICAgIGNvbnN0IHJvdyA9ICQocGFyYW1zLiRzb3VyY2UpLmNsb3Nlc3QoJ1tkYXRhLWtleV0nKVswXTtcclxuICAgIGNvbnN0IGtleSA9IHJvdyA/IHJvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JykgOiBmYWxzZTtcclxuXHJcbiAgICB0aGlzLm5hdmlnYXRlVG9EZXRhaWxWaWV3KGtleSk7XHJcbiAgfSxcclxuICBzZWxlY3REYXRlOiBmdW5jdGlvbiBzZWxlY3REYXRlKCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgZGF0ZTogdGhpcy5jdXJyZW50RGF0ZS50b0RhdGUoKSxcclxuICAgICAgc2hvd1RpbWVQaWNrZXI6IGZhbHNlLFxyXG4gICAgICB0aW1lbGVzczogZmFsc2UsXHJcbiAgICAgIHRvb2xzOiB7XHJcbiAgICAgICAgdGJhcjogW3tcclxuICAgICAgICAgIGlkOiAnY29tcGxldGUnLFxyXG4gICAgICAgICAgY2xzOiAnZmEgZmEtY2hlY2sgZmEtZncgZmEtbGcnLFxyXG4gICAgICAgICAgZm46IHRoaXMuc2VsZWN0RGF0ZVN1Y2Nlc3MsXHJcbiAgICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogJ2NhbmNlbCcsXHJcbiAgICAgICAgICBjbHM6ICdmYSBmYS1iYW4gZmEtZncgZmEtbGcnLFxyXG4gICAgICAgICAgc2lkZTogJ2xlZnQnLFxyXG4gICAgICAgICAgZm46IFJlVUkuYmFjayxcclxuICAgICAgICAgIHNjb3BlOiBSZVVJLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmRhdGVQaWNrZXJWaWV3KTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNlbGVjdERhdGVTdWNjZXNzOiBmdW5jdGlvbiBzZWxlY3REYXRlU3VjY2VzcygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0UHJpbWFyeUFjdGl2ZVZpZXcoKTtcclxuICAgIHRoaXMuY3VycmVudERhdGUgPSBtb21lbnQodmlldy5nZXREYXRlVGltZSgpKS5zdGFydE9mKCdkYXknKTtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgUmVVSS5iYWNrKCk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvRGF5VmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0RheVZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5hY3Rpdml0eUxpc3RWaWV3KTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGN1cnJlbnREYXRlOiB0aGlzLmN1cnJlbnREYXRlLnRvRGF0ZSgpLnZhbHVlT2YoKSB8fCBtb21lbnQoKS5zdGFydE9mKCdkYXknKS52YWx1ZU9mKCksXHJcbiAgICB9O1xyXG4gICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb01vbnRoVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb01vbnRoVmlldygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLm1vbnRoVmlldyk7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBjdXJyZW50RGF0ZTogdGhpcy5jdXJyZW50RGF0ZS50b0RhdGUoKS52YWx1ZU9mKCkgfHwgbW9tZW50KCkuc3RhcnRPZignZGF5JykudmFsdWVPZigpLFxyXG4gICAgfTtcclxuICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9JbnNlcnRWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvSW5zZXJ0VmlldygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmluc2VydFZpZXcgfHwgdGhpcy5lZGl0Vmlldyk7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zLmN1cnJlbnREYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSB8fCBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgbmVnYXRlSGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICByZXR1cm5UbzogdGhpcy5pZCxcclxuICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgICAgY3VycmVudERhdGU6IHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZS52YWx1ZU9mKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0RldGFpbFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9EZXRhaWxWaWV3KGtleSwgZGVzY3JpcHRvcikge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNba2V5XTtcclxuICAgIGNvbnN0IGRldGFpbFZpZXcgPSAoZW50cnkuaXNFdmVudCkgPyB0aGlzLmV2ZW50RGV0YWlsVmlldyA6IHRoaXMuYWN0aXZpdHlEZXRhaWxWaWV3O1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGRldGFpbFZpZXcpO1xyXG5cclxuICAgIGNvbnN0IHRoZURlc2NyaXB0b3IgPSAoZW50cnkuaXNFdmVudCkgPyBkZXNjcmlwdG9yIDogZW50cnkuRGVzY3JpcHRpb247XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICB0aXRsZTogdGhlRGVzY3JpcHRvcixcclxuICAgICAgICBrZXksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19