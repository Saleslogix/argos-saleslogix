/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

Mobile.SalesLogix.Return.List = Ext.extend(Sage.Platform.Mobile.List, {
    contentTemplate: new Simplate([
        '<h3>{%: $.Account ? $.Account.AccountName : "" %}</h3>',
        '<h4>{%: $.ReturnNumber %}</h4>'
    ]),
    id: 'return_list',
    icon: 'content/images/return_detail_24x24.gif',
    titleText: 'Returns',
    insertView: 'return_edit',
    resourceKind: 'returns',
    queryInclude: [
        'Account'
    ],
    querySelect: [
        'Account/AccountName',
        'ReturnNumber'
    ],
    queryOrderBy: 'ReturnNumber',
    formatSearchQuery: function(query) {
        return String.format('ReturnNumber like "%{0}%"', query);
    }
});
