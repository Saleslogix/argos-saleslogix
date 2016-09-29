import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpInvoiceModel');
const accountResource = getResource('accountModel');
const billToResource = getResource('erpBillToModel');
const shipToResource = getResource('erpShipToModel');
const invoiceItemResource = getResource('erpInvoiceItemModel');
const receivableResource = getResource('erpReceivableModel');

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
    const rel = this.relationships || (this.relationships = [{
      name: 'Account',
      displayName: accountResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'Account',
      parentPropertyType: 'object',
      relatedEntity: 'Account',
    }, {
      name: 'BillTo',
      displayName: billToResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'ErpBillTo',
      parentPropertyType: 'object',
      relatedEntity: 'ERPBillTo',
    }, {
      name: 'ShipTo',
      displayName: shipToResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'ErpShipTo',
      parentPropertyType: 'object',
      relatedEntity: 'ERPShipTo',
    }, {
      name: 'InvoiceItem',
      displayName: invoiceItemResource.entityDisplayName,
      type: 'OneToMany',
      relatedEntity: 'ERPInvoiceItem',
      relatedProperty: 'ErpInvoice',
      relatedPropertyType: 'object',
    }, {
      name: 'Receivable',
      displayName: receivableResource.entityDisplayName,
      type: 'OneToMany',
      relatedEntity: 'ERPReceivable',
      relatedProperty: 'ErpInvoice',
      relatedPropertyType: 'object',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpInvoice.Base', __class);
export default __class;
