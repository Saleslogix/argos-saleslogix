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
      this.inherited(arguments);
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
      this.inherited(arguments);
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
      this.inherited(arguments);
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
      this.inherited(arguments);

      if (options) {
        this.processShowOptions(options);
      } else {
        this.refreshRequired = true;
        this.renderCalendar();
      }
    },
    startup: function startup() {
      this.inherited(arguments);
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
      this.inherited(arguments);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9DYWxlbmRhci9DYWxlbmRhclZpZXcuanMiXSwibmFtZXMiOlsiYWN0aXZpdHlUeXBlSWNvbnMiLCJyZXNvdXJjZSIsImR0Rm9ybWF0UmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwibW9udGhUaXRsZUZvcm1hdFRleHQiLCJkYXlUaXRsZUZvcm1hdFRleHQiLCJldmVudERhdGVGb3JtYXRUZXh0Iiwic3RhcnRUaW1lRm9ybWF0VGV4dCIsInN0YXJ0VGltZUZvcm1hdFRleHQyNCIsImRheUhlYWRlckZvcm1hdCIsImFsbERheVRleHQiLCJldmVudFRleHQiLCJldmVudEhlYWRlclRleHQiLCJjb3VudE1vcmVUZXh0IiwidG9nZ2xlQ29sbGFwc2VUZXh0Iiwid2l0aEZyb21UZXh0Iiwid2l0aFRleHQiLCJ1bnNwZWNpZmllZFRleHQiLCJmb3JUZXh0IiwiZGF5VGV4dCIsIndlZWtUZXh0IiwiZW5hYmxlUHVsbFRvUmVmcmVzaCIsInN0cmluZyIsIlV0aWxpdHkiLCJ0cmltVG8iLCJhY3Rpdml0eVR5cGVJY29uIiwiZGVmYXVsdCIsIndpZGdldFRlbXBsYXRlIiwiU2ltcGxhdGUiLCJhY3Rpdml0eVJvd1RlbXBsYXRlIiwiYWN0aXZpdHlJY29uVGVtcGxhdGUiLCJhY3Rpdml0eUhlYWRlclRlbXBsYXRlIiwiYWN0aXZpdHlDb250ZW50VGVtcGxhdGUiLCJhY3Rpdml0eUZvb3RlclRlbXBsYXRlIiwiYWN0aXZpdHlOYW1lVGVtcGxhdGUiLCJhY3Rpdml0eU1vcmVUZW1wbGF0ZSIsImV2ZW50Um93VGVtcGxhdGUiLCJldmVudFRpbWVUZW1wbGF0ZSIsImV2ZW50SWNvblRlbXBsYXRlIiwiZXZlbnRNb3JlVGVtcGxhdGUiLCJoZWFkZXJSb3dUZW1wbGF0ZSIsIndlZWtTZWxlY3RUZW1wbGF0ZSIsImF0dHJpYnV0ZU1hcCIsImNhbGVuZGFyQ29udGVudCIsIm5vZGUiLCJ0eXBlIiwiZGF0ZUNvbnRlbnQiLCJkYXlUaXRsZUNvbnRlbnQiLCJhY3Rpdml0eUNvbnRlbnQiLCJldmVudENvbnRlbnQiLCJldmVudFJlbWFpbmluZ0NvbnRlbnQiLCJhY3Rpdml0eVJlbWFpbmluZ0NvbnRlbnQiLCJldmVudENvbnRhaW5lck5vZGUiLCJhY3Rpdml0eUNvbnRhaW5lck5vZGUiLCJpZCIsImNscyIsImluc2VydFZpZXciLCJhY3Rpdml0eURldGFpbFZpZXciLCJldmVudERldGFpbFZpZXciLCJlbmFibGVTZWFyY2giLCJkYXRlQ291bnRzIiwiY3VycmVudERhdGUiLCJtb250aEFjdGl2aXRpZXMiLCJtb250aEV2ZW50cyIsIm11bHRpU2VsZWN0IiwiX2RhdGFMb2FkZWQiLCJfZXZlbnRTdG9yZSIsIl9zaG93TXVsdGkiLCJfcmVmcmVzaEFkZGVkIiwicXVlcnlPcmRlckJ5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJwYWdlU2l6ZSIsImV2ZW50UXVlcnlXaGVyZSIsImV2ZW50UXVlcnlTZWxlY3QiLCJldmVudEluY2x1ZGUiLCJldmVudFJlc291cmNlS2luZCIsImV2ZW50Q29udHJhY3ROYW1lIiwiX29uUmVmcmVzaCIsIm8iLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJyZWZyZXNoUmVxdWlyZWQiLCJjaGFuZ2VEYXlBY3Rpdml0aWVzIiwiJCIsInJlbW92ZUNsYXNzIiwibXVsdGlEYXlzIiwiZW50cmllcyIsImRhdGVJdGVyYXRvciIsImNsb25lIiwic3RhcnRPZiIsImkiLCJmb3JtYXQiLCJjb25jYXQiLCJjcmVhdGVBY3Rpdml0eVJvd3MiLCJhZGQiLCJsZW5ndGgiLCJzZXQiLCJub0RhdGFUZW1wbGF0ZSIsImFwcGx5IiwiZGF5IiwiY291bnQiLCJhY3Rpdml0eURvY2ZyYWciLCJkb2N1bWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJldmVudERvY2ZyYWciLCJoZWFkZXJOb2RlIiwiZ2V0IiwiZmlyc3QiLCJUeXBlIiwiYXBwZW5kQ2hpbGQiLCJlbnRyeSIsInJvd05vZGUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJyb3dUZW1wbGF0ZUVycm9yIiwib25BcHBseVJvd1RlbXBsYXRlIiwiY2hpbGROb2RlcyIsImFjdGl2aXR5Q29udGVudE5vZGUiLCJhcHBlbmQiLCJldmVudENvbnRlbnROb2RlIiwiY3JlYXRlRXZlbnRTdG9yZSIsInRlbXAiLCJzdG9yZSIsIk9iamVjdCIsImFzc2lnbiIsInNldFByb3RvdHlwZU9mIiwiZ2V0UHJvdG90eXBlT2YiLCJzZWxlY3QiLCJvcmRlckJ5IiwiZXZlbnRPcmRlckJ5IiwiaW5jbHVkZSIsImZvcm1hdFF1ZXJ5QWN0aXZpdHkiLCJ2YWx1ZSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJlbmRPZiIsInN1YnN0aXR1dGUiLCJqb2luIiwiQXBwIiwiY29udGV4dCIsInVzZXIiLCIka2V5IiwidG9Jc29TdHJpbmdGcm9tRGF0ZSIsInRvRGF0ZSIsImZvcm1hdFF1ZXJ5RXZlbnQiLCJzdGFydCIsImVuZCIsImhpZ2hsaWdodEFjdGl2aXRpZXMiLCJfY2FsZW5kYXIiLCJ3ZWVrc05vZGUiLCJmb3JFYWNoIiwid2VlayIsImF0dHIiLCJyZW1vdmVBY3RpdmUiLCJpc0FjdGl2ZSIsInN1YlZhbHVlIiwic2V0QWN0aXZlRGF5IiwibmF2aWdhdGVUb0RldGFpbFZpZXciLCJrZXkiLCJfZGVzY3JpcHRvciIsImRlc2NyaXB0b3IiLCJkZXRhaWxWaWV3IiwiaXNFdmVudCIsInZpZXciLCJnZXRWaWV3IiwiRGVzY3JpcHRpb24iLCJzaG93IiwidGl0bGUiLCJuYXZpZ2F0ZVRvSW5zZXJ0VmlldyIsImVkaXRWaWV3Iiwib3B0aW9ucyIsInRvU3RyaW5nIiwibW9tZW50IiwibmVnYXRlSGlzdG9yeSIsInJldHVyblRvIiwiaW5zZXJ0IiwidmFsdWVPZiIsIm9uVG9vbExheW91dENyZWF0ZWQiLCJ0b29scyIsIndpbmRvdyIsInN1cHBvcnRzVG91Y2giLCJyZWZyZXNoVG9vbCIsInN2ZyIsImFjdGlvbiIsInRiYXIiLCJwdXNoIiwicGFyc2VOYW1lIiwibmFtZSIsInNwbGl0Iiwic3BsaWNlIiwicHJvY2VzcyIsImVudHJ5UHJlUHJvY2VzcyIsIl9wcm9jZXNzRW50cnkiLCJlbnRyeUtleSIsImdldElkZW50aXR5IiwidG9EYXRlRnJvbVN0cmluZyIsIlN0YXJ0RGF0ZSIsIlRpbWVsZXNzIiwic3VidHJhY3QiLCJtaW51dGVzIiwidXRjT2Zmc2V0IiwiZGF0ZSIsInByb2Nlc3NEYXRhIiwicHJvY2Vzc0V2ZW50RGF0YSIsInByb2Nlc3NTaG93T3B0aW9ucyIsInJlZnJlc2giLCJyZW5kZXJDYWxlbmRhciIsInJlZnJlc2hEYXRhIiwiYWRkQ2xhc3MiLCJsb2FkaW5nVGVtcGxhdGUiLCJlbXB0eSIsImdldFNlbGVjdGVkRGF0ZU1vbWVudCIsInF1ZXJ5VGV4dCIsImFjdGl2aXR5UXVlcnkiLCJldmVudFF1ZXJ5IiwiUHJvbWlzZSIsImFsbCIsInJlcXVlc3REYXRhIiwicmVxdWVzdEV2ZW50RGF0YSIsInRoZW4iLCJyZW5kZXIiLCJub0NsZWFyQnV0dG9uIiwiY2FsZW5kYXJOb2RlIiwiZG9tTm9kZSIsInRvZ2dsZSIsImZvb3Rlck5vZGUiLCJjaGlsZHJlbiIsInRvZ2dsZU11bHRpU2VsZWN0IiwiYmluZCIsIm9uQ2hhbmdlRGF5Iiwib25SZWZyZXNoQ2FsZW5kYXIiLCJyZWZyZXNoaW5nQ2FsZW5kYXIiLCJzZWxlY3REYXkiLCJxdWVyeU9wdGlvbnMiLCJwb3NpdGlvbiIsIl9hcHBseVN0YXRlVG9RdWVyeU9wdGlvbnMiLCJxdWVyeUV4cHJlc3Npb24iLCJfYnVpbGRRdWVyeUV4cHJlc3Npb24iLCJxdWVyeVJlc3VsdHMiLCJxdWVyeSIsIl9vblF1ZXJ5RXJyb3IiLCJ3YXJuIiwic2VsZWN0ZWQiLCJzdGFydHVwIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJodG1sIiwidG9nZ2xlU2VsZWN0V2VlayIsInF1ZXJ5UGFyYW0iLCJtaXhpbiIsIndoZXJlIiwidHJhbnNpdGlvbkF3YXkiLCJfbW9udGhEcm9wZG93biIsImRyb3Bk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U0FBTCxDQUFlbUcsZ0JBQWY7QUFDQXJLLFFBQUUsS0FBS21DLG1CQUFQLEVBQTRCNkYsS0FBNUI7QUFDQWhJLFFBQUUsS0FBS3FDLGdCQUFQLEVBQXlCMkYsS0FBekI7QUFDQSxXQUFLakksbUJBQUw7QUFDRCxLQTlsQmdFO0FBK2xCakU0SiwyQkFBdUIsU0FBU0EscUJBQVQsR0FBZ0Q7QUFBQSxVQUFqQlcsVUFBaUIsdUVBQUosRUFBSTs7QUFDckUsYUFBTyxlQUFLQyxLQUFMLENBQVdELGNBQWMsRUFBekIsRUFBNkIsS0FBSzlFLE9BQUwsS0FBaUIsS0FBS0EsT0FBTCxDQUFhcUUsS0FBYixJQUFzQixLQUFLckUsT0FBTCxDQUFhZ0YsS0FBcEQsQ0FBN0IsQ0FBUDtBQUNELEtBam1CZ0U7QUFrbUJqRUMsb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEN6SyxRQUFFLEtBQUtrRSxTQUFMLENBQWV3RyxjQUFmLENBQThCQyxjQUFoQyxFQUFnREMsSUFBaEQsQ0FBcUQsVUFBckQsRUFBaUVDLEtBQWpFO0FBQ0E3SyxRQUFFLEtBQUtrRSxTQUFMLENBQWU0RyxhQUFmLENBQTZCSCxjQUEvQixFQUErQ0MsSUFBL0MsQ0FBb0QsVUFBcEQsRUFBZ0VDLEtBQWhFO0FBQ0EsV0FBS2pMLFNBQUwsQ0FBZUMsU0FBZjtBQUNEO0FBdG1CZ0UsR0FBbkQsQ0FBaEI7O29CQXltQmVqRixPIiwiZmlsZSI6IkNhbGVuZGFyVmlldy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBjb252ZXJ0IGZyb20gJ2FyZ29zL0NvbnZlcnQnO1xyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgb24gZnJvbSAnZG9qby9vbic7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgd2hlbiBmcm9tICdkb2pvL3doZW4nO1xyXG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSAnYXJnb3MvQ2FsZW5kYXInO1xyXG5pbXBvcnQgTGlzdCBmcm9tICdhcmdvcy9MaXN0JztcclxuaW1wb3J0IFV0aWxpdHkgZnJvbSAnLi4vLi4vVXRpbGl0eSc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0ICogYXMgYWN0aXZpdHlUeXBlSWNvbnMgZnJvbSAnLi4vLi4vTW9kZWxzL0FjdGl2aXR5L0FjdGl2aXR5VHlwZUljb24nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY2FsZW5kYXJWaWV3Jyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnY2FsZW5kYXJWaWV3RGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLkNhbGVuZGFyLkNhbGVuZGFyVmlld1xyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5MaXN0XHJcbiAqIEBtaXhpbnMgYXJnb3MuTGlzdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuTGlzdFxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuQ29udmVydFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgY3JtLlV0aWxpdHlcclxuICpcclxuICogQHJlcXVpcmVzIG1vbWVudFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5DYWxlbmRhci5DYWxlbmRhclZpZXcnLCBbTGlzdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBtb250aFRpdGxlRm9ybWF0VGV4dDogZHRGb3JtYXRSZXNvdXJjZS5tb250aFRpdGxlRm9ybWF0VGV4dCxcclxuICBkYXlUaXRsZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZGF5VGl0bGVGb3JtYXRUZXh0LFxyXG4gIGV2ZW50RGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZXZlbnREYXRlRm9ybWF0VGV4dCxcclxuICBzdGFydFRpbWVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0VGltZUZvcm1hdFRleHQsXHJcbiAgc3RhcnRUaW1lRm9ybWF0VGV4dDI0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0VGltZUZvcm1hdFRleHQyNCxcclxuICBkYXlIZWFkZXJGb3JtYXQ6IGR0Rm9ybWF0UmVzb3VyY2UuZGF5SGVhZGVyRm9ybWF0LFxyXG4gIGFsbERheVRleHQ6IHJlc291cmNlLmFsbERheVRleHQsXHJcbiAgZXZlbnRUZXh0OiByZXNvdXJjZS5ldmVudFRleHQsXHJcbiAgZXZlbnRIZWFkZXJUZXh0OiByZXNvdXJjZS5ldmVudEhlYWRlclRleHQsXHJcbiAgY291bnRNb3JlVGV4dDogcmVzb3VyY2UuY291bnRNb3JlVGV4dCxcclxuICB0b2dnbGVDb2xsYXBzZVRleHQ6IHJlc291cmNlLnRvZ2dsZUNvbGxhcHNlVGV4dCxcclxuICB3aXRoRnJvbVRleHQ6IHJlc291cmNlLndpdGhGcm9tVGV4dCxcclxuICB3aXRoVGV4dDogcmVzb3VyY2Uud2l0aFRleHQsXHJcbiAgdW5zcGVjaWZpZWRUZXh0OiByZXNvdXJjZS51bnNwZWNpZmllZFRleHQsXHJcbiAgZm9yVGV4dDogcmVzb3VyY2UuZm9yVGV4dCxcclxuICBkYXlUZXh0OiByZXNvdXJjZS5kYXlUZXh0LFxyXG4gIHdlZWtUZXh0OiByZXNvdXJjZS53ZWVrVGV4dCxcclxuXHJcbiAgZW5hYmxlUHVsbFRvUmVmcmVzaDogdHJ1ZSxcclxuICBzdHJpbmcsXHJcbiAgVXRpbGl0eSxcclxuICB0cmltVG86IDE2LFxyXG4gIGFjdGl2aXR5VHlwZUljb246IGFjdGl2aXR5VHlwZUljb25zLmRlZmF1bHQsXHJcblxyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIHdpZGdldFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgaWQ9XCJ7JT0gJC5pZCAlfVwiIGRhdGEtdGl0bGU9XCJ7JT0gJC50aXRsZVRleHQgJX1cIiBjbGFzcz1cIm92ZXJ0aHJvdyBwYW5lbCB7JT0gJC5jbHMgJX1cIiB7JSBpZiAoJC5yZXNvdXJjZUtpbmQpIHsgJX1kYXRhLXJlc291cmNlLWtpbmQ9XCJ7JT0gJC5yZXNvdXJjZUtpbmQgJX1cInslIH0gJX0+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwib3ZlcnRocm93IHNjcm9sbGVyXCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cInNjcm9sbGVyTm9kZVwiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cInBhbmVsLWNvbnRlbnRcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJjYWxlbmRhckNvbnRhaW5lclwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJjYWxlbmRhck5vZGVcIj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJldmVudC1jb250ZW50IGV2ZW50LWhpZGRlbiBsaXN0dmlld1wiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJldmVudENvbnRhaW5lck5vZGVcIj4nLFxyXG4gICAgJzx1bCBjbGFzcz1cImxpc3QtY29udGVudFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJldmVudENvbnRlbnROb2RlXCI+PC91bD4nLFxyXG4gICAgJ3slISAkLmV2ZW50TW9yZVRlbXBsYXRlICV9JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJhY3Rpdml0eS1jb250ZW50IGxpc3R2aWV3XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImFjdGl2aXR5Q29udGFpbmVyTm9kZVwiPicsXHJcbiAgICAnPHVsIGNsYXNzPVwibGlzdC1jb250ZW50XCIgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImFjdGl2aXR5Q29udGVudE5vZGVcIj48L3VsPicsXHJcbiAgICAneyUhICQuYWN0aXZpdHlNb3JlVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPGRpdiBzdHlsZT1cImNsZWFyOmJvdGhcIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGFjdGl2aXR5Um93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGNsYXNzPVwiYWN0aXZpdHlFbnRyeVwiIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFbnRyeVwiIGRhdGEta2V5PVwieyU9ICQuJGtleSAlfVwiIGRhdGEtZGVzY3JpcHRvcj1cInslOiAkLiRkZXNjcmlwdG9yICV9XCIgZGF0YS1hY3Rpdml0eS10eXBlPVwieyU6ICQuVHlwZSAlfVwiPicsXHJcbiAgICAneyUhICQkLmFjdGl2aXR5SWNvblRlbXBsYXRlICV9JyxcclxuICAgICd7JSEgJCQuYWN0aXZpdHlIZWFkZXJUZW1wbGF0ZSAlfScsXHJcbiAgICAneyUhICQkLmFjdGl2aXR5Q29udGVudFRlbXBsYXRlICV9JyxcclxuICAgICd7JSEgJCQuYWN0aXZpdHlGb290ZXJUZW1wbGF0ZSAlfScsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG4gIGFjdGl2aXR5SWNvblRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhY3Rpdml0eUVudHJ5X19pY29uXCI+JyxcclxuICAgIGA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1pY29uIGhpZGUtZm9jdXNcIj5cclxuICAgICAgPHN2ZyBjbGFzcz1cImljb25cIiBmb2N1c2FibGU9XCJmYWxzZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cclxuICAgICAgICA8dXNlIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHhsaW5rOmhyZWY9XCIjaWNvbi17JT0gJCQuYWN0aXZpdHlUeXBlSWNvblskLlR5cGVdICV9XCI+PC91c2U+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9idXR0b24+PC9kaXY+YCxcclxuICBdKSxcclxuICBhY3Rpdml0eUhlYWRlclRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJhY3Rpdml0eUVudHJ5X19oZWFkZXJcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJoZWFkZXJfX2NvbnRlbnRcIj4nLFxyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLkRlc2NyaXB0aW9uICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1zdWJoZWFkaW5nXCI+eyUhICQkLmFjdGl2aXR5TmFtZVRlbXBsYXRlICV9PC9wPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiaGVhZGVyX190aW1lU3RhbXBcIj4nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwidGltZVN0YW1wX190aW1lIGxpc3R2aWV3LXN1YmhlYWRpbmdcIj4nLFxyXG4gICAgJ3slIGlmICgkLlRpbWVsZXNzKSB7ICV9JyxcclxuICAgICd7JT0gJCQuYWxsRGF5VGV4dCAlfScsXHJcbiAgICAneyUgfSBlbHNlIGlmICgkJC5hY3Rpdml0eVR5cGVJY29uWyQuVHlwZV0pIHsgJX0nLFxyXG4gICAgJ3slOiBjcm0uRm9ybWF0LmRhdGUoJC5TdGFydERhdGUsIChBcHAuaXMyNEhvdXJDbG9jaygpKSA/ICQkLnN0YXJ0VGltZUZvcm1hdFRleHQyNCA6ICQkLnN0YXJ0VGltZUZvcm1hdFRleHQpICV9JyxcclxuICAgICd7JSB9IGVsc2UgeyAlfScsXHJcbiAgICAneyUhICQkLmV2ZW50VGltZVRlbXBsYXRlICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8L3NwYW4+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgYWN0aXZpdHlDb250ZW50VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImFjdGl2aXR5RW50cnlfX2NvbnRlbnRcIj4nLFxyXG4gICAgJ3slIGlmICgkLk5vdGVzKSB7ICV9JyxcclxuICAgICd7JTogJCQuVXRpbGl0eS50cmltVGV4dCgkLk5vdGVzLCAkJC50cmltVG8pICV9JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGFjdGl2aXR5Rm9vdGVyVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImFjdGl2aXR5RW50cnlfX2Zvb3RlclwiPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBhY3Rpdml0eU5hbWVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICd7JSBpZiAoJC5Db250YWN0TmFtZSkgeyAlfScsXHJcbiAgICAneyU9ICQkLnN0cmluZy5zdWJzdGl0dXRlKCQkLndpdGhGcm9tVGV4dCwgeyBjb250YWN0TmFtZTogJCQucGFyc2VOYW1lKCQuQ29udGFjdE5hbWUpLCBhY2NvdW50TmFtZTogJC5BY2NvdW50TmFtZSB9KSAlfScsXHJcbiAgICAneyUgfSBlbHNlIGlmICgkLkFjY291bnROYW1lKSB7ICV9JyxcclxuICAgICd7JT0gJCQuc3RyaW5nLnN1YnN0aXR1dGUoJCQud2l0aFRleHQsIHsgb2JqZWN0OiAkLkFjY291bnROYW1lIH0pICV9JyxcclxuICAgICd7JSB9IGVsc2UgaWYgKCQuTGVhZE5hbWUpIHsgJX0nLFxyXG4gICAgJ3slPSAkJC5zdHJpbmcuc3Vic3RpdHV0ZSgkJC53aXRoVGV4dCwgeyBvYmplY3Q6ICQuTGVhZE5hbWUgfSkgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSBpZiAoJCQuYWN0aXZpdHlUeXBlSWNvblskLlR5cGVdKSB7ICV9JyxcclxuICAgICd7JT0gJCQuc3RyaW5nLnN1YnN0aXR1dGUoJCQud2l0aFRleHQsIHsgb2JqZWN0OiAkJC51bnNwZWNpZmllZFRleHQgfSkgJX0nLFxyXG4gICAgJ3slIH0gZWxzZSB7ICV9JyxcclxuICAgICd7JT0gJCQuc3RyaW5nLnN1YnN0aXR1dGUoJCQuZm9yVGV4dCwgeyByZWFzb246ICQuVHlwZSB9KSAlfScsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgXSksXHJcbiAgYWN0aXZpdHlNb3JlVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImxpc3QtbW9yZVwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJhY3Rpdml0eU1vcmVOb2RlXCI+JyxcclxuICAgICc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJhY3RpdmF0ZUFjdGl2aXR5TW9yZVwiPicsXHJcbiAgICAnPHNwYW4gZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cImFjdGl2aXR5UmVtYWluaW5nQ29udGVudE5vZGVcIj57JT0gJC5jb3VudE1vcmVUZXh0ICV9PC9zcGFuPicsXHJcbiAgICAnPC9idXR0b24+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGV2ZW50Um93VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFbnRyeVwiIGRhdGEta2V5PVwieyU9ICQuJGtleSAlfVwiIGRhdGEtZGVzY3JpcHRvcj1cInslOiAkLiRkZXNjcmlwdG9yICV9XCIgZGF0YS1hY3Rpdml0eS10eXBlPVwiRXZlbnRcIj4nLFxyXG4gICAgJ3slISAkJC5ldmVudEljb25UZW1wbGF0ZSAlfScsXHJcbiAgICAneyUhICQkLmFjdGl2aXR5SGVhZGVyVGVtcGxhdGUgJX0nLFxyXG4gICAgJ3slISAkJC5hY3Rpdml0eUZvb3RlclRlbXBsYXRlICV9JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcbiAgZXZlbnRUaW1lVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAneyU6IGNybS5Gb3JtYXQuZGF0ZSgkLlN0YXJ0RGF0ZSwgJCQuZXZlbnREYXRlRm9ybWF0VGV4dCkgJX0nLFxyXG4gICAgJyZuYnNwOy0mbmJzcDsnLFxyXG4gICAgJ3slOiBjcm0uRm9ybWF0LmRhdGUoJC5FbmREYXRlLCAkJC5ldmVudERhdGVGb3JtYXRUZXh0KSAlfScsXHJcbiAgXSksXHJcbiAgZXZlbnRJY29uVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cImFjdGl2aXR5RW50cnlfX2ljb25cIj4nLFxyXG4gICAgYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWljb24gaGlkZS1mb2N1c1wiPlxyXG4gICAgICA8c3ZnIGNsYXNzPVwiaWNvblwiIGZvY3VzYWJsZT1cImZhbHNlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxyXG4gICAgICAgIDx1c2UgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeGxpbms6aHJlZj1cIiNpY29uLXslPSAkJC5hY3Rpdml0eVR5cGVJY29uLmV2ZW50ICV9XCI+PC91c2U+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgPC9idXR0b24+YCxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGV2ZW50TW9yZVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJsaXN0LW1vcmVcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiZXZlbnRNb3JlTm9kZVwiPicsXHJcbiAgICAnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwiYWN0aXZhdGVFdmVudE1vcmVcIj4nLFxyXG4gICAgJzxzcGFuIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJldmVudFJlbWFpbmluZ0NvbnRlbnROb2RlXCI+eyU9ICQuY291bnRNb3JlVGV4dCAlfTwvc3Bhbj4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBoZWFkZXJSb3dUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8bGkgZGF0YS1kZXNjcmlwdG9yPVwieyU6ICQuZGF5ICV9XCI+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiZGF5SGVhZGVyXCI+JyxcclxuICAgICc8aDQgY2xhc3M9XCJoZWFkZXJfX3RpdGxlXCI+eyU6ICQuZGF5ICV9PC9oND4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG4gIHdlZWtTZWxlY3RUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgIGA8ZGl2IGNsYXNzPVwic3dpdGNoXCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxyXG4gICAgICAgICAgbmFtZT1cIndlZWtUb2dnbGVOb2RlXCJcclxuICAgICAgICAgIGlkPVwid2Vla1RvZ2dsZU5vZGVcIlxyXG4gICAgICAgICAgY2xhc3M9XCJzd2l0Y2hcIiAvPlxyXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cInRvZ2dsZVdlZWtPckRheVwiIGZvcj1cIndlZWtUb2dnbGVOb2RlXCI+eyU9ICQuZGF5VGV4dCAlfTwvbGFiZWw+XHJcbiAgICAgIDwvZGl2PmAsXHJcbiAgXSksXHJcbiAgYXR0cmlidXRlTWFwOiB7XHJcbiAgICBjYWxlbmRhckNvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2NvbnRlbnROb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgZGF0ZUNvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2RhdGVOb2RlJyxcclxuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXHJcbiAgICB9LFxyXG4gICAgZGF5VGl0bGVDb250ZW50OiB7XHJcbiAgICAgIG5vZGU6ICdkYXlUaXRsZU5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBhY3Rpdml0eUNvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2FjdGl2aXR5Q29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBldmVudENvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2V2ZW50Q29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBldmVudFJlbWFpbmluZ0NvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2V2ZW50UmVtYWluaW5nQ29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgICBhY3Rpdml0eVJlbWFpbmluZ0NvbnRlbnQ6IHtcclxuICAgICAgbm9kZTogJ2FjdGl2aXR5UmVtYWluaW5nQ29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBldmVudENvbnRhaW5lck5vZGU6IG51bGwsXHJcbiAgYWN0aXZpdHlDb250YWluZXJOb2RlOiBudWxsLFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBpZDogJ2NhbGVuZGFyX3ZpZXcnLFxyXG4gIGNsczogJ2FjdGl2aXRpZXMtZm9yLW1vbnRoJyxcclxuICBpbnNlcnRWaWV3OiAnYWN0aXZpdHlfdHlwZXNfbGlzdCcsXHJcbiAgYWN0aXZpdHlEZXRhaWxWaWV3OiAnYWN0aXZpdHlfZGV0YWlsJyxcclxuICBldmVudERldGFpbFZpZXc6ICdldmVudF9kZXRhaWwnLFxyXG4gIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgZGF0ZUNvdW50czogbnVsbCxcclxuICBjdXJyZW50RGF0ZTogbnVsbCxcclxuICBtb250aEFjdGl2aXRpZXM6IG51bGwsXHJcbiAgbW9udGhFdmVudHM6IG51bGwsXHJcbiAgbXVsdGlTZWxlY3Q6IDcsXHJcbiAgX2RhdGFMb2FkZWQ6IGZhbHNlLFxyXG4gIF9ldmVudFN0b3JlOiBudWxsLFxyXG4gIF9zaG93TXVsdGk6IGZhbHNlLFxyXG4gIF9yZWZyZXNoQWRkZWQ6IGZhbHNlLFxyXG5cclxuXHJcbiAgcXVlcnlPcmRlckJ5OiAnU3RhcnREYXRlIGFzYycsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdTdGFydERhdGUnLFxyXG4gICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICdUeXBlJyxcclxuICAgICdBY2NvdW50TmFtZScsXHJcbiAgICAnQ29udGFjdE5hbWUnLFxyXG4gICAgJ0xlYWRJZCcsXHJcbiAgICAnTGVhZE5hbWUnLFxyXG4gICAgJ1VzZXJJZCcsXHJcbiAgICAnVGltZWxlc3MnLFxyXG4gICAgJ1JlY3VycmluZycsXHJcbiAgICAnTm90ZXMnLFxyXG4gIF0sXHJcbiAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAnJGRlc2NyaXB0b3JzJyxcclxuICAgICckcGVybWlzc2lvbnMnLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAnYWN0aXZpdGllcycsXHJcbiAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICBwYWdlU2l6ZTogNTAwLFxyXG4gIGV2ZW50UXVlcnlXaGVyZTogbnVsbCxcclxuICBldmVudFF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnU3RhcnREYXRlJyxcclxuICAgICdFbmREYXRlJyxcclxuICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAnVHlwZScsXHJcbiAgXSxcclxuICBldmVudEluY2x1ZGU6IFtcclxuICAgICckcGVybWlzc2lvbnMnLFxyXG4gIF0sXHJcbiAgZXZlbnRSZXNvdXJjZUtpbmQ6ICdldmVudHMnLFxyXG4gIGV2ZW50Q29udHJhY3ROYW1lOiAnZHluYW1pYycsXHJcblxyXG4gIF9vblJlZnJlc2g6IGZ1bmN0aW9uIF9vblJlZnJlc2gobykge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIGlmIChvLnJlc291cmNlS2luZCA9PT0gJ2FjdGl2aXRpZXMnIHx8IG8ucmVzb3VyY2VLaW5kID09PSAnZXZlbnRzJykge1xyXG4gICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGFuZ2VEYXlBY3Rpdml0aWVzOiBmdW5jdGlvbiBjaGFuZ2VEYXlBY3Rpdml0aWVzKCkge1xyXG4gICAgJCh0aGlzLmFjdGl2aXR5Q29udGFpbmVyTm9kZSkucmVtb3ZlQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gICAgbGV0IG11bHRpRGF5cyA9IFtdO1xyXG4gICAgbGV0IGVudHJpZXM7XHJcblxyXG4gICAgaWYgKHRoaXMuX3Nob3dNdWx0aSkge1xyXG4gICAgICBjb25zdCBkYXRlSXRlcmF0b3IgPSB0aGlzLmN1cnJlbnREYXRlLmNsb25lKCkuc3RhcnRPZignd2VlaycpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubXVsdGlTZWxlY3Q7IGkrKykge1xyXG4gICAgICAgIGVudHJpZXMgPSB0aGlzLm1vbnRoQWN0aXZpdGllc1tkYXRlSXRlcmF0b3IuZm9ybWF0KCdZWVlZLU1NLUREJyldO1xyXG4gICAgICAgIGlmIChlbnRyaWVzKSB7XHJcbiAgICAgICAgICBtdWx0aURheXMgPSBtdWx0aURheXMuY29uY2F0KGVudHJpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNyZWF0ZUFjdGl2aXR5Um93cyhlbnRyaWVzLCBkYXRlSXRlcmF0b3IuZm9ybWF0KHRoaXMuZGF5SGVhZGVyRm9ybWF0KSk7XHJcbiAgICAgICAgZGF0ZUl0ZXJhdG9yLmFkZCgxLCAnZGF5cycpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChtdWx0aURheXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5zZXQoJ2FjdGl2aXR5Q29udGVudCcsIHRoaXMubm9EYXRhVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbnRyaWVzID0gdGhpcy5tb250aEFjdGl2aXRpZXNbdGhpcy5jdXJyZW50RGF0ZS5mb3JtYXQoJ1lZWVktTU0tREQnKV07XHJcbiAgICAgIHRoaXMuY3JlYXRlQWN0aXZpdHlSb3dzKGVudHJpZXMsIHRoaXMuY3VycmVudERhdGUuZm9ybWF0KHRoaXMuZGF5SGVhZGVyRm9ybWF0KSk7XHJcbiAgICAgIGlmICghZW50cmllcykge1xyXG4gICAgICAgIHRoaXMuc2V0KCdhY3Rpdml0eUNvbnRlbnQnLCB0aGlzLm5vRGF0YVRlbXBsYXRlLmFwcGx5KHRoaXMpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybjtcclxuICB9LFxyXG4gIGNyZWF0ZUFjdGl2aXR5Um93czogZnVuY3Rpb24gY3JlYXRlQWN0aXZpdHlSb3dzKGVudHJpZXMgPSBbXSwgZGF5KSB7XHJcbiAgICBjb25zdCBjb3VudCA9IGVudHJpZXMubGVuZ3RoO1xyXG4gICAgaWYgKGNvdW50ID4gMCkge1xyXG4gICAgICBjb25zdCBhY3Rpdml0eURvY2ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgIGNvbnN0IGV2ZW50RG9jZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgaWYgKHRoaXMuX3Nob3dNdWx0aSkge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlck5vZGUgPSAkKHRoaXMuaGVhZGVyUm93VGVtcGxhdGUuYXBwbHkoeyBkYXkgfSwgdGhpcykpLmdldCgwKTtcclxuICAgICAgICAvLyBDcmVhdGUgdGhlIGRheSBoZWFkZXIgZm9yIHdoYXRldmVyIHR5cGUgY29tZXMgZmlyc3QgKGFjdGl2aXR5IG9yIGV2ZW50KVxyXG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5lbnRyaWVzW2VudHJpZXNbMF1dO1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5VHlwZUljb25bZmlyc3QuVHlwZV0pIHtcclxuICAgICAgICAgIGFjdGl2aXR5RG9jZnJhZy5hcHBlbmRDaGlsZChoZWFkZXJOb2RlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXZlbnREb2NmcmFnLmFwcGVuZENoaWxkKGhlYWRlck5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllc1tlbnRyaWVzW2ldXTtcclxuICAgICAgICBsZXQgcm93Tm9kZTtcclxuICAgICAgICBpZiAodGhpcy5hY3Rpdml0eVR5cGVJY29uW2VudHJ5LlR5cGVdKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByb3dOb2RlID0gJCh0aGlzLmFjdGl2aXR5Um93VGVtcGxhdGUuYXBwbHkoZW50cnksIHRoaXMpKS5nZXQoMCk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgICAgIHJvd05vZGUgPSAkKHRoaXMucm93VGVtcGxhdGVFcnJvci5hcHBseShlbnRyeSwgdGhpcykpLmdldCgwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBhY3Rpdml0eURvY2ZyYWcuYXBwZW5kQ2hpbGQocm93Tm9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJvd05vZGUgPSAkKHRoaXMuZXZlbnRSb3dUZW1wbGF0ZS5hcHBseShlbnRyeSwgdGhpcykpLmdldCgwKTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAgICAgcm93Tm9kZSA9ICQodGhpcy5yb3dUZW1wbGF0ZUVycm9yLmFwcGx5KGVudHJ5LCB0aGlzKSkuZ2V0KDApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGV2ZW50RG9jZnJhZy5hcHBlbmRDaGlsZChyb3dOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkFwcGx5Um93VGVtcGxhdGUoZW50cnksIHJvd05vZGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYWN0aXZpdHlEb2NmcmFnLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQodGhpcy5hY3Rpdml0eUNvbnRlbnROb2RlKS5hcHBlbmQoYWN0aXZpdHlEb2NmcmFnKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZXZlbnREb2NmcmFnLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQodGhpcy5ldmVudENvbnRhaW5lck5vZGUpLnJlbW92ZUNsYXNzKCdldmVudC1oaWRkZW4nKTtcclxuICAgICAgICAkKHRoaXMuZXZlbnRDb250ZW50Tm9kZSkuYXBwZW5kKGV2ZW50RG9jZnJhZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZUV2ZW50U3RvcmU6IGZ1bmN0aW9uIGNyZWF0ZUV2ZW50U3RvcmUoKSB7XHJcbiAgICBpZiAodGhpcy5fZXZlbnRTdG9yZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnRTdG9yZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRlbXAgPSB0aGlzLmdldCgnc3RvcmUnKTtcclxuICAgIGNvbnN0IHN0b3JlID0gT2JqZWN0LmFzc2lnbih7fSwgdGVtcCk7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3RvcmUsIE9iamVjdC5nZXRQcm90b3R5cGVPZih0ZW1wKSk7XHJcbiAgICBzdG9yZS5zZWxlY3QgPSB0aGlzLmV2ZW50UXVlcnlTZWxlY3Q7XHJcbiAgICBzdG9yZS5yZXNvdXJjZUtpbmQgPSB0aGlzLmV2ZW50UmVzb3VyY2VLaW5kO1xyXG4gICAgc3RvcmUuY29udHJhY3ROYW1lID0gdGhpcy5ldmVudENvbnRyYWN0TmFtZTtcclxuICAgIHN0b3JlLm9yZGVyQnkgPSB0aGlzLmV2ZW50T3JkZXJCeTtcclxuICAgIHN0b3JlLmluY2x1ZGUgPSB0aGlzLmV2ZW50SW5jbHVkZTtcclxuICAgIHRoaXMuX2V2ZW50U3RvcmUgPSBzdG9yZTtcclxuICAgIHJldHVybiBzdG9yZTtcclxuICB9LFxyXG4gIGZvcm1hdFF1ZXJ5QWN0aXZpdHk6IGZ1bmN0aW9uIGZvcm1hdFF1ZXJ5QWN0aXZpdHkodmFsdWUpIHtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHZhbHVlLmNsb25lKCkuc3RhcnRPZignbW9udGgnKTtcclxuICAgIGNvbnN0IGVuZERhdGUgPSB2YWx1ZS5jbG9uZSgpLmVuZE9mKCdtb250aCcpO1xyXG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdGl0dXRlKFxyXG4gICAgICBbXHJcbiAgICAgICAgJ1VzZXJBY3Rpdml0aWVzLlVzZXJJZCBlcSBcIiR7MH1cIiBhbmQgVHlwZSBuZSBcImF0TGl0ZXJhdHVyZVwiIGFuZCAoJyxcclxuICAgICAgICAnKFRpbWVsZXNzIGVxIGZhbHNlIGFuZCBTdGFydERhdGUnLFxyXG4gICAgICAgICcgYmV0d2VlbiBAJHsxfUAgYW5kIEAkezJ9QCkgb3IgJyxcclxuICAgICAgICAnKFRpbWVsZXNzIGVxIHRydWUgYW5kIFN0YXJ0RGF0ZScsXHJcbiAgICAgICAgJyBiZXR3ZWVuIEAkezN9QCBhbmQgQCR7NH1AKSknLFxyXG4gICAgICBdLmpvaW4oJycpLCBbQXBwLmNvbnRleHQudXNlciAmJiBBcHAuY29udGV4dC51c2VyLiRrZXksXHJcbiAgICAgICAgY29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKHN0YXJ0RGF0ZS50b0RhdGUoKSksXHJcbiAgICAgICAgY29udmVydC50b0lzb1N0cmluZ0Zyb21EYXRlKGVuZERhdGUudG9EYXRlKCkpLFxyXG4gICAgICAgIHN0YXJ0RGF0ZS5mb3JtYXQoJ1lZWVktTU0tRERUMDA6MDA6MDBbWl0nKSxcclxuICAgICAgICBlbmREYXRlLmZvcm1hdCgnWVlZWS1NTS1ERFQyMzo1OTo1OVtaXScpLFxyXG4gICAgICBdXHJcbiAgICApO1xyXG4gIH0sXHJcbiAgZm9ybWF0UXVlcnlFdmVudDogZnVuY3Rpb24gZm9ybWF0UXVlcnlFdmVudCh2YWx1ZSkge1xyXG4gICAgY29uc3QgdXNlciA9IEFwcC5jb250ZXh0LnVzZXIgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5O1xyXG4gICAgY29uc3Qgc3RhcnQgPSBjb252ZXJ0LnRvSXNvU3RyaW5nRnJvbURhdGUodmFsdWUuY2xvbmUoKS5zdGFydE9mKCdtb250aCcpLnRvRGF0ZSgpKTtcclxuICAgIGNvbnN0IGVuZCA9IGNvbnZlcnQudG9Jc29TdHJpbmdGcm9tRGF0ZSh2YWx1ZS5jbG9uZSgpLmVuZE9mKCdtb250aCcpLnRvRGF0ZSgpKTtcclxuICAgIHJldHVybiBgVXNlcklkIGVxIFwiJHt1c2VyfVwiIGFuZCAoKFN0YXJ0RGF0ZSBndCBAJHtzdGFydH1AIG9yIEVuZERhdGUgZ3QgQCR7c3RhcnR9QCkgYW5kIFN0YXJ0RGF0ZSBsdCBAJHtlbmR9QClgO1xyXG4gIH0sXHJcbiAgaGlnaGxpZ2h0QWN0aXZpdGllczogZnVuY3Rpb24gaGlnaGxpZ2h0QWN0aXZpdGllcygpIHtcclxuICAgIHRoaXMuX2NhbGVuZGFyLndlZWtzTm9kZS5jaGlsZE5vZGVzLmZvckVhY2goKHdlZWspID0+IHtcclxuICAgICAgd2Vlay5jaGlsZE5vZGVzLmZvckVhY2goKGRheSkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5tb250aEFjdGl2aXRpZXNbJChkYXkpLmF0dHIoJ2RhdGEtZGF0ZScpXSkge1xyXG4gICAgICAgICAgdGhpcy5fY2FsZW5kYXIucmVtb3ZlQWN0aXZlKGRheSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fY2FsZW5kYXIuaXNBY3RpdmUoZGF5KSkge1xyXG4gICAgICAgICAgZGF5LnN1YlZhbHVlID0gdGhpcy5tb250aEFjdGl2aXRpZXNbJChkYXkpLmF0dHIoJ2RhdGEtZGF0ZScpXTtcclxuICAgICAgICAgIHRoaXMuX2NhbGVuZGFyLnNldEFjdGl2ZURheShkYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0RldGFpbFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9EZXRhaWxWaWV3KGtleSwgX2Rlc2NyaXB0b3IpIHtcclxuICAgIGxldCBkZXNjcmlwdG9yID0gX2Rlc2NyaXB0b3I7XHJcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllc1trZXldO1xyXG4gICAgY29uc3QgZGV0YWlsVmlldyA9IChlbnRyeS5pc0V2ZW50KSA/IHRoaXMuZXZlbnREZXRhaWxWaWV3IDogdGhpcy5hY3Rpdml0eURldGFpbFZpZXc7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoZGV0YWlsVmlldyk7XHJcbiAgICBkZXNjcmlwdG9yID0gKGVudHJ5LmlzRXZlbnQpID8gZGVzY3JpcHRvciA6IGVudHJ5LkRlc2NyaXB0aW9uO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICB0aXRsZTogZGVzY3JpcHRvcixcclxuICAgICAgICBrZXksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgbmF2aWdhdGVUb0luc2VydFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9JbnNlcnRWaWV3KCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KHRoaXMuaW5zZXJ0VmlldyB8fCB0aGlzLmVkaXRWaWV3KTtcclxuXHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucykge1xyXG4gICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9wdGlvbnMuY3VycmVudERhdGUgPSB0aGlzLmN1cnJlbnREYXRlLnRvU3RyaW5nKCd5eXl5LU1NLWRkJykgfHwgbW9tZW50KCkuc3RhcnRPZignZGF5Jyk7XHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgIG5lZ2F0ZUhpc3Rvcnk6IHRydWUsXHJcbiAgICAgICAgcmV0dXJuVG86IHRoaXMuaWQsXHJcbiAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICAgIGN1cnJlbnREYXRlOiB0aGlzLm9wdGlvbnMuY3VycmVudERhdGUudmFsdWVPZigpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uVG9vbExheW91dENyZWF0ZWQ6IGZ1bmN0aW9uIG9uVG9vbExheW91dENyZWF0ZWQodG9vbHMpIHtcclxuICAgIGlmICgodG9vbHMgJiYgIXRoaXMuX3JlZnJlc2hBZGRlZCkgJiYgIXdpbmRvdy5BcHAuc3VwcG9ydHNUb3VjaCgpKSB7XHJcbiAgICAgIGNvbnN0IHJlZnJlc2hUb29sID0ge1xyXG4gICAgICAgIGlkOiAncmVmcmVzaCcsXHJcbiAgICAgICAgc3ZnOiAncmVmcmVzaCcsXHJcbiAgICAgICAgYWN0aW9uOiAncmVmcmVzaCcsXHJcblxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodG9vbHMudGJhcikge1xyXG4gICAgICAgIHRvb2xzLnRiYXIucHVzaChyZWZyZXNoVG9vbCk7XHJcbiAgICAgICAgdGhpcy5fcmVmcmVzaEFkZGVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIHBhcnNlTmFtZTogZnVuY3Rpb24gcGFyc2VOYW1lKG5hbWUgPSB7fSkge1xyXG4gICAgcmV0dXJuIG5hbWUuc3BsaXQoJyAnKS5zcGxpY2UoLTEpWzBdO1xyXG4gIH0sXHJcbiAgcHJvY2VzczogZnVuY3Rpb24gcHJvY2VzcyhzdG9yZSwgZW50cmllcywgaXNFdmVudCkge1xyXG4gICAgaWYgKGVudHJpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5UHJlUHJvY2VzcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fcHJvY2Vzc0VudHJ5KGVudHJ5UHJlUHJvY2Vzcyk7XHJcbiAgICAgICAgLy8gSWYga2V5IGNvbWVzIGJhY2sgd2l0aCBub3RoaW5nLCBjaGVjayB0aGF0IHRoZSBzdG9yZSBpcyBwcm9wZXJseVxyXG4gICAgICAgIC8vIHNldHVwIHdpdGggYW4gaWRQcm9wZXJ0eVxyXG4gICAgICAgIGVudHJ5LmlzRXZlbnQgPSBpc0V2ZW50O1xyXG4gICAgICAgIGNvbnN0IGVudHJ5S2V5ID0gc3RvcmUuZ2V0SWRlbnRpdHkoZW50cnkpO1xyXG4gICAgICAgIHRoaXMuZW50cmllc1tlbnRyeUtleV0gPSBlbnRyeTtcclxuICAgICAgICBjb25zdCBzdGFydERhdGUgPSBtb21lbnQoY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGVudHJ5LlN0YXJ0RGF0ZSkpO1xyXG4gICAgICAgIGlmIChlbnRyeS5UaW1lbGVzcykge1xyXG4gICAgICAgICAgc3RhcnREYXRlLnN1YnRyYWN0KHtcclxuICAgICAgICAgICAgbWludXRlczogc3RhcnREYXRlLnV0Y09mZnNldCgpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBzdGFydERhdGUuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgaWYgKHRoaXMubW9udGhBY3Rpdml0aWVzW2RhdGVdKSB7XHJcbiAgICAgICAgICB0aGlzLm1vbnRoQWN0aXZpdGllc1tkYXRlXS5wdXNoKGVudHJ5S2V5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5tb250aEFjdGl2aXRpZXNbZGF0ZV0gPSBbZW50cnlLZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9jZXNzRGF0YTogZnVuY3Rpb24gcHJvY2Vzc0RhdGEoZW50cmllcykge1xyXG4gICAgaWYgKCFlbnRyaWVzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMuZ2V0KCdzdG9yZScpO1xyXG5cclxuICAgIHRoaXMucHJvY2VzcyhzdG9yZSwgZW50cmllcywgZmFsc2UpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0V2ZW50RGF0YTogZnVuY3Rpb24gcHJvY2Vzc0V2ZW50RGF0YShlbnRyaWVzKSB7XHJcbiAgICBpZiAoIWVudHJpZXMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLmNyZWF0ZUV2ZW50U3RvcmUoKTtcclxuXHJcbiAgICB0aGlzLnByb2Nlc3Moc3RvcmUsIGVudHJpZXMsIHRydWUpO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc1Nob3dPcHRpb25zOiBmdW5jdGlvbiBwcm9jZXNzU2hvd09wdGlvbnMob3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMuY3VycmVudERhdGUpIHtcclxuICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IG1vbWVudChvcHRpb25zLmN1cnJlbnREYXRlKS5zdGFydE9mKCdkYXknKSB8fCBtb21lbnQoKS5jbG9uZSgpLnN0YXJ0T2YoJ2RheScpO1xyXG4gICAgICB0aGlzLnJlZnJlc2hSZXF1aXJlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICByZWZyZXNoOiBmdW5jdGlvbiByZWZyZXNoKCkge1xyXG4gICAgdGhpcy5yZW5kZXJDYWxlbmRhcigpO1xyXG4gICAgdGhpcy5yZWZyZXNoRGF0YSgpO1xyXG4gIH0sXHJcbiAgcmVmcmVzaERhdGE6IGZ1bmN0aW9uIHJlZnJlc2hEYXRhKCkge1xyXG4gICAgdGhpcy5fZGF0YUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZXZlbnRTdG9yZSA9IG51bGw7XHJcbiAgICAkKHRoaXMuYWN0aXZpdHlDb250YWluZXJOb2RlKS5hZGRDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcbiAgICB0aGlzLnNldCgnYWN0aXZpdHlDb250ZW50JywgdGhpcy5sb2FkaW5nVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gICAgJCh0aGlzLmV2ZW50Q29udGVudE5vZGUpLmVtcHR5KCk7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlID0gdGhpcy5fY2FsZW5kYXIuZ2V0U2VsZWN0ZWREYXRlTW9tZW50KCk7XHJcbiAgICB0aGlzLnF1ZXJ5VGV4dCA9ICcnO1xyXG4gICAgdGhpcy5tb250aEFjdGl2aXRpZXMgPSBbXTtcclxuICAgIHRoaXMuYWN0aXZpdHlRdWVyeSA9IHRoaXMuZm9ybWF0UXVlcnlBY3Rpdml0eSh0aGlzLmN1cnJlbnREYXRlKTtcclxuICAgIHRoaXMuZXZlbnRRdWVyeSA9IHRoaXMuZm9ybWF0UXVlcnlFdmVudCh0aGlzLmN1cnJlbnREYXRlKTtcclxuICAgIFByb21pc2UuYWxsKFt0aGlzLnJlcXVlc3REYXRhKCksIHRoaXMucmVxdWVzdEV2ZW50RGF0YSgpXSkudGhlbigoKSA9PiB7XHJcbiAgICAgICQodGhpcy5hY3Rpdml0eUNvbnRlbnROb2RlKS5lbXB0eSgpO1xyXG4gICAgICAkKHRoaXMuZXZlbnRDb250ZW50Tm9kZSkuZW1wdHkoKTtcclxuICAgICAgdGhpcy5oaWdobGlnaHRBY3Rpdml0aWVzKCk7XHJcbiAgICAgIHRoaXMuY2hhbmdlRGF5QWN0aXZpdGllcygpO1xyXG4gICAgICB0aGlzLl9kYXRhTG9hZGVkID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5yZW5kZXJDYWxlbmRhcigpO1xyXG4gIH0sXHJcbiAgcmVuZGVyQ2FsZW5kYXI6IGZ1bmN0aW9uIHJlbmRlckNhbGVuZGFyKCkge1xyXG4gICAgaWYgKCF0aGlzLl9jYWxlbmRhcikge1xyXG4gICAgICB0aGlzLl9jYWxlbmRhciA9IG5ldyBDYWxlbmRhcih7IGlkOiAnY2FsZW5kYXItdmlld19fY2FsZW5kYXInLCBub0NsZWFyQnV0dG9uOiB0cnVlIH0pO1xyXG4gICAgICAkKHRoaXMuY2FsZW5kYXJOb2RlKS5hcHBlbmQodGhpcy5fY2FsZW5kYXIuZG9tTm9kZSk7XHJcbiAgICAgIGNvbnN0IHRvZ2dsZSA9ICQodGhpcy53ZWVrU2VsZWN0VGVtcGxhdGUuYXBwbHkodGhpcykpLmdldCgwKTtcclxuICAgICAgJCh0aGlzLl9jYWxlbmRhci5mb290ZXJOb2RlKS5hcHBlbmQodG9nZ2xlKTtcclxuICAgICAgb24oJCh0b2dnbGUpLmNoaWxkcmVuKClbMF0sICdjbGljaycsIHRoaXMudG9nZ2xlTXVsdGlTZWxlY3QuYmluZCh0aGlzKSk7XHJcbiAgICAgIHRoaXMuX2NhbGVuZGFyLm9uQ2hhbmdlRGF5ID0gdGhpcy5vbkNoYW5nZURheS5iaW5kKHRoaXMpO1xyXG4gICAgICB0aGlzLl9jYWxlbmRhci5zaG93KCk7XHJcbiAgICAgIHRoaXMuX2NhbGVuZGFyLm9uUmVmcmVzaENhbGVuZGFyID0gdGhpcy5vblJlZnJlc2hDYWxlbmRhci5iaW5kKHRoaXMpOyAvLyBNdXN0IGJlIGNhbGxlZCBhZnRlciBzaG93IGJlY2F1c2UgdGhpcyB3aWxsIGNhbGwgcmVxdWVzdERhdGEgc2luY2Ugc2hvdyBjYWxscyByZWZyZXNoQ2FsZW5kYXJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaGluZ0NhbGVuZGFyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fY2FsZW5kYXIucmVmcmVzaChmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblJlZnJlc2hDYWxlbmRhcjogZnVuY3Rpb24gb25SZWZyZXNoQ2FsZW5kYXIocmVmcmVzaCkge1xyXG4gICAgaWYgKHJlZnJlc2gpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25DaGFuZ2VEYXk6IGZ1bmN0aW9uIG9uQ2hhbmdlRGF5KCkge1xyXG4gICAgdGhpcy5zZWxlY3REYXkoKTtcclxuICB9LFxyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5nZXQoJ3N0b3JlJyk7XHJcbiAgICBpZiAoc3RvcmUpIHtcclxuICAgICAgLy8gYXR0ZW1wdCB0byB1c2UgYSBkb2pvIHN0b3JlXHJcbiAgICAgIGNvbnN0IHF1ZXJ5T3B0aW9ucyA9IHtcclxuICAgICAgICBjb3VudDogdGhpcy5wYWdlU2l6ZSxcclxuICAgICAgICBzdGFydDogdGhpcy5wb3NpdGlvbixcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuX2FwcGx5U3RhdGVUb1F1ZXJ5T3B0aW9ucyhxdWVyeU9wdGlvbnMpO1xyXG5cclxuICAgICAgY29uc3QgcXVlcnlFeHByZXNzaW9uID0gdGhpcy5fYnVpbGRRdWVyeUV4cHJlc3Npb24odGhpcy5hY3Rpdml0eVF1ZXJ5KSB8fCBudWxsO1xyXG4gICAgICBjb25zdCBxdWVyeVJlc3VsdHMgPSBzdG9yZS5xdWVyeShxdWVyeUV4cHJlc3Npb24sIHF1ZXJ5T3B0aW9ucyk7XHJcblxyXG4gICAgICB3aGVuKHF1ZXJ5UmVzdWx0cyxcclxuICAgICAgICB0aGlzLnByb2Nlc3NEYXRhLmJpbmQodGhpcyksXHJcbiAgICAgICAgdGhpcy5fb25RdWVyeUVycm9yLmJpbmQodGhpcywgcXVlcnlPcHRpb25zKSk7XHJcblxyXG4gICAgICByZXR1cm4gcXVlcnlSZXN1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUud2FybignRXJyb3IgcmVxdWVzdGluZyBkYXRhLCBubyBzdG9yZSB3YXMgZGVmaW5lZC4gRGlkIHlvdSBtZWFuIHRvIG1peGluIF9TRGF0YUxpc3RNaXhpbiB0byB5b3VyIGxpc3Qgdmlldz8nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIH0sXHJcbiAgcmVxdWVzdEV2ZW50RGF0YTogZnVuY3Rpb24gcmVxdWVzdEV2ZW50RGF0YSgpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5jcmVhdGVFdmVudFN0b3JlKCk7XHJcbiAgICBpZiAoc3RvcmUpIHtcclxuICAgICAgLy8gYXR0ZW1wdCB0byB1c2UgYSBkb2pvIHN0b3JlXHJcbiAgICAgIGNvbnN0IHF1ZXJ5T3B0aW9ucyA9IHtcclxuICAgICAgICBjb3VudDogdGhpcy5wYWdlU2l6ZSxcclxuICAgICAgICBzdGFydDogdGhpcy5wb3NpdGlvbixcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuX2FwcGx5U3RhdGVUb1F1ZXJ5T3B0aW9ucyhxdWVyeU9wdGlvbnMpO1xyXG5cclxuICAgICAgY29uc3QgcXVlcnlFeHByZXNzaW9uID0gdGhpcy5fYnVpbGRRdWVyeUV4cHJlc3Npb24odGhpcy5ldmVudFF1ZXJ5KSB8fCBudWxsO1xyXG4gICAgICBjb25zdCBxdWVyeVJlc3VsdHMgPSBzdG9yZS5xdWVyeShxdWVyeUV4cHJlc3Npb24sIHF1ZXJ5T3B0aW9ucyk7XHJcblxyXG4gICAgICB3aGVuKHF1ZXJ5UmVzdWx0cyxcclxuICAgICAgICB0aGlzLnByb2Nlc3NFdmVudERhdGEuYmluZCh0aGlzKSxcclxuICAgICAgICB0aGlzLl9vblF1ZXJ5RXJyb3IuYmluZCh0aGlzLCBxdWVyeU9wdGlvbnMpKTtcclxuXHJcbiAgICAgIHJldHVybiBxdWVyeVJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS53YXJuKCdFcnJvciByZXF1ZXN0aW5nIGRhdGEsIG5vIHN0b3JlIHdhcyBkZWZpbmVkLiBEaWQgeW91IG1lYW4gdG8gbWl4aW4gX1NEYXRhTGlzdE1peGluIHRvIHlvdXIgbGlzdCB2aWV3PycpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgfSxcclxuICBzZWxlY3REYXk6IGZ1bmN0aW9uIHNlbGVjdERheSgpIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5fY2FsZW5kYXIuZ2V0U2VsZWN0ZWREYXRlTW9tZW50KCk7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50RGF0ZSAmJiB0aGlzLl9kYXRhTG9hZGVkKSB7XHJcbiAgICAgICQodGhpcy5hY3Rpdml0eUNvbnRlbnROb2RlKS5lbXB0eSgpO1xyXG4gICAgICAkKHRoaXMuZXZlbnRDb250ZW50Tm9kZSkuZW1wdHkoKTtcclxuICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IHNlbGVjdGVkO1xyXG4gICAgICB0aGlzLmNoYW5nZURheUFjdGl2aXRpZXMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY3VycmVudERhdGUgPSBzZWxlY3RlZDtcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3cob3B0aW9ucykge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICB0aGlzLnByb2Nlc3NTaG93T3B0aW9ucyhvcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5yZW5kZXJDYWxlbmRhcigpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc3RhcnR1cDogZnVuY3Rpb24gc3RhcnR1cCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICB0b2dnbGVNdWx0aVNlbGVjdDogZnVuY3Rpb24gdG9nZ2xlTXVsdGlTZWxlY3QoeyBjdXJyZW50VGFyZ2V0IH0pIHtcclxuICAgIHRoaXMuX3Nob3dNdWx0aSA9ICF0aGlzLl9zaG93TXVsdGk7XHJcbiAgICBpZiAodGhpcy5fc2hvd011bHRpKSB7XHJcbiAgICAgICQoY3VycmVudFRhcmdldCkubmV4dCgpLmh0bWwodGhpcy53ZWVrVGV4dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKGN1cnJlbnRUYXJnZXQpLm5leHQoKS5odG1sKHRoaXMuZGF5VGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2FsZW5kYXIudG9nZ2xlU2VsZWN0V2VlaygpO1xyXG4gICAgJCh0aGlzLmFjdGl2aXR5Q29udGVudE5vZGUpLmVtcHR5KCk7XHJcbiAgICAkKHRoaXMuZXZlbnRDb250ZW50Tm9kZSkuZW1wdHkoKTtcclxuICAgIHRoaXMuY2hhbmdlRGF5QWN0aXZpdGllcygpO1xyXG4gIH0sXHJcbiAgX2J1aWxkUXVlcnlFeHByZXNzaW9uOiBmdW5jdGlvbiBfYnVpbGRRdWVyeUV4cHJlc3Npb24ocXVlcnlQYXJhbSA9IHt9KSB7XHJcbiAgICByZXR1cm4gbGFuZy5taXhpbihxdWVyeVBhcmFtIHx8IHt9LCB0aGlzLm9wdGlvbnMgJiYgKHRoaXMub3B0aW9ucy5xdWVyeSB8fCB0aGlzLm9wdGlvbnMud2hlcmUpKTtcclxuICB9LFxyXG4gIHRyYW5zaXRpb25Bd2F5OiBmdW5jdGlvbiB0cmFuc2l0aW9uQXdheSgpIHtcclxuICAgICQodGhpcy5fY2FsZW5kYXIuX21vbnRoRHJvcGRvd24uZHJvcGRvd25TZWxlY3QpLmRhdGEoJ2Ryb3Bkb3duJykuY2xvc2UoKTtcclxuICAgICQodGhpcy5fY2FsZW5kYXIuX3llYXJEcm9wZG93bi5kcm9wZG93blNlbGVjdCkuZGF0YSgnZHJvcGRvd24nKS5jbG9zZSgpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==