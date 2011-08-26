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
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.dayContentTemplate %}',
            '</li>'
        ]),
        dayContentTemplate: new Simplate([
            '<h3>',
            '{%! $$.dayTimeTemplate %}',
            '<span class="p-description">&nbsp;{%: $.Activity.Description %}</span>',
            '</h3>',
            '<h4>{%= $$.dayNameTemplate.apply($) %}</h4>'
        ]),
        dayTimeTemplate: new Simplate([
            '{% if ($.Activity.Timeless) { %}',
            '<span class="p-meridiem">{%= $$.allDayText %}</span>',
            '{% } else { %}',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, $$.dayStartTimeFormatText) %}</span>',
            '<span class="p-meridiem">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "tt") %}</span>,',
            '{% } %}'
        ]),
        dayNameTemplate: new Simplate([
            '{% if ($.Activity.ContactName) { %}',
            '{%: $.Activity.ContactName %} / {%: $.Activity.AccountName %}',
            '{% } else if ($.Activity.AccountName) { %}',
            '{%: $.Activity.AccountName %}',
            '{% } else { %}',
            '{%: $.Activity.LeadName %}',
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
        detailView: 'activity_detail',
        hideSearch: true,

        currentDate: Date.today(),
        queryWhere: null,
        queryOrderBy: 'Activity.StartDate asc',
        querySelect: [
            'Activity/StartDate',
            'Activity/EndDate',
            'Activity/Description',
            'Activity/Type',
            'Activity/AccountName',
            'Activity/ContactName',
            'Activity/LeadId',
            'Activity/LeadName',
            'Activity/UserId',
            'Activity/Timeless'
        ],
        pageSize: 31,
        resourceKind: 'useractivities',

        _onRefresh: function(o) {
            Mobile.SalesLogix.Calendar.MonthView.superclass._onRefresh.apply(this, arguments);
           if (o.resourceKind === 'activities'){
                this.refreshRequired = true;
            }
        },
        init: function() {
            Mobile.SalesLogix.Calendar.MonthView.superclass.init.apply(this, arguments);
            this.setActivityQuery();
        },
        initEvents: function() {
            Mobile.SalesLogix.Calendar.MonthView.superclass.initEvents.apply(this, arguments);
            this.el.on('swipe', this.onSwipe, this);
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
                this.currentDate.getDaysInMonth()-1,
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
            this.setActivityQuery();
            this.feed['$startIndex'] = 0;
            this.dayContentEl.update(this.loadingTemplate.apply(this));
            this.requestData();
        },
        setActivityQuery: function(){
            var startDate = this.getFirstDayOfCurrentMonth(),
                endDate = this.getLastDayOfCurrentMonth();
            this.queryWhere = String.format(
                    [
                        'UserId eq "{0}" and (',
                        '(Activity.Timeless eq false and Activity.StartDate between @{1}@ and @{2}@) or ',
                        '(Activity.Timeless eq true and Activity.StartDate between @{3}@ and @{4}@))'
                    ].join(''),
                    App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(startDate),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(endDate),
                    startDate.toString('yyyy-MM-ddT00:00:00Z'),
                    endDate.toString('yyyy-MM-ddT23:59:59Z')
                );
        },
        processFeed: function(feed) {
            var flatList = [],
                dt,
                currentMonthStart = this.getFirstDayOfCurrentMonth(),
                currentMonthEnd = this.getLastDayOfCurrentMonth(),
                r = feed['$resources'],
                startDay,
                endDay;

            for(var i=0, l=r.length; i<l; i++){
                this.entries[r[i].$key] = r[i];

                startDay = Sage.Platform.Mobile.Convert.toDateFromString(r[i].Activity.StartDate);
                endDay = Sage.Platform.Mobile.Convert.toDateFromString(r[i].Activity.EndDate);
                do { // track No. of activities for each calendar day
                    dt = startDay < currentMonthStart ? 1 : (r[i].Activity.Timeless ? startDay.getUTCDate() : startDay.getDate());
                    flatList[ dt ] = flatList[ dt ] ? 1 + flatList[ dt ] : 1;
                    startDay.add({day: 1});
                } while (startDay < endDay && startDay < currentMonthEnd);
            }
            this.feed = feed;

            this.highlightActivities(flatList);
            this.showCurrentDateActivities();
        },
        highlightActivities: function(flatList){
            var template = this.calendarActivityCountTemplate.apply(this);
            Ext.select('.calendar-day').each( function(el) {
                if (flatList[el.dom.textContent]) {
                    el.addClass("activeDay");
                    Ext.DomHelper.insertFirst(el, String.format(
                        template,
                        flatList[el.dom.textContent],
                        flatList[el.dom.textContent]
                    ));
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

            if(!this.feed){
                this.dayContentEl.update(this.loadingTemplate.apply(this));
                return;
            }

            var feed = this.feed['$resources'],
                feedLength = feed.length,
                i = 0,
                activity,
                activityDate,
                activityList = [];

            for(i = 0; i < feedLength; i += 1){
                activity = feed[i].Activity;
                activity.StartDate = Sage.Platform.Mobile.Convert.toDateFromString(activity.StartDate);
                activityDate = (activity.Timeless) ? this.dateToUTC(activity.StartDate) : activity.StartDate;
                if(activityDate.getDate() === this.currentDate.getDate()){
                    activityList.push(this.dayItemTemplate.apply(feed[i], this));
                }
            }
            if(activityList.length===0){
                this.dayContentEl.update(this.noDataTemplate.apply(this));
                return false;
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
            var entry = this.entries[key],
                activity = entry['Activity'],
                description = activity['Description'],
                key = activity['$key'];

            Mobile.SalesLogix.Activity.List.superclass.navigateToDetailView.call(this, key, description);
        }

    });
})();