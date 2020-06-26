define("crm/Models/Contact/SData", ["exports", "dojo/_base/declare", "./Base", "argos/Models/_SDataModelBase", "argos/Models/Manager", "argos/Models/Types", "../Names"], function (_exports, _declare, _Base, _SDataModelBase2, _Manager, _Types, _Names) {
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
  var __class = (0, _declare["default"])('crm.Models.Contact.SData', [_Base["default"], _SDataModelBase2["default"]], {
    id: 'contact_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'LastNameUpper,FirstName',
        querySelect: ['AccountName', 'NameLF', 'WorkPhone', 'Mobile', 'Email', 'Title', 'LastHistoryDate', 'ModifyDate', 'Address/TimeZone']
      }, {
        name: 'detail',
        querySelect: ['Account/AccountName', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'CuisinePreference', 'CreateDate', 'CreateUser', 'Email', 'Fax', 'FirstName', 'HomePhone', 'LastName', 'LocationCode', 'MiddleName', 'Mobile', 'Name', 'NameLF', 'Owner/OwnerDescription', 'Prefix', 'Suffix', 'Title', 'WebAddress', 'WorkPhone'],
        queryInclude: ['$permissions']
      }, {
        name: 'edit',
        querySelect: ['Account/AccountName', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'CuisinePreference', 'CreateDate', 'CreateUser', 'Email', 'Fax', 'FirstName', 'HomePhone', 'LastName', 'LocationCode', 'MiddleName', 'Mobile', 'Name', 'NameLF', 'Owner/OwnerDescription', 'Prefix', 'Suffix', 'Title', 'WebAddress', 'WorkPhone'],
        queryInclude: ['$permissions']
      }];
    },
    getEntry: function getEntry()
    /* options */
    {
      var results$ = this.inherited(getEntry, arguments);
      return results$.then(function (entry) {
        return new Promise(function (resolve) {
          Promise.all([App.picklistService.requestPicklist('Name Prefix', {
            language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
            filterByLanguage: true
          }), App.picklistService.requestPicklist('Name Suffix', {
            language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
            filterByLanguage: true
          }), App.picklistService.requestPicklist('Title', {
            language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
            filterByLanguage: true
          })]).then(function () {
            resolve(entry);
          });
        });
      });
    }
  });

  _Manager["default"].register(_Names["default"].CONTACT, _Types["default"].SDATA, __class);

  var _default = __class;
  _exports["default"] = _default;
});