/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Calendar");

(function() {    
    Mobile.SalesLogix.Calendar.MonthView = Ext.extend(Sage.Platform.Mobile.Calendar, {
        //Templates
        navigationTemplate: new Simplate([
            '<div class="split-buttons">',
                '<button data-tool="today" data-action="getTodayActivities" class="button">Today</button>',
                '<button data-tool="day" data-action="returnToDayActivities" class="button">Day</button>',
                '<button data-tool="month" class="button">Month</button>',
            '</div>'
        ]),
        calendarMonthHeaderTemplate: new Simplate([
            '<tr class="calendar-month-header">',
                '<th class="calendar-prev-month"><button class="button" data-action="goToPreviousMonth"><span></span></button></th>',
                '<th class="calendar-month-name" colspan="5">{%= $.monthName %} &nbsp; {%=$.year %} <span id="calendar-activities-loading"></span></span></th>',
                '<th class="calendar-next-month"><button class="button" data-action="goToNextMonth"><span></span></button></th>',
            '</tr>'
        ]),

        //View Properties
        id: 'slx_calendar',
        cls: 'activities-for-month',
        activityListView: 'useractivity_list',

        render: function() {
            Mobile.SalesLogix.Calendar.MonthView.superclass.render.apply(this, arguments);

            Ext.DomHelper.insertFirst(
                this.contentEl,
                this.navigationTemplate.apply(this),
                true
            );
        },
        showActivityListForDay: function(date) {
            var view = App.getView(this.activityListView);
            if (date) 
            {
                view.currentDate = date;
                view.getActivities();
            }
            ReUI.back();
        },
        selectDay: function() {
            Mobile.SalesLogix.Calendar.MonthView.superclass.selectDay.apply(this, arguments);

            this.showActivityListForDay(this.date);
        },
        getTodayActivities: function() {
            this.showActivityListForDay(Date.today());
        },
        returnToDayActivities: function() {
            this.showActivityListForDay();
        },
        requestActivities: function(where) {
            // get activities feed for current month
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService())
                .setResourceKind('useractivities')
                .setContractName('dynamic');
            var uri = request.getUri();
            uri.setQueryArg('count','31');
            uri.setQueryArg('startIndex','1');
            uri.setQueryArg('select','Activity/StartDate,Activity/EndDate,Activity/Timeless');
            uri.setQueryArg('orderby','Activity.StartDate asc');
            uri.setQueryArg('where',where);
            request.allowCacheUse = true;
            return request;
        },
        activityCache: {},
        requestActivityList: function(startd, endd) {
            // call data request
            // unable to search with EndDate criteria 'EndDate gt "{1}" and StartDate lt "{2}"'
            var request = this.requestActivities(
                String.format(
                    [
                        'UserId eq "{0}" and (',
                        '(Activity.Timeless eq false and Activity.StartDate between @{1}@ and @{2}@) or ',
                        '(Activity.Timeless eq true and Activity.StartDate between @{3}@ and @{4}@))'
                    ].join(''),
                    App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(startd),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(endd),
                    startd.toString('yyyy-MM-ddT00:00:00Z'),
                    endd.toString('yyyy-MM-ddT23:59:59Z')
                )
            );
            request.read({
                success: function(data) { this.processActivityList(data); },
                failure: this.requestActivityFailure,
                scope: this
            });
        },
        requestActivityFailure: function(er) {
            // TODO: handle showing this to user. Or not.
            console.log("ERROR: "); console.log( er );
        },
        processActivityList: function(sources) {
            var flatList = [], dt;
            var currentMonthStart = new Date(this.year, this.month, 1, 0, 0, 0);
            var currentMonthEnd   = new Date(this.year, this.month, this.daysInMonth[this.month], 23, 59, 59);
            var r = sources['$resources'];
            // make a list of days and their event counts
            for(var i=0, l=r.length; i<l; i++){
                var sday = Sage.Platform.Mobile.Convert.toDateFromString(r[i].Activity.StartDate);
                var eday = Sage.Platform.Mobile.Convert.toDateFromString(r[i].Activity.EndDate);
                do { // track No. of activities for each calendar day
                    dt = sday < currentMonthStart ? 1 : (r[i].Activity.Timeless ? sday.getUTCDate() : sday.getDate());
                    flatList[ dt ] = flatList[ dt ] ? 1 + flatList[ dt ] : 1;
                    sday.add({day: 1});
                } while (sday < eday && sday < currentMonthEnd);
            }
            this.activityCache[this.monthName] = flatList;
            this.highlightActivities(flatList);
        },
        highlightActivities: function(flatList){
            Ext.select('.calendar-day').each( function(el) {
                if (flatList[el.dom.textContent]) {
                    el.addClass("activeDay");
                    el.dom.title = flatList[el.dom.textContent]
                        + ' event'
                        + (1 < flatList[el.dom.textContent] ? 's' : '');
                }
            });
            Ext.get('calendar-activities-loading').dom.textContent = '';
        },
        renderCalendar: function() {
            var mm = this.month,
                yyyy = this.year,
                firstDay = new Date(yyyy, mm, 1),
                startingDay = firstDay.getDay(),
                monthLength = this.daysInMonth[mm],
                today = new Date(),
                day = 1, calHTML = [], dayClass = '', selectedClass = '',
                weekendClass = '', activityClass = '', i = 0, j = 0, selectedEl = false,
                isCurrentMonth =  this.year === Date.today().getFullYear() && this.month === Date.today().getMonth();

            this.monthName = Date.CultureInfo.monthNames[mm];

            // compensate for leap year
            if (this.month == 1 && Date.isLeapYear(yyyy)) // February only!
            {
                monthLength = 29;
            }
            calHTML.push(this.calendarStartTemplate);
            // Month Header
            calHTML.push(this.calendarMonthHeaderTemplate.apply(this));

            // Week Header
            calHTML.push(this.calendarWeekHeaderStartTemplate);
            for(i = 0; i <= 6; i++ ){
                calHTML.push(String.format(this.calendarWeekHeaderTemplate, Date.CultureInfo.abbreviatedDayNames[i]  ));
            }
            calHTML.push(this.calendarWeekHeaderEndTemplate);

            //Weeks
            for (i = 0; i <= 6; i++)
            {
                calHTML.push(this.calendarWeekStartTemplate);
                //Days
                for (j = 0; j <= 6; j++)
                {
                    if (day <= monthLength && (i > 0 || j >= startingDay))
                    {
                        //Check for today
                        dayClass = (isCurrentMonth == true && day == today.getDate()) ? 'today' : '';

                        //Check for weekends
                        weekendClass = (this.weekEnds.indexOf(j) !== -1) ? ' weekend' : '';

                        //Check for selected date
                        if (day == this.date.getDate() && mm == this.date.getMonth() && yyyy == this.date.getFullYear())
                        {
                            selectedClass = ' selected';
                        }
                        else
                        {
                            selectedClass = '';
                        }
                        weekendClass = (this.weekEnds.indexOf(j) !== -1) ? ' weekend' : '';

                        calHTML.push(String.format( this.calendarDayTemplate,
                                                    day,
                                                    (dayClass + weekendClass + activityClass + selectedClass),
                                                    day
                                                   )
                                    );
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
            this.calendarEl.update(calHTML.join(''));

            // --- begin getting list of activities for current month
            var lastDay = new Date(yyyy, mm, monthLength);
            var dateFormatString = 'yyyy-MM-ddThh:mm:ss';
            Ext.get('calendar-activities-loading').dom.textContent = 'Loading…';
            if(this.activityCache[this.monthName]!==undefined){
                // load from cache
                this.highlightActivities(this.activityCache[this.monthName]);
            } else {
                // make data request
                this.requestActivityList(firstDay,lastDay);
            }
            // --- end highlight activities feature

            selectedEl = Ext.DomQuery.select('.selected', 'table.calendar-table', 'td');
            if (Ext.isArray(selectedEl) && selectedEl.length > 0) this.selectedDateEl = Ext.get(selectedEl[0]);
            else this.selectedDateEl = false;
        },

        show: function(options, transitionOptions) {
            var view = App.getView(this.activityListView),
                selectedDate = view && String.format('.calendar-day[data-date={0}]', view.currentDate.toString('d'));

            Sage.Platform.Mobile.Calendar.superclass.show.call(this, options, transitionOptions);

            this.showTimePicker = this.options && this.options.showTimePicker;

            this.date = view.currentDate || new Date();
            this.year = this.date.getFullYear();
            this.month = this.date.getMonth();

            this.hourField.dom.value = this.date.getHours();
            this.minuteField.dom.value = this.date.getMinutes();
            
            this.renderCalendar();

            if (this.month === view.currentDate.getMonth() && this.year === view.currentDate.getFullYear())
            {
                if (this.selectedDateEl) this.selectedDateEl.removeClass('selected');
                this.selectedDateEl = this.el.child(selectedDate);
                this.selectedDateEl.addClass('selected');
            }

            if (this.showTimePicker)
                this.timeEl.show();
            else
                this.timeEl.hide();
        }
    });
})();