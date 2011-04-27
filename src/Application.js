/// <reference path="../../ext/ext-core-debug.js"/>
/// <reference path="../../platform/Application.js"/>
/// <reference path="../../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Application = Ext.extend(Sage.Platform.Mobile.Application, {
    navigationState: null,
    rememberNavigationState: true,
    enableUpdateNotification: false,
    enableCaching: true,
    initEvents: function() {
        Mobile.SalesLogix.Application.superclass.initEvents.apply(this, arguments);
    },
    init: function() {
        if (Ext.isIE && Ext.ieVersion < 9) window.location.href = 'unsupported.html';

        Mobile.SalesLogix.Application.superclass.init.call(this);

        this._loadNavigationState();
        this._loadPreferences();
    },
    _viewTransitionTo: function(view) {
        Mobile.SalesLogix.Application.superclass._viewTransitionTo.apply(this, arguments);

        this._checkSaveNavigationState();
    },
    _checkSaveNavigationState: function() {
        if (this.rememberNavigationState !== false) this._saveNavigationState();
    },
    _checkForUpdate: function() {
        var cache = window.applicationCache;
        if (cache)
        {
            Ext.EventManager.on(cache, 'updateready', this._notifyUpdateAvailable, this, {single: true});

            // 4 == updateready, if that event has already been fired, check here.
            if (cache.status == 4) this._notifyUpdateAvailable();
        }
    },
    _notifyUpdateAvailable: function() {
        if (this.bars['updatebar'])
            this.bars['updatebar'].show();
    },
    _saveNavigationState: function() {
        try
        {            
            if (window.localStorage)
                window.localStorage.setItem('navigationState', Ext.encode(ReUI.context.history));
        }
        catch (e) { }
    },
    run: function() {
        Mobile.SalesLogix.Application.superclass.run.apply(this, arguments);
        
        if (App.isOnline() || !App.enableCaching)
        {
            this.handleAuthentication();
        }
        else
        {
            // todo: always navigate to home when offline? data may not be available for restored state.
            this.navigateToHomeView();
        }

        if (this.enableUpdateNotification) this._checkForUpdate();
    },
    authenticateUser: function(credentials, options) {        
        var service = this.getService()
            .setUserName(credentials.username)
            .setPassword(credentials.password || '');
        
        var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
            .setResourceKind('users')
            .setQueryArgs({
                'select': 'UserName,UserInfo/UserName,UserInfo/FirstName,UserInfo/LastName,DefaultOwner/OwnerDescription',
                'where': String.format('UserName eq "{0}"', credentials.username)
            })
            .setCount(1)
            .setStartIndex(1);

        request.read({
            success: function (feed) {
                if (feed['$resources'].length <= 0) {
                    if (options.failure)
                        options.failure.call(options.scope || this, {user: false});
                }
                else {
                    this.context['user'] = feed['$resources'][0];

                    if (credentials.remember)
                    {
                        try
                        {
                            if (window.localStorage)
                                window.localStorage.setItem('credentials', Base64.encode(Ext.encode({
                                    username: credentials.username,
                                    password: credentials.password || ''
                                })));
                        }
                        catch (e) { }
                    }

                    if (options.success)
                        options.success.call(options.scope || this, {user: feed['$resources'][0]});
                }
            },
            failure: function (response, o) {
                service
                    .setUserName(false)
                    .setPassword(false);

                if (options.failure)
                    options.failure.call(options.scope || this, {response: response});
            },
            aborted: function(response, o) {
                if (options.aborted)
                    options.aborted.call(options.scope || this, {response: response});
            },
            scope: this
        });
    },
    reload: function() {
        window.location.reload();
    },
    logOut: function() {
        if (window.localStorage)
        {
            window.localStorage.removeItem('credentials');
            window.localStorage.removeItem('navigationState');
        }

        var service = App.getService();
        if (service)
            service
                .setUserName(false)
                .setPassword(false);

        this.reload();
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
            this.authenticateUser(credentials, {
                success: function(result) {
                    this.requestDefaultOwner();
                    this.navigateToInitialView();
                },
                failure: function(result) {
                    this.navigateToLoginView();
                },
                aborted: function(result) {
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
    _clearNavigationState: function() {
        try
        {
            this.initialNavigationState = null;

            if (window.localStorage)
                window.localStorage.removeItem('navigationState');
        }
        catch (e) { }
    },
    _loadNavigationState: function() {
        try
        {
            if (window.localStorage)
                this.navigationState = window.localStorage.getItem('navigationState');
        }
        catch (e) { }
    },
    _loadPreferences: function() {
        try {
            if (window.localStorage)
                this.preferences = Ext.decode(window.localStorage.getItem('preferences'));
        }
        catch(e) {}

        //Probably, the first time, its being accessed, or user cleared
        //the data. So lets initialize the object, with default ones.
        if (!this.preferences)
        {
            var views = this.getDefaultViews();
            
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
    requestDefaultOwner: function() {
        var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
            .setResourceKind('useroptions')
            .setContractName('system')
            .setQueryArg('select', 'name,value')
            .setQueryArg('where', "category eq 'General' and name eq 'InsertSecCodeID'");

        request.allowCacheUse = true;
        request.read({
            success: this.requestDefaultOwnerSuccess,
            failure: this.requestDefaultOwnerFailure,
            scope: this
        });
    },
    requestDefaultOwnerFailure: function(response, o) {
    },
    requestDefaultOwnerSuccess: function(entry) {
        this.processDefaultOwner(entry);
    },
    processDefaultOwner: function(entry) {
        if (!entry || !entry['value'])
        {
            this.context['DefaultOwner'] = this.context['user']['DefaultOwner'];
            return;
        }

        this.requestOwnerDescription(entry['value']);
    },
    requestOwnerDescription: function(key) {
        var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
            .setResourceKind('owners')
            .setContractName('dynamic')
            .setQueryArg('select', 'OwnerDescription')
            .setQueryArg('where', String.format("id eq '{0}'", key));

        request.allowCacheUse = true;

        request.read({
            success: this.requestOwnerDescriptionSuccess,
            failure: this.requestOwnerDescriptionFailure,
            scope: this
        });
    },
    requestOwnerDescriptionSuccess: function(entry) {
        if (!this.context['DefaultOwner']) this.context['DefaultOwner'] = entry;
    },
    requestOwnerDescriptionFailure: function(response, o) {
    },
    persistPreferences: function() {
        try {
            if (window.localStorage)
                window.localStorage.setItem('preferences', Ext.encode(App.preferences));
        }
        catch(e) {}
    },
    getDefaultViews: function() {
        return [
            'account_list',
            'contact_list',
            'lead_list',
            'opportunity_list',
            'ticket_list',
            'useractivity_list',
            'history_list'
        ];
    },
    getExposedViews: function() {
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
        try
        {
            var restoredState = this.navigationState,
                restoredHistory = restoredState && Ext.decode(restoredState),
                cleanedHistory = this.cleanRestoredHistory(restoredHistory);

            this._clearNavigationState();

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
            this._clearNavigationState();
            
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
    navigateToActivityInsertView: function() {
        var view = this.getView('activity_types_list');
        if (view)
            view.show();
    },
    initiateCall: function() {
        // shortcut for environment call
        Mobile.SalesLogix.Environment.initiateCall.apply(this, arguments);
    },
    initiateEmail: function() {
        // shortcut for environment call
        Mobile.SalesLogix.Environment.initiateEmail.apply(this, arguments);
    },
    showMapForAddress: function() {
        // shortcut for environment call
        Mobile.SalesLogix.Environment.showMapForAddress.apply(this, arguments);
    }
});
