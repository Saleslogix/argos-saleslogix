define('crm/Views/Login', ['module', 'exports', 'dojo/_base/declare', 'argos/Edit', 'argos/I18n', '../actions/config'], function (module, exports, _declare, _Edit, _I18n, _config) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('login');

  /**
   * @class crm.Views.Login
   *
   *
   * @extends argos.Edit
   *
   */
  var __class = (0, _declare2.default)('crm.Views.Login', [_Edit2.default], {
    // Templates
    widgetTemplate: new Simplate(['\n      <div id="{%= $.id %}" data-title="{%: $.titleText %}" class="view">\n        <div class="wrapper">\n          <section class="signin" role="main">\n            <svg viewBox="0 0 34 34" class="icon icon-logo" focusable="false" aria-hidden="true" role="presentation" aria-label="Infor Logo">\n              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-logo"></use>\n            </svg>\n            <h1>Infor CRM</h1>\n            <div class="panel-content" data-dojo-attach-event="onkeypress: _onKeyPress, onkeyup: _onKeyUp" data-dojo-attach-point="contentNode">\n            </div>\n            <div>\n              <button data-dojo-attach-point="loginButton" class="btn-primary hide-focus" data-action="authenticate">{%: $.logOnText %}</button>\n            </div>\n          </section>\n        </div>\n      </div>\n    ']),

    id: 'login',
    busy: false,
    multiColumnView: false,
    // Localization
    copyrightText: resource.copyrightText,
    logOnText: resource.logOnText,
    passText: resource.passText,
    urlText: resource.urlText,
    rememberText: resource.rememberText,
    titleText: resource.titleText,
    userText: resource.userText,
    invalidUserText: resource.invalidUserText,
    missingUserText: resource.missingUserText,
    requestAbortedText: resource.requestAbortedText,
    logoText: resource.logoText,
    errorText: {
      general: resource.logOnError,
      status: {}
    },
    ENTER_KEY: 13,

    _onKeyPress: function _onKeyPress(evt) {
      if (evt.charOrCode === this.ENTER_KEY) {
        this.authenticate();
      }
    },
    _onKeyUp: function _onKeyUp() {
      var username = this.fields['username-display'].getValue();
      if (username && username.length > 0) {
        $(this.domNode).addClass('login-active');
      } else {
        $(this.domNode).removeClass('login-active');
      }
    },
    initSoho: function initSoho() {
      var header = $('.header', App.getContainerNode());
      header.hide();
    },
    show: function show() {
      this.inherited(show, arguments);
      if (!this.connectionState) {
        this._disable();
      }

      var state = this.appStore.getState();
      if (state && state.app && state.app.config.endpoint) {
        this.fields['url-display'].setValue(state.app.config.endpoint);
      }
    },
    _disable: function _disable() {
      this.fields['username-display'].disable();
      this.fields['password-display'].disable();
      this.fields['url-display'].disable();
      this.fields.remember.disable();
      this.loginButton.disabled = true;
    },
    _enable: function _enable() {
      this.fields['username-display'].enable();
      this.fields['password-display'].enable();
      this.fields['url-display'].enable();
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
      var credentials = App.getCredentials();

      if (credentials) {
        App.authenticateUser(credentials, {
          success: App.onHandleAuthenticationSuccess,
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
        name: 'username-display',
        label: this.userText,
        type: 'text',
        required: true
      }, {
        name: 'password-display',
        label: this.passText,
        type: 'text',
        inputType: 'password',
        required: true
      }, {
        name: 'url-display',
        label: this.urlText,
        type: 'text',
        required: true
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

      var values = this.getValues();

      var credentials = {
        username: values['username-display'],
        password: values['password-display'],
        endpoint: values['url-display'],
        remember: values.remember
      };

      if (credentials.username && credentials.endpoint) {
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

      var endpoint = credentials.endpoint;
      this.appStore.dispatch((0, _config.setEndPoint)(endpoint));
      App.authenticateUser(credentials, {
        success: function success() {
          // Need to remove Login view from pagejs stack
          page.len--;
          if (this.fields.remember.getValue() !== true) {
            this.fields['username-display'].setValue('');
            this.fields['password-display'].setValue('');
          }
          this.enable();

          var attr = this.domNode.attributes.getNamedItem('selected');
          if (attr) {
            attr.value = 'false';
          }
          App.onHandleAuthenticationSuccess();
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9Mb2dpbi5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ3aWRnZXRUZW1wbGF0ZSIsIlNpbXBsYXRlIiwiaWQiLCJidXN5IiwibXVsdGlDb2x1bW5WaWV3IiwiY29weXJpZ2h0VGV4dCIsImxvZ09uVGV4dCIsInBhc3NUZXh0IiwidXJsVGV4dCIsInJlbWVtYmVyVGV4dCIsInRpdGxlVGV4dCIsInVzZXJUZXh0IiwiaW52YWxpZFVzZXJUZXh0IiwibWlzc2luZ1VzZXJUZXh0IiwicmVxdWVzdEFib3J0ZWRUZXh0IiwibG9nb1RleHQiLCJlcnJvclRleHQiLCJnZW5lcmFsIiwibG9nT25FcnJvciIsInN0YXR1cyIsIkVOVEVSX0tFWSIsIl9vbktleVByZXNzIiwiZXZ0IiwiY2hhck9yQ29kZSIsImF1dGhlbnRpY2F0ZSIsIl9vbktleVVwIiwidXNlcm5hbWUiLCJmaWVsZHMiLCJnZXRWYWx1ZSIsImxlbmd0aCIsIiQiLCJkb21Ob2RlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImluaXRTb2hvIiwiaGVhZGVyIiwiQXBwIiwiZ2V0Q29udGFpbmVyTm9kZSIsImhpZGUiLCJzaG93IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY29ubmVjdGlvblN0YXRlIiwiX2Rpc2FibGUiLCJzdGF0ZSIsImFwcFN0b3JlIiwiZ2V0U3RhdGUiLCJhcHAiLCJjb25maWciLCJlbmRwb2ludCIsInNldFZhbHVlIiwiZGlzYWJsZSIsInJlbWVtYmVyIiwibG9naW5CdXR0b24iLCJkaXNhYmxlZCIsIl9lbmFibGUiLCJlbmFibGUiLCJfdXBkYXRlQ29ubmVjdGlvblN0YXRlIiwib25saW5lIiwib25TaG93IiwiY3JlZGVudGlhbHMiLCJnZXRDcmVkZW50aWFscyIsImF1dGhlbnRpY2F0ZVVzZXIiLCJzdWNjZXNzIiwib25IYW5kbGVBdXRoZW50aWNhdGlvblN1Y2Nlc3MiLCJzY29wZSIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsImJiYXIiLCJ0YmFyIiwiZ2V0Q29udGV4dCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsIm5hbWUiLCJsYWJlbCIsInR5cGUiLCJyZXF1aXJlZCIsImlucHV0VHlwZSIsInZhbHVlcyIsImdldFZhbHVlcyIsInBhc3N3b3JkIiwidmFsaWRhdGVDcmVkZW50aWFscyIsImNyZWF0ZUVycm9ySGFuZGxlcnMiLCJIVFRQX1NUQVRVUyIsIkZPUkJJRERFTiIsImVycm9ySGFuZGxlcnMiLCJ0ZXN0IiwidGVzdE5vUmVzcG9uc2UiLCJlcnJvciIsInhociIsImhhbmRsZSIsImhhbmRsZU5vUmVzcG9uc2UiLCJuZXh0IiwiYWxlcnQiLCJ0ZXN0RXJyb3IiLCJoYW5kbGVFcnJvciIsImdldEVycm9yTWVzc2FnZSIsImRpc3BhdGNoIiwicGFnZSIsImxlbiIsImF0dHIiLCJhdHRyaWJ1dGVzIiwiZ2V0TmFtZWRJdGVtIiwidmFsdWUiLCJmYWlsdXJlIiwicmVzdWx0IiwiRXJyb3IiLCJyZXNwb25zZSIsImFib3J0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLE9BQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFPQSxNQUFNQyxVQUFVLHVCQUFRLGlCQUFSLEVBQTJCLGdCQUEzQixFQUFtQztBQUNqRDtBQUNBQyxvQkFBZ0IsSUFBSUMsUUFBSixDQUFhLHcxQkFBYixDQUZpQzs7QUFxQmpEQyxRQUFJLE9BckI2QztBQXNCakRDLFVBQU0sS0F0QjJDO0FBdUJqREMscUJBQWlCLEtBdkJnQztBQXdCakQ7QUFDQUMsbUJBQWVQLFNBQVNPLGFBekJ5QjtBQTBCakRDLGVBQVdSLFNBQVNRLFNBMUI2QjtBQTJCakRDLGNBQVVULFNBQVNTLFFBM0I4QjtBQTRCakRDLGFBQVNWLFNBQVNVLE9BNUIrQjtBQTZCakRDLGtCQUFjWCxTQUFTVyxZQTdCMEI7QUE4QmpEQyxlQUFXWixTQUFTWSxTQTlCNkI7QUErQmpEQyxjQUFVYixTQUFTYSxR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QVQsR0FBbUI7QUFDMUIsZUFBS3BELE1BQUw7QUFDQXFDLGdCQUFNLEtBQUsvRSxrQkFBWCxFQUYwQixDQUVLO0FBQ2hDLFNBMUIrQjtBQTJCaENtRCxlQUFPO0FBM0J5QixPQUFsQztBQTZCRDtBQXJOZ0QsR0FBbkMsQ0FBaEI7O29CQXdOZWxFLE8iLCJmaWxlIjoiTG9naW4uanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgeyBzZXRFbmRQb2ludCB9IGZyb20gJy4uL2FjdGlvbnMvY29uZmlnJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2xvZ2luJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5Mb2dpblxyXG4gKlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkxvZ2luJywgW0VkaXRdLCB7XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgd2lkZ2V0VGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbYFxyXG4gICAgICA8ZGl2IGlkPVwieyU9ICQuaWQgJX1cIiBkYXRhLXRpdGxlPVwieyU6ICQudGl0bGVUZXh0ICV9XCIgY2xhc3M9XCJ2aWV3XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cclxuICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwic2lnbmluXCIgcm9sZT1cIm1haW5cIj5cclxuICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDM0IDM0XCIgY2xhc3M9XCJpY29uIGljb24tbG9nb1wiIGZvY3VzYWJsZT1cImZhbHNlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgcm9sZT1cInByZXNlbnRhdGlvblwiIGFyaWEtbGFiZWw9XCJJbmZvciBMb2dvXCI+XHJcbiAgICAgICAgICAgICAgPHVzZSB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4bGluazpocmVmPVwiI2ljb24tbG9nb1wiPjwvdXNlPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPGgxPkluZm9yIENSTTwvaDE+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1jb250ZW50XCIgZGF0YS1kb2pvLWF0dGFjaC1ldmVudD1cIm9ua2V5cHJlc3M6IF9vbktleVByZXNzLCBvbmtleXVwOiBfb25LZXlVcFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJjb250ZW50Tm9kZVwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJsb2dpbkJ1dHRvblwiIGNsYXNzPVwiYnRuLXByaW1hcnkgaGlkZS1mb2N1c1wiIGRhdGEtYWN0aW9uPVwiYXV0aGVudGljYXRlXCI+eyU6ICQubG9nT25UZXh0ICV9PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgXSksXHJcblxyXG4gIGlkOiAnbG9naW4nLFxyXG4gIGJ1c3k6IGZhbHNlLFxyXG4gIG11bHRpQ29sdW1uVmlldzogZmFsc2UsXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgY29weXJpZ2h0VGV4dDogcmVzb3VyY2UuY29weXJpZ2h0VGV4dCxcclxuICBsb2dPblRleHQ6IHJlc291cmNlLmxvZ09uVGV4dCxcclxuICBwYXNzVGV4dDogcmVzb3VyY2UucGFzc1RleHQsXHJcbiAgdXJsVGV4dDogcmVzb3VyY2UudXJsVGV4dCxcclxuICByZW1lbWJlclRleHQ6IHJlc291cmNlLnJlbWVtYmVyVGV4dCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICB1c2VyVGV4dDogcmVzb3VyY2UudXNlclRleHQsXHJcbiAgaW52YWxpZFVzZXJUZXh0OiByZXNvdXJjZS5pbnZhbGlkVXNlclRleHQsXHJcbiAgbWlzc2luZ1VzZXJUZXh0OiByZXNvdXJjZS5taXNzaW5nVXNlclRleHQsXHJcbiAgcmVxdWVzdEFib3J0ZWRUZXh0OiByZXNvdXJjZS5yZXF1ZXN0QWJvcnRlZFRleHQsXHJcbiAgbG9nb1RleHQ6IHJlc291cmNlLmxvZ29UZXh0LFxyXG4gIGVycm9yVGV4dDoge1xyXG4gICAgZ2VuZXJhbDogcmVzb3VyY2UubG9nT25FcnJvcixcclxuICAgIHN0YXR1czoge30sXHJcbiAgfSxcclxuICBFTlRFUl9LRVk6IDEzLFxyXG5cclxuICBfb25LZXlQcmVzczogZnVuY3Rpb24gX29uS2V5UHJlc3MoZXZ0KSB7XHJcbiAgICBpZiAoZXZ0LmNoYXJPckNvZGUgPT09IHRoaXMuRU5URVJfS0VZKSB7XHJcbiAgICAgIHRoaXMuYXV0aGVudGljYXRlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfb25LZXlVcDogZnVuY3Rpb24gX29uS2V5VXAoKSB7XHJcbiAgICBjb25zdCB1c2VybmFtZSA9IHRoaXMuZmllbGRzWyd1c2VybmFtZS1kaXNwbGF5J10uZ2V0VmFsdWUoKTtcclxuICAgIGlmICh1c2VybmFtZSAmJiB1c2VybmFtZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICQodGhpcy5kb21Ob2RlKS5hZGRDbGFzcygnbG9naW4tYWN0aXZlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKHRoaXMuZG9tTm9kZSkucmVtb3ZlQ2xhc3MoJ2xvZ2luLWFjdGl2ZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW5pdFNvaG86IGZ1bmN0aW9uIGluaXRTb2hvKCkge1xyXG4gICAgY29uc3QgaGVhZGVyID0gJCgnLmhlYWRlcicsIEFwcC5nZXRDb250YWluZXJOb2RlKCkpO1xyXG4gICAgaGVhZGVyLmhpZGUoKTtcclxuICB9LFxyXG4gIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChzaG93LCBhcmd1bWVudHMpO1xyXG4gICAgaWYgKCF0aGlzLmNvbm5lY3Rpb25TdGF0ZSkge1xyXG4gICAgICB0aGlzLl9kaXNhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmFwcFN0b3JlLmdldFN0YXRlKCk7XHJcbiAgICBpZiAoc3RhdGUgJiYgc3RhdGUuYXBwICYmIHN0YXRlLmFwcC5jb25maWcuZW5kcG9pbnQpIHtcclxuICAgICAgdGhpcy5maWVsZHNbJ3VybC1kaXNwbGF5J10uc2V0VmFsdWUoc3RhdGUuYXBwLmNvbmZpZy5lbmRwb2ludCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfZGlzYWJsZTogZnVuY3Rpb24gX2Rpc2FibGUoKSB7XHJcbiAgICB0aGlzLmZpZWxkc1sndXNlcm5hbWUtZGlzcGxheSddLmRpc2FibGUoKTtcclxuICAgIHRoaXMuZmllbGRzWydwYXNzd29yZC1kaXNwbGF5J10uZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHNbJ3VybC1kaXNwbGF5J10uZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHMucmVtZW1iZXIuZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5sb2dpbkJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgfSxcclxuICBfZW5hYmxlOiBmdW5jdGlvbiBfZW5hYmxlKCkge1xyXG4gICAgdGhpcy5maWVsZHNbJ3VzZXJuYW1lLWRpc3BsYXknXS5lbmFibGUoKTtcclxuICAgIHRoaXMuZmllbGRzWydwYXNzd29yZC1kaXNwbGF5J10uZW5hYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkc1sndXJsLWRpc3BsYXknXS5lbmFibGUoKTtcclxuICAgIHRoaXMuZmllbGRzLnJlbWVtYmVyLmVuYWJsZSgpO1xyXG4gICAgdGhpcy5sb2dpbkJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIH0sXHJcbiAgX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZTogZnVuY3Rpb24gX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZShvbmxpbmUpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKF91cGRhdGVDb25uZWN0aW9uU3RhdGUsIGFyZ3VtZW50cyk7XHJcbiAgICBpZiAob25saW5lKSB7XHJcbiAgICAgIHRoaXMuX2VuYWJsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25TaG93OiBmdW5jdGlvbiBvblNob3coKSB7XHJcbiAgICBjb25zdCBjcmVkZW50aWFscyA9IEFwcC5nZXRDcmVkZW50aWFscygpO1xyXG5cclxuICAgIGlmIChjcmVkZW50aWFscykge1xyXG4gICAgICBBcHAuYXV0aGVudGljYXRlVXNlcihjcmVkZW50aWFscywge1xyXG4gICAgICAgIHN1Y2Nlc3M6IEFwcC5vbkhhbmRsZUF1dGhlbnRpY2F0aW9uU3VjY2VzcyxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVUb29sTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVUb29sTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMgfHwgKHRoaXMudG9vbHMgPSB7XHJcbiAgICAgIGJiYXI6IGZhbHNlLFxyXG4gICAgICB0YmFyOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0Q29udGV4dDogZnVuY3Rpb24gZ2V0Q29udGV4dCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlkOiB0aGlzLmlkLFxyXG4gICAgfTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIG5hbWU6ICd1c2VybmFtZS1kaXNwbGF5JyxcclxuICAgICAgbGFiZWw6IHRoaXMudXNlclRleHQsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdwYXNzd29yZC1kaXNwbGF5JyxcclxuICAgICAgbGFiZWw6IHRoaXMucGFzc1RleHQsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgaW5wdXRUeXBlOiAncGFzc3dvcmQnLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ3VybC1kaXNwbGF5JyxcclxuICAgICAgbGFiZWw6IHRoaXMudXJsVGV4dCxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ3JlbWVtYmVyJyxcclxuICAgICAgbGFiZWw6IHRoaXMucmVtZW1iZXJUZXh0LFxyXG4gICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICB9XSk7XHJcbiAgfSxcclxuICBhdXRoZW50aWNhdGU6IGZ1bmN0aW9uIGF1dGhlbnRpY2F0ZSgpIHtcclxuICAgIGlmICh0aGlzLmJ1c3kpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuZ2V0VmFsdWVzKCk7XHJcblxyXG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSB7XHJcbiAgICAgIHVzZXJuYW1lOiB2YWx1ZXNbJ3VzZXJuYW1lLWRpc3BsYXknXSxcclxuICAgICAgcGFzc3dvcmQ6IHZhbHVlc1sncGFzc3dvcmQtZGlzcGxheSddLFxyXG4gICAgICBlbmRwb2ludDogdmFsdWVzWyd1cmwtZGlzcGxheSddLFxyXG4gICAgICByZW1lbWJlcjogdmFsdWVzLnJlbWVtYmVyLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoY3JlZGVudGlhbHMudXNlcm5hbWUgJiYgY3JlZGVudGlhbHMuZW5kcG9pbnQpIHtcclxuICAgICAgdGhpcy52YWxpZGF0ZUNyZWRlbnRpYWxzKGNyZWRlbnRpYWxzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZUVycm9ySGFuZGxlcnM6IGZ1bmN0aW9uIGNyZWF0ZUVycm9ySGFuZGxlcnMoKSB7XHJcbiAgICB0aGlzLmVycm9yVGV4dC5zdGF0dXNbdGhpcy5IVFRQX1NUQVRVUy5GT1JCSURERU5dID0gdGhpcy5pbnZhbGlkVXNlclRleHQ7XHJcblxyXG4gICAgdGhpcy5lcnJvckhhbmRsZXJzID0gW3tcclxuICAgICAgbmFtZTogJ05vUmVzcG9uc2UnLFxyXG4gICAgICB0ZXN0OiBmdW5jdGlvbiB0ZXN0Tm9SZXNwb25zZShlcnJvcikge1xyXG4gICAgICAgIHJldHVybiAhZXJyb3IueGhyO1xyXG4gICAgICB9LFxyXG4gICAgICBoYW5kbGU6IGZ1bmN0aW9uIGhhbmRsZU5vUmVzcG9uc2UoZXJyb3IsIG5leHQpIHtcclxuICAgICAgICBhbGVydCh0aGlzLm1pc3NpbmdVc2VyVGV4dCk7Ly8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIG5leHQoKTtcclxuICAgICAgfSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0dlbmVyYWxFcnJvcicsXHJcbiAgICAgIHRlc3Q6IGZ1bmN0aW9uIHRlc3RFcnJvcihlcnJvcikge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgZXJyb3IueGhyICE9PSAndW5kZWZpbmVkJyAmJiBlcnJvci54aHIgIT09IG51bGw7XHJcbiAgICAgIH0sXHJcbiAgICAgIGhhbmRsZTogZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyb3IsIG5leHQpIHtcclxuICAgICAgICBhbGVydCh0aGlzLmdldEVycm9yTWVzc2FnZShlcnJvcikpOy8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICBuZXh0KCk7XHJcbiAgICAgIH0sXHJcbiAgICB9XTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXJzO1xyXG4gIH0sXHJcbiAgdmFsaWRhdGVDcmVkZW50aWFsczogZnVuY3Rpb24gdmFsaWRhdGVDcmVkZW50aWFscyhjcmVkZW50aWFscykge1xyXG4gICAgdGhpcy5kaXNhYmxlKCk7XHJcblxyXG4gICAgY29uc3QgZW5kcG9pbnQgPSBjcmVkZW50aWFscy5lbmRwb2ludDtcclxuICAgIHRoaXMuYXBwU3RvcmUuZGlzcGF0Y2goc2V0RW5kUG9pbnQoZW5kcG9pbnQpKTtcclxuICAgIEFwcC5hdXRoZW50aWNhdGVVc2VyKGNyZWRlbnRpYWxzLCB7XHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgLy8gTmVlZCB0byByZW1vdmUgTG9naW4gdmlldyBmcm9tIHBhZ2VqcyBzdGFja1xyXG4gICAgICAgIHBhZ2UubGVuLS07XHJcbiAgICAgICAgaWYgKHRoaXMuZmllbGRzLnJlbWVtYmVyLmdldFZhbHVlKCkgIT09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuZmllbGRzWyd1c2VybmFtZS1kaXNwbGF5J10uc2V0VmFsdWUoJycpO1xyXG4gICAgICAgICAgdGhpcy5maWVsZHNbJ3Bhc3N3b3JkLWRpc3BsYXknXS5zZXRWYWx1ZSgnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW5hYmxlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLmRvbU5vZGUuYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgaWYgKGF0dHIpIHtcclxuICAgICAgICAgIGF0dHIudmFsdWUgPSAnZmFsc2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBBcHAub25IYW5kbGVBdXRoZW50aWNhdGlvblN1Y2Nlc3MoKTtcclxuICAgICAgfSxcclxuICAgICAgZmFpbHVyZTogZnVuY3Rpb24gZmFpbHVyZShyZXN1bHQpIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSgpO1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCk7XHJcbiAgICAgICAgZXJyb3Iuc3RhdHVzID0gcmVzdWx0ICYmIHJlc3VsdC5yZXNwb25zZSAmJiByZXN1bHQucmVzcG9uc2Uuc3RhdHVzO1xyXG4gICAgICAgIGVycm9yLnhociA9IHJlc3VsdCAmJiByZXN1bHQucmVzcG9uc2U7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvcik7XHJcbiAgICAgIH0sXHJcbiAgICAgIGFib3J0ZWQ6IGZ1bmN0aW9uIGFib3J0ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5lbmFibGUoKTtcclxuICAgICAgICBhbGVydCh0aGlzLnJlcXVlc3RBYm9ydGVkVGV4dCk7Ly8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICB9LFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19