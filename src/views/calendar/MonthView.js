/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Calendar");

(function() {    
    Mobile.SalesLogix.Calendar.MonthView = Ext.extend(Sage.Platform.Mobile.List, {
        // Localization
        titleText: 'Calendar',
        todayText: 'Today',
        dayText: 'Day',
        weekText: 'Week',
        monthText: 'Month',
        monthTitleFormatText: 'MMMM yyyy',
        dayTitleFormatText: 'ddd MMM d, yyyy',
        dayStartTimeFormatText: 'h:mm',
        allDayText: 'All-Day',
        eventText: 'Event',

        //Templates
        viewTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
            '{%! $.searchTemplate %}',
            '{%! $.navigationTemplate %}',
            '<div style="clear:both"></div>',
            '<div class="month-content"></div>',
            '{%! $.dayTemplate %}',
            '</div>'
        ]),
        navigationTemplate: new Simplate([
            '<div class="split-buttons">',
                '<button data-tool="today" data-action="getTodayMonthActivities" class="button">{%: $.todayText %}</button>',
                '<button data-tool="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>',
                '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>',
                '<button data-tool="month" class="button">{%: $.monthText %}</button>',
            '</div>',
            '<div class="nav-bar">',
            '<h3 class="date-text"></h3>',
            '<button data-tool="next" data-action="goToNextMonth" class="button button-next"><span></span></button>',
            '<button data-tool="prev" data-action="goToPreviousMonth" class="button button-prev"><span></span></button>',
            '</div>'
        ]),
        dayTemplate: new Simplate([
            '<div class="month-day-content panel-content">',
                '<h2 class="date-day-text"></h2>',
                '<ul class="day-content list-content"></ul>',
                '{%! $.moreTemplate %}',
            '</div>'
        ]),
        dayItemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.dayContentTemplate %}',
            '</li>'
        ]),
        dayContentTemplate: new Simplate([
            '<h3>',
            '{%! $$.dayTimeTemplate %}',
            '<span class="p-description">&nbsp;{%: $.Description %}</span>',
            '</h3>',
            '<h4>{%= $$.dayNameTemplate.apply($) %}</h4>'
        ]),
        dayTimeTemplate: new Simplate([
            '{% if ($.Timeless) { %}',
                '<span class="p-meridiem">{%= $$.allDayText %}</span>',
            '{% } else { %}',
                '{% if ($.isEvent) { %}',
                    '<span class="p-meridiem">{%= $$.eventText %}</span>',
                '{% } else { %}',
                    '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.StartDate, $$.dayStartTimeFormatText) %}</span>',
                    '<span class="p-meridiem">{%: Mobile.SalesLogix.Format.date($.StartDate, "tt") %}</span>,',
                '{% } %}',
            '{% } %}'
        ]),
        dayNameTemplate: new Simplate([
            '{% if ($.ContactName) { %}',
            '{%: $.ContactName %} / {%: $.AccountName %}',
            '{% } else if ($.AccountName) { %}',
            '{%: $.AccountName %}',
            '{% } else { %}',
            '{%: $.LeadName %}',
            '{% } %}'
        ]),
        calendarStartTemplate: '<table class="calendar-table">',
        calendarWeekHeaderStartTemplate: '<tr class="calendar-week-header">',
        calendarWeekHeaderTemplate: '<td class="calendar-weekday">{0}</td>',
        calendarWeekHeaderEndTemplate: '</tr>',
        calendarWeekStartTemplate: '<tr class="calendar-week">',
        calendarEmptyDayTemplate: '<td>&nbsp;</td>',
        calendarDayTemplate: '<td class="calendar-day {1}" data-action="selectDay" data-date="{2}">{0}</td>',
        calendarWeekEndTemplate: '</tr>',
        calendarEndTemplate: '</table>',
        calendarActivityCountTemplate: new Simplate([
            '<div><span class="activity-count" title="{0} events">{1}</span></div>'
        ]),
        attachmentPoints: Ext.apply({}, {
            contentEl: '.month-content',
            dateTextEl: '.date-text',
            dayTextEl: '.date-day-text',
            dayContentEl: '.day-content',
            selectedDateEl: '.selected'
        }, Sage.Platform.Mobile.List.prototype.attachmentPoints),

        //View Properties
        id: 'slx_calendar',
        cls: 'activities-for-month',
        activityListView: 'useractivity_list',
        activityWeekView: 'calendar_weeklist',
        insertView: 'activity_types_list',
        activityDetailView: 'activity_detail',
        eventDetailView: 'event_detail',
        hideSearch: true,
        expose: false,
        dayItems: [],
        dateCounts: {},

        currentDate: Date.today(),
        queryWhere: null,
        queryOrderBy: 'Activity.StartDate asc',
        querySelect: [
            'Activity/StartDate',
            'Activity/Description',
            'Activity/Type',
            'Activity/AccountName',
            'Activity/ContactName',
            'Activity/LeadId',
            'Activity/LeadName',
            'Activity/UserId',
            'Activity/Timeless'
        ],
        pageSize: 500,
        resourceKind: 'useractivities',

        _onRefresh: function(o) {
            Mobile.SalesLogix.Calendar.MonthView.superclass._onRefresh.apply(this, arguments);
           if (o.resourceKind === 'activities'){
                this.refreshRequired = true;
            }
        },
        init: function() {
            Mobile.SalesLogix.Calendar.MonthView.superclass.init.apply(this, arguments);
            this.queryWhere = this.getActivityQuery();
        },
        initEvents: function() {
            Mobile.SalesLogix.Calendar.MonthView.superclass.initEvents.apply(this, arguments);
            /*
            Disable swiping until further research with FireFox Mobile and better usability
            handling for entire page swipe vs content area swipe
            this.el.on('swipe', this.onSwipe, this);
            */
        },
        onSwipe: function(evt){
            switch(evt.browserEvent.direction){
                case 'right':
                    this.onSwipeRight();
                    break;
                case 'left':
                    this.onSwipeLeft();
                    break;
            }
        },
        onSwipeRight: function(){
            this.goToPreviousMonth();
        },
        onSwipeLeft: function(){
            this.goToNextMonth();
        },
        clear: function(){
            Mobile.SalesLogix.Calendar.MonthView.superclass.clear.apply(this, arguments);
            this.clearCurrentDateActivities();
        },
        render: function() {
            Mobile.SalesLogix.Calendar.MonthView.superclass.render.apply(this, arguments);
            this.renderCalendar();
        },
        selectDay: function(params, evt, el) {
            if (this.selectedDateEl) this.selectedDateEl.removeClass('selected');
            this.selectedDateEl = Ext.get(el).addClass('selected');
            this.currentDate = Date.parse(params.date);
            this.showCurrentDateActivities();
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
                this.showCurrentDateActivities();
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
            this.dayItems = [];
            this.dateCounts = [];
            this.dayContentEl.update(this.loadingTemplate.apply(this));
            this.requestData();
            this.requestEventData();
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
            var request = this.createEventRequest();
            request.read({
                success: this.onRequestEventDataSuccess,
                failure: this.onRequestEventDataFailure,
                aborted: this.onRequestEventDataAborted,
                scope: this
            });
        },
        onRequestEventDataFailure: function(response, o) {
            alert(String.format(this.requestErrorText, response, o));
        },
        onRequestEventDataAborted: function(response, o) {
            this.options = false; // force a refresh
        },
        onRequestEventDataSuccess: function(feed) {
            this.processFeed(feed);
        },
        getActivityQuery: function(){
            var startDate = this.getFirstDayOfCurrentMonth(),
                endDate = this.getLastDayOfCurrentMonth();
            return String.format(
                    [
                        'UserId eq "{0}" and (',
                        '(Activity.Timeless eq false and Activity.StartDate',
                        ' between @{1}@ and @{2}@) or ',
                        '(Activity.Timeless eq true and Activity.StartDate',
                        ' between @{3}@ and @{4}@))'
                    ].join(''),
                    'ADMIN',//App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(startDate),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(endDate),
                    startDate.toString('yyyy-MM-ddT00:00:00Z'),
                    endDate.toString('yyyy-MM-ddT23:59:59Z')
                );
        },
        getEventQuery: function(){
            var startDate = this.getFirstDayOfCurrentMonth(),
                endDate = this.getLastDayOfCurrentMonth();
            return String.format(
                    [
                        'UserId eq "{0}" and (',
                        'StartDate',
                        ' between @{1}@ and @{2}@)'
                    ].join(''),
                    App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(startDate),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(endDate)
                );
        },
        processFeed: function(feed) {
            var dateIndex,
                r = feed['$resources'],
                isEvent = (r[0] && r[0].Activity) ? false : true,
                i,
                feedLength = r.length,
                startDay,
                endDay;

            this.dayItems.push(feed)


            for(i = 0; i < feedLength; i += 1){
                if(isEvent){
                    this.entries[r[i].$key] = r[i];
                    startDay = r[i].StartDate;
                } else {
                    this.entries[r[i].Activity.$key] = r[i].Activity;
                    startDay = r[i].Activity.StartDate;
                }
                startDay = Sage.Platform.Mobile.Convert.toDateFromString(startDay);
                endDay = (isEvent) ? Sage.Platform.Mobile.Convert.toDateFromString(r[i].EndDate) : startDay.clone().add({second:1});
                while(startDay.getDate() <= endDay.getDate()){
                    dateIndex = (!isEvent && r[i].Activity.Timeless)
                        ? this.dateToUTC(startDay)
                        : startDay;
                    dateIndex = dateIndex.toString('yyyy-MM-dd');
                    this.dateCounts[dateIndex] = (this.dateCounts[dateIndex])
                        ? this.dateCounts[dateIndex] + 1
                        : 1;
                    startDay.add({day:1});
                }
            }
            this.highlightActivities();
            this.showCurrentDateActivities();
        },
        highlightActivities: function(){
            var template = this.calendarActivityCountTemplate.apply(this),
                dateCounts = this.dateCounts;
            Ext.select('.calendar-day').each( function(el) {
                var dataDate = el.getAttribute('data-date');
                if (dateCounts[dataDate]) {
                    el.addClass("activeDay");
                    if(el.dom.children.length > 0){
                        el.child('div').update(String.format(template,
                            dateCounts[dataDate],
                            dateCounts[dataDate])
                        );
                    } else {
                        Ext.DomHelper.insertFirst(el, String.format(
                            template,
                            dateCounts[dataDate],
                            dateCounts[dataDate]
                        ));
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
        clearCurrentDateActivities: function(){
            this.dayContentEl.update(this.loadingTemplate.apply(this));
        },
        setCurrentDateTitle: function(){
            this.dayTextEl.update(this.currentDate.toString(this.dayTitleFormatText));
        },
        showCurrentDateActivities: function(){
            this.setCurrentDateTitle();

            if(this.dayItems.length < 1){
                this.dayContentEl.update(this.loadingTemplate.apply(this));
                return;
            }

            var f = 0,
                feedsLength = this.dayItems.length,
                feed,
                feedLength,
                i = 0,
                activity,
                startDay,
                endDay,
                activityList = [],
                eventList = [];

            for(f=0; f<feedsLength; f += 1) {
                feed = this.dayItems[f]['$resources'];
                feedLength = feed.length;

                for(i = 0; i < feedLength; i += 1){
                    if(feed[i].Activity){
                        activity = feed[i].Activity;
                        activity.isEvent = false;
                    } else {
                        activity = feed[i];
                        activity.isEvent = true;
                    }
                    activity.key = feed[i].key;
                    activity.descriptor = feed[i].descriptor;
                    activity.StartDate = Sage.Platform.Mobile.Convert.toDateFromString(activity.StartDate);
                    startDay = (activity.Timeless)
                        ? this.dateToUTC(activity.StartDate)
                        : activity.StartDate;
                    endDay = (activity.isEvent)
                        ? Sage.Platform.Mobile.Convert.toDateFromString(feed[i].EndDate)
                        : startDay.clone().add({second:1});
                    if(this.currentDate.getDate() <= endDay.getDate() && this.currentDate.getDate() >= startDay.getDate()){
                        if(activity.isEvent) {
                            eventList.push(this.dayItemTemplate.apply(activity, this));
                        }
                        else {
                            activityList.push(this.dayItemTemplate.apply(activity, this));
                        }
                    }
                }
            }
            if(activityList.length === 0 && eventList.length === 0){
                this.dayContentEl.update(this.noDataTemplate.apply(this));
                return false;
            }

            if(eventList.length > 0){
                activityList = eventList.concat(activityList);
            }

            this.dayContentEl.update(activityList.join(''));
        },
        renderCalendar: function() {
            var calHTML = [],
                startingDay = this.getFirstDayOfCurrentMonth().getDay(),
                dayClass = '',
                weekendClass = '',
                i = 0,
                j = 0,
                day = 1,
                dayDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1,0,0,0,0),
                today = Date.today().clearTime(),
                monthLength = this.currentDate.getDaysInMonth(),
                weekEnds = [0,6];

            calHTML.push(this.calendarStartTemplate);

            calHTML.push(this.calendarWeekHeaderStartTemplate);
            for(i = 0; i <= 6; i++ ){
                calHTML.push(String.format(this.calendarWeekHeaderTemplate, Date.CultureInfo.abbreviatedDayNames[i]  ));
            }
            calHTML.push(this.calendarWeekHeaderEndTemplate);

            //Weeks
            for (i = 0; i <= 6; i+=1){
                calHTML.push(this.calendarWeekStartTemplate);
                //Days
                for (j = 0; j <= 6; j+=1)
                {
                    if (day <= monthLength && (i > 0 || j >= startingDay)){
                        dayDate.set({day:day});
                        dayClass = (dayDate.equals(today)) ? 'today' : '';
                        weekendClass = (weekEnds.indexOf(j) !== -1) ? ' weekend' : '';
                        calHTML.push(String.format(this.calendarDayTemplate,
                                                    day,
                                                    (dayClass + weekendClass),
                                                    dayDate.toString('yyyy-MM-dd')
                                                   )
                                    );
                        day += 1;
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

            this.contentEl.update(calHTML.join(''));
            this.setDateTitle();
            this.highlightCurrentDate();
        },
        setDateTitle: function(){
            this.dateTextEl.update(this.currentDate.toString(this.monthTitleFormatText));
        },
        show: function(options) {
            Sage.Platform.Mobile.Calendar.superclass.show.call(this, options);
            if(options) {
                this.processShowOptions(options);
            } else {
                this.renderCalendar();
            }
        },
        processShowOptions: function(options){
            if(options.currentDate){
                this.currentDate = Date.parse(options.currentDate).clearTime() || Date.today().clearTime();
                this.refreshRequired = true;
            }
        },
        highlightCurrentDate: function(){
            var selectedDate = String.format('.calendar-day[data-date={0}]', this.currentDate.toString('yyyy-MM-dd'));
            if (this.selectedDateEl) this.selectedDateEl.removeClass('selected');
            this.selectedDateEl = this.contentEl.child(selectedDate);
            this.selectedDateEl.addClass('selected');
        },
        navigateToWeekView: function() {
            var view = App.getView(this.activityWeekView),
                options = {currentDate: this.currentDate.toString('yyyy-MM-dd') || Date.today()};
            view.show(options);
        },
        navigateToDayView: function() {
            var view = App.getView(this.activityListView),
                options = {currentDate: this.currentDate.toString('yyyy-MM-dd') || Date.today()};
            view.show(options);
        },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.entries[key];
            this.detailView = (entry.isEvent) ? this.eventDetailView : this.activityDetailView;
            Mobile.SalesLogix.Activity.List.superclass.navigateToDetailView.call(this, key, descriptor);
        }

    });
})();