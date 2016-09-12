import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpBillToModel');

const __class = declare('crm.Integrations.BOE.Models.ErpBillTo.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpBillTos',
  entityName: 'ERPBillTo',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPBILLTO,
  iconClass: '',
  detailViewId: 'erpbillto_detail',
  listViewId: 'erpbillto_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpBillTo.Base', __class);
export default __class;
