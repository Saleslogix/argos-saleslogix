/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Calendar/MonthView', ['Sage/Platform/Mobile/List', 'Sage/Platform/Mobile/Convert'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Calendar.MonthView', [Sage.Platform.Mobile.List], {
        // Localization
        titleText: 'Calendar',
        todayText: 'Today',
        dayText: 'Day',
        weekText: 'Week',
        monthText: 'Month',
        yearText: 'Year',
        monthTitleFormatText: 'MMMM yyyy',
        dayTitleFormatText: 'ddd MMM d, yyyy',
        startTimeFormatText: 'h:mm',
        allDayText: 'All-Day',
        eventText: 'Event',
        eventHeaderText: 'Events',
        countMoreText: 'View ${0} More',
        activityHeaderText: 'Activities',
        toggleCollapseText: 'toggle collapse',

        //Templates
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
                '<div data-dojo-attach-point="searchNode"></div>',
                '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
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
                '<button data-tool="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>',
                '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>',
                '<button data-tool="month" class="button">{%: $.monthText %}</button>',
                '<button data-tool="year" data-action="navigateToYearView" class="button">{%: $.yearText %}</button>',
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
                '<td class="entry-table-icon"><div data-action="selectEntry" class="list-item-selector"></div></td>',
                '<td class="entry-table-time">{%! $$.activityTimeTemplate %}</td>',
                '<td class="entry-table-description">{%! $$.activityItemTemplate %}</td>',
            '</tr></table>',
            '</li>'
        ]),
        eventRowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">',
            '<table class="calendar-entry-table"><tr>',
            '<td class="entry-table-icon"><div data-action="selectEntry" class="list-item-selector"></div></td>',
            '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>',
            '</tr></table>',
            '',
            '</li>'
        ]),
        activityTimeTemplate: new Simplate([
            '{% if ($.Timeless) { %}',
                '<span class="p-time">{%= $$.allDayText %}</span>',
            '{% } else { %}',
                '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.StartDate, $$.startTimeFormatText) %}</span>',
                '<span class="p-meridiem">{%: Mobile.SalesLogix.Format.date($.StartDate, "tt") %}</span>',
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
        calendarActivityCountTemplate: new Simplate([
            '<div><span class="activity-count" title="${0} events">${0}</span></div>'
        ]),
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

        //View Properties
        id: 'calendar_monthlist',
        cls: 'activities-for-month',
        dayView: 'calendar_daylist',
        yearView: 'calendar_yearlist',
        weekView: 'calendar_weeklist',
        insertView: 'activity_types_list',
        activityDetailView: 'activity_detail',
        eventDetailView: 'event_detail',
        enableSearch: false,
        expose: false,
        dateCounts: {},
        currentDate: Date.today(),

        pageSize: 500,
        queryWhere: null,
        queryOrderBy: 'StartDate asc',
        querySelect: [
            'StartDate',
            'Timeless'
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

        resourceKind: 'activities',

        _onRefresh: function(o) {
           this.inherited(arguments);
           if (o.resourceKind === 'activities' || o.resourceKind === 'events'){
                this.refreshRequired = true;
           }
        },
        clear: function(){
            //this.inherited(arguments);
        },
        render: function() {
            this.inherited(arguments);
            this.renderCalendar();
        },
        activateActivityMore: function(){
            this.navigateToDayView();
        },
        activateEventMore: function(){
            var view = App.getView("event_related"),
                where = this.getSelectedDateEventQuery();
            if (view)
                view.show({"where": where});
        },
        toggleGroup: function(params) {
            var node = dojo.query(params.$source);
            if (node && node.parent()) {
                node.toggleClass('collapsed');
                node.parent().toggleClass('collapsed-event');
            }
        },
        selectDay: function(params, evt, el) {
            if (this.selectedDateNode) dojo.removeClass(this.selectedDateNode, 'selected');
            this.selectedDateNode = el;
            dojo.addClass(el, 'selected');
            this.currentDate = Date.parseExact(params.date,'yyyy-MM-dd');
            this.getSelectedDate();
        },
        getFirstDayOfCurrentMonth: function(){
            return this.currentDate.clone().moveToFirstDayOfMonth().clearTime();
        },
        getLastDayOfCurrentMonth: function(){
            return new Date(this.currentDate.getFullYear(),
                this.currentDate.getMonth(),
                this.currentDate.getDaysInMonth(),
                23, 59, 59);
        },
        getTodayMonthActivities: function(){
            var today = Date.today();
            if(this.currentDate.toString('yyyy-MM') === today.toString('yyyy-MM')){
                this.currentDate = today;
                this.highlightCurrentDate();
                this.getSelectedDate();
            } else {
                this.currentDate = today;
                this.refresh();
            }
        },
        goToNextMonth: function() {
             this.currentDate.add({month: 1});
             this.refresh();
        },
        goToPreviousMonth: function() {
            this.currentDate.add({month: -1});
            this.refresh();
        },
        refresh: function(){
            this.renderCalendar();
            this.queryWhere = this.getActivityQuery();
            this.feed['$startIndex'] = 0;
            this.eventFeed['$startIndex'] = 0;
            this.dateCounts = [];
            this.requestData();
            this.requestEventData();
        },
        requestData: function(){
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
        createEventRequest: function(){
            var querySelect = ['StartDate', 'EndDate', 'Description', 'Type'],
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
            alert(dojo.string.substitute(this.requestErrorText, [response, o]));
            Sage.Platform.Mobile.ErrorManager.addError(response, o, this.options, 'failure');
        },
        onRequestEventDataAborted: function(response, o) {
            this.options = false; // force a refresh
            Sage.Platform.Mobile.ErrorManager.addError(response, o, this.options, 'aborted');
        },
        onRequestEventDataSuccess: function(feed) {
            this.processEventFeed(feed);
        },
        getActivityQuery: function(){
            var startDate = this.getFirstDayOfCurrentMonth(),
                endDate = this.getLastDayOfCurrentMonth();
            return dojo.string.substitute(
                    [
                        'UserActivities.UserId eq "${0}" and (',
                        '(Timeless eq false and StartDate',
                        ' between @${1}@ and @${2}@) or ',
                        '(Timeless eq true and StartDate',
                        ' between @${3}@ and @${4}@))'
                    ].join(''),
                    [App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(startDate),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(endDate),
                    startDate.toString('yyyy-MM-ddT00:00:00Z'),
                    endDate.toString('yyyy-MM-ddT23:59:59Z')]
                );
        },
        getEventQuery: function(){
            var startDate = this.getFirstDayOfCurrentMonth(),
                endDate = this.getLastDayOfCurrentMonth();
            return dojo.string.substitute(
                    [
                        'UserId eq "${0}" and (',
                            '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
                            'StartDate lt @${2}@',
                        ')'
                    ].join(''),
                    [App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(startDate),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(endDate)]
                );
        },
        processFeed: function(feed) {
            if (!feed) return;

            var r = feed['$resources'];
            this.feed = feed;

            for(var i = 0; i < r.length; i++){
                var row = r[i];
                this.entries[row.$key] = row;
                var startDay = Sage.Platform.Mobile.Convert.toDateFromString(row.StartDate);
                var dateIndex = (r[i].Timeless)
                    ? this.dateToUTC(startDay)
                    : startDay;
                dateIndex = dateIndex.toString('yyyy-MM-dd');
                this.dateCounts[dateIndex] = (this.dateCounts[dateIndex])
                    ? this.dateCounts[dateIndex] + 1
                    : 1;
            }
            this.highlightActivities();
        },
        processEventFeed: function(feed) {
            if (!feed) return;

            var dateIndex,
                r = feed['$resources'],
                feedLength = r.length;
            this.eventFeed = feed;

            for(var i = 0; i < feedLength; i ++){
                var row = r[i];
                this.entries[row.$key] = row;

                var startDay = Sage.Platform.Mobile.Convert.toDateFromString(row.StartDate);
                var endDay = Sage.Platform.Mobile.Convert.toDateFromString(row.EndDate);

                while(startDay.getDate() <= endDay.getDate()){
                    dateIndex = startDay.toString('yyyy-MM-dd');
                    this.dateCounts[dateIndex] = (this.dateCounts[dateIndex])
                        ? this.dateCounts[dateIndex] + 1
                        : 1;
                    startDay.add({day:1});
                }
            }
            this.highlightActivities();
        },

        highlightActivities: function(){
            var template = this.calendarActivityCountTemplate.apply(this),
                dateCounts = this.dateCounts;
            dojo.query('.calendar-day').forEach( function(el) {
                var dataDate = dojo.attr(el, 'data-date');
                if (dateCounts[dataDate]) {
                    dojo.addClass(el, "activeDay");
                    if(dojo.query(el).children('div').length > 0){
                        dojo.query(el).children('div')[0].innerHTML = dojo.string.substitute(template,
                            [dateCounts[dataDate],
                            dateCounts[dataDate]]);
                    } else {
                        dojo.place(dojo.string.substitute(
                            template,
                            [dateCounts[dataDate]]
                        ), el, 'first');
                    }

                }
            });
        },
        dateToUTC: function(date){
            return new Date(date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
                date.getUTCHours(),
                date.getUTCMinutes(),
                date.getUTCSeconds()
            );
        },
        setCurrentDateTitle: function(){
            this.set('dayTitleContent', this.currentDate.toString(this.dayTitleFormatText));
        },
        hideEventList: function(){
            dojo.addClass(this.eventContainerNode, 'event-hidden');
        },
        showEventList: function(){
            dojo.removeClass(this.eventContainerNode, 'event-hidden');
        },
        getSelectedDate: function(){
            this.clearSelectedDate();
            this.setCurrentDateTitle();
            this.requestSelectedDateActivities();
            this.requestSelectedDateEvents();
        },
        clearSelectedDate: function(){
            dojo.addClass(this.activityContainerNode, 'list-loading');
            this.set('activityContent', this.loadingTemplate.apply(this));
            this.hideEventList();
        },
        cancelRequests: function(requests){
            if (!requests) return;
            dojo.forEach(requests, function(xhr){
                xhr.abort();
            });
        },
        requestSelectedDateActivities: function(){
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
        requestSelectedDateEvents: function(){
            this.cancelRequests(this.selectedDateEventRequests);
            this.selectedDateEventRequests = [];

            var request = this.createSelectedDateRequest({
                pageSize: this.eventPageSize,
                resourceKind: 'events',
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
        getSelectedDateActivityQuery: function(){
            var C = Sage.Platform.Mobile.Convert;
            var query = [
                'UserActivities.UserId eq "${0}" and (',
                '(Timeless eq false and StartDate between @${1}@ and @${2}@) or ',
                '(Timeless eq true and StartDate between @${3}@ and @${4}@))'
            ].join('');
            return dojo.string.substitute(
                query,
                [App.context['user'] && App.context['user']['$key'],
                C.toIsoStringFromDate(this.currentDate),
                C.toIsoStringFromDate(this.currentDate.clone().add({day: 1, second: -1})),
                this.currentDate.toString('yyyy-MM-ddT00:00:00Z'),
                this.currentDate.toString('yyyy-MM-ddT23:59:59Z')]
            );
        },
        getEndOfDay: function(){
            return new Date(this.currentDate.getFullYear(),
                this.currentDate.getMonth(),
                this.currentDate.getDate(),
                23, 59, 59);
        },
        getSelectedDateEventQuery: function(){
            return dojo.string.substitute(
                    [
                        'UserId eq "${0}" and (',
                            '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
                            'StartDate lt @${2}@',
                        ')'
                    ].join(''),
                    [App.context['user'] && App.context['user']['$key'],
                    this.currentDate.toString('yyyy-MM-ddT00:00:00Z'),
                    this.currentDate.toString('yyyy-MM-ddT23:59:59Z')]
                );
        },
        onRequestSelectedDateActivityDataSuccess: function(feed){
            if (!feed) return;

            dojo.removeClass(this.activityContainerNode, 'list-loading');

            var r = feed['$resources'],
                feedLength = r.length,
                o = [];

            for(var i = 0; i < feedLength; i++){
                var row = r[i];
                row.isEvent = false;
                this.entries[row.$key] = row;
                o.push(this.activityRowTemplate.apply(row, this));
            }

            if(feedLength === 0){
                this.set('activityContent', this.noDataTemplate.apply(this));
                return false;
            }

            if(feed['$totalResults'] > feedLength) {
                dojo.addClass(this.activityContainerNode, 'list-has-more');
                this.set('activityRemainingContent', dojo.string.substitute(this.countMoreText, [feed['$totalResults'] - feedLength]));
            } else {
                dojo.removeClass(this.activityContainerNode, 'list-has-more');
                this.set('activityRemainingContent', '');
            }

            this.set('activityContent', o.join(''));
        },
        onRequestSelectedDateEventDataSuccess: function(feed){
            if (!feed) return;

            var r = feed['$resources'],
                row,
                feedLength = r.length,
                o = [];
            this.eventFeed = feed;

            if(feedLength === 0){
                this.hideEventList();
                return false;
            } else {
                this.showEventList();
            }

            for(var i = 0; i < feedLength; i++){
                row = r[i];
                row.isEvent = true;
                this.entries[row.$key] = row;
                o.push(this.eventRowTemplate.apply(row, this));
            }


            if(feed['$totalResults'] > feedLength) {
                dojo.addClass(this.eventContainerNode, 'list-has-more');
                this.set('eventRemainingContent', dojo.string.substitute(this.countMoreText, [feed['$totalResults'] - feedLength]));
            } else {
                dojo.removeClass(this.eventContainerNode, 'list-has-more');
                this.set('eventRemainingContent', '');
            }

            this.set('eventContent', o.join(''));
        },

        renderCalendar: function() {
            var calHTML = [],
                startingDay = this.getFirstDayOfCurrentMonth().getDay(),
                dayClass = '',
                weekendClass = '',
                day = 1,
                dayDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1,0,0,0,0),
                today = Date.today().clearTime(),
                monthLength = this.currentDate.getDaysInMonth(),
                weekEnds = [0,6];

            calHTML.push(this.calendarStartTemplate);

            calHTML.push(this.calendarWeekHeaderStartTemplate);
            for(var i = 0; i <= 6; i++ ){
                calHTML.push(dojo.string.substitute(this.calendarWeekHeaderTemplate, [Date.CultureInfo.abbreviatedDayNames[i]]));
            }
            calHTML.push(this.calendarWeekHeaderEndTemplate);

            //Weeks
            for (var i = 0; i <= 6; i++){
                calHTML.push(this.calendarWeekStartTemplate);
                //Days
                for (var j = 0; j <= 6; j++)
                {
                    if (day <= monthLength && (i > 0 || j >= startingDay)){
                        dayDate.set({day:day});
                        dayClass = (dayDate.equals(today)) ? 'today' : '';
                        weekendClass = (weekEnds.indexOf(j) !== -1) ? ' weekend' : '';
                        calHTML.push(dojo.string.substitute(this.calendarDayTemplate,
                                                    [day,
                                                    (dayClass + weekendClass),
                                                    dayDate.toString('yyyy-MM-dd')]
                                                   )
                                    );
                        day++;
                    }
                    else {
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
        setDateTitle: function(){
            this.set('dateContent', this.currentDate.toString(this.monthTitleFormatText));
        },
        show: function(options) {
            this.inherited(arguments);

            if(options) {
                this.processShowOptions(options);
            } else {
                this.renderCalendar();
            }
        },
        processShowOptions: function(options){
            if(options.currentDate){
                this.currentDate = Date.parseExact(options.currentDate,'yyyy-MM-dd').clearTime() || Date.today().clearTime();
                this.refreshRequired = true;
            }
        },
        highlightCurrentDate: function(){
            var selectedDate = dojo.string.substitute('.calendar-day[data-date=${0}]', [this.currentDate.toString('yyyy-MM-dd')]);
            if (this.selectedDateNode) dojo.removeClass(this.selectedDateNode, 'selected');
            this.selectedDateNode = dojo.query(selectedDate, this.contentNode)[0];
            dojo.addClass(this.selectedDateNode, 'selected');
            this.getSelectedDate();
        },
        navigateToYearView: function() {
            var view = App.getView(this.yearView),
                options = {currentDate: this.currentDate.toString('yyyy-MM-dd') || Date.today()};
            view.show(options);
        },
        navigateToWeekView: function() {
            var view = App.getView(this.weekView),
                options = {currentDate: this.currentDate.toString('yyyy-MM-dd') || Date.today()};
            view.show(options);
        },
        navigateToDayView: function() {
            var view = App.getView(this.dayView),
                options = {currentDate: this.currentDate.toString('yyyy-MM-dd') || Date.today()};
            view.show(options);
        },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.entries[key],
                detailView = (entry.isEvent) ? this.eventDetailView : this.activityDetailView,
                view = App.getView(detailView);
            descriptor = (entry.isEvent) ? descriptor : entry.Description;
            if (view)
                view.show({
                    descriptor: descriptor,
                    key: key
                });
        }

    });
});