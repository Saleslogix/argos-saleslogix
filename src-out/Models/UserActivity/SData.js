define("crm/Models/UserActivity/SData", ["exports", "dojo/_base/declare", "./Base", "argos/Models/_SDataModelBase", "argos/Models/Manager", "argos/Convert", "argos/Models/Types", "../Names"], function (_exports, _declare, _Base, _SDataModelBase2, _Manager, _Convert, _Types, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Base = _interopRequireDefault(_Base);
  _SDataModelBase2 = _interopRequireDefault(_SDataModelBase2);
  _Manager = _interopRequireDefault(_Manager);
  _Convert = _interopRequireDefault(_Convert);
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
  var __class = (0, _declare["default"])('crm.Models.UserActivity.SData', [_Base["default"], _SDataModelBase2["default"]], {
    id: 'useractivity_sdata_model',
    createQueryModels: function createQueryModels() {
      return [{
        name: 'list',
        queryOrderBy: 'Activity.StartDate desc',
        querySelect: ['Alarm', 'AlarmTime', 'Status', 'Activity/Description', 'Activity/StartDate', 'Activity/EndDate', 'Activity/Type', 'Activity/AccountName', 'Activity/AccountId', 'Activity/ContactId', 'Activity/ContactName', 'Activity/Leader', 'Activity/LeadName', 'Activity/LeadId', 'Activity/OpportunityId', 'Activity/TicketId', 'Activity/UserId', 'Activity/Timeless', 'Activity/PhoneNumber', 'Activity/Recurring', 'Activity/Alarm', 'Activity/ModifyDate', 'Activity/Priority'],
        queryInclude: ['$descriptors', '$permissions']
      }, {
        name: 'myday',
        queryWhere: function queryWhere() {
          var now = moment();
          var todayStart = now.clone().startOf('day');
          var todayEnd = todayStart.clone().endOf('day');
          var theQuery = "((Activity.Timeless eq false and Activity.StartDate between @".concat(_Convert["default"].toIsoStringFromDate(todayStart.toDate()), "@ and @").concat(_Convert["default"].toIsoStringFromDate(todayEnd.toDate()), "@) or (Activity.Timeless eq true and Activity.StartDate between @").concat(todayStart.format('YYYY-MM-DDT00:00:00[Z]'), "@ and @").concat(todayEnd.format('YYYY-MM-DDT23:59:59[Z]'), "@))");
          var userQuery = "(User.Id eq \"".concat(App.context.user.$key, "\" and Status ne \"asDeclned\" and Activity.Type ne \"atLiterature\")");
          return [userQuery, theQuery].join(' and ');
        },
        queryOrderBy: 'Activity.StartDate desc',
        querySelect: ['Alarm', 'AlarmTime', 'Status', 'Activity/Description', 'Activity/StartDate', 'Activity/EndDate', 'Activity/Type', 'Activity/AccountName', 'Activity/AccountId', 'Activity/ContactId', 'Activity/ContactName', 'Activity/Leader', 'Activity/LeadName', 'Activity/LeadId', 'Activity/OpportunityId', 'Activity/TicketId', 'Activity/UserId', 'Activity/Timeless', 'Activity/PhoneNumber', 'Activity/Recurring', 'Activity/Alarm', 'Activity/ModifyDate', 'Activity/Priority'],
        queryInclude: ['$descriptors', '$permissions']
      }];
    },
    getMyDayQuery: function getMyDayQuery() {
      var queryModel = this._getQueryModelByName('myday');

      return queryModel && queryModel.queryWhere();
    }
  });

  _Manager["default"].register(_Names["default"].USERACTIVITY, _Types["default"].SDATA, __class);

  var _default = __class;
  _exports["default"] = _default;
});