/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Contract/List', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Contract.List', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%= $.Account ? $.Account.AccountName : "" %}</h3>',
            '<h4>{%= $.ReferenceNumber %}</h4>'
        ]),

        //Localization
        titleText: 'Contracts',

        //View Properties
        contextView: 'context_dialog',
        detailView: 'contract_detail',
        id: 'contract_list',
        security: 'Entities/Contract/View',
        icon: 'content/images/contract_16x16.gif',
        insertView: 'contract_edit',
        queryOrderBy: 'ReferenceNumber asc',
        querySelect: [
            'Account/AccountName',
            'Contact/FullName',
            'ReferenceNumber'
        ],
        resourceKind: 'contracts',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('(ReferenceNumber like "%${0}%")', [this.escapeSearchQuery(query)]);
        }
    });
});