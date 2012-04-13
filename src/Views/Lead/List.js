define('Mobile/SalesLogix/Views/Lead/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    List
) {

    return declare('Mobile.SalesLogix.Views.Lead.List', [List], {
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

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%" or CompanyUpper like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});