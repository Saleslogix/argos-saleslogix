import declare from 'dojo/_base/declare';
import _OfflineModelBase from 'argos/Models/_OfflineModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.Offline.Opportunity', [_OfflineModelBase], {
  entityName: 'Opportunity',
  entityDisplayName: 'Opportunity',
  entityDisplayNamePlural: 'Opportunities',
  resourceKind: 'opportunities',
  modelName: MODEL_NAMES.OPPORTUNITY,
});

Manager.register(MODEL_NAMES.OPPORTUNITY, MODEL_TYPE.OFFLINE, __class);
export default __class;
