/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.User");

(function() {
    Mobile.SalesLogix.User.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.UserInfo.LastName %}, {%: $.UserInfo.FirstName %}</h3>',
            '<h4>{%: $.UserInfo.Title %}</h4>'
        ]),

        //Localization
        titleText: 'Users',

        //View Properties
        icon: 'content/images/Accounts_24x24.gif',
        id: 'user_list',
        queryOrderBy: 'UserInfo.LastName asc, UserInfo.FirstName asc',
        querySelect: [
            'UserInfo/FirstName',
            'UserInfo/LastName',
            'UserInfo/Title',
            'UserInfo/UserName'
        ],
        resourceKind: 'users',

        formatSearchQuery: function(query) {
            return String.format('upper(UserInfo.UserName) like "%{0}%"', query.toUpperCase());
        }
    });
})();