/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Calendar");

(function() {    
    Mobile.SalesLogix.Calendar.UserActivityList = Ext.extend(Sage.Platform.Mobile.List, {
        currentDate: (new Date()),
        
        //Templates
        itemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
        activityTimeTemplate: new Simplate([
            '{% if ($.Activity.Timeless) { %}',
            '<span class="p-meridiem">Timeless</span>',
            '{% } else { %}',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "h:mm") %}</span>',
            '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "tt") %}</span>,',
            '{% } %}'
        ]),
        contentTemplate: new Simplate([
            '<h3>',
            '{%= $$.activityTimeTemplate.apply($) %}',
            '<span class="p-description">&nbsp;{%: $.Activity.Description %}</span>',
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
        viewTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '{%! $.searchTemplate %}',
            '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
            '<div class="split-buttons">',
            '<button data-tool="today" data-action="getTodayActivities" class="button headerButton active">Today</button>',
            '<button data-tool="day" class="button">Day</button>',
            '<button data-tool="month" data-action="navigateToMonthView" class="button">Month</button>',
            '</div>',
            '<div class="nav-bar">',
            '<h3 class="date-text"></h3>',
            '<button data-tool="next" data-action="getNextActivities" class="button button-next lightGreenButton"><span></span></button>',
            '<button data-tool="prev" data-action="getPrevActivities" class="button button-prev lightGreenButton"><span></span></button>',
            '</div>',
            '<ul class="list-content"></ul>',
            '{%! $.moreTemplate %}',
            '</div>'
        ]),

        //Localization
        titleText: 'Calendar',      

        //View Properties
        hideSearch: true,
        id: 'useractivity_list',
        icon: 'content/images/icons/Calendar_24x24.png',
        detailView: 'activity_detail',
        detailViewForLead: 'activity_detail_for_lead',
        insertView: 'activity_types_list',
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
        
        init: function() {
            Ext.apply(this.attachmentPoints, {
                dateTextEl: '.date-text',
                splitButton: '.split-buttons',
                todayButton: '.button[data-tool="today"]',
                dayButton: '.button[data-tool="day"]',
                monthButton: '.button[data-tool="month"]'
            });

            Mobile.SalesLogix.Calendar.UserActivityList.superclass.init.apply(this, arguments);
        },
        initEvents: function() {
            Mobile.SalesLogix.Calendar.UserActivityList.superclass.initEvents.apply(this, arguments);

            App.on('refresh', this.refreshOnActivityInsert, this);
        },
        refreshOnActivityInsert: function(o) {
            if (o.resourceKind === 'activities')
            {
                this.refreshRequired = true;
            }
        },
        show: function(options) {
            if (!options) options = {};
            options['where'] = this.formatQueryForActivities();
            this.setNavBarTitle();

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
        getActivities: function(date) {
            this.clear();
            this.setOptions();
            this.setSplitButtonStatus();
            this.requestData();
        },
        setNavBarTitle: function() {
            this.dateTextEl.update(this.currentDate.toString('dddd, MM/dd/yyyy'));
        },
        getUTCDateString: function(date) {
            var pad = function(n) { return n < 10 ? '0' + n : n };

            return String.format('{0}-{1}-{2}T{3}:{4}:{5}',
                date.getUTCFullYear(),
                pad(date.getUTCMonth() + 1 ),
                pad(date.getUTCDate()),
                pad(date.getUTCHours()),
                pad(date.getUTCMinutes()),
                pad(date.getUTCSeconds())
            );
        },
        formatQueryForActivities: function() {
            var qry = 'UserId eq "{0}" and (Activity.StartDate between @{1}@ and @{2}@) '
                      + 'or (Activity.Timeless eq true and Activity.StartDate between @{3}@ and @{4}@)';

            return String.format(
                qry,
                App.context.user.$key,
                this.getUTCDateString(this.currentDate),
                this.getUTCDateString(this.currentDate.clone().add({day: 1, second: -1})),
                this.currentDate.toString('yyyy-MM-ddT00:00:00'),
                this.currentDate.toString('yyyy-MM-ddT23:59:59')
            );
        },
        setOptions: function() {
            if (!this.options) this.options = {};
            this.options['where'] = this.formatQueryForActivities();
            this.setNavBarTitle();
        },
        setSplitButtonStatus: function() {
            [this.todayButton, this.dayButton, this.monthButton].forEach(function(el){
                el.addClass(['headerButton']);
            });

            if (this.currentDate.equals(Date.today()))
            {
                this.dayButton.removeClass(['headerButton']);
                this.monthButton.removeClass(['headerButton']);
            }
            else
            {
                this.todayButton.removeClass(['headerButton']);
                this.monthButton.removeClass(['headerButton']);
            }
        },
        isActivityForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        navigateToMonthView: function() {
            var view = App.getView('slx_calendar');

            if (view)
            {
                view.show({
                    tools: {
                        tbar: [{
                            id: 'cancel',
                            side: 'left',
                            fn: ReUI.back,
                            scope: ReUI
                        }]
                    }
                });
            }
        },
        isActivityForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        navigateToDetailView: function(key, descriptor) {
            var entry = this.entries[key],
                activity = entry.Activity;

            if (this.isActivityForLead(activity))
            {
                var view = App.getView(this.detailViewForLead);
                if (view)
                    view.show({
                        descriptor: activity.Description,
                        key: activity.$key
                    });
            }
            else
            {
                Mobile.SalesLogix.Activity.List.superclass.navigateToDetailView.apply(this, [activity.$key, activity.Description]);
            }          
        },
    });
})();
