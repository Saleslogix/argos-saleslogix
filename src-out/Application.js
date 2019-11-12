define('crm/Application', ['module', 'exports', 'dojo/string', './DefaultMetrics', 'argos/ErrorManager', './Environment', 'argos/Application', 'argos/Offline/Manager', 'argos/Models/Types', './Models/Names', 'argos/Dialogs/BusyIndicator', 'argos/I18n', './MingleUtility', './reducers/index', './actions/config', './actions/user', './PicklistService'], function (module, exports, _string, _DefaultMetrics, _ErrorManager, _Environment, _Application, _Manager, _Types, _Names, _BusyIndicator, _I18n, _MingleUtility, _index, _config, _user, _PicklistService) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _string2 = _interopRequireDefault(_string);

  var _DefaultMetrics2 = _interopRequireDefault(_DefaultMetrics);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _Environment2 = _interopRequireDefault(_Environment);

  var _Application2 = _interopRequireDefault(_Application);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  var _BusyIndicator2 = _interopRequireDefault(_BusyIndicator);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _MingleUtility2 = _interopRequireDefault(_MingleUtility);

  var _PicklistService2 = _interopRequireDefault(_PicklistService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var resource = (0, _I18n2.default)('application');

  /**
   * @alias crm.Application
   * @extends argos.Application
   */

  var Application = function (_SDKApplication) {
    _inherits(Application, _SDKApplication);

    function Application() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        connections: null,
        defaultLocale: 'en',
        enableUpdateNotification: false,
        enableMultiCurrency: false,
        multiCurrency: false, // Backwards compatibility
        enableGroups: true,
        enableHashTags: true,
        maxUploadFileSize: 40000000,
        enableConcurrencyCheck: false,
        enableOfflineSupport: false,
        warehouseDiscovery: 'auto',
        enableMingle: false,
        mingleEnabled: false, // Backwards compatibility
        mingleSettings: null,
        mingleRedirectUrl: ''
      };

      _classCallCheck(this, Application);

      var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this));

      _this.navigationState = null;
      _this.rememberNavigationState = true;
      _this.speedSearch = {
        includeStemming: true,
        includePhonic: true,
        includeThesaurus: false,
        useFrequentFilter: false,
        searchType: 1
      };
      _this.enableCaching = true;
      _this.userDetailsQuerySelect = ['UserName', 'UserInfo/UserName', 'UserInfo/FirstName', 'UserInfo/LastName', 'DefaultOwner/OwnerDescription'];
      _this.userOptionsToRequest = ['category=DefaultGroup;name=ACCOUNT', 'category=DefaultGroup;name=CONTACT', 'category=DefaultGroup;name=OPPORTUNITY', 'category=DefaultGroup;name=LEAD', 'category=DefaultGroup;name=TICKET', 'category=DefaultGroup;name=SALESORDER', 'category=DefaultGroup;name=QUOTE', 'category=General;name=InsertSecCodeID', 'category=General;name=Currency', 'category=Calendar;name=DayStartTime', 'category=Calendar;name=WeekStart', 'category=ActivityMeetingOptions;name=AlarmEnabled', 'category=ActivityMeetingOptions;name=AlarmLead', 'category=ActivityMeetingOptions;name=Duration', 'category=ActivityPhoneOptions;name=AlarmEnabled', 'category=ActivityPhoneOptions;name=AlarmLead', 'category=ActivityPhoneOptions;name=Duration', 'category=ActivityToDoOptions;name=AlarmEnabled', 'category=ActivityToDoOptions;name=AlarmLead', 'category=ActivityToDoOptions;name=Duration', 'category=ActivityPersonalOptions;name=AlarmEnabled', 'category=ActivityPersonalOptions;name=AlarmLead', 'category=ActivityPersonalOptions;name=Duration'];
      _this.systemOptionsToRequest = ['BaseCurrency', 'MultiCurrency', 'ChangeOpportunityRate', 'LockOpportunityRate'];
      _this.appName = 'argos-saleslogix';
      _this.serverVersion = {
        major: 8,
        minor: 0,
        revision: 0
      };
      _this.mobileVersion = {
        major: 4,
        minor: 1,
        revision: 0
      };
      _this.versionInfoText = resource.versionInfoText;
      _this.loadingText = resource.loadingText;
      _this.authText = resource.authText;
      _this.connectionToastTitleText = resource.connectionToastTitleText;
      _this.offlineText = resource.offlineText;
      _this.onlineText = resource.onlineText;
      _this.mingleAuthErrorText = resource.mingleAuthErrorText;
      _this.homeViewId = 'myactivity_list';
      _this.offlineHomeViewId = 'recently_viewed_list_offline';
      _this.loginViewId = 'login';
      _this.logOffViewId = 'logoff';
      _this.UID = null;
      _this.isAuthenticated = false;
      _this.hasState = false;
      _this.defaultViews = ['myday_list', 'calendar_view', 'history_list', 'account_list', 'contact_list', 'lead_list', 'opportunity_list', 'ticket_list', 'myattachment_list', 'recently_viewed_list', 'briefcase_list'];

      // Settings
      Object.assign(_this, options); // TODO: Remove

      // Save this config temporarily until we have a working store (init).
      _this._config = options;
      return _this;
    }

    _createClass(Application, [{
      key: 'init',
      value: function init() {
        // Must exist here for backwards compatibility for BOE Module
        this.picklistService = _PicklistService2.default;

        this._cachingService = new ICRMServicesSDK.CachingService(localStorage);
        this.picklistService.init(this.getService(), this._cachingService);

        _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'init', this).apply(this, arguments);
        // Dispatch the temp config we saved in the constructor
        this.store.dispatch((0, _config.setConfig)(this._config));
        this._config = null;
        this._loadNavigationState();

        var accessToken = null;
        if (this.isMingleEnabled()) {
          accessToken = this.mingleAuthResults.access_token;
        }

        this.UID = new Date().getTime();
        var original = Sage.SData.Client.SDataService.prototype.executeRequest;
        var self = this;
        Sage.SData.Client.SDataService.prototype.executeRequest = function executeRequest(request) {
          if (accessToken) {
            request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            request.setRequestHeader('X-Authorization', 'Bearer ' + accessToken);
          }

          request.setRequestHeader('X-Application-Name', self.appName);
          var version = self.mobileVersion;
          var id = self.UID;
          request.setRequestHeader('X-Application-Version', version.major + '.' + version.minor + '.' + version.revision + ';' + id);
          return original.apply(this, arguments);
        };
      }
    }, {
      key: 'initPreferences',
      value: function initPreferences() {
        _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'initPreferences', this).call(this);
        this._saveDefaultPreferences();
      }
    }, {
      key: 'isMingleEnabled',
      value: function isMingleEnabled() {
        return this.enableMingle || this.mingleEnabled;
      }
    }, {
      key: 'getReducer',
      value: function getReducer() {
        var sdk = _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'getReducer', this).apply(this, arguments);
        return Redux.combineReducers({
          sdk: sdk,
          app: _index.app
        });
      }
    }, {
      key: 'getInitialState',
      value: function getInitialState() {
        return {};
      }
    }, {
      key: 'initConnects',
      value: function initConnects() {
        _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'initConnects', this).apply(this, arguments);

        if (window.applicationCache) {
          $(window.applicationCache).on('updateready', this._checkForUpdate.bind(this));
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'destroy', this).call(this);
        $(window.applicationCache).off('updateready', this._checkForUpdate.bind(this));
      }
    }, {
      key: 'isOnFirstView',
      value: function isOnFirstView() {
        var history = this.context.history;
        var length = history.length;
        var current = history[length - 1];
        var previous = history[length - 2];
        var isFirstView = false;

        if (current && current.page === this.loginViewId || current && current.page === this.logOffViewId) {
          isFirstView = true;
        } else if (previous && previous.page === this.loginViewId) {
          isFirstView = true;
        } else if (length === 1) {
          isFirstView = true;
        }

        return isFirstView;
      }
    }, {
      key: 'onSetOrientation',
      value: function onSetOrientation() {
        // TODO: Close main nav like we did with left drawer?
      }
    }, {
      key: '_viewTransitionTo',
      value: function _viewTransitionTo() {
        _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), '_viewTransitionTo', this).apply(this, arguments);
        this._checkSaveNavigationState();
        // TODO: Close main nav like we did with left drawer?
      }
    }, {
      key: '_checkSaveNavigationState',
      value: function _checkSaveNavigationState() {
        if (this.rememberNavigationState !== false) {
          this._saveNavigationState();
        }
      }
    }, {
      key: '_checkForUpdate',
      value: function _checkForUpdate() {
        var applicationCache = window.applicationCache;
        if (applicationCache && this.enableUpdateNotification) {
          if (applicationCache.status === applicationCache.UPDATEREADY) {
            this._notifyUpdateAvailable();
          }
        }
      }
    }, {
      key: '_notifyUpdateAvailable',
      value: function _notifyUpdateAvailable() {
        if (this.bars.updatebar) {
          this.bars.updatebar.show();
        }
      }
    }, {
      key: '_saveNavigationState',
      value: function _saveNavigationState() {
        try {
          if (window.localStorage) {
            window.localStorage.setItem('navigationState', JSON.stringify(ReUI.context.history));
          }
        } catch (e) {} // eslint-disable-line
      }
    }, {
      key: 'hasMultiCurrency',
      value: function hasMultiCurrency() {
        // Check if the configuration specified multiCurrency, this will override the dynamic check.
        // A configuration is not ideal, and we should refactor the edit view to process the layout when it first recieves its data,
        // instead of on startup. We cannot check App.context data that was loaded after login when the startup method is used.
        if (this.enableMultiCurrency || this.multiCurrency) {
          return true;
        }

        return false;
      }
    }, {
      key: 'canLockOpportunityRate',
      value: function canLockOpportunityRate() {
        if (this.context && this.context.systemOptions && this.context.systemOptions.LockOpportunityRate === 'True') {
          return true;
        }

        return false;
      }
    }, {
      key: 'canChangeOpportunityRate',
      value: function canChangeOpportunityRate() {
        if (this.context && this.context.systemOptions && this.context.systemOptions.ChangeOpportunityRate === 'True') {
          return true;
        }

        return false;
      }
    }, {
      key: 'getMyExchangeRate',
      value: function getMyExchangeRate() {
        var results = {
          code: '',
          rate: 1
        };

        if (this.hasMultiCurrency() && this.context && this.context.exchangeRates && this.context.userOptions && this.context.userOptions['General:Currency']) {
          var myCode = this.context.userOptions['General:Currency'];
          var myRate = this.context.exchangeRates[myCode];
          Object.assign(results, {
            code: myCode,
            rate: myRate
          });
        }

        return results;
      }
    }, {
      key: 'getBaseExchangeRate',
      value: function getBaseExchangeRate() {
        var results = {
          code: '',
          rate: 1
        };

        if (this.hasMultiCurrency() && this.context && this.context.exchangeRates && this.context.systemOptions && this.context.systemOptions.BaseCurrency) {
          var baseCode = this.context.systemOptions.BaseCurrency;
          var baseRate = this.context.exchangeRates[baseCode];
          Object.assign(results, {
            code: baseCode,
            rate: baseRate
          });
        }

        return results;
      }
    }, {
      key: 'getCurrentOpportunityExchangeRate',
      value: function getCurrentOpportunityExchangeRate() {
        var results = {
          code: '',
          rate: 1
        };

        var found = this.queryNavigationContext(function (o) {
          return (/^(opportunities)$/.test(o.resourceKind) && o.key
          );
        });

        found = found && found.options;

        if (found) {
          var rate = found.ExchangeRate;
          var code = found.ExchangeRateCode;
          Object.assign(results, {
            code: code,
            rate: rate
          });
        }

        return results;
      }
    }, {
      key: 'getCurrentLocale',
      value: function getCurrentLocale() {
        return this.context.localization && this.context.localization.locale || this.defaultLocale;
      }
    }, {
      key: 'run',
      value: function run() {
        _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'run', this).apply(this, arguments);

        if (this.isOnline() || !this.enableCaching) {
          this.loadEndpoint();
          if (this.isMingleEnabled()) {
            this.handleMingleAuthentication();
          } else {
            this.handleAuthentication();
          }
        } else {
          // todo: always navigate to home when offline? data may not be available for restored state.
          this.navigateToHomeView();
        }

        if (this.enableUpdateNotification) {
          this._checkForUpdate();
        }
      }
    }, {
      key: 'onAuthenticateUserSuccess',
      value: function onAuthenticateUserSuccess(credentials, callback, scope, result) {
        var _this2 = this;

        var user = {
          $key: result.response.userId.trim(),
          $descriptor: result.response.prettyName,
          UserName: result.response.userName
        };

        this.context.user = user;
        this.context.roles = result.response.roles;
        this.context.securedActions = result.response.securedActions;

        if (this.context.securedActions) {
          this.context.userSecurity = {};
          this.context.securedActions.forEach(function (item) {
            _this2.context.userSecurity[item] = true;
          });
        } else {
          // downgrade server version as only 8.0 has `securedActions` as part of the
          // `getCurrentUser` response.
          this.serverVersion = {
            major: 7,
            minor: 5,
            revision: 4
          };
        }

        if (!this.isMingleEnabled() && credentials.remember) {
          try {
            if (window.localStorage) {
              window.localStorage.setItem('credentials', Base64.encode(JSON.stringify({
                username: credentials.username,
                password: credentials.password || '',
                endpoint: credentials.endpoint
              })));
            }
          } catch (e) {} //eslint-disable-line
        }

        if (callback) {
          callback.call(scope || this, {
            user: user
          });
        }
      }
    }, {
      key: 'onAuthenticateUserFailure',
      value: function onAuthenticateUserFailure(callback, scope, response) {
        var service = this.getService();
        if (service) {
          service.setUserName(false).setPassword(false);
        }

        if (callback) {
          callback.call(scope || this, {
            response: response
          });
        }
      }
    }, {
      key: 'authenticateUser',
      value: function authenticateUser(credentials, options) {
        var service = this.getService();
        if (credentials) {
          service.setUserName(credentials.username).setPassword(credentials.password || '');
        }

        var request = new Sage.SData.Client.SDataServiceOperationRequest(service).setContractName('system').setOperationName('getCurrentUser');

        request.execute({}, {
          success: this.onAuthenticateUserSuccess.bind(this, credentials, options.success, options.scope),
          failure: this.onAuthenticateUserFailure.bind(this, options.failure, options.scope),
          aborted: this.onAuthenticateUserFailure.bind(this, options.failure, options.scope)
        });
      }
    }, {
      key: 'hasAccessTo',
      value: function hasAccessTo(security) {
        if (!security) {
          return true;
        }

        var user = this.context.user;
        var userId = user && user.$key;
        var userSecurity = this.context.userSecurity;

        if (/^ADMIN\s*/i.test(userId)) {
          return true;
        }

        if (typeof userSecurity === 'undefined') {
          return true; // running against a pre 8.0 SalesLogix environment
        }

        return !!userSecurity[security];
      }
    }, {
      key: 'reload',
      value: function reload() {
        // this.ReUI.disableLocationCheck();
        this.hash('');
        window.location.reload();
      }
    }, {
      key: 'resetModuleAppStatePromises',
      value: function resetModuleAppStatePromises() {
        this.clearAppStatePromises();
        for (var i = 0; i < this.modules.length; i++) {
          this.modules[i].loadAppStatePromises(this);
        }
      }
    }, {
      key: 'logOut',
      value: function logOut() {
        this.removeCredentials();
        this._clearNavigationState();

        var service = this.getService();
        this.isAuthenticated = false;
        this.context = {
          history: []
        };

        this.resetModuleAppStatePromises();

        if (service) {
          service.setUserName(false).setPassword(false);
        }

        var view = this.getView(this.logOffViewId);

        if (view) {
          view.show();
        }
      }
    }, {
      key: 'getCredentials',
      value: function getCredentials() {
        var credentials = null;
        try {
          if (window.localStorage) {
            var stored = window.localStorage.getItem('credentials');
            var encoded = stored && Base64.decode(stored);
            credentials = encoded && JSON.parse(encoded);
          }
        } catch (e) {} //eslint-disable-line

        return credentials;
      }
    }, {
      key: 'loadEndpoint',
      value: function loadEndpoint() {
        try {
          if (window.localStorage) {
            var results = window.localStorage.getItem('endpoint');
            if (!results) {
              var service = this.getService();
              if (!this.isMingleEnabled()) {
                service.uri.setHost(window.location.hostname).setScheme(window.location.protocol.replace(':', '')).setPort(window.location.port);
              }

              results = service.uri.build();
            }

            this.store.dispatch((0, _config.setEndPoint)(results));
          }
        } catch (e) {} // eslint-disable-line
      }
    }, {
      key: 'saveEndpoint',
      value: function saveEndpoint() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (!url) {
          return;
        }

        try {
          if (window.localStorage) {
            window.localStorage.setItem('endpoint', url);
          }
        } catch (e) {} // eslint-disable-line
      }
    }, {
      key: 'removeCredentials',
      value: function removeCredentials() {
        try {
          if (window.localStorage) {
            window.localStorage.removeItem('credentials');
          }
        } catch (e) {} //eslint-disable-line
      }
    }, {
      key: 'handleAuthentication',
      value: function handleAuthentication() {
        var credentials = this.getCredentials();

        if (credentials) {
          this.setPrimaryTitle(this.authText);
          this.authenticateUser(credentials, {
            success: this.onHandleAuthenticationSuccess,
            failure: this.onHandleAuthenticationFailed,
            aborted: this.onHandleAuthenticationAborted,
            scope: this
          });
        } else {
          this.navigateToLoginView();
        }
      }
    }, {
      key: 'handleMingleAuthentication',
      value: function handleMingleAuthentication() {
        if (this.mingleAuthResults && this.mingleAuthResults.error === 'access_denied') {
          this.setPrimaryTitle(this.mingleAuthErrorText);
        } else {
          this.setPrimaryTitle(this.authText);
          this.authenticateUser(null, {
            success: this.onHandleAuthenticationSuccess,
            failure: this.onMingleHandleAuthenticationFailed,
            aborted: this.onHandleAuthenticationAborted,
            scope: this
          });
        }
      }
    }, {
      key: 'onHandleAuthenticationSuccess',
      value: function onHandleAuthenticationSuccess() {
        var _this3 = this;

        this.isAuthenticated = true;
        this.setPrimaryTitle(this.loadingText);
        this.showHeader();
        this.initAppState().then(function () {
          _this3.onInitAppStateSuccess();
        }, function (err) {
          _this3.hideHeader();
          _this3.onInitAppStateFailed(err);
        });
      }
    }, {
      key: 'showHeader',
      value: function showHeader() {
        var header = $('.header', this.getContainerNode());
        header.show();
      }
    }, {
      key: 'hideHeader',
      value: function hideHeader() {
        var header = $('.header', this.getContainerNode());
        header.hide();
      }
    }, {
      key: 'onHandleAuthenticationFailed',
      value: function onHandleAuthenticationFailed() {
        this.removeCredentials();
        this.navigateToLoginView();
      }
    }, {
      key: 'onMingleHandleAuthenticationFailed',
      value: function onMingleHandleAuthenticationFailed() {
        this.removeCredentials();
        this.setPrimaryTitle(this.mingleAuthErrorText);
      }
    }, {
      key: 'onHandleAuthenticationAborted',
      value: function onHandleAuthenticationAborted() {
        this.navigateToLoginView();
      }
    }, {
      key: 'onInitAppStateSuccess',
      value: function onInitAppStateSuccess() {
        var _this4 = this;

        this.setDefaultMetricPreferences();
        this.showApplicationMenuOnLarge();
        if (this.enableOfflineSupport) {
          this.initOfflineData().then(function () {
            _this4.hasState = true;
            _this4.navigateToInitialView();
          }, function (error) {
            _this4.hasState = true;
            _this4.enableOfflineSupport = false;
            var message = resource.offlineInitErrorText;
            _ErrorManager2.default.addSimpleError(message, error);
            _ErrorManager2.default.showErrorDialog(null, message, function () {
              _this4.navigateToInitialView();
            });
          });
        } else {
          this.hasState = true;
          this.navigateToInitialView();
        }
      }
    }, {
      key: 'onInitAppStateFailed',
      value: function onInitAppStateFailed(error) {
        var _this5 = this;

        var message = resource.appStateInitErrorText;
        this.hideApplicationMenu();
        _ErrorManager2.default.addSimpleError(message, error);
        _ErrorManager2.default.showErrorDialog(null, message, function () {
          _this5._clearNavigationState();
          _this5.removeCredentials();
          _this5.navigateToLoginView();
        });
      }
    }, {
      key: 'onStateChange',
      value: function onStateChange(state) {
        _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'onStateChange', this).call(this, state);
        if (!state || state === this.previousState) {
          return;
        }

        var currentEndpoint = state.app.config.endpoint;
        var previousEndpoint = this.previousState.app.config.endpoint;
        if (currentEndpoint !== previousEndpoint) {
          this.updateServiceUrl(state);
          this.saveEndpoint(currentEndpoint);
        }
      }
    }, {
      key: 'updateServiceUrl',
      value: function updateServiceUrl(state) {
        if (this.isMingleEnabled()) {
          // See TODO below, as to why we are bailing here
          return;
        }

        var service = this.getService();
        service.setUri(Object.assign({}, state.app.config.connections, {
          url: state.app.config.endpoint // TODO: Setting the URL here will break mingle instances that use custom virtual directories
        }));

        // Fixes cases where the user sets and invalid contract name in the url.
        // We have a lot of requests throughout the application that do not specify
        // a contractName and depend on the default contractName of "dynamic"
        // in the service.
        service.setContractName('dynamic');
        service.setApplicationName('slx');
      }
    }, {
      key: '_clearNavigationState',
      value: function _clearNavigationState() {
        try {
          this.initialNavigationState = null;

          if (window.localStorage) {
            window.localStorage.removeItem('navigationState');
          }
        } catch (e) {} //eslint-disable-line
      }
    }, {
      key: '_loadNavigationState',
      value: function _loadNavigationState() {
        try {
          if (window.localStorage) {
            this.navigationState = window.localStorage.getItem('navigationState');
          }
        } catch (e) {} // eslint-disable-line
      }
    }, {
      key: '_saveDefaultPreferences',
      value: function _saveDefaultPreferences() {
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
      }
    }, {
      key: 'getMetricsByResourceKind',
      value: function getMetricsByResourceKind(resourceKind) {
        var results = [];
        var prefs = this.preferences && this.preferences.metrics && this.preferences.metrics;

        if (prefs) {
          prefs = prefs.filter(function (item) {
            return item.resourceKind === resourceKind;
          });

          if (prefs.length === 1) {
            results = prefs[0].children;
          }
        }

        return results;
      }
    }, {
      key: 'setDefaultMetricPreferences',
      value: function setDefaultMetricPreferences() {
        if (!this.preferences.metrics) {
          var defaults = new _DefaultMetrics2.default();
          this.preferences.metrics = defaults.getDefinitions();
          this.persistPreferences();
        }
      }
    }, {
      key: 'clearMetricPreferences',
      value: function clearMetricPreferences() {
        this.preferences.metrics = null;
        this.persistPreferences();
      }
    }, {
      key: 'clearQuickActionPreferences',
      value: function clearQuickActionPreferences() {
        this.preferences.quickActions = null;
        this.persistPreferences();
      }
    }, {
      key: 'requestUserDetails',
      value: function requestUserDetails() {
        var _this6 = this;

        var key = this.context.user.$key;
        var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService()).setContractName('dynamic').setResourceKind('users').setResourceSelector('"' + key + '"').setQueryArg('select', this.userDetailsQuerySelect.join(','));

        return new Promise(function (resolve, reject) {
          request.read({
            success: function success(entry) {
              this.store.dispatch((0, _user.setUser)(entry));
              this.context.user = entry;
              this.context.defaultOwner = entry && entry.DefaultOwner;
              resolve(entry);
            },
            failure: function failure(e) {
              reject(e);
            },
            scope: _this6
          });
        });
      }
    }, {
      key: 'requestUserOptions',
      value: function requestUserOptions() {
        var _this7 = this;

        var batch = new Sage.SData.Client.SDataBatchRequest(this.getService()).setContractName('system').setResourceKind('useroptions').setQueryArg('select', 'name,value,defaultValue').using(function using() {
          var service = this.getService();
          this.userOptionsToRequest.forEach(function (item) {
            new Sage.SData.Client.SDataSingleResourceRequest(service).setContractName('system').setResourceKind('useroptions').setResourceKey(item).read();
          });
        }, this);

        return new Promise(function (resolve, reject) {
          batch.commit({
            success: function success(feed) {
              var userOptions = this.context.userOptions = this.context.userOptions || {};

              feed.$resources.forEach(function (item) {
                var key = item && item.$descriptor;
                var value = item.value;
                var defaultValue = item.defaultValue;


                if (typeof value === 'undefined' || value === null) {
                  value = defaultValue;
                }

                if (key) {
                  userOptions[key] = value;
                }
              });

              var insertSecCode = userOptions['General:InsertSecCodeID'];
              var currentDefaultOwner = this.context.defaultOwner && this.context.defaultOwner.$key;

              if (insertSecCode && (!currentDefaultOwner || currentDefaultOwner !== insertSecCode)) {
                this.requestOwnerDescription(insertSecCode);
              }

              this.loadCustomizedMoment();
              resolve(feed);
            },
            failure: function failure(response, o) {
              reject();
              _ErrorManager2.default.addError(response, o, {}, 'failure');
            },
            scope: _this7
          });
        });
      }
    }, {
      key: 'loadCustomizedMoment',
      value: function loadCustomizedMoment() {
        var custom = this.buildCustomizedMoment();
        var currentLang = moment.locale();

        moment.locale(currentLang, custom);
        this.moment = moment().locale(currentLang, custom);
      }
    }, {
      key: 'buildCustomizedMoment',
      value: function buildCustomizedMoment() {
        if (!this.context.userOptions) {
          return null;
        }

        var userWeekStartDay = parseInt(this.context.userOptions['Calendar:WeekStart'], 10);
        var results = {}; // 0-6, Sun-Sat

        if (!isNaN(userWeekStartDay)) {
          results = {
            week: {
              dow: userWeekStartDay
            },
            relativeTime: moment().locale(this.getCurrentLocale())._locale._relativeTime
          };
        }

        return results;
      }
    }, {
      key: 'requestSystemOptions',
      value: function requestSystemOptions() {
        var _this9 = this;

        var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setContractName('system').setResourceKind('systemoptions').setQueryArg('select', 'name,value');

        return new Promise(function (resolve, reject) {
          request.read({
            success: function succes(feed) {
              var _this8 = this;

              var systemOptions = this.context.systemOptions = this.context.systemOptions || {};

              feed.$resources.forEach(function (item) {
                var name = item.name,
                    value = item.value;

                if (value && name && _this8.systemOptionsToRequest.indexOf(name) > -1) {
                  systemOptions[name] = value;
                }
              }, this);

              var multiCurrency = systemOptions.MultiCurrency;

              if (multiCurrency && multiCurrency === 'True') {
                this.requestExchangeRates().then(function () {
                  resolve(feed);
                }, function () {
                  reject();
                });
              } else {
                resolve(feed);
              }
            },
            failure: function failure(response, o) {
              _ErrorManager2.default.addError(response, o, {}, 'failure');
              reject();
            },
            scope: _this9
          });
        });
      }
    }, {
      key: 'requestExchangeRates',
      value: function requestExchangeRates() {
        var _this10 = this;

        var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setContractName('dynamic').setResourceKind('exchangeRates').setQueryArg('select', 'Rate');

        return new Promise(function (resolve, reject) {
          request.read({
            success: function success(feed) {
              var exchangeRates = this.context.exchangeRates = this.context.exchangeRates || {};

              feed.$resources.forEach(function (item) {
                var key = item && item.$descriptor;
                var value = item && item.Rate;

                if (value && key) {
                  exchangeRates[key] = value;
                }
              });

              resolve(feed);
            },
            failure: function failure(response, o) {
              reject();
              _ErrorManager2.default.addError(response, o, {}, 'failure');
            },
            scope: _this10
          });
        });
      }
    }, {
      key: 'requestOwnerDescription',
      value: function requestOwnerDescription(key) {
        var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService()).setContractName('dynamic').setResourceKind('owners').setResourceSelector('"' + key + '"').setQueryArg('select', 'OwnerDescription');

        request.read({
          success: this.onRequestOwnerDescriptionSuccess,
          failure: this.onRequestOwnerDescriptionFailure,
          scope: this
        });
      }
    }, {
      key: 'onRequestOwnerDescriptionSuccess',
      value: function onRequestOwnerDescriptionSuccess(entry) {
        if (entry) {
          this.context.defaultOwner = entry;
        }
      }
    }, {
      key: 'onRequestOwnerDescriptionFailure',
      value: function onRequestOwnerDescriptionFailure(response, o) {
        _ErrorManager2.default.addError(response, o, {}, 'failure');
      }
    }, {
      key: 'getDefaultViews',
      value: function getDefaultViews() {
        return this.defaultViews;
      }
    }, {
      key: 'getExposedViews',
      value: function getExposedViews() {
        var _this11 = this;

        return Object.keys(this.views).filter(function (id) {
          var view = _this11.getViewDetailOnly(id);
          return view && view.id !== 'home' && view.expose;
        });
      }
    }, {
      key: 'cleanRestoredHistory',
      value: function cleanRestoredHistory(restoredHistory) {
        var result = [];
        var hasRoot = false;

        for (var i = restoredHistory.length - 1; i >= 0 && !hasRoot; i--) {
          if (restoredHistory[i].data.options && restoredHistory[i].data.options.negateHistory) {
            result = [];
            continue;
          }

          if (this.hasView(restoredHistory[i].page)) {
            result.unshift(restoredHistory[i]);
          }

          hasRoot = restoredHistory[i].page === 'home';
        }

        return hasRoot && result;
      }
    }, {
      key: 'requestIntegrationSettings',
      value: function requestIntegrationSettings(integration) {
        var _this12 = this;

        if (!this.context.integrationSettings) {
          this.context.integrationSettings = {};
        }
        var request = new Sage.SData.Client.SDataBaseRequest(App.getService());
        var pageSize = this.pageSize;
        var startIndex = this.feed && this.feed.$startIndex > 0 && this.feed.$itemsPerPage > 0 ? this.feed.$startIndex + this.feed.$itemsPerPage : 1;
        request.uri.setPathSegment(0, 'slx');
        request.uri.setPathSegment(1, 'dynamic');
        request.uri.setPathSegment(2, '-');
        request.uri.setPathSegment(3, 'customsettings');
        request.uri.setQueryArg('format', 'JSON');
        request.uri.setQueryArg('select', 'Description,DataValue,DataType');
        request.uri.setQueryArg('where', 'Category eq "' + integration + '"');
        request.uri.setStartIndex(startIndex);
        request.uri.setCount(pageSize);
        request.service.readFeed(request, {
          success: function success(feed) {
            var integrationSettings = {};
            feed.$resources.forEach(function (item) {
              var key = item && item.$descriptor;
              var value = item && item.DataValue;
              if (typeof value === 'undefined' || value === null) {
                value = '';
              }
              if (key) {
                integrationSettings['' + key] = value;
              }
              _this12.context.integrationSettings['' + integration] = integrationSettings;
            });
          },
          failure: function failure(response, o) {
            _ErrorManager2.default.addError(response, o, '', 'failure');
          }
        });
      }
    }, {
      key: 'navigateToInitialView',
      value: function navigateToInitialView() {
        this.showLeftDrawer();
        this.showHeader();
        try {
          var restoredState = this.navigationState;
          var restoredHistory = restoredState && JSON.parse(restoredState);
          var cleanedHistory = this.cleanRestoredHistory(restoredHistory);

          this._clearNavigationState();

          if (cleanedHistory) {
            ReUI.context.transitioning = true;
            ReUI.context.history = ReUI.context.history.concat(cleanedHistory.slice(0, cleanedHistory.length - 1));

            for (var i = 0; i < cleanedHistory.length - 1; i++) {
              window.location.hash = cleanedHistory[i].hash;
            }

            ReUI.context.transitioning = false;

            var last = cleanedHistory[cleanedHistory.length - 1];
            var view = this.getView(last.page);
            var options = last.data && last.data.options;

            view.show(options);
          } else {
            this.navigateToHomeView();
          }
        } catch (e) {
          this._clearNavigationState();
          this.navigateToHomeView();
        }
      }
    }, {
      key: 'setupRedirectHash',
      value: function setupRedirectHash() {
        var isMingleRefresh = false;
        if (this._hasValidRedirect()) {
          if (this.isMingleEnabled()) {
            var vars = this.redirectHash.split('&');
            for (var i = 0; i < vars.length; i++) {
              var pair = vars[i].split('=');
              if (pair[0] === 'state') {
                if (pair[1] === 'mingleRefresh') {
                  // show default view
                  isMingleRefresh = true;
                } else {
                  this.redirectHash = decodeURIComponent(pair[1]);
                }
                break;
              }
            }
          }
          if (isMingleRefresh) {
            var view = this.getView(App.getDefaultViews()[0]);
            if (view) {
              view.show();
            }
          } else {
            // Split by "/redirectTo/"
            var split = this.redirectHash.split(/\/redirectTo\//gi);
            if (split.length === 2) {
              this.redirectHash = split[1];
            }
          }
        }
      }
    }, {
      key: 'onConnectionChange',
      value: function onConnectionChange(online) {
        var view = this.getView('left_drawer');
        if (!this.enableOfflineSupport) {
          return;
        }

        if (this.isMingleEnabled() && online && this.requiresMingleRefresh) {
          _MingleUtility2.default.refreshAccessToken(this);
          return;
        }

        if (view) {
          view.refresh();
        }

        if (online) {
          this.toast.add({ message: this.onlineText, title: this.connectionToastTitleText });
          if (this.context && this.context.user) {
            this.navigateToInitialView();
          } else {
            this.navigateToLoginView();
          }
        } else {
          this.toast.add({ message: this.offlineText, title: this.connectionToastTitleText });
          this.navigateToInitialView();
        }

        this.setToolBarMode(online);
      }
    }, {
      key: 'navigateToLoginView',
      value: function navigateToLoginView() {
        this.setupRedirectHash();

        var view = this.getView(this.loginViewId);
        if (view) {
          view.show();
        }
      }
    }, {
      key: '_hasValidRedirect',
      value: function _hasValidRedirect() {
        var hashValue = decodeURIComponent(this.redirectHash);
        return hashValue !== '' && hashValue.indexOf('/redirectTo/') > 0;
      }
    }, {
      key: 'showLeftDrawer',
      value: function showLeftDrawer() {
        var view = this.getView('left_drawer');
        if (view) {
          view.show();
        }

        return this;
      }
    }, {
      key: 'showRightDrawer',
      value: function showRightDrawer() {
        return this;
      }
    }, {
      key: 'navigateToHomeView',
      value: function navigateToHomeView() {
        this.setupRedirectHash();
        this.showLeftDrawer();

        var visible = this.preferences && this.preferences.home && this.preferences.home.visible;
        if (visible && visible.length > 0) {
          this.homeViewId = visible[0];
        }

        // Default view will be the home view, overwritten below if a redirect hash is supplied
        var view = this.getView(this.homeViewId);

        if (this.redirectHash) {
          var split = this.redirectHash.split(';');
          if (split.length === 1) {
            split = this.redirectHash.split(':');
          }
          if (split.length > 0) {
            var _split = split,
                _split2 = _slicedToArray(_split, 2),
                viewId = _split2[0],
                key = _split2[1];

            var redirectView = this.getView(viewId);
            if (redirectView) {
              if (!redirectView.canRedirectTo) {
                // The user will go to the default view instead
                view = this.getView(this.homeViewId);
              } else {
                view = redirectView;
                if (key) {
                  redirectView.show({
                    key: key
                  });
                }
              }
            }
          }
          this.redirectHash = '';
        }

        if (!this.isOnline()) {
          view = this.getView(this.offlineHomeViewId);
        }

        if (view) {
          view.show();
        }
      }
    }, {
      key: 'navigateToActivityInsertView',
      value: function navigateToActivityInsertView() {
        var view = this.getView('activity_types_list');
        if (view) {
          view.show();
        }
      }
    }, {
      key: 'initiateCall',
      value: function initiateCall() {
        // shortcut for environment call
        _Environment2.default.initiateCall.apply(this, arguments);
      }
    }, {
      key: 'initiateEmail',
      value: function initiateEmail() {
        // shortcut for environment call
        _Environment2.default.initiateEmail.apply(this, arguments);
      }
    }, {
      key: 'showMapForAddress',
      value: function showMapForAddress() {
        // shortcut for environment call
        _Environment2.default.showMapForAddress.apply(this, arguments);
      }
    }, {
      key: 'getVersionInfo',
      value: function getVersionInfo() {
        var info = _string2.default.substitute(this.versionInfoText, [this.mobileVersion.major, this.mobileVersion.minor, this.mobileVersion.revision, this.serverVersion.major]);
        return info;
      }
    }, {
      key: 'initOfflineData',
      value: function initOfflineData() {
        var _this13 = this;

        return new Promise(function (resolve, reject) {
          var model = _this13.ModelManager.getModel(_Names2.default.AUTHENTICATION, _Types2.default.OFFLINE);
          if (model) {
            var indicator = new _BusyIndicator2.default({
              id: 'busyIndicator__offlineData',
              label: resource.offlineInitDataText
            });
            _this13.modal.disableClose = true;
            _this13.modal.showToolbar = false;
            _this13.modal.add(indicator);
            indicator.start();

            model.initAuthentication(_this13.context.user.$key).then(function (result) {
              if (result.hasUserChanged || !result.hasAuthenticatedToday) {
                _Manager2.default.clearAllData().then(function () {
                  model.updateEntry(result.entry);
                  indicator.complete(true);
                  _this13.modal.disableClose = false;
                  _this13.modal.hide();
                  resolve();
                }, function (err) {
                  indicator.complete(true);
                  _this13.modal.disableClose = false;
                  _this13.modal.hide();
                  reject(err);
                });
              } else {
                result.entry.ModifyDate = moment().toDate();
                model.updateEntry(result.entry);
                indicator.complete(true);
                _this13.modal.disableClose = false;
                _this13.modal.hide();
                resolve(); // Do nothing since this not the first time athuenticating.
              }
            }, function (err) {
              reject(err);
            });
          } else {
            resolve();
          }
        });
      }
    }]);

    return Application;
  }(_Application2.default);

  exports.default = Application;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIkFwcGxpY2F0aW9uIiwib3B0aW9ucyIsImNvbm5lY3Rpb25zIiwiZGVmYXVsdExvY2FsZSIsImVuYWJsZVVwZGF0ZU5vdGlmaWNhdGlvbiIsImVuYWJsZU11bHRpQ3VycmVuY3kiLCJtdWx0aUN1cnJlbmN5IiwiZW5hYmxlR3JvdXBzIiwiZW5hYmxlSGFzaFRhZ3MiLCJtYXhVcGxvYWRGaWxlU2l6ZSIsImVuYWJsZUNvbmN1cnJlbmN5Q2hlY2siLCJlbmFibGVPZmZsaW5lU3VwcG9ydCIsIndhcmVob3VzZURpc2NvdmVyeSIsImVuYWJsZU1pbmdsZSIsIm1pbmdsZUVuYWJsZWQiLCJtaW5nbGVTZXR0aW5ncyIsIm1pbmdsZVJlZGlyZWN0VXJsIiwibmF2aWdhdGlvblN0YXRlIiwicmVtZW1iZXJOYXZpZ2F0aW9uU3RhdGUiLCJzcGVlZFNlYXJjaCIsImluY2x1ZGVTdGVtbWluZyIsImluY2x1ZGVQaG9uaWMiLCJpbmNsdWRlVGhlc2F1cnVzIiwidXNlRnJlcXVlbnRGaWx0ZXIiLCJzZWFyY2hUeXBlIiwiZW5hYmxlQ2FjaGluZyIsInVzZXJEZXRhaWxzUXVlcnlTZWxlY3QiLCJ1c2VyT3B0aW9uc1RvUmVxdWVzdCIsInN5c3RlbU9wdGlvbnNUb1JlcXVlc3QiLCJhcHBOYW1lIiwic2VydmVyVmVyc2lvbiIsIm1ham9yIiwibWlub3IiLCJyZXZpc2lvbiIsIm1vYmlsZVZlcnNpb24iLCJ2ZXJzaW9uSW5mb1RleHQiLCJsb2FkaW5nVGV4dCIsImF1dGhUZXh0IiwiY29ubmVjdGlvblRvYXN0VGl0bGVUZXh0Iiwib2ZmbGluZVRleHQiLCJvbmxpbmVUZXh0IiwibWluZ2xlQXV0aEVycm9yVGV4dCIsImhvbWVWaWV3SWQiLCJvZmZsaW5lSG9tZVZpZXdJZCIsImxvZ2luVmlld0lkIiwibG9nT2ZmVmlld0lkIiwiVUlEIiwiaXNBdXRoZW50aWNhdGVkIiwiaGFzU3RhdGUiLCJkZWZhdWx0Vmlld3MiLCJPYmplY3QiLCJhc3NpZ24iLCJfY29uZmlnIiwicGlja2xpc3RTZXJ2aWNlIiwiX2NhY2hpbmdTZXJ2aWNlIiwiSUNSTVNlcnZpY2VzU0RLIiwiQ2FjaGluZ1NlcnZpY2UiLCJsb2NhbFN0b3JhZ2UiLCJpbml0IiwiZ2V0U2VydmljZSIsImFyZ3VtZW50cyIsInN0b3JlIiwiZGlzcGF0Y2giLCJfbG9hZE5hdmlnYXRpb25TdGF0ZSIsImFjY2Vzc1Rva2VuIiwiaXNNaW5nbGVFbmFibGVkIiwibWluZ2xlQXV0aFJlc3VsdHMiLCJhY2Nlc3NfdG9rZW4iLCJEYXRlIiwiZ2V0VGltZSIsIm9yaWdpbmFsIiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTZXJ2aWNlIiwicHJvdG90eXBlIiwiZXhlY3V0ZVJlcXVlc3QiLCJzZWxmIiwicmVxdWVzdCIsInNldFJlcXVlc3RIZWFkZXIiLCJ2ZXJzaW9uIiwiaWQiLCJhcHBseSIsIl9zYXZlRGVmYXVsdFByZWZlcmVuY2VzIiwic2RrIiwiUmVkdXgiLCJjb21iaW5lUmVkdWNlcnMiLCJhcHAiLCJ3aW5kb3ciLCJhcHBsaWNhdGlvbkNhY2hlIiwiJCIsIm9uIiwiX2NoZWNrRm9yVXBkYXRlIiwiYmluZCIsIm9mZiIsImhpc3RvcnkiLCJjb250ZXh0IiwibGVuZ3RoIiwiY3VycmVudCIsInByZXZpb3VzIiwiaXNGaXJzdFZpZXciLCJwYWdlIiwiX2NoZWNrU2F2ZU5hdmlnYXRpb25TdGF0ZSIsIl9zYXZlTmF2aWdhdGlvblN0YXRlIiwic3RhdHVzIiwiVVBEQVRFUkVBRFkiLCJfbm90aWZ5VXBkYXRlQXZhaWxhYmxlIiwiYmFycyIsInVwZGF0ZWJhciIsInNob3ciLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsIlJlVUkiLCJlIiwic3lzdGVtT3B0aW9ucyIsIkxvY2tPcHBvcnR1bml0eVJhdGUiLCJDaGFuZ2VPcHBvcnR1bml0eVJhdGUiLCJyZXN1bHRzIiwiY29kZSIsInJhdGUiLCJoYXNNdWx0aUN1cnJlbmN5IiwiZXhjaGFuZ2VSYXRlcyIsInVzZXJPcHRpb25zIiwibXlDb2RlIiwibXlSYXRlIiwiQmFzZUN1cnJlbmN5IiwiYmFzZUNvZGUiLCJiYXNlUmF0ZSIsImZvdW5kIiwicXVlcnlOYXZpZ2F0aW9uQ29udGV4dCIsIm8iLCJ0ZXN0IiwicmVzb3VyY2VLaW5kIiwia2V5IiwiRXhjaGFuZ2VSYXRlIiwiRXhjaGFuZ2VSYXRlQ29kZSIsImxvY2FsaXphdGlvbiIsImxvY2FsZSIsImlzT25saW5lIiwibG9hZEVuZHBvaW50IiwiaGFuZGxlTWluZ2xlQXV0aGVudGljYXRpb24iLCJoYW5kbGVBdXRoZW50aWNhdGlvbiIsIm5hdmlnYXRlVG9Ib21lVmlldyIsImNyZWRlbnRpYWxzIiwiY2FsbGJhY2siLCJzY29wZSIsInJlc3VsdCIsInVzZXIiLCIka2V5IiwicmVzcG9uc2UiLCJ1c2VySWQiLCJ0cmltIiwiJGRlc2NyaXB0b3IiLCJwcmV0dHlOYW1lIiwiVXNlck5hbWUiLCJ1c2VyTmFtZSIsInJvbGVzIiwic2VjdXJlZEFjdGlvbnMiLCJ1c2VyU2VjdXJpdHkiLCJmb3JFYWNoIiwiaXRlbSIsInJlbWVtYmVyIiwiQmFzZTY0IiwiZW5jb2RlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImVuZHBvaW50IiwiY2FsbCIsInNlcnZpY2UiLCJzZXRVc2VyTmFtZSIsInNldFBhc3N3b3JkIiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsInNldENvbnRyYWN0TmFtZSIsInNldE9wZXJhdGlvbk5hbWUiLCJleGVjdXRlIiwic3VjY2VzcyIsIm9uQXV0aGVudGljYXRlVXNlclN1Y2Nlc3MiLCJmYWlsdXJlIiwib25BdXRoZW50aWNhdGVVc2VyRmFpbHVyZSIsImFib3J0ZWQiLCJzZWN1cml0eSIsImhhc2giLCJsb2NhdGlvbiIsInJlbG9hZCIsImNsZWFyQXBwU3RhdGVQcm9taXNlcyIsImkiLCJtb2R1bGVzIiwibG9hZEFwcFN0YXRlUHJvbWlzZXMiLCJyZW1vdmVDcmVkZW50aWFscyIsIl9jbGVhck5hdmlnYXRpb25TdGF0ZSIsInJlc2V0TW9kdWxlQXBwU3RhdGVQcm9taXNlcyIsInZpZXciLCJnZXRWaWV3Iiwic3RvcmVkIiwiZ2V0SXRlbSIsImVuY29kZWQiLCJkZWNvZGUiLCJwYXJzZSIsInVyaSIsInNldEhvc3QiLCJob3N0bmFtZSIsInNldFNjaGVtZSIsInByb3RvY29sIiwicmVwbGFjZSIsInNldFBvcnQiLCJwb3J0IiwiYnVpbGQiLCJ1cmwiLCJyZW1vdmVJdGVtIiwiZ2V0Q3JlZGVudGlhbHMiLCJzZXRQcmltYXJ5VGl0bGUiLCJhdXRoZW50aWNhdGVVc2VyIiwib25IYW5kbGVBdXRoZW50aWNhdGlvblN1Y2Nlc3MiLCJvbkhhbmRsZUF1dGhlbnRpY2F0aW9uRmFpbGVkIiwib25IYW5kbGVBdXRoZW50aWNhdGlvbkFib3J0ZWQiLCJuYXZpZ2F0ZVRvTG9naW5WaWV3IiwiZXJyb3IiLCJvbk1pbmdsZUhhbmRsZUF1dGhlbnRpY2F0aW9uRmFpbGVkIiwic2hvd0hlYWRlciIsImluaXRBcHBTdGF0ZSIsInRoZW4iLCJvbkluaXRBcHBTdGF0ZVN1Y2Nlc3MiLCJlcnIiLCJoaWRlSGVhZGVyIiwib25Jbml0QXBwU3RhdGVGYWlsZWQiLCJoZWFkZXIiLCJnZXRDb250YWluZXJOb2RlIiwiaGlkZSIsInNldERlZmF1bHRNZXRyaWNQcmVmZXJlbmNlcyIsInNob3dBcHBsaWNhdGlvbk1lbnVPbkxhcmdlIiwiaW5pdE9mZmxpbmVEYXRhIiwibmF2aWdhdGVUb0luaXRpYWxWaWV3IiwibWVzc2FnZSIsIm9mZmxpbmVJbml0RXJyb3JUZXh0IiwiYWRkU2ltcGxlRXJyb3IiLCJzaG93RXJyb3JEaWFsb2ciLCJhcHBTdGF0ZUluaXRFcnJvclRleHQiLCJoaWRlQXBwbGljYXRpb25NZW51Iiwic3RhdGUiLCJwcmV2aW91c1N0YXRlIiwiY3VycmVudEVuZHBvaW50IiwiY29uZmlnIiwicHJldmlvdXNFbmRwb2ludCIsInVwZGF0ZVNlcnZpY2VVcmwiLCJzYXZlRW5kcG9pbnQiLCJzZXRVcmkiLCJzZXRBcHBsaWNhdGlvbk5hbWUiLCJpbml0aWFsTmF2aWdhdGlvblN0YXRlIiwicHJlZmVyZW5jZXMiLCJ2aWV3cyIsImdldERlZmF1bHRWaWV3cyIsImhvbWUiLCJ2aXNpYmxlIiwiY29uZmlndXJlIiwib3JkZXIiLCJzbGljZSIsInByZWZzIiwibWV0cmljcyIsImZpbHRlciIsImNoaWxkcmVuIiwiZGVmYXVsdHMiLCJnZXREZWZpbml0aW9ucyIsInBlcnNpc3RQcmVmZXJlbmNlcyIsInF1aWNrQWN0aW9ucyIsIlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0Iiwic2V0UmVzb3VyY2VLaW5kIiwic2V0UmVzb3VyY2VTZWxlY3RvciIsInNldFF1ZXJ5QXJnIiwiam9pbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVhZCIsImVudHJ5IiwiZGVmYXVsdE93bmVyIiwiRGVmYXVsdE93bmVyIiwiYmF0Y2giLCJTRGF0YUJhdGNoUmVxdWVzdCIsInVzaW5nIiwic2V0UmVzb3VyY2VLZXkiLCJjb21taXQiLCJmZWVkIiwiJHJlc291cmNlcyIsInZhbHVlIiwiZGVmYXVsdFZhbHVlIiwiaW5zZXJ0U2VjQ29kZSIsImN1cnJlbnREZWZhdWx0T3duZXIiLCJyZXF1ZXN0T3duZXJEZXNjcmlwdGlvbiIsImxvYWRDdXN0b21pemVkTW9tZW50IiwiYWRkRXJyb3IiLCJjdXN0b20iLCJidWlsZEN1c3RvbWl6ZWRNb21lbnQiLCJjdXJyZW50TGFuZyIsIm1vbWVudCIsInVzZXJXZWVrU3RhcnREYXkiLCJwYXJzZUludCIsImlzTmFOIiwid2VlayIsImRvdyIsInJlbGF0aXZlVGltZSIsImdldEN1cnJlbnRMb2NhbGUiLCJfbG9jYWxlIiwiX3JlbGF0aXZlVGltZSIsIlNEYXRhUmVzb3VyY2VDb2xsZWN0aW9uUmVxdWVzdCIsInN1Y2NlcyIsIm5hbWUiLCJpbmRleE9mIiwiTXVsdGlDdXJyZW5jeSIsInJlcXVlc3RFeGNoYW5nZVJhdGVzIiwiUmF0ZSIsIm9uUmVxdWVzdE93bmVyRGVzY3JpcHRpb25TdWNjZXNzIiwib25SZXF1ZXN0T3duZXJEZXNjcmlwdGlvbkZhaWx1cmUiLCJrZXlzIiwiZ2V0Vmlld0RldGFpbE9ubHkiLCJleHBvc2UiLCJyZXN0b3JlZEhpc3RvcnkiLCJoYXNSb290IiwiZGF0YSIsIm5lZ2F0ZUhpc3RvcnkiLCJoYXNWaWV3IiwidW5zaGlmdCIsImludGVncmF0aW9uIiwiaW50ZWdyYXRpb25TZXR0aW5ncyIsIlNEYXRhQmFzZVJlcXVlc3QiLCJBcHAiLCJwYWdlU2l6ZSIsInN0YXJ0SW5kZXgiLCIkc3RhcnRJbmRleCIsIiRpdGVtc1BlclBhZ2UiLCJzZXRQYXRoU2VnbWVudCIsInNldFN0YXJ0SW5kZXgiLCJzZXRDb3VudCIsInJlYWRGZWVkIiwiRGF0YVZhbHVlIiwic2hvd0xlZnREcmF3ZXIiLCJyZXN0b3JlZFN0YXRlIiwiY2xlYW5lZEhpc3RvcnkiLCJjbGVhblJlc3RvcmVkSGlzdG9yeSIsInRyYW5zaXRpb25pbmciLCJjb25jYXQiLCJsYXN0IiwiaXNNaW5nbGVSZWZyZXNoIiwiX2hhc1ZhbGlkUmVkaXJlY3QiLCJ2YXJzIiwicmVkaXJlY3RIYXNoIiwic3BsaXQiLCJwYWlyIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwib25saW5lIiwicmVxdWlyZXNNaW5nbGVSZWZyZXNoIiwicmVmcmVzaEFjY2Vzc1Rva2VuIiwicmVmcmVzaCIsInRvYXN0IiwiYWRkIiwidGl0bGUiLCJzZXRUb29sQmFyTW9kZSIsInNldHVwUmVkaXJlY3RIYXNoIiwiaGFzaFZhbHVlIiwidmlld0lkIiwicmVkaXJlY3RWaWV3IiwiY2FuUmVkaXJlY3RUbyIsImluaXRpYXRlQ2FsbCIsImluaXRpYXRlRW1haWwiLCJzaG93TWFwRm9yQWRkcmVzcyIsImluZm8iLCJzdWJzdGl0dXRlIiwibW9kZWwiLCJNb2RlbE1hbmFnZXIiLCJnZXRNb2RlbCIsIkFVVEhFTlRJQ0FUSU9OIiwiT0ZGTElORSIsImluZGljYXRvciIsImxhYmVsIiwib2ZmbGluZUluaXREYXRhVGV4dCIsIm1vZGFsIiwiZGlzYWJsZUNsb3NlIiwic2hvd1Rvb2xiYXIiLCJzdGFydCIsImluaXRBdXRoZW50aWNhdGlvbiIsImhhc1VzZXJDaGFuZ2VkIiwiaGFzQXV0aGVudGljYXRlZFRvZGF5IiwiY2xlYXJBbGxEYXRhIiwidXBkYXRlRW50cnkiLCJjb21wbGV0ZSIsIk1vZGlmeURhdGUiLCJ0b0RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBLE1BQU1BLFdBQVcsb0JBQVksYUFBWixDQUFqQjs7QUFFQTs7Ozs7TUFJTUMsVzs7O0FBQ0osMkJBZ0JHO0FBQUEsVUFoQlNDLE9BZ0JULHVFQWhCbUI7QUFDcEJDLHFCQUFhLElBRE87QUFFcEJDLHVCQUFlLElBRks7QUFHcEJDLGtDQUEwQixLQUhOO0FBSXBCQyw2QkFBcUIsS0FKRDtBQUtwQkMsdUJBQWUsS0FMSyxFQUtFO0FBQ3RCQyxzQkFBYyxJQU5NO0FBT3BCQyx3QkFBZ0IsSUFQSTtBQVFwQkMsMkJBQW1CLFFBUkM7QUFTcEJDLGdDQUF3QixLQVRKO0FBVXBCQyw4QkFBc0IsS0FWRjtBQVdwQkMsNEJBQW9CLE1BWEE7QUFZcEJDLHNCQUFjLEtBWk07QUFhcEJDLHVCQUFlLEtBYkssRUFhRTtBQUN0QkMsd0JBQWdCLElBZEk7QUFlcEJDLDJCQUFtQjtBQWZDLE9BZ0JuQjs7QUFBQTs7QUFBQTs7QUFFRCxZQUFLQyxlQUFMLEdBQXVCLElBQXZCO0FBQ0EsWUFBS0MsdUJBQUwsR0FBK0IsSUFBL0I7QUFDQSxZQUFLQyxXQUFMLEdBQW1CO0FBQ2pCQyx5QkFBaUIsSUFEQTtBQUVqQkMsdUJBQWUsSUFGRTtBQUdqQkMsMEJBQWtCLEtBSEQ7QUFJakJDLDJCQUFtQixLQUpGO0FBS2pCQyxvQkFBWTtBQUxLLE9BQW5CO0FBT0EsWUFBS0MsYUFBTCxHQUFxQixJQUFyQjtBQUNB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LENBQW1DLFlBQU07QUFDdkNrSix3QkFBTWdCLFdBQU4sQ0FBa0I1TyxPQUFPK0gsS0FBekI7QUFDQWtHLDRCQUFVWSxRQUFWLENBQW1CLElBQW5CO0FBQ0EsMEJBQUtULEtBQUwsQ0FBV0MsWUFBWCxHQUEwQixLQUExQjtBQUNBLDBCQUFLRCxLQUFMLENBQVduSixJQUFYO0FBQ0EyQztBQUNELGlCQU5ELEVBTUcsVUFBQ2hELEdBQUQsRUFBUztBQUNWcUosNEJBQVVZLFFBQVYsQ0FBbUIsSUFBbkI7QUFDQSwwQkFBS1QsS0FBTCxDQUFXQyxZQUFYLEdBQTBCLEtBQTFCO0FBQ0EsMEJBQUtELEtBQUwsQ0FBV25KLElBQVg7QUFDQTRDLHlCQUFPakQsR0FBUDtBQUNELGlCQVhEO0FBWUQsZUFiRCxNQWFPO0FBQ0w1RSx1QkFBTytILEtBQVAsQ0FBYStHLFVBQWIsR0FBMEIzRixTQUFTNEYsTUFBVCxFQUExQjtBQUNBbkIsc0JBQU1nQixXQUFOLENBQWtCNU8sT0FBTytILEtBQXpCO0FBQ0FrRywwQkFBVVksUUFBVixDQUFtQixJQUFuQjtBQUNBLHdCQUFLVCxLQUFMLENBQVdDLFlBQVgsR0FBMEIsS0FBMUI7QUFDQSx3QkFBS0QsS0FBTCxDQUFXbkosSUFBWDtBQUNBMkMsMEJBTkssQ0FNTTtBQUNaO0FBQ0YsYUF0QkQsRUFzQkcsVUFBQ2hELEdBQUQsRUFBUztBQUNWaUQscUJBQU9qRCxHQUFQO0FBQ0QsYUF4QkQ7QUF5QkQsV0FuQ0QsTUFtQ087QUFDTGdEO0FBQ0Q7QUFDRixTQXhDTSxDQUFQO0FBeUNEOzs7Ozs7b0JBR1kvUSxXIiwiZmlsZSI6IkFwcGxpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBEZWZhdWx0TWV0cmljcyBmcm9tICcuL0RlZmF1bHRNZXRyaWNzJztcclxuaW1wb3J0IEVycm9yTWFuYWdlciBmcm9tICdhcmdvcy9FcnJvck1hbmFnZXInO1xyXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCBTREtBcHBsaWNhdGlvbiBmcm9tICdhcmdvcy9BcHBsaWNhdGlvbic7XHJcbmltcG9ydCBvZmZsaW5lTWFuYWdlciBmcm9tICdhcmdvcy9PZmZsaW5lL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IEJ1c3lJbmRpY2F0b3IgZnJvbSAnYXJnb3MvRGlhbG9ncy9CdXN5SW5kaWNhdG9yJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgTWluZ2xlVXRpbGl0eSBmcm9tICcuL01pbmdsZVV0aWxpdHknO1xyXG5pbXBvcnQgeyBhcHAgfSBmcm9tICcuL3JlZHVjZXJzL2luZGV4JztcclxuaW1wb3J0IHsgc2V0Q29uZmlnLCBzZXRFbmRQb2ludCB9IGZyb20gJy4vYWN0aW9ucy9jb25maWcnO1xyXG5pbXBvcnQgeyBzZXRVc2VyIH0gZnJvbSAnLi9hY3Rpb25zL3VzZXInO1xyXG5pbXBvcnQgUGlja2xpc3RTZXJ2aWNlIGZyb20gJy4vUGlja2xpc3RTZXJ2aWNlJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhcHBsaWNhdGlvbicpO1xyXG5cclxuLyoqXHJcbiAqIEBhbGlhcyBjcm0uQXBwbGljYXRpb25cclxuICogQGV4dGVuZHMgYXJnb3MuQXBwbGljYXRpb25cclxuICovXHJcbmNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgU0RLQXBwbGljYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7XHJcbiAgICBjb25uZWN0aW9uczogbnVsbCxcclxuICAgIGRlZmF1bHRMb2NhbGU6ICdlbicsXHJcbiAgICBlbmFibGVVcGRhdGVOb3RpZmljYXRpb246IGZhbHNlLFxyXG4gICAgZW5hYmxlTXVsdGlDdXJyZW5jeTogZmFsc2UsXHJcbiAgICBtdWx0aUN1cnJlbmN5OiBmYWxzZSwgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcclxuICAgIGVuYWJsZUdyb3VwczogdHJ1ZSxcclxuICAgIGVuYWJsZUhhc2hUYWdzOiB0cnVlLFxyXG4gICAgbWF4VXBsb2FkRmlsZVNpemU6IDQwMDAwMDAwLFxyXG4gICAgZW5hYmxlQ29uY3VycmVuY3lDaGVjazogZmFsc2UsXHJcbiAgICBlbmFibGVPZmZsaW5lU3VwcG9ydDogZmFsc2UsXHJcbiAgICB3YXJlaG91c2VEaXNjb3Zlcnk6ICdhdXRvJyxcclxuICAgIGVuYWJsZU1pbmdsZTogZmFsc2UsXHJcbiAgICBtaW5nbGVFbmFibGVkOiBmYWxzZSwgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcclxuICAgIG1pbmdsZVNldHRpbmdzOiBudWxsLFxyXG4gICAgbWluZ2xlUmVkaXJlY3RVcmw6ICcnLFxyXG4gIH0pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZSA9IG51bGw7XHJcbiAgICB0aGlzLnJlbWVtYmVyTmF2aWdhdGlvblN0YXRlID0gdHJ1ZTtcclxuICAgIHRoaXMuc3BlZWRTZWFyY2ggPSB7XHJcbiAgICAgIGluY2x1ZGVTdGVtbWluZzogdHJ1ZSxcclxuICAgICAgaW5jbHVkZVBob25pYzogdHJ1ZSxcclxuICAgICAgaW5jbHVkZVRoZXNhdXJ1czogZmFsc2UsXHJcbiAgICAgIHVzZUZyZXF1ZW50RmlsdGVyOiBmYWxzZSxcclxuICAgICAgc2VhcmNoVHlwZTogMSxcclxuICAgIH07XHJcbiAgICB0aGlzLmVuYWJsZUNhY2hpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy51c2VyRGV0YWlsc1F1ZXJ5U2VsZWN0ID0gWydVc2VyTmFtZScsICdVc2VySW5mby9Vc2VyTmFtZScsICdVc2VySW5mby9GaXJzdE5hbWUnLCAnVXNlckluZm8vTGFzdE5hbWUnLCAnRGVmYXVsdE93bmVyL093bmVyRGVzY3JpcHRpb24nXTtcclxuICAgIHRoaXMudXNlck9wdGlvbnNUb1JlcXVlc3QgPSBbXHJcbiAgICAgICdjYXRlZ29yeT1EZWZhdWx0R3JvdXA7bmFtZT1BQ0NPVU5UJyxcclxuICAgICAgJ2NhdGVnb3J5PURlZmF1bHRHcm91cDtuYW1lPUNPTlRBQ1QnLFxyXG4gICAgICAnY2F0ZWdvcnk9RGVmYXVsdEdyb3VwO25hbWU9T1BQT1JUVU5JVFknLFxyXG4gICAgICAnY2F0ZWdvcnk9RGVmYXVsdEdyb3VwO25hbWU9TEVBRCcsXHJcbiAgICAgICdjYXRlZ29yeT1EZWZhdWx0R3JvdXA7bmFtZT1USUNLRVQnLFxyXG4gICAgICAnY2F0ZWdvcnk9RGVmYXVsdEdyb3VwO25hbWU9U0FMRVNPUkRFUicsXHJcbiAgICAgICdjYXRlZ29yeT1EZWZhdWx0R3JvdXA7bmFtZT1RVU9URScsXHJcbiAgICAgICdjYXRlZ29yeT1HZW5lcmFsO25hbWU9SW5zZXJ0U2VjQ29kZUlEJyxcclxuICAgICAgJ2NhdGVnb3J5PUdlbmVyYWw7bmFtZT1DdXJyZW5jeScsXHJcbiAgICAgICdjYXRlZ29yeT1DYWxlbmRhcjtuYW1lPURheVN0YXJ0VGltZScsXHJcbiAgICAgICdjYXRlZ29yeT1DYWxlbmRhcjtuYW1lPVdlZWtTdGFydCcsXHJcbiAgICAgICdjYXRlZ29yeT1BY3Rpdml0eU1lZXRpbmdPcHRpb25zO25hbWU9QWxhcm1FbmFibGVkJyxcclxuICAgICAgJ2NhdGVnb3J5PUFjdGl2aXR5TWVldGluZ09wdGlvbnM7bmFtZT1BbGFybUxlYWQnLFxyXG4gICAgICAnY2F0ZWdvcnk9QWN0aXZpdHlNZWV0aW5nT3B0aW9ucztuYW1lPUR1cmF0aW9uJyxcclxuICAgICAgJ2NhdGVnb3J5PUFjdGl2aXR5UGhvbmVPcHRpb25zO25hbWU9QWxhcm1FbmFibGVkJyxcclxuICAgICAgJ2NhdGVnb3J5PUFjdGl2aXR5UGhvbmVPcHRpb25zO25hbWU9QWxhcm1MZWFkJyxcclxuICAgICAgJ2NhdGVnb3J5PUFjdGl2aXR5UGhvbmVPcHRpb25zO25hbWU9RHVyYXRpb24nLFxyXG4gICAgICAnY2F0ZWdvcnk9QWN0aXZpdHlUb0RvT3B0aW9ucztuYW1lPUFsYXJtRW5hYmxlZCcsXHJcbiAgICAgICdjYXRlZ29yeT1BY3Rpdml0eVRvRG9PcHRpb25zO25hbWU9QWxhcm1MZWFkJyxcclxuICAgICAgJ2NhdGVnb3J5PUFjdGl2aXR5VG9Eb09wdGlvbnM7bmFtZT1EdXJhdGlvbicsXHJcbiAgICAgICdjYXRlZ29yeT1BY3Rpdml0eVBlcnNvbmFsT3B0aW9ucztuYW1lPUFsYXJtRW5hYmxlZCcsXHJcbiAgICAgICdjYXRlZ29yeT1BY3Rpdml0eVBlcnNvbmFsT3B0aW9ucztuYW1lPUFsYXJtTGVhZCcsXHJcbiAgICAgICdjYXRlZ29yeT1BY3Rpdml0eVBlcnNvbmFsT3B0aW9ucztuYW1lPUR1cmF0aW9uJyxcclxuICAgIF07XHJcbiAgICB0aGlzLnN5c3RlbU9wdGlvbnNUb1JlcXVlc3QgPSBbXHJcbiAgICAgICdCYXNlQ3VycmVuY3knLFxyXG4gICAgICAnTXVsdGlDdXJyZW5jeScsXHJcbiAgICAgICdDaGFuZ2VPcHBvcnR1bml0eVJhdGUnLFxyXG4gICAgICAnTG9ja09wcG9ydHVuaXR5UmF0ZScsXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hcHBOYW1lID0gJ2FyZ29zLXNhbGVzbG9naXgnO1xyXG4gICAgdGhpcy5zZXJ2ZXJWZXJzaW9uID0ge1xyXG4gICAgICBtYWpvcjogOCxcclxuICAgICAgbWlub3I6IDAsXHJcbiAgICAgIHJldmlzaW9uOiAwLFxyXG4gICAgfTtcclxuICAgIHRoaXMubW9iaWxlVmVyc2lvbiA9IHtcclxuICAgICAgbWFqb3I6IDQsXHJcbiAgICAgIG1pbm9yOiAxLFxyXG4gICAgICByZXZpc2lvbjogMCxcclxuICAgIH07XHJcbiAgICB0aGlzLnZlcnNpb25JbmZvVGV4dCA9IHJlc291cmNlLnZlcnNpb25JbmZvVGV4dDtcclxuICAgIHRoaXMubG9hZGluZ1RleHQgPSByZXNvdXJjZS5sb2FkaW5nVGV4dDtcclxuICAgIHRoaXMuYXV0aFRleHQgPSByZXNvdXJjZS5hdXRoVGV4dDtcclxuICAgIHRoaXMuY29ubmVjdGlvblRvYXN0VGl0bGVUZXh0ID0gcmVzb3VyY2UuY29ubmVjdGlvblRvYXN0VGl0bGVUZXh0O1xyXG4gICAgdGhpcy5vZmZsaW5lVGV4dCA9IHJlc291cmNlLm9mZmxpbmVUZXh0O1xyXG4gICAgdGhpcy5vbmxpbmVUZXh0ID0gcmVzb3VyY2Uub25saW5lVGV4dDtcclxuICAgIHRoaXMubWluZ2xlQXV0aEVycm9yVGV4dCA9IHJlc291cmNlLm1pbmdsZUF1dGhFcnJvclRleHQ7XHJcbiAgICB0aGlzLmhvbWVWaWV3SWQgPSAnbXlhY3Rpdml0eV9saXN0JztcclxuICAgIHRoaXMub2ZmbGluZUhvbWVWaWV3SWQgPSAncmVjZW50bHlfdmlld2VkX2xpc3Rfb2ZmbGluZSc7XHJcbiAgICB0aGlzLmxvZ2luVmlld0lkID0gJ2xvZ2luJztcclxuICAgIHRoaXMubG9nT2ZmVmlld0lkID0gJ2xvZ29mZic7XHJcbiAgICB0aGlzLlVJRCA9IG51bGw7XHJcbiAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5oYXNTdGF0ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5kZWZhdWx0Vmlld3MgPSBbXHJcbiAgICAgICdteWRheV9saXN0JyxcclxuICAgICAgJ2NhbGVuZGFyX3ZpZXcnLFxyXG4gICAgICAnaGlzdG9yeV9saXN0JyxcclxuICAgICAgJ2FjY291bnRfbGlzdCcsXHJcbiAgICAgICdjb250YWN0X2xpc3QnLFxyXG4gICAgICAnbGVhZF9saXN0JyxcclxuICAgICAgJ29wcG9ydHVuaXR5X2xpc3QnLFxyXG4gICAgICAndGlja2V0X2xpc3QnLFxyXG4gICAgICAnbXlhdHRhY2htZW50X2xpc3QnLFxyXG4gICAgICAncmVjZW50bHlfdmlld2VkX2xpc3QnLFxyXG4gICAgICAnYnJpZWZjYXNlX2xpc3QnLFxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBTZXR0aW5nc1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTsgLy8gVE9ETzogUmVtb3ZlXHJcblxyXG4gICAgLy8gU2F2ZSB0aGlzIGNvbmZpZyB0ZW1wb3JhcmlseSB1bnRpbCB3ZSBoYXZlIGEgd29ya2luZyBzdG9yZSAoaW5pdCkuXHJcbiAgICB0aGlzLl9jb25maWcgPSBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIC8vIE11c3QgZXhpc3QgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgZm9yIEJPRSBNb2R1bGVcclxuICAgIHRoaXMucGlja2xpc3RTZXJ2aWNlID0gUGlja2xpc3RTZXJ2aWNlO1xyXG5cclxuICAgIHRoaXMuX2NhY2hpbmdTZXJ2aWNlID0gbmV3IElDUk1TZXJ2aWNlc1NESy5DYWNoaW5nU2VydmljZShsb2NhbFN0b3JhZ2UpO1xyXG4gICAgdGhpcy5waWNrbGlzdFNlcnZpY2UuaW5pdCh0aGlzLmdldFNlcnZpY2UoKSwgdGhpcy5fY2FjaGluZ1NlcnZpY2UpO1xyXG5cclxuICAgIHN1cGVyLmluaXQoLi4uYXJndW1lbnRzKTtcclxuICAgIC8vIERpc3BhdGNoIHRoZSB0ZW1wIGNvbmZpZyB3ZSBzYXZlZCBpbiB0aGUgY29uc3RydWN0b3JcclxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goc2V0Q29uZmlnKHRoaXMuX2NvbmZpZykpO1xyXG4gICAgdGhpcy5fY29uZmlnID0gbnVsbDtcclxuICAgIHRoaXMuX2xvYWROYXZpZ2F0aW9uU3RhdGUoKTtcclxuXHJcbiAgICBsZXQgYWNjZXNzVG9rZW4gPSBudWxsO1xyXG4gICAgaWYgKHRoaXMuaXNNaW5nbGVFbmFibGVkKCkpIHtcclxuICAgICAgYWNjZXNzVG9rZW4gPSB0aGlzLm1pbmdsZUF1dGhSZXN1bHRzLmFjY2Vzc190b2tlbjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLlVJRCA9IChuZXcgRGF0ZSgpKVxyXG4gICAgICAuZ2V0VGltZSgpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWwgPSBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNlcnZpY2UucHJvdG90eXBlLmV4ZWN1dGVSZXF1ZXN0O1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNlcnZpY2UucHJvdG90eXBlLmV4ZWN1dGVSZXF1ZXN0ID0gZnVuY3Rpb24gZXhlY3V0ZVJlcXVlc3QocmVxdWVzdCkge1xyXG4gICAgICBpZiAoYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCk7XHJcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdYLUF1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignWC1BcHBsaWNhdGlvbi1OYW1lJywgc2VsZi5hcHBOYW1lKTtcclxuICAgICAgY29uc3QgdmVyc2lvbiA9IHNlbGYubW9iaWxlVmVyc2lvbjtcclxuICAgICAgY29uc3QgaWQgPSBzZWxmLlVJRDtcclxuICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdYLUFwcGxpY2F0aW9uLVZlcnNpb24nLCBgJHt2ZXJzaW9uLm1ham9yfS4ke3ZlcnNpb24ubWlub3J9LiR7dmVyc2lvbi5yZXZpc2lvbn07JHtpZH1gKTtcclxuICAgICAgcmV0dXJuIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaW5pdFByZWZlcmVuY2VzKCkge1xyXG4gICAgc3VwZXIuaW5pdFByZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLl9zYXZlRGVmYXVsdFByZWZlcmVuY2VzKCk7XHJcbiAgfVxyXG5cclxuICBpc01pbmdsZUVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbmFibGVNaW5nbGUgfHwgdGhpcy5taW5nbGVFbmFibGVkO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVkdWNlcigpIHtcclxuICAgIGNvbnN0IHNkayA9IHN1cGVyLmdldFJlZHVjZXIoLi4uYXJndW1lbnRzKTtcclxuICAgIHJldHVybiBSZWR1eC5jb21iaW5lUmVkdWNlcnMoe1xyXG4gICAgICBzZGssXHJcbiAgICAgIGFwcCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgaW5pdENvbm5lY3RzKCkge1xyXG4gICAgc3VwZXIuaW5pdENvbm5lY3RzKC4uLmFyZ3VtZW50cyk7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5hcHBsaWNhdGlvbkNhY2hlKSB7XHJcbiAgICAgICQod2luZG93LmFwcGxpY2F0aW9uQ2FjaGUpLm9uKCd1cGRhdGVyZWFkeScsIHRoaXMuX2NoZWNrRm9yVXBkYXRlLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHN1cGVyLmRlc3Ryb3koKTtcclxuICAgICQod2luZG93LmFwcGxpY2F0aW9uQ2FjaGUpLm9mZigndXBkYXRlcmVhZHknLCB0aGlzLl9jaGVja0ZvclVwZGF0ZS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIGlzT25GaXJzdFZpZXcoKSB7XHJcbiAgICBjb25zdCBoaXN0b3J5ID0gdGhpcy5jb250ZXh0Lmhpc3Rvcnk7XHJcbiAgICBjb25zdCBsZW5ndGggPSBoaXN0b3J5Lmxlbmd0aDtcclxuICAgIGNvbnN0IGN1cnJlbnQgPSBoaXN0b3J5W2xlbmd0aCAtIDFdO1xyXG4gICAgY29uc3QgcHJldmlvdXMgPSBoaXN0b3J5W2xlbmd0aCAtIDJdO1xyXG4gICAgbGV0IGlzRmlyc3RWaWV3ID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKChjdXJyZW50ICYmIGN1cnJlbnQucGFnZSA9PT0gdGhpcy5sb2dpblZpZXdJZCkgfHwgKGN1cnJlbnQgJiYgY3VycmVudC5wYWdlID09PSB0aGlzLmxvZ09mZlZpZXdJZCkpIHtcclxuICAgICAgaXNGaXJzdFZpZXcgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwcmV2aW91cyAmJiBwcmV2aW91cy5wYWdlID09PSB0aGlzLmxvZ2luVmlld0lkKSB7XHJcbiAgICAgIGlzRmlyc3RWaWV3ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAobGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIGlzRmlyc3RWaWV3ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXNGaXJzdFZpZXc7XHJcbiAgfVxyXG5cclxuICBvblNldE9yaWVudGF0aW9uKCkge1xyXG4gICAgLy8gVE9ETzogQ2xvc2UgbWFpbiBuYXYgbGlrZSB3ZSBkaWQgd2l0aCBsZWZ0IGRyYXdlcj9cclxuICB9XHJcblxyXG4gIF92aWV3VHJhbnNpdGlvblRvKCkge1xyXG4gICAgc3VwZXIuX3ZpZXdUcmFuc2l0aW9uVG8oLi4uYXJndW1lbnRzKTtcclxuICAgIHRoaXMuX2NoZWNrU2F2ZU5hdmlnYXRpb25TdGF0ZSgpO1xyXG4gICAgLy8gVE9ETzogQ2xvc2UgbWFpbiBuYXYgbGlrZSB3ZSBkaWQgd2l0aCBsZWZ0IGRyYXdlcj9cclxuICB9XHJcblxyXG4gIF9jaGVja1NhdmVOYXZpZ2F0aW9uU3RhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5yZW1lbWJlck5hdmlnYXRpb25TdGF0ZSAhPT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5fc2F2ZU5hdmlnYXRpb25TdGF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2NoZWNrRm9yVXBkYXRlKCkge1xyXG4gICAgY29uc3QgYXBwbGljYXRpb25DYWNoZSA9IHdpbmRvdy5hcHBsaWNhdGlvbkNhY2hlO1xyXG4gICAgaWYgKGFwcGxpY2F0aW9uQ2FjaGUgJiYgdGhpcy5lbmFibGVVcGRhdGVOb3RpZmljYXRpb24pIHtcclxuICAgICAgaWYgKGFwcGxpY2F0aW9uQ2FjaGUuc3RhdHVzID09PSBhcHBsaWNhdGlvbkNhY2hlLlVQREFURVJFQURZKSB7XHJcbiAgICAgICAgdGhpcy5fbm90aWZ5VXBkYXRlQXZhaWxhYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9ub3RpZnlVcGRhdGVBdmFpbGFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5iYXJzLnVwZGF0ZWJhcikge1xyXG4gICAgICB0aGlzLmJhcnMudXBkYXRlYmFyLnNob3coKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zYXZlTmF2aWdhdGlvblN0YXRlKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hdmlnYXRpb25TdGF0ZScsIEpTT04uc3RyaW5naWZ5KFJlVUkuY29udGV4dC5oaXN0b3J5KSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9XHJcbiAgaGFzTXVsdGlDdXJyZW5jeSgpIHtcclxuICAgIC8vIENoZWNrIGlmIHRoZSBjb25maWd1cmF0aW9uIHNwZWNpZmllZCBtdWx0aUN1cnJlbmN5LCB0aGlzIHdpbGwgb3ZlcnJpZGUgdGhlIGR5bmFtaWMgY2hlY2suXHJcbiAgICAvLyBBIGNvbmZpZ3VyYXRpb24gaXMgbm90IGlkZWFsLCBhbmQgd2Ugc2hvdWxkIHJlZmFjdG9yIHRoZSBlZGl0IHZpZXcgdG8gcHJvY2VzcyB0aGUgbGF5b3V0IHdoZW4gaXQgZmlyc3QgcmVjaWV2ZXMgaXRzIGRhdGEsXHJcbiAgICAvLyBpbnN0ZWFkIG9mIG9uIHN0YXJ0dXAuIFdlIGNhbm5vdCBjaGVjayBBcHAuY29udGV4dCBkYXRhIHRoYXQgd2FzIGxvYWRlZCBhZnRlciBsb2dpbiB3aGVuIHRoZSBzdGFydHVwIG1ldGhvZCBpcyB1c2VkLlxyXG4gICAgaWYgKHRoaXMuZW5hYmxlTXVsdGlDdXJyZW5jeSB8fCB0aGlzLm11bHRpQ3VycmVuY3kpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBjYW5Mb2NrT3Bwb3J0dW5pdHlSYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuY29udGV4dCAmJlxyXG4gICAgICB0aGlzLmNvbnRleHQuc3lzdGVtT3B0aW9ucyAmJlxyXG4gICAgICB0aGlzLmNvbnRleHQuc3lzdGVtT3B0aW9ucy5Mb2NrT3Bwb3J0dW5pdHlSYXRlID09PSAnVHJ1ZScpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBjYW5DaGFuZ2VPcHBvcnR1bml0eVJhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5jb250ZXh0ICYmXHJcbiAgICAgIHRoaXMuY29udGV4dC5zeXN0ZW1PcHRpb25zICYmXHJcbiAgICAgIHRoaXMuY29udGV4dC5zeXN0ZW1PcHRpb25zLkNoYW5nZU9wcG9ydHVuaXR5UmF0ZSA9PT0gJ1RydWUnKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgZ2V0TXlFeGNoYW5nZVJhdGUoKSB7XHJcbiAgICBjb25zdCByZXN1bHRzID0ge1xyXG4gICAgICBjb2RlOiAnJyxcclxuICAgICAgcmF0ZTogMSxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuaGFzTXVsdGlDdXJyZW5jeSgpICYmXHJcbiAgICAgIHRoaXMuY29udGV4dCAmJlxyXG4gICAgICB0aGlzLmNvbnRleHQuZXhjaGFuZ2VSYXRlcyAmJlxyXG4gICAgICB0aGlzLmNvbnRleHQudXNlck9wdGlvbnMgJiZcclxuICAgICAgdGhpcy5jb250ZXh0LnVzZXJPcHRpb25zWydHZW5lcmFsOkN1cnJlbmN5J10pIHtcclxuICAgICAgY29uc3QgbXlDb2RlID0gdGhpcy5jb250ZXh0LnVzZXJPcHRpb25zWydHZW5lcmFsOkN1cnJlbmN5J107XHJcbiAgICAgIGNvbnN0IG15UmF0ZSA9IHRoaXMuY29udGV4dC5leGNoYW5nZVJhdGVzW215Q29kZV07XHJcbiAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0cywge1xyXG4gICAgICAgIGNvZGU6IG15Q29kZSxcclxuICAgICAgICByYXRlOiBteVJhdGUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH1cclxuICBnZXRCYXNlRXhjaGFuZ2VSYXRlKCkge1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IHtcclxuICAgICAgY29kZTogJycsXHJcbiAgICAgIHJhdGU6IDEsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmhhc011bHRpQ3VycmVuY3koKSAmJlxyXG4gICAgICB0aGlzLmNvbnRleHQgJiZcclxuICAgICAgdGhpcy5jb250ZXh0LmV4Y2hhbmdlUmF0ZXMgJiZcclxuICAgICAgdGhpcy5jb250ZXh0LnN5c3RlbU9wdGlvbnMgJiZcclxuICAgICAgdGhpcy5jb250ZXh0LnN5c3RlbU9wdGlvbnMuQmFzZUN1cnJlbmN5KSB7XHJcbiAgICAgIGNvbnN0IGJhc2VDb2RlID0gdGhpcy5jb250ZXh0LnN5c3RlbU9wdGlvbnMuQmFzZUN1cnJlbmN5O1xyXG4gICAgICBjb25zdCBiYXNlUmF0ZSA9IHRoaXMuY29udGV4dC5leGNoYW5nZVJhdGVzW2Jhc2VDb2RlXTtcclxuICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHRzLCB7XHJcbiAgICAgICAgY29kZTogYmFzZUNvZGUsXHJcbiAgICAgICAgcmF0ZTogYmFzZVJhdGUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH1cclxuICBnZXRDdXJyZW50T3Bwb3J0dW5pdHlFeGNoYW5nZVJhdGUoKSB7XHJcbiAgICBjb25zdCByZXN1bHRzID0ge1xyXG4gICAgICBjb2RlOiAnJyxcclxuICAgICAgcmF0ZTogMSxcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGZvdW5kID0gdGhpcy5xdWVyeU5hdmlnYXRpb25Db250ZXh0KChvKSA9PiB7XHJcbiAgICAgIHJldHVybiAoL14ob3Bwb3J0dW5pdGllcykkLylcclxuICAgICAgICAudGVzdChvLnJlc291cmNlS2luZCkgJiYgby5rZXk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3VuZCA9IGZvdW5kICYmIGZvdW5kLm9wdGlvbnM7XHJcblxyXG4gICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgIGNvbnN0IHJhdGUgPSBmb3VuZC5FeGNoYW5nZVJhdGU7XHJcbiAgICAgIGNvbnN0IGNvZGUgPSBmb3VuZC5FeGNoYW5nZVJhdGVDb2RlO1xyXG4gICAgICBPYmplY3QuYXNzaWduKHJlc3VsdHMsIHtcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIHJhdGUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH1cclxuICBnZXRDdXJyZW50TG9jYWxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGV4dC5sb2NhbGl6YXRpb24gJiYgdGhpcy5jb250ZXh0LmxvY2FsaXphdGlvbi5sb2NhbGUgfHwgdGhpcy5kZWZhdWx0TG9jYWxlO1xyXG4gIH1cclxuICBydW4oKSB7XHJcbiAgICBzdXBlci5ydW4oLi4uYXJndW1lbnRzKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc09ubGluZSgpIHx8ICF0aGlzLmVuYWJsZUNhY2hpbmcpIHtcclxuICAgICAgdGhpcy5sb2FkRW5kcG9pbnQoKTtcclxuICAgICAgaWYgKHRoaXMuaXNNaW5nbGVFbmFibGVkKCkpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZU1pbmdsZUF1dGhlbnRpY2F0aW9uKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVBdXRoZW50aWNhdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB0b2RvOiBhbHdheXMgbmF2aWdhdGUgdG8gaG9tZSB3aGVuIG9mZmxpbmU/IGRhdGEgbWF5IG5vdCBiZSBhdmFpbGFibGUgZm9yIHJlc3RvcmVkIHN0YXRlLlxyXG4gICAgICB0aGlzLm5hdmlnYXRlVG9Ib21lVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmVuYWJsZVVwZGF0ZU5vdGlmaWNhdGlvbikge1xyXG4gICAgICB0aGlzLl9jaGVja0ZvclVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBvbkF1dGhlbnRpY2F0ZVVzZXJTdWNjZXNzKGNyZWRlbnRpYWxzLCBjYWxsYmFjaywgc2NvcGUsIHJlc3VsdCkge1xyXG4gICAgY29uc3QgdXNlciA9IHtcclxuICAgICAgJGtleTogcmVzdWx0LnJlc3BvbnNlLnVzZXJJZC50cmltKCksXHJcbiAgICAgICRkZXNjcmlwdG9yOiByZXN1bHQucmVzcG9uc2UucHJldHR5TmFtZSxcclxuICAgICAgVXNlck5hbWU6IHJlc3VsdC5yZXNwb25zZS51c2VyTmFtZSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LnVzZXIgPSB1c2VyO1xyXG4gICAgdGhpcy5jb250ZXh0LnJvbGVzID0gcmVzdWx0LnJlc3BvbnNlLnJvbGVzO1xyXG4gICAgdGhpcy5jb250ZXh0LnNlY3VyZWRBY3Rpb25zID0gcmVzdWx0LnJlc3BvbnNlLnNlY3VyZWRBY3Rpb25zO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbnRleHQuc2VjdXJlZEFjdGlvbnMpIHtcclxuICAgICAgdGhpcy5jb250ZXh0LnVzZXJTZWN1cml0eSA9IHt9O1xyXG4gICAgICB0aGlzLmNvbnRleHQuc2VjdXJlZEFjdGlvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC51c2VyU2VjdXJpdHlbaXRlbV0gPSB0cnVlO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGRvd25ncmFkZSBzZXJ2ZXIgdmVyc2lvbiBhcyBvbmx5IDguMCBoYXMgYHNlY3VyZWRBY3Rpb25zYCBhcyBwYXJ0IG9mIHRoZVxyXG4gICAgICAvLyBgZ2V0Q3VycmVudFVzZXJgIHJlc3BvbnNlLlxyXG4gICAgICB0aGlzLnNlcnZlclZlcnNpb24gPSB7XHJcbiAgICAgICAgbWFqb3I6IDcsXHJcbiAgICAgICAgbWlub3I6IDUsXHJcbiAgICAgICAgcmV2aXNpb246IDQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmlzTWluZ2xlRW5hYmxlZCgpICYmIGNyZWRlbnRpYWxzLnJlbWVtYmVyKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3JlZGVudGlhbHMnLCBCYXNlNjQuZW5jb2RlKEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6IGNyZWRlbnRpYWxzLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogY3JlZGVudGlhbHMucGFzc3dvcmQgfHwgJycsXHJcbiAgICAgICAgICAgIGVuZHBvaW50OiBjcmVkZW50aWFscy5lbmRwb2ludCxcclxuICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7fSAvL2VzbGludC1kaXNhYmxlLWxpbmVcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgY2FsbGJhY2suY2FsbChzY29wZSB8fCB0aGlzLCB7XHJcbiAgICAgICAgdXNlcixcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uQXV0aGVudGljYXRlVXNlckZhaWx1cmUoY2FsbGJhY2ssIHNjb3BlLCByZXNwb25zZSkge1xyXG4gICAgY29uc3Qgc2VydmljZSA9IHRoaXMuZ2V0U2VydmljZSgpO1xyXG4gICAgaWYgKHNlcnZpY2UpIHtcclxuICAgICAgc2VydmljZVxyXG4gICAgICAgIC5zZXRVc2VyTmFtZShmYWxzZSlcclxuICAgICAgICAuc2V0UGFzc3dvcmQoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICBjYWxsYmFjay5jYWxsKHNjb3BlIHx8IHRoaXMsIHtcclxuICAgICAgICByZXNwb25zZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGF1dGhlbnRpY2F0ZVVzZXIoY3JlZGVudGlhbHMsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSB0aGlzLmdldFNlcnZpY2UoKTtcclxuICAgIGlmIChjcmVkZW50aWFscykge1xyXG4gICAgICBzZXJ2aWNlLnNldFVzZXJOYW1lKGNyZWRlbnRpYWxzLnVzZXJuYW1lKVxyXG4gICAgICAgIC5zZXRQYXNzd29yZChjcmVkZW50aWFscy5wYXNzd29yZCB8fCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNlcnZpY2VPcGVyYXRpb25SZXF1ZXN0KHNlcnZpY2UpXHJcbiAgICAgIC5zZXRDb250cmFjdE5hbWUoJ3N5c3RlbScpXHJcbiAgICAgIC5zZXRPcGVyYXRpb25OYW1lKCdnZXRDdXJyZW50VXNlcicpO1xyXG5cclxuICAgIHJlcXVlc3QuZXhlY3V0ZSh7fSwge1xyXG4gICAgICBzdWNjZXNzOiB0aGlzLm9uQXV0aGVudGljYXRlVXNlclN1Y2Nlc3MuYmluZCh0aGlzLCBjcmVkZW50aWFscywgb3B0aW9ucy5zdWNjZXNzLCBvcHRpb25zLnNjb3BlKSxcclxuICAgICAgZmFpbHVyZTogdGhpcy5vbkF1dGhlbnRpY2F0ZVVzZXJGYWlsdXJlLmJpbmQodGhpcywgb3B0aW9ucy5mYWlsdXJlLCBvcHRpb25zLnNjb3BlKSxcclxuICAgICAgYWJvcnRlZDogdGhpcy5vbkF1dGhlbnRpY2F0ZVVzZXJGYWlsdXJlLmJpbmQodGhpcywgb3B0aW9ucy5mYWlsdXJlLCBvcHRpb25zLnNjb3BlKSxcclxuICAgIH0pO1xyXG4gIH1cclxuICBoYXNBY2Nlc3NUbyhzZWN1cml0eSkge1xyXG4gICAgaWYgKCFzZWN1cml0eSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1c2VyID0gdGhpcy5jb250ZXh0LnVzZXI7XHJcbiAgICBjb25zdCB1c2VySWQgPSB1c2VyICYmIHVzZXIuJGtleTtcclxuICAgIGNvbnN0IHVzZXJTZWN1cml0eSA9IHRoaXMuY29udGV4dC51c2VyU2VjdXJpdHk7XHJcblxyXG4gICAgaWYgKC9eQURNSU5cXHMqL2kudGVzdCh1c2VySWQpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdXNlclNlY3VyaXR5ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gcnVubmluZyBhZ2FpbnN0IGEgcHJlIDguMCBTYWxlc0xvZ2l4IGVudmlyb25tZW50XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICEhdXNlclNlY3VyaXR5W3NlY3VyaXR5XTtcclxuICB9XHJcbiAgcmVsb2FkKCkge1xyXG4gICAgLy8gdGhpcy5SZVVJLmRpc2FibGVMb2NhdGlvbkNoZWNrKCk7XHJcbiAgICB0aGlzLmhhc2goJycpO1xyXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gIH1cclxuICByZXNldE1vZHVsZUFwcFN0YXRlUHJvbWlzZXMoKSB7XHJcbiAgICB0aGlzLmNsZWFyQXBwU3RhdGVQcm9taXNlcygpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5tb2R1bGVzW2ldLmxvYWRBcHBTdGF0ZVByb21pc2VzKHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBsb2dPdXQoKSB7XHJcbiAgICB0aGlzLnJlbW92ZUNyZWRlbnRpYWxzKCk7XHJcbiAgICB0aGlzLl9jbGVhck5hdmlnYXRpb25TdGF0ZSgpO1xyXG5cclxuICAgIGNvbnN0IHNlcnZpY2UgPSB0aGlzLmdldFNlcnZpY2UoKTtcclxuICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmNvbnRleHQgPSB7XHJcbiAgICAgIGhpc3Rvcnk6IFtdLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlc2V0TW9kdWxlQXBwU3RhdGVQcm9taXNlcygpO1xyXG5cclxuICAgIGlmIChzZXJ2aWNlKSB7XHJcbiAgICAgIHNlcnZpY2VcclxuICAgICAgICAuc2V0VXNlck5hbWUoZmFsc2UpXHJcbiAgICAgICAgLnNldFBhc3N3b3JkKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRWaWV3KHRoaXMubG9nT2ZmVmlld0lkKTtcclxuXHJcbiAgICBpZiAodmlldykge1xyXG4gICAgICB2aWV3LnNob3coKTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0Q3JlZGVudGlhbHMoKSB7XHJcbiAgICBsZXQgY3JlZGVudGlhbHMgPSBudWxsO1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICBjb25zdCBzdG9yZWQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NyZWRlbnRpYWxzJyk7XHJcbiAgICAgICAgY29uc3QgZW5jb2RlZCA9IHN0b3JlZCAmJiBCYXNlNjQuZGVjb2RlKHN0b3JlZCk7XHJcbiAgICAgICAgY3JlZGVudGlhbHMgPSBlbmNvZGVkICYmIEpTT04ucGFyc2UoZW5jb2RlZCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHt9IC8vZXNsaW50LWRpc2FibGUtbGluZVxyXG5cclxuICAgIHJldHVybiBjcmVkZW50aWFscztcclxuICB9XHJcbiAgbG9hZEVuZHBvaW50KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICBsZXQgcmVzdWx0cyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW5kcG9pbnQnKTtcclxuICAgICAgICBpZiAoIXJlc3VsdHMpIHtcclxuICAgICAgICAgIGNvbnN0IHNlcnZpY2UgPSB0aGlzLmdldFNlcnZpY2UoKTtcclxuICAgICAgICAgIGlmICghdGhpcy5pc01pbmdsZUVuYWJsZWQoKSkge1xyXG4gICAgICAgICAgICBzZXJ2aWNlLnVyaS5zZXRIb3N0KHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSlcclxuICAgICAgICAgICAgICAuc2V0U2NoZW1lKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbC5yZXBsYWNlKCc6JywgJycpKVxyXG4gICAgICAgICAgICAgIC5zZXRQb3J0KHdpbmRvdy5sb2NhdGlvbi5wb3J0KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXN1bHRzID0gc2VydmljZS51cmkuYnVpbGQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goc2V0RW5kUG9pbnQocmVzdWx0cykpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgfVxyXG4gIHNhdmVFbmRwb2ludCh1cmwgPSAnJykge1xyXG4gICAgaWYgKCF1cmwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbmRwb2ludCcsIHVybCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9XHJcbiAgcmVtb3ZlQ3JlZGVudGlhbHMoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3JlZGVudGlhbHMnKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge30gLy9lc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgfVxyXG4gIGhhbmRsZUF1dGhlbnRpY2F0aW9uKCkge1xyXG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSB0aGlzLmdldENyZWRlbnRpYWxzKCk7XHJcblxyXG4gICAgaWYgKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgIHRoaXMuc2V0UHJpbWFyeVRpdGxlKHRoaXMuYXV0aFRleHQpO1xyXG4gICAgICB0aGlzLmF1dGhlbnRpY2F0ZVVzZXIoY3JlZGVudGlhbHMsIHtcclxuICAgICAgICBzdWNjZXNzOiB0aGlzLm9uSGFuZGxlQXV0aGVudGljYXRpb25TdWNjZXNzLFxyXG4gICAgICAgIGZhaWx1cmU6IHRoaXMub25IYW5kbGVBdXRoZW50aWNhdGlvbkZhaWxlZCxcclxuICAgICAgICBhYm9ydGVkOiB0aGlzLm9uSGFuZGxlQXV0aGVudGljYXRpb25BYm9ydGVkLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUb0xvZ2luVmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxuICBoYW5kbGVNaW5nbGVBdXRoZW50aWNhdGlvbigpIHtcclxuICAgIGlmICh0aGlzLm1pbmdsZUF1dGhSZXN1bHRzICYmIHRoaXMubWluZ2xlQXV0aFJlc3VsdHMuZXJyb3IgPT09ICdhY2Nlc3NfZGVuaWVkJykge1xyXG4gICAgICB0aGlzLnNldFByaW1hcnlUaXRsZSh0aGlzLm1pbmdsZUF1dGhFcnJvclRleHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRQcmltYXJ5VGl0bGUodGhpcy5hdXRoVGV4dCk7XHJcbiAgICAgIHRoaXMuYXV0aGVudGljYXRlVXNlcihudWxsLCB7XHJcbiAgICAgICAgc3VjY2VzczogdGhpcy5vbkhhbmRsZUF1dGhlbnRpY2F0aW9uU3VjY2VzcyxcclxuICAgICAgICBmYWlsdXJlOiB0aGlzLm9uTWluZ2xlSGFuZGxlQXV0aGVudGljYXRpb25GYWlsZWQsXHJcbiAgICAgICAgYWJvcnRlZDogdGhpcy5vbkhhbmRsZUF1dGhlbnRpY2F0aW9uQWJvcnRlZCxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uSGFuZGxlQXV0aGVudGljYXRpb25TdWNjZXNzKCkge1xyXG4gICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zZXRQcmltYXJ5VGl0bGUodGhpcy5sb2FkaW5nVGV4dCk7XHJcbiAgICB0aGlzLnNob3dIZWFkZXIoKTtcclxuICAgIHRoaXMuaW5pdEFwcFN0YXRlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMub25Jbml0QXBwU3RhdGVTdWNjZXNzKCk7XHJcbiAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgIHRoaXMuaGlkZUhlYWRlcigpO1xyXG4gICAgICB0aGlzLm9uSW5pdEFwcFN0YXRlRmFpbGVkKGVycik7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgc2hvd0hlYWRlcigpIHtcclxuICAgIGNvbnN0IGhlYWRlciA9ICQoJy5oZWFkZXInLCB0aGlzLmdldENvbnRhaW5lck5vZGUoKSk7XHJcbiAgICBoZWFkZXIuc2hvdygpO1xyXG4gIH1cclxuICBoaWRlSGVhZGVyKCkge1xyXG4gICAgY29uc3QgaGVhZGVyID0gJCgnLmhlYWRlcicsIHRoaXMuZ2V0Q29udGFpbmVyTm9kZSgpKTtcclxuICAgIGhlYWRlci5oaWRlKCk7XHJcbiAgfVxyXG4gIG9uSGFuZGxlQXV0aGVudGljYXRpb25GYWlsZWQoKSB7XHJcbiAgICB0aGlzLnJlbW92ZUNyZWRlbnRpYWxzKCk7XHJcbiAgICB0aGlzLm5hdmlnYXRlVG9Mb2dpblZpZXcoKTtcclxuICB9XHJcbiAgb25NaW5nbGVIYW5kbGVBdXRoZW50aWNhdGlvbkZhaWxlZCgpIHtcclxuICAgIHRoaXMucmVtb3ZlQ3JlZGVudGlhbHMoKTtcclxuICAgIHRoaXMuc2V0UHJpbWFyeVRpdGxlKHRoaXMubWluZ2xlQXV0aEVycm9yVGV4dCk7XHJcbiAgfVxyXG4gIG9uSGFuZGxlQXV0aGVudGljYXRpb25BYm9ydGVkKCkge1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvTG9naW5WaWV3KCk7XHJcbiAgfVxyXG4gIG9uSW5pdEFwcFN0YXRlU3VjY2VzcygpIHtcclxuICAgIHRoaXMuc2V0RGVmYXVsdE1ldHJpY1ByZWZlcmVuY2VzKCk7XHJcbiAgICB0aGlzLnNob3dBcHBsaWNhdGlvbk1lbnVPbkxhcmdlKCk7XHJcbiAgICBpZiAodGhpcy5lbmFibGVPZmZsaW5lU3VwcG9ydCkge1xyXG4gICAgICB0aGlzLmluaXRPZmZsaW5lRGF0YSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFzU3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGVUb0luaXRpYWxWaWV3KCk7XHJcbiAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFzU3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZW5hYmxlT2ZmbGluZVN1cHBvcnQgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gcmVzb3VyY2Uub2ZmbGluZUluaXRFcnJvclRleHQ7XHJcbiAgICAgICAgRXJyb3JNYW5hZ2VyLmFkZFNpbXBsZUVycm9yKG1lc3NhZ2UsIGVycm9yKTtcclxuICAgICAgICBFcnJvck1hbmFnZXIuc2hvd0Vycm9yRGlhbG9nKG51bGwsIG1lc3NhZ2UsICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubmF2aWdhdGVUb0luaXRpYWxWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oYXNTdGF0ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUb0luaXRpYWxWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uSW5pdEFwcFN0YXRlRmFpbGVkKGVycm9yKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gcmVzb3VyY2UuYXBwU3RhdGVJbml0RXJyb3JUZXh0O1xyXG4gICAgdGhpcy5oaWRlQXBwbGljYXRpb25NZW51KCk7XHJcbiAgICBFcnJvck1hbmFnZXIuYWRkU2ltcGxlRXJyb3IobWVzc2FnZSwgZXJyb3IpO1xyXG4gICAgRXJyb3JNYW5hZ2VyLnNob3dFcnJvckRpYWxvZyhudWxsLCBtZXNzYWdlLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2NsZWFyTmF2aWdhdGlvblN0YXRlKCk7XHJcbiAgICAgIHRoaXMucmVtb3ZlQ3JlZGVudGlhbHMoKTtcclxuICAgICAgdGhpcy5uYXZpZ2F0ZVRvTG9naW5WaWV3KCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgb25TdGF0ZUNoYW5nZShzdGF0ZSkge1xyXG4gICAgc3VwZXIub25TdGF0ZUNoYW5nZShzdGF0ZSk7XHJcbiAgICBpZiAoIXN0YXRlIHx8IHN0YXRlID09PSB0aGlzLnByZXZpb3VzU3RhdGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRFbmRwb2ludCA9IHN0YXRlLmFwcC5jb25maWcuZW5kcG9pbnQ7XHJcbiAgICBjb25zdCBwcmV2aW91c0VuZHBvaW50ID0gdGhpcy5wcmV2aW91c1N0YXRlLmFwcC5jb25maWcuZW5kcG9pbnQ7XHJcbiAgICBpZiAoY3VycmVudEVuZHBvaW50ICE9PSBwcmV2aW91c0VuZHBvaW50KSB7XHJcbiAgICAgIHRoaXMudXBkYXRlU2VydmljZVVybChzdGF0ZSk7XHJcbiAgICAgIHRoaXMuc2F2ZUVuZHBvaW50KGN1cnJlbnRFbmRwb2ludCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZVNlcnZpY2VVcmwoc3RhdGUpIHtcclxuICAgIGlmICh0aGlzLmlzTWluZ2xlRW5hYmxlZCgpKSB7IC8vIFNlZSBUT0RPIGJlbG93LCBhcyB0byB3aHkgd2UgYXJlIGJhaWxpbmcgaGVyZVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VydmljZSA9IHRoaXMuZ2V0U2VydmljZSgpO1xyXG4gICAgc2VydmljZS5zZXRVcmkoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXBwLmNvbmZpZy5jb25uZWN0aW9ucywge1xyXG4gICAgICB1cmw6IHN0YXRlLmFwcC5jb25maWcuZW5kcG9pbnQsIC8vIFRPRE86IFNldHRpbmcgdGhlIFVSTCBoZXJlIHdpbGwgYnJlYWsgbWluZ2xlIGluc3RhbmNlcyB0aGF0IHVzZSBjdXN0b20gdmlydHVhbCBkaXJlY3Rvcmllc1xyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIEZpeGVzIGNhc2VzIHdoZXJlIHRoZSB1c2VyIHNldHMgYW5kIGludmFsaWQgY29udHJhY3QgbmFtZSBpbiB0aGUgdXJsLlxyXG4gICAgLy8gV2UgaGF2ZSBhIGxvdCBvZiByZXF1ZXN0cyB0aHJvdWdob3V0IHRoZSBhcHBsaWNhdGlvbiB0aGF0IGRvIG5vdCBzcGVjaWZ5XHJcbiAgICAvLyBhIGNvbnRyYWN0TmFtZSBhbmQgZGVwZW5kIG9uIHRoZSBkZWZhdWx0IGNvbnRyYWN0TmFtZSBvZiBcImR5bmFtaWNcIlxyXG4gICAgLy8gaW4gdGhlIHNlcnZpY2UuXHJcbiAgICBzZXJ2aWNlLnNldENvbnRyYWN0TmFtZSgnZHluYW1pYycpO1xyXG4gICAgc2VydmljZS5zZXRBcHBsaWNhdGlvbk5hbWUoJ3NseCcpO1xyXG4gIH1cclxuICBfY2xlYXJOYXZpZ2F0aW9uU3RhdGUoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLmluaXRpYWxOYXZpZ2F0aW9uU3RhdGUgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ25hdmlnYXRpb25TdGF0ZScpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7fSAvL2VzbGludC1kaXNhYmxlLWxpbmVcclxuICB9XHJcbiAgX2xvYWROYXZpZ2F0aW9uU3RhdGUoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGlvblN0YXRlID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYXZpZ2F0aW9uU3RhdGUnKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIH1cclxuICBfc2F2ZURlZmF1bHRQcmVmZXJlbmNlcygpIHtcclxuICAgIGlmICh0aGlzLnByZWZlcmVuY2VzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3cyA9IHRoaXMuZ2V0RGVmYXVsdFZpZXdzKCk7XHJcblxyXG4gICAgdGhpcy5wcmVmZXJlbmNlcyA9IHtcclxuICAgICAgaG9tZToge1xyXG4gICAgICAgIHZpc2libGU6IHZpZXdzLFxyXG4gICAgICB9LFxyXG4gICAgICBjb25maWd1cmU6IHtcclxuICAgICAgICBvcmRlcjogdmlld3Muc2xpY2UoMCksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH1cclxuICBnZXRNZXRyaWNzQnlSZXNvdXJjZUtpbmQocmVzb3VyY2VLaW5kKSB7XHJcbiAgICBsZXQgcmVzdWx0cyA9IFtdO1xyXG4gICAgbGV0IHByZWZzID0gdGhpcy5wcmVmZXJlbmNlcyAmJiB0aGlzLnByZWZlcmVuY2VzLm1ldHJpY3MgJiYgdGhpcy5wcmVmZXJlbmNlcy5tZXRyaWNzO1xyXG5cclxuICAgIGlmIChwcmVmcykge1xyXG4gICAgICBwcmVmcyA9IHByZWZzLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpdGVtLnJlc291cmNlS2luZCA9PT0gcmVzb3VyY2VLaW5kO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChwcmVmcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICByZXN1bHRzID0gcHJlZnNbMF0uY2hpbGRyZW47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxuICB9XHJcbiAgc2V0RGVmYXVsdE1ldHJpY1ByZWZlcmVuY2VzKCkge1xyXG4gICAgaWYgKCF0aGlzLnByZWZlcmVuY2VzLm1ldHJpY3MpIHtcclxuICAgICAgY29uc3QgZGVmYXVsdHMgPSBuZXcgRGVmYXVsdE1ldHJpY3MoKTtcclxuICAgICAgdGhpcy5wcmVmZXJlbmNlcy5tZXRyaWNzID0gZGVmYXVsdHMuZ2V0RGVmaW5pdGlvbnMoKTtcclxuICAgICAgdGhpcy5wZXJzaXN0UHJlZmVyZW5jZXMoKTtcclxuICAgIH1cclxuICB9XHJcbiAgY2xlYXJNZXRyaWNQcmVmZXJlbmNlcygpIHtcclxuICAgIHRoaXMucHJlZmVyZW5jZXMubWV0cmljcyA9IG51bGw7XHJcbiAgICB0aGlzLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gIH1cclxuICBjbGVhclF1aWNrQWN0aW9uUHJlZmVyZW5jZXMoKSB7XHJcbiAgICB0aGlzLnByZWZlcmVuY2VzLnF1aWNrQWN0aW9ucyA9IG51bGw7XHJcbiAgICB0aGlzLnBlcnNpc3RQcmVmZXJlbmNlcygpO1xyXG4gIH1cclxuICByZXF1ZXN0VXNlckRldGFpbHMoKSB7XHJcbiAgICBjb25zdCBrZXkgPSB0aGlzLmNvbnRleHQudXNlci4ka2V5O1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNpbmdsZVJlc291cmNlUmVxdWVzdCh0aGlzLmdldFNlcnZpY2UoKSlcclxuICAgICAgLnNldENvbnRyYWN0TmFtZSgnZHluYW1pYycpXHJcbiAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ3VzZXJzJylcclxuICAgICAgLnNldFJlc291cmNlU2VsZWN0b3IoYFwiJHtrZXl9XCJgKVxyXG4gICAgICAuc2V0UXVlcnlBcmcoJ3NlbGVjdCcsIHRoaXMudXNlckRldGFpbHNRdWVyeVNlbGVjdC5qb2luKCcsJykpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHJlcXVlc3QucmVhZCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhlbnRyeSkge1xyXG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChzZXRVc2VyKGVudHJ5KSk7XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHQudXNlciA9IGVudHJ5O1xyXG4gICAgICAgICAgdGhpcy5jb250ZXh0LmRlZmF1bHRPd25lciA9IGVudHJ5ICYmIGVudHJ5LkRlZmF1bHRPd25lcjtcclxuICAgICAgICAgIHJlc29sdmUoZW50cnkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbHVyZTogZnVuY3Rpb24gZmFpbHVyZShlKSB7XHJcbiAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmVxdWVzdFVzZXJPcHRpb25zKCkge1xyXG4gICAgY29uc3QgYmF0Y2ggPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFCYXRjaFJlcXVlc3QodGhpcy5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgIC5zZXRDb250cmFjdE5hbWUoJ3N5c3RlbScpXHJcbiAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ3VzZXJvcHRpb25zJylcclxuICAgICAgLnNldFF1ZXJ5QXJnKCdzZWxlY3QnLCAnbmFtZSx2YWx1ZSxkZWZhdWx0VmFsdWUnKVxyXG4gICAgICAudXNpbmcoZnVuY3Rpb24gdXNpbmcoKSB7XHJcbiAgICAgICAgY29uc3Qgc2VydmljZSA9IHRoaXMuZ2V0U2VydmljZSgpO1xyXG4gICAgICAgIHRoaXMudXNlck9wdGlvbnNUb1JlcXVlc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0KHNlcnZpY2UpXHJcbiAgICAgICAgICAgIC5zZXRDb250cmFjdE5hbWUoJ3N5c3RlbScpXHJcbiAgICAgICAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ3VzZXJvcHRpb25zJylcclxuICAgICAgICAgICAgLnNldFJlc291cmNlS2V5KGl0ZW0pXHJcbiAgICAgICAgICAgIC5yZWFkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGJhdGNoLmNvbW1pdCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhmZWVkKSB7XHJcbiAgICAgICAgICBjb25zdCB1c2VyT3B0aW9ucyA9IHRoaXMuY29udGV4dC51c2VyT3B0aW9ucyA9IHRoaXMuY29udGV4dC51c2VyT3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAgICAgICBmZWVkLiRyZXNvdXJjZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBpdGVtICYmIGl0ZW0uJGRlc2NyaXB0b3I7XHJcbiAgICAgICAgICAgIGxldCB7IHZhbHVlIH0gPSBpdGVtO1xyXG4gICAgICAgICAgICBjb25zdCB7IGRlZmF1bHRWYWx1ZSB9ID0gaXRlbTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgdmFsdWUgPSBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICB1c2VyT3B0aW9uc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGluc2VydFNlY0NvZGUgPSB1c2VyT3B0aW9uc1snR2VuZXJhbDpJbnNlcnRTZWNDb2RlSUQnXTtcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnREZWZhdWx0T3duZXIgPSB0aGlzLmNvbnRleHQuZGVmYXVsdE93bmVyICYmIHRoaXMuY29udGV4dC5kZWZhdWx0T3duZXIuJGtleTtcclxuXHJcbiAgICAgICAgICBpZiAoaW5zZXJ0U2VjQ29kZSAmJiAoIWN1cnJlbnREZWZhdWx0T3duZXIgfHwgKGN1cnJlbnREZWZhdWx0T3duZXIgIT09IGluc2VydFNlY0NvZGUpKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RPd25lckRlc2NyaXB0aW9uKGluc2VydFNlY0NvZGUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMubG9hZEN1c3RvbWl6ZWRNb21lbnQoKTtcclxuICAgICAgICAgIHJlc29sdmUoZmVlZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsdXJlOiBmdW5jdGlvbiBmYWlsdXJlKHJlc3BvbnNlLCBvKSB7XHJcbiAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywge30sICdmYWlsdXJlJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLypcclxuICAgKiBMb2FkcyBhIGN1c3RvbSBvYmplY3QgdG8gcGFzcyBpbnRvIHRoZSBjdXJyZW50IG1vbWVudCBsYW5ndWFnZS4gVGhlIG9iamVjdCBmb3IgdGhlIGxhbmd1YWdlIGdldHMgYnVpbHQgaW4gYnVpbGRDdXN0b21pemVkTW9tZW50LlxyXG4gICAqL1xyXG4gIGxvYWRDdXN0b21pemVkTW9tZW50KCkge1xyXG4gICAgY29uc3QgY3VzdG9tID0gdGhpcy5idWlsZEN1c3RvbWl6ZWRNb21lbnQoKTtcclxuICAgIGNvbnN0IGN1cnJlbnRMYW5nID0gbW9tZW50LmxvY2FsZSgpO1xyXG5cclxuICAgIG1vbWVudC5sb2NhbGUoY3VycmVudExhbmcsIGN1c3RvbSk7XHJcbiAgICB0aGlzLm1vbWVudCA9IG1vbWVudCgpLmxvY2FsZShjdXJyZW50TGFuZywgY3VzdG9tKTtcclxuICB9XHJcbiAgLypcclxuICAgKiBCdWlsZHMgYW4gb2JqZWN0IHRoYXQgd2lsbCBnZXQgcGFzc2VkIGludG8gbW9tZW50LmxvY2FsZSgpXHJcbiAgICovXHJcbiAgYnVpbGRDdXN0b21pemVkTW9tZW50KCkge1xyXG4gICAgaWYgKCF0aGlzLmNvbnRleHQudXNlck9wdGlvbnMpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlcldlZWtTdGFydERheSA9IHBhcnNlSW50KHRoaXMuY29udGV4dC51c2VyT3B0aW9uc1snQ2FsZW5kYXI6V2Vla1N0YXJ0J10sIDEwKTtcclxuICAgIGxldCByZXN1bHRzID0ge307IC8vIDAtNiwgU3VuLVNhdFxyXG5cclxuICAgIGlmICghaXNOYU4odXNlcldlZWtTdGFydERheSkpIHtcclxuICAgICAgcmVzdWx0cyA9IHtcclxuICAgICAgICB3ZWVrOiB7XHJcbiAgICAgICAgICBkb3c6IHVzZXJXZWVrU3RhcnREYXksXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWxhdGl2ZVRpbWU6IG1vbWVudCgpLmxvY2FsZSh0aGlzLmdldEN1cnJlbnRMb2NhbGUoKSkuX2xvY2FsZS5fcmVsYXRpdmVUaW1lLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH1cclxuICByZXF1ZXN0U3lzdGVtT3B0aW9ucygpIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFSZXNvdXJjZUNvbGxlY3Rpb25SZXF1ZXN0KHRoaXMuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0Q29udHJhY3ROYW1lKCdzeXN0ZW0nKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKCdzeXN0ZW1vcHRpb25zJylcclxuICAgICAgLnNldFF1ZXJ5QXJnKCdzZWxlY3QnLCAnbmFtZSx2YWx1ZScpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHJlcXVlc3QucmVhZCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzKGZlZWQpIHtcclxuICAgICAgICAgIGNvbnN0IHN5c3RlbU9wdGlvbnMgPSB0aGlzLmNvbnRleHQuc3lzdGVtT3B0aW9ucyA9IHRoaXMuY29udGV4dC5zeXN0ZW1PcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICAgIGZlZWQuJHJlc291cmNlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGl0ZW07XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiBuYW1lICYmIHRoaXMuc3lzdGVtT3B0aW9uc1RvUmVxdWVzdC5pbmRleE9mKG5hbWUpID4gLTEpIHtcclxuICAgICAgICAgICAgICBzeXN0ZW1PcHRpb25zW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IG11bHRpQ3VycmVuY3kgPSBzeXN0ZW1PcHRpb25zLk11bHRpQ3VycmVuY3k7XHJcblxyXG4gICAgICAgICAgaWYgKG11bHRpQ3VycmVuY3kgJiYgbXVsdGlDdXJyZW5jeSA9PT0gJ1RydWUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdEV4Y2hhbmdlUmF0ZXMoKVxyXG4gICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmVlZCk7XHJcbiAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKGZlZWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmFpbHVyZTogZnVuY3Rpb24gZmFpbHVyZShyZXNwb25zZSwgbykge1xyXG4gICAgICAgICAgRXJyb3JNYW5hZ2VyLmFkZEVycm9yKHJlc3BvbnNlLCBvLCB7fSwgJ2ZhaWx1cmUnKTtcclxuICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJlcXVlc3RFeGNoYW5nZVJhdGVzKCkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVJlc291cmNlQ29sbGVjdGlvblJlcXVlc3QodGhpcy5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgIC5zZXRDb250cmFjdE5hbWUoJ2R5bmFtaWMnKVxyXG4gICAgICAuc2V0UmVzb3VyY2VLaW5kKCdleGNoYW5nZVJhdGVzJylcclxuICAgICAgLnNldFF1ZXJ5QXJnKCdzZWxlY3QnLCAnUmF0ZScpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHJlcXVlc3QucmVhZCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhmZWVkKSB7XHJcbiAgICAgICAgICBjb25zdCBleGNoYW5nZVJhdGVzID0gdGhpcy5jb250ZXh0LmV4Y2hhbmdlUmF0ZXMgPSB0aGlzLmNvbnRleHQuZXhjaGFuZ2VSYXRlcyB8fCB7fTtcclxuXHJcbiAgICAgICAgICBmZWVkLiRyZXNvdXJjZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBpdGVtICYmIGl0ZW0uJGRlc2NyaXB0b3I7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaXRlbSAmJiBpdGVtLlJhdGU7XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgJiYga2V5KSB7XHJcbiAgICAgICAgICAgICAgZXhjaGFuZ2VSYXRlc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHJlc29sdmUoZmVlZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsdXJlOiBmdW5jdGlvbiBmYWlsdXJlKHJlc3BvbnNlLCBvKSB7XHJcbiAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgIEVycm9yTWFuYWdlci5hZGRFcnJvcihyZXNwb25zZSwgbywge30sICdmYWlsdXJlJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmVxdWVzdE93bmVyRGVzY3JpcHRpb24oa2V5KSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2luZ2xlUmVzb3VyY2VSZXF1ZXN0KHRoaXMuZ2V0U2VydmljZSgpKVxyXG4gICAgICAuc2V0Q29udHJhY3ROYW1lKCdkeW5hbWljJylcclxuICAgICAgLnNldFJlc291cmNlS2luZCgnb3duZXJzJylcclxuICAgICAgLnNldFJlc291cmNlU2VsZWN0b3IoYFwiJHtrZXl9XCJgKVxyXG4gICAgICAuc2V0UXVlcnlBcmcoJ3NlbGVjdCcsICdPd25lckRlc2NyaXB0aW9uJyk7XHJcblxyXG4gICAgcmVxdWVzdC5yZWFkKHtcclxuICAgICAgc3VjY2VzczogdGhpcy5vblJlcXVlc3RPd25lckRlc2NyaXB0aW9uU3VjY2VzcyxcclxuICAgICAgZmFpbHVyZTogdGhpcy5vblJlcXVlc3RPd25lckRlc2NyaXB0aW9uRmFpbHVyZSxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9KTtcclxuICB9XHJcbiAgb25SZXF1ZXN0T3duZXJEZXNjcmlwdGlvblN1Y2Nlc3MoZW50cnkpIHtcclxuICAgIGlmIChlbnRyeSkge1xyXG4gICAgICB0aGlzLmNvbnRleHQuZGVmYXVsdE93bmVyID0gZW50cnk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uUmVxdWVzdE93bmVyRGVzY3JpcHRpb25GYWlsdXJlKHJlc3BvbnNlLCBvKSB7XHJcbiAgICBFcnJvck1hbmFnZXIuYWRkRXJyb3IocmVzcG9uc2UsIG8sIHt9LCAnZmFpbHVyZScpO1xyXG4gIH1cclxuICBnZXREZWZhdWx0Vmlld3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0Vmlld3M7XHJcbiAgfVxyXG4gIGdldEV4cG9zZWRWaWV3cygpIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnZpZXdzKS5maWx0ZXIoKGlkKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmdldFZpZXdEZXRhaWxPbmx5KGlkKTtcclxuICAgICAgcmV0dXJuIHZpZXcgJiYgdmlldy5pZCAhPT0gJ2hvbWUnICYmIHZpZXcuZXhwb3NlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGNsZWFuUmVzdG9yZWRIaXN0b3J5KHJlc3RvcmVkSGlzdG9yeSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgbGV0IGhhc1Jvb3QgPSBmYWxzZTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gcmVzdG9yZWRIaXN0b3J5Lmxlbmd0aCAtIDE7IGkgPj0gMCAmJiAhaGFzUm9vdDsgaS0tKSB7XHJcbiAgICAgIGlmIChyZXN0b3JlZEhpc3RvcnlbaV0uZGF0YS5vcHRpb25zICYmIHJlc3RvcmVkSGlzdG9yeVtpXS5kYXRhLm9wdGlvbnMubmVnYXRlSGlzdG9yeSkge1xyXG4gICAgICAgIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5oYXNWaWV3KHJlc3RvcmVkSGlzdG9yeVtpXS5wYWdlKSkge1xyXG4gICAgICAgIHJlc3VsdC51bnNoaWZ0KHJlc3RvcmVkSGlzdG9yeVtpXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGhhc1Jvb3QgPSAocmVzdG9yZWRIaXN0b3J5W2ldLnBhZ2UgPT09ICdob21lJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGhhc1Jvb3QgJiYgcmVzdWx0O1xyXG4gIH1cclxuICByZXF1ZXN0SW50ZWdyYXRpb25TZXR0aW5ncyhpbnRlZ3JhdGlvbikge1xyXG4gICAgaWYgKCF0aGlzLmNvbnRleHQuaW50ZWdyYXRpb25TZXR0aW5ncykge1xyXG4gICAgICB0aGlzLmNvbnRleHQuaW50ZWdyYXRpb25TZXR0aW5ncyA9IHt9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YUJhc2VSZXF1ZXN0KEFwcC5nZXRTZXJ2aWNlKCkpO1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSB0aGlzLnBhZ2VTaXplO1xyXG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMuZmVlZCAmJiB0aGlzLmZlZWQuJHN0YXJ0SW5kZXggPiAwICYmIHRoaXMuZmVlZC4kaXRlbXNQZXJQYWdlID4gMCA/IHRoaXMuZmVlZC4kc3RhcnRJbmRleCArIHRoaXMuZmVlZC4kaXRlbXNQZXJQYWdlIDogMTtcclxuICAgIHJlcXVlc3QudXJpLnNldFBhdGhTZWdtZW50KDAsICdzbHgnKTtcclxuICAgIHJlcXVlc3QudXJpLnNldFBhdGhTZWdtZW50KDEsICdkeW5hbWljJyk7XHJcbiAgICByZXF1ZXN0LnVyaS5zZXRQYXRoU2VnbWVudCgyLCAnLScpO1xyXG4gICAgcmVxdWVzdC51cmkuc2V0UGF0aFNlZ21lbnQoMywgJ2N1c3RvbXNldHRpbmdzJyk7XHJcbiAgICByZXF1ZXN0LnVyaS5zZXRRdWVyeUFyZygnZm9ybWF0JywgJ0pTT04nKTtcclxuICAgIHJlcXVlc3QudXJpLnNldFF1ZXJ5QXJnKCdzZWxlY3QnLCAnRGVzY3JpcHRpb24sRGF0YVZhbHVlLERhdGFUeXBlJyk7XHJcbiAgICByZXF1ZXN0LnVyaS5zZXRRdWVyeUFyZygnd2hlcmUnLCBgQ2F0ZWdvcnkgZXEgXCIke2ludGVncmF0aW9ufVwiYCk7XHJcbiAgICByZXF1ZXN0LnVyaS5zZXRTdGFydEluZGV4KHN0YXJ0SW5kZXgpO1xyXG4gICAgcmVxdWVzdC51cmkuc2V0Q291bnQocGFnZVNpemUpO1xyXG4gICAgcmVxdWVzdC5zZXJ2aWNlLnJlYWRGZWVkKHJlcXVlc3QsIHtcclxuICAgICAgc3VjY2VzczogKGZlZWQpID0+IHtcclxuICAgICAgICBjb25zdCBpbnRlZ3JhdGlvblNldHRpbmdzID0ge307XHJcbiAgICAgICAgZmVlZC4kcmVzb3VyY2VzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGtleSA9IGl0ZW0gJiYgaXRlbS4kZGVzY3JpcHRvcjtcclxuICAgICAgICAgIGxldCB2YWx1ZSA9IGl0ZW0gJiYgaXRlbS5EYXRhVmFsdWU7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICBpbnRlZ3JhdGlvblNldHRpbmdzW2Ake2tleX1gXSA9IHZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5jb250ZXh0LmludGVncmF0aW9uU2V0dGluZ3NbYCR7aW50ZWdyYXRpb259YF0gPSBpbnRlZ3JhdGlvblNldHRpbmdzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBmYWlsdXJlOiAocmVzcG9uc2UsIG8pID0+IHtcclxuICAgICAgICBFcnJvck1hbmFnZXIuYWRkRXJyb3IocmVzcG9uc2UsIG8sICcnLCAnZmFpbHVyZScpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIG5hdmlnYXRlVG9Jbml0aWFsVmlldygpIHtcclxuICAgIHRoaXMuc2hvd0xlZnREcmF3ZXIoKTtcclxuICAgIHRoaXMuc2hvd0hlYWRlcigpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzdG9yZWRTdGF0ZSA9IHRoaXMubmF2aWdhdGlvblN0YXRlO1xyXG4gICAgICBjb25zdCByZXN0b3JlZEhpc3RvcnkgPSByZXN0b3JlZFN0YXRlICYmIEpTT04ucGFyc2UocmVzdG9yZWRTdGF0ZSk7XHJcbiAgICAgIGNvbnN0IGNsZWFuZWRIaXN0b3J5ID0gdGhpcy5jbGVhblJlc3RvcmVkSGlzdG9yeShyZXN0b3JlZEhpc3RvcnkpO1xyXG5cclxuICAgICAgdGhpcy5fY2xlYXJOYXZpZ2F0aW9uU3RhdGUoKTtcclxuXHJcbiAgICAgIGlmIChjbGVhbmVkSGlzdG9yeSkge1xyXG4gICAgICAgIFJlVUkuY29udGV4dC50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcclxuICAgICAgICBSZVVJLmNvbnRleHQuaGlzdG9yeSA9IFJlVUkuY29udGV4dC5oaXN0b3J5LmNvbmNhdChjbGVhbmVkSGlzdG9yeS5zbGljZSgwLCBjbGVhbmVkSGlzdG9yeS5sZW5ndGggLSAxKSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xlYW5lZEhpc3RvcnkubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGNsZWFuZWRIaXN0b3J5W2ldLmhhc2g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZVVJLmNvbnRleHQudHJhbnNpdGlvbmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBsYXN0ID0gY2xlYW5lZEhpc3RvcnlbY2xlYW5lZEhpc3RvcnkubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0VmlldyhsYXN0LnBhZ2UpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBsYXN0LmRhdGEgJiYgbGFzdC5kYXRhLm9wdGlvbnM7XHJcblxyXG4gICAgICAgIHZpZXcuc2hvdyhvcHRpb25zKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm5hdmlnYXRlVG9Ib21lVmlldygpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHRoaXMuX2NsZWFyTmF2aWdhdGlvblN0YXRlKCk7XHJcbiAgICAgIHRoaXMubmF2aWdhdGVUb0hvbWVWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldHVwUmVkaXJlY3RIYXNoKCkge1xyXG4gICAgbGV0IGlzTWluZ2xlUmVmcmVzaCA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuX2hhc1ZhbGlkUmVkaXJlY3QoKSkge1xyXG4gICAgICBpZiAodGhpcy5pc01pbmdsZUVuYWJsZWQoKSkge1xyXG4gICAgICAgIGNvbnN0IHZhcnMgPSB0aGlzLnJlZGlyZWN0SGFzaC5zcGxpdCgnJicpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc3QgcGFpciA9IHZhcnNbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICAgIGlmIChwYWlyWzBdID09PSAnc3RhdGUnKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWlyWzFdID09PSAnbWluZ2xlUmVmcmVzaCcpIHsgLy8gc2hvdyBkZWZhdWx0IHZpZXdcclxuICAgICAgICAgICAgICBpc01pbmdsZVJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMucmVkaXJlY3RIYXNoID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNNaW5nbGVSZWZyZXNoKSB7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0VmlldyhBcHAuZ2V0RGVmYXVsdFZpZXdzKClbMF0pO1xyXG4gICAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgICB2aWV3LnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gU3BsaXQgYnkgXCIvcmVkaXJlY3RUby9cIlxyXG4gICAgICAgIGNvbnN0IHNwbGl0ID0gdGhpcy5yZWRpcmVjdEhhc2guc3BsaXQoL1xcL3JlZGlyZWN0VG9cXC8vZ2kpO1xyXG4gICAgICAgIGlmIChzcGxpdC5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgIHRoaXMucmVkaXJlY3RIYXNoID0gc3BsaXRbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uQ29ubmVjdGlvbkNoYW5nZShvbmxpbmUpIHtcclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLmdldFZpZXcoJ2xlZnRfZHJhd2VyJyk7XHJcbiAgICBpZiAoIXRoaXMuZW5hYmxlT2ZmbGluZVN1cHBvcnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzTWluZ2xlRW5hYmxlZCgpICYmIG9ubGluZSAmJiB0aGlzLnJlcXVpcmVzTWluZ2xlUmVmcmVzaCkge1xyXG4gICAgICBNaW5nbGVVdGlsaXR5LnJlZnJlc2hBY2Nlc3NUb2tlbih0aGlzKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvbmxpbmUpIHtcclxuICAgICAgdGhpcy50b2FzdC5hZGQoeyBtZXNzYWdlOiB0aGlzLm9ubGluZVRleHQsIHRpdGxlOiB0aGlzLmNvbm5lY3Rpb25Ub2FzdFRpdGxlVGV4dCB9KTtcclxuICAgICAgaWYgKHRoaXMuY29udGV4dCAmJiB0aGlzLmNvbnRleHQudXNlcikge1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGVUb0luaXRpYWxWaWV3KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTG9naW5WaWV3KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudG9hc3QuYWRkKHsgbWVzc2FnZTogdGhpcy5vZmZsaW5lVGV4dCwgdGl0bGU6IHRoaXMuY29ubmVjdGlvblRvYXN0VGl0bGVUZXh0IH0pO1xyXG4gICAgICB0aGlzLm5hdmlnYXRlVG9Jbml0aWFsVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0VG9vbEJhck1vZGUob25saW5lKTtcclxuICB9XHJcbiAgbmF2aWdhdGVUb0xvZ2luVmlldygpIHtcclxuICAgIHRoaXMuc2V0dXBSZWRpcmVjdEhhc2goKTtcclxuXHJcbiAgICBjb25zdCB2aWV3ID0gdGhpcy5nZXRWaWV3KHRoaXMubG9naW5WaWV3SWQpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIF9oYXNWYWxpZFJlZGlyZWN0KCkge1xyXG4gICAgY29uc3QgaGFzaFZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHRoaXMucmVkaXJlY3RIYXNoKTtcclxuICAgIHJldHVybiBoYXNoVmFsdWUgIT09ICcnICYmIGhhc2hWYWx1ZS5pbmRleE9mKCcvcmVkaXJlY3RUby8nKSA+IDA7XHJcbiAgfVxyXG4gIHNob3dMZWZ0RHJhd2VyKCkge1xyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0VmlldygnbGVmdF9kcmF3ZXInKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvd1JpZ2h0RHJhd2VyKCkge1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBuYXZpZ2F0ZVRvSG9tZVZpZXcoKSB7XHJcbiAgICB0aGlzLnNldHVwUmVkaXJlY3RIYXNoKCk7XHJcbiAgICB0aGlzLnNob3dMZWZ0RHJhd2VyKCk7XHJcblxyXG5cclxuICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLnByZWZlcmVuY2VzICYmIHRoaXMucHJlZmVyZW5jZXMuaG9tZSAmJiB0aGlzLnByZWZlcmVuY2VzLmhvbWUudmlzaWJsZTtcclxuICAgIGlmICh2aXNpYmxlICYmIHZpc2libGUubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLmhvbWVWaWV3SWQgPSB2aXNpYmxlWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZmF1bHQgdmlldyB3aWxsIGJlIHRoZSBob21lIHZpZXcsIG92ZXJ3cml0dGVuIGJlbG93IGlmIGEgcmVkaXJlY3QgaGFzaCBpcyBzdXBwbGllZFxyXG4gICAgbGV0IHZpZXcgPSB0aGlzLmdldFZpZXcodGhpcy5ob21lVmlld0lkKTtcclxuXHJcbiAgICBpZiAodGhpcy5yZWRpcmVjdEhhc2gpIHtcclxuICAgICAgbGV0IHNwbGl0ID0gdGhpcy5yZWRpcmVjdEhhc2guc3BsaXQoJzsnKTtcclxuICAgICAgaWYgKHNwbGl0Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHNwbGl0ID0gdGhpcy5yZWRpcmVjdEhhc2guc3BsaXQoJzonKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc3BsaXQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IFt2aWV3SWQsIGtleV0gPSBzcGxpdDtcclxuICAgICAgICBjb25zdCByZWRpcmVjdFZpZXcgPSB0aGlzLmdldFZpZXcodmlld0lkKTtcclxuICAgICAgICBpZiAocmVkaXJlY3RWaWV3KSB7XHJcbiAgICAgICAgICBpZiAoIXJlZGlyZWN0Vmlldy5jYW5SZWRpcmVjdFRvKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSB1c2VyIHdpbGwgZ28gdG8gdGhlIGRlZmF1bHQgdmlldyBpbnN0ZWFkXHJcbiAgICAgICAgICAgIHZpZXcgPSB0aGlzLmdldFZpZXcodGhpcy5ob21lVmlld0lkKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZXcgPSByZWRpcmVjdFZpZXc7XHJcbiAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICByZWRpcmVjdFZpZXcuc2hvdyh7XHJcbiAgICAgICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZWRpcmVjdEhhc2ggPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuaXNPbmxpbmUoKSkge1xyXG4gICAgICB2aWV3ID0gdGhpcy5nZXRWaWV3KHRoaXMub2ZmbGluZUhvbWVWaWV3SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdygpO1xyXG4gICAgfVxyXG4gIH1cclxuICBuYXZpZ2F0ZVRvQWN0aXZpdHlJbnNlcnRWaWV3KCkge1xyXG4gICAgY29uc3QgdmlldyA9IHRoaXMuZ2V0VmlldygnYWN0aXZpdHlfdHlwZXNfbGlzdCcpO1xyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGluaXRpYXRlQ2FsbCgpIHtcclxuICAgIC8vIHNob3J0Y3V0IGZvciBlbnZpcm9ubWVudCBjYWxsXHJcbiAgICBlbnZpcm9ubWVudC5pbml0aWF0ZUNhbGwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9XHJcbiAgaW5pdGlhdGVFbWFpbCgpIHtcclxuICAgIC8vIHNob3J0Y3V0IGZvciBlbnZpcm9ubWVudCBjYWxsXHJcbiAgICBlbnZpcm9ubWVudC5pbml0aWF0ZUVtYWlsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfVxyXG4gIHNob3dNYXBGb3JBZGRyZXNzKCkge1xyXG4gICAgLy8gc2hvcnRjdXQgZm9yIGVudmlyb25tZW50IGNhbGxcclxuICAgIGVudmlyb25tZW50LnNob3dNYXBGb3JBZGRyZXNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfVxyXG4gIGdldFZlcnNpb25JbmZvKCkge1xyXG4gICAgY29uc3QgaW5mbyA9IHN0cmluZy5zdWJzdGl0dXRlKHRoaXMudmVyc2lvbkluZm9UZXh0LCBbXHJcbiAgICAgIHRoaXMubW9iaWxlVmVyc2lvbi5tYWpvcixcclxuICAgICAgdGhpcy5tb2JpbGVWZXJzaW9uLm1pbm9yLFxyXG4gICAgICB0aGlzLm1vYmlsZVZlcnNpb24ucmV2aXNpb24sXHJcbiAgICAgIHRoaXMuc2VydmVyVmVyc2lvbi5tYWpvcixcclxuICAgIF0pO1xyXG4gICAgcmV0dXJuIGluZm87XHJcbiAgfVxyXG4gIGluaXRPZmZsaW5lRGF0YSgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoTU9ERUxfTkFNRVMuQVVUSEVOVElDQVRJT04sIE1PREVMX1RZUEVTLk9GRkxJTkUpO1xyXG4gICAgICBpZiAobW9kZWwpIHtcclxuICAgICAgICBjb25zdCBpbmRpY2F0b3IgPSBuZXcgQnVzeUluZGljYXRvcih7XHJcbiAgICAgICAgICBpZDogJ2J1c3lJbmRpY2F0b3JfX29mZmxpbmVEYXRhJyxcclxuICAgICAgICAgIGxhYmVsOiByZXNvdXJjZS5vZmZsaW5lSW5pdERhdGFUZXh0LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubW9kYWwuZGlzYWJsZUNsb3NlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1vZGFsLnNob3dUb29sYmFyID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5hZGQoaW5kaWNhdG9yKTtcclxuICAgICAgICBpbmRpY2F0b3Iuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgbW9kZWwuaW5pdEF1dGhlbnRpY2F0aW9uKHRoaXMuY29udGV4dC51c2VyLiRrZXkpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3VsdC5oYXNVc2VyQ2hhbmdlZCB8fCAoIXJlc3VsdC5oYXNBdXRoZW50aWNhdGVkVG9kYXkpKSB7XHJcbiAgICAgICAgICAgIG9mZmxpbmVNYW5hZ2VyLmNsZWFyQWxsRGF0YSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIG1vZGVsLnVwZGF0ZUVudHJ5KHJlc3VsdC5lbnRyeSk7XHJcbiAgICAgICAgICAgICAgaW5kaWNhdG9yLmNvbXBsZXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMubW9kYWwuZGlzYWJsZUNsb3NlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5tb2RhbC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgaW5kaWNhdG9yLmNvbXBsZXRlKHRydWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMubW9kYWwuZGlzYWJsZUNsb3NlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5tb2RhbC5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LmVudHJ5Lk1vZGlmeURhdGUgPSBtb21lbnQoKS50b0RhdGUoKTtcclxuICAgICAgICAgICAgbW9kZWwudXBkYXRlRW50cnkocmVzdWx0LmVudHJ5KTtcclxuICAgICAgICAgICAgaW5kaWNhdG9yLmNvbXBsZXRlKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGFsLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGFsLmhpZGUoKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpOyAvLyBEbyBub3RoaW5nIHNpbmNlIHRoaXMgbm90IHRoZSBmaXJzdCB0aW1lIGF0aHVlbnRpY2F0aW5nLlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvbjtcclxuIl19