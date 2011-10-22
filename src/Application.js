/// <reference path="../../ext/ext-core-debug.js"/>
/// <reference path="../../platform/Application.js"/>
/// <reference path="../../sdata/SDataService.js"/>


define('Mobile/SalesLogix/Application', ['Sage/Platform/Mobile/Application'], function() {

    return dojo.declare('Mobile.SalesLogix.Application', [Sage.Platform.Mobile.Application], {
        navigationState: null,
        rememberNavigationState: true,
        enableUpdateNotification: false,
        enableCaching: true,
        userDetailsQuerySelect: ['UserName','UserInfo/UserName','UserInfo/FirstName','UserInfo/LastName','DefaultOwner/OwnerDescription'],
        userOptionsToRequest: ['General;InsertSecCodeID','Calendar;DayStartTime','Calendar;FirstDayofWeek'],
        init: function() {
            if (dojo.isIE && dojo.isIE < 9) window.location.href = 'unsupported.html';

            this.inherited(arguments);

            this._loadNavigationState();
            this._loadPreferences();
        },
        initConnects: function() {
            this.inherited(arguments);

            if (window.applicationCache)
                this._connects.push(dojo.connect(window.applicationCache, 'updateready', this, this._checkForUpdate));
        },
        _viewTransitionTo: function(view) {
            this.inherited(arguments);

            this._checkSaveNavigationState();
        },
        _checkSaveNavigationState: function() {
            if (this.rememberNavigationState !== false) this._saveNavigationState();
        },
        _checkForUpdate: function() {
            var applicationCache = window.applicationCache;
            if (applicationCache && this.enableUpdateNotification)
            {
                if (applicationCache.status == 4) this._notifyUpdateAvailable();
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
                    window.localStorage.setItem('navigationState', dojo.toJson(ReUI.context.history));
            }
            catch (e) { }
        },
        run: function() {
            this.inherited(arguments);

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
        onAuthenticateUserSuccess: function(credentials, callback, scope, result) {

            var user = {
                '$key': result['response']['userId'],
                '$descriptor': result['response']['prettyName'],
                'UserName': result['response']['userName']
            };

            this.context['user' ] = user;
            this.context['roles'] = result['response']['roles'];
            this.context['securedActions'] = result['response']['securedActions'];
            this.context['userSecurity'] = {};

            dojo.forEach(this.context['securedActions'], function(item) {
                this[item] = true;
            }, this.context['userSecurity']);
            
            if (credentials.remember)
            {
                try
                {
                    if (window.localStorage)
                        window.localStorage.setItem('credentials', Base64.encode(dojo.toJson({
                            username: credentials.username,
                            password: credentials.password || ''
                        })));
                }
                catch (e) { }
            }

            if (callback)
                callback.call(scope || this, {user: user});

        },
        onAuthenticateUserFailure: function(callback, scope, response, ajax) {
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
                success: dojo.hitch(this, this.onAuthenticateUserSuccess, credentials, options.success, options.scope), // this.onAuthenticateUserSuccess.createDelegate(this, [credentials, options.success, options.scope], true),
                failure: dojo.hitch(this, this.onAuthenticateUserFailure, options.failure, options.scope), // this.onAuthenticateUserFailure.createDelegate(this, [options.failure, options.scope], true),
                aborted: dojo.hitch(this, this.onAuthenticateUserFailure, options.failure, options.scope) // this.onAuthenticateUserFailure.createDelegate(this, [options.aborted, options.scope], true)
            });
        },
        hasSecurity: function(security) {
            if (!security) return true;

            var user = this.context['user'],
                userId = user && user['$key'],
                userSecurity = this.context['userSecurity'] || {};

            if (/^ADMIN\s*/i.test(userId)) return true;

            return !!userSecurity[security];
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
                        credentials = encoded && dojo.fromJson(encoded);
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
                    this.preferences = dojo.fromJson(window.localStorage.getItem('preferences'));
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
                .setResourceSelector(dojo.string.substitute('"${0}"', [this.context['user']['$key']]))
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
                    dojo.forEach(this.userOptionsToRequest, function(item) {
                        new Sage.SData.Client.SDataSingleResourceRequest(this)
                            .setContractName('system')
                            .setResourceKind('useroptions')
                            .setResourceSelector(dojo.string.substitute('"${0}"', [item]))
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

            dojo.forEach(feed && feed['$resources'], function(item) {
                var key = item && item['$descriptor'],
                    value = item && item['value'];
                if (value && key) this[key] = value;
            });

            var insertSecCode = userOptions['General:InsertSecCodeID'],
                currentDefaultOwner = this.context['defaultOwner'] && this.context['defaultOwner']['$key'];
            if (insertSecCode && (!currentDefaultOwner || (currentDefaultOwner != insertSecCode))) this.requestOwnerDescription(insertSecCode);
        },
        onRequestUserOptionsFailure: function(response, o) {
        },
        requestOwnerDescription: function(key) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
                .setResourceKind('owners')
                .setResourceSelector(dojo.string.substitute('"${0}"', [key]))
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
                    window.localStorage.setItem('preferences', dojo.toJson(App.preferences));
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
                'calendar_daylist',
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
                    restoredHistory = restoredState && dojo.fromJson(restoredState),
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

});