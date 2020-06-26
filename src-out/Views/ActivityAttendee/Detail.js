define("crm/Views/ActivityAttendee/Detail", ["exports", "dojo/_base/declare", "argos/Detail", "argos/I18n", "../../Models/Names"], function (_exports, _declare, _Detail, _I18n, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Detail = _interopRequireDefault(_Detail);
  _I18n = _interopRequireDefault(_I18n);
  _Names = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('activityAttendeeDetail');

  var __class = (0, _declare["default"])('crm.Views.ActivityAttendee.Detail', [_Detail["default"]], {
    // Localization
    titleText: resource.titleText,
    entityText: resource.entityText,
    nameText: resource.nameText,
    accountText: resource.accountText,
    typeText: resource.typeText,
    primaryText: resource.primaryText,
    roleText: resource.roleText,
    phoneText: resource.phoneText,
    emailText: resource.emailText,
    timeZoneText: resource.timeZoneText,
    // View Properties
    id: 'activity_attendee_detail',
    editView: 'activity_attendee_edit',
    modelName: _Names["default"].ACTIVITYATTENDEE,
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.nameText,
          name: 'Name',
          property: 'Name'
        }, {
          label: this.accountText,
          name: 'AccountName',
          property: 'AccountName'
        }, {
          label: this.typeText,
          name: 'EntityType',
          property: 'EntityType'
        }, {
          label: this.primaryText,
          name: 'IsPrimary',
          property: 'IsPrimary'
        }, {
          label: this.roleText,
          name: 'RoleName',
          property: 'RoleName'
        }, {
          label: this.phoneText,
          name: 'PhoneNumber',
          property: 'PhoneNumber'
        }, {
          label: this.emailText,
          name: 'Email',
          property: 'Email'
        }, {
          label: this.timeZoneText,
          name: 'TimeZone',
          property: 'TimeZone'
        }]
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});