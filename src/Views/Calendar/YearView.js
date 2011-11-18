define('Mobile/SalesLogix/Views/Calendar/YearView', ['Sage/Platform/Mobile/List', 'Sage/Platform/Mobile/Convert'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Calendar.YearView', [Sage.Platform.Mobile.List], {
        // Localization
        titleText: 'Calendar',
        todayText: 'Today',
        dayText: 'Day',
        weekText: 'Week',
        monthText: 'Month',
        yearText: 'Year',
        yearTitleFormatText: 'yyyy',

        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
                '<div data-dojo-attach-point="searchNode"></div>',
                '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
                '{%! $.navigationTemplate %}',
                '{%! $.navBarTemplate %}',
                '<div style="clear:both"></div>',
                '<div class="year-content" data-dojo-attach-point="yearContentNode"></div>',
                '<div style="clear:both"></div>',
            '</div>'
        ]),
        navigationTemplate: new Simplate([
            '<div class="split-buttons">',
                '<button data-tool="today" data-action="getTodayMonthActivities" class="button">{%: $.todayText %}</button>',
                '<button data-tool="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>',
                '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>',
                '<button data-tool="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>',
                '<button data-tool="year" class="button">{%: $.yearText %}</button>',
            '</div>'
        ]),
        navBarTemplate: new Simplate([
            '<div class="nav-bar">',
                '<button data-tool="next" data-action="goToNextYear" class="button button-next"><span></span></button>',
                '<button data-tool="prev" data-action="goToPreviousYear" class="button button-prev"><span></span></button>',
                '<h3 class="date-text" data-dojo-attach-point="dateNode"></h3>',
            '</div>'
        ]),
        calendarStartTemplate: '<div class="year-table"><table class="calendar-table">',
        calendarWeekHeaderStartTemplate: '<tr class="calendar-week-title"><td colspan="7"><h2>${0}</h2></td></tr><tr class="calendar-week-header">',
        calendarWeekHeaderTemplate: '<td class="calendar-weekday">${0}</td>',
        calendarWeekHeaderEndTemplate: '</tr>',
        calendarWeekStartTemplate: '<tr class="calendar-week">',
        calendarEmptyDayTemplate: '<td class="calendar-day day-empty">&nbsp;</td>',
        calendarDayTemplate: '<td class="calendar-day ${1}" data-action="selectDay" data-date="${2}">${0}</td>',
        calendarWeekEndTemplate: '</tr>',
        calendarEndTemplate: '</table></div>',
        calendarActivityCountTemplate: new Simplate([
            '<div><span class="activity-count" title="${0} events">${0}</span></div>'
        ]),
        attributeMap: {
            dateContent: {
                node: 'dateNode',
                type: 'innerHTML'
            },
            yearContent: {
                node: 'yearContentNode',
                type: 'innerHTML'
            }
        },

        //View Properties
        id: 'calendar_yearlist',
        cls: 'activities-for-year',
        activityListView: 'calendar_daylist',
        activityMonthView: 'calendar_monthlist',
        activityWeekView: 'calendar_weeklist',
        insertView: 'activity_types_list',
        activityDetailView: 'activity_detail',
        eventDetailView: 'event_detail',
        enableSearch: false,
        expose: false,
        dateCounts: {},
        currentDate: Date.today(),
        selectedDateNode: null,

        pageSize: 500,
        queryWhere: null,
        queryOrderBy: 'Activity.StartDate asc',
        querySelect: [
            'Activity/StartDate',
            'Activity/Timeless'
        ],
        eventQuerySelect: [
            'StartDate',
            'EndDate'
        ],
        resourceKind: 'useractivities',

        _onRefresh: function(o) {
           this.inherited(arguments);
           if (o.resourceKind === 'activities' || o.resourceKind === 'events'){
                this.refreshRequired = true;
           }
        },
        render: function() {
            this.inherited(arguments);
            this.renderCalendars();
        },
        selectDay: function(params, evt, node) {
            if (this.selectedDateNode) dojo.removeClass(this.selectedDateNode, 'selected');
            this.selectedDateNode = node;
            dojo.addClass(node, 'selected');
            this.currentDate = Date.parseExact(params.date, 'yyyy-MM-dd');
        },
        getFirstDayOfCurrentMonth: function(monthDate){
            return monthDate.clone().moveToFirstDayOfMonth().clearTime();
        },
        getLastDayOfCurrentMonth: function(monthDate){
            return new Date(monthDate.getFullYear(),
                monthDate.getMonth(),
                monthDate.getDaysInMonth(),
                23, 59, 59);
        },
        goToNextYear: function() {
             this.currentDate.add({year: 1});
             this.refresh();
        },
        goToPreviousYear: function() {
            this.currentDate.add({year: -1});
            this.refresh();
        },
        refresh: function(){
            this.renderCalendars();
            this.requestYearData();
            this.highlightCurrentDate();
        },
        requestYearData: function(){
            var year = this.currentDate.toString('yyyy');
            for(var i = 1; i <= 12; i++){
                var monthDate = Date.parseExact(year+'-'+i+'-'+1, 'yyyy-M-d');
                this.requestActivityData(monthDate);
                this.requestEventData(monthDate);
            }
        },
        requestActivityData: function(monthDate) {
            var request = this.createActivityRequest(monthDate);
            request.read({
                success: this.onRequestDataSuccess,
                failure: this.onRequestDataFailure,
                aborted: this.onRequestDataAborted,
                scope: this
            });
        },
        requestEventData: function(monthDate) {
            var request = this.createEventRequest(monthDate);
            request.read({
                success: this.onRequestEventDataSuccess,
                failure: this.onRequestEventDataFailure,
                aborted: this.onRequestEventDataAborted,
                scope: this
            });
        },
        createActivityRequest: function(monthDate){
            var querySelect = this.querySelect,
                queryWhere = this.getActivityQuery(monthDate),
                request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
                .setCount(this.pageSize)
                .setStartIndex(1)
                .setResourceKind(this.resourceKind)
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(','))
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);

            return request;
        },
        createEventRequest: function(monthDate){
            var querySelect = this.eventQuerySelect,
                queryWhere = this.getEventQuery(monthDate),
                request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
                .setCount(this.pageSize)
                .setStartIndex(1)
                .setResourceKind('events')
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(','))
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);

            return request;
        },
        onRequestEventDataFailure: function(response, o) {
            alert(dojo.string.substitute(this.requestErrorText, [response, o]));
        },
        onRequestEventDataAborted: function(response, o) {
            this.options = false; // force a refresh
        },
        onRequestEventDataSuccess: function(feed) {
            this.processEventFeed(feed);
        },
        getActivityQuery: function(monthDate){
            var startDate = this.getFirstDayOfCurrentMonth(monthDate),
                endDate = this.getLastDayOfCurrentMonth(monthDate);
            return dojo.string.substitute(
                    [
                        'UserId eq "${0}" and (',
                        '(Activity.Timeless eq false and Activity.StartDate',
                        ' between @${1}@ and @${2}@) or ',
                        '(Activity.Timeless eq true and Activity.StartDate',
                        ' between @${3}@ and @${4}@))'
                    ].join(''),
                    [App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(startDate),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(endDate),
                    startDate.toString('yyyy-MM-ddT00:00:00Z'),
                    endDate.toString('yyyy-MM-ddT23:59:59Z')]
                );
        },
        getEventQuery: function(monthDate){
            var startDate = this.getFirstDayOfCurrentMonth(monthDate),
                endDate = this.getLastDayOfCurrentMonth(monthDate);
            return dojo.string.substitute(
                    [
                        'UserId eq "${0}" and (',
                            '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
                            'StartDate lt @${2}@',
                        ')'
                    ].join(''),
                    [App.context['user'] && App.context['user']['$key'],
                    startDate.toString('yyyy-MM-ddT00:00:00Z'),
                    endDate.toString('yyyy-MM-ddT23:59:59Z')]
                );
        },
        processFeed: function(feed) {
            var r = feed['$resources'],
                row,
                feedLength = r.length,
                startDay,
                dateIndex,
                dateCounts = {};

            for(var i = 0; i < feedLength; i ++){
                row = r[i];
                startDay = Sage.Platform.Mobile.Convert.toDateFromString(row.Activity.StartDate);
                dateIndex = (r[i].Activity.Timeless)
                    ? this.dateToUTC(startDay)
                    : startDay;
                dateIndex = dateIndex.toString('yyyy-MM-dd');
                dateCounts[dateIndex] = (dateCounts[dateIndex])
                    ? dateCounts[dateIndex] + 1
                    : 1;
            }
            this.highlightActivities(dateCounts);
        },
        processEventFeed: function(feed) {
            var r = feed['$resources'],
                feedLength = r.length,
                row,
                startDay,
                endDay,
                dateIndex,
                dateCounts = {};

            for(var i = 0; i < feedLength; i++){
                row = r[i];
                startDay = Sage.Platform.Mobile.Convert.toDateFromString(row.StartDate);
                endDay = Sage.Platform.Mobile.Convert.toDateFromString(row.EndDate);
                while(startDay.getDate() <= endDay.getDate()){
                    dateIndex = startDay.toString('yyyy-MM-dd');
                    dateCounts[dateIndex] = (dateCounts[dateIndex])
                        ? dateCounts[dateIndex] + 1
                        : 1;
                    startDay.add({day:1});
                }
            }
            this.highlightActivities(dateCounts);
        },

        highlightActivities: function(dateCounts){
            var template = this.calendarActivityCountTemplate.apply(this),
                node,
                countNode,
                countNodeValue;
            for(var dateCount in dateCounts){
                node = dojo.query('td[data-date="'+dateCount+'"]', this.yearContentNode);
                dojo.addClass(node[0], "activeDay");
                if(dojo.query(node[0]).children('div').length > 0){
                    countNode = dojo.query('span', node[0])[0];
                    countNodeValue = parseFloat(countNode.innerHTML, 10);
                    countNode.innerHTML = countNodeValue+dateCounts[dateCount];
                } else {
                    dojo.place(dojo.string.substitute(
                        template,
                        [dateCounts[dateCount]]
                    ), node[0], 'first');
                }
            }
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
        setDateTitle: function(){
            this.set('dateContent', this.currentDate.toString(this.yearTitleFormatText));
        },
        renderCalendars: function(){
            var o = [],
                year = this.currentDate.toString('yyyy');
            for(var i = 1; i <= 12; i ++){
                o.push(this.renderCalendar(year+'-'+i+'-'+1));
            }
            this.set('yearContent', o.join(''));
            this.setDateTitle();
        },
        renderCalendar: function(dateString) {
            var calHTML = [],
                startDate = Date.parseExact(dateString, 'yyyy-M-d'),
                startingDay = startDate.getDay(),
                day = 1,
                dayDate = startDate.clone(),
                today = Date.today().clearTime(),
                monthLength = startDate.getDaysInMonth(),
                weekEnds = [0,6];

            calHTML.push(this.calendarStartTemplate);
            calHTML.push(dojo.string.substitute(this.calendarWeekHeaderStartTemplate, [startDate.toString('MMMM')]));

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
                        var dayClass = (dayDate.equals(today)) ? 'today' : '';
                        var weekendClass = (weekEnds.indexOf(j) !== -1) ? ' weekend' : '';
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

            return calHTML.join('');
        },
        show: function(options) {
            this.inherited(arguments);

            if(options) {
                this.processShowOptions(options);
            } else {
                this.renderCalendars();
            }
        },
        processShowOptions: function(options){
            if(options.currentDate){
                this.currentDate = Date.parseExact(options.currentDate,'yyyy-MM-dd').clearTime() || Date.today().clearTime();
                this.refreshRequired = true;
            }
        },
        highlightCurrentDate: function(){
            var dateQuery = dojo.string.substitute('td.calendar-day[data-date="${0}"]', [this.currentDate.toString('yyyy-MM-dd')]);
            this.selectDay({date:this.currentDate.toString('yyyy-MM-dd')}, null, dojo.query(dateQuery, this.yearContentNode)[0]);
        },
        navigateToMonthView: function() {
            var view = App.getView(this.activityMonthView),
                options = {currentDate: this.currentDate.toString('yyyy-MM-dd') || Date.today()};
            view.show(options);
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
});