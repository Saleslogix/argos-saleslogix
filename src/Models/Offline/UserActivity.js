import declare from 'dojo/_base/declare';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Offline.UserActivity', [_OfflineModelBase], {
  entityName: 'UserActivity',
  entityDisplayName: 'User Activity',
  entityDisplayNamePlural: 'User Activities',
  resourceKind: 'userActivities',
  modelName: 'UserActivity',
});

Manager.register('UserActivity', MODEL_TYPE.OFFLINE, __class);
export default __class;
