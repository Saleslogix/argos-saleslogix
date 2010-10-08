/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

(function() {
    Mobile.SalesLogix.Contact.Lookup = Ext.extend(Sage.Platform.Mobile.List, {
        contentTemplate: new Simplate([
            '<h3>{%: $.NameLF %}</h3>'
        ]),
        id: 'contact_lookup',
        expose: false,
        titleText: 'Contacts',
        resourceKind: 'contacts',
        querySelect: [
            'NameLF'
        ],
        queryOrderBy: 'NameLF',
        formatSearchQuery: function(query) {
            return String.format('NameLF like "%{0}%"', query);
        }
    });
})();