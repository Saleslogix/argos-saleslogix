import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import MODEL_NAMES from '../Names';
import getResource from 'argos/I18n';

const resource = getResource('erpReceivableModel');

const __class = declare('icboe.Models.ErpReceivable.Base', [_ModelBase], {
  contractName: 'dynamic',
  resourceKind: 'erpReceivables',
  entityName: 'ERPReceivable',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  modelName: MODEL_NAMES.ERPRECEIVABLE,
  iconClass: 'fa fa-check-circle-o fa-2x',
  detailViewId: 'erpreceivables_detail',
  listViewId: 'erpreceivables_list',
  editViewId: '',
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = []);
    return rel;
  },
});
export default __class;
