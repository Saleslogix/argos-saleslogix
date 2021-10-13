define('crm/Integrations/Contour/Models/Place/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ModelBase3 = _interopRequireDefault(_ModelBase2);

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

  const resource = (0, _I18n2.default)('placeModel'); // eslint-disable-line
  const addressResource = (0, _I18n2.default)('addressModel');

  const __class = (0, _declare2.default)('crm.Integrations.Contour.Models.Place.Base', [_ModelBase3.default], {
    resourceKind: 'places',
    entityName: 'Place',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.PLACE,
    listViewId: 'pxSearch_locations',
    createRelationships: function createRelationships() {
      const rel = this.relationships || (this.relationships = [{
        name: 'Addresses',
        displayName: addressResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Address',
        relatedProperty: 'EntityId'
      }]);
      return rel;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});