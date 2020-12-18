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
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('activityAttendeeDetail');

const __class = declare('crm.Views.ActivityAttendee.Detail', [Detail], {
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
  modelName: MODEL_NAMES.ACTIVITYATTENDEE,

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        label: this.nameText,
        name: 'Name',
        property: 'Name',
      }, {
        label: this.accountText,
        name: 'AccountName',
        property: 'AccountName',
      }, {
        label: this.typeText,
        name: 'EntityType',
        property: 'EntityType',
      }, {
        label: this.primaryText,
        name: 'IsPrimary',
        property: 'IsPrimary',
      }, {
        label: this.roleText,
        name: 'RoleName',
        property: 'RoleName',
      }, {
        label: this.phoneText,
        name: 'PhoneNumber',
        property: 'PhoneNumber',
      }, {
        label: this.emailText,
        name: 'Email',
        property: 'Email',
      }, {
        label: this.timeZoneText,
        name: 'TimeZone',
        property: 'TimeZone',
      }],
    }]);
  },
});

export default __class;
