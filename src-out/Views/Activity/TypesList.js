/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Activity.TypesList
 *
 * @extends argos.List
 * @mixins argos._LegacySDataListMixin
 * @mixins crm.Views._CardLayoutListMixin
 *
 * @requires argos.List
 * @requires argos._LegacySDataListMixin
 *
 * @requires crm.Views._CardLayoutListMixin
 *
 */
define('crm/Views/Activity/TypesList', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/List',
    'dojo/store/Memory'
], function (declare, lang, List, MemoryStore) {
    var __class = declare('crm.Views.Activity.TypesList', [List], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
            '<div class="list-item-static-selector">',
            '{% if ($.icon) { %}',
            '<img src="{%: $.icon || "" %}" alt="icon" class="icon" />',
            '{% } else if ($.iconClass) { %}',
            '<div class="{%= $.iconClass %}"></div>',
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
            'atToDo': 'fa fa-list-ul',
            'atPhoneCall': 'fa fa-phone',
            'atAppointment': 'fa fa-calendar-o',
            'atLiterature': 'fa fa-calendar-o',
            'atPersonal': 'fa fa-check-square-o',
            'event': 'fa fa-calendar-o'
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
        expose: false,
        enableSearch: false,
        enablePullToRefresh: false,
        id: 'activity_types_list',
        editView: 'activity_edit',
        eventEditView: 'event_edit',
        activateEntry: function (params) {
            if (params.key) {
                var source = this.options && this.options.source, view = App.getView((params.key === 'event') ? this.eventEditView : this.editView);
                if (view) {
                    view.show({
                        insert: true,
                        entry: (this.options && this.options.entry) || null,
                        source: source,
                        activityType: params.key,
                        title: this.activityTypeText[params.key],
                        returnTo: this.options && this.options.returnTo,
                        currentDate: this.options && this.options.currentDate
                    }, {
                        returnTo: -1
                    });
                }
            }
        },
        refreshRequiredFor: function (options) {
            if (this.options) {
                return options;
            }
            else {
                return true;
            }
        },
        hasMoreData: function () {
            return false;
        },
        createStore: function () {
            var list, i, store, eventViews;
            list = [];
            eventViews = [
                'calendar_monthlist',
                'calendar_weeklist',
                'calendar_daylist',
                'calendar_yearlist'
            ];
            for (i = 0; i < this.activityTypeOrder.length; i++) {
                list.push({
                    '$key': this.activityTypeOrder[i],
                    '$descriptor': this.activityTypeText[this.activityTypeOrder[i]],
                    'iconClass': this.activityTypeIcons[this.activityTypeOrder[i]],
                    'type': this.activityTypeOrder[i]
                });
            }
            if (eventViews.indexOf(this.options.returnTo) === -1) {
                list.pop(); // remove event for non event views
            }
            store = new MemoryStore({ data: list });
            return store;
        },
        init: function () {
            this.inherited(arguments);
        },
        createToolLayout: function () {
            return this.tools || (this.tools = {
                tbar: []
            });
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Activity.TypesList', __class);
    return __class;
});
