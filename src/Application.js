import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import connect from 'dojo/_base/connect';
import json from 'dojo/json';
import lang from 'dojo/_base/lang';
import has from 'dojo/has';
import string from 'dojo/string';
import Deferred from 'dojo/Deferred';
import DefaultMetrics from './DefaultMetrics';
import ErrorManager from 'argos/ErrorManager';
import environment from './Environment';
import Application from 'argos/Application';
import offlineManager from 'argos/Offline/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from './Models/Names';
import BusyIndicator from 'argos/Dialogs/BusyIndicator';
import getResource from 'argos/I18n';
import 'dojo/sniff';
import MingleUtility from './MingleUtility';

const resource = getResource('application');

/**
 * @class crm.Application
 *
 * @extends argos.Application
 * @requires argos.ErrorManager
 * @requires crm.Environment
 * @requires moment
 *
 */
const __class = declare('crm.Application', [Application], {
  navigationState: null,
  rememberNavigationState: true,
  enableUpdateNotification: false,
  multiCurrency: false,
  enableGroups: true,
  enableHashTags: true,
  enableOfflineSupport: false,
  speedSearch: {
    includeStemming: true,
    includePhonic: true,
    includeThesaurus: false,
    useFrequentFilter: false,
    searchType: 1,
  },
  enableCaching: true,
  userDetailsQuerySelect: ['UserName', 'UserInfo/UserName', 'UserInfo/FirstName', 'UserInfo/LastName', 'DefaultOwner/OwnerDescription'],
  userOptionsToRequest: [
    'category=DefaultGroup;name=ACCOUNT',
    'category=DefaultGroup;name=CONTACT',
    'category=DefaultGroup;name=OPPORTUNITY',
    'category=DefaultGroup;name=LEAD',
    'category=DefaultGroup;name=TICKET',
    'category=DefaultGroup;name=SALESORDER',
    'category=DefaultGroup;name=QUOTE',
    'category=General;name=InsertSecCodeID',
    'category=General;name=Currency',
    'category=Calendar;name=DayStartTime',
    'category=Calendar;name=WeekStart',
    'category=ActivityMeetingOptions;name=AlarmEnabled',
    'category=ActivityMeetingOptions;name=AlarmLead',
    'category=ActivityMeetingOptions;name=Duration',
    'category=ActivityPhoneOptions;name=AlarmEnabled',
    'category=ActivityPhoneOptions;name=AlarmLead',
    'category=ActivityPhoneOptions;name=Duration',
    'category=ActivityToDoOptions;name=AlarmEnabled',
    'category=ActivityToDoOptions;name=AlarmLead',
    'category=ActivityToDoOptions;name=Duration',
    'category=ActivityPersonalOptions;name=AlarmEnabled',
    'category=ActivityPersonalOptions;name=AlarmLead',
    'category=ActivityPersonalOptions;name=Duration',
  ],
  systemOptionsToRequest: [
    'BaseCurrency',
    'MultiCurrency',
    'ChangeOpportunityRate',
    'LockOpportunityRate',
  ],
  appName: 'argos-saleslogix',
  serverVersion: {
    major: 8,
    minor: 0,
    revision: 0,
  },
  mobileVersion: {
    major: 3,
    minor: 6,
    revision: 1,
  },
  versionInfoText: resource.versionInfoText,
  loadingText: resource.loadingText,
  authText: resource.authText,
  connectionToastTitleText: resource.connectionToastTitleText,
  offlineText: resource.offlineText,
  onlineText: resource.onlineText,
  mingleAuthErrorText: resource.mingleAuthErrorText,
  homeViewId: 'myactivity_list',
  offlineHomeViewId: 'recently_viewed_list_offline',
  loginViewId: 'login',
  logOffViewId: 'logoff',

  UID: null,
  init: function init() {
    if (has('ie') && has('ie') < 9) {
      window.location.href = 'unsupported.html';
    }

    this.inherited(arguments);
    this._loadNavigationState();

    let accessToken = null;
    if (this.mingleEnabled) {
      accessToken = this.mingleAuthResults.access_token;
    }

    this.UID = (new Date()).getTime();
    const original = Sage.SData.Client.SDataService.prototype.executeRequest;
    const self = this;
    Sage.SData.Client.SDataService.prototype.executeRequest = function executeRequest(request) {
      if (accessToken) {
        request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        request.setRequestHeader('X-Authorization', `Bearer ${accessToken}`);
      }

      request.setRequestHeader('X-Application-Name', self.appName);
      request.setRequestHeader('X-Application-Version', string.substitute('${version.major}.${version.minor}.${version.revision};${id}', {
        version: self.mobileVersion,
        id: self.UID,
      }));
      return original.apply(this, arguments);
    };
  },
  initConnects: function initConnects() {
    this.inherited(arguments);

    if (window.applicationCache) {
      this._connects.push(connect.connect(window.applicationCache, 'updateready', this, this._checkForUpdate));
    }
  },
  isOnFirstView: function isOnFirstView() {
    const history = ReUI.context.history;
    const length = history.length;
    const current = history[length - 1];
    const previous = history[length - 2];
    let isFirstView = false;

    if ((current && current.page === this.loginViewId) || (current && current.page === this.logOffViewId)) {
      isFirstView = true;
    } else if (previous && previous.page === this.loginViewId) {
      isFirstView = true;
    } else if (length === 1) {
      isFirstView = true;
    }

    return isFirstView;
  },
  onSetOrientation: function onSetOrientation() {
    if (this.snapper) {
      this.snapper.close();
    }
  },
  _viewTransitionTo: function _viewTransitionTo() {
    this.inherited(arguments);
    this._checkSaveNavigationState();
    if (this.snapper) {
      this.snapper.close();
    }
  },
  _checkSaveNavigationState: function _checkSaveNavigationState() {
    if (this.rememberNavigationState !== false) {
      this._saveNavigationState();
    }
  },
  _checkForUpdate: function _checkForUpdate() {
    const applicationCache = window.applicationCache;
    if (applicationCache && this.enableUpdateNotification) {
      if (applicationCache.status === applicationCache.UPDATEREADY) {
        this._notifyUpdateAvailable();
      }
    }
  },
  _notifyUpdateAvailable: function _notifyUpdateAvailable() {
    if (this.bars.updatebar) {
      this.bars.updatebar.show();
    }
  },
  _saveNavigationState: function _saveNavigationState() {
    try {
      if (window.localStorage) {
        window.localStorage.setItem('navigationState', json.stringify(ReUI.context.history));
      }
    } catch (e) {} // eslint-disable-line
  },
  hasMultiCurrency: function hasMultiCurrency() {
    // Check if the configuration specified multiCurrency, this will override the dynamic check.
    // A configuration is not ideal, and we should refactor the edit view to process the layout when it first recieves its data,
    // instead of on startup. We cannot check App.context data that was loaded after login when the startup method is used.
    if (this.multiCurrency) {
      return true;
    }

    return false;
  },
  canLockOpportunityRate: function canLockOpportunityRate() {
    if (this.context &&
      this.context.systemOptions &&
      this.context.systemOptions.LockOpportunityRate === 'True') {
      return true;
    }

    return false;
  },
  canChangeOpportunityRate: function canChangeOpportunityRate() {
    if (this.context &&
      this.context.systemOptions &&
      this.context.systemOptions.ChangeOpportunityRate === 'True') {
      return true;
    }

    return false;
  },
  getMyExchangeRate: function getMyExchangeRate() {
    const results = {
      code: '',
      rate: 1,
    };

    if (this.hasMultiCurrency() &&
      this.context &&
      this.context.exchangeRates &&
      this.context.userOptions &&
      this.context.userOptions['General:Currency']) {
      const myCode = this.context.userOptions['General:Currency'];
      const myRate = this.context.exchangeRates[myCode];
      lang.mixin(results, {
        code: myCode,
        rate: myRate,
      });
    }

    return results;
  },
  getBaseExchangeRate: function getBaseExchangeRate() {
    const results = {
      code: '',
      rate: 1,
    };

    if (this.hasMultiCurrency() &&
      this.context &&
      this.context.exchangeRates &&
      this.context.systemOptions &&
      this.context.systemOptions.BaseCurrency) {
      const baseCode = this.context.systemOptions.BaseCurrency;
      const baseRate = this.context.exchangeRates[baseCode];
      lang.mixin(results, {
        code: baseCode,
        rate: baseRate,
      });
    }

    return results;
  },
  getCurrentOpportunityExchangeRate: function getCurrentOpportunityExchangeRate() {
    const results = {
      code: '',
      rate: 1,
    };

    let found = this.queryNavigationContext((o) => {
      return (/^(opportunities)$/).test(o.resourceKind) && o.key;
    });

    found = found && found.options;

    if (found) {
      const rate = found.ExchangeRate;
      const code = found.ExchangeRateCode;
      lang.mixin(results, {
        code,
        rate,
      });
    }

    return results;
  },
  run: function run() {
    this.inherited(arguments);

    if (this.isOnline() || !this.enableCaching) {
      if (App.mingleEnabled) {
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
  },
  onAuthenticateUserSuccess: function onAuthenticateUserSuccess(credentials, callback, scope, result) {
    const user = {
      $key: lang.trim(result.response.userId),
      $descriptor: result.response.prettyName,
      UserName: result.response.userName,
    };

    this.context.user = user;
    this.context.roles = result.response.roles;
    this.context.securedActions = result.response.securedActions;

    if (this.context.securedActions) {
      this.context.userSecurity = {};
      array.forEach(this.context.securedActions, (item) => {
        this.context.userSecurity[item] = true;
      });
    } else {
      // downgrade server version as only 8.0 has `securedActions` as part of the
      // `getCurrentUser` response.
      this.serverVersion = {
        major: 7,
        minor: 5,
        revision: 4,
      };
    }

    if (!App.mingleEnabled && credentials.remember) {
      try {
        if (window.localStorage) {
          window.localStorage.setItem('credentials', Base64.encode(json.stringify({
            username: credentials.username,
            password: credentials.password || '',
          })));
        }
      } catch (e) {} //eslint-disable-line
    }

    if (callback) {
      callback.call(scope || this, {
        user,
      });
    }
  },
  onAuthenticateUserFailure: function onAuthenticateUserFailure(callback, scope, response) {
    const service = this.getService();
    if (service) {
      service
        .setUserName(false)
        .setPassword(false);
    }

    if (callback) {
      callback.call(scope || this, {
        response,
      });
    }
  },
  authenticateUser: function authenticateUser(credentials, options) {
    const service = this.getService();
    if (credentials) {
      service.setUserName(credentials.username)
                 .setPassword(credentials.password || '');
    }

    const request = new Sage.SData.Client.SDataServiceOperationRequest(service)
      .setContractName('system')
      .setOperationName('getCurrentUser');

    request.execute({}, {
      success: lang.hitch(this, this.onAuthenticateUserSuccess, credentials, options.success, options.scope), // this.onAuthenticateUserSuccess.createDelegate(this, [credentials, options.success, options.scope], true),
      failure: lang.hitch(this, this.onAuthenticateUserFailure, options.failure, options.scope), // this.onAuthenticateUserFailure.createDelegate(this, [options.failure, options.scope], true),
      aborted: lang.hitch(this, this.onAuthenticateUserFailure, options.failure, options.scope), // this.onAuthenticateUserFailure.createDelegate(this, [options.aborted, options.scope], true)
    });
  },
  hasAccessTo: function hasAccessTo(security) {
    if (!security) {
      return true;
    }

    const user = this.context.user;
    const userId = user && user.$key;
    const userSecurity = this.context.userSecurity;

    if (/^ADMIN\s*/i.test(userId)) {
      return true;
    }

    if (typeof userSecurity === 'undefined') {
      return true; // running against a pre 8.0 SalesLogix environment
    }

    return !!userSecurity[security];
  },
  reload: function reload() {
    this.ReUI.disableLocationCheck();
    this.hash('');
    window.location.reload();
  },
  resetModuleAppStatePromises: function resetModuleAppStatePromises() {
    this.clearAppStatePromises();
    for (let i = 0; i < this.modules.length; i++) {
      this.modules[i].loadAppStatePromises(this);
    }
  },
  logOut: function logOut() {
    this.removeCredentials();
    this._clearNavigationState();

    const service = this.getService();
    this.isAuthenticated = false;
    this.context = {};

    this.resetModuleAppStatePromises();

    if (service) {
      service
        .setUserName(false)
        .setPassword(false);
    }

    const view = this.getView(this.logOffViewId);

    if (view) {
      view.show();
    }
  },
  getCredentials: function getCredentials() {
    let credentials = null;
    try {
      if (window.localStorage) {
        const stored = window.localStorage.getItem('credentials');
        const encoded = stored && Base64.decode(stored);
        credentials = encoded && json.parse(encoded);
      }
    } catch (e) {} //eslint-disable-line

    return credentials;
  },
  removeCredentials: function removeCredentials() {
    try {
      if (window.localStorage) {
        window.localStorage.removeItem('credentials');
      }
    } catch (e) {} //eslint-disable-line
  },
  isAuthenticated: false,
  hasState: false,
  handleAuthentication: function handleAuthentication() {
    const credentials = this.getCredentials();

    if (credentials) {
      this.setPrimaryTitle(this.authText);
      this.authenticateUser(credentials, {
        success: this.onHandleAuthenticationSuccess,
        failure: this.onHandleAuthenticationFailed,
        aborted: this.onHandleAuthenticationAborted,
        scope: this,
      });
    } else {
      this.navigateToLoginView();
    }
  },
  handleMingleAuthentication: function handleMingleAuthentication() {
    if (this.mingleAuthResults && this.mingleAuthResults.error === 'access_denied') {
      this.setPrimaryTitle(this.mingleAuthErrorText);
    } else {
      this.setPrimaryTitle(this.authText);
      this.authenticateUser(null, {
        success: this.onHandleAuthenticationSuccess,
        failure: this.onMingleHandleAuthenticationFailed,
        aborted: this.onHandleAuthenticationAborted,
        scope: this,
      });
    }
  },
  onHandleAuthenticationSuccess: function onHandleAuthenticationSuccess() {
    this.isAuthenticated = true;
    this.setPrimaryTitle(this.loadingText);
    this.initAppState().then(() => {
      this.onInitAppStateSuccess();
    }, (err) => {
      this.onInitAppStateFailed(err);
    });
  },
  onHandleAuthenticationFailed: function onHandleAuthenticationFailed() {
    this.removeCredentials();
    this.navigateToLoginView();
  },
  onMingleHandleAuthenticationFailed: function onMingleHandleAuthenticationFailed() {
    this.removeCredentials();
    this.setPrimaryTitle(this.mingleAuthErrorText);
  },
  onHandleAuthenticationAborted: function onHandleAuthenticationAborted() {
    this.navigateToLoginView();
  },
  onInitAppStateSuccess: function onInitAppStateSuccess() {
    this._saveDefaultPreferences();
    this.setDefaultMetricPreferences();
    if (this.enableOfflineSupport) {
      this.initOfflineData().then(() => {
        this.hasState = true;
        this.navigateToInitialView();
      }, (error) => {
        this.hasState = true;
        this.enableOfflineSupport = false;
        const message = resource.offlineInitErrorText;
        ErrorManager.addSimpleError(message, error);
        ErrorManager.showErrorDialog(null, message, () => {
          this.navigateToInitialView();
        });
      });
    } else {
      this.hasState = true;
      this.navigateToInitialView();
    }
  },
  onInitAppStateFailed: function onInitAppStateFailed(error) {
    const message = resource.appStateInitErrorText;
    ErrorManager.addSimpleError(message, error);
    ErrorManager.showErrorDialog(null, message, () => {
      this._clearNavigationState();
      this.removeCredentials();
      this.navigateToLoginView();
    });
  },
  _clearNavigationState: function _clearNavigationState() {
    try {
      this.initialNavigationState = null;

      if (window.localStorage) {
        window.localStorage.removeItem('navigationState');
      }
    } catch (e) {} //eslint-disable-line
  },
  _loadNavigationState: function _loadNavigationState() {
    try {
      if (window.localStorage) {
        this.navigationState = window.localStorage.getItem('navigationState');
      }
    } catch (e) {} // eslint-disable-line
  },
  _saveDefaultPreferences: function _saveDefaultPreferences() {
    if (this.preferences) {
      return;
    }

    const views = this.getDefaultViews();

    this.preferences = {
      home: {
        visible: views,
      },
      configure: {
        order: views.slice(0),
      },
    };
  },
  getMetricsByResourceKind: function getMetricsByResourceKind(resourceKind) {
    let results = [];
    let prefs = this.preferences && this.preferences.metrics && this.preferences.metrics;

    if (prefs) {
      prefs = array.filter(prefs, (item) => {
        return item.resourceKind === resourceKind;
      });

      if (prefs.length === 1) {
        results = prefs[0].children;
      }
    }

    return results;
  },
  setDefaultMetricPreferences: function setDefaultMetricPreferences() {
    if (!this.preferences.metrics) {
      const defaults = new DefaultMetrics();
      this.preferences.metrics = defaults.getDefinitions();
      this.persistPreferences();
    }
  },
  requestUserDetails: function requestUserDetails() {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
      .setResourceKind('users')
      .setResourceSelector(string.substitute('"${0}"', [this.context.user.$key]))
      .setQueryArg('select', this.userDetailsQuerySelect.join(','));

    const def = new Deferred();

    request.read({
      success: function success(entry) {
        this.context.user = entry;
        this.context.defaultOwner = entry && entry.DefaultOwner;
        def.resolve(entry);
      },
      failure: function failure() {
        def.reject();
      },
      scope: this,
    });

    return def.promise;
  },
  requestUserOptions: function requestUserOptions() {
    const batch = new Sage.SData.Client.SDataBatchRequest(this.getService())
      .setContractName('system')
      .setResourceKind('useroptions')
      .setQueryArg('select', 'name,value,defaultValue')
      .using(function using() {
        const service = this.getService();
        array.forEach(this.userOptionsToRequest, function forEach(item) {
          new Sage.SData.Client.SDataSingleResourceRequest(this)
            .setContractName('system')
            .setResourceKind('useroptions')
            .setResourceKey(item)
            .read();
        }, service);
      }, this);

    const def = new Deferred();
    batch.commit({
      success: function success(feed) {
        const userOptions = this.context.userOptions = this.context.userOptions || {};

        array.forEach(feed && feed.$resources, (item) => {
          const key = item && item.$descriptor;
          let { value } = item;
          const { defaultValue } = item;

          if (typeof value === 'undefined' || value === null) {
            value = defaultValue;
          }

          if (key) {
            userOptions[key] = value;
          }
        });

        const insertSecCode = userOptions['General:InsertSecCodeID'];
        const currentDefaultOwner = this.context.defaultOwner && this.context.defaultOwner.$key;

        if (insertSecCode && (!currentDefaultOwner || (currentDefaultOwner !== insertSecCode))) {
          this.requestOwnerDescription(insertSecCode);
        }

        this.loadCustomizedMoment();
        def.resolve(feed);
      },
      failure: function failure(response, o) {
        def.reject();
        ErrorManager.addError(response, o, {}, 'failure');
      },
      scope: this,
    });

    return def.promise;
  },
  /*
   * Loads a custom object to pass into the current moment language. The object for the language gets built in buildCustomizedMoment.
   */
  loadCustomizedMoment: function loadCustomizedMoment() {
    const custom = this.buildCustomizedMoment();
    const currentLang = moment.locale();

    moment.locale(currentLang, custom);
    this.moment = moment().locale(currentLang, custom);
  },
  /*
   * Builds an object that will get passed into moment.locale()
   */
  buildCustomizedMoment: function buildCustomizedMoment() {
    if (!this.context.userOptions) {
      return null;
    }

    const userWeekStartDay = parseInt(this.context.userOptions['Calendar:WeekStart'], 10);
    let results = {}; // 0-6, Sun-Sat

    if (!isNaN(userWeekStartDay)) {
      results = {
        week: {
          dow: userWeekStartDay,
        },
      };
    }

    return results;
  },
  requestSystemOptions: function requestSystemOptions() {
    const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
      .setContractName('system')
      .setResourceKind('systemoptions')
      .setQueryArg('select', 'name,value');

    const def = new Deferred();
    request.read({
      success: function succes(feed) {
        const systemOptions = this.context.systemOptions = this.context.systemOptions || {};

        array.forEach(feed && feed.$resources, (item) => {
          const { name, value } = item;
          if (value && name && array.indexOf(this.systemOptionsToRequest, name) > -1) {
            systemOptions[name] = value;
          }
        }, this);

        const multiCurrency = systemOptions.MultiCurrency;

        if (multiCurrency && multiCurrency === 'True') {
          this.requestExchangeRates().then(() => {
            def.resolve(feed);
          }, () => {
            def.reject();
          });
        } else {
          def.resolve(feed);
        }
      },
      failure: function failure(response, o) {
        ErrorManager.addError(response, o, {}, 'failure');
        def.reject();
      },
      scope: this,
    });

    return def.promise;
  },
  requestExchangeRates: function requestExchangeRates() {
    const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
      .setContractName('dynamic')
      .setResourceKind('exchangeRates')
      .setQueryArg('select', 'Rate');

    const def = new Deferred();
    request.read({
      success: function success(feed) {
        const exchangeRates = this.context.exchangeRates = this.context.exchangeRates || {};

        array.forEach(feed && feed.$resources, (item) => {
          const key = item && item.$descriptor;
          const value = item && item.Rate;

          if (value && key) {
            exchangeRates[key] = value;
          }
        });

        def.resolve(feed);
      },
      failure: function failure(response, o) {
        def.reject();
        ErrorManager.addError(response, o, {}, 'failure');
      },
      scope: this,
    });

    return def.promise;
  },
  requestOwnerDescription: function requestOwnerDescription(key) {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
      .setResourceKind('owners')
      .setResourceSelector(string.substitute('"${0}"', [key]))
      .setQueryArg('select', 'OwnerDescription');

    request.read({
      success: this.onRequestOwnerDescriptionSuccess,
      failure: this.onRequestOwnerDescriptionFailure,
      scope: this,
    });
  },
  onRequestOwnerDescriptionSuccess: function onRequestOwnerDescriptionSuccess(entry) {
    if (entry) {
      this.context.defaultOwner = entry;
    }
  },
  onRequestOwnerDescriptionFailure: function onRequestOwnerDescriptionFailure(response, o) {
    ErrorManager.addError(response, o, {}, 'failure');
  },
  defaultViews: [
    'myday_list',
    'calendar_view',
    'history_list',
    'account_list',
    'contact_list',
    'lead_list',
    'opportunity_list',
    'ticket_list',
    'myattachment_list',
    'recently_viewed_list',
    'briefcase_list',
  ],
  getDefaultViews: function getDefaultViews() {
    return this.defaultViews;
  },
  getExposedViews: function getExposedViews() {
    return Object.keys(this.views).filter((id) => {
      const view = this.getView(id);
      return view && view.id !== 'home' && view.expose;
    });
  },
  cleanRestoredHistory: function cleanRestoredHistory(restoredHistory) {
    let result = [];
    let hasRoot = false;

    for (let i = restoredHistory.length - 1; i >= 0 && !hasRoot; i--) {
      if (restoredHistory[i].data.options && restoredHistory[i].data.options.negateHistory) {
        result = [];
        continue;
      }

      if (this.hasView(restoredHistory[i].page)) {
        result.unshift(restoredHistory[i]);
      }

      hasRoot = (restoredHistory[i].page === 'home');
    }

    return hasRoot && result;
  },
  navigateToInitialView: function navigateToInitialView() {
    this.loadSnapper();

    try {
      const restoredState = this.navigationState;
      const restoredHistory = restoredState && json.parse(restoredState);
      const cleanedHistory = this.cleanRestoredHistory(restoredHistory);

      this._clearNavigationState();

      if (cleanedHistory) {
        ReUI.context.transitioning = true;
        ReUI.context.history = ReUI.context.history.concat(cleanedHistory.slice(0, cleanedHistory.length - 1));

        for (let i = 0; i < cleanedHistory.length - 1; i++) {
          window.location.hash = cleanedHistory[i].hash;
        }

        ReUI.context.transitioning = false;

        const last = cleanedHistory[cleanedHistory.length - 1];
        const view = this.getView(last.page);
        const options = last.data && last.data.options;

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
    let isMingleRefresh = false;
    if (this._hasValidRedirect()) {
      if (App.mingleEnabled) {
        const vars = this.redirectHash.split('&');
        for (let i = 0; i < vars.length; i++) {
          const pair = vars[i].split('=');
          if (pair[0] === 'state') {
            if (pair[1] === 'mingleRefresh') { // show default view
              isMingleRefresh = true;
            } else {
              this.redirectHash = decodeURIComponent(pair[1]);
            }
            break;
          }
        }
      }
      if (isMingleRefresh) {
        const view = this.getView(App.getDefaultViews()[0]);
        if (view) {
          view.show();
        }
      } else {
        // Split by "/redirectTo/"
        const split = this.redirectHash.split(/\/redirectTo\//gi);
        if (split.length === 2) {
          this.redirectHash = split[1];
        }
      }
    }
  },
  onConnectionChange: function onConnectionChange(online) {
    const view = this.getView('left_drawer');
    if (!this.enableOfflineSupport) {
      return;
    }

    if (this.mingleEnabled && online && this.requiresMingleRefresh) {
      MingleUtility.refreshAccessToken(this);
      return;
    }

    if (view) {
      view.refresh();
    }

    this.ReUI.resetHistory();
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
  },
  navigateToLoginView: function navigateToLoginView() {
    this.setupRedirectHash();

    const view = this.getView(this.loginViewId);
    if (view) {
      view.show();
    }
  },
  _hasValidRedirect: function _hasValidRedirect() {
    const hashValue = decodeURIComponent(this.redirectHash);
    return hashValue !== '' && hashValue.indexOf('/redirectTo/') > 0;
  },
  showLeftDrawer: function showLeftDrawer() {
    const view = this.getView('left_drawer');
    if (view) {
      view.show();
    }
  },
  showRightDrawer: function showRightDrawer() {
    const view = this.getView('right_drawer');
    if (view) {
      view.show();
    }
  },
  navigateToHomeView: function navigateToHomeView() {
    this.setupRedirectHash();
    this.loadSnapper();

    const visible = this.preferences && this.preferences.home && this.preferences.home.visible;
    if (visible && visible.length > 0) {
      this.homeViewId = visible[0];
    }

    // Default view will be the home view, overwritten below if a redirect hash is supplied
    let view = this.getView(this.homeViewId);

    if (this.redirectHash) {
      let split = this.redirectHash.split(';');
      if (split.length === 1) {
        split = this.redirectHash.split(':');
      }
      if (split.length > 0) {
        const [viewId, key] = split;
        const redirectView = this.getView(viewId);
        if (redirectView) {
          if (!redirectView.canRedirectTo) {
            // The user will go to the default view instead
            view = this.getView(this.homeViewId);
          } else {
            view = redirectView;
            if (key) {
              redirectView.show({
                key,
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
  },
  navigateToActivityInsertView: function navigateToActivityInsertView() {
    const view = this.getView('activity_types_list');
    if (view) {
      view.show();
    }
  },
  initiateCall: function initiateCall() {
    // shortcut for environment call
    environment.initiateCall.apply(this, arguments);
  },
  initiateEmail: function initiateEmail() {
    // shortcut for environment call
    environment.initiateEmail.apply(this, arguments);
  },
  showMapForAddress: function showMapForAddress() {
    // shortcut for environment call
    environment.showMapForAddress.apply(this, arguments);
  },
  getVersionInfo: function getVersionInfo() {
    const info = string.substitute(this.versionInfoText, [
      this.mobileVersion.major,
      this.mobileVersion.minor,
      this.mobileVersion.revision,
      this.serverVersion.major,
    ]);
    return info;
  },
  initOfflineData: function initOfflineData() {
    const def = new Deferred();
    const model = this.ModelManager.getModel(MODEL_NAMES.AUTHENTICATION, MODEL_TYPES.OFFLINE);
    if (model) {
      const indicator = new BusyIndicator({
        id: 'busyIndicator__offlineData',
        label: resource.offlineInitDataText,
      });
      this.modal.disableClose = true;
      this.modal.showToolbar = false;
      this.modal.add(indicator);
      indicator.start();

      model.initAuthentication(this.context.user.$key).then((result) => {
        let options = offlineManager.getOptions();
        if (result.hasUserChanged) {
          options = {
            clearAll: true,
          };
        }
        if (result.hasUserChanged || (!result.hasAuthenticatedToday)) {
          offlineManager.clearData(options).then(() => {
            model.updateEntry(result.entry);
            indicator.complete(true);
            this.modal.disableClose = false;
            this.modal.hide();
            def.resolve();
          }, (err) => {
            indicator.complete(true);
            this.modal.disableClose = false;
            this.modal.hide();
            def.reject(err);
          });
        } else {
          result.entry.ModifyDate = moment().toDate();
          model.updateEntry(result.entry);
          indicator.complete(true);
          this.modal.disableClose = false;
          this.modal.hide();
          def.resolve(); // Do nothing since this not the first time athuenticating.
        }
      }, (err) => {
        def.reject(err);
      });
    } else {
      def.resolve();
    }
    return def.promise;
  },
});

lang.setObject('Mobile.SalesLogix.Application', __class);
export default __class;
