/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Return/List', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Return.List', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
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
        insertSecurity: 'Entities/Return/Add',
        querySelect: [
            'Account/AccountName',
            'ReturnNumber'
        ],
        resourceKind: 'returns',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('ReturnNumber like "%${0}%"', [this.escapeSearchQuery(query)]);
        }
    });
});