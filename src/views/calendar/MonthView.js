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

        //Templates
        viewTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
            '{%! $.searchTemplate %}',
            '{%! $.navigationTemplate %}',
            '<div class="month-content"></div>',
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
            selectedDateEl: '.selected'
        }, Sage.Platform.Mobile.List.prototype.attachmentPoints),

        //View Properties
        id: 'slx_calendar',
        cls: 'activities-for-month',
        activityListView: 'useractivity_list',
        activityWeekView: 'calendar_weeklist',
        insertView: 'activity_types_list',
        hideSearch: true,

        currentDate: Date.today(),
        queryWhere: null,
        queryOrderBy: 'Activity.StartDate asc',
        querySelect: [
            'Activity/StartDate',
            'Activity/EndDate',
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
        render: function() {
            Mobile.SalesLogix.Calendar.MonthView.superclass.render.apply(this, arguments);
            this.renderCalendar();
        },
        selectDay: function(params, evt, el) {
            if (this.selectedDateEl) this.selectedDateEl.removeClass('selected');
            this.selectedDateEl = Ext.get(el).addClass('selected');
            this.currentDate = Date.parse(params.date);
        },
        getFirstDayOfCurrentMonth: function(){
            return this.currentDate.clone().moveToFirstDayOfMonth();
        },
        getLastDayOfCurrentMonth: function(){
            return this.currentDate.clone().moveToLastDayOfMonth();
        },
        getTodayMonthActivities: function(){
            var today = Date.today();
            if(this.currentDate.toString('yyyy-MM') === today.toString('yyyy-MM')){
                this.currentDate = today;
                this.highlightCurrentDate();
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
        processFeed: function(sources) {
            var flatList = [],
                dt,
                currentMonthStart = this.getFirstDayOfCurrentMonth(),
                currentMonthEnd = this.getLastDayOfCurrentMonth(),
                r = sources['$resources'],
                startDay,
                endDay;

            for(var i=0, l=r.length; i<l; i++){
                startDay = Sage.Platform.Mobile.Convert.toDateFromString(r[i].Activity.StartDate);
                endDay = Sage.Platform.Mobile.Convert.toDateFromString(r[i].Activity.EndDate);
                do { // track No. of activities for each calendar day
                    dt = startDay < currentMonthStart ? 1 : (r[i].Activity.Timeless ? startDay.getUTCDate() : startDay.getDate());
                    flatList[ dt ] = flatList[ dt ] ? 1 + flatList[ dt ] : 1;
                    startDay.add({day: 1});
                } while (startDay < endDay && startDay < currentMonthEnd);
            }

            this.highlightActivities(flatList);
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
            this.currentDate = Date.parse(options.currentDate) || Date.today();
            this.refreshRequired = true;
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
        }
    });
})();