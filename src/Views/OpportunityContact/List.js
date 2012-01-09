/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/OpportunityContact/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.OpportunityContact.List', [Sage.Platform.Mobile.List], {
        //Template
        itemTemplate: new Simplate([
            '<h3>{%: $.Contact.NameLF %}</h3>',
            '{% if ($.SalesRole) %}',
                '<h4>{%: $.SalesRole %}</h4>',
            '<h4>{%: $.Contact.AccountName %}</h4>'
        ]),

        //Localization
        titleText: 'Contacts',
        selectTitleText: 'Select Contact',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',

        //View Properties
        id: 'opportunitycontact_list',
        detailView: 'opportunitycontact_detail',
        selectView: 'contact_related',
        insertView: 'opportunitycontact_edit',
        icon: 'content/images/icons/Contacts_24x24.png',
        security: 'Entities/Contact/View',
        queryOrderBy: 'Contact.NameLF',
        querySelect: [
            'Contact/Account/AccountName',
            'Contact/AccountName',
            'SalesRole',
            'Contact/NameLF',
            'Contact/Title'
        ],
        resourceKind: 'opportunityContacts',


        complete: function(){
            var view = App.getPrimaryActiveView(),
                selectionModel = view && view.get('selectionModel'),
                entry = null;
            if (!selectionModel) return;

            var selections = selectionModel.getSelections();

            if (selectionModel.getSelectionCount() == 0 && view.options.allowEmptySelection)
                ReUI.back();

            var context = App.isNavigationFromResourceKind(['opportunities']);

            for (var selectionKey in selections)
            {
                entry = {
                    'Opportunity': {'$key': context.key},
                    'Contact': view.entries[selectionKey]
                };
            }

            if (entry)
                this.navigateToInsertView(entry);
        },
        createNavigationOptions: function() {
            var options = {
                query: this.expandExpression(this.options.prefilter),
                selectionOnly: true,
                singleSelect: true,
                singleSelectAction: 'complete',
                allowEmptySelection: false,
                title: this.selectTitleText,
                select: [
                    'Account/AccountName',
                    'AccountName',
                    'NameLF',
                    'Title'
                ],
                tools: {
                    tbar: [{
                        id: 'complete',
                        fn: this.complete,
                        cls: 'invisible',
                        scope: this
                    },{
                        id: 'cancel',
                        side: 'left',
                        fn: ReUI.back,
                        scope: ReUI
                    }]
                }
            };
            return options;
        },
        navigateToInsertView: function(entry){
            var view = App.getView(this.insertView),
                options = {
                    entry: entry,
                    insert: true
                };
            if (view && options)
                view.show(options, { returnTo: -1 });
        },
        navigateToSelectView: function() {
            var view = App.getView(this.selectView),
                options = this.createNavigationOptions();
            if (view && options)
                view.show(options);
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': [{
                    id: 'new',
                    action: 'navigateToInsertView',
                    security: App.getViewSecurity(this.insertView, 'insert')
                },{
                    id: 'associate',
                    icon: 'content/images/icons/srch_24.png',
                    action: 'navigateToSelectView',
                    security: App.getViewSecurity(this.insertView, 'insert')
                }]
            });
        },

        formatSearchQuery: function(query) {
            return dojo.string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});