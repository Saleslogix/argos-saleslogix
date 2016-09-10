import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoicePersonModel');

const __class = declare('icboe.Models.ErpInvoicePerson.Base', [_ModelBase], {
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
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
