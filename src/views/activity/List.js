/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.List = Ext.extend(Sage.Platform.Mobile.List, {
        contentTemplate: new Simplate([
            '<h3>{%: $.StartDate %}, {%: $.AccountName %}</h3>',
            '<h4>{%: $.Type %}, {%: $.Description %}</h4>'
        ]),
        id: 'activity_list',
        icon: 'content/images/Task_List_3D_24x24.gif',
        titleText: 'Activities',
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
