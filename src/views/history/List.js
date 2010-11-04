/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.ActivityTypesLookup = {
        'atQuestion': 'Question',
        'atEMail': 'EMail'
    };
    
    Mobile.SalesLogix.History.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.StartDate) %}, {%: $.AccountName %}</h3>',
            '<h4>{%: Mobile.SalesLogix.Activity.ActivityTypesLookup[$.Type] ||',
                 ' Mobile.SalesLogix.History.ActivityTypesLookup[$.Type] || $.Type %}, ',
                '{%: $.Description %}</h4>'
        ]),

        //Localization
        titleText: 'Histories',

        //View Properties
        detailView: 'history_detail',
        icon: 'content/images/Task_List_3D_24x24.gif',
        id: 'history_list',
        insertView: 'history_edit',
        queryOrderBy: 'StartDate desc',
        querySelect: [
            'StartDate',
            'AccountName',
            'Type',
            'Description'
        ],
        resourceKind: 'history',

        formatSearchQuery: function(query) {
            return String.format('Description like "%{0}%"', query);
        }
    });
})();