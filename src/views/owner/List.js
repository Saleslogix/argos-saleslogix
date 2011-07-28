/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Owner");

(function() {
    Mobile.SalesLogix.Owner.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.OwnerDescription %}</h3>'
        ]),

        //Localization
        titleText: 'Owners',

        //View Properties
        icon: 'content/images/Accounts_24x24.gif',
        id: 'owner_list',
        queryOrderBy: 'OwnerDescription',
        querySelect: [
            'OwnerDescription'
        ],
        resourceKind: 'owners',

        formatSearchQuery: function(query) {
            return String.format('upper(OwnerDescription) like "%{0}%"', this.escapeSearchQuery(query.toUpperCase()));
        }
    });
})();