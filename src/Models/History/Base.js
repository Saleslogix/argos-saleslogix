import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('historyModel');

const __class = declare('crm.Models.History.Base', [_ModelBase], {
  resourceKind: 'history',
  entityName: 'History',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.HISTORY,
  iconClass: 'fa fa-list-ul fa-2x',
});
export default __class;
