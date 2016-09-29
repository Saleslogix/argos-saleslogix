import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpAccountPersonModel');

const __class = declare('crm.Integrations.BOE.Models.ErpAccountPerson.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpAccountPersons',
  entityName: 'ERPAccountPerson',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPACCOUNTPERSON,
  iconClass: 'fa fa-user fa-2x',
  detailViewId: '',
  listViewId: 'erpaccountperson_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpAccountPerson.Base', __class);
export default __class;
