/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Calendar/MonthView', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/dom-construct',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/List',
    'moment'
], function(
    declare,
    array,
    string,
    query,
    domAttr,
    domClass,
    domConstruct,
    format,
    ErrorManager,
    convert,
    List,
    moment
) {

    return declare('Mobile.SalesLogix.Views.Calendar.MonthView', [List], {
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

        //Templates
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '<div data-dojo-attach-point="searchNode"></div>',
            '{%! $.navigationTemplate %}',
            '<div style="clear:both"></div>',
            '<div class="month-content" data-dojo-attach-point="monthNode">',
            '{%! $.navBarTemplate %}',
            '<div class="month-calendar" data-dojo-attach-point="contentNode"></div>',
            '</div>',
            '<div class="day-content">',
            '<h2 class="date-day-text" data-dojo-attach-point="dayTitleNode"></h2>',
            '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">',
            '<h2 data-action="toggleGroup">{%= $.eventHeaderText %}<button class="collapsed-indicator" aria-label="{%: $$.toggleCollapseText %}"></button></h2>',
            '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>',
            '{%! $.eventMoreTemplate %}',
            '</div>',
            '<div class="activity-content" data-dojo-attach-point="activityContainerNode">',
            '<h2>{%= $.activityHeaderText %}</h2>',
            '<ul class="list-content" data-dojo-attach-point="activityContentNode"></ul>',
            '{%! $.activityMoreTemplate %}',
            '</div>',
            '</div>',
            '<div style="clear:both"></div>',
            '</div>'
        ]),
        navigationTemplate: new Simplate([
            '<div class="split-buttons">',
            '<button data-tool="today" data-action="getTodayMonthActivities" class="button">{%: $.todayText %}</button>',
            '<button data-tool="selectdate" data-action="selectDate" class="button"><span></span></button>',
            '<button data-tool="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>',
            '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>',
            '<button data-tool="month" class="button">{%: $.monthText %}</button>',
            '</div>'
        ]),
        navBarTemplate: new Simplate([
            '<div class="nav-bar">',
            '<button data-tool="next" data-action="goToNextMonth" class="button button-next"><span></span></button>',
            '<button data-tool="prev" data-action="goToPreviousMonth" class="button button-prev"><span></span></button>',
            '<h3 class="date-text" data-dojo-attach-point="dateNode"></h3>',
            '</div>'
        ]),
        activityRowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
            '<table class="calendar-entry-table"><tr>',
            '<td class="entry-table-icon">',
            '<button data-action="selectEntry" class="list-item-selector button"><img src="{%= $$.activityIconByType[$.Type] || $$.selectIcon %}" class="icon" /></button>',
            '</td>',
            '<td class="entry-table-time">{%! $$.activityTimeTemplate %}</td>',
            '<td class="entry-table-description">{%! $$.activityItemTemplate %}</td>',
            '</tr></table>',
            '</li>'
        ]),
        eventRowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">',
            '<table class="calendar-entry-table"><tr>',
            '<td class="entry-table-icon">',
            '<button data-action="selectEntry" class="list-item-selector button"><img src="{%= $$.eventIcon %}" class="icon" /></button>',
            '</td>',
            '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>',
            '</tr></table>',
            '</li>'
        ]),
        activityTimeTemplate: new Simplate([
            '{% if ($.Timeless) { %}',
            '<span class="p-time">{%= $$.allDayText %}</span>',
            '{% } else { %}',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.StartDate, $$.startTimeFormatText) %}</span>',
            '{% } %}'
        ]),
        activityItemTemplate: new Simplate([
            '<h3 class="p-description">{%: $.Description %}</h3>',
            '<h4>{%= $$.activityNameTemplate.apply($) %}</h4>'
        ]),
        eventItemTemplate: new Simplate([
            '<h3 class="p-description">{%: $.Description %} ({%: $.Type %})</h3>',
            '<h4>{%! $$.eventNameTemplate %}</h4>'
        ]),
        activityNameTemplate: new Simplate([
            '{% if ($.ContactName) { %}',
            '{%: $.ContactName %} / {%: $.AccountName %}',
            '{% } else if ($.AccountName) { %}',
            '{%: $.AccountName %}',
            '{% } else { %}',
            '{%: $.LeadName %}',
            '{% } %}'
        ]),
        eventNameTemplate: new Simplate([
            '{%: Mobile.SalesLogix.Format.date($.StartDate, $$.eventDateFormatText) %}',
            '&nbsp;-&nbsp;',
            '{%: Mobile.SalesLogix.Format.date($.EndDate, $$.eventDateFormatText) %}'
        ]),
        activityMoreTemplate: new Simplate([
            '<div class="list-more" data-dojo-attach-point="activityMoreNode">',
            '<button class="button" data-action="activateActivityMore">',
            '<span data-dojo-attach-point="activityRemainingContentNode">{%= $.countMoreText %}</span>',
            '</button>',
            '</div>'
        ]),
        eventMoreTemplate: new Simplate([
            '<div class="list-more" data-dojo-attach-point="eventMoreNode">',
            '<button class="button" data-action="activateEventMore">',
            '<span data-dojo-attach-point="eventRemainingContentNode">{%= $.countMoreText %}</span>',
            '</button>',
            '</div>'
        ]),
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

        //View Properties
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
        queryOrderBy: 'StartDate asc',
        querySelect: [
            'StartDate',
            'Timeless',
            'Type'
        ],
        feed: null,
        eventFeed: null,
        entries: null,
        selectedDateRequests: null,
        selectedDateEventRequests: null,
        monthRequests: null,
        monthEventRequests: null,

        eventPageSize: 3,
        eventQueryWhere: null,
        eventQuerySelect: [
            'StartDate',
            'EndDate',
            'Description',
            'Type'
        ],

        activityPageSize: 10,
        activityQueryWhere: null,
        activityQuerySelect: [
            'StartDate',
            'Description',
            'Type',
            'AccountName',
            'ContactName',
            'LeadId',
            'LeadName',
            'UserId',
            'Timeless',
            'Recurring'
        ],
        activityIconByType: {
            'atToDo': 'content/images/icons/To_Do_24x24.png',
            'atPhoneCall': 'content/images/icons/Call_24x24.png',
            'atAppointment': 'content/images/icons/Meeting_24x24.png',
            'atLiterature': 'content/images/icons/Schedule_Literature_Request_24x24.gif',
            'atPersonal': 'content/images/icons/Personal_24x24.png',
            'atQuestion': 'content/images/icons/help_24.png',
            'atNote': 'content/images/icons/note_24.png',
            'atEMail': 'content/images/icons/letters_24.png'
        },
        eventIcon: 'content/images/icons/Holiday_schemes_24.png',

        resourceKind: 'activities',

        constructor: function() {
            this.feed = {};
            this.eventFeed = {};
            this.entries = {};
            this.dateCounts = [];
        },
        _onRefresh: function(o) {
            this.inherited(arguments);
            if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
                this.refreshRequired = true;
            }
        },
        clear: function() {
            //this.inherited(arguments);
        },
        startup: function() {
            this.inherited(arguments);
            this.currentDate = moment().startOf('day');
        },
        render: function() {
            this.inherited(arguments);
            this.renderCalendar();
        },
        activateActivityMore: function() {
            this.navigateToDayView();
        },
        activateEventMore: function() {
            var view = App.getView("event_related"),
                where = this.getSelectedDateEventQuery();
            if (view) {
                view.show({"where": where});
            }
        },
        toggleGroup: function(params) {
            var node = params.$source;
            if (node && node.parentNode)
            {
                domClass.toggle(node, 'collapsed');
                domClass.toggle(node.parentNode, 'collapsed-event');
            }
        },
        selectDay: function(params, evt, el) {
            if (this.selectedDateNode) {
                domClass.remove(this.selectedDateNode, 'selected');
            }

            this.selectedDateNode = el;
            domClass.add(el, 'selected');

            this.currentDate = moment(params.date, 'YYYY-MM-DD');
            this.getSelectedDate();
        },
        getFirstDayOfCurrentMonth: function() {
            return this.currentDate.clone().startOf('month');
        },
        getLastDayOfCurrentMonth: function() {
            return this.currentDate.clone().endOf('month');
        },
        getTodayMonthActivities: function() {
            var today = moment().startOf('day');
            if (this.currentDate.format('YYYY-MM') === today.format('YYYY-MM'))
            {
                this.currentDate = today;
                this.highlightCurrentDate();
                this.getSelectedDate();
            } else {
                this.currentDate = today;
                this.refresh();
            }
        },
        goToNextMonth: function() {
             this.currentDate.add({months: 1});
             this.refresh();
        },
        goToPreviousMonth: function() {
            this.currentDate.subtract({months: 1});
            this.refresh();
        },
        refresh: function() {
            this.renderCalendar();
            this.queryWhere = this.getActivityQuery();
            this.feed = null;
            this.eventFeed = null;
            this.dateCounts = [];
            this.requestData();
            this.requestEventData();
        },
        requestData: function() {
            this.cancelRequests(this.monthRequests);
            this.monthRequests = [];

            var request = this.createRequest();
            request.setContractName('system');

            var xhr = request.read({
                success: this.onRequestDataSuccess,
                failure: this.onRequestDataFailure,
                aborted: this.onRequestDataAborted,
                scope: this
            });
            this.monthRequests.push(xhr);
        },
        createEventRequest: function() {
            var querySelect = this.eventQuerySelect,
                queryWhere = this.getEventQuery(),
                request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
                    .setCount(this.pageSize)
                    .setStartIndex(1)
                    .setResourceKind('events')
                    .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(','))
                    .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);

            return request;
        },
        requestEventData: function() {
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
        onRequestEventDataFailure: function(response, o) {
            alert(string.substitute(this.requestErrorText, [response, o]));
            ErrorManager.addError(response, o, this.options, 'failure');
        },
        onRequestEventDataAborted: function(response, o) {
            this.options = false; // force a refresh
            ErrorManager.addError(response, o, this.options, 'aborted');
        },
        onRequestEventDataSuccess: function(feed) {
            this.processEventFeed(feed);
        },
        getActivityQuery: function() {
            var startDate = this.getFirstDayOfCurrentMonth(),
                endDate = this.getLastDayOfCurrentMonth();
            return string.substitute(
                    [
                        'UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (',
                        '(Timeless eq false and StartDate',
                        ' between @${1}@ and @${2}@) or ',
                        '(Timeless eq true and StartDate',
                        ' between @${3}@ and @${4}@))'
                    ].join(''),
                    [App.context['user'] && App.context['user']['$key'],
                    convert.toIsoStringFromDate(startDate.toDate()),
                    convert.toIsoStringFromDate(endDate.toDate()),
                    startDate.format('YYYY-MM-DDT00:00:00Z'),
                    endDate.format('YYYY-MM-DDT23:59:59Z')]
                );
        },
        getEventQuery: function() {
            var startDate = this.getFirstDayOfCurrentMonth(),
                endDate = this.getLastDayOfCurrentMonth();
            return string.substitute(
                    [
                        'UserId eq "${0}" and (',
                            '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
                            'StartDate lt @${2}@',
                        ')'
                    ].join(''),
                    [App.context['user'] && App.context['user']['$key'],
                    convert.toIsoStringFromDate(startDate.toDate()),
                    convert.toIsoStringFromDate(endDate.toDate())]
                );
        },
        processFeed: function(feed) {
            if (!feed) {
                return;
            }

            var r, row, i, dateIndex, startDay, isEvent;

            r = feed['$resources'];
            this.feed = feed;

            for (i = 0; i < r.length; i++) {
                row = r[i];

                // Preserve the isEvent flag if we have an existing entry for it already,
                // the order of processFeed and processEventFeed is not predictable
                row.isEvent = isEvent = this.entries[row.$key] && this.entries[row.$key].isEvent;

                this.entries[row.$key] = row;

                startDay = moment(convert.toDateFromString(row.StartDate));
                if (r[i].Timeless)
                    startDay.add({minutes: startDay.zone()});

                dateIndex = startDay.format('YYYY-MM-DD');
                this.dateCounts[dateIndex] = (this.dateCounts[dateIndex])
                    ? this.dateCounts[dateIndex] + 1
                    : 1;
            }

            this.highlightActivities();
        },
        processEventFeed: function(feed) {
            if (!feed) {
                return;
            }

            var dateIndex,
                r = feed['$resources'],
                feedLength = r.length,
                i,
                row,
                startDay,
                endDay,
                isEvent;

            this.eventFeed = feed;

            for (i = 0; i < feedLength; i++) {
                row = r[i];
                // Preserve the isEvent flag if we have an existing entry for it already,
                // the order of processFeed and processEventFeed is not predictable
                row.isEvent = isEvent = this.entries[row.$key] && this.entries[row.$key].isEvent;
                this.entries[row.$key] = row;

                startDay = moment(convert.toDateFromString(row.StartDate));
                endDay = convert.toDateFromString(row.EndDate);

                while(startDay.valueOf() <= endDay.valueOf())
                {
                    dateIndex = startDay.format('YYYY-MM-DD');
                    this.dateCounts[dateIndex] = (this.dateCounts[dateIndex])
                        ? this.dateCounts[dateIndex] + 1
                        : 1;
                    startDay.add({days:1});
                }
            }

            this.highlightActivities();
        },

        highlightActivities: function() {
            query('.calendar-day').forEach(function(node) {
                var dataDate = domAttr.get(node, 'data-date');
                if (!this.dateCounts[dataDate]) {
                    return;
                }

                domClass.add(node, "activeDay");

                var countMarkup = string.substitute(this.calendarActivityCountTemplate, [this.dateCounts[dataDate]]);

                var existingCount = query(node).children('div');

                if (existingCount.length > 0) {
                    domConstruct.place(countMarkup, existingCount[0], 'only');
                } else {
                    domConstruct.place('<div>' + countMarkup + '</div>', node, 'first');
                }
            }, this);
        },
        setCurrentDateTitle: function() {
            this.set('dayTitleContent', this.currentDate.format(this.dayTitleFormatText));
        },
        hideEventList: function() {
            domClass.add(this.eventContainerNode, 'event-hidden');
        },
        showEventList: function() {
            domClass.remove(this.eventContainerNode, 'event-hidden');
        },
        getSelectedDate: function() {
            this.clearSelectedDate();
            this.setCurrentDateTitle();
            this.requestSelectedDateActivities();
            this.requestSelectedDateEvents();
        },
        clearSelectedDate: function() {
            domClass.add(this.activityContainerNode, 'list-loading');
            this.set('activityContent', this.loadingTemplate.apply(this));
            this.hideEventList();
        },
        cancelRequests: function(requests) {
            if (!requests) {
                return;
            }
            array.forEach(requests, function(xhr) {
                if (xhr) // if request was fulfilled by offline storage, xhr will be undefined
                {
                    xhr.abort();
                }
            });
        },
        requestSelectedDateActivities: function() {
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
        requestSelectedDateEvents: function() {
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
        createSelectedDateRequest: function(o) {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
                .setCount(o.pageSize)
                .setStartIndex(1)
                .setResourceKind(o.resourceKind)
                .setContractName(o.contractName || App.defaultService.getContractName().text)
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.OrderBy, o.queryOrderBy || this.queryOrderBy)
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(o.querySelect).join(','))
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, o.queryWhere);
            return request;
        },
        getSelectedDateActivityQuery: function() {
            var activityQuery = [
                'UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (',
                '(Timeless eq false and StartDate between @${1}@ and @${2}@) or ',
                '(Timeless eq true and StartDate between @${3}@ and @${4}@))'
            ].join('');
            return string.substitute(
                activityQuery,
                [App.context['user'] && App.context['user']['$key'],
                convert.toIsoStringFromDate(this.currentDate.toDate()),
                convert.toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate()),
                this.currentDate.format('YYYY-MM-DDT00:00:00Z'),
                this.currentDate.format('YYYY-MM-DDT23:59:59Z')
                ]
            );
        },
        getSelectedDateEventQuery: function() {
            return string.substitute(
                    [
                        'UserId eq "${0}" and (',
                            '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
                            'StartDate lt @${2}@',
                        ')'
                    ].join(''),
                    [
                        App.context['user'] && App.context['user']['$key'],
                        convert.toIsoStringFromDate(this.currentDate.toDate()),
                        convert.toIsoStringFromDate(this.currentDate.clone().endOf('day').toDate())
                    ]
                );
        },
        onRequestSelectedDateActivityDataSuccess: function(feed) {
            if (!feed) {
                return;
            }

            domClass.remove(this.activityContainerNode, 'list-loading');

            var r = feed['$resources'],
                feedLength = r.length,
                o = [];

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

            if (feed['$totalResults'] > feedLength) {
                domClass.add(this.activityContainerNode, 'list-has-more');
                this.set('activityRemainingContent', this.countMoreText);
            } else {
                domClass.remove(this.activityContainerNode, 'list-has-more');
                this.set('activityRemainingContent', '');
            }

            this.set('activityContent', o.join(''));
        },
        onRequestSelectedDateEventDataSuccess: function(feed) {
            if (!feed) {
                return;
            }

            var r = feed['$resources'],
                feedLength = r.length,
                o = [];
            this.eventFeed = feed;

            if (feedLength === 0) {
                this.hideEventList();
                return false;
            } else {
                this.showEventList();
            }

            for (var i = 0; i < feedLength; i++) {
                var row = r[i];
                row.isEvent = true;
                this.entries[row.$key] = row;
                o.push(this.eventRowTemplate.apply(row, this));
            }

            if (feed['$totalResults'] > feedLength) {
                domClass.add(this.eventContainerNode, 'list-has-more');
                this.set('eventRemainingContent', this.countMoreText);
            } else {
                domClass.remove(this.eventContainerNode, 'list-has-more');
                this.set('eventRemainingContent', '');
            }

            this.set('eventContent', o.join(''));
        },

        renderCalendar: function() {
            var calHTML = [],
                startingDay = this.getFirstDayOfCurrentMonth().day(),
                dayClass = '',
                weekendClass = '',
                day = 1,
                dayDate = this.currentDate.clone().startOf('month'),
                today = moment().startOf('day'),
                monthLength = this.currentDate.daysInMonth(),
                weekEnds = [0,6],
                i;

            calHTML.push(this.calendarStartTemplate);

            calHTML.push(this.calendarWeekHeaderStartTemplate);
            for (i = 0; i <= 6; i++ ) {
                calHTML.push(string.substitute(this.calendarWeekHeaderTemplate, [moment.langData().weekdaysShort(moment().day(i))]));
            }
            calHTML.push(this.calendarWeekHeaderEndTemplate);

            //Weeks
            for (i = 0; i <= 6; i++) {
                calHTML.push(this.calendarWeekStartTemplate);
                //Days
                for (var j = 0; j <= 6; j++)
                {
                    if (day <= monthLength && (i > 0 || j >= startingDay))
                    {
                        dayDate.date(day);
                        dayClass = (dayDate.valueOf() == today.valueOf()) ? 'today' : '';
                        weekendClass = (weekEnds.indexOf(j) !== -1) ? ' weekend' : '';
                        calHTML.push(string.substitute(this.calendarDayTemplate,
                                                    [
                                                        day,
                                                        (dayClass + weekendClass),
                                                        dayDate.format('YYYY-MM-DD')
                                                    ]));
                        day++;
                    }
                    else
                    {
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
        setDateTitle: function() {
            this.set('dateContent', this.currentDate.format(this.monthTitleFormatText));
        },
        show: function(options) {
            this.inherited(arguments);

            if (options) {
                this.processShowOptions(options);
            } else {
                this.renderCalendar();
            }
        },
        processShowOptions: function(options) {
            if (options.currentDate)
            {
                this.currentDate = moment(options.currentDate).startOf('day') || moment().startOf('day');
                this.refreshRequired = true;
            }
        },
        highlightCurrentDate: function() {
            var selectedDate = string.substitute('.calendar-day[data-date=${0}]', [this.currentDate.format('YYYY-MM-DD')]);

            if (this.selectedDateNode) {
                domClass.remove(this.selectedDateNode, 'selected');
            }

            this.selectedDateNode = query(selectedDate, this.contentNode)[0];
            if (this.selectedDateNode) {
                domClass.add(this.selectedDateNode, 'selected');
            }

            this.getSelectedDate();
        },
        selectEntry: function(params) {
            var row = query(params.$source).closest('[data-key]')[0],
                key = row ? row.getAttribute('data-key') : false;

            this.navigateToDetailView(key);
        },
        selectDate: function() {
            var options = {
                date: this.currentDate.toDate(),
                showTimePicker: false,
                timeless: false,
                tools: {
                    tbar: [{
                            id: 'complete',
                            fn: this.selectDateSuccess,
                            scope: this
                        }, {
                            id: 'cancel',
                            side: 'left',
                            fn: ReUI.back,
                            scope: ReUI
                        }]
                }
            },
                view = App.getView(this.datePickerView);
            if (view) {
                view.show(options);
            }
        },
        selectDateSuccess: function() {
            var view = App.getPrimaryActiveView();
            this.currentDate = moment(view.getDateTime()).startOf('day');
            this.refresh();
            ReUI.back();
        },
        navigateToWeekView: function() {
            var view = App.getView(this.weekView),
                options = {currentDate: this.currentDate.valueOf() || moment().startOf('day')};
            view.show(options);
        },
        navigateToDayView: function() {
            var view = App.getView(this.dayView),
                options = {currentDate: this.currentDate.valueOf() || moment().startOf('day')};
            view.show(options);
        },
        navigateToInsertView: function(el) {
            var view = App.getView(this.insertView || this.editView);

            this.options.currentDate = this.currentDate.toString('yyyy-MM-dd') || Date.today();
            if (view) {
                view.show({
                    negateHistory: true,
                    returnTo: this.id,
                    insert: true
                });
            }
        },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.entries[key],
                detailView = (entry.isEvent) ? this.eventDetailView : this.activityDetailView,
                view = App.getView(detailView);
            descriptor = (entry.isEvent) ? descriptor : entry.Description;
            if (view) {
                view.show({
                    descriptor: descriptor,
                    key: key
                });
            }
        }
    });
});

