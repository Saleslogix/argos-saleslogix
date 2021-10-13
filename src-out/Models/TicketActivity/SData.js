define('crm/Models/TicketActivity/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

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

  const __class = (0, _declare2.default)('crm.Models.TicketActivity.SData', [_Base2.default, _SDataModelBase3.default], {
    id: 'ticket_activity_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'AssignedDate asc',
        querySelect: ['ActivityDescription', 'ActivityTypeCode', 'AssignedDate', 'CompletedDate', 'ElapsedUnits', 'FollowUp', 'PublicAccessCode', 'Rate', 'RateTypeDescription/Amount', 'RateTypeDescription/RateTypeCode', 'RateTypeDescription/TypeDescription', 'TotalFee', 'TotalLabor', 'TotalParts', 'Units', 'Ticket/Account/AccountName', 'Ticket/TicketNumber', 'Ticket/Contact/Name', 'User/UserInfo/LastName', 'User/UserInfo/FirstName'],
        queryInclude: ['$permissions']
      }, {
        name: 'detail',
        querySelect: ['ActivityDescription', 'ActivityTypeCode', 'AssignedDate', 'CompletedDate', 'ElapsedUnits', 'FollowUp', 'PublicAccessCode', 'Rate', 'RateTypeDescription/Amount', 'RateTypeDescription/RateTypeCode', 'RateTypeDescription/TypeDescription', 'TotalFee', 'TotalLabor', 'TotalParts', 'Units', 'Ticket/Account/AccountName', 'Ticket/TicketNumber', 'Ticket/Contact/Name', 'User/UserInfo/LastName', 'User/UserInfo/FirstName']
      }, {
        name: 'edit',
        querySelect: ['ActivityDescription', 'ActivityTypeCode', 'AssignedDate', 'CompletedDate', 'PublicAccessCode', 'User/UserName', 'User/UserInfo/FirstName', 'User/UserInfo/LastName'],
        queryInclude: ['$permissions']
      }];
    }
  });

  _Manager2.default.register(_Names2.default.TICKETACTIVITY, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});