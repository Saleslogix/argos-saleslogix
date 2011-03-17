/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Calendar");

(function() {    
    Mobile.SalesLogix.Calendar.UserActivityList = Ext.extend(Sage.Platform.Mobile.List, {
        currentDate: Date.today(),
        
        //Templates
        itemTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
        contentTemplate: new Simplate([
            '<h3>',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "h:mm") %}</span>',
            '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "tt") %}</span>,',
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
            '<button data-tool="today" data-action="getTodayActivities" class="button lightGreenButton active">Today</button>',
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
        queryOrderBy: 'Activity.StartDate',
        querySelect: [
            'Activity/Description',
            'Activity/StartDate',
            'Activity/Type',
            'Activity/AccountName',
            'Activity/ContactName',
            'Activity/LeadId',
            'Activity/LeadName',
            'Activity/UserId'
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
        show: function(options) {
            if (!options) options = {};
            options['where'] = this.formatQueryForActivities();
            this.setNavBarTitle();

            Mobile.SalesLogix.Calendar.UserActivityList.superclass.show.call(this, options);
        },
        getNextActivities: function() {
            this.currentDate.add({day: 1});
            this.getActivities();
        },
        getTodayActivities: function() {
            if (this.currentDate.equals(Date.today())) return;

            this.currentDate = Date.today();
            this.getActivities();
        },
        getPrevActivities: function() {
            this.currentDate.add({day: -1});
            this.getActivities();
        },
        getActivities: function(date) {
            this.clear();
            this.setOptions();
            this.setSplitButtonStatus();
            this.requestData();
        },
        getActivitiesForDay: function() {
            var view = App.getActiveView();
            this.currentDate = view.getDateTime();
            ReUI.back();
            this.getActivities();
        },
        setNavBarTitle: function() {
            this.dateTextEl.update(this.currentDate.toString('dddd, MM/dd/yyyy'));
        },
        formatQueryForActivities: function() {
            return String.format(
                'Activity.StartDate between @{0}@ and @{1}@',
                this.currentDate.toString('yyyy-MM-ddT00:00:00'),
                this.currentDate.clone().add({day: 1}).toString('yyyy-MM-ddT00:00:00')
            );
        },
        setOptions: function() {
            this.options['where'] = this.formatQueryForActivities();
            this.setNavBarTitle();
        },
        setSplitButtonStatus: function() {
            [this.todayButton, this.dayButton, this.monthButton].forEach(function(el){
                el.removeClass(['active', 'lightGreenButton']);
            });

            if (this.currentDate.equals(Date.today()))
                this.todayButton.addClass(['active', 'lightGreenButton']);
            else
                this.dayButton.addClass(['active', 'lightGreenButton']);
        },
        isActivityForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        navigateToMonthView: function() {
            var view = App.getView('generic_calendar');

            if (view)
            {
                view.show({
                    tools: {
                        tbar: [{
                            id: 'complete',
                            fn: this.getActivitiesForDay,
                            scope: this
                        },{
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
