define("crm/Models/Account/Base", ["exports", "dojo/_base/declare", "argos/Models/_ModelBase", "../Names", "argos/I18n"], function (_exports, _declare, _ModelBase2, _Names, _I18n) {
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
  var resource = (0, _I18n["default"])('accountModel');
  var contactResource = (0, _I18n["default"])('contactModel');
  var activityResource = (0, _I18n["default"])('activityModel');
  var historyResource = (0, _I18n["default"])('historyModel');
  var oppResource = (0, _I18n["default"])('opportunityModel');
  var addressResource = (0, _I18n["default"])('addressModel');
  var ticketResource = (0, _I18n["default"])('ticketModel');

  var __class = (0, _declare["default"])('crm.Models.Account.Base', [_ModelBase2["default"]], {
    resourceKind: 'accounts',
    entityName: 'Account',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names["default"].ACCOUNT,
    iconClass: 'spreadsheet',
    detailViewId: 'account_detail',
    listViewId: 'account_list',
    editViewId: 'account_edit',
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Account Type',
        property: 'Type'
      }, {
        name: 'Account Status',
        property: 'Status'
      }, {
        name: 'Industry',
        property: 'Industry'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Addresses',
        displayName: addressResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Address',
        relatedProperty: 'EntityId'
      }, {
        name: 'Contacts',
        displayName: contactResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Contact',
        relatedProperty: 'Account',
        relatedPropertyType: 'object'
      }, {
        name: 'History',
        displayName: historyResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'History',
        relatedProperty: 'AccountId',
        where: 'Type ne "atDatabaseChange"'
      }, {
        name: 'Activities',
        displayName: activityResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Activity',
        relatedProperty: 'AccountId'
      }, {
        name: 'Opportunities',
        displayName: oppResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Opportunity',
        relatedProperty: 'Account',
        relatedPropertyType: 'object'
      }, {
        name: 'Tickets',
        displayName: ticketResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Ticket',
        relatedProperty: 'Account',
        relatedPropertyType: 'object'
      }]);
      return rel;
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});