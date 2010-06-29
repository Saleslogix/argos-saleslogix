/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

Mobile.SalesLogix.Activity.List = Ext.extend(Sage.Platform.Mobile.List, {   
    itemTemplate: new Simplate([
        '<li>',
        '<a href="#activity_detail" target="_detail" m:key="{%= $key %}">',
        '<h3>{%= $["Description"] %}</h3>',
        '<h4>{%= $["Category"] %}</h4>',
        '</a>',
        '</li>'
    ]),    
    constructor: function(o) {
        Mobile.SalesLogix.Activity.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'activity_list',
            title: 'Activities',
            resourceKind: 'activities',
            pageSize: 10,
            icon: 'content/images/Task_List_3D_24x24.gif'
        });
    },  
    formatSearchQuery: function(query) {
        return String.format('Description like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Activity.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({                
                'orderby': 'Description',
                'select': 'Description,Category'                
            });

        return request;
    }
});