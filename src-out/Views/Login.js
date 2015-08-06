define('crm/Views/Login', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/dom-class', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoDomClass, _argosEdit) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _Edit = _interopRequireDefault(_argosEdit);

  /**
   * @class crm.Views.Login
   *
   *
   * @extends argos.Edit
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Login', [_Edit['default']], {
    // Templates
    widgetTemplate: new Simplate(['<div id="{%= $.id %}" title="{%: $.titleText %}" class="panel {%= $.cls %}" hideBackButton="true">', '<p class="logo"><img src="content/images/logo-64.png" /><span>{%: $.logoText %}<span></p>', '<div class="panel-content" data-dojo-attach-event="onkeypress: _onKeyPress, onkeyup: _onKeyUp" data-dojo-attach-point="contentNode"></div>', '<button class="button actionButton" data-action="authenticate"><span class="indicator fa fa-spinner fa-spin"></span><span>{%: $.logOnText %}</span></button>', '<span class="copyright">{%= $.copyrightText %}</span>', '<span class="copyright">{%= App.getVersionInfo() %}</span>', '</div>']),

    // Localization
    id: 'login',
    busy: false,
    copyrightText: 'Copyright &copy; 2015 Infor. All rights reserved. www.infor.com',
    logOnText: 'Sign in',
    passText: 'Password',
    rememberText: 'Remember me',
    titleText: 'Sign in',
    userText: 'User ID',
    invalidUserText: 'The user name or password is invalid.',
    missingUserText: 'The user record was not found.',
    requestAbortedText: 'The request was aborted.',
    logoText: 'Infor CRM',

    ENTER_KEY: 13,

    _onKeyPress: function _onKeyPress(evt) {
      if (evt.charOrCode === this.ENTER_KEY) {
        this.authenticate();
      }
    },
    _onKeyUp: function _onKeyUp() {
      var username = this.fields.username.getValue();
      if (username && username.length > 0) {
        _domClass['default'].add(this.domNode, 'login-active');
      } else {
        _domClass['default'].remove(this.domNode, 'login-active');
      }
    },
    onShow: function onShow() {
      var credentials = App.getCredentials();

      if (credentials) {
        App.authenticateUser(credentials, {
          success: function authSuccess() {
            App.initAppState().then(function initAppStateSuccess() {
              App.navigateToInitialView();
            });
          },
          scope: this
        });
      }
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        bbar: false,
        tbar: false
      });
    },
    getContext: function getContext() {
      return {
        id: this.id
      };
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        name: 'username',
        placeHolderText: this.userText,
        type: 'text'
      }, {
        name: 'password',
        placeHolderText: this.passText,
        type: 'text',
        inputType: 'password'
      }, {
        name: 'remember',
        label: this.rememberText,
        type: 'boolean'
      }]);
    },
    authenticate: function authenticate() {
      if (this.busy) {
        return;
      }

      var credentials = this.getValues();
      var username = credentials && credentials.username;

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
          alert(this.missingUserText); // eslint-disable-line
          next();
        }
      }, {
        name: 'GeneralError',
        test: function testError(error) {
          return typeof error.xhr !== 'undefined' && error.xhr !== null;
        },
        handle: function handleError(error, next) {
          alert(this.getErrorMessage(error)); // eslint-disable-line
          next();
        }
      }];

      return this.errorHandlers;
    },
    validateCredentials: function validateCredentials(credentials) {
      this.disable();

      App.authenticateUser(credentials, {
        success: function success() {
          this.enable();

          var attr = this.domNode.attributes.getNamedItem('selected');
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

          var error = new Error();
          error.status = result && result.response && result.response.status;
          error.xhr = result && result.response;
          this.handleError(error);
        },
        aborted: function aborted() {
          this.enable();

          alert(this.requestAbortedText); // eslint-disable-line
        },
        scope: this
      });
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Login', __class);
  module.exports = __class;
});
