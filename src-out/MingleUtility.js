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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NaW5nbGVVdGlsaXR5LmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJzZXRPYmplY3QiLCJhY2Nlc3NUb2tlbiIsInJlZnJlc2hBY2Nlc3NUb2tlbiIsImFwcENvbmZpZyIsIkFwcCIsImlzT25saW5lIiwicmVxdWlyZXNNaW5nbGVSZWZyZXNoIiwiaGFzaCIsInN0YXRlIiwicmVkaXJlY3RUb01pbmdsZSIsInBvcHVsYXRlQWNjZXNzVG9rZW4iLCJsb2NhdGlvbiIsInN1YnN0cmluZyIsInJlc3VsdCIsInNwbGl0IiwicmVkdWNlIiwidmFsdWVzIiwiaXRlbSIsInBhcnRzIiwiYWNjZXNzX3Rva2VuIiwiZXhwaXJlc19pbiIsInNldFRpbWVvdXQiLCJyZXNvdXJjZSIsInRvYXN0IiwiYWRkIiwibWVzc2FnZSIsInJlZnJlc2hUZXh0IiwidGl0bGUiLCJyZWZyZXNoVGl0bGUiLCJ0b2FzdFRpbWUiLCJzaG93UHJvZ3Jlc3NCYXIiLCJlcnJvciIsImF1dGhvcml6YXRpb25VcmwiLCJtaW5nbGVTZXR0aW5ncyIsInB1Iiwib2EiLCJyZWRpcmVjdFVSSSIsIm1pbmdsZVJlZGlyZWN0VXJsIiwiY2xpZW50SWQiLCJjaSIsInJlc3BvbnNlVHlwZSIsInVybCIsImVuY29kZVVSSSIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOzs7O0FBSUEsTUFBTUEsVUFBVSxlQUFLQyxTQUFMLENBQWUsbUJBQWYsRUFBb0M7QUFDbERDLGlCQUFhLEVBRHFDOztBQUdsREMsc0JBSGtELDhCQUcvQkMsU0FIK0IsRUFHcEI7QUFDNUIsVUFBSSxDQUFDQyxJQUFJQyxRQUFKLEVBQUwsRUFBcUI7QUFDbkJELFlBQUlFLHFCQUFKLEdBQTRCLElBQTVCO0FBQ0E7QUFDRDs7QUFFRCxVQUFNQyxPQUFPLGVBQWIsQ0FONEIsQ0FNRTtBQUM5QixVQUFJQyxRQUFRLEVBQVo7QUFDQSxVQUFJRCxJQUFKLEVBQVU7QUFDUkMsaUNBQXVCRCxJQUF2QjtBQUNEO0FBQ0QsV0FBS0UsZ0JBQUwsQ0FBc0JOLFNBQXRCLEVBQWlDSyxLQUFqQztBQUNELEtBZmlEO0FBZ0JsREUsdUJBaEJrRCwrQkFnQjlCUCxTQWhCOEIsRUFnQm5CO0FBQUE7O0FBQzdCLFVBQU1JLE9BQU9JLFNBQVNKLElBQVQsQ0FBY0ssU0FBZCxDQUF3QixDQUF4QixDQUFiO0FBQ0EsVUFBSUMsZUFBSjtBQUNBLFVBQUlOLElBQUosRUFBVTtBQUNSTSxpQkFBU04sS0FBS08sS0FBTCxDQUFXLEdBQVgsRUFBZ0JDLE1BQWhCLENBQXVCLFVBQUNDLE1BQUQsRUFBU0MsSUFBVCxFQUFrQjtBQUNoRCxjQUFNQyxRQUFRRCxLQUFLSCxLQUFMLENBQVcsR0FBWCxDQUFkO0FBQ0FFLGlCQUFPRSxNQUFNLENBQU4sQ0FBUCxJQUFtQkEsTUFBTSxDQUFOLENBQW5CO0FBQ0EsaUJBQU9GLE1BQVA7QUFDRCxTQUpRLEVBSU4sRUFKTSxDQUFUOztBQU1BLFlBQUlILE9BQU9NLFlBQVgsRUFBeUI7QUFDdkIsZUFBS2xCLFdBQUwsR0FBbUJZLE9BQU9NLFlBQTFCO0FBQ0EsY0FBSU4sT0FBT08sVUFBWCxFQUF1QjtBQUNyQjtBQUNBQyx1QkFBVyxZQUFNO0FBQ2Ysa0JBQU1DLFdBQVcsb0JBQVksUUFBWixDQUFqQjtBQUNBbEIsa0JBQUltQixLQUFKLENBQVVDLEdBQVYsQ0FBYyxFQUFFQyxTQUFTSCxTQUFTSSxXQUFwQixFQUFpQ0MsT0FBT0wsU0FBU00sWUFBakQsRUFBK0RDLFdBQVcsTUFBTSxJQUFoRixFQUFzRkMsaUJBQWlCLElBQXZHLEVBQWQ7QUFDQVQseUJBQVcsWUFBTTtBQUFFLHNCQUFLbkIsa0JBQUwsQ0FBd0JDLFNBQXhCO0FBQXFDLGVBQXhELEVBQTBELE1BQU0sSUFBaEU7QUFDQTtBQUNELGFBTEQsRUFLRyxDQUFDVSxPQUFPTyxVQUFQLEdBQW9CLEdBQXJCLElBQTRCLElBTC9CO0FBTUQ7QUFDRjtBQUNGOztBQUVELFVBQUlQLE1BQUosRUFBWTtBQUNWLFlBQUlBLE9BQU9NLFlBQVAsSUFBdUJOLE9BQU9rQixLQUFsQyxFQUF5QztBQUN2QyxpQkFBT2xCLE1BQVA7QUFDRDtBQUNGOztBQUVELFdBQUtKLGdCQUFMLENBQXNCTixTQUF0QixFQUFpQ0ksSUFBakM7QUFDRCxLQS9DaUQ7QUFnRGxERSxvQkFoRGtELDRCQWdEakNOLFNBaERpQyxFQWdEdEJLLEtBaERzQixFQWdEZjtBQUNqQyxVQUFNd0IsbUJBQW1CN0IsVUFBVThCLGNBQVYsQ0FBeUJDLEVBQXpCLEdBQThCL0IsVUFBVThCLGNBQVYsQ0FBeUJFLEVBQWhGO0FBQ0EsVUFBTUMsY0FBY2pDLFVBQVVrQyxpQkFBOUI7QUFDQSxVQUFNQyxXQUFXbkMsVUFBVThCLGNBQVYsQ0FBeUJNLEVBQTFDO0FBQ0EsVUFBTUMsZUFBZSxPQUFyQjtBQUNBLFVBQU1DLE1BQ0lULGdCQUFILHlCQUNhVSxVQUFVSixRQUFWLENBRGIsNkJBRWdCSSxVQUFVTixXQUFWLENBRmhCLDhCQUdpQk0sVUFBVUYsWUFBVixDQUhqQixzQkFJU0UsVUFBVWxDLEtBQVYsQ0FKVCxVQUtBLDhCQU5QO0FBT0FtQyxhQUFPaEMsUUFBUCxHQUFrQjhCLEdBQWxCO0FBQ0Q7QUE3RGlELEdBQXBDLENBQWhCLEMsQ0F4QkE7Ozs7Ozs7Ozs7Ozs7OztvQkF1RmUxQyxPIiwiZmlsZSI6Ik1pbmdsZVV0aWxpdHkuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgJ2Rvam8vc25pZmYnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uTWluZ2xlVXRpbGl0eVxyXG4gKiBAc2luZ2xldG9uXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gbGFuZy5zZXRPYmplY3QoJ2NybS5NaW5nbGVVdGlsaXR5Jywge1xyXG4gIGFjY2Vzc1Rva2VuOiAnJyxcclxuXHJcbiAgcmVmcmVzaEFjY2Vzc1Rva2VuKGFwcENvbmZpZykge1xyXG4gICAgaWYgKCFBcHAuaXNPbmxpbmUoKSkge1xyXG4gICAgICBBcHAucmVxdWlyZXNNaW5nbGVSZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhhc2ggPSAnbWluZ2xlUmVmcmVzaCc7IC8vIGxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDIpO1xyXG4gICAgbGV0IHN0YXRlID0gJyc7XHJcbiAgICBpZiAoaGFzaCkge1xyXG4gICAgICBzdGF0ZSA9IGAvcmVkaXJlY3RUby8ke2hhc2h9YDtcclxuICAgIH1cclxuICAgIHRoaXMucmVkaXJlY3RUb01pbmdsZShhcHBDb25maWcsIHN0YXRlKTtcclxuICB9LFxyXG4gIHBvcHVsYXRlQWNjZXNzVG9rZW4oYXBwQ29uZmlnKSB7XHJcbiAgICBjb25zdCBoYXNoID0gbG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSk7XHJcbiAgICBsZXQgcmVzdWx0O1xyXG4gICAgaWYgKGhhc2gpIHtcclxuICAgICAgcmVzdWx0ID0gaGFzaC5zcGxpdCgnJicpLnJlZHVjZSgodmFsdWVzLCBpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFydHMgPSBpdGVtLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgdmFsdWVzW3BhcnRzWzBdXSA9IHBhcnRzWzFdO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICAgIH0sIHt9KTtcclxuXHJcbiAgICAgIGlmIChyZXN1bHQuYWNjZXNzX3Rva2VuKSB7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IHJlc3VsdC5hY2Nlc3NfdG9rZW47XHJcbiAgICAgICAgaWYgKHJlc3VsdC5leHBpcmVzX2luKSB7XHJcbiAgICAgICAgICAvLyByZXN1bHQuZXhwaXJlc19pbiA9ICc0MjAnOyAvLyBSZWZyZXNoIFRlc3RcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdtaW5nbGUnKTtcclxuICAgICAgICAgICAgQXBwLnRvYXN0LmFkZCh7IG1lc3NhZ2U6IHJlc291cmNlLnJlZnJlc2hUZXh0LCB0aXRsZTogcmVzb3VyY2UucmVmcmVzaFRpdGxlLCB0b2FzdFRpbWU6IDMwMCAqIDEwMDAsIHNob3dQcm9ncmVzc0JhcjogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMucmVmcmVzaEFjY2Vzc1Rva2VuKGFwcENvbmZpZyk7IH0sIDMwMCAqIDEwMDApO1xyXG4gICAgICAgICAgICAvLyBTaG93IG1lc3NhZ2UgdG8gdXNlciBiZWZvcmUgNSBtaW51dGVzIG9mIHJlZnJlc2ggKDMwMCBzZWNvbmRzKVxyXG4gICAgICAgICAgfSwgKHJlc3VsdC5leHBpcmVzX2luIC0gMzAwKSAqIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgaWYgKHJlc3VsdC5hY2Nlc3NfdG9rZW4gfHwgcmVzdWx0LmVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVkaXJlY3RUb01pbmdsZShhcHBDb25maWcsIGhhc2gpO1xyXG4gIH0sXHJcbiAgcmVkaXJlY3RUb01pbmdsZShhcHBDb25maWcsIHN0YXRlKSB7XHJcbiAgICBjb25zdCBhdXRob3JpemF0aW9uVXJsID0gYXBwQ29uZmlnLm1pbmdsZVNldHRpbmdzLnB1ICsgYXBwQ29uZmlnLm1pbmdsZVNldHRpbmdzLm9hO1xyXG4gICAgY29uc3QgcmVkaXJlY3RVUkkgPSBhcHBDb25maWcubWluZ2xlUmVkaXJlY3RVcmw7XHJcbiAgICBjb25zdCBjbGllbnRJZCA9IGFwcENvbmZpZy5taW5nbGVTZXR0aW5ncy5jaTtcclxuICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9ICd0b2tlbic7XHJcbiAgICBjb25zdCB1cmwgPVxyXG4gICAgICAgICAgIGAke2F1dGhvcml6YXRpb25Vcmx9P2AgK1xyXG4gICAgICAgICAgIGBjbGllbnRfaWQ9JHtlbmNvZGVVUkkoY2xpZW50SWQpfSZgICtcclxuICAgICAgICAgICBgcmVkaXJlY3RfdXJpPSR7ZW5jb2RlVVJJKHJlZGlyZWN0VVJJKX0mYCArXHJcbiAgICAgICAgICAgYHJlc3BvbnNlX3R5cGU9JHtlbmNvZGVVUkkocmVzcG9uc2VUeXBlKX0mYCArXHJcbiAgICAgICAgICAgYHN0YXRlPSR7ZW5jb2RlVVJJKHN0YXRlKX0mYCArXHJcbiAgICAgICAgICAgJ2luY2x1ZGVfZ3JhbnRlZF9zY29wZXM9ZmFsc2UnO1xyXG4gICAgd2luZG93LmxvY2F0aW9uID0gdXJsO1xyXG4gIH0sXHJcbn0pO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=