/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

(function() {
    Mobile.SalesLogix.Lead.List = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        contentTemplate: new Simplate([
            '<h3>{%: $.LeadNameLastFirst %}</h3>',
            '<h4>{%: $.Company %}</h4>'
        ]),

        //Localization
        titleText: 'Leads',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',

        //View Properties      
        contextView: 'context_dialog',
        detailView: 'lead_detail',
        icon: 'content/images/icons/lead_24.png',
        id: 'lead_list',
        insertView: 'lead_edit',
        queryOrderBy: 'Company',
        querySelect: [
            'Company',
            'LeadNameLastFirst'
        ],
        resourceKind: 'leads',

        formatSearchQuery: function(query) {
            return String.format('(LeadNameLastFirst like "%{0}%")', query);
        },
        createContextMenu: function() {
            return this.contextMenu || (this.contextMenu = [
                {
                    label: this.activitiesText,
                    where: this.formatRelatedQuery.createDelegate(
                        this, ['LeadId eq "{0}"'], true
                    ),
                    view: 'activity_related'
                },
                {
                    label: this.notesText,
                    where: this.formatRelatedQuery.createDelegate(
                        this, ['LeadId eq "{0}" and Type eq "atNote"'], true
                    ),
                    view: 'note_related'
                },
                {
                    label: this.scheduleText,
                    view: 'activity_types_list'
                }
            ]);
        }
    });
})();