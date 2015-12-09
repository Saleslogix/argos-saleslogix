import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('leadAddressModel');

const __class = declare('crm.Models.LeadAddress.Base', [_ModelBase], {
  resourceKind: 'leadAddresses',
  entityName: 'LeadAddress',
  listViewId: 'address_related',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  iconClass: 'fa fa-list-ul fa-2x',
  modelName: MODEL_NAMES.LEADADDRESS,

});
export default __class;
