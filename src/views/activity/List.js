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
            '<h3>{%: Mobile.SalesLogix.Format.date($.StartDate) %}, {%: $.AccountName %}</h3>',
            '<h4>{%: Mobile.SalesLogix.Activity.ActivityTypesLookup[$.Type] %}, {%: $.Description %}</h4>'
        ]),

        //Localization
        titleText: 'Activities',

        //View Properties
        detailView: 'activity_detail',
        icon: 'content/images/Task_List_3D_24x24.gif',
        id: 'activity_list',
        insertView: 'activity_edit',
        queryOrderBy: 'StartDate',
        querySelect: [
            'StartDate',
            'AccountName',
            'Type',
            'Description'
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
        formatSearchQuery: function(query) {
            return String.format('Description like "%{0}%"', query);
        }
    });
})();