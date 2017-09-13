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
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import convert from 'argos/Convert';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';


const __class = declare('crm.Models.UserActivity.SData', [Base, _SDataModelBase], {
  id: 'useractivity_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'Activity.StartDate desc',
      querySelect: [
        'Alarm',
        'AlarmTime',
        'Status',
        'Activity/Description',
        'Activity/StartDate',
        'Activity/EndDate',
        'Activity/Type',
        'Activity/AccountName',
        'Activity/AccountId',
        'Activity/ContactId',
        'Activity/ContactName',
        'Activity/Leader',
        'Activity/LeadName',
        'Activity/LeadId',
        'Activity/OpportunityId',
        'Activity/TicketId',
        'Activity/UserId',
        'Activity/Timeless',
        'Activity/PhoneNumber',
        'Activity/Recurring',
        'Activity/Alarm',
        'Activity/ModifyDate',
        'Activity/Priority',
      ],
      queryInclude: [
        '$descriptors',
        '$permissions',
      ],
    }, {
      name: 'myday',
      queryWhere: function queryWhere() {
        const now = moment();
        const todayStart = now.clone().startOf('day');
        const todayEnd = todayStart.clone().endOf('day');

        const theQuery = `((Activity.Timeless eq false and Activity.StartDate between @${convert.toIsoStringFromDate(todayStart.toDate())}@ and @${convert.toIsoStringFromDate(todayEnd.toDate())}@) or (Activity.Timeless eq true and Activity.StartDate between @${todayStart.format('YYYY-MM-DDT00:00:00[Z]')}@ and @${todayEnd.format('YYYY-MM-DDT23:59:59[Z]')}@))`
        ;
        const userQuery = `(User.Id eq "${App.context.user.$key}" and Status ne "asDeclned" and Activity.Type ne "atLiterature")`;

        return [userQuery, theQuery].join(' and ');
      },
      queryOrderBy: 'Activity.StartDate desc',
      querySelect: [
        'Alarm',
        'AlarmTime',
        'Status',
        'Activity/Description',
        'Activity/StartDate',
        'Activity/EndDate',
        'Activity/Type',
        'Activity/AccountName',
        'Activity/AccountId',
        'Activity/ContactId',
        'Activity/ContactName',
        'Activity/Leader',
        'Activity/LeadName',
        'Activity/LeadId',
        'Activity/OpportunityId',
        'Activity/TicketId',
        'Activity/UserId',
        'Activity/Timeless',
        'Activity/PhoneNumber',
        'Activity/Recurring',
        'Activity/Alarm',
        'Activity/ModifyDate',
        'Activity/Priority',
      ],
      queryInclude: [
        '$descriptors',
        '$permissions',
      ],
    },
    ];
  },
  getMyDayQuery: function getMyDayQuery() {
    const queryModel = this._getQueryModelByName('myday');
    return queryModel && queryModel.queryWhere();
  },
});

Manager.register(MODEL_NAMES.USERACTIVITY, MODEL_TYPES.SDATA, __class);
export default __class;
