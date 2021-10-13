define('crm/Views/ActivityAttendee/Edit', ['module', 'exports', 'dojo/_base/declare', 'argos/Edit', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _Edit, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Edit2 = _interopRequireDefault(_Edit);

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

  var resource = (0, _I18n2.default)('activityAttendeeEdit');

  var __class = (0, _declare2.default)('crm.Views.ActivityAttendee.Edit', [_Edit2.default], {
    // Localization
    nameText: resource.nameText,
    accountText: resource.accountText,
    typeText: resource.typeText,
    primaryText: resource.primaryText,
    roleText: resource.roleText,
    phoneText: resource.phoneText,
    emailText: resource.emailText,
    timeZoneText: resource.timeZoneText,
    attendeeText: resource.attendeeText,

    // View Properties
    entityName: 'ActivityAttendee',
    modelName: _Names2.default.ACTIVITYATTENDEE,
    id: 'activity_attendee_edit',

    beforeTransitionTo: function beforeTransitionTo() {
      // We need to process the options that came from our attendee typeslist view if inserting.
      if (this.options.insert) {
        this.refreshRequired = false; // Indicate to _EditBase we don't want to refresh or set any loading flags
        this.inherited(beforeTransitionTo, arguments);
        this.inserting = true;
        var _options = this.options,
            activityEntity = _options.activityEntity,
            entity = _options.entity,
            entityType = _options.entityType;


        this.fields.Name.setValue(entity.$descriptor);
        this.fields.AccountName.setValue(entity.Company || entity.AccountName);
        this.fields.EntityType.setValue(entityType);
        this.fields.IsPrimary.setValue(false);
        this.fields.IsAttendee.setValue(true);
        this.fields.PhoneNumber.setValue(entity.WorkPhone);
        this.fields.Email.setValue(entity.Email);
        this.fields['Activity.$key'].setValue(activityEntity.$key);
        this.fields.EntityId.setValue(entity.$key);
        if (entity.Address && entity.Address.TimeZone) {
          this.fields.TimeZone.setValue(entity.Address.TimeZone);
        }
      } else {
        this.inherited(beforeTransitionTo, arguments);
      }
    },
    includeIfInserting: function includeIfInserting() {
      return this.options.insert;
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        label: this.nameText,
        name: 'Name',
        property: 'Name',
        type: 'text',
        readonly: true
      }, {
        label: this.accountText,
        name: 'AccountName',
        property: 'AccountName',
        type: 'text',
        readonly: true
      }, {
        label: this.typeText,
        name: 'EntityType',
        property: 'EntityType',
        type: 'text',
        readonly: true
      }, {
        label: this.primaryText,
        name: 'IsPrimary',
        Property: 'IsPrimary',
        type: 'boolean'
      }, {
        label: this.attendeeText,
        name: 'IsAttendee',
        Property: 'IsAttendee',
        type: 'boolean'
      }, {
        label: this.roleText,
        name: 'RoleName',
        Property: 'RoleName',
        type: 'picklist',
        picklist: 'Attendee Role',
        emptyText: ''
      }, {
        label: this.phoneText,
        name: 'PhoneNumber',
        property: 'PhoneNumber',
        type: 'phone',
        readonly: true
      }, {
        label: this.emailText,
        name: 'Email',
        property: 'Email',
        type: 'text',
        readonly: true
      }, {
        label: this.timeZoneText,
        name: 'TimeZone',
        property: 'TimeZone',
        type: 'text',
        readonly: true
      }, {
        name: 'Activity.$key',
        property: 'Activity.$key',
        type: 'hidden',
        include: this.includeIfInserting
      }, {
        name: 'EntityId',
        property: 'EntityId',
        type: 'hidden',
        include: this.includeIfInserting
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});