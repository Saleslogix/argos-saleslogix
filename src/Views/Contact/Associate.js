/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Contact/Associate', ['Mobile/SalesLogix/Views/Contact/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Contact.Associate', [Mobile.SalesLogix.Views.Contact.List], {
        //Localization
        associateContactTitleText: 'Associate Contact',


        id: 'contact_associate',
        expose: false,

        associateContact: function(){
            var viewId = 'contact_related',
                viewKind = 'opportunityContacts',
                viewEntity = 'OpportunityContact',
                viewTargetEntity = 'Contact',
                parentKind = 'opportunities',
                parentEntity = 'Opportunity',
                title = this.associateContactTitleText,
                lookup = {
                    complete: function(){
                        var view = App.getPrimaryActiveView(),
                            selections,
                            value = {};
                        if (view && view._selectionModel) {
                            selections = view._selectionModel.getSelections();

                            if (0 == view._selectionModel.getSelectionCount() && view.options.allowEmptySelection)
                                ReUI.back();

                            for (var selectionKey in selections) {
                                var context = App.isNavigationFromResourceKind( [parentKind] );
                                value['$name'] = viewEntity;
                                value[parentEntity] = { '$key': context.key };
                                value[viewTargetEntity] = { '$key': selectionKey };
                            }
                            lookup.insert(value);
                        }
                    },
                    insert: function(entry) {
                        var request = lookup.createInsertRequest();
                        if (request)
                            request.create(entry, {
                                success: lookup.onInsertSuccess,
                                failure: lookup.onInsertFailure,
                                scope: this
                            });
                    },
                    onInsertSuccess: function(entry) {
                        App.onRefresh({
                            resourceKind: viewKind
                        });
                        ReUI.back();
                    },
                    onInsertFailure: function(response, o) {
                        this.onRequestDataFailure(response, o);
                    },
                    createInsertRequest: function() {
                        var request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService(false));
                        request.setResourceKind(viewKind);
                        return request;
                    },
                    createNavigationOptions: function() {
                        var options = {
                            selectionOnly: true,
                            singleSelect: true,
                            singleSelectAction: 'complete',
                            allowEmptySelection: false,
                            title: title,
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
                    navigateToListView: function() {
                        var view = App.getView(viewId),
                            options = lookup.createNavigationOptions();
                        if (view && options)
                            view.show(options);
                    }
                };

            lookup.navigateToListView();
        },
        _onRefresh: function(options) {
            this.inherited(arguments);

            if (options.resourceKind === 'opportunityContacts')
                this.refreshRequired = true;
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
                    action: 'associateContact',
                    security: App.getViewSecurity(this.insertView, 'insert')
                }]
            });
        }
    });
});