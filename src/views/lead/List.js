/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

Mobile.SalesLogix.Lead.List = Ext.extend(Sage.Platform.Mobile.List, {   
    contentTemplate: new Simplate([
        '<a href="#lead_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%= LeadNameLastFirst %}</h3>',
        '<h4>{%= Company %}</h4>',
        '</a>'
    ]),    
    constructor: function(o) {
        Mobile.SalesLogix.Lead.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'lead_list',
            title: 'Leads',
            resourceKind: 'leads',//We have to set entity here.
            pageSize: 10,
            icon: 'content/images/Leads_24x24.gif'//Image icon we have to mention here.
        });
    },   
    formatSearchQuery: function(query) {
        return String.format('(LeadNameLastFirst like "%{0}%")', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Lead.List.superclass.createRequest.call(this);
      //forming query arguments here
        request
            .setResourceKind('leads')
            .setQueryArgs({
                'orderby': 'Company',
                'select': 'LeadNameLastFirst,Company'                             
            });                       

        return request;
    }
});
