/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Calendar/WeekView', [
    'dojo/_base/declare',
    'dojo/query',
    'dojo/string',
    'dojo/dom-construct',
    'dojo/dom-class',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/List',
    'Mobile/SalesLogix/Format',
    'moment'
], function(
    declare,
    query,
    string,
    domConstruct,
    domClass,
    ErrorManager,
    convert,
    List,
    format,
    moment
) {

    return declare('Mobile.SalesLogix.Views.Calendar.WeekView', [List], {
        //Localization
        titleText: 'Calendar',
        weekTitleFormatText: 'MMM D, YYYY',
        dayHeaderLeftFormatText: 'dddd',
        dayHeaderRightFormatText: 'MMM D, YYYY',
        eventDateFormatText: 'M/D/YYYY',
        startTimeFormatText: 'h:mm A',
        todayText: 'Today',
        dayText: 'Day',
        weekText: 'Week',
        monthText: 'Month',
        allDayText: 'All Day',
        eventHeaderText: 'Events',
        eventMoreText: 'View ${0} More Event(s)',
        toggleCollapseText: 'toggle collapse',

        // Templates
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="overthrow {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
                '<div data-dojo-attach-point="searchNode"></div>',
                '{%! $.navigationTemplate %}',
                '<div style="clear:both"></div>',
                '<div class="event-content event-hidden" data-dojo-attach-point="eventContainerNode">',
                    '<h2 data-action="toggleGroup">{%= $.eventHeaderText %}<button class="collapsed-indicator" aria-label="{%: $$.toggleCollapseText %}"></button></h2>',
                    '<ul class="list-content" data-dojo-attach-point="eventContentNode"></ul>',
                    '{%! $.eventMoreTemplate %}',
                '</div>',
                '<div class="list-content" data-dojo-attach-point="contentNode"></div>',
                '{%! $.moreTemplate %}',
            '</div>'
        ]),
        navigationTemplate: new Simplate([
            '<div class="split-buttons">',
            '<button data-tool="today" data-action="getThisWeekActivities" class="button">{%: $.todayText %}</button>',
            '<button data-tool="selectdate" data-action="selectDate" class="button"><span></span></button>',
            '<button data-tool="day" data-action="navigateToDayView" class="button">{%: $.dayText %}</button>',
            '<button data-tool="week" class="button">{%: $.weekText %}</button>',
            '<button data-tool="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>',
            '</div>',
            '<div class="nav-bar">',
            '<button data-tool="next" data-action="getNextWeekActivities" class="button button-next"><span></span></button>',
            '<button data-tool="prev" data-action="getPrevWeekActivities" class="button button-prev"><span></span></button>',
            '<h3 class="date-text" data-dojo-attach-point="dateNode"></h3>',
            '</div>'
        ]),
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
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.StartDate, $$.startTimeFormatText) %}</span>',
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
        eventMoreTemplate: new Simplate([
            '<div class="list-more" data-dojo-attach-point="eventMoreNode">',
            '<button class="button" data-action="activateEventMore">',
            '<span data-dojo-attach-point="eventRemainingContentNode">{%= $$.eventMoreText %}</span>',
            '</button>',
            '</div>'
        ]),
        noDataTemplate: new Simplate([
            '<div class="no-data"><h3>{%= $.noDataText %}</h3></div>'
        ]),
        eventRemainingContentNode: null,
        eventContentNode: null,
        attributeMap: {
            listContent: {
                node: 'contentNode',
                type: 'innerHTML'
            },
            dateContent: {
                node: 'dateNode',
                type: 'innerHTML'
            },
            eventListContent: {
                node: 'eventContentNode',
                type: 'innerHTML'
            },
            eventRemainingContent: {
                node: 'eventRemainingContentNode',
                type: 'innerHTML'
            },
            remainingContent: {
                node: 'remainingContentNode',
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
        currentDate: null,
        enableSearch: false,
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
        continuousScrolling: false,

        queryWhere: null,
        queryOrderBy: 'StartDate desc',
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
            if (o.resourceKind === 'activities' || o.resourceKind === 'events') {
                this.refreshRequired = true;
            }
        },
        init: function() {
            this.inherited(arguments);
            this.todayDate = moment().startOf('day');
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
            if (!this.isInCurrentWeek(this.todayDate)) {
                this.currentDate = this.todayDate.clone();
                this.refresh();
            }
        },
        getStartDay: function(date) {
            return date.clone().startOf('week');
        },
        getEndDay: function(date) {
            return date.clone().endOf('week');
        },
        getNextWeekActivities: function() {
            this.currentDate = this.getStartDay(this.weekEndDate.clone().add({days:1}));
            this.refresh();
        },
        getPrevWeekActivities: function() {
            this.currentDate = this.getStartDay(this.weekStartDate.clone().subtract({days:1}));
            this.refresh();
        },
        getTypeIcon: function(type) {
            return this.typeIcons[type] || this.typeIcons['defaultIcon'];
        },
        setWeekQuery: function() {
            var setDate = this.currentDate || this.todayDate;
            this.weekStartDate = this.getStartDay(setDate);
            this.weekEndDate = this.getEndDay(setDate);
            this.queryWhere = string.substitute(
                [
                    'UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (',
                    '(Timeless eq false and StartDate between @${1}@ and @${2}@) or ',
                    '(Timeless eq true and StartDate between @${3}@ and @${4}@))'
                ].join(''), [
                    App.context['user'] && App.context['user']['$key'],
                    convert.toIsoStringFromDate(this.weekStartDate.toDate()),
                    convert.toIsoStringFromDate(this.weekEndDate.toDate()),
                    this.weekStartDate.format('YYYY-MM-DDT00:00:00[Z]'),
                    this.weekEndDate.format('YYYY-MM-DDT23:59:59[Z]')]
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
        isInCurrentWeek: function(date) {
            return (date.valueOf() > this.weekStartDate.valueOf() && date.valueOf() < this.weekEndDate.valueOf());
        },
        processFeed: function(feed) {
            this.feed = feed;

            var todayNode = this.addTodayDom(),
                entryGroups = this.entryGroups,
                entryOrder = [],
                dateCompareString = 'YYYY-MM-DD',
                o = [],
                i, 
                currentEntry,
                entryOrderLength,
                remaining,
                startDate;

            if (this.feed['$totalResults'] === 0) {
                query(this.contentNode).append(this.noDataTemplate.apply(this));
            } else if (feed['$resources']) {

                if (todayNode && !entryGroups[this.todayDate.format(dateCompareString)]) {
                    entryGroups[this.todayDate.format(dateCompareString)] = [todayNode];
                }

                for (i = 0; i < feed['$resources'].length; i++) {
                    currentEntry = feed['$resources'][i];
                    startDate = convert.toDateFromString(currentEntry.StartDate);
                    if (currentEntry.Timeless) {
                        startDate = this.dateToUTC(startDate);
                    }
                    currentEntry['StartDate'] = startDate;
                    currentEntry['isEvent'] = false;
                    this.entries[currentEntry.$key] = currentEntry;

                    var currentDateCompareKey = moment(currentEntry.StartDate).format(dateCompareString);
                    var currentGroup = entryGroups[currentDateCompareKey];
                    if (currentGroup) {
                        if (currentEntry.Timeless) {
                            currentGroup.splice(1, 0, this.rowTemplate.apply(currentEntry, this));
                        } else {
                            currentGroup.push(this.rowTemplate.apply(currentEntry, this));
                        }
                        continue;
                    }
                    currentGroup = [this.groupTemplate.apply(currentEntry, this)];
                    currentGroup.push(this.rowTemplate.apply(currentEntry, this));
                    entryGroups[currentDateCompareKey] = currentGroup;
                }

                for (var entryGroup in entryGroups) {
                    entryOrder.push(moment(entryGroup, dateCompareString));
                }

                entryOrder.sort(function(a, b) {
                    if (a.valueOf() < b.valueOf()) {
                        return 1;
                    } else if (a.valueOf() > b.valueOf()) {
                        return -1;
                    }

                    return 0;
                });

                entryOrderLength = entryOrder.length;
                for (i = 0; i < entryOrderLength; i++) {
                    o.push(entryGroups[entryOrder[i].format(dateCompareString)].join('') + this.groupEndTemplate.apply(this));
                }

                if (o.length > 0) {
                    this.set('listContent', o.join(''));
                }
            }

            if (typeof this.feed['$totalResults'] !== 'undefined') {
                remaining = this.feed['$totalResults'] - (this.feed['$startIndex'] + this.feed['$itemsPerPage'] - 1);
                this.set('remainingContent', string.substitute(this.remainingText, [remaining]));
            }

            domClass.toggle(this.domNode, 'list-has-more', this.hasMoreData());
            this._loadPreviousSelections();
        },
        addTodayDom: function() {
            if (!this.isInCurrentWeek(this.todayDate)) {
                return null;
            }

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
            ErrorManager.addError(response, o, this.options, 'failure');
        },
        onRequestEventDataAborted: function(response, o) {
            this.options = false; // force a refresh
            ErrorManager.addError(response, o, this.options, 'aborted');
        },
        onRequestEventDataSuccess: function(feed) {
            this.processEventFeed(feed);
        },
        createEventRequest: function() {
            var querySelect = this.eventQuerySelect,
                queryWhere = this.getEventQuery(),
                request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
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
                    startDate.format('YYYY-MM-DDT00:00:00[Z]'),
                    endDate.format('YYYY-MM-DDT23:59:59[Z]')]
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

            if (feedLength === 0) {
                this.hideEventList();
                return false;
            } else {
                this.showEventList();
            }

            for (var i = 0; i < feedLength; i++) {
                var event = feed['$resources'][i];
                event['isEvent'] = true;
                event['StartDate'] = moment(convert.toDateFromString(event.StartDate));
                event['EndDate'] = moment(convert.toDateFromString(event.EndDate));
                this.entries[event.$key] = event;
                o.push(this.eventRowTemplate.apply(event, this));
            }

            if (feed['$totalResults'] > feedLength) {
                domClass.add(this.eventContainerNode, 'list-has-more');
                this.set('eventRemainingContent', string.substitute(this.eventMoreText, [feed['$totalResults'] - feedLength]));
            } else {
                domClass.remove(this.eventContainerNode, 'list-has-more');
                domConstruct.empty(this.eventRemainingContentNode);
            }

             this.set('eventListContent', o.join(''));
        },
        refresh: function() {
            var startDate = this.currentDate.clone();
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
            if (options) {
                this.processShowOptions(options);
            }

            this.inherited(arguments);
        },
        processShowOptions: function(options) {
            if (options.currentDate) {
                this.currentDate = moment(options.currentDate).startOf('day') || moment().startOf('day');
                this.refreshRequired = true;
            }
        },
        activateEventMore: function() {
            var view = App.getView("event_related"),
                where = this.getEventQuery();
            if (view) {
                view.show({"where": where});
            }
        },
        clear: function() {
            this.inherited(arguments);
            this.entryGroups = {};
            this.set('eventContent', '');
            this.set('listContent', '');
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
                    tbar: [{
                            id: 'complete',
                            fn: this.selectDateSuccess,
                            scope: this
                        }, {
                            id: 'cancel',
                            side: 'left',
                            fn: ReUI.back,
                            scope: ReUI
                        }]
                }
            },
                view = App.getView(this.datePickerView);
            if (view) {
                view.show(options);
            }
        },
        selectDateSuccess: function() {
            var view = App.getPrimaryActiveView();
            this.currentDate = moment(view.getDateTime()).startOf('day');
            this.refresh();
            ReUI.back();
        },
        navigateToDayView: function() {
            var view = App.getView(this.activityListView),
                options = {currentDate: this.currentDate.toDate().valueOf() || moment().startOf('day').valueOf()};
            view.show(options);
        },
        navigateToMonthView: function() {
            var view = App.getView(this.monthView),
                options = {currentDate: this.currentDate.toDate().valueOf() || moment().startOf('day').valueOf()};
            view.show(options);
        },
        navigateToInsertView: function(el) {
            var view = App.getView(this.insertView || this.editView);

            this.options.currentDate = this.currentDate.format('YYYY-MM-DD') || Date.today();
            if (view) {
                view.show({
                    negateHistory: true,
                    returnTo: this.id,
                    insert: true
                });
            }
        },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.entries[key],
                detailView = (entry.isEvent) ? this.eventDetailView : this.activityDetailView,
                view = App.getView(detailView);

            descriptor = (entry.isEvent) ? descriptor : entry.Description;

            if (view) {
                view.show({
                    descriptor: descriptor,
                    key: key
                });
            }
        }
    });
});

