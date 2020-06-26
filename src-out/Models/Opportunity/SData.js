define("crm/Models/Opportunity/SData", ["exports", "dojo/_base/declare", "./Base", "argos/Models/_SDataModelBase", "argos/Models/Manager", "argos/Models/Types", "../Names"], function (_exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Base = _interopRequireDefault(_Base);
  _SDataModelBase2 = _interopRequireDefault(_SDataModelBase2);
  _Manager = _interopRequireDefault(_Manager);
  _Types = _interopRequireDefault(_Types);
  _Names = _interopRequireDefault(_Names);

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
  var __class = (0, _declare["default"])('crm.Models.Opportunity.SData', [_Base["default"], _SDataModelBase2["default"]], {
    id: 'opportunity_sdata_model',
    querySelect: ['Account/AccountName', 'Account/WebAddress', 'Account/MainPhone', 'Account/Fax', 'Account/Address/*', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'CloseProbability', 'Description', 'EstimatedClose', 'ExchangeRate', 'ExchangeRateCode', 'ExchangeRateDate', 'ExchangeRateLocked', 'LeadSource/Description', 'Owner/OwnerDescription', 'Reseller/AccountName', 'SalesPotential', 'Stage', 'Status', 'Type', 'Weighted'],
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'EstimatedClose desc',
        querySelect: ['Account/AccountName', 'Account/AccountManager/UserInfo/UserName', 'Account/AccountManager/UserInfo/Region', 'Description', 'Stage', 'Status', 'SalesPotential', 'ExchangeRate', 'ExchangeRateCode', 'ModifyDate', 'ActualClose', 'EstimatedClose']
      }, {
        name: 'detail',
        querySelect: ['Account/AccountName', 'Account/WebAddress', 'Account/MainPhone', 'Account/Fax', 'Account/Address/*', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'CloseProbability', 'Description', 'EstimatedClose', 'ExchangeRate', 'ExchangeRateCode', 'ExchangeRateDate', 'ExchangeRateLocked', 'LeadSource/Description', 'Owner/OwnerDescription', 'Reseller/AccountName', 'SalesPotential', 'Stage', 'Status', 'Type', 'Weighted'],
        queryInclude: ['$permissions']
      }];
    }
  });

  _Manager["default"].register(_Names["default"].OPPORTUNITY, _Types["default"].SDATA, __class);

  var _default = __class;
  _exports["default"] = _default;
});