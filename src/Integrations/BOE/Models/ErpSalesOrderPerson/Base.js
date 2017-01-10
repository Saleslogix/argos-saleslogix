import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpSalesOrderPersonModel');

const __class = declare('crm.Integrations.BOE.Models.ErpSalesOrderPerson.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpSalesOrderPersons',
  entityName: 'ERPSalesOrderPerson',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPSALESORDERPERSON,
  iconClass: 'fa fa-user fa-2x',
  detailViewId: '',
  listViewId: 'erpsalesorderperson_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpSalesOrderPerson.Base', __class);
export default __class;
