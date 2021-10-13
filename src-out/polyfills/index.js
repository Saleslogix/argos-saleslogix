define('crm/polyfills/index', ['./nodelist'], function (_nodelist) {
  var nodelist = _interopRequireWildcard(_nodelist);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  const p = Object.assign({}, nodelist); /* Copyright 2017 Infor
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

  p.nodelist();
});