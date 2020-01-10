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

import declare from 'dojo/_base/declare';
import format from '../../Format';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';

const resource = getResource('eventDetail');
const dtFormatResource = getResource('eventDetailDateTimeFormat');

const __class = declare('crm.Views.Event.Detail', [Detail], {
  // Localization
  actionsText: resource.actionsText,
  startTimeText: resource.startTimeText,
  endTimeText: resource.endTimeText,
  titleText: resource.titleText,
  descriptionText: resource.descriptionText,
  typeText: resource.typeText,
  whenText: resource.whenText,
  startDateFormatText: dtFormatResource.startDateFormatText,
  startDateFormatText24: dtFormatResource.startDateFormatText24,
  endDateFormatText: dtFormatResource.endDateFormatText,
  endDateFormatText24: dtFormatResource.endDateFormatText24,
  entityText: resource.entityText,
  eventTypeText: {
    atToDo: resource.toDo,
    atPhoneCall: resource.phoneCall,
    atAppointment: resource.meeting,
    atLiterature: resource.literature,
    atPersonal: resource.personal,
  },

  // View Properties
  id: 'event_detail',
  editView: 'event_edit',
  security: null, // 'Entities/Event/View',
  querySelect: [
    'Description',
    'EndDate',
    'StartDate',
    'UserId',
    'Type',
  ],
  resourceKind: 'events',

  formatEventType: function formatEventType(val) {
    return this.eventTypeText[val] || val;
  },
  init: function init() {
    this.inherited(init, arguments);
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'Type',
        property: 'Type',
        label: this.typeText,
        renderer: this.formatEventType.bindDelegate(this),
      }, {
        name: 'Description',
        property: 'Description',
        label: this.descriptionText,
      }],
    }, {
      title: this.whenText,
      name: 'WhenSection',
      children: [{
        name: 'StartDate',
        property: 'StartDate',
        label: this.startTimeText,
        renderer: format.date.bindDelegate(
          this, (App.is24HourClock()) ? this.startDateFormatText24 : this.startDateFormatText),
      }, {
        name: 'EndDate',
        property: 'EndDate',
        label: this.endTimeText,
        renderer: format.date.bindDelegate(
          this, (App.is24HourClock()) ? this.endDateFormatText24 : this.endDateFormatText),
      }],
    }]);
  },
});

export default __class;
