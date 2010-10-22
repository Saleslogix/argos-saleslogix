/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.User");

(function() {
    Mobile.SalesLogix.User.List = Ext.extend(Sage.Platform.Mobile.List, {
        contentTemplate: new Simplate([
            '<h3>{%: $.UserInfo.LastName %}, {%: $.UserInfo.FirstName %}</h3>',
            '<h4>{%: $.UserInfo.Title %}</h4>'
        ]),
        id: 'user_list',
        icon: 'content/images/Accounts_24x24.gif',
        titleText: 'Users',
        resourceKind: 'users',
        querySelect: [
            'UserInfo/FirstName',
            'UserInfo/LastName',
            'UserInfo/Title',
            'UserInfo/UserName'
        ],
        queryOrderBy: 'UserInfo.LastName asc, UserInfo.FirstName asc',
        formatSearchQuery: function(query) {
            return String.format('UserInfo.UserName like "%{0}%"', query);
        }
    });
})();
