/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Calendar");

(function() {
    var L = Sage.Platform.Mobile.List;

    Mobile.SalesLogix.Calendar.UserActivityList = Ext.extend(Sage.Platform.Mobile.List, {
        attachmentPoints: Ext.apply({}, {
            dateTextEl: '.date-text',
            splitButtonEl: '.split-buttons',
            todayButtonEl: '.button[data-tool="today"]',
            dayButtonEl: '.button[data-tool="day"]',
            weekButtonEl: '.button[data-tool="week"]',
            monthButtonEl: '.button[data-tool="month"]'
        }, L.prototype.attachmentPoints),
                
        //Templates
        viewTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
            '{%! $.searchTemplate %}',
            '{%! $.navigationTemplate %}',
            '<div style="clear:both"></div>',
            '<ul class="list-content"></ul>',
            '{%! $.moreTemplate %}',
            '</div>'
        ]),
        itemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: ($.isEvent) ? $$.eventText : $.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
        timeTemplate: new Simplate([
            '{% if ($.Timeless) { %}',
                '<span class="p-meridiem">{%= $$.allDayText %}</span>',
            '{% } else { %}',
                '{% if ($.isEvent) { %}',
                    '<span class="p-meridiem">{%= $.Type %}</span>',
                '{% } else { %}',
                    '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.StartDate, $$.dayStartTimeFormatText) %}</span>',
                    '<span class="p-meridiem">{%: Mobile.SalesLogix.Format.date($.StartDate, "tt") %}</span>,',
                '{% } %}',
            '{% } %}'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.ContactName) { %}',
            '{%: $.ContactName %} / {%: $.AccountName %}',
            '{% } else if ($.AccountName) { %}',
            '{%: $.AccountName %}',
            '{% } else { %}',
            '{%: $.LeadName %}',
            '{% } %}',
            '{% if ($.isEvent) { %}',
                '{%: Mobile.SalesLogix.Format.date($.StartDate, $$.eventDateFormatText) %}',
                '&nbsp;-&nbsp;',
                '{%: Mobile.SalesLogix.Format.date($.EndDate, $$.eventDateFormatText) %}',
            '{% } %}'
        ]),
        contentTemplate: new Simplate([
            '<h3>',
            '{%! $$.timeTemplate %}',
            '<span class="p-description">&nbsp;{%: $.Description %}</span>',
            '</h3>',
            '<h4>{%= $$.nameTemplate.apply($) %}</h4>'
        ]),
        navigationTemplate: new Simplate([
            '<div class="split-buttons">',
            '<button data-tool="today" data-action="getTodayActivities" class="button">{%: $.todayText %}</button>',
            '<button data-tool="day" data-action="getDayActivities" class="button">{%: $.dayText %}</button>',
            '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>',
            '<button data-tool="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>',
            '</div>',
            '<div class="nav-bar">',
            '<h3 class="date-text"></h3>',
            '<button data-tool="next" data-action="getNextActivities" class="button button-next"><span></span></button>',
            '<button data-tool="prev" data-action="getPrevActivities" class="button button-prev"><span></span></button>',
            '</div>'
        ]),

        //Localization
        titleText: 'Calendar',
        dateHeaderFormatText: 'dddd, MM/dd/yyyy',
        startTimeFormatText: 'h:mm',
        todayText: 'Today',
        dayText: 'Day',
        weekText: 'Week',
        monthText: 'Month',
        allDayText: 'All-Day',
        eventText: 'Event',

        //View Properties
        id: 'useractivity_list',
        cls: 'activities-for-day',
        icon: 'content/images/icons/Calendar_24x24.png',
        monthView: 'slx_calendar',
        weekView: 'calendar_weeklist',
        activityDetailView: 'activity_detail',
        eventDetailView: 'event_detail',
        insertView: 'activity_types_list',
        hideSearch: true,
        expose: false,
        currentDate: null,
        feeds: [],
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
        resourceKind: 'useractivities',

        _onRefresh: function(o) {
            Mobile.SalesLogix.Calendar.UserActivityList.superclass._onRefresh.apply(this, arguments);
            if (o.resourceKind === 'activities') this.refreshRequired = true;
        },
        init: function() {
            Mobile.SalesLogix.Calendar.UserActivityList.superclass.init.apply(this, arguments);
            this.currentDate = Date.today().clearTime();
        },
        initEvents: function(){
            Mobile.SalesLogix.Calendar.UserActivityList.superclass.initEvents.apply(this, arguments);
            /*
            Disable swiping until further research with FireFox Mobile and better usability
            handling for entire page swipe vs content area swipe
            this.el.on('swipe', this.onSwipe, this);
            */
        },
        onSwipe: function(evt, el){
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
            this.getPrevActivities();
        },
        onSwipeLeft: function(){
            this.getNextActivities();
        },
        refresh: function(){
            this.clear();

            this.options = this.options || {};
            this.options['where'] = this.formatQueryForActivities();
            this.feeds = [];
            this.dateTextEl.update(this.currentDate.toString(this.dateHeaderFormatText));

            this.requestData();
            this.requestEventData();
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
            alert(String.format(this.requestErrorText, response, o));
        },
        onRequestEventDataAborted: function(response, o) {
            this.options = false; // force a refresh
        },
        onRequestEventDataSuccess: function(feed) {
            this.processFeed(feed);
        },
        createEventRequest: function(){
            var querySelect = ['StartDate', 'EndDate', 'Description', 'Type'],
                queryWhere = this.getEventQuery(),
                request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
                .setCount(this.pageSize)
                .setStartIndex(1)
                .setResourceKind('events')
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(','))
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);
            return request;
        },
        getEndOfDay: function(){
            return new Date(this.currentDate.getFullYear(),
                this.currentDate.getMonth(),
                this.currentDate.getDate(),
                23, 59, 59);
        },
        getEventQuery: function(){
            var startDate = this.currentDate.clone().clearTime(),
                endDate = this.getEndOfDay();
            return String.format(
                    [
                        'UserId eq "{0}" and (',
                            '(StartDate gt @{1}@ or EndDate gt @{1}@) and ',
                            'StartDate lt @{2}@',
                        ')'
                    ].join(''),
                    App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(startDate),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(endDate)
                );
        },
        processFeed: function(feed) {
            var r = feed['$resources'],
                isEvent = (r[0] && r[0].Activity) ? false : true,
                activity,
                i,
                feedLength = r.length,
                o = [];

            this.feeds.push(feed);
            for(i = 0; i < feedLength; i += 1){
                if(isEvent){
                    activity = r[i];
                    activity.isEvent = true;
                    this.entries[r[i].$key] = activity;
                } else {
                    activity = r[i].Activity
                    activity.isEvent = false;
                    this.entries[r[i].Activity.$key] = activity;
                }
                o.push(this.itemTemplate.apply(activity, this));
            }

            if(this.feeds.length > 1 && feedLength === 0 && this.feeds[0]['$resources'].length === 0){
                this.contentEl.update(this.noDataTemplate.apply(this));
                return false;
            }

            if(activity && activity.isEvent){
                Ext.DomHelper.insertFirst(this.contentEl, o.join(''));
            } else {
                Ext.DomHelper.append(this.contentEl, o.join(''));
            }
        },

        show: function(options) {
            if(options)
                this.processShowOptions(options);

            options = options || {};
            options['where'] = this.formatQueryForActivities();

            this.dateTextEl.update(this.currentDate.toString(this.dateHeaderFormatText));
            Mobile.SalesLogix.Calendar.UserActivityList.superclass.show.call(this, options);
        },
        processShowOptions: function(options){
            if(options.currentDate){
                this.currentDate = Date.parseExact(options.currentDate,'yyyy-MM-dd').clearTime() || Date.today().clearTime();
                this.refreshRequired = true;
            }
        },
        getNextActivities: function() {
            if (this.el.hasClass('list-loading')) return;

            this.currentDate.add({day: 1});
            this.refresh();
        },
        getTodayActivities: function() {
            if (this.el.hasClass('list-loading')) return;
            if (this.currentDate.equals(Date.today())) return;

            this.currentDate = Date.today().clearTime();
            this.refresh();
        },
        getPrevActivities: function() {
            if (this.el.hasClass('list-loading')) return;

            this.currentDate.add({day: -1});
            this.refresh();
        },
        formatQueryForActivities: function() {
            var C = Sage.Platform.Mobile.Convert;
            var query = [
                'UserId eq "{0}" and (',
                '(Activity.Timeless eq false and Activity.StartDate between @{1}@ and @{2}@) or ',
                '(Activity.Timeless eq true and Activity.StartDate between @{3}@ and @{4}@))'
            ].join('');

            return String.format(
                query,
                App.context['user'] && App.context['user']['$key'],
                C.toIsoStringFromDate(this.currentDate),
                C.toIsoStringFromDate(this.currentDate.clone().add({day: 1, second: -1})),
                this.currentDate.toString('yyyy-MM-ddT00:00:00Z'),
                this.currentDate.toString('yyyy-MM-ddT23:59:59Z')
            );
        },
        navigateToMonthView: function() {
            var view = App.getView(this.monthView),
                options = {currentDate: this.currentDate.toString('yyyy-MM-dd') || Date.today()};
            view.show(options);
        },
        navigateToWeekView: function(){
            var view = App.getView(this.weekView),
                options = {currentDate: this.currentDate.toString('yyyy-MM-dd') || Date.today()};
            view.show(options);
        },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.entries[key];
            this.detailView = (entry.isEvent) ? this.eventDetailView : this.activityDetailView;
            Mobile.SalesLogix.Activity.List.superclass.navigateToDetailView.call(this, key, descriptor);
        }
    });
})();
