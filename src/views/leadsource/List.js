/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.LeadSource");

Mobile.SalesLogix.LeadSource.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<a href="#account_detail" target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}">',
        '<h3>{%: $.Description %}</h3>',
        '<h4>{%: $.Status %}</h4>',
        '</a>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.LeadSource.List.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'leadsource_list',
            title: 'LeadSources',
            resourceKind: 'leadsources',
            pageSize: 25,
            icon: 'content/images/Accounts_24x24.gif'
        });        
    },
    formatSearchQuery: function(query) {
        return String.format('leadsource.Description like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.LeadSource.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'leadsource',
                'orderby': 'Description',
                'select': [
                    'Description',
                ].join(',')
            });

        return request;
    }
});
