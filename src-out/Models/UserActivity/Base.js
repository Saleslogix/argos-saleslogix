define('crm/Models/UserActivity/Base', ['module', 'exports', 'dojo/_base/declare', '../Activity/Base', '../Names', 'argos/I18n'], function (module, exports, _declare, _Base, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('userActivityModel');

  var __class = (0, _declare2.default)('crm.Models.UserActivity.Base', [_Base2.default], {
    modelName: _Names2.default.USERACTIVITY,
    entityName: 'UserActivity',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'bullet-list',
    resourceKind: 'userActivities',
    contractName: 'system',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = []);
      return rel;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});