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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DYWxlbmRhci9XZWVrVmlldy5qcyJdLCJuYW1lcyI6WyJhY3Rpdml0eVR5cGVJY29ucyIsInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJ3ZWVrVGl0bGVGb3JtYXRUZXh0IiwiZGF5SGVhZGVyTGVmdEZvcm1hdFRleHQiLCJkYXlIZWFkZXJSaWdodEZvcm1hdFRleHQiLCJldmVudERhdGVGb3JtYXRUZXh0Iiwic3RhcnRUaW1lRm9ybWF0VGV4dCIsInN0YXJ0VGltZUZvcm1hdFRleHQyNCIsInRvZGF5VGV4dCIsImRheVRleHQiLCJ3ZWVrVGV4dCIsIm1vbnRoVGV4dCIsImFsbERheVRleHQiLCJldmVudEhlYWRlclRleHQiLCJldmVudE1vcmVUZXh0IiwidG9nZ2xlQ29sbGFwc2VUZXh0IiwidG9nZ2xlQ29sbGFwc2VDbGFzcyIsInRvZ2dsZUV4cGFuZENsYXNzIiwiZW5hYmxlUHVsbFRvUmVmcmVzaCIsIndpZGdldFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJuYXZpZ2F0aW9uVGVtcGxhdGUiLCJncm91cFRlbXBsYXRlIiwiZ3JvdXBFbmRUZW1wbGF0ZSIsInJvd1RlbXBsYXRlIiwiZXZlbnRSb3dUZW1wbGF0ZSIsInRpbWVUZW1wbGF0ZSIsIml0ZW1UZW1wbGF0ZSIsImV2ZW50SXRlbVRlbXBsYXRlIiwibmFtZVRlbXBsYXRlIiwiZXZlbnROYW1lVGVtcGxhdGUiLCJldmVudE1vcmVUZW1wbGF0ZSIsIm5vRGF0YVRlbXBsYXRlIiwiZXZlbnRSZW1haW5pbmdDb250ZW50Tm9kZSIsImV2ZW50Q29udGVudE5vZGUiLCJhdHRyaWJ1dGVNYXAiLCJsaXN0Q29udGVudCIsIm5vZGUiLCJ0eXBlIiwiZGF0ZUNvbnRlbnQiLCJldmVudExpc3RDb250ZW50IiwiZXZlbnRSZW1haW5pbmdDb250ZW50IiwicmVtYWluaW5nQ29udGVudCIsImlkIiwiY2xzIiwiYWN0aXZpdHlEZXRhaWxWaWV3IiwiZXZlbnREZXRhaWxWaWV3IiwibW9udGhWaWV3IiwiZGF0ZVBpY2tlclZpZXciLCJhY3Rpdml0eUxpc3RWaWV3IiwiaW5zZXJ0VmlldyIsImN1cnJlbnREYXRlIiwiZW5hYmxlU2VhcmNoIiwiZXhwb3NlIiwiZW50cnlHcm91cHMiLCJ3ZWVrU3RhcnREYXRlIiwid2Vla0VuZERhdGUiLCJ0b2RheURhdGUiLCJjb250aW51b3VzU2Nyb2xsaW5nIiwicXVlcnlXaGVyZSIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwiZXZlbnRRdWVyeVNlbGVjdCIsImFjdGl2aXR5VHlwZUljb24iLCJkZWZhdWx0IiwiY29udHJhY3ROYW1lIiwicGFnZVNpemUiLCJldmVudFBhZ2VTaXplIiwicmVzb3VyY2VLaW5kIiwiX29uUmVmcmVzaCIsIm8iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJyZWZyZXNoUmVxdWlyZWQiLCJpbml0IiwibW9tZW50Iiwic3RhcnRPZiIsImNsb25lIiwidG9nZ2xlR3JvdXAiLCJwYXJhbXMiLCIkc291cmNlIiwicGFyZW50Tm9kZSIsIiQiLCJ0b2dnbGVDbGFzcyIsImJ1dHRvbiIsImNvbGxhcHNlQnV0dG9uIiwiYWN0aXZhdGVEYXlIZWFkZXIiLCJkYXRlIiwibmF2aWdhdGVUb0RheVZpZXciLCJnZXRUaGlzV2Vla0FjdGl2aXRpZXMiLCJpc0luQ3VycmVudFdlZWsiLCJyZWZyZXNoIiwiZ2V0U3RhcnREYXkiLCJnZXRFbmREYXkiLCJlbmRPZiIsImdldE5leHRXZWVrQWN0aXZpdGllcyIsImFkZCIsImRheXMiLCJnZXRQcmV2V2Vla0FjdGl2aXRpZXMiLCJzdWJ0cmFjdCIsInNldFdlZWtRdWVyeSIsInNldERhdGUiLCJzdWJzdGl0dXRlIiwiam9pbiIsIkFwcCIsImNvbnRleHQiLCJ1c2VyIiwiJGtleSIsInRvSXNvU3RyaW5nRnJvbURhdGUiLCJ0b0RhdGUiLCJmb3JtYXQiLCJzZXRXZWVrVGl0bGUiLCJzdGFydCIsImVuZCIsInNldCIsInZhbHVlT2YiLCJwcm9jZXNzRmVlZCIsImZlZWQiLCJ0b2RheU5vZGUiLCJhZGRUb2RheURvbSIsImZlZWRMZW5ndGgiLCIkcmVzb3VyY2VzIiwibGVuZ3RoIiwiZW50cnlPcmRlciIsImRhdGVDb21wYXJlU3RyaW5nIiwiT2JqZWN0Iiwia2V5cyIsImVudHJpZXMiLCJjb250ZW50Tm9kZSIsImFwcGVuZCIsImFwcGx5IiwiaSIsImN1cnJlbnRFbnRyeSIsInN0YXJ0RGF0ZSIsInRvRGF0ZUZyb21TdHJpbmciLCJTdGFydERhdGUiLCJUaW1lbGVzcyIsImRhdGVUb1VUQyIsImlzRXZlbnQiLCJjdXJyZW50RGF0ZUNvbXBhcmVLZXkiLCJjdXJyZW50R3JvdXAiLCJzcGxpY2UiLCJwdXNoIiwiZW50cnlHcm91cCIsImhhc093blByb3BlcnR5Iiwic29ydCIsImEiLCJiIiwiZW50cnlPcmRlckxlbmd0aCIsImRvbU5vZGUiLCJoYXNNb3JlRGF0YSIsIl9sb2FkUHJldmlvdXNTZWxlY3Rpb25zIiwidG9kYXlFbnRyeSIsImhlYWRlckNsYXNzIiwiRGF0ZSIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsInJlcXVlc3RFdmVudERhdGEiLCJyZXF1ZXN0IiwiY3JlYXRlRXZlbnRSZXF1ZXN0IiwicmVhZCIsInN1Y2Nlc3MiLCJvblJlcXVlc3RFdmVudERhdGFTdWNjZXNzIiwiZmFpbHVyZSIsIm9uUmVxdWVzdEV2ZW50RGF0YUZhaWx1cmUiLCJhYm9ydGVkIiwib25SZXF1ZXN0RXZlbnREYXRhQWJvcnRlZCIsInNjb3BlIiwicmVzcG9uc2UiLCJhbGVydCIsInJlcXVlc3RFcnJvclRleHQiLCJhZGRFcnJvciIsIm9wdGlvbnMiLCJwcm9jZXNzRXZlbnRGZWVkIiwiZ2V0RXZlbnRRdWVyeSIsIlNhZ2UiLCJTRGF0YSIsIkNsaWVudCIsIlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdCIsImdldFNlcnZpY2UiLCJzZXRDb3VudCIsInNldFN0YXJ0SW5kZXgiLCJzZXRSZXNvdXJjZUtpbmQiLCJzZXRRdWVyeUFyZyIsIlNEYXRhVXJpIiwiUXVlcnlBcmdOYW1lcyIsIlNlbGVjdCIsImV4cGFuZEV4cHJlc3Npb24iLCJXaGVyZSIsImVuZERhdGUiLCJoaWRlRXZlbnRMaXN0IiwiZXZlbnRDb250YWluZXJOb2RlIiwiYWRkQ2xhc3MiLCJzaG93RXZlbnRMaXN0IiwicmVtb3ZlQ2xhc3MiLCJldmVudCIsIkVuZERhdGUiLCIkdG90YWxSZXN1bHRzIiwiZW1wdHkiLCJjbGVhciIsInJlcXVlc3REYXRhIiwic2hvdyIsInByb2Nlc3NTaG93T3B0aW9ucyIsImFjdGl2YXRlRXZlbnRNb3JlIiwidmlldyIsImdldFZpZXciLCJ3aGVyZSIsImxvYWRpbmdUZW1wbGF0ZSIsInNlbGVjdEVudHJ5Iiwicm93IiwiY2xvc2VzdCIsImtleSIsImdldEF0dHJpYnV0ZSIsIm5hdmlnYXRlVG9EZXRhaWxWaWV3Iiwic2VsZWN0RGF0ZSIsInNob3dUaW1lUGlja2VyIiwidGltZWxlc3MiLCJ0b29scyIsInRiYXIiLCJmbiIsInNlbGVjdERhdGVTdWNjZXNzIiwic2lkZSIsIlJlVUkiLCJiYWNrIiwiZ2V0UHJpbWFyeUFjdGl2ZVZpZXciLCJnZXREYXRlVGltZSIsIm5hdmlnYXRlVG9Nb250aFZpZXciLCJuYXZpZ2F0ZVRvSW5zZXJ0VmlldyIsImVkaXRWaWV3IiwibmVnYXRlSGlzdG9yeSIsInJldHVyblRvIiwiaW5zZXJ0IiwiZGVzY3JpcHRvciIsImVudHJ5IiwiZGV0YWlsVmlldyIsInRoZURlc2NyaXB0b3IiLCJEZXNjcmlwdGlvbiIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bc0JZQSxpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXRCWjs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQU1DLFdBQVcsb0JBQVksa0JBQVosQ0FBakI7QUFDQSxNQUFNQyxtQkFBbUIsb0JBQVksZ0NBQVosQ0FBekI7O0FB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QUFVO0FBQ1JBLGFBQUtILElBQUwsQ0FBVTtBQUNSNEIseUJBQWUsSUFEUDtBQUVSQyxvQkFBVSxLQUFLL0wsRUFGUDtBQUdSZ00sa0JBQVEsSUFIQTtBQUlSeEwsdUJBQWEsS0FBSzZILE9BQUwsQ0FBYTdILFdBQWIsQ0FBeUJnRSxPQUF6QjtBQUpMLFNBQVY7QUFNRDtBQUNGLEtBMWlCbUY7QUEyaUJwRnNHLDBCQUFzQixTQUFTQSxvQkFBVCxDQUE4QkYsR0FBOUIsRUFBbUNxQixVQUFuQyxFQUErQztBQUNuRSxVQUFNQyxRQUFRLEtBQUs5RyxPQUFMLENBQWF3RixHQUFiLENBQWQ7QUFDQSxVQUFNdUIsYUFBY0QsTUFBTW5HLE9BQVAsR0FBa0IsS0FBSzVGLGVBQXZCLEdBQXlDLEtBQUtELGtCQUFqRTtBQUNBLFVBQU1tSyxPQUFPeEcsSUFBSXlHLE9BQUosQ0FBWTZCLFVBQVosQ0FBYjs7QUFFQSxVQUFNQyxnQkFBaUJGLE1BQU1uRyxPQUFQLEdBQWtCa0csVUFBbEIsR0FBK0JDLE1BQU1HLFdBQTNEOztBQUVBLFVBQUloQyxJQUFKLEVBQVU7QUFDUkEsYUFBS0gsSUFBTCxDQUFVO0FBQ1JvQyxpQkFBT0YsYUFEQztBQUVSeEI7QUFGUSxTQUFWO0FBSUQ7QUFDRjtBQXhqQm1GLEdBQXRFLENBQWhCOztvQkEyakJldk4sTyIsImZpbGUiOiJXZWVrVmlldy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcbmltcG9ydCBjb252ZXJ0IGZyb20gJ2FyZ29zL0NvbnZlcnQnO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IF9MZWdhY3lTRGF0YUxpc3RNaXhpbiBmcm9tICdhcmdvcy9fTGVnYWN5U0RhdGFMaXN0TWl4aW4nO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcbmltcG9ydCAqIGFzIGFjdGl2aXR5VHlwZUljb25zIGZyb20gJy4uLy4uL01vZGVscy9BY3Rpdml0eS9BY3Rpdml0eVR5cGVJY29uJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2NhbGVuZGFyV2Vla1ZpZXcnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdjYWxlbmRhcldlZWtWaWV3RGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkNhbGVuZGFyLldlZWtWaWV3XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICogQG1peGlucyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgYXJnb3MuX0xlZ2FjeVNEYXRhTGlzdE1peGluXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5MaXN0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5fTGVnYWN5U0RhdGFMaXN0TWl4aW5cclxuICogQHJlcXVpcmVzIGFyZ29zLkNvbnZlcnRcclxuICogQHJlcXVpcmVzIGFyZ29zLkVycm9yTWFuYWdlclxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgbW9tZW50XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkNhbGVuZGFyLldlZWtWaWV3JywgW0xpc3QsIF9MZWdhY3lTRGF0YUxpc3RNaXhpbl0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICB3ZWVrVGl0bGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLndlZWtUaXRsZUZvcm1hdFRleHQsXHJcbiAgZGF5SGVhZGVyTGVmdEZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZGF5SGVhZGVyTGVmdEZvcm1hdFRleHQsXHJcbiAgZGF5SGVhZGVyUmlnaHRGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmRheUhlYWRlclJpZ2h0Rm9ybWF0VGV4dCxcclxuICBldmVudERhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmV2ZW50RGF0ZUZvcm1hdFRleHQsXHJcbiAgc3RhcnRUaW1lRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydFRpbWVGb3JtYXRUZXh0LFxyXG4gIHN0YXJ0VGltZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydFRpbWVGb3JtYXRUZXh0MjQsXHJcbiAgdG9kYXlUZXh0OiByZXNvdXJjZS50b2RheVRleHQsXHJcbiAgZGF5VGV4dDogcmVzb3VyY2UuZGF5VGV4dCxcclxuICB3ZWVrVGV4dDogcmVzb3VyY2Uud2Vla1RleHQsXHJcbiAgbW9udGhUZXh0OiByZXNvdXJjZS5tb250aFRleHQsXHJcbiAgYWxsRGF5VGV4dDogcmVzb3VyY2UuYWxsRGF5VGV4dCxcclxuICBldmVudEhlYWRlclRleHQ6IHJlc291cmNlLmV2ZW50SGVhZGVyVGV4dCxcclxuICBldmVudE1vcmVUZXh0OiByZXNvdXJjZS5ldmVudE1vcmVUZXh0LFxyXG4gIHRvZ2dsZUNvbGxhcHNlVGV4dDogcmVzb3VyY2UudG9nZ2xlQ29sbGFwc2VUZXh0LFxyXG5cclxuICB0b2dnbGVDb2xsYXBzZUNsYXNzOiAnZmEgZmEtY2hldnJvbi1kb3duJyxcclxuICB0b2dnbGVFeHBhbmRDbGFzczogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnLFxyXG4gIGVuYWJsZVB1bGxUb1JlZnJlc2g6IGZhbHNlLFxyXG5cclxuICAvLyBUZW1wbGF0ZXNcclxuICB3aWRnZXRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGlkPVwieyU9ICQuaWQgJX1cIiBkYXRhLXRpdGxlPVwieyU9ICQudGl0bGVUZXh0ICV9XCIgY2xhc3M9XCJvdmVydGhyb3cgeyU9ICQuY2xzICV9XCIgeyUgaWYgKCQucmVzb3VyY2VLaW5kKSB7ICV9ZGF0YS1yZXNvdXJjZS1raW5kPVwieyU9ICQucmVzb3VyY2VLaW5kICV9XCJ7JSB9ICV9PicsXHJcbiAgICAnPGRpdiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwic2VhcmNoTm9kZVwiPjwvZGl2PicsXHJcbiAgICAneyUhICQubmF2aWdhdGlvblRlbXBsYXRlICV9JyxcclxuICAgICc8ZGl2IHN0eWxlPVwiY2xlYXI6Ym90aFwiPjwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImV2ZW50LWNvbnRlbnQgZXZlbnQtaGlkZGVuXCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImV2ZW50Q29udGFpbmVyTm9kZVwiPicsXHJcbiAgICAnPGgyIGRhdGEtYWN0aW9uPVwidG9nZ2xlR3JvdXBcIj48YnV0dG9uIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJjb2xsYXBzZUJ1dHRvblwiIGNsYXNzPVwieyU9ICQkLnRvZ2dsZUNvbGxhcHNlQ2xhc3MgJX1cIiBhcmlhLWxhYmVsPVwieyU6ICQkLnRvZ2dsZUNvbGxhcHNlVGV4dCAlfVwiPjwvYnV0dG9uPnslPSAkLmV2ZW50SGVhZGVyVGV4dCAlfTwvaDI+JyxcclxuICAgICc8dWwgY2xhc3M9XCJsaXN0LWNvbnRlbnRcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZXZlbnRDb250ZW50Tm9kZVwiPjwvdWw+JyxcclxuICAgICd7JSEgJC5ldmVudE1vcmVUZW1wbGF0ZSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibGlzdC1jb250ZW50XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImNvbnRlbnROb2RlXCI+PC9kaXY+JyxcclxuICAgICd7JSEgJC5tb3JlVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgbmF2aWdhdGlvblRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJzcGxpdC1idXR0b25zXCI+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtdG9vbD1cInRvZGF5XCIgZGF0YS1hY3Rpb249XCJnZXRUaGlzV2Vla0FjdGl2aXRpZXNcIiBjbGFzcz1cImJ1dHRvblwiPnslOiAkLnRvZGF5VGV4dCAlfTwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJzZWxlY3RkYXRlXCIgZGF0YS1hY3Rpb249XCJzZWxlY3REYXRlXCIgY2xhc3M9XCJidXR0b24gZmEgZmEtY2FsZW5kYXJcIj48c3Bhbj48L3NwYW4+PC9idXR0b24+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtdG9vbD1cImRheVwiIGRhdGEtYWN0aW9uPVwibmF2aWdhdGVUb0RheVZpZXdcIiBjbGFzcz1cImJ1dHRvblwiPnslOiAkLmRheVRleHQgJX08L2J1dHRvbj4nLFxyXG4gICAgJzxidXR0b24gZGF0YS10b29sPVwid2Vla1wiIGNsYXNzPVwiYnV0dG9uIGN1cnJlbnRcIj57JTogJC53ZWVrVGV4dCAlfTwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJtb250aFwiIGRhdGEtYWN0aW9uPVwibmF2aWdhdGVUb01vbnRoVmlld1wiIGNsYXNzPVwiYnV0dG9uXCI+eyU6ICQubW9udGhUZXh0ICV9PC9idXR0b24+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJuYXYtYmFyXCI+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtdG9vbD1cIm5leHRcIiBkYXRhLWFjdGlvbj1cImdldE5leHRXZWVrQWN0aXZpdGllc1wiIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1uZXh0IGZhIGZhLWFycm93LXJpZ2h0IGZhLWxnXCI+PHNwYW4+PC9zcGFuPjwvYnV0dG9uPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLXRvb2w9XCJwcmV2XCIgZGF0YS1hY3Rpb249XCJnZXRQcmV2V2Vla0FjdGl2aXRpZXNcIiBjbGFzcz1cImJ1dHRvbiBidXR0b24tcHJldiBmYSBmYS1hcnJvdy1sZWZ0IGZhLWxnXCI+PHNwYW4+PC9zcGFuPjwvYnV0dG9uPicsXHJcbiAgICAnPGg0IGNsYXNzPVwiZGF0ZS10ZXh0XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImRhdGVOb2RlXCI+PC9oND4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgZ3JvdXBUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8aDIgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZURheUhlYWRlclwiIGNsYXNzPVwiZGF5SGVhZGVyIHslPSAkLmhlYWRlckNsYXNzICV9XCIgZGF0YS1kYXRlPVwieyU6IG1vbWVudCgkLlN0YXJ0RGF0ZSkuZm9ybWF0KFxcJ1lZWVktTU0tRERcXCcpICV9XCI+JyxcclxuICAgICc8c3BhbiBjbGFzcz1cImRheUhlYWRlckxlZnRcIj57JTogbW9tZW50KCQuU3RhcnREYXRlKS5mb3JtYXQoJCQuZGF5SGVhZGVyTGVmdEZvcm1hdFRleHQpICV9PC9zcGFuPicsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJkYXlIZWFkZXJSaWdodFwiPnslOiBtb21lbnQoJC5TdGFydERhdGUpLmZvcm1hdCgkJC5kYXlIZWFkZXJSaWdodEZvcm1hdFRleHQpICV9PC9zcGFuPicsXHJcbiAgICAnPGRpdiBzdHlsZT1cImNsZWFyOmJvdGhcIj48L2Rpdj4nLFxyXG4gICAgJzwvaDI+JyxcclxuICAgICc8dWwgY2xhc3M9XCJsaXN0LWNvbnRlbnRcIj4nLFxyXG4gIF0pLFxyXG4gIGdyb3VwRW5kVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPC91bD4nLFxyXG4gIF0pLFxyXG4gIHJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBkYXRhLWFjdGlvbj1cImFjdGl2YXRlRW50cnlcIiBkYXRhLWtleT1cInslPSAkLiRrZXkgJX1cIiBkYXRhLWRlc2NyaXB0b3I9XCJ7JTogJC4kZGVzY3JpcHRvciAlfVwiIGRhdGEtYWN0aXZpdHktdHlwZT1cInslOiAkLlR5cGUgJX1cIj4nLFxyXG4gICAgJzx0YWJsZSBjbGFzcz1cImNhbGVuZGFyLWVudHJ5LXRhYmxlXCI+PHRyPicsXHJcbiAgICAnPHRkIGNsYXNzPVwiZW50cnktdGFibGUtaWNvblwiPicsXHJcbiAgICAnPGJ1dHRvbiBkYXRhLWFjdGlvbj1cInNlbGVjdEVudHJ5XCIgY2xhc3M9XCJsaXN0LWl0ZW0tc2VsZWN0b3IgYnV0dG9uIHslPSAkJC5hY3Rpdml0eVR5cGVJY29uWyQuVHlwZV0gJX1cIj4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPC90ZD4nLFxyXG4gICAgJzx0ZCBjbGFzcz1cImVudHJ5LXRhYmxlLXRpbWVcIj57JSEgJCQudGltZVRlbXBsYXRlICV9PC90ZD4nLFxyXG4gICAgJzx0ZCBjbGFzcz1cImVudHJ5LXRhYmxlLWRlc2NyaXB0aW9uXCI+eyUhICQkLml0ZW1UZW1wbGF0ZSAlfTwvdGQ+JyxcclxuICAgICc8L3RyPjwvdGFibGU+JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcbiAgZXZlbnRSb3dUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8bGkgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUVudHJ5XCIgZGF0YS1rZXk9XCJ7JT0gJC4ka2V5ICV9XCIgZGF0YS1kZXNjcmlwdG9yPVwieyU6ICQuJGRlc2NyaXB0b3IgJX1cIiBkYXRhLWFjdGl2aXR5LXR5cGU9XCJFdmVudFwiPicsXHJcbiAgICAnPHRhYmxlIGNsYXNzPVwiY2FsZW5kYXItZW50cnktdGFibGVcIj48dHI+JyxcclxuICAgICc8dGQgY2xhc3M9XCJlbnRyeS10YWJsZS1pY29uXCI+JyxcclxuICAgICc8YnV0dG9uIGRhdGEtYWN0aW9uPVwic2VsZWN0RW50cnlcIiBjbGFzcz1cImxpc3QtaXRlbS1zZWxlY3RvciBidXR0b24geyU9ICQkLmFjdGl2aXR5VHlwZUljb24uZXZlbnQgJX1cIj4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPC90ZD4nLFxyXG4gICAgJzx0ZCBjbGFzcz1cImVudHJ5LXRhYmxlLWRlc2NyaXB0aW9uXCI+eyUhICQkLmV2ZW50SXRlbVRlbXBsYXRlICV9PC90ZD4nLFxyXG4gICAgJzwvdHI+PC90YWJsZT4nLFxyXG4gICAgJzwvbGk+JyxcclxuICBdKSxcclxuICB0aW1lVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyUgaWYgKCQuVGltZWxlc3MpIHsgJX0nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwicC10aW1lXCI+eyU9ICQkLmFsbERheVRleHQgJX08L3NwYW4+JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJwLXRpbWVcIj57JTogY3JtLkZvcm1hdC5kYXRlKCQuU3RhcnREYXRlLCAoQXBwLmlzMjRIb3VyQ2xvY2soKSkgPyAkJC5zdGFydFRpbWVGb3JtYXRUZXh0MjQgOiAkJC5zdGFydFRpbWVGb3JtYXRUZXh0KSAlfTwvc3Bhbj4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmcgcC1kZXNjcmlwdGlvblwiPnslOiAkLkRlc2NyaXB0aW9uICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU9ICQkLm5hbWVUZW1wbGF0ZS5hcHBseSgkKSAlfTwvcD4nLFxyXG4gIF0pLFxyXG4gIGV2ZW50SXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZyBwLWRlc2NyaXB0aW9uXCI+eyU6ICQuRGVzY3JpcHRpb24gJX0gKHslOiAkLlR5cGUgJX0pPC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyUhICQkLmV2ZW50TmFtZVRlbXBsYXRlICV9PC9wPicsXHJcbiAgXSksXHJcbiAgbmFtZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkLkNvbnRhY3ROYW1lKSB7ICV9JyxcclxuICAgICd7JTogJC5Db250YWN0TmFtZSAlfSAvIHslOiAkLkFjY291bnROYW1lICV9JyxcclxuICAgICd7JSB9IGVsc2UgaWYgKCQuQWNjb3VudE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slOiAkLkFjY291bnROYW1lICV9JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAneyU6ICQuTGVhZE5hbWUgJX0nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG4gIGV2ZW50TmFtZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slOiBtb21lbnQoJC5TdGFydERhdGUpLmZvcm1hdCgkJC5ldmVudERhdGVGb3JtYXRUZXh0KSAlfScsXHJcbiAgICAnJm5ic3A7LSZuYnNwOycsXHJcbiAgICAneyU6IG1vbWVudCgkLkVuZERhdGUpLmZvcm1hdCgkJC5ldmVudERhdGVGb3JtYXRUZXh0KSAlfScsXHJcbiAgXSksXHJcbiAgZXZlbnRNb3JlVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImxpc3QtbW9yZVwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJldmVudE1vcmVOb2RlXCI+JyxcclxuICAgICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUV2ZW50TW9yZVwiPicsXHJcbiAgICAnPHNwYW4gZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImV2ZW50UmVtYWluaW5nQ29udGVudE5vZGVcIj57JT0gJCQuZXZlbnRNb3JlVGV4dCAlfTwvc3Bhbj4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBub0RhdGFUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibm8tZGF0YVwiPjxwPnslPSAkLm5vRGF0YVRleHQgJX08L3A+PC9kaXY+JyxcclxuICBdKSxcclxuICBldmVudFJlbWFpbmluZ0NvbnRlbnROb2RlOiBudWxsLFxyXG4gIGV2ZW50Q29udGVudE5vZGU6IG51bGwsXHJcbiAgYXR0cmlidXRlTWFwOiB7XHJcbiAgICBsaXN0Q29udGVudDoge1xyXG4gICAgICBub2RlOiAnY29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBkYXRlQ29udGVudDoge1xyXG4gICAgICBub2RlOiAnZGF0ZU5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBldmVudExpc3RDb250ZW50OiB7XHJcbiAgICAgIG5vZGU6ICdldmVudENvbnRlbnROb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRSZW1haW5pbmdDb250ZW50OiB7XHJcbiAgICAgIG5vZGU6ICdldmVudFJlbWFpbmluZ0NvbnRlbnROb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgcmVtYWluaW5nQ29udGVudDoge1xyXG4gICAgICBub2RlOiAncmVtYWluaW5nQ29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdjYWxlbmRhcl93ZWVrbGlzdCcsXHJcbiAgY2xzOiAnbGlzdCBhY3Rpdml0aWVzLWZvci13ZWVrJyxcclxuICBhY3Rpdml0eURldGFpbFZpZXc6ICdhY3Rpdml0eV9kZXRhaWwnLFxyXG4gIGV2ZW50RGV0YWlsVmlldzogJ2V2ZW50X2RldGFpbCcsXHJcbiAgbW9udGhWaWV3OiAnY2FsZW5kYXJfbW9udGhsaXN0JyxcclxuICBkYXRlUGlja2VyVmlldzogJ2dlbmVyaWNfY2FsZW5kYXInLFxyXG4gIGFjdGl2aXR5TGlzdFZpZXc6ICdjYWxlbmRhcl9kYXlsaXN0JyxcclxuICBpbnNlcnRWaWV3OiAnYWN0aXZpdHlfdHlwZXNfbGlzdCcsXHJcbiAgY3VycmVudERhdGU6IG51bGwsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBleHBvc2U6IGZhbHNlLFxyXG4gIGVudHJ5R3JvdXBzOiB7fSxcclxuICB3ZWVrU3RhcnREYXRlOiBudWxsLFxyXG4gIHdlZWtFbmREYXRlOiBudWxsLFxyXG4gIHRvZGF5RGF0ZTogbnVsbCxcclxuICBjb250aW51b3VzU2Nyb2xsaW5nOiBmYWxzZSxcclxuXHJcbiAgcXVlcnlXaGVyZTogbnVsbCxcclxuICBxdWVyeU9yZGVyQnk6ICdTdGFydERhdGUgZGVzYycsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAnU3RhcnREYXRlJyxcclxuICAgICdUeXBlJyxcclxuICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAnQ29udGFjdE5hbWUnLFxyXG4gICAgJ0xlYWRJZCcsXHJcbiAgICAnTGVhZE5hbWUnLFxyXG4gICAgJ1VzZXJJZCcsXHJcbiAgICAnVGltZWxlc3MnLFxyXG4gIF0sXHJcbiAgZXZlbnRRdWVyeVNlbGVjdDogW1xyXG4gICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAnRW5kRGF0ZScsXHJcbiAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgJ1R5cGUnLFxyXG4gIF0sXHJcbiAgYWN0aXZpdHlUeXBlSWNvbjogYWN0aXZpdHlUeXBlSWNvbnMuZGVmYXVsdCxcclxuXHJcbiAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICBwYWdlU2l6ZTogMTA1LCAvLyBnaXZlcyAxNSBhY3Rpdml0aWVzIHBlciBkYXlcclxuICBldmVudFBhZ2VTaXplOiA1LFxyXG4gIHJlc291cmNlS2luZDogJ2FjdGl2aXRpZXMnLFxyXG5cclxuICBfb25SZWZyZXNoOiBmdW5jdGlvbiBfb25SZWZyZXNoKG8pIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKF9vblJlZnJlc2gsIGFyZ3VtZW50cyk7XHJcbiAgICBpZiAoby5yZXNvdXJjZUtpbmQgPT09ICdhY3Rpdml0aWVzJyB8fCBvLnJlc291cmNlS2luZCA9PT0gJ2V2ZW50cycpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGluaXQsIGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLnRvZGF5RGF0ZSA9IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IHRoaXMudG9kYXlEYXRlLmNsb25lKCk7XHJcbiAgfSxcclxuICB0b2dnbGVHcm91cDogZnVuY3Rpb24gdG9nZ2xlR3JvdXAocGFyYW1zKSB7XHJcbiAgICBjb25zdCBub2RlID0gcGFyYW1zLiRzb3VyY2U7XHJcbiAgICBpZiAobm9kZSAmJiBub2RlLnBhcmVudE5vZGUpIHtcclxuICAgICAgJChub2RlKS50b2dnbGVDbGFzcygnY29sbGFwc2VkJyk7XHJcbiAgICAgICQobm9kZS5wYXJlbnROb2RlKS50b2dnbGVDbGFzcygnY29sbGFwc2VkLWV2ZW50Jyk7XHJcblxyXG4gICAgICBjb25zdCBidXR0b24gPSB0aGlzLmNvbGxhcHNlQnV0dG9uO1xyXG5cclxuICAgICAgaWYgKGJ1dHRvbikge1xyXG4gICAgICAgICQoYnV0dG9uKS50b2dnbGVDbGFzcyh0aGlzLnRvZ2dsZUNvbGxhcHNlQ2xhc3MpO1xyXG4gICAgICAgICQoYnV0dG9uKS50b2dnbGVDbGFzcyh0aGlzLnRvZ2dsZUV4cGFuZENsYXNzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYWN0aXZhdGVEYXlIZWFkZXI6IGZ1bmN0aW9uIGFjdGl2YXRlRGF5SGVhZGVyKHBhcmFtcykge1xyXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IG1vbWVudChwYXJhbXMuZGF0ZSwgJ1lZWVktTU0tREQnKTtcclxuICAgIHRoaXMubmF2aWdhdGVUb0RheVZpZXcoKTtcclxuICB9LFxyXG4gIGdldFRoaXNXZWVrQWN0aXZpdGllczogZnVuY3Rpb24gZ2V0VGhpc1dlZWtBY3Rpdml0aWVzKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzSW5DdXJyZW50V2Vlayh0aGlzLnRvZGF5RGF0ZSkpIHtcclxuICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHRoaXMudG9kYXlEYXRlLmNsb25lKCk7XHJcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0U3RhcnREYXk6IGZ1bmN0aW9uIGdldFN0YXJ0RGF5KGRhdGUpIHtcclxuICAgIHJldHVybiBkYXRlLmNsb25lKCkuc3RhcnRPZignd2VlaycpO1xyXG4gIH0sXHJcbiAgZ2V0RW5kRGF5OiBmdW5jdGlvbiBnZXRFbmREYXkoZGF0ZSkge1xyXG4gICAgcmV0dXJuIGRhdGUuY2xvbmUoKS5lbmRPZignd2VlaycpO1xyXG4gIH0sXHJcbiAgZ2V0TmV4dFdlZWtBY3Rpdml0aWVzOiBmdW5jdGlvbiBnZXROZXh0V2Vla0FjdGl2aXRpZXMoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlID0gdGhpcy5nZXRTdGFydERheSh0aGlzLndlZWtFbmREYXRlLmNsb25lKCkuYWRkKHtcclxuICAgICAgZGF5czogMSxcclxuICAgIH0pKTtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gIH0sXHJcbiAgZ2V0UHJldldlZWtBY3Rpdml0aWVzOiBmdW5jdGlvbiBnZXRQcmV2V2Vla0FjdGl2aXRpZXMoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlID0gdGhpcy5nZXRTdGFydERheSh0aGlzLndlZWtTdGFydERhdGUuY2xvbmUoKS5zdWJ0cmFjdCh7XHJcbiAgICAgIGRheXM6IDEsXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnJlZnJlc2goKTtcclxuICB9LFxyXG4gIHNldFdlZWtRdWVyeTogZnVuY3Rpb24gc2V0V2Vla1F1ZXJ5KCkge1xyXG4gICAgY29uc3Qgc2V0RGF0ZSA9IHRoaXMuY3VycmVudERhdGUgfHwgdGhpcy50b2RheURhdGU7XHJcbiAgICB0aGlzLndlZWtTdGFydERhdGUgPSB0aGlzLmdldFN0YXJ0RGF5KHNldERhdGUpO1xyXG4gICAgdGhpcy53ZWVrRW5kRGF0ZSA9IHRoaXMuZ2V0RW5kRGF5KHNldERhdGUpO1xyXG4gICAgdGhpcy5xdWVyeVdoZXJlID0gc3RyaW5nLnN1YnN0aXR1dGUoXHJcbiAgICAgIFtcclxuICAgICAgICAnVXNlckFjdGl2aXRpZXMuVXNlcklkIGVxIFwiJHswfVwiIGFuZCBUeXBlIG5lIFwiYXRMaXRlcmF0dXJlXCIgYW5kICgnLFxyXG4gICAgICAgICcoVGltZWxlc3MgZXEgZmFsc2UgYW5kIFN0YXJ0RGF0ZSBiZXR3ZWVuIEAkezF9QCBhbmQgQCR7Mn1AKSBvciAnLFxyXG4gICAgICAgICcoVGltZWxlc3MgZXEgdHJ1ZSBhbmQgU3RhcnREYXRlIGJldHdlZW4gQCR7M31AIGFuZCBAJHs0fUApKScsXHJcbiAgICAgIF0uam9pbignJyksIFtcclxuICAgICAgICBBcHAuY29udGV4dC51c2VyICYmIEFwcC5jb250ZXh0LnVzZXIuJGtleSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodGhpcy53ZWVrU3RhcnREYXRlLnRvRGF0ZSgpKSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodGhpcy53ZWVrRW5kRGF0ZS50b0RhdGUoKSksXHJcbiAgICAgICAgdGhpcy53ZWVrU3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpLFxyXG4gICAgICAgIHRoaXMud2Vla0VuZERhdGUuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyksXHJcbiAgICAgIF1cclxuICAgICk7XHJcbiAgfSxcclxuICBzZXRXZWVrVGl0bGU6IGZ1bmN0aW9uIHNldFdlZWtUaXRsZSgpIHtcclxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5nZXRTdGFydERheSh0aGlzLmN1cnJlbnREYXRlKTtcclxuICAgIGNvbnN0IGVuZCA9IHRoaXMuZ2V0RW5kRGF5KHRoaXMuY3VycmVudERhdGUpO1xyXG5cclxuICAgIHRoaXMuc2V0KCdkYXRlQ29udGVudCcsIGAke3N0YXJ0LmZvcm1hdCh0aGlzLndlZWtUaXRsZUZvcm1hdFRleHQpfS0ke2VuZC5mb3JtYXQodGhpcy53ZWVrVGl0bGVGb3JtYXRUZXh0KX1gKTtcclxuICB9LFxyXG4gIGlzSW5DdXJyZW50V2VlazogZnVuY3Rpb24gaXNJbkN1cnJlbnRXZWVrKGRhdGUpIHtcclxuICAgIHJldHVybiAoZGF0ZS52YWx1ZU9mKCkgPiB0aGlzLndlZWtTdGFydERhdGUudmFsdWVPZigpICYmIGRhdGUudmFsdWVPZigpIDwgdGhpcy53ZWVrRW5kRGF0ZS52YWx1ZU9mKCkpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0ZlZWQ6IGZ1bmN0aW9uIHByb2Nlc3NGZWVkKGZlZWQpIHtcclxuICAgIHRoaXMuZmVlZCA9IGZlZWQ7XHJcblxyXG4gICAgY29uc3QgdG9kYXlOb2RlID0gdGhpcy5hZGRUb2RheURvbSgpO1xyXG4gICAgY29uc3QgZW50cnlHcm91cHMgPSB0aGlzLmVudHJ5R3JvdXBzO1xyXG4gICAgY29uc3QgZmVlZExlbmd0aCA9IGZlZWQuJHJlc291cmNlcy5sZW5ndGg7XHJcbiAgICBjb25zdCBlbnRyeU9yZGVyID0gW107XHJcbiAgICBjb25zdCBkYXRlQ29tcGFyZVN0cmluZyA9ICdZWVlZLU1NLUREJztcclxuICAgIGNvbnN0IG8gPSBbXTtcclxuICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsICcnKTtcclxuXHJcbiAgICAvLyBJZiB3ZSBmZXRjaGVkIGEgcGFnZSB0aGF0IGhhcyBubyBkYXRhIGR1ZSB0byB1bi1yZWxpYWJsZSBjb3VudHMsXHJcbiAgICAvLyBjaGVjayBpZiB3ZSBmZXRjaGVkIGFueXRoaW5nIGluIHRoZSBwcmV2aW91cyBwYWdlcyBiZWZvcmUgYXNzdW1pbmcgdGhlcmUgaXMgbm8gZGF0YS5cclxuICAgIGlmIChmZWVkTGVuZ3RoID09PSAwICYmIE9iamVjdC5rZXlzKHRoaXMuZW50cmllcykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICQodGhpcy5jb250ZW50Tm9kZSkuYXBwZW5kKHRoaXMubm9EYXRhVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gICAgfSBlbHNlIGlmIChmZWVkLiRyZXNvdXJjZXMpIHtcclxuICAgICAgaWYgKHRvZGF5Tm9kZSAmJiAhZW50cnlHcm91cHNbdGhpcy50b2RheURhdGUuZm9ybWF0KGRhdGVDb21wYXJlU3RyaW5nKV0pIHtcclxuICAgICAgICBlbnRyeUdyb3Vwc1t0aGlzLnRvZGF5RGF0ZS5mb3JtYXQoZGF0ZUNvbXBhcmVTdHJpbmcpXSA9IFt0b2RheU5vZGVdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZlZWQuJHJlc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRFbnRyeSA9IGZlZWQuJHJlc291cmNlc1tpXTtcclxuICAgICAgICBsZXQgc3RhcnREYXRlID0gY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGN1cnJlbnRFbnRyeS5TdGFydERhdGUpO1xyXG4gICAgICAgIGlmIChjdXJyZW50RW50cnkuVGltZWxlc3MpIHtcclxuICAgICAgICAgIHN0YXJ0RGF0ZSA9IHRoaXMuZGF0ZVRvVVRDKHN0YXJ0RGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnJlbnRFbnRyeS5TdGFydERhdGUgPSBzdGFydERhdGU7XHJcbiAgICAgICAgY3VycmVudEVudHJ5LmlzRXZlbnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmVudHJpZXNbY3VycmVudEVudHJ5LiRrZXldID0gY3VycmVudEVudHJ5O1xyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZUNvbXBhcmVLZXkgPSBtb21lbnQoY3VycmVudEVudHJ5LlN0YXJ0RGF0ZSkuZm9ybWF0KGRhdGVDb21wYXJlU3RyaW5nKTtcclxuICAgICAgICBsZXQgY3VycmVudEdyb3VwID0gZW50cnlHcm91cHNbY3VycmVudERhdGVDb21wYXJlS2V5XTtcclxuICAgICAgICBpZiAoY3VycmVudEdyb3VwKSB7XHJcbiAgICAgICAgICBpZiAoY3VycmVudEVudHJ5LlRpbWVsZXNzKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cC5zcGxpY2UoMSwgMCwgdGhpcy5yb3dUZW1wbGF0ZS5hcHBseShjdXJyZW50RW50cnksIHRoaXMpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cC5wdXNoKHRoaXMucm93VGVtcGxhdGUuYXBwbHkoY3VycmVudEVudHJ5LCB0aGlzKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3VycmVudEdyb3VwID0gW3RoaXMuZ3JvdXBUZW1wbGF0ZS5hcHBseShjdXJyZW50RW50cnksIHRoaXMpXTtcclxuICAgICAgICBjdXJyZW50R3JvdXAucHVzaCh0aGlzLnJvd1RlbXBsYXRlLmFwcGx5KGN1cnJlbnRFbnRyeSwgdGhpcykpO1xyXG4gICAgICAgIGVudHJ5R3JvdXBzW2N1cnJlbnREYXRlQ29tcGFyZUtleV0gPSBjdXJyZW50R3JvdXA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoY29uc3QgZW50cnlHcm91cCBpbiBlbnRyeUdyb3Vwcykge1xyXG4gICAgICAgIGlmIChlbnRyeUdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShlbnRyeUdyb3VwKSkge1xyXG4gICAgICAgICAgZW50cnlPcmRlci5wdXNoKG1vbWVudChlbnRyeUdyb3VwLCBkYXRlQ29tcGFyZVN0cmluZykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZW50cnlPcmRlci5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgaWYgKGEudmFsdWVPZigpIDwgYi52YWx1ZU9mKCkpIHtcclxuICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYS52YWx1ZU9mKCkgPiBiLnZhbHVlT2YoKSkge1xyXG4gICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgZW50cnlPcmRlckxlbmd0aCA9IGVudHJ5T3JkZXIubGVuZ3RoO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudHJ5T3JkZXJMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG8ucHVzaChlbnRyeUdyb3Vwc1tlbnRyeU9yZGVyW2ldLmZvcm1hdChkYXRlQ29tcGFyZVN0cmluZyldLmpvaW4oJycpICsgdGhpcy5ncm91cEVuZFRlbXBsYXRlLmFwcGx5KHRoaXMpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsIG8uam9pbignJykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXQoJ3JlbWFpbmluZ0NvbnRlbnQnLCAnJyk7IC8vIEZlZWQgZG9lcyBub3QgcmV0dXJuIHJlbGlhYmxlIGRhdGEsIGRvbid0IHNob3cgcmVtYWluaW5nXHJcblxyXG4gICAgJCh0aGlzLmRvbU5vZGUpLnRvZ2dsZUNsYXNzKCdsaXN0LWhhcy1tb3JlJywgdGhpcy5oYXNNb3JlRGF0YSgpKTtcclxuICAgIHRoaXMuX2xvYWRQcmV2aW91c1NlbGVjdGlvbnMoKTtcclxuICB9LFxyXG4gIGFkZFRvZGF5RG9tOiBmdW5jdGlvbiBhZGRUb2RheURvbSgpIHtcclxuICAgIGlmICghdGhpcy5pc0luQ3VycmVudFdlZWsodGhpcy50b2RheURhdGUpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRvZGF5RW50cnkgPSB7XHJcbiAgICAgIFN0YXJ0RGF0ZTogdGhpcy50b2RheURhdGUudG9EYXRlKCksXHJcbiAgICAgIGhlYWRlckNsYXNzOiAnY3VycmVudERhdGUnLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5ncm91cFRlbXBsYXRlLmFwcGx5KHRvZGF5RW50cnksIHRoaXMpO1xyXG4gIH0sXHJcbiAgZGF0ZVRvVVRDOiBmdW5jdGlvbiBkYXRlVG9VVEMoZGF0ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSxcclxuICAgICAgZGF0ZS5nZXRVVENNb250aCgpLFxyXG4gICAgICBkYXRlLmdldFVUQ0RhdGUoKSxcclxuICAgICAgZGF0ZS5nZXRVVENIb3VycygpLFxyXG4gICAgICBkYXRlLmdldFVUQ01pbnV0ZXMoKSxcclxuICAgICAgZGF0ZS5nZXRVVENTZWNvbmRzKClcclxuICAgICk7XHJcbiAgfSxcclxuICByZXF1ZXN0RXZlbnREYXRhOiBmdW5jdGlvbiByZXF1ZXN0RXZlbnREYXRhKCkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IHRoaXMuY3JlYXRlRXZlbnRSZXF1ZXN0KCk7XHJcbiAgICByZXF1ZXN0LnJlYWQoe1xyXG4gICAgICBzdWNjZXNzOiB0aGlzLm9uUmVxdWVzdEV2ZW50RGF0YVN1Y2Nlc3MsXHJcbiAgICAgIGZhaWx1cmU6IHRoaXMub25SZXF1ZXN0RXZlbnREYXRhRmFpbHVyZSxcclxuICAgICAgYWJvcnRlZDogdGhpcy5vblJlcXVlc3RFdmVudERhdGFBYm9ydGVkLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgb25SZXF1ZXN0RXZlbnREYXRhRmFpbHVyZTogZnVuY3Rpb24gb25SZXF1ZXN0RXZlbnREYXRhRmFpbHVyZShyZXNwb25zZSwgbykge1xyXG4gICAgYWxlcnQoc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5yZXF1ZXN0RXJyb3JUZXh0LCBbcmVzcG9uc2UsIG9dKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywgdGhpcy5vcHRpb25zLCAnZmFpbHVyZScpO1xyXG4gIH0sXHJcbiAgb25SZXF1ZXN0RXZlbnREYXRhQWJvcnRlZDogZnVuY3Rpb24gb25SZXF1ZXN0RXZlbnREYXRhQWJvcnRlZCgpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IGZhbHNlOyAvLyBmb3JjZSBhIHJlZnJlc2hcclxuICB9LFxyXG4gIG9uUmVxdWVzdEV2ZW50RGF0YVN1Y2Nlc3M6IGZ1bmN0aW9uIG9uUmVxdWVzdEV2ZW50RGF0YVN1Y2Nlc3MoZmVlZCkge1xyXG4gICAgdGhpcy5wcm9jZXNzRXZlbnRGZWVkKGZlZWQpO1xyXG4gIH0sXHJcbiAgY3JlYXRlRXZlbnRSZXF1ZXN0OiBmdW5jdGlvbiBjcmVhdGVFdmVudFJlcXVlc3QoKSB7XHJcbiAgICBjb25zdCBxdWVyeVNlbGVjdCA9IHRoaXMuZXZlbnRRdWVyeVNlbGVjdDtcclxuICAgIGNvbnN0IHF1ZXJ5V2hlcmUgPSB0aGlzLmdldEV2ZW50UXVlcnkoKTtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFSZXNvdXJjZUNvbGxlY3Rpb25SZXF1ZXN0KHRoaXMuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0Q291bnQodGhpcy5ldmVudFBhZ2VTaXplKVxyXG4gICAgICAuc2V0U3RhcnRJbmRleCgxKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKCdldmVudHMnKVxyXG4gICAgICAuc2V0UXVlcnlBcmcoU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFVcmkuUXVlcnlBcmdOYW1lcy5TZWxlY3QsIHRoaXMuZXhwYW5kRXhwcmVzc2lvbihxdWVyeVNlbGVjdCkuam9pbignLCcpKVxyXG4gICAgICAuc2V0UXVlcnlBcmcoU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFVcmkuUXVlcnlBcmdOYW1lcy5XaGVyZSwgcXVlcnlXaGVyZSk7XHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxuICB9LFxyXG4gIGdldEV2ZW50UXVlcnk6IGZ1bmN0aW9uIGdldEV2ZW50UXVlcnkoKSB7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSB0aGlzLndlZWtTdGFydERhdGU7XHJcbiAgICBjb25zdCBlbmREYXRlID0gdGhpcy53ZWVrRW5kRGF0ZTtcclxuICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShcclxuICAgICAgW1xyXG4gICAgICAgICdVc2VySWQgZXEgXCIkezB9XCIgYW5kICgnLFxyXG4gICAgICAgICcoU3RhcnREYXRlIGd0IEAkezF9QCBvciBFbmREYXRlIGd0IEAkezF9QCkgYW5kICcsXHJcbiAgICAgICAgJ1N0YXJ0RGF0ZSBsdCBAJHsyfUAnLFxyXG4gICAgICAgICcpJyxcclxuICAgICAgXS5qb2luKCcnKSwgW0FwcC5jb250ZXh0LnVzZXIgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5LFxyXG4gICAgICAgIHN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tRERUMDA6MDA6MDBbWl0nKSxcclxuICAgICAgICBlbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpLFxyXG4gICAgICBdXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgaGlkZUV2ZW50TGlzdDogZnVuY3Rpb24gaGlkZUV2ZW50TGlzdCgpIHtcclxuICAgICQodGhpcy5ldmVudENvbnRhaW5lck5vZGUpLmFkZENsYXNzKCdldmVudC1oaWRkZW4nKTtcclxuICB9LFxyXG4gIHNob3dFdmVudExpc3Q6IGZ1bmN0aW9uIHNob3dFdmVudExpc3QoKSB7XHJcbiAgICAkKHRoaXMuZXZlbnRDb250YWluZXJOb2RlKS5yZW1vdmVDbGFzcygnZXZlbnQtaGlkZGVuJyk7XHJcbiAgfSxcclxuICBwcm9jZXNzRXZlbnRGZWVkOiBmdW5jdGlvbiBwcm9jZXNzRXZlbnRGZWVkKGZlZWQpIHtcclxuICAgIGNvbnN0IG8gPSBbXTtcclxuICAgIGNvbnN0IGZlZWRMZW5ndGggPSBmZWVkLiRyZXNvdXJjZXMubGVuZ3RoO1xyXG5cclxuICAgIGlmIChmZWVkTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuaGlkZUV2ZW50TGlzdCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zaG93RXZlbnRMaXN0KCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWVkTGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgZXZlbnQgPSBmZWVkLiRyZXNvdXJjZXNbaV07XHJcbiAgICAgIGV2ZW50LmlzRXZlbnQgPSB0cnVlO1xyXG4gICAgICBldmVudC5TdGFydERhdGUgPSBtb21lbnQoY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGV2ZW50LlN0YXJ0RGF0ZSkpO1xyXG4gICAgICBldmVudC5FbmREYXRlID0gbW9tZW50KGNvbnZlcnQudG9EYXRlRnJvbVN0cmluZyhldmVudC5FbmREYXRlKSk7XHJcbiAgICAgIHRoaXMuZW50cmllc1tldmVudC4ka2V5XSA9IGV2ZW50O1xyXG4gICAgICBvLnB1c2godGhpcy5ldmVudFJvd1RlbXBsYXRlLmFwcGx5KGV2ZW50LCB0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZlZWQuJHRvdGFsUmVzdWx0cyA+IGZlZWRMZW5ndGgpIHtcclxuICAgICAgJCh0aGlzLmV2ZW50Q29udGFpbmVyTm9kZSkuYWRkQ2xhc3MoJ2xpc3QtaGFzLW1vcmUnKTtcclxuICAgICAgdGhpcy5zZXQoJ2V2ZW50UmVtYWluaW5nQ29udGVudCcsIHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuZXZlbnRNb3JlVGV4dCwgW2ZlZWQuJHRvdGFsUmVzdWx0cyAtIGZlZWRMZW5ndGhdKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKHRoaXMuZXZlbnRDb250YWluZXJOb2RlKS5yZW1vdmVDbGFzcygnbGlzdC1oYXMtbW9yZScpO1xyXG4gICAgICAkKHRoaXMuZXZlbnRSZW1haW5pbmdDb250ZW50Tm9kZSkuZW1wdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldCgnZXZlbnRMaXN0Q29udGVudCcsIG8uam9pbignJykpO1xyXG4gIH0sXHJcbiAgcmVmcmVzaDogZnVuY3Rpb24gcmVmcmVzaCgpIHtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRoaXMuY3VycmVudERhdGUuY2xvbmUoKTtcclxuICAgIHRoaXMuY3VycmVudERhdGUgPSBzdGFydERhdGUuY2xvbmUoKTtcclxuICAgIHRoaXMud2Vla1N0YXJ0RGF0ZSA9IHRoaXMuZ2V0U3RhcnREYXkoc3RhcnREYXRlKTtcclxuICAgIHRoaXMud2Vla0VuZERhdGUgPSB0aGlzLmdldEVuZERheShzdGFydERhdGUpO1xyXG4gICAgdGhpcy5zZXRXZWVrVGl0bGUoKTtcclxuICAgIHRoaXMuc2V0V2Vla1F1ZXJ5KCk7XHJcblxyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgdGhpcy5yZXF1ZXN0RXZlbnREYXRhKCk7XHJcbiAgfSxcclxuICBzaG93OiBmdW5jdGlvbiBzaG93KG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgIHRoaXMucHJvY2Vzc1Nob3dPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKHNob3csIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBwcm9jZXNzU2hvd09wdGlvbnM6IGZ1bmN0aW9uIHByb2Nlc3NTaG93T3B0aW9ucyhvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5jdXJyZW50RGF0ZSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnREYXRlID0gbW9tZW50KG9wdGlvbnMuY3VycmVudERhdGUpLnN0YXJ0T2YoJ2RheScpIHx8IG1vbWVudCgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhY3RpdmF0ZUV2ZW50TW9yZTogZnVuY3Rpb24gYWN0aXZhdGVFdmVudE1vcmUoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ2V2ZW50X3JlbGF0ZWQnKTtcclxuICAgIGNvbnN0IHdoZXJlID0gdGhpcy5nZXRFdmVudFF1ZXJ5KCk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIHdoZXJlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGNsZWFyLCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5lbnRyeUdyb3VwcyA9IHt9O1xyXG4gICAgdGhpcy5zZXQoJ2V2ZW50Q29udGVudCcsICcnKTtcclxuICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsIHRoaXMubG9hZGluZ1RlbXBsYXRlLmFwcGx5KHRoaXMpKTtcclxuICB9LFxyXG4gIHNlbGVjdEVudHJ5OiBmdW5jdGlvbiBzZWxlY3RFbnRyeShwYXJhbXMpIHtcclxuICAgIGNvbnN0IHJvdyA9ICQocGFyYW1zLiRzb3VyY2UpLmNsb3Nlc3QoJ1tkYXRhLWtleV0nKVswXTtcclxuICAgIGNvbnN0IGtleSA9IHJvdyA/IHJvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JykgOiBmYWxzZTtcclxuXHJcbiAgICB0aGlzLm5hdmlnYXRlVG9EZXRhaWxWaWV3KGtleSk7XHJcbiAgfSxcclxuICBzZWxlY3REYXRlOiBmdW5jdGlvbiBzZWxlY3REYXRlKCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgZGF0ZTogdGhpcy5jdXJyZW50RGF0ZS50b0RhdGUoKSxcclxuICAgICAgc2hvd1RpbWVQaWNrZXI6IGZhbHNlLFxyXG4gICAgICB0aW1lbGVzczogZmFsc2UsXHJcbiAgICAgIHRvb2xzOiB7XHJcbiAgICAgICAgdGJhcjogW3tcclxuICAgICAgICAgIGlkOiAnY29tcGxldGUnLFxyXG4gICAgICAgICAgY2xzOiAnZmEgZmEtY2hlY2sgZmEtZncgZmEtbGcnLFxyXG4gICAgICAgICAgZm46IHRoaXMuc2VsZWN0RGF0ZVN1Y2Nlc3MsXHJcbiAgICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogJ2NhbmNlbCcsXHJcbiAgICAgICAgICBjbHM6ICdmYSBmYS1iYW4gZmEtZncgZmEtbGcnLFxyXG4gICAgICAgICAgc2lkZTogJ2xlZnQnLFxyXG4gICAgICAgICAgZm46IFJlVUkuYmFjayxcclxuICAgICAgICAgIHNjb3BlOiBSZVVJLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmRhdGVQaWNrZXJWaWV3KTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNlbGVjdERhdGVTdWNjZXNzOiBmdW5jdGlvbiBzZWxlY3REYXRlU3VjY2VzcygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0UHJpbWFyeUFjdGl2ZVZpZXcoKTtcclxuICAgIHRoaXMuY3VycmVudERhdGUgPSBtb21lbnQodmlldy5nZXREYXRlVGltZSgpKS5zdGFydE9mKCdkYXknKTtcclxuICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgUmVVSS5iYWNrKCk7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvRGF5VmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0RheVZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5hY3Rpdml0eUxpc3RWaWV3KTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGN1cnJlbnREYXRlOiB0aGlzLmN1cnJlbnREYXRlLnRvRGF0ZSgpLnZhbHVlT2YoKSB8fCBtb21lbnQoKS5zdGFydE9mKCdkYXknKS52YWx1ZU9mKCksXHJcbiAgICB9O1xyXG4gICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb01vbnRoVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb01vbnRoVmlldygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLm1vbnRoVmlldyk7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBjdXJyZW50RGF0ZTogdGhpcy5jdXJyZW50RGF0ZS50b0RhdGUoKS52YWx1ZU9mKCkgfHwgbW9tZW50KCkuc3RhcnRPZignZGF5JykudmFsdWVPZigpLFxyXG4gICAgfTtcclxuICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9JbnNlcnRWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvSW5zZXJ0VmlldygpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLmluc2VydFZpZXcgfHwgdGhpcy5lZGl0Vmlldyk7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zLmN1cnJlbnREYXRlID0gdGhpcy5jdXJyZW50RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKSB8fCBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgbmVnYXRlSGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICByZXR1cm5UbzogdGhpcy5pZCxcclxuICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgICAgY3VycmVudERhdGU6IHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZS52YWx1ZU9mKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0RldGFpbFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9EZXRhaWxWaWV3KGtleSwgZGVzY3JpcHRvcikge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmVudHJpZXNba2V5XTtcclxuICAgIGNvbnN0IGRldGFpbFZpZXcgPSAoZW50cnkuaXNFdmVudCkgPyB0aGlzLmV2ZW50RGV0YWlsVmlldyA6IHRoaXMuYWN0aXZpdHlEZXRhaWxWaWV3O1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGRldGFpbFZpZXcpO1xyXG5cclxuICAgIGNvbnN0IHRoZURlc2NyaXB0b3IgPSAoZW50cnkuaXNFdmVudCkgPyBkZXNjcmlwdG9yIDogZW50cnkuRGVzY3JpcHRpb247XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICB0aXRsZTogdGhlRGVzY3JpcHRvcixcclxuICAgICAgICBrZXksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19