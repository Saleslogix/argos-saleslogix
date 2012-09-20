define('Mobile/SalesLogix/Views/Calendar/DayView', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/query',
    'dojo/dom-class',
    'Argos/ErrorManager',
    'Argos/Convert',
    'Argos/List',
    'Argos/_SDataListMixin',
    'Argos/ScrollContainer',
    'Argos/SearchWidget',
    'argos!scene'
], function(
    declare,
    string,
    query,
    domClass,
    ErrorManager,
    convert,
    List,
    _SDataListMixin,
    ScrollContainer,
    SearchWidget,
    scene
) {

    return declare('Mobile.SalesLogix.Views.Calendar.DayView', [List, _SDataListMixin], {
        // Localization
        titleText: 'Calendar',
        dateHeaderFormatText: 'dddd, MM/DD/YYYY',
        startTimeFormatText: 'h:mm',
        todayText: 'Today',
        dayText: 'Day',
        weekText: 'Week',
        monthText: 'Month',
        allDayText: 'All-Day',
        eventHeaderText: 'Events',
        activityHeaderText: 'Activities',
        eventMoreText: 'View ${0} More Event(s)',
        toggleCollapseText: 'toggle collapse',

        components: [
            {name: 'search', type: SearchWidget, attachEvent: 'onQuery:_onSearchQuery,onClear:_onSearchClear'},
            {name: 'fix', content: '<a href="#" class="android-6059-fix">fix for android issue #6059</a>'},
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', components: [
                {name: 'scroll', tag: 'div', components: [
                    {name: 'navigation', tag: 'div', components: [
                        {name: 'splitButtons', tag: 'div', attrs: {'class': 'split-buttons'}, components: [
                            {name: 'butToday', content: Simplate.make('<button data-command="today" data-action="getToday" class="button">{%: $.todayText %}</button>')},
                            {name: 'butSelectDate', content: '<button data-command="selectdate" data-action="selectDate" class="button"><span></span></button>'},
                            {name: 'butDay', content: Simplate.make('<button data-command="day" class="button">{%: $.dayText %}</button>')},
                            {name: 'butWeek', content: Simplate.make('<button data-command="week" data-action="navigateToWeekView" class="button">{%: $.weekText %}</button>')},
                            {name: 'butMonth', content: Simplate.make('<button data-command="month" data-action="navigateToMonthView" class="button">{%: $.monthText %}</button>')}
                        ]},
                        {name: 'navBar', tag: 'div', attrs: {'class': 'nav-bar'}, components: [
                            {name: 'next', content: '<button data-command="next" data-action="getNextDay" class="button button-next"><span></span></button>'},
                            {name: 'prev', content: '<button data-command="prev" data-action="getPrevDay" class="button button-prev"><span></span></button>'},
                            {name: 'dateNode', tag: 'h3', attrs: {'class': 'date-text'}, attachPoint: 'dateNode'}
                        ]}
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
                    {name: 'activityHeader', content: Simplate.make('<h2>{%= $.activityHeaderText %}</h2>')},
                    {name: 'content', tag: 'ul', attrs: {'class': 'list-content'}, attachPoint: 'contentNode'},
                    {name: 'more', tag: 'div', attrs: {'class': 'list-more'}, components: [
                        {name: 'moreRemaining', tag: 'span', attrs: {'class': 'list-remaining'}, attachPoint: 'remainingContentNode'},
                        {name: 'moreButton', content: Simplate.make('<button class="button" data-action="more"><span>{%: $.moreText %}</span></button>')}
                    ]}
                ]}
            ]}
        ],

        // Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.Description %}" data-activity-type="{%: $.Type %}">',
            '<table class="calendar-entry-table"><tr>',
            '<td class="entry-table-icon">',
            '<button data-action="selectEntry" class="list-item-selector button">',
                '<img src="{%= $$.activityIconByType[$.Type] || $$.icon || $$.selectIcon %}" class="icon" />',
            '</button>',
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
            '<button data-action="selectEntry" class="list-item-selector button">',
            '<img src="{%= $$.eventIcon %}" class="icon" /></button>',
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
        datePickerView: 'generic_calendar',
        monthView: 'calendar_monthlist',
        weekView: 'calendar_weeklist',
        activityDetailView: 'activity_detail',
        eventDetailView: 'event_detail',
        insertView: 'activity_types_list',
        enableSearch: false,
        hideSearch: true,
        currentDate: null,
        contractName: 'system',
        queryOrderBy: 'Timeless desc, StartDate',
        querySelect: [
            'Description',
            'StartDate',
            'Type',
            'AccountName',
            'ContactName',
            'LeadId',
            'LeadName',
            'UserId',
            'Timeless',
            'Recurring'
        ],
        eventFeed: null,
        eventPageSize: 3,
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
            this.currentDate = moment().sod();
        },
        toggleGroup: function(params) {
            var node = params.$source;
            if (node && node.parentNode) {
                domClass.toggle(node, 'collapsed');
                domClass.toggle(node.parentNode, 'collapsed-event');
            }
        },
        refresh: function() {
            this.clear();

            this.options = this.options || {};
            this.options['where'] = this.formatQueryForActivities();
            this.feed = null;
            this.eventFeed = null;
            this.set('dateContent', moment(this.currentDate).format(this.dateHeaderFormatText));

            this._requestData();
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
            var eventSelect = this.eventQuerySelect,
                eventWhere = this.getEventQuery(),
                request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getConnection())
                .setCount(this.eventPageSize)
                .setStartIndex(1)
                .setResourceKind('events')
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.expandExpression(eventSelect).join(','))
                .setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, eventWhere);
            return request;
        },
        getEventQuery: function() {
            return string.substitute(
                    [
                        'UserId eq "${0}" and (',
                            '(StartDate gt @${1}@ or EndDate gt @${1}@) and ',
                            'StartDate lt @${2}@',
                        ')'
                    ].join(''),
                [
                    App.context['user'] && App.context['user']['$key'],
                    convert.toIsoStringFromDate(this.currentDate.sod().toDate()),
                    convert.toIsoStringFromDate(this.currentDate.eod().toDate())
                ]
                );
        },
        activateEventMore: function() {
            var where = this.getEventQuery();
            scene().showView('event_related', {"where": where});
        },
        hideEventList: function() {
            domClass.add(this.eventContainerNode, 'event-hidden');
        },
        showEventList: function() {
            domClass.remove(this.eventContainerNode, 'event-hidden');
        },
        processEventFeed: function(feed) {
            var r = feed['$resources'],
                feedLength = r.length,
                o = [];
            this.eventFeed = feed;

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
                var row = r[i];
                row.isEvent = true;
                this.items[row.$key] = row;
                o.push(this.eventRowTemplate.apply(row, this));
            }


            if (feed['$totalResults'] > feedLength)
            {
                domClass.add(this.eventContainerNode, 'list-has-more');
                this.set('eventRemainingContent', string.substitute(this.eventMoreText, [feed['$totalResults'] - feedLength]));
            }
            else
            {
                domClass.remove(this.eventContainerNode, 'list-has-more');
                this.set('eventRemainingContent', '');
            }

            this.set('eventListContent', o.join(''));
        },
        processFeed: function(feed) {
            var r = feed['$resources'],
                feedLength = r.length,
                o = [];

            this.feed = feed;
            for (var i = 0; i < feedLength; i++)
            {
                var row = r[i];
                row.isEvent = false;
                this.items[row.$key] = row;
                o.push(this.rowTemplate.apply(row, this));
            }

            if (feedLength === 0)
            {
                this.set('listContent', this.noDataTemplate.apply(this));
                return false;
            }

            this.set('listContent', o.join(''));
        },

        activate: function(options) {
            if (options)
                this.processShowOptions(options);

            options = options || {};
            options['where'] = this.formatQueryForActivities();

            this.set('dateContent', moment(this.currentDate).format(this.dateHeaderFormatText));
            this.inherited(arguments, [options]);
        },
        processShowOptions: function(options) {
            if (options.currentDate)
            {
                this.currentDate = moment(options.currentDate).sod() || moment().sod();
                this.refreshRequired = true;
            }
        },
        isLoading: function() {
            return domClass.contains(this.domNode, 'list-loading');
        },
        getNextDay: function() {
            if (this.isLoading()) return;
            
            this.currentDate.add({days: 1});
            this.refresh();
        },
        getToday: function() {
            if (this.isLoading()) return;
            if (this.currentDate == moment().sod()) return;

            this.currentDate = moment().sod();
            this.refresh();
        },
        getPrevDay: function() {
            if (this.isLoading()) return;

            this.currentDate.add({days: -1});
            this.refresh();
        },
        formatQueryForActivities: function() {
            var queryWhere = [
                'UserActivities.UserId eq "${0}" and Type ne "atLiterature" and (',
                '(Timeless eq false and StartDate between @${1}@ and @${2}@) or ',
                '(Timeless eq true and StartDate between @${3}@ and @${4}@))'
            ].join('');

            var startDate = this.currentDate.toDate(),
                endDate = this.currentDate.clone().add({days: 1, seconds: -1}).toDate();

            return string.substitute(
                queryWhere,
                [App.context['user'] && App.context['user']['$key'],
                convert.toIsoStringFromDate(startDate),
                convert.toIsoStringFromDate(endDate),
                this.currentDate.format('YYYY-MM-DDT00:00:00\\Z'),
                this.currentDate.format('YYYY-MM-DDT23:59:59\\Z')]
            );
        },
        selectEntry: function(params) {
            var row = query(params.$source).closest('[data-key]')[0],
                key = row ? row.getAttribute('data-key') : false;

            this.navigateToDetailView(key);
        },
        selectDate: function() {
            var options = {
                date: this.currentDate,
                showTimePicker: false,
                timeless: false,
                tools: {
                    top: [{
                        id: 'complete',
                        fn: this.selectDateSuccess,
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
        navigateToWeekView: function() {
            var navDate = this.currentDate ? this.currentDate : moment().sod(),
                options = {currentDate: navDate.valueOf()};
            scene().showView(this.weekView, options);
        },
        navigateToMonthView: function() {
            var navDate = this.currentDate ? this.currentDate : moment().sod(),
                options = {currentDate: navDate.valueOf()};
            scene().showView(this.monthView, options);
        },
        navigateToInsertView: function(el) {
            this.options.currentDate = this.currentDate.toString('yyyy-MM-dd') || moment().sod();
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