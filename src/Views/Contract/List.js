/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Contract/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    List
) {

    return declare('Mobile.SalesLogix.Views.Contract.List', [List], {
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

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(ReferenceNumber like "%${0}%")', [this.escapeSearchQuery(searchQuery)]);
        }
    });
});

