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
   * @alias module:crm/Application
   * @extends module:argos/Application
   */

  var Application = function (_SDKApplication) {
    _inherits(Application, _SDKApplication);

    function Application() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        connections: null,
        defaultLocale: 'en',
        enableMultiCurrency: false,
        multiCurrency: false, // Backwards compatibility
        enableGroups: true,
        enableHashTags: true,
        maxUploadFileSize: 40000000,
        enableConcurrencyCheck: false,
        enableOfflineSupport: false,
        enableServiceWorker: false,
        enableRememberMe: true,
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
        minor: 3,
        revision: 0
      };
      _this.versionInfoText = resource.versionInfoText;
      _this.loadingText = resource.loadingText;
      _this.authText = resource.authText;
      _this.connectionToastTitleText = resource.connectionToastTitleText;
      _this.offlineText = resource.offlineText;
      _this.onlineText = resource.onlineText;
      _this.mingleAuthErrorText = resource.mingleAuthErrorText;
      _this.fileCacheText = resource.fileCacheText;
      _this.fileCacheTitle = resource.fileCacheTitle;
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
      key: 'initServiceWorker',
      value: function initServiceWorker() {
        if (this.isServiceWorkerEnabled()) {
          _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'initServiceWorker', this).call(this);
        }
      }
    }, {
      key: 'isServiceWorkerEnabled',
      value: function isServiceWorkerEnabled() {
        try {
          return (this.enableOfflineSupport || this.enableServiceWorker) && 'serviceWorker' in navigator;
        } catch (err) {
          _ErrorManager2.default.addSimpleError('Error in isServiceWorkerEnabled()', err);
          this.showServiceWorkerError();
        }
      }
    }, {
      key: 'registerCacheUrl',
      value: function registerCacheUrl(url) {
        if (this.isServiceWorkerEnabled()) {
          return this.sendServiceWorkerMessage({ command: 'add', url: url });
        }

        return Promise.resolve(true);
      }
    }, {
      key: 'registerCacheUrls',
      value: function registerCacheUrls(urls) {
        var _this2 = this;

        if (this.isServiceWorkerEnabled()) {
          return this.sendServiceWorkerMessage({ command: 'addall', urls: urls }).then(function (data) {
            if (data.results === 'added' || data.results === 'skipped') {
              _this2.toast.add({ message: _this2.fileCacheText, title: _this2.fileCacheTitle, toastTime: 20000 });
            }

            return data;
          });
        }

        return Promise.resolve(true);
      }
    }, {
      key: 'clearServiceWorkerCaches',
      value: function clearServiceWorkerCaches() {
        if (this.isServiceWorkerEnabled()) {
          return caches.keys().then(function (keys) {
            return Promise.all(keys.map(function (key) {
              return caches.delete(key);
            }));
          });
        }

        return Promise.resolve(true);
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
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'destroy', this).call(this);
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
      key: '_notifyUpdateAvailable',
      value: function _notifyUpdateAvailable() {
        // TODO: Part of cache manifest, remove or rework for service worker?
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
          if (this.isMingleEnabled()) {
            this.handleMingleAuthentication();
          } else {
            this.handleAuthentication();
          }
        } else {
          // todo: always navigate to home when offline? data may not be available for restored state.
          this.navigateToHomeView();
        }
      }
    }, {
      key: 'onAuthenticateUserSuccess',
      value: function onAuthenticateUserSuccess(credentials, callback, scope, result) {
        var _this3 = this;

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
            _this3.context.userSecurity[item] = true;
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
                password: credentials.password || ''
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
        window.location.hash = '';
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
        var _this4 = this;

        this.isAuthenticated = true;
        this.setPrimaryTitle(this.loadingText);
        this.showHeader();
        this.initAppState().then(function () {
          _this4.onInitAppStateSuccess();
        }, function (err) {
          _this4.hideHeader();
          _this4.onInitAppStateFailed(err);
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
        var _this5 = this;

        this.setDefaultMetricPreferences();
        this.showApplicationMenuOnLarge();
        if (this.enableOfflineSupport) {
          this.initOfflineData().then(function () {
            _this5.hasState = true;
            _this5.navigateToInitialView();
          }, function (error) {
            _this5.hasState = true;
            _this5.enableOfflineSupport = false;
            var message = resource.offlineInitErrorText;
            _ErrorManager2.default.addSimpleError(message, error);
            _ErrorManager2.default.showErrorDialog(null, message, function () {
              _this5.navigateToInitialView();
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
        var _this6 = this;

        console.error(error); // eslint-disable-line
        var message = resource.appStateInitErrorText;
        this.hideApplicationMenu();
        _ErrorManager2.default.addSimpleError(message, error);
        _ErrorManager2.default.showErrorDialog(null, message, function () {
          _this6._clearNavigationState();
          _this6.removeCredentials();
          _this6.navigateToLoginView();
        });
      }
    }, {
      key: 'onStateChange',
      value: function onStateChange(state) {
        _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'onStateChange', this).call(this, state);
        if (!state || state === this.previousState) {
          return;
        }
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
        var _this7 = this;

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
            scope: _this7
          });
        });
      }
    }, {
      key: 'requestUserOptions',
      value: function requestUserOptions() {
        var _this8 = this;

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
            scope: _this8
          });
        });
      }
    }, {
      key: 'loadCustomizedMoment',
      value: function loadCustomizedMoment() {
        var custom = this.buildCustomizedMoment();
        var currentLang = moment.locale();

        moment.updateLocale(currentLang, custom);
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
        var _this10 = this;

        var request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService()).setContractName('system').setResourceKind('systemoptions').setQueryArg('select', 'name,value');

        return new Promise(function (resolve, reject) {
          request.read({
            success: function succes(feed) {
              var _this9 = this;

              var systemOptions = this.context.systemOptions = this.context.systemOptions || {};

              feed.$resources.forEach(function (item) {
                var name = item.name,
                    value = item.value;

                if (value && name && _this9.systemOptionsToRequest.indexOf(name) > -1) {
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
            scope: _this10
          });
        });
      }
    }, {
      key: 'requestExchangeRates',
      value: function requestExchangeRates() {
        var _this11 = this;

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
            scope: _this11
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
        var _this12 = this;

        return Object.keys(this.views).filter(function (id) {
          var view = _this12.getViewDetailOnly(id);
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
        var _this13 = this;

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
              _this13.context.integrationSettings['' + integration] = integrationSettings;
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
        var _this14 = this;

        return new Promise(function (resolve, reject) {
          var model = _this14.ModelManager.getModel(_Names2.default.AUTHENTICATION, _Types2.default.OFFLINE);
          if (model) {
            var indicator = new _BusyIndicator2.default({
              id: 'busyIndicator__offlineData',
              label: resource.offlineInitDataText
            });
            _this14.modal.disableClose = true;
            _this14.modal.showToolbar = false;
            _this14.modal.add(indicator);
            indicator.start();

            model.initAuthentication(_this14.context.user.$key).then(function (result) {
              if (result.hasUserChanged || !result.hasAuthenticatedToday) {
                _Manager2.default.clearAllData().then(function () {
                  model.updateEntry(result.entry);
                  indicator.complete(true);
                  _this14.modal.disableClose = false;
                  _this14.modal.hide();
                  resolve();
                }, function (err) {
                  indicator.complete(true);
                  _this14.modal.disableClose = false;
                  _this14.modal.hide();
                  reject(err);
                });
              } else {
                result.entry.ModifyDate = moment().toDate();
                model.updateEntry(result.entry);
                indicator.complete(true);
                _this14.modal.disableClose = false;
                _this14.modal.hide();
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