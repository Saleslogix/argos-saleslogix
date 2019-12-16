define('crm/MingleUtility', ['module', 'exports', 'dojo/_base/lang', 'argos/I18n', 'dojo/sniff'], function (module, exports, _lang, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.MingleUtility
   * @singleton
   */
  var __class = _lang2.default.setObject('crm.MingleUtility', {
    accessToken: '',

    refreshAccessToken: function refreshAccessToken(appConfig) {
      if (!App.isOnline()) {
        App.requiresMingleRefresh = true;
        return;
      }

      var hash = 'mingleRefresh'; // location.hash.substring(2);
      var state = '';
      if (hash) {
        state = '/redirectTo/' + hash;
      }
      this.redirectToMingle(appConfig, state);
    },
    populateAccessToken: function populateAccessToken(appConfig) {
      var _this = this;

      var hash = location.hash.substring(1);
      var result = void 0;
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
              var resource = (0, _I18n2.default)('mingle');
              App.toast.add({ message: resource.refreshText, title: resource.refreshTitle, toastTime: 300 * 1000, showProgressBar: true });
              setTimeout(function () {
                _this.refreshAccessToken(appConfig);
              }, 300 * 1000);
              // Show message to user before 5 minutes of refresh (300 seconds)
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
      var url = authorizationUrl + '?' + ('client_id=' + encodeURI(clientId) + '&') + ('redirect_uri=' + encodeURI(redirectURI) + '&') + ('response_type=' + encodeURI(responseType) + '&') + ('state=' + encodeURI(state) + '&') + 'include_granted_scopes=false';
      window.location = url;
    }
  }); /* Copyright 2017 Infor
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

  exports.default = __class;
  module.exports = exports['default'];
});