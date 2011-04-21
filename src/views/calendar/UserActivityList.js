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
            monthButtonEl: '.button[data-tool="month"]'
        }, L.prototype.attachmentPoints),
                
        //Templates
        viewTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
            '{%! $.searchTemplate %}',
            '{%! $.navigationTemplate %}',
            '<ul class="list-content"></ul>',
            '{%! $.moreTemplate %}',
            '</div>'
        ]),
        itemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
        timeTemplate: new Simplate([
            '{% if ($.Activity.Timeless) { %}',
            '<span class="p-meridiem">All-Day</span>',
            '{% } else { %}',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "h:mm") %}</span>',
            '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "tt") %}</span>,',
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
        contentTemplate: new Simplate([
            '<h3>',
            '{%= $$.timeTemplate.apply($) %}',
            '<span class="p-description">&nbsp;{%: $.Activity.Description %}</span>',
            '</h3>',
            '<h4>{%= $$.nameTemplate.apply($) %}</h4>'
        ]),
        navigationTemplate: new Simplate([
            '<div class="split-buttons">',
            '<button data-tool="today" data-action="getTodayActivities" class="button">{%: $.todayText %}</button>',
            '<button data-tool="day" data-action="getDayActivities" class="button">{%: $.dayText %}</button>',
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
        todayText: 'Today',
        dayText: 'Day',
        monthText: 'Month',

        //View Properties
        id: 'useractivity_list',
        cls: 'activities-for-day',
        icon: 'content/images/icons/Calendar_24x24.png',
        monthView: 'slx_calendar',
        detailView: 'activity_detail',
        insertView: 'activity_types_list',
        hideSearch: true,
        currentDate: null,
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

            this.currentDate = Date.today();
        },
        show: function(options) {
            options = options || {};
            options['where'] = this.formatQueryForActivities();

            this.dateTextEl.update(this.currentDate.toString(this.dateHeaderFormatText));

            Mobile.SalesLogix.Calendar.UserActivityList.superclass.show.call(this, options);
        },
        getNextActivities: function() {
            if (this.el.hasClass('list-loading')) return;

            this.currentDate.add({day: 1});
            this.getActivities();
        },
        getTodayActivities: function() {
            if (this.el.hasClass('list-loading')) return;
            if (this.currentDate.equals(Date.today())) return;

            this.currentDate = Date.today();
            this.getActivities();
        },
        getPrevActivities: function() {
            if (this.el.hasClass('list-loading')) return;

            this.currentDate.add({day: -1});
            this.getActivities();
        },
        getActivities: function() {
            this.clear();

            this.options = this.options || {};
            this.options['where'] = this.formatQueryForActivities();
            
            this.dateTextEl.update(this.currentDate.toString(this.dateHeaderFormatText));

            this.requestData();
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
            var view = App.getView(this.monthView);
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
