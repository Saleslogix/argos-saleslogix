/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

(function() {
    Mobile.SalesLogix.Contact.List = Ext.extend(Sage.Platform.Mobile.List, {
        contentTemplate: new Simplate([
            '<h3>{%: $.NameLF %}</h3>',
            '<h4>{%: $.AccountName %}</h4>'
        ]),
        id: 'contact_list',
        icon: 'content/images/Contacts_24x24.gif',
        titleText: 'Contacts',
        insertView: 'contact_edit',
        detailView: 'contact_detail',
        resourceKind: 'contacts',
        querySelect: [
            'NameLF',
            'AccountName'
        ],
        queryOrderBy: 'LastName,FirstName',
        formatSearchQuery: function(query) {
            return String.format('(LastName like "%{0}%" or FirstName like "%{0}%" or Account.AccountName like "%{0}%")', query);
        }
    });
})();
