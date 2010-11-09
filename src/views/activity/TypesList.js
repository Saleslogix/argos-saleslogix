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
    titleText: 'Actions',

    //View Properties
    contextItems: false,
    detailView: '',
    expose: false,
    hideSearch: true,
    id: 'activity_types_list',
    relatedEntry: false,
    relatedKey: false,
    relatedDescriptor: false,
    relatedResourceKind: false,

    activateEntry: function(params) {
        var v = App.getView(params.view);

        if (v) v.show({
            insert: true,
            entry: this.relatedEntry,
            resourceKind: this.relatedResourceKind,
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
        this.detailView = options.detailView || false;
        this.relatedKey = options.key || false;
        this.relatedDescriptor = options.descriptor || false;
        this.relatedEntry = options.entry || false;
        this.relatedResourceKind = options.resourceKind || false;
    }
});