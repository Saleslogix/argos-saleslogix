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
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Ticket.SData', [Base, _SDataModelBase], {
  id: 'ticket_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'TicketNumber',
      querySelect: [
        'Account/AccountName',
        'Account/MainPhone',
        'Area',
        'Category',
        'Issue',
        'AssignedTo/OwnerDescription',
        'Contact/NameLF',
        'Contact/WorkPhone',
        'ReceivedDate',
        'StatusCode',
        'Subject',
        'TicketNumber',
        'UrgencyCode',
        'Urgency/Description',
        'ModifyDate',
        'CreateDate',
        'NeededByDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Account/AccountName',
        'Account/MainPhone',
        'Area',
        'AssignedDate',
        'AssignedTo/OwnerDescription',
        'Category',
        'Contact/NameLF',
        'Contact/WorkPhone',
        'Contract/ReferenceNumber',
        'Issue',
        'NeededByDate',
        'Notes',
        'ViaCode',
        'StatusCode',
        'UrgencyCode',
        'Subject',
        'TicketNumber',
        'TicketProblem/Notes',
        'TicketSolution/Notes',
        'Urgency/Description',
        'Urgency/UrgencyCode',
        'CompletedBy/OwnerDescription',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.TICKET, MODEL_TYPE.SDATA, __class);
export default __class;
