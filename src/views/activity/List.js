/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.Types = [
        {
            '$key': 'atAppointment',
            '$descriptor': 'Meeting'
        },
        {
            '$key': 'atLiterature',
            '$descriptor': 'Literature Request'
        },
        {
            '$key': 'atPersonal',
            '$descriptor': 'Personal Activity'
        },
        {
            '$key': 'atPhoneCall',
            '$descriptor': 'Phone Call'
        },
        {
            '$key': 'atToDo',
            '$descriptor': 'To-Do'
        }
    ];

    Mobile.SalesLogix.Activity.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.StartDate, "h:mm") %}, {%: $.Description %}</h3>',
            '<h4>{%: Mobile.SalesLogix.Format.date($.StartDate) %} - {%: Mobile.SalesLogix.Activity.ActivityTypesLookup[$.Type] || $.Type %}, {%: $.UserId %}</h4>'
        ]),

        //Localization
        titleText: 'Activities',

        //View Properties
        detailView: 'activity_detail',
        detailViewForResource: {
            'leads': 'activity_detail_for_lead'
        },
        icon: 'content/images/icons/job_24.png',
        id: 'activity_list',
        insertView: 'activity_types_list',
        queryOrderBy: 'StartDate desc',
        querySelect: [
            'Description',
            'StartDate',
            'Type',
            'UserId'
        ],
        resourceKind: 'activities',

        init: function() {
            Mobile.SalesLogix.Activity.List.superclass.init.apply(this, arguments);

            var actTypes = {};
            Mobile.SalesLogix.Activity.Types.forEach(function(type){
                actTypes[type.$key] = type.$descriptor;
            });
            Mobile.SalesLogix.Activity.ActivityTypesLookup = actTypes;
        },  
        navigateToDetailView: function(key, descriptor) {
            if (key)
            {
                var view,
                    found = App.queryNavigationContext(function(o) {
                    var context = (o.options && o.options.source) || o;

                    return /^(leads)$/.test(context.resourceKind);
                });

                view = found && this.detailViewForResource[found.resourceKind]
                        ? App.getView(this.detailViewForResource[found.resourceKind])
                        : App.getView(this.detailView);
                if (view)
                    view.show({
                        descriptor: descriptor,
                        key: key
                    });
            }
        },
        formatSearchQuery: function(query) {
            return String.format('Description like "%{0}%"', query);
        }
    });
})();