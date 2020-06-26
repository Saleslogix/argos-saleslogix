define("crm/MingleUtility", ["exports", "dojo/_base/lang", "dojo/sniff", "argos/I18n"], function (_exports, _lang, _sniff, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _lang = _interopRequireDefault(_lang);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
   * @module crm/MingleUtility
   */

  /**
   * @class
   * @alias module:crm/MingleUtility
   * @static
   */
  var __class = _lang["default"].setObject('crm.MingleUtility',
  /** @lends module:crm/MingleUtility */
  {
    accessToken: '',
    refreshAccessToken: function refreshAccessToken(appConfig) {
      if (!App.isOnline()) {
        App.requiresMingleRefresh = true;
        return;
      }

      var hash = 'mingleRefresh'; // location.hash.substring(2);

      var state = '';

      if (hash) {
        state = "/redirectTo/".concat(hash);
      }

      this.redirectToMingle(appConfig, state);
    },
    populateAccessToken: function populateAccessToken(appConfig) {
      var _this = this;

      var hash = location.hash.substring(1);
      var result;

      if (hash) {
        result = hash.split('&').reduce(function (values, item) {
          var parts = item.split('=');
          values[parts[0]] = parts[1];
          return values;
        }, {});

        if (result.access_token) {
          this.accessToken = result.access_token;

          if (result.expires_in) {
            // result.expires_in = '420'; // Refresh Test
            setTimeout(function () {
              var resource = (0, _I18n["default"])('mingle');
              App.toast.add({
                message: resource.refreshText,
                title: resource.refreshTitle,
                toastTime: 300 * 1000,
                showProgressBar: true
              });
              setTimeout(function () {
                _this.refreshAccessToken(appConfig);
              }, 300 * 1000); // Show message to user before 5 minutes of refresh (300 seconds)
            }, (result.expires_in - 300) * 1000);
          }
        }
      }

      if (result) {
        if (result.access_token || result.error) {
          return result;
        }
      }

      this.redirectToMingle(appConfig, hash);
    },
    redirectToMingle: function redirectToMingle(appConfig, state) {
      var authorizationUrl = appConfig.mingleSettings.pu + appConfig.mingleSettings.oa;
      var redirectURI = appConfig.mingleRedirectUrl;
      var clientId = appConfig.mingleSettings.ci;
      var responseType = 'token';
      var url = "".concat(authorizationUrl, "?") + "client_id=".concat(encodeURI(clientId), "&") + "redirect_uri=".concat(encodeURI(redirectURI), "&") + "response_type=".concat(encodeURI(responseType), "&") + "state=".concat(encodeURI(state), "&") + 'include_granted_scopes=false';
      window.location = url;
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});