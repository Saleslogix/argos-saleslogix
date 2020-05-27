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

import declare from 'dojo/_base/declare';
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('activityAttendeeEdit');

const __class = declare('crm.Views.ActivityAttendee.Edit', [Edit], {
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
  modelName: MODEL_NAMES.ACTIVITYATTENDEE,
  id: 'activity_attendee_edit',

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      label: this.nameText,
      name: 'Name',
      property: 'Name',
      type: 'text',
      readonly: true,
    }, {
      label: this.accountText,
      name: 'AccountName',
      property: 'AccountName',
      type: 'text',
      readonly: true,
    }, {
      label: this.typeText,
      name: 'EntityType',
      property: 'EntityType',
      type: 'text',
      readonly: true,
    }, {
      label: this.primaryText,
      name: 'IsPrimary',
      Property: 'IsPrimary',
      type: 'boolean',
    }, {
      label: this.attendeeText,
      name: 'IsAttendee',
      Property: 'IsAttendee',
      type: 'boolean',
    }, {
      label: this.roleText,
      name: 'RoleName',
      Property: 'RoleName',
      type: 'picklist',
      picklist: 'Attendee Role',
    }, {
      label: this.phoneText,
      name: 'PhoneNumber',
      property: 'PhoneNumber',
      type: 'phone',
      readonly: true,
    }, {
      label: this.emailText,
      name: 'Email',
      property: 'Email',
      type: 'text',
      readonly: true,
    }, {
      label: this.timeZoneText,
      name: 'TimeZone',
      property: 'TimeZone',
      type: 'text',
      readonly: true,
    }]);
  },
});

export default __class;
