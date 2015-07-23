define('crm/Application', ['exports', 'module', 'dojo/_base/window', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/_base/connect', 'dojo/json', 'dojo/_base/lang', 'dojo/has', 'dojo/string', 'dojo/Deferred', './DefaultMetrics', 'argos/ErrorManager', './Environment', 'argos/Application', 'dojo/sniff', 'moment'], function (exports, module, _dojo_baseWindow, _dojo_baseDeclare, _dojo_baseArray, _dojo_baseConnect, _dojoJson, _dojo_baseLang, _dojoHas, _dojoString, _dojoDeferred, _DefaultMetrics, _argosErrorManager, _Environment, _argosApplication, _dojoSniff, _moment) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _win = _interopRequireDefault(_dojo_baseWindow);

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _connect = _interopRequireDefault(_dojo_baseConnect);

    var _json = _interopRequireDefault(_dojoJson);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _has = _interopRequireDefault(_dojoHas);

    var _string = _interopRequireDefault(_dojoString);

    var _Deferred = _interopRequireDefault(_dojoDeferred);

    var _DefaultMetrics2 = _interopRequireDefault(_DefaultMetrics);

    var _ErrorManager = _interopRequireDefault(_argosErrorManager);

    var _environment = _interopRequireDefault(_Environment);

    var _Application = _interopRequireDefault(_argosApplication);

    var _sniff = _interopRequireDefault(_dojoSniff);

    var _moment2 = _interopRequireDefault(_moment);

    /**
     * @class crm.Application
     *
     * @extends argos.Application
     * @requires argos.ErrorManager
     * @requires crm.Environment
     * @requires moment
     *
     */
    var __class = (0, _declare['default'])('crm.Application', [_Application['default']], {
        navigationState: null,
        rememberNavigationState: true,
        enableUpdateNotification: false,
        multiCurrency: false,
        enableGroups: true,
        enableHashTags: true,
        enableOfflineSupport: true,
        speedSearch: {
            includeStemming: true,
            includePhonic: true,
            includeThesaurus: false,
            useFrequentFilter: false,
            searchType: 1
        },
        enableCaching: true,
        userDetailsQuerySelect: ['UserName', 'UserInfo/UserName', 'UserInfo/FirstName', 'UserInfo/LastName', 'DefaultOwner/OwnerDescription'],
        userOptionsToRequest: ['DefaultGroup;ACCOUNT', 'DefaultGroup;CONTACT', 'DefaultGroup;OPPORTUNITY', 'DefaultGroup;LEAD', 'DefaultGroup;TICKET', 'General;InsertSecCodeID', 'General;Currency', 'Calendar;DayStartTime', 'Calendar;WeekStart', 'ActivityMeetingOptions;AlarmEnabled', 'ActivityMeetingOptions;AlarmLead', 'ActivityMeetingOptions;Duration', 'ActivityPhoneOptions;AlarmEnabled', 'ActivityPhoneOptions;AlarmLead', 'ActivityPhoneOptions;Duration', 'ActivityToDoOptions;AlarmEnabled', 'ActivityToDoOptions;AlarmLead', 'ActivityToDoOptions;Duration', 'ActivityPersonalOptions;AlarmEnabled', 'ActivityPersonalOptions;AlarmLead', 'ActivityPersonalOptions;Duration'],
        systemOptionsToRequest: ['BaseCurrency', 'MultiCurrency', 'ChangeOpportunityRate', 'LockOpportunityRate'],
        appName: 'argos-saleslogix',
        serverVersion: {
            'major': 8,
            'minor': 0,
            'revision': 0
        },
        mobileVersion: {
            'major': 3,
            'minor': 3,
            'revision': 1
        },
        versionInfoText: 'Mobile v${0}.${1}.${2}',
        loadingText: 'Loading application state',
        authText: 'Authenticating',
        homeViewId: 'myactivity_list',
        offlineHomeViewId: 'offline_list',
        loginViewId: 'login',
        logOffViewId: 'logoff',

        UID: null,
        init: function init() {
            var original,
                self = this;
            if ((0, _has['default'])('ie') && (0, _has['default'])('ie') < 9) {
                window.location.href = 'unsupported.html';
            }

            this.inherited(arguments);
            this._loadNavigationState();
            this._saveDefaultPreferences();

            this.UID = new Date().getTime();
            original = Sage.SData.Client.SDataService.prototype.executeRequest;

            Sage.SData.Client.SDataService.prototype.executeRequest = function (request) {
                request.setRequestHeader('X-Application-Name', self.appName);
                request.setRequestHeader('X-Application-Version', _string['default'].substitute('${version.major}.${version.minor}.${version.revision};${id}', { version: self.mobileVersion, id: self.UID }));
                return original.apply(this, arguments);
            };
        },
        initConnects: function initConnects() {
            this.inherited(arguments);

            if (window.applicationCache) {
                this._connects.push(_connect['default'].connect(window.applicationCache, 'updateready', this, this._checkForUpdate));
            }
        },
        isOnFirstView: function isOnFirstView() {
            var history,
                isOnFirstView = false,
                length,
                current,
                previous;
            history = ReUI.context.history;
            length = history.length;
            current = history[length - 1];
            previous = history[length - 2];

            if (current && current.page === this.loginViewId || current && current.page === this.logOffViewId) {
                isOnFirstView = true;
            } else if (previous && previous.page === this.loginViewId) {
                isOnFirstView = true;
            } else if (length === 1) {
                isOnFirstView = true;
            }

            return isOnFirstView;
        },
        onSetOrientation: function onSetOrientation() {
            if (App.snapper) {
                App.snapper.close();
            }
        },
        _viewTransitionTo: function _viewTransitionTo() {
            this.inherited(arguments);
            this._checkSaveNavigationState();
            if (App.snapper) {
                App.snapper.close();
            }
        },
        _checkSaveNavigationState: function _checkSaveNavigationState() {
            if (this.rememberNavigationState !== false) {
                this._saveNavigationState();
            }
        },
        _checkForUpdate: function _checkForUpdate() {
            var applicationCache = window.applicationCache;
            if (applicationCache && this.enableUpdateNotification) {
                if (applicationCache.status === applicationCache.UPDATEREADY) {
                    this._notifyUpdateAvailable();
                }
            }
        },
        _notifyUpdateAvailable: function _notifyUpdateAvailable() {
            if (this.bars['updatebar']) {
                this.bars['updatebar'].show();
            }
        },
        _saveNavigationState: function _saveNavigationState() {
            try {
                if (window.localStorage) {
                    window.localStorage.setItem('navigationState', _json['default'].stringify(ReUI.context.history));
                }
            } catch (e) {}
        },
        hasMultiCurrency: function hasMultiCurrency() {
            // Check if the configuration specified multiCurrency, this will override the dynamic check.
            // A configuration is not ideal, and we should refactor the edit view to process the layout when it first recieves its data,
            // instead of on startup. We cannot check App.context data that was loaded after login when the startup method is used.
            if (this.multiCurrency) {
                return true;
            }

            /*if (this.context &&
                this.context['systemOptions'] &&
                this.context['systemOptions']['MultiCurrency'] === 'True') {
                return true;
            }*/

            return false;
        },
        canLockOpportunityRate: function canLockOpportunityRate() {
            if (this.context && this.context['systemOptions'] && this.context['systemOptions']['LockOpportunityRate'] === 'True') {
                return true;
            }

            return false;
        },
        canChangeOpportunityRate: function canChangeOpportunityRate() {
            if (this.context && this.context['systemOptions'] && this.context['systemOptions']['ChangeOpportunityRate'] === 'True') {
                return true;
            }

            return false;
        },
        getMyExchangeRate: function getMyExchangeRate() {
            var myCode,
                myRate,
                results = { code: '', rate: 1 };

            if (this.hasMultiCurrency() && this.context && this.context['exchangeRates'] && this.context['userOptions'] && this.context['userOptions']['General:Currency']) {

                myCode = this.context['userOptions']['General:Currency'];
                myRate = this.context['exchangeRates'][myCode];
                _lang['default'].mixin(results, { code: myCode, rate: myRate });
            }

            return results;
        },
        getBaseExchangeRate: function getBaseExchangeRate() {
            var baseCode,
                baseRate,
                results = { code: '', rate: 1 };

            if (this.hasMultiCurrency() && this.context && this.context['exchangeRates'] && this.context['systemOptions'] && this.context['systemOptions']['BaseCurrency']) {

                baseCode = this.context['systemOptions']['BaseCurrency'];
                baseRate = this.context['exchangeRates'][baseCode];
                _lang['default'].mixin(results, { code: baseCode, rate: baseRate });
            }

            return results;
        },
        getCurrentOpportunityExchangeRate: function getCurrentOpportunityExchangeRate() {
            var rate,
                found,
                results = { code: '', rate: 1 },
                code;

            found = this.queryNavigationContext(function (o) {
                return /^(opportunities)$/.test(o.resourceKind) && o.key;
            });

            found = found && found.options;

            if (found) {
                rate = found.ExchangeRate;
                code = found.ExchangeRateCode;
                _lang['default'].mixin(results, { code: code, rate: rate });
            }

            return results;
        },
        run: function run() {
            this.inherited(arguments);

            if (App.isOnline() || !App.enableCaching) {
                this.handleAuthentication();
            } else {
                // todo: always navigate to home when offline? data may not be available for restored state.
                this.navigateToHomeView();
            }

            if (this.enableUpdateNotification) {
                this._checkForUpdate();
            }
        },
        onAuthenticateUserSuccess: function onAuthenticateUserSuccess(credentials, callback, scope, result) {
            var user = {
                '$key': _lang['default'].trim(result['response']['userId']),
                '$descriptor': result['response']['prettyName'],
                'UserName': result['response']['userName']
            };

            this.context['user'] = user;
            this.context['roles'] = result['response']['roles'];
            this.context['securedActions'] = result['response']['securedActions'];

            if (this.context['securedActions']) {
                _array['default'].forEach(this.context['securedActions'], function (item) {
                    this[item] = true;
                }, this.context['userSecurity'] = {});
            } else {
                // downgrade server version as only 8.0 has `securedActions` as part of the
                // `getCurrentUser` response.
                this.serverVersion = {
                    'major': 7,
                    'minor': 5,
                    'revision': 4
                };
            }

            if (credentials.remember) {
                try {
                    if (window.localStorage) {
                        window.localStorage.setItem('credentials', Base64.encode(_json['default'].stringify({
                            username: credentials.username,
                            password: credentials.password || ''
                        })));
                    }
                } catch (e) {}
            }

            if (callback) {
                callback.call(scope || this, { user: user });
            }
        },
        onAuthenticateUserFailure: function onAuthenticateUserFailure(callback, scope, response) {
            var service = this.getService();
            if (service) {
                service.setUserName(false).setPassword(false);
            }

            if (callback) {
                callback.call(scope || this, { response: response });
            }
        },
        authenticateUser: function authenticateUser(credentials, options) {
            var service, request;

            service = this.getService().setUserName(credentials.username).setPassword(credentials.password || '');

            request = new Sage.SData.Client.SDataServiceOperationRequest(service).setContractName('system').setOperationName('getCurrentUser');

            request.execute({}, {
                success: _lang['default'].hitch(this, this.onAuthenticateUserSuccess, credentials, options.success, options.scope), // this.onAuthenticateUserSuccess.createDelegate(this, [credentials, options.success, options.scope], true),
                failure: _lang['default'].hitch(this, this.onAuthenticateUserFailure, options.failure, options.scope), // this.onAuthenticateUserFailure.createDelegate(this, [options.failure, options.scope], true),
                aborted: _lang['default'].hitch(this, this.onAuthenticateUserFailure, options.failure, options.scope) // this.onAuthenticateUserFailure.createDelegate(this, [options.aborted, options.scope], true)
            });
        },
        hasAccessTo: function hasAccessTo(security) {
            if (!security) {
                return true;
            }

            var user = this.context['user'],
                userId = user && user['$key'],
                userSecurity = this.context['userSecurity'];

            if (/^ADMIN\s*/i.test(userId)) {
                return true;
            }

            if (typeof userSecurity === 'undefined') {
                return true; // running against a pre 8.0 SalesLogix environment
            }

            return !!userSecurity[security];
        },
        reload: function reload() {
            ReUI.disableLocationCheck();
            this.hash('');
            window.location.reload();
        },
        logOut: function logOut() {
            this.removeCredentials();
            this._clearNavigationState();

            var service = this.getService(),
                view;
            if (service) {
                service.setUserName(false).setPassword(false);
            }

            view = this.getView(this.logOffViewId);

            if (view) {
                view.show();
            }
        },
        getCredentials: function getCredentials() {
            var stored, encoded, credentials;
            try {
                if (window.localStorage) {
                    stored = window.localStorage.getItem('credentials');
                    encoded = stored && Base64.decode(stored);
                    credentials = encoded && _json['default'].parse(encoded);
                }
            } catch (e) {}

            return credentials;
        },
        removeCredentials: function removeCredentials() {
            try {
                if (window.localStorage) {
                    window.localStorage.removeItem('credentials');
                }
            } catch (e) {}
        },
        isAuthenticated: false,
        hasState: false,
        handleAuthentication: function handleAuthentication() {
            var credentials;

            credentials = this.getCredentials();

            if (credentials) {
                this.setPrimaryTitle(this.authText);
                this.authenticateUser(credentials, {
                    success: function success() {
                        this.isAuthenticated = true;
                        this.setPrimaryTitle(this.loadingText);
                        this.initAppState().then((function () {
                            this.hasState = true;
                            this.navigateToInitialView();
                        }).bind(this));
                    },
                    failure: function failure() {
                        this.navigateToLoginView();
                        this.removeCredentials();
                    },
                    aborted: function aborted() {
                        this.navigateToLoginView();
                    },
                    scope: this
                });
            } else {
                this.navigateToLoginView();
            }
        },
        _clearNavigationState: function _clearNavigationState() {
            try {
                this.initialNavigationState = null;

                if (window.localStorage) {
                    window.localStorage.removeItem('navigationState');
                }
            } catch (e) {}
        },
        _loadNavigationState: function _loadNavigationState() {
            try {
                if (window.localStorage) {
                    this.navigationState = window.localStorage.getItem('navigationState');
                }
            } catch (e) {}
        },
        _saveDefaultPreferences: function _saveDefaultPreferences() {
            if (this.preferences) {
                return;
            }

            var views = this.getDefaultViews();

            this.preferences = {
                home: {
                    visible: views
                },
                configure: {
                    order: views.slice(0)
                }
            };
        },
        getMetricsByResourceKind: function getMetricsByResourceKind(resourceKind) {
            var prefs,
                results = [];

            prefs = this.preferences && this.preferences.metrics && this.preferences.metrics;

            if (prefs) {
                prefs = _array['default'].filter(prefs, function (item) {
                    return item.resourceKind === resourceKind;
                });

                if (prefs.length === 1) {
                    results = prefs[0].children;
                }
            }

            return results;
        },
        setDefaultMetricPreferences: function setDefaultMetricPreferences() {
            var defaults;
            if (!this.preferences.metrics) {
                defaults = new _DefaultMetrics2['default']();
                this.preferences.metrics = defaults.getDefinitions();
                this.persistPreferences();
            }
        },
        requestUserDetails: function requestUserDetails() {
            var request, def;

            request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService()).setResourceKind('users').setResourceSelector(_string['default'].substitute('"${0}"', [this.context['user']['$key']])).setQueryArg('select', this.userDetailsQuerySelect.join(','));

            def = new _Deferred['default']();

            request.read({
                success: function success(entry) {
                    this.context['user'] = entry;
                    this.context['defaultOwner'] = entry && entry['DefaultOwner'];
                    this.setDefaultMetricPreferences();
                    def.resolve(entry);
                },
                failure: function failure() {
                    def.reject();
                },
                scope: this
            });

            return def.promise;
        },
        requestUserOptions: function requestUserOptions() {
            var batch, def;

            batch = new Sage.SData.Client.SDataBatchRequest(this.getService()).setContractName('system').setResourceKind('useroptions').setQueryArg('select', 'name,value').using(function () {
                var service = this.getService();
                _array['default'].forEach(this.userOptionsToRequest, function (item) {
                    new Sage.SData.Client.SDataSingleResourceRequest(this).setContractName('system').setResourceKind('useroptions').setResourceSelector(_string['default'].substitute('"${0}"', [item])).read();
                }, service);
            }, this);

            def = new _Deferred['default']();
            batch.commit({
                success: function success(feed) {
                    var userOptions, insertSecCode, currentDefaultOwner;

                    userOptions = this.context['userOptions'] = this.context['userOptions'] || {};

                    _array['default'].forEach(feed && feed['$resources'], function (item) {
                        var key = item && item['$descriptor'],
                            value = item && item['value'];

                        if (value && key) {
                            userOptions[key] = value;
                        }
                    });

                    insertSecCode = userOptions['General:InsertSecCodeID'];
                    currentDefaultOwner = this.context['defaultOwner'] && this.context['defaultOwner']['$key'];

                    if (insertSecCode && (!currentDefaultOwner || currentDefaultOwner !== insertSecCode)) {
                        this.requestOwnerDescription(insertSecCode);
                    }

                    this.loadCustomizedMoment();
                    def.resolve(feed);
                },
                failure: function failure(response, o) {
                    def.reject();
                    _ErrorManager['default'].addError(response, o, {}, 'failure');
                },
                scope: this
            });

            return def.promise;
        },
        /*
         * Loads a custom object to pass into the current moment language. The object for the language gets built in buildCustomizedMoment.
         */
        loadCustomizedMoment: function loadCustomizedMoment() {
            var custom = this.buildCustomizedMoment(),
                currentLang;

            currentLang = _moment2['default'].lang();
            _moment2['default'].lang(currentLang, custom);
            this.moment = (0, _moment2['default'])().lang(currentLang, custom);
        },
        /*
         * Builds an object that will get passed into moment.lang()
         */
        buildCustomizedMoment: function buildCustomizedMoment() {
            if (!App.context.userOptions) {
                return;
            }

            var userWeekStartDay = parseInt(App.context.userOptions['Calendar:WeekStart'], 10),
                results = {}; // 0-6, Sun-Sat

            if (!isNaN(userWeekStartDay)) {
                results = {
                    week: {
                        dow: userWeekStartDay
                    }
                };
            }

            return results;
        },
        requestSystemOptions: function requestSystemOptions() {
            var request, def;

            request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setContractName('system').setResourceKind('systemoptions').setQueryArg('select', 'name,value');

            def = new _Deferred['default']();
            request.read({
                success: function success(feed) {
                    var systemOptions, multiCurrency;
                    systemOptions = this.context['systemOptions'] = this.context['systemOptions'] || {};

                    _array['default'].forEach(feed && feed['$resources'], function (item) {
                        var key = item && item['name'],
                            value = item && item['value'];

                        if (value && key && _array['default'].indexOf(this.systemOptionsToRequest, key) > -1) {
                            systemOptions[key] = value;
                        }
                    }, this);

                    multiCurrency = systemOptions['MultiCurrency'];

                    if (multiCurrency && multiCurrency === 'True') {
                        this.requestExchangeRates().then(function () {
                            def.resolve(feed);
                        }, function () {
                            def.reject();
                        });
                    } else {
                        def.resolve(feed);
                    }
                },
                failure: function failure(response, o) {
                    _ErrorManager['default'].addError(response, o, {}, 'failure');
                    def.reject();
                },
                scope: this
            });

            return def.promise;
        },
        requestExchangeRates: function requestExchangeRates() {
            var request, def;

            request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setContractName('dynamic').setResourceKind('exchangeRates').setQueryArg('select', 'Rate');

            def = new _Deferred['default']();
            request.read({
                success: function success(feed) {
                    var exchangeRates = this.context['exchangeRates'] = this.context['exchangeRates'] || {};

                    _array['default'].forEach(feed && feed['$resources'], function (item) {
                        var key = item && item['$key'],
                            value = item && item['Rate'];

                        if (value && key) {
                            exchangeRates[key] = value;
                        }
                    }, this);

                    def.resolve(feed);
                },
                failure: function failure(response, o) {
                    def.reject();
                    _ErrorManager['default'].addError(response, o, {}, 'failure');
                },
                scope: this
            });

            return def.promise;
        },
        requestOwnerDescription: function requestOwnerDescription(key) {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService()).setResourceKind('owners').setResourceSelector(_string['default'].substitute('"${0}"', [key])).setQueryArg('select', 'OwnerDescription');

            request.read({
                success: this.onRequestOwnerDescriptionSuccess,
                failure: this.onRequestOwnerDescriptionFailure,
                scope: this
            });
        },
        onRequestOwnerDescriptionSuccess: function onRequestOwnerDescriptionSuccess(entry) {
            if (entry) {
                this.context['defaultOwner'] = entry;
            }
        },
        onRequestOwnerDescriptionFailure: function onRequestOwnerDescriptionFailure(response, o) {
            _ErrorManager['default'].addError(response, o, {}, 'failure');
        },
        defaultViews: ['myactivity_list', 'calendar_daylist', 'history_list', 'account_list', 'contact_list', 'lead_list', 'opportunity_list', 'ticket_list', 'myattachment_list', 'offline_list'],
        getDefaultViews: function getDefaultViews() {
            return this.defaultViews;
        },
        getExposedViews: function getExposedViews() {
            var exposed = [],
                id,
                view;

            for (id in this.views) {
                if (this.views.hasOwnProperty(id)) {
                    view = App.getView(id);

                    if (view.id === 'home') {
                        continue;
                    }

                    if (view.expose) {
                        exposed.push(id);
                    }
                }
            }

            return exposed;
        },
        cleanRestoredHistory: function cleanRestoredHistory(restoredHistory) {
            var result, hasRoot, i;

            result = [];
            hasRoot = false;

            for (i = restoredHistory.length - 1; i >= 0 && !hasRoot; i--) {
                if (restoredHistory[i].data.options && restoredHistory[i].data.options.negateHistory) {
                    result = [];
                    continue;
                }

                if (App.hasView(restoredHistory[i].page)) {
                    result.unshift(restoredHistory[i]);
                }

                hasRoot = restoredHistory[i].page === 'home';
            }

            return hasRoot && result;
        },
        navigateToInitialView: function navigateToInitialView() {
            this.loadSnapper();

            try {
                var restoredState = this.navigationState,
                    i,
                    last,
                    view,
                    options,
                    restoredHistory = restoredState && _json['default'].parse(restoredState),
                    cleanedHistory = this.cleanRestoredHistory(restoredHistory);

                this._clearNavigationState();

                if (cleanedHistory) {
                    ReUI.context.transitioning = true;
                    ReUI.context.history = ReUI.context.history.concat(cleanedHistory.slice(0, cleanedHistory.length - 1));

                    for (i = 0; i < cleanedHistory.length - 1; i++) {
                        window.location.hash = cleanedHistory[i].hash;
                    }

                    ReUI.context.transitioning = false;

                    last = cleanedHistory[cleanedHistory.length - 1];
                    view = App.getView(last.page);
                    options = last.data && last.data.options;

                    view.show(options);
                } else {
                    this.navigateToHomeView();
                }
            } catch (e) {
                this._clearNavigationState();
                this.navigateToHomeView();
            }
        },
        setupRedirectHash: function setupRedirectHash() {
            var split;
            if (this._hasValidRedirect()) {
                // Split by "/redirectTo/"
                split = this.redirectHash.split(/\/redirectTo\//gi);
                if (split.length === 2) {
                    this.redirectHash = split[1];
                }
            } else {
                this.redirectHash = '';
            }
        },
        navigateToLoginView: function navigateToLoginView() {
            this.setupRedirectHash();

            var view = this.getView(this.loginViewId);
            if (view) {
                view.show();
            }
        },
        _hasValidRedirect: function _hasValidRedirect() {
            return this.redirectHash !== '' && this.redirectHash.indexOf('/redirectTo/') > 0;
        },
        showLeftDrawer: function showLeftDrawer() {
            var view = this.getView('left_drawer');
            if (view) {
                view.show();
            }
        },
        showRightDrawer: function showRightDrawer() {
            var view = this.getView('right_drawer');
            if (view) {
                view.show();
            }
        },
        navigateToHomeView: function navigateToHomeView() {
            this.setupRedirectHash();

            var visible, view, split, key, viewId, redirectView;
            this.loadSnapper();

            visible = this.preferences && this.preferences.home && this.preferences.home.visible;
            if (visible && visible.length) {
                this.homeViewId = visible[0];
            }

            // Default view will be the home view, overwritten below if a redirect hash is supplied
            view = this.getView(this.homeViewId);

            if (this.redirectHash) {
                split = this.redirectHash.split(';');
                if (split.length > 0) {
                    viewId = split[0];
                    key = split[1];

                    redirectView = this.getView(viewId);
                    if (redirectView) {
                        view = redirectView;
                        if (key) {
                            redirectView.show({
                                key: key
                            });
                        }
                    }
                }
            }

            if (!App.isOnline()) {
                view = this.getView(this.offlineHomeViewId);
            }

            if (view) {
                view.show();
            }
        },
        navigateToActivityInsertView: function navigateToActivityInsertView() {
            var view = this.getView('activity_types_list');
            if (view) {
                view.show();
            }
        },
        initiateCall: function initiateCall() {
            // shortcut for environment call
            _environment['default'].initiateCall.apply(this, arguments);
        },
        initiateEmail: function initiateEmail() {
            // shortcut for environment call
            _environment['default'].initiateEmail.apply(this, arguments);
        },
        showMapForAddress: function showMapForAddress() {
            // shortcut for environment call
            _environment['default'].showMapForAddress.apply(this, arguments);
        },
        getVersionInfo: function getVersionInfo() {
            var info = _string['default'].substitute(this.versionInfoText, [this.mobileVersion.major, this.mobileVersion.minor, this.mobileVersion.revision, this.serverVersion.major]);
            return info;
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Application', __class);
    module.exports = __class;
});
