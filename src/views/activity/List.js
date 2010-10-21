/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

Mobile.SalesLogix.Activity.Types = {
    "atAppointment": "Meeting",
    "atLiterature": "Literature Request",
    "atPersonal": "Personal Activity",
    "atPhoneCall": "Phone Call",
    "atToDo": "To-Do"
};

(function() {
    Mobile.SalesLogix.Activity.List = Ext.extend(Sage.Platform.Mobile.List, {
        contentTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.StartDate) %}, {%: $.AccountName %}</h3>',
            '<h4>{%: Mobile.SalesLogix.Activity.Types[$.Type] %}, {%: $.Description %}</h4>'
        ]),
        id: 'activity_list',
        icon: 'content/images/Task_List_3D_24x24.gif',
        titleText: 'Activities',
        insertView: 'activity_edit',
        detailView: 'activity_detail',
        resourceKind: 'activities',
        querySelect: [
            'StartDate',
            'AccountName',
            'Type',
            'Description'
        ],
        queryOrderBy: 'StartDate',
        formatSearchQuery: function(query) {
            return String.format('Description like "%{0}%"', query);
        }
    });
})();