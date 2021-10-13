define('crm/Models/AreaCategoryIssue/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names'], function (module, exports, _declare, _ModelBase2, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ModelBase3 = _interopRequireDefault(_ModelBase2);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const __class = (0, _declare2.default)('crm.Models.AreaCategoryIssue.Base', [_ModelBase3.default], {
    resourceKind: 'areaCategoryIssues',
    entityName: 'AreaCategoryIssue',
    modelName: _Names2.default.AREACATEGORYISSUE
  }); /* Copyright 2021 Infor
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