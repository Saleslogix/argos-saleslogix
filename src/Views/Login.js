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

function LoginView(props) { // eslint-disable-line
  return (
    <div className="wrapper">
      <section className="signin" role="main">
        <SVGIcon iconName="icon-logo" label="Infor Logo" />
        <h1>Infor CRM</h1>
        <div className="panel-content" onKeyPress={props.onKeyPress} onKeyUp={props.onKeyUp} data-dojo-attach-point="contentNode" />
        <div className="login-button-container">
          <button data-dojo-attach-point="loginButton" data-action="authenticate" className="btn-primary hide-focus">
            {resource.logOnText}
          </button>
        </div>
      </section>
    </div>
  );
}

function SVGIcon(props) { // eslint-disable-line
  const iconClass = `icon ${props.iconName}`;
  const xlinkHref = `#${props.iconName}`;
  return (
    <svg className={iconClass} focusable="false" aria-hidden="true" role="presentation" aria-label={props.label}>
      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={xlinkHref}>
      </use>
    </svg>
  );
}

const __class = declare('crm.Views.Login', [Edit], {
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
  logoText: resource.logoText,
  errorText: {
    general: resource.logOnError,
    status: {},
  },
  ENTER_KEY: 13,

  // Override the buildRender for dijit Widgets. We will render a react component into this.domNode and
  // completely take over the rendering process
  // Base classes are still modifying some content like this.contentNode, etc, which is dangerous since React will be
  // unaware of those changes.
  buildRendering: function buildRendering() {
    this.domNode = document.createElement('div');
    this.domNode.setAttribute('class', 'view');
    this.domNode.setAttribute('id', this.id);
    ReactDOM.render(<LoginView onKeyPress={this._onKeyPress.bind(this)} onKeyUp={this._onKeyUp.bind(this)} />, this.domNode);

    // Setup attachpoints manually since we are not using _Templated
    // Move the logic for enable/disable into the react component and we can remove the loginButton attachpoint altogether.
    this.loginButton = $('.login-button-container > button', this.domNode).get(0);

    // _EditBase will dump the layout fields into this.contentNode, so it must exist on this class
    this.contentNode = $('.panel-content', this.domNode).get(0);
  },
  _onKeyPress: function _onKeyPress(evt) {
    if (evt.charCode === this.ENTER_KEY) {
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
    // _EditBase will inject these into this.contentNode
    // It would be cool if we could support this with JSX somehow,
    // perhaps by returning an array of child props here or some other special
    // child prop collection?
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
