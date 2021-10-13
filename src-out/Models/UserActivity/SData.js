define('crm/Models/UserActivity/SData', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_SDataModelBase', 'argos/Models/Manager', 'argos/Convert', 'argos/Models/Types', '../Names'], function (module, exports, _declare, _Base, _SDataModelBase2, _Manager, _Convert, _Types, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

  var _SDataModelBase3 = _interopRequireDefault(_SDataModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Models.UserActivity.SData', [_Base2.default, _SDataModelBase3.default], {
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

          var theQuery = '((Activity.Timeless eq false and Activity.StartDate between @' + _Convert2.default.toIsoStringFromDate(todayStart.toDate()) + '@ and @' + _Convert2.default.toIsoStringFromDate(todayEnd.toDate()) + '@) or (Activity.Timeless eq true and Activity.StartDate between @' + todayStart.format('YYYY-MM-DDT00:00:00[Z]') + '@ and @' + todayEnd.format('YYYY-MM-DDT23:59:59[Z]') + '@))';
          var userQuery = '(User.Id eq "' + App.context.user.$key + '" and Status ne "asDeclned" and Activity.Type ne "atLiterature")';

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
  }); /* Copyright 2017 Infor
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

  _Manager2.default.register(_Names2.default.USERACTIVITY, _Types2.default.SDATA, __class);
  exports.default = __class;
  module.exports = exports['default'];
});