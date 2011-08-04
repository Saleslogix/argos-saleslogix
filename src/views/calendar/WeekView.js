/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Calendar");

(function() {
    Mobile.SalesLogix.Calendar.WeekView = Ext.extend(Sage.Platform.Mobile.GroupedList, {
        //Localization
		weekTitleFormatText: 'MMM d, yyyy',
		dayHeaderLeftFormatText: 'ddd',
		dayHeaderRightFormatText: 'MMM d, yyyy',
        todayText: 'Today',
        dayText: 'Day',
		weekText: 'Week',
        monthText: 'Month',		
		
		// Templates
        viewTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="{%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '{%! $.searchTemplate %}',
            '{%! $.navigationTemplate %}',
            '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',                
            '<div class="list-content panel-content"></div>',
            '{%! $.moreTemplate %}',
            '</div>'
        ]),
        navigationTemplate: new Simplate([
            '<div class="split-buttons">',
            '<button data-tool="today" data-action="getThisWeekActivities" class="button">{%: $.todayText %}</button>',
            '<button data-tool="day" data-action="navigateToUserActivityList" class="button">{%: $.dayText %}</button>',
            '<button data-tool="week" data-action="getWeekActivities" class="button">{%: $.weekText %}</button>',
            '<button data-tool="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>',
            '</div>',
            '<div class="nav-bar">',
            '<h3 class="date-text"></h3>',
            '<button data-tool="next" data-action="getNextWeekActivities" class="button button-next"><span></span></button>',
            '<button data-tool="prev" data-action="getPrevWeekActivities" class="button button-prev"><span></span></button>',
            '</div>'
        ]),		
        groupTemplate: new Simplate([
            '<h2 data-action="toggleGroup" class="{%= $.headerClass %}" data-date="{%= $.currentDate %}">',
			'<span class="dayHeaderLeft">{%= $.currentDateLeftHeader %}</span>',
			'<span class="dayHeaderRight">{%= $.currentDateRightHeader %}</span>',
            '</h2>',
            '<ul data-group="{%= $.tag %}" class="list-content {%= $.cls %}"></ul>'
        ]),		
        itemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
		contentTemplate: new Simplate([
			'<table><tr class="activityRow">'+
			'<td class="activityType"><img src="{%= $$.getTypeIcon($.Activity.Type) %}"></td>'+
			'<td class="activityTime">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "h:mm") %} <span class="activityAMPM">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "tt") %}</span></td>'+
			'<td class="activityDesc">{%! $$.descriptionTemplate %}</td>'+
			'</tr></table>'
		]),
		descriptionTemplate: new Simplate([
            '<h3>',
            '{%: $.Activity.Description %}',
            '</h3>',
            '<h4>{%= $$.nameTemplate.apply($) %}</h4>'
		]),
        nameTemplate: new Simplate([
            '{% if ($.Activity.ContactName) { %}',
            '{%: $.Activity.ContactName %} / {%: $.Activity.AccountName %}',
            '{% } else if ($.Activity.AccountName) { %}',
            '{%: $.Activity.AccountName %}',
            '{% } else { %}',
            '{%: $.Activity.LeadName %}',
            '{% } %}'
        ]),		
		dayHeaderTemplate: new Simplate([
			'<h2 class="{%= $.headerClass %}" data-action="activateDayHeader" data-date="{%= $.currentDate %}">'+
			'<span class="dayHeaderLeft">{%= $.currentDateLeftHeader %}</span>',
			'<span class="dayHeaderRight">{%= $.currentDateRightHeader %}</span>',
			'</h2>'
		]),
		
        //View Properties
        attachmentPoints: Ext.apply({}, {
			contentEl: '.list-content',
            dateTextEl: '.date-text'
        }, Sage.Platform.Mobile.List.prototype.attachmentPoints),
		titleText: 'Week Activities',
        id: 'calendar_weeklist',
        cls: 'list activities-for-week',
        detailView: 'activity_detail',
        monthView: 'slx_calendar',
		activityListView: 'useractivity_list',
        insertView: 'activity_types_list',
		userWeekStartDay: 0, // 0-6, Sun-Sat
		userWeekEndDay: 6,
		currentDate: null,
        hideSearch: true,
		weekStartDate: null,
		weekEndDate: null,
		todayDate: null,
		activeDateClass: 'currentDate',
		typeIcons: {
			'atAppointment': 'content/images/icons/Meeting_24x24.png',
			'atPhoneCall': 'content/images/icons/Call_24x24.png', 
			'atToDo': 'content/images/icons/To_Do_24x24.png', 
			'atPersonal': 'content/images/icons/Personal_24x24.png', 
			'atLiterature': 'content/images/icons/Personal_24x24.png'
		},

		queryWhere: null,
        queryOrderBy: 'Activity.Timeless desc, Activity.StartDate',
        querySelect: [
            'Activity/Description',
            'Activity/StartDate',
            'Activity/Type',
            'Activity/AccountName',
            'Activity/ContactName',
            'Activity/LeadId',
            'Activity/LeadName',
            'Activity/UserId',
            'Activity/Timeless'
        ],
		pageSize: 105, // gives 15 activities per day
        resourceKind: 'useractivities',
		
        init: function() {
            Mobile.SalesLogix.Calendar.WeekView.superclass.init.apply(this, arguments);
			this.todayDate = new Date().clearTime();
			this.setWeekQuery(this.todayDate);
            this.clear();
        },
        initEvents: function() {
            Mobile.SalesLogix.Calendar.WeekView.superclass.initEvents.apply(this, arguments);
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
			this.getNextWeekActivities();
		},
		onSwipeLeft: function(){
			this.getPrevWeekActivities();
		},
		onScroll: function(evt){
			var dayHeaders = this.el.select('.dayHeader').elements,
				i,
				len = dayHeaders.length,
				currentHeader;
			for(i=0; i<len; i+=1){
				currentHeader = dayHeaders[i];
				if (currentHeader.getClientRects()[0].top > 0){
					this.currentDate = Date.parse(currentHeader.getAttribute('data-date'));
					return;
				}
			}
		},
		activateDayHeader: function(params){
			this.currentDate = Date.parse(params.date);
			this.navigateToUserActivityList();
		},
		getThisWeekActivities: function(){
			this.setWeekQuery(new Date());
			this.getActivities();
		},
		getStartDay: function(date){
			return (date.getDay()===this.userWeekStartDay)
					? date.clone()
					: date.clone().moveToDayOfWeek(this.userWeekStartDay, -1);
		},
		getEndDay: function(date){
			return (date.getDay()===this.userWeekEndDay)
					? date.clone()
					: date.clone().moveToDayOfWeek(this.userWeekEndDay, 1);
		},
		getNextWeekActivities: function(){
			this.weekStartDate = this.weekEndDate.clone().add(1).days();
			this.weekEndDate = this.getEndDay(this.weekStartDate);
			this.setWeekQuery(this.weekStartDate);
			this.getActivities();
		},
		getPrevWeekActivities: function(){
			this.weekEndDate = this.weekStartDate.clone().add(-1).days();
			this.weekStartDate = this.getStartDay(this.weekEndDate);
			this.setWeekQuery(this.weekStartDate);
			this.getActivities();
		},
		getActivities: function(){
            this.clear();
			this.setWeekText();
			this.requestData();
		},
		setWeekQuery: function(date){
			this.currentDate = date.clone();
			var weekQuery = 'Activity.StartDate gt '+
				this.getStartDay(date).toString('@yyyy-MM-ddT00:00:00@')+
				' and Activity.StartDate lt '+
				this.getEndDay(date).toString('@yyyy-MM-ddT23:59:59@');
				
			this.queryWhere =  weekQuery;
		},
		getTypeIcon: function(type){
			return this.typeIcons[type] || type;
		},
		setWeekText: function(){
			var start = this.getStartDay(this.currentDate),
				end = this.getEndDay(this.currentDate);
			this.dateTextEl.update(start.toString(this.weekTitleFormatText)+'-'+
				end.toString(this.weekTitleFormatText)
			);
		},
        toggleGroup: function(params) {
			this.currentDate = Date.parse(params.date);
			this.navigateToUserActivityList();
        },		
        getGroupForEntry: function(entry) {
			var entryDate = Sage.Platform.Mobile.Convert.toDateFromString(entry.Activity.StartDate).clearTime(),
				compareFormat = 'yyyy-MM-dd',
				activeClass = (entryDate.toString(compareFormat)===this.todayDate.toString(compareFormat)) 
					? 'dayHeader '+this.activeDateClass 
					: 'dayHeader';
					
            return {
                tag: entryDate.toString(compareFormat),
				currentDateLeftHeader: entryDate.toString(this.dayHeaderLeftFormatText),
				currentDateRightHeader: entryDate.toString(this.dayHeaderRightFormatText),
				headerClass: activeClass,
				currentDate: entryDate.toString('yyyy-MM-ddT00:00:05')
            };
        },
        show: function(options) {            
            Sage.Platform.Mobile.List.superclass.show.apply(this, arguments);
			var startDate = this.currentDate || new Date();
			this.todayDate = new Date().clearTime();
			this.weekStartDate = this.getStartDay(startDate);
			this.weekEndDate = this.getEndDay(startDate);
			this.setWeekText();
        },
        navigateToUserActivityList: function() {
            var view = App.getView(this.activityListView);
			view.currentDate = this.currentDate || new Date();
			view.getActivities();
			view.show({returnTo: this.id});
        },		
        navigateToMonthView: function() {
			var view = App.getView(this.activityListView);
			view.currentDate = this.currentDate || new Date();
            view = App.getView(this.monthView);
            if (view) {
                view.show({returnTo: this.id}, {
                    // disableFx: true // todo: requires a ReUI fix
                });
			}
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