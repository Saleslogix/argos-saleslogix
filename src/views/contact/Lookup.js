/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

(function() {
    Mobile.SalesLogix.Contact.Lookup = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.NameLF %}</h3>'
        ]),

        //Localization
        titleText: 'Contacts',

        //View Properties
        expose: false,
        id: 'contact_lookup',
        queryOrderBy: 'NameLF',
        querySelect: [
            'NameLF'
        ],
        resourceKind: 'contacts',

        formatSearchQuery: function(query) {
            return String.format('(LastNameUpper like "%{0}%" or upper(FirstName) like "%{0}%" or upper(AccountName) like "%{0}%")', query.toUpperCase());
        }
    });
})();