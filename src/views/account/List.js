/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

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
    queryInclude: ['AccountManager/UserInfo'],
    querySelect: [
        'AccountName',
        'AccountManager/UserInfo/UserName'
    ],
    queryOrderBy: 'AccountName',
    formatSearchQuery: function(query) {
        return String.format('AccountName like "%{0}%"', query);
    }
});
