define('crm/reducers/user', ['exports', '../actions/user'], function (exports, _user) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.user = user;


  var initialUserState = null; /* Copyright 2017 Infor
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

  function user() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialUserState;
    var action = arguments[1];
    var type = action.type,
        payload = action.payload,
        error = action.error,
        meta = action.meta;
    // eslint-disable-line
    switch (type) {
      case _user.SET_USER:
        return Object.assign({}, state, payload.entry);
      default:
        return state;
    }
  }
});