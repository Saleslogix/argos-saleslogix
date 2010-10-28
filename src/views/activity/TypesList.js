/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

Mobile.SalesLogix.Activity.TypesList = Ext.extend(Sage.Platform.Mobile.List, {
    //Templates
    itemTemplate: new Simplate([
        '<li data-action="activateEntry" data-key="{%= $.$key %}" ',
            'data-descriptor="{%: $.$descriptor %}" ',
            'data-view="activity_edit">',
        '<div data-action="selectEntry" class="list-item-selector"></div>',
        '<h3>{%: $.$descriptor %}</h3>',
        '</li>'
    ]),

    //Localization
    atToDoText: 'To-Do',
    atPhoneCallText: 'Phone Call',
    atAppointmentText: 'Meeting',
    atLiteratureText: 'Literature Request',
    atPersonalText: 'Personal Activity',
    titleText: 'Actions',

    //View Properties
    contextItems: false,
    detailView: '',
    expose: false,
    hideSearch: true,
    id: 'activity_types_list',
    relatedEntry: false,
    relatedKey: '',
    relatedDescriptor: '',

    activateEntry: function(params) {
        var v = App.getView(params.view);

        if (v) v.show({
            insert: true,
            entry: this.relatedEntry,
            context: 'ScheduleActivity',
            key: params.key
        });
    },
    hasMoreData: function() {
        return false;
    },
    requestData: function() {
        this.processFeed({'$resources': Mobile.SalesLogix.Activity.Types});
    },
    init: function() {
        Mobile.SalesLogix.Activity.TypesList.superclass.init.apply(this, arguments);
        
        this.tools.tbar = [];
    },
    show: function(options) {
        Mobile.SalesLogix.Activity.TypesList.superclass.show.call(this, options);

        this.contextItems = options.contextItems || [];
        this.detailView = options.detailView;
        this.relatedKey = options.key;
        this.relatedDescriptor = options.descriptor;
        this.relatedEntry = options.entry;
    }
});