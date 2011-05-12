/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

(function() {
    Mobile.SalesLogix.Account.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.AccountName %}</h3>',
            '<h4>{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %}</h4>'
        ]),

        //Localization
        titleText: 'Accounts',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',

        //View Properties        
        detailView: 'account_detail',
        icon: 'content/images/icons/Company_24.png',
        id: 'account_list',
        insertView: 'account_edit',
        queryOrderBy: 'AccountNameUpper',
        querySelect: [
            'AccountName',
            'AccountManager/UserInfo/UserName',
            'AccountManager/UserInfo/LastName',
            'AccountManager/UserInfo/FirstName'
        ],
        resourceKind: 'accounts',

        formatSearchQuery: function(query) {
            return String.format('AccountNameUpper like "{0}%"', this.escapeSearchQuery(query.toUpperCase()));
        }
    });
})();