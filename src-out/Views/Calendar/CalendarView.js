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

  /**
   * @class crm.Views.Calendar.CalendarView
   *
   * @extends argos.List
   * @mixins argos.List
   *
   * @requires argos.List
   * @requires argos.Convert
   *
   * @requires crm.Format
   * @requires crm.Utility
   *
   * @requires moment
   *
   */
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
    withFromText: resource.withFromText,
    withText: resource.withText,
    unspecifiedText: resource.unspecifiedText,
    forText: resource.forText,
    dayText: resource.dayText,
    weekText: resource.weekText,

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
    activityNameTemplate: new Simplate(['{% if ($.ContactName) { %}', '{%= $$.string.substitute($$.withFromText, { contactName: $$.parseName($.ContactName), accountName: $.AccountName }) %}', '{% } else if ($.AccountName) { %}', '{%= $$.string.substitute($$.withText, { object: $.AccountName }) %}', '{% } else if ($.LeadName) { %}', '{%= $$.string.substitute($$.withText, { object: $.LeadName }) %}', '{% } else if ($$.activityTypeIcon[$.Type]) { %}', '{%= $$.string.substitute($$.withText, { object: $$.unspecifiedText }) %}', '{% } else { %}', '{%= $$.string.substitute($$.forText, { reason: $.Type }) %}', '{% } %}']),
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
    onToolLayoutCreated: function onToolLayoutCreated(tools) {
      if (tools && !this._refreshAdded && !window.App.supportsTouch()) {
        var refreshTool = {
          id: 'refresh',
          svg: 'refresh',
          action: 'refresh'

        };
        if (tools.tbar) {
          tools.tbar.push(refreshTool);
          this._refreshAdded = true;
        }
      }
      this.inherited(onToolLayoutCreated, arguments);
    },
    parseName: function parseName() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return name.split(' ').splice(-1)[0];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DYWxlbmRhci9DYWxlbmRhclZpZXcuanMiXSwibmFtZXMiOlsiYWN0aXZpdHlUeXBlSWNvbnMiLCJyZXNvdXJjZSIsImR0Rm9ybWF0UmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwibW9udGhUaXRsZUZvcm1hdFRleHQiLCJkYXlUaXRsZUZvcm1hdFRleHQiLCJldmVudERhdGVGb3JtYXRUZXh0Iiwic3RhcnRUaW1lRm9ybWF0VGV4dCIsInN0YXJ0VGltZUZvcm1hdFRleHQyNCIsImRheUhlYWRlckZvcm1hdCIsImFsbERheVRleHQiLCJldmVudFRleHQiLCJldmVudEhlYWRlclRleHQiLCJjb3VudE1vcmVUZXh0IiwidG9nZ2xlQ29sbGFwc2VUZXh0Iiwid2l0aEZyb21UZXh0Iiwid2l0aFRleHQiLCJ1bnNwZWNpZmllZFRleHQiLCJmb3JUZXh0IiwiZGF5VGV4dCIsIndlZWtUZXh0IiwiZW5hYmxlUHVsbFRvUmVmcmVzaCIsInN0cmluZyIsIlV0aWxpdHkiLCJ0cmltVG8iLCJhY3Rpdml0eVR5cGVJY29uIiwiZGVmYXVsdCIsIndpZGdldFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJhY3Rpdml0eVJvd1RlbXBsYXRlIiwiYWN0aXZpdHlJY29uVGVtcGxhdGUiLCJhY3Rpdml0eUhlYWRlclRlbXBsYXRlIiwiYWN0aXZpdHlDb250ZW50VGVtcGxhdGUiLCJhY3Rpdml0eUZvb3RlclRlbXBsYXRlIiwiYWN0aXZpdHlOYW1lVGVtcGxhdGUiLCJhY3Rpdml0eU1vcmVUZW1wbGF0ZSIsImV2ZW50Um93VGVtcGxhdGUiLCJldmVudFRpbWVUZW1wbGF0ZSIsImV2ZW50SWNvblRlbXBsYXRlIiwiZXZlbnRNb3JlVGVtcGxhdGUiLCJoZWFkZXJSb3dUZW1wbGF0ZSIsIndlZWtTZWxlY3RUZW1wbGF0ZSIsImF0dHJpYnV0ZU1hcCIsImNhbGVuZGFyQ29udGVudCIsIm5vZGUiLCJ0eXBlIiwiZGF0ZUNvbnRlbnQiLCJkYXlUaXRsZUNvbnRlbnQiLCJhY3Rpdml0eUNvbnRlbnQiLCJldmVudENvbnRlbnQiLCJldmVudFJlbWFpbmluZ0NvbnRlbnQiLCJhY3Rpdml0eVJlbWFpbmluZ0NvbnRlbnQiLCJldmVudENvbnRhaW5lck5vZGUiLCJhY3Rpdml0eUNvbnRhaW5lck5vZGUiLCJpZCIsImNscyIsImluc2VydFZpZXciLCJhY3Rpdml0eURldGFpbFZpZXciLCJldmVudERldGFpbFZpZXciLCJlbmFibGVTZWFyY2giLCJkYXRlQ291bnRzIiwiY3VycmVudERhdGUiLCJtb250aEFjdGl2aXRpZXMiLCJtb250aEV2ZW50cyIsIm11bHRpU2VsZWN0IiwiX2RhdGFMb2FkZWQiLCJfZXZlbnRTdG9yZSIsIl9zaG93TXVsdGkiLCJfcmVmcmVzaEFkZGVkIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJwYWdlU2l6ZSIsImV2ZW50UXVlcnlXaGVyZSIsImV2ZW50UXVlcnlTZWxlY3QiLCJldmVudEluY2x1ZGUiLCJldmVudFJlc291cmNlS2luZCIsImV2ZW50Q29udHJhY3ROYW1lIiwiX29uUmVmcmVzaCIsIm8iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJyZWZyZXNoUmVxdWlyZWQiLCJjaGFuZ2VEYXlBY3Rpdml0aWVzIiwiJCIsInJlbW92ZUNsYXNzIiwibXVsdGlEYXlzIiwiZW50cmllcyIsImRhdGVJdGVyYXRvciIsImNsb25lIiwic3RhcnRPZiIsImkiLCJmb3JtYXQiLCJjb25jYXQiLCJjcmVhdGVBY3Rpdml0eVJvd3MiLCJhZGQiLCJsZW5ndGgiLCJzZXQiLCJub0RhdGFUZW1wbGF0ZSIsImFwcGx5IiwiZGF5IiwiY291bnQiLCJhY3Rpdml0eURvY2ZyYWciLCJkb2N1bWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJldmVudERvY2ZyYWciLCJoZWFkZXJOb2RlIiwiZ2V0IiwiZmlyc3QiLCJUeXBlIiwiYXBwZW5kQ2hpbGQiLCJlbnRyeSIsInJvd05vZGUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJyb3dUZW1wbGF0ZUVycm9yIiwib25BcHBseVJvd1RlbXBsYXRlIiwiY2hpbGROb2RlcyIsImFjdGl2aXR5Q29udGVudE5vZGUiLCJhcHBlbmQiLCJldmVudENvbnRlbnROb2RlIiwiY3JlYXRlRXZlbnRTdG9yZSIsInRlbXAiLCJzdG9yZSIsIk9iamVjdCIsImFzc2lnbiIsInNldFByb3RvdHlwZU9mIiwiZ2V0UHJvdG90eXBlT2YiLCJzZWxlY3QiLCJvcmRlckJ5IiwiZXZlbnRPcmRlckJ5IiwiaW5jbHVkZSIsImZvcm1hdFF1ZXJ5QWN0aXZpdHkiLCJ2YWx1ZSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJlbmRPZiIsInN1YnN0aXR1dGUiLCJqb2luIiwiQXBwIiwiY29udGV4dCIsInVzZXIiLCIka2V5IiwidG9Jc29TdHJpbmdGcm9tRGF0ZSIsInRvRGF0ZSIsImZvcm1hdFF1ZXJ5RXZlbnQiLCJzdGFydCIsImVuZCIsImhpZ2hsaWdodEFjdGl2aXRpZXMiLCJfY2FsZW5kYXIiLCJ3ZWVrc05vZGUiLCJmb3JFYWNoIiwid2VlayIsImF0dHIiLCJyZW1vdmVBY3RpdmUiLCJpc0FjdGl2ZSIsInN1YlZhbHVlIiwic2V0QWN0aXZlRGF5IiwibmF2aWdhdGVUb0RldGFpbFZpZXciLCJrZXkiLCJfZGVzY3JpcHRvciIsImRlc2NyaXB0b3IiLCJkZXRhaWxWaWV3IiwiaXNFdmVudCIsInZpZXciLCJnZXRWaWV3IiwiRGVzY3JpcHRpb24iLCJzaG93IiwidGl0bGUiLCJuYXZpZ2F0ZVRvSW5zZXJ0VmlldyIsImVkaXRWaWV3Iiwib3B0aW9ucyIsInRvU3RyaW5nIiwibW9tZW50IiwibmVnYXRlSGlzdG9yeSIsInJldHVyblRvIiwiaW5zZXJ0IiwidmFsdWVPZiIsIm9uVG9vbExheW91dENyZWF0ZWQiLCJ0b29scyIsIndpbmRvdyIsInN1cHBvcnRzVG91Y2giLCJyZWZyZXNoVG9vbCIsInN2ZyIsImFjdGlvbiIsInRiYXIiLCJwdXNoIiwicGFyc2VOYW1lIiwibmFtZSIsInNwbGl0Iiwic3BsaWNlIiwicHJvY2VzcyIsImVudHJ5UHJlUHJvY2VzcyIsIl9wcm9jZXNzRW50cnkiLCJlbnRyeUtleSIsImdldElkZW50aXR5IiwidG9EYXRlRnJvbVN0cmluZyIsIlN0YXJ0RGF0ZSIsIlRpbWVsZXNzIiwic3VidHJhY3QiLCJtaW51dGVzIiwidXRjT2Zmc2V0IiwiZGF0ZSIsInByb2Nlc3NEYXRhIiwicHJvY2Vzc0V2ZW50RGF0YSIsInByb2Nlc3NTaG93T3B0aW9ucyIsInJlZnJlc2giLCJyZW5kZXJDYWxlbmRhciIsInJlZnJlc2hEYXRhIiwiYWRkQ2xhc3MiLCJsb2FkaW5nVGVtcGxhdGUiLCJlbXB0eSIsImdldFNlbGVjdGVkRGF0ZU1vbWVudCIsInF1ZXJ5VGV4dCIsImFjdGl2aXR5UXVlcnkiLCJldmVudFF1ZXJ5IiwiUHJvbWlzZSIsImFsbCIsInJlcXVlc3REYXRhIiwicmVxdWVzdEV2ZW50RGF0YSIsInRoZW4iLCJyZW5kZXIiLCJub0NsZWFyQnV0dG9uIiwiY2FsZW5kYXJOb2RlIiwiZG9tTm9kZSIsInRvZ2dsZSIsImZvb3Rlck5vZGUiLCJjaGlsZHJlbiIsInRvZ2dsZU11bHRpU2VsZWN0IiwiYmluZCIsIm9uQ2hhbmdlRGF5Iiwib25SZWZyZXNoQ2FsZW5kYXIiLCJyZWZyZXNoaW5nQ2FsZW5kYXIiLCJzZWxlY3REYXkiLCJxdWVyeU9wdGlvbnMiLCJwb3NpdGlvbiIsIl9hcHBseVN0YXRlVG9RdWVyeU9wdGlvbnMiLCJxdWVyeUV4cHJlc3Npb24iLCJfYnVpbGRRdWVyeUV4cHJlc3Npb24iLCJxdWVyeVJlc3VsdHMiLCJxdWVyeSIsIl9vblF1ZXJ5RXJyb3IiLCJ3YXJuIiwic2VsZWN0ZWQiLCJzdGFydHVwIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJodG1sIiwidG9nZ2xlU2VsZWN0V2VlayIsInF1ZXJ5UGFyYW0iLCJtaXhpbiIsIndoZXJlIiwidHJhbnNpdGlvbkF3YXkiLCJfbW9udGhEcm9wZG93biIsImRyb3Bkb3duU2VsZWN0IiwiZGF0YSIsImNsb3NlIiwiX3llYXJEcm9wZG93biJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXlCWUEsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWixNQUFNQyxXQUFXLG9CQUFZLGNBQVosQ0FBakIsQyxDQTNCQTs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLE1BQU1DLG1CQUFtQixvQkFBWSw0QkFBWixDQUF6Qjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsTUFBTUMsVUFBVSx1QkFBUSxpQ0FBUixFQUEyQyxnQkFBM0MsRUFBbUQ7QUFDakU7QUFDQUMsZUFBV0gsU0FBU0csU0FGNkM7QUFHakVDLDBCQUFzQkgsaUJBQWlCRyxvQkFIMEI7QUFJakVDLHdCQUFvQkosaUJBQWlCSSxrQkFKNEI7QUFLakVDLHlCQUFxQkwsaUJBQWlCSyxtQkFMMkI7QUFNakVDLHlCQUFxQk4saUJBQWlCTSxtQkFOMkI7QUFPakVDLDJCQUF1QlAsaUJBQWlCTyxxQkFQeUI7QUFRakVDLHFCQUFpQlIsaUJBQWlCUSxlQVIrQjtBQVNqRUMsZ0JBQVlWLFNBQVNVLFVBVDRDO0FBVWpFQyxlQUFXWCxTQUFTVyxTQVY2QztBQVdqRUMscUJBQWlCWixTQUFTWSxlQVh1QztBQVlqRUMsbUJBQWViLFNBQVNhLGFBWnlDO0FBYWpFQyx3QkFBb0JkLFNBQVNjLGtCQWJvQztBQWNqRUMsa0JBQWNmLFNBQVNlLFlBZDBDO0FBZWpFQyxjQUFVaEIsU0FBU2dCLFFBZjhDO0FBZ0JqRUMscUJBQWlCakIsU0FBU2lCLGVBaEJ1QztBQWlCakVDLGFBQVNsQixTQUFTa0IsT0FqQitDO0FBa0JqRUMsYUFBU25CLFNBQVNtQixPQWxCK0M7QUFtQmpFQyxjQUFVcEIsU0FBU29CLFFBbkI4Qzs7QUFxQmpFQyx5QkFBcUIsSUFyQjRDO0FBc0JqRUMsNEJBdEJpRTtBQXVCakVDLDhCQXZCaUU7QUF3QmpFQyxZQUFRLEVBeEJ5RDtBQXlCakVDLHNCQUFrQjFCLGtCQUFrQjJCLE9BekI2Qjs7QUEyQmpFO0FBQ0FDLG9CQUFnQixJQUFJQyxRQUFKLENBQWEsQ0FDM0IsMEtBRDJCLEVBRTNCLHdFQUYyQixFQUczQiw2QkFIMkIsRUFJM0IsNkVBSjJCLEVBSzNCLCtGQUwyQixFQU0zQiwwRUFOMkIsRUFPM0IsNEJBUDJCLEVBUTNCLFFBUjJCLEVBUzNCLHdGQVQyQixFQVUzQiw2RUFWMkIsRUFXM0IsK0JBWDJCLEVBWTNCLFFBWjJCLEVBYTNCLGdDQWIyQixFQWMzQixRQWQyQixFQWUzQixRQWYyQixFQWdCM0IsUUFoQjJCLENBQWIsQ0E1QmlEO0FBOENqRUMseUJBQXFCLElBQUlELFFBQUosQ0FBYSxDQUNoQywySkFEZ0MsRUFFaEMsZ0NBRmdDLEVBR2hDLGtDQUhnQyxFQUloQyxtQ0FKZ0MsRUFLaEMsa0NBTGdDLEVBTWhDLE9BTmdDLENBQWIsQ0E5QzRDO0FBc0RqRUUsMEJBQXNCLElBQUlGLFFBQUosQ0FBYSxDQUNqQyxtQ0FEaUMsbVNBQWIsQ0F0RDJDO0FBOERqRUcsNEJBQXdCLElBQUlILFFBQUosQ0FBYSxDQUNuQyxxQ0FEbUMsRUFFbkMsK0JBRm1DLEVBR25DLHNEQUhtQyxFQUluQyxtRUFKbUMsRUFLbkMsUUFMbUMsRUFNbkMsaUNBTm1DLEVBT25DLG9EQVBtQyxFQVFuQyx5QkFSbUMsRUFTbkMsc0JBVG1DLEVBVW5DLGlEQVZtQyxFQVduQyxnSEFYbUMsRUFZbkMsZ0JBWm1DLEVBYW5DLDZCQWJtQyxFQWNuQyxTQWRtQyxFQWVuQyxTQWZtQyxFQWdCbkMsUUFoQm1DLEVBaUJuQyxRQWpCbUMsQ0FBYixDQTlEeUM7QUFpRmpFSSw2QkFBeUIsSUFBSUosUUFBSixDQUFhLENBQ3BDLHNDQURvQyxFQUVwQyxzQkFGb0MsRUFHcEMsZ0RBSG9DLEVBSXBDLFNBSm9DLEVBS3BDLFFBTG9DLENBQWIsQ0FqRndDO0FBd0ZqRUssNEJBQXdCLElBQUlMLFFBQUosQ0FBYSxDQUNuQyxxQ0FEbUMsRUFFbkMsUUFGbUMsQ0FBYixDQXhGeUM7QUE0RmpFTSwwQkFBc0IsSUFBSU4sUUFBSixDQUFhLENBQ2pDLDRCQURpQyxFQUVqQyx3SEFGaUMsRUFHakMsbUNBSGlDLEVBSWpDLHFFQUppQyxFQUtqQyxnQ0FMaUMsRUFNakMsa0VBTmlDLEVBT2pDLGlEQVBpQyxFQVFqQywwRUFSaUMsRUFTakMsZ0JBVGlDLEVBVWpDLDZEQVZpQyxFQVdqQyxTQVhpQyxDQUFiLENBNUYyQztBQXlHakVPLDBCQUFzQixJQUFJUCxRQUFKLENBQWEsQ0FDakMsbUVBRGlDLEVBRWpDLDREQUZpQyxFQUdqQywyRkFIaUMsRUFJakMsV0FKaUMsRUFLakMsUUFMaUMsQ0FBYixDQXpHMkM7QUFnSGpFUSxzQkFBa0IsSUFBSVIsUUFBSixDQUFhLENBQzdCLDZIQUQ2QixFQUU3Qiw2QkFGNkIsRUFHN0Isa0NBSDZCLEVBSTdCLGtDQUo2QixFQUs3QixPQUw2QixDQUFiLENBaEgrQztBQXVIakVTLHVCQUFtQixJQUFJVCxRQUFKLENBQWEsQ0FDOUIsNkRBRDhCLEVBRTlCLGVBRjhCLEVBRzlCLDJEQUg4QixDQUFiLENBdkg4QztBQTRIakVVLHVCQUFtQixJQUFJVixRQUFKLENBQWEsQ0FDOUIsbUNBRDhCLDRSQU85QixRQVA4QixDQUFiLENBNUg4QztBQXFJakVXLHVCQUFtQixJQUFJWCxRQUFKLENBQWEsQ0FDOUIsZ0VBRDhCLEVBRTlCLHlEQUY4QixFQUc5Qix3RkFIOEIsRUFJOUIsV0FKOEIsRUFLOUIsUUFMOEIsQ0FBYixDQXJJOEM7QUE0SWpFWSx1QkFBbUIsSUFBSVosUUFBSixDQUFhLENBQzlCLHFDQUQ4QixFQUU5Qix5QkFGOEIsRUFHOUIsNkNBSDhCLEVBSTlCLFFBSjhCLEVBSzlCLE9BTDhCLENBQWIsQ0E1SThDO0FBbUpqRWEsd0JBQW9CLElBQUliLFFBQUosQ0FBYSxvUUFBYixDQW5KNkM7QUE2SmpFYyxrQkFBYztBQUNaQyx1QkFBaUI7QUFDZkMsY0FBTSxhQURTO0FBRWZDLGNBQU07QUFGUyxPQURMO0FBS1pDLG1CQUFhO0FBQ1hGLGNBQU0sVUFESztBQUVYQyxjQUFNO0FBRkssT0FMRDtBQVNaRSx1QkFBaUI7QUFDZkgsY0FBTSxjQURTO0FBRWZDLGNBQU07QUFGUyxPQVRMO0FBYVpHLHVCQUFpQjtBQUNmSixjQUFNLHFCQURTO0FBRWZDLGNBQU07QUFGUyxPQWJMO0FBaUJaSSxvQkFBYztBQUNaTCxjQUFNLGtCQURNO0FBRVpDLGNBQU07QUFGTSxPQWpCRjtBQXFCWkssNkJBQXVCO0FBQ3JCTixjQUFNLDJCQURlO0FBRXJCQyxjQUFNO0FBRmUsT0FyQlg7QUF5QlpNLGdDQUEwQjtBQUN4QlAsY0FBTSw4QkFEa0I7QUFFeEJDLGNBQU07QUFGa0I7QUF6QmQsS0E3Sm1EO0FBMkxqRU8sd0JBQW9CLElBM0w2QztBQTRMakVDLDJCQUF1QixJQTVMMEM7O0FBOExqRTtBQUNBQyxRQUFJLGVBL0w2RDtBQWdNakVDLFNBQUssc0JBaE00RDtBQWlNakVDLGdCQUFZLHFCQWpNcUQ7QUFrTWpFQyx3QkFBb0IsaUJBbE02QztBQW1NakVDLHFCQUFpQixjQW5NZ0Q7QUFvTWpFQyxrQkFBYyxLQXBNbUQ7QUFxTWpFQyxnQkFBWSxJQXJNcUQ7QUFzTWpFQyxpQkFBYSxJQXRNb0Q7QUF1TWpFQyxxQkFBaUIsSUF2TWdEO0FBd01qRUMsaUJBQWEsSUF4TW9EO0FBeU1qRUMsaUJBQWEsQ0F6TW9EO0FBME1qRUMsaUJBQWEsS0ExTW9EO0FBMk1qRUMsaUJBQWEsSUEzTW9EO0FBNE1qRUMsZ0JBQVksS0E1TXFEO0FBNk1qRUMsbUJBQWUsS0E3TWtEOztBQWdOakVDLGtCQUFjLGVBaE5tRDtBQWlOakVDLGlCQUFhLENBQ1gsV0FEVyxFQUVYLGFBRlcsRUFHWCxNQUhXLEVBSVgsYUFKVyxFQUtYLGFBTFcsRUFNWCxRQU5XLEVBT1gsVUFQVyxFQVFYLFFBUlcsRUFTWCxVQVRXLEVBVVgsV0FWVyxFQVdYLE9BWFcsQ0FqTm9EO0FBOE5qRUMsa0JBQWMsQ0FDWixjQURZLEVBRVosY0FGWSxDQTlObUQ7QUFrT2pFQyxrQkFBYyxZQWxPbUQ7QUFtT2pFQyxrQkFBYyxRQW5PbUQ7QUFvT2pFQyxjQUFVLEdBcE91RDtBQXFPakVDLHFCQUFpQixJQXJPZ0Q7QUFzT2pFQyxzQkFBa0IsQ0FDaEIsV0FEZ0IsRUFFaEIsU0FGZ0IsRUFHaEIsYUFIZ0IsRUFJaEIsTUFKZ0IsQ0F0TytDO0FBNE9qRUMsa0JBQWMsQ0FDWixjQURZLENBNU9tRDtBQStPakVDLHVCQUFtQixRQS9POEM7QUFnUGpFQyx1QkFBbUIsU0FoUDhDOztBQWtQakVDLGdCQUFZLFNBQVNBLFVBQVQsQ0FBb0JDLENBQXBCLEVBQXVCO0FBQ2pDLFdBQUtDLFNBQUwsQ0FBZUYsVUFBZixFQUEyQkcsU0FBM0I7QUFDQSxVQUFJRixFQUFFVCxZQUFGLEtBQW1CLFlBQW5CLElBQW1DUyxFQUFFVCxZQUFGLEtBQW1CLFFBQTFELEVBQW9FO0FBQ2xFLGFBQUtZLGVBQUwsR0FBdUIsSUFBdkI7QUFDRDtBQUNGLEtBdlBnRTtBQXdQakVDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsREMsUUFBRSxLQUFLakMscUJBQVAsRUFBOEJrQyxXQUE5QixDQUEwQyxjQUExQztBQUNBLFVBQUlDLFlBQVksRUFBaEI7QUFDQSxVQUFJQyxnQkFBSjs7QUFFQSxVQUFJLEtBQUt0QixVQUFULEVBQXFCO0FBQ25CLFlBQU11QixlQUFlLEtBQUs3QixXQUFMLENBQWlCOEIsS0FBakIsR0FBeUJDLE9BQXpCLENBQWlDLE1BQWpDLENBQXJCO0FBQ0EsYUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBSzdCLFdBQXpCLEVBQXNDNkIsR0FBdEMsRUFBMkM7QUFDekNKLG9CQUFVLEtBQUszQixlQUFMLENBQXFCNEIsYUFBYUksTUFBYixDQUFvQixZQUFwQixDQUFyQixDQUFWO0FBQ0EsY0FBSUwsT0FBSixFQUFhO0FBQ1hELHdCQUFZQSxVQUFVTyxNQUFWLENBQWlCTixPQUFqQixDQUFaO0FBQ0Q7QUFDRCxlQUFLTyxrQkFBTCxDQUF3QlAsT0FBeEIsRUFBaUNDLGFBQWFJLE1BQWIsQ0FBb0IsS0FBS3JGLGVBQXpCLENBQWpDO0FBQ0FpRix1QkFBYU8sR0FBYixDQUFpQixDQUFqQixFQUFvQixNQUFwQjtBQUNEO0FBQ0QsWUFBSVQsVUFBVVUsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQixlQUFLQyxHQUFMLENBQVMsaUJBQVQsRUFBNEIsS0FBS0MsY0FBTCxDQUFvQkMsS0FBcEIsQ0FBMEIsSUFBMUIsQ0FBNUI7QUFDRDtBQUNGLE9BYkQsTUFhTztBQUNMWixrQkFBVSxLQUFLM0IsZUFBTCxDQUFxQixLQUFLRCxXQUFMLENBQWlCaUMsTUFBakIsQ0FBd0IsWUFBeEIsQ0FBckIsQ0FBVjtBQUNBLGFBQUtFLGtCQUFMLENBQXdCUCxPQUF4QixFQUFpQyxLQUFLNUIsV0FBTCxDQUFpQmlDLE1BQWpCLENBQXdCLEtBQUtyRixlQUE3QixDQUFqQztBQUNBLFlBQUksQ0FBQ2dGLE9BQUwsRUFBYztBQUNaLGVBQUtVLEdBQUwsQ0FBUyxpQkFBVCxFQUE0QixLQUFLQyxjQUFMLENBQW9CQyxLQUFwQixDQUEwQixJQUExQixDQUE1QjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDRCxLQW5SZ0U7QUFvUmpFTCx3QkFBb0IsU0FBU0Esa0JBQVQsR0FBK0M7QUFBQSxVQUFuQlAsT0FBbUIsdUVBQVQsRUFBUztBQUFBLFVBQUxhLEdBQUs7O0FBQ2pFLFVBQU1DLFFBQVFkLFFBQVFTLE1BQXRCO0FBQ0EsVUFBSUssUUFBUSxDQUFaLEVBQWU7QUFDYixZQUFNQyxrQkFBa0JDLFNBQVNDLHNCQUFULEVBQXhCO0FBQ0EsWUFBTUMsZUFBZUYsU0FBU0Msc0JBQVQsRUFBckI7QUFDQSxZQUFJLEtBQUt2QyxVQUFULEVBQXFCO0FBQ25CLGNBQU15QyxhQUFhdEIsRUFBRSxLQUFLOUMsaUJBQUwsQ0FBdUI2RCxLQUF2QixDQUE2QixFQUFFQyxRQUFGLEVBQTdCLEVBQXNDLElBQXRDLENBQUYsRUFBK0NPLEdBQS9DLENBQW1ELENBQW5ELENBQW5CO0FBQ0E7QUFDQSxjQUFNQyxRQUFRLEtBQUtyQixPQUFMLENBQWFBLFFBQVEsQ0FBUixDQUFiLENBQWQ7QUFDQSxjQUFJLEtBQUtoRSxnQkFBTCxDQUFzQnFGLE1BQU1DLElBQTVCLENBQUosRUFBdUM7QUFDckNQLDRCQUFnQlEsV0FBaEIsQ0FBNEJKLFVBQTVCO0FBQ0QsV0FGRCxNQUVPO0FBQ0xELHlCQUFhSyxXQUFiLENBQXlCSixVQUF6QjtBQUNEO0FBQ0Y7QUFDRCxhQUFLLElBQUlmLElBQUksQ0FBYixFQUFnQkEsSUFBSVUsS0FBcEIsRUFBMkJWLEdBQTNCLEVBQWdDO0FBQzlCLGNBQU1vQixRQUFRLEtBQUt4QixPQUFMLENBQWFBLFFBQVFJLENBQVIsQ0FBYixDQUFkO0FBQ0EsY0FBSXFCLGdCQUFKO0FBQ0EsY0FBSSxLQUFLekYsZ0JBQUwsQ0FBc0J3RixNQUFNRixJQUE1QixDQUFKLEVBQXVDO0FBQ3JDLGdCQUFJO0FBQ0ZHLHdCQUFVNUIsRUFBRSxLQUFLekQsbUJBQUwsQ0FBeUJ3RSxLQUF6QixDQUErQlksS0FBL0IsRUFBc0MsSUFBdEMsQ0FBRixFQUErQ0osR0FBL0MsQ0FBbUQsQ0FBbkQsQ0FBVjtBQUNELGFBRkQsQ0FFRSxPQUFPTSxHQUFQLEVBQVk7QUFDWkMsc0JBQVFDLEtBQVIsQ0FBY0YsR0FBZCxFQURZLENBQ1E7QUFDcEJELHdCQUFVNUIsRUFBRSxLQUFLZ0MsZ0JBQUwsQ0FBc0JqQixLQUF0QixDQUE0QlksS0FBNUIsRUFBbUMsSUFBbkMsQ0FBRixFQUE0Q0osR0FBNUMsQ0FBZ0QsQ0FBaEQsQ0FBVjtBQUNEOztBQUVETCw0QkFBZ0JRLFdBQWhCLENBQTRCRSxPQUE1QjtBQUNELFdBVEQsTUFTTztBQUNMLGdCQUFJO0FBQ0ZBLHdCQUFVNUIsRUFBRSxLQUFLbEQsZ0JBQUwsQ0FBc0JpRSxLQUF0QixDQUE0QlksS0FBNUIsRUFBbUMsSUFBbkMsQ0FBRixFQUE0Q0osR0FBNUMsQ0FBZ0QsQ0FBaEQsQ0FBVjtBQUNELGFBRkQsQ0FFRSxPQUFPTSxHQUFQLEVBQVk7QUFDWkMsc0JBQVFDLEtBQVIsQ0FBY0YsR0FBZCxFQURZLENBQ1E7QUFDcEJELHdCQUFVNUIsRUFBRSxLQUFLZ0MsZ0JBQUwsQ0FBc0JqQixLQUF0QixDQUE0QlksS0FBNUIsRUFBbUMsSUFBbkMsQ0FBRixFQUE0Q0osR0FBNUMsQ0FBZ0QsQ0FBaEQsQ0FBVjtBQUNEOztBQUVERix5QkFBYUssV0FBYixDQUF5QkUsT0FBekI7QUFDRDtBQUNELGVBQUtLLGtCQUFMLENBQXdCTixLQUF4QixFQUErQkMsT0FBL0I7QUFDRDs7QUFFRCxZQUFJVixnQkFBZ0JnQixVQUFoQixDQUEyQnRCLE1BQTNCLEdBQW9DLENBQXhDLEVBQTJDO0FBQ3pDWixZQUFFLEtBQUttQyxtQkFBUCxFQUE0QkMsTUFBNUIsQ0FBbUNsQixlQUFuQztBQUNEO0FBQ0QsWUFBSUcsYUFBYWEsVUFBYixDQUF3QnRCLE1BQXhCLEdBQWlDLENBQXJDLEVBQXdDO0FBQ3RDWixZQUFFLEtBQUtsQyxrQkFBUCxFQUEyQm1DLFdBQTNCLENBQXVDLGNBQXZDO0FBQ0FELFlBQUUsS0FBS3FDLGdCQUFQLEVBQXlCRCxNQUF6QixDQUFnQ2YsWUFBaEM7QUFDRDtBQUNGO0FBQ0YsS0FwVWdFO0FBcVVqRWlCLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxVQUFJLEtBQUsxRCxXQUFULEVBQXNCO0FBQ3BCLGVBQU8sS0FBS0EsV0FBWjtBQUNEO0FBQ0QsVUFBTTJELE9BQU8sS0FBS2hCLEdBQUwsQ0FBUyxPQUFULENBQWI7QUFDQSxVQUFNaUIsUUFBUUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JILElBQWxCLENBQWQ7QUFDQUUsYUFBT0UsY0FBUCxDQUFzQkgsS0FBdEIsRUFBNkJDLE9BQU9HLGNBQVAsQ0FBc0JMLElBQXRCLENBQTdCO0FBQ0FDLFlBQU1LLE1BQU4sR0FBZSxLQUFLdkQsZ0JBQXBCO0FBQ0FrRCxZQUFNdEQsWUFBTixHQUFxQixLQUFLTSxpQkFBMUI7QUFDQWdELFlBQU1yRCxZQUFOLEdBQXFCLEtBQUtNLGlCQUExQjtBQUNBK0MsWUFBTU0sT0FBTixHQUFnQixLQUFLQyxZQUFyQjtBQUNBUCxZQUFNUSxPQUFOLEdBQWdCLEtBQUt6RCxZQUFyQjtBQUNBLFdBQUtYLFdBQUwsR0FBbUI0RCxLQUFuQjtBQUNBLGFBQU9BLEtBQVA7QUFDRCxLQW5WZ0U7QUFvVmpFUyx5QkFBcUIsU0FBU0EsbUJBQVQsQ0FBNkJDLEtBQTdCLEVBQW9DO0FBQ3ZELFVBQU1DLFlBQVlELE1BQU03QyxLQUFOLEdBQWNDLE9BQWQsQ0FBc0IsT0FBdEIsQ0FBbEI7QUFDQSxVQUFNOEMsVUFBVUYsTUFBTTdDLEtBQU4sR0FBY2dELEtBQWQsQ0FBb0IsT0FBcEIsQ0FBaEI7QUFDQSxhQUFPLGlCQUFPQyxVQUFQLENBQ0wsQ0FDRSxrRUFERixFQUVFLGtDQUZGLEVBR0UsaUNBSEYsRUFJRSxpQ0FKRixFQUtFLDhCQUxGLEVBTUVDLElBTkYsQ0FNTyxFQU5QLENBREssRUFPTyxDQUFDQyxJQUFJQyxPQUFKLENBQVlDLElBQVosSUFBb0JGLElBQUlDLE9BQUosQ0FBWUMsSUFBWixDQUFpQkMsSUFBdEMsRUFDVixrQkFBUUMsbUJBQVIsQ0FBNEJULFVBQVVVLE1BQVYsRUFBNUIsQ0FEVSxFQUVWLGtCQUFRRCxtQkFBUixDQUE0QlIsUUFBUVMsTUFBUixFQUE1QixDQUZVLEVBR1ZWLFVBQVUzQyxNQUFWLENBQWlCLHdCQUFqQixDQUhVLEVBSVY0QyxRQUFRNUMsTUFBUixDQUFlLHdCQUFmLENBSlUsQ0FQUCxDQUFQO0FBY0QsS0FyV2dFO0FBc1dqRXNELHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQlosS0FBMUIsRUFBaUM7QUFDakQsVUFBTVEsT0FBT0YsSUFBSUMsT0FBSixDQUFZQyxJQUFaLElBQW9CRixJQUFJQyxPQUFKLENBQVlDLElBQVosQ0FBaUJDLElBQWxEO0FBQ0EsVUFBTUksUUFBUSxrQkFBUUgsbUJBQVIsQ0FBNEJWLE1BQU03QyxLQUFOLEdBQWNDLE9BQWQsQ0FBc0IsT0FBdEIsRUFBK0J1RCxNQUEvQixFQUE1QixDQUFkO0FBQ0EsVUFBTUcsTUFBTSxrQkFBUUosbUJBQVIsQ0FBNEJWLE1BQU03QyxLQUFOLEdBQWNnRCxLQUFkLENBQW9CLE9BQXBCLEVBQTZCUSxNQUE3QixFQUE1QixDQUFaO0FBQ0EsNkJBQXFCSCxJQUFyQiw4QkFBa0RLLEtBQWxELHlCQUEyRUEsS0FBM0UsNkJBQXdHQyxHQUF4RztBQUNELEtBM1dnRTtBQTRXakVDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUFBOztBQUNsRCxXQUFLQyxTQUFMLENBQWVDLFNBQWYsQ0FBeUJqQyxVQUF6QixDQUFvQ2tDLE9BQXBDLENBQTRDLFVBQUNDLElBQUQsRUFBVTtBQUNwREEsYUFBS25DLFVBQUwsQ0FBZ0JrQyxPQUFoQixDQUF3QixVQUFDcEQsR0FBRCxFQUFTO0FBQy9CLGNBQUksQ0FBQyxNQUFLeEMsZUFBTCxDQUFxQndCLEVBQUVnQixHQUFGLEVBQU9zRCxJQUFQLENBQVksV0FBWixDQUFyQixDQUFMLEVBQXFEO0FBQ25ELGtCQUFLSixTQUFMLENBQWVLLFlBQWYsQ0FBNEJ2RCxHQUE1QjtBQUNBO0FBQ0Q7QUFDRCxjQUFJLENBQUMsTUFBS2tELFNBQUwsQ0FBZU0sUUFBZixDQUF3QnhELEdBQXhCLENBQUwsRUFBbUM7QUFDakNBLGdCQUFJeUQsUUFBSixHQUFlLE1BQUtqRyxlQUFMLENBQXFCd0IsRUFBRWdCLEdBQUYsRUFBT3NELElBQVAsQ0FBWSxXQUFaLENBQXJCLENBQWY7QUFDQSxrQkFBS0osU0FBTCxDQUFlUSxZQUFmLENBQTRCMUQsR0FBNUI7QUFDRDtBQUNGLFNBVEQ7QUFVRCxPQVhEO0FBWUEsYUFBTyxJQUFQO0FBQ0QsS0ExWGdFO0FBMlhqRTJELDBCQUFzQixTQUFTQSxvQkFBVCxDQUE4QkMsR0FBOUIsRUFBbUNDLFdBQW5DLEVBQWdEO0FBQ3BFLFVBQUlDLGFBQWFELFdBQWpCO0FBQ0EsVUFBTWxELFFBQVEsS0FBS3hCLE9BQUwsQ0FBYXlFLEdBQWIsQ0FBZDtBQUNBLFVBQU1HLGFBQWNwRCxNQUFNcUQsT0FBUCxHQUFrQixLQUFLNUcsZUFBdkIsR0FBeUMsS0FBS0Qsa0JBQWpFO0FBQ0EsVUFBTThHLE9BQU96QixJQUFJMEIsT0FBSixDQUFZSCxVQUFaLENBQWI7QUFDQUQsbUJBQWNuRCxNQUFNcUQsT0FBUCxHQUFrQkYsVUFBbEIsR0FBK0JuRCxNQUFNd0QsV0FBbEQ7QUFDQSxVQUFJRixJQUFKLEVBQVU7QUFDUkEsYUFBS0csSUFBTCxDQUFVO0FBQ1JDLGlCQUFPUCxVQURDO0FBRVJGO0FBRlEsU0FBVjtBQUlEO0FBQ0YsS0F2WWdFO0FBd1lqRVUsMEJBQXNCLFNBQVNBLG9CQUFULEdBQWdDO0FBQ3BELFVBQU1MLE9BQU96QixJQUFJMEIsT0FBSixDQUFZLEtBQUtoSCxVQUFMLElBQW1CLEtBQUtxSCxRQUFwQyxDQUFiOztBQUVBLFVBQUksQ0FBQyxLQUFLQyxPQUFWLEVBQW1CO0FBQ2pCLGFBQUtBLE9BQUwsR0FBZSxFQUFmO0FBQ0Q7O0FBRUQsV0FBS0EsT0FBTCxDQUFhakgsV0FBYixHQUEyQixLQUFLQSxXQUFMLENBQWlCa0gsUUFBakIsQ0FBMEIsWUFBMUIsS0FBMkNDLFNBQVNwRixPQUFULENBQWlCLEtBQWpCLENBQXRFO0FBQ0EsVUFBSTJFLElBQUosRUFBVTtBQUNSQSxhQUFLRyxJQUFMLENBQVU7QUFDUk8seUJBQWUsSUFEUDtBQUVSQyxvQkFBVSxLQUFLNUgsRUFGUDtBQUdSNkgsa0JBQVEsSUFIQTtBQUlSdEgsdUJBQWEsS0FBS2lILE9BQUwsQ0FBYWpILFdBQWIsQ0FBeUJ1SCxPQUF6QjtBQUpMLFNBQVY7QUFNRDtBQUNGLEtBeFpnRTtBQXlaakVDLHlCQUFxQixTQUFTQSxtQkFBVCxDQUE2QkMsS0FBN0IsRUFBb0M7QUFDdkQsVUFBS0EsU0FBUyxDQUFDLEtBQUtsSCxhQUFoQixJQUFrQyxDQUFDbUgsT0FBT3pDLEdBQVAsQ0FBVzBDLGFBQVgsRUFBdkMsRUFBbUU7QUFDakUsWUFBTUMsY0FBYztBQUNsQm5JLGNBQUksU0FEYztBQUVsQm9JLGVBQUssU0FGYTtBQUdsQkMsa0JBQVE7O0FBSFUsU0FBcEI7QUFNQSxZQUFJTCxNQUFNTSxJQUFWLEVBQWdCO0FBQ2ROLGdCQUFNTSxJQUFOLENBQVdDLElBQVgsQ0FBZ0JKLFdBQWhCO0FBQ0EsZUFBS3JILGFBQUwsR0FBcUIsSUFBckI7QUFDRDtBQUNGO0FBQ0QsV0FBS2MsU0FBTCxDQUFlbUcsbUJBQWYsRUFBb0NsRyxTQUFwQztBQUNELEtBdmFnRTtBQXdhakUyRyxlQUFXLFNBQVNBLFNBQVQsR0FBOEI7QUFBQSxVQUFYQyxJQUFXLHVFQUFKLEVBQUk7O0FBQ3ZDLGFBQU9BLEtBQUtDLEtBQUwsQ0FBVyxHQUFYLEVBQWdCQyxNQUFoQixDQUF1QixDQUFDLENBQXhCLEVBQTJCLENBQTNCLENBQVA7QUFDRCxLQTFhZ0U7QUEyYWpFQyxhQUFTLFNBQVNBLE9BQVQsQ0FBaUJwRSxLQUFqQixFQUF3QnJDLE9BQXhCLEVBQWlDNkUsT0FBakMsRUFBMEM7QUFBQTs7QUFDakQsVUFBSTdFLFFBQVFTLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0I7QUFDdEJULGdCQUFRaUUsT0FBUixDQUFnQixVQUFDeUMsZUFBRCxFQUFxQjtBQUNuQyxjQUFNbEYsUUFBUSxPQUFLbUYsYUFBTCxDQUFtQkQsZUFBbkIsQ0FBZDtBQUNBO0FBQ0E7QUFDQWxGLGdCQUFNcUQsT0FBTixHQUFnQkEsT0FBaEI7QUFDQSxjQUFNK0IsV0FBV3ZFLE1BQU13RSxXQUFOLENBQWtCckYsS0FBbEIsQ0FBakI7QUFDQSxpQkFBS3hCLE9BQUwsQ0FBYTRHLFFBQWIsSUFBeUJwRixLQUF6QjtBQUNBLGNBQU13QixZQUFZdUMsT0FBTyxrQkFBUXVCLGdCQUFSLENBQXlCdEYsTUFBTXVGLFNBQS9CLENBQVAsQ0FBbEI7QUFDQSxjQUFJdkYsTUFBTXdGLFFBQVYsRUFBb0I7QUFDbEJoRSxzQkFBVWlFLFFBQVYsQ0FBbUI7QUFDakJDLHVCQUFTbEUsVUFBVW1FLFNBQVY7QUFEUSxhQUFuQjtBQUdEO0FBQ0QsY0FBTUMsT0FBT3BFLFVBQVUzQyxNQUFWLENBQWlCLFlBQWpCLENBQWI7QUFDQSxjQUFJLE9BQUtoQyxlQUFMLENBQXFCK0ksSUFBckIsQ0FBSixFQUFnQztBQUM5QixtQkFBSy9JLGVBQUwsQ0FBcUIrSSxJQUFyQixFQUEyQmhCLElBQTNCLENBQWdDUSxRQUFoQztBQUNELFdBRkQsTUFFTztBQUNMLG1CQUFLdkksZUFBTCxDQUFxQitJLElBQXJCLElBQTZCLENBQUNSLFFBQUQsQ0FBN0I7QUFDRDtBQUNGLFNBbkJEO0FBb0JEO0FBQ0YsS0FsY2dFO0FBbWNqRVMsaUJBQWEsU0FBU0EsV0FBVCxDQUFxQnJILE9BQXJCLEVBQThCO0FBQ3pDLFVBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1o7QUFDRDs7QUFFRCxVQUFNcUMsUUFBUSxLQUFLakIsR0FBTCxDQUFTLE9BQVQsQ0FBZDs7QUFFQSxXQUFLcUYsT0FBTCxDQUFhcEUsS0FBYixFQUFvQnJDLE9BQXBCLEVBQTZCLEtBQTdCO0FBQ0QsS0EzY2dFO0FBNGNqRXNILHNCQUFrQixTQUFTQSxnQkFBVCxDQUEwQnRILE9BQTFCLEVBQW1DO0FBQ25ELFVBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1o7QUFDRDtBQUNELFVBQU1xQyxRQUFRLEtBQUtGLGdCQUFMLEVBQWQ7O0FBRUEsV0FBS3NFLE9BQUwsQ0FBYXBFLEtBQWIsRUFBb0JyQyxPQUFwQixFQUE2QixJQUE3QjtBQUNELEtBbmRnRTtBQW9kakV1SCx3QkFBb0IsU0FBU0Esa0JBQVQsQ0FBNEJsQyxPQUE1QixFQUFxQztBQUN2RCxVQUFJQSxRQUFRakgsV0FBWixFQUF5QjtBQUN2QixhQUFLQSxXQUFMLEdBQW1CbUgsT0FBT0YsUUFBUWpILFdBQWYsRUFBNEIrQixPQUE1QixDQUFvQyxLQUFwQyxLQUE4Q29GLFNBQVNyRixLQUFULEdBQWlCQyxPQUFqQixDQUF5QixLQUF6QixDQUFqRTtBQUNBLGFBQUtSLGVBQUwsR0FBdUIsSUFBdkI7QUFDRDtBQUNGLEtBemRnRTtBQTBkakU2SCxhQUFTLFNBQVNBLE9BQVQsR0FBbUI7QUFDMUIsV0FBS0MsY0FBTDtBQUNBLFdBQUtDLFdBQUw7QUFDRCxLQTdkZ0U7QUE4ZGpFQSxpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQUE7O0FBQ2xDLFdBQUtsSixXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNBb0IsUUFBRSxLQUFLakMscUJBQVAsRUFBOEIrSixRQUE5QixDQUF1QyxjQUF2QztBQUNBLFdBQUtqSCxHQUFMLENBQVMsaUJBQVQsRUFBNEIsS0FBS2tILGVBQUwsQ0FBcUJoSCxLQUFyQixDQUEyQixJQUEzQixDQUE1QjtBQUNBZixRQUFFLEtBQUtxQyxnQkFBUCxFQUF5QjJGLEtBQXpCO0FBQ0EsV0FBS3pKLFdBQUwsR0FBbUIsS0FBSzJGLFNBQUwsQ0FBZStELHFCQUFmLEVBQW5CO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFdBQUsxSixlQUFMLEdBQXVCLEVBQXZCO0FBQ0EsV0FBSzJKLGFBQUwsR0FBcUIsS0FBS2xGLG1CQUFMLENBQXlCLEtBQUsxRSxXQUE5QixDQUFyQjtBQUNBLFdBQUs2SixVQUFMLEdBQWtCLEtBQUt0RSxnQkFBTCxDQUFzQixLQUFLdkYsV0FBM0IsQ0FBbEI7QUFDQThKLGNBQVFDLEdBQVIsQ0FBWSxDQUFDLEtBQUtDLFdBQUwsRUFBRCxFQUFxQixLQUFLQyxnQkFBTCxFQUFyQixDQUFaLEVBQTJEQyxJQUEzRCxDQUFnRSxZQUFNO0FBQ3BFekksVUFBRSxPQUFLbUMsbUJBQVAsRUFBNEI2RixLQUE1QjtBQUNBaEksVUFBRSxPQUFLcUMsZ0JBQVAsRUFBeUIyRixLQUF6QjtBQUNBLGVBQUsvRCxtQkFBTDtBQUNBLGVBQUtsRSxtQkFBTDtBQUNBLGVBQUtwQixXQUFMLEdBQW1CLElBQW5CO0FBQ0QsT0FORDtBQU9ELEtBaGZnRTtBQWlmakUrSixZQUFRLFNBQVNBLE1BQVQsR0FBa0I7QUFDeEIsV0FBSzlJLFNBQUwsQ0FBZThJLE1BQWYsRUFBdUI3SSxTQUF2QjtBQUNBLFdBQUsrSCxjQUFMO0FBQ0QsS0FwZmdFO0FBcWZqRUEsb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEMsVUFBSSxDQUFDLEtBQUsxRCxTQUFWLEVBQXFCO0FBQ25CLGFBQUtBLFNBQUwsR0FBaUIsdUJBQWEsRUFBRWxHLElBQUkseUJBQU4sRUFBaUMySyxlQUFlLElBQWhELEVBQWIsQ0FBakI7QUFDQTNJLFVBQUUsS0FBSzRJLFlBQVAsRUFBcUJ4RyxNQUFyQixDQUE0QixLQUFLOEIsU0FBTCxDQUFlMkUsT0FBM0M7QUFDQSxZQUFNQyxTQUFTOUksRUFBRSxLQUFLN0Msa0JBQUwsQ0FBd0I0RCxLQUF4QixDQUE4QixJQUE5QixDQUFGLEVBQXVDUSxHQUF2QyxDQUEyQyxDQUEzQyxDQUFmO0FBQ0F2QixVQUFFLEtBQUtrRSxTQUFMLENBQWU2RSxVQUFqQixFQUE2QjNHLE1BQTdCLENBQW9DMEcsTUFBcEM7QUFDQSwwQkFBRzlJLEVBQUU4SSxNQUFGLEVBQVVFLFFBQVYsR0FBcUIsQ0FBckIsQ0FBSCxFQUE0QixPQUE1QixFQUFxQyxLQUFLQyxpQkFBTCxDQUF1QkMsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBckM7QUFDQSxhQUFLaEYsU0FBTCxDQUFlaUYsV0FBZixHQUE2QixLQUFLQSxXQUFMLENBQWlCRCxJQUFqQixDQUFzQixJQUF0QixDQUE3QjtBQUNBLGFBQUtoRixTQUFMLENBQWVrQixJQUFmO0FBQ0EsYUFBS2xCLFNBQUwsQ0FBZWtGLGlCQUFmLEdBQW1DLEtBQUtBLGlCQUFMLENBQXVCRixJQUF2QixDQUE0QixJQUE1QixDQUFuQyxDQVJtQixDQVFtRDtBQUN2RSxPQVRELE1BU087QUFDTCxhQUFLRyxrQkFBTCxHQUEwQixJQUExQjtBQUNBLGFBQUtuRixTQUFMLENBQWV5RCxPQUFmLENBQXVCLEtBQXZCO0FBQ0Q7QUFDRixLQW5nQmdFO0FBb2dCakV5Qix1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJ6QixPQUEzQixFQUFvQztBQUNyRCxVQUFJQSxPQUFKLEVBQWE7QUFDWCxhQUFLRSxXQUFMO0FBQ0Q7QUFDRixLQXhnQmdFO0FBeWdCakVzQixpQkFBYSxTQUFTQSxXQUFULEdBQXVCO0FBQ2xDLFdBQUtHLFNBQUw7QUFDRCxLQTNnQmdFO0FBNGdCakVmLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsVUFBTS9GLFFBQVEsS0FBS2pCLEdBQUwsQ0FBUyxPQUFULENBQWQ7QUFDQSxVQUFJaUIsS0FBSixFQUFXO0FBQ1Q7QUFDQSxZQUFNK0csZUFBZTtBQUNuQnRJLGlCQUFPLEtBQUs3QixRQURPO0FBRW5CMkUsaUJBQU8sS0FBS3lGO0FBRk8sU0FBckI7O0FBS0EsYUFBS0MseUJBQUwsQ0FBK0JGLFlBQS9COztBQUVBLFlBQU1HLGtCQUFrQixLQUFLQyxxQkFBTCxDQUEyQixLQUFLeEIsYUFBaEMsS0FBa0QsSUFBMUU7QUFDQSxZQUFNeUIsZUFBZXBILE1BQU1xSCxLQUFOLENBQVlILGVBQVosRUFBNkJILFlBQTdCLENBQXJCOztBQUVBLDRCQUFLSyxZQUFMLEVBQ0UsS0FBS3BDLFdBQUwsQ0FBaUIwQixJQUFqQixDQUFzQixJQUF0QixDQURGLEVBRUUsS0FBS1ksYUFBTCxDQUFtQlosSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJLLFlBQTlCLENBRkY7O0FBSUEsZUFBT0ssWUFBUDtBQUNEOztBQUVEOUgsY0FBUWlJLElBQVIsQ0FBYSx1R0FBYixFQXJCa0MsQ0FxQnFGO0FBQ3hILEtBbGlCZ0U7QUFtaUJqRXZCLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1QyxVQUFNaEcsUUFBUSxLQUFLRixnQkFBTCxFQUFkO0FBQ0EsVUFBSUUsS0FBSixFQUFXO0FBQ1Q7QUFDQSxZQUFNK0csZUFBZTtBQUNuQnRJLGlCQUFPLEtBQUs3QixRQURPO0FBRW5CMkUsaUJBQU8sS0FBS3lGO0FBRk8sU0FBckI7O0FBS0EsYUFBS0MseUJBQUwsQ0FBK0JGLFlBQS9COztBQUVBLFlBQU1HLGtCQUFrQixLQUFLQyxxQkFBTCxDQUEyQixLQUFLdkIsVUFBaEMsS0FBK0MsSUFBdkU7QUFDQSxZQUFNd0IsZUFBZXBILE1BQU1xSCxLQUFOLENBQVlILGVBQVosRUFBNkJILFlBQTdCLENBQXJCOztBQUVBLDRCQUFLSyxZQUFMLEVBQ0UsS0FBS25DLGdCQUFMLENBQXNCeUIsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FERixFQUVFLEtBQUtZLGFBQUwsQ0FBbUJaLElBQW5CLENBQXdCLElBQXhCLEVBQThCSyxZQUE5QixDQUZGOztBQUlBLGVBQU9LLFlBQVA7QUFDRDs7QUFFRDlILGNBQVFpSSxJQUFSLENBQWEsdUdBQWIsRUFyQjRDLENBcUIyRTtBQUN4SCxLQXpqQmdFO0FBMGpCakVULGVBQVcsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixVQUFNVSxXQUFXLEtBQUs5RixTQUFMLENBQWUrRCxxQkFBZixFQUFqQjtBQUNBLFVBQUksS0FBSzFKLFdBQUwsSUFBb0IsS0FBS0ksV0FBN0IsRUFBMEM7QUFDeENxQixVQUFFLEtBQUttQyxtQkFBUCxFQUE0QjZGLEtBQTVCO0FBQ0FoSSxVQUFFLEtBQUtxQyxnQkFBUCxFQUF5QjJGLEtBQXpCO0FBQ0EsYUFBS3pKLFdBQUwsR0FBbUJ5TCxRQUFuQjtBQUNBLGFBQUtqSyxtQkFBTDtBQUNELE9BTEQsTUFLTztBQUNMLGFBQUt4QixXQUFMLEdBQW1CeUwsUUFBbkI7QUFDRDtBQUNGLEtBcGtCZ0U7QUFxa0JqRTVFLFVBQU0sU0FBU0EsSUFBVCxDQUFjSSxPQUFkLEVBQXVCO0FBQzNCLFdBQUs1RixTQUFMLENBQWV3RixJQUFmLEVBQXFCdkYsU0FBckI7O0FBRUEsVUFBSTJGLE9BQUosRUFBYTtBQUNYLGFBQUtrQyxrQkFBTCxDQUF3QmxDLE9BQXhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSzFGLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxhQUFLOEgsY0FBTDtBQUNEO0FBQ0YsS0E5a0JnRTtBQStrQmpFcUMsYUFBUyxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLFdBQUtySyxTQUFMLENBQWVxSyxPQUFmLEVBQXdCcEssU0FBeEI7QUFDRCxLQWpsQmdFO0FBa2xCakVvSix1QkFBbUIsU0FBU0EsaUJBQVQsT0FBOEM7QUFBQSxVQUFqQmlCLGFBQWlCLFFBQWpCQSxhQUFpQjs7QUFDL0QsV0FBS3JMLFVBQUwsR0FBa0IsQ0FBQyxLQUFLQSxVQUF4QjtBQUNBLFVBQUksS0FBS0EsVUFBVCxFQUFxQjtBQUNuQm1CLFVBQUVrSyxhQUFGLEVBQWlCQyxJQUFqQixHQUF3QkMsSUFBeEIsQ0FBNkIsS0FBS3RPLFFBQWxDO0FBQ0QsT0FGRCxNQUVPO0FBQ0xrRSxVQUFFa0ssYUFBRixFQUFpQkMsSUFBakIsR0FBd0JDLElBQXhCLENBQTZCLEtBQUt2TyxPQUFsQztBQUNEOztBQUVELFdBQUtxSSxTQUFMLENBQWVtRyxnQkFBZjtBQUNBckssUUFBRSxLQUFLbUMsbUJBQVAsRUFBNEI2RixLQUE1QjtBQUNBaEksUUFBRSxLQUFLcUMsZ0JBQVAsRUFBeUIyRixLQUF6QjtBQUNBLFdBQUtqSSxtQkFBTDtBQUNELEtBOWxCZ0U7QUErbEJqRTRKLDJCQUF1QixTQUFTQSxxQkFBVCxHQUFnRDtBQUFBLFVBQWpCVyxVQUFpQix1RUFBSixFQUFJOztBQUNyRSxhQUFPLGVBQUtDLEtBQUwsQ0FBV0QsY0FBYyxFQUF6QixFQUE2QixLQUFLOUUsT0FBTCxLQUFpQixLQUFLQSxPQUFMLENBQWFxRSxLQUFiLElBQXNCLEtBQUtyRSxPQUFMLENBQWFnRixLQUFwRCxDQUE3QixDQUFQO0FBQ0QsS0FqbUJnRTtBQWttQmpFQyxvQkFBZ0IsU0FBU0EsY0FBVCxHQUEwQjtBQUN4Q3pLLFFBQUUsS0FBS2tFLFNBQUwsQ0FBZXdHLGNBQWYsQ0FBOEJDLGNBQWhDLEVBQWdEQyxJQUFoRCxDQUFxRCxVQUFyRCxFQUFpRUMsS0FBakU7QUFDQTdLLFFBQUUsS0FBS2tFLFNBQUwsQ0FBZTRHLGFBQWYsQ0FBNkJILGNBQS9CLEVBQStDQyxJQUEvQyxDQUFvRCxVQUFwRCxFQUFnRUMsS0FBaEU7QUFDQSxXQUFLakwsU0FBTCxDQUFlNkssY0FBZixFQUErQjVLLFNBQS9CO0FBQ0Q7QUF0bUJnRSxHQUFuRCxDQUFoQjs7b0JBeW1CZWpGLE8iLCJmaWxlIjoiQ2FsZW5kYXJWaWV3LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGNvbnZlcnQgZnJvbSAnYXJnb3MvQ29udmVydCc7XHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBvbiBmcm9tICdkb2pvL29uJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCB3aGVuIGZyb20gJ2Rvam8vd2hlbic7XHJcbmltcG9ydCBDYWxlbmRhciBmcm9tICdhcmdvcy9DYWxlbmRhcic7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgVXRpbGl0eSBmcm9tICcuLi8uLi9VdGlsaXR5JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgKiBhcyBhY3Rpdml0eVR5cGVJY29ucyBmcm9tICcuLi8uLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlSWNvbic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdjYWxlbmRhclZpZXcnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdjYWxlbmRhclZpZXdEYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQ2FsZW5kYXIuQ2FsZW5kYXJWaWV3XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICogQG1peGlucyBhcmdvcy5MaXN0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5MaXN0XHJcbiAqIEByZXF1aXJlcyBhcmdvcy5Db252ZXJ0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uRm9ybWF0XHJcbiAqIEByZXF1aXJlcyBjcm0uVXRpbGl0eVxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgbW9tZW50XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkNhbGVuZGFyLkNhbGVuZGFyVmlldycsIFtMaXN0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIG1vbnRoVGl0bGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLm1vbnRoVGl0bGVGb3JtYXRUZXh0LFxyXG4gIGRheVRpdGxlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5kYXlUaXRsZUZvcm1hdFRleHQsXHJcbiAgZXZlbnREYXRlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5ldmVudERhdGVGb3JtYXRUZXh0LFxyXG4gIHN0YXJ0VGltZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRUaW1lRm9ybWF0VGV4dCxcclxuICBzdGFydFRpbWVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2Uuc3RhcnRUaW1lRm9ybWF0VGV4dDI0LFxyXG4gIGRheUhlYWRlckZvcm1hdDogZHRGb3JtYXRSZXNvdXJjZS5kYXlIZWFkZXJGb3JtYXQsXHJcbiAgYWxsRGF5VGV4dDogcmVzb3VyY2UuYWxsRGF5VGV4dCxcclxuICBldmVudFRleHQ6IHJlc291cmNlLmV2ZW50VGV4dCxcclxuICBldmVudEhlYWRlclRleHQ6IHJlc291cmNlLmV2ZW50SGVhZGVyVGV4dCxcclxuICBjb3VudE1vcmVUZXh0OiByZXNvdXJjZS5jb3VudE1vcmVUZXh0LFxyXG4gIHRvZ2dsZUNvbGxhcHNlVGV4dDogcmVzb3VyY2UudG9nZ2xlQ29sbGFwc2VUZXh0LFxyXG4gIHdpdGhGcm9tVGV4dDogcmVzb3VyY2Uud2l0aEZyb21UZXh0LFxyXG4gIHdpdGhUZXh0OiByZXNvdXJjZS53aXRoVGV4dCxcclxuICB1bnNwZWNpZmllZFRleHQ6IHJlc291cmNlLnVuc3BlY2lmaWVkVGV4dCxcclxuICBmb3JUZXh0OiByZXNvdXJjZS5mb3JUZXh0LFxyXG4gIGRheVRleHQ6IHJlc291cmNlLmRheVRleHQsXHJcbiAgd2Vla1RleHQ6IHJlc291cmNlLndlZWtUZXh0LFxyXG5cclxuICBlbmFibGVQdWxsVG9SZWZyZXNoOiB0cnVlLFxyXG4gIHN0cmluZyxcclxuICBVdGlsaXR5LFxyXG4gIHRyaW1UbzogMTYsXHJcbiAgYWN0aXZpdHlUeXBlSWNvbjogYWN0aXZpdHlUeXBlSWNvbnMuZGVmYXVsdCxcclxuXHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgd2lkZ2V0VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBpZD1cInslPSAkLmlkICV9XCIgZGF0YS10aXRsZT1cInslPSAkLnRpdGxlVGV4dCAlfVwiIGNsYXNzPVwib3ZlcnRocm93IHBhbmVsIHslPSAkLmNscyAlfVwiIHslIGlmICgkLnJlc291cmNlS2luZCkgeyAlfWRhdGEtcmVzb3VyY2Uta2luZD1cInslPSAkLnJlc291cmNlS2luZCAlfVwieyUgfSAlfT4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJvdmVydGhyb3cgc2Nyb2xsZXJcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwic2Nyb2xsZXJOb2RlXCI+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwicGFuZWwtY29udGVudFwiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImNhbGVuZGFyQ29udGFpbmVyXCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImNhbGVuZGFyTm9kZVwiPjwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImV2ZW50LWNvbnRlbnQgZXZlbnQtaGlkZGVuIGxpc3R2aWV3XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImV2ZW50Q29udGFpbmVyTm9kZVwiPicsXHJcbiAgICAnPHVsIGNsYXNzPVwibGlzdC1jb250ZW50XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImV2ZW50Q29udGVudE5vZGVcIj48L3VsPicsXHJcbiAgICAneyUhICQuZXZlbnRNb3JlVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImFjdGl2aXR5LWNvbnRlbnQgbGlzdHZpZXdcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiYWN0aXZpdHlDb250YWluZXJOb2RlXCI+JyxcclxuICAgICc8dWwgY2xhc3M9XCJsaXN0LWNvbnRlbnRcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiYWN0aXZpdHlDb250ZW50Tm9kZVwiPjwvdWw+JyxcclxuICAgICd7JSEgJC5hY3Rpdml0eU1vcmVUZW1wbGF0ZSAlfScsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IHN0eWxlPVwiY2xlYXI6Ym90aFwiPjwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgYWN0aXZpdHlSb3dUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8bGkgY2xhc3M9XCJhY3Rpdml0eUVudHJ5XCIgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUVudHJ5XCIgZGF0YS1rZXk9XCJ7JT0gJC4ka2V5ICV9XCIgZGF0YS1kZXNjcmlwdG9yPVwieyU6ICQuJGRlc2NyaXB0b3IgJX1cIiBkYXRhLWFjdGl2aXR5LXR5cGU9XCJ7JTogJC5UeXBlICV9XCI+JyxcclxuICAgICd7JSEgJCQuYWN0aXZpdHlJY29uVGVtcGxhdGUgJX0nLFxyXG4gICAgJ3slISAkJC5hY3Rpdml0eUhlYWRlclRlbXBsYXRlICV9JyxcclxuICAgICd7JSEgJCQuYWN0aXZpdHlDb250ZW50VGVtcGxhdGUgJX0nLFxyXG4gICAgJ3slISAkJC5hY3Rpdml0eUZvb3RlclRlbXBsYXRlICV9JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcbiAgYWN0aXZpdHlJY29uVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImFjdGl2aXR5RW50cnlfX2ljb25cIj4nLFxyXG4gICAgYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWljb24gaGlkZS1mb2N1c1wiPlxyXG4gICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiIGZvY3VzYWJsZT1cImZhbHNlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxyXG4gICAgICAgIDx1c2UgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeGxpbms6aHJlZj1cIiNpY29uLXslPSAkJC5hY3Rpdml0eVR5cGVJY29uWyQuVHlwZV0gJX1cIj48L3VzZT5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L2J1dHRvbj48L2Rpdj5gLFxyXG4gIF0pLFxyXG4gIGFjdGl2aXR5SGVhZGVyVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImFjdGl2aXR5RW50cnlfX2hlYWRlclwiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cImhlYWRlcl9fY29udGVudFwiPicsXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU6ICQuRGVzY3JpcHRpb24gJX08L3A+JyxcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LXN1YmhlYWRpbmdcIj57JSEgJCQuYWN0aXZpdHlOYW1lVGVtcGxhdGUgJX08L3A+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJoZWFkZXJfX3RpbWVTdGFtcFwiPicsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJ0aW1lU3RhbXBfX3RpbWUgbGlzdHZpZXctc3ViaGVhZGluZ1wiPicsXHJcbiAgICAneyUgaWYgKCQuVGltZWxlc3MpIHsgJX0nLFxyXG4gICAgJ3slPSAkJC5hbGxEYXlUZXh0ICV9JyxcclxuICAgICd7JSB9IGVsc2UgaWYgKCQkLmFjdGl2aXR5VHlwZUljb25bJC5UeXBlXSkgeyAlfScsXHJcbiAgICAneyU6IGNybS5Gb3JtYXQuZGF0ZSgkLlN0YXJ0RGF0ZSwgKEFwcC5pczI0SG91ckNsb2NrKCkpID8gJCQuc3RhcnRUaW1lRm9ybWF0VGV4dDI0IDogJCQuc3RhcnRUaW1lRm9ybWF0VGV4dCkgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JSEgJCQuZXZlbnRUaW1lVGVtcGxhdGUgJX0nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzwvc3Bhbj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBhY3Rpdml0eUNvbnRlbnRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiYWN0aXZpdHlFbnRyeV9fY29udGVudFwiPicsXHJcbiAgICAneyUgaWYgKCQuTm90ZXMpIHsgJX0nLFxyXG4gICAgJ3slOiAkJC5VdGlsaXR5LnRyaW1UZXh0KCQuTm90ZXMsICQkLnRyaW1UbykgJX0nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgYWN0aXZpdHlGb290ZXJUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiYWN0aXZpdHlFbnRyeV9fZm9vdGVyXCI+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGFjdGl2aXR5TmFtZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJ3slIGlmICgkLkNvbnRhY3ROYW1lKSB7ICV9JyxcclxuICAgICd7JT0gJCQuc3RyaW5nLnN1YnN0aXR1dGUoJCQud2l0aEZyb21UZXh0LCB7IGNvbnRhY3ROYW1lOiAkJC5wYXJzZU5hbWUoJC5Db250YWN0TmFtZSksIGFjY291bnROYW1lOiAkLkFjY291bnROYW1lIH0pICV9JyxcclxuICAgICd7JSB9IGVsc2UgaWYgKCQuQWNjb3VudE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slPSAkJC5zdHJpbmcuc3Vic3RpdHV0ZSgkJC53aXRoVGV4dCwgeyBvYmplY3Q6ICQuQWNjb3VudE5hbWUgfSkgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJC5MZWFkTmFtZSkgeyAlfScsXHJcbiAgICAneyU9ICQkLnN0cmluZy5zdWJzdGl0dXRlKCQkLndpdGhUZXh0LCB7IG9iamVjdDogJC5MZWFkTmFtZSB9KSAlfScsXHJcbiAgICAneyUgfSBlbHNlIGlmICgkJC5hY3Rpdml0eVR5cGVJY29uWyQuVHlwZV0pIHsgJX0nLFxyXG4gICAgJ3slPSAkJC5zdHJpbmcuc3Vic3RpdHV0ZSgkJC53aXRoVGV4dCwgeyBvYmplY3Q6ICQkLnVuc3BlY2lmaWVkVGV4dCB9KSAlfScsXHJcbiAgICAneyUgfSBlbHNlIHsgJX0nLFxyXG4gICAgJ3slPSAkJC5zdHJpbmcuc3Vic3RpdHV0ZSgkJC5mb3JUZXh0LCB7IHJlYXNvbjogJC5UeXBlIH0pICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICBdKSxcclxuICBhY3Rpdml0eU1vcmVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibGlzdC1tb3JlXCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImFjdGl2aXR5TW9yZU5vZGVcIj4nLFxyXG4gICAgJzxidXR0b24gY2xhc3M9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cImFjdGl2YXRlQWN0aXZpdHlNb3JlXCI+JyxcclxuICAgICc8c3BhbiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiYWN0aXZpdHlSZW1haW5pbmdDb250ZW50Tm9kZVwiPnslPSAkLmNvdW50TW9yZVRleHQgJX08L3NwYW4+JyxcclxuICAgICc8L2J1dHRvbj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgZXZlbnRSb3dUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8bGkgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUVudHJ5XCIgZGF0YS1rZXk9XCJ7JT0gJC4ka2V5ICV9XCIgZGF0YS1kZXNjcmlwdG9yPVwieyU6ICQuJGRlc2NyaXB0b3IgJX1cIiBkYXRhLWFjdGl2aXR5LXR5cGU9XCJFdmVudFwiPicsXHJcbiAgICAneyUhICQkLmV2ZW50SWNvblRlbXBsYXRlICV9JyxcclxuICAgICd7JSEgJCQuYWN0aXZpdHlIZWFkZXJUZW1wbGF0ZSAlfScsXHJcbiAgICAneyUhICQkLmFjdGl2aXR5Rm9vdGVyVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvbGk+JyxcclxuICBdKSxcclxuICBldmVudFRpbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JTogY3JtLkZvcm1hdC5kYXRlKCQuU3RhcnREYXRlLCAkJC5ldmVudERhdGVGb3JtYXRUZXh0KSAlfScsXHJcbiAgICAnJm5ic3A7LSZuYnNwOycsXHJcbiAgICAneyU6IGNybS5Gb3JtYXQuZGF0ZSgkLkVuZERhdGUsICQkLmV2ZW50RGF0ZUZvcm1hdFRleHQpICV9JyxcclxuICBdKSxcclxuICBldmVudEljb25UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwiYWN0aXZpdHlFbnRyeV9faWNvblwiPicsXHJcbiAgICBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4taWNvbiBoaWRlLWZvY3VzXCI+XHJcbiAgICAgIDxzdmcgY2xhc3M9XCJpY29uXCIgZm9jdXNhYmxlPVwiZmFsc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+XHJcbiAgICAgICAgPHVzZSB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bGluazpocmVmPVwiI2ljb24teyU9ICQkLmFjdGl2aXR5VHlwZUljb24uZXZlbnQgJX1cIj48L3VzZT5cclxuICAgICAgPC9zdmc+XHJcbiAgICA8L2J1dHRvbj5gLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgZXZlbnRNb3JlVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImxpc3QtbW9yZVwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJldmVudE1vcmVOb2RlXCI+JyxcclxuICAgICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUV2ZW50TW9yZVwiPicsXHJcbiAgICAnPHNwYW4gZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImV2ZW50UmVtYWluaW5nQ29udGVudE5vZGVcIj57JT0gJC5jb3VudE1vcmVUZXh0ICV9PC9zcGFuPicsXHJcbiAgICAnPC9idXR0b24+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGhlYWRlclJvd1RlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBkYXRhLWRlc2NyaXB0b3I9XCJ7JTogJC5kYXkgJX1cIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJkYXlIZWFkZXJcIj4nLFxyXG4gICAgJzxoNCBjbGFzcz1cImhlYWRlcl9fdGl0bGVcIj57JTogJC5kYXkgJX08L2g0PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcbiAgd2Vla1NlbGVjdFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgYDxkaXYgY2xhc3M9XCJzd2l0Y2hcIj5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICBuYW1lPVwid2Vla1RvZ2dsZU5vZGVcIlxyXG4gICAgICAgICAgaWQ9XCJ3ZWVrVG9nZ2xlTm9kZVwiXHJcbiAgICAgICAgICBjbGFzcz1cInN3aXRjaFwiIC8+XHJcbiAgICAgICAgPGxhYmVsIGNsYXNzPVwidG9nZ2xlV2Vla09yRGF5XCIgZm9yPVwid2Vla1RvZ2dsZU5vZGVcIj57JT0gJC5kYXlUZXh0ICV9PC9sYWJlbD5cclxuICAgICAgPC9kaXY+YCxcclxuICBdKSxcclxuICBhdHRyaWJ1dGVNYXA6IHtcclxuICAgIGNhbGVuZGFyQ29udGVudDoge1xyXG4gICAgICBub2RlOiAnY29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBkYXRlQ29udGVudDoge1xyXG4gICAgICBub2RlOiAnZGF0ZU5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBkYXlUaXRsZUNvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2RheVRpdGxlTm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICAgIGFjdGl2aXR5Q29udGVudDoge1xyXG4gICAgICBub2RlOiAnYWN0aXZpdHlDb250ZW50Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICAgIGV2ZW50Q29udGVudDoge1xyXG4gICAgICBub2RlOiAnZXZlbnRDb250ZW50Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICAgIGV2ZW50UmVtYWluaW5nQ29udGVudDoge1xyXG4gICAgICBub2RlOiAnZXZlbnRSZW1haW5pbmdDb250ZW50Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICAgIGFjdGl2aXR5UmVtYWluaW5nQ29udGVudDoge1xyXG4gICAgICBub2RlOiAnYWN0aXZpdHlSZW1haW5pbmdDb250ZW50Tm9kZScsXHJcbiAgICAgIHR5cGU6ICdpbm5lckhUTUwnLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGV2ZW50Q29udGFpbmVyTm9kZTogbnVsbCxcclxuICBhY3Rpdml0eUNvbnRhaW5lck5vZGU6IG51bGwsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnY2FsZW5kYXJfdmlldycsXHJcbiAgY2xzOiAnYWN0aXZpdGllcy1mb3ItbW9udGgnLFxyXG4gIGluc2VydFZpZXc6ICdhY3Rpdml0eV90eXBlc19saXN0JyxcclxuICBhY3Rpdml0eURldGFpbFZpZXc6ICdhY3Rpdml0eV9kZXRhaWwnLFxyXG4gIGV2ZW50RGV0YWlsVmlldzogJ2V2ZW50X2RldGFpbCcsXHJcbiAgZW5hYmxlU2VhcmNoOiBmYWxzZSxcclxuICBkYXRlQ291bnRzOiBudWxsLFxyXG4gIGN1cnJlbnREYXRlOiBudWxsLFxyXG4gIG1vbnRoQWN0aXZpdGllczogbnVsbCxcclxuICBtb250aEV2ZW50czogbnVsbCxcclxuICBtdWx0aVNlbGVjdDogNyxcclxuICBfZGF0YUxvYWRlZDogZmFsc2UsXHJcbiAgX2V2ZW50U3RvcmU6IG51bGwsXHJcbiAgX3Nob3dNdWx0aTogZmFsc2UsXHJcbiAgX3JlZnJlc2hBZGRlZDogZmFsc2UsXHJcblxyXG5cclxuICBxdWVyeU9yZGVyQnk6ICdTdGFydERhdGUgYXNjJyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgJ1R5cGUnLFxyXG4gICAgJ0FjY291bnROYW1lJyxcclxuICAgICdDb250YWN0TmFtZScsXHJcbiAgICAnTGVhZElkJyxcclxuICAgICdMZWFkTmFtZScsXHJcbiAgICAnVXNlcklkJyxcclxuICAgICdUaW1lbGVzcycsXHJcbiAgICAnUmVjdXJyaW5nJyxcclxuICAgICdOb3RlcycsXHJcbiAgXSxcclxuICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICckZGVzY3JpcHRvcnMnLFxyXG4gICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgXSxcclxuICByZXNvdXJjZUtpbmQ6ICdhY3Rpdml0aWVzJyxcclxuICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG4gIHBhZ2VTaXplOiA1MDAsXHJcbiAgZXZlbnRRdWVyeVdoZXJlOiBudWxsLFxyXG4gIGV2ZW50UXVlcnlTZWxlY3Q6IFtcclxuICAgICdTdGFydERhdGUnLFxyXG4gICAgJ0VuZERhdGUnLFxyXG4gICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICdUeXBlJyxcclxuICBdLFxyXG4gIGV2ZW50SW5jbHVkZTogW1xyXG4gICAgJyRwZXJtaXNzaW9ucycsXHJcbiAgXSxcclxuICBldmVudFJlc291cmNlS2luZDogJ2V2ZW50cycsXHJcbiAgZXZlbnRDb250cmFjdE5hbWU6ICdkeW5hbWljJyxcclxuXHJcbiAgX29uUmVmcmVzaDogZnVuY3Rpb24gX29uUmVmcmVzaChvKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChfb25SZWZyZXNoLCBhcmd1bWVudHMpO1xyXG4gICAgaWYgKG8ucmVzb3VyY2VLaW5kID09PSAnYWN0aXZpdGllcycgfHwgby5yZXNvdXJjZUtpbmQgPT09ICdldmVudHMnKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNoYW5nZURheUFjdGl2aXRpZXM6IGZ1bmN0aW9uIGNoYW5nZURheUFjdGl2aXRpZXMoKSB7XHJcbiAgICAkKHRoaXMuYWN0aXZpdHlDb250YWluZXJOb2RlKS5yZW1vdmVDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcbiAgICBsZXQgbXVsdGlEYXlzID0gW107XHJcbiAgICBsZXQgZW50cmllcztcclxuXHJcbiAgICBpZiAodGhpcy5fc2hvd011bHRpKSB7XHJcbiAgICAgIGNvbnN0IGRhdGVJdGVyYXRvciA9IHRoaXMuY3VycmVudERhdGUuY2xvbmUoKS5zdGFydE9mKCd3ZWVrJyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tdWx0aVNlbGVjdDsgaSsrKSB7XHJcbiAgICAgICAgZW50cmllcyA9IHRoaXMubW9udGhBY3Rpdml0aWVzW2RhdGVJdGVyYXRvci5mb3JtYXQoJ1lZWVktTU0tREQnKV07XHJcbiAgICAgICAgaWYgKGVudHJpZXMpIHtcclxuICAgICAgICAgIG11bHRpRGF5cyA9IG11bHRpRGF5cy5jb25jYXQoZW50cmllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3JlYXRlQWN0aXZpdHlSb3dzKGVudHJpZXMsIGRhdGVJdGVyYXRvci5mb3JtYXQodGhpcy5kYXlIZWFkZXJGb3JtYXQpKTtcclxuICAgICAgICBkYXRlSXRlcmF0b3IuYWRkKDEsICdkYXlzJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG11bHRpRGF5cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB0aGlzLnNldCgnYWN0aXZpdHlDb250ZW50JywgdGhpcy5ub0RhdGFUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVudHJpZXMgPSB0aGlzLm1vbnRoQWN0aXZpdGllc1t0aGlzLmN1cnJlbnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERCcpXTtcclxuICAgICAgdGhpcy5jcmVhdGVBY3Rpdml0eVJvd3MoZW50cmllcywgdGhpcy5jdXJyZW50RGF0ZS5mb3JtYXQodGhpcy5kYXlIZWFkZXJGb3JtYXQpKTtcclxuICAgICAgaWYgKCFlbnRyaWVzKSB7XHJcbiAgICAgICAgdGhpcy5zZXQoJ2FjdGl2aXR5Q29udGVudCcsIHRoaXMubm9EYXRhVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gIH0sXHJcbiAgY3JlYXRlQWN0aXZpdHlSb3dzOiBmdW5jdGlvbiBjcmVhdGVBY3Rpdml0eVJvd3MoZW50cmllcyA9IFtdLCBkYXkpIHtcclxuICAgIGNvbnN0IGNvdW50ID0gZW50cmllcy5sZW5ndGg7XHJcbiAgICBpZiAoY291bnQgPiAwKSB7XHJcbiAgICAgIGNvbnN0IGFjdGl2aXR5RG9jZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgY29uc3QgZXZlbnREb2NmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICBpZiAodGhpcy5fc2hvd011bHRpKSB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyTm9kZSA9ICQodGhpcy5oZWFkZXJSb3dUZW1wbGF0ZS5hcHBseSh7IGRheSB9LCB0aGlzKSkuZ2V0KDApO1xyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZGF5IGhlYWRlciBmb3Igd2hhdGV2ZXIgdHlwZSBjb21lcyBmaXJzdCAoYWN0aXZpdHkgb3IgZXZlbnQpXHJcbiAgICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLmVudHJpZXNbZW50cmllc1swXV07XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZpdHlUeXBlSWNvbltmaXJzdC5UeXBlXSkge1xyXG4gICAgICAgICAgYWN0aXZpdHlEb2NmcmFnLmFwcGVuZENoaWxkKGhlYWRlck5vZGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBldmVudERvY2ZyYWcuYXBwZW5kQ2hpbGQoaGVhZGVyTm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5lbnRyaWVzW2VudHJpZXNbaV1dO1xyXG4gICAgICAgIGxldCByb3dOb2RlO1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5VHlwZUljb25bZW50cnkuVHlwZV0pIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJvd05vZGUgPSAkKHRoaXMuYWN0aXZpdHlSb3dUZW1wbGF0ZS5hcHBseShlbnRyeSwgdGhpcykpLmdldCgwKTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAgICAgcm93Tm9kZSA9ICQodGhpcy5yb3dUZW1wbGF0ZUVycm9yLmFwcGx5KGVudHJ5LCB0aGlzKSkuZ2V0KDApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGFjdGl2aXR5RG9jZnJhZy5hcHBlbmRDaGlsZChyb3dOb2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcm93Tm9kZSA9ICQodGhpcy5ldmVudFJvd1RlbXBsYXRlLmFwcGx5KGVudHJ5LCB0aGlzKSkuZ2V0KDApO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgICAgICByb3dOb2RlID0gJCh0aGlzLnJvd1RlbXBsYXRlRXJyb3IuYXBwbHkoZW50cnksIHRoaXMpKS5nZXQoMCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZXZlbnREb2NmcmFnLmFwcGVuZENoaWxkKHJvd05vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uQXBwbHlSb3dUZW1wbGF0ZShlbnRyeSwgcm93Tm9kZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhY3Rpdml0eURvY2ZyYWcuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCh0aGlzLmFjdGl2aXR5Q29udGVudE5vZGUpLmFwcGVuZChhY3Rpdml0eURvY2ZyYWcpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChldmVudERvY2ZyYWcuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCh0aGlzLmV2ZW50Q29udGFpbmVyTm9kZSkucmVtb3ZlQ2xhc3MoJ2V2ZW50LWhpZGRlbicpO1xyXG4gICAgICAgICQodGhpcy5ldmVudENvbnRlbnROb2RlKS5hcHBlbmQoZXZlbnREb2NmcmFnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlRXZlbnRTdG9yZTogZnVuY3Rpb24gY3JlYXRlRXZlbnRTdG9yZSgpIHtcclxuICAgIGlmICh0aGlzLl9ldmVudFN0b3JlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9ldmVudFN0b3JlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGVtcCA9IHRoaXMuZ2V0KCdzdG9yZScpO1xyXG4gICAgY29uc3Qgc3RvcmUgPSBPYmplY3QuYXNzaWduKHt9LCB0ZW1wKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihzdG9yZSwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHRlbXApKTtcclxuICAgIHN0b3JlLnNlbGVjdCA9IHRoaXMuZXZlbnRRdWVyeVNlbGVjdDtcclxuICAgIHN0b3JlLnJlc291cmNlS2luZCA9IHRoaXMuZXZlbnRSZXNvdXJjZUtpbmQ7XHJcbiAgICBzdG9yZS5jb250cmFjdE5hbWUgPSB0aGlzLmV2ZW50Q29udHJhY3ROYW1lO1xyXG4gICAgc3RvcmUub3JkZXJCeSA9IHRoaXMuZXZlbnRPcmRlckJ5O1xyXG4gICAgc3RvcmUuaW5jbHVkZSA9IHRoaXMuZXZlbnRJbmNsdWRlO1xyXG4gICAgdGhpcy5fZXZlbnRTdG9yZSA9IHN0b3JlO1xyXG4gICAgcmV0dXJuIHN0b3JlO1xyXG4gIH0sXHJcbiAgZm9ybWF0UXVlcnlBY3Rpdml0eTogZnVuY3Rpb24gZm9ybWF0UXVlcnlBY3Rpdml0eSh2YWx1ZSkge1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdmFsdWUuY2xvbmUoKS5zdGFydE9mKCdtb250aCcpO1xyXG4gICAgY29uc3QgZW5kRGF0ZSA9IHZhbHVlLmNsb25lKCkuZW5kT2YoJ21vbnRoJyk7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUoXHJcbiAgICAgIFtcclxuICAgICAgICAnVXNlckFjdGl2aXRpZXMuVXNlcklkIGVxIFwiJHswfVwiIGFuZCBUeXBlIG5lIFwiYXRMaXRlcmF0dXJlXCIgYW5kICgnLFxyXG4gICAgICAgICcoVGltZWxlc3MgZXEgZmFsc2UgYW5kIFN0YXJ0RGF0ZScsXHJcbiAgICAgICAgJyBiZXR3ZWVuIEAkezF9QCBhbmQgQCR7Mn1AKSBvciAnLFxyXG4gICAgICAgICcoVGltZWxlc3MgZXEgdHJ1ZSBhbmQgU3RhcnREYXRlJyxcclxuICAgICAgICAnIGJldHdlZW4gQCR7M31AIGFuZCBAJHs0fUApKScsXHJcbiAgICAgIF0uam9pbignJyksIFtBcHAuY29udGV4dC51c2VyICYmIEFwcC5jb250ZXh0LnVzZXIuJGtleSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUoc3RhcnREYXRlLnRvRGF0ZSgpKSxcclxuICAgICAgICBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUoZW5kRGF0ZS50b0RhdGUoKSksXHJcbiAgICAgICAgc3RhcnREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQwMDowMDowMFtaXScpLFxyXG4gICAgICAgIGVuZERhdGUuZm9ybWF0KCdZWVlZLU1NLUREVDIzOjU5OjU5W1pdJyksXHJcbiAgICAgIF1cclxuICAgICk7XHJcbiAgfSxcclxuICBmb3JtYXRRdWVyeUV2ZW50OiBmdW5jdGlvbiBmb3JtYXRRdWVyeUV2ZW50KHZhbHVlKSB7XHJcbiAgICBjb25zdCB1c2VyID0gQXBwLmNvbnRleHQudXNlciAmJiBBcHAuY29udGV4dC51c2VyLiRrZXk7XHJcbiAgICBjb25zdCBzdGFydCA9IGNvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh2YWx1ZS5jbG9uZSgpLnN0YXJ0T2YoJ21vbnRoJykudG9EYXRlKCkpO1xyXG4gICAgY29uc3QgZW5kID0gY29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHZhbHVlLmNsb25lKCkuZW5kT2YoJ21vbnRoJykudG9EYXRlKCkpO1xyXG4gICAgcmV0dXJuIGBVc2VySWQgZXEgXCIke3VzZXJ9XCIgYW5kICgoU3RhcnREYXRlIGd0IEAke3N0YXJ0fUAgb3IgRW5kRGF0ZSBndCBAJHtzdGFydH1AKSBhbmQgU3RhcnREYXRlIGx0IEAke2VuZH1AKWA7XHJcbiAgfSxcclxuICBoaWdobGlnaHRBY3Rpdml0aWVzOiBmdW5jdGlvbiBoaWdobGlnaHRBY3Rpdml0aWVzKCkge1xyXG4gICAgdGhpcy5fY2FsZW5kYXIud2Vla3NOb2RlLmNoaWxkTm9kZXMuZm9yRWFjaCgod2VlaykgPT4ge1xyXG4gICAgICB3ZWVrLmNoaWxkTm9kZXMuZm9yRWFjaCgoZGF5KSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vbnRoQWN0aXZpdGllc1skKGRheSkuYXR0cignZGF0YS1kYXRlJyldKSB7XHJcbiAgICAgICAgICB0aGlzLl9jYWxlbmRhci5yZW1vdmVBY3RpdmUoZGF5KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jYWxlbmRhci5pc0FjdGl2ZShkYXkpKSB7XHJcbiAgICAgICAgICBkYXkuc3ViVmFsdWUgPSB0aGlzLm1vbnRoQWN0aXZpdGllc1skKGRheSkuYXR0cignZGF0YS1kYXRlJyldO1xyXG4gICAgICAgICAgdGhpcy5fY2FsZW5kYXIuc2V0QWN0aXZlRGF5KGRheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvRGV0YWlsVmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0RldGFpbFZpZXcoa2V5LCBfZGVzY3JpcHRvcikge1xyXG4gICAgbGV0IGRlc2NyaXB0b3IgPSBfZGVzY3JpcHRvcjtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5lbnRyaWVzW2tleV07XHJcbiAgICBjb25zdCBkZXRhaWxWaWV3ID0gKGVudHJ5LmlzRXZlbnQpID8gdGhpcy5ldmVudERldGFpbFZpZXcgOiB0aGlzLmFjdGl2aXR5RGV0YWlsVmlldztcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldyhkZXRhaWxWaWV3KTtcclxuICAgIGRlc2NyaXB0b3IgPSAoZW50cnkuaXNFdmVudCkgPyBkZXNjcmlwdG9yIDogZW50cnkuRGVzY3JpcHRpb247XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIHRpdGxlOiBkZXNjcmlwdG9yLFxyXG4gICAgICAgIGtleSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvSW5zZXJ0VmlldzogZnVuY3Rpb24gbmF2aWdhdGVUb0luc2VydFZpZXcoKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcodGhpcy5pbnNlcnRWaWV3IHx8IHRoaXMuZWRpdFZpZXcpO1xyXG5cclxuICAgIGlmICghdGhpcy5vcHRpb25zKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZSA9IHRoaXMuY3VycmVudERhdGUudG9TdHJpbmcoJ3l5eXktTU0tZGQnKSB8fCBtb21lbnQoKS5zdGFydE9mKCdkYXknKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgbmVnYXRlSGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICByZXR1cm5UbzogdGhpcy5pZCxcclxuICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgICAgY3VycmVudERhdGU6IHRoaXMub3B0aW9ucy5jdXJyZW50RGF0ZS52YWx1ZU9mKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25Ub29sTGF5b3V0Q3JlYXRlZDogZnVuY3Rpb24gb25Ub29sTGF5b3V0Q3JlYXRlZCh0b29scykge1xyXG4gICAgaWYgKCh0b29scyAmJiAhdGhpcy5fcmVmcmVzaEFkZGVkKSAmJiAhd2luZG93LkFwcC5zdXBwb3J0c1RvdWNoKCkpIHtcclxuICAgICAgY29uc3QgcmVmcmVzaFRvb2wgPSB7XHJcbiAgICAgICAgaWQ6ICdyZWZyZXNoJyxcclxuICAgICAgICBzdmc6ICdyZWZyZXNoJyxcclxuICAgICAgICBhY3Rpb246ICdyZWZyZXNoJyxcclxuXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0b29scy50YmFyKSB7XHJcbiAgICAgICAgdG9vbHMudGJhci5wdXNoKHJlZnJlc2hUb29sKTtcclxuICAgICAgICB0aGlzLl9yZWZyZXNoQWRkZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaGVyaXRlZChvblRvb2xMYXlvdXRDcmVhdGVkLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgcGFyc2VOYW1lOiBmdW5jdGlvbiBwYXJzZU5hbWUobmFtZSA9IHt9KSB7XHJcbiAgICByZXR1cm4gbmFtZS5zcGxpdCgnICcpLnNwbGljZSgtMSlbMF07XHJcbiAgfSxcclxuICBwcm9jZXNzOiBmdW5jdGlvbiBwcm9jZXNzKHN0b3JlLCBlbnRyaWVzLCBpc0V2ZW50KSB7XHJcbiAgICBpZiAoZW50cmllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnlQcmVQcm9jZXNzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZW50cnkgPSB0aGlzLl9wcm9jZXNzRW50cnkoZW50cnlQcmVQcm9jZXNzKTtcclxuICAgICAgICAvLyBJZiBrZXkgY29tZXMgYmFjayB3aXRoIG5vdGhpbmcsIGNoZWNrIHRoYXQgdGhlIHN0b3JlIGlzIHByb3Blcmx5XHJcbiAgICAgICAgLy8gc2V0dXAgd2l0aCBhbiBpZFByb3BlcnR5XHJcbiAgICAgICAgZW50cnkuaXNFdmVudCA9IGlzRXZlbnQ7XHJcbiAgICAgICAgY29uc3QgZW50cnlLZXkgPSBzdG9yZS5nZXRJZGVudGl0eShlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5lbnRyaWVzW2VudHJ5S2V5XSA9IGVudHJ5O1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG1vbWVudChjb252ZXJ0LnRvRGF0ZUZyb21TdHJpbmcoZW50cnkuU3RhcnREYXRlKSk7XHJcbiAgICAgICAgaWYgKGVudHJ5LlRpbWVsZXNzKSB7XHJcbiAgICAgICAgICBzdGFydERhdGUuc3VidHJhY3Qoe1xyXG4gICAgICAgICAgICBtaW51dGVzOiBzdGFydERhdGUudXRjT2Zmc2V0KCksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IHN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICBpZiAodGhpcy5tb250aEFjdGl2aXRpZXNbZGF0ZV0pIHtcclxuICAgICAgICAgIHRoaXMubW9udGhBY3Rpdml0aWVzW2RhdGVdLnB1c2goZW50cnlLZXkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm1vbnRoQWN0aXZpdGllc1tkYXRlXSA9IFtlbnRyeUtleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHByb2Nlc3NEYXRhOiBmdW5jdGlvbiBwcm9jZXNzRGF0YShlbnRyaWVzKSB7XHJcbiAgICBpZiAoIWVudHJpZXMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5nZXQoJ3N0b3JlJyk7XHJcblxyXG4gICAgdGhpcy5wcm9jZXNzKHN0b3JlLCBlbnRyaWVzLCBmYWxzZSk7XHJcbiAgfSxcclxuICBwcm9jZXNzRXZlbnREYXRhOiBmdW5jdGlvbiBwcm9jZXNzRXZlbnREYXRhKGVudHJpZXMpIHtcclxuICAgIGlmICghZW50cmllcykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMuY3JlYXRlRXZlbnRTdG9yZSgpO1xyXG5cclxuICAgIHRoaXMucHJvY2VzcyhzdG9yZSwgZW50cmllcywgdHJ1ZSk7XHJcbiAgfSxcclxuICBwcm9jZXNzU2hvd09wdGlvbnM6IGZ1bmN0aW9uIHByb2Nlc3NTaG93T3B0aW9ucyhvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5jdXJyZW50RGF0ZSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnREYXRlID0gbW9tZW50KG9wdGlvbnMuY3VycmVudERhdGUpLnN0YXJ0T2YoJ2RheScpIHx8IG1vbWVudCgpLmNsb25lKCkuc3RhcnRPZignZGF5Jyk7XHJcbiAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9LFxyXG4gIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XHJcbiAgICB0aGlzLnJlbmRlckNhbGVuZGFyKCk7XHJcbiAgICB0aGlzLnJlZnJlc2hEYXRhKCk7XHJcbiAgfSxcclxuICByZWZyZXNoRGF0YTogZnVuY3Rpb24gcmVmcmVzaERhdGEoKSB7XHJcbiAgICB0aGlzLl9kYXRhTG9hZGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9ldmVudFN0b3JlID0gbnVsbDtcclxuICAgICQodGhpcy5hY3Rpdml0eUNvbnRhaW5lck5vZGUpLmFkZENsYXNzKCdsaXN0LWxvYWRpbmcnKTtcclxuICAgIHRoaXMuc2V0KCdhY3Rpdml0eUNvbnRlbnQnLCB0aGlzLmxvYWRpbmdUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICAkKHRoaXMuZXZlbnRDb250ZW50Tm9kZSkuZW1wdHkoKTtcclxuICAgIHRoaXMuY3VycmVudERhdGUgPSB0aGlzLl9jYWxlbmRhci5nZXRTZWxlY3RlZERhdGVNb21lbnQoKTtcclxuICAgIHRoaXMucXVlcnlUZXh0ID0gJyc7XHJcbiAgICB0aGlzLm1vbnRoQWN0aXZpdGllcyA9IFtdO1xyXG4gICAgdGhpcy5hY3Rpdml0eVF1ZXJ5ID0gdGhpcy5mb3JtYXRRdWVyeUFjdGl2aXR5KHRoaXMuY3VycmVudERhdGUpO1xyXG4gICAgdGhpcy5ldmVudFF1ZXJ5ID0gdGhpcy5mb3JtYXRRdWVyeUV2ZW50KHRoaXMuY3VycmVudERhdGUpO1xyXG4gICAgUHJvbWlzZS5hbGwoW3RoaXMucmVxdWVzdERhdGEoKSwgdGhpcy5yZXF1ZXN0RXZlbnREYXRhKCldKS50aGVuKCgpID0+IHtcclxuICAgICAgJCh0aGlzLmFjdGl2aXR5Q29udGVudE5vZGUpLmVtcHR5KCk7XHJcbiAgICAgICQodGhpcy5ldmVudENvbnRlbnROb2RlKS5lbXB0eSgpO1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodEFjdGl2aXRpZXMoKTtcclxuICAgICAgdGhpcy5jaGFuZ2VEYXlBY3Rpdml0aWVzKCk7XHJcbiAgICAgIHRoaXMuX2RhdGFMb2FkZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHJlbmRlciwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIoKTtcclxuICB9LFxyXG4gIHJlbmRlckNhbGVuZGFyOiBmdW5jdGlvbiByZW5kZXJDYWxlbmRhcigpIHtcclxuICAgIGlmICghdGhpcy5fY2FsZW5kYXIpIHtcclxuICAgICAgdGhpcy5fY2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIoeyBpZDogJ2NhbGVuZGFyLXZpZXdfX2NhbGVuZGFyJywgbm9DbGVhckJ1dHRvbjogdHJ1ZSB9KTtcclxuICAgICAgJCh0aGlzLmNhbGVuZGFyTm9kZSkuYXBwZW5kKHRoaXMuX2NhbGVuZGFyLmRvbU5vZGUpO1xyXG4gICAgICBjb25zdCB0b2dnbGUgPSAkKHRoaXMud2Vla1NlbGVjdFRlbXBsYXRlLmFwcGx5KHRoaXMpKS5nZXQoMCk7XHJcbiAgICAgICQodGhpcy5fY2FsZW5kYXIuZm9vdGVyTm9kZSkuYXBwZW5kKHRvZ2dsZSk7XHJcbiAgICAgIG9uKCQodG9nZ2xlKS5jaGlsZHJlbigpWzBdLCAnY2xpY2snLCB0aGlzLnRvZ2dsZU11bHRpU2VsZWN0LmJpbmQodGhpcykpO1xyXG4gICAgICB0aGlzLl9jYWxlbmRhci5vbkNoYW5nZURheSA9IHRoaXMub25DaGFuZ2VEYXkuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5fY2FsZW5kYXIuc2hvdygpO1xyXG4gICAgICB0aGlzLl9jYWxlbmRhci5vblJlZnJlc2hDYWxlbmRhciA9IHRoaXMub25SZWZyZXNoQ2FsZW5kYXIuYmluZCh0aGlzKTsgLy8gTXVzdCBiZSBjYWxsZWQgYWZ0ZXIgc2hvdyBiZWNhdXNlIHRoaXMgd2lsbCBjYWxsIHJlcXVlc3REYXRhIHNpbmNlIHNob3cgY2FsbHMgcmVmcmVzaENhbGVuZGFyXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlZnJlc2hpbmdDYWxlbmRhciA9IHRydWU7XHJcbiAgICAgIHRoaXMuX2NhbGVuZGFyLnJlZnJlc2goZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25SZWZyZXNoQ2FsZW5kYXI6IGZ1bmN0aW9uIG9uUmVmcmVzaENhbGVuZGFyKHJlZnJlc2gpIHtcclxuICAgIGlmIChyZWZyZXNoKSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaERhdGEoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uQ2hhbmdlRGF5OiBmdW5jdGlvbiBvbkNoYW5nZURheSgpIHtcclxuICAgIHRoaXMuc2VsZWN0RGF5KCk7XHJcbiAgfSxcclxuICByZXF1ZXN0RGF0YTogZnVuY3Rpb24gcmVxdWVzdERhdGEoKSB7XHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMuZ2V0KCdzdG9yZScpO1xyXG4gICAgaWYgKHN0b3JlKSB7XHJcbiAgICAgIC8vIGF0dGVtcHQgdG8gdXNlIGEgZG9qbyBzdG9yZVxyXG4gICAgICBjb25zdCBxdWVyeU9wdGlvbnMgPSB7XHJcbiAgICAgICAgY291bnQ6IHRoaXMucGFnZVNpemUsXHJcbiAgICAgICAgc3RhcnQ6IHRoaXMucG9zaXRpb24sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLl9hcHBseVN0YXRlVG9RdWVyeU9wdGlvbnMocXVlcnlPcHRpb25zKTtcclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5RXhwcmVzc2lvbiA9IHRoaXMuX2J1aWxkUXVlcnlFeHByZXNzaW9uKHRoaXMuYWN0aXZpdHlRdWVyeSkgfHwgbnVsbDtcclxuICAgICAgY29uc3QgcXVlcnlSZXN1bHRzID0gc3RvcmUucXVlcnkocXVlcnlFeHByZXNzaW9uLCBxdWVyeU9wdGlvbnMpO1xyXG5cclxuICAgICAgd2hlbihxdWVyeVJlc3VsdHMsXHJcbiAgICAgICAgdGhpcy5wcm9jZXNzRGF0YS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIHRoaXMuX29uUXVlcnlFcnJvci5iaW5kKHRoaXMsIHF1ZXJ5T3B0aW9ucykpO1xyXG5cclxuICAgICAgcmV0dXJuIHF1ZXJ5UmVzdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLndhcm4oJ0Vycm9yIHJlcXVlc3RpbmcgZGF0YSwgbm8gc3RvcmUgd2FzIGRlZmluZWQuIERpZCB5b3UgbWVhbiB0byBtaXhpbiBfU0RhdGFMaXN0TWl4aW4gdG8geW91ciBsaXN0IHZpZXc/Jyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9LFxyXG4gIHJlcXVlc3RFdmVudERhdGE6IGZ1bmN0aW9uIHJlcXVlc3RFdmVudERhdGEoKSB7XHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMuY3JlYXRlRXZlbnRTdG9yZSgpO1xyXG4gICAgaWYgKHN0b3JlKSB7XHJcbiAgICAgIC8vIGF0dGVtcHQgdG8gdXNlIGEgZG9qbyBzdG9yZVxyXG4gICAgICBjb25zdCBxdWVyeU9wdGlvbnMgPSB7XHJcbiAgICAgICAgY291bnQ6IHRoaXMucGFnZVNpemUsXHJcbiAgICAgICAgc3RhcnQ6IHRoaXMucG9zaXRpb24sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLl9hcHBseVN0YXRlVG9RdWVyeU9wdGlvbnMocXVlcnlPcHRpb25zKTtcclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5RXhwcmVzc2lvbiA9IHRoaXMuX2J1aWxkUXVlcnlFeHByZXNzaW9uKHRoaXMuZXZlbnRRdWVyeSkgfHwgbnVsbDtcclxuICAgICAgY29uc3QgcXVlcnlSZXN1bHRzID0gc3RvcmUucXVlcnkocXVlcnlFeHByZXNzaW9uLCBxdWVyeU9wdGlvbnMpO1xyXG5cclxuICAgICAgd2hlbihxdWVyeVJlc3VsdHMsXHJcbiAgICAgICAgdGhpcy5wcm9jZXNzRXZlbnREYXRhLmJpbmQodGhpcyksXHJcbiAgICAgICAgdGhpcy5fb25RdWVyeUVycm9yLmJpbmQodGhpcywgcXVlcnlPcHRpb25zKSk7XHJcblxyXG4gICAgICByZXR1cm4gcXVlcnlSZXN1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUud2FybignRXJyb3IgcmVxdWVzdGluZyBkYXRhLCBubyBzdG9yZSB3YXMgZGVmaW5lZC4gRGlkIHlvdSBtZWFuIHRvIG1peGluIF9TRGF0YUxpc3RNaXhpbiB0byB5b3VyIGxpc3Qgdmlldz8nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIH0sXHJcbiAgc2VsZWN0RGF5OiBmdW5jdGlvbiBzZWxlY3REYXkoKSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuX2NhbGVuZGFyLmdldFNlbGVjdGVkRGF0ZU1vbWVudCgpO1xyXG4gICAgaWYgKHRoaXMuY3VycmVudERhdGUgJiYgdGhpcy5fZGF0YUxvYWRlZCkge1xyXG4gICAgICAkKHRoaXMuYWN0aXZpdHlDb250ZW50Tm9kZSkuZW1wdHkoKTtcclxuICAgICAgJCh0aGlzLmV2ZW50Q29udGVudE5vZGUpLmVtcHR5KCk7XHJcbiAgICAgIHRoaXMuY3VycmVudERhdGUgPSBzZWxlY3RlZDtcclxuICAgICAgdGhpcy5jaGFuZ2VEYXlBY3Rpdml0aWVzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmN1cnJlbnREYXRlID0gc2VsZWN0ZWQ7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93OiBmdW5jdGlvbiBzaG93KG9wdGlvbnMpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHNob3csIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5wcm9jZXNzU2hvd09wdGlvbnMob3B0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHN0YXJ0dXA6IGZ1bmN0aW9uIHN0YXJ0dXAoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChzdGFydHVwLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgdG9nZ2xlTXVsdGlTZWxlY3Q6IGZ1bmN0aW9uIHRvZ2dsZU11bHRpU2VsZWN0KHsgY3VycmVudFRhcmdldCB9KSB7XHJcbiAgICB0aGlzLl9zaG93TXVsdGkgPSAhdGhpcy5fc2hvd011bHRpO1xyXG4gICAgaWYgKHRoaXMuX3Nob3dNdWx0aSkge1xyXG4gICAgICAkKGN1cnJlbnRUYXJnZXQpLm5leHQoKS5odG1sKHRoaXMud2Vla1RleHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChjdXJyZW50VGFyZ2V0KS5uZXh0KCkuaHRtbCh0aGlzLmRheVRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NhbGVuZGFyLnRvZ2dsZVNlbGVjdFdlZWsoKTtcclxuICAgICQodGhpcy5hY3Rpdml0eUNvbnRlbnROb2RlKS5lbXB0eSgpO1xyXG4gICAgJCh0aGlzLmV2ZW50Q29udGVudE5vZGUpLmVtcHR5KCk7XHJcbiAgICB0aGlzLmNoYW5nZURheUFjdGl2aXRpZXMoKTtcclxuICB9LFxyXG4gIF9idWlsZFF1ZXJ5RXhwcmVzc2lvbjogZnVuY3Rpb24gX2J1aWxkUXVlcnlFeHByZXNzaW9uKHF1ZXJ5UGFyYW0gPSB7fSkge1xyXG4gICAgcmV0dXJuIGxhbmcubWl4aW4ocXVlcnlQYXJhbSB8fCB7fSwgdGhpcy5vcHRpb25zICYmICh0aGlzLm9wdGlvbnMucXVlcnkgfHwgdGhpcy5vcHRpb25zLndoZXJlKSk7XHJcbiAgfSxcclxuICB0cmFuc2l0aW9uQXdheTogZnVuY3Rpb24gdHJhbnNpdGlvbkF3YXkoKSB7XHJcbiAgICAkKHRoaXMuX2NhbGVuZGFyLl9tb250aERyb3Bkb3duLmRyb3Bkb3duU2VsZWN0KS5kYXRhKCdkcm9wZG93bicpLmNsb3NlKCk7XHJcbiAgICAkKHRoaXMuX2NhbGVuZGFyLl95ZWFyRHJvcGRvd24uZHJvcGRvd25TZWxlY3QpLmRhdGEoJ2Ryb3Bkb3duJykuY2xvc2UoKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHRyYW5zaXRpb25Bd2F5LCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19