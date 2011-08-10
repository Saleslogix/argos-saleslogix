/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Calendar");

(function() {    
    Mobile.SalesLogix.Calendar.MonthView = Ext.extend(Sage.Platform.Mobile.Calendar, {
		// Localization
        titleText: 'Calendar',
        todayText: 'Today',
        dayText: 'Day',
		weekText: 'Week',
        monthText: 'Month',		
	
        //Templates
        navigationTemplate: new Simplate([
            '<div class="split-buttons">',
                '<button data-tool="today" data-action="getTodayActivities" class="button">{%: $.todayText %}</button>',
                '<button data-tool="day" data-action="returnToDayActivities" class="button">{%: $.dayText %}</button>',
                '<button data-tool="week" data-action="returnToWeekActivities" class="button">{%: $.weekText %}</button>',
                '<button data-tool="month" class="button">{%: $.monthText %}</button>',
            '</div>'
        ]),
        calendarMonthHeaderTemplate: new Simplate([
            '<tr class="calendar-month-header">',
                '<th class="calendar-prev-month"><button class="button" data-action="goToPreviousMonth"><span></span></button></th>',
                '<th class="calendar-month-name" colspan="5">{%= $.monthName %} &nbsp; {%=$.year %} <span id="calendar-activities-loading"></span></span></th>',
                '<th class="calendar-next-month"><button class="button" data-action="goToNextMonth"><span></span></button></th>',
            '</tr>'
        ]),
        calendarActivityCountTemplate: new Simplate([
            '<span class="activity-count" title="{0} events">{1}</span>'
        ]),

        //View Properties
        id: 'slx_calendar',
        cls: 'activities-for-month',
        activityListView: 'useractivity_list',
		activityWeekView: 'calendar_weeklist',

        initEvents: function() {
            Mobile.SalesLogix.Calendar.MonthView.superclass.initEvents.apply(this, arguments);
            this.el.on('swipe', this.onSwipe, this);
        },
		onSwipe: function(evt, el){
			switch(evt.browserEvent.direction){
				case 'right':
					this.onSwipeRight();
					evt.preventDefault(); // todo: is this needed?
					break;
				case 'left': 
					this.onSwipeLeft();
					evt.preventDefault(); // todo: is this needed?
					break;
			}
		},
		onSwipeRight: function(){
			this.goToNextMonth();
		},
		onSwipeLeft: function(){
			this.goToPreviousMonth();
		},

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
			view.show();
            //ReUI.back();
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
                success: function(data) {
                    this.onRequestActivityDataSuccess(data);
                },
                failure: function() {
                    // unable to retrieve activities
                    this.onRequestActivityFailure();
                },
                scope: this
            });
        },
        onRequestActivityDataSuccess: function(data) {
            this.activityCache[this.monthName] = this.processActivityList(data);
            this.highlightActivities(this.activityCache[this.monthName]);
        },
        onRequestActivityFailure: function(er) {
            console.log( er );
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
            return flatList;
        },
        highlightActivities: function(flatList){
            var template = this.calendarActivityCountTemplate.apply(this);
            Ext.select('.calendar-day').each( function(el) {
                if (flatList[el.dom.textContent]) {
                    el.addClass("activeDay");
                    el.dom.innerHTML = el.dom.innerText + String.format(
                        template,
                        flatList[el.dom.textContent],
                        flatList[el.dom.textContent]
                    );
                }
            });
            Ext.get('calendar-activities-loading').dom.textContent = '';
        },
        renderCalendar: function() {
            Mobile.SalesLogix.Calendar.MonthView.superclass.renderCalendar.apply(this, arguments);
            if(!this.activityCache[this.monthName]) {
                // if not already cached, pull activities for month
                this.activityCache[this.monthName] = this.requestActivityList(
                    new Date(this.year, this.month, 1),
                    new Date(this.year, this.month, this.daysInMonth[this.month])
                );
            } else {
                this.highlightActivities(this.activityCache[this.monthName]);
            }
        },
		returnToWeekActivities: function(){
			var currentDay = (this.month === Date.today().getMonth())
				? this.date
				: new Date(this.year, this.month, 1);
			this.showWeekActivitiesForDay(currentDay);
		},
		showWeekActivitiesForDay: function(date){
            var view = App.getView(this.activityWeekView);
            if (view){
				if(!date.clearTime().equals(view.currentDate.clearTime())){
					view.refresh(date);
				}
				view.currentDate = date.clone();
                view.show({});
			}
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