import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoiceModel');

const __class = declare('crm.Integrations.BOE.Models.ErpInvoice.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpInvoices',
  entityName: 'ERPInvoice',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPINVOICE,
  iconClass: 'fa fa-file-text fa-2x',
  detailViewId: 'invoice_detail',
  listViewId: 'invoice_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpInvoice.Base', __class);
export default __class;
