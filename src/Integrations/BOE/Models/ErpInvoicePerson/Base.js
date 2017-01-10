import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoicePersonModel');

const __class = declare('crm.Integrations.BOE.Models.ErpInvoicePerson.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpInvoicePersons',
  entityName: 'ERPInvoicePerson',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPINVOICEPERSON,
  iconClass: 'fa fa-user fa-2x',
  detailViewId: '',
  listViewId: 'invoiceperson_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpInvoicePerson.Base', __class);
export default __class;
