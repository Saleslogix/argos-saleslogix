import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from './Names';

const __class = declare('crm.Models.HistoryBase', [_ModelBase], {
  resourceKind: 'history',
  entityName: 'History',
  entityDisplayName: 'History',
  entityDisplayNamePlural: 'History',
  modelName: MODEL_NAMES.HISTORY,
  iconClass: 'fa fa-list-ul fa-2x',
});
export default __class;
