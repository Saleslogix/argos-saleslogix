/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Contact/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Contact.List', [Sage.Platform.Mobile.List], {
        //Template
        itemTemplate: new Simplate([
            '<h3>{%: $.NameLF %}</h3>',
            '<h4>{%: $.AccountName %}</h4>'
        ]),

        //Localization
        titleText: 'Contacts',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',

        //View Properties        
        detailView: 'contact_detail',
        icon: 'content/images/icons/Contacts_24x24.png',
        id: 'contact_list',
        insertView: 'contact_edit',
        queryOrderBy: 'LastNameUpper,FirstName',
        securedAction: 'Entities/Contact/Add',
        querySelect: [
            'AccountName',
            'NameLF'
        ],        
        resourceKind: 'contacts',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});