import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpAccountPersonModel');

const __class = declare('icboe.Models.ErpAccountPerson.Base', [_ModelBase], {
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
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
