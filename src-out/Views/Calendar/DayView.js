define('crm/Views/Calendar/DayView', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dojo/query', 'dojo/dom-class', 'dojo/dom-construct', 'argos/ErrorManager', 'argos/Convert', 'argos/List', 'argos/_LegacySDataListMixin', 'moment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _dojoQuery, _dojoDomClass, _dojoDomConstruct, _argosErrorManager, _argosConvert, _argosList, _argos_LegacySDataListMixin, _moment) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _query = _interopRequireDefault(_dojoQuery);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _ErrorManager = _interopRequireDefault(_argosErrorManager);

  var _convert = _interopRequireDefault(_argosConvert);

  var _List = _interopRequireDefault(_argosList);

  var _LegacySDataListMixin2 = _interopRequireDefault(_argos_LegacySDataListMixin);

  var _moment2 = _interopRequireDefault(_moment);

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
  var __class = (0, _declare['default'])('crm.Views.Calendar.DayView', [_List['default'], _LegacySDataListMixin2['default']], {
    // Localization
    titleText: 'Calendar',
    eventDateFormatText: 'M/D/YYYY',
    dateHeaderFormatText: 'dddd, M/D/YYYY',
    startTimeFormatText: 'h:mm A',
    todayText: 'Today',
    dayText: 'Day',
    weekText: 'Week',
    monthText: 'Month',
    allDayText: 'All-Day',
    eventHeaderText: 'Events',
    activityHeaderText: 'Activities',
    eventMoreText: 'View More Event(s)',
    toggleCollapseText: 'toggle collapse',
    enablePullToRefresh: false,
    toggleCollapseClass: 'fa fa-chevron-down',
    toggleExpandClass: 'fa fa-chevron-right',

    // Templates
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '<div data-dojo-attach-point="searchNode"></div>', '{%! $.navigationTemplate %}', '<div style="clear:both"></div>', '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">', '<h2 data-action="toggleGroup"><button data-dojo-attach-point="collapseButton" class="{%= $$.toggleCollapseClass %}" aria-label="{%: $$.toggleCollapseText %}"></button>{%= $.eventHeaderText %}</h2>', '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>', '{%! $.eventMoreTemplate %}', '</div>', '<h2>{%= $.activityHeaderText %}</h2>', '<ul class="list-content" data-dojo-attach-point="contentNode"></ul>', '{%! $.moreTemplate %}', '</div>']),
    rowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.Description %}" data-activity-type="{%: $.Type %}">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.activityIconByType[$.Type] %}">', '</button>', '</td>', '<td class="entry-table-time">{%! $$.timeTemplate %}</td>', '<td class="entry-table-description">{%! $$.itemTemplate %}</td>', '</tr></table>', '</li>']),
    eventRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">', '<table class="calendar-entry-table"><tr>', '<td class="entry-table-icon">', '<button data-action="selectEntry" class="list-item-selector button {%= $$.eventIcon %}">', '</button>', '</td>', '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>', '</tr></table>', '</li>']),
    timeTemplate: new Simplate(['{% if ($.Timeless) { %}', '<span class="p-time">{%= $$.allDayText %}</span>', '{% } else { %}', '<span class="p-time">{%: crm.Format.date($.StartDate, $$.startTimeFormatText) %}</span>', '{% } %}']),
    itemTemplate: new Simplate(['<h3 class="p-description">{%: $.Description %}</h3>', '<h4>{%= $$.nameTemplate.apply($) %}</h4>']),
    eventItemTemplate: new Simplate(['<h3 class="p-description">{%: $.Description %} ({%: $.Type %})</h3>', '<h4>{%! $$.eventNameTemplate %}</h4>']),
    nameTemplate: new Simplate(['{% if ($.ContactName) { %}', '{%: $.ContactName %} / {%: $.AccountName %}', '{% } else if ($.AccountName) { %}', '{%: $.AccountName %}', '{% } else { %}', '{%: $.LeadName %}', '{% } %}']),
    eventNameTemplate: new Simplate(['{%: crm.Format.date($.StartDate, $$.eventDateFormatText) %}', '&nbsp;-&nbsp;', '{%: crm.Format.date($.EndDate, $$.eventDateFormatText) %}']),
    navigationTemplate: new Simplate(['<div class="split-buttons">', '<button data-tool="today" data-action="getToday" class="button">{%: $.todayText %}</button>', '<button data-tool="selectdate" data-action="selectDate" class="button fa fa-calendar"><span></span></button>', '<button data-tool="day" class="button current">{%: $.dayText %}</button>', '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>', '<button data-tool="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>', '</div>', '<div class="nav-bar">', '<button data-tool="next" data-action="getNextDay" class="button button-next fa fa-arrow-right fa-lg"><span></span></button>', '<button data-tool="prev" data-action="getPrevDay" class="button button-prev fa fa-arrow-left fa-lg"><span></span></button>', '<h3 class="date-text" data-dojo-attach-point="dateNode"></h3>', '</div>']),
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
    activityIconByType: {
      'atToDo': 'fa fa-list-ul',
      'atPhoneCall': 'fa fa-phone',
      'atAppointment': 'fa fa-calendar-o',
      'atLiterature': 'fa fa-book',
      'atPersonal': 'fa fa-check-square-o',
      'atQuestion': 'fa fa-question-circle',
      'atNote': 'fa fa-file-text-o',
      'atEMail': 'fa fa-envelope'
    },
    eventIcon: 'fa fa-calendar-o',
    resourceKind: 'activities',
    pageSize: 1000,

    continuousScrolling: false,

    _onRefresh: function _onRefresh(o) {
      this.inherited(arguments);
      if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
        this.refreshRequired = true;
      }
    },
    init: function init() {
      this.inherited(arguments);
      this.currentDate = (0, _moment2['default'])().startOf('day');
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
      alert(_string['default'].substitute(this.requestErrorText, [response, o])); // eslint-disable-line
      _ErrorManager['default'].addError(response, o, this.options, 'failure');
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
      return _string['default'].substitute(['UserId eq "${0}" and (', '(StartDate gt @${1}@ or EndDate gt @${1}@) and ', 'StartDate lt @${2}@', ')'].join(''), [App.context.user && App.context.user.$key, _convert['default'].toIsoStringFromDate(this.currentDate.clone().startOf('day').toDate()), _convert['default'].toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate())]);
    },
    activateEventMore: function activateEventMore() {
      var view = App.getView('event_related');
      if (view) {
        var where = this.getEventQuery();
        view.show({
          'where': where
        });
      }
    },
    hideEventList: function hideEventList() {
      _domClass['default'].add(this.eventContainerNode, 'event-hidden');
    },
    showEventList: function showEventList() {
      _domClass['default'].remove(this.eventContainerNode, 'event-hidden');
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
        _domClass['default'].add(this.eventContainerNode, 'list-has-more');
        this.set('eventRemainingContent', this.eventMoreText);
      } else {
        _domClass['default'].remove(this.eventContainerNode, 'list-has-more');
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
        _domConstruct['default'].place(o.join(''), this.contentNode, 'last');
      }

      this.set('remainingContent', ''); // Feed does not return reliable data, don't show remaining

      _domClass['default'].toggle(this.domNode, 'list-has-more', this.hasMoreData()); // This could be wrong, handle it on the next processFeed if so

      if (this.options.allowEmptySelection) {
        _domClass['default'].add(this.domNode, 'list-has-empty-opt');
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
        this.currentDate = (0, _moment2['default'])(options.currentDate).startOf('day') || (0, _moment2['default'])().startOf('day');
        this.refreshRequired = true;
      }
    },
    isLoading: function isLoading() {
      return _domClass['default'].contains(this.domNode, 'list-loading');
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

      if (this.currentDate === (0, _moment2['default'])().startOf('day')) {
        return;
      }

      this.currentDate = (0, _moment2['default'])().startOf('day');
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

      return _string['default'].substitute(queryWhere, [App.context.user && App.context.user.$key, _convert['default'].toIsoStringFromDate(startDate), _convert['default'].toIsoStringFromDate(endDate), this.currentDate.format('YYYY-MM-DDT00:00:00[Z]'), this.currentDate.format('YYYY-MM-DDT23:59:59[Z]')]);
    },
    selectEntry: function selectEntry(params) {
      var row = (0, _query['default'])(params.$source).closest('[data-key]')[0];
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
      this.currentDate = (0, _moment2['default'])(view.getDateTime()).startOf('day');
      this.refresh();
      ReUI.back();
    },
    navigateToWeekView: function navigateToWeekView() {
      var view = App.getView(this.weekView);
      var navDate = this.currentDate ? this.currentDate : (0, _moment2['default'])().startOf('day');
      var options = {
        currentDate: navDate.valueOf()
      };
      view.show(options);
    },
    navigateToMonthView: function navigateToMonthView() {
      var view = App.getView(this.monthView);
      var navDate = this.currentDate ? this.currentDate : (0, _moment2['default'])().startOf('day');
      var options = {
        currentDate: navDate.valueOf()
      };
      view.show(options);
    },
    navigateToInsertView: function navigateToInsertView() {
      var view = App.getView(this.insertView || this.editView);

      this.options.currentDate = this.currentDate.format('YYYY-MM-DD') || (0, _moment2['default'])().startOf('day');
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

  _lang['default'].setObject('Mobile.SalesLogix.Views.Calendar.DayView', __class);
  module.exports = __class;
});
