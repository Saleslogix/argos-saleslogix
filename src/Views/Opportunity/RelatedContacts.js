define('Mobile/SalesLogix/Views/Opportunity/RelatedContacts', ['Mobile/SalesLogix/Views/Contact/List'], function() {
    return dojo.declare('Mobile.SalesLogix.Views.Opportunity.RelatedContacts', [Mobile.SalesLogix.Views.Contact.List], {
        //Localization
        requestErrorText: 'Unable to submit to server',
        selectTitleText: 'Select Contact',

        //View Properties
        id: 'opportunity_relatedcontacts',
        selectView: 'contact_related',
        entityName: 'Contact',
        expose: false,

        contextEntityName: 'Opportunity',
        contextResourceKind: 'opportunities',
        targetEntityName: 'OpportunityContact',
        targetResourceKind: 'opportunityContacts',

        complete: function(){
            var view = App.getPrimaryActiveView(),
                selectionModel = view && view.get('selectionModel'),
                value = null;
            if (!selectionModel) return;

            var selections = selectionModel.getSelections();

            if (selectionModel.getSelectionCount() == 0 && view.options.allowEmptySelection)
                ReUI.back();

            for (var selectionKey in selections)
            {
                var context = App.isNavigationFromResourceKind([this.contextResourceKind]);
                value = { '$name': this.targetEntityName };
                value[this.contextEntityName] = { '$key': context.key };
                value[this.entityName] = { '$key': selectionKey };
            }

            if (value)
                this.insert(value);
        },
        insert: function(entry) {
            var request = this.createInsertRequest();
            if (request)
                request.create(entry, {
                    success: this.onInsertSuccess,
                    failure: this.onInsertFailure,
                    scope: this
                });
        },
        onInsertSuccess: function(entry) {
            App.onRefresh({
                resourceKind: this.resourceKind
            });
            ReUI.back();
        },
        onInsertFailure: function(response, o) {
            alert(dojo.string.substitute(this.requestErrorText, [response, o]));
            Sage.Platform.Mobile.ErrorManager.addError(response, o, this.options, 'failure');
        },
        createInsertRequest: function() {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService());
            request.setResourceKind(this.targetResourceKind);
            return request;
        },
        createNavigationOptions: function() {
            var options = {
                queryScopeExpression: '',
                where: this.expandExpression(this.options.prefilter),
                selectionOnly: true,
                singleSelect: true,
                singleSelectAction: 'complete',
                allowEmptySelection: false,
                title: this.selectTitleText,
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
        navigateToAssociateView: function() {
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
                    action: 'navigateToAssociateView',
                    security: App.getViewSecurity(this.insertView, 'insert')
                }]
            });
        }
    });
});