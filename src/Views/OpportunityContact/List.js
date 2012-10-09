define('Mobile/SalesLogix/Views/OpportunityContact/List', [
    'dojo/_base/declare',
    'dojo/string',
    'argos/List',
    'argos/_SDataListMixin',
    'argos!scene'
], function(
    declare,
    string,
    List,
    _SDataListMixin,
    scene
) {

    return declare('Mobile.SalesLogix.Views.OpportunityContact.List', [List, _SDataListMixin], {
        //Template
        itemTemplate: new Simplate([
            '<h3 class="{% if ($.IsPrimary) { %} primary {% } %}">{%: $.Contact.NameLF %}</h3>',
            '<h4 class="{% if ($.IsPrimary) { %} primary {% } %}">',
                '{% if ($.SalesRole) { %}',
                    '{%: $.SalesRole %} | ',
                '{% } %}',
            '{%: $.Contact.Title %}</h4>'
        ]),

        //Localization
        titleText: 'Opportunity Contacts',
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
        expose: false,
        querySelect: [
            'Contact/Account/AccountName',
            'Contact/AccountName',
            'SalesRole',
            'IsPrimary',
            'Contact/NameLF',
            'Contact/Title'
        ],
        resourceKind: 'opportunityContacts',

        complete: function() {
            var view = App.getPrimaryActiveView(),
                selectionModel = view && view.get('selectionModel'),
                entry;
            if (!selectionModel) return;

            if (selectionModel.getSelectionCount() == 0 && view.options.allowEmptySelection)
                ReUI.back();

            var context = App.isNavigationFromResourceKind(['opportunities']),
                selections = selectionModel.getSelections();
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
                enableActions: false,
                title: this.selectTitleText,
                select: [
                    'Account/AccountName',
                    'AccountName',
                    'NameLF',
                    'Title'
                ],
                tools: {
                    top: [{
                        id: 'complete',
                        fn: this.complete,
                        cls: 'invisible',
                        scope: this
                    },{
                        id: 'cancel',
                        place: 'left',
                        fn: scene().back,
                        scope: scene()
                    }]
                }
            };
            return options;
        },
        navigateToInsertView: function(entry) {
            scene().showView(this.insertView, {
                entry: entry,
                insert: true
            },{
                returnTo: -1
            });
        },
        navigateToSelectView: function() {
            scene().showView(this.selectView, this.createNavigationOptions());
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                'top': [{
                    id: 'associate',
                    icon: 'content/images/icons/add_24.png',
                    action: 'navigateToSelectView',
                    security: App.getViewSecurity(this.insertView, 'insert')
                }]
            });
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('(upper(Contact.NameLF) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});