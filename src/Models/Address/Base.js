import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('addressModel');

const __class = declare('crm.Models.Address.Base', [_ModelBase], {
  resourceKind: 'addresses',
  entityName: 'Address',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ADDRESS,
  iconClass: 'fa fa-list-ul fa-2x',
});
export default __class;
