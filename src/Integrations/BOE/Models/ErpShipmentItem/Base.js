import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipmentItemModel');
const shipmentResource = getResource('erpShipmentModel');
const salesOrderResource = getResource('salesOrderModel');

const __class = declare('crm.Integrations.BOE.Models.ErpShipmentItem.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpShipmentItems',
  entityName: 'ERPShipmentItem',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPSHIPMENTITEM,
  iconClass: 'fa fa-truck fa-2x',
  detailViewId: 'erpshipment_items_detail',
  listViewId: 'erpshipment_items_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    const rel = this.relationships || (this.relationships = [{
      name: 'Shipment',
      displayName: shipmentResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'ErpShipment',
      parentPropertyType: 'object',
      relatedEntity: 'ERPShipment',
    }, {
      name: 'SalesOrder',
      displayName: salesOrderResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'SalesOrder',
      parentPropertyType: 'object',
      relatedEntity: 'SalesOrder',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpShipmentItem.Base', __class);
export default __class;
