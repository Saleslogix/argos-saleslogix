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
      this.inherited(arguments);
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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9Mb2dpbi5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ3aWRnZXRUZW1wbGF0ZSIsIlNpbXBsYXRlIiwiaWQiLCJidXN5IiwibXVsdGlDb2x1bW5WaWV3IiwiY29weXJpZ2h0VGV4dCIsImxvZ09uVGV4dCIsInBhc3NUZXh0IiwidXJsVGV4dCIsInJlbWVtYmVyVGV4dCIsInRpdGxlVGV4dCIsInVzZXJUZXh0IiwiaW52YWxpZFVzZXJUZXh0IiwibWlzc2luZ1VzZXJUZXh0IiwicmVxdWVzdEFib3J0ZWRUZXh0IiwibG9nb1RleHQiLCJlcnJvclRleHQiLCJnZW5lcmFsIiwibG9nT25FcnJvciIsInN0YXR1cyIsIkVOVEVSX0tFWSIsIl9vbktleVByZXNzIiwiZXZ0IiwiY2hhck9yQ29kZSIsImF1dGhlbnRpY2F0ZSIsIl9vbktleVVwIiwidXNlcm5hbWUiLCJmaWVsZHMiLCJnZXRWYWx1ZSIsImxlbmd0aCIsIiQiLCJkb21Ob2RlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImluaXRTb2hvIiwiaGVhZGVyIiwiQXBwIiwiZ2V0Q29udGFpbmVyTm9kZSIsImhpZGUiLCJzaG93IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY29ubmVjdGlvblN0YXRlIiwiX2Rpc2FibGUiLCJzdGF0ZSIsImFwcFN0b3JlIiwiZ2V0U3RhdGUiLCJhcHAiLCJjb25maWciLCJlbmRwb2ludCIsInNldFZhbHVlIiwiZGlzYWJsZSIsInJlbWVtYmVyIiwibG9naW5CdXR0b24iLCJkaXNhYmxlZCIsIl9lbmFibGUiLCJlbmFibGUiLCJfdXBkYXRlQ29ubmVjdGlvblN0YXRlIiwib25saW5lIiwib25TaG93IiwiY3JlZGVudGlhbHMiLCJnZXRDcmVkZW50aWFscyIsImF1dGhlbnRpY2F0ZVVzZXIiLCJzdWNjZXNzIiwib25IYW5kbGVBdXRoZW50aWNhdGlvblN1Y2Nlc3MiLCJzY29wZSIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsImJiYXIiLCJ0YmFyIiwiZ2V0Q29udGV4dCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsIm5hbWUiLCJsYWJlbCIsInR5cGUiLCJyZXF1aXJlZCIsImlucHV0VHlwZSIsInZhbHVlcyIsImdldFZhbHVlcyIsInBhc3N3b3JkIiwidmFsaWRhdGVDcmVkZW50aWFscyIsImNyZWF0ZUVycm9ySGFuZGxlcnMiLCJIVFRQX1NUQVRVUyIsIkZPUkJJRERFTiIsImVycm9ySGFuZGxlcnMiLCJ0ZXN0IiwidGVzdE5vUmVzcG9uc2UiLCJlcnJvciIsInhociIsImhhbmRsZSIsImhhbmRsZU5vUmVzcG9uc2UiLCJuZXh0IiwiYWxlcnQiLCJ0ZXN0RXJyb3IiLCJoYW5kbGVFcnJvciIsImdldEVycm9yTWVzc2FnZSIsImRpc3BhdGNoIiwicGFnZSIsImxlbiIsImF0dHIiLCJhdHRyaWJ1dGVzIiwiZ2V0TmFtZWRJdGVtIiwidmFsdWUiLCJmYWlsdXJlIiwicmVzdWx0IiwiRXJyb3IiLCJyZXNwb25zZSIsImFib3J0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLE9BQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFPQSxNQUFNQyxVQUFVLHVCQUFRLGlCQUFSLEVBQTJCLGdCQUEzQixFQUFtQztBQUNqRDtBQUNBQyxvQkFBZ0IsSUFBSUMsUUFBSixDQUFhLHcxQkFBYixDQUZpQzs7QUFxQmpEQyxRQUFJLE9BckI2QztBQXNCakRDLFVBQU0sS0F0QjJDO0FBdUJqREMscUJBQWlCLEtBdkJnQztBQXdCakQ7QUFDQUMsbUJBQWVQLFNBQVNPLGFBekJ5QjtBQTBCakRDLGVBQVdSLFNBQVNRLFNBMUI2QjtBQTJCakRDLGNBQVVULFNBQVNTLFFBM0I4QjtBQTRCakRDLGFBQVNWLFNBQVNVLE9BNUIrQjtBQTZCakRDLGtCQUFjWCxTQUFTVyxZQTdCMEI7QUE4QmpEQyxlQUFXWixTQUFTWSxTQTlCNkI7QUErQmpEQyxjQUFVYixTQUFTYSxR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Q0FxQyxnQkFBTSxLQUFLL0Usa0JBQVgsRUFGMEIsQ0FFSztBQUNoQyxTQTFCK0I7QUEyQmhDbUQsZUFBTztBQTNCeUIsT0FBbEM7QUE2QkQ7QUFyTmdELEdBQW5DLENBQWhCOztvQkF3TmVsRSxPIiwiZmlsZSI6IkxvZ2luLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IHsgc2V0RW5kUG9pbnQgfSBmcm9tICcuLi9hY3Rpb25zL2NvbmZpZyc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdsb2dpbicpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuTG9naW5cclxuICpcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5Mb2dpbicsIFtFZGl0XSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIHdpZGdldFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW2BcclxuICAgICAgPGRpdiBpZD1cInslPSAkLmlkICV9XCIgZGF0YS10aXRsZT1cInslOiAkLnRpdGxlVGV4dCAlfVwiIGNsYXNzPVwidmlld1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XHJcbiAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cInNpZ25pblwiIHJvbGU9XCJtYWluXCI+XHJcbiAgICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAzNCAzNFwiIGNsYXNzPVwiaWNvbiBpY29uLWxvZ29cIiBmb2N1c2FibGU9XCJmYWxzZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBhcmlhLWxhYmVsPVwiSW5mb3IgTG9nb1wiPlxyXG4gICAgICAgICAgICAgIDx1c2UgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeGxpbms6aHJlZj1cIiNpY29uLWxvZ29cIj48L3VzZT5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgIDxoMT5JbmZvciBDUk08L2gxPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtY29udGVudFwiIGRhdGEtZG9qby1hdHRhY2gtZXZlbnQ9XCJvbmtleXByZXNzOiBfb25LZXlQcmVzcywgb25rZXl1cDogX29uS2V5VXBcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiY29udGVudE5vZGVcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwibG9naW5CdXR0b25cIiBjbGFzcz1cImJ0bi1wcmltYXJ5IGhpZGUtZm9jdXNcIiBkYXRhLWFjdGlvbj1cImF1dGhlbnRpY2F0ZVwiPnslOiAkLmxvZ09uVGV4dCAlfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gIF0pLFxyXG5cclxuICBpZDogJ2xvZ2luJyxcclxuICBidXN5OiBmYWxzZSxcclxuICBtdWx0aUNvbHVtblZpZXc6IGZhbHNlLFxyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGNvcHlyaWdodFRleHQ6IHJlc291cmNlLmNvcHlyaWdodFRleHQsXHJcbiAgbG9nT25UZXh0OiByZXNvdXJjZS5sb2dPblRleHQsXHJcbiAgcGFzc1RleHQ6IHJlc291cmNlLnBhc3NUZXh0LFxyXG4gIHVybFRleHQ6IHJlc291cmNlLnVybFRleHQsXHJcbiAgcmVtZW1iZXJUZXh0OiByZXNvdXJjZS5yZW1lbWJlclRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgdXNlclRleHQ6IHJlc291cmNlLnVzZXJUZXh0LFxyXG4gIGludmFsaWRVc2VyVGV4dDogcmVzb3VyY2UuaW52YWxpZFVzZXJUZXh0LFxyXG4gIG1pc3NpbmdVc2VyVGV4dDogcmVzb3VyY2UubWlzc2luZ1VzZXJUZXh0LFxyXG4gIHJlcXVlc3RBYm9ydGVkVGV4dDogcmVzb3VyY2UucmVxdWVzdEFib3J0ZWRUZXh0LFxyXG4gIGxvZ29UZXh0OiByZXNvdXJjZS5sb2dvVGV4dCxcclxuICBlcnJvclRleHQ6IHtcclxuICAgIGdlbmVyYWw6IHJlc291cmNlLmxvZ09uRXJyb3IsXHJcbiAgICBzdGF0dXM6IHt9LFxyXG4gIH0sXHJcbiAgRU5URVJfS0VZOiAxMyxcclxuXHJcbiAgX29uS2V5UHJlc3M6IGZ1bmN0aW9uIF9vbktleVByZXNzKGV2dCkge1xyXG4gICAgaWYgKGV2dC5jaGFyT3JDb2RlID09PSB0aGlzLkVOVEVSX0tFWSkge1xyXG4gICAgICB0aGlzLmF1dGhlbnRpY2F0ZSgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX29uS2V5VXA6IGZ1bmN0aW9uIF9vbktleVVwKCkge1xyXG4gICAgY29uc3QgdXNlcm5hbWUgPSB0aGlzLmZpZWxkc1sndXNlcm5hbWUtZGlzcGxheSddLmdldFZhbHVlKCk7XHJcbiAgICBpZiAodXNlcm5hbWUgJiYgdXNlcm5hbWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAkKHRoaXMuZG9tTm9kZSkuYWRkQ2xhc3MoJ2xvZ2luLWFjdGl2ZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCh0aGlzLmRvbU5vZGUpLnJlbW92ZUNsYXNzKCdsb2dpbi1hY3RpdmUnKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGluaXRTb2hvOiBmdW5jdGlvbiBpbml0U29obygpIHtcclxuICAgIGNvbnN0IGhlYWRlciA9ICQoJy5oZWFkZXInLCBBcHAuZ2V0Q29udGFpbmVyTm9kZSgpKTtcclxuICAgIGhlYWRlci5oaWRlKCk7XHJcbiAgfSxcclxuICBzaG93OiBmdW5jdGlvbiBzaG93KCkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIGlmICghdGhpcy5jb25uZWN0aW9uU3RhdGUpIHtcclxuICAgICAgdGhpcy5fZGlzYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5hcHBTdG9yZS5nZXRTdGF0ZSgpO1xyXG4gICAgaWYgKHN0YXRlICYmIHN0YXRlLmFwcCAmJiBzdGF0ZS5hcHAuY29uZmlnLmVuZHBvaW50KSB7XHJcbiAgICAgIHRoaXMuZmllbGRzWyd1cmwtZGlzcGxheSddLnNldFZhbHVlKHN0YXRlLmFwcC5jb25maWcuZW5kcG9pbnQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2Rpc2FibGU6IGZ1bmN0aW9uIF9kaXNhYmxlKCkge1xyXG4gICAgdGhpcy5maWVsZHNbJ3VzZXJuYW1lLWRpc3BsYXknXS5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkc1sncGFzc3dvcmQtZGlzcGxheSddLmRpc2FibGUoKTtcclxuICAgIHRoaXMuZmllbGRzWyd1cmwtZGlzcGxheSddLmRpc2FibGUoKTtcclxuICAgIHRoaXMuZmllbGRzLnJlbWVtYmVyLmRpc2FibGUoKTtcclxuICAgIHRoaXMubG9naW5CdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gIH0sXHJcbiAgX2VuYWJsZTogZnVuY3Rpb24gX2VuYWJsZSgpIHtcclxuICAgIHRoaXMuZmllbGRzWyd1c2VybmFtZS1kaXNwbGF5J10uZW5hYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkc1sncGFzc3dvcmQtZGlzcGxheSddLmVuYWJsZSgpO1xyXG4gICAgdGhpcy5maWVsZHNbJ3VybC1kaXNwbGF5J10uZW5hYmxlKCk7XHJcbiAgICB0aGlzLmZpZWxkcy5yZW1lbWJlci5lbmFibGUoKTtcclxuICAgIHRoaXMubG9naW5CdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICB9LFxyXG4gIF91cGRhdGVDb25uZWN0aW9uU3RhdGU6IGZ1bmN0aW9uIF91cGRhdGVDb25uZWN0aW9uU3RhdGUob25saW5lKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgaWYgKG9ubGluZSkge1xyXG4gICAgICB0aGlzLl9lbmFibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2Rpc2FibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uU2hvdzogZnVuY3Rpb24gb25TaG93KCkge1xyXG4gICAgY29uc3QgY3JlZGVudGlhbHMgPSBBcHAuZ2V0Q3JlZGVudGlhbHMoKTtcclxuXHJcbiAgICBpZiAoY3JlZGVudGlhbHMpIHtcclxuICAgICAgQXBwLmF1dGhlbnRpY2F0ZVVzZXIoY3JlZGVudGlhbHMsIHtcclxuICAgICAgICBzdWNjZXNzOiBBcHAub25IYW5kbGVBdXRoZW50aWNhdGlvblN1Y2Nlc3MsXHJcbiAgICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICBiYmFyOiBmYWxzZSxcclxuICAgICAgdGJhcjogZmFsc2UsXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGdldENvbnRleHQ6IGZ1bmN0aW9uIGdldENvbnRleHQoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogdGhpcy5pZCxcclxuICAgIH07XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICBuYW1lOiAndXNlcm5hbWUtZGlzcGxheScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnVzZXJUZXh0LFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAncGFzc3dvcmQtZGlzcGxheScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnBhc3NUZXh0LFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIGlucHV0VHlwZTogJ3Bhc3N3b3JkJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICd1cmwtZGlzcGxheScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnVybFRleHQsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdyZW1lbWJlcicsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnJlbWVtYmVyVGV4dCxcclxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbiAgYXV0aGVudGljYXRlOiBmdW5jdGlvbiBhdXRoZW50aWNhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5idXN5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmdldFZhbHVlcygpO1xyXG5cclxuICAgIGNvbnN0IGNyZWRlbnRpYWxzID0ge1xyXG4gICAgICB1c2VybmFtZTogdmFsdWVzWyd1c2VybmFtZS1kaXNwbGF5J10sXHJcbiAgICAgIHBhc3N3b3JkOiB2YWx1ZXNbJ3Bhc3N3b3JkLWRpc3BsYXknXSxcclxuICAgICAgZW5kcG9pbnQ6IHZhbHVlc1sndXJsLWRpc3BsYXknXSxcclxuICAgICAgcmVtZW1iZXI6IHZhbHVlcy5yZW1lbWJlcixcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGNyZWRlbnRpYWxzLnVzZXJuYW1lICYmIGNyZWRlbnRpYWxzLmVuZHBvaW50KSB7XHJcbiAgICAgIHRoaXMudmFsaWRhdGVDcmVkZW50aWFscyhjcmVkZW50aWFscyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjcmVhdGVFcnJvckhhbmRsZXJzOiBmdW5jdGlvbiBjcmVhdGVFcnJvckhhbmRsZXJzKCkge1xyXG4gICAgdGhpcy5lcnJvclRleHQuc3RhdHVzW3RoaXMuSFRUUF9TVEFUVVMuRk9SQklEREVOXSA9IHRoaXMuaW52YWxpZFVzZXJUZXh0O1xyXG5cclxuICAgIHRoaXMuZXJyb3JIYW5kbGVycyA9IFt7XHJcbiAgICAgIG5hbWU6ICdOb1Jlc3BvbnNlJyxcclxuICAgICAgdGVzdDogZnVuY3Rpb24gdGVzdE5vUmVzcG9uc2UoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gIWVycm9yLnhocjtcclxuICAgICAgfSxcclxuICAgICAgaGFuZGxlOiBmdW5jdGlvbiBoYW5kbGVOb1Jlc3BvbnNlKGVycm9yLCBuZXh0KSB7XHJcbiAgICAgICAgYWxlcnQodGhpcy5taXNzaW5nVXNlclRleHQpOy8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICBuZXh0KCk7XHJcbiAgICAgIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdHZW5lcmFsRXJyb3InLFxyXG4gICAgICB0ZXN0OiBmdW5jdGlvbiB0ZXN0RXJyb3IoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIGVycm9yLnhociAhPT0gJ3VuZGVmaW5lZCcgJiYgZXJyb3IueGhyICE9PSBudWxsO1xyXG4gICAgICB9LFxyXG4gICAgICBoYW5kbGU6IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yLCBuZXh0KSB7XHJcbiAgICAgICAgYWxlcnQodGhpcy5nZXRFcnJvck1lc3NhZ2UoZXJyb3IpKTsvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgbmV4dCgpO1xyXG4gICAgICB9LFxyXG4gICAgfV07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZXJyb3JIYW5kbGVycztcclxuICB9LFxyXG4gIHZhbGlkYXRlQ3JlZGVudGlhbHM6IGZ1bmN0aW9uIHZhbGlkYXRlQ3JlZGVudGlhbHMoY3JlZGVudGlhbHMpIHtcclxuICAgIHRoaXMuZGlzYWJsZSgpO1xyXG5cclxuICAgIGNvbnN0IGVuZHBvaW50ID0gY3JlZGVudGlhbHMuZW5kcG9pbnQ7XHJcbiAgICB0aGlzLmFwcFN0b3JlLmRpc3BhdGNoKHNldEVuZFBvaW50KGVuZHBvaW50KSk7XHJcbiAgICBBcHAuYXV0aGVudGljYXRlVXNlcihjcmVkZW50aWFscywge1xyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKCkge1xyXG4gICAgICAgIC8vIE5lZWQgdG8gcmVtb3ZlIExvZ2luIHZpZXcgZnJvbSBwYWdlanMgc3RhY2tcclxuICAgICAgICBwYWdlLmxlbi0tO1xyXG4gICAgICAgIGlmICh0aGlzLmZpZWxkcy5yZW1lbWJlci5nZXRWYWx1ZSgpICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICB0aGlzLmZpZWxkc1sndXNlcm5hbWUtZGlzcGxheSddLnNldFZhbHVlKCcnKTtcclxuICAgICAgICAgIHRoaXMuZmllbGRzWydwYXNzd29yZC1kaXNwbGF5J10uc2V0VmFsdWUoJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVuYWJsZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBhdHRyID0gdGhpcy5kb21Ob2RlLmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIGlmIChhdHRyKSB7XHJcbiAgICAgICAgICBhdHRyLnZhbHVlID0gJ2ZhbHNlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgQXBwLm9uSGFuZGxlQXV0aGVudGljYXRpb25TdWNjZXNzKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWx1cmU6IGZ1bmN0aW9uIGZhaWx1cmUocmVzdWx0KSB7XHJcbiAgICAgICAgdGhpcy5lbmFibGUoKTtcclxuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcigpO1xyXG4gICAgICAgIGVycm9yLnN0YXR1cyA9IHJlc3VsdCAmJiByZXN1bHQucmVzcG9uc2UgJiYgcmVzdWx0LnJlc3BvbnNlLnN0YXR1cztcclxuICAgICAgICBlcnJvci54aHIgPSByZXN1bHQgJiYgcmVzdWx0LnJlc3BvbnNlO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpO1xyXG4gICAgICB9LFxyXG4gICAgICBhYm9ydGVkOiBmdW5jdGlvbiBhYm9ydGVkKCkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlKCk7XHJcbiAgICAgICAgYWxlcnQodGhpcy5yZXF1ZXN0QWJvcnRlZFRleHQpOy8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgfSxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9KTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==