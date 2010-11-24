/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

Mobile.SalesLogix.Activity.TypesList = Ext.extend(Sage.Platform.Mobile.List, {
    //Templates
    contentTemplate: new Simplate([
        '<h3>',
        '{% if ($.icon) { %}',
        '<img src="{%: $.icon %}" alt="icon" class="icon" />',
        '{% } %}',
        '<span>{%: $.$descriptor %}</span>',
        '</h3>'
    ]),
    
    //Localization
    titleText: 'Schedule...',
    activityTypeText: {
        'atToDo': 'To-Do',
        'atPhoneCall': 'Phone Call',
        'atAppointment': 'Meeting',
        'atLiterature': 'Literature Request',
        'atPersonal': 'Personal Activity'
    },
    activityTypeIcons: {
        'atToDo': 'content/images/icons/Schedule_To_Do_24x24.gif',
        'atPhoneCall': 'content/images/icons/Schedule_Call_24x24.gif',
        'atAppointment': 'content/images/icons/Schedule_Meeting_24x24.gif',
        'atLiterature': 'content/images/icons/Schedule_Literature_Request_24x24.gif',
        'atPersonal': 'content/images/icons/Schedule_Personal_Activity_24x24.gif'
    },

    //View Properties   
    activityTypeOrder: [
        'atAppointment',
        'atLiterature',
        'atPersonal',
        'atPhoneCall',
        'atToDo'
    ],
    expose: false,
    hideSearch: true,
    id: 'activity_types_list',
    editView: 'activity_edit',
    editViewForResource: {
        'leads': 'activity_edit_for_lead'
    },

    activateEntry: function(params) {
        if (params.key)
        {
            var source = this.options && this.options.source,
                view = source && this.editViewForResource[source.resourceKind]
                    ? App.getView(this.editViewForResource[source.resourceKind])
                    : App.getView(this.editView);

            if (view)
                view.show({
                    insert: true,
                    source: source,
                    activityType: params.key,
                    returnTo: this.options && this.options.returnTo
                });
        }
    },
    show: function(options) {
        Mobile.SalesLogix.Activity.TypesList.superclass.show.apply(this, arguments);
        
        var found = App.queryNavigationContext(function(o) {
            var context = (o.options && o.options.source) || o;

            return /^(leads)$/.test(context.resourceKind);
        });

        if (found && this.options) this.options.source = found;
    },
    refreshRequiredFor: function(options) {
        if (this.options)
            return options;        
        else
            return true;
    },
    hasMoreData: function() {
        return false;
    },
    requestData: function() {
        var list = [];

        for (var i = 0; i < this.activityTypeOrder.length; i++)
        {
            list.push({
                '$key': this.activityTypeOrder[i],
                '$descriptor': this.activityTypeText[this.activityTypeOrder[i]],
                'icon':this.activityTypeIcons[this.activityTypeOrder[i]]
            });
        }

        this.processFeed({'$resources': list});
    },
    init: function() {
        Mobile.SalesLogix.Activity.TypesList.superclass.init.apply(this, arguments);
        
        this.tools.tbar = [];
    }
});