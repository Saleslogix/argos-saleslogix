define('Mobile/SalesLogix/Views/Contact/AssociateList', ['Sage/Platform/Mobile/List'], function() {
    return dojo.declare('Mobile.SalesLogix.Views.Contact.AssociateList', [Sage.Platform.Mobile.List], {
        requestErrorText: 'Unable to submit to server',
        //Template
        itemTemplate: new Simplate([
            '<h3>{%: $.NameLF %}</h3>',
            '<h4>{%: $.AccountName %}</h4>'
        ]),

        //Localization
        titleText: 'Contacts',

        //View Properties
        icon: 'content/images/icons/Contacts_24x24.png',
        id: 'contact_associatelist',
        expose: false,
        security: 'Entities/Contact/View',
        insertView: 'contact_edit',
        queryOrderBy: 'LastNameUpper,FirstName',
        querySelect: [
            'AccountName',
            'NameLF'
        ],
        entityName: 'Contact',
        resourceKind: 'contacts',
        selectView: null,

        postCreate: function(){
            this.inherited(arguments);
            this.createSelectView();
        },
        createSelectView: function(){
            var view = new Sage.Platform.Mobile.List({
                id: 'contact_associateselect',
                expose: false,
                title: this.titleText,
                itemTemplate: this.itemTemplate,
                security: this.security,
                queryOrderBy: this.queryOrderBy,
                querySelect: this.querySelect,
                resourceKind: this.resourceKind,
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
                },
                _onSearchExpression: function(expression) {
                    this.clear(false);
                    this.queryText = '';
                    this.query = expression;
                    // allow global search
                    this.options.where = null;
                    this.queryWhere = null;
                    this.requestData();
                }
            });
            this.selectView = view;
            App.registerView(view);
        },

        complete: function(){
            var view = App.getPrimaryActiveView(),
                selections,
                value = {};
            if (view && view._selectionModel) {
                selections = view._selectionModel.getSelections();

                if (0 == view._selectionModel.getSelectionCount() && view.options.allowEmptySelection)
                    ReUI.back();

                for (var selectionKey in selections) {
                    var context = App.isNavigationFromResourceKind( [this.options.context.resourceKind] );
                    value['$name'] = this.options.target.entity;
                    value[this.options.context.entityName] = { '$key': context.key };
                    value[this.entityName] = { '$key': selectionKey };
                }
                this.insert(value);
            }
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
            var request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService(false));
            request.setResourceKind(this.options.target.resourceKind);
            return request;
        },
        createNavigationOptions: function() {
            var options = {
                selectionOnly: true,
                singleSelect: true,
                singleSelectAction: 'complete',
                allowEmptySelection: false
            };
            if('prefilter' in this.options)
                options.where = this.expandExpression(this.options.prefilter);
            return options;
        },
        navigateToAssociateView: function() {
            var view = this.selectView,
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
        },
        formatSearchQuery: function(query) {
            return dojo.string.substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        }
    });
});




