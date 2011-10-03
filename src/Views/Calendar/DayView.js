/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Calendar/DayView', ['Sage/Platform/Mobile/List', 'Sage/Platform/Mobile/Convert'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Calendar.DayView', [Sage.Platform.Mobile.List], {
        // Localization
        titleText: 'Calendar',
        dateHeaderFormatText: 'dddd, MM/dd/yyyy',
        startTimeFormatText: 'h:mm',
        todayText: 'Today',
        dayText: 'Day',
        weekText: 'Week',
        monthText: 'Month',
        allDayText: 'All-Day',
        eventHeaderText: 'Events',

        // Templates
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
            '{%! $.searchTemplate %}',
            '{%! $.navigationTemplate %}',
            '<div style="clear:both"></div>',
            '<div data-dojo-attach-point="eventContainerNode">',
                '<h2>{%= $.eventHeaderText %}</h2>',
                '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>',
                '{%! $.eventMoreTemplate %}',
            '</div>',
            '<ul class="list-content" data-dojo-attach-point="contentNode"></ul>',
            '{%! $.moreTemplate %}',
            '</div>'
        ]),
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        eventRowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">',
                '<div data-action="selectEntry" class="list-item-selector"></div>',
                '{%! $$.eventItemTemplate %}',
            '</li>'
        ]),
        timeTemplate: new Simplate([
            '{% if ($.Activity.Timeless) { %}',
                '<span class="p-meridiem">{%= $$.allDayText %}</span>',
            '{% } else { %}',
                '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, $$.dayStartTimeFormatText) %}</span>',
                '<span class="p-meridiem">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "tt") %}</span>,',
            '{% } %}'
        ]),
        eventTimeTemplate: new Simplate([
            '<span class="p-meridiem">{%= $.Type %}</span>'
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
        eventNameTemplate: new Simplate([
            '{%: Mobile.SalesLogix.Format.date($.StartDate, $$.eventDateFormatText) %}',
            '&nbsp;-&nbsp;',
            '{%: Mobile.SalesLogix.Format.date($.EndDate, $$.eventDateFormatText) %}'
        ]),
        itemTemplate: new Simplate([
            '<h3>',
            '{%! $$.timeTemplate %}',
            '<span class="p-description">&nbsp;{%: $.Activity.Description %}</span>',
            '</h3>',
            '<h4>{%= $$.nameTemplate.apply($) %}</h4>'
        ]),
        eventItemTemplate: new Simplate([
            '<h3>',
            '{%! $$.eventTimeTemplate %}',
            '<span class="p-description">&nbsp;{%: $.Description %}</span>',
            '</h3>',
            '<h4>{%! $$.eventNameTemplate %}</h4>'
        ]),
        navigationTemplate: new Simplate([
            '<div class="split-buttons">',
            '<button data-tool="today" data-action="getToday" class="button">{%: $.todayText %}</button>',
            '<button data-tool="day" data-action="getDayActivities" class="button">{%: $.dayText %}</button>',
            '<button data-tool="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>',
            '<button data-tool="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>',
            '</div>',
            '<div class="nav-bar">',
            '<h3 class="date-text" data-dojo-attach-point="dateNode"></h3>',
            '<button data-tool="next" data-action="getNextDay" class="button button-next"><span></span></button>',
            '<button data-tool="prev" data-action="getPrevDay" class="button button-prev"><span></span></button>',
            '</div>'
        ]),
        eventMoreTemplate: new Simplate([
            '<div class="list-more" data-dojo-attach-point="eventMoreNode">',
            '<div class="list-remaining"><span data-dojo-attach-point="eventRemainingContentNode"></span></div>',
            '<button class="button" data-action="eventMore">',
            '<span>{%= $.moreText %}</span>',
            '</button>',
            '</div>'
        ]),
        attributeMap:{
            listContent: {
                node: 'contentNode',
                type: 'innerHTML'
            },
            eventListContent: {
                node: 'eventContentNode',
                type: 'innerHTML'
            },
            dateContent: {
                node: 'dateNode',
                type: 'innerHTML'
            },
            eventRemainingContent: {
                node: 'eventRemainingContentNode',
                type: 'innerHTML'
            }
        },

        //View Properties
        id: 'calendar_daylist',
        cls: 'activities-for-day',
        icon: 'content/images/icons/Calendar_24x24.png',
        monthView: 'calendar_monthlist',
        weekView: 'calendar_weeklist',
        activityDetailView: 'activity_detail',
        eventDetailView: 'event_detail',
        insertView: 'activity_types_list',
        hideSearch: true,
        expose: false,
        currentDate: null,
        eventFeed: null,
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
        eventQuerySelect: [
            'StartDate',
            'EndDate',
            'Description',
            'Type'
        ],
        resourceKind: 'useractivities',

        _onRefresh: function(o) {
            this.inherited(arguments);
            if (o.resourceKind === 'activities' || o.resourceKind === 'events'){
                this.refreshRequired = true;
            }
        },
        init: function() {
            this.inherited(arguments);
            this.currentDate = Date.today().clearTime();
        },
        initEvents: function(){
            this.inherited(arguments);
        },
        refresh: function(){
            this.clear();

            this.options = this.options || {};
            this.options['where'] = this.formatQueryForActivities();
            this.feed = null;
            this.eventFeed = null;
            this.set('dateContent', this.currentDate.toString(this.dateHeaderFormatText));

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
            alert(dojo.string.substitute(this.requestErrorText, [response, o]));
        },
        onRequestEventDataAborted: function(response, o) {
            this.options = false; // force a refresh
        },
        onRequestEventDataSuccess: function(feed) {
            this.processEventFeed(feed);
        },
        createEventRequest: function(){
            var querySelect = this.eventQuerySelect,
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
            return dojo.string.substitute(
                    [
                        'UserId eq "${0}" and (',
                            '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
                            'StartDate lt @${2}@',
                        ')'
                    ].join(''),[
                    App.context['user'] && App.context['user']['$key'],
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(startDate),
                    Sage.Platform.Mobile.Convert.toIsoStringFromDate(endDate)]
                );
        },
        hideEventList: function(){
            dojo.style(this.eventContainerNode, 'display', 'none');
        },
        showEventList: function(){
            dojo.style(this.eventContainerNode, 'display', 'block');
        },
        processEventFeed: function(feed){
            var r = feed['$resources'],
                row,
                i,
                feedLength = r.length,
                o = [];
            this.eventFeed = feed;

            if(feedLength === 0){
                this.hideEventList();
                return false;
            } else {
                this.showEventList();
            }

            for(i = 0; i < feedLength; i += 1){
                row = r[i];
                row.isEvent = true;
                this.entries[row.$key] = row;
                o.push(this.eventRowTemplate.apply(row, this));
            }

            if(feed['$totalresults'] > feedLength) {
                dojo.addClass(this.eventContainerNode, 'list-has-more');
            } else {
                dojo.removeClass(this.eventContainerNode, 'list-has-more');
            }

            this.set('eventListContent', o.join(''));
        },
        processFeed: function(feed) {
            var r = feed['$resources'],
                row,
                i,
                feedLength = r.length,
                o = [];

            this.feed = feed;
            for(i = 0; i < feedLength; i += 1){
                row = r[i];
                row.isEvent = false;
                this.entries[row.Activity.$key] = row;
                o.push(this.rowTemplate.apply(row, this));
            }

            if(feedLength === 0){
                this.set('listContent', this.noDataTemplate.apply(this));
                return false;
            }

            this.set('listContent', o.join(''));
        },

        show: function(options) {
            if(options)
                this.processShowOptions(options);

            options = options || {};
            options['where'] = this.formatQueryForActivities();

            this.set('dateContent', this.currentDate.toString(this.dateHeaderFormatText));
            Mobile.SalesLogix.Views.Calendar.DayView.superclass.show.call(this, options);
        },
        processShowOptions: function(options){
            if(options.currentDate){
                this.currentDate = Date.parseExact(options.currentDate,'yyyy-MM-dd').clearTime() || Date.today().clearTime();
                this.refreshRequired = true;
            }
        },
        isLoading: function(){
            return dojo.hasClass(this.domNode, 'list-loading');
        },
        getNextDay: function() {
            if (this.isLoading()) return;
            this.currentDate.add({day: 1});
            this.refresh();
        },
        getToday: function() {
            if (this.isLoading()) return;
            if (this.currentDate.equals(Date.today())) return;

            this.currentDate = Date.today().clearTime();
            this.refresh();
        },
        getPrevDay: function() {
            if (this.isLoading()) return;

            this.currentDate.add({day: -1});
            this.refresh();
        },
        formatQueryForActivities: function() {
            var C = Sage.Platform.Mobile.Convert;
            var query = [
                'UserId eq "${0}" and (',
                '(Activity.Timeless eq false and Activity.StartDate between @${1}@ and @${2}@) or ',
                '(Activity.Timeless eq true and Activity.StartDate between @${3}@ and @${4}@))'
            ].join('');

            return dojo.string.substitute(
                query,
                [App.context['user'] && App.context['user']['$key'],
                C.toIsoStringFromDate(this.currentDate),
                C.toIsoStringFromDate(this.currentDate.clone().add({day: 1, second: -1})),
                this.currentDate.toString('yyyy-MM-ddT00:00:00Z'),
                this.currentDate.toString('yyyy-MM-ddT23:59:59Z')]
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
