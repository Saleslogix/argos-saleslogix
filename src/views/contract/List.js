/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Contract");

(function() {
    Mobile.SalesLogix.Contract.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%= $.Account ? $.Account.AccountName : "" %}</h3>',
            '<h4>{%= $.ReferenceNumber %}</h4>'
        ]),

        //Localization
        titleText: 'Contracts',

        //View Properties
        contextView: 'context_dialog',
        detailView: 'contract_detail',
        id: 'contract_list',
        icon: 'content/images/contract_16x16.gif',
        insertView: 'contract_edit',
        queryOrderBy: 'ReferenceNumber',
        querySelect: [
            'Account/AccountName',
            'Contact/FullName',
            'ReferenceNumber'
        ],
        resourceKind: 'contracts',

        formatSearchQuery: function(query) {
            return String.format('(ReferenceNumber like "%{0}%")', this.escapeSearchQuery(query));

            // todo: The below does not currently work as the dynamic SData adapter does not support dotted notation for queries
            //       except in certain situations.  Support for general dotted notation is being worked on.
            //return String.format('(Description like "%{0}%" or Account.AccountName like "%{0}%")', query);
        }
    });
})();