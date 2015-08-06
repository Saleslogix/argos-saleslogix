define('crm/Views/Calendar/MonthView', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/string', 'dojo/query', 'dojo/dom-attr', 'dojo/dom-class', 'dojo/dom-construct', 'crm/Format', 'argos/ErrorManager', 'argos/Convert', 'argos/List', 'argos/_LegacySDataListMixin', 'moment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _dojoString, _dojoQuery, _dojoDomAttr, _dojoDomClass, _dojoDomConstruct, _crmFormat, _argosErrorManager, _argosConvert, _argosList, _argos_LegacySDataListMixin, _moment) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _string = _interopRequireDefault(_dojoString);

  var _query = _interopRequireDefault(_dojoQuery);

  var _domAttr = _interopRequireDefault(_dojoDomAttr);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _ErrorManager = _interopRequireDefault(_argosErrorManager);

  var _convert = _interopRequireDefault(_argosConvert);

  var _List = _interopRequireDefault(_argosList);

  var _LegacySDataListMixin2 = _interopRequireDefault(_argos_LegacySDataListMixin);

  var _moment2 = _interopRequireDefault(_moment);

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
  var __class = (0, _declare['default'])('crm.Views.Calendar.MonthView', [_List['default'], _LegacySDataListMixin2['default']], {
    // Localization
    titleText: 'Calendar',
    todayText: 'Today',
    dayText: 'Day',
    weekText: 'Week',
    monthText: 'Month',
    monthTitleFormatText: 'MMMM YYYY',
    dayTitleFormatText: 'ddd MMM D, YYYY',
    eventDateFormatText: 'M/D/YYYY',
    startTimeFormatText: 'h:mm A',
    allDayText: 'All-Day',
    eventText: 'Event',
    eventHeaderText: 'Events',
    countMoreText: 'View More',
    activityHeaderText: 'Activities',
    toggleCollapseText: 'toggle collapse',
    toggleCollapseClass: 'fa fa-chevron-down',
    toggleExpandClass: 'fa fa-chevron-right',
    weekDaysShortText: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    enablePullToRefresh: false,

    // Templates
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '<div data-dojo-attach-point="searchNode"></div>', '{%! $.navigationTemplate %}', '<div style="clear:both"></div>', '<div class="month-content" data-dojo-attach-point="monthNode">', '{%! $.navBarTemplate %}', '<div class="month-calendar" data-dojo-attach-point="contentNode"></div>', '</div>', '<div class="day-content">', '<h2 class="date-day-text" data-dojo-attach-point="dayTitleNode"></h2>', '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">', '<h2 data-action="toggleGroup"><button data-dojo-attach-point="collapseButton" class="{%= $$.toggleCollapseClass %}" aria-label="{%: $$.toggleCollapseText %}"></button>{%= $.eventHeaderText %}</h2>', '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>', '{%! $.eventMoreTemplate %}', '</div>', '<div class="activity-content" data-dojo-attach-point="activityContainerNode">', '<h2>{%= $.activityHeaderText %}</h2>', '<ul class="list-content" data-dojo-attach-point="activityContentNode"></ul>', '{%! $.activityMoreTemplate %}', '</div>', '</div>', '<div style="clear:both"></div>', '</div>']),
    navigationTemplate: new Simplate(['<div class="split-buttons">', '<button data-tool="today" data-action="getTodayMonthActivities" class="button">{%: $.todayText %}</button>', '<button data-tool="selectdate" data-action="selectDate" class="button fa fa-calendar"><span></span></button>', '<button data-tool="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>', '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>', '<button data-tool="month" class="button current">{%: $.monthText %}</button>', '</div>']),
    navBarTemplate: new Simplate(['<div class="nav-bar">', '<button data-tool="next" data-action="goToNextMonth" class="button button-next fa fa-arrow-right fa-lg"><span></span></button>', '<button data-tool="prev" data-action="goToPreviousMonth" class="button button-prev fa fa-arrow-left fa-lg"><span></span></button>', '<h3 class="date-text" data-dojo-attach-point="dateNode"></h3>', '</div>']),
    activityRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityIconByType[$.Type] %}">', '</button>', '</td>', '<td class="entry-table-time">{%! $$.activityTimeTemplate %}</td>', '<td class="entry-table-description">{%! $$.activityItemTemplate %}</td>', '</tr></table>', '</li>']),
    eventRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.eventIcon %}">', '</button>', '</td>', '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>', '</tr></table>', '</li>']),
    activityTimeTemplate: new Simplate(['{% if ($.Timeless) { %}', '<span class="p-time">{%= $$.allDayText %}</span>', '{% } else { %}', '<span class="p-time">{%: crm.Format.date($.StartDate, $$.startTimeFormatText) %}</span>', '{% } %}']),
    activityItemTemplate: new Simplate(['<h3 class="p-description">{%: $.Description %}</h3>', '<h4>{%= $$.activityNameTemplate.apply($) %}</h4>']),
    eventItemTemplate: new Simplate(['<h3 class="p-description">{%: $.Description %} ({%: $.Type %})</h3>', '<h4>{%! $$.eventNameTemplate %}</h4>']),
    activityNameTemplate: new Simplate(['{% if ($.ContactName) { %}', '{%: $.ContactName %} / {%: $.AccountName %}', '{% } else if ($.AccountName) { %}', '{%: $.AccountName %}', '{% } else { %}', '{%: $.LeadName %}', '{% } %}']),
    eventNameTemplate: new Simplate(['{%: crm.Format.date($.StartDate, $$.eventDateFormatText) %}', '&nbsp;-&nbsp;', '{%: crm.Format.date($.EndDate, $$.eventDateFormatText) %}']),
    activityMoreTemplate: new Simplate(['<div class="list-more" data-dojo-attach-point="activityMoreNode">', '<button class="button" data-action="activateActivityMore">', '<span data-dojo-attach-point="activityRemainingContentNode">{%= $.countMoreText %}</span>', '</button>', '</div>']),
    eventMoreTemplate: new Simplate(['<div class="list-more" data-dojo-attach-point="eventMoreNode">', '<button class="button" data-action="activateEventMore">', '<span data-dojo-attach-point="eventRemainingContentNode">{%= $.countMoreText %}</span>', '</button>', '</div>']),
    calendarStartTemplate: '<table class="calendar-table">',
    calendarWeekHeaderStartTemplate: '<tr class="calendar-week-header">',
    calendarWeekHeaderTemplate: '<td class="calendar-weekday">${0}</td>',
    calendarWeekHeaderEndTemplate: '</tr>',
    calendarWeekStartTemplate: '<tr class="calendar-week">',
    calendarEmptyDayTemplate: '<td>&nbsp;</td>',
    calendarDayTemplate: '<td class="calendar-day ${1}" data-action="selectDay" data-date="${2}">${0}</td>',
    calendarWeekEndTemplate: '</tr>',
    calendarEndTemplate: '</table>',
    calendarActivityCountTemplate: '<span class="activity-count" title="${0} events">${0}</span>',

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
    activityIconByType: {
      'atToDo': 'fa fa-list-ul',
      'atPhoneCall': 'fa fa-phone',
      'atAppointment': 'fa fa-calendar-o',
      'atLiterature': 'fa fa-calendar-o',
      'atPersonal': 'fa fa-check-square-o',
      'atQuestion': 'fa fa-question',
      'atNote': 'fa fa-calendar-o',
      'atEMail': 'fa fa-envelope'
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
    clear: function clear() {},
    startup: function startup() {
      this.inherited(arguments);
      this.currentDate = (0, _moment2['default'])().startOf('day');
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
          'where': where
        });
      }
    },
    toggleGroup: function toggleGroup(params) {
      var node = params.$source;
      if (node && node.parentNode) {
        _domClass['default'].toggle(node, 'collapsed');
        _domClass['default'].toggle(node.parentNode, 'collapsed-event');

        var button = this.collapseButton;

        if (button) {
          _domClass['default'].toggle(button, this.toggleCollapseClass);
          _domClass['default'].toggle(button, this.toggleExpandClass);
        }
      }
    },
    selectDay: function selectDay(params, evt, el) {
      if (this.selectedDateNode) {
        _domClass['default'].remove(this.selectedDateNode, 'selected');
      }

      this.selectedDateNode = el;
      _domClass['default'].add(el, 'selected');

      this.currentDate = (0, _moment2['default'])(params.date, 'YYYY-MM-DD');
      this.getSelectedDate();
    },
    getFirstDayOfCurrentMonth: function getFirstDayOfCurrentMonth() {
      return this.currentDate.clone().startOf('month');
    },
    getLastDayOfCurrentMonth: function getLastDayOfCurrentMonth() {
      return this.currentDate.clone().endOf('month');
    },
    getTodayMonthActivities: function getTodayMonthActivities() {
      var today = (0, _moment2['default'])().startOf('day');

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
      alert(_string['default'].substitute(this.requestErrorText, [response, o])); // eslint-disable-line
      _ErrorManager['default'].addError(response, o, this.options, 'failure');
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
      return _string['default'].substitute(['UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (', '(Timeless eq false and StartDate', ' between @${1}@ and @${2}@) or ', '(Timeless eq true and StartDate', ' between @${3}@ and @${4}@))'].join(''), [App.context.user && App.context.user.$key, _convert['default'].toIsoStringFromDate(startDate.toDate()), _convert['default'].toIsoStringFromDate(endDate.toDate()), startDate.format('YYYY-MM-DDT00:00:00[Z]'), endDate.format('YYYY-MM-DDT23:59:59[Z]')]);
    },
    getEventQuery: function getEventQuery() {
      var startDate = this.getFirstDayOfCurrentMonth();
      var endDate = this.getLastDayOfCurrentMonth();
      return _string['default'].substitute(['UserId eq "${0}" and (', '(StartDate gt @${1}@ or EndDate gt @${1}@) and ', 'StartDate lt @${2}@', ')'].join(''), [App.context.user && App.context.user.$key, _convert['default'].toIsoStringFromDate(startDate.toDate()), _convert['default'].toIsoStringFromDate(endDate.toDate())]);
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

        var startDay = (0, _moment2['default'])(_convert['default'].toDateFromString(row.StartDate));
        if (r[i].Timeless) {
          startDay.add({
            minutes: startDay.zone()
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

        var startDay = (0, _moment2['default'])(_convert['default'].toDateFromString(row.StartDate));
        var endDay = _convert['default'].toDateFromString(row.EndDate);

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
      (0, _query['default'])('.calendar-day').forEach(function queryDays(node) {
        var dataDate = _domAttr['default'].get(node, 'data-date');
        if (!this.dateCounts[dataDate]) {
          return;
        }

        _domClass['default'].add(node, 'activeDay');

        var countMarkup = _string['default'].substitute(this.calendarActivityCountTemplate, [this.dateCounts[dataDate]]);
        var existingCount = (0, _query['default'])(node).children('div');

        if (existingCount.length > 0) {
          _domConstruct['default'].place(countMarkup, existingCount[0], 'only');
        } else {
          _domConstruct['default'].place('<div>' + countMarkup + '</div>', node, 'first');
        }
      }, this);
    },
    setCurrentDateTitle: function setCurrentDateTitle() {
      this.set('dayTitleContent', this.currentDate.format(this.dayTitleFormatText));
    },
    hideEventList: function hideEventList() {
      _domClass['default'].add(this.eventContainerNode, 'event-hidden');
    },
    showEventList: function showEventList() {
      _domClass['default'].remove(this.eventContainerNode, 'event-hidden');
    },
    getSelectedDate: function getSelectedDate() {
      this.clearSelectedDate();
      this.setCurrentDateTitle();
      this.requestSelectedDateActivities();
      this.requestSelectedDateEvents();
    },
    clearSelectedDate: function clearSelectedDate() {
      _domClass['default'].add(this.activityContainerNode, 'list-loading');
      this.set('activityContent', this.loadingTemplate.apply(this));
      this.hideEventList();
    },
    cancelRequests: function cancelRequests(requests) {
      if (!requests) {
        return;
      }

      _array['default'].forEach(requests, function forEach(xhr) {
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

      var results = _string['default'].substitute(activityQuery, [App.context.user && App.context.user.$key, _convert['default'].toIsoStringFromDate(this.currentDate.toDate()), _convert['default'].toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate()), this.currentDate.format('YYYY-MM-DDT00:00:00[Z]'), this.currentDate.format('YYYY-MM-DDT23:59:59[Z]')]);

      return results;
    },
    getSelectedDateEventQuery: function getSelectedDateEventQuery() {
      return _string['default'].substitute(['UserId eq "${0}" and (', '(StartDate gt @${1}@ or EndDate gt @${1}@) and ', 'StartDate lt @${2}@', ')'].join(''), [App.context.user && App.context.user.$key, _convert['default'].toIsoStringFromDate(this.currentDate.toDate()), _convert['default'].toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate())]);
    },
    onRequestSelectedDateActivityDataSuccess: function onRequestSelectedDateActivityDataSuccess(feed) {
      if (!feed) {
        return false;
      }

      _domClass['default'].remove(this.activityContainerNode, 'list-loading');

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
        _domClass['default'].add(this.activityContainerNode, 'list-has-more');
        this.set('activityRemainingContent', this.countMoreText);
      } else {
        _domClass['default'].remove(this.activityContainerNode, 'list-has-more');
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
        _domClass['default'].add(this.eventContainerNode, 'list-has-more');
        this.set('eventRemainingContent', this.countMoreText);
      } else {
        _domClass['default'].remove(this.eventContainerNode, 'list-has-more');
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
        calHTML.push(_string['default'].substitute(this.calendarWeekHeaderTemplate, [this.weekDaysShortText[i]]));
      }
      calHTML.push(this.calendarWeekHeaderEndTemplate);

      // Weeks
      for (var i = 0; i <= 6; i++) {
        calHTML.push(this.calendarWeekStartTemplate);
        // Days
        for (var j = 0; j <= 6; j++) {
          if (day <= monthLength && (i > 0 || j >= startingDay)) {
            dayDate.date(day);
            weekendClass = weekEnds.indexOf(j) !== -1 ? ' weekend' : '';
            calHTML.push(_string['default'].substitute(this.calendarDayTemplate, [day, weekendClass, dayDate.format('YYYY-MM-DD')]));
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
        this.currentDate = (0, _moment2['default'])(options.currentDate).startOf('day') || (0, _moment2['default'])().startOf('day');
        this.refreshRequired = true;
      }
    },
    highlightCurrentDate: function highlightCurrentDate() {
      var selectedDate = _string['default'].substitute('.calendar-day[data-date=${0}]', [this.currentDate.format('YYYY-MM-DD')]);

      if (this.selectedDateNode) {
        _domClass['default'].remove(this.selectedDateNode, 'selected');
      }

      this.selectedDateNode = (0, _query['default'])(selectedDate, this.contentNode)[0];
      if (this.selectedDateNode) {
        _domClass['default'].add(this.selectedDateNode, 'selected');
      }

      this.getSelectedDate();
      this.highlightToday();
    },
    highlightToday: function highlightToday() {
      // Remove the existing "today" highlight class because it might be out of date,
      // like when we tick past midnight.
      var todayCls = '.calendar-day.today';
      var todayNode = (0, _query['default'])(todayCls, this.contentNode)[0];
      if (todayNode) {
        _domClass['default'].remove(todayNode, 'today');
      }

      // Get the updated "today"
      todayCls = _string['default'].substitute('.calendar-day[data-date=${0}]', [(0, _moment2['default'])().format('YYYY-MM-DD')]);
      todayNode = (0, _query['default'])(todayCls, this.contentNode)[0];
      if (todayNode) {
        _domClass['default'].add(todayNode, 'today');
      }
    },
    selectEntry: function selectEntry(params) {
      var row = (0, _query['default'])(params.$source).closest('[data-key]')[0];
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
      this.currentDate = (0, _moment2['default'])(view.getDateTime()).startOf('day');
      this.refresh();
      ReUI.back();
    },
    navigateToWeekView: function navigateToWeekView() {
      var view = App.getView(this.weekView);
      var options = {
        currentDate: this.currentDate.valueOf() || (0, _moment2['default'])().startOf('day')
      };
      view.show(options);
    },
    navigateToDayView: function navigateToDayView() {
      var view = App.getView(this.dayView);
      var options = {
        currentDate: this.currentDate.valueOf() || (0, _moment2['default'])().startOf('day')
      };
      view.show(options);
    },
    navigateToInsertView: function navigateToInsertView() {
      var view = App.getView(this.insertView || this.editView);

      if (!this.options) {
        this.options = {};
      }

      this.options.currentDate = this.currentDate.toString('yyyy-MM-dd') || (0, _moment2['default'])().startOf('day');
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

  _lang['default'].setObject('Mobile.SalesLogix.Views.Calendar.MonthView', __class);
  module.exports = __class;
});
