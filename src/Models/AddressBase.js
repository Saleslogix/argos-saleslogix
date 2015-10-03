import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from './Names';

const __class = declare('crm.Models.AddressBase', [_ModelBase], {
  resourceKind: 'addresses',
  entityName: 'Address',
  entityDisplayName: 'Address',
  entityDisplayNamePlural: 'Addresses',
  modelName: 'Address',
  iconClass: 'fa fa-list-ul fa-2x',
});
export default __class;
