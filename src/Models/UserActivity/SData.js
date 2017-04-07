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
