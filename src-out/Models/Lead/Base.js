define("crm/Models/Lead/Base", ["exports", "dojo/_base/declare", "argos/Models/_ModelBase", "../Names", "argos/I18n"], function (_exports, _declare, _ModelBase2, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _ModelBase2 = _interopRequireDefault(_ModelBase2);
  _Names = _interopRequireDefault(_Names);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('leadModel');
  var activityResource = (0, _I18n["default"])('activityModel');
  var historyResource = (0, _I18n["default"])('historyModel');
  var addressResource = (0, _I18n["default"])('addressModel');

  var __class = (0, _declare["default"])('crm.Models.Lead.Base', [_ModelBase2["default"]], {
    resourceKind: 'leads',
    entityName: 'Lead',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'filter',
    security: 'Entities/Lead/View',
    modelName: _Names["default"].LEAD,
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Title',
        property: 'Title' // TODO: Add once Title is a code picklist
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
      var rel = this.relationships || (this.relationships = [{
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

  var _default = __class;
  _exports["default"] = _default;
});