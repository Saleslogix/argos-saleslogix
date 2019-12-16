define('crm/Models/Opportunity/Base', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('opportunityModel');
  var accountResource = (0, _I18n2.default)('accountModel');
  var activityResource = (0, _I18n2.default)('activityModel');
  var historyResource = (0, _I18n2.default)('historyModel');

  var __class = (0, _declare2.default)('crm.Models.Opportunity.Base', [_ModelBase3.default], {
    entityName: 'Opportunity',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'finance',
    resourceKind: 'opportunities',
    modelName: _Names2.default.OPPORTUNITY,
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
  exports.default = __class;
  module.exports = exports['default'];
});