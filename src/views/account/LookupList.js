/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.LookupList = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<a href="#account_detail" target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}">',
        '<h3>{%: $.AccountName %}</h3>',
        '</a>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Account.List.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'acc_list',
            title: 'Accounts',
            resourceKind: 'accounts',
            pageSize: 25,
            icon: 'content/images/Accounts_24x24.gif'
        });        
    },
    formatSearchQuery: function(query) {
        return String.format('Account.AccountName like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Account.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'account',
                'orderby': 'AccountName',
                'select': [
                    'AccountName',
                ].join(',')
            });

        return request;
    }
});