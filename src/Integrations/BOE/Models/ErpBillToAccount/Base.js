import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpBillToAccountModel');
const accountResource = getResource('accountModel');

const __class = declare('crm.Integrations.BOE.Models.ErpBillToAccount.Base', [_ModelBase], {
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
    const rel = this.relationships || (this.relationships = [{
      name: 'Account',
      displayName: accountResource.entityDisplayName,
      type: 'ManyToOne',
      relatedEntity: 'Account',
      relatedProperty: 'ErpBillToAccounts',
      relatedPropertyType: 'object',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpBillToAccount.Base', __class);
export default __class;
