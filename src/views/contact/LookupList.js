/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

Mobile.SalesLogix.Contact.LookupList = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<h3>{%: $.NameLF %}</h3>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Contact.List.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'con_list',
            title: 'Contacts',
            resourceKind: 'contacts',
            pageSize: 25,
            icon: 'content/images/Accounts_24x24.gif'
        });        
    },
    formatSearchQuery: function(query) {
        return String.format('NameLF like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Contact.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'contact',
                'orderby': 'NameLF',
                'select': [
                    'NameLF',
                ].join(',')
            });

        return request;
    }
});