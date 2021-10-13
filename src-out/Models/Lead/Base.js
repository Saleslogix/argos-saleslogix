define('crm/Models/Lead/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
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

  const resource = (0, _I18n2.default)('leadModel');
  const activityResource = (0, _I18n2.default)('activityModel');
  const historyResource = (0, _I18n2.default)('historyModel');
  const addressResource = (0, _I18n2.default)('addressModel');

  const __class = (0, _declare2.default)('crm.Models.Lead.Base', [_ModelBase3.default], {
    resourceKind: 'leads',
    entityName: 'Lead',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'filter',
    security: 'Entities/Lead/View',
    modelName: _Names2.default.LEAD,
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Title',
        property: 'Title'
        // TODO: Add once Title is a code picklist
        // options: {
        //   filterByLanguage: false,
        //   language: ' ',
        // },
      }, {
        name: 'Industry',
        property: 'Industry'
      }, {
        name: 'Name Prefix',
        options: {
          filterByLanguage: false,
          language: ' ',
          storageMode: 'text'
        }
      }, {
        name: 'Name Suffix',
        options: {
          filterByLanguage: false,
          language: ' ',
          storageMode: 'text'
        }
      }]);
    },
    createRelationships: function createRelationships() {
      const rel = this.relationships || (this.relationships = [{
        name: 'Addresses',
        displayName: addressResource.entityDisplayNamePlural,
        propertyName: 'Addresses',
        type: 'OneToMany',
        relatedEntity: 'LeadAddress',
        relatedProperty: 'LeadId'
      }, {
        name: 'History',
        displayName: historyResource.entityDisplayNamePlural,
        propertyName: 'History',
        type: 'OneToMany',
        relatedEntity: 'History',
        relatedProperty: 'LeadId',
        where: 'Type ne "atDatabaseChange"'
      }, {
        name: 'Activity',
        displayName: activityResource.entityDisplayNamePlural,
        propertyName: 'Activity',
        type: 'OneToMany',
        relatedEntity: 'Activity',
        relatedProperty: 'LeadId'
      }]);
      return rel;
    }
  });
  exports.default = __class;
  module.exports = exports['default'];
});