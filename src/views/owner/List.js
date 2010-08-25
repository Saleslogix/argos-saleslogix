/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Owner");

Mobile.SalesLogix.Owner.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<a href="#account_detail" target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}">',
        '<h3>{%: $.OwnerDescription %}</h3>',
        '</a>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Owner.List.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'owner_list',
            title: 'Owners',
            resourceKind: 'owners',
            pageSize: 25,
            icon: 'content/images/Accounts_24x24.gif'
        });        
    },
    formatSearchQuery: function(query) {
        return String.format('owner.OwnerDescription like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Owner.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'owner',
                'orderby': 'OwnerDescription',
                'select': [
                    'owner/OwnerDescription',
                ].join(',')
            });

        return request;
    }
});