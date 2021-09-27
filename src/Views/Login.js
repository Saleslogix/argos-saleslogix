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

import declare from 'dojo/_base/declare';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('login');

const __class = declare('crm.Views.Login', [Edit], {
  // Templates
  widgetTemplate: new Simplate([`
      <div id="{%= $.id %}" data-title="{%: $.titleText %}" class="view">
        <div class="wrapper">
          <section class="signin" role="main">
            <svg viewBox="0 0 34 34" class="icon icon-logo" focusable="false" aria-hidden="true" role="presentation" aria-label="Infor Logo">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-logo"></use>
            </svg>
            <h1>Infor CRM SLX</h1>
            <div class="panel-content" data-dojo-attach-event="onkeypress: _onKeyPress, onkeyup: _onKeyUp" data-dojo-attach-point="contentNode">
            </div>
            <div class="login-button-container">
              <button data-dojo-attach-point="loginButton" class="btn-primary hide-focus" data-action="authenticate">{%: $.logOnText %}</button>
            </div>
          </section>
        </div>
      </div>
    `,
  ]),

  id: 'login',
  busy: false,
  multiColumnView: false,
  // Localization
  copyrightText: resource.copyrightText,
  logOnText: resource.logOnText,
  passText: resource.passText,
  rememberText: resource.rememberText,
  titleText: resource.titleText,
  userText: resource.userText,
  invalidUserText: resource.invalidUserText,
  missingUserText: resource.missingUserText,
  requestAbortedText: resource.requestAbortedText,
  passwordExpiredText: resource.passwordExpiredText,
  logoText: resource.logoText,
  errorText: {
    general: resource.logOnError,
    status: {},
  },
  ENTER_KEY: 13,

  _onKeyPress: function _onKeyPress(evt) {
    if (evt.charOrCode === this.ENTER_KEY) {
      this.authenticate();
    }
  },
  _onKeyUp: function _onKeyUp() {
    const username = this.fields['username-display'].getValue();
    if (username && username.length > 0) {
      $(this.domNode).addClass('login-active');
    } else {
      $(this.domNode).removeClass('login-active');
    }
  },
  initSoho: function initSoho() {
    const header = $('.header', App.getContainerNode());
    header.hide();
  },
  show: function show() {
    this.inherited(show, arguments);

    if (!this.connectionState) {
      this._disable();
    }

    if (App.enableRememberMe !== true) {
      this.fields.remember.disable();
      this.fields.remember.hide();
    }
  },
  _disable: function _disable() {
    this.fields['username-display'].disable();
    this.fields['password-display'].disable();
    this.fields.remember.disable();
    this.loginButton.disabled = true;
  },
  _enable: function _enable() {
    this.fields['username-display'].enable();
    this.fields['password-display'].enable();
    this.fields.remember.enable();
    this.loginButton.disabled = false;
  },
  _updateConnectionState: function _updateConnectionState(online) {
    this.inherited(_updateConnectionState, arguments);
    if (online) {
      this._enable();
    } else {
      this._disable();
    }
  },
  onShow: function onShow() {
    const credentials = App.getCredentials();

    if (credentials) {
      App.authenticateUser(credentials, {
        success: App.onHandleAuthenticationSuccess,
        scope: this,
      });
    }
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      bbar: false,
      tbar: false,
    });
  },
  getContext: function getContext() {
    return {
      id: this.id,
    };
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      name: 'username-display',
      label: this.userText,
      type: 'text',
      required: true,
    }, {
      name: 'password-display',
      label: this.passText,
      type: 'text',
      inputType: 'password',
      required: true,
    }, {
      name: 'remember',
      label: this.rememberText,
      type: 'boolean',
    }]);
  },
  authenticate: function authenticate() {
    if (this.busy) {
      return;
    }

    const values = this.getValues(true);

    const credentials = {
      username: values['username-display'],
      password: values['password-display'],
      remember: values.remember,
    };

    if (credentials.username) {
      this.validateCredentials(credentials);
    }
  },
  createErrorHandlers: function createErrorHandlers() {
    this.errorText.status[this.HTTP_STATUS.FORBIDDEN] = this.invalidUserText;

    this.errorHandlers = [{
      name: 'NoResponse',
      test: function testNoResponse(error) {
        return !error.xhr;
      },
      handle: function handleNoResponse(error, next) {
        alert(this.missingUserText);// eslint-disable-line
        next();
      },
    }, {
      name: 'PasswordExpired',
      test: function testExpiredPassword(error) {
        const xhr = error && error.xhr;
        if (!xhr) {
          return false;
        }

        try {
          const json = JSON.parse(xhr.responseText)[0];
          const stackTrace = json.stackTrace || '';
          return stackTrace.indexOf('Sage.SalesLogix.User.Rules.IsValidPassword') > -1;
        } catch (_) {
          return false;
        }
      },
      handle: function handleExpiredPassword() {
        alert(this.passwordExpiredText);// eslint-disable-line
      },
    }, {
      name: 'GeneralError',
      test: function testError(error) {
        return typeof error.xhr !== 'undefined' && error.xhr !== null;
      },
      handle: function handleError(error, next) {
        alert(this.getErrorMessage(error));// eslint-disable-line
        next();
      },
    }];

    return this.errorHandlers;
  },
  validateCredentials: function validateCredentials(credentials) {
    this.disable();

    App.authenticateUser(credentials, {
      success: function success() {
        // Need to remove Login view from pagejs stack
        page.len--;
        if (this.fields.remember.getValue() !== true) {
          this.fields['username-display'].setValue('');
          this.fields['password-display'].setValue('');
        }
        this.enable();

        const attr = this.domNode.attributes.getNamedItem('selected');
        if (attr) {
          attr.value = 'false';
        }
        App.onHandleAuthenticationSuccess();
      },
      failure: function failure(result) {
        this.enable();
        const error = new Error();
        error.status = result && result.response && result.response.status;
        error.xhr = result && result.response;
        this.handleError(error);
      },
      aborted: function aborted() {
        this.enable();
        alert(this.requestAbortedText);// eslint-disable-line
      },
      scope: this,
    });
  },
});

export default __class;
