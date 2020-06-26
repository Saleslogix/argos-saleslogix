define("crm/Models/Opportunity/Base", ["exports", "dojo/_base/declare", "argos/Models/_ModelBase", "../Names", "argos/I18n"], function (_exports, _declare, _ModelBase2, _Names, _I18n) {
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
  var resource = (0, _I18n["default"])('opportunityModel');
  var accountResource = (0, _I18n["default"])('accountModel');
  var activityResource = (0, _I18n["default"])('activityModel');
  var historyResource = (0, _I18n["default"])('historyModel');

  var __class = (0, _declare["default"])('crm.Models.Opportunity.Base', [_ModelBase2["default"]], {
    entityName: 'Opportunity',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'finance',
    resourceKind: 'opportunities',
    modelName: _Names["default"].OPPORTUNITY,
    security: 'Entities/Opportunity/View',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Opportunity Type',
        property: 'Type'
      }, {
        name: 'Opportunity Status',
        property: 'Status'
      }, {
        name: 'Opportunity Probability',
        property: 'CloseProbability'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'Account',
        parentPropertyType: 'object',
        relatedEntity: 'Account',
        relatedPropertyType: 'object'
      }, {
        name: 'Reseller',
        displayName: resource.resellerText,
        type: 'ManyToOne',
        parentProperty: 'Reseller',
        parentPropertyType: 'object',
        relatedEntity: 'Account',
        relatedPropertyType: 'object'
      }, {
        name: 'History',
        displayName: historyResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'History',
        relatedProperty: 'OpportunityId',
        where: 'Type ne "atDatabaseChange"'
      }, {
        name: 'Activity',
        displayName: activityResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Activity',
        relatedProperty: 'OpportunityId'
      }]);
      return rel;
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});