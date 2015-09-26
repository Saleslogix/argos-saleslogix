import declare from 'dojo/_base/declare';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';

const __class = declare('crm.Models.SData.UserActivity', [_SDataModelBase], {
  entityName: 'UserActivity',
  entityDisplayName: 'User Activity',
  entityDisplayNamePlural: 'User Activities',
  iconClass: 'fa fa-list-ul fa-2x',
  resourceKind: 'userActivities',
  contractName: 'system',
  recurringActivityIdSeparator: ';',
  activityIndicatorIconByType: {
    'atToDo': 'fa fa-list-ul',
    'atPhoneCall': 'fa fa-phone',
    'atAppointment': 'fa fa-calendar-o',
    'atLiterature': 'fa fa-book',
    'atPersonal': 'fa fa-check-square-o',
    'atQuestion': 'fa fa-question-circle',
    'atNote': 'fa fa-file-text-o',
    'atEMail': 'fa fa-envelope',
  },
  activityTypeText: {
    'atToDo': 'To-Do',
    'atPhoneCall': 'Phone Call',
    'atAppointment': 'Meeting',
    'atLiterature': 'Lit Request',
    'atPersonal': 'Personal',
    'atQuestion': 'Question',
    'atNote': 'Note',
    'atEMail': 'Email',
  },
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
  getIconClass: function getIconClass(entry) {
    let cls = this.iconClass;
    if (entry && entry.Type) {
      cls = this.activityIndicatorIconByType[entry.Type];
      if (cls) {
        cls = cls + ' fa-2x';
      }
    }
    return cls;
  },
  getTypeText: function getTypeText(entry) {
    let name = '';
    if (entry && entry.Type) {
      name = this.activityTypeText[entry.Type];
    }
    return name;
  },
});

Manager.register('UserActivity', MODEL_TYPE.SDATA, __class);
export default __class;
