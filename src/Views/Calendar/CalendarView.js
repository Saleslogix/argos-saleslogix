import array from 'dojo/_base/array';
import convert from 'argos/Convert';
import declare from 'dojo/_base/declare';
import domAttr from 'dojo/dom-attr';
import domClass from 'dojo/dom-class';
import query from 'dojo/query';
import domConstruct from 'dojo/dom-construct';
import lang from 'dojo/_base/lang';
import on from 'dojo/on';
import string from 'dojo/string';
import when from 'dojo/when';
import Calendar from 'argos/Calendar';
import List from 'argos/List';
import Utility from '../../Utility';
import getResource from 'argos/I18n';

const resource = getResource('calendarView');
const dtFormatResource = getResource('calendarViewDateTimeFormat');

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
const __class = declare('crm.Views.Calendar.CalendarView', [List], {
  // Localization
  titleText: resource.titleText,
  monthTitleFormatText: dtFormatResource.monthTitleFormatText,
  dayTitleFormatText: dtFormatResource.dayTitleFormatText,
  eventDateFormatText: dtFormatResource.eventDateFormatText,
  startTimeFormatText: dtFormatResource.startTimeFormatText,
  startTimeFormatText24: dtFormatResource.startTimeFormatText24,
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
  string,
  Utility,
  trimTo: 16,
  toggleCollapseClass: 'fa fa-chevron-down',
  toggleExpandClass: 'fa fa-chevron-right',

  // Templates
  widgetTemplate: new Simplate([
    '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
    '<div class="overthrow scroller" data-dojo-attach-point="scrollerNode">',
    '<div class="panel-content">',
    '<div class="calendarContainer" data-dojo-attach-point="calendarNode"></div>',
    '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">',
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
    '<button class="list-item-selector button {%= $$.activityIconByType[$.Type] %}">',
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
    '{% } else if ($$.activityIconByType[$.Type]) { %}',
    '{%: crm.Format.date($.StartDate, (App.is24HourClock()) ? $$.startTimeFormatText24 : $$.startTimeFormatText) %}',
    '{% } else { %}',
    '{%! $$.eventTimeTemplate %}',
    '{% } %}',
    '</span>',
    '</div>',
    '</div>',
  ]),
  activityContentTemplate: new Simplate([
    '<div class="activityEntry__content">',
    '{% if ($.Notes) { %}',
    '{%: $$.Utility.trimText($.Notes, $$.trimTo) %}',
    '{% } %}',
    '</div>',
  ]),
  activityFooterTemplate: new Simplate([
    '<div class="activityEntry__footer">',
    '</div>',
  ]),
  activityNameTemplate: new Simplate([
    '{% if ($.ContactName) { %}',
    '{%= $$.string.substitute($$.withFromText, { contactName: $$.parseName($.ContactName), accountName: $.AccountName }) %}',
    '{% } else if ($.AccountName) { %}',
    '{%= $$.string.substitute($$.withText, { object: $.AccountName }) %}',
    '{% } else if ($.LeadName) { %}',
    '{%= $$.string.substitute($$.withText, { object: $.LeadName }) %}',
    '{% } else if ($$.activityIconByType[$.Type]) { %}',
    '{%= $$.string.substitute($$.withText, { object: $$.unspecifiedText }) %}',
    '{% } else { %}',
    '{%= $$.string.substitute($$.forText, { reason: $.Type }) %}',
    '{% } %}',
  ]),
  activityMoreTemplate: new Simplate([
    '<div class="list-more" data-dojo-attach-point="activityMoreNode">',
    '<button class="button" data-action="activateActivityMore">',
    '<span data-dojo-attach-point="activityRemainingContentNode">{%= $.countMoreText %}</span>',
    '</button>',
    '</div>',
  ]),
  eventRowTemplate: new Simplate([
    '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">',
    '{%! $$.eventIconTemplate %}',
    '{%! $$.activityHeaderTemplate %}',
    '{%! $$.activityFooterTemplate %}',
    '</li>',
  ]),
  eventTimeTemplate: new Simplate([
    '{%: crm.Format.date($.StartDate, $$.eventDateFormatText) %}',
    '&nbsp;-&nbsp;',
    '{%: crm.Format.date($.EndDate, $$.eventDateFormatText) %}',
  ]),
  eventIconTemplate: new Simplate([
    '<div class="activityEntry__icon">',
    '<button class="list-item-selector button {%= $$.eventIcon %}">',
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
  headerRowTemplate: new Simplate([
    '<li data-descriptor="{%: $.day %}">',
    '<div class="dayHeader">',
    '<h3 class="header__title">{%: $.day %}</h3>',
    '</div>',
    '</li>',
  ]),
  weekSelectTemplate: new Simplate([
    '<div class="toggle toggle-horizontal calendar__weekToggle">',
    '<span class="thumb horizontal weekToggle__thumb"></span>',
    '<span class="toggleOn weekToggle__on display-none">{%= $.weekText %}</span>',
    '<span class="toggleOff weekToggle__off">{%= $.dayText %}</span>',
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
  id: 'calendar_view',
  cls: 'activities-for-month',
  insertView: 'activity_types_list',
  activityDetailView: 'activity_detail',
  eventDetailView: 'event_detail',
  enableSearch: false,
  dayHeaderFormat: 'dddd, MMMM Do',
  dateCounts: null,
  currentDate: null,
  monthActivities: null,
  monthEvents: null,
  multiSelect: 7,
  _dataLoaded: false,
  _eventStore: null,
  _showMulti: false,
  _refreshAdded: false,

  activityIconByType: {
    atToDo: 'fa fa-list-ul',
    atPhoneCall: 'fa fa-phone',
    atAppointment: 'fa fa-calendar-o',
    atLiterature: 'fa fa-calendar-o',
    atPersonal: 'fa fa-check-square-o',
    atQuestion: 'fa fa-question',
    atNote: 'fa fa-calendar-o',
    atEMail: 'fa fa-envelope',
  },
  eventIcon: 'fa fa-calendar-o',

  queryOrderBy: 'StartDate asc',
  querySelect: [
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
  queryInclude: [
    '$descriptors',
    '$permissions',
  ],
  resourceKind: 'activities',
  contractName: 'system',
  pageSize: 500,
  eventQueryWhere: null,
  eventQuerySelect: [
    'StartDate',
    'EndDate',
    'Description',
    'Type',
  ],
  eventInclude: [
    '$permissions',
  ],
  eventResourceKind: 'events',
  eventContractName: 'dynamic',

  _onRefresh: function _onRefresh(o) {
    this.inherited(arguments);
    if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
      this.refreshRequired = true;
    }
  },
  changeDayActivities: function changeDayActivities() {
    domClass.remove(this.activityContainerNode, 'list-loading');
    let multiDays = [];
    let entries;

    if (this._showMulti) {
      const dateIterator = this.currentDate.clone().startOf('week');
      for (let i = 0; i < this.multiSelect; i++) {
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
  createActivityRows: function createActivityRows(entries = [], day) {
    const count = entries.length;

    if (count > 0) {
      const activityDocfrag = document.createDocumentFragment();
      const eventDocfrag = document.createDocumentFragment();
      if (this._showMulti) {
        const headerNode = domConstruct.toDom(this.headerRowTemplate.apply({ day }, this));
        activityDocfrag.appendChild(headerNode);
      }
      for (let i = 0; i < count; i++) {
        const entry = this.entries[entries[i]];
        let rowNode;
        if (this.activityIconByType[entry.Type]) {
          try {
            rowNode = domConstruct.toDom(this.activityRowTemplate.apply(entry, this));
          } catch (err) {
            console.error(err); // eslint-disable-line
            rowNode = domConstruct.toDom(this.rowTemplateError.apply(entry, this));
          }

          activityDocfrag.appendChild(rowNode);
        } else {
          try {
            rowNode = domConstruct.toDom(this.eventRowTemplate.apply(entry, this));
          } catch (err) {
            console.error(err); // eslint-disable-line
            rowNode = domConstruct.toDom(this.rowTemplateError.apply(entry, this));
          }

          eventDocfrag.appendChild(rowNode);
        }
        this.onApplyRowTemplate(entry, rowNode);
      }

      if (activityDocfrag.childNodes.length > 0) {
        domConstruct.place(activityDocfrag, this.activityContentNode, 'last');
      }
      if (eventDocfrag.childNodes.length > 0) {
        domClass.remove(this.eventContainerNode, 'event-hidden');
        domConstruct.place(eventDocfrag, this.eventContentNode, 'last');
      } else {
        domClass.add(this.eventContainerNode, 'event-hidden');
      }
    }
  },
  createEventStore: function createEventStore() {
    if (this._eventStore) {
      return this._eventStore;
    }
    const temp = this.get('store');
    const store = Object.assign({}, temp);
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
    const startDate = value.clone().startOf('month');
    const endDate = value.clone().endOf('month');
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
  formatQueryEvent: function formatQueryEvent(value) {
    return string.substitute('UserId eq "${user}" and ((StartDate gt @${start}@ or EndDate gt @${start}@) and StartDate lt @${end}@)', {
      user: App.context.user && App.context.user.$key,
      start: convert.toIsoStringFromDate(value.clone().startOf('month').toDate()),
      end: convert.toIsoStringFromDate(value.clone().endOf('month').toDate()),
    });
  },
  highlightActivities: function highlightActivities() {
    array.forEach(this._calendar.weeksNode.childNodes, (week) => {
      array.forEach(week.childNodes, (day) => {
        if (!this.monthActivities[domAttr.get(day, 'data-date')]) {
          this._calendar.removeActive(day);
          return;
        }
        if (!this._calendar.isActive(day)) {
          day.subValue = this.monthActivities[domAttr.get(day, 'data-date')];
          this._calendar.setActiveDay(day);
        }
      }, this);
    }, this);
    return this;
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
        key,
      });
    }
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
  onToolLayoutCreated: function onToolLayoutCreated(tools) {
    if ((tools && !this._refreshAdded) && !window.App.supportsTouch()) {
      const refreshTool = {
        id: 'refresh',
        cls: 'fa fa-refresh fa-fw fa-lg',
        action: 'refresh',

      };
      if (tools.tbar) {
        tools.tbar.push(refreshTool);
        this._refreshAdded = true;
      }
    }
    this.inherited(arguments);
  },
  parseName: function parseName(name = {}) {
    return name.split(' ').splice(-1)[0];
  },
  process: function process(store, entries, isEvent) {
    if (entries.length > 0) {
      entries.forEach((entryPreProcess) => {
        const entry = this._processEntry(entryPreProcess);
        // If key comes back with nothing, check that the store is properly
        // setup with an idProperty
        entry.isEvent = isEvent;
        const entryKey = store.getIdentity(entry);
        this.entries[entryKey] = entry;
        const startDate = moment(convert.toDateFromString(entry.StartDate));
        if (entry.Timeless) {
          startDate.subtract({
            minutes: startDate.utcOffset(),
          });
        }
        const date = startDate.format('YYYY-MM-DD');
        if (this.monthActivities[date]) {
          this.monthActivities[date].push(entryKey);
        } else {
          this.monthActivities[date] = [entryKey];
        }
      });
    }
  },
  processData: function processData(entries) {
    if (!entries) {
      return;
    }

    const store = this.get('store');

    this.process(store, entries, false);
  },
  processEventData: function processEventData(entries) {
    if (!entries) {
      return;
    }
    const store = this.createEventStore();

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
    this._dataLoaded = false;
    this._eventStore = null;
    domClass.add(this.activityContainerNode, 'list-loading');
    this.set('activityContent', this.loadingTemplate.apply(this));
    domConstruct.empty(this.eventContentNode);
    this.currentDate = this._calendar.getSelectedDateMoment();
    this.queryText = '';
    this.monthActivities = [];
    this.activityQuery = this.formatQueryActivity(this.currentDate);
    this.eventQuery = this.formatQueryEvent(this.currentDate);
    Promise.all([this.requestData(), this.requestEventData()]).then(() => {
      domConstruct.empty(this.activityContentNode);
      domConstruct.empty(this.eventContentNode);
      this.highlightActivities();
      this.changeDayActivities();
      this._dataLoaded = true;
    });
  },
  render: function render() {
    this.inherited(arguments);
    this.renderCalendar();
  },
  renderCalendar: function renderCalendar() {
    if (!this._calendar) {
      this._calendar = new Calendar({ id: 'calendar-view__calendar', noClearButton: true });
      domConstruct.place(this._calendar.domNode, this.calendarNode);
      const toggle = domConstruct.toDom(this.weekSelectTemplate.apply(this));
      domConstruct.place(toggle, this._calendar.footerNode, 'last');
      on(toggle, 'click', this.toggleMultiSelect.bind(this));
      this._calendar.onChangeDay = this.onChangeDay.bind(this);
      this._calendar.show();
      this._calendar.onRefreshCalendar = this.onRefreshCalendar.bind(this);  // Must be called after show because this will call requestData since show calls refreshCalendar
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
    const store = this.get('store');
    if (store) {
      // attempt to use a dojo store
      const queryOptions = {
        count: this.pageSize,
        start: this.position,
      };

      this._applyStateToQueryOptions(queryOptions);

      const queryExpression = this._buildQueryExpression(this.activityQuery) || null;
      const queryResults = store.query(queryExpression, queryOptions);

      when(queryResults,
        this.processData.bind(this),
        this._onQueryError.bind(this, queryOptions));

      return queryResults;
    }

    console.warn('Error requesting data, no store was defined. Did you mean to mixin _SDataListMixin to your list view?'); // eslint-disable-line
  },
  requestEventData: function requestEventData() {
    const store = this.createEventStore();
    if (store) {
      // attempt to use a dojo store
      const queryOptions = {
        count: this.pageSize,
        start: this.position,
      };

      this._applyStateToQueryOptions(queryOptions);

      const queryExpression = this._buildQueryExpression(this.eventQuery) || null;
      const queryResults = store.query(queryExpression, queryOptions);

      when(queryResults,
        this.processEventData.bind(this),
        this._onQueryError.bind(this, queryOptions));

      return queryResults;
    }

    console.warn('Error requesting data, no store was defined. Did you mean to mixin _SDataListMixin to your list view?'); // eslint-disable-line
  },
  selectDay: function selectDay() {
    const selected = this._calendar.getSelectedDateMoment();
    if (this.currentDate && this._dataLoaded) {
      domConstruct.empty(this.activityContentNode);
      domConstruct.empty(this.eventContentNode);
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
      this.renderCalendar();
    }
  },
  startup: function startup() {
    this.inherited(arguments);
  },
  toggleMultiSelect: function toggleMultiSelect({ currentTarget }) {
    this._showMulti = !this._showMulti;
    const toggleOnNode = query('.toggleOn', currentTarget).shift();
    const toggleOffNode = query('.toggleOff', currentTarget).shift();

    if (toggleOnNode && toggleOffNode) {
      domClass.toggle(toggleOnNode, 'display-none', !this._showMulti);
      domClass.toggle(toggleOffNode, 'display-none', this._showMulti);
    }

    this._calendar.toggleSelectWeek();
    domClass.toggle(currentTarget, 'toggleStateOn');
    domConstruct.empty(this.activityContentNode);
    domConstruct.empty(this.eventContentNode);
    this.changeDayActivities();
  },
  _buildQueryExpression: function _buildQueryExpression(queryParam = {}) {
    return lang.mixin(queryParam || {}, this.options && (this.options.query || this.options.where));
  },
});

export default __class;
