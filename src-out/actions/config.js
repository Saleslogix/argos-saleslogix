define('crm/actions/config', ['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setConfig = setConfig;
  exports.setEndPoint = setEndPoint;
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

  // action Types
  var SET_CONFIG = exports.SET_CONFIG = 'SET_CONFIG';
  var SET_ENDPOINT = exports.SET_ENDPOINT = 'SET_ENDPOINT';

  /*
  
  See: https://github.com/acdlite/flux-standard-action
  
  An action MUST
  + be a plain JavaScript object.
  + have a type property.
  
   An action MAY
  + have an error property.
  + have a payload property.
  + have a meta property.
  
  An action MUST NOT
  + include properties other than type, payload, error, and meta.
  */

  // creators
  function setConfig(config) {
    return {
      type: SET_CONFIG,
      payload: {
        config: config
      }
    };
  }

  function setEndPoint(url) {
    return {
      type: SET_ENDPOINT,
      payload: {
        url: url
      }
    };
  }
});