/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.SalesOrder");

(function() {
    Mobile.SalesLogix.SalesOrder.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%= $.Account ? $.Account.AccountName : "" %}</h3>',
            '<h4>{%= SalesOrderNumber %}</h4>'
        ]),

        //Localization
        titleText: 'SalesOrder',

        //View Properties
        detailView: 'salesorder_detail',
        icon: 'content/images/salesorder.gif',
        id: 'salesorder_list',
        queryOrderBy: 'SalesOrderNumber',
        querySelect: [
            'Account/AccountName',
            'SalesOrderNumber'
        ],
        resourceKind: 'salesorders',

        formatSearchQuery: function(query) {
            return String.format('(SalesOrderNumber like "%{0}%")', query);

            // todo: The below does not currently work as the dynamic SData adapter does not support dotted notation for queries
            //       except in certain situations.  Support for general dotted notation is being worked on.
            //return String.format('(SalesorderNumber like "%{0}%" or Account.AccountName like "%{0}%")', query);
        }
    });
})();