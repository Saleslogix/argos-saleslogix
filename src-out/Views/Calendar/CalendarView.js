define('crm/Views/Calendar/CalendarView', ['module', 'exports', 'argos/Convert', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/on', 'dojo/string', 'dojo/when', 'argos/Calendar', 'argos/List', '../../Utility', 'argos/I18n', '../../Models/Activity/ActivityTypeIcon'], function (module, exports, _Convert, _declare, _lang, _on, _string, _when, _Calendar, _List, _Utility, _I18n, _ActivityTypeIcon) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Convert2 = _interopRequireDefault(_Convert);

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _on2 = _interopRequireDefault(_on);

  var _string2 = _interopRequireDefault(_string);

  var _when2 = _interopRequireDefault(_when);

  var _Calendar2 = _interopRequireDefault(_Calendar);

  var _List2 = _interopRequireDefault(_List);

  var _Utility2 = _interopRequireDefault(_Utility);

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

  var resource = (0, _I18n2.default)('calendarView'); /* Copyright 2017 Infor
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

  var dtFormatResource = (0, _I18n2.default)('calendarViewDateTimeFormat');

  var __class = (0, _declare2.default)('crm.Views.Calendar.CalendarView', [_List2.default], {
    // Localization
    titleText: resource.titleText,
    monthTitleFormatText: dtFormatResource.monthTitleFormatText,
    dayTitleFormatText: dtFormatResource.dayTitleFormatText,
    eventDateFormatText: dtFormatResource.eventDateFormatText,
    startTimeFormatText: dtFormatResource.startTimeFormatText,
    startTimeFormatText24: dtFormatResource.startTimeFormatText24,
    dayHeaderFormat: dtFormatResource.dayHeaderFormat,
    allDayText: resource.allDayText,
    eventText: resource.eventText,
    eventHeaderText: resource.eventHeaderText,
    countMoreText: resource.countMoreText,
    toggleCollapseText: resource.toggleCollapseText,
    withText: resource.withText,
    unspecifiedText: resource.unspecifiedText,
    forText: resource.forText,
    dayText: resource.dayText,
    weekText: resource.weekText,
    addUnscheduledText: resource.addUnscheduledText,

    enablePullToRefresh: true,
    string: _string2.default,
    Utility: _Utility2.default,
    trimTo: 16,
    activityTypeIcon: activityTypeIcons.default,

    // Templates
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" data-title="{%= $.titleText %}" class="overthrow panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>', '<div class="overthrow scroller" data-dojo-attach-point="scrollerNode">', '<div class="panel-content">', '<div class="calendarContainer" data-dojo-attach-point="calendarNode"></div>', '<div class="event-content event-hidden listview" data-dojo-attach-point="eventContainerNode">', '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>', '{%! $.eventMoreTemplate %}', '</div>', '<div class="activity-content listview" data-dojo-attach-point="activityContainerNode">', '<ul class="list-content" data-dojo-attach-point="activityContentNode"></ul>', '{%! $.activityMoreTemplate %}', '</div>', '<div style="clear:both"></div>', '</div>', '</div>', '</div>']),
    activityRowTemplate: new Simplate(['<li class="activityEntry" data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">', '{%! $$.activityIconTemplate %}', '{%! $$.activityHeaderTemplate %}', '{%! $$.activityContentTemplate %}', '{%! $$.activityFooterTemplate %}', '</li>']),
    activityIconTemplate: new Simplate(['<div class="activityEntry__icon">', '<button type="button" class="btn-icon hide-focus">\n      <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%= $$.activityTypeIcon[$.Type] %}"></use>\n      </svg>\n    </button></div>']),
    activityHeaderTemplate: new Simplate(['<div class="activityEntry__header">', '<div class="header__content">', '<p class="listview-heading">{%: $.Description %}</p>', '<p class="listview-subheading">{%! $$.activityNameTemplate %}</p>', '</div>', '<div class="header__timeStamp">', '<span class="timeStamp__time listview-subheading">', '{% if ($.Timeless) { %}', '{%= $$.allDayText %}', '{% } else if ($$.activityTypeIcon[$.Type]) { %}', '{%: crm.Format.date($.StartDate, (App.is24HourClock()) ? $$.startTimeFormatText24 : $$.startTimeFormatText) %}', '{% } else { %}', '{%! $$.eventTimeTemplate %}', '{% } %}', '</span>', '</div>', '</div>']),
    activityContentTemplate: new Simplate(['<div class="activityEntry__content">', '{% if ($.Notes) { %}', '{%: $$.Utility.trimText($.Notes, $$.trimTo) %}', '{% } %}', '</div>']),
    activityFooterTemplate: new Simplate(['<div class="activityEntry__footer">', '</div>']),
    activityNameTemplate: new Simplate(['{% if ($.ContactName) { %}', '{%= $$.string.substitute($$.withText, { object: $.ContactName }) %}', '{% } else if ($.LeadName) { %}', '{%= $$.string.substitute($$.withText, { object: $.LeadName }) %}', '{% } else if ($$.activityTypeIcon[$.Type]) { %}', '{%= $$.string.substitute($$.withText, { object: $$.unspecifiedText }) %}', '{% } else { %}', '{%= $$.string.substitute($$.forText, { reason: $.Type }) %}', '{% } %}']),
    activityMoreTemplate: new Simplate(['<div class="list-more" data-dojo-attach-point="activityMoreNode">', '<button class="button" data-action="activateActivityMore">', '<span data-dojo-attach-point="activityRemainingContentNode">{%= $.countMoreText %}</span>', '</button>', '</div>']),
    eventRowTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">', '{%! $$.eventIconTemplate %}', '{%! $$.activityHeaderTemplate %}', '{%! $$.activityFooterTemplate %}', '</li>']),
    eventTimeTemplate: new Simplate(['{%: crm.Format.date($.StartDate, $$.eventDateFormatText) %}', '&nbsp;-&nbsp;', '{%: crm.Format.date($.EndDate, $$.eventDateFormatText) %}']),
    eventIconTemplate: new Simplate(['<div class="activityEntry__icon">', '<button type="button" class="btn-icon hide-focus">\n      <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-{%= $$.activityTypeIcon.event %}"></use>\n      </svg>\n    </button>', '</div>']),
    eventMoreTemplate: new Simplate(['<div class="list-more" data-dojo-attach-point="eventMoreNode">', '<button class="button" data-action="activateEventMore">', '<span data-dojo-attach-point="eventRemainingContentNode">{%= $.countMoreText %}</span>', '</button>', '</div>']),
    headerRowTemplate: new Simplate(['<li data-descriptor="{%: $.day %}">', '<div class="dayHeader">', '<h4 class="header__title">{%: $.day %}</h4>', '</div>', '</li>']),
    weekSelectTemplate: new Simplate(['<div class="switch">\n        <input\n          type="checkbox"\n          name="weekToggleNode"\n          id="weekToggleNode"\n          class="switch" />\n        <label class="toggleWeekOrDay" for="weekToggleNode">{%= $.dayText %}</label>\n      </div>']),
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
    id: 'calendar_view',
    cls: 'activities-for-month',
    insertView: 'activity_types_list',
    activityDetailView: 'activity_detail',
    eventDetailView: 'event_detail',
    enableSearch: false,
    dateCounts: null,
    currentDate: null,
    monthActivities: null,
    monthEvents: null,
    multiSelect: 7,
    _dataLoaded: false,
    _eventStore: null,
    _showMulti: false,
    _refreshAdded: false,
    _newUnscheduledAdded: false,

    queryOrderBy: 'StartDate asc',
    querySelect: ['StartDate', 'Description', 'Type', 'AccountName', 'ContactName', 'LeadId', 'LeadName', 'UserId', 'Timeless', 'Recurring', 'Notes'],
    queryInclude: ['$descriptors', '$permissions'],
    resourceKind: 'activities',
    contractName: 'system',
    pageSize: 500,
    eventQueryWhere: null,
    eventQuerySelect: ['StartDate', 'EndDate', 'Description', 'Type'],
    eventInclude: ['$permissions'],
    eventResourceKind: 'events',
    eventContractName: 'dynamic',

    _onRefresh: function _onRefresh(o) {
      this.inherited(_onRefresh, arguments);
      if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
        this.refreshRequired = true;
      }
    },
    changeDayActivities: function changeDayActivities() {
      $(this.activityContainerNode).removeClass('list-loading');
      var multiDays = [];
      var entries = void 0;

      if (this._showMulti) {
        var dateIterator = this.currentDate.clone().startOf('week');
        for (var i = 0; i < this.multiSelect; i++) {
          entries = this.monthActivities[dateIterator.format('YYYY-MM-DD')];
          if (entries) {
            multiDays = multiDays.concat(entries);
          }
          this.createActivityRows(entries, dateIterator.format(this.dayHeaderFormat));
          dateIterator.add(1, 'days');
        }
        if (multiDays.length === 0) {
          this.set('activityContent', this.noDataTemplate.apply(this));
        }
      } else {
        entries = this.monthActivities[this.currentDate.format('YYYY-MM-DD')];
        this.createActivityRows(entries, this.currentDate.format(this.dayHeaderFormat));
        if (!entries) {
          this.set('activityContent', this.noDataTemplate.apply(this));
        }
      }

      return;
    },
    createActivityRows: function createActivityRows() {
      var entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var day = arguments[1];

      var count = entries.length;
      if (count > 0) {
        var activityDocfrag = document.createDocumentFragment();
        var eventDocfrag = document.createDocumentFragment();
        if (this._showMulti) {
          var headerNode = $(this.headerRowTemplate.apply({ day: day }, this)).get(0);
          // Create the day header for whatever type comes first (activity or event)
          var first = this.entries[entries[0]];
          if (this.activityTypeIcon[first.Type]) {
            activityDocfrag.appendChild(headerNode);
          } else {
            eventDocfrag.appendChild(headerNode);
          }
        }
        for (var i = 0; i < count; i++) {
          var entry = this.entries[entries[i]];
          var rowNode = void 0;
          if (this.activityTypeIcon[entry.Type]) {
            try {
              rowNode = $(this.activityRowTemplate.apply(entry, this)).get(0);
            } catch (err) {
              console.error(err); // eslint-disable-line
              rowNode = $(this.rowTemplateError.apply(entry, this)).get(0);
            }

            activityDocfrag.appendChild(rowNode);
          } else {
            try {
              rowNode = $(this.eventRowTemplate.apply(entry, this)).get(0);
            } catch (err) {
              console.error(err); // eslint-disable-line
              rowNode = $(this.rowTemplateError.apply(entry, this)).get(0);
            }

            eventDocfrag.appendChild(rowNode);
          }
          this.onApplyRowTemplate(entry, rowNode);
        }

        if (activityDocfrag.childNodes.length > 0) {
          $(this.activityContentNode).append(activityDocfrag);
        }
        if (eventDocfrag.childNodes.length > 0) {
          $(this.eventContainerNode).removeClass('event-hidden');
          $(this.eventContentNode).append(eventDocfrag);
        }
      }
    },
    createEventStore: function createEventStore() {
      if (this._eventStore) {
        return this._eventStore;
      }
      var temp = this.get('store');
      var store = Object.assign({}, temp);
      Object.setPrototypeOf(store, Object.getPrototypeOf(temp));
      store.select = this.eventQuerySelect;
      store.resourceKind = this.eventResourceKind;
      store.contractName = this.eventContractName;
      store.orderBy = this.eventOrderBy;
      store.include = this.eventInclude;
      this._eventStore = store;
      return store;
    },
    formatQueryActivity: function formatQueryActivity(value) {
      var startDate = value.clone().startOf('month');
      var endDate = value.clone().endOf('month');
      return _string2.default.substitute(['UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (', '(Timeless eq false and StartDate', ' between @${1}@ and @${2}@) or ', '(Timeless eq true and StartDate', ' between @${3}@ and @${4}@))'].join(''), [App.context.user && App.context.user.$key, _Convert2.default.toIsoStringFromDate(startDate.toDate()), _Convert2.default.toIsoStringFromDate(endDate.toDate()), startDate.format('YYYY-MM-DDT00:00:00[Z]'), endDate.format('YYYY-MM-DDT23:59:59[Z]')]);
    },
    formatQueryEvent: function formatQueryEvent(value) {
      var user = App.context.user && App.context.user.$key;
      var start = _Convert2.default.toIsoStringFromDate(value.clone().startOf('month').toDate());
      var end = _Convert2.default.toIsoStringFromDate(value.clone().endOf('month').toDate());
      return 'UserId eq "' + user + '" and ((StartDate gt @' + start + '@ or EndDate gt @' + start + '@) and StartDate lt @' + end + '@)';
    },
    highlightActivities: function highlightActivities() {
      var _this = this;

      this._calendar.weeksNode.childNodes.forEach(function (week) {
        week.childNodes.forEach(function (day) {
          if (!_this.monthActivities[$(day).attr('data-date')]) {
            _this._calendar.removeActive(day);
            return;
          }
          if (!_this._calendar.isActive(day)) {
            day.subValue = _this.monthActivities[$(day).attr('data-date')];
            _this._calendar.setActiveDay(day);
          }
        });
      });
      return this;
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
    createToolLayout: function createToolLayout() {
      this.inherited(createToolLayout, arguments);
      if (this.tools && this.tools.tbar && !this._newUnscheduledAdded) {
        this.tools.tbar.unshift({
          id: 'newUnscheduled',
          svg: 'add',
          title: this.addUnscheduledText,
          action: 'navigateToNewUnscheduled',
          security: this.app.getViewSecurity(this.insertView, 'insert')
        });
        this._newUnscheduledAdded = true;
      }

      return this.tools;
    },
    navigateToNewUnscheduled: function navigateToNewUnscheduled() {
      var additionalOptions = {
        unscheduled: true
      };

      this.navigateToInsertView(additionalOptions);
    },
    onToolLayoutCreated: function onToolLayoutCreated(tools) {
      if (tools && !this._refreshAdded && !window.App.supportsTouch()) {
        var refreshTool = {
          id: 'refresh',
          svg: 'refresh',
          action: 'refresh'

        };
        if (tools.tbar) {
          tools.tbar.unshift(refreshTool);
          this._refreshAdded = true;
        }
      }
      this.inherited(onToolLayoutCreated, arguments);
    },
    process: function process(store, entries, isEvent) {
      var _this2 = this;

      if (entries.length > 0) {
        entries.forEach(function (entryPreProcess) {
          var entry = _this2._processEntry(entryPreProcess);
          // If key comes back with nothing, check that the store is properly
          // setup with an idProperty
          entry.isEvent = isEvent;
          var entryKey = store.getIdentity(entry);
          _this2.entries[entryKey] = entry;
          var startDate = moment(_Convert2.default.toDateFromString(entry.StartDate));
          if (entry.Timeless) {
            startDate.subtract({
              minutes: startDate.utcOffset()
            });
          }
          var date = startDate.format('YYYY-MM-DD');
          if (_this2.monthActivities[date]) {
            _this2.monthActivities[date].push(entryKey);
          } else {
            _this2.monthActivities[date] = [entryKey];
          }
        });
      }
    },
    processData: function processData(entries) {
      if (!entries) {
        return;
      }

      var store = this.get('store');

      this.process(store, entries, false);
    },
    processEventData: function processEventData(entries) {
      if (!entries) {
        return;
      }
      var store = this.createEventStore();

      this.process(store, entries, true);
    },
    processShowOptions: function processShowOptions(options) {
      if (options.currentDate) {
        this.currentDate = moment(options.currentDate).startOf('day') || moment().clone().startOf('day');
        this.refreshRequired = true;
      }
    },
    refresh: function refresh() {
      this.renderCalendar();
      this.refreshData();
    },
    refreshData: function refreshData() {
      var _this3 = this;

      this._dataLoaded = false;
      this._eventStore = null;
      $(this.activityContainerNode).addClass('list-loading');
      this.set('activityContent', this.loadingTemplate.apply(this));
      $(this.eventContentNode).empty();
      this.currentDate = this._calendar.getSelectedDateMoment();
      this.queryText = '';
      this.monthActivities = [];
      this.activityQuery = this.formatQueryActivity(this.currentDate);
      this.eventQuery = this.formatQueryEvent(this.currentDate);
      Promise.all([this.requestData(), this.requestEventData()]).then(function () {
        $(_this3.activityContentNode).empty();
        $(_this3.eventContentNode).empty();
        _this3.highlightActivities();
        _this3.changeDayActivities();
        _this3._dataLoaded = true;
      });
    },
    render: function render() {
      this.inherited(render, arguments);
      this.renderCalendar();
    },
    renderCalendar: function renderCalendar() {
      if (!this._calendar) {
        this._calendar = new _Calendar2.default({ id: 'calendar-view__calendar', noClearButton: true });
        $(this.calendarNode).append(this._calendar.domNode);
        var toggle = $(this.weekSelectTemplate.apply(this)).get(0);
        $(this._calendar.footerNode).append(toggle);
        (0, _on2.default)($(toggle).children()[0], 'click', this.toggleMultiSelect.bind(this));
        this._calendar.onChangeDay = this.onChangeDay.bind(this);
        this._calendar.show();
        this._calendar.onRefreshCalendar = this.onRefreshCalendar.bind(this); // Must be called after show because this will call requestData since show calls refreshCalendar
      } else {
        this.refreshingCalendar = true;
        this._calendar.refresh(false);
      }
    },
    onRefreshCalendar: function onRefreshCalendar(refresh) {
      if (refresh) {
        this.refreshData();
      }
    },
    onChangeDay: function onChangeDay() {
      this.selectDay();
    },
    requestData: function requestData() {
      var store = this.get('store');
      if (store) {
        // attempt to use a dojo store
        var queryOptions = {
          count: this.pageSize,
          start: this.position
        };

        this._applyStateToQueryOptions(queryOptions);

        var queryExpression = this._buildQueryExpression(this.activityQuery) || null;
        var queryResults = store.query(queryExpression, queryOptions);

        (0, _when2.default)(queryResults, this.processData.bind(this), this._onQueryError.bind(this, queryOptions));

        return queryResults;
      }

      console.warn('Error requesting data, no store was defined. Did you mean to mixin _SDataListMixin to your list view?'); // eslint-disable-line
    },
    requestEventData: function requestEventData() {
      var store = this.createEventStore();
      if (store) {
        // attempt to use a dojo store
        var queryOptions = {
          count: this.pageSize,
          start: this.position
        };

        this._applyStateToQueryOptions(queryOptions);

        var queryExpression = this._buildQueryExpression(this.eventQuery) || null;
        var queryResults = store.query(queryExpression, queryOptions);

        (0, _when2.default)(queryResults, this.processEventData.bind(this), this._onQueryError.bind(this, queryOptions));

        return queryResults;
      }

      console.warn('Error requesting data, no store was defined. Did you mean to mixin _SDataListMixin to your list view?'); // eslint-disable-line
    },
    selectDay: function selectDay() {
      var selected = this._calendar.getSelectedDateMoment();
      if (this.currentDate && this._dataLoaded) {
        $(this.activityContentNode).empty();
        $(this.eventContentNode).empty();
        this.currentDate = selected;
        this.changeDayActivities();
      } else {
        this.currentDate = selected;
      }
    },
    show: function show(options) {
      this.inherited(show, arguments);

      if (options) {
        this.processShowOptions(options);
      } else {
        this.refreshRequired = true;
        this.renderCalendar();
      }
    },
    startup: function startup() {
      this.inherited(startup, arguments);
    },
    toggleMultiSelect: function toggleMultiSelect(_ref) {
      var currentTarget = _ref.currentTarget;

      this._showMulti = !this._showMulti;
      if (this._showMulti) {
        $(currentTarget).next().html(this.weekText);
      } else {
        $(currentTarget).next().html(this.dayText);
      }

      this._calendar.toggleSelectWeek();
      $(this.activityContentNode).empty();
      $(this.eventContentNode).empty();
      this.changeDayActivities();
    },
    _buildQueryExpression: function _buildQueryExpression() {
      var queryParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _lang2.default.mixin(queryParam || {}, this.options && (this.options.query || this.options.where));
    },
    transitionAway: function transitionAway() {
      $(this._calendar._monthDropdown.dropdownSelect).data('dropdown').close();
      $(this._calendar._yearDropdown.dropdownSelect).data('dropdown').close();
      this.inherited(transitionAway, arguments);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});