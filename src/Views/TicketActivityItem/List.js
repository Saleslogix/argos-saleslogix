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
            '<h4>{%: $.ItemDescription %}</h4>'
        ]),

        //Localization
        titleText: 'Parts',

        //View Properties
        id: 'ticketactivityitem_list',
        insertView: 'ticketactivityitem_edit',
        detailView: 'ticketactivityitem_detail',
        selectView: 'ticketactivityitem_productlist',
        expose: false,
        icon: 'content/images/icons/product_24.png',
        querySelect: [
            'Product/Name',
            'ItemDescription',
            'ItemAmount'
        ],
        resourceKind: 'ticketActivityItems',

        complete: function(){
            var view = App.getPrimaryActiveView(),
                selectionModel = view && view.get('selectionModel'),
                entry = null;
            if (!selectionModel) return;

            if (selectionModel.getSelectionCount() == 0 && view.options.allowEmptySelection)
                ReUI.back();

            var context = App.isNavigationFromResourceKind(['ticketActivities']),
                selections = selectionModel.getSelections();
            for (var selectionKey in selections)
            {
                entry = {
                    'TicketActivity': {'$key': context.key},
                    'Product': view.entries[selectionKey]
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
                    action: 'navigateToSelectView'
                }]
            });
        },
        formatSearchQuery: function(query) {
            return dojo.string.substitute('(upper(Product.Name) like "${0}%" or upper(Product.Family) like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});
