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
import validator from '../../Validator'; // eslint-disable-line
import Edit from 'argos/Edit';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('activityAttendeeEdit');// eslint-disable-line

const __class = declare('crm.Views.ActivityAttendee.Edit', [Edit], {
  // Localization

  // View Properties
  entityName: 'ActivityAttendee',
  modelName: MODEL_NAMES.ACTIVITYATTENDEE,
  id: 'activity_attendee_edit',

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      label: 'name',
      name: 'Name',
      property: 'Name',
      type: 'text',
      readonly: true,
    }, {
      label: 'account',
      name: 'AccountName',
      property: 'AccountName',
      type: 'text',
      readonly: true,
    }, {
      label: 'type',
      name: 'EntityType',
      property: 'EntityType',
      type: 'text',
      readonly: true,
    }, {
      label: 'primary',
      name: 'IsPrimary',
      Property: 'IsPrimary',
      type: 'boolean',
    }, {
      label: 'attendee',
      name: 'IsAttendee',
      Property: 'IsAttendee',
      type: 'boolean',
    }, {
      label: 'role',
      name: 'RoleName',
      Property: 'RoleName',
      type: 'picklist',
      picklist: 'Attendee Role',
    }, {
      label: 'phone',
      name: 'PhoneNumber',
      property: 'PhoneNumber',
      type: 'phone',
      readonly: true,
    }, {
      label: 'email',
      name: 'Email',
      property: 'Email',
      type: 'text',
      readonly: true,
    }, {
      label: 'time zone',
      name: 'TimeZone',
      property: 'TimeZone',
      type: 'text',
      readonly: true,
    }]);
  },
});

export default __class;
