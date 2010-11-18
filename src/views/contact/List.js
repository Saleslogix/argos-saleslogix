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
            '<h4>{%: $.Account && $.Account.AccountName %}</h4>'
        ]),

        //Localization
        titleText: 'Contacts',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',

        //View Properties        
        contextView: 'context_dialog',
        detailView: 'contact_detail',
        icon: 'content/images/icons/contact_24.png',
        id: 'contact_list',
        insertView: 'contact_edit',
        queryOrderBy: 'LastName,FirstName',
        querySelect: [
            'Account/AccountName',              
            'NameLF'
        ],        
        resourceKind: 'contacts',

        formatSearchQuery: function(query) {
            return String.format('(LastName like "%{0}%" or FirstName like "%{0}%" or Account.AccountName like "%{0}%")', query);
        },
        createContextMenu: function() {
            return this.contextMenu || (this.contextMenu = [
                {
                    label: this.activitiesText,
                    where: this.formatRelatedQuery.createDelegate(
                        this, ['ContactId eq "{0}"'], true
                    ),
                    view: 'activity_related'
                },
                {
                    label: this.notesText,
                    where: this.formatRelatedQuery.createDelegate(
                        this, ['ContactId eq "{0}" and Type eq "atNote"'], true
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