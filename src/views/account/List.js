/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

(function() {
    Mobile.SalesLogix.Account.List = Ext.extend(Sage.Platform.Mobile.List, {
        contentTemplate: new Simplate([
            '<h3>{%: $.AccountName %}</h3>',
            '<h4>{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %}</h4>'
        ]),
        id: 'account_list',
        icon: 'content/images/Accounts_24x24.gif',
        titleText: 'Accounts',
        insertView: 'account_edit',
        detailView: 'account_detail',
        contextView: 'account_context',
        resourceKind: 'accounts',
        querySelect: [
            'AccountName',
            'AccountManager/UserInfo/UserName'
        ],
        queryOrderBy: 'AccountName',
        contextView: 'context_dialog',
        contextItems: [
            {'$key': 'activities', view: 'activity_related', where: "AccountId eq '{0}'"},
            {'$key': 'notes', view: 'note_related', where: "AccountId eq '{0}' and Type eq 'atNote'"}
        ],
        formatSearchQuery: function(query) {
            return String.format('AccountName like "%{0}%"', query);
        }
    });
})();