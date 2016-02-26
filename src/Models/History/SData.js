import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.History.SData', [Base, _SDataModelBase], {
  id: 'history_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'CompletedDate desc',
      queryWhere: 'Type ne "atDatabaseChange"',
      querySelect: [
        'AccountName',
        'ContactName',
        'LeadName',
        'CompletedDate',
        'Description',
        'StartDate',
        'TimeLess',
        'Type',
        'LeadId',
        'OpportunityId',
        'OpportunityName',
        'AccountId',
        'ContactId',
        'TicketId',
        'ModifyDate',
        'Notes',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'AccountId',
        'AccountName',
        'Category',
        'ModifyDate',
        'CompletedDate',
        'ContactId',
        'ContactName',
        'CompletedUser',
        'Description',
        'Duration',
        'Notes',
        'LongNotes',
        'OpportunityId',
        'OpportunityName',
        'Priority',
        'StartDate',
        'TicketId',
        'TicketNumber',
        'LeadId',
        'LeadName',
        'Timeless',
        'Type',
        'UserName',
        'UserId',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.HISTORY, MODEL_TYPES.SDATA, __class);
export default __class;
