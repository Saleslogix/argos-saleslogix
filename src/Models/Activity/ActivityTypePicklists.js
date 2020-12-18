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

export const ActivityTypePicklists = {
  atAppointment: {
    Category: 'Meeting Category Codes',
    Description: 'Meeting Regarding',
    Result: 'Meeting Result Codes',
  },
  atLiterature: {
    Description: 'Lit Request Regarding',
  },
  atPersonal: {
    Category: 'Meeting Category Codes',
    Description: 'Personal Activity Regarding',
    Result: 'Personal Activity Result Codes',
  },
  atPhoneCall: {
    Category: 'Phone Call Category Codes',
    Description: 'Phone Call Regarding',
    Result: 'Phone Call Result Codes',
  },
  atToDo: {
    Category: 'To Do Category Codes',
    Description: 'To Do Regarding',
    Result: 'To Do Result Codes',
  },
  atEMail: {
    Category: 'E-mail Category Codes',
    Description: 'E-mail Regarding',
  },
};

export function getPicklistByActivityType(type, which) {
  return ActivityTypePicklists[type] && ActivityTypePicklists[type][which];
}

export default ActivityTypePicklists;
