define('crm/Views/ActivityAttendee/Edit', ['module', 'exports', 'dojo/_base/declare', '../../Validator', 'argos/Edit', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _Validator, _Edit, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('activityAttendeeEdit'); // eslint-disable-line

  // eslint-disable-line
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

  var __class = (0, _declare2.default)('crm.Views.ActivityAttendee.Edit', [_Edit2.default], {
    // Localization

    // View Properties
    entityName: 'ActivityAttendee',
    modelName: _Names2.default.ACTIVITYATTENDEE,
    id: 'activity_attendee_edit',

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        label: 'name',
        name: 'Name',
        property: 'Name',
        type: 'text',
        readonly: true
      }, {
        label: 'account',
        name: 'AccountName',
        property: 'AccountName',
        type: 'text',
        readonly: true
      }, {
        label: 'type',
        name: 'EntityType',
        property: 'EntityType',
        type: 'text',
        readonly: true
      }, {
        label: 'primary',
        name: 'IsPrimary',
        Property: 'IsPrimary',
        type: 'boolean'
      }, {
        label: 'attendee',
        name: 'IsAttendee',
        Property: 'IsAttendee',
        type: 'boolean'
      }, {
        label: 'role',
        name: 'RoleName',
        Property: 'RoleName',
        type: 'picklist',
        picklist: 'Attendee Role'
      }, {
        label: 'phone',
        name: 'PhoneNumber',
        property: 'PhoneNumber',
        type: 'phone',
        readonly: true
      }, {
        label: 'email',
        name: 'Email',
        property: 'Email',
        type: 'text',
        readonly: true
      }, {
        label: 'time zone',
        name: 'TimeZone',
        property: 'TimeZone',
        type: 'text',
        readonly: true
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});