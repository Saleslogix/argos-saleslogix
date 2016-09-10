import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('productModel');

const __class = declare('icboe.Models.Product.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'products',
  entityName: 'Product',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.PRODUCT,
  iconClass: '',
  detailViewId: '',
  listViewId: '',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
