define('crm/Views/ActivityAttendee/Detail', ['module', 'exports', 'dojo/_base/declare', 'argos/Detail', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _Detail, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2020 Infor
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

  var resource = (0, _I18n2.default)('activityAttendeeDetail');

  var __class = (0, _declare2.default)('crm.Views.ActivityAttendee.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    entityText: resource.entityText,

    // View Properties
    id: 'activity_attendee_detail',
    editView: 'activity_attendee_edit',
    modelName: _Names2.default.ACTIVITYATTENDEE,

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: 'name',
          name: 'Name',
          property: 'Name'
        }, {
          label: 'account',
          name: 'AccountName',
          property: 'AccountName'
        }, {
          label: 'type',
          name: 'EntityType',
          property: 'EntityType'
        }, {
          label: 'primary',
          name: 'IsPrimary',
          property: 'IsPrimary'
        }, {
          label: 'role',
          name: 'RoleName',
          property: 'RoleName'
        }, {
          label: 'phone',
          name: 'PhoneNumber',
          property: 'PhoneNumber'
        }, {
          label: 'email',
          name: 'Email',
          property: 'Email'
        }, {
          label: 'time zone',
          name: 'TimeZone',
          property: 'TimeZone'
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});