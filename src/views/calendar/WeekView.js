/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Calendar");

(function() {
    var L = Sage.Platform.Mobile.List;

    Mobile.SalesLogix.Calendar.WeekView = Ext.extend(Sage.Platform.Mobile.List, {
        //Localization
		weekTitleFormatText: 'MMM d, yyyy',
		dayHeaderFormatText: 'ddd | MMM d, yyyy',
        todayText: 'Today',
        dayText: 'Day',
		weekText: 'Week',
        monthText: 'Month',		
		
		// Templates
		dayHeaderTemplate: new Simplate([
			'<h2 data-action="activateDayHeader" data-date="{%= $.currentDate %}">'+
			'{%= $.currentDateHeader %}',
			'</h2>'
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
			'<td class="activityDesc">{%: $.Activity.Description %}</td>'+
			'</tr></table>'
		]),
        viewTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
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
		
        //View Properties
        attachmentPoints: Ext.apply({}, {
			contentEl: '.list-content',
            dateTextEl: '.date-text',
            splitButtonEl: '.split-buttons',
            todayButtonEl: '.button[data-tool="today"]',
            dayButtonEl: '.button[data-tool="day"]',
            weekButtonEl: '.button[data-tool="week"]',
            monthButtonEl: '.button[data-tool="month"]'
        }, L.prototype.attachmentPoints),
		
		titleText: 'Weekly Activities',
        id: 'calendar_weeklist',
        detailView: 'activity_detail',
        monthView: 'slx_calendar',
		activityListView: 'useractivity_list',
		userWeekStartDay: 0, // 0-6, Sun-Sat
		userWeekEndDay: 6,
		currentDate: null,
        hideSearch: true,
		weekStartDate: null,
		weekEndDate: null,
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
		pageSize: 100,
        resourceKind: 'useractivities',
		
        initEvents: function() {
            this.el.on('load', this._onLoad, this, {single: true});
            this.el.on('click', this._initiateActionFromClick,  this, {delegate: '[data-action]'});
			
            //this.el.on('swipe', this.onSwipe, this);
			this.el.dom.addEventListener('swipe',this.onSwipe,false);
        },
		
		onSwipe: function(swipe){
			var view = App.getView('calendar_weeklist');
			switch(swipe.direction){
				case 'right': 
					view.getNextWeekActivities();
					swipe.preventDefault(); // todo: is this needed?
					break;
				case 'left': 
					view.getPrevWeekActivities();
					swipe.preventDefault(); // todo: is this needed?
					break;
			}
		},
		activateDayHeader: function(params){
			this.currentDate = Date.parse(params.date);
			this.navigateToUserActivityList();
		},
		getThisWeekActivities: function(){
			this.weekStartDate = this.getStartDay(new Date());
			this.weekEndDate = this.getEndDay(new Date());
			this.setWeekQuery(this.weekStartDate);
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
            this.requestData();
		},
        init: function() {
			this.setWeekQuery(new Date());
			
            Sage.Platform.Mobile.List.superclass.init.call(this);

            if (!this.selectionModel)
                this.useSelectionModel(new Sage.Platform.Mobile.ConfigurableSelectionModel());

            this.tools.tbar = [{
                id: 'new',
                action: 'navigateToInsertView'
            }];

            this.clear();
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
		setActiveButton: function(element){
			var activeClass = 'lightGreenButton';
			
			this.dayButtonEl.removeClass(activeClass);
			this.weekButtonEl.removeClass(activeClass);
			this.monthButtonEl.removeClass(activeClass);
		
			element.addClass(activeClass);
		},
		
        processFeed: function(feed) {
            /// <summary>
            ///     Processes the feed result from the SData request and renders out the resource feed entries.
            /// </summary>
            /// <param name="feed" type="Object">The feed object.</param>
			var startDate = this.currentDate || new Date();
			this.weekStartDate = this.getStartDay(startDate);
			this.weekEndDate = this.getEndDay(startDate);
			 
			this.clear();
			this.setActiveButton(this.weekButtonEl);
			 
			
			this.dateTextEl.update(this.weekStartDate.toString(this.weekTitleFormatText)+'-'+
				this.weekEndDate.toString(this.weekTitleFormatText)
			);
			
			
            if (!this.feed) this.contentEl.update('');

            this.feed = feed;

            if (this.feed['$totalResults'] === 0)
            {
                Ext.DomHelper.append(this.contentEl, this.noDataTemplate.apply(this));
            }
            else if (feed['$resources'])
            {
                var o = [];
				var currentDate = this.weekStartDate.clone().add(-1).days().clearTime();
				
                for (var i = 0; i < feed['$resources'].length; i++)
                {
                    var entry = feed['$resources'][i];

                    entry['$descriptor'] = entry['$descriptor'] || feed['$descriptor'];

                    this.entries[entry.$key] = entry;

					var entryDate =  Sage.Platform.Mobile.Convert.toDateFromString(entry.Activity.StartDate).clearTime();
					
					if(entryDate>currentDate){
						if(o.length>1){
							o.push('</ul>');
						}
						
						o.push(this.dayHeaderTemplate.apply({
							currentDateHeader: entryDate.toString(this.dayHeaderFormatText),
							currentDate: entryDate.toString('yyyy-MM-ddT00:00:05')
							},this));
						o.push('<ul class="action-list">');
						currentDate = entryDate;
					}
                    o.push(this.itemTemplate.apply(entry, this));
                }
				

                if (o.length > 0)
                    Ext.DomHelper.append(this.contentEl, o.join(''));
            }

            // todo: add more robust handling when $totalResults does not exist, i.e., hide element completely
            if (this.remainingEl && typeof this.feed['$totalResults'] !== 'undefined')
                this.remainingEl.update(String.format(
                    this.remainingText,
                    this.feed['$totalResults'] - (this.feed['$startIndex'] + this.feed['$itemsPerPage'] - 1)
                ));

            if (this.hasMoreData())
                this.el.addClass('list-has-more');
            else
                this.el.removeClass('list-has-more');
				
        },
        navigateToUserActivityList: function() {
            var view = App.getView(this.activityListView);
			view.currentDate = this.currentDate||new Date();
			view.getActivities();
			view.show();
            //ReUI.back();
        },		
        navigateToMonthView: function() {
			var view = App.getView(this.activityListView);
			view.currentDate = this.currentDate|| new Date();
		
            view = App.getView(this.monthView);
            if (view)
                view.show({
                    
                }, {
                    // disableFx: true // todo: requires a ReUI fix
                });
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