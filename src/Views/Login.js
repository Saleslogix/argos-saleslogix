import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import domClass from 'dojo/dom-class';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';

const resource = getResource('login');

/**
 * @class crm.Views.Login
 *
 *
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Views.Login', [Edit], {
  // Templates
  widgetTemplate: new Simplate([
    '<div id="{%= $.id %}" title="{%: $.titleText %}" class="panel {%= $.cls %}" hideBackButton="true">',
    '<p class="logo"><img src="content/images/logo-64.png" /><span>{%: $.logoText %}<span></p>',
    '<div class="panel-content" data-dojo-attach-event="onkeypress: _onKeyPress, onkeyup: _onKeyUp" data-dojo-attach-point="contentNode"></div>',
    '<button data-dojo-attach-point="loginButton" class="button actionButton" data-action="authenticate"><span class="indicator fa fa-spinner fa-spin"></span><span>{%: $.logOnText %}</span></button>',
    '<span class="copyright">{%= $.copyrightText %}</span>',
    '<span class="copyright">{%= App.getVersionInfo() %}</span>',
    '<div style="visibility: hidden;" class="fa fa-bars"></div>', // force font-awesome to be included on login
    '</div>',
  ]),

  id: 'login',
  busy: false,

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

  ENTER_KEY: 13,

  _onKeyPress: function _onKeyPress(evt) {
    if (evt.charOrCode === this.ENTER_KEY) {
      this.authenticate();
    }
  },
  _onKeyUp: function _onKeyUp() {
    const username = this.fields.username.getValue();
    if (username && username.length > 0) {
      domClass.add(this.domNode, 'login-active');
    } else {
      domClass.remove(this.domNode, 'login-active');
    }
  },
  show: function init() {
    this.inherited(arguments);
    if (!this.connectionState) {
      this._disable();
    }
  },
  _disable: function _disable() {
    this.fields.username.disable();
    this.fields.password.disable();
    this.fields.remember.disable();
    this.loginButton.disabled = true;
  },
  _enable: function _enable() {
    this.fields.username.enable();
    this.fields.password.enable();
    this.fields.remember.enable();
    this.loginButton.disabled = false;
  },
  _updateConnectionState: function _updateConnectionState(online) {
    this.inherited(arguments);
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
      name: 'username',
      placeHolderText: this.userText,
      type: 'text',
    }, {
      name: 'password',
      placeHolderText: this.passText,
      type: 'text',
      inputType: 'password',
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

    const credentials = this.getValues();
    const username = credentials && credentials.username;

    if (username) {
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
        if (this.fields.remember.getValue() !== true) {
          this.fields.username.setValue('');
          this.fields.password.setValue('');
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

lang.setObject('Mobile.SalesLogix.Views.Login', __class);
export default __class;
