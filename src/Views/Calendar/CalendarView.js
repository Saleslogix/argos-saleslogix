import array from 'dojo/_base/array';
import aspect from 'dojo/aspect';
import convert from 'argos/Convert';
import declare from 'dojo/_base/declare';
import domAttr from 'dojo/dom-attr';
import domClass from 'dojo/dom-class';
import domConstruct from 'dojo/dom-construct';
import string from 'dojo/string';
import when from 'dojo/when';
import Calendar from 'argos/Calendar';
import List from 'argos/List';
import Utility from '../../Utility';

const resource = window.localeContext.getEntitySync('calendarView').attributes;

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
const __class = declare('crm.Views.Calendar.CalendarView', [List], {
  // Localization
  titleText: resource.titleText,
  monthTitleFormatText: resource.monthTitleFormatText,
  dayTitleFormatText: resource.dayTitleFormatText,
  eventDateFormatText: resource.eventDateFormatText,
  startTimeFormatText: resource.startTimeFormatText,
  allDayText: resource.allDayText,
  eventText: resource.eventText,
  eventHeaderText: resource.eventHeaderText,
  countMoreText: resource.countMoreText,
  toggleCollapseText: resource.toggleCollapseText,
  withFromText: resource.withFromText,
  withText: resource.withText,
  unspecifiedText: resource.unspecifiedText,

  enablePullToRefresh: false,
  string: string,
  Utility: Utility,
  trimTo: 16,
  toggleCollapseClass: 'fa fa-chevron-down',
  toggleExpandClass: 'fa fa-chevron-right',

  // Templates
  widgetTemplate: new Simplate([
    '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow panel {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
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
          '{% } else { %}',
            '{%: crm.Format.date($.StartDate, $$.startTimeFormatText) %}',
          '{% } %}',
        '</span>',
      '</div>',
    '</div>',
  ]),
  activityContentTemplate: new Simplate([
    '<div class="activityEntry__content">',
      '{%: $$.Utility.trimText($.Notes, $$.trimTo) %}',
    '</div>',
  ]),
  activityFooterTemplate: new Simplate([
    '<div class="activityEntry__footer">',
    '</div>',
  ]),
  activityNameTemplate: new Simplate([
    '{% if ($.ContactName) { %}',
      '{%= $$.string.substitute($$.withFromText, { contactName: $$.parseName($.ContactName), accountName: $.AccountName}) %}',
    '{% } else if ($.AccountName) { %}',
      '{%= $$.string.substitute($$.withText, { object: $.AccountName }) %}',
    '{% } else if ($.LeadName) { %}',
      '{%= $$.string.substitute($$.withText, { object: $.LeadName }) %}',
    '{% } else { %}',
      '{%= $$.string.substitute($$.withText, { object: $$.unspecifiedText }) %}',
    '{% } %}',
  ]),
  activityMoreTemplate: new Simplate([
    '<div class="list-more" data-dojo-attach-point="activityMoreNode">',
      '<button class="button" data-action="activateActivityMore">',
        '<span data-dojo-attach-point="activityRemainingContentNode">{%= $.countMoreText %}</span>',
      '</button>',
    '</div>',
  ]),
  eventNameTemplate: new Simplate([
    '{%: crm.Format.date($.StartDate, $$.eventDateFormatText) %}',
    '&nbsp;-&nbsp;',
    '{%: crm.Format.date($.EndDate, $$.eventDateFormatText) %}',
  ]),
  eventRowTemplate: new Simplate([
    '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">',
      '<table class="calendar-entry-table"><tr>',
        '<td class="entry-table-icon">',
          '<button class="list-item-selector button {%= $$.eventIcon %}">',
          '</button>',
        '</td>',
      '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>',
      '</tr></table>',
    '</li>',
  ]),
  eventItemTemplate: new Simplate([
    '<h3 class="p-description">{%: $.Description %} ({%: $.Type %})</h3>',
    '<h4>{%! $$.eventNameTemplate %}</h4>',
  ]),
  eventMoreTemplate: new Simplate([
    '<div class="list-more" data-dojo-attach-point="eventMoreNode">',
      '<button class="button" data-action="activateEventMore">',
        '<span data-dojo-attach-point="eventRemainingContentNode">{%= $.countMoreText %}</span>',
      '</button>',
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
  id: 'calendar_monthlist',
  cls: 'activities-for-month',
  insertView: 'activity_types_list',
  activityDetailView: 'activity_detail',
  eventDetailView: 'event_detail',
  enableSearch: false,
  dateCounts: null,
  currentDate: null,
  monthActivities: null,
  _dataLoaded: false,

  // eventPageSize: 3,
  // eventQueryWhere: null,
  // eventQuerySelect: [
  //   'StartDate',
  //   'EndDate',
  //   'Description',
  //   'Type',
  // ],
  activityIconByType: {
    'atToDo': 'fa fa-list-ul',
    'atPhoneCall': 'fa fa-phone',
    'atAppointment': 'fa fa-calendar-o',
    'atLiterature': 'fa fa-calendar-o',
    'atPersonal': 'fa fa-check-square-o',
    'atQuestion': 'fa fa-question',
    'atNote': 'fa fa-calendar-o',
    'atEMail': 'fa fa-envelope',
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
  ],
  resourceKind: 'activities',
  contractName: 'system',
  pageSize: 105,

  // _onRefresh: function _onRefresh(o) {
  //   this.inherited(arguments);
  //   if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
  //     this.refreshRequired = true;
  //   }
  // },
  changeDayActivities: function changeDayActivities() {
    domClass.remove(this.activityContainerNode, 'list-loading');
    const entries = this.monthActivities[this.currentDate.format('YYYY-MM-DD')];
    if (!entries) {
      this.set('activityContent', this.noDataTemplate.apply(this));
      return;
    }

    const count = entries.length;

    if (count > 0) {
      const docfrag = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const entry = this.entries[entries[i]];
        let rowNode;
        try {
          rowNode = domConstruct.toDom(this.activityRowTemplate.apply(entry, this));
        } catch (err) {
          console.error(err); // eslint-disable-line
          rowNode = domConstruct.toDom(this.rowTemplateError.apply(entry, this));
        }

        docfrag.appendChild(rowNode);
        this.onApplyRowTemplate(entry, rowNode);
      }

      if (docfrag.childNodes.length > 0) {
        domConstruct.place(docfrag, this.activityContentNode, 'last');
      }
    } else {
      this.set('activityContent', this.noDataTemplate.apply(this));
    }
  },
  clear: function clear() {
    // this.monthActivities = null;
  },
  formatQueryActivity: function formatQueryActivity(value) {
    return string.substitute('UserActivities.UserId eq "${user}" and Type ne "atLiterature" and StartDate between @${start}@ and @${end}@', {
      user: App.context.user && App.context.user.$key,
      start: value.clone().startOf('month').format(),
      end: value.clone().endOf('month').format(),
    });
  },
  formatQueryEvent: function formatQueryEvent(value) {
    return string.substitute('UserId eq "${user}" and ((StartDate gt @${start}@ or EndDate gt @${end}@) and StartDate lt @${start}@)', {
          user: App.context.user && App.context.user.$key,
          start: convert.toIsoStringFromDate(value.clone().startOf('day').toDate()),
          end: convert.toIsoStringFromDate(value.clone().endOf('day').toDate()),
        });
  },
  highlightActivities: function highlightActivities() {
    array.forEach(this._calendar.weeksNode.childNodes, (week) => {
      array.forEach(week.childNodes, (day) => {
        if (!this.monthActivities[domAttr.get(day, 'data-date')]) {
          return;
        }
        day.subValue = this.monthActivities[domAttr.get(day, 'data-date')];
        this._calendar.setActiveDay(day);
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
        key: key,
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
  parseName: function parseName(name = {}) {
    return name.split(' ').splice(-1)[0];
  },
  processData: function processData(entries) {
    if (!entries) {
      return;
    }

    const store = this.get('store');
    const count = entries.length;
    this.monthActivities = [];

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const entry = this._processEntry(entries[i]);
        // If key comes back with nothing, check that the store is properly
        // setup with an idProperty
        const entryKey = store.getIdentity(entry);
        this.entries[entryKey] = entry;
        const date = moment(convert.toDateFromString(entry.StartDate)).format('YYYY-MM-DD');
        if (this.monthActivities[date]) {
          this.monthActivities[date].push(entryKey);
        } else {
          this.monthActivities[date] = [entryKey];
        }
      }
    }
    this._dataLoaded = true;
    domConstruct.empty(this.activityContentNode);
    this.highlightActivities();
    this.changeDayActivities();
  },
  processShowOptions: function processShowOptions(options) {
    if (options.currentDate) {
      this.currentDate = moment(options.currentDate).startOf('day') || moment().clone().startOf('day');
      this.refreshRequired = true;
    }
  },
  refresh: function refresh() {
    this.renderCalendar();
  },
  refreshData: function refreshData() {
    this._dataLoaded = false;
    domClass.add(this.activityContainerNode, 'list-loading');
    this.set('activityContent', this.loadingTemplate.apply(this));
    this.currentDate = this._calendar.getSelectedDateMoment();
    this.queryText = '';
    this.query = this.formatQueryActivity(this.currentDate);
    this.requestData();
  },
  render: function render() {
    this.inherited(arguments);
    this.renderCalendar();
  },
  renderCalendar: function renderCalendar() {
    if (!this._calendar) {
      this._calendar = new Calendar({ id: 'calendar-view__calendar', noClearButton: true, postRenderCalendar: this.refreshData.bind(this)});
      domConstruct.place(this._calendar.domNode, this.calendarNode);
      // connect.connect(this._calendar, 'changeDay', this, this.selectDay);
      aspect.after(this._calendar, 'changeDay', this.selectDay.bind(this));
      this._calendar.show();
    }
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

      const queryExpression = this._buildQueryExpression() || null;
      const queryResults = store.query(queryExpression, queryOptions);

      when(queryResults,
        this.processData.bind(this),
        this._onQueryError.bind(this, queryOptions));

      return queryResults;
    }

    console.warn('Error requesting data, no store was defined. Did you mean to mixin _SDataListMixin to your list view?'); // eslint-disable-line
  },
  requestEventData: function requestEventData() {

  },
  selectDay: function selectDay() {
    const selected = this._calendar.getSelectedDateMoment();
    if (this.currentDate && this._dataLoaded) {
      domConstruct.empty(this.activityContentNode);
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
  // activateActivityMore: function activateActivityMore() {
  //   this.navigateToDayView();
  // },
  // activateEventMore: function activateEventMore() {
  //   const view = App.getView('event_related');
  //   const where = this.getSelectedDateEventQuery();
  //   if (view) {
  //     view.show({
  //       'where': where,
  //     });
  //   }
  // },
  // createEventRequest: function createEventRequest() {
  //   const querySelect = this.eventQuerySelect;
  //   const queryWhere = this.getEventQuery();
  //   const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
  //     .setCount(this.pageSize)
  //     .setStartIndex(1)
  //     .setResourceKind('events')
  //     .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(','))
  //     .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);
  //
  //   return request;
  // },
  // requestEventData: function requestEventData() {
  //   this.cancelRequests(this.monthEventRequests);
  //   this.monthEventRequests = [];
  //
  //   const request = this.createEventRequest();
  //   const xhr = request.read({
  //     success: this.onRequestEventDataSuccess,
  //     failure: this.onRequestEventDataFailure,
  //     aborted: this.onRequestEventDataAborted,
  //     scope: this,
  //   });
  //   this.monthEventRequests.push(xhr);
  // },
  // onRequestEventDataFailure: function onRequestEventDataFailure(response, o) {
  //   alert(string.substitute(this.requestErrorText, [response, o]));// eslint-disable-line
  //   ErrorManager.addError(response, o, this.options, 'failure');
  // },
  // onRequestEventDataAborted: function onRequestEventDataAborted() {
  //   this.options = false; // force a refresh
  // },
  // onRequestEventDataSuccess: function onRequestEventDataSuccess(feed) {
  //   this.processEventFeed(feed);
  // },
  // getActivityQuery: function getActivityQuery() {
  //   const startDate = this.getFirstDayOfCurrentMonth();
  //   const endDate = this.getLastDayOfCurrentMonth();
  //   return string.substitute(
  //     [
  //       'UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (',
  //       '(Timeless eq false and StartDate',
  //       ' between @${1}@ and @${2}@) or ',
  //       '(Timeless eq true and StartDate',
  //       ' between @${3}@ and @${4}@))',
  //     ].join(''), [App.context.user && App.context.user.$key,
  //       convert.toIsoStringFromDate(startDate.toDate()),
  //       convert.toIsoStringFromDate(endDate.toDate()),
  //       startDate.format('YYYY-MM-DDT00:00:00[Z]'),
  //       endDate.format('YYYY-MM-DDT23:59:59[Z]'),
  //     ]
  //   );
  // },
  // getEventQuery: function getEventQuery() {
  //   const startDate = this.getFirstDayOfCurrentMonth();
  //   const endDate = this.getLastDayOfCurrentMonth();
  //   return string.substitute(
  //     [
  //       'UserId eq "${0}" and (',
  //       '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
  //       'StartDate lt @${2}@',
  //       ')',
  //     ].join(''), [App.context.user && App.context.user.$key,
  //       convert.toIsoStringFromDate(startDate.toDate()),
  //       convert.toIsoStringFromDate(endDate.toDate()),
  //     ]
  //   );
  // },
  // processEventFeed: function processEventFeed(feed) {
  //   if (!feed) {
  //     return;
  //   }
  //
  //   const r = feed.$resources;
  //   const feedLength = r.length;
  //   this.eventFeed = feed;
  //
  //   for (let i = 0; i < feedLength; i++) {
  //     const row = r[i];
  //     // Preserve the isEvent flag if we have an existing entry for it already,
  //     // the order of processFeed and processEventFeed is not predictable
  //     row.isEvent = this.entries[row.$key] && this.entries[row.$key].isEvent;
  //     this.entries[row.$key] = row;
  //
  //     const startDay = moment(convert.toDateFromString(row.StartDate));
  //     const endDay = convert.toDateFromString(row.EndDate);
  //
  //     while (startDay.valueOf() <= endDay.valueOf()) {
  //       const dateIndex = startDay.format('YYYY-MM-DD');
  //       this.dateCounts[dateIndex] = (this.dateCounts[dateIndex]) ? this.dateCounts[dateIndex] + 1 : 1;
  //       startDay.add({
  //         days: 1,
  //       });
  //     }
  //   }
  //
  //   this.highlightActivities();
  // },
  // hideEventList: function hideEventList() {
  //   domClass.add(this.eventContainerNode, 'event-hidden');
  // },
  // showEventList: function showEventList() {
  //   domClass.remove(this.eventContainerNode, 'event-hidden');
  // },
  // requestSelectedDateEvents: function requestSelectedDateEvents() {
  //   this.cancelRequests(this.selectedDateEventRequests);
  //   this.selectedDateEventRequests = [];
  //
  //   const request = this.createSelectedDateRequest({
  //     pageSize: this.eventPageSize,
  //     resourceKind: 'events',
  //     contractName: 'dynamic',
  //     querySelect: this.eventQuerySelect,
  //     queryWhere: this.getSelectedDateEventQuery(),
  //   });
  //
  //   const xhr = request.read({
  //     success: this.onRequestSelectedDateEventDataSuccess,
  //     failure: this.onRequestDataFailure,
  //     aborted: this.onRequestDataAborted,
  //     scope: this,
  //   });
  //   this.selectedDateEventRequests.push(xhr);
  // },
  // createSelectedDateRequest: function createSelectedDateRequest(o) {
  //   const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
  //     .setCount(o.pageSize)
  //     .setStartIndex(1)
  //     .setResourceKind(o.resourceKind)
  //     .setContractName(o.contractName || App.defaultService.getContractName().text)
  //     .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.OrderBy, o.queryOrderBy || this.queryOrderBy)
  //     .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(o.querySelect).join(','))
  //     .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, o.queryWhere);
  //   return request;
  // },
  // getSelectedDateEventQuery: function getSelectedDateEventQuery() {
  //   return string.substitute(
  //     [
  //       'UserId eq "${0}" and (',
  //       '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
  //       'StartDate lt @${2}@',
  //       ')',
  //     ].join(''), [
  //       App.context.user && App.context.user.$key,
  //       convert.toIsoStringFromDate(this.currentDate.toDate()),
  //       convert.toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate()),
  //     ]
  //   );
  // },
  // onRequestSelectedDateEventDataSuccess: function onRequestSelectedDateEventDataSuccess(feed) {
  //   if (!feed) {
  //     return false;
  //   }
  //
  //   const r = feed.$resources;
  //   const feedLength = r.length;
  //   const o = [];
  //
  //   this.eventFeed = feed;
  //
  //   if (feedLength === 0) {
  //     this.hideEventList();
  //     return false;
  //   }
  //   this.showEventList();
  //
  //   for (let i = 0; i < feedLength; i++) {
  //     const row = r[i];
  //     row.isEvent = true;
  //     this.entries[row.$key] = row;
  //     o.push(this.eventRowTemplate.apply(row, this));
  //   }
  //
  //   if (feed.$totalResults > feedLength) {
  //     domClass.add(this.eventContainerNode, 'list-has-more');
  //     this.set('eventRemainingContent', this.countMoreText);
  //   } else {
  //     domClass.remove(this.eventContainerNode, 'list-has-more');
  //     this.set('eventRemainingContent', '');
  //   }
  //
  //   this.set('eventContent', o.join(''));
  // },
});

export default __class;
