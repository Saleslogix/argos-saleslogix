/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/TicketActivityItem/List', ['Sage/Platform/Mobile/List'], function() {

    dojo.declare('Mobile.SalesLogix.Views.TicketActivityItem.List', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.Product.Name %}</h3>',
            '<h4>{%: $.ItemAmount %}</h4>'
        ]),

        //Localization
        titleText: 'Parts',

        //View Properties
        id: 'ticketactivityitem_list',
        insertView: 'ticketactivityitem_edit',
        insertSecurity: 'Entities/TicketActivityItem/Add',
        security: 'Entities/TicketActivityItem/View',
        expose: false,
        icon: 'content/images/icons/product_24.png',
        querySelect: [
            'Product/Name',
            'ItemDescription',
            'ItemAmount',
            'ItemQuantity',
            'ItemTotalAmount'
        ],
        resourceKind: 'ticketActivityItems',


        complete: function(){
            var view = App.getPrimaryActiveView(),
                selectionModel = view && view.get('selectionModel'),
                entry = null;
            if (!selectionModel) return;

            if (selectionModel.getSelectionCount() == 0 && view.options.allowEmptySelection)
                ReUI.back();

            var context = App.isNavigationFromResourceKind(['tickets']),
                selections = selectionModel.getSelections();
            for (var selectionKey in selections)
            {
                entry = {
                    'Opportunity': {'$key': context.key}, // fix
                    'Contact': view.entries[selectionKey] //fix
                };
            }

            if (entry)
                this.navigateToInsertView(entry);
        },
        createNavigationOptions: function() {
            var options = {
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
                    id: 'associate',
                    icon: 'content/images/icons/add_24.png',
                    action: 'navigateToSelectView',
                    security: App.getViewSecurity(this.insertView, 'insert')
                }]
            });
        },
        formatSearchQuery: function(query) {
            return dojo.string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});
