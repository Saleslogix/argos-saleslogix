define('crm/reducers/config', ['exports', '../actions/config'], function (exports, _config) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.config = config;


  // TODO: Refactor the settings passed into the app to use these instead.
  var initialConfigState = {
    connections: null,
    endpoint: '',
    maxUploadFileSize: 40000000,
    enableUpdateNotification: false,
    enableMultiCurrency: false,
    enableGroups: true,
    enableHashTags: true,
    enableConcurrencyCheck: false,
    enableOfflineSupport: false,
    warehouseDiscovery: 'auto',
    enableMingle: false,
    mingleSettings: null,
    mingleRedirectUrl: ''
  }; /* Copyright 2017 Infor
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

  function config() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialConfigState;
    var action = arguments[1];
    var type = action.type,
        payload = action.payload,
        error = action.error,
        meta = action.meta;
    // eslint-disable-line
    switch (type) {
      case _config.SET_CONFIG:
        return Object.assign({}, state, payload.config);
      case _config.SET_ENDPOINT:
        return Object.assign({}, state, {
          endpoint: payload.url
        });
      default:
        return state;
    }
  }
});