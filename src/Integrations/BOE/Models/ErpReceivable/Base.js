import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpReceivableModel');
const accountResource = getResource('accountModel');
const billToResource = getResource('erpBillToModel');
const shipToResource = getResource('erpShipToModel');
const receivableItemResource = getResource('erpReceivableItemModel');
const invoiceResource = getResource('erpInvoiceModel');

const __class = declare('crm.Integrations.BOE.Models.ErpReceivable.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpReceivables',
  entityName: 'ERPReceivable',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPRECEIVABLE,
  iconClass: 'checkbox',
  detailViewId: 'erpreceivables_detail',
  listViewId: 'erpreceivables_list',
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
      name: 'Invoice',
      displayName: invoiceResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'ErpInvoice',
      parentPropertyType: 'object',
      relatedEntity: 'ERPInvoice',
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
      name: 'ReceivableItem',
      displayName: receivableItemResource.entityDisplayName,
      type: 'OneToMany',
      relatedEntity: 'ERPReceivableItem',
      relatedProperty: 'ErpReceivable',
      relatedPropertyType: 'object',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpReceivable.Base', __class);
export default __class;
