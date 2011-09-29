/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Calendar/WeekView', ['Sage/Platform/Mobile/List', 'Sage/Platform/Mobile/Convert'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Calendar.WeekView', [Sage.Platform.Mobile.List], {
        //Localization
        titleText: 'Calendar',
        weekTitleFormatText: 'MMM d, yyyy',
        dayHeaderLeftFormatText: 'ddd',
        dayHeaderRightFormatText: 'MMM d, yyyy',
        startTimeFormatText: 'h:mm',
        todayText: 'Today',
        dayText: 'Day',
        weekText: 'Week',
        monthText: 'Month',
        allDayText: 'All Day',
        eventHeaderText: 'Events',
        moreEventText: 'View all',
        eventDateFormatText: 'M/d',

        // Templates
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="{%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '{%! $.searchTemplate %}',
            '{%! $.navigationTemplate %}',
            '<div style="clear:both"></div>',
            '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
            '<div class="list-content panel-content" data-dojo-attach-point="eventContentNode"></div>',
            '<div class="list-content panel-content" data-dojo-attach-point="contentNode"></div>',
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
            '<h3 class="date-text" data-dojo-attach-point="dateNode"></h3>',
            '<button data-tool="next" data-action="getNextWeekActivities" class="button button-next"><span></span></button>',
            '<button data-tool="prev" data-action="getPrevWeekActivities" class="button button-prev"><span></span></button>',
            '</div>'
        ]),
        groupTemplate: new Simplate([
            '<h2 data-action="selectDay" class="dayHeader {%= $.Activity.headerClass %}" data-date="{%= $.currentDate %}">',
            '<span class="dayHeaderLeft">{%: $.Activity.StartDate.toString($$.dayHeaderLeftFormatText) %}</span>',
            '<span class="dayHeaderRight">{%: $.Activity.StartDate.toString($$.dayHeaderRightFormatText) %}</span>',
            '</h2>',
            '<ul class="list-content {%= $.cls %}">'
        ]),
        groupEndTemplate: new Simplate([
            '</ul>'
        ]),
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<div class="activityRow">',
            '<img src="{%= $$.getTypeIcon($.Activity.Type) %}">',
            '{% if ($.Activity.Timeless) { %}',
                '<span class="activityTime">{%= $$.allDayText %}</span>',
            '{% } else { %}',
                '<span class="activityTime">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, $$.startTimeFormatText) %}',
                '<span class="activityAMPM">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "tt") %}</span></span>',
            '{% } %}',
            '{%! $$.descriptionTemplate %}',
            '</div>',
            '<div class="clear"></div>'
        ]),
        descriptionTemplate: new Simplate([
            '{% if ($.Activity.Description && $$.nameTemplate.apply($).length > 1) { %}',
                '<h3>{%: $.Activity.Description %}</h3>',
                '<h4>{%= $$.nameTemplate.apply($) %}</h4>',
            '{% } else { %}',
                '{% if ($.Activity.Description) { %}',
                    '<h3 class="singleDescription">{%: $.Activity.Description %}</h3>',
                '{% } else { %}',
                    '<h4 class="singleDescription">{%= $$.nameTemplate.apply($) %}</h4>',
                '{% } %}',
            '{% } %}'
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
            '<h2 class="{%= $.headerClass %}" data-action="activateDayHeader" data-date="{%= $.currentDate %}">',
            '<span class="dayHeaderLeft">{%= $.currentDateLeftHeader %}</span>',
            '<span class="dayHeaderRight">{%= $.currentDateRightHeader %}</span>',
            '</h2>'
        ]),
        eventListStartTemplate: new Simplate([
            '<h2 data-action="togglegroup" data-date="{%= $.currentDate %}">',
                '<span class="dayHeaderLeft">{%= $.eventHeaderText %}</span>',
            '</h2>',
            '<ul data-group="{%= $.tag %}" class="list-content event-rows">'
        ]),
        eventListEndTemplate: new Simplate([
            '</ul>'
        ]),
        eventItemTemplate: new Simplate([
            '<li class="event" data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
                '<span class="eventDate">',
                '{%: $.StartDate.toString($$.eventDateFormatText) %}',
                '&nbsp;-&nbsp;',
                '{%: $.EndDate.toString($$.eventDateFormatText) %}',
                '</span>&nbsp;',
                '{%= $.Description %}',
            '</li>'
        ]),
        eventMoreTemplate: new Simplate([
            '<div data-action="activateEventList">',
                '<button class="button" style="width:100%"><span>{%: $$.moreEventText %} {%: $.$totalResults %} {%: $$.eventHeaderText %}</span></button>',
            '</div>'
        ]),
        attributeMap:{
            listContent:{
                node: 'contentNode',
                type: 'innerHTML'
            },
            dateContent: {
                node: 'dateNode',
                type: 'innerHTML'
            },
            eventContent:{
                node: 'eventContentNode',
                type: 'innerHTML'
            }
        },

        //View Properties
        id: 'calendar_weeklist',
        cls: 'list activities-for-week',
        activityDetailView: 'activity_detail',
        eventDetailView: 'event_detail',
        monthView: 'calendar_monthlist',
        activityListView: 'calendar_daylist',
        insertView: 'activity_types_list',
        userWeekStartDay: 0, // 0-6, Sun-Sat
        userWeekEndDay: 6,
        currentDate: null,
        hideSearch: true,
        expose: false,
        weekStartDate: null,
        weekEndDate: null,
        todayDate: null,
        typeIcons: {
            'defaultIcon': 'content/images/icons/To_Do_24x24.png',
            'atAppointment': 'content/images/icons/Meeting_24x24.png',
            'atPhoneCall': 'content/images/icons/Call_24x24.png',
            'atToDo': 'content/images/icons/To_Do_24x24.png',
            'atPersonal': 'content/images/icons/Personal_24x24.png',
            'atLiterature': 'content/images/icons/letters_24.png'
        },

        queryWhere: null,
        queryOrderBy: 'Activity.StartDate asc',
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
        eventPageSize: 3,
        resourceKind: 'useractivities',

        _onRefresh: function(o) {
            this.inherited(arguments);
            if (o.resourceKind === 'activities' || o.resourceKind === 'events'){
                this.refreshRequired = true;
            }
        },
        init: function() {
            this.inherited(arguments);
            this.todayDate = Date.today().clearTime();
            this.currentDate = this.todayDate.clone();
        },
        initEvents: function() {
            this.inherited(arguments);
        },
        activateDayHeader: function(params){
            this.currentDate = Date.parse(params.date);
            this.navigateToUserActivityList();
        },
        getThisWeekActivities: function(){
            if(!this.isInCurrentWeek(this.todayDate)){
                this.currentDate = this.todayDate.clone();
                this.refresh();
            }
        },
        getStartDay: function(date){
            return (date.getDay()===this.userWeekStartDay)
                    ? date.clone().clearTime()
                    : date.clone().moveToDayOfWeek(this.userWeekStartDay, -1).clearTime();
        },
        getEndDay: function(date){
            return (date.getDay()===this.userWeekEndDay)
                    ? date.clone().set({hour:23,minute:59,second:59})
                    : date.clone().moveToDayOfWeek(this.userWeekEndDay, 1).set({hour:23,minute:59,second:59});
        },
        getNextWeekActivities: function(){
            this.currentDate = this.getStartDay(this.weekEndDate.clone().addDays(1));
            this.refresh();
        },
        getPrevWeekActivities: function(){
            this.currentDate = this.getStartDay(this.weekStartDate.clone().addDays(-1));
            this.refresh();
        },
        getTypeIcon: function(type){
            return this.typeIcons[type] || this.typeIcons['defaultIcon'];
        },
        setWeekQuery: function(){
            var setDate = this.currentDate || this.todayDate;
            this.weekStartDate = this.getStartDay(setDate);
            this.weekEndDate = this.getEndDay(setDate);
            this.queryWhere =  dojo.string.substitute(
                    [
                        'UserId eq "${0}" and (',
                        '(Activity.Timeless eq false and Activity.StartDate between @${1}@ and @${2}@) or ',
                        '(Activity.Timeless eq true and Activity.StartDate between @${3}@ and @${4}@))'
                    ].join(''),[
                    App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(this.weekStartDate),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(this.weekEndDate),
                    this.weekStartDate.toString('yyyy-MM-ddT00:00:00Z'),
                    this.weekEndDate.toString('yyyy-MM-ddT23:59:59Z')]
                );
        },
        setWeekTitle: function(){
            var start = this.getStartDay(this.currentDate),
                end = this.getEndDay(this.currentDate);
            this.set('dateContent', dojo.string.substitute('${0}-${1}',
                [start.toString(this.weekTitleFormatText),
                end.toString(this.weekTitleFormatText)]
            ));
        },
        setWeekStartDay: function(){
            var startDay = (typeof this.options !== 'undefined' && typeof this.options['startDay'] !== 'undefined')
                ? this.options['startDay']
                : this.userWeekStartDay;
            this.userWeekStartDay = startDay;
            this.userWeekEndDay = this.getStartDay(new Date()).addDays(6).getDay();
        },
        isInCurrentWeek: function(date){
            return date.between(this.weekStartDate, this.weekEndDate);
        },
        selectDay: function(params) {
            this.currentDate = Date.parse(params.date);
            this.navigateToUserActivityList();
        },
        processFeed: function(feed) {
            this.feed = feed;

            if (this.feed['$totalResults'] === 0)
            {
                dojo.query(this.contentNode).append(this.noDataTemplate.apply(this));
            }
            else if (feed['$resources'])
            {
                var todayNode = this.addTodayDom(),
                    i,
                    feedLength=feed['$resources'].length,
                    startDate,
                    currentEntry,
                    entryGroups = {},
                    currentGroup,
                    o = [];

                if(todayNode)
                    entryGroups[this.todayDate.getDate()] = [todayNode];

                for(i = 0; i < feedLength; i+=1){
                    currentEntry = feed['$resources'][i];
                    startDate = Sage.Platform.Mobile.Convert.toDateFromString(currentEntry.Activity.StartDate);
                    if(currentEntry.Activity.Timeless){
                        startDate = this.dateToUTC(startDate);
                    }
                    currentEntry.Activity.StartDate = startDate;
                    currentEntry.isEvent = false;
                    this.entries[currentEntry.$key] = currentEntry;

                    currentGroup = entryGroups[currentEntry.Activity.StartDate.getDate()];
                    if(currentGroup){
                        if(currentEntry.Activity.Timeless) {
                            currentGroup.splice(1, 0, this.rowTemplate.apply(currentEntry, this));
                        } else {
                            currentGroup.push(this.rowTemplate.apply(currentEntry, this));
                        }
                        continue;
                    }
                    currentGroup = [];
                    currentGroup.push(this.groupTemplate.apply(currentEntry, this));
                    currentGroup.push(this.rowTemplate.apply(currentEntry, this));
                    entryGroups[currentEntry.Activity.StartDate.getDate()] = currentGroup;
                }

                for(var entryGroup in entryGroups){
                    o.push(entryGroups[entryGroup].join('') + this.groupEndTemplate.apply(this));
                }

                if (o.length > 0)
                    this.set('listContent', o.join(''));
            }

            if (this.remainingContentNode)
                this.set('remainingContent', dojo.string.substitute(
                    this.remainingText,
                    [this.feed['$totalResults'] - (this.feed['$startIndex'] + this.feed['$itemsPerPage'] - 1)]
                ));

            if (this.hasMoreData())
                dojo.addClass(this.domNode, 'list-has-more');
            else
                dojo.removeClass(this.domNode, 'list-has-more');
        },
        addTodayDom: function(){
            if(!this.isInCurrentWeek(this.todayDate)) return null;
            var todayEntry = {
                    Activity: {
                        StartDate: this.todayDate,
                        headerClass: 'currentDate'
                    }
                };
            return this.groupTemplate.apply(todayEntry, this);
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
            alert(dojo.string.substitute(this.requestErrorText, [response, o]));
        },
        onRequestEventDataAborted: function(response, o) {
            this.options = false; // force a refresh
        },
        onRequestEventDataSuccess: function(feed) {
            this.processEventFeed(feed);
        },
        createEventRequest: function(){
            var querySelect = ['StartDate', 'EndDate', 'Description', 'Type'],
                queryWhere = this.getEventQuery(),
                request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
                .setCount(this.eventPageSize)
                .setStartIndex(1)
                .setResourceKind('events')
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(','))
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);
            return request;
        },
        getEventQuery: function(){
            var startDate = this.weekStartDate,
                endDate = this.weekEndDate;
            return dojo.string.substitute(
                    [
                        'UserId eq "${0}" and (',
                            '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
                            'StartDate lt @${2}@',
                        ')'
                    ].join(''),
                    [App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(startDate),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(endDate)]
                );
        },
        processEventFeed: function(feed){
            if (feed['$totalResults'] === 0) return false;

            var o = [],
                event,
                i=0,
                feedLength = feed['$resources'].length;

            o.push(this.eventListStartTemplate.apply(this));

            for(i = 0; i < feedLength; i += 1){
                event = feed['$resources'][i];
                event.isEvent = true;
                event.StartDate = Sage.Platform.Mobile.Convert.toDateFromString(event.StartDate);
                event.EndDate = Sage.Platform.Mobile.Convert.toDateFromString(event.EndDate);
                this.entries[event.$key] = event;
                o.push(this.eventItemTemplate.apply(event, this));
            }
            o.push(this.eventListEndTemplate.apply(this));

            if( feed['$totalResults'] > feed['$resources'].length ){
                o.push(this.eventMoreTemplate.apply(feed,this));
            }

            this.set('eventContent', o.join(''));
        },
        refresh: function() {
            var startDate = this.currentDate;
            this.setWeekStartDay();
            this.currentDate = startDate.clone();
            this.weekStartDate = this.getStartDay(startDate);
            this.weekEndDate = this.getEndDay(startDate);
            this.setWeekTitle();
            this.setWeekQuery();

            this.clear();
            this.requestData();
            this.requestEventData();
        },
        show: function(options) {
            if(options)
                this.processShowOptions(options);
            
            this.setDefaultOptions();
            this.inherited(arguments);
        },
        processShowOptions: function(options){
            if(options.currentDate){
                this.currentDate = Date.parseExact(options.currentDate,'yyyy-MM-dd').clearTime() || Date.today().clearTime();
                this.refreshRequired = true;
            }
        },
        setDefaultOptions: function(){
            if(typeof this.options === 'undefined') this.options = {};
            if(typeof this.options['startDay'] === 'undefined'){
                this.options['startDay'] = (App.context.userOptions)
                    ? parseInt(App.context.userOptions['Calendar:FirstDayofWeek'], 10)
                    : this.userWeekStartDay;
            }
        },
        activateEventList: function(){
            var v = App.getView("event_related");
            if (v)
                v.show({"where":this.getEventQuery()});
        },
        navigateToUserActivityList: function() {
            var view = App.getView(this.activityListView),
                options = {currentDate: this.currentDate.toString('yyyy-MM-dd') || Date.today()};
            view.show(options);
        },
        navigateToMonthView: function() {
            var view = App.getView(this.monthView),
                options = {currentDate: this.currentDate.toString('yyyy-MM-dd') || Date.today()};
            view.show(options);
       },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.entries[key],
                detailView = (entry.isEvent) ? this.eventDetailView : this.activityDetailView,
                view = App.getView(detailView);
            if (view)
                view.show({
                    descriptor: descriptor,
                    key: key
                });
        }
    });
});