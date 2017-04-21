import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.TicketActivity.SData', [Base, _SDataModelBase], {
  id: 'ticket_activity_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'AssignedDate asc',
      querySelect: [
        'ActivityDescription',
        'ActivityTypeCode',
        'AssignedDate',
        'CompletedDate',
        'ElapsedUnits',
        'FollowUp',
        'PublicAccessCode',
        'Rate',
        'RateTypeDescription/Amount',
        'RateTypeDescription/RateTypeCode',
        'RateTypeDescription/TypeDescription',
        'TotalFee',
        'TotalLabor',
        'TotalParts',
        'Units',
        'Ticket/Account/AccountName',
        'Ticket/TicketNumber',
        'Ticket/Contact/Name',
        'User/UserInfo/LastName',
        'User/UserInfo/FirstName',
      ],
      queryInclude: [
        '$permissions',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'ActivityDescription',
        'ActivityTypeCode',
        'AssignedDate',
        'CompletedDate',
        'ElapsedUnits',
        'FollowUp',
        'PublicAccessCode',
        'Rate',
        'RateTypeDescription/Amount',
        'RateTypeDescription/RateTypeCode',
        'RateTypeDescription/TypeDescription',
        'TotalFee',
        'TotalLabor',
        'TotalParts',
        'Units',
        'Ticket/Account/AccountName',
        'Ticket/TicketNumber',
        'Ticket/Contact/Name',
        'User/UserInfo/LastName',
        'User/UserInfo/FirstName',
      ],
    }, {
      name: 'edit',
      querySelect: [
        'ActivityDescription',
        'ActivityTypeCode',
        'AssignedDate',
        'CompletedDate',
        'PublicAccessCode',
        'User/UserName',
        'User/UserInfo/FirstName',
        'User/UserInfo/LastName',
      ],
      queryInclude: [
        '$permissions',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.TICKETACTIVITY, MODEL_TYPE.SDATA, __class);
export default __class;
