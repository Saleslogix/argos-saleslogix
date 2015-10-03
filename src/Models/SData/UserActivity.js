import declare from 'dojo/_base/declare';
import UserActivityBase from '../UserActivityBase';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPES from 'argos/Models/Types';

const __class = declare('crm.Models.SData.UserActivity', [UserActivityBase, _SDataModelBase], {
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
      ],
    }];
  },
});

Manager.register('UserActivity', MODEL_TYPES.SDATA, __class);
export default __class;
