/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Calendar");

(function() {    
    Mobile.SalesLogix.Calendar.MonthView = Ext.extend(Sage.Platform.Mobile.Calendar, {
        //Templates
        viewTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%: $.titleText %}" class="panel">',
                '<div class="panel-content">',
                    '<div class="split-buttons">',
                        '<button data-tool="today" data-action="getTodayActivities" class="button">Today</button>',
                        '<button data-tool="day" data-action="returnToDayActivities" class="button">Day</button>',
                        '<button data-tool="month" class="button headerButton active">Month</button>',
                    '</div>',                
                    '<div class="calendar-content"></div>',
                    '<div class="time-content">',
                        '<input type="number" maxlength="2" min="0" max="23" class="hour-field" />',
                        '&nbsp;:&nbsp;',
                        '<input type="number" maxlength="2" min="0" max="59" class="minute-field" />',
                    '</div>',
                '</div>',
            '</div>'
        ]),

        //View Properties
        id: 'slx_calendar',
        
        showActivityListForDay: function(date) {
            var view = App.getView('useractivity_list');
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
        renderCalendar: function() {
            var view = App.getView('useractivity_list'),
                selectedDate = String.format('.calendar-day[data-date={0}]', view.currentDate.toString('d'));

            this.date = view.currentDate;
            this.month = view.currentDate.getMonth();
            this.year = view.currentDate.getFullYear();

            Mobile.SalesLogix.Calendar.MonthView.superclass.renderCalendar.apply(this, arguments);
            
            if (this.selectedDateEl) this.selectedDateEl.removeClass('selected');
            this.selectedDateEl = this.el.child(selectedDate);
            this.selectedDateEl.addClass('selected');
        }
    });
})();