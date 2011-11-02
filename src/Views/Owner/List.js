/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Owner/List', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Owner.List', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.OwnerDescription %}</h3>'
        ]),

        //Localization
        titleText: 'Owners',

        //View Properties
        icon: 'content/images/Accounts_24x24.gif',
        id: 'owner_list',
        security: 'Entities/Owner/View',
        queryOrderBy: 'OwnerDescription',
        querySelect: [
            'OwnerDescription'
        ],
        resourceKind: 'owners',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('upper(OwnerDescription) like "%${0}%"', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});