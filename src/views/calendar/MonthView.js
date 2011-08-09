/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Calendar");

(function() {    
    Mobile.SalesLogix.Calendar.MonthView = Ext.extend(Sage.Platform.Mobile.Calendar, {
		// Localization
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