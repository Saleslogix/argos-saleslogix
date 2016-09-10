import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpBillToAccountModel');

const __class = declare('icboe.Models.ErpBillToAccount.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpBillToAccounts',
  entityName: 'ERPBillToAccount',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPBILLTOACCOUNT,
  iconClass: 'fa fa-building-o fa-2x',
  detailViewId: 'erpbilltoaccounts_detail',
  listViewId: 'erpbilltoaccounts_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
