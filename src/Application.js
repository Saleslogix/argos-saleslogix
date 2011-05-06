/// <reference path="../../ext/ext-core-debug.js"/>
/// <reference path="../../platform/Application.js"/>
/// <reference path="../../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Application = Ext.extend(Sage.Platform.Mobile.Application, {
    navigationState: null,
    rememberNavigationState: true,
    enableUpdateNotification: false,
    enableCaching: true,
    userDetailsQuerySelect: ['UserName','UserInfo/UserName','UserInfo/FirstName','UserInfo/LastName','DefaultOwner/OwnerDescription'],
    userOptionsToRequest: ['General;InsertSecCodeID','Calendar;DayStartTime'],
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
    onAuthenticateUserSuccess: function(result, credentials, callback, scope) {

        var user = {
            '$key': result['response']['userId'],
            '$descriptor': result['response']['prettyName'],
            'UserName': result['response']['userName']
        };

        this.context['user'] = user;

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

        if (callback)
            callback.call(scope || this, {user: user});

    },
    onAuthenticateUserFailure: function(response, ajax, callback, scope) {
        var service = this.getService();
        if (service)
            service
                .setUserName(false)
                .setPassword(false);

        if (callback)
            callback.call(scope || this, {response: response});
    },
    authenticateUser: function(credentials, options) {        
        var service = this.getService()
            .setUserName(credentials.username)
            .setPassword(credentials.password || '');

        var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
            .setContractName('system')
            .setOperationName('getCurrentUser');

        request.execute({}, {
            success: this.onAuthenticateUserSuccess.createDelegate(this, [credentials, options.success, options.scope], true),
            failure: this.onAuthenticateUserFailure.createDelegate(this, [options.failure, options.scope], true),
            aborted: this.onAuthenticateUserFailure.createDelegate(this, [options.aborted, options.scope], true)
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

        var service = this.getService();
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
                    this.requestUserDetails();
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
    requestUserDetails: function() {
        var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
            .setResourceKind('users')
            .setResourceSelector(String.format('"{0}"', this.context['user']['$key']))
            .setQueryArg('select', this.userDetailsQuerySelect.join(','));

        request.read({
            success: this.onRequestUserDetailsSuccess,
            failure: this.onRequestUserDetailsFailure,
            scope: this
        });
    },
    onRequestUserDetailsSuccess: function(entry) {
        this.context['user'] = entry;
        this.context['defaultOwner'] = entry && entry['DefaultOwner'];

        this.requestUserOptions();
    },
    onRequestUserDetailsFailure: function(response, o) {
    },
    requestUserOptions: function() {
        var batch = new Sage.SData.Client.SDataBatchRequest(this.getService())
            .setContractName('system')
            .setResourceKind('useroptions')
            .setQueryArg('select', 'name,value')
            .using(function() {
                var service = this.getService();
                Ext.each(this.userOptionsToRequest, function(item) {
                    new Sage.SData.Client.SDataSingleResourceRequest(this)
                        .setContractName('system')
                        .setResourceKind('useroptions')
                        .setResourceSelector(String.format('"{0}"', item))
                        .read();
                }, service);
            }, this);

        batch.commit({
            success: this.onRequestUserOptionsSuccess,
            failure: this.onRequestUserOptionsFailure,
            scope: this
        });
    },
    onRequestUserOptionsSuccess: function(feed) {
        var userOptions = this.context['userOptions'] = this.context['userOptions'] || {};

        Ext.each(feed && feed['$resources'], function(item) {
            var key = item && item['$descriptor'],
                value = item && item['value'];
            if (value && key) this[key] = value;
        }, userOptions);

        var insertSecCode = userOptions['General:InsertSecCodeID'],
            currentDefaultOwner = this.context['defaultOwner'] && this.context['defaultOwner']['$key'];
        if (insertSecCode && (!currentDefaultOwner || (currentDefaultOwner != insertSecCode))) this.requestOwnerDescription(insertSecCode);
    },
    onRequestUserOptionsFailure: function(response, o) {
    },
    requestOwnerDescription: function(key) {
        var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
            .setResourceKind('owners')
            .setResourceSelector(String.format('"{0}"', key))
            .setQueryArg('select', 'OwnerDescription');

        request.read({
            success: this.onRequestOwnerDescriptionSuccess,
            failure: this.onRequestOwnerDescriptionFailure,
            scope: this
        });
    },
    onRequestOwnerDescriptionSuccess: function(entry) {
        if (entry) this.context['defaultOwner'] = entry;
    },
    onRequestOwnerDescriptionFailure: function(response, o) {
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
