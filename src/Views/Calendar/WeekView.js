define('Mobile/SalesLogix/Views/Calendar/WeekView', [
    'dojo/_base/declare',
    'dojo/query',
    'dojo/string',
    'dojo/dom-construct',
    'dojo/dom-class',
    'argos/ErrorManager',
    'argos/convert',
    'argos/List',
    'argos/_SDataListMixin',
    'argos/ScrollContainer',
    'argos/SearchWidget',
    'argos!scene',
    'Mobile/SalesLogix/Format'
], function(
    declare,
    query,
    string,
    domConstruct,
    domClass,
    ErrorManager,
    convert,
    List,
    _SDataListMixin,
    ScrollContainer,
    SearchWidget,
    scene
) {

    return declare('Mobile.SalesLogix.Views.Calendar.WeekView', [List, _SDataListMixin], {
        //Localization
        titleText: 'Calendar',
        weekTitleFormatText: 'MMM D, YYYY',
        dayHeaderLeftFormatText: 'dddd',
        dayHeaderRightFormatText: 'MMM D, YYYY',
        startTimeFormatText: 'h:mm',
        todayText: 'Today',
        dayText: 'Day',
        weekText: 'Week',
        monthText: 'Month',
        allDayText: 'All Day',
        eventHeaderText: 'Events',
        eventMoreText: 'View ${0} More Event(s)',
        toggleCollapseText: 'toggle collapse',

        components: [
            {name: 'search', type: SearchWidget, attachEvent: 'onQuery:_onSearchQuery,onClear:_onSearchClear'},
            {name: 'fix', content: '<a href="#" class="android-6059-fix">fix for android issue #6059</a>'},
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', components: [
                {name: 'scroll', tag: 'div', attrs: {'class' : 'list activities-for-week'}, components: [
                    {name: 'splitButtons', tag: 'div', attrs: {'class': 'split-buttons'}, components: [
                        {name: 'butToday', content: Simplate.make('<button data-command="today" data-action="getThisWeekActivities" class="button">{%: $.todayText %}</button>')},
                        {name: 'butSelectDate', content: '<button data-command="selectdate" data-action="selectDate" class="button"><span></span></button>'},
                        {name: 'butDay', content: Simplate.make('<button data-command="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>')},
                        {name: 'butWeek', content: Simplate.make('<button data-command="week" class="button">{%: $.weekText %}</button>')},
                        {name: 'butMonth', content: Simplate.make('<button data-command="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>')}
                    ]},
                    {name: 'navBar', tag: 'div', attrs: {'class': 'nav-bar'}, components: [
                        {name: 'next', content: '<button data-command="next" data-action="getNextWeekActivities" class="button button-next"><span></span></button>'},
                        {name: 'prev', content: '<button data-command="prev" data-action="getPrevWeekActivities" class="button button-prev"><span></span></button>'},
                        {name: 'dateNode', tag: 'h3', attrs: {'class': 'date-text'}, attachPoint: 'dateNode'}
                    ]},
                    {name: 'clear', content: '<div style="clear:both"></div>'},
                    {name: 'events', tag: 'div', attrs: {'class': 'event-content event-hidden'}, attachPoint: 'eventContainerNode', components: [
                        {name: 'eventsHeader', content: Simplate.make('<h2 data-action="toggleGroup">{%= $.eventHeaderText %}<button class="collapsed-indicator" aria-label="{%: $$.toggleCollapseText %}"></button></h2>')},
                        {name: 'eventsList', tag: 'ul', attrs: {'class': 'list-content'}, attachPoint: 'eventContentNode'},
                        {name: 'eventsMore', tag: 'div', attrs: {'class': 'list-more'}, attachPoint: 'eventMoreNode', components: [
                            {name: 'butEvents', tag: 'button', attrs: {'class': 'button', 'data-action': 'activateEventMore'}, components: [
                                {name: 'eventRemaining', tag: 'span', attachPoint: 'eventRemainingContentNode', content: Simplate.make('{%= $.eventMoreText %}')}
                            ]}
                        ]}
                    ]},
                    {name: 'content', tag: 'div', attrs: {'class': 'list-content'}, attachPoint: 'contentNode'},
                    {name: 'more', tag: 'div', attrs: {'class': 'list-more'}, components: [
                        {name: 'moreRemaining', tag: 'span', attrs: {'class': 'list-remaining'}, attachPoint: 'remainingContentNode'},
                        {name: 'moreButton', content: Simplate.make('<button class="button" data-action="more"><span>{%: $.moreText %}</span></button>')}
                    ]}
                ]}
            ]}
        ],

        // Templates
        groupTemplate: new Simplate([
            '<h2 data-action="activateDayHeader" class="dayHeader {%= $.headerClass %}" data-date="{%: moment($.StartDate).format(\'YYYY-MM-DD\') %}">',
                '<span class="dayHeaderLeft">{%: moment($.StartDate).format($$.dayHeaderLeftFormatText) %}</span>',
                '<span class="dayHeaderRight">{%: moment($.StartDate).format($$.dayHeaderRightFormatText) %}</span>',
                '<div style="clear:both"></div>',
            '</h2>',
            '<ul class="list-content">'
        ]),
        groupEndTemplate: new Simplate([
            '</ul>'
        ]),
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}">',
            '<table class="calendar-entry-table"><tr>',
            '<td class="entry-table-icon">',
            '<button data-action="selectEntry" class="list-item-selector button"><img src="{%= $$.activityIconByType[$.Type] || $$.selectIcon %}" class="icon" /></button>',
            '</td>',
            '<td class="entry-table-time">{%! $$.timeTemplate %}</td>',
            '<td class="entry-table-description">{%! $$.itemTemplate %}</td>',
            '</tr></table>',
            '</li>'
        ]),
        eventRowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="Event">',
            '<table class="calendar-entry-table"><tr>',
            '<td class="entry-table-icon">',
            '<button data-action="selectEntry" class="list-item-selector button"><img src="{%= $$.eventIcon || $$.selectIcon %}" class="icon" /></button>',
            '</td>',
            '<td class="entry-table-description">{%! $$.eventItemTemplate %}</td>',
            '</tr></table>',
            '</li>'
        ]),
        timeTemplate: new Simplate([
            '{% if ($.Timeless) { %}',
                '<span class="p-time">{%= $$.allDayText %}</span>',
            '{% } else { %}',
                '<span class="p-time">{%: moment($.StartDate).format($$.startTimeFormatText) %}</span>',
                '<span class="p-meridiem">{%: moment($.StartDate).format("A") %}</span>',
            '{% } %}'
        ]),
        itemTemplate: new Simplate([
            '<h3 class="p-description">{%: $.Description %}</h3>',
            '<h4>{%= $$.nameTemplate.apply($) %}</h4>'
        ]),
        eventItemTemplate: new Simplate([
            '<h3 class="p-description">{%: $.Description %} ({%: $.Type %})</h3>',
            '<h4>{%! $$.eventNameTemplate %}</h4>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.ContactName) { %}',
            '{%: $.ContactName %} / {%: $.AccountName %}',
            '{% } else if ($.AccountName) { %}',
            '{%: $.AccountName %}',
            '{% } else { %}',
            '{%: $.LeadName %}',
            '{% } %}'
        ]),
        eventNameTemplate: new Simplate([
            '{%: moment($.StartDate).format($$.eventDateFormatText) %}',
            '&nbsp;-&nbsp;',
            '{%: moment($.EndDate).format($$.eventDateFormatText) %}'
        ]),
        noDataTemplate: new Simplate([
            '<div class="no-data"><h3>{%= $.noDataText %}</h3></div>'
        ]),
        eventRemainingContentNode: null,
        eventContentNode: null,
        attributeMap:{
            dateContent: {
                node: 'dateNode',
                type: 'innerHTML'
            }
        },

        //View Properties
        id: 'calendar_weeklist',
        cls: 'list activities-for-week',
        activityDetailView: 'activity_detail',
        eventDetailView: 'event_detail',
        monthView: 'calendar_monthlist',
        datePickerView: 'generic_calendar',
        activityListView: 'calendar_daylist',
        insertView: 'activity_types_list',
        userWeekStartDay: 0, // 0-6, Sun-Sat
        userWeekEndDay: 6,
        currentDate: null,
        enableSearch: false,
        hideSearch: true,
        expose: false,
        entryGroups: {},
        weekStartDate: null,
        weekEndDate: null,
        todayDate: null,
        typeIcons: {
            'defaultIcon': 'content/images/icons/To_Do_24x24.png',
            'atAppointment': 'content/images/icons/Meeting_24x24.png',
            'atPhoneCall': 'content/images/icons/Call_24x24.png',
            'atToDo': 'content/images/icons/To_Do_24x24.png',
            'atPersonal': 'content/images/icons/Personal_24x24.png'
        },

        queryWhere: null,
        queryOrderBy: 'StartDate asc',
        querySelect: [
            'Description',
            'StartDate',
            'Type',
            'AccountName',
            'ContactName',
            'LeadId',
            'LeadName',
            'UserId',
            'Timeless'
        ],
        eventQuerySelect: [
            'StartDate',
            'EndDate',
            'Description',
            'Type'
        ],
        activityIconByType: {
            'atToDo': 'content/images/icons/To_Do_24x24.png',
            'atPhoneCall': 'content/images/icons/Call_24x24.png',
            'atAppointment': 'content/images/icons/Meeting_24x24.png',
            'atLiterature': 'content/images/icons/Schedule_Literature_Request_24x24.gif',
            'atPersonal': 'content/images/icons/Personal_24x24.png',
            'atQuestion': 'content/images/icons/help_24.png',
            'atNote': 'content/images/icons/note_24.png',
            'atEMail': 'content/images/icons/letters_24.png'
        },
        eventIcon: 'content/images/icons/Holiday_schemes_24.png',


        contractName: 'system',
        pageSize: 105, // gives 15 activities per day
        eventPageSize: 5,
        resourceKind: 'activities',

        _onRefresh: function(o) {
            this.inherited(arguments);
            if (o.resourceKind === 'activities' || o.resourceKind === 'events')
            {
                this.refreshRequired = true;
            }
        },
        onStartup: function() {
            this.inherited(arguments);
            this.todayDate = moment().sod();
            this.currentDate = this.todayDate.clone();
        },
        toggleGroup: function(params) {
            var node = query(params.$source);
            if (node && node.parent()) {
                domClass.toggle(node, 'collapsed');
                domClass.toggle(node.parent(), 'collapsed-event');
            }
        },
        activateDayHeader: function(params) {
            this.currentDate = moment(params.date, 'YYYY-MM-DD');
            this.navigateToDayView();
        },
        getThisWeekActivities: function() {
            if (!this.isInCurrentWeek(this.todayDate))
            {
                this.currentDate = this.todayDate.clone();
                this.refresh();
            }
        },
        getStartDay: function(date) {
            return (date.day() === this.userWeekStartDay)
                    ? date.clone().sod()
                    : date.clone().day(this.userWeekStartDay, -1).sod();
        },
        getEndDay: function(date) {
            return (date.day() === this.userWeekEndDay)
                    ? date.clone().eod()
                    : date.clone().day(this.userWeekEndDay, 1).eod();
        },
        getNextWeekActivities: function() {
            this.currentDate = this.getStartDay(this.weekEndDate.clone().add({days:1}));
            this.refresh();
        },
        getPrevWeekActivities: function() {
            this.currentDate = this.getStartDay(this.weekStartDate.clone().add({days:-1}));
            this.refresh();
        },
        getTypeIcon: function(type) {
            return this.typeIcons[type] || this.typeIcons['defaultIcon'];
        },
        setWeekQuery: function() {
            var setDate = this.currentDate || this.todayDate;
            this.options = this.options || {};
            this.weekStartDate = this.getStartDay(setDate);
            this.weekEndDate = this.getEndDay(setDate);
            this.options['where'] =  string.substitute(
                    [
                        'UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (',
                        '(Timeless eq false and StartDate between @${1}@ and @${2}@) or ',
                        '(Timeless eq true and StartDate between @${3}@ and @${4}@))'
                    ].join(''),[
                    App.context['user'] && App.context['user']['$key'],
                    convert.toIsoStringFromDate(this.weekStartDate.toDate()),
                    convert.toIsoStringFromDate(this.weekEndDate.toDate()),
                    this.weekStartDate.format('YYYY-MM-DDT00:00:00\\Z'),
                    this.weekEndDate.format('YYYY-MM-DDT23:59:59\\Z')]
                );
        },
        setWeekTitle: function() {
            var start = this.getStartDay(this.currentDate),
                end = this.getEndDay(this.currentDate);

            this.set('dateContent', string.substitute('${0}-${1}',[
                start.format(this.weekTitleFormatText),
                end.format(this.weekTitleFormatText)
                ]));
        },
        setWeekStartDay: function() {
            this.userWeekStartDay = (this.options && this.options['startDay'])
                            ? this.options['startDay']
                            : this.userWeekStartDay;
            this.userWeekEndDay = this.getStartDay(moment()).add({days:6}).day();
        },
        isInCurrentWeek: function(date) {
            return (date.valueOf() > this.weekStartDate.valueOf() && date.valueOf() < this.weekEndDate.valueOf());
        },
        _processData: function(feed) {
            this.feed = feed;

            if (this.feed.length === 0)
            {
                domConstruct(this.noDataTemplate.apply(this), this.contentNode, 'last');
            }
            else
            {
                var todayNode = this.addTodayDom(),
                    entryGroups = this.entryGroups,
                    entryOrder = [],
                    dateCompareString = 'YYYY-MM-DD',
                    o = [];

                if (todayNode && !entryGroups[this.todayDate.format(dateCompareString)])
                    entryGroups[this.todayDate.format(dateCompareString)] = [todayNode];

                for (var i = 0; i < feed.length; i++)
                {
                    var currentEntry = feed[i],
                        startDate = convert.toDateFromString(currentEntry.StartDate);

                    if (currentEntry.Timeless)
                    {
                        startDate = this.dateToUTC(startDate);
                    }
                    currentEntry['StartDate'] = startDate;
                    currentEntry['isEvent'] = false;
                    this.items[currentEntry.$key] = currentEntry;

                    var currentDateCompareKey = moment(currentEntry.StartDate).format(dateCompareString);
                    var currentGroup = entryGroups[currentDateCompareKey];
                    if (currentGroup)
                    {
                        if (currentEntry['Timeless'])
                        {
                            currentGroup.splice(1, 0, this.rowTemplate.apply(currentEntry, this));
                        }
                        else
                        {
                            currentGroup.push(this.rowTemplate.apply(currentEntry, this));
                        }
                        continue;
                    }
                    currentGroup = [this.groupTemplate.apply(currentEntry, this)];
                    currentGroup.push(this.rowTemplate.apply(currentEntry, this));
                    entryGroups[currentDateCompareKey] = currentGroup;
                }

                for (var entryGroup in entryGroups )
                {
                    entryOrder.push(moment(entryGroup, dateCompareString));
                }

                entryOrder.sort(function(a, b) {
                    return a.valueOf() < b.valueOf();
                });

                for (var i = 0; i < entryOrder.length; i++)
                {
                    o.push(entryGroups[entryOrder[i].format(dateCompareString)].join('') + this.groupEndTemplate.apply(this));
                }

                if (o.length > 0)
                    domConstruct.place(o.join(''), this.contentNode, 'only');
            }

        },
        addTodayDom: function() {
            if (!this.isInCurrentWeek(this.todayDate)) return null;

            var todayEntry = {
                    StartDate: this.todayDate.toDate(),
                    headerClass: 'currentDate'
                };

            return this.groupTemplate.apply(todayEntry, this);
        },
        dateToUTC: function(date) {
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
            alert(string.substitute(this.requestErrorText, [response, o]));
            var errorItem = {
                viewOptions: this.options,
                serverError: response
            };
            ErrorManager.addError(this.requestErrorText, errorItem);
        },
        onRequestEventDataAborted: function(response, o) {
            var errorItem = {
                viewOptions: this.options,
                serverError: response
            };
            ErrorManager.addError(this.requestErrorText, errorItem);

            this.options = false; // force a refresh
        },
        onRequestEventDataSuccess: function(feed) {
            this.processEventFeed(feed);
        },
        createEventRequest: function() {
            var querySelect = this.eventQuerySelect,
                queryWhere = this.getEventQuery(),
                request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getConnection())
                .setCount(this.eventPageSize)
                .setStartIndex(1)
                .setResourceKind('events')
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(querySelect).join(','))
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, queryWhere);
            return request;
        },
        getEventQuery: function() {
            var startDate = this.weekStartDate,
                endDate = this.weekEndDate;
            return string.substitute(
                    [
                        'UserId eq "${0}" and (',
                            '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
                            'StartDate lt @${2}@',
                        ')'
                    ].join(''),
                    [App.context['user'] && App.context['user']['$key'],
                    startDate.format('YYYY-MM-DDT00:00:00\\Z'),
                    endDate.format('YYYY-MM-DDT23:59:59\\Z')]
                );
        },
        hideEventList: function() {
            domClass.add(this.eventContainerNode, 'event-hidden');
        },
        showEventList: function() {
            domClass.remove(this.eventContainerNode, 'event-hidden');
        },
        processEventFeed: function(feed) {
            var o = [],
                feedLength = feed['$resources'].length;

            if (feedLength === 0)
            {
                this.hideEventList();
                return false;
            }
            else
            {
                this.showEventList();
            }

            for (var i = 0; i < feedLength; i++)
            {
                var event = feed['$resources'][i];
                event['isEvent'] = true;
                event['StartDate'] = moment(convert.toDateFromString(event.StartDate));
                event['EndDate'] = moment(convert.toDateFromString(event.EndDate));
                this.items[event.$key] = event;
                o.push(this.eventRowTemplate.apply(event, this));
            }

            if (feed['$totalResults'] > feedLength)
            {
                domClass.add(this.eventContainerNode, 'list-has-more');
                domConstruct.place(string.substitute(this.eventMoreText, [feed['$totalResults'] - feedLength]), this.eventRemainingContentNode, 'only');
            }
            else
            {
                domClass.remove(this.eventContainerNode, 'list-has-more');
                domConstruct.empty(this.eventRemainingContentNode);
            }

            domConstruct(o.join(''), this.eventContentNode);
        },
        refresh: function() {
            var startDate = this.currentDate.clone();
            this.setWeekStartDay();
            this.currentDate = startDate.clone();
            this.setWeekTitle();
            this.setWeekQuery();

            this.clear();
            this._requestData();
            this.requestEventData();
        },
        activate: function(options) {
            if (options)
                this.processShowOptions(options);
            
            this.setDefaultOptions();
            this.inherited(arguments, [this.options]);
        },
        processShowOptions: function(options) {
            if (options.currentDate)
            {
                this.currentDate = moment(options.currentDate).sod() || moment().sod();
                this.refreshRequired = true;
            }
        },
        setDefaultOptions: function() {
            if (typeof this.options === 'undefined')
                this.options = {};

            if (typeof this.options['startDay'] === 'undefined')
            {
                this.options['startDay'] = (App.context.userOptions)
                    ? parseInt(App.context.userOptions['Calendar:FirstDayofWeek'], 10)
                    : this.userWeekStartDay;
            }

            this.setWeekTitle();
            this.setWeekQuery();
        },
        activateEventMore: function() {
            var where = this.getEventQuery();
            scene().showView('event_related', {"where": where});
        },
        clear: function() {
            this.inherited(arguments);
            this.entryGroups = {};
            domConstruct.empty(this.eventContentNode);
        },
        selectEntry: function(params) {
            var row = query(params.$source).closest('[data-key]')[0],
                key = row ? row.getAttribute('data-key') : false;

            this.navigateToDetailView(key);
        },
        selectDate: function() {
            var options = {
                date: this.currentDate.toDate(),
                showTimePicker: false,
                timeless: false,
                tools: {
                    top: [{
                        id: 'complete',
                        fn: this.selectDateSuccess,
                        scope: this
                    },{
                        id: 'cancel',
                        place: 'left',
                        fn: scene().back(),
                        scope: this
                    }]
                    }
                };

            scene().showView(this.datePickerView, options);
        },
        selectDateSuccess: function() {
            var view = App.scene.getView(this.datePickerView);
            this.currentDate = moment(view.getDateTime()).sod();
            this.refresh();
            scene().back();
        },
        navigateToDayView: function() {
            var options = {currentDate: this.currentDate.valueOf() || moment().sod().valueOf()};
            scene().showView(this.activityListView, options);
        },
        navigateToMonthView: function() {
            var options = {currentDate: this.currentDate.valueOf() || moment().sod().valueOf()};
            scene().showView(this.monthView, options);
        },
        navigateToInsertView: function(el) {
            this.options.currentDate = this.currentDate.format('yyyy-MM-dd') || Date.today();
            scene().showView(this.insertView || this.editView, {
                negateHistory: true,
                returnTo: this.id,
                insert: true
            });
        },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.items[key],
                detailView = (entry.isEvent) ? this.eventDetailView : this.activityDetailView;

            descriptor = (entry.isEvent) ? descriptor : entry.Description;
            scene().showView(detailView, {
                descriptor: descriptor,
                key: key
            });
        }
    });
});