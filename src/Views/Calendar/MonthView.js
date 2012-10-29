define('Mobile/SalesLogix/Views/Calendar/MonthView', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/Deferred',
    'dojo/string',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/dom-construct',
    'Mobile/SalesLogix/Format',
    'argos/ErrorManager',
    'argos/convert',
    'argos/List',
    'argos/_SDataListMixin',
    'argos/ScrollContainer',
    'argos/SearchWidget',
    'argos!scene'
], function(
    declare,
    array,
    lang,
    Deferred,
    string,
    query,
    domAttr,
    domClass,
    domConstruct,
    format,
    ErrorManager,
    convert,
    List,
    _SDataListMixin,
    ScrollContainer,
    SearchWidget,
    scene
) {

    return declare('Mobile.SalesLogix.Views.Calendar.MonthView', [List, _SDataListMixin], {
        // Localization
        titleText: 'Calendar',
        todayText: 'Today',
        dayText: 'Day',
        weekText: 'Week',
        monthText: 'Month',
        monthTitleFormatText: 'MMMM YYYY',
        dayTitleFormatText: 'ddd MMM D, YYYY',
        startTimeFormatText: 'h:mm',
        allDayText: 'All-Day',
        eventText: 'Event',
        eventHeaderText: 'Events',
        countMoreText: 'View ${0} More',
        activityHeaderText: 'Activities',
        toggleCollapseText: 'toggle collapse',

        components: [
            {name: 'search', type: SearchWidget, attachEvent: 'onQuery:_onSearchQuery,onClear:_onSearchClear'},
            {name: 'fix', content: '<a href="#" class="android-6059-fix">fix for android issue #6059</a>'},
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', components: [
                {name: 'scroll', tag: 'div', attrs: {'class' : 'list activities-for-month'}, components: [
                    {name: 'splitButtons', tag: 'div', attrs: {'class': 'split-buttons'}, components: [
                        {name: 'butToday', content: Simplate.make('<button data-command="today" data-action="getTodayMonthActivities" class="button">{%: $.todayText %}</button>')},
                        {name: 'butSelectDate', content: '<button data-command="selectdate" data-action="selectDate" class="button"><span></span></button>'},
                        {name: 'butDay', content: Simplate.make('<button data-command="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>')},
                        {name: 'butWeek', content: Simplate.make('<button data-command="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>')},
                        {name: 'butMonth', content: Simplate.make('<button data-command="month" class="button">{%: $.monthText %}</button>')}
                    ]},
                    {name: 'clear', content: '<div style="clear:both"></div>'},
                    {name: 'monthContent', tag: 'div', attrs: {'class': 'month-content'}, attachPoint: 'monthNode', components: [
                        {name: 'navBar', tag: 'div', attrs: {'class': 'nav-bar'}, components: [
                            {name: 'next', content: '<button data-command="next" data-action="goToNextMonth" class="button button-next"><span></span></button>'},
                            {name: 'prev', content: '<button data-command="prev" data-action="goToPreviousMonth" class="button button-prev"><span></span></button>'},
                            {name: 'dateNode', tag: 'h3', attrs: {'class': 'date-text'}, attachPoint: 'dateNode'}
                        ]},
                        {name: 'monthCalendar', tag: 'div', attrs: {'class': 'month-calendar'}, attachPoint: 'contentNode'}
                    ]},
                    {name: 'dayContent', tag: 'div', attrs: {'class': 'day-content'}, components: [
                        {name: 'dayTitle', tag: 'h2', attrs: {'class': 'date-day-text'}, attachPoint: 'dayTitleNode'},
                        {name: 'events', tag: 'div', attrs: {'class': 'event-content event-hidden'}, attachPoint: 'eventContainerNode', components: [
                            {name: 'eventsHeader', content: Simplate.make('<h2 data-action="toggleGroup">{%= $.eventHeaderText %}<button class="collapsed-indicator" aria-label="{%: $$.toggleCollapseText %}"></button></h2>')},
                            {name: 'eventsList', tag: 'ul', attrs: {'class': 'list-content'}, attachPoint: 'eventContentNode'},
                            {name: 'eventsMore', tag: 'div', attrs: {'class': 'list-more'}, attachPoint: 'eventMoreNode', components: [
                                {name: 'butEvents', tag: 'button', attrs: {'class': 'button', 'data-action': 'activateEventMore'}, components: [
                                    {name: 'eventRemaining', tag: 'span', attachPoint: 'eventRemainingContentNode', content: Simplate.make('{%= $.countMoreText %}')}
                                ]}
                            ]}
                        ]},
                        {name: 'activityContainer', tag: 'div', attachPoint: 'activityContainerNode', components: [
                            {name: 'activityHeader', content: Simplate.make('<h2>{%= $.activityHeaderText %}</h2>')},
                            {name: 'content', tag: 'ul', attrs: {'class': 'list-content'}, attachPoint: 'activityContentNode'},
                            {name: 'more', tag: 'div', attrs: {'class': 'list-more'}, attachPoint: 'activityMoreNode', components: [
                                {name: 'moreActivity', tag: 'button', attrs: {'class': 'button', 'data-action': 'activateActivityMore'}, components: [
                                    {name: 'remainingContent', tag: 'span', attachPoint: 'remainingContentNode', content: Simplate.make('{%= $.countMoreText %}')}
                                ]}
                            ]}
                        ]}
                    ]},
                    {name: 'clear2', content: '<div style="clear:both"></div>'}
                ]}
            ]}
        ],

        //Templates
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
                '<span class="p-meridiem">{%: Mobile.SalesLogix.Format.date($.StartDate, "A") %}</span>',
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
                node: 'remainingContentNode',
                type: 'innerHTML'
            }
        },
        eventContainerNode: null,
        activityContainerNode: null,

        //View Properties
        id: 'calendar_monthlist',
        cls: 'activities-for-month',
        dayView: 'calendar_daylist',
        datePickerView: 'datetimepicker',
        weekView: 'calendar_weeklist',
        insertView: 'activity_types_list',
        activityDetailView: 'activity_detail',
        eventDetailView: 'event_detail',
        enableSearch: false,
        hideSearch: true,
        expose: false,
        dateCounts: {},
        currentDate: null,

        pageSize: 500,
        queryWhere: null,
        queryOrderBy: 'StartDate asc',
        querySelect: [
            'StartDate',
            'Timeless',
            'Type'
        ],
        feed: {},
        eventFeed: {},
        entries: {},
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

        _onRefresh: function(o) {
           this.inherited(arguments);
           if (o.resourceKind === 'activities' || o.resourceKind === 'events')
           {
                this.refreshRequired = true;
           }
        },
        onStartup: function() {
            this.inherited(arguments);
            this.currentDate = moment().sod();
        },
        render: function() {
            this.inherited(arguments);
            this.renderCalendar();
        },
        activateActivityMore: function() {
            this.navigateToDayView();
        },
        activateEventMore: function() {
            var where = this.getSelectedDateEventQuery();
            scene().showView("event_related", {"where": where});
        },
        toggleGroup: function(params) {
            var node = params.$source;
            if (node && node.parentNode)
            {
                domClass.toggle(node, 'collapsed');
                domClass.toggle(node.parentNode, 'collapsed-event');
            }
        },
        selectDay: function(/*params,*/ evt, el) {
            if (this.selectedDateNode)
                domClass.remove(this.selectedDateNode, 'selected');

            this.selectedDateNode = el;
            domClass.add(el, 'selected');

            this.currentDate = moment(/*params.date*/ el.dataset.date, 'YYYY-MM-DD');
            this.getSelectedDate();
        },
        getFirstDayOfCurrentMonth: function() {
            return this.currentDate.clone().date(1).sod();
        },
        getLastDayOfCurrentMonth: function() {
            return this.currentDate.clone().date(this.currentDate.daysInMonth()).eod();
        },
        getTodayMonthActivities: function() {
            var today = moment().sod();
            if (this.currentDate.format('YYYY-MM') === today.format('YYYY-MM'))
            {
                this.currentDate = today;
                this.highlightCurrentDate();
                this.getSelectedDate();
            }
            else
            {
                this.currentDate = today;
                this.refresh();
            }
        },
        goToNextMonth: function() {
             this.currentDate.add({months: 1});
             this.refresh();
        },
        goToPreviousMonth: function() {
            this.currentDate.add({months: -1});
            this.refresh();
        },
        refresh: function() {
            this.feed = null;
            this.eventFeed = null;
            this._requestData();
            this.requestEventData();
        },
        _requestData: function() {
            this.dateCounts = [];
            this.position = 0;
            this.options = this.options || {};
            this.options['where'] = this.getActivityQuery();

            this.inherited(arguments);

            this.renderCalendar();
        },
        createEventRequest: function() {
            var querySelect = this.eventQuerySelect,
                queryWhere = this.getEventQuery(),
                request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getConnection())
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
            var errorItem = {
                viewOptions: this.options,
                serverError: response
            };
            ErrorManager.addError(this.requestErrorText, errorItem);
        },
        onRequestEventDataAborted: function(response, o) {
            var errorItem = {
                viewOptions: this.options,
                serverError: response
            };
            ErrorManager.addError(this.requestErrorText, errorItem);

            this.options = false; // force a refresh
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
                    startDate.format('YYYY-MM-DDT00:00:00\\Z'),
                    endDate.format('YYYY-MM-DDT23:59:59\\Z')]
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
        _processData: function(items) {
            var store = this.get('store'),
                count = items.length;

            if (count > 0)
            {
                var output = [];

                for (var i = 0; i < count; i++)
                {
                    var item = this._processItem(items[i]);

                    this.items[store.getIdentity(item)] = item;
                    var startDay = moment(convert.toDateFromString(item.StartDate));
                    if (item.Timeless)
                        startDay.add({minutes: startDay.zone()});

                    var dateIndex = startDay.format('YYYY-MM-DD');
                    this.dateCounts[dateIndex] = (this.dateCounts[dateIndex])
                        ? this.dateCounts[dateIndex] + 1
                        : 1;

                    output.push(this.rowTemplate.apply(item, this));
                }

                this.highlightActivities();
            }
        },
        processEventFeed: function(feed) {
            if (!feed) return;

            var dateIndex,
                r = feed['$resources'],
                feedLength = r.length;
            this.eventFeed = feed;

            for (var i = 0; i < feedLength; i ++)
            {
                var row = r[i];
                this.items[row.$key] = row;

                var startDay = moment(convert.toDateFromString(row.StartDate));
                var endDay = convert.toDateFromString(row.EndDate);

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
            query('.calendar-day').forEach( function(node) {
                var dataDate = domAttr.get(node, 'data-date');
                if (!this.dateCounts[dataDate]) return;

                domClass.add(node, "activeDay");

                var countMarkup = string.substitute(this.calendarActivityCountTemplate, [this.dateCounts[dataDate]]);

                var existingCount = query(node).children('div');

                if (existingCount.length > 0)
                {
                    domConstruct.place(countMarkup, existingCount[0], 'only');
                }
                else
                {
                    domConstruct.place('<div>'+countMarkup+'</div>', node, 'first');
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
            if (!requests) return;
            array.forEach(requests, function(xhr){
                if (xhr) // if request was fulfilled by offline storage, xhr will be undefined
                    xhr.abort();
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
        createSelectedDateRequest: function(o){
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getConnection())
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
                convert.toIsoStringFromDate(this.currentDate.clone().eod().toDate()),
                this.currentDate.format('YYYY-MM-DDT00:00:00\\Z'),
                this.currentDate.format('YYYY-MM-DDT23:59:59\\Z')
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
                        convert.toIsoStringFromDate(this.currentDate.clone().eod().toDate())
                    ]
                );
        },
        onRequestSelectedDateActivityDataSuccess: function(feed) {
            if (!feed) return;

            domClass.remove(this.activityContainerNode, 'list-loading');

            var r = feed['$resources'],
                feedLength = r.length,
                o = [];

            for (var i = 0; i < feedLength; i++)
            {
                var row = r[i];
                row.isEvent = false;
                this.items[row.$key] = row;
                o.push(this.activityRowTemplate.apply(row, this));
            }

            if (feedLength === 0)
            {
                this.set('activityContent', this.noDataTemplate.apply(this));
                return false;
            }

            if (feed['$totalResults'] > feedLength)
            {
                domClass.add(this.activityContainerNode, 'list-has-more');
                this.set('activityRemainingContent', string.substitute(this.countMoreText, [feed['$totalResults'] - feedLength]));
            }
            else
            {
                domClass.remove(this.activityContainerNode, 'list-has-more');
                this.set('activityRemainingContent', '');
            }

            this.set('activityContent', o.join(''));
        },
        onRequestSelectedDateEventDataSuccess: function(feed) {
            if (!feed) return;

            var r = feed['$resources'],
                feedLength = r.length,
                o = [];
            this.eventFeed = feed;

            if (feedLength === 0)
            {
                this.hideEventList();
                return false;
            }
            else
            {
                this.showEventList();
            }

            for (var i = 0; i < feedLength; i++)
            {
                var row = r[i];
                row.isEvent = true;
                this.items[row.$key] = row;
                o.push(this.eventRowTemplate.apply(row, this));
            }


            if (feed['$totalResults'] > feedLength)
            {
                domClass.add(this.eventContainerNode, 'list-has-more');
                this.set('eventRemainingContent', string.substitute(this.countMoreText, [feed['$totalResults'] - feedLength]));
            }
            else
            {
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
                dayDate = moment(this.currentDate).sod().date(1),
                today = moment(this.currentDate).sod(),
                monthLength = this.currentDate.daysInMonth(),
                weekEnds = [0,6];

            calHTML.push(this.calendarStartTemplate);

            calHTML.push(this.calendarWeekHeaderStartTemplate);
            for (var i = 0; i <= 6; i++ )
            {
                calHTML.push(string.substitute(this.calendarWeekHeaderTemplate, [moment.weekdaysShort[i]]));
            }
            calHTML.push(this.calendarWeekHeaderEndTemplate);

            //Weeks
            for (var i = 0; i <= 6; i++)
            {
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
                if (day > monthLength) break;
            }
            calHTML.push(this.calendarEndTemplate);

            this.set('calendarContent', calHTML.join(''));
            this.setDateTitle();
            this.highlightCurrentDate();
        },
        setDateTitle: function() {
            this.set('dateContent', this.currentDate.format(this.monthTitleFormatText));
        },
        activate: function(options) {
            this.inherited(arguments);

            if (options)
            {
                this.processShowOptions(options);
            }
            else
            {
                this.renderCalendar();
            }
        },
        processShowOptions: function(options) {
            if (options.currentDate && options.currentDate !== this.currentDate.unix() || !this.items)
            {
                this.currentDate = moment(options.currentDate).sod() || moment().sod();
                this.refreshRequired = true;
            }
        },
        highlightCurrentDate: function() {
            var selectedDate = string.substitute('.calendar-day[data-date=${0}]', [this.currentDate.format('YYYY-MM-DD')]);

            if (this.selectedDateNode)
                domClass.remove(this.selectedDateNode, 'selected');

            this.selectedDateNode = query(selectedDate, this.contentNode)[0];
            domClass.add(this.selectedDateNode, 'selected');
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
                    top: [{
                        id: 'complete',
                        fn: this.selectDateSuccess,
                        scope: this
                    },{
                        id: 'cancel',
                        place: 'left',
                        fn: scene().back,
                        scope: scene()
                    }]
                    }
                };

            scene().showView(this.datePickerView, options);
        },
        selectDateSuccess: function() {
            scene().back();
            var view = scene().getView(this.datePickerView);
            this.currentDate = moment(view.getDateTime()).sod();
            this.refresh();
        },
        navigateToWeekView: function() {
            var options = {currentDate: this.currentDate.valueOf() };
            scene().showView(this.weekView, options);
        },
        navigateToDayView: function() {
            var options = {currentDate: this.currentDate.valueOf() };
            scene().showView(this.dayView, options);
        },
        navigateToInsertView: function(el) {
            this.options.currentDate = this.currentDate.valueOf();
            scene().showView(this.insertView || this.editView, {
                negateHistory: true,
                returnTo: this.id,
                insert: true
            });
        },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.items[key],
                detailView = (entry.isEvent) ? this.eventDetailView : this.activityDetailView;

            descriptor = (entry.isEvent) ? descriptor : entry.Description;
            scene().showView(detailView, {
                descriptor: descriptor,
                key: key
            });
        }

    });
});