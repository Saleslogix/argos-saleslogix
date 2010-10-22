/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Return");

(function() {
    Mobile.SalesLogix.Return.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.Account ? $.Account.AccountName : "" %}</h3>',
            '<h4>{%: $.ReturnNumber %}</h4>'
        ]),

        //Localization
        titleText: 'Returns',

        //View Properties
        detailView: 'return_detail',
        icon: 'content/images/return_detail_24x24.gif',
        id: 'return_list',
        insertView: 'return_edit',
        queryOrderBy: 'ReturnNumber',
        querySelect: [
            'Account/AccountName',
            'ReturnNumber'
        ],
        resourceKind: 'returns',

        formatSearchQuery: function(query) {
            return String.format('ReturnNumber like "%{0}%"', query);
        }
    });
})();