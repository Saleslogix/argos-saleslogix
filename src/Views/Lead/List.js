/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Lead/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Lead.List', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.LeadNameLastFirst %}</h3>',
            '<h4>{%: $.Company %}</h4>'
        ]),

        //Localization
        titleText: 'Leads',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',

        //View Properties      
        detailView: 'lead_detail',
        icon: 'content/images/icons/Leads_24x24.png',
        id: 'lead_list',
        security: 'Entities/Lead/View',
        insertView: 'lead_edit',
        queryOrderBy: 'LastNameUpper,FirstName',
        querySelect: [
            'Company',
            'LeadNameLastFirst'
        ],
        resourceKind: 'leads',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%" or CompanyUpper like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});