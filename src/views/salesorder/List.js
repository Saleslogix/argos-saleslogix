/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.SalesOrder");

Mobile.SalesLogix.SalesOrder.List = Ext.extend(Sage.Platform.Mobile.List, {   
    contentTemplate: new Simplate([        
        '<a href="#salesorder_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%= $["Account"]["AccountName"] %}</h3>',
        '<h4>{%= SalesOrderNumber %}</h4>',
        '</a>'
    ]),      
    constructor: function(o) {
        Mobile.SalesLogix.SalesOrder.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'salesorder_list',
            title: 'SalesOrder',
            resourceKind: 'salesorders',
            pageSize: 10,
            icon: 'content/images/salesorder.gif'
        });
    },   
    formatSearchQuery: function(query) {
        return String.format('(SalesOrderNumber like "%{0}%")', query);

        // todo: The below does not currently work as the dynamic SData adapter does not support dotted notation for queries
        //       except in certain situations.  Support for general dotted notation is being worked on.
        //return String.format('(SalesorderNumber like "%{0}%" or Account.AccountName like "%{0}%")', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.SalesOrder.List.superclass.createRequest.call(this);

	 request
         .setResourceKind('salesorders')
            .setQueryArgs({
		          'include': 'Account/AccountName,SalesOrderNumber',
                  'orderby': 'SalesOrderNumber',
                  'select': 'Account/AccountName,SalesOrderNumber'                             
            });                       

        return request;
    }
});
