/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.SalesOrder");

(function() {
    Mobile.SalesLogix.SalesOrder.List = Ext.extend(Sage.Platform.Mobile.List, {
        contentTemplate: new Simplate([
            '<h3>{%= $.Account ? $.Account.AccountName : "" %}</h3>',
            '<h4>{%= SalesOrderNumber %}</h4>'
        ]),
        id: 'salesorder_list',
        icon: 'content/images/salesorder.gif',
        titleText: 'SalesOrder',
        detailView: 'salesorder_detail',
        resourceKind: 'salesorders',
        queryInclude: [
            'Account'
        ],
        querySelect: [
            'Account/AccountName',
            'SalesOrderNumber'
        ],
        queryOrderBy: 'SalesOrderNumber',
        formatSearchQuery: function(query) {
            return String.format('(SalesOrderNumber like "%{0}%")', query);

            // todo: The below does not currently work as the dynamic SData adapter does not support dotted notation for queries
            //       except in certain situations.  Support for general dotted notation is being worked on.
            //return String.format('(SalesorderNumber like "%{0}%" or Account.AccountName like "%{0}%")', query);
        }
    });
})();
