/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

Mobile.SalesLogix.Contact.List = Ext.extend(Sage.Platform.Mobile.List, {   
    contentTemplate: new Simplate([
        '<a href="#contact_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%= NameLF %}</h3>',
        '<h4>{%= AccountName %}</h4>',
        '</a>'
    ]),     
    constructor: function(o) {
        Mobile.SalesLogix.Contact.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'contact_list',
            title: 'Contacts',
            resourceKind: 'contacts',
            pageSize: 10,
            icon: 'content/images/Contacts_24x24.gif'
        });
    },   
    formatSearchQuery: function(query) {
        return String.format('(LastName like "%{0}%" or FirstName like "%{0}%")', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Contact.List.superclass.createRequest.call(this);
       
        request
            .setResourceKind('contacts')
            .setQueryArgs({
                'orderby': 'LastName,FirstName',
                'select': 'NameLF,AccountName'                             
            });                       

        return request;
    }
});
