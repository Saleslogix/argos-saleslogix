/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

(function() {
    Mobile.SalesLogix.Contact.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Template
        contentTemplate: new Simplate([
            '<h3>{%: $.NameLF %}</h3>',
            '<h4>{%: $.AccountName %}</h4>'
        ]),

        //Localization
        titleText: 'Contacts',

        //View Properties
        contextItems: [
            {
                '$key': 'activities',
                view: 'activity_related',
                where: "ContactId eq '{0}'"
            },
            {
                '$key': 'notes',
                view: 'note_related',
                where: "ContactId eq '{0}' and Type eq 'atNote'"
            },
            {
                '$key': 'schedule',
                view: 'activity_types_list'
            }
        ],
        contextView: 'context_dialog',
        detailView: 'contact_detail',
        icon: 'content/images/icons/contact_24.png',
        id: 'contact_list',
        insertView: 'contact_edit',
        queryOrderBy: 'LastName,FirstName',
        querySelect: [
            'NameLF',
            'AccountName'
        ],
        resourceKind: 'contacts',

        formatSearchQuery: function(query) {
            return String.format('(LastName like "%{0}%" or FirstName like "%{0}%" or Account.AccountName like "%{0}%")', query);
        }
    });
})();