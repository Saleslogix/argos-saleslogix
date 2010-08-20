/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.User");

Mobile.SalesLogix.User.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<a href="#account_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%: $.UserInfo.LastName, $.UserInfo.LastName %}</h3>',
        '<h4>{%: $.UserInfo.Title %}</h4>',
        '</a>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Account.List.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'user_list',
            title: 'Users',
            resourceKind: 'users',
            pageSize: 25,
            icon: 'content/images/Accounts_24x24.gif'
        });        
    },
    formatSearchQuery: function(query) {
        return String.format('UserInfo.UserName like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Account.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'UserInfo',
                'orderby': 'UserInfo.LastName asc, UserInfo.FirstName asc',
                'select': [
                    'UserInfo/LastName',
                    'UserInfo/FirstName',
                    'UserInfo/UserName',
                    'UserInfo/Title'
                ].join(',')
            });

        return request;
    }
});