/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Salesorder");

Mobile.SalesLogix.Salesorder.List = Ext.extend(Sage.Platform.Mobile.List, {   
    itemTemplate: new Simplate([
        '<li class="o-stage o-stage-{%= ($["Stage"] || "1").charAt(0) %}">', /* quick method since there are only six stages */        
        '<a href="#salesorder_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<div>',
        '<h3>{%= $["Account"]["AccountName"] %}</h3>',
	'<h4>{%= SalesOrderNumber %}</h4>',        
        '</div>',
        '</a>',
        '</li>'
    ]),       
    constructor: function(o) {
        Mobile.SalesLogix.Salesorder.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'salesorder_list',
            title: 'Salesorders',
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
        var request = Mobile.SalesLogix.Salesorder.List.superclass.createRequest.call(this);

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
