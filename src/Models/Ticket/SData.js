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
