define('Mobile/SalesLogix/Application', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/connect',
    'dojo/_base/json',
    'dojo/_base/lang',
    'dojo/has',
    'dojo/string',
    'Sage/Platform/Mobile/ErrorManager',
    'Mobile/SalesLogix/Environment',
    'Sage/Platform/Mobile/Application',
    'dojo/_base/sniff'
], function(
    declare,
    array,
    connect,
    json,
    lang,
    has,
    string,
    ErrorManager,
    environment,
    Application
) {

    return declare('Mobile.SalesLogix.Application', [Application], {
        navigationState: null,
        rememberNavigationState: true,
        enableUpdateNotification: false,
        enableCaching: true,
        userDetailsQuerySelect: ['UserName','UserInfo/UserName','UserInfo/FirstName','UserInfo/LastName','DefaultOwner/OwnerDescription'],
        userOptionsToRequest: [
            'General;InsertSecCodeID',
            'Calendar;DayStartTime',
            'Calendar;FirstDayofWeek',
            'ActivityMeetingOptions;AlarmEnabled',
            'ActivityMeetingOptions;AlarmLead',
            'ActivityMeetingOptions;Duration',
            'ActivityPhoneOptions;AlarmEnabled',
            'ActivityPhoneOptions;AlarmLead',
            'ActivityPhoneOptions;Duration',
            'ActivityToDoOptions;AlarmEnabled',
            'ActivityToDoOptions;AlarmLead',
            'ActivityToDoOptions;Duration',
            'ActivityPersonalOptions;AlarmEnabled',
            'ActivityPersonalOptions;AlarmLead',
            'ActivityPersonalOptions;Duration'
        ],
        serverVersion: {
            'major': 8,
            'minor': 0,
            'revision': 0
        },
        init: function() {
            if (has('ie') && has('ie') < 9) window.location.href = 'unsupported.html';

            this.inherited(arguments);

            this._loadNavigationState();
            this._loadPreferences();
        },
        initConnects: function() {
            this.inherited(arguments);

            if (window.applicationCache)
                this._connects.push(connect.connect(window.applicationCache, 'updateready', this, this._checkForUpdate));
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
                    window.localStorage.setItem('navigationState', json.toJson(ReUI.context.history));
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

            if (this.enableUpdateNotification)
                this._checkForUpdate();
        },
        onAuthenticateUserSuccess: function(credentials, callback, scope, result) {
            var user = {
                '$key': lang.trim(result['response']['userId']),
                '$descriptor': result['response']['prettyName'],
                'UserName': result['response']['userName']
            };

            this.context['user' ] = user;
            this.context['roles'] = result['response']['roles'];
            this.context['securedActions'] = result['response']['securedActions'];

            if (this.context['securedActions'])
            {
                array.forEach(this.context['securedActions'], function(item) {
                    this[item] = true;
                }, (this.context['userSecurity'] = {}));
            }
            else
            {
                // downgrade server version as only 8.0 has `securedActions` as part of the
                // `getCurrentUser` response.
                this.serverVersion = {
                    'major': 7,
                    'minor': 5,
                    'revision': 4
                };
            }
            
            if (credentials.remember)
            {
                try
                {
                    if (window.localStorage)
                        window.localStorage.setItem('credentials', Base64.encode(json.toJson({
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
                success: lang.hitch(this, this.onAuthenticateUserSuccess, credentials, options.success, options.scope), // this.onAuthenticateUserSuccess.createDelegate(this, [credentials, options.success, options.scope], true),
                failure: lang.hitch(this, this.onAuthenticateUserFailure, options.failure, options.scope), // this.onAuthenticateUserFailure.createDelegate(this, [options.failure, options.scope], true),
                aborted: lang.hitch(this, this.onAuthenticateUserFailure, options.failure, options.scope) // this.onAuthenticateUserFailure.createDelegate(this, [options.aborted, options.scope], true)
            });
        },
        hasAccessTo: function(security) {
            if (!security) return true;

            var user = this.context['user'],
                userId = user && user['$key'],
                userSecurity = this.context['userSecurity'];

            if (/^ADMIN\s*/i.test(userId)) return true;

            if (typeof userSecurity === 'undefined') return true; // running against a pre 8.0 SalesLogix environment

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
                        credentials = encoded && json.fromJson(encoded);
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
                    this.preferences = json.fromJson(window.localStorage.getItem('preferences'));
            }
            catch (e) { }

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
                .setResourceSelector(string.substitute('"${0}"', [this.context['user']['$key']]))
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
                    array.forEach(this.userOptionsToRequest, function(item) {
                        new Sage.SData.Client.SDataSingleResourceRequest(this)
                            .setContractName('system')
                            .setResourceKind('useroptions')
                            .setResourceSelector(string.substitute('"${0}"', [item]))
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

            array.forEach(feed && feed['$resources'], function(item) {
                var key = item && item['$descriptor'],
                    value = item && item['value'];

                if (value && key)
                    userOptions[key] = value;
            });

            var insertSecCode = userOptions['General:InsertSecCodeID'],
                currentDefaultOwner = this.context['defaultOwner'] && this.context['defaultOwner']['$key'];

            if (insertSecCode && (!currentDefaultOwner || (currentDefaultOwner != insertSecCode)))
                this.requestOwnerDescription(insertSecCode);
        },
        onRequestUserOptionsFailure: function(response, o) {
            ErrorManager.addError(response, o, {}, 'failure');
        },
        requestOwnerDescription: function(key) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
                .setResourceKind('owners')
                .setResourceSelector(string.substitute('"${0}"', [key]))
                .setQueryArg('select', 'OwnerDescription');

            request.read({
                success: this.onRequestOwnerDescriptionSuccess,
                failure: this.onRequestOwnerDescriptionFailure,
                scope: this
            });
        },
        onRequestOwnerDescriptionSuccess: function(entry) {
            if (entry)
                this.context['defaultOwner'] = entry;
        },
        onRequestOwnerDescriptionFailure: function(response, o) {
            ErrorManager.addError(response, o, {}, 'failure');
        },
        persistPreferences: function() {
            try
            {
                if (window.localStorage)
                    window.localStorage.setItem('preferences', json.toJson(App.preferences));
            }
            catch(e) { }
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
            var exposed = [];

            for (var id in this.views)
            {
                var view = App.getView(id);

                if (view.id == 'home') continue;
                if (view.expose) exposed.push(id);
            }

            return exposed;
        },
        cleanRestoredHistory: function(restoredHistory) {
            var result = [],
                hasRoot = false;

            for (var i = restoredHistory.length - 1; i >= 0 && !hasRoot; i--)
            {
                if (restoredHistory[i].data.options && restoredHistory[i].data.options.negateHistory)
                {
                    result = [];
                    continue;
                }

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
                    restoredHistory = restoredState && json.fromJson(restoredState),
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

                    var last = cleanedHistory[cleanedHistory.length - 1],
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
        navigateToActivityInsertView: function(options) {
            var view = this.getView('activity_types_list');
            if (view)
                view.show(options || {});
        },
        initiateCall: function() {
            // shortcut for environment call
            environment.initiateCall.apply(this, arguments);
        },
        initiateEmail: function() {
            // shortcut for environment call
            environment.initiateEmail.apply(this, arguments);
        },
        showMapForAddress: function() {
            // shortcut for environment call
            environment.showMapForAddress.apply(this, arguments);
        }
    });
});