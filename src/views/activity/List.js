/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

Mobile.SalesLogix.Activity.List = Ext.extend(Sage.Platform.Mobile.List, {   
    titleText: 'Activity', 
    contentTemplate: new Simplate([
        '<a href="#activity_detail" target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}">',
        '<h3>{%= $["StartDate"], [" , "], $["AccountName"] %}</h3>',
        '<h4>{%= $["Type"], [" , "], $["Description"] %}</h4>',
        '</a>'       
    ]),    
    constructor: function(o) {
        Mobile.SalesLogix.Activity.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'activity_list',
            title: this.titleText,
            resourceKind: 'activities',
            pageSize: 25,
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
                //'include': 'Account',
               // 'include': 'Account,Opportunity,Contact',
                'groupby'  : 'StartDate',
                'orderby'  : 'StartDate',                   
                'select': [
                    'StartDate',
                    'AccountName',
                    'Type',
                    'Description'
                   ]
            })  

        return request;
    }
});
