/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Activity/TypesList', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/List',
    'Mobile/SalesLogix/Views/_CardLayoutListMixin'
], function(
    declare,
    List,
    _CardLayoutListMixin
) {

    return declare('Mobile.SalesLogix.Views.Activity.TypesList', [List, _CardLayoutListMixin], {
        //Templates
        itemIndicatorTemplate: new Simplate(['<div/> ']),
        itemIconTemplate: new Simplate([
            '<div class="list-item-static-selector">',
                '{% if ($.icon) { %}',
                '<img src="{%: $.icon %}" alt="icon" class="icon" />',
                '{% } %}',
            '</div>'
        ]),
        //this us used if card layout is not mixed in
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
            '<div class="list-item-static-selector">',
                '{% if ($.icon) { %}',
                '<img src="{%: $.icon %}" alt="icon" class="icon" />',
                '{% } %}',
            '</div>',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<h3>{%: $.$descriptor %}</h3>'
        ]),

        //Localization
        titleText: 'Schedule...',
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity',
            'event': 'Event'
        },
        activityTypeIcons: {
            'atToDo': 'content/images/icons/Schedule_ToDo_24x24.png',
            'atPhoneCall': 'content/images/icons/Schedule_Call_24x24.png',
            'atAppointment': 'content/images/icons/Schedule_Meeting_24x24.png',
            'atLiterature': 'content/images/icons/Schedule_Literature_Request_24x24.gif',
            'atPersonal': 'content/images/icons/Personal_24x24.png',
            'event': 'content/images/icons/Holiday_schemes_24.png'
        },

        //View Properties
        activityTypeOrder: [
            'atAppointment',
            //'atLiterature', //For [#7206791], We will enable this later.
            'atPersonal',
            'atPhoneCall',
            'atToDo',
            'event'
        ],
        activityColorClassByType: {
            'atToDo': 'color-ToDo',
            'atPhoneCall': 'color-PhoneCall',
            'atAppointment': 'color-Meeting',
            'atLiterature': 'color-LitRequest',
            'atPersonal': 'color-Personal',
            'atQuestion': 'color-Question',
            'atNote': 'color-Note',
            'atEMail': 'color-Email'
        },
        itemIndicators: [{}],
        itemIcon:'content/images/icons/Schedule_Meeting_24x24.png',
        expose: false,
        enableSearch: false,
        id: 'activity_types_list',
        editView: 'activity_edit',
        eventEditView: 'event_edit',

        activateEntry: function(params) {
            if (params.key) {
                var source = this.options && this.options.source,
                    view = App.getView((params.key === 'event') ? this.eventEditView : this.editView);

                if (view) {
                    view.show({
                            insert: true,
                            entry: (this.options && this.options.entry) || null,
                            source: source,
                            activityType: params.key,
                            title: this.activityTypeText[params.key],
                            returnTo: this.options && this.options.returnTo
                        }, {
                            returnTo: -1
                        });
                }
            }
        },
        refreshRequiredFor: function(options) {
            if (this.options) {
                return options;
            } else {
                return true;
            }
        },
        hasMoreData: function() {
            return false;
        },
        requestData: function() {
            var list = [],
                eventViews = [
                    'calendar_monthlist',
                    'calendar_weeklist',
                    'calendar_daylist',
                    'calendar_yearlist'
                ];

            for (var i = 0; i < this.activityTypeOrder.length; i++) {
                list.push({
                    '$key': this.activityTypeOrder[i],
                    '$descriptor': this.activityTypeText[this.activityTypeOrder[i]],
                    'icon': this.activityTypeIcons[this.activityTypeOrder[i]],
                    'type':this.activityTypeOrder[i] 
                });
            }
            if (eventViews.indexOf(this.options.returnTo) === -1) {
                list.pop(); // remove event for non event views
            }

            this.processFeed({'$resources': list});
        },
        init: function() {
            this.inherited(arguments);
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                tbar: []
            });
        },
        getItemIconSource: function(entry) {
            return this.itemIcon || this.activityTypeIcons[entry.type] || this.icon || this.selectIcon;
        },
        getItemColorClass: function(entry) {
            return this.activityColorClassByType[entry.type] || this.itemColorClass;
        }
    });
});

