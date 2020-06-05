/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
* @module crm/Application
*/
import string from 'dojo/string';
import DefaultMetrics from './DefaultMetrics';
import ErrorManager from 'argos/ErrorManager';
import environment from './Environment';
import SDKApplication from 'argos/Application';
import offlineManager from 'argos/Offline/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from './Models/Names';
import BusyIndicator from 'argos/Dialogs/BusyIndicator';
import getResource from 'argos/I18n';
import MingleUtility from './MingleUtility';
import { app } from './reducers/index';
import { setConfig, setEndPoint } from './actions/config';
import { setUser } from './actions/user';
import PicklistService from './PicklistService';


const resource = getResource('application');

/**
 * @alias module:crm/Application
 * @extends module:argos/Application
 */
class Application extends SDKApplication {
  constructor(options = {
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
    mingleRedirectUrl: '',
  }) {
    super();
    this.navigationState = null;
    this.rememberNavigationState = true;
    this.speedSearch = {
      includeStemming: true,
      includePhonic: true,
      includeThesaurus: false,
      useFrequentFilter: false,
      searchType: 1,
    };
    this.enableCaching = true;
    this.userDetailsQuerySelect = ['UserName', 'UserInfo/UserName', 'UserInfo/FirstName', 'UserInfo/LastName', 'DefaultOwner/OwnerDescription'];
    this.userOptionsToRequest = [
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
    ];
    this.systemOptionsToRequest = [
      'BaseCurrency',
      'MultiCurrency',
      'ChangeOpportunityRate',
      'LockOpportunityRate',
    ];
    this.appName = 'argos-saleslogix';
    this.serverVersion = {
      major: 8,
      minor: 0,
      revision: 0,
    };
    this.mobileVersion = {
      major: 4,
      minor: 2,
      revision: 0,
    };
    this.versionInfoText = resource.versionInfoText;
    this.loadingText = resource.loadingText;
    this.authText = resource.authText;
    this.connectionToastTitleText = resource.connectionToastTitleText;
    this.offlineText = resource.offlineText;
    this.onlineText = resource.onlineText;
    this.mingleAuthErrorText = resource.mingleAuthErrorText;
    this.fileCacheText = resource.fileCacheText;
    this.fileCacheTitle = resource.fileCacheTitle;
    this.homeViewId = 'myactivity_list';
    this.offlineHomeViewId = 'recently_viewed_list_offline';
    this.loginViewId = 'login';
    this.logOffViewId = 'logoff';
    this.UID = null;
    this.isAuthenticated = false;
    this.hasState = false;
    this.defaultViews = [
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
    ];

    // Settings
    Object.assign(this, options); // TODO: Remove

    // Save this config temporarily until we have a working store (init).
    this._config = options;
  }

  init() {
    // Must exist here for backwards compatibility for BOE Module
    this.picklistService = PicklistService;

    this._cachingService = new ICRMServicesSDK.CachingService(localStorage);
    this.picklistService.init(this.getService(), this._cachingService);

    super.init(...arguments);
    // Dispatch the temp config we saved in the constructor
    this.store.dispatch(setConfig(this._config));
    this._config = null;
    this._loadNavigationState();

    let accessToken = null;
    if (this.isMingleEnabled()) {
      accessToken = this.mingleAuthResults.access_token;
    }

    this.UID = (new Date())
      .getTime();
    const original = Sage.SData.Client.SDataService.prototype.executeRequest;
    const self = this;
    Sage.SData.Client.SDataService.prototype.executeRequest = function executeRequest(request) {
      if (accessToken) {
        request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        request.setRequestHeader('X-Authorization', `Bearer ${accessToken}`);
      }

      request.setRequestHeader('X-Application-Name', self.appName);
      const version = self.mobileVersion;
      const id = self.UID;
      request.setRequestHeader('X-Application-Version', `${version.major}.${version.minor}.${version.revision};${id}`);
      return original.apply(this, arguments);
    };
  }

  initServiceWorker() {
    if (this.isServiceWorkerEnabled()) {
      super.initServiceWorker();
    }
  }

  isServiceWorkerEnabled() {
    return (this.enableOfflineSupport || this.enableServiceWorker) && 'serviceWorker' in navigator;
  }

  registerCacheUrl(url) {
    if (this.isServiceWorkerEnabled()) {
      return this.sendServiceWorkerMessage({ command: 'add', url });
    }

    return Promise.resolve(true);
  }

  registerCacheUrls(urls) {
    if (this.isServiceWorkerEnabled()) {
      return this.sendServiceWorkerMessage({ command: 'addall', urls }).then((data) => {
        if (data.results === 'added' || data.results === 'skipped') {
          this.toast.add({ message: this.fileCacheText, title: this.fileCacheTitle, toastTime: 20000 });
        }

        return data;
      });
    }

    return Promise.resolve(true);
  }

  clearServiceWorkerCaches() {
    if (this.isServiceWorkerEnabled()) {
      return caches.keys().then((keys) => {
        return Promise.all(
          keys.map(key => caches.delete(key))
        );
      });
    }

    return Promise.resolve(true);
  }

  initPreferences() {
    super.initPreferences();
    this._saveDefaultPreferences();
  }

  isMingleEnabled() {
    return this.enableMingle || this.mingleEnabled;
  }

  getReducer() {
    const sdk = super.getReducer(...arguments);
    return Redux.combineReducers({
      sdk,
      app,
    });
  }

  getInitialState() {
    return {};
  }

  initConnects() {
    super.initConnects(...arguments);
  }

  destroy() {
    super.destroy();
  }

  isOnFirstView() {
    const history = this.context.history;
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
  }

  onSetOrientation() {
    // TODO: Close main nav like we did with left drawer?
  }

  _viewTransitionTo() {
    super._viewTransitionTo(...arguments);
    this._checkSaveNavigationState();
    // TODO: Close main nav like we did with left drawer?
  }

  _checkSaveNavigationState() {
    if (this.rememberNavigationState !== false) {
      this._saveNavigationState();
    }
  }

  _notifyUpdateAvailable() {
    // TODO: Part of cache manifest, remove or rework for service worker?
    if (this.bars.updatebar) {
      this.bars.updatebar.show();
    }
  }

  _saveNavigationState() {
    try {
      if (window.localStorage) {
        window.localStorage.setItem('navigationState', JSON.stringify(ReUI.context.history));
      }
    } catch (e) {} // eslint-disable-line
  }
  hasMultiCurrency() {
    // Check if the configuration specified multiCurrency, this will override the dynamic check.
    // A configuration is not ideal, and we should refactor the edit view to process the layout when it first recieves its data,
    // instead of on startup. We cannot check App.context data that was loaded after login when the startup method is used.
    if (this.enableMultiCurrency || this.multiCurrency) {
      return true;
    }

    return false;
  }
  canLockOpportunityRate() {
    if (this.context &&
      this.context.systemOptions &&
      this.context.systemOptions.LockOpportunityRate === 'True') {
      return true;
    }

    return false;
  }
  canChangeOpportunityRate() {
    if (this.context &&
      this.context.systemOptions &&
      this.context.systemOptions.ChangeOpportunityRate === 'True') {
      return true;
    }

    return false;
  }
  getMyExchangeRate() {
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
      Object.assign(results, {
        code: myCode,
        rate: myRate,
      });
    }

    return results;
  }
  getBaseExchangeRate() {
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
      Object.assign(results, {
        code: baseCode,
        rate: baseRate,
      });
    }

    return results;
  }
  getCurrentOpportunityExchangeRate() {
    const results = {
      code: '',
      rate: 1,
    };

    let found = this.queryNavigationContext((o) => {
      return (/^(opportunities)$/)
        .test(o.resourceKind) && o.key;
    });

    found = found && found.options;

    if (found) {
      const rate = found.ExchangeRate;
      const code = found.ExchangeRateCode;
      Object.assign(results, {
        code,
        rate,
      });
    }

    return results;
  }
  getCurrentLocale() {
    return this.context.localization && this.context.localization.locale || this.defaultLocale;
  }
  run() {
    super.run(...arguments);

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
  }
  onAuthenticateUserSuccess(credentials, callback, scope, result) {
    const user = {
      $key: result.response.userId.trim(),
      $descriptor: result.response.prettyName,
      UserName: result.response.userName,
    };

    this.context.user = user;
    this.context.roles = result.response.roles;
    this.context.securedActions = result.response.securedActions;

    if (this.context.securedActions) {
      this.context.userSecurity = {};
      this.context.securedActions.forEach((item) => {
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

    if (!this.isMingleEnabled() && credentials.remember) {
      try {
        if (window.localStorage) {
          window.localStorage.setItem('credentials', Base64.encode(JSON.stringify({
            username: credentials.username,
            password: credentials.password || '',
            endpoint: credentials.endpoint,
          })));
        }
      } catch (e) {} //eslint-disable-line
    }

    if (callback) {
      callback.call(scope || this, {
        user,
      });
    }
  }
  onAuthenticateUserFailure(callback, scope, response) {
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
  }
  authenticateUser(credentials, options) {
    const service = this.getService();
    if (credentials) {
      service.setUserName(credentials.username)
        .setPassword(credentials.password || '');
    }

    const request = new Sage.SData.Client.SDataServiceOperationRequest(service)
      .setContractName('system')
      .setOperationName('getCurrentUser');

    request.execute({}, {
      success: this.onAuthenticateUserSuccess.bind(this, credentials, options.success, options.scope),
      failure: this.onAuthenticateUserFailure.bind(this, options.failure, options.scope),
      aborted: this.onAuthenticateUserFailure.bind(this, options.failure, options.scope),
    });
  }
  hasAccessTo(security) {
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
  }
  reload() {
    window.location.hash = '';
    window.location.reload();
  }
  resetModuleAppStatePromises() {
    this.clearAppStatePromises();
    for (let i = 0; i < this.modules.length; i++) {
      this.modules[i].loadAppStatePromises(this);
    }
  }
  logOut() {
    this.removeCredentials();
    this._clearNavigationState();

    const service = this.getService();
    this.isAuthenticated = false;
    this.context = {
      history: [],
    };

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
  }
  getCredentials() {
    let credentials = null;
    try {
      if (window.localStorage) {
        const stored = window.localStorage.getItem('credentials');
        const encoded = stored && Base64.decode(stored);
        credentials = encoded && JSON.parse(encoded);
      }
    } catch (e) {} //eslint-disable-line

    return credentials;
  }
  loadEndpoint() {
    try {
      if (window.localStorage) {
        let results = window.localStorage.getItem('endpoint');
        if (!results) {
          const service = this.getService();
          if (!this.isMingleEnabled()) {
            service.uri.setHost(window.location.hostname)
              .setScheme(window.location.protocol.replace(':', ''))
              .setPort(window.location.port);
          }

          results = service.uri.build();
        }

        this.store.dispatch(setEndPoint(results));
      }
    } catch (e) {} // eslint-disable-line
  }
  saveEndpoint(url = '') {
    if (!url) {
      return;
    }

    try {
      if (window.localStorage) {
        window.localStorage.setItem('endpoint', url);
      }
    } catch (e) {} // eslint-disable-line
  }
  removeCredentials() {
    try {
      if (window.localStorage) {
        window.localStorage.removeItem('credentials');
      }
    } catch (e) {} //eslint-disable-line
  }
  handleAuthentication() {
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
  }
  handleMingleAuthentication() {
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
  }
  onHandleAuthenticationSuccess() {
    this.isAuthenticated = true;
    this.setPrimaryTitle(this.loadingText);
    this.showHeader();
    this.initAppState().then(() => {
      this.onInitAppStateSuccess();
    }, (err) => {
      this.hideHeader();
      this.onInitAppStateFailed(err);
    });
  }
  showHeader() {
    const header = $('.header', this.getContainerNode());
    header.show();
  }
  hideHeader() {
    const header = $('.header', this.getContainerNode());
    header.hide();
  }
  onHandleAuthenticationFailed() {
    this.removeCredentials();
    this.navigateToLoginView();
  }
  onMingleHandleAuthenticationFailed() {
    this.removeCredentials();
    this.setPrimaryTitle(this.mingleAuthErrorText);
  }
  onHandleAuthenticationAborted() {
    this.navigateToLoginView();
  }
  onInitAppStateSuccess() {
    this.setDefaultMetricPreferences();
    this.showApplicationMenuOnLarge();
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
  }
  onInitAppStateFailed(error) {
    const message = resource.appStateInitErrorText;
    this.hideApplicationMenu();
    ErrorManager.addSimpleError(message, error);
    ErrorManager.showErrorDialog(null, message, () => {
      this._clearNavigationState();
      this.removeCredentials();
      this.navigateToLoginView();
    });
  }
  onStateChange(state) {
    super.onStateChange(state);
    if (!state || state === this.previousState) {
      return;
    }

    const currentEndpoint = state.app.config.endpoint;
    const previousEndpoint = this.previousState.app.config.endpoint;
    if (currentEndpoint !== previousEndpoint) {
      this.updateServiceUrl(state);
      this.saveEndpoint(currentEndpoint);
    }
  }
  updateServiceUrl(state) {
    if (this.isMingleEnabled()) { // See TODO below, as to why we are bailing here
      return;
    }

    const service = this.getService();
    service.setUri(Object.assign({}, state.app.config.connections, {
      url: state.app.config.endpoint, // TODO: Setting the URL here will break mingle instances that use custom virtual directories
    }));

    // Fixes cases where the user sets and invalid contract name in the url.
    // We have a lot of requests throughout the application that do not specify
    // a contractName and depend on the default contractName of "dynamic"
    // in the service.
    service.setContractName('dynamic');
    service.setApplicationName('slx');
  }
  _clearNavigationState() {
    try {
      this.initialNavigationState = null;

      if (window.localStorage) {
        window.localStorage.removeItem('navigationState');
      }
    } catch (e) {} //eslint-disable-line
  }
  _loadNavigationState() {
    try {
      if (window.localStorage) {
        this.navigationState = window.localStorage.getItem('navigationState');
      }
    } catch (e) {} // eslint-disable-line
  }
  _saveDefaultPreferences() {
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
  }
  getMetricsByResourceKind(resourceKind) {
    let results = [];
    let prefs = this.preferences && this.preferences.metrics && this.preferences.metrics;

    if (prefs) {
      prefs = prefs.filter((item) => {
        return item.resourceKind === resourceKind;
      });

      if (prefs.length === 1) {
        results = prefs[0].children;
      }
    }

    return results;
  }
  setDefaultMetricPreferences() {
    if (!this.preferences.metrics) {
      const defaults = new DefaultMetrics();
      this.preferences.metrics = defaults.getDefinitions();
      this.persistPreferences();
    }
  }
  clearMetricPreferences() {
    this.preferences.metrics = null;
    this.persistPreferences();
  }
  clearQuickActionPreferences() {
    this.preferences.quickActions = null;
    this.persistPreferences();
  }
  requestUserDetails() {
    const key = this.context.user.$key;
    const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
      .setContractName('dynamic')
      .setResourceKind('users')
      .setResourceSelector(`"${key}"`)
      .setQueryArg('select', this.userDetailsQuerySelect.join(','));

    return new Promise((resolve, reject) => {
      request.read({
        success: function success(entry) {
          this.store.dispatch(setUser(entry));
          this.context.user = entry;
          this.context.defaultOwner = entry && entry.DefaultOwner;
          resolve(entry);
        },
        failure: function failure(e) {
          reject(e);
        },
        scope: this,
      });
    });
  }
  requestUserOptions() {
    const batch = new Sage.SData.Client.SDataBatchRequest(this.getService())
      .setContractName('system')
      .setResourceKind('useroptions')
      .setQueryArg('select', 'name,value,defaultValue')
      .using(function using() {
        const service = this.getService();
        this.userOptionsToRequest.forEach((item) => {
          new Sage.SData.Client.SDataSingleResourceRequest(service)
            .setContractName('system')
            .setResourceKind('useroptions')
            .setResourceKey(item)
            .read();
        });
      }, this);

    return new Promise((resolve, reject) => {
      batch.commit({
        success: function success(feed) {
          const userOptions = this.context.userOptions = this.context.userOptions || {};

          feed.$resources.forEach((item) => {
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
          resolve(feed);
        },
        failure: function failure(response, o) {
          reject();
          ErrorManager.addError(response, o, {}, 'failure');
        },
        scope: this,
      });
    });
  }
  /*
   * Loads a custom object to pass into the current moment language. The object for the language gets built in buildCustomizedMoment.
   */
  loadCustomizedMoment() {
    const custom = this.buildCustomizedMoment();
    const currentLang = moment.locale();

    moment.locale(currentLang, custom);
    this.moment = moment().locale(currentLang, custom);
  }
  /*
   * Builds an object that will get passed into moment.locale()
   */
  buildCustomizedMoment() {
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
        relativeTime: moment().locale(this.getCurrentLocale())._locale._relativeTime,
      };
    }

    return results;
  }
  requestSystemOptions() {
    const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
      .setContractName('system')
      .setResourceKind('systemoptions')
      .setQueryArg('select', 'name,value');

    return new Promise((resolve, reject) => {
      request.read({
        success: function succes(feed) {
          const systemOptions = this.context.systemOptions = this.context.systemOptions || {};

          feed.$resources.forEach((item) => {
            const { name, value } = item;
            if (value && name && this.systemOptionsToRequest.indexOf(name) > -1) {
              systemOptions[name] = value;
            }
          }, this);

          const multiCurrency = systemOptions.MultiCurrency;

          if (multiCurrency && multiCurrency === 'True') {
            this.requestExchangeRates()
              .then(() => {
                resolve(feed);
              }, () => {
                reject();
              });
          } else {
            resolve(feed);
          }
        },
        failure: function failure(response, o) {
          ErrorManager.addError(response, o, {}, 'failure');
          reject();
        },
        scope: this,
      });
    });
  }
  requestExchangeRates() {
    const request = new Sage.SData.Client.SDataResourceCollectionRequest(this.getService())
      .setContractName('dynamic')
      .setResourceKind('exchangeRates')
      .setQueryArg('select', 'Rate');

    return new Promise((resolve, reject) => {
      request.read({
        success: function success(feed) {
          const exchangeRates = this.context.exchangeRates = this.context.exchangeRates || {};

          feed.$resources.forEach((item) => {
            const key = item && item.$descriptor;
            const value = item && item.Rate;

            if (value && key) {
              exchangeRates[key] = value;
            }
          });

          resolve(feed);
        },
        failure: function failure(response, o) {
          reject();
          ErrorManager.addError(response, o, {}, 'failure');
        },
        scope: this,
      });
    });
  }
  requestOwnerDescription(key) {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
      .setContractName('dynamic')
      .setResourceKind('owners')
      .setResourceSelector(`"${key}"`)
      .setQueryArg('select', 'OwnerDescription');

    request.read({
      success: this.onRequestOwnerDescriptionSuccess,
      failure: this.onRequestOwnerDescriptionFailure,
      scope: this,
    });
  }
  onRequestOwnerDescriptionSuccess(entry) {
    if (entry) {
      this.context.defaultOwner = entry;
    }
  }
  onRequestOwnerDescriptionFailure(response, o) {
    ErrorManager.addError(response, o, {}, 'failure');
  }
  getDefaultViews() {
    return this.defaultViews;
  }
  getExposedViews() {
    return Object.keys(this.views).filter((id) => {
      const view = this.getViewDetailOnly(id);
      return view && view.id !== 'home' && view.expose;
    });
  }
  cleanRestoredHistory(restoredHistory) {
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
  }
  requestIntegrationSettings(integration) {
    if (!this.context.integrationSettings) {
      this.context.integrationSettings = {};
    }
    const request = new Sage.SData.Client.SDataBaseRequest(App.getService());
    const pageSize = this.pageSize;
    const startIndex = this.feed && this.feed.$startIndex > 0 && this.feed.$itemsPerPage > 0 ? this.feed.$startIndex + this.feed.$itemsPerPage : 1;
    request.uri.setPathSegment(0, 'slx');
    request.uri.setPathSegment(1, 'dynamic');
    request.uri.setPathSegment(2, '-');
    request.uri.setPathSegment(3, 'customsettings');
    request.uri.setQueryArg('format', 'JSON');
    request.uri.setQueryArg('select', 'Description,DataValue,DataType');
    request.uri.setQueryArg('where', `Category eq "${integration}"`);
    request.uri.setStartIndex(startIndex);
    request.uri.setCount(pageSize);
    request.service.readFeed(request, {
      success: (feed) => {
        const integrationSettings = {};
        feed.$resources.forEach((item) => {
          const key = item && item.$descriptor;
          let value = item && item.DataValue;
          if (typeof value === 'undefined' || value === null) {
            value = '';
          }
          if (key) {
            integrationSettings[`${key}`] = value;
          }
          this.context.integrationSettings[`${integration}`] = integrationSettings;
        });
      },
      failure: (response, o) => {
        ErrorManager.addError(response, o, '', 'failure');
      },
    });
  }
  navigateToInitialView() {
    this.showLeftDrawer();
    this.showHeader();
    try {
      const restoredState = this.navigationState;
      const restoredHistory = restoredState && JSON.parse(restoredState);
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
  }
  setupRedirectHash() {
    let isMingleRefresh = false;
    if (this._hasValidRedirect()) {
      if (this.isMingleEnabled()) {
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
  }
  onConnectionChange(online) {
    const view = this.getView('left_drawer');
    if (!this.enableOfflineSupport) {
      return;
    }

    if (this.isMingleEnabled() && online && this.requiresMingleRefresh) {
      MingleUtility.refreshAccessToken(this);
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
  navigateToLoginView() {
    this.setupRedirectHash();

    const view = this.getView(this.loginViewId);
    if (view) {
      view.show();
    }
  }
  _hasValidRedirect() {
    const hashValue = decodeURIComponent(this.redirectHash);
    return hashValue !== '' && hashValue.indexOf('/redirectTo/') > 0;
  }
  showLeftDrawer() {
    const view = this.getView('left_drawer');
    if (view) {
      view.show();
    }

    return this;
  }

  showRightDrawer() {
    return this;
  }

  navigateToHomeView() {
    this.setupRedirectHash();
    this.showLeftDrawer();


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
  }
  navigateToActivityInsertView() {
    const view = this.getView('activity_types_list');
    if (view) {
      view.show();
    }
  }
  initiateCall() {
    // shortcut for environment call
    environment.initiateCall.apply(this, arguments);
  }
  initiateEmail() {
    // shortcut for environment call
    environment.initiateEmail.apply(this, arguments);
  }
  showMapForAddress() {
    // shortcut for environment call
    environment.showMapForAddress.apply(this, arguments);
  }
  getVersionInfo() {
    const info = string.substitute(this.versionInfoText, [
      this.mobileVersion.major,
      this.mobileVersion.minor,
      this.mobileVersion.revision,
      this.serverVersion.major,
    ]);
    return info;
  }
  initOfflineData() {
    return new Promise((resolve, reject) => {
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
          if (result.hasUserChanged || (!result.hasAuthenticatedToday)) {
            offlineManager.clearAllData().then(() => {
              model.updateEntry(result.entry);
              indicator.complete(true);
              this.modal.disableClose = false;
              this.modal.hide();
              resolve();
            }, (err) => {
              indicator.complete(true);
              this.modal.disableClose = false;
              this.modal.hide();
              reject(err);
            });
          } else {
            result.entry.ModifyDate = moment().toDate();
            model.updateEntry(result.entry);
            indicator.complete(true);
            this.modal.disableClose = false;
            this.modal.hide();
            resolve(); // Do nothing since this not the first time athuenticating.
          }
        }, (err) => {
          reject(err);
        });
      } else {
        resolve();
      }
    });
  }
}

export default Application;
