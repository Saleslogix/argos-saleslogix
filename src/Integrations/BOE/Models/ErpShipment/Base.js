import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpShipmentModel');
const accountResource = getResource('accountModel');
const shipToResource = getResource('erpShipToModel');
const shipmentItemResource = getResource('erpShipmentItemModel');

const __class = declare('crm.Integrations.BOE.Models.ErpShipment.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpShipments',
  entityName: 'ERPShipment',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPSHIPMENT,
  iconClass: 'fa fa-truck fa-2x',
  detailViewId: 'erpshipments_detail',
  listViewId: 'erpshipments_list',
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
      name: 'ShipTo',
      displayName: shipToResource.entityDisplayName,
      type: 'ManyToOne',
      parentProperty: 'ErpShipTo',
      parentPropertyType: 'object',
      relatedEntity: 'ERPShipTo',
    }, {
      name: 'ShipmentItem',
      displayName: shipmentItemResource.entityDisplayName,
      type: 'OneToMany',
      relatedEntity: 'ERPShipmentItem',
      relatedProperty: 'ErpShipment',
      relatedPropertyType: 'object',
    }]);
    return rel;
  },
});
lang.setObject('icboe.Models.ErpShipment.Base', __class);
export default __class;
