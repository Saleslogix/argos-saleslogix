/// <reference path="../../ext/ext-core-debug.js"/>
/// <reference path="../../platform/Application.js"/>
/// <reference path="../../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Application = Ext.extend(Sage.Platform.Mobile.Application, {
    defaultVirtualDirectory: 'sdata',
    defaultApplicationName: 'slx',
    defaultContractName: 'dynamic',
    titleText: 'Mobile Demo',
    enableCaching: true,
    init: function() {
        Mobile.SalesLogix.Application.superclass.init.call(this);

        // prevent ReUI from attempting to load the URLs view as we handle that ourselves.
        // todo: add support for handling the URL appropriately.
        window.location.hash = "";

        Ext.EventManager.on(window, 'unload', function() {
            try
            {
                if (window.localStorage && this.saveContextOnExit !== false)
                    window.localStorage.setItem('restore', Ext.encode(ReUI.context.history));
            }
            catch (e) { }             
        }, this);

        Ext.get("backButton").on("longpress", function() {
            var home = this.getView('home');
            if (home) {
                home.show();
            }
        }, this);
        
        this.fetchPreferences();
    },
    run: function() {
        if (App.isOnline() || !App.enableCaching)
        {
            this.handleAuthentication();
        }
        else
        {
            // todo: always navigate to home when offline? data may not be available for restored state.
            this.navigateToHomeView();
        }
    },
    handleAuthentication: function() {        
        try
        {
            if (window.localStorage)
            {
                var stored = window.localStorage.getItem('credentials'),
                    encoded = stored && Base64.decode(stored),
                    credentials = encoded && Ext.decode(encoded);
            }
        }
        catch (e) { }

        if (credentials)
        {
            var service = this.getService()
                .setUserName(credentials.username)
                .setPassword(credentials.password || '');

            var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
                .setResourceKind('users')
                .setQueryArgs({
                    'select': 'UserName',
                    'where': String.format('UserName eq "{0}"', credentials.username)
                })
                .setCount(1)
                .setStartIndex(1);

            request.read({
                success: function (feed) {
                    if (feed['$resources'].length <= 0) {
                        service
                            .setUserName(false)
                            .setPassword(false);

                        this.navigateToLoginView();
                    }
                    else {
                        App.context['user'] = feed['$resources'][0]['$key'];
                        
                        this.navigateToInitialView();
                    }
                },
                failure: function (response, o) {                    
                    service
                        .setUserName(false)
                        .setPassword(false);

                    this.navigateToLoginView();
                },
                scope: this
            });
        }
        else
        {
            this.navigateToLoginView();
        }
    },
    fetchPreferences: function() {
        try {
            if (window.localStorage)
                this.preferences = Ext.decode(window.localStorage.getItem('preferences'));
        }
        catch(e) {}

        //Probably, the first time, its being accessed, or user cleared
        //the data. So lets initialize the object, with default ones.
        if (!this.preferences)
        {
            var views = this.getExposedViews();
            
            this.preferences = {
                home: {
                    visible: views
                },
                configure: {
                    order: views.slice(0)
                }
            };
        }
    },
    persistPreferences: function() {
        try {
            if (window.localStorage)
                window.localStorage.setItem('preferences', Ext.encode(App.preferences));
        }
        catch(e) {}
    },
    getExposedViews : function() {
        var exposedViews = [],
            view;

        for (var v in this.views)
        {
            view = App.getView(v);
            if (view.expose != false && view.id != 'home')
                exposedViews.push(v);
        }

        return exposedViews;
    },    
    setup: function () {
        Mobile.SalesLogix.Application.superclass.setup.apply(this, arguments);

        this.registerToolbar(new Sage.Platform.Mobile.MainToolbar({
            name: 'tbar',
            title: this.titleText
        }));

        this.registerToolbar(new Sage.Platform.Mobile.FloatToolbar({
            name: 'fbar'
        }));

        this.registerView(new Sage.Platform.Mobile.Calendar());
        
        this.registerView(new Mobile.SalesLogix.Login());
        this.registerView(new Mobile.SalesLogix.Home());
        this.registerView(new Mobile.SalesLogix.Help());
        this.registerView(new Mobile.SalesLogix.Settings());
        this.registerView(new Mobile.SalesLogix.Configure());
        this.registerView(new Mobile.SalesLogix.PickList());
        this.registerView(new Mobile.SalesLogix.SelectList());
        this.registerView(new Mobile.SalesLogix.ContextDialog());
        this.registerView(new Mobile.SalesLogix.AddAccountContact());
        this.registerView(new Mobile.SalesLogix.AreaCategoryIssueLookup());
        
        this.registerView(new Mobile.SalesLogix.NameEdit());
        this.registerView(new Mobile.SalesLogix.Address.Edit());

        this.registerView(new Mobile.SalesLogix.Account.List());
        this.registerView(new Mobile.SalesLogix.Account.Detail());
        this.registerView(new Mobile.SalesLogix.Account.Edit());
        this.registerView(new Mobile.SalesLogix.Account.List({
            id: 'account_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Campaign.List({
            expose: false
        }));
        this.registerView(new Mobile.SalesLogix.Campaign.Detail());
        this.registerView(new Mobile.SalesLogix.Campaign.Edit());
        this.registerView(new Mobile.SalesLogix.Campaign.List({
            id: 'campaign_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Contact.Edit());
        this.registerView(new Mobile.SalesLogix.Contact.List());
        this.registerView(new Mobile.SalesLogix.Contact.Detail());
        this.registerView(new Mobile.SalesLogix.Contact.List({
            id: 'contact_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.SalesOrder.Edit());
        this.registerView(new Mobile.SalesLogix.SalesOrder.List({
            expose: false
        }));
        this.registerView(new Mobile.SalesLogix.SalesOrder.Detail());
        this.registerView(new Mobile.SalesLogix.SalesOrder.List({
            id: 'salesorder_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Contract.Edit());
        this.registerView(new Mobile.SalesLogix.Contract.List({
            expose: false
        }));
        this.registerView(new Mobile.SalesLogix.Contract.Detail());
        this.registerView(new Mobile.SalesLogix.Contract.List({
            id: 'contract_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Opportunity.Edit());
        this.registerView(new Mobile.SalesLogix.Opportunity.List());
        this.registerView(new Mobile.SalesLogix.Opportunity.Detail());
        this.registerView(new Mobile.SalesLogix.Opportunity.List({
            id: 'opportunity_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Lead.Edit());
        this.registerView(new Mobile.SalesLogix.Lead.List());
        this.registerView(new Mobile.SalesLogix.Lead.Detail());
        this.registerView(new Mobile.SalesLogix.Lead.List({
            id: 'lead_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Return.List({
            expose: false
        }));
        this.registerView(new Mobile.SalesLogix.Return.Detail());
        this.registerView(new Mobile.SalesLogix.Return.Edit());
        this.registerView(new Mobile.SalesLogix.Return.List({
            id: 'return_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Ticket.List());
        this.registerView(new Mobile.SalesLogix.Ticket.Detail());
        this.registerView(new Mobile.SalesLogix.Ticket.Edit());
        this.registerView(new Mobile.SalesLogix.Ticket.List({
            id: 'ticket_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Activity.Detail());
        this.registerView(new Mobile.SalesLogix.Activity.Edit());
        this.registerView(new Mobile.SalesLogix.Activity.LeadContextEdit());
        this.registerView(new Mobile.SalesLogix.Activity.TypesList());
        this.registerView(new Mobile.SalesLogix.Activity.List({
            id: 'activity_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Defect.List({
            expose: false
        }));
        this.registerView(new Mobile.SalesLogix.Defect.Detail());
        this.registerView(new Mobile.SalesLogix.Defect.Edit());
        this.registerView(new Mobile.SalesLogix.Defect.List({
            id: 'defect_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.DefectProblem.Detail());
        this.registerView(new Mobile.SalesLogix.DefectProblem.Edit());
        this.registerView(new Mobile.SalesLogix.DefectProblem.Detail({
            id: 'defectproblem_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.DefectSolution.Detail());
        this.registerView(new Mobile.SalesLogix.DefectSolution.Edit());
        this.registerView(new Mobile.SalesLogix.DefectSolution.Detail({
            id: 'defectsolution_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Note.Detail());
        this.registerView(new Mobile.SalesLogix.Note.Edit());
        this.registerView(new Mobile.SalesLogix.Note.List({
            id: 'note_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.History.Detail());
        this.registerView(new Mobile.SalesLogix.History.List({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.User.List({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Owner.List({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.LeadSource.List({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Account.Lookup({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Contact.Lookup({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Opportunity.Lookup({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Ticket.Lookup({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Lead.Lookup({
            expose: false
        }));
    },
    cleanRestoredHistory: function(restoredHistory) {
        var result = [],
            hasRoot = false;

        for (var i = restoredHistory.length - 1; i >= 0 && !hasRoot; i--)
        {
            if (App.hasView(restoredHistory[i].page))
                result.unshift(restoredHistory[i]);

            hasRoot = (restoredHistory[i].page === 'home');
        }

        return hasRoot && result;
    },
    navigateToInitialView: function() {
        if (window.localStorage)
        {
            try
            {
                var restoredState = window.localStorage.getItem('restore'),
                    restoredHistory = restoredState && Ext.decode(restoredState),
                    cleanedHistory = this.cleanRestoredHistory(restoredHistory);

                window.localStorage.removeItem('restore');

                if (cleanedHistory)
                {
                    ReUI.context.transitioning = true;
                    ReUI.context.history = ReUI.context.history.concat(cleanedHistory.slice(0, cleanedHistory.length - 1));

                    for (var i = 0; i < cleanedHistory.length - 1; i++)
                    {
                        window.location.hash = cleanedHistory[i].hash;
                    }

                    ReUI.context.transitioning = false;

                    var last = cleanedHistory[cleanedHistory.length - 1];
                        view = App.getView(last.page),
                        options = last.data && last.data.options;

                    view.show(options);
                }
                else
                {
                    this.navigateToHomeView();
                }
            }
            catch (e)
            {
                window.localStorage.removeItem('restore');

                this.navigateToHomeView();
            }
        }
        else
        {
            this.navigateToHomeView();
        }
    },
    navigateToLoginView: function() {
        var view = this.getView('login');
        if (view)
            view.show();
    },
    navigateToHomeView: function() {
        var view = this.getView('home');
        if (view)
            view.show();
    },
    navigateToActivityInsertView: function(options) {
        var detailView = App.getView(options.id),
            entry = detailView.entry,
            view = this.getView('activity_types_list');

        if (view && detailView)
            view.show({
                'descriptor': entry.$descriptor,
                'entry': entry,
                'key': entry.$key,
                'relatedResourceKind': detailView.resourceKind
            });
    }
});

// instantiate application instance
var App = new Mobile.SalesLogix.Application();