import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import domClass from 'dojo/dom-class';
import Edit from 'argos/Edit';

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
    '<button class="button actionButton" data-action="authenticate"><span class="indicator fa fa-spinner fa-spin"></span><span>{%: $.logOnText %}</span></button>',
    '<span class="copyright">{%= $.copyrightText %}</span>',
    '<span class="copyright">{%= App.getVersionInfo() %}</span>',
    '</div>',
  ]),

  id: 'login',
  busy: false,

  // Localization
  localeId: 'login',

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
  onShow: function onShow() {
    const credentials = App.getCredentials();

    if (credentials) {
      App.authenticateUser(credentials, {
        success: function authSuccess() {
          App.initAppState().then(function initAppStateSuccess() {
            App.navigateToInitialView();
          });
        },
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
        this.enable();

        const attr = this.domNode.attributes.getNamedItem('selected');
        if (attr) {
          attr.value = 'false';
        }

        App.setPrimaryTitle(App.loadingText);
        App.initAppState().then(function initAppStateSuccess() {
          App.navigateToInitialView();
        });
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
